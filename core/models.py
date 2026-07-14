from django.db import models

class ProprietaryProduct(models.Model):
    """Tracks target proprietary software (e.g., Slack, Jira)."""
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    website_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class OpenSourceAlternative(models.Model):
    """Links an OSS project to a ProprietaryProduct."""
    name = models.CharField(max_length=255, unique=True)
    repository_url = models.URLField(unique=True)
    description = models.TextField(blank=True)
    target_proprietary_product = models.ForeignKey(
        ProprietaryProduct, 
        on_delete=models.CASCADE, 
        related_name="alternatives"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class FeatureParity(models.Model):
    """Checklists comparing features of the proprietary product vs. the open-source alternative."""
    class StatusChoices(models.TextChoices):
        PLANNED = 'PLANNED', 'Planned'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        COMPLETED = 'COMPLETED', 'Completed'

    alternative = models.ForeignKey(
        OpenSourceAlternative, 
        on_delete=models.CASCADE, 
        related_name="feature_parities"
    )
    feature_name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=50, 
        choices=StatusChoices.choices, 
        default=StatusChoices.PLANNED
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.alternative.name} - {self.feature_name} ({self.status})"

class SkillRegistry(models.Model):
    """Taxonomy of skills (e.g., Python, React, DevOps)."""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    """Extended profile linked to Supabase Auth UUID."""
    supabase_uid = models.UUIDField(unique=True)
    github_handle = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True)
    skills = models.ManyToManyField(SkillRegistry, related_name="users", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.github_handle or str(self.supabase_uid)

class ContributionRecord(models.Model):
    """Verifiable ledger of completed PRs/Issues pulled from GitHub."""
    user = models.ForeignKey(
        UserProfile, 
        on_delete=models.CASCADE, 
        related_name="contributions"
    )
    alternative = models.ForeignKey(
        OpenSourceAlternative, 
        on_delete=models.CASCADE, 
        related_name="contributions"
    )
    github_issue_or_pr_url = models.URLField(unique=True)
    title = models.CharField(max_length=255)
    merged_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.alternative.name}: {self.title}"

class ProjectSpawnTemplate(models.Model):
    """Boilerplate configurations for spawning projects (e.g., License, README)."""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    tech_stack_tags = models.ManyToManyField(SkillRegistry, blank=True)
    # The actual content of templates could be stored as JSON or text fields
    readme_template = models.TextField(blank=True)
    license_template = models.TextField(blank=True)

    def __str__(self):
        return self.name

class ProjectSpawnRequest(models.Model):
    """Tracks the status of a user launching a new alternative."""
    class StatusChoices(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        SPAWNING = 'SPAWNING', 'Spawning'
        COMPLETED = 'COMPLETED', 'Completed'
        FAILED = 'FAILED', 'Failed'

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="spawn_requests")
    target_proprietary_product = models.ForeignKey(ProprietaryProduct, on_delete=models.CASCADE)
    template_used = models.ForeignKey(ProjectSpawnTemplate, on_delete=models.SET_NULL, null=True, blank=True)
    
    proposed_name = models.CharField(max_length=255)
    description = models.TextField()
    
    status = models.CharField(
        max_length=50, 
        choices=StatusChoices.choices, 
        default=StatusChoices.PENDING
    )
    result_repository_url = models.URLField(blank=True, null=True)
    error_message = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Spawn {self.proposed_name} by {self.user} - {self.status}"

class ProjectHealthLog(models.Model):
    """Time-series data of commit velocity, issue resolution time, and active contributors."""
    alternative = models.ForeignKey(OpenSourceAlternative, on_delete=models.CASCADE, related_name="health_logs")
    recorded_at = models.DateTimeField(auto_now_add=True)
    
    # Metrics
    open_issues = models.IntegerField(default=0)
    stars = models.IntegerField(default=0)
    forks = models.IntegerField(default=0)
    
    # We could calculate a composite 'health score' (0-100)
    health_score = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.alternative.name} Health - {self.recorded_at.date()}"

class LicenseProvenance(models.Model):
    """Tracking of accepted Contributor License Agreements (CLAs)."""
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    alternative = models.ForeignKey(OpenSourceAlternative, on_delete=models.CASCADE)
    
    agreed_to_cla = models.BooleanField(default=False)
    agreed_at = models.DateTimeField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    class Meta:
        unique_together = ('user', 'alternative')

    def __str__(self):
        return f"CLA: {self.user} -> {self.alternative.name}"
