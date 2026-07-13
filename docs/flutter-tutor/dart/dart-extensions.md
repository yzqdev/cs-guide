# 扩展方法与增强枚举

[官方文档](https://dart.dev/language/extension-methods)

## 扩展方法

扩展方法可以为现有类型添加新功能，无需修改原类型或创建子类。

### 定义扩展

```dart
// 为 String 添加扩展
extension StringExtensions on String {
  // 获取字符数（中英文都算一个字符）
  int get charCount => runes.length;

  // 首字母大写
  String get capitalize {
    if (isEmpty) return this;
    return this[0].toUpperCase() + substring(1);
  }

  // 判断是否为邮箱
  bool get isValidEmail => contains('@') && contains('.');

  // 重复字符串
  String repeat(int times) => List.filled(times, this).join();
}

void main() {
  String text = 'hello world';
  print(text.capitalize);     // Hello world
  print(text.charCount);      // 11
  print('test@example.com'.isValidEmail); // true
  print('ha'.repeat(3));      // hahaha
}
```

### 泛型扩展

```dart
extension ListExtensions<T> on List<T> {
  // 获取中间元素
  T? get middle {
    if (isEmpty) return null;
    return this[length ~/ 2];
  }

  // 随机打乱
  List<T> shuffled() => [...this]..shuffle();

  // 两两分组
  List<List<T>> chunked(int size) {
    var result = <List<T>>[];
    for (var i = 0; i < length; i += size) {
      result.add(sublist(i, (i + size).clamp(0, length)));
    }
    return result;
  }
}

void main() {
  var numbers = [1, 2, 3, 4, 5];
  print(numbers.middle);            // 3
  print(numbers.shuffled());        // [3, 1, 5, 2, 4]
  print([1, 2, 3, 4, 5, 6].chunked(2)); // [[1, 2], [3, 4], [5, 6]]
}
```

### 扩展命名冲突

```dart
// 扩展 A
extension StringA on String {
  String get prefix => '[A] $this';
}

// 扩展 B（同名方法）
extension StringB on String {
  String get prefix => '[B] $this';
}

void main() {
  var text = 'hello';

  // 显式指定使用哪个扩展
  print(StringA(text).prefix); // [A] hello
  print(StringB(text).prefix); // [B] hello
}
```

### 为第三方库添加扩展

```dart
// 为 int 添加扩展
extension IntExtensions on int {
  Duration get seconds => Duration(seconds: this);
  Duration get minutes => Duration(minutes: this);
  Duration get hours => Duration(hours: this);
  DateTime get daysAgo => DateTime.now().subtract(Duration(days: this));
  DateTime get daysLater => DateTime.now().add(Duration(days: this));
}

void main() async {
  print(5.seconds);      // 0:00:05
  print(3.daysAgo);      // 3 天前的日期

  await Future.delayed(2.seconds);
  print('2 秒后执行');
}
```

### 扩展运算符

```dart
extension MapOperator<K, V> on Map<K, V> {
  // 扩展 + 运算符
  Map<K, V> operator +(Map<K, V> other) {
    var result = Map<K, V>.from(this);
    result.addAll(other);
    return result;
  }

  // 扩展 - 运算符（移除键）
  Map<K, V> operator -(Set<K> keys) {
    var result = Map<K, V>.from(this);
    result.removeWhere((k, _) => keys.contains(k));
    return result;
  }
}

void main() {
  var map1 = {'a': 1, 'b': 2};
  var map2 = {'c': 3, 'd': 4};

  var merged = map1 + map2;
  print(merged); // {a: 1, b: 2, c: 3, d: 4}

  var removed = merged - {'a', 'c'};
  print(removed); // {b: 2, d: 4}
}
```

## 增强枚举

Dart 2.17+ 允许枚举拥有字段、方法、构造器和实现接口。

### 带字段的枚举

```dart
// 带 Members 和构造器的枚举
enum Status {
  success('操作成功', 200),
  notFound('资源未找到', 404),
  serverError('服务器错误', 500),
  unauthorized('未授权', 401);

  final String message;
  final int code;

  const Status(this.message, this.code);

  bool get isSuccess => code >= 200 && code < 300;
  bool get isError => code >= 400;

  @override
  String toString() => '[$code] $message';
}

void main() {
  var status = Status.success;
  print(status.message);    // 操作成功
  print(status.code);       // 200
  print(status.isSuccess);  // true
  print(status);            // [200] 操作成功

  // 遍历
  for (var s in Status.values) {
    print('${s.name}: ${s.message}');
  }
}
```

### 枚举实现接口

```dart
abstract interface class Describable {
  String get description;
}

enum Planet implements Describable {
  mercury(3.30e23, 2.44e6),
  venus(4.87e24, 6.05e6),
  earth(5.97e24, 6.37e6),
  mars(6.42e23, 3.39e6);

  final double mass; // kg
  final double radius; // m

  const Planet(this.mass, this.radius);

  double get gravity => 6.67430e-11 * mass / (radius * radius);

  @override
  String get description {
    return '$name: 质量=${mass}e23 kg, 重力=${gravity.toStringAsFixed(2)} m/s²';
  }
}

void main() {
  print(Planet.earth.description);
  // earth: 质量=5.97e23 kg, 重力=9.80 m/s²

  print(Planet.mars.gravity.toStringAsFixed(2)); // 3.71
}
```

### 泛型枚举

```dart
enum Result<T> {
  success('成功'),
  failure('失败');

  final String label;
  const Result(this.label);

  // 工厂方法创建带数据的 Result
  static Result<T> ok<T>(T data) => _Ok(data);
  static Result<T> err<T>(String message) => _Err(message);
}

class _Ok<T> extends Result<T> {
  final T data;
  _Ok(this.data) : super('成功');
}

class _Err<T> extends Result<T> {
  final String message;
  _Err(this.message) : super('失败');
}

// 使用
Result<int> divide(int a, int b) {
  if (b == 0) return Result.err('除数不能为零');
  return Result.ok(a ~/ b);
}

void main() {
  var result = divide(10, 3);
  if (result case _Ok(:var data)) {
    print('结果：$data');
  } else if (result case _Err(:var message)) {
    print('错误：$message');
  }
}
```

## 扩展类型（Extension Types）

Dart 3.0+ 的 Extension Types，零开销包装。

```dart
// 定义扩展类型
extension type IdNumber(int value) {
  // 添加验证
  bool get isValid => value > 0;

  // 添加格式化
  String get formatted => 'ID-${value.toString().padLeft(6, '0')}';

  // 添加方法
  IdNumber next() => IdNumber(value + 1);
}

void main() {
  var id = IdNumber(42);
  print(id.value);        // 42
  print(id.isValid);      // true
  print(id.formatted);    // ID-000042
  print(id.next());       // IdNumber(43)
}
```

## 实际案例

```dart
// 颜色枚举
enum Color {
  red('#FF0000', '红色'),
  green('#00FF00', '绿色'),
  blue('#0000FF', '蓝色'),
  yellow('#FFFF00', '黄色');

  final String hex;
  final String chineseName;
  const Color(this.hex, this.chineseName);

  // 通过十六进制查找
  static Color? fromHex(String hex) {
    return Color.values.firstWhere(
      (c) => c.hex == hex.toUpperCase(),
      orElse: () => throw ArgumentError('未知颜色：$hex'),
    );
  }
}

// 为 String 添加扩展
extension StringColorExtensions on String {
  // 检查字符串是否为有效十六进制颜色
  bool get isValidHexColor =>
      length == 7 && startsWith('#') &&
      substring(1).runes.every((r) =>
          (r >= 48 && r <= 57) || (r >= 65 && r <= 70) || (r >= 97 && r <= 102));

  // 转换为 Color
  Color? toColor() {
    if (!isValidHexColor) return null;
    return Color.fromHex(this);
  }
}

void main() {
  // 枚举使用
  print(Color.red.chineseName); // 红色
  print(Color.values.map((c) => c.hex).join(', '));
  // #FF0000, #00FF00, #0000FF, #FFFF00

  // 扩展使用
  print('#FF0000'.isValidHexColor); // true
  print('#XYZ'.isValidHexColor);    // false
  print('#FF0000'.toColor()?.chineseName); // 红色
}
```
