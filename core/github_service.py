import os
from github import Github
from .models import OpenSourceAlternative, SkillRegistry, ContributionRecord, UserProfile
from django.utils import timezone
import datetime

class GitHubService:
    def __init__(self):
        # Fallback to unauthenticated if no token is provided, though rate limits apply.
        token = os.environ.get("GITHUB_TOKEN")
        self.g = Github(token) if token else Github()

    def get_repo_stats(self, repository_url):
        """Fetches basic repository stats like stars, forks, open issues."""
        try:
            repo_path = self._extract_repo_path(repository_url)
            repo = self.g.get_repo(repo_path)
            return {
                "stars": repo.stargazers_count,
                "forks": repo.forks_count,
                "open_issues": repo.open_issues_count,
                "description": repo.description,
            }
        except Exception as e:
            return {"error": str(e)}

    def find_recommended_issues(self, user_profile: UserProfile):
        """
        Pull and recommend issues from OpenSourceAlternative projects 
        based on the user's registered skills and 'help wanted' labels.
        """
        recommended_issues = []
        user_skills = [skill.name.lower() for skill in user_profile.skills.all()]
        
        # In a real-world scenario, we'd cache these or do batch processing
        alternatives = OpenSourceAlternative.objects.filter(is_active=True)
        
        for alt in alternatives:
            try:
                repo_path = self._extract_repo_path(alt.repository_url)
                repo = self.g.get_repo(repo_path)
                
                # Fetch open issues labeled with 'help wanted'
                # We can also add 'good first issue'
                issues = repo.get_issues(state='open', labels=['help wanted'])
                
                for issue in issues:
                    # Simple matchmaking: check if any user skill is mentioned in the issue body or title
                    # Alternatively, check issue labels against skills
                    issue_text = f"{issue.title} {issue.body or ''}".lower()
                    issue_labels = [label.name.lower() for label in issue.labels]
                    
                    matched_skills = []
                    for skill in user_skills:
                        if skill in issue_text or skill in issue_labels:
                            matched_skills.append(skill)
                    
                    if matched_skills:
                        recommended_issues.append({
                            "alternative_name": alt.name,
                            "issue_title": issue.title,
                            "issue_url": issue.html_url,
                            "matched_skills": matched_skills,
                            "created_at": issue.created_at
                        })
            except Exception as e:
                # Log error and continue to the next alternative
                pass
                
        return recommended_issues

    def verify_and_record_contribution(self, user_profile: UserProfile, issue_or_pr_url: str):
        """
        Verifies if a PR or Issue was successfully completed/merged by the user,
        and records it in the verifiable contribution ledger.
        """
        try:
            repo_path = self._extract_repo_path(issue_or_pr_url)
            repo = self.g.get_repo(repo_path)
            
            # Extract issue/pr number from url (e.g., .../pull/123)
            number_str = issue_or_pr_url.rstrip('/').split('/')[-1]
            if not number_str.isdigit():
                return {"status": "error", "message": "Invalid issue/PR URL format."}
                
            number = int(number_str)
            
            # Check if it's a pull request or issue
            if '/pull/' in issue_or_pr_url:
                pr = repo.get_pull(number)
                if pr.merged and pr.user.login.lower() == user_profile.github_handle.lower():
                    # Record the contribution
                    alt = OpenSourceAlternative.objects.filter(repository_url__contains=repo_path).first()
                    if alt:
                        ContributionRecord.objects.get_or_create(
                            user=user_profile,
                            alternative=alt,
                            github_issue_or_pr_url=issue_or_pr_url,
                            defaults={
                                "title": pr.title,
                                "merged_at": pr.merged_at
                            }
                        )
                        return {"status": "success", "message": "PR verified and recorded."}
            else:
                # Issue closed by user (less strict than PR merge, but valid for some communities)
                issue = repo.get_issue(number)
                if issue.state == 'closed' and issue.assignee and issue.assignee.login.lower() == user_profile.github_handle.lower():
                    alt = OpenSourceAlternative.objects.filter(repository_url__contains=repo_path).first()
                    if alt:
                        ContributionRecord.objects.get_or_create(
                            user=user_profile,
                            alternative=alt,
                            github_issue_or_pr_url=issue_or_pr_url,
                            defaults={
                                "title": issue.title,
                                "merged_at": issue.closed_at
                            }
                        )
                        return {"status": "success", "message": "Issue verified and recorded."}
            
            return {"status": "pending", "message": "Contribution is not yet merged/closed or doesn't belong to this user."}
            
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def _extract_repo_path(self, url):
        """Extracts 'owner/repo' from 'https://github.com/owner/repo'"""
        parts = url.rstrip('/').split('github.com/')
        if len(parts) > 1:
            # We want the first two parts after github.com/
            path_parts = parts[1].split('/')
            if len(path_parts) >= 2:
                return f"{path_parts[0]}/{path_parts[1]}"
        return url

    def spawn_project_repository(self, user_token: str, spawn_request):
        """
        Creates a new GitHub repository for the authenticated user based on the spawn request,
        and injects the template files (README, LICENSE).
        Requires the user's OAuth token to create a repo on their behalf.
        """
        try:
            # We need an authenticated GitHub instance for the specific user
            user_g = Github(user_token)
            user = user_g.get_user()
            
            # 1. Create the repository
            repo_name = spawn_request.proposed_name.replace(" ", "-").lower()
            repo = user.create_repo(
                name=repo_name,
                description=spawn_request.description,
                private=False,
                auto_init=True # Initializes with an empty commit
            )
            
            # 2. Inject template files
            if spawn_request.template_used:
                template = spawn_request.template_used
                
                if template.readme_template:
                    # Customize README
                    custom_readme = template.readme_template.replace("{{PROJECT_NAME}}", spawn_request.proposed_name)
                    custom_readme = custom_readme.replace("{{TARGET_PRODUCT}}", spawn_request.target_proprietary_product.name)
                    
                    repo.create_file(
                        path="README.md",
                        message="Initial commit: Inject README template",
                        content=custom_readme,
                        branch="main"
                    )
                    
                if template.license_template:
                    repo.create_file(
                        path="LICENSE",
                        message="Initial commit: Add License",
                        content=template.license_template,
                        branch="main"
                    )

            # Update the spawn request status
            spawn_request.status = "COMPLETED"
            spawn_request.result_repository_url = repo.html_url
            spawn_request.save()
            
            # Also automatically register it as an OpenSourceAlternative
            from .models import OpenSourceAlternative
            OpenSourceAlternative.objects.create(
                name=spawn_request.proposed_name,
                repository_url=repo.html_url,
                description=spawn_request.description,
                target_proprietary_product=spawn_request.target_proprietary_product
            )

            return {"status": "success", "repository_url": repo.html_url}

        except Exception as e:
            spawn_request.status = "FAILED"
            spawn_request.error_message = str(e)
            spawn_request.save()
            return {"status": "error", "message": str(e)}
