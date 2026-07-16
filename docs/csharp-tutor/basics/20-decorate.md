---
order: 20
---

# C# 修饰符

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/)

## 访问修饰符

控制类型和成员的可访问范围。

| 修饰符 | 访问范围 | 说明 |
|--------|----------|------|
| `public` | 无限制 | 任何代码均可访问 |
| `private` | 仅当前类/结构体内部 | 默认的类成员访问级别 |
| `protected` | 当前类 + 派生类 | 继承链中可用 |
| `internal` | 同一程序集（.exe/.dll）内 | 项目内部可见 |
| `protected internal` | 同一程序集 + 派生类 | 并集关系 |
| `private protected` | 同一程序集中的派生类（C# 7.2+） | 交集关系 |

```csharp
public class AccessExample
{
    public int PublicField;           // 任何地方可访问
    private int _privateField;        // 仅当前类
    protected int ProtectedField;     // 当前类 + 派生类
    internal int InternalField;       // 同一程序集
    protected internal int ProIntField; // 同一程序集 + 派生类
    private protected int PrivProField; // 同一程序集中的派生类

    public void Demo()
    {
        // 类内部可以访问所有
        Console.WriteLine(PublicField + _privateField + ProtectedField
            + InternalField + ProIntField + PrivProField);
    }
}

// 类级别默认是 internal
class DefaultInternalClass { }           // 等价于 internal class

// 顶级类型只能 public 或 internal
// private class InvalidClass { }        // ❌ 编译错误
```

## static 修饰符

声明属于类型本身而非实例的成员。

```csharp
public class MathUtils
{
    // 静态字段
    private static int _instanceCount;

    // 静态属性
    public static string Version { get; } = "2.0.0";

    // 静态方法
    public static double CircleArea(double radius)
        => Math.PI * radius * radius;

    // 静态构造函数（类首次被使用时执行一次）
    static MathUtils()
    {
        _instanceCount = 0;
        Console.WriteLine("MathUtils 初始化");
    }

    // 实例构造函数
    public MathUtils()
    {
        _instanceCount++;
    }

    // 静态方法可以访问静态成员
    public static int GetInstanceCount() => _instanceCount;
}

// 静态类：不能实例化，所有成员必须为静态
public static class AppConfig
{
    public static string AppName { get; set; } = "MyApp";
    public static bool IsDebug { get; set; } = false;
}

// 使用
double area = MathUtils.CircleArea(5);
Console.WriteLine(AppConfig.AppName);
// AppConfig config = new AppConfig(); // ❌ 静态类不能实例化
```

### 静态局部函数（C# 8+）

```csharp
int Calculate(int[] numbers)
{
    // static 局部函数：不能捕获外部变量，避免闭包分配
    static int Sum(Span<int> nums)
    {
        int total = 0;
        foreach (var n in nums) total += n;
        return total;
    }

    return Sum(numbers.AsSpan());
}
```

## readonly 修饰符

### readonly 字段

只能在声明时或构造函数中赋值。

```csharp
public class Config
{
    // 运行时常量
    public readonly string ConnectionString;
    public readonly int MaxRetries = 3;

    public Config(string connectionString)
    {
        ConnectionString = connectionString; // 构造函数中赋值
    }

    // 普通方法不能修改 readonly 字段
    // public void Update() => MaxRetries = 5; // ❌ 编译错误
}
```

### readonly struct

声明不可变结构体，编译器可进行优化（避免不必要的复制）。

```csharp
public readonly struct Point
{
    // readonly struct 的所有字段自动为 readonly
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }

    // readonly struct 中的方法不会修改状态
    public double DistanceTo(Point other)
        => Math.Sqrt(Math.Pow(X - other.X, 2) + Math.Pow(Y - other.Y, 2));
}

// 使用
var p1 = new Point(3, 4);
var p2 = new Point(0, 0);
Console.WriteLine(p1.DistanceTo(p2)); // 5
```

### readonly 成员（C# 8+）

对非 readonly struct 的实例成员标记 readonly，声明其不修改状态。

```csharp
public struct MutablePoint
{
    public int X { get; set; }
    public int Y { get; set; }

    // 这个方法不修改状态，标记 readonly 避免编译器防御性复制
    public readonly double DistanceToOrigin()
        => Math.Sqrt(X * X + Y * Y);

    // 这个方法修改状态，不能标记 readonly
    public void Move(int dx, int dy)
    {
        X += dx;
        Y += dy;
    }
}
```

## ref 修饰符

### ref 参数

传递引用而非值的副本，方法内修改影响原始变量。

```csharp
void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}

int x = 5, y = 10;
Swap(ref x, ref y);
Console.WriteLine($"x={x}, y={y}"); // x=10, y=5
```

### ref 局部变量

引用另一个变量的别名。

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

// ref 局部变量指向数组元素
ref int third = ref numbers[2];
third = 99; // 修改 numbers[2]
Console.WriteLine(numbers[2]); // 99

// ref 条件表达式（C# 7.2+）
bool flag = true;
ref int target = ref flag ? ref numbers[0] : ref numbers[1];
target = 100;
Console.WriteLine(numbers[0]); // 100
```

### ref 返回

方法返回引用，调用者可修改返回值指向的对象。

```csharp
class BigArray
{
    private int[] _data = new int[100];

    public ref int this[int index]
    {
        get => ref _data[index];
    }
}

var arr = new BigArray();
arr[50] = 42; // 通过 ref 返回直接修改
ref int item = ref arr[50];
item = 100;
Console.WriteLine(arr[50]); // 100
```

## in 修饰符（C# 7.2+）

只读引用传递，避免值类型复制但禁止修改。

```csharp
struct LargeStruct
{
    public int Value1;
    public int Value2;
    public int Value3;
}

// in 参数：避免复制大结构体，且保证不被修改
void Process(in LargeStruct data)
{
    // data.Value1 = 1; // ❌ 编译错误，in 是只读的
    Console.WriteLine(data.Value1 + data.Value2 + data.Value3);
}

var large = new LargeStruct { Value1 = 10, Value2 = 20, Value3 = 30 };
Process(in large);
Process(large); // in 可以省略
```

## out 修饰符

调用方无需初始化，被调用方必须赋值。

```csharp
// TryParse 模式
if (int.TryParse("123", out int result))
{
    Console.WriteLine(result); // 123
}

// 多个 out 参数
void GetMinMax(int[] numbers, out int min, out int max)
{
    if (numbers.Length == 0)
    {
        min = max = 0;
        return;
    }
    min = numbers.Min();
    max = numbers.Max();
}

GetMinMax(new[] { 3, 1, 4, 1, 5 }, out int minVal, out int maxVal);
Console.WriteLine($"min={minVal}, max={maxVal}"); // min=1, max=5
```

## params 修饰符

允许方法接受可变数量的参数。

```csharp
int Sum(params int[] numbers)
{
    int total = 0;
    foreach (int n in numbers) total += n;
    return total;
}

Console.WriteLine(Sum(1, 2));          // 3
Console.WriteLine(Sum(1, 2, 3, 4));   // 10
Console.WriteLine(Sum());             // 0

// params 集合（C# 13+）
void Log(params IEnumerable<string> messages)
{
    foreach (var msg in messages)
        Console.WriteLine($"[LOG] {msg}");
}

Log("启动", "初始化完成", "准备就绪");
```

## override 与 new 修饰符

### override

重写基类中的 `virtual` 或 `abstract` 方法。

```csharp
class Animal
{
    public virtual void Speak() => Console.WriteLine("动物叫声");
    public void Eat() => Console.WriteLine("动物进食");
}

class Dog : Animal
{
    // override：重写虚方法
    public override void Speak() => Console.WriteLine("汪汪！");
    // ❌ 不能 override 非 virtual 方法
    // public override void Eat() => ... // 编译错误
}
```

### new

隐藏基类中的同名成员（非虚方法或不想用 override 时）。

```csharp
class Base
{
    public void Method() => Console.WriteLine("Base.Method");
    public int Value => 10;
}

class Derived : Base
{
    // new 显式隐藏基类成员
    public new void Method() => Console.WriteLine("Derived.Method");
    public new int Value => 20;
}

// 多态行为不同
Base b = new Derived();
b.Method();     // Base.Method（基类引用调基类方法）

Derived d = new Derived();
d.Method();     // Derived.Method（派生类引用调派生类方法）
```

## partial 修饰符

将类、结构体、接口或方法的定义拆分到多个文件中。

```csharp
// File1.cs
public partial class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

// File2.cs
public partial class Person
{
    public void Introduce()
        => Console.WriteLine($"我是{Name}，{Age}岁。");

    // partial 方法（C# 9+ 可以有访问修饰符和返回类型）
    public partial void OnPropertyChanged(string propertyName);
}

// File3.cs — partial 方法的实现
public partial class Person
{
    public partial void OnPropertyChanged(string propertyName)
    {
        Console.WriteLine($"属性 {propertyName} 已改变");
    }
}
```

## unsafe 修饰符

启用不安全代码（指针操作）。需要在项目文件中启用 `AllowUnsafeBlocks`。

```csharp
unsafe class UnsafeExample
{
    public static void Demo()
    {
        int value = 42;
        int* ptr = &value;
        Console.WriteLine(*ptr); // 42

        *ptr = 100;
        Console.WriteLine(value); // 100
    }
}

// 不安全方法
unsafe void FastCopy(byte* src, byte* dst, int length)
{
    for (int i = 0; i < length; i++)
        dst[i] = src[i];
}
```

## const 修饰符

编译时常量，值在编译时确定。

```csharp
public class Constants
{
    // const 值在编译时确定
    public const double PI = 3.14159;
    public const int MaxUsers = 100;
    public const string AppName = "MyApp";

    // const 只能是内置数值、字符串、枚举类型
    // public const List<int> List = new(); // ❌ 不能是引用类型（string 除外）
}

// 使用
Console.WriteLine(Constants.PI);

// const 是编译时常量，会被内联到调用代码中
// 修改 const 值后需要重新编译所有引用该常量的程序集
```

## 常用修饰符组合

```csharp
// 常见的访问修饰符组合
public static class Utils { }
internal sealed class InternalClass { }
public abstract class BaseClass { }
public readonly struct ImmutablePoint { }
public ref struct RefStruct { }
public unsafe struct UnsafeStruct { }
public partial class PartialClass { }

// 修饰符的推荐顺序
// [访问修饰符] [static/readonly/virtual/abstract/override/new] [其他] 返回类型 方法名
public static readonly int MaxSize = 1024;
public virtual void Method() { }
protected internal abstract void AbstractMethod();
```

## 修饰符速查表

| 修饰符 | 可用位置 | 作用 |
|--------|----------|------|
| `public` | 类型/成员 | 任何代码可访问 |
| `private` | 类型成员 | 仅当前类型内可访问 |
| `protected` | 类型成员 | 派生类可访问 |
| `internal` | 类型/成员 | 同一程序集可访问 |
| `static` | 类/成员 | 属于类型本身，而非实例 |
| `readonly` | 字段/结构体/成员 | 不可变（字段/结构体）或不修改状态（成员） |
| `ref` | 参数/返回值/局部变量 | 引用传递，可修改 |
| `in` | 参数 | 只读引用传递 |
| `out` | 参数 | 输出参数，调用方不需初始化 |
| `params` | 参数 | 可变数量参数 |
| `virtual` | 方法/属性 | 可在派生类中重写 |
| `override` | 方法/属性 | 重写基类虚方法 |
| `sealed` | 类/方法 | 禁止继承或重写 |
| `abstract` | 类/方法 | 抽象成员，必须在派生类实现 |
| `new` | 成员 | 隐藏基类同名成员 |
| `partial` | 类/结构体/接口/方法 | 分部定义 |
| `unsafe` | 类型/成员 | 允许指针操作 |
| `async` | 方法/Lambda | 启用异步等待 |
| `const` | 字段/局部变量 | 编译时常量 |
