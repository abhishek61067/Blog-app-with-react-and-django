from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .jwt_utils import decode_jwt

User = get_user_model()

def jwt_required(view_func):
    def wrapper(request, *args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Authorization header missing'}, status=401)
        token = auth_header.split(' ')[1]
        data = decode_jwt(token)
        if not data:
            return JsonResponse({'error': 'Invalid or expired token'}, status=401)
        try:
            request.user = User.objects.get(id=data['id'])
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=401)
        return view_func(request, *args, **kwargs)
    return wrapper
