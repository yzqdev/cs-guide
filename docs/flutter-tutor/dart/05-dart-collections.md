---
order: 5
---

# Dart 集合操作与高级语法

[官方文档](https://dart.dev/guides/libraries/library-tour#collections)

## Iterable 常用方法

Dart 的 `List`、`Set` 等都实现了 `Iterable` 接口，提供丰富的函数式操作方法。

### 遍历

```dart
var numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach((n) => print(n));

// 使用箭头函数简写
numbers.forEach(print);

// 带索引
numbers.asMap().forEach((i, n) {
  print('numbers[$i] = $n');
});
```

### map — 映射/转换

```dart
var numbers = [1, 2, 3, 4, 5];

// 每个元素平方
var squares = numbers.map((n) => n * n);
print(squares); // (1, 4, 9, 16, 25)

// 转换为字符串
var strings = numbers.map((n) => '数字 $n').toList();
print(strings); // [数字 1, 数字 2, 数字 3, 数字 4, 数字 5]

// 类型转换
var doubles = numbers.map<double>((n) => n.toDouble());
```

### where — 筛选

```dart
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 筛选偶数
var evens = numbers.where((n) => n % 2 == 0);
print(evens); // (2, 4, 6, 8, 10)

// 筛选符合条件
var big = numbers.where((n) => n > 5);
print(big); // (6, 7, 8, 9, 10)

// whereType — 按类型筛选
var mixed = [1, 'hello', 2, 'world', 3];
var justStrings = mixed.whereType<String>();
print(justStrings); // (hello, world)
```

### reduce / fold — 聚合

```dart
var numbers = [1, 2, 3, 4, 5];

// reduce：累加
var sum = numbers.reduce((a, b) => a + b);
print(sum); // 15

// reduce：累乘
var product = numbers.reduce((a, b) => a * b);
print(product); // 120

// fold：带初始值
var sum2 = numbers.fold(0, (a, b) => a + b);
print(sum2); // 15

// fold：拼接字符串
var joined = numbers.fold('', (a, b) => '$a, $b');
print(joined); // , 1, 2, 3, 4, 5
```

### any / every — 判断

```dart
var numbers = [1, 2, 3, 4, 5];

// any：是否有任意元素满足条件
print(numbers.any((n) => n > 3)); // true
print(numbers.any((n) => n > 10)); // false

// every：是否所有元素满足条件
print(numbers.every((n) => n > 0)); // true
print(numbers.every((n) => n > 3)); // false
```

### 排序

```dart
var numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// 升序
numbers.sort();
print(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

// 降序（自定义比较器）
numbers.sort((a, b) => b.compareTo(a));
print(numbers); // [9, 6, 5, 4, 3, 2, 1, 1]

// 对象排序
class Person {
  final String name;
  final int age;
  Person(this.name, this.age);
}

var people = [
  Person('张三', 25),
  Person('李四', 18),
  Person('王五', 30),
];

// 按年龄排序
people.sort((a, b) => a.age.compareTo(b.age));
people.forEach((p) => print('${p.name}: ${p.age}'));
// 李四: 18
// 张三: 25
// 王五: 30
```

### 查找元素

```dart
var numbers = [1, 2, 3, 4, 5, 3];

// first / last
print(numbers.first); // 1
print(numbers.last); // 3

// firstWhere / lastWhere
print(numbers.firstWhere((n) => n > 3)); // 4
print(numbers.lastWhere((n) => n > 3)); // 5

// 带默认值
print(numbers.firstWhere((n) => n > 10, orElse: () => -1)); // -1

// single：唯一匹配（多于一个会抛异常）
print(numbers.singleWhere((n) => n > 4, orElse: () => -1)); // 5

// contains
print(numbers.contains(3)); // true
print(numbers.contains(10)); // false

// indexOf / lastIndexOf
print(numbers.indexOf(3)); // 2
print(numbers.lastIndexOf(3)); // 5
```

### 链式调用

```dart
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 链式组合：筛选 → 转换 → 排序 → 取前3
var result = numbers
    .where((n) => n % 2 == 0) // 偶数
    .map((n) => n * n) // 平方
    .toList() // 转 List
    ..sort((a, b) => b.compareTo(a)); // 降序

print(result); // [100, 64, 36, 16, 4]
```

## 集合展开与条件

### 展开运算符 ...

```dart
var list1 = [1, 2, 3];
var list2 = [4, 5, 6];

// 展开合并
var combined = [...list1, ...list2];
print(combined); // [1, 2, 3, 4, 5, 6]

// 混合使用
var result = [0, ...list1, 10, ...list2, 100];
print(result); // [0, 1, 2, 3, 10, 4, 5, 6, 100]

// 展开 Set
var set = {...{1, 2}, ...{3, 4}};
print(set); // {1, 2, 3, 4}

// 展开 Map
var map = {...{'a': 1}, ...{'b': 2}};
print(map); // {a: 1, b: 2}
```

### 空安全展开 ...?

```dart
List<int>? nullableList;

// 如果可空集合为 null，...? 不会添加任何元素
var result = [1, 2, ...?nullableList, 3];
print(result); // [1, 2, 3]

// 普通展开会报错
// var error = [1, 2, ...nullableList]; // ❌
```

### 集合中的 if

```dart
bool includeExtra = true;

var items = [
  '苹果',
  '香蕉',
  if (includeExtra) '额外水果',
  '橘子',
];
print(items); // [苹果, 香蕉, 额外水果, 橘子]

// 可配合 else（Dart 3.0+）
bool isLoggedIn = false;
var menu = [
  '首页',
  '关于',
  if (isLoggedIn) '个人中心' else '登录',
];
print(menu); // [首页, 关于, 登录]
```

### 集合中的 for

```dart
var numbers = [1, 2, 3];

// 使用 for 生成集合
var doubled = [
  for (var n in numbers) n * 2,
];
print(doubled); // [2, 4, 6]

// 结合条件
var more = [
  for (var n in numbers)
    if (n > 1) n * n,
];
print(more); // [4, 9]

// Map 中的 for
var keys = ['a', 'b', 'c'];
var map = {
  for (var k in keys) k: k.toUpperCase(),
};
print(map); // {a: A, b: B, c: C}
```

## 级联运算符 ..

在同一个对象上连续调用多个方法。

```dart
class Person {
  String? name;
  int? age;
  List<String> hobbies = [];

  void sayHello() => print('你好，我是$name');
  void addHobby(String h) => hobbies.add(h);
}

void main() {
  // 传统方式
  var p1 = Person();
  p1.name = '张三';
  p1.age = 25;
  p1.addHobby('编程');
  p1.sayHello();

  // 级联写法
  var p2 = Person()
    ..name = '李四'
    ..age = 30
    ..addHobby('读书')
    ..addHobby('运动')
    ..sayHello();

  // 级联 + 嵌套
  var list = <int>[1, 2]
    ..add(3)
    ..addAll([4, 5])
    ..sort();
  print(list); // [1, 2, 3, 4, 5]
}
```

## Set 集合运算

```dart
var setA = {1, 2, 3, 4};
var setB = {3, 4, 5, 6};

// 并集
print(setA.union(setB)); // {1, 2, 3, 4, 5, 6}

// 交集
print(setA.intersection(setB)); // {3, 4}

// 差集
print(setA.difference(setB)); // {1, 2}
print(setB.difference(setA)); // {5, 6}

// 包含关系
print(setA.containsAll({1, 2})); // true
print(setA.containsAll({1, 5})); // false
```

## Map 高级操作

```dart
var map = {'a': 1, 'b': 2, 'c': 3};

// 遍历
map.forEach((key, value) {
  print('$key -> $value');
});

// 映射键值
var updated = map.map((key, value) =>
    MapEntry(key.toUpperCase(), value * 10));
print(updated); // {A: 10, B: 20, C: 30}

// 筛选
var bigValues = map.where((key, value) => value > 1);
print(bigValues); // {b: 2, c: 3}

// 转换为 List
var entries = map.entries.toList();
entries.forEach((e) => print('${e.key}: ${e.value}'));

// 安全获取
print(map['d']); // null（不抛异常）
print(map['d'] ?? 0); // 0

// putIfAbsent（不存在则添加）
map.putIfAbsent('d', () => 4);
print(map); // {a: 1, b: 2, c: 3, d: 4}

// update（更新或添加）
map.update('a', (v) => v + 10, ifAbsent: () => 0);
print(map['a']); // 11

// removeWhere
map.removeWhere((key, value) => value <= 0);
```

## 实际案例

```dart
// 学生成绩分析
class Student {
  final String name;
  final int score;
  Student(this.name, this.score);
}

void main() {
  var students = [
    Student('张三', 85),
    Student('李四', 92),
    Student('王五', 67),
    Student('赵六', 78),
    Student('钱七', 95),
  ];

  // 及格名单
  var passed = students
      .where((s) => s.score >= 60)
      .map((s) => s.name)
      .toList();
  print('及格：$passed');

  // 平均分
  var avg = students
      .map((s) => s.score)
      .reduce((a, b) => a + b) /
      students.length;
  print('平均分：${avg.toStringAsFixed(1)}');

  // 优秀学生（>= 90）
  var excellent = students
      .where((s) => s.score >= 90)
      .map((s) => '${s.name} (${s.score})')
      .toList();
  print('优秀：$excellent');

  // 按分数排序
  var ranked = [...students]
    ..sort((a, b) => b.score.compareTo(a.score));
  print('第一名：${ranked[0].name} (${ranked[0].score})');

  // 使用 collection-for 生成排名列表
  var ranking = [
    for (var i = 0; i < ranked.length; i++)
      '第${i + 1}名：${ranked[i].name} (${ranked[i].score})',
  ];
  ranking.forEach(print);
}
```
