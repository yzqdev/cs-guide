---
order: 3
---

# Dart 方法

[官方文档](https://dart.dev/language/functions)

## 位置参数

按声明顺序传参。

```dart
int insertUser(int id, String name) {
  print('插入用户：$id - $name');
  return id;
}

// 调用时必须按位置传参
insertUser(1, '张三');
// insertUser('张三', 1); // ❌ 参数位置必须对应
```

### 可选位置参数 [ ]

用方括号包裹的可选参数。

```dart
String insertUser(int id, String name, [int age, String? email]) {
  var info = '用户：$id - $name';
  if (age != null) info += '，$age岁';
  if (email != null) info += '，$email';
  return info;
}

// 调用（age 和 email 可选）
print(insertUser(1, '张三'));            // 用户：1 - 张三
print(insertUser(2, '李四', 25));        // 用户：2 - 李四，25岁
print(insertUser(3, '王五', 30, 'w@w')); // 用户：3 - 王五，30岁，w@w
```

### 可选位置参数默认值

```dart
String insertUser(int id, String name, [int age = 18, String email = '无']) {
  return '用户：$id - $name，${age}岁，$email';
}

print(insertUser(1, '张三'));         // 用户：1 - 张三，18岁，无
print(insertUser(2, '李四', 25));     // 用户：2 - 李四，25岁，无
print(insertUser(3, '王五', 30, 'w@w')); // 用户：3 - 王五，30岁，w@w
```

## 命名参数 { }

用花括号包裹，调用时按名称传参，与顺序无关。

```dart
String insertUser({int id, String name, int age}) {
  return '用户：$id - $name，${age}岁';
}

// 调用时通过名称指定
print(insertUser(id: 1, name: '张三', age: 25));
print(insertUser(name: '李四', age: 30, id: 2)); // 顺序无关
```

### required 必填命名参数

```dart
String insertUser({
  required int id,
  required String name,
  int age = 18,
  String? email,
}) {
  var info = '用户：$id - $name，${age}岁';
  if (email != null) info += '，$email';
  return info;
}

// id 和 name 必须传
print(insertUser(id: 1, name: '张三'));
print(insertUser(id: 2, name: '李四', age: 25, email: 'li@t.com'));
```

## 参数默认值

```dart
// 命名参数默认值
void greet({String name = '游客', int age = 0}) {
  print('你好，$name（${age}岁）');
}

greet();                    // 你好，游客（0岁）
greet(name: '张三');        // 你好，张三（0岁）
greet(name: '李四', age: 25); // 你好，李四（25岁）

// 位置参数默认值
void log(String message, [String level = 'INFO']) {
  print('[$level] $message');
}

log('系统启动');       // [INFO] 系统启动
log('发生错误', 'ERROR'); // [ERROR] 发生错误
```

## 匿名函数（Lambda）

```dart
// 定义匿名函数并赋值给变量
var add = (int x, int y) {
  return x + y;
};

print(add(10, 11)); // 21

// 匿名函数作为参数
var list = [1, 2, 3, 4, 5];
list.forEach((element) {
  print(element);
});
```

## 箭头函数 =>

单表达式函数体的简写。

```dart
// 普通函数
int add(int x, int y) {
  return x + y;
}

// 箭头函数
int add(int x, int y) => x + y;

// 匿名箭头函数
var multiply = (int x, int y) => x * y;
print(multiply(3, 4)); // 12

// 在回调中使用
list.forEach((item) => print(item));
list.sort((a, b) => a.compareTo(b));

// 多个语句用箭头不行，需要用完整函数体
// var f = (x) => { print(x); return x; }; // ❌
var f = (x) {
  print(x);
  return x;
}; // ✅
```

## 高阶函数

函数可以作为参数传递或作为返回值。

### 函数作为参数

```dart
// 接收函数作为参数
List<int> filter(List<int> items, bool Function(int) predicate) {
  var result = <int>[];
  for (var item in items) {
    if (predicate(item)) result.add(item);
  }
  return result;
}

// 传入不同判断逻辑
var numbers = [1, 2, 3, 4, 5, 6];

var evens = filter(numbers, (n) => n % 2 == 0);
print(evens); // [2, 4, 6]

var big = filter(numbers, (n) => n > 3);
print(big); // [4, 5, 6]
```

### 函数作为返回值

```dart
Function makeMultiplier(int factor) {
  return (int x) => x * factor;
}

void main() {
  var double = makeMultiplier(2);
  var triple = makeMultiplier(3);

  print(double(5)); // 10
  print(triple(5)); // 15
}
```

### 闭包

```dart
Function counter() {
  int count = 0;
  return () {
    count++;
    return count;
  };
}

void main() {
  var c = counter();
  print(c()); // 1
  print(c()); // 2
  print(c()); // 3

  // 每个闭包独立
  var c2 = counter();
  print(c2()); // 1
}
```

## 静态方法与扩展方法

```dart
// 静态方法
class MathUtils {
  static double average(List<int> nums) {
    return nums.reduce((a, b) => a + b) / nums.length;
  }

  static bool isPrime(int n) {
    if (n < 2) return false;
    for (var i = 2; i * i <= n; i++) {
      if (n % i == 0) return false;
    }
    return true;
  }
}

print(MathUtils.average([1, 2, 3, 4, 5])); // 3.0
print(MathUtils.isPrime(17)); // true

// 扩展方法（Dart 2.7+）
extension StringExtensions on String {
  bool get isValidEmail => contains('@') && contains('.');
  String get capitalize {
    if (isEmpty) return this;
    return this[0].toUpperCase() + substring(1);
  }
}

print('test@example.com'.isValidEmail); // true
print('hello'.capitalize); // Hello
```

## 实际案例

```dart
// 方法重载效果（通过可选参数实现）
String formatDate(int year,
    {int month = 1, int day = 1, String separator = '-'}) {
  return '$year$separator${month.toString().padLeft(2, '0')}'
      '${separator}${day.toString().padLeft(2, '0')}';
}

print(formatDate(2024));                          // 2024-01-01
print(formatDate(2024, month: 12, day: 25));      // 2024-12-25
print(formatDate(2024, month: 3, day: 8,
    separator: '/'));                              // 2024/03/08

// 方法作为回调
void processNumbers(List<int> numbers,
    {Function(int) onEven, Function(int) onOdd}) {
  for (var n in numbers) {
    if (n % 2 == 0 && onEven != null) {
      onEven(n);
    } else if (onOdd != null) {
      onOdd(n);
    }
  }
}

processNumbers([1, 2, 3, 4, 5],
    onEven: (n) => print('$n 是偶数'),
    onOdd: (n) => print('$n 是奇数'));
```
