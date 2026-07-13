# Dart 命令

## 安装全局工具

```bash
# 激活全局工具
dart pub global activate webdev

# 列出全局工具
dart pub global list

# 删除全局工具
dart pub global deactivate webdev
```

## 常用命令

```bash
# 创建项目
dart create my_app

# 运行
dart run

# 编译
dart compile exe bin/myapp.dart   # 打包为 exe
dart compile js bin/myapp.dart    # 编译为 JS
dart compile aot-snapshot bin/myapp.dart  # AOT 快照

# 分析代码
dart analyze

# 格式化
dart format .

# 测试
dart test

# 依赖管理
dart pub get
dart pub upgrade
dart pub outdated
dart pub add package_name
dart pub remove package_name
```

## 资源

- Dart 官网：https://dart.dev
- Pub 包管理：https://pub.dev
- 全局工具文档：https://dart.dev/tools/pub/cmd/pub-global
