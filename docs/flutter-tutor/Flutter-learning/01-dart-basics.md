---
order: 1
---

# Dart 语言基础

## 1. 变量与数据类型

```dart
// 变量声明
var name = 'Flutter';        // 类型推断
String name2 = 'Dart';       // 显式类型
dynamic dynamicVar = 'any';  // 动态类型
final age = 30;              // 不可变（运行时常量）
const pi = 3.14;            // 常量（编译时常量）

// 基本数据类型
int count = 42;
double price = 19.99;
String message = 'Hello';
bool isActive = true;

// 集合类型
List<String> fruits = ['apple', 'banana'];
Set<int> numbers = {1, 2, 3};
Map<String, int> scores = {'Alice': 95, 'Bob': 87};

// 空安全
String? nullableString = null;  // 可空类型
String nonNull = 'always';      // 非空类型
late String lazyInit;           // 延迟初始化
```

## 2. 函数

```dart
// 基本函数
int add(int a, int b) {
  return a + b;
}

// 箭头函数
int multiply(int a, int b) => a * b;

// 可选参数
void greet(String name, [String? title]) {
  print('Hello $name');
}

// 命名参数
void createUser({required String name, int age = 18}) {
  print('$name is $age years old');
}

// 匿名函数
var list = [1, 2, 3];
list.forEach((item) {
  print(item);
});

// 函数作为参数
void execute(Function fn) {
  fn();
}
```

## 3. 控制流

```dart
// if-else
if (score >= 90) {
  print('A');
} else if (score >= 80) {
  print('B');
} else {
  print('C');
}

// switch
switch (grade) {
  case 'A':
    print('优秀');
    break;
  case 'B':
    print('良好');
    break;
  default:
    print('继续努力');
}

// for 循环
for (var i = 0; i < 5; i++) {
  print(i);
}

// for-in
for (var fruit in fruits) {
  print(fruit);
}

// while
while (count > 0) {
  count--;
}
```

## 4. 类与面向对象

```dart
class Person {
  String name;
  int age;

  // 构造函数
  Person(this.name, this.age);

  // 命名构造函数
  Person.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        age = json['age'];

  // 方法
  void sayHello() {
    print('Hi, I\'m $name');
  }

  // Getter/Setter
  String get greeting => 'Hello, $name';
  set setName(String newName) => name = newName;
}

// 继承
class Student extends Person {
  String school;

  Student(String name, int age, this.school) : super(name, age);

  @override
  void sayHello() {
    super.sayHello();
    print('I study at $school');
  }
}

// 抽象类
abstract class Animal {
  void makeSound();  // 抽象方法
}

class Dog extends Animal {
  @override
  void makeSound() => print('Woof!');
}
```

## 5. Mixin（混入）

```dart
mixin Flyable {
  void fly() => print('飞行中');
}

mixin Swimmable {
  void swim() => print('游泳中');
}

class Bird with Flyable {}
class Duck with Flyable, Swimmable {}
```

## 6. 异步编程

```dart
// Future
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 1));
  return '数据加载完成';
}

// async/await
void loadData() async {
  print('加载中...');
  String data = await fetchData();
  print(data);
}

// Stream
Stream<int> countStream() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

// 使用 Stream
void listenStream() {
  countStream().listen((value) {
    print(value);
  });
}
```

## 7. 常用集合操作

```dart
var numbers = [1, 2, 3, 4, 5];

// map（映射）
var doubled = numbers.map((n) => n * 2);

// 过滤（where）
var evens = numbers.where((n) => n.isEven);

// 规约（reduce）
var sum = numbers.reduce((a, b) => a + b);

// forEach（遍历）
numbers.forEach(print);

// 展开运算符
var combined = [...numbers, 6, 7, 8];

// 集合中的 if 和 for
var list = [
  if (isAdmin) 'admin',
  for (var i in numbers) i.toString()
];
```
