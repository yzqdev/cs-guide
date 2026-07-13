# C# 5 到 C# 14 新增特性

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/whats-new/)

以下汇总 C# 5 到 C# 14 各版本引入的主要语言特性，每个特性附代码示例。

## C# 5（2012年）

### async / await

异步编程模型，让异步代码像同步代码一样编写。

```csharp
public async Task<string> DownloadAsync(string url)
{
    using var client = new HttpClient();
    string content = await client.GetStringAsync(url);
    return content;
}

// 调用
string data = await DownloadAsync("https://api.example.com");
Console.WriteLine(data);
```

### Caller Info 特性

获取调用者的文件名、行号和方法名。

```csharp
public static void Log(string message,
    [CallerMemberName] string member = "",
    [CallerFilePath] string file = "",
    [CallerLineNumber] int line = 0)
{
    Console.WriteLine($"[{Path.GetFileName(file)}:{line} {member}] {message}");
}

// 使用：编译器自动填充参数
public void Test()
{
    Log("系统启动");
    // 输出：[Test.cs:12 Test] 系统启动
}
```

## C# 6（2015年）

### 只读自动属性

```csharp
public class Person
{
    // 只读自动属性：只能在构造函数中赋值
    public string Name { get; }
    public DateTime BirthDate { get; }

    public Person(string name, DateTime birthDate)
    {
        Name = name;
        BirthDate = birthDate;
    }
}
```

### 自动属性初始化器

```csharp
public class Person
{
    public string Name { get; set; } = "未命名";
    public int Age { get; set; } = 18;
    public List<string> Tags { get; set; } = new();
}
```

### 字符串插值

```csharp
string name = "张三";
int age = 25;
Console.WriteLine($"我叫{name}，今年{age}岁。");     // 我叫张三，今年25岁。
Console.WriteLine($"明年{age + 1}岁。");              // 明年26岁。
Console.WriteLine($"价格：{19.99:C}");                 // 价格：¥19.99
```

### null 条件运算符

```csharp
Person? person = GetPerson();

// 传统写法
string? name = person != null ? person.Name : null;

// 语法糖
string? name = person?.Name;

// 链式调用
string? city = person?.Address?.City;

// 事件调用
OnClick?.Invoke(sender, args);
```

### nameof 表达式

```csharp
public void Save(Person person, string propertyName)
{
    if (person == null)
        throw new ArgumentNullException(nameof(person));

    Console.WriteLine(nameof(Person.Name));   // "Name"
    Console.WriteLine(nameof(Person.Age));    // "Age"

    // 重构友好：重命名变量时，nameof 也会更新
}
```

### 表达式体成员

```csharp
public class Calc
{
    // 表达式体方法
    public int Add(int a, int b) => a + b;

    // 表达式体只读属性
    public double Pi => 3.14159;

    // 表达式体属性
    public double DoubleValue => Value * 2;
}
```

### using 静态导入

```csharp
using static System.Math;
using static System.Console;

public class Test
{
    public void Demo()
    {
        // 不需要写 Math. 和 Console.
        WriteLine(Sqrt(144));  // 12
        WriteLine(PI);         // 3.14159265358979
    }
}
```

### 索引初始化器

```csharp
var dict = new Dictionary<string, int>
{
    ["一"] = 1,
    ["二"] = 2,
    ["三"] = 3
};
```

## C# 7.0（2017年）

### out 变量

```csharp
// 传统写法
int result;
if (int.TryParse("123", out result))
{
    Console.WriteLine(result);
}

// C# 7.0：内联声明
if (int.TryParse("123", out int result))
{
    Console.WriteLine(result);
}

// 弃元（不关心 out 值）
if (int.TryParse("123", out _))
{
    Console.WriteLine("解析成功");
}

// 多个 out 参数
var dict = new Dictionary<string, int> { ["key"] = 42 };
if (dict.TryGetValue("key", out var value))
{
    Console.WriteLine(value); // 42
}
```

