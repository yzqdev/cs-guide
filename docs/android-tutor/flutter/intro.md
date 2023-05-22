# flutter介绍

:::tip
官网包括移动版和桌面版 [官网](https://flutter.dev/)
:::

## 说明

Flutter 是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。

- 快速开发  
毫秒级的热加载，修改后，您的应用界面会立即更新。使用丰富的、完全可定制的widget 在几分钟内构件原生界面
富有表现力和灵活的UI  
快速发布聚焦原生体验的功能。分层的架构允许您完全自定义，从而实现难以置信的快速渲染和富有表现力、灵活的设计。
- 原生性能  
Flutter 包含了许多核心的 widget，如滚动、导航、图表和字体等，这些都可以在iOS和Android上达到原生应用一样的性能。
- 跨平台引擎

:::tip
国内网络原因,部分依赖可能无法下载,需要设置两个环境变量

```env
FLUTTER_STORAGE_BASE_URL: https://storage.flutter-io.cn
PUB_HOSTED_URL: https://pub.flutter-io.cn
```

:::

## 常用命令

```powershell
# 给现有的项目添加支持
flutter create --platforms=windows,macos,linux .

# 创建flutter应用
flutter create my_app
# 创建包名
flutter create --org com.yzq.mobile.study --project-name mini_calendar --platforms=android  .
flutter create --org com.yourdomain your_app_name
# 运行程序
flutter run 
flutter run -d windows
flutter run -d macos
flutter run -d linux
flutter run -d chrome
# 发布
flutter build windows
flutter build web
flutter build apk --release

# 分开打包
flutter build apk --split-per-abi
# 升级flutter
flutter upgrade
# 加入flutter windows支持(注意最后一个点)
flutter create --platforms=windows .
flutter config --enable-windows-desktop . 
flutter config --enable-linux-desktop .
# 查看设备
flutter devices
# 查看是否有问题
flutter doctor
```

## 依赖管理

安装插件(from github)

```yml
  window_size:
    git:
      url: https://github.com/google/flutter-desktop-embedding.git
      path: plugins/window_size
      ref: "master"
```

```shell
flutter pub get
# pub get命令

# 用于检索当前 Package 所依赖的其它 Package。如果 pubspec.lock 文件已经存在，则根据该文件中保存的依赖项版本获取对应的依赖项。如有必要，将会创建或更新该文件。
flutter pu outdated
# pub outdated命令
# 查看当前软件包所依赖的每个 package，确定哪些 package 的依赖项已过时，并为您提供有关如何更新它们的建议。当您要更新 package 的依赖性时，请使用此命令。
flutter pub upgrade
# pub upgrade命令
# 用于检索当前 Package 所依赖的其它 Package 的最新版本。如果 pubspec.lock 文件已经存在，则忽略其保存的版本并以 pubspec 文件中指定的最新版本为主。如有必要，将会创建或更新该文件。
```

## 注意事项

在谷歌浏览器运行,有时候会有错误,可以手动设置port和localhost

```shell
flutter run -d chrome --web-port=8080 --web-hostname=127.0.0.1
```

在android studio中,如何在android studio中运行chrome web, 以便支持热更新, 进行以下配置:

Run> Run...>Edit configurations> Additional run args 增加参数: `--web-port=8080 --web-hostname=127.0.0.1`
