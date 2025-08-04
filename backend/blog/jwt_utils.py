import jwt
import datetime
from django.conf import settings

def generate_access_token(user):
    payload = {
        'id': user.id,
        'username': user.username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        'iat': datetime.datetime.utcnow(),
        'type': 'access'
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

def generate_refresh_token(user):
    payload = {
        'id': user.id,
        'username': user.username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow(),
        'type': 'refresh'
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

def decode_jwt(token):
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