### 元组

```csharp
// 返回元组
(string name, int age) GetPerson() => ("张三", 25);

// 命名元组
var person = (Name: "张三", Age: 25);
Console.WriteLine(person.Name); // 张三

// 解构
var (name, age) = GetPerson();
Console.WriteLine($"{name}，{age}岁");
```

### 模式匹配

```csharp
// is 表达式模式匹配
object obj = "Hello";
if (obj is string s)
{
    Console.WriteLine(s.Length); // 5
}

// switch 模式匹配
switch (obj)
{
    case int i:
        Console.WriteLine($"整数：{i}");
        break;
    case string str when str.Length > 5:
        Console.WriteLine($"长字符串：{str}");
        break;
    case string str:
        Console.WriteLine($"字符串：{str}");
        break;
    case null:
        Console.WriteLine("null");
        break;
}
```

### 局部函数

```csharp
int Fibonacci(int n)
{
    if (n < 0) throw new ArgumentException("不能为负");

    // 方法内部定义方法
    int Fib(int x)
    {
        if (x <= 1) return 1;
        return Fib(x - 1) + Fib(x - 2);
    }

    return Fib(n);
}

Console.WriteLine(Fibonacci(10)); // 89
```

### ref 局部变量与返回

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

// ref 局部变量
ref int third = ref numbers[2];
third = 99;
Console.WriteLine(numbers[2]); // 99

// ref 返回
ref int FindMax(int[] nums)
{
    int maxIndex = 0;
    for (int i = 1; i < nums.Length; i++)
        if (nums[i] > nums[maxIndex]) maxIndex = i;
    return ref nums[maxIndex];
}

ref int max = ref FindMax(numbers);
max = 100; // 修改数组中最大值
Console.WriteLine(string.Join(", ", numbers)); // 1, 2, 99, 4, 100
```

### 弃元（Discards）

```csharp
// 忽略 out 参数
int.TryParse("123", out _);

// 忽略元组元素
var (name, _, city) = GetFullInfo();

// 独立弃元
_ = Task.Run(() => DoWork());
```

## C# 7.1（2017年）

### async Main

```csharp
// 之前：Main 不能使用 await
// static void Main() { ... }

// C# 7.1：async Task Main
static async Task Main()
{
    await DoWorkAsync();
    Console.WriteLine("完成");
}
```

### default 字面量

```csharp
// 之前
int x = default(int);
string s = default(string);

// C# 7.1：编译器推断类型
int x = default;
string s = default;
List<int> list = default;
```

## C# 7.2（2017年）

### in 参数

```csharp
// 只读引用传递，避免值类型复制
public void Process(in LargeStruct data)
{
    // data 是只读的，不能修改
    // data.Field = 1; // ❌ 编译错误
    Console.WriteLine(data.Value);
}
```

### readonly struct

```csharp
// 声明不可变结构体，编译器可以优化
public readonly struct Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
}
```

### ref struct

```csharp
// 栈上分配的结构体，不能装箱到堆
public ref struct SpanWrapper
{
    private readonly Span<int> _span;

    public SpanWrapper(Span<int> span)
    {
        _span = span;
    }
}
```

## C# 7.3（2018年）

### 改进的泛型约束

```csharp
// 可以使用 System.Enum 和 System.Delegate 作为约束
public T ParseEnum<T>(string value) where T : Enum
{
    return (T)Enum.Parse(typeof(T), value);
}

public T SafeInvoke<T>(T d) where T : Delegate
{
    return d;
}
```

### 字段上的属性

```csharp
// 自动属性的字段可以应用特性（通过字段目标）
[field: NonSerialized]
public int TempData { get; set; }
```

## C# 8.0（2019年）

### 可空引用类型

```csharp
#nullable enable

string name = "张三";
// name = null;    // CS8600 警告

string? nullableName = null;  // 允许 null
if (nullableName != null)
{
    Console.WriteLine(nullableName.Length); // 安全
}

