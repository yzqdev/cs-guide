---
order: 10
---

# 导航与路由

## 1. 基本导航

### Navigator.push - 导航到新页面

```dart
// 不带参数导航
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => const DetailPage()),
);

// 带参数导航
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailPage(
      id: 42,
      title: '详情',
    ),
  ),
);

// 等待返回结果
final result = await Navigator.push<String>(
  context,
  MaterialPageRoute(builder: (context) => const SelectionPage()),
);
print('结果: $result');
```

### Navigator.pop - 返回

```dart
// 简单返回
Navigator.pop(context);

// 带值返回
Navigator.pop(context, 'selected_item');
```

### 命名路由

```dart
// 在 MaterialApp 中定义路由
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => const HomePage(),
    '/detail': (context) => const DetailPage(),
    '/settings': (context) => const SettingsPage(),
  },
)

// 使用命名路由导航
Navigator.pushNamed(context, '/detail');

// 带参数
Navigator.pushNamed(
  context,
  '/detail',
  arguments: {'id': 42, 'title': '详情'},
);

// 接收参数
class DetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map;
    return Text(args['title']);
  }
}
```

## 2. 高级路由

### onGenerateRoute - 动态路由生成

```dart
MaterialApp(
  onGenerateRoute: (settings) {
    // 处理命名路由
    if (settings.name == '/detail') {
      final args = settings.arguments as Map<String, dynamic>;
      return MaterialPageRoute(
        builder: (context) => DetailPage(
          id: args['id'] as int,
          title: args['title'] as String,
        ),
        settings: settings,
      );
    }
    // 处理未知路由
    return MaterialPageRoute(
      builder: (context) => const NotFoundPage(),
    );
  },
)
```

### 路由守卫

```dart
MaterialApp(
  onGenerateRoute: (settings) {
    // 检查登录状态
    if (settings.name == '/profile' && !isLoggedIn) {
      return MaterialPageRoute(
        builder: (context) => const LoginPage(),
      );
    }
    // 正常路由
    return MaterialPageRoute(
      builder: (context) => routes[settings.name]!(context),
    );
  },
)
```

## 3. 页面过渡动画

```dart
// 自定义滑动过渡
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => const DetailPage(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return SlideTransition(
        position: Tween<Offset>(
          begin: const Offset(1, 0),
          end: Offset.zero,
        ).animate(CurvedAnimation(
          parent: animation,
          curve: Curves.easeInOutCubic,
        )),
        child: child,
      );
    },
    transitionDuration: const Duration(milliseconds: 300),
  ),
)

// 缩放过渡
PageRouteBuilder(
  pageBuilder: (context, animation, secondaryAnimation) => const DetailPage(),
  transitionsBuilder: (context, animation, secondaryAnimation, child) {
    return ScaleTransition(
      scale: Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(parent: animation, curve: Curves.easeOutBack),
      ),
      child: child,
    );
  },
)

// 淡入过渡
PageRouteBuilder(
  pageBuilder: (context, animation, secondaryAnimation) => const DetailPage(),
  transitionsBuilder: (context, animation, secondaryAnimation, child) {
    return FadeTransition(
      opacity: animation,
      child: child,
    );
  },
)
```

## 4. BottomNavigationBar（底部导航栏）

```dart
class MainScreen extends StatefulWidget {
  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    const HomePage(),
    const SearchPage(),
    const ProfilePage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) {
          setState(() => _currentIndex = index);
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: '首页',
          ),
          NavigationDestination(
            icon: Icon(Icons.search_outlined),
            selectedIcon: Icon(Icons.search),
            label: '搜索',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outlined),
            selectedIcon: Icon(Icons.person),
            label: '我的',
          ),
        ],
      ),
    );
  }
}
```

## 5. TabBar（标签栏）

```dart
DefaultTabController(
  length: 3,
  child: Scaffold(
    appBar: AppBar(
      title: const Text('标签演示'),
      bottom: const TabBar(
        tabs: [
          Tab(icon: Icon(Icons.chat), text: '聊天'),
          Tab(icon: Icon(Icons.call), text: '通话'),
          Tab(icon: Icon(Icons.settings), text: '设置'),
        ],
      ),
    ),
    body: const TabBarView(
      children: [
        ChatList(),
        CallLog(),
        SettingsPage(),
      ],
    ),
  ),
)
```

## 6. Drawer - 侧边栏

```dart
Scaffold(
  appBar: AppBar(title: const Text('侧边栏演示')),
  drawer: Drawer(
    child: ListView(
      padding: EdgeInsets.zero,
      children: [
        DrawerHeader(
          decoration: BoxDecoration(color: Colors.blue),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const CircleAvatar(
                radius: 30,
                backgroundColor: Colors.white,
                child: Icon(Icons.person, size: 36, color: Colors.blue),
              ),
              const SizedBox(height: 12),
              const Text('张三', style: TextStyle(color: Colors.white, fontSize: 18)),
              Text('zhangsan@example.com', style: TextStyle(color: Colors.white70)),
            ],
          ),
        ),
        ListTile(
          leading: const Icon(Icons.home),
          title: const Text('首页'),
          onTap: () => Navigator.pop(context),
        ),
        ListTile(
          leading: const Icon(Icons.settings),
          title: const Text('设置'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushNamed(context, '/settings');
          },
        ),
      ],
    ),
  ),
  body: const Center(child: Text('从左侧滑动打开侧边栏')),
)
```

## 7. 页面间传参

```dart
// 页面 A - 发送方
class PageA extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        final result = await Navigator.push<String>(
          context,
          MaterialPageRoute(
            builder: (context) => const PageB(),
            settings: const RouteSettings(arguments: {'from': 'PageA'}),
          ),
        );
        if (result != null) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('返回值: $result')),
          );
        }
      },
      child: const Text('前往页面 B'),
    );
  }
}

// 页面 B - 接收方 & 返回值
class PageB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)?.settings.arguments as Map?;
    print('收到: $args');

    return Scaffold(
      appBar: AppBar(title: const Text('页面 B')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.pop(context, 'data_from_B'),
          child: const Text('返回数据'),
        ),
      ),
    );
  }
}
```
