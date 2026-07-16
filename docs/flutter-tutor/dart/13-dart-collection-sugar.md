---
order: 13
---

# Dart 集合语法糖

Dart 为集合（List、Set、Map）提供了丰富的语法糖，让代码更加简洁和 expressive。

## 集合字面量简写

```dart
// 传统方式（使用构造函数）
var list = List<int>();
var set = Set<String>();
var map = Map<String, int>();

// 字面量语法糖
var list = <int>[];
var set = <String>{};
var map = <String, int>{};

// 带初始值
var numbers = [1, 2, 3];             // List<int>
var fruits = {'苹果', '香蕉'};        // Set<String>
var scores = {'张三': 90, '李四': 85}; // Map<String, int>

// 不可变集合（const）
const constList = [1, 2, 3];
const constSet = {'a', 'b', 'c'};
const constMap = {'key': 'value'};
```

## 泛型推断简写

```dart
// 完整写法
Map<String, Map<String, int>> data = Map<String, Map<String, int>>();

// Dart 类型推断简写
Map<String, Map<String, int>> data = {};

// 结合 var
var data = <String, Map<String, int>>{};

// 实际使用
var nested = {
  'user1': {'score': 90, 'level': 5},
  'user2': {'score': 85, 'level': 4},
};
```

## 展开运算符 ...

将一个集合的元素展开合并到另一个集合中。

```dart
// List 展开
var a = [1, 2, 3];
var b = [4, 5, 6];
var combined = [...a, ...b];
print(combined); // [1, 2, 3, 4, 5, 6]

// 混合展开
var result = [0, ...a, 10, ...b, 100];
print(result); // [0, 1, 2, 3, 10, 4, 5, 6, 100]

// Set 展开
var setA = {1, 2, 3};
var setB = {3, 4, 5};
var setUnion = {...setA, ...setB};
print(setUnion); // {1, 2, 3, 4, 5}

// Map 展开
var mapA = {'a': 1, 'b': 2};
var mapB = {'c': 3, 'd': 4};
var mapMerge = {...mapA, ...mapB};
print(mapMerge); // {a: 1, b: 2, c: 3, d: 4}

// 后面的覆盖前面的 key
var overrides = {'a': 1, 'b': 2};
var updates = {'b': 99, 'c': 3};
var merged = {...overrides, ...updates};
print(merged); // {a: 1, b: 99, c: 3}
```

## 空安全展开 ...

可空集合为 null 时，`...?` 会自动忽略。

```dart
List<int>? nullableList;
List<int>? nonNullList = [4, 5];

// ...? 安全展开
var result = [1, 2, 3, ...?nullableList];
print(result); // [1, 2, 3]（null 被忽略）

var result2 = [...?nonNullList, 6, 7];
print(result2); // [4, 5, 6, 7]

// 对比：普通展开在 null 时会报错
// var error = [...nullableList]; // ❌ 运行时错误
```

## 集合中的 if

根据条件决定是否添加元素。

```dart
bool hasDiscount = true;
bool isPremium = false;

// 基本条件
var items = [
  '商品A',
  '商品B',
  if (hasDiscount) '折扣商品',
];

// if-else（Dart 3.0+）
var navItems = [
  '首页',
  if (isPremium) '高级功能' else '普通功能',
  '设置',
];
print(navItems); // [首页, 普通功能, 设置]

// // 多条件
// var menu = [
//   '首页',
//   if (isLoggedIn) ...['个人中心', '退出'],
//   '关于',
// ];
```

## 集合中的 for

用循环动态生成集合元素。

```dart
var numbers = [1, 2, 3];

// 基本循环
var doubled = [
  for (var n in numbers) n * 2,
];
print(doubled); // [2, 4, 6]

// 结合条件
var squares = [
  for (var n in numbers)
    if (n > 1) n * n,
];
print(squares); // [4, 9]

// 字符串处理
var words = ['hello', 'world'];
var uppercased = [
  for (var w in words) w.toUpperCase(),
];
print(uppercased); // [HELLO, WORLD]

// 嵌套循环
var pairs = [
  for (var i in [1, 2])
    for (var j in ['a', 'b'])
      '$i$j',
];
print(pairs); // [1a, 1b, 2a, 2b]

// Map 中用 for
var keys = ['a', 'b', 'c'];
var map = {
  for (var k in keys) k: k.toUpperCase(),
};
print(map); // {a: A, b: B, c: C}
```

## 组合使用

```dart
class CartItem {
  final String name;
  final double price;
  final int quantity;
  CartItem(this.name, this.price, this.quantity);
}

void main() {
  var cart = [
    CartItem('苹果', 5.0, 2),
    CartItem('香蕉', 3.0, 3),
    CartItem('牛奶', 15.0, 1),
  ];

  bool hasCoupon = true;

  // 组合使用 for + if + 展开
  var descriptions = [
    '购物车：',
    for (var item in cart)
      '${item.name} ×${item.quantity} = ¥${item.price * item.quantity}',
    if (hasCoupon) ...['优惠券已应用', '已优惠 ¥5.0'],
    '合计：¥${cart.fold(0.0, (sum, item) => sum + item.price * item.quantity)}',
  ];

  descriptions.forEach(print);
}
// 输出：
// 购物车：
// 苹果 ×2 = ¥10.0
// 香蕉 ×3 = ¥9.0
// 牛奶 ×1 = ¥15.0
// 优惠券已应用
// 已优惠 ¥5.0
// 合计：¥34.0
```

## 实际案例

### 动态生成列表

```dart
// 生成分页数字
var pageNumbers = [
  if (currentPage > 1) '上一页',
  for (var i = max(1, currentPage - 2);
      i <= min(totalPages, currentPage + 2);
      i++)
    if (i == currentPage) '[$i]' else '$i',
  if (currentPage < totalPages) '下一页',
];
```

### 数据转换

```dart
var users = [
  {'name': '张三', 'age': 25, 'active': true},
  {'name': '李四', 'age': 17, 'active': false},
  {'name': '王五', 'age': 30, 'active': true},
];

// 筛选活跃用户并转换格式
var activeUsers = [
  for (var u in users)
    if (u['active'] == true)
      '${u['name']}（${u['age']}岁）',
];

print(activeUsers); // [张三（25岁）, 王五（30岁）]

// 生成 Map
var userMap = {
  for (var u in users) u['name'] as String: u['age'] as int,
};
print(userMap); // {张三: 25, 李四: 17, 王五: 30}
```

### 配置合并

```dart
class Config {
  final String host;
  final int port;
  final bool useSsl;
  final Map<String, String> headers;

  const Config({
    this.host = 'localhost',
    this.port = 8080,
    this.useSsl = false,
    this.headers = const {},
  });

  Config merge(Config other) => Config(
    host: other.host,
    port: other.port,
    useSsl: other.useSsl,
    headers: {...headers, ...other.headers},
  );
}

// 默认配置 + 覆盖
var defaultConfig = Config();
var customConfig = Config(
  host: 'api.example.com',
  useSsl: true,
  headers: {'Authorization': 'Bearer token'},
);

var finalConfig = defaultConfig.merge(customConfig);
```
