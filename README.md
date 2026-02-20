# Ayomide Taiwo - Portfolio

A personal portfolio website built with Django, featuring skills showcase, project gallery, and contact form functionality.

## Features

- **About Section**: Personal introduction and bio
- **Skills Display**: Visual representation of technical skills with Cloudinary-hosted images
- **Projects Gallery**: Showcase of projects with GitHub and live demo links
- **Contact Form**: Email-enabled contact form using Django REST Framework
- **Dark Mode**: Theme toggle for light/dark mode
- **Responsive Design**: Mobile-friendly layout with modern CSS

## Tech Stack

- **Backend**: Django 5.2+
- **Database**: SQLite (development) / PostgreSQL (production)
- **Media Storage**: Cloudinary
- **Frontend**: HTML5, CSS3, JavaScript
- **UI Framework**: Bootstrap 5
- **Admin Theme**: Django Jazzmin

## Getting Started

### Prerequisites

- Python 3.10+
- Poetry (for dependency management)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   poetry install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Run migrations**
   ```bash
   cd portfolio
   python manage.py migrate
   ```

5. **Create a superuser** (for admin access)
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the application**
   - Website: http://127.0.0.1:8000/
   - Admin: http://127.0.0.1:8000/admin/

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | Django secret key for cryptographic signing |
| `DEBUG` | Enable/disable debug mode (True/False) |
| `ALLOWED_HOSTS` | Comma-separated list of allowed hosts |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `EMAIL_HOST` | SMTP server host |
| `EMAIL_USE_SSL` | Use SSL for email (True/False) |
| `EMAIL_PORT` | SMTP server port |
| `EMAIL_HOST_USER` | Email address for sending |
| `EMAIL_HOST_PASSWORD` | Email app password |

## Project Structure

```
Portfolio/
├── .env.example          # Environment variables template
├── pyproject.toml        # Poetry dependencies
├── portfolio/
│   ├── manage.py         # Django management script
│   ├── portfolio/        # Main Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── Core/             # Main application
│   │   ├── models.py     # Database models
│   │   ├── views.py      # View functions
│   │   ├── urls.py       # URL routing
│   │   ├── admin.py      # Admin configuration
│   │   └── serializers.py
│   ├── templates/        # HTML templates
│   ├── static/           # Static files (CSS, JS, images)
│   └── media/            # Uploaded media files
```

## License

This project is for personal portfolio use.

## Author

**Ayomide Taiwo**
- GitHub: [@Constantine1824](https://github.com/Constantine1824)
