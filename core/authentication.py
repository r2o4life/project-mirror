from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from supabase import create_client, Client
from .models import UserProfile

class SupabaseAuthentication(BaseAuthentication):
    """
    Custom authentication class for Django REST Framework that validates
    Supabase JWT tokens and links them to the UserProfile model.
    """

    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None # Authentication not attempted

        token = auth_header.split(' ')[1]
        
        try:
            supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
            user_response = supabase.auth.get_user(token)
            
            if not user_response or not user_response.user:
                raise AuthenticationFailed('Invalid or expired token.')
                
            user = user_response.user
            
            # Map Supabase user to our Django UserProfile
            profile, created = UserProfile.objects.get_or_create(
                supabase_uid=user.id,
                defaults={
                    'github_handle': user.email.split('@')[0] if user.email else f"user_{user.id[:8]}"
                }
            )
            
            return (profile, token)
        except Exception as e:
            raise AuthenticationFailed(f'Supabase authentication error: {str(e)}')
