# APP启动器使用指南

## 📱 功能概述

APP启动器工具可以帮助您的H5页面在手机端点击按钮时跳转到指定的原生APP。支持iOS和Android平台，如果APP未安装会自动跳转到应用商店。

## 🚀 快速开始

### 1. 基本使用

```typescript
import { openApp, melonAppConfig } from './utils/appLauncher';

// 在按钮点击事件中调用
const handleOpenApp = () => {
  openApp(melonAppConfig);
};
```

### 2. 配置您的APP

编辑 `src/config/appConfig.ts` 文件，修改 `MELON_APP_CONFIG` 中的配置：

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

## 🔧 配置说明

### URL Scheme 配置

#### iOS URL Scheme
- 格式：`your-app://`
- 示例：`melon://`, `kugou://`, `qqmusic://`

#### Android Intent
- 格式：`intent://domain#Intent;scheme=scheme;package=package.name;end`
- 示例：`intent://melon.app#Intent;scheme=melon;package=com.melon.app;end`

### 应用商店链接

#### App Store (iOS)
- 格式：`https://apps.apple.com/app/app-name/id{APP_ID}`
- 获取方式：在App Store中搜索您的APP，复制链接中的ID

#### Google Play (Android)
- 格式：`https://play.google.com/store/apps/details?id={PACKAGE_NAME}`
- 获取方式：在Google Play中搜索您的APP，复制链接中的包名

## 📋 支持的APP配置

项目已预配置了以下音乐APP：

1. **Melon** - 默认配置
2. **酷狗音乐** - `KUGOU_APP_CONFIG`
3. **网易云音乐** - `NETEASE_APP_CONFIG`
4. **QQ音乐** - `QQ_MUSIC_APP_CONFIG`

### 切换APP配置

```typescript
import { getAppConfig } from './config/appConfig';

// 使用酷狗音乐配置
const kugouConfig = getAppConfig('kugou');
openApp(kugouConfig);

// 使用网易云音乐配置
const neteaseConfig = getAppConfig('netease');
openApp(neteaseConfig);
```

## 🛠️ 高级功能

### 1. 检测APP是否已安装

```typescript
import { checkAppInstalled } from './utils/appLauncher';

const checkApp = async () => {
  const isInstalled = await checkAppInstalled(melonAppConfig);
  if (isInstalled) {
    console.log('APP已安装');
  } else {
    console.log('APP未安装');
  }
};
```

### 2. 显示自定义提示

```typescript
import { showAppNotInstalledMessage } from './utils/appLauncher';

const handleAppNotInstalled = () => {
  showAppNotInstalledMessage(melonAppConfig);
};
```

### 3. 设备检测

```typescript
import { detectDevice } from './utils/appLauncher';

const device = detectDevice();
console.log('设备信息:', device);
// 输出: { isIOS: true, isAndroid: false, isMobile: true }
```

## 🔍 调试技巧

### 1. 测试URL Scheme

在浏览器控制台中测试：

```javascript
// iOS测试
window.location.href = 'melon://';

// Android测试
window.location.href = 'intent://melon.app#Intent;scheme=melon;package=com.melon.app;end';
```

### 2. 查看设备信息

```javascript
console.log('User Agent:', navigator.userAgent);
console.log('Platform:', navigator.platform);
```

### 3. 常见问题排查

- **APP无法打开**：检查URL Scheme是否正确
- **跳转失败**：确认应用商店链接是否有效
- **桌面端测试**：使用浏览器开发者工具的设备模拟功能

## 📱 平台兼容性

| 平台 | 支持状态 | 说明 |
|------|----------|------|
| iOS Safari | ✅ 完全支持 | 使用URL Scheme |
| Android Chrome | ✅ 完全支持 | 使用Intent |
| Android Firefox | ✅ 完全支持 | 使用Intent |
| 桌面浏览器 | ✅ 支持 | 跳转到网页版 |
| 微信内置浏览器 | ⚠️ 部分支持 | 可能被限制 |
| QQ内置浏览器 | ⚠️ 部分支持 | 可能被限制 |

## 🔒 安全注意事项

1. **URL Scheme安全**：确保URL Scheme的唯一性，避免与其他APP冲突
2. **HTTPS要求**：iOS 9+要求使用HTTPS进行APP跳转
3. **用户隐私**：在跳转前告知用户即将离开当前页面
4. **降级处理**：始终提供网页版作为备用方案

## 📞 技术支持

如果您在使用过程中遇到问题，请检查：

1. URL Scheme是否正确配置
2. 应用商店链接是否有效
3. 设备类型检测是否准确
4. 浏览器是否支持相关功能

---

**注意**：请根据您的实际APP信息替换配置中的示例链接和包名。
