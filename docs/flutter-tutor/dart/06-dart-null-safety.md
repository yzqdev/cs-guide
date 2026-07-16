---
order: 6
---

# Dart 空安全

[官方文档](https://dart.dev/null-safety)

Dart 2.12+ 引入健全的空安全（Null Safety），所有类型默认不可为 null。这消除了空引用错误，让代码更安全。

## 可空类型 ?

默认所有类型不可为 null，加 `?` 后变为可空。

```dart
// 不可空（默认）
String name = '张三';
// name = null; // ❌ 编译错误

// 可空（加 ?）
String? nullableName = null;
nullableName = '李四';
print(nullableName);
```

### 使用可空变量

```dart
String? name;

// 方法1：判空后再使用
if (name != null) {
  print(name.length); // 安全
}

// 方法2：使用 ?. 条件访问
print(name?.length); // null（name 为 null 时返回 null）

// 方法3：使用 ?? 提供默认值
print(name?.length ?? 0); // 0

// 方法4：使用 ! 断言非空（确定不为 null 时使用）
// print(name!.length); // ❌ 运行时异常（name 为 null）
```

## 空值运算符

### ?? 运算符

左侧为 null 时取右侧值。

```dart
String? name;
String displayName = name ?? '匿名用户';
print(displayName); // 匿名用户

// 链式使用
String? a, b, c = 'Hello';
String result = a ?? b ?? c ?? '默认值';
print(result); // Hello
```

### ??= 运算符

变量为 null 时才赋值。

```dart
String? name;
name ??= '张三'; // name 为 null，赋值
print(name); // 张三

name ??= '李四'; // name 不为 null，不赋值
print(name); // 张三
```

### ?. 条件成员访问符

```dart
class User {
  String? address;
  String? city;
}

User? user;
print(user?.address?.city); // null

// 等价于
if (user != null && user.address != null) {
  print(user.address.city);
} else {
  print(null);
}
```

## late 关键字

延迟初始化，声明时不必赋值，在使用前必须赋值。

```dart
class Student {
  // late 字段：声明时不赋值，在使用前初始化
  late String name;

  void init(String n) {
    name = n;
  }

  void greet() {
    print('你好，$name');
  }
}

void main() {
  var stu = Student();
  // stu.greet(); // ❌ LateInitializationError
  stu.init('张三');
  stu.greet(); // 你好，张三
}
```

### 延迟初始化（lazy）

```dart
class DataManager {
  // 只有首次访问时才执行初始化
  late final List<String> data = _loadData();

  List<String> _loadData() {
    print('加载数据...');
    return ['数据1', '数据2', '数据3'];
  }
}

void main() {
  var manager = DataManager();
  print('对象已创建'); // 此时 _loadData 未执行
  print(manager.data); // 加载数据... 然后输出列表
  print(manager.data); // 再次访问，使用缓存，不重新加载
}
```

## 非空断言 !

确定某个值不为 null 时，用 `!` 告诉编译器。

```dart
String? maybeName = '张三';

// 确定不为 null 时使用 !
int length = maybeName!.length;

// 典型场景
List<int>? numbers = [1, 2, 3];
int first = numbers!.first;

// 配合函数返回值
String? getNullableString() => 'hello';
String definite = getNullableString()!;
```

## required 关键字

命名参数默认是可选的，加 `required` 强制调用方必须传参。

```dart
class User {
  final String name;
  final int age;

  // required 命名参数
  User({required this.name, required this.age});
}

void main() {
  // ❌ 必须传 name 和 age
  // var u1 = User();

  // ✅ 正确调用
  var u2 = User(name: '张三', age: 25);
}
```

### required 在构造参数中

```dart
void registerUser({
  required String username,
  required String password,
  String? email,
}) {
  print('注册用户：$username');
}
```

## 泛型与空安全

```dart
// 泛型类型也是默认不可空
List<int> numbers = [1, 2, 3];
// numbers.add(null); // ❌

// 可空泛型
List<int?> nullableNumbers = [1, null, 3];
print(nullableNumbers); // [1, null, 3]

// 可为空集合
List<int>? couldBeNull = null;
couldBeNull = [1, 2, 3];
print(couldBeNull?.length); // 3
```

## 类型提升（Type Promotion）

Dart 编译器会自动将可空类型提升为不可空类型。

```dart
// 局部变量提升
String? name;
name = 'hello';
print(name.length); // 自动提升为 String，无需 !

// 条件分支提升
String? nullable = 'Dart';
if (nullable != null) {
  // 此处 nullable 自动提升为 String
  print(nullable.length); // 安全
}

// 逻辑运算符提升
if (nullable is String) {
  print(nullable.length); // 提升
}

// return 后提升
void printLength(String? text) {
  if (text == null) return;
  print(text.length); // 提升：return 后 text 不可能为 null
}
```

## 实战案例

```dart
class UserRepository {
  User? _cachedUser;

  /// 查找用户，可能返回 null
  Future<User?> findUser(int id) async {
    if (_cachedUser != null && _cachedUser!.id == id) {
      return _cachedUser;
    }
    return await _fetchFromDatabase(id);
  }

  Future<User?> _fetchFromDatabase(int id) async {
    // 模拟数据库查询
    await Future.delayed(Duration(seconds: 1));
    if (id <= 0) return null;
    return User(id: id, name: '用户$id');
  }
}

class User {
  final int id;
  final String name;
  String? email;

  User({required this.id, required this.name});
}

void main() async {
  var repo = UserRepository();

  // 安全获取用户
  User? user = await repo.findUser(1);
  String displayName = user?.name ?? '未知用户';
  print('用户：$displayName');

  // 链式安全调用
  String? email = user?.email;
  print('邮箱：${email ?? '未设置'}');

  // 条件后提升
  if (user != null) {
    print('用户ID：${user.id}'); // 自动提升为 User
  }
}
```

## 空安全迁移建议

| 场景 | 旧写法 | 新写法 |
|------|--------|--------|
| 变量可为空 | `String name;` | `String? name;` |
| 延迟初始化 | 无 | `late String name;` |
| 安全调用 | `if (x != null) x.foo()` | `x?.foo()` |
| 提供默认值 | `x != null ? x : y` | `x ?? y` |
| 空赋值 | `if (x == null) x = y` | `x ??= y` |
| 必传参数 | 无 | `required` |

> 提示：空安全自 Dart 2.12 起默认启用。升级到 null safety 后，大多数运行时空引用错误变为编译时错误，代码更加健壮。
