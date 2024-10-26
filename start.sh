#!/bin/bash

# Step 1: Navigate to the frontend directory and build the React app
echo "Building the React app..."
cd frontend

# Install frontend dependencies
npm install

# Build the React app
npm run build

# Step 2: Move the React build files to Django's static directory
echo "Copying the build files to the Django static directory..."
cd ..
cp -r frontend/build/static/

# Step 3: Navigate to the Django backend directory
cd mysite

# Step 4: Install Python dependencies
echo "Installing Python dependencies..."
pip install -r ../requirements.txt

# Step 5: Run database migrations
echo "Running Django migrations..."
python manage.py migrate

# Step 6: Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Step 7: Start the Django server with Gunicorn
echo "Starting the Django server with Gunicorn..."
gunicorn mysite.wsgi:application --bind 0.0.0.0:8000
