---
order: 2
---
# dart基础2

## 类和对象

### 类的定义

```dart
// Dart中定义一个类
class Person {
  String name;
  int age;

  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
}
```

Dart中的类与Java中的相似，不同的是，Dart中没有`private`、`public`这些成员访问修饰符。如果是类私有的成员，不希望外面访问，只需要在成员变量之前加上一个下划线`_`变为私有即可。

以上代码，在Dart中还有一种简化写法，可以自动在构造方法中对成员变量初始化。

```dart
// Dart中定义一个类
class  Person {
    String name;
    int age;

    // 在构造方法中初始化成员变量时，可使用如下写法简化
    Person(this.name, this.age);

    // 如需处理其他变量时，也可单独对其操作
    // Person(this.name, this.age, String address){
    //     print(address);
    // }
    // 注意，构造方法不能重载，以上注释掉
}
```

另外还需要注意一点，Dart中没有构造方法的重载，不能写两个同名的构造方法。

### Getters 和 Setters方法

在Java中，一般不会直接在类的外部去访问类成员，通常使用setter和getter方法来操作类的成员变量。而在Dart语言中，所有类中都包含隐式的getter方法，对于非`final`修饰的成员，类中还包含隐式的setter方法。这就意味着，在Dart中，你可以直接在类外部通过`.`操作符访问类成员。这一特点使得Dart语法更加简洁，不会写出满屏的setXXX、getXXX方法。

当然，很多时候我们调用setter和getter方法并不仅仅是为了赋值和访问，而是为了一些额外的处理，这时候我们只需要使用`set`与`get`关键字实现setter和getter方法即可。

```dart
class  Person {
    String userName;

    Person(this.userName);

    // 方法名前加get关键字
    String get name{
        return  "user:"  +  this.userName;
    }

    // 方法名前加set关键字
    set name(String name){
        // do something
        this.userName = name;
    }
}

void  main() {
    var p = new Person("zhangsan");
    print(p.name);   // user:zhangsan
    p.name = "Jack";
    print(p.name);   // user:Jack
}
```

要注意，在创建对象时，`new`关键字并不是必须的，可以省略不写。在写Flutter界面时，不建议写`new`关键字实例化对象，因为Flutter框架中没有类似的xml语言来描述UI界面，界面也是使用Dart语言来写，在使用Dart写UI时，要保持代码的简洁和结构化，省略`new`会更友好。

### 构造方法

> 如果没有定义构造方法，则会有一个默认的无参构造方法，并且会调用超类的无参构造方法。

#### 命名构造方法

上面已经说过，Dart类中两个同名构造方法不能重载，但是Dart语言为类新增了一种称为`命名构造方法`的东西。

```dart
class  Person {
    String userName;
    int age;

    Person(this.userName, this.age);

    // 命名构造方法
    Person.fromData(Map data) {
        this.userName = data['name'];
        this.age = data['age'];
    }
}

void  main() {
    // 使用命名构造方法创建对象
    var p = new Person.fromData({
        "name":"Bob",
        "age":19
    });
    print(p.userName);
}
```

注意，使用命名构造方法可以为一个类实现多个构造方法，也可以更清晰的表明意图。

#### 常量构造方法

> 如果想提供一个状态永远不变的对像，在Dart中，我们可以创建一个编译时常量对象，节省开销。

```dart
class  ConstPoint {
    final num x;
    final num y;

    // 使用const修构造方法
    const ConstPoint(this.x, this.y);

    // 编译时常量对象，需使用const来创建对象
    static final ConstPoint origin = const  ConstPoint(0, 0);
}

void  main() {
    print(ConstPoint.origin.x);
    print(ConstPoint.origin.y);
}
```

#### 工厂构造方法

当我们需要创建一个新的对象或者从缓存中取一个对象时，工厂构造方法就派上了用场。

```dart
class  Logger {
    final String name;

    // 创建一个静态Map做为缓存
    static final Map<String, Logger> _cache =  <String, Logger>{};

    // 定义一个命名构造方法，用下划线"_"修饰，将构造方法私有化
    Logger._internal(this.name);

    // 使用关键字factory修饰类同名构造方法
    factory Logger(String name) {
        if (_cache.containsKey(name)) {
            return _cache[name];
        } else {
            // 调用命名构造方法创建新对象
            final logger= new  Logger._internal(name);
            _cache[name] = logger; // 存入缓存
            return logger;
        }
    }
}

void  main() {
    var uiLog = new Logger('UI');
    var eventLog = new Logger('event');
}
```

