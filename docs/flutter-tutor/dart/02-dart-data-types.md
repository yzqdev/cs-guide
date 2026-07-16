---
order: 2
---
# Dart 数据类型

[官方文档](https://dart.dev/language/built-in-types)

## 变量声明总结

| 关键字 | 特点 | 示例 |
|--------|------|------|
| `var` | 类型推断，赋值后类型锁定 | `var name = '张三';` |
| `dynamic` | 动态类型，编译时不检查 | `dynamic x = 'hello'; x = 42;` |
| `Object` | 动态类型，编译时检查 | `Object x = 'hello';` |
| `final` | 运行时常量，只能赋值一次 | `final now = DateTime.now();` |
| `const` | 编译时常量，值必须编译期确定 | `const pi = 3.14;` |

```dart
// var 与类型锁定
var name = '张三';
// name = 42; // ❌ 编译错误

// dynamic 可随意改变类型
dynamic value = 'hello';
value = 42; // ✅ 可以

// Object 编译时检查
Object obj = 'world';
// obj.length; // ❌ Object 没有 length 属性
if (obj is String) {
  print(obj.length); // ✅ 类型提升后可以
}
```

## 一、Dart 有哪些数据类型

Dart 内置的数据类型：

- **数字**：`int`、`double`、`num`
- **字符串**：`String`
- **布尔**：`bool`
- **列表**：`List`
- **映射**：`Map`
- **集合**：`Set`（Dart 2.0+）
- **符号**：`Symbol`
- **空值**：`Null`

## 二、数字类型

### int 类型

整型，即整数，如 1、2、10、20 等。

```dart
int number = 10;
var count = 20; // 类型推断为 int
int hex = 0xFF; // 十六进制
print(hex); // 255
```

### double 类型

浮点型，即包含小数的数字。

```dart
double number = 10.1;
var price = 19.99; // 类型推断为 double
double scientific = 1.23e5; // 科学计数法
print(scientific); // 123000.0
```

### num 类型

num 是 int 和 double 的父类，可以是整数或浮点数。

```dart
num number = 1;
number = 1.01; // ✅ 可以切换类型

// 类型转换
int a = 42;
double b = a.toDouble(); // int → double
int c = b.toInt();       // double → int

// 字符串 → 数字
var one = int.parse('1');
var pi = double.parse('3.14');

// 数字 → 字符串
String str = 42.toString();        // '42'
String hex = 255.toRadixString(16); // 'ff'
String fixed = 3.14159.toStringAsFixed(2); // '3.14'
```

### 位运算

```dart
print(3 << 1);  // 6 (0011 << 1 = 0110)
print(3 >> 1);  // 1 (0011 >> 1 = 0001)
print(3 | 4);   // 7 (0011 | 0100 = 0111)
print(3 & 4);   // 0 (0011 & 0100 = 0000)
print(3 ^ 4);   // 7 (0011 ^ 0100 = 0111)
print(~3);      // -4 (按位取反)
```

## 三、字符串类型

### 基本用法

```dart
// 单引号或双引号都可以
String s1 = 'hello';
String s2 = "world";

// 多行字符串（三个引号）
String multi = """
你可以像这样，创建一个
包含了多行的字符串内容
""";

// 原始字符串（r 前缀，不转义）
String path = r'D:\workspace\code';
print(path); // D:\workspace\code
```

### 拼接与插值

```dart
var name = '张三';
var age = 25;

// 字符串插值
print('hello, $name');         // hello, 张三
print('${name}今年${age}岁');  // 张三今年25岁
print('明年${age + 1}岁');     // 明年26岁

// 表达式插值
var s = 'link';
print('click ${s.toUpperCase()}'); // click LINK

// + 拼接
var greet = 'hello' + ' ' + 'world';

// 字符串比较（== 比较内容）
print('hello' == 'world'); // false
print('hello' == 'hello'); // true
```

### 常用方法

```dart
var text = 'Hello Dart';

print(text.length);               // 10
print(text.toUpperCase());        // HELLO DART
print(text.toLowerCase());        // hello dart
print(text.contains('Dart'));     // true
print(text.startsWith('Hello'));  // true
print(text.endsWith('Dart'));     // true
print(text.indexOf('Dart'));      // 6
print(text.substring(0, 5));      // Hello
print(text.replaceAll('Dart', 'Flutter')); // Hello Flutter
print('  hello  '.trim());        // hello
print(text.split(' '));           // [Hello, Dart]
print(''.isEmpty);                // true
print('   '.isNotEmpty);          // true
```

## 四、布尔类型

```dart
bool isEnabled = true;
bool isHidden = false;

// 注意：Dart 中不能使用 0/非0 或 null/非null 代表 true/false
// if (1) { }        // ❌ 编译错误
// if ('hello') { }  // ❌ 编译错误

bool? flags; // 可空布尔
print(flags); // null (默认值)
```

## 五、列表类型（List）

### 创建与访问

```dart
// 创建列表
var list = [1, 2, 3];
List<int> numbers = [1, 2, 3]; // 指定类型
var mixed = [1, 'hello', true]; // 任意类型

// 访问元素
print(list[0]);      // 1
print(list.length);  // 3

// 修改
list[0] = 10;
list.add(4);
list.addAll([5, 6]);

// 不可变列表
var constantList = const [1, 2, 3];
// constantList[0] = 10; // ❌ 运行时错误

// 空安全
List<int>? nullableList;
// print(nullableList?.length); // null（使用 dart-null-safety 语法）
```

### 常用方法

```dart
var list = [3, 1, 4, 1, 5];

list.add(9);               // 添加
list.insert(0, 0);         // 插入到索引0
list.remove(1);            // 移除值为1的元素
list.removeAt(0);          // 移除索引0的元素
list.removeLast();         // 移除最后一个
print(list.contains(4));   // true
print(list.indexOf(4));    // 查看索引
list.sort();               // 排序
print(list.reversed);      // 反转
list.shuffle();            // 打乱
print(list.join(', '));    // 转字符串
list.clear();              // 清空
```

## 六、映射类型（Map）

### 创建与访问

```dart
// 字面量创建
var gifts = {
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings',
};

// 构造函数创建
var map = <String, int>{};
map['a'] = 1;
map['b'] = 2;

// 指定泛型
Map<int, String> numbers = {
  1: 'one',
  2: 'two',
  3: 'three',
};

// 访问
print(gifts['first']);   // partridge
print(gifts['unknown']); // null（键不存在不抛异常）
print(gifts.length);     // 3
```

### 常用方法

```dart
var map = {'a': 1, 'b': 2, 'c': 3};

print(map.keys);       // (a, b, c)
print(map.values);     // (1, 2, 3)
print(map.containsKey('a')); // true
print(map.containsValue(2)); // true

// 添加/更新
map['d'] = 4;        // 添加
map['a'] = 10;       // 更新

map.putIfAbsent('e', () => 5); // 不存在则添加
map.update('a', (v) => v + 10); // 更新
map.addAll({'f': 6, 'g': 7});   // 批量添加

// 遍历
map.forEach((key, value) => print('$key: $value'));

// 移除
map.remove('a');
map.removeWhere((key, value) => value < 3);
```

## 七、集合类型（Set）

```dart
// 创建 Set（元素唯一）
var set = {1, 2, 3, 3, 2, 1};
print(set); // {1, 2, 3}（重复自动去重）

set.add(4);
set.addAll([5, 6]);
set.remove(1);

print(set.contains(2)); // true

// 集合运算
var a = {1, 2, 3, 4};
var b = {3, 4, 5, 6};

print(a.union(b));        // {1, 2, 3, 4, 5, 6}
print(a.intersection(b)); // {3, 4}
print(a.difference(b));   // {1, 2}
```

## 八、类型判断与转换

```dart
var value = 'hello';

// is 判断类型
print(value is String);  // true
print(value is int);     // false
print(value is! int);    // true

// as 类型转换（不成功会抛异常）
String str = value as String;

// 推荐：用 is 先判断再使用
if (value is String) {
  print(value.length); // 自动类型提升
}
```

## 数据类型速查表

| 类型 | 默认值 | 描述 | 示例 |
|------|--------|------|------|
| `int` | `null` | 整数 | `42` |
| `double` | `null` | 浮点数 | `3.14` |
| `num` | `null` | int 或 double | `42` 或 `3.14` |
| `String` | `null` | 字符串 | `'hello'` |
| `bool` | `null` | 布尔值 | `true` / `false` |
| `List` | `null` | 有序列表 | `[1, 2, 3]` |
| `Map` | `null` | 键值对 | `{'a': 1}` |
| `Set` | `null` | 不重复集合 | `{1, 2, 3}` |
| `dynamic` | `null` | 动态类型 | 任意值 |
| `Null` | `null` | 仅 null | `null` |

> 提示：Dart 中所有类型的默认值都是 `null`（包括数字和布尔类型）。
