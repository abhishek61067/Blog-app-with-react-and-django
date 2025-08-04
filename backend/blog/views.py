import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.contrib.auth import get_user_model, authenticate
from .auth_decorators import jwt_required
from .models import Post
from .jwt_utils import generate_access_token, generate_refresh_token




User = get_user_model()

# --- Auth Views ---
@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return JsonResponse({'error': 'Username and password required'}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'User already exists'}, status=400)
        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({'message': 'User created successfully'}, status=201)
    return JsonResponse({'error': 'Invalid request'}, status=400)

from .jwt_utils import generate_access_token, generate_refresh_token

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            access_token = generate_access_token(user)
            refresh_token = generate_refresh_token(user)
            return JsonResponse({
                'access': access_token,
                'refresh': refresh_token,
                'username': user.username
            })
        return JsonResponse({'error': 'Invalid credentials'}, status=401)
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
@jwt_required
def logout(request):
    if request.method == 'POST':
        # With stateless JWT, logout just means removing tokens on the client
        return JsonResponse({'message': 'Logged out successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request'}, status=400)


@csrf_exempt
def refresh_token(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        refresh_token = data.get('refresh')
        payload = decode_jwt(refresh_token)
        if not payload or payload.get('type') != 'refresh':
            return JsonResponse({'error': 'Invalid or expired refresh token'}, status=401)
        user_id = payload.get('id')
        user = User.objects.get(id=user_id)
        new_access = generate_access_token(user)
        return JsonResponse({'access': new_access})
    return JsonResponse({'error': 'Invalid request'}, status=400)



# --- Post Views ---
def list_posts(request):
    if request.method == 'GET':
        posts = Post.objects.all().order_by('-created_at')
        paginator = Paginator(posts, 2)  # 2 per page for now
        page_number = request.GET.get('page', 1)
        page_obj = paginator.get_page(page_number)

        posts_data = [{
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'author': p.author.username,
            'created_at': p.created_at
        } for p in page_obj]

        return JsonResponse({
            'posts': posts_data,
            'page': page_obj.number,
            'has_next': page_obj.has_next(),
            'has_previous': page_obj.has_previous(),
            'total_pages': paginator.num_pages,
            'total': paginator.count
        })
    return JsonResponse({'error': 'Invalid request'}, status=400)


def get_post_detail(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        return JsonResponse({
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'author': post.author.username,
            'created_at': post.created_at
        })
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)

@csrf_exempt
@jwt_required
def create_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data.get('title')
        content = data.get('content')
        if not title or not content:
            return JsonResponse({'error': 'Title and content required'}, status=400)
        post = Post.objects.create(title=title, content=content, author=request.user)
        return JsonResponse({'id': post.id, 'title': post.title, 'content': post.content}, status=201)
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
@jwt_required
def update_post(request, post_id):
    if request.method == 'PUT':
        try:
            post = Post.objects.get(id=post_id)
            if post.author != request.user:
                return JsonResponse({'error': 'Forbidden','message':"Only authors can edit the post"}, status=403)
            data = json.loads(request.body)
            post.title = data.get('title', post.title)
            post.content = data.get('content', post.content)
            post.save()
            return JsonResponse({'message': 'Post updated'})
        except Post.DoesNotExist:
            return JsonResponse({'error': 'Post not found'}, status=404)
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
@jwt_required
def delete_post(request, post_id):
    if request.method == 'DELETE':
        try:
            post = Post.objects.get(id=post_id)
            if post.author != request.user:
               return JsonResponse({'error': 'Forbidden','message':"Only authors can edit the post"}, status=403)
            post.delete()
            return JsonResponse({'message': 'Post deleted'})
        except Post.DoesNotExist:
            return JsonResponse({'error': 'Post not found'}, status=404)
    return JsonResponse({'error': 'Invalid request'}, status=400)


