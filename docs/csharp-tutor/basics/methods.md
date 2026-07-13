# 方法

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/methods)

## 方法定义

### 基本语法

```csharp
[访问修饰符] [static] 返回类型 方法名(参数列表)
{
    // 方法体
    return 返回值;
}
```

```csharp
// 无返回值、无参数
void SayHello()
{
    Console.WriteLine("你好！");
}

// 有返回值、有参数
int Add(int a, int b)
{
    return a + b;
}

// 调用
SayHello();
int sum = Add(3, 5);
Console.WriteLine(sum); // 8
```

### 方法重载

多个方法同名，但参数列表不同（参数数量或类型不同）。

```csharp
class Calculator
{
    // 两个整数相加
    public int Add(int a, int b)
    {
        return a + b;
    }

    // 三个整数相加
    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }

    // 两个小数相加
    public double Add(double a, double b)
    {
        return a + b;
    }

    // 字符串拼接
    public string Add(string a, string b)
    {
        return a + b;
    }
}

// 使用
Calculator calc = new Calculator();
Console.WriteLine(calc.Add(1, 2));         // 3
Console.WriteLine(calc.Add(1, 2, 3));      // 6
Console.WriteLine(calc.Add(1.5, 2.5));     // 4.0
Console.WriteLine(calc.Add("Hello", " World")); // Hello World
```

## 参数传递

### 值参数（默认）

传递的是变量的副本，方法内修改不影响原始变量。

```csharp
void ChangeValue(int x)
{
    x = 100; // 只修改副本
}

int num = 10;
ChangeValue(num);
Console.WriteLine(num); // 10（未改变）
```

### ref 参数

传递引用，方法内修改会影响原始变量。调用时变量必须初始化。

```csharp
void ChangeRef(ref int x)
{
    x = 100; // 修改原始变量
}

int num = 10;
ChangeRef(ref num);
Console.WriteLine(num); // 100（已改变）

// 交换两个值（经典用法）
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

### out 参数

类似 `ref`，但调用时变量不必初始化，方法内必须为其赋值。

```csharp
// TryParse 模式（最常用）
bool TryDivide(int a, int b, out int result)
{
    if (b == 0)
    {
        result = 0;
        return false;
    }
    result = a / b;
    return true;
}

if (TryDivide(10, 3, out int quotient))
{
    Console.WriteLine($"结果：{quotient}");
}
else
{
    Console.WriteLine("除数不能为零");
}

// 多个 out 参数
void GetMinMax(int[] numbers, out int min, out int max)
{
    min = numbers.Min();
    max = numbers.Max();
}

int[] nums = { 3, 1, 4, 1, 5, 9, 2 };
GetMinMax(nums, out int minVal, out int maxVal);
Console.WriteLine($"最小值：{minVal}, 最大值：{maxVal}");
```

### in 参数

只读引用传递，方法内不能修改参数值（C# 7.2+）。

```csharp
void DisplayInfo(in int value)
{
    // value = 100; // ❌ 编译错误，in 参数是只读的
    Console.WriteLine($"值：{value}");
}

int num = 42;
DisplayInfo(in num);
DisplayInfo(num); // in 可以省略
```

### params 参数

可变参数，允许传入任意数量的参数。一个方法只能有一个 `params`，且必须是最后一个参数。

```csharp
int Sum(params int[] numbers)
{
    int total = 0;
    foreach (int n in numbers)
    {
        total += n;
    }
    return total;
}

Console.WriteLine(Sum(1, 2));          // 3
Console.WriteLine(Sum(1, 2, 3, 4, 5)); // 15
Console.WriteLine(Sum());              // 0

// 也可以直接传数组
Console.WriteLine(Sum(new int[] { 10, 20, 30 })); // 60

// 混合参数
void PrintFormatted(string format, params object[] args)
{
    Console.WriteLine(string.Format(format, args));
}

PrintFormatted("姓名：{0}，年龄：{1}", "张三", 25);
// 输出：姓名：张三，年龄：25
```

### 可选参数与命名参数

```csharp
// 可选参数：有默认值的参数
void CreateUser(string name, int age = 18, string city = "北京")
{
    Console.WriteLine($"创建用户：{name}, {age}岁, 来自{city}");
}

CreateUser("张三");              // 年龄和城市使用默认值
CreateUser("李四", 25);          // 城市使用默认值
CreateUser("王五", 30, "上海"); // 全部指定

// 命名参数：指定参数名传参，可以改变顺序
CreateUser(age: 22, name: "赵六", city: "广州");
// 输出：创建用户：赵六, 22岁, 来自广州
```

## 局部函数

在方法内部定义的方法（C# 7+）。

```csharp
int Factorial(int n)
{
    // 局部函数
    int InnerFactorial(int x)
    {
        if (x <= 1) return 1;
        return x * InnerFactorial(x - 1); // 支持递归
    }

    if (n < 0) throw new ArgumentException("不能为负数");
    return InnerFactorial(n);
}

Console.WriteLine(Factorial(5)); // 120

// 局部函数可以访问外部方法的变量
int Process(int[] numbers)
{
    int total = 0;

    bool IsValid(int n) => n > 0; // 局部函数

    foreach (int n in numbers)
    {
        if (IsValid(n))
        {
            total += n;
        }
    }

    return total;
}
```

## Lambda 表达式

### 基本语法

```csharp
// 语法：(参数列表) => 表达式 或 { 语句块 }

