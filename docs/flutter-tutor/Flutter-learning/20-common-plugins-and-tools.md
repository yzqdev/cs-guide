---
order: 20
---

# 常用插件与工具

## 1. 状态管理

| 插件       | 说明                           | 安装                               |
| ---------- | ------------------------------ | ---------------------------------- |
| `provider` | 官方推荐的状态管理             | `flutter pub add provider`         |
| `riverpod` | Provider 的改进版              | `flutter pub add flutter_riverpod` |
| `bloc`     | 事件驱动的状态管理             | `flutter pub add flutter_bloc`     |
| `get`      | 功能全面的框架（路由+状态+DI） | `flutter pub add get`              |

## 2. 网络请求

| 插件                 | 说明                   | 安装                                 |
| -------------------- | ---------------------- | ------------------------------------ |
| `http`               | 基础 HTTP 请求         | `flutter pub add http`               |
| `dio`                | 功能丰富的 HTTP 客户端 | `flutter pub add dio`                |
| `graphql_flutter`    | GraphQL 客户端         | `flutter pub add graphql_flutter`    |
| `web_socket_channel` | WebSocket 支持         | `flutter pub add web_socket_channel` |

## 3. UI 组件

```yaml
# 常用 UI 库
dependencies:
  flutter_screenutil: ^5.9.0 # 屏幕适配
  cached_network_image: ^3.3.0 # 网络图片缓存
  shimmer: ^3.0.0 # 骨架屏效果
  lottie: ^2.7.0 # Lottie 动画
  flutter_swiper_view: ^1.1.8 # 轮播图
  badges: ^3.1.2 # 徽章
  flutter_slidable: ^3.0.1 # 滑动操作
  flutter_staggered_grid_view: ^0.7.0 # 交错网格
  video_player: ^2.8.2 # 视频播放
  flutter_rating_bar: ^4.0.1 # 评分组件
  fluttertoast: ^8.2.4 # Toast 提示
  loading_animation_widget: ^1.2.1 # 加载动画
  flutter_svg: ^2.0.9 # SVG 图片
  photo_view: ^0.15.0 # 图片查看器
```

### Lottie 动画

```dart
import 'package:lottie/lottie.dart';

Lottie.asset(
  'assets/animations/loading.json',
  width: 200,
  height: 200,
  fit: BoxFit.cover,
  repeat: true,
  reverse: true,
  animate: true,
)
```

### Shimmer 骨架屏

```dart
import 'package:shimmer/shimmer.dart';

Shimmer.fromColors(
  baseColor: Colors.grey.shade300,
  highlightColor: Colors.grey.shade100,
  child: Column(
    children: [
      Container(width: double.infinity, height: 16, color: Colors.white),
      const SizedBox(height: 8),
      Container(width: 200, height: 16, color: Colors.white),
    ],
  ),
)
```

## 4. 本地存储

```yaml
dependencies:
  shared_preferences: ^2.2.2 # 轻量级键值存储
  hive: ^2.2.3 # NoSQL 本地存储
  hive_flutter: ^1.1.0
  sqflite: ^2.3.0 # SQLite 数据库
  isar: ^3.1.0 # 高性能 NoSQL
  isar_flutter_libs: ^3.1.0
  secure_storage: ^0.0.1 # 安全存储（Token 等）
  flutter_secure_storage: ^9.0.0 # 安全存储
```

## 5. 工具类

```yaml
dependencies:
  intl: ^0.18.1 # 国际化/日期格式化
  equatable: ^2.0.5 # 值相等性
  freezed_annotation: ^2.4.1 # 不可变数据类
  collection: ^1.18.0 # 集合工具
  logger: ^2.0.2 # 日志记录
  uuid: ^4.2.1 # UUID 生成
  crypto: ^3.0.3 # 加密
  path_provider: ^2.1.1 # 文件路径
  url_launcher: ^6.2.2 # URL 启动
  share_plus: ^7.2.1 # 分享
  device_info_plus: ^9.1.0 # 设备信息
  package_info_plus: ^5.0.1 # 应用信息
  connectivity_plus: ^5.0.2 # 网络连接
```

### intl 使用

```dart
import 'package:intl/intl.dart';

class FormatUtil {
  static String formatDate(DateTime date) {
    return DateFormat('yyyy-MM-dd HH:mm:ss').format(date);
  }

  static String formatCurrency(double amount) {
    return NumberFormat.currency(symbol: '¥', decimalDigits: 2).format(amount);
  }

  static String formatNumber(int number) {
    return NumberFormat('#,###').format(number);
  }

  static String timeAgo(DateTime dateTime) {
    final diff = DateTime.now().difference(dateTime);
    if (diff.inDays > 0) return '${diff.inDays}天前';
    if (diff.inHours > 0) return '${diff.inHours}小时前';
    if (diff.inMinutes > 0) return '${diff.inMinutes}分钟前';
    return '刚刚';
  }
}
```

### logger 使用

```dart
import 'package:logger/logger.dart';

final logger = Logger(
  printer: PrettyPrinter(
    methodCount: 0,
    errorMethodCount: 8,
    lineLength: 120,
    colors: true,
    printEmojis: true,
    printTime: true,
  ),
);

// 使用
logger.v('详细日志');
logger.d('调试日志');
logger.i('信息日志');
logger.w('警告日志');
logger.e('错误日志', error: exception, stackTrace: stackTrace);
logger.wtf('严重失败');
```

## 6. 开发工具

```yaml
dev_dependencies:
  flutter_lints: ^3.0.1 # 代码检查
  flutter_test: # 测试框架
    sdk: flutter
  json_serializable: ^6.7.1 # JSON 序列化
  build_runner: ^2.4.8 # 代码生成器
  mockito: ^5.4.4 # Mock 测试
  flutter_launcher_icons: ^0.13.1 # 应用图标生成
  flutter_native_splash: ^2.3.8 # 启动画面
  retrofit_generator: ^8.0.1 # API 代码生成
  injectable_generator: ^2.4.1 # 依赖注入代码生成
```

## 7. Flutter DevTools（开发者工具）

```bash
# 启动 DevTools
flutter pub global activate devtools
flutter devtools

# 或从 VS Code 启动：命令面板 > Flutter: 打开 DevTools
```

### DevTools 功能

- **Flutter Inspector**：查看 Widget 树、布局调试
- **性能**：性能分析、帧率监控
- **内存**：内存使用分析
- **网络**：网络请求监控
- **调试器**：Dart 调试器
- **日志**：日志查看器

```dart
// 性能标志
import 'package:flutter/rendering.dart';

// 显示布局边界
debugPaintSizeEnabled = true;

// 显示重绘边界
debugPaintBaselinesEnabled = true;

// 性能叠加层
PerformanceOverlay.allEnabled = true;
```

## 8. 推荐 VS Code 扩展

| 扩展                     | ID                              | 用途              |
| ------------------------ | ------------------------------- | ----------------- |
| Flutter                  | `Dart-Code.flutter`             | Flutter 核心支持  |
| Dart                     | `Dart-Code.dart-code`           | Dart 语言支持     |
| Awesome Flutter Snippets | `Nash.awesome-flutter-snippets` | 代码片段          |
| Bloc                     | `felix.boc`                     | Bloc 状态管理支持 |
| Pubspec Assist           | `jeroen-meijer.pubspec-assist`  | 包管理助手        |
| Flutter Widget Snippets  | `alexisvt.flutter-snippets`     | Widget 片段       |
| Error Lens               | `usernamehw.errorlens`          | 内联错误高亮      |
