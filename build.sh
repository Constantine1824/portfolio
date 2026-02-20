#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

cd portfolio

# Collect static files
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate

# Create superuser from env vars (skips if user already exists)
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_EMAIL" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
    python manage.py createsuperuser --no-input || echo "Superuser already exists, skipping."
fi