#### 构造方法重定向

有时候一个构造方法会调动类中的其他构造方法来实例化，这时候可以使用构造方法重定向，

```dart
class Point {
  num x;
  num y;

  // 同名构造方法
  Point(this.x, this.y);

  // 命名构造方法重定向到同名构造方法，中间使用一个冒号
  Point.alongXAxis(num x) : this(x, 0);
}
```

### 类的初始化列表

熟悉C++的朋友应该对初始化列表很了解了，Java中是没有这个特性的。

```dart
class  Point {
    final  num x;
    final  num y;
    final  num distance;

    Point(x, y)
        : x = x,
          y = y,
          distance =  sqrt(x * x + y * y){
             print("这是构造方法");
          }
}

void  main() {
    var p =  new  Point(2, 3);
    print(p.distance);
}
```

![9ff924c46f](./img/2bc3bfa15c.jpeg)

- 初始化列表位于构造方法的小括号与大括号之间，在初始化列表之前需添加一个冒号。
- 初始化列表是由逗号分隔的一些赋值语句组成。
- 它适合用来初始化 `final`修饰的变量
- 初始化列表的调用是在构造方法之前，也就是在类完成实例化之前，因此初始化列表中是不能访问 `this`的

### 运算符重载

这个特性，又很类似于C++中的运算符重载，在Java中是没用这种概念的。

```dart
class Point {
  int x;
  int y;

  Point(this.x, this.y);

  // 使用operator关键字，为该类重载"+"运算符
  Point operator +(Point p) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  // 为该类重载"-"运算符
  Point operator -(Point p) {
    return new Point(this.x - p.x, this.y - p.y);
  }
}

void main(){
   var p1 = new Point(1,5);
   var p2 = new Point(7,10);

   // 重载运算符后，类可以使用“+”、“-” 运算符操作
   var p3 = p1 + p2;
   var p4 = p2 - p1;

   print("${p3.x}, ${p3.y}");
   print("${p4.x}, ${p4.y}");
}
```

打印结果：

```
8, 15
6, 5
```

Dart中允许重载的运算符如下：

|   |   |   |   |   |   |   |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| `+`|`–`|`*`| `~/`|`/`| `%` | `^` |
| `<`|`>`|`<=`|`>=`|`==`|`[]`|`[]=`|
|`&` |`~` |`<<` |`>>`| &#124;|

### 类的继承

Dart中的继承，与Java中相似，可以使用关键字`extends`继承父类，使用关键字`super`引用父类

```dart
class Father {
    myFunction(){
        // do something
    }
}

class Son extends Father {

    @override
    myFunction(){
        super.myFunction();
        // do something
    }
}
```

我们知道，Java中的类仅支持单继承，而Dart中的类也只支持单继承。但是Dart可以使用一种被称为混入的方式来达到多继承的效果，这需要使用`with`关键字。

```dart
// 首先定义三个父类
class Father1 {
    a(){
      print("this is a func");
    }

    common(){
        print("common Father1");
    }
}

class Father2 {
    b(){
      print("this is b func");
    }

    common(){
        print("common Father2");
    }
}

class Father3 {
    c(){
      print("this is c func");
    }

    common(){
        print("common Father3");
    }
}

//定义子类
class Son extends Father1 with Father2,Father3{

}

void main() {
  var obj = new Son();
  obj.common();
  obj.a();
  obj.b();
  obj.c();
}
```

打印结果：

```
common Father3
this is a func
this is b func
this is c func
```

要注意，以上继承写法中，也可以直接使用`with`，等价于如下写法

```dart
class Son with Father1,Father2,Father3{

}
```

### 接口抽象

#### 抽象类

> Dart语言没有提供`interface`关键字来定义接口，但是Dart语言中保留了抽象类，同Java，使用`abstract`关键字来修饰抽象类。而Dart中的抽象类，实际上就相当于Java中的接口。

```dart
abstract class Base {
    // 省略函数体即可定义抽象方法，不需加关键字
    func1();
    func2();
}
```

注意，抽象类是不能被实例化的，子类继承抽象类时，必须实现全部抽象方法。

#### 隐式接口

> 实际上在Dart中，每个类都隐式的定义了一个包含所有实例成员的接口， 并且该类实现了这个接口。

因此，如果我们想实现某个接口，但有又不想继承，则可以使用这种隐式接口机制。我们需要用到关键字`implements`

