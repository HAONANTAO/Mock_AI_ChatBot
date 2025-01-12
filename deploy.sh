#!/bin/bash
# 进入前端文件夹，安装依赖并构建
cd Backend
npm install
npm run build
cd..
# 进入后端文件夹，安装依赖并启动服务
cd Frontend
npm install
npm start
cd..