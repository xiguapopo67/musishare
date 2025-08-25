#!/bin/bash

# 音乐分享页面部署脚本

echo "🎵 开始构建音乐分享页面..."

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建结果
if [ -d "dist" ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于 dist/ 目录"
    echo ""
    echo "🚀 部署选项："
    echo "1. 静态文件服务器：将 dist/ 目录上传到你的服务器"
    echo "2. Vercel：运行 'vercel' 命令"
    echo "3. Netlify：将 dist/ 目录拖拽到 Netlify"
    echo "4. GitHub Pages：配置 GitHub Actions"
    echo ""
    echo "🌐 本地预览："
    echo "npm run preview"
else
    echo "❌ 构建失败！"
    exit 1
fi