#nullable disable
```

### Index 和 Range（^ 和 ..）

```csharp
int[] numbers = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

Console.WriteLine(numbers[^1]); // 9（倒数第一个）
Console.WriteLine(numbers[^3]); // 7（倒数第三个）

int[] slice = numbers[2..5];    // { 2, 3, 4 }
int[] first3 = numbers[..3];    // { 0, 1, 2 }
int[] last3 = numbers[^3..];    // { 7, 8, 9 }
```

### switch 表达式

```csharp
string GetDayType(string day) => day switch
{
    "星期一" or "星期二" or "星期三" or "星期四" or "星期五" => "工作日",
    "星期六" or "星期日" => "周末",
    _ => "无效"
};
```

### 属性模式

```csharp
static string Describe(object obj) => obj switch
{
    Point { X: 0, Y: 0 } => "原点",
    Point { X: 0 } => "Y 轴上",
    Point { Y: 0 } => "X 轴上",
    _ => "其他"
};
```

### using 声明

```csharp
// 传统 using 语句
using (var reader = new StreamReader("file.txt"))
{
    string content = reader.ReadToEnd();
}

// using 声明（代码块结束时自动释放）
using var reader = new StreamReader("file.txt");
string content = reader.ReadToEnd();
// 方法结束时释放
```

### null 合并赋值

```csharp
List<int>? list = null;
list ??= new List<int>();   // list 为 null 时赋值
list ??= new List<int>();   // 已赋值，不执行
```

### 异步流（IAsyncEnumerable）

```csharp
async IAsyncEnumerable<int> GenerateNumbersAsync()
{
    for (int i = 0; i < 5; i++)
    {
        await Task.Delay(500);
        yield return i;
    }
}

// 消费
await foreach (var num in GenerateNumbersAsync())
{
    Console.WriteLine(num);
}
```

### 接口默认实现

```csharp
interface ILogger
{
    void Log(string message);

    // 默认实现
    void LogError(string error)
    {
        Log($"[ERROR] {error}");
    }
}
```

## C# 9.0（2020年）

### Record 类型

```csharp
// 不可变引用类型，值语义
public record Person(string Name, int Age);

var p1 = new Person("张三", 25);
var p2 = new Person("张三", 25);

Console.WriteLine(p1 == p2);       // True（值相等）
Console.WriteLine(p1);             // Person { Name = 张三, Age = 25 }

// with 表达式创建副本
var p3 = p1 with { Age = 30 };
```

### Init-only 设置器

```csharp
public class Person
{
    public string Name { get; init; }
    public int Age { get; init; }
}

var p = new Person { Name = "张三", Age = 25 };
// p.Age = 30; // ❌ init 设置器只能在初始化时使用
```

### 顶级语句

```csharp
// Program.cs — 不需要 class 和 Main 方法
using System;

Console.WriteLine("Hello, World!"); // 直接写代码
Console.ReadLine();
```

### 目标类型 new 表达式

```csharp
// 之前
List<string> list = new List<string>();
Dictionary<string, int> dict = new Dictionary<string, int>();

// C# 9.0：通过上下文推断类型
List<string> list = new();
Dictionary<string, int> dict = new();

// 方法参数
void Process(List<int> numbers) { }
Process(new()); // 推断为 List<int>
```

### 模式匹配增强

```csharp
// 关系模式
string GetCategory(int score) => score switch
{
    < 0 or > 100 => "无效",
    >= 90 => "优秀",
    >= 60 => "及格",
    _ => "不及格"
};

// 逻辑模式（and / or / not）
bool IsValid(int n) => n is >= 0 and <= 100;

// not 模式
if (obj is not null) { }
```

### 模块初始化器

```csharp
// 程序集加载时执行
[ModuleInitializer]
public static void Initialize()
{
    Console.WriteLine("模块初始化");
}
```

## C# 10（2021年）

### 全局 using

```csharp
// GlobalUsings.cs — 全局生效
global using System;
global using System.Collections.Generic;
global using System.Linq;
global using System.Threading.Tasks;
```

### 文件范围的命名空间

```csharp
// 之前
namespace MyApp.Services
{
    public class UserService { }
}

