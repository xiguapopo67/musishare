# 音乐分享 H5 页面

一个模仿酷狗音乐分享页面的现代化 H5 应用，具有美观的 UI 设计和丰富的交互功能。

## ✨ 功能特性

- 🎵 **音乐分享页面**: 模仿酷狗音乐分享页面的落地页设计
- 🎨 **简洁界面**: 采用黑色背景配合绿色主题色的现代设计
- 📱 **移动端适配**: 完美适配移动设备，支持触摸操作
- 🎤 **歌词预览**: 支持歌词滚动显示和预览
- 📤 **分享功能**: 支持分享到微信、QQ、微博等平台
- 🎭 **动画效果**: 使用 Framer Motion 实现流畅的动画效果
- 🎧 **下载引导**: 提供下载APP和打开应用的引导按钮

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **动画库**: Framer Motion
- **音频播放**: Howler.js
- **图标库**: React Icons
- **UI组件**: Ant Design Mobile

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── components/          # 组件目录
│   ├── MusicPlayer.tsx  # 音乐播放器组件
│   ├── ShareModal.tsx   # 分享模态框组件
│   └── LyricsDisplay.tsx # 歌词显示组件
├── hooks/               # 自定义 Hooks
│   └── useMusicPlayer.ts # 音乐播放器 Hook
├── types/               # TypeScript 类型定义
│   └── music.ts         # 音乐相关类型
├── data/                # 数据文件
│   └── mockData.ts      # 模拟音乐数据
├── App.tsx              # 主应用组件
├── main.tsx             # 应用入口
└── index.css            # 全局样式
```

## 🎯 核心功能实现

### 音乐播放器
- 使用 Howler.js 处理音频播放
- 支持进度条拖拽和点击跳转
- 实现音量控制和静音功能
- 支持循环播放和随机播放

### 分享功能
- 支持分享到主流社交平台
- 生成分享链接和二维码
- 复制链接到剪贴板

### 歌词显示
- 实时歌词滚动和高亮
- 支持点击跳转到指定时间
- 平滑的动画过渡效果

## 🎨 设计特色

### 视觉设计
- **玻璃拟态效果**: 使用 backdrop-filter 实现毛玻璃效果
- **渐变背景**: 动态渐变背景增强视觉层次
- **圆角设计**: 统一的圆角设计语言
- **阴影效果**: 多层次阴影营造立体感

### 交互设计
- **流畅动画**: 使用 Framer Motion 实现 60fps 动画
- **触觉反馈**: 按钮点击和悬停效果
- **响应式布局**: 完美适配各种屏幕尺寸

## 📱 移动端优化

- 触摸友好的按钮尺寸
- 支持手势操作
- 优化移动端音频播放体验
- 适配不同设备的屏幕密度

## 🔧 配置说明

### 环境变量
项目支持以下环境变量配置：

```env
VITE_API_BASE_URL=你的API地址
VITE_APP_TITLE=音乐分享
```

### 自定义主题
可以在 `tailwind.config.js` 中修改主题色彩：

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1db954',    // 主色调
      secondary: '#191414',  // 次要色调
      accent: '#ff6b35',     // 强调色
    }
  }
}
```

## 🚀 部署

### 静态部署
构建完成后，将 `dist` 目录部署到任何静态文件服务器即可。

### Vercel 部署
```bash
npm install -g vercel
vercel
```

### Netlify 部署
将构建后的文件拖拽到 Netlify 即可自动部署。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目仅供学习交流使用，请勿用于商业用途。

## 🙏 致谢

- [Howler.js](https://howlerjs.com/) - 优秀的音频处理库
- [Framer Motion](https://www.framer.com/motion/) - 强大的动画库
- [Tailwind CSS](https://tailwindcss.com/) - 实用的 CSS 框架
- [React Icons](https://react-icons.github.io/react-icons/) - 丰富的图标库

---

如果这个项目对你有帮助，请给个 ⭐️ 支持一下！
