# Record 与模式匹配

[官方文档](https://dart.dev/language/records)

Dart 3.0+ 引入了 Record（记录）和强大的模式匹配（Pattern Matching）功能。

## Record 类型

Record 是一种轻量级、不可变的聚合类型，无需定义类即可组合多个值。

### 创建 Record

```dart
// 位置 Record：通过位置访问
var record = ('张三', 25, '北京');
print(record.$1); // 张三
print(record.$2); // 25
print(record.$3); // 北京

// 命名 Record：通过名称访问
var person = (name: '张三', age: 25, city: '北京');
print(person.name); // 张三
print(person.age);  // 25
print(person.city); // 北京

// 混合使用（不推荐）
var mixed = ('id', value: 42, true);
print(mixed.$1);       // id
print(mixed.value);    // 42
print(mixed.$2);       // true
```

### Record 类型标注

```dart
// 位置 Record 类型
(String, int) record = ('张三', 25);

// 命名 Record 类型
({String name, int age}) person = (name: '李四', age: 30);

// 作为函数返回值
(String, int) getPerson() {
  return ('王五', 35);
}

// 作为函数参数
void printPerson((String, int) person) {
  print('${person.$1}：${person.$2}岁');
}

void main() {
  var p = getPerson();
  printPerson(p); // 王五：35岁
}
```

### Record 的特性

```dart
// 不可变
var record = (a: 1, b: 2);
// record.a = 10; // ❌

// 值相等（比较所有字段）
var r1 = (1, 'hello');
var r2 = (1, 'hello');
print(r1 == r2); // true

// 作为 Map 的键
var map = {
  (1, 'a'): 'value1',
  (2, 'b'): 'value2',
};
print(map[(1, 'a')]); // value1

// 解构赋值
var (name, age) = getPerson();
print('$name, $age');
```

## 模式匹配（Pattern Matching）

### 解构（Destructuring）

```dart
// 列表解构
var list = [1, 2, 3];
var [a, b, c] = list;
print('$a, $b, $c'); // 1, 2, 3

// 忽略元素
var [first, _, last] = [10, 20, 30];
print('$first, $last'); // 10, 30

// 剩余元素
var [head, ...rest] = [1, 2, 3, 4, 5];
print('$head, $rest'); // 1, [2, 3, 4, 5]

// Map 解构
var map = {'name': '张三', 'age': 25};
var {'name': name, 'age': age} = map;
print('$name, $age'); // 张三, 25

// Record 解构
var (x, y) = (10, 20);
print('$x, $y'); // 10, 20

var (name: n, age: a) = (name: '李四', age: 30);
print('$n, $a'); // 李四, 30
```

### switch 表达式

```dart
// 基础 switch 表达式
String describe(int value) {
  return switch (value) {
    0 => '零',
    1 => '一',
    2 => '二',
    _ => '其他', // 默认分支
  };
}

print(describe(1)); // 一
print(describe(5)); // 其他

// 类型匹配 + 守卫
String classify(dynamic value) {
  return switch (value) {
    int i when i > 0 => '正整数 $i',
    int i when i < 0 => '负整数 $i',
    int i => '零',
    String s => '字符串：$s',
    bool b => '布尔值：$b',
    null => '空值',
    _ => '未知类型',
  };
}

print(classify(42));      // 正整数 42
print(classify('hello')); // 字符串：hello
print(classify(null));    // 空值
```

### 模式匹配 with switch

```dart
// 列表模式
String matchList(List<int> list) {
  return switch (list) {
    [] => '空列表',
    [1, 2, 3] => '完全匹配 [1, 2, 3]',
    [1, _, 3] => '以 1 开头以 3 结尾，中间任意',
    [1, ..] => '以 1 开头',
    [.., 5] => '以 5 结尾',
    [first, second] => '两个元素：$first, $second',
    _ => '其他：$list',
  };
}

print(matchList([1, 2, 3])); // 完全匹配 [1, 2, 3]
print(matchList([1, 99, 3])); // 以 1 开头以 3 结尾
print(matchList([4, 5]));    // 两个元素：4, 5

// Record 模式
(String, int) person = ('张三', 25);
var description = switch (person) {
  ('张三', var age) => '张三，$age 岁',
  (var name, 25) => '$name，25岁',
  (var name, var age) => '$name，$age 岁',
};
print(description); // 张三，25 岁

// 类模式
class Point {
  final int x, y;
  Point(this.x, this.y);
}

String where(Point p) {
  return switch (p) {
    Point(x: 0, y: 0) => '原点',
    Point(x: 0) => 'Y 轴上',
    Point(y: 0) => 'X 轴上',
    Point(x: var x, y: var y) => '点 ($x, $y)',
  };
}

print(where(Point(0, 0))); // 原点
print(where(Point(3, 4))); // 点 (3, 4)
```

### 多分支模式

```dart
// 或模式（|）
String isVowel(char) {
  return switch (char) {
    'a' | 'e' | 'i' | 'o' | 'u' => '元音',
    _ => '辅音',
  };
}

print(isVowel('a')); // 元音
print(isVowel('b')); // 辅音

// 与模式（&）
(String name, int age) p = ('张三', 25);
var match = switch (p) {
  (var name, var age) when age >= 18 => '$name 已成年',
  _ => '未成年',
};

// 关系模式
var score = 85;
var grade = switch (score) {
  >= 90 => 'A',
  >= 80 => 'B',
  >= 70 => 'C',
  >= 60 => 'D',
  _ => 'F',
};
print(grade); // B
```

## if-case 模式

在 if 语句中直接匹配和解构。

```dart
// 基本 if-case
if (getPerson() case (var name, var age)) {
  print('$name, $age');
}

// 带条件
if (getPerson() case (var name, var age) when age >= 18) {
  print('$name 已成年');
}

// 配合 nullable
String? maybeName = '张三';
if (maybeName case var name?) {
  print('名字：$name');
}

// 类型判断 + 解构
dynamic value = 'hello';
if (value case int i) {
  print('整数：$i');
} else if (value case String s) {
  print('字符串：$s'); // 命中
}
```

## for-case 循环

```dart
var pairs = [(1, 'a'), (2, 'b'), (3, 'c')];

for (var (id, label) in pairs) {
  print('$id: $label');
}
// 输出：
// 1: a
// 2: b
// 3: c

// 带条件
var values = [1, 2, null, 4, null, 6];
for (var v? in values) {
  print(v); // 只输出非 null
}
// 1, 2, 4, 6
```

## 实际案例

### 计算器

```dart
dynamic calculate((String op, double a, double b) expr) {
  return switch (expr) {
    ('+', var a, var b) => a + b,
    ('-', var a, var b) => a - b,
    ('*', var a, var b) => a * b,
    ('/', var a, var b) when b != 0 => a / b,
    ('/', _, _) => '除数不能为零',
    _ => '未知运算符',
  };
}

void main() {
  print(calculate(('+', 10, 20))); // 30.0
  print(calculate(('*', 5, 6)));   // 30.0
  print(calculate(('/', 10, 0)));  // 除数不能为零
}
```

### JSON 解析

```dart
dynamic parseJson(Map<String, dynamic> json) {
  return switch (json) {
    {'type': 'user', 'name': var name, 'age': var age} =>
      '用户：$name，$age 岁',
    {'type': 'product', 'name': var name, 'price': var price} =>
      '商品：$name，¥$price',
    {'type': 'order', 'id': var id, 'total': var total} =>
      '订单 #$id，合计 ¥$total',
    _ => '未知类型',
  };
}

void main() {
  print(parseJson({
    'type': 'user',
    'name': '张三',
    'age': 25,
  })); // 用户：张三，25 岁

  print(parseJson({
    'type': 'product',
    'name': '手机',
    'price': 2999,
  })); // 商品：手机，¥2999
}
```
