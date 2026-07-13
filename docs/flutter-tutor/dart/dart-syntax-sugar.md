# Dart 语法糖总览

Dart 提供了丰富的语法糖，让代码更简洁、可读性更强。本文汇总常用语法糖及其等价写法。

## 箭头函数 `=>`

单表达式函数体的简写。

```dart
// 传统写法
int add(int a, int b) {
  return a + b;
}

// 箭头函数
int add(int a, int b) => a + b;

// 匿名函数箭头
var list = [1, 2, 3];
list.forEach((element) => print(element));
list.sort((a, b) => a.compareTo(b));
```

## 字符串插值 `$`

```dart
String name = '张三';
int age = 25;

// 传统拼接
String msg1 = '我叫' + name + '，今年' + String(age) + '岁。';

// 插值表达式
String msg2 = '我叫$name，今年${age}岁。';

// 表达式必须用 ${}
String msg3 = '明年${age + 1}岁。';
```

## 级联运算符 `..`

在同一个对象上连续操作，避免重复引用。

```dart
class Person {
  String? name;
  int? age;
  void sayHello() => print('你好，我是$name');
}

// 传统写法
var p = Person();
p.name = '张三';
p.age = 25;
p.sayHello();

// 级联写法
var p = Person()
  ..name = '张三'
  ..age = 25
  ..sayHello();

// 嵌套级联
var list = <int>[]
  ..add(1)
  ..addAll([2, 3])
  ..sort();
```

## 条件成员访问符 `?.`

```dart
class Address {
  String? city;
}
class User {
  String? name;
  Address? address;
}

User? user;

// 传统写法
String? city;
if (user != null && user.address != null) {
  city = user.address.city;
}

// 语法糖
String? city = user?.address?.city;
int? len = user?.name?.length;

// 事件回调
// onChanged?.call(value);
```

## 空值合并运算符 `??`

```dart
String? name;

// 传统写法
String display = name != null ? name : '匿名';

// 语法糖
String display = name ?? '匿名';

// 链式
String result = a ?? b ?? c ?? '默认值';
```

## 空值赋值运算符 `??=`

```dart
String? name;

// 传统写法
if (name == null) name = '张三';

// 语法糖
name ??= '张三'; // name 为 null 才赋值
```

## 展开运算符 `...` 和 `...?`

```dart
var list1 = [1, 2, 3];
var list2 = [4, 5, 6];
List<int>? nullableList;

// 展开合并
var combined = [0, ...list1, ...list2, 7];
print(combined); // [0, 1, 2, 3, 4, 5, 6, 7]

// 空安全展开
var result = [1, ...?nullableList, 2]; // nullableList 为 null 则忽略
```

## 集合中的 `if` 和 `for`

```dart
bool includeExtra = true;
var numbers = [1, 2, 3];

// 集合中的 if
var list = [
  '苹果',
  '香蕉',
  if (includeExtra) '额外水果',  // 条件成立才添加
  if (!includeExtra) '替代水果',
];

// 集合中的 for
var doubled = [
  for (var n in numbers) n * 2,
];
print(doubled); // [2, 4, 6]

// 组合使用
var filtered = [
  for (var n in numbers)
    if (n > 1) n * n,
];
print(filtered); // [4, 9]
```

## 构造器语法糖

### this. 参数赋值

```dart
// 传统写法
class Person {
  String name;
  int age;
  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
}

// 语法糖
class Person {
  String name;
  int age;
  Person(this.name, this.age);
}
```

### 初始化列表

```dart
class Point {
  final int x;
  final int y;
  final double distance;

  // 在构造器主体之前初始化 final 字段
  Point(this.x, this.y)
      : distance = sqrt(x * x + y * y);
}
```

### 命名构造器

```dart
class Point {
  int x, y;

  Point(this.x, this.y);

  // 命名构造器
  Point.origin() : x = 0, y = 0;
  Point.fromJson(Map<String, int> json)
      : x = json['x']!,
        y = json['y']!;
}

// 使用
var p1 = Point(3, 4);
var p2 = Point.origin();
var p3 = Point.fromJson({'x': 1, 'y': 2});
```

### 工厂构造器

```dart
class Logger {
  final String name;
  static final _cache = <String, Logger>{};

  // 私有命名构造器
  Logger._internal(this.name);

  // 工厂构造器：可从缓存返回或创建新实例
  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }
}

// 使用
var log1 = Logger('main');
var log2 = Logger('main');
print(log1 == log2); // true（同一实例）
```

### const 构造器

