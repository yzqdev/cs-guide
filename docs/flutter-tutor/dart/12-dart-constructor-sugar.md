---
order: 12
---

# Dart 构造器语法糖

Dart 为构造器提供了大量语法糖，让对象创建更加简洁灵活。

## this. 参数赋值

最常用的构造器语法糖，自动将参数赋值给同名成员变量。

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

// 语法糖：this. 自动赋值
class Person {
  String name;
  int age;

  Person(this.name, this.age);
}

// 混合使用
class User {
  String name;
  int age;
  String email;

  // 部分自动赋值，部分手动处理
  User(this.name, this.age, String email)
      : email = email.toLowerCase();
}

// 使用
var p = Person('张三', 25);
print(p.name); // 张三
print(p.age);  // 25
```

## 初始化列表 `:`

在构造器主体之前初始化字段，特别适合 final 字段和复杂初始化。

```dart
class Point {
  final int x;
  final int y;
  final double distance;

  // 初始化列表在构造体之前执行
  Point(this.x, this.y)
      : distance = (x * x + y * y).toDouble();

  // 多个初始化语句用逗号分隔
  Point.origin()
      : x = 0,
        y = 0,
        distance = 0.0;

  // 调用父类构造器
  Point.fromJson(Map<String, int> json)
      : x = json['x'] ?? 0,
        y = json['y'] ?? 0,
        distance = 0.0;
}

void main() {
  var p = Point(3, 4);
  print(p.distance); // 25.0（3² + 4²）

  var origin = Point.origin();
  print('(${origin.x}, ${origin.y})'); // (0, 0)
}
```

### 初始化列表验证

```dart
class PositiveNumber {
  final int value;

  // 在初始化列表中验证参数
  PositiveNumber(this.value)
      : assert(value > 0, 'value 必须大于 0');

  // 也可以在初始化列表处理逻辑
  PositiveNumber.fromString(String s)
      : value = int.parse(s),
        assert(value > 0);
}

void main() {
  var n = PositiveNumber(5); // ✅
  // var n2 = PositiveNumber(-1); // ❌ 断言失败
}
```

## 命名构造器

Dart 不支持构造器重载（同名），但可以用命名构造器替代。

```dart
class Point {
  double x;
  double y;

  // 主构造器
  Point(this.x, this.y);

  // 命名构造器：原点
  Point.origin()
      : x = 0,
        y = 0;

  // 命名构造器：从 Map 创建
  Point.fromJson(Map<String, double> json)
      : x = json['x'] ?? 0,
        y = json['y'] ?? 0;

  // 命名构造器：极坐标
  Point.polar(double radius, double angle)
      : x = radius * angle.cos(),
        y = radius * angle.sin();

  // 命名构造器：复制实例
  Point.copy(Point other)
      : x = other.x,
        y = other.y;

  // 命名私有构造器（类内部使用）
  Point._internal(this.x, this.y);
}

void main() {
  var p1 = Point(3, 4);
  var p2 = Point.origin();
  var p3 = Point.fromJson({'x': 10, 'y': 20});
  var p4 = Point.polar(5, 3.14159); // 角度 π
  var p5 = Point.copy(p1);

  print('(${p1.x}, ${p1.y})'); // (3.0, 4.0)
  print('(${p2.x}, ${p2.y})'); // (0.0, 0.0)
  print('(${p5.x}, ${p5.y})'); // (3.0, 4.0)
}
```

## 重定向构造器 `: this()`

一个构造器委托给同一个类的另一个构造器。

```dart
class Point {
  int x;
  int y;

  // 主构造器
  Point(this.x, this.y);

  // 重定向到主构造器
  Point.origin() : this(0, 0);

  // 带默认值
  Point.fromX(int x) : this(x, 0);

  // 条件重定向
  Point.fromJson(Map<String, dynamic> json)
      : x = json['x'] as int,
        y = json['y'] as int;

  // 链式重定向
  Point.fromString(String s) : this.fromJson({
    'x': int.parse(s.split(',')[0]),
    'y': int.parse(s.split(',')[1]),
  });

  @override
  String toString() => 'Point($x, $y)';
}

void main() {
  print(Point(3, 4));       // Point(3, 4)
  print(Point.origin());    // Point(0, 0)
  print(Point.fromX(5));    // Point(5, 0)
  print(Point.fromString('10,20')); // Point(10, 20)
}
```

## 工厂构造器 `factory`

工厂构造器不总是创建新实例，可返回缓存实例或子类实例。

```dart
// 单例模式
class Singleton {
  static final Singleton _instance = Singleton._internal();

