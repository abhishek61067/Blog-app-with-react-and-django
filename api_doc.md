api_doc.md

# Blog API Documentation

## Base URL

http://localhost:8000/

---

## Authentication

- **Public Endpoints:** `/register/`, `/login/`, `/posts/`, `/posts/<id>/`
- **Authenticated Endpoints:** `/posts/` (POST), `/posts/<id>/` (PUT, DELETE)
- **Authentication Method:** Bearer Token (JWT)

---

## Endpoints

```json

1. Register User

Endpoint: `POST /register/`
Description: Register a new user (Public)

Sample Request


{
  "username": "john_doe",
  "password": "securepassword"
}

Sample Response

{
  "message": "User registered successfully",
  "user_id": 1
}

2. Login
Endpoint: POST /login/
Description: Return JWT for valid credentials (Public)

Sample Request

{
  "username": "john_doe",
  "password": "securepassword"
}
Sample Response

{
  "access": "<jwt_access_token>",
  "refresh": "<jwt_refresh_token>",
  "username":"john_doe"
}

3. Get All Posts
Endpoint: GET /posts/
Description: Fetch all posts (Public)

Sample Response

[
  {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content of the post",
    "author": "john_doe",
    "created_at":"2025-02-09"
  }
],


4. Get Post Details
Endpoint: GET /posts/<id>/
Description: Fetch post details by ID (Public)

Sample Response

{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of the post",
  "author": "john_doe",
  "created_at":"2025-02-09"
}

5. Create Post
Endpoint: POST /posts/
Description: Create new post (Authenticated)

Sample Request

{
  "title": "New Post",
  "content": "This is my new post content"
}
Sample Response

{
  "id": 2,
  "title": "New Post",
  "content": "This is my new post content",
  "author": "john_doe",
  "created_at":"2025-02-09",
}
6. Edit Post
Endpoint: PUT /posts/<id>/update
Description: Edit a post (only author) (Authenticated)

Sample Request

{
  "title": "Updated Title",
  "content": "Updated content here"
}
Sample Response

{
  "id": 2,
  "title": "Updated Title",
  "content": "Updated content here",
  "author": "john_doe",
  "created_at":"2025-02-09"
}
7. Delete Post
Endpoint: DELETE /posts/<id>/delete
Description: Delete a post (only author) (Authenticated)

Sample Response

{
  "message": "Post deleted successfully"
}



```