```dart
class People {
  void greet(){
    print("Hello");
  }
}

class Student implements People{
  @override
  void greet(){
    print("Hi,I'm Alice.");
  }
}

greet(People p){
  p.greet();
}

void main() {
  greet(new Student());
}
```

## 泛型

Dart中也支持泛型，用法与Java中类似。

```dart
// 泛型
var names = new List<String>();
names.add("zhangsan")

var maps = new Map<int, String>();
maps[1]="value";

// 字面量写法
var infos = <String>['Seth', 'Kathy', 'Lars'];

var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots'
};
```

## 异常处理

如果关心具体异常，针对不同异常进行不同处理，可以使用`try...on`处理异常，`finally`是可选的，用于最后的处理。

```dart
  try {
      // 使除数为0
      print(11~/0);
  } on IntegerDivisionByZeroException {
      print("除数为0");
  }on Exception{
      print("Exception");
  }finally {
      print("finally");
  }
```

不关心具体异常，只想捕获，避免异常继续传递，则可以使用`try...catch`处理

```dart
  try {
      print(11~/0);
  } catch(e){
      // 打印报错信息
      print(e);
  }finally {
      print("finally");
  }
```

如果想获取更多异常信息，可以使用两个参数的`catch`，第二个参数是异常的调用栈信息

```dart
  try {
      print(11~/0);
  } catch(e,s){
      print(s);
  }
```

如果你既想针对不同异常进行不同处理，还想打印调用栈信息，那就将两种结合起来使用

```dart
  try {
      print(11~/0);
  } on IntegerDivisionByZeroException catch(e,s){
      print(s);
  } on Exception catch(e,s){
      print(s);
  }
```

## 库与导入

Dart使用`import`语句用来导入一个库，后面跟一个字符串形式的Uri来指定表示要引用的库。

```dart
// 指定dart:前缀，表示导入标准库，如dart:io
import 'dart:math';

// 也可以用相对路径或绝对路径来引用dart文件
import 'lib/student/student.dart';

// 指定package:前缀，表示导入包管理系统中的库
import 'package:utils/utils.dart';
```

导入库时，可以使用`as`关键字来给库起别名，避免命名空间冲突。

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// 使用lib1中的Element
Element element1 = new Element();
// 使用lib2中的Element
lib2.Element element2 = new lib2.Element(); 
```

使用`show`和`hide`关键字控制库中成员的可见性

```dart
// 仅导入foo，屏蔽库中其他成员
import 'package:lib1/lib1.dart' show foo;

// 屏蔽foo，库中其他成员都可见
import 'package:lib2/lib2.dart' hide foo;
```

为了减少 APP 的启动时间，加载很少使用的功能，我们还可以延迟导入库。使用 `deferred as`关键字延迟导入

```dart
import 'package:deferred/hello.dart' deferred as hello;

// 当需要使用时，再通过库标识符调用 loadLibrary函数加载
hello.loadLibrary();
```

## 异步编程

Dart与JavaScript一样，是一个单线程模型。但这并不意味着Dart中不能进行异步编程，只是这种异步编程区别于传统的多线程异步方式。

Dart中的所有代码都只在一个线程上运行，但Dart代码可以运行在多个**isolate**上。**isolate**可以看做一个微小的线程，**isolate**由虚拟机调度，**isolate**之间没有共享内存，因此它们之间没有竞争，不需要锁，不用担心死锁，因此开销小，性能高。由于没有共享内存，所以它们之间唯一的通信只能通过Port进行，而且Dart中的消息传递也总是异步的。

Dart中两种方式可以使用`Future`对象来进行异步编程

- 使用 `async` 和 `await`关键字
- 使用 Future API

使用`async`和`await`编写代码非常简单，而且编写的代码看起来有点像同步代码，实际上是异步的。

```dart
// 导入io库，调用sleep函数
import 'dart:io';

// 模拟耗时操作，调用sleep函数睡眠2秒
doTask() async{
  await sleep(const Duration(seconds:2));
  return "Ok";
}

// 定义一个函数用于包装
test() async {
  var r = await doTask();
  print(r);
}

void main(){
  print("main start");
  test();
  print("main end");
}
```

运行结果：

```
main start
main end
Ok
```

在函数签名中加入`async`关键字，表示该函数异步执行，`await`表示等待异步结果执行完成返回`Future`对象。但有一点需要注意，`await`只能在`async`函数中出现，因此往往需要再定义一个`async`函数，用于包装。上述代码中`test`函数就是用于包装。
