---
order: 1
---

# 跨平台框架

## 主流跨平台方案对比

| 框架 | 开发语言 | 性能 | 适用场景 | 维护方 |
|------|---------|------|---------|-------|
| **Capacitor** | JS/TS | 中 | Web 技术栈转原生 App | Ionic |
| **React Native** | JS/TS | 高 | 跨平台移动应用 | Meta |
| **Flutter** | Dart | 高 | 跨平台 UI | Google |
| **uni-app** | Vue/JS | 中 | 多端统一开发 | DCloud |
| **NativeScript** | JS/TS | 高 | 原生 API 调用 | Progress |

## Capacitor

> 将 Web 应用打包为原生 App，支持热加载。

### 安装

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
```

### 热加载

```bash
ionic capacitor run android -l --external
```

### 打包

```bash
# 方式一：直接运行
npx cap run android

# 方式二：手动打包
npm run build              # 生成 dist 文件夹
npx cap sync               # 同步到 Android 工程
npx cap open android       # 用 Android Studio 打开
```

### 参考

- [Capacitor 官方文档](https://capacitorjs.com/)
- [Live Reload 文档](https://capacitorjs.com/docs/guides/live-reload)
- [Ionic Live Reload](https://ionicframework.com/docs/cli/livereload)

## React Native

> 使用 React 构建原生移动应用。

### 常用命令

```bash
# 初始化项目
npx react-native init MyApp

# 运行 Android
npx react-native run-android

# 运行 iOS
npx react-native run-ios
```

### 核心概念

```jsx
import { View, Text, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello React Native</Text>
  </View>
);
```

## uni-app

> 一套代码发布到 iOS、Android、H5、小程序等多端。

### 参考链接

- [官网](https://uniapp.dcloud.net.cn/)
- [小程序支持](https://nativesupport.dcloud.net.cn/)
- [插件市场](https://ext.dcloud.net.cn/)
- [uView UI](https://www.uviewui.com/)
- [uView Plus](https://uiadmin.net/uview-plus/)
- [luch-request](https://www.quanzhan.co/luch-request/handbook/)

### 打包

```bash
# 生成签名证书
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore

# 查看证书信息
keytool -list -v -keystore test.keystore
```

### 生命周期

| 钩子 | 说明 |
|------|------|
| `onLoad` | 页面加载，只执行一次，可获取参数 |
| `onShow` | 页面显示，每次显示都执行 |
| `onReady` | 页面初次渲染完成 |
| `onHide` | 页面隐藏 |
| `onUnload` | 页面卸载 |

### 注意事项

- 安卓离线打包需使用 [App 离线 SDK](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android)
- 需要申请 [AppKey](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey)
- 运行环境版本与编译器版本需一致