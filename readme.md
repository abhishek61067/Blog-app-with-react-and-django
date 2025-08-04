# Full Stack Blog Project

A simple full-stack blog application built with:

- **Backend**: Django (no Django REST Framework, using built-in views and `JsonResponse`)
- **Frontend**: React (Chakra UI + React Query)
- **Authentication**: JWT (custom implementation)
- **Pagination**: Django `Paginator`

---

## **Project Structure**

project-root/
├── backend/ # Django app
│ ├── blog/ # Main blog app
│ ├── config/ # Django project config
│ ├── manage.py
│ └── venv/ # Python virtual environment
└── frontend/ # React app (Chakra UI + React Query)

## **Backend Setup (Django)**

### 1. Create Virtual Environment

From the `backend/` folder:

```bash
python -m venv venv
```

2. Activate Virtual Environment
   Windows:
   venv\Scripts\activate
   Linux/macOS:
   source venv/bin/activate

3. Install Dependencies
   pip install -r requirements.txt

4. Apply Migrations
   python manage.py migrate

5. Create Superuser (optional, for admin panel)
   python manage.py createsuperuser

6. Run Development Server
   python manage.py runserver

## **Frontend Setup (React)**

7. Install Dependencies
   From the frontend/ folder:
   npm install
8. Start Development Server
   npm run dev
