---
order: 1
---
# Dart 基础入门

## 前言

谷歌推出 Flutter 跨平台 UI 框架后，对移动端的开发又产生了新的影响。Flutter 采用 **Dart** 语言开发，其拥有如下优势：

- **AOT 编译**：发布时编译成平台本地代码，运行性能高
- **JIT 编译**：开发时即时编译，支持亚秒级热重载
- **流畅动画**：以 60fps 运行的流畅动画和转场
- **语法友好**：结合 Java 与 JavaScript 语法特点，上手快速

## 安装 Dart SDK

[官方下载地址](https://dart.dev/get-dart)

共有三种 SDK 版本：

- **Flutter** — 包含 Flutter SDK + Dart SDK
- **Web** — 用于 Web 开发
- **Server** — 用于命令行/后端开发（推荐学习用）

> 学习 Dart 语法建议安装 **Server** 版 SDK。

### 配置环境变量

安装完成后，将 `dart-sdk/bin` 目录添加到系统 Path 环境变量中。

### 配置 VSCode 编辑器

推荐使用 VSCode 学习 Dart：

1. 从 [官网](https://code.visualstudio.com/) 下载 VSCode
2. 安装后在插件商店搜索 **Dart** 插件并安装

### 测试环境

新建 `test.dart` 文件：

```dart
void main() {
  print('hello world!');
}
```

运行后成功在控制台输出 `hello world!`

## 基础语法

### 代码注释

```dart
// 单行注释

/*
 * 多行注释
 */

/// 使用三个斜杠开头
/// 这是 Dart 特有的文档注释（推荐）

/**
 * 文档注释
 * 可用于生成文档
 */
```

### 内置数据类型

> 在 Dart 中，所有能够使用变量引用的都是**对象**，每个对象都是一个类的实例。数字、函数和 `null` 也都是对象。所有对象都继承于 Object 类。

要注意，**没有初始化的变量默认值为 `null`**。数值类型变量的默认值也是 `null`。

数值类型 `num` 有两个具体子类：
- `int` — 整数值（范围 -2^53 至 2^53）
- `double` — 64 位双精度浮点数

### main 函数

Dart 程序的入口是 `main` 函数：

```dart
void main() {
  print('Hello, Dart!');
}

// 支持 async main
Future<void> main() async {
  var data = await fetchData();
  print(data);
}
```

### 打印输出

```dart
print('普通文本');
print(42);                        // 数字
print(true);                      // 布尔值
print([1, 2, 3]);                 // 列表
print({'a': 1, 'b': 2});          // 映射
print('结果：${42 + 1}');          // 插值表达式
```

## 变量与常量

### 定义变量

```dart
// 1. 显式指定类型（推荐）
String name = '张三';
int age = 25;
double height = 175.5;

// 2. 使用 var（类型推断）
var address = '深南大道';
var id = 100;

// var 赋值后类型锁定
var number = 19;
// number = '2019'; // ❌ 编译错误

// 3. dynamic（动态类型，不推荐滥用）
dynamic value = 'hello';
value = 42; // 可以改变类型

// 4. Object（所有类型的基类）
Object obj = 'world';
```

### 变量声明建议

```dart
// ✅ 推荐：显式指定类型，提高可读性
String userName = '张三';
int userAge = 25;

// ✅ 类型明显时使用 var
var map = <String, int>{'a': 1, 'b': 2};
var list = [1, 2, 3];

// ⚠️ 谨慎使用 dynamic
dynamic something = 'ok';
```

### 定义常量

```dart
// final — 运行时常量（只能赋值一次）
final now = DateTime.now();  // ✅ 运行时确定
final name = '张三';

// const — 编译时常量（值必须编译期确定）
const pi = 3.14159;
const appName = 'MyApp';
// const time = DateTime.now(); // ❌ 编译错误

// const 创建编译时常量对象
const point = [1, 2, 3];     // 不可变列表
// point[0] = 10;             // ❌ 运行时错误
```

## 运算符

### 算术运算符

```dart
print(10 + 3);  // 13
print(10 - 3);  // 7
print(10 * 3);  // 30
print(10 / 3);  // 3.333...（返回 double）
print(10 ~/ 3); // 3（整除，返回 int）
print(10 % 3);  // 1（取余）
```

### 类型判定运算符

| 操作符 | 说明 |
|--------|------|
| `as` | 类型转换（不成功抛异常） |
| `is` | 如果是该类型返回 true |
| `is!` | 如果不是该类型返回 true |

```dart
var value = 'Hello Dart';

print(value is String);  // true
print(value is int);     // false
print(value is! int);    // true

// as 转换
String str = value as String;

// 推荐：用 is 判断后再使用
if (value is String) {
  print(value.length); // 自动类型提升
}
```

### 条件表达式

```dart
// 三目运算符
var age = 20;
var status = age >= 18 ? '成年' : '未成年';
print(status); // 成年

// ?? 运算符（非空判断）
String? name;
var display = name ?? '匿名用户';
print(display); // 匿名用户
```

### 级联运算符 ..

在同一个对象上连续调用多个方法。

```dart
class Person {
  String? name;
  int? age;
  void sayHello() => print('你好，我是$name');
}

void main() {
  Person()
    ..name = '张三'
    ..age = 25
    ..sayHello();
}
```

### 条件成员访问符 ?.

```dart
List<int>? list;
print(list?.length); // null（不会抛空指针）

list = [1, 2, 3];
print(list?.length); // 3
```

## 分支与循环

### 条件分支

```dart
// if / else if / else
var score = 85;
if (score >= 90) {
  print('优秀');
} else if (score >= 60) {
  print('及格');
} else {
  print('不及格');
}

// switch（支持整数、字符串、枚举）
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    print('已关闭');
    break;
  case 'OPEN':
    print('已打开');
    break;
  default:
    print('未知');
}
```

### 循环语句

```dart
// for 循环
for (var i = 0; i < 5; i++) {
  print(i);
}

// while
var i = 0;
while (i < 5) {
  print(i);
  i++;
}

// do-while
var j = 0;
do {
  print(j);
  j++;
} while (j < 5);
```

### Dart 特有循环

```dart
var myList = ['Java', 'JavaScript', 'Dart'];

// for-in（类似 Java 增强 for）
for (var item in myList) {
  print(item);
}

// forEach
myList.forEach((item) => print(item));

// 箭头函数简写
myList.forEach(print);

// 遍历 Map
var myMap = {
  'zhangsan': '201901',
  'lisi': '201902',
  'wangwu': '201903',
};

myMap.forEach((k, v) => print('$k : $v'));
for (var k in myMap.keys) {
  print('$k : ${myMap[k]}');
}
```

## 完整示例

```dart
// 基础数据类型示例
void main() {
  // 变量
  String name = '张三';
  int age = 25;
  bool isStudent = true;

  // 常量
  final now = DateTime.now();
  const pi = 3.14;

  // 集合
  var fruits = ['苹果', '香蕉', '橘子'];
  var scores = {'语文': 90, '数学': 85};

  // 字符串插值
  print('姓名：$name，年龄：${age}岁');
  print('是否学生：$isStudent');
  print('当前时间：$now');
  print('最爱吃：${fruits[0]}');
  print('数学成绩：${scores['数学']}');

  // 条件与循环
  if (age >= 18) {
    print('已成年');
  }

  for (var fruit in fruits) {
    print('水果：$fruit');
  }

  // 类型转换
  var str = '42';
  var num = int.parse(str);
  print(num * 2); // 84
}
```
