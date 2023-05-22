
# dart的方法

## 位置参数

```dart
int insertUser(int id, String name) {
  // ...省略无关代码
}
```

在主程序中调用insertUser()函数时，必须按照对应的位置提供int类型的id和String类型的name

```dart
insertUser(1, 'xiaoming');

// insertUser('xiaoming', 1); // 错误，参数位置必须与函数声明中相对应
```

因为调用函数时的参数位置固定，所以这种声明方式下的参数又称为位置参数。Dart允许开发者在函数中声明可选的位置参数，如下面这段代码所示。

```dart
String insertUser(int id, String name, [int age]) {
  // ...
}
```

可选参数用[]包裹，因此在调用函数时可以传递也可以省略age参数

```dart
insertUser(1, 'xiaoming');

insertUser(2, 'xiaohong', 20); // 正确
```

## 命名参数

另一种常用的参数声明方式是使用命名参数。这种方式下，自定义函数时的参数都需要用花括号括起来。

```dart
String insertUser({int id, String name, int age}) {
      // ...
}
```

在调用时只需要根据对应的名称传递命名参数各自的值。

```dart
insertUser(id: 1, name: 'xiaoming');

insertUser(name: 'xiaohong', id: 2);// 正确，命名参数位置不固定
```

所有的命名参数默认都是无序并且可选的，因此只要指定要传入的对应参数名称，就可以在任何位置传入它的值，也可以选择不传入值。对于必须要传递的命名参数，可以使用 @required来声明

```dart
String insertUser({@required int id, String name, int age}) {
      // ...
}

```

这里，insertUser()函数的参数id就被指定为必须要传递的参数，我们在调用这个函数时就必须要传递id参数。

## 默认参数

```dart
String insertUser({int id, String name, int age = 20}) { // 在命名参数下为age指定默认值

}

String insertUser(int id, String name, [int age = 20]) { // 在可选位置参数下为age指定默认值

}

```
