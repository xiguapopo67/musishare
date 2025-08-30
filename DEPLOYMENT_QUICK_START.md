# 🚀 快速部署指南

## 步骤1：更新配置

### 1.1 更新package.json中的homepage

将 `package.json` 中的 `homepage` 字段更新为您的实际GitHub用户名：

```json
{
  "homepage": "https://your-actual-username.github.io/musishare"
}
```

**重要**：请将 `your-actual-username` 替换为您的真实GitHub用户名。

### 1.2 更新APP配置（可选）

如果您想使用自己的APP配置，编辑 `src/config/appConfig.ts` 文件。

## 步骤2：推送代码到GitHub

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Ready for deployment"

# 推送到GitHub
git push origin main
```

## 步骤3：配置GitHub Pages

1. 进入您的GitHub仓库页面
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **Deploy from a branch**
5. 在 **Branch** 下拉菜单中选择 **gh-pages**
6. 点击 **Save**

## 步骤4：等待部署

- GitHub Actions会自动构建和部署您的项目
- 通常需要等待5-10分钟
- 您可以在 **Actions** 标签页查看部署进度

## 步骤5：访问您的网站

部署完成后，您可以通过以下地址访问您的网站：

```
https://your-actual-username.github.io/musishare
```

## 🔧 故障排除

### 如果页面显示空白

1. 检查 `package.json` 中的 `homepage` 是否正确
2. 确保仓库是公开的（public）
3. 等待几分钟后再次访问

### 如果部署失败

1. 检查GitHub Actions日志
2. 确保所有依赖都已正确安装
3. 检查构建是否成功

### 如果APP跳转不工作

1. 检查 `src/config/appConfig.ts` 中的配置
2. 确保URL Scheme和应用商店链接正确
3. 在移动设备上测试

## 📱 测试建议

1. **桌面端测试**：使用浏览器访问网站
2. **移动端测试**：使用手机浏览器访问
3. **APP跳转测试**：点击"Open Melon"按钮测试跳转功能

---

**提示**：如果您需要自定义域名，可以在GitHub Pages设置中添加自定义域名。
