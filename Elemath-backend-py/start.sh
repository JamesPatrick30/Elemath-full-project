#!/bin/bash

# Activate virtual environment
source /root/Elemath-full-project/Elemath-backend-py/venv/bin/activate

# Go to project directory
cd /root/Elemath-full-project/Elemath-backend-py

# Run Uvicorn in production mode (no --reload)
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4