```dart
class ImmutablePoint {
  final int x, y;
  const ImmutablePoint(this.x, this.y);
}

void main() {
  // const 创建编译时常量
  var p1 = const ImmutablePoint(0, 0);
  var p2 = const ImmutablePoint(0, 0);
  print(p1 == p2); // true（同一常量）

  // 非 const 创建
  var p3 = ImmutablePoint(0, 0);
  print(p1 == p3); // false
}
```

## 重载运算符 `operator`

```dart
class Vector {
  final int x, y;
  Vector(this.x, this.y);

  Vector operator +(Vector other) => Vector(x + other.x, y + other.y);
  Vector operator *(int scalar) => Vector(x * scalar, y * scalar);
  bool operator ==(Object other) =>
      other is Vector && x == other.x && y == other.y;
  int get hashCode => Object.hash(x, y);

  @override
  String toString() => 'Vector($x, $y)';
}

void main() {
  var v1 = Vector(1, 2);
  var v2 = Vector(3, 4);
  print(v1 + v2); // Vector(4, 6)
  print(v1 * 3);  // Vector(3, 6)
}
```

## 类型测试与转换

```dart
dynamic value = 'Hello Dart';

// is 类型判断
if (value is String) {
  print('长度：${value.length}'); // 自动提升为 String
}

// is! 否定判断
if (value is! int) {
  print('不是整数');
}

// as 强制转换
String str = value as String;
// String str = value as int; // 运行时异常

// 推荐：先用 is 判断再用 as
if (value is String) {
  String str = value as String;
}
```

## 记录（Record）解构

```dart
// 多重返回值
(String, int) getPerson() => ('张三', 25);

// 解构赋值
var (name, age) = getPerson();
print('$name, $age'); // 张三, 25

// 命名 Record
var user = (name: '李四', age: 30);
var (name: n, age: a) = user;
print('$n, $a'); // 李四, 30

// 忽略部分值
var (_, age) = getPerson();
```

## 级联 + 展开 组合

```dart
class ShoppingCart {
  final List<String> _items = [];
  List<String> get items => List.unmodifiable(_items);

  ShoppingCart add(String item) {
    _items.add(item);
    return this;
  }

  ShoppingCart addAll(List<String> items) {
    _items.addAll(items);
    return this;
  }

  void printCart() {
    print('购物车：${_items.join(', ')}');
  }
}

void main() {
  ShoppingCart()
    ..add('苹果')
    ..add('香蕉')
    ..addAll(['牛奶', '面包'])
    ..printCart();
  // 购物车：苹果, 香蕉, 牛奶, 面包
}
```

## 构造函数自动类型推断

```dart
// 旧写法
Map<String, List<int>> map = Map<String, List<int>>();

// Dart 类型推断（省略泛型）
Map<String, List<int>> map = {};
var map2 = <String, List<int>>{};

// 结合使用
var scores = <String, int>{
  '张三': 90,
  '李四': 85,
};
```

## for-in / forEach 遍历

```dart
var list = [1, 2, 3, 4, 5];

// for-in 循环
for (var item in list) {
  print(item);
}

// forEach（更简洁）
list.forEach((item) => print(item));
list.forEach(print); // 直接传函数

// Map 遍历
var map = {'a': 1, 'b': 2};
map.forEach((key, value) => print('$key: $value'));

// Set 同理
var set = {1, 2, 3};
set.forEach(print);
```

## 语法糖速查表

| 语法 | 说明 | 示例 |
|------|------|------|
| `=>` | 箭头函数 | `(x) => x * x` |
| `$name` | 字符串插值 | `'你好，$name'` |
| `..` | 级联运算符 | `obj..foo()..bar()` |
| `?.` | 条件访问 | `obj?.prop` |
| `??` | 空值合并 | `a ?? b` |
| `??=` | 空值赋值 | `x ??= value` |
| `...` | 集合展开 | `[...a, ...b]` |
| `...?` | 空安全展开 | `[...?nullable]` |
| `if` in collection | 条件集合 | `[if (ok) x]` |
| `for` in collection | 生成集合 | `[for (var i in l) i]` |
| `this.x` in constructor | 自动赋值 | `Person(this.name)` |
| `:` after constructor | 初始化列表 | `Point() : x = 0` |
| `factory` | 工厂构造器 | `factory Logger()` |
| `const` in constructor | 编译时常量 | `const Point(0,0)` |
| `is` / `as` | 类型判断/转换 | `obj is String` |
| `operator` | 运算符重载 | `operator +` |
| record destructure | 记录解构 | `var (a, b) = fn()` |
