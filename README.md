# Melon Music Share - 音乐分享H5页面

一个模仿酷狗音乐分享页面的H5应用，支持音乐播放、分享和APP跳转功能。

## 🚀 功能特性

- 🎵 音乐播放器界面
- 📱 响应式设计，支持移动端
- 🔗 APP跳转功能（支持iOS和Android）
- 📤 社交分享功能
- 🎨 现代化UI设计
- ⚡ 基于Vite的快速构建

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **动画库**: Framer Motion
- **音频播放**: Howler.js
- **图标库**: React Icons

## 📦 安装和运行

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 🚀 GitHub Pages 部署

### 方法1：自动部署（推荐）

1. **推送代码到GitHub**：
```bash
git add .
git commit -m "Update for deployment"
git push origin main
```

2. **配置GitHub Pages**：
   - 进入GitHub仓库的 Settings 标签页
   - 找到 Pages 选项
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "gh-pages" 分支
   - 点击 Save

3. **等待部署完成**（通常需要几分钟）

### 方法2：手动部署

```bash
# 安装gh-pages（如果还没安装）
npm install --save-dev gh-pages

# 部署到GitHub Pages
npm run deploy
```

### 方法3：使用GitHub Actions

项目已配置自动部署工作流，当推送代码到 `main` 分支时会自动构建并部署。

## 🔧 配置说明

### 更新APP配置

编辑 `src/config/appConfig.ts` 文件，修改您的APP信息：

```typescript
export const MELON_APP_CONFIG: AppLaunchConfig = {
  iosUrlScheme: 'your-app://',           // iOS URL Scheme
  androidIntent: 'intent://your-app.com#Intent;scheme=your-app;package=com.your.app;end', // Android Intent
  iosAppStoreUrl: 'https://apps.apple.com/app/your-app/id123456789', // App Store链接
  androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.your.app', // Google Play链接
  webUrl: 'https://your-app.com',        // 网页版备用链接
  appName: 'Your App',                   // APP名称
  appIcon: '/icons/your-app-icon.png',   // APP图标
  description: 'Your app description'    // APP描述
};
```

### 更新package.json中的homepage

将 `package.json` 中的 `homepage` 字段更新为您的实际GitHub用户名：

```json
{
  "homepage": "https://your-actual-username.github.io/melon-music-share"
}
```

## 📱 支持的平台

| 平台 | 支持状态 | 说明 |
|------|----------|------|
| iOS Safari | ✅ 完全支持 | 使用URL Scheme |
| Android Chrome | ✅ 完全支持 | 使用Intent |
| Android Firefox | ✅ 完全支持 | 使用Intent |
| 桌面浏览器 | ✅ 支持 | 跳转到网页版 |
| 微信内置浏览器 | ⚠️ 部分支持 | 可能被限制 |
| QQ内置浏览器 | ⚠️ 部分支持 | 可能被限制 |

## 🔍 常见问题

### 1. 页面显示空白
- 检查 `vite.config.ts` 中的 `base` 配置是否正确
- 确保 `package.json` 中的 `homepage` 字段正确

### 2. APP跳转失败
- 检查URL Scheme是否正确配置
- 确认应用商店链接是否有效
- 检查设备类型检测是否准确

### 3. 部署后页面不更新
- 强制刷新页面（Ctrl+F5）
- 清除浏览器缓存
- 等待几分钟后再次访问

## 📁 项目结构

```
melon-music-share/
├── src/
│   ├── components/          # React组件
│   ├── config/             # 配置文件
│   ├── data/               # 模拟数据
│   ├── hooks/              # 自定义Hooks
│   ├── types/              # TypeScript类型定义
│   ├── utils/              # 工具函数
│   ├── App.tsx             # 主应用组件
│   └── main.tsx            # 应用入口
├── docs/                   # 文档
├── dist/                   # 构建输出
├── .github/workflows/      # GitHub Actions
└── package.json            # 项目配置
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

**注意**：首次部署可能需要等待5-10分钟才能生效。