// C# 10：省略大括号和缩进
namespace MyApp.Services;

public class UserService { }
```

### Record struct

```csharp
// 值类型的 record
public record struct Point(double X, double Y);

// 只读 record struct
public readonly record struct Point(double X, double Y);

var p1 = new Point(1, 2);
var p2 = new Point(1, 2);
Console.WriteLine(p1 == p2); // True
```

### 改进的字符串插值

```csharp
// 允许字符串插值中的常量字符串拼接
const string Greeting = "Hello";
const string Name = "World";
const string Message = $"{Greeting}, {Name}!"; // C# 10 允许常量插值
```

### 嵌套属性模式

```csharp
// C# 10 可以简化嵌套属性模式
string GetCity(Person person) => person switch
{
    { Address.City: "北京" } => "北京人",
    { Address.City: "上海" } => "上海人",
    _ => "其他"
};
```

### Lambda 改进

```csharp
// 自然函数类型
var add = (int a, int b) => a + b;  // Func<int, int, int>

// 显式返回类型
var getValue = object (bool flag) => flag ? 42 : "Hello";

// 可以在属性上使用 Lambda
Func<int, int> square = static x => x * x; // static 防止捕获变量
```

## C# 11（2022年/.NET 7）

### 原始字符串字面量

使用三个连续引号 `"""`，完全不需要转义。

```csharp
// 原始字符串 — 无需转义引号和反斜杠
string json = """
{
    "name": "张三",
    "age": 25,
    "path": "C:\Users\张三\file.txt"
}
""";

Console.WriteLine(json);

// 原始字符串插值（双花括号级别控制）
string name = "张三";
int age = 25;
string html = $$"""
<!DOCTYPE html>
<html>
<body>
    <h1>{{name}}</h1>
    <p>年龄：{{age}}</p>
