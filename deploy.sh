#!/bin/bash

# Process the backend
if [ -d "Backend" ]; then
    cd Backend
    npm install
    npm run vercel-build
    echo "backend finish"
    echo "before cd.. in backend part :$(pwd)"
    cd ..
    echo "after cd.. in backend part :$(pwd)"
else 
    echo "The backend folder not here"
    exit 1
fi

# Process the frontend
if [ -d "Frontend" ]; then
    cd Frontend
    npm install
    npm run build
    if [ -d "Frontend/dist" ]; then
        echo "The frontend build artifacts are in the Frontend/dist directory"
    else
        echo "The Frontend/dist directory for frontend build artifacts does not exist. Check the build process."
        exit 1
    fi
    echo "before cd.. in frontend part :$(pwd)"
    cd ..
    echo "after cd.. in frontend part :$(pwd)"
else
    echo "The Frontend folder does not exist"
    exit 1
fi