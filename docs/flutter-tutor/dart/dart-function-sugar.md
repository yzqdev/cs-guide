# Dart 函数语法糖

Dart 中函数是一等公民，提供了大量语法糖让函数定义和调用更加简洁。

## 箭头函数 `=>`

单表达式函数体的缩写形式。

```dart
// 完整写法
int add(int a, int b) {
  return a + b;
}

// 箭头函数缩写
int add(int a, int b) => a + b;

// 只有单个表达式时等价
// 箭头函数省略了 {} 和 return

// 无参数
void greet() => print('你好！');

// 一个参数（可省略括号）
var square = (int x) => x * x;
// var square = (x) => x * x;  // 类型也可省略

// 箭头函数作为参数
[1, 2, 3].forEach((n) => print(n));
[3, 1, 2].sort((a, b) => a.compareTo(b));

// 箭头函数在类中
class Calculator {
  int add(int a, int b) => a + b;
  int get pi => 314159 ~/ 100000;
}
```

## 匿名函数（Lambda）

```dart
// 完整匿名函数
var add = (int a, int b) {
  return a + b;
};

// 省略类型
var add = (a, b) {
  return a + b;
};

// 箭头匿名函数
var add = (a, b) => a + b;

// 作为回调
var list = [1, 2, 3];
list.forEach((item) {
  print(item * 2);
});

// 作为返回值
Function makeAdder(int x) {
  return (int y) => x + y;
}

var add5 = makeAdder(5);
print(add5(3)); // 8
```

## Tear-off（方法引用）

当只想引用函数而不调用它时，可以使用 tear-off 语法。

```dart
void main() {
  var list = ['c', 'a', 'b'];

  // 普通 Lambda：包裹一层
  list.sort((a, b) => a.compareTo(b));

  // Tear-off：直接引用方法，更简洁
  list.sort(String.compareTo);
}

// 实例方法 tear-off
class Greeter {
  String greet(String name) => '你好，$name';
}

void main() {
  var greeter = Greeter();

  // 用 Lambda 方式
  var names = ['张三', '李四'];
  var greetings1 = names.map((n) => greeter.greet(n));
  print(greetings1); // (你好，张三, 你好，李四)

  // Tear-off 方式（更简洁）
  var greetings2 = names.map(greeter.greet);
  print(greetings2); // (你好，张三, 你好，李四)
}

/// 静态方法 tear-off
class Utils {
  static bool isEven(int n) => n % 2 == 0;
  static bool isOdd(int n) => n % 2 != 0;
}

void main() {
  var numbers = [1, 2, 3, 4, 5, 6];

  // Lambda
  var evens1 = numbers.where((n) => Utils.isEven(n));

  // Tear-off（推荐）
  var evens2 = numbers.where(Utils.isEven);
  print(evens2); // (2, 4, 6)

  var odds = numbers.where(Utils.isOdd);
  print(odds); // (1, 3, 5)

  // 构造函数 tear-off
  var strings = ['1', '2', '3'];
  var ints = strings.map(int.parse);
  print(ints); // (1, 2, 3)
}
```

## 函数类型别名（typedef）

```dart
// 定义函数类型别名
typedef IntOperation = int Function(int a, int b);

// 使用类型别名
int calculate(int a, int b, IntOperation op) {
  return op(a, b);
}

void main() {
  // 传入不同实现
  print(calculate(10, 5, (a, b) => a + b)); // 15
  print(calculate(10, 5, (a, b) => a - b)); // 5
  print(calculate(10, 5, (a, b) => a * b)); // 50

  // 赋值给变量
  IntOperation multiply = (a, b) => a * b;
  print(multiply(3, 4)); // 12
}

// 带泛型的 typedef
typedef Transformer<T> = T Function(T input);

String upperCase(String s) => s.toUpperCase();
int square(int n) => n * n;

void main() {
  Transformer<String> strTransform = upperCase;
  Transformer<int> intTransform = square;

  print(strTransform('hello')); // HELLO
  print(intTransform(5));       // 25
}
```

## 闭包（Closure）

闭包可以捕获外部作用域的变量。

```dart
// 计数闭包
Function makeCounter() {
  int count = 0;
  return () {
    count++;
    return count;
  };
}

void main() {
  var counter = makeCounter();
  print(counter()); // 1
  print(counter()); // 2
  print(counter()); // 3

  // 每个闭包独立
  var counter2 = makeCounter();
  print(counter2()); // 1（从新开始计数）
}

// 参数化闭包
Function makeMultiplier(int factor) {
  return (int x) => x * factor;
}

void main() {
  var double = makeMultiplier(2);
  var triple = makeMultiplier(3);

  print(double(5)); // 10
  print(triple(5)); // 15

  // 在集合操作中使用闭包
  var numbers = [1, 2, 3, 4, 5];
  var doubled = numbers.map((n) => n * 2).toList();
  print(doubled); // [2, 4, 6, 8, 10]
}
```

## 高阶函数

函数作为参数或返回值。

### 作为参数

```dart
// 接收函数参数
List<int> filter(List<int> items, bool Function(int) test) {
  var result = <int>[];
  for (var item in items) {
    if (test(item)) result.add(item);
  }
  return result;
}

// 传入 Lambda
var numbers = [1, 2, 3, 4, 5, 6];
var evens = filter(numbers, (n) => n % 2 == 0);
print(evens); // [2, 4, 6]

// 传入已定义函数
bool isPositive(int n) => n > 0;
var positives = filter([-1, 2, -3, 4], isPositive);
print(positives); // [2, 4]
```

### 返回值

```dart
// 根据操作符返回对应函数
Function getOperation(String op) {
  switch (op) {
    case '+': return (int a, int b) => a + b;
    case '-': return (int a, int b) => a - b;
    case '*': return (int a, int b) => a * b;
    case '/': return (int a, int b) => a ~/ b;
    default: return (int a, int b) => 0;
  }
}

void main() {
  var add = getOperation('+');
  var multiply = getOperation('*');

  print(add(10, 5));      // 15
  print(multiply(10, 5)); // 50
}
```

## 函数组合

```dart
// 函数组合工具
Function compose(Function f, Function g) {
  return (x) => f(g(x));
}

int square(int x) => x * x;
int addOne(int x) => x + 1;

void main() {
  // 先加1再平方
  var squareAfterAdd = compose(square, addOne);
  print(squareAfterAdd(4)); // (4+1)² = 25

  // 先平方再加1
  var addAfterSquare = compose(addOne, square);
  print(addAfterSquare(4)); // 4²+1 = 17

  // 实际应用：数据处理管道
  var numbers = [1, 2, 3, 4, 5];

  var result = numbers
      .where((n) => n.isOdd)  // 筛选奇数
      .map((n) => n * n)       // 平方
      .toList()
        ..sort((a, b) => b.compareTo(a)); // 降序

  print(result); // [25, 9, 1]
}
```

## 实际案例

### 数据管道

```dart
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

  // 函数式处理管道
  var topStudents = students
      .where((s) => s.score >= 80)           // 筛选优秀
      .map((s) => s.name)                     // 只取名字
      .toList()
        ..sort();                              // 排序

  print('优秀学生：$topStudents'); // [李四, 钱七, 张三]

  // 聚合计算
  var totalScore = students
      .map((s) => s.score)
      .reduce((a, b) => a + b);
  var average = totalScore / students.length;
  print('平均分：${average.toStringAsFixed(1)}'); // 83.4
}
```

### 缓存函数

```dart
/// 创建一个带缓存的函数
Function memoize(Function fn) {
  var cache = <String, dynamic>{};
  return (arg) {
    var key = arg.toString();
    if (cache.containsKey(key)) {
      print('缓存命中：$key');
      return cache[key];
    }
    print('计算：$key');
    var result = fn(arg);
    cache[key] = result;
    return result;
  };
}

int expensiveCalc(int n) {
  // 模拟耗时计算
  return n * n;
}

void main() {
  var cachedCalc = memoize(expensiveCalc);

  print(cachedCalc(5)); // 计算：5 → 25
  print(cachedCalc(5)); // 缓存命中：5 → 25
  print(cachedCalc(10)); // 计算：10 → 100
  print(cachedCalc(10)); // 缓存命中：10 → 100
}
```
