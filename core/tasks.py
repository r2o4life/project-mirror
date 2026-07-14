from celery import shared_task
from .models import OpenSourceAlternative, ProjectHealthLog, UserProfile, ContributionRecord, LicenseProvenance
from .github_service import GitHubService
from django.utils import timezone

@shared_task
def sync_repository_health_metrics():
    """
    Background task to run periodically (e.g., daily) to fetch repository 
    stats for all active OpenSourceAlternatives and log them into ProjectHealthLog.
    """
    github_service = GitHubService()
    active_alternatives = OpenSourceAlternative.objects.filter(is_active=True)
    
    for alt in active_alternatives:
        stats = github_service.get_repo_stats(alt.repository_url)
        
        if "error" not in stats:
            # Calculate a basic health score:
            # Simple heuristic: more stars, forks, and manageable open issues means better health.
            # E.g., (stars * 1.5) + (forks * 2) - (open_issues * 0.5) scaled/normalized
            raw_score = (stats.get("stars", 0) * 1.5) + (stats.get("forks", 0) * 2) - (stats.get("open_issues", 0) * 0.5)
            health_score = max(0.0, min(100.0, raw_score / 100)) # Normalized mock calculation for 0-100 scale

            ProjectHealthLog.objects.create(
                alternative=alt,
                open_issues=stats.get("open_issues", 0),
                stars=stats.get("stars", 0),
                forks=stats.get("forks", 0),
                health_score=health_score
            )

@shared_task
def verify_pending_contributions():
    """
    Background task to scan for recent GitHub activity and verify 
    if a user's pending contributions were merged/closed.
    """
    # In a real-world scenario, we might use webhooks for real-time verification.
    # For periodic syncing, we check all users with pending tracked URLs (simplified).
    pass # Implementation depends on how we track "pending" URLs initially.

@shared_task
def verify_cla_compliance(user_profile_id, alternative_id):
    """
    Background task to verify if a user has signed the CLA for a given project
    before their PR is accepted.
    """
    try:
        user = UserProfile.objects.get(id=user_profile_id)
        alt = OpenSourceAlternative.objects.get(id=alternative_id)
        
        provenance = LicenseProvenance.objects.filter(user=user, alternative=alt).first()
        if provenance and provenance.agreed_to_cla:
            return {"status": "compliant", "message": "CLA is signed."}
        else:
            # In real scenario, trigger a GitHub PR comment asking them to sign
            return {"status": "non_compliant", "message": "CLA not signed."}
            
    except Exception as e:
        return {"status": "error", "message": str(e)}