// 无参数
Action sayHello = () => Console.WriteLine("你好！");
sayHello();

// 一个参数
Func<int, int> square = x => x * x;
Console.WriteLine(square(5)); // 25

// 多个参数
Func<int, int, int> add = (a, b) => a + b;
Console.WriteLine(add(3, 4)); // 7

// 多行语句体
Func<int, int, string> compare = (a, b) =>
{
    if (a > b) return $"{a} 大于 {b}";
    if (a < b) return $"{a} 小于 {b}";
    return $"{a} 等于 {b}";
};
Console.WriteLine(compare(5, 3)); // 5 大于 3
```

### 与集合配合使用

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// 筛选（Where）
var evens = numbers.Where(n => n % 2 == 0);
Console.WriteLine($"偶数：{string.Join(", ", evens)}");

// 映射（Select）
var squares = numbers.Select(n => n * n);
Console.WriteLine($"平方：{string.Join(", ", squares)}");

// 排序（OrderBy, OrderByDescending）
var sorted = numbers.OrderByDescending(n => n);

// 聚合（Sum, Average, Min, Max）
Console.WriteLine(numbers.Sum());      // 55
Console.WriteLine(numbers.Average());  // 5.5
Console.WriteLine(numbers.Min());      // 1
Console.WriteLine(numbers.Max());      // 10

// 链式调用
var result = numbers
    .Where(n => n > 5)
    .Select(n => n * 2)
    .OrderByDescending(n => n)
    .ToList();
Console.WriteLine(string.Join(", ", result)); // 20, 18, 16, 14, 12
```

### 闭包（捕获外部变量）

```csharp
int factor = 3;
Func<int, int> multiplier = n => n * factor;
Console.WriteLine(multiplier(5)); // 15

factor = 10;                      // lambda 捕获的是变量引用
Console.WriteLine(multiplier(5)); // 50（受到影响）
```

## 扩展方法

允许向现有类型添加方法，无需修改原类型。

```csharp
public static class StringExtensions
{
    // 第一个参数使用 this 关键字，表示要扩展的类型
    public static bool IsPalindrome(this string str)
    {
        if (string.IsNullOrEmpty(str)) return false;
        string reversed = new string(str.Reverse().ToArray());
        return str.Equals(reversed, StringComparison.OrdinalIgnoreCase);
    }

    public static int WordCount(this string str)
    {
        if (string.IsNullOrEmpty(str)) return 0;
        return str.Split(new[] { ' ', '.', '!', '?' },
            StringSplitOptions.RemoveEmptyEntries).Length;
    }
}

public static class IntExtensions
{
    public static bool IsEven(this int number)
    {
        return number % 2 == 0;
    }

    public static int Square(this int number)
    {
        return number * number;
    }
}

// 使用扩展方法
string text = "hello world";
Console.WriteLine(text.WordCount()); // 2

string palindrome = "Racecar";
Console.WriteLine(palindrome.IsPalindrome()); // True

int num = 42;
Console.WriteLine(num.IsEven());  // True
Console.WriteLine(num.Square());  // 1764
```

## 实际案例

### 字符串工具类

```csharp
public static class StringUtils
{
    // 首字母大写
    public static string Capitalize(this string str)
    {
        if (string.IsNullOrEmpty(str)) return str;
        return char.ToUpper(str[0]) + str[1..];
    }

    // 截断字符串
    public static string Truncate(this string str, int maxLength, string suffix = "...")
    {
        if (string.IsNullOrEmpty(str)) return str;
        if (str.Length <= maxLength) return str;
        return str[..maxLength] + suffix;
    }

    // 判断是否为空或空白
    public static bool IsBlank(this string str)
    {
        return string.IsNullOrWhiteSpace(str);
    }

    // 重复字符串
    public static string Repeat(this string str, int count)
    {
        return string.Concat(Enumerable.Repeat(str, count));
    }
}

// 使用
Console.WriteLine("hello".Capitalize());  // Hello
Console.WriteLine("这是一段很长的文本内容".Truncate(5)); // 这是一段...
Console.WriteLine("   ".IsBlank());       // True
Console.WriteLine("=-".Repeat(5));        // =-= -= -= -= -= -
```

### 数据转换器

```csharp
public static class Converter
{
    // 温度转换
    public static double CelsiusToFahrenheit(double celsius)
        => celsius * 9 / 5 + 32;

    public static double FahrenheitToCelsius(double fahrenheit)
        => (fahrenheit - 32) * 5 / 9;

    // 单位转换
    public static double KmToMiles(double km)
        => km * 0.621371;

    public static double MilesToKm(double miles)
        => miles / 0.621371;

    // 货币格式化
    public static string FormatCurrency(decimal amount, string currency = "¥")
        => $"{currency}{amount:N2}";
}

// 使用
Console.WriteLine(Converter.CelsiusToFahrenheit(100));  // 212
Console.WriteLine(Converter.KmToMiles(10));             // 6.21371
Console.WriteLine(Converter.FormatCurrency(1234.5m));   // ¥1,234.50
```