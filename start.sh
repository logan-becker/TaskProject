#!/bin/bash

# Navigate to the Django project directory
cd mysite

# Run database migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Start the Django app with Gunicorn, binding to Render's $PORT
gunicorn djangoproject1.wsgi:application --bind 0.0.0.0:$PORT
