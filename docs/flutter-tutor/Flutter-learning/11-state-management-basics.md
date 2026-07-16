---
order: 11
---

# 状态管理基础

## 1. 什么是状态

Flutter 中的状态分为两类：

- **短期状态（局部状态）**：属于单个 Widget 的状态，例如 TextField 的当前输入
- **应用状态（全局状态）**：需要在多个页面之间共享的状态，例如用户登录信息、购物车

## 2. StatefulWidget（有状态组件）

```dart
class CounterWidget extends StatefulWidget {
  const CounterWidget({super.key});

  @override
  State<CounterWidget> createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _count = 0;

  void _increment() {
    setState(() {
      _count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('计数: $_count', style: const TextStyle(fontSize: 24)),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: _increment,
          child: const Text('增加'),
        ),
      ],
    );
  }
}
```

### setState 工作原理

- 调用 `setState` 会触发 `build` 方法重新执行
- Flutter 通过对比新旧 Widget 树来确定最小更新范围
- 不要过于频繁地调用 `setState`

## 3. 状态提升

```dart
// 父组件持有状态
class ParentWidget extends StatefulWidget {
  @override
  State<ParentWidget> createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _isActive = false;

  void _handleToggle(bool value) {
    setState(() => _isActive = value);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SwitchWidget(isActive: _isActive, onToggle: _handleToggle),
        Text('开关是 ${_isActive ? "开" : "关"}'),
      ],
    );
  }
}

// 子组件 - StatelessWidget，通过回调通知父组件
class SwitchWidget extends StatelessWidget {
  final bool isActive;
  final ValueChanged<bool> onToggle;

  const SwitchWidget({
    required this.isActive,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return Switch(
      value: isActive,
      onChanged: onToggle,
    );
  }
}
```

## 4. InheritedWidget（继承式组件）

```dart
// 定义共享数据
class ThemeProvider extends InheritedWidget {
  final ThemeData themeData;

  const ThemeProvider({
    super.key,
    required this.themeData,
    required super.child,
  });

  static ThemeProvider of(BuildContext context) {
    final provider = context.dependOnInheritedWidgetOfExactType<ThemeProvider>();
    assert(provider != null, '在上下文中未找到 ThemeProvider');
    return provider!;
  }

  @override
  bool updateShouldNotify(ThemeProvider oldWidget) {
    return themeData != oldWidget.themeData;
  }
}

// 使用
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ThemeProvider(
      themeData: ThemeData.light(),
      child: MaterialApp(
        home: const HomePage(),
      ),
    );
  }
}

// 子组件获取数据
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = ThemeProvider.of(context).themeData;
    return MaterialApp(theme: theme, home: const Scaffold());
  }
}
```

## 5. ValueNotifier 与 ValueListenableBuilder

```dart
// ValueNotifier - 可监听的值
final counter = ValueNotifier<int>(0);

// ValueListenableBuilder - 自动监听并重建
ValueListenableBuilder<int>(
  valueListenable: counter,
  builder: (context, value, child) {
    return Text('值: $value', style: const TextStyle(fontSize: 24));
  },
)

// 更新值
counter.value++;
```

### 自定义 ChangeNotifier

```dart
class CounterModel extends ChangeNotifier {
  int _count = 0;

  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();  // 通知监听者
  }

  void decrement() {
    _count--;
    notifyListeners();
  }

  void reset() {
    _count = 0;
    notifyListeners();
  }
}

// 使用
class CounterPage extends StatefulWidget {
  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  final CounterModel _counter = CounterModel();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedBuilder(
          animation: _counter,
          builder: (context, child) {
            return Text('计数: ${_counter.count}');
          },
        ),
        ElevatedButton(
          onPressed: () => _counter.increment(),
          child: const Text('+'),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _counter.dispose();
    super.dispose();
  }
}
```

## 6. AnimatedBuilder（动画构建器）

```dart
AnimatedBuilder(
  animation: _controller,  // AnimationController
  builder: (context, child) {
    return Transform.rotate(
      angle: _controller.value * 2 * 3.14159,
      child: child,
    );
  },
  child: const Icon(Icons.refresh, size: 48),  // 不随动画变化的子组件
)
```

## 7. 状态管理方案选择指南

| 方案                             | 适用场景                   | 复杂度 |
| -------------------------------- | -------------------------- | ------ |
| `setState`                       | 单个 Widget 的简单状态     | 低     |
| `StatefulWidget + 状态提升`      | 父子组件通信               | 低     |
| `InheritedWidget`                | 少量全局数据（主题、语言） | 中     |
| `ValueNotifier / ChangeNotifier` | 中等复杂度的共享状态       | 中     |
| `Provider`                       | 中型应用的全局状态管理     | 中     |
| `Riverpod`                       | 大型应用，更好的依赖注入   | 高     |
| `Bloc`                           | 复杂业务逻辑，事件驱动     | 高     |
| `GetX`                           | 简单易用，功能全面的框架   | 中     |

### 推荐

- 简单页面：`setState`
- 父子通信：回调 + 状态提升
- 全局数据（主题/语言）：`Provider`
- 复杂业务逻辑：`Riverpod` 或 `Bloc`