  // 私有命名构造器
  Singleton._internal();

  // 工厂构造器返回同一实例
  factory Singleton() => _instance;
}

void main() {
  var s1 = Singleton();
  var s2 = Singleton();
  print(s1 == s2); // true（同一实例）
}

// 缓存模式
class Logger {
  final String name;
  static final _cache = <String, Logger>{};

  // 私有构造器
  Logger._internal(this.name);

  // 工厂构造器：返回缓存或创建新实例
  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }
}

void main() {
  var log1 = Logger('main');
  var log2 = Logger('main');
  var log3 = Logger('network');

  print(log1 == log2); // true（同一实例）
  print(log1 == log3); // false（不同名字）
}

// 从缓存或子类返回
abstract class Shape {
  factory Shape(String type) {
    switch (type) {
      case 'circle':
        return Circle();
      case 'square':
        return Square();
      default:
        throw ArgumentError('未知形状：$type');
    }
  }

  double get area;
}

class Circle implements Shape {
  double radius = 1;
  @override
  double get area => 3.14 * radius * radius;
}

class Square implements Shape {
  double side = 1;
  @override
  double get area => side * side;
}

void main() {
  var circle = Shape('circle');
  var square = Shape('square');
  print(circle.area); // 3.14
  print(square.area); // 1.0
}
```

## 常量构造器 `const`

创建编译时常量，相同常量共享同一实例。

```dart
class ImmutablePoint {
  final int x;
  final int y;

  // const 构造器（所有字段必须 final）
  const ImmutablePoint(this.x, this.y);

  // 常量命名构造器
  const ImmutablePoint.origin()
      : x = 0,
        y = 0;
}

void main() {
  // 用 const 创建编译时常量
  var p1 = const ImmutablePoint(0, 0);
  var p2 = const ImmutablePoint(0, 0);
  var p3 = ImmutablePoint(0, 0); // 非 const 创建

  print(p1 == p2); // true（同一常量实例）
  print(p1 == p3); // false（不同实例）

  // const 列表中使用
  const points = [
    ImmutablePoint(1, 2),
    ImmutablePoint(3, 4),
  ];
}
```

## 构造器语法糖对比

```dart
class Demo {
  // 完整构造器
  Demo(String name, int age) {
    this.name = name;
    this.age = age;
  }

  // this. 自动赋值
  Demo(this.name, this.age);

  // 初始化列表
  Demo(this.name) : age = 0;

  // 重定向
  Demo.default_() : this('默认', 18);

  // 命名构造器
  Demo.named(String name) : name = name, age = 18;

  // 工厂构造器
  factory Demo.cached(String name) {
    return _cache.putIfAbsent(name, () => Demo(name, 0));
  }

  // const 构造器
  const Demo.final_: this._name = '', this._age = 0;
}
```

## 实际案例

```dart
class User {
  final int id;
  final String username;
  final String email;
  final DateTime createdAt;
  bool isActive;

  // 主构造器
  User({
    required this.id,
    required this.username,
    required this.email,
    DateTime? createdAt,
    this.isActive = true,
  }) : createdAt = createdAt ?? DateTime.now();

  // 从 JSON 创建
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      username: json['username'] as String,
      email: json['email'] as String,
      createdAt: DateTime.tryParse(json['created_at'] ?? ''),
      isActive: json['is_active'] as bool? ?? true,
    );
  }

  // 创建游客用户
  User.guest()
      : id = 0,
        username = '游客',
        email = '',
        createdAt = DateTime.now(),
        isActive = true;

  // 复制并修改
  User copyWith({
    int? id,
    String? username,
    String? email,
    bool? isActive,
  }) {
    return User(
      id: id ?? this.id,
      username: username ?? this.username,
      email: email ?? this.email,
      createdAt: createdAt,
      isActive: isActive ?? this.isActive,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'username': username,
    'email': email,
    'created_at': createdAt.toIso8601String(),
    'is_active': isActive,
  };
}

void main() {
  // 多种创建方式
  var admin = User(id: 1, username: 'admin', email: 'admin@test.com');
  var guest = User.guest();
  var fromApi = User.fromJson({
    'id': 2,
    'username': 'zhangsan',
    'email': 'zs@test.com',
    'created_at': '2024-01-15T10:00:00Z',
  });

  // 复制并修改
  var updated = admin.copyWith(isActive: false);

  print(guest.username);  // 游客
  print(fromApi.email);   // zs@test.com
  print(admin.isActive);  // true
  print(updated.isActive); // false
}
```
