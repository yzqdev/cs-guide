# Dart 包管理

[官方文档](https://dart.dev/tools/pub/versioning)

## pubspec.yaml

每个 Dart/Flutter 项目根目录都有一个 `pubspec.yaml` 文件，定义项目的元数据和依赖。

```yaml
name: my_app
description: 一个 Dart 应用
version: 1.0.0
publish_to: none # 不发布到 pub.dev

environment:
  sdk: '>=3.0.0 <4.0.0' # SDK 版本范围

dependencies:
  http: ^1.1.0          # 常规依赖
  path: ^1.8.0
  flutter:
    sdk: flutter        # Flutter SDK 依赖

dev_dependencies:
  test: ^1.24.0         # 仅开发环境使用
  lints: ^3.0.0
  flutter_test:
    sdk: flutter
```

## 常用 pub 命令

### 获取依赖

```bash
# 根据 pubspec.yaml 下载依赖
dart pub get

# 在 Flutter 项目中
flutter pub get
```

### 添加/移除依赖

```bash
# 添加依赖
dart pub add http
dart pub add path

# 添加 dev 依赖
dart pub add --dev test

# 添加指定版本
dart pub add http@^1.1.0

# 移除依赖
dart pub remove http
```

### 更新依赖

```bash
# 查看可更新的包
dart pub outdated

# 更新所有依赖（在 pubspec.yaml 约束范围内）
dart pub upgrade

# 更新到最新版本（忽略 pubspec.yaml 约束）
dart pub upgrade --major-versions

# 更新特定包
dart pub upgrade http
```

### 其他命令

```bash
# 分析项目
dart analyze

# 格式化代码
dart format .

# 运行测试
dart test

# 编译为可执行文件
dart compile exe bin/main.dart
```

## 版本管理

### 版本约束语法

| 语法 | 含义 | 示例 |
|------|------|------|
| `^1.2.3` | 乐观版本（>=1.2.3 <2.0.0） | `^1.0.0` |
| `>=1.0.0 <2.0.0` | 范围约束 | `>=1.0.0 <2.0.0` |
| `any` | 任意版本 | `any` |
| `1.2.3` | 精确版本 | `1.2.3` |
| `>=1.0.0` | 最小版本 | `>=1.0.0` |

```yaml
dependencies:
  # 乐观版本约束（推荐）
  http: ^1.1.0       # >=1.1.0 且 <2.0.0

  # 范围约束
  path: '>=1.8.0 <2.0.0'

  # 精确版本
  collection: 1.17.0

  # Git 仓库依赖
  my_package:
    git:
      url: https://github.com/example/my_package.git
      ref: main # 分支或 tag

  # 本地路径依赖
  my_local_package:
    path: ../my_local_package
```

## 环境变量配置

### 配置镜像源

由于网络原因，国内需要配置镜像以提高依赖下载速度。

```bash
# 配置 PUB_HOSTED_URL 环境变量
export PUB_HOSTED_URL=https://pub.flutter-io.cn

# Windows PowerShell
$env:PUB_HOSTED_URL='https://pub.flutter-io.cn'
```

### 配置包缓存路径

```bash
# 设置 PUB_CACHE 指定依赖包下载位置
PUB_CACHE=D:\flutter\.pub-cache

# Dart 默认缓存：%LOCALAPPDATA%\Pub\Cache
# Flutter 默认缓存：flutter\.pub-cache

# 设置 PUB_CACHE 后，dart pub get 会使用该路径
```

## 依赖管理最佳实践

### 锁文件（pubspec.lock）

`pubspec.lock` 记录了实际安装的精确版本号，应提交到版本控制。

```yaml
# pubspec.lock 示例（自动生成，不要手动修改）
packages:
  http:
    dependency: "direct main"
    source: hosted
    version: "1.1.0"
  path:
    dependency: "direct main"
    source: hosted
    version: "1.8.3"
```

### 依赖类型

```yaml
dependencies:
  # 主依赖：应用运行必须
  http: ^1.1.0

dev_dependencies:
  # 开发依赖：仅开发/测试时需要
  test: ^1.24.0
  build_runner: ^2.4.0
  json_serializable: ^6.7.0

dependency_overrides:
  # 覆盖约束：强制使用特定版本（解决冲突）
  collection: 1.17.0
```

### 常用依赖

```yaml
dependencies:
  # HTTP 请求
  http: ^1.1.0
  # JSON 序列化
  json_annotation: ^4.8.0
  # 状态管理
  provider: ^6.1.0
  # 路由
  go_router: ^12.0.0
  # 日志
  logging: ^1.2.0

dev_dependencies:
  # 测试
  test: ^1.24.0
  # 代码生成
  build_runner: ^2.4.0
  json_serializable: ^6.7.0
  # 代码规范
  lints: ^3.0.0
```

## 编译为可执行文件

```bash
# 编译为 JIT（默认，需要 SDK 运行）
dart run bin/main.dart

# 编译为 AOT 可执行文件
dart compile exe bin/main.dart -o my_app

# 编译为 AOT 共享库
dart compile aot-snapshot bin/main.dart

# 编译为 JS（Web 项目）
dart compile js bin/main.dart

# 输出文件在 build/ 目录下
./my_app  # Windows: my_app.exe
```
