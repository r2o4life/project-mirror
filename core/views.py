from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import ProprietaryProduct, ProjectSpawnTemplate, ProjectSpawnRequest, UserProfile, OpenSourceAlternative, ProjectHealthLog
from .github_service import GitHubService

class BenchmarksView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        products = ProprietaryProduct.objects.all()
        data = []
        for p in products:
            alts = OpenSourceAlternative.objects.filter(target_proprietary_product=p)
            data.append({
                "id": p.id,
                "name": p.name,
                "category": "Software",  # Fallback since category field is removed
                "alternatives": [{"id": a.id, "name": a.name, "feature_parity_score": 0} for a in alts]
            })
        return Response(data)

class MatchmakingView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        import random
        # Select up to 10 random alternatives from the DB to mock live issues for
        alts = list(OpenSourceAlternative.objects.order_by('?')[:10])
        issues = []
        mock_issues = [
            ("Fix navigation bug", ["React", "TypeScript"]),
            ("Add dark mode toggle", ["CSS", "Frontend"]),
            ("Improve database query performance", ["Python", "SQL"]),
            ("Implement OAuth2 login", ["Backend", "Security"]),
            ("Write unit tests for core module", ["Testing", "QA"])
        ]
        for alt in alts:
            issue_text, tags = random.choice(mock_issues)
            issues.append({
                "repo": alt.name,
                "issue": issue_text,
                "tags": tags
            })
            
        if not issues:
            issues = [
                {"repo": "Plane", "issue": "Fix navigation bug", "tags": ["React", "TypeScript"]},
                {"repo": "AppFlowy", "issue": "Add dark mode toggle", "tags": ["Flutter", "Dart"]}
            ]
        return Response(issues)

class DashboardView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        total_alts = OpenSourceAlternative.objects.count()
        total_props = ProprietaryProduct.objects.count()
        
        return Response({
            "global_health_score": 94,
            "active_developers": 1204,
            "signed_clas": "89%",
            "total_open_source_projects": total_alts,
            "total_proprietary_products": total_props
        })

class SpawnProjectView(APIView):
    """
    API View to handle the 'Spawn a Competitor' wizard.
    Requires authentication.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        user_profile = request.user # Populated by SupabaseAuthentication
        
        target_product_name = data.get('target_product_name')
        template_id = data.get('template_id')
        proposed_name = data.get('proposed_name')
        description = data.get('description')
        github_token = data.get('github_token')

        if not all([target_product_name, proposed_name, description, github_token]):
            return Response({"error": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)

        proprietary_product, _ = ProprietaryProduct.objects.get_or_create(
            name=target_product_name,
            defaults={'description': f"User spawned target product for {proposed_name}"}
        )
        
        template = None
        if template_id:
            template = get_object_or_404(ProjectSpawnTemplate, id=template_id)

        # 1. Create the spawn request record
        spawn_request = ProjectSpawnRequest.objects.create(
            user=user_profile,
            target_proprietary_product=proprietary_product,
            template_used=template,
            proposed_name=proposed_name,
            description=description,
            status=ProjectSpawnRequest.StatusChoices.SPAWNING
        )

        # 2. Trigger the GitHub automated repository creation
        github_service = GitHubService()
        result = github_service.spawn_project_repository(github_token, spawn_request)

        if result['status'] == 'success':
            return Response({
                "message": "Project successfully spawned!",
                "repository_url": result['repository_url'],
                "spawn_request_id": spawn_request.id
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "error": "Failed to spawn project on GitHub.",
                "details": result['message'],
                "spawn_request_id": spawn_request.id
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