</body>
</html>
""";
```

### Required 成员

强制调用方必须初始化该属性。

```csharp
public class Person
{
    public required string Name { get; init; }
    public required int Age { get; init; }
    public string? Email { get; init; }
}

// ❌ 编译错误：Name 和 Age 未初始化
// var p = new Person { Email = "test@test.com" };

// ✅ 必须提供 Name 和 Age
var p = new Person { Name = "张三", Age = 25 };
```

### 列表模式

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

string Describe(int[] arr) => arr switch
{
    [] => "空数组",
    [1, 2, 3] => "以 1,2,3 开头",
    [1, .., 5] => "第一个是1，最后是5",
    [var first, .., var last] => $"第一个：{first}，最后：{last}",
    _ => "其他"
};

Console.WriteLine(Describe(new[] { 1, 2, 3 }));      // 以 1,2,3 开头
Console.WriteLine(Describe(new[] { 1, 9, 9, 5 }));   // 第一个：1，最后：5
```

### 泛型特性

允许在泛型类型上使用特性。

```csharp
// C# 11 之前特性参数不能是泛型
// C# 11 允许
class MyAttribute<T> : Attribute { }

[MyAttribute<string>]
public class MyClass { }
```

### 接口中的静态抽象成员

```csharp
public interface IMonoid<TSelf> where TSelf : IMonoid<TSelf>
{
    static abstract TSelf Zero { get; }
    static abstract TSelf operator +(TSelf a, TSelf b);
}

// 实现
public struct Vector2 : IMonoid<Vector2>
{
    public double X, Y;

    public static Vector2 Zero => new();

    public static Vector2 operator +(Vector2 a, Vector2 b)
        => new() { X = a.X + b.X, Y = a.Y + b.Y };
}

// 使用泛型算法
T Sum<T>(params T[] values) where T : IMonoid<T>
    => values.Aggregate(T.Zero, (a, b) => a + b);

var result = Sum(new Vector2 { X = 1, Y = 2 }, new Vector2 { X = 3, Y = 4 });
Console.WriteLine($"({result.X}, {result.Y})"); // (4, 6)
```

### File 作用域类型

```csharp
// file.cs — file 关键字使类型仅在当前文件可见
file class InternalHelper
{
    public static void DoSomething() { }
}
```

### 其他改进

```csharp
// 字符串插值换行（更灵活）
string message = $"今天是 {DateTime.Now:yyyy年
    MM月
    dd日}";

// UTF-8 字符串字面量
ReadOnlySpan<byte> utf8 = "Hello"u8;

// 列表模式扩展 — 匹配切片元素
int[] match = { 1, 2, 3, 4 };
var result = match switch
{
    [1, 2, .. var rest] => $"剩余：{string.Join(",", rest)}", // 3,4
    _ => "其他"
};
```

## C# 12（2023年/.NET 8）

### 主构造函数

普通类和结构体也可以像 record 一样使用主构造函数。

```csharp
// 传统方式
public class PersonOld
{
    public string Name { get; }
    public int Age { get; }
    public PersonOld(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

// C# 12 主构造函数
public class Person(string name, int age)
{
    public string Name { get; } = name;
    public int Age { get; } = age;

    // 在主构造函数参数上直接使用
    public string Introduce() => $"我叫{name}，{age}岁";
}

// 依赖注入场景特别简洁
public class UserService(IHttpClientFactory httpFactory, ILogger<UserService> logger)
{
    private readonly HttpClient _client = httpFactory.CreateClient();

    public async Task<User> GetUser(int id)
    {
        logger.LogInformation("获取用户 {Id}", id);
        // ...
    }
}
```

### 集合表达式

使用方括号 `[...]` 创建集合，编译器自动选择最优类型。

```csharp
// 数组
int[] array = [1, 2, 3, 4, 5];

// List<T>（需要类型推断）
List<int> list = [1, 2, 3, 4, 5];

// Span<T>
Span<int> span = [1, 2, 3, 4, 5];

// 展开运算符 ..
int[] first = [1, 2, 3];
int[] second = [4, 5, 6];
int[] combined = [..first, ..second];       // 拼接：{ 1,2,3,4,5,6 }
int[] more = [0, ..first, 10, ..second];    // 混合：{ 0,1,2,3,10,4,5,6 }

// 空集合
int[] empty = [];

// 集合表达式替代多种写法
List<string> names =
[
    "张三",
    "李四",
    ..GetExtraNames(),
    "王五"
];
```

### 默认 Lambda 参数

```csharp
// C# 12 Lambda 可以有默认参数
var add = (int a, int b = 10) => a + b;

Console.WriteLine(add(5));      // 15（b 使用默认值 10）
Console.WriteLine(add(5, 20));  // 25

// 更复杂的 Lambda 默认值
var createList = (int count, string prefix = "项") =>
    Enumerable.Range(1, count).Select(i => $"{prefix}{i}").ToList();

var items = createList(3, "商品");
Console.WriteLine(string.Join(", ", items)); // 商品1, 商品2, 商品3
```

### 类型别名支持任意类型

```csharp
// 之前只能为命名类型起别名
using MyList = List<int>;

// C# 12 可以为元组、数组等起别名
using Point = (int X, int Y);
using StringList = List<string>;
using IntArray = int[];

// 使用别名
Point p = (10, 20);
Console.WriteLine(p.X); // 10

StringList names = ["张三", "李四"];
IntArray numbers = [1, 2, 3];
```

### Inline 数组

用于高性能场景，固定大小的栈上数组。

```csharp
[System.Runtime.CompilerServices.InlineArray(5)]
public struct Buffer5<T>
{
    private T _element;
}

// 使用
var buffer = new Buffer5<int>();
for (int i = 0; i < 5; i++)
    buffer[i] = i * 10;

Span<int> span = buffer;
Console.WriteLine(string.Join(", ", span.ToArray())); // 0, 10, 20, 30, 40
```

### ref readonly 参数

```csharp
// 与 in 参数类似，但更明确
public void Process(ref readonly int value)
{
    // value 是只读的
    // value = 42; // ❌ 编译错误
    Console.WriteLine(value);
}
```

## C# 13（2024年/.NET 9）

### Params 集合

`params` 现在支持更多集合类型，不再局限于数组。

```csharp
// 之前只支持 params int[]
// C# 13 支持：
void Print(params Span<int> numbers)
{
    foreach (var n in numbers)
        Console.Write($"{n} ");
}

void Log(params IEnumerable<string> messages)
{
    foreach (var msg in messages)
        Console.WriteLine($"[LOG] {msg}");
}

void Parse(params ReadOnlySpan<char> chars)
{
    Console.WriteLine(new string(chars));
}

// 使用
Print(1, 2, 3, 4, 5);              // 1 2 3 4 5
Log("启动", "连接数据库", "完成");   // 逐行输出
Parse('H', 'e', 'l', 'l', 'o');    // Hello
```

### Lock 类型改进

引入了专门的高性能锁类型。

```csharp
// 之前用 object 锁
private object _lock = new();
lock (_lock) { /* ... */ }

// C# 13 推荐使用 System.Threading.Lock
private Lock _lock = new();
lock (_lock) { /* ... */ }  // 编译器优化为更高效的 EnterScope
```

### 索引器改进 — 部分属性和索引器

```csharp
// partial 属性（可以在分部类不同文件中分别声明）
public partial class MyClass
{
    public partial int MyProperty { get; set; }
}

public partial class MyClass
{
    public partial int MyProperty
    {
        get => /* 实现 */;
        set => /* 实现 */;
    }
}

// partial 索引器
public partial class MyList
{
    public partial int this[int index] { get; set; }
}
```

### 重载解析优先级

```csharp
// 使用 OverloadResolutionPriority 特性调整重载优先级
[OverloadResolutionPriority(1)]
public void Process(int value) { }

[OverloadResolutionPriority(0)]
public void Process(long value) { }
// 传入 int 时优先匹配 int 重载
```

### async 方法中允许 ref

```csharp
// C# 13 允许在 async 方法中使用 ref
ref int FindAndProcess(int[] numbers, Func<int, bool> predicate)
{
    for (int i = 0; i < numbers.Length; i++)
    {
        if (predicate(numbers[i]))
            return ref numbers[i];
    }
    throw new InvalidOperationException("未找到");
}
```

### 字段关键字 field（预览）

> 注：`field` 在 C# 13 作为预览特性引入，C# 14 正式发布。

```csharp
// 在自动属性中直接访问编译器生成的字段
public class Person
{
    public string Name
    {
        get => field;
        set => field = value.Trim();
    }
}
```

## C# 14（2025年/.NET 10）

### 字段关键字 field（正式版）

自动属性的 getter/setter 中直接使用 `field` 访问编译器生成的后备字段，省去手动声明字段。

```csharp
public class Product
{
    public string Name { get; set; } = "未命名";

    // 传统方式：需要声明私有字段
    // private decimal _price;
    // public decimal Price
    // {
    //     get => _price;
    //     set => _price = value >= 0 ? value : 0;
    // }

    // C# 14：使用 field 关键字访问编译器生成的字段
    public decimal Price
    {
        get => field;
        set => field = value >= 0 ? value : 0;
    }

    // 带初始值的半自动属性
    public string Description
    {
        get => field ?? "暂无描述";
        set => field = value;
    }
}

// 使用
var product = new Product { Name = "手机", Price = -100 };
Console.WriteLine(product.Price); // 0（验证生效）
Console.WriteLine(product.Description); // 暂无描述
```

### 扩展成员（Extension Everything）

在扩展方法的基础上，支持为现有类型添加属性、方法、运算符等。

```csharp
// 为现有类型扩展属性和方法
public static class StringExtensions
{
    // 扩展属性
    public static int WordCount(this string str)
        => str.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;

    // 扩展索引器
    public static char? TryGet(this string str, int index)
        => index >= 0 && index < str.Length ? str[index] : null;

    // 扩展运算符
    public static string operator *(this string str, int times)
        => string.Concat(Enumerable.Repeat(str, times));
}

// 使用
string text = "Hello World from C# 14";
Console.WriteLine(text.WordCount());      // 5
Console.WriteLine(text.TryGet(6));        // 'W'
Console.WriteLine("Hi " * 3);             // Hi Hi Hi
```

### 主构造函数改进

主构造函数与其他成员集成更紧密，支持在方法体中直接引用参数。

```csharp
public class OrderService(IHttpClientFactory httpFactory, ILogger logger)
{
    // 主构造函数参数可直接在字段初始化器中使用
    private readonly HttpClient _client = httpFactory.CreateClient("default");

    // 可在方法中直接使用（无需声明字段存副本）
    public async Task ProcessOrder(int orderId)
    {
        logger.LogInformation("处理订单 {OrderId}", orderId);
        var response = await _client.GetAsync($"/orders/{orderId}");
        // ...
    }
}
```

### 鉴别联合（Discriminated Unions，实验性）

```csharp
// 允许定义类型安全的有标签联合
union Shape
{
    Circle(double Radius),
    Rectangle(double Width, double Height),
    Triangle(double Base, double Height)
}

// 模式匹配处理所有分支（编译器保证穷尽）
static double GetArea(Shape shape) => shape switch
{
    Shape.Circle(var r) => Math.PI * r * r,
    Shape.Rectangle(var w, var h) => w * h,
    Shape.Triangle(var b, var h) => b * h / 2
};
```

### 其他改进

```csharp
// nameof 支持更复杂的场景
Console.WriteLine(nameof(List<int>.Count)); // Count

// Using 别名支持值元组
using Point = (int X, int Y);

// 改进的查找（Collection Lookup）
Dictionary<string, int> scores = new() { ["张三"] = 90 };
// C# 14 支持 span-based 查找
ReadOnlySpan<char> key = "张三"u8;
// int score = scores[key]; // 避免字符串分配
```

## 版本特性速查表

| 版本 | 发布时间 | 主要特性 |
|------|----------|----------|
| C# 5 | 2012 | async/await、Caller Info |
| C# 6 | 2015 | 字符串插值、?.、??、nameof、表达式体、自动属性初始化器、using static |
| C# 7.0 | 2017 | out 变量、元组、模式匹配、局部函数、弃元、ref 局部变量 |
| C# 7.1 | 2017 | async Main、default 字面量 |
| C# 7.2 | 2017 | in 参数、readonly struct、ref struct |
| C# 7.3 | 2018 | 泛型约束改进、字段属性 |
| C# 8.0 | 2019 | 可空引用类型、索引/范围、switch 表达式、using 声明、异步流、接口默认实现 |
| C# 9.0 | 2020 | Record、init、顶级语句、目标类型 new、模式匹配增强 |
| C# 10 | 2021 | 全局 using、文件范围命名空间、Record struct、Lambda 改进 |
| C# 11 | 2022 | 原始字符串、Required 成员、列表模式、泛型特性、接口静态抽象成员 |
| C# 12 | 2023 | 主构造函数、集合表达式、默认 Lambda 参数、类型别名、InlineArray |
| C# 13 | 2024 | Params 集合、Lock 类型、部分属性、重载优先级、field 关键字（预览） |
| C# 14 | 2025 | field 关键字（正式）、扩展成员、鉴别联合、主构造函数改进 |

> 提示：各版本特性的详细说明可查看本文开头链接的官方文档。部分内容（如 async/await、元组、模式匹配、索引范围、集合表达式等）在对应的专题文件中有更深入的介绍。
