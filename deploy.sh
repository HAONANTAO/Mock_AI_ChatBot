#!/bin/bash
# 进入前端文件夹，安装依赖并构建
if [ -d "Frontend" ]; then
    echo "Entering Frontend folder"
    cd Frontend
    npm install || exit 1
    npm run build || exit 1
    echo "Frontend build completed, exiting Frontend folder"
    cd..
else
    echo "Frontend folder does not exist."
    exit 1
fi

# 进入后端文件夹，安装依赖并启动服务
if [ -d "Backend" ]; then
    echo "Entering Backend folder"
    cd Backend
    npm install || exit 1
    npm start || exit 1
    echo "Backend service started, exiting Backend folder"
    cd..
else
    echo "Backend folder does not exist."
    exit 1
fi