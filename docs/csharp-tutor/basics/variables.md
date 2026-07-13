# 变量与数据类型

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/built-in-types)

## 内置数据类型

C# 提供了一组丰富的内置数据类型，分为**值类型**和**引用类型**两大类。

### 值类型

值类型直接存储数据值，分配在栈上。

```csharp
// 整数类型
int age = 25;                    // 32位有符号整数
long bigNumber = 9999999999L;    // 64位有符号整数
short smallNumber = 12345;       // 16位有符号整数
byte b = 255;                    // 8位无符号整数

// 浮点类型
float price = 19.99f;            // 32位浮点数（需要 f 后缀）
double pi = 3.1415926535;        // 64位浮点数（默认）
decimal salary = 5000.50m;       // 128位高精度小数（需要 m 后缀，适合财务计算）

// 布尔类型
bool isActive = true;
bool isComplete = false;

// 字符类型
char grade = 'A';                // 单个 Unicode 字符
char digit = '5';
char symbol = '\n';              // 转义字符（换行）

// 枚举类型
enum Season { Spring, Summer, Autumn, Winter }
Season current = Season.Summer;

// 结构体类型
struct Point
{
    public int X;
    public int Y;
}
Point p = new Point { X = 10, Y = 20 };
```

### 引用类型

引用类型存储的是数据的引用（地址），数据本身分配在堆上。

```csharp
// 字符串类型
string name = "张三";
string message = "Hello, World!";

// 数组类型
int[] numbers = { 1, 2, 3, 4, 5 };
string[] names = { "Alice", "Bob", "Charlie" };

// 类类型
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}
Person person = new Person { Name = "李四", Age = 30 };

// 接口类型
interface IAnimal
{
    void Speak();
}

// 委托类型
delegate void MyDelegate(string message);
```

### 值类型 vs 引用类型

```csharp
// 值类型：赋值时复制数据
int a = 10;
int b = a;     // b 得到 a 的副本
b = 20;        // 修改 b 不影响 a
Console.WriteLine(a); // 输出 10
Console.WriteLine(b); // 输出 20

// 引用类型：赋值时复制引用
int[] arr1 = { 1, 2, 3 };
int[] arr2 = arr1;   // arr2 引用同一个数组
arr2[0] = 999;       // 修改 arr2 也影响 arr1
Console.WriteLine(arr1[0]); // 输出 999
Console.WriteLine(arr2[0]); // 输出 999
```

## 变量声明

### 基本变量声明

```csharp
// 先声明，后赋值
int count;
count = 10;

// 声明并初始化
string title = "C# 教程";
double rate = 0.85;

// 一行声明多个同类型变量
int x, y, z;
x = 1;
y = 2;
z = 3;
```

### 使用 var 隐式类型

`var` 让编译器根据初始值自动推断类型。

```csharp
var number = 42;           // int
var text = "Hello";        // string
var price = 9.99;          // double
var isReady = true;        // bool
var items = new List<int>(); // List<int>

// var 必须在声明时初始化
// var unknown;           // ❌ 编译错误

// var 不能用于字段、方法返回值或参数
// public var field = 1;  // ❌ 编译错误
```

### 常量与只读字段

```csharp
// const：编译时常量，必须在声明时赋值
const double PI = 3.14159;
const string APP_NAME = "MyApp";
// const int year;        // ❌ 必须初始化

// readonly：运行时常量，可以在构造函数中赋值
class Config
{
    public readonly string ConnectionString;
    public readonly int MaxRetries = 3; // 声明时赋值

    public Config(string connectionString)
    {
        ConnectionString = connectionString; // 构造函数中赋值
    }

    // readonly 字段不能在普通方法中赋值
    // public void Update() { ConnectionString = "new"; } // ❌
}
```

## 类型转换

### 隐式转换

小范围类型自动转换为大范围类型（安全，不会丢失数据）。

```csharp
int intValue = 100;
long longValue = intValue;   // int → long（隐式）
float floatValue = intValue; // int → float（隐式）
double doubleValue = floatValue; // float → double（隐式）

// 转换链：int → long → float → double
```

### 显式转换（强制转换）

大范围类型转小范围类型需要显式转换（可能丢失数据）。

