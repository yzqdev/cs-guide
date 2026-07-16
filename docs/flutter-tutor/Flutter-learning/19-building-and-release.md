---
order: 19
---

# 构建与发布

## 1. Android 构建

### 生成签名密钥

```bash
# 创建密钥库
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key

# 或使用 Android Studio：构建 > 生成签名包/APK
```

### 配置签名

```groovy
// android/app/build.gradle
android {
    signingConfigs {
        release {
            keyAlias = keystoreProperties['keyAlias']
            keyPassword = keystoreProperties['keyPassword']
            storeFile = keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword = keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig = signingConfigs.release
            minifyEnabled = true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 构建 APK

```bash
# 构建 APK
flutter build apk

# 构建指定架构的 APK
flutter build apk --target-platform android-arm,android-arm64

# 构建 App Bundle（推荐用于 Play 商店）
flutter build appbundle

# 带版本号构建
flutter build apk --build-name=1.0.0 --build-number=1
```

### 配置应用信息

```groovy
// android/app/build.gradle
defaultConfig {
    applicationId "com.example.myapp"
    minSdkVersion 21
    targetSdkVersion 33
    versionCode flutterVersionCode.toInteger()
    versionName flutterVersionName
}
```

## 2. iOS 构建

### Xcode 配置

```bash
# 打开 Xcode 工作区
open ios/Runner.xcworkspace
```

在 Xcode 中配置：

- **签名与功能**：选择团队和 Bundle Identifier
- **部署信息**：设置最低 iOS 版本
- **应用图标**：添加应用图标

### 构建 IPA

```bash
# 清理
flutter clean

# 获取依赖
flutter pub get

# 构建 iOS（发布版）
flutter build ios

# 构建并导出 IPA（需要 Xcode）
flutter build ios --release --no-codesign
# 然后在 Xcode 中：Product > Archive > Distribute App
```

### Info.plist 配置

```xml
<!-- ios/Runner/Info.plist -->
<key>CFBundleDisplayName</key>
<string>我的应用</string>
<key>CFBundleIdentifier</key>
<string>com.example.myapp</string>
<key>CFBundleVersion</key>
<string>1</key>
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>NSCameraUsageDescription</key>
<string>此应用需要相机权限来拍照</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>此应用需要相册权限来上传图片</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>此应用需要位置信息来显示附近地点</string>
```

## 3. Web 构建

```bash
# 构建 Web
flutter build web

# 构建 Web（自定义 base href）
flutter build web --base-href=/myapp/

# 构建 Web（发布版）
flutter build web --release

# 输出目录：build/web/
```

### Web 配置

```html
<!-- web/index.html -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="theme-color" content="#2196F3" />
<link rel="manifest" href="manifest.json" />
```

## 4. Windows 构建

```bash
# 构建 Windows 桌面应用
flutter build windows

# 输出目录：build/windows/runner/Release/
```

## 5. 版本管理

```yaml
# pubspec.yaml
version: 1.0.0+1
# 格式：version_name+version_code
# version_name：用户可见的版本号 (1.0.0)
# version_code：内部构建编号 (1)
```

### 自动版本管理

```bash
# 使用 --build-name 和 --build-number
flutter build apk --build-name=1.2.3 --build-number=4
flutter build ios --build-name=1.2.3 --build-number=4
flutter build web --build-name=1.2.3 --build-number=4
```

## 6. 代码混淆

```bash
# Android ProGuard
flutter build apk --obfuscate --split-debug-info=debug_info

# iOS 符号表
flutter build ios --obfuscate --split-debug-info=debug_info

# 解码混淆后的堆栈跟踪
flutter symbolize --debug-info=debug_info --input=stack_trace.txt
```

## 7. 应用图标与启动画面

### 生成应用图标

```yaml
# pubspec.yaml
dev_dependencies:
  flutter_launcher_icons: ^0.13.1

flutter_launcher_icons:
  android: true
  ios: true
  image_path: 'assets/icon/app_icon.png'
  adaptive_icon_background: '#FFFFFF'
  adaptive_icon_foreground: 'assets/icon/foreground.png'
```

```bash
# 生成图标
flutter pub run flutter_launcher_icons
```

### 自定义启动画面

```yaml
# pubspec.yaml
dev_dependencies:
  flutter_native_splash: ^2.3.8

flutter_native_splash:
  color: '#FFFFFF'
  image: assets/splash/splash.png
  android: true
  ios: true
  web: true
  fullscreen: true
```

```bash
# 生成启动画面
flutter pub run flutter_native_splash:create
```

## 8. CI/CD 配置

### GitHub Actions 示例

```yaml
# .github/workflows/flutter-build.yml
name: Flutter 构建
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.x'

      - run: flutter pub get
      - run: flutter analyze
      - run: flutter test
      - run: flutter build apk --release
```

## 9. 发布检查清单

### Google Play 商店

- [ ] 生成签名密钥并妥善保管
- [ ] 配置 ProGuard 规则
- [ ] 构建 App Bundle (.aab)
- [ ] 准备应用截图（2-8张）
- [ ] 准备应用描述、关键词
- [ ] 设置定价和分发范围
- [ ] 完成内容评级问卷
- [ ] 创建 Google Play 控制台账户（$25）

### Apple App Store

- [ ] 拥有 Apple 开发者账户（$99/年）
- [ ] 配置证书、标识符和配置文件
- [ ] 构建并归档
- [ ] 准备截图（6.5寸、5.5寸、iPad）
- [ ] 填写应用信息（隐私政策 URL）
- [ ] 提交审核（通常1-2天）
