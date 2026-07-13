# Flutter 实用技巧

## 一、常用命令

```bash
# 创建项目
flutter create my_app

# 运行
flutter run
flutter run --release
flutter run -d chrome   # Web 端

# 清理
flutter clean

# 依赖
flutter pub get
flutter pub add package_name
flutter pub remove package_name
flutter pub upgrade

# 分析代码
flutter analyze

# 测试
flutter test

# 构建
flutter build apk
flutter build appbundle
flutter build ios
flutter build web
```

## 二、Dart 基础速查

```dart
// 变量
var name = 'Flutter';
final version = 3.16;
const pi = 3.14159;

// 空安全
String? nullable;
nullable?.length ?? 0;

// 函数
int add(int a, int b) => a + b;

// 异步
Future<String> fetchData() async {
    await Future.delayed(Duration(seconds: 1));
    return 'data';
}
```

## 三、Widget 结构

```dart
import 'package:flutter/material.dart';

void main() {
    runApp(const MyApp());
}

class MyApp extends StatelessWidget {
    const MyApp({super.key});

    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            title: 'Flutter Demo',
            theme: ThemeData(
                primarySwatch: Colors.blue,
                useMaterial3: true,
            ),
            home: const MyHomePage(),
        );
    }
}

class MyHomePage extends StatefulWidget {
    const MyHomePage({super.key});

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
            appBar: AppBar(title: const Text('Flutter Demo')),
            body: Center(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                        const Text('点击次数：'),
                        Text(
                            '$_counter',
                            style: Theme.of(context).textTheme.headlineMedium,
                        ),
                    ],
                ),
            ),
            floatingActionButton: FloatingActionButton(
                onPressed: _incrementCounter,
                child: const Icon(Icons.add),
            ),
        );
    }
}
```

## 四、常用 Widget

```dart
// Container —— 容器
Container(
    width: 100,
    height: 100,
    margin: EdgeInsets.all(8),
    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [BoxShadow(color: Colors.grey, blurRadius: 4)],
    ),
    child: const Text('Hello'),
)

// Row / Column —— 布局
Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [Icon(Icons.star), Text('评分'), Text('4.5')],
)

// ListView —— 列表
ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, index) {
        return ListTile(
            leading: Icon(Icons.person),
            title: Text(items[index].name),
            trailing: Icon(Icons.arrow_forward),
            onTap: () => print('点击 ${items[index].name}'),
        );
    },
)

// Stack —— 层叠
Stack(
    children: [
        Image.network('https://example.com/bg.jpg'),
        Positioned(
            bottom: 16,
            left: 16,
            child: Text('标题', style: TextStyle(color: Colors.white, fontSize: 24)),
        ),
    ],
)
```

## 五、网络请求

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
    static Future<List<dynamic>> fetchUsers() async {
        final response = await http.get(
            Uri.parse('https://jsonplaceholder.typicode.com/users'),
        );

        if (response.statusCode == 200) {
            return json.decode(response.body);
        } else {
            throw Exception('请求失败：${response.statusCode}');
        }
    }

    static Future<Map<String, dynamic>> createUser(Map<String, dynamic> data) async {
        final response = await http.post(
            Uri.parse('https://jsonplaceholder.typicode.com/users'),
            headers: {'Content-Type': 'application/json'},
            body: json.encode(data),
        );
        return json.decode(response.body);
    }
}
```

## 六、状态管理 —— Provider

```dart
// 依赖：provider: ^6.0.0

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Model
class CounterModel extends ChangeNotifier {
    int _count = 0;
    int get count => _count;

    void increment() {
        _count++;
        notifyListeners();
    }
}

// 在 main 中注册
void main() {
    runApp(
        ChangeNotifierProvider(
            create: (_) => CounterModel(),
            child: const MyApp(),
        ),
    );
}

// 使用
class MyHomePage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        final counter = context.watch<CounterModel>();
        // 或：final counter = Provider.of<CounterModel>(context);

        return Scaffold(
            body: Center(
                child: Text('计数：${counter.count}'),
            ),
            floatingActionButton: FloatingActionButton(
                onPressed: () => context.read<CounterModel>().increment(),
                child: Icon(Icons.add),
            ),
        );
    }
}
```

## 七、路由导航

```dart
// 基本导航
Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => const DetailPage()),
);

// 传参并返回结果
final result = await Navigator.push<String>(
    context,
    MaterialPageRoute(builder: (context) => const DetailPage(data: 'hello')),
);
print(result);

// 命名路由
MaterialApp(
    initialRoute: '/',
    routes: {
        '/': (context) => const HomePage(),
        '/detail': (context) => const DetailPage(),
    },
);
Navigator.pushNamed(context, '/detail', arguments: 'hello');

// 返回上一页
Navigator.pop(context);
Navigator.pop(context, 'result_data');
```

## 八、本地存储

```dart
// 依赖：shared_preferences: ^2.2.0

import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
    static Future<void> saveString(String key, String value) async {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString(key, value);
    }

    static Future<String?> getString(String key) async {
        final prefs = await SharedPreferences.getInstance();
        return prefs.getString(key);
    }

    static Future<void> saveInt(String key, int value) async {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setInt(key, value);
    }

    static Future<bool> getBool(String key) async {
        final prefs = await SharedPreferences.getInstance();
        return prefs.getBool(key) ?? false;
    }
}
```