```csharp
double d = 123.456;
int i = (int)d;              // double → int（小数部分丢失）
Console.WriteLine(i);        // 输出 123

long l = 9999999999;
int j = (int)l;              // 可能溢出
Console.WriteLine(j);        // 输出一个溢出后的值
```

### 使用 Convert 类

```csharp
string str = "123";
int num = Convert.ToInt32(str);
double d = Convert.ToDouble("45.67");
bool b = Convert.ToBoolean("true");
DateTime dt = Convert.ToDateTime("2024-01-01");

// 转换失败会抛出异常
try
{
    int invalid = Convert.ToInt32("abc"); // FormatException
}
catch (FormatException)
{
    Console.WriteLine("无法转换");
}
```

### 使用 Parse 和 TryParse

```csharp
// Parse：失败时抛出异常
int a = int.Parse("42");
double b = double.Parse("3.14");

// TryParse：失败时返回 false，不会抛出异常
string input = "123";
if (int.TryParse(input, out int result))
{
    Console.WriteLine($"转换成功：{result}");
}
else
{
    Console.WriteLine("转换失败");
}

// 实际应用场景
Console.Write("请输入年龄：");
string userInput = Console.ReadLine();
if (int.TryParse(userInput, out int age))
{
    Console.WriteLine($"你的年龄是 {age}");
}
else
{
    Console.WriteLine("输入的年龄无效");
}
```

### 使用 is 和 as 进行类型检查与转换

```csharp
object obj = "Hello, C#";

// is：检查类型
if (obj is string)
{
    Console.WriteLine("obj 是一个字符串");
}

// is 模式匹配（C# 7+）
if (obj is string s)
{
    Console.WriteLine($"字符串长度：{s.Length}");
}

// as：安全转换，失败返回 null 而不是异常
string text = obj as string;
if (text != null)
{
    Console.WriteLine(text.ToUpper());
}

// as 只能用于引用类型
object number = 42;
// string str = number as string; // 不会抛异常，str 为 null
```

## 可空类型

值类型默认不能为 null，加上 `?` 后变为可空类型。

```csharp
// 可空值类型
int? nullableInt = null;
bool? nullableBool = null;
double? score = 95.5;

// 判断是否有值
if (nullableInt.HasValue)
{
    Console.WriteLine(nullableInt.Value);
}
else
{
    Console.WriteLine("没有值");
}

// 合并空运算符 ??
int result = nullableInt ?? -1; // 如果为 null，使用默认值 -1
Console.WriteLine(result);      // 输出 -1

// 可空引用类型（C# 8+，需要在项目文件中启用）
#nullable enable
string? nullableString = null;
#nullable disable
```

## 默认值

不同类型的变量在未赋值时有默认值：

```csharp
int defaultInt = default;       // 0
bool defaultBool = default;     // false
char defaultChar = default;     // '\0'
double defaultDouble = default; // 0.0
string defaultString = default; // null
object defaultObj = default;    // null

// 也可以使用 default 关键字指定类型
int n = default(int);           // 0
bool b = default(bool);         // false
```

## 完整示例

```csharp
using System;

class Program
{
    static void Main()
    {
        // === 变量声明 ===
        string name = "小明";
        int age = 20;
        double height = 175.5;
        bool isStudent = true;

        Console.WriteLine($"姓名：{name}");
        Console.WriteLine($"年龄：{age}");
        Console.WriteLine($"身高：{height}cm");
        Console.WriteLine($"是否学生：{isStudent}");

        // === 类型转换示例 ===
        Console.Write("请输入一个整数：");
        string input = Console.ReadLine();

        if (int.TryParse(input, out int number))
        {
            Console.WriteLine($"你输入了：{number}");
            Console.WriteLine($"平方是：{number * number}");
        }
        else
        {
            Console.WriteLine("输入的不是有效整数");
        }

        // === 可空类型示例 ===
        int? temperature = null;

        if (temperature.HasValue)
        {
            Console.WriteLine($"温度：{temperature.Value}°C");
        }
        else
        {
            Console.WriteLine("温度数据不可用");
        }

        temperature = 25;
        int displayTemp = temperature ?? 0;
        Console.WriteLine($"显示温度：{displayTemp}°C");
    }
}
```