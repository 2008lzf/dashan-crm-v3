#!/bin/bash
echo "==========================================="
echo "🚀 Xiami Internal CRM v2.0 - 精准复刻版"
echo "==========================================="

cd "$(dirname "$0")"

# Backend
cd backend
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装后端依赖..."
    npm install
fi

echo "✨ 启动 Node.js 后端服务 (3001)..."
node index.js &

# Frontend
cd ../frontend
echo "🌐 正在打开前端页面 (精准复刻版)..."
open index.html
