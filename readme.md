# Full Stack Blog Project

A simple full-stack blog application built with:

- **Backend**: Django (no Django REST Framework, using built-in views and `JsonResponse`)
- **Frontend**: React (Chakra UI + React Query)
- **Authentication**: JWT (custom implementation)
- **Pagination**: Django `Paginator`

---

## **Project Structure**

```bash

project-root/
├── backend/        # Django app
│   ├── blog/       # Main blog app
│   ├── config/     # Django project config
│   ├── manage.py
│   └── venv/       # Python virtual environment
└── frontend/       # React app (Chakra UI + React Query)
```

## **Backend Setup (Django)**

```bash
cd backend
```

1. Create Virtual Environment

```bash
python -m venv venv
```

2. Activate Virtual Environment

```bash
   Windows:
   `venv\Scripts\activate`
   Linux/macOS:
   `source venv/Scripts/activate`
```

3. Install Dependencies

   ```bash
   pip install -r requirements.txt
   ```

4. Apply Migrations

   ```bash
    python manage.py migrate
   ```

5. Create Superuser (optional, for admin panel)

   ```bash
    python manage.py createsuperuser
   ```

6. Run Development Server
   ```bash
   python manage.py runserver
   ```

## **Frontend Setup (React)**

```bash
   cd frontend
```

7. Install Dependencies

```bash
   npm install
```

8. Start Development Server

```bash
   npm run dev
```
