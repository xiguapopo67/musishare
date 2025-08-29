# GitHub Pages 部署指南

## 📋 部署前准备

### 1. 更新 package.json 中的 homepage

将 `package.json` 中的 `homepage` 字段更新为您的实际GitHub用户名：

```json
{
  "homepage": "https://your-actual-username.github.io/melon-music-share"
}
```

### 2. 确保仓库设置正确

1. 确保您的GitHub仓库是公开的（public）
2. 仓库名称应该是 `melon-music-share`

## 🚀 自动部署（推荐）

### 使用 GitHub Actions

项目已配置了自动部署工作流，当您推送代码到 `main` 分支时，会自动构建并部署到GitHub Pages。

1. 推送代码到GitHub：
```bash
git add .
git commit -m "Update for deployment"
git push origin main
```

2. 在GitHub仓库设置中启用GitHub Pages：
   - 进入仓库的 Settings 标签页
   - 找到 Pages 选项
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "gh-pages" 分支
   - 点击 Save

3. 等待部署完成（通常需要几分钟）

## 🔧 手动部署

### 方法1：使用 gh-pages 包

1. 安装依赖：
```bash
npm install
```

2. 部署：
```bash
npm run deploy
```

### 方法2：手动构建和上传

1. 构建项目：
```bash
npm run build
```

2. 将 `dist` 文件夹的内容上传到 `gh-pages` 分支

## 🔍 常见问题解决

### 1. 页面显示空白

**原因**：通常是路径问题
**解决方案**：
- 检查 `vite.config.ts` 中的 `base` 配置是否正确
- 确保 `package.json` 中的 `homepage` 字段正确

### 2. 资源文件404错误

**原因**：静态资源路径不正确
**解决方案**：
- 确保所有图片、CSS、JS文件都使用相对路径
- 检查 `vite.config.ts` 中的 `assetsDir` 配置

### 3. 路由问题

**原因**：SPA应用的路由在GitHub Pages上需要特殊处理
**解决方案**：
- 如果使用了React Router，需要配置 `basename`
- 或者使用 Hash Router

### 4. 部署后页面不更新

**原因**：浏览器缓存
**解决方案**：
- 强制刷新页面（Ctrl+F5）
- 清除浏览器缓存
- 等待几分钟后再次访问

## 📱 测试部署

部署完成后，您可以通过以下方式测试：

1. **桌面端测试**：
   - 访问 `https://your-username.github.io/melon-music-share`
   - 测试所有功能是否正常

2. **移动端测试**：
   - 使用手机浏览器访问
   - 测试APP跳转功能
   - 检查响应式布局

3. **功能测试**：
   - 测试音乐播放功能
   - 测试分享功能
   - 测试APP启动功能

## 🔒 安全注意事项

1. **API密钥**：不要在代码中硬编码API密钥
2. **环境变量**：使用环境变量管理敏感信息
3. **HTTPS**：GitHub Pages默认使用HTTPS

## 📞 技术支持

如果遇到部署问题，请检查：

1. GitHub Actions 日志是否有错误
2. 构建是否成功完成
3. GitHub Pages 设置是否正确
4. 网络连接是否正常

---

**注意**：首次部署可能需要等待5-10分钟才能生效。
