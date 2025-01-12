#!/bin/bash
if[ -d "Frontend" ];then
  echo "Enter Frontend folder"
  cd Frontend
  npm install || exit 1
  npm run build || exit 1
  echo "Frontend build good,exited"
  cd ..
else
  echo "Frontend folder not existed"
  exit 1
fi

if[ -d "Backend" ];then
  echo "Entering Backend folder"
  cd Backend
  npm install || exit 1
  npm start || exit 1
  echo "Backend service started"
  cd..
else
  echo "Backend folder not existed"
  exit 1
fi
