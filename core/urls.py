from django.urls import path
from .views import SpawnProjectView, BenchmarksView, MatchmakingView, DashboardView

urlpatterns = [
    path('spawn/', SpawnProjectView.as_view(), name='spawn-project'),
    path('benchmarks/', BenchmarksView.as_view(), name='benchmarks'),
    path('matchmaking/', MatchmakingView.as_view(), name='matchmaking'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
