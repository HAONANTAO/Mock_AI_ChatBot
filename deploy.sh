#!/bin/bash

if [ -d "Frontend" ]; then
  cd Frontend
  npm install && npm run build || exit 1
  cd..
else
  exit 1
fi

if [ -d "Backend" ]; then
  cd Backend && npm start || exit 1
  cd..
else
  exit 1
fi