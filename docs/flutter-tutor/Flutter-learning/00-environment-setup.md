---
order: 0
---

# 环境搭建与配置

## 1. 系统要求

| 操作系统 | 版本要求            |
| -------- | ------------------- |
| Windows  | Windows 10+ (64位)  |
| macOS    | macOS 10.15+        |
| Linux    | Linux 桌面版 (64位) |

## 2. 安装 Flutter SDK

### Windows

```bash
# 下载 Flutter SDK
# 访问 https://flutter.dev/docs/get-started/install/windows
# 解压到 C:\src\flutter

# 配置环境变量
# 将 C:\src\flutter\bin 添加到 PATH

# 验证安装
flutter doctor
```

### macOS

```bash
# 通过 Homebrew 安装
brew install --cask flutter

# 或手动下载解压
# 下载后解压到 ~/development/flutter

# 配置环境变量（添加到 ~/.zshrc 或 ~/.bashrc）
export PATH="$PATH:$HOME/development/flutter/bin"

# 验证安装
flutter doctor
```

### Linux

```bash
# 下载 SDK
cd ~
tar xf flutter_linux_*.tar.xz

# 配置环境变量（~/.bashrc）
export PATH="$PATH:$HOME/flutter/bin"

# 验证
flutter doctor
```

## 3. 安装编辑器

### VS Code

```bash
# 安装 Flutter 扩展
# 扩展 ID: Dart-Code.flutter
```

### Android Studio

```bash
# 下载 Android Studio
# 安装 Flutter 插件：文件 > 设置 > 插件 > Flutter
# 安装 Dart 插件
```

## 4. 配置 Android 开发环境

```bash
# 安装 Android SDK
# 通过 Android Studio > SDK 管理器

# 接受 Android 许可
flutter doctor --android-licenses

# 设置 Android 环境变量
# ANDROID_HOME：Android SDK 路径
```

## 5. 配置 iOS 开发环境（仅 macOS）

```bash
# 安装 Xcode（App Store）
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch

# 安装 CocoaPods
sudo gem install cocoapods
```

## 6. 配置 Chrome（Web 开发）

```bash
# 安装 Chrome 浏览器
# Flutter 支持使用 Chrome 进行 Web 开发调试
```

## 7. 创建第一个项目

```bash
# 创建项目
flutter create my_first_app

# 进入项目目录
cd my_first_app

# 运行项目（默认使用 Chrome）
flutter run

# 在指定设备上运行
flutter run -d chrome     # Web
flutter run -d windows    # Windows 桌面
flutter run -d android    # Android
```

## 8. 常用命令参考

| 命令                        | 说明              |
| --------------------------- | ----------------- |
| `flutter create <name>`     | 创建新项目        |
| `flutter run`               | 运行项目          |
| `flutter build apk`         | 构建 Android APK  |
| `flutter build ios`         | 构建 iOS 应用     |
| `flutter build web`         | 构建 Web 应用     |
| `flutter build windows`     | 构建 Windows 应用 |
| `flutter pub get`           | 获取依赖          |
| `flutter pub add <package>` | 添加依赖          |
| `flutter clean`             | 清理构建缓存      |
| `flutter upgrade`           | 升级 Flutter 版本 |
| `flutter devices`           | 列出可用设备      |

## 9. 项目结构

```
my_app/
├── android/          # Android 原生代码
├── ios/              # iOS 原生代码
├── lib/              # Dart 源码目录
│   └── main.dart     # 入口文件
├── test/             # 测试文件
├── web/              # Web 配置
├── windows/          # Windows 桌面配置
├── pubspec.yaml      # 项目配置文件
└── analysis_options.yaml  # 代码分析配置
```
