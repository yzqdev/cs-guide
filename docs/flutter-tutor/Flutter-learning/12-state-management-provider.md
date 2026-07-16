---
order: 12
---

# 状态管理 - Provider

## 1. 添加依赖

```yaml
# pubspec.yaml
dependencies:
  provider: ^6.1.1
```

## 2. 基本用法

### 定义 Model（数据模型）

```dart
import 'package:flutter/foundation.dart';

class CounterProvider extends ChangeNotifier {
  int _count = 0;

  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }

  void decrement() {
    _count--;
    notifyListeners();
  }
}
```

### 注册 Provider

```dart
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterProvider(),
      child: const MyApp(),
    ),
  );
}
```

### 消费状态

```dart
// 方法 1: Consumer
Consumer<CounterProvider>(
  builder: (context, counter, child) {
    return Text('计数: ${counter.count}', style: const TextStyle(fontSize: 24));
  },
)

// 方法 2: context.watch
Text(
  '计数: ${context.watch<CounterProvider>().count}',
  style: const TextStyle(fontSize: 24),
)

// 方法 3: context.select（仅监听特定属性）
Text(
  '计数: ${context.select<CounterProvider, int>((provider) => provider.count)}',
)

// 方法 4: context.read（不监听，仅获取值）
ElevatedButton(
  onPressed: () => context.read<CounterProvider>().increment(),
  child: const Text('增加'),
)
```

## 3. 多个 Provider

```dart
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => AuthProvider()),
        ChangeNotifierProvider(create: (context) => CartProvider()),
        ChangeNotifierProvider(create: (context) => ThemeProvider()),
      ],
      child: const MyApp(),
    ),
  );
}
```

## 4. Provider 类型

| Provider 类型             | 说明                             |
| ------------------------- | -------------------------------- |
| `Provider`                | 提供值，不发送变更通知           |
| `ListenableProvider`      | 基于 Listenable 的 Provider      |
| `ChangeNotifierProvider`  | 基于 ChangeNotifier 的 Provider  |
| `ValueListenableProvider` | 基于 ValueListenable 的 Provider |
| `StreamProvider`          | 基于 Stream 的 Provider          |
| `FutureProvider`          | 基于 Future 的 Provider          |

### StreamProvider

```dart
StreamProvider<User>(
  create: (context) => AuthService().userStream(),
  initialData: User.anonymous(),
  child: const MyApp(),
)

// 使用
final user = context.watch<User>();
```

### FutureProvider

```dart
FutureProvider<Settings>(
  create: (context) => SettingsService().load(),
  initialData: Settings.default(),
  child: const MyApp(),
)
```

## 5. 实践：购物车

```dart
// CartItem 模型
class CartItem {
  final String id;
  final String name;
  final double price;
  int quantity;

  CartItem({
    required this.id,
    required this.name,
    required this.price,
    this.quantity = 1,
  });
}

// CartProvider
class CartProvider extends ChangeNotifier {
  List<CartItem> _items = [];

  List<CartItem> get items => List.unmodifiable(_items);
  double get total => _items.fold(0, (sum, item) => sum + item.price * item.quantity);
  int get itemCount => _items.fold(0, (sum, item) => sum + item.quantity);

  void addItem(CartItem item) {
    final existingIndex = _items.indexWhere((i) => i.id == item.id);
    if (existingIndex >= 0) {
      _items[existingIndex].quantity++;
    } else {
      _items.add(item);
    }
    notifyListeners();
  }

  void removeItem(String id) {
    _items.removeWhere((item) => item.id == id);
    notifyListeners();
  }

  void updateQuantity(String id, int quantity) {
    final index = _items.indexWhere((item) => item.id == id);
    if (index >= 0) {
      _items[index].quantity = quantity;
      if (_items[index].quantity <= 0) {
        _items.removeAt(index);
      }
      notifyListeners();
    }
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }
}

// 商品列表页面
class ProductList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('商品'),
        actions: [
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.shopping_cart),
                onPressed: () => Navigator.pushNamed(context, '/cart'),
              ),
              Positioned(
                right: 8,
                top: 8,
                child: Consumer<CartProvider>(
                  builder: (context, cart, child) {
                    if (cart.itemCount == 0) return const SizedBox();
                    return CircleAvatar(
                      radius: 10,
                      backgroundColor: Colors.red,
                      child: Text(
                        '${cart.itemCount}',
                        style: const TextStyle(fontSize: 10, color: Colors.white),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (context, index) {
          final product = products[index];
          return ListTile(
            title: Text(product.name),
            subtitle: Text('\$${product.price}'),
            trailing: IconButton(
              icon: const Icon(Icons.add_shopping_cart),
              onPressed: () {
                context.read<CartProvider>().addItem(
                  CartItem(id: product.id, name: product.name, price: product.price),
                );
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('${product.name} 已添加到购物车')),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
```

## 6. ProxyProvider（代理 Provider）

```dart
// 依赖其他 Provider 的 Provider
class OrderProvider extends ChangeNotifier {
  final CartProvider _cartProvider;

  OrderProvider(this._cartProvider);

  double get totalWithTax => _cartProvider.total * 1.1;
}

// 注册
MultiProvider(
  providers: [
    ChangeNotifierProvider(create: (context) => CartProvider()),
    ChangeNotifierProxyProvider<CartProvider, OrderProvider>(
      create: (context) => OrderProvider(context.read<CartProvider>()),
      update: (context, cart, previous) => previous!,
    ),
  ],
)
```

## 7. Provider 性能优化

```dart
// 1. 使用 select 避免不必要的重建
Consumer<CartProvider>(
  builder: (context, cart, child) {
    return Text('总计: \$${cart.total}');
  },
)

// 改为
Selector<CartProvider, double>(
  selector: (context, cart) => cart.total,
  builder: (context, total, child) {
    return Text('总计: \$${total}');
  },
)

// 2. 合理拆分 Provider 粒度
// 错误做法：一个大的 Provider 管理所有状态
// 正确做法：按功能拆分为多个小的 Provider

// 3. 使用 const Widget
// 通过 Consumer 的 child 参数传递不变的 Widget 部分
Consumer<ThemeProvider>(
  builder: (context, theme, child) {
    return Column(
      children: [
        Text(theme.name),  // 这部分会变化
        if (child != null) child,  // 这部分不变
      ],
    );
  },
  child: const Icon(Icons.lightbulb),  // 不变的部分
)
```
