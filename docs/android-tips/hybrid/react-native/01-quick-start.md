---
order: 1
---

# React Native 快速开始

## 环境要求

- Node.js 18+
- Java 17 (Android)
- Android Studio (Android 开发)
- Xcode (iOS 开发，仅 macOS)

## 创建项目

```bash
# 使用 React Native CLI
npx @react-native-community/cli init MyApp

# 或使用模板
npx @react-native-community/cli init MyApp --template react-native-template-typescript
```

## 常用命令

```bash
# 运行 Android
npx react-native run-android

# 运行 iOS
npx react-native run-ios

# 指定设备/模拟器
npx react-native run-android --deviceId=emulator-5554
npx react-native run-ios --simulator="iPhone 15"

# 发布模式
npx react-native run-android --variant=release

# 启动 Metro bundler
npx react-native start

# 清除缓存
npx react-native start --reset-cache
```

## 项目结构

```
MyApp/
├── android/          # Android 原生工程
├── ios/              # iOS 原生工程
├── src/              # 源代码
│   ├── components/   # 组件
│   ├── screens/      # 页面
│   ├── navigation/   # 导航
│   └── utils/        # 工具
├── App.tsx           # 入口组件
├── package.json
└── tsconfig.json
```

## 添加依赖

```bash
# 导航
npm install @react-navigation/native @react-navigation/native-stack

# 网络请求
npm install axios

# 本地存储
npm install @react-native-async-storage/async-storage

# 图标
npm install react-native-vector-icons

# 图片加载
npm install react-native-fast-image
```

## 常见问题

### 1. Metro 缓存问题

```bash
# 清除缓存
npx react-native start --reset-cache
cd android && ./gradlew clean
```

### 2. Gradle 版本不匹配

```bash
# 查看 Gradle 版本
cd android && ./gradlew --version

# 修改 android/gradle/wrapper/gradle-wrapper.properties
# 修改 android/build.gradle 中的 Gradle 插件版本
```

### 3. 真机调试

```bash
# 在手机上打开开发者模式
# 连接 USB 并开启 USB 调试
# 运行
npx react-native run-android

# 如无法连接，尝试反向代理
adb reverse tcp:8081 tcp:8081
```