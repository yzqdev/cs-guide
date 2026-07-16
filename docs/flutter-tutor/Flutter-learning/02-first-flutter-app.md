---
order: 2
---

# 第一个 Flutter 应用

## 1. main.dart 入口点

```dart
import 'package:flutter/material.dart';

// 应用入口点
void main() {
  runApp(const MyApp());
}
```

## 2. MaterialApp 配置

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter 演示',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter 演示主页'),
    );
  }
}
```

### 常用 MaterialApp 属性

| 属性                         | 说明             |
| ---------------------------- | ---------------- |
| `title`                      | 应用标题         |
| `theme`                      | 主题配置         |
| `home`                       | 首页 Widget      |
| `routes`                     | 命名路由表       |
| `initialRoute`               | 初始路由         |
| `debugShowCheckedModeBanner` | 是否显示调试横幅 |
| `locale`                     | 本地化设置       |
| `supportedLocales`           | 支持的语言列表   |

## 3. StatefulWidget vs StatelessWidget

### StatelessWidget（无状态组件）

```dart
class MyStatelessWidget extends StatelessWidget {
  const MyStatelessWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('我是无状态的');
  }
}
```

### StatefulWidget（有状态组件）

```dart
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('你点击了按钮这么多次:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: '增加',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## 4. Scaffold 布局骨架

```dart
Scaffold(
  appBar: AppBar(
    title: const Text('页面标题'),
    leading: const Icon(Icons.menu),
    actions: [
      IconButton(icon: const Icon(Icons.search), onPressed: () {}),
    ],
  ),
  body: const Center(child: Text('正文内容')),
  floatingActionButton: FloatingActionButton(
    onPressed: () {},
    child: const Icon(Icons.add),
  ),
  bottomNavigationBar: BottomNavigationBar(
    items: const [
      BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
      BottomNavigationBarItem(icon: Icon(Icons.settings), label: '设置'),
    ],
  ),
  drawer: Drawer(
    child: ListView(
      children: const [
        DrawerHeader(child: Text('菜单')),
        ListTile(title: Text('项目 1')),
        ListTile(title: Text('项目 2')),
      ],
    ),
  ),
)
```

## 5. pubspec.yaml 配置

```yaml
name: my_app
description: 一个新的 Flutter 项目。
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6
  http: ^1.1.0 # 网络请求
  provider: ^6.1.1 # 状态管理

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1

flutter:
  uses-material-design: true

  assets:
    - assets/images/
    - assets/data.json

  fonts:
    - family: MyFont
      fonts:
        - asset: fonts/MyFont-Regular.ttf
```

## 6. 热重载与热重启

| 功能     | 快捷键 (VS Code)             | 说明                     |
| -------- | ---------------------------- | ------------------------ |
| 热重载   | `Ctrl+F5`                    | 保存时自动触发，保留状态 |
| 热重启   | `Shift+F5`                   | 完全重启应用，重置状态   |
| 完全重启 | 停止后重新运行 `flutter run` | 重新编译所有代码         |

### 热重载注意事项

- 添加/删除 Widget 代码可以通过热重载应用
- 修改 `main()` 函数需要热重启
- 修改静态变量需要热重启
- 修改 `enum` 或类型定义需要热重启
