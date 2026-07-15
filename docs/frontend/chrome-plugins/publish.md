# 发布到 Chrome Web Store

完成插件开发后，可以发布到 Chrome Web Store 供其他用户安装使用。

## 准备工作

### 1. 注册开发者账号

1. 访问 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. 使用 Google 账号登录
3. 一次性支付 **$5 注册费**（需要国际信用卡/借记卡）

### 2. 打包插件

生成 `.zip` 或 `.crx` 文件：

```bash
# 直接打包 dist 目录
zip -r extension.zip dist/

# 或通过 Node 脚本
```

### 3. 准备素材

| 素材 | 要求 |
|---|---|
| 图标 | 128x128 PNG，< 1MB |
| 截图 | 至少 1 张，1280x800 或 640x400 PNG/JPEG，< 2MB |
| 宣传图片 | 可选，440x280 PNG |
| 详细介绍 | 英文/中文描述，最长 132 字符的简短描述 + 详细描述 |

## 发布流程

### 步骤 1：创建新项目

1. 进入 [开发者控制台](https://chrome.google.com/webstore/devconsole)
2. 点击 **New Item**
3. 上传插件的 `.zip` 包

### 步骤 2：填写信息

**Store Listing** 页面需要填写：

```
- 名称（Name）：最长 45 字符
- 简短描述（Short description）：最长 132 字符
- 详细描述（Detailed description）：
  - 功能说明
  - 使用方式
  - 权限说明
- 类别（Category）：
  - Productivity / Developer Tools / Accessibility 等
- 语言（Language）：默认英语，可添加多语言
- 图标（Icon）：128x128
- 截图（Screenshots）：至少 1 张
- 宣传图片（Promotional images）：可选
```

### 步骤 3：隐私和安全

**Privacy** 页面需要声明：

1. **透明度**：
   - 插件收集哪些数据
   - 数据用途
   - 数据分享政策

2. **权限说明**：
   - 解释为什么需要每个权限
   - 使用 `activeTab` 替代 `tabs` + `<all_urls>` 减少权限

3. **远程代码**：
   - V3 禁止远程代码，确保所有代码在包内

### 步骤 4：定价和分发

- **Free**：免费
- **Free with in-app purchases**：免费 + 内购（需配置 Payments）
- **Paid**：付费（仅部分国家/地区支持）

分发范围：
- **Public**：所有人可用
- **Unlisted**：只有链接的人可用
- **Private**：仅指定域名用户可用（需 G Suite）

### 步骤 5：提交审核

1. 点击 **Submit for Review**
2. 审核时间：通常 1-3 个工作日
3. 审核通过后自动发布

## 审核常见问题

### 常见拒绝原因

| 问题 | 解决方案 |
|---|---|
| 权限过于宽泛 | 使用 `activeTab` 替代 `tabs` + `<all_urls>` |
| 权限未合理说明 | 在描述和隐私页面解释权限用途 |
| 功能过于简单 | 增加更多功能或与现有插件差异化 |
| 使用远程代码 | V3 必须将所有代码打包 |
| 侵犯版权 | 不使用未授权的商标/版权内容 |
| 收集敏感信息 | 明确的隐私政策，加密传输 |

### 审核退回处理

1. 查看审核邮件中的具体原因
2. 修改后重新提交
3. 可在 [Chromium 论坛](https://groups.google.com/a/chromium.org/forum/#!forum/chromium-extensions) 申诉

## 版本更新

```json
{
  "version": "1.0.1",
  "name": "My Extension",
  "description": "更新说明"
}
```

```javascript
// background.js
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'update') {
    const prevVersion = details.previousVersion;
    const currVersion = chrome.runtime.getManifest().version;
    console.log(`从 ${prevVersion} 更新到 ${currVersion}`);

    // 显示更新日志
    chrome.tabs.create({ url: 'whats-new.html' });
  }
});
```

更新流程：
1. 更新版本号（必须大于之前的版本）
2. 重新打包
3. 在开发者控制台上传新包
4. 输入更新说明
5. 提交审核

## 统计数据

开发者控制台提供：

- **安装量**：每日/每周/每月/总计
- **卸载量**：分析卸载原因
- **评分**：平均评分和评价列表
- **错误报告**：用户报告的崩溃信息
- **营收**：付费和内购收入

## 推广建议

1. **SEO 优化**：在插件名称和描述中包含关键词
2. **社交推广**：在 GitHub、Twitter、Reddit 等平台分享
3. **截图和视频**：高质量的宣传素材
4. **多语言支持**：使用 `chrome.i18n` 支持多语言
5. **评价管理**：及时回复用户评价

## 企业发布

企业可以通过以下方式部署：

- **Chrome Browser Cloud Management**：管理控制台策略
- **Group Policy**：Windows GPO 部署
- **MDM**：移动设备管理
- **ExtensionInstallForcelist**：强制安装列表

```json
// 企业策略示例
{
  "ExtensionSettings": {
    "abcdefghijklmnopabcdefghijklmnop": {
      "installation_mode": "force_installed",
      "update_url": "https://clients2.google.com/service/update2/crx"
    }
  }
}
```

## 参考链接

- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [Publishing Guide](https://developer.chrome.com/docs/webstore/publish/)
- [Best Practices](https://developer.chrome.com/docs/webstore/best_practices/)
- [Review Guidelines](https://developer.chrome.com/docs/webstore/checklist/)
