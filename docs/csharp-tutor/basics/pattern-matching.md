# 模式匹配

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/patterns)

模式匹配是 C# 7+ 引入的强大特性，可以检查值的类型、结构、属性等，并从中提取数据。C# 的每个新版本都在扩展模式匹配能力。

## 声明模式

### is 表达式中的声明模式

```csharp
// 传统写法：先检查类型，再强制转换
object obj = "Hello, World!";
if (obj is string)
{
    string s = (string)obj;
    Console.WriteLine(s.Length);
}

// 声明模式（C# 7+）：类型检查 + 转换一步完成
if (obj is string s)
{
    Console.WriteLine(s.Length); // 13
}
// 变量 s 在 if 作用域内有效
```

### 带条件的声明模式

```csharp
object obj = 42;

if (obj is int i && i > 0)
{
    Console.WriteLine($"正整数：{i}");
}

// 使用 when 子句
if (obj is int n when n > 0)
{
    Console.WriteLine($"正数：{n}");
}
else if (obj is int n when n < 0)
{
    Console.WriteLine($"负数：{n}");
}
else if (obj is int n)
{
    Console.WriteLine($"零：{n}");
}
```

## 类型模式

```csharp
object value = 3.14;

// 检查类型并匹配
if (value is int)
    Console.WriteLine("整数");
else if (value is double)
    Console.WriteLine("小数");
else if (value is string)
    Console.WriteLine("字符串");

// 结合 not 模式（C# 9+）
if (value is not null)
    Console.WriteLine("不为 null");

if (value is not string)
    Console.WriteLine("不是字符串");
```

## 常量模式

```csharp
object obj = 42;

// 匹配具体值
if (obj is 42)
    Console.WriteLine("是 42！");

if (obj is 100)
    Console.WriteLine("是 100！");

// 结合 null 检查
if (obj is null)
    Console.WriteLine("是 null");

if (obj is not null)
    Console.WriteLine("不是 null");
```

## 属性模式（C# 8+）

可以匹配对象的属性值。

```csharp
public class Point
{
    public int X { get; set; }
    public int Y { get; set; }
}

public class Rectangle
{
    public int Width { get; set; }
    public int Height { get; set; }
}

// 属性模式匹配
static string Describe(object obj)
{
    return obj switch
    {
        // 匹配 Point 且 X == 0, Y == 0
        Point { X: 0, Y: 0 } => "原点",

        // 匹配 Point 且 X == 0
        Point { X: 0 } => "Y 轴上的点",

        // 匹配 Point 且 Y == 0
        Point { Y: 0 } => "X 轴上的点",

        // 匹配任意 Point
        Point { X: var x, Y: var y } => $"点 ({x}, {y})",

        // 匹配正方形
        Rectangle { Width: var w, Height: var h } when w == h => $"正方形 {w}x{h}",

        // 匹配任意矩形
        Rectangle { Width: var w, Height: var h } => $"矩形 {w}x{h}",

        _ => "未知图形"
    };
}

// 使用
Console.WriteLine(Describe(new Point { X = 0, Y = 0 }));  // 原点
Console.WriteLine(Describe(new Point { X = 5, Y = 0 }));  // X 轴上的点
Console.WriteLine(Describe(new Point { X = 3, Y = 4 }));  // 点 (3, 4)
Console.WriteLine(Describe(new Rectangle { Width = 5, Height = 5 })); // 正方形 5x5
Console.WriteLine(Describe(new Rectangle { Width = 4, Height = 6 })); // 矩形 4x6
```

### 嵌套属性模式

```csharp
public class Address
{
    public string City { get; set; }
    public string Country { get; set; }
}

public class Person
{
    public string Name { get; set; }
    public Address Address { get; set; }
    public int Age { get; set; }
}

static string GetPersonInfo(Person person)
{
    return person switch
    {
        // 嵌套属性模式
        { Address: { City: "北京", Country: "中国" } } => "北京人",

        // 简化嵌套（C# 10+）
        { Address.City: "上海", Address.Country: "中国" } => "上海人",

        // 组合条件
        { Age: >= 18, Address.Country: "中国" } => $"中国成年人 {person.Name}",

        // 其他
        { Name: var name, Age: var age } => $"{name}，{age}岁"
    };
}
```

## 位置模式（C# 8+）

配合 `Deconstruct` 方法，通过位置匹配。

```csharp
public class Point
{
    public int X { get; set; }
    public int Y { get; set; }

    public void Deconstruct(out int x, out int y)
    {
        x = X;
        y = Y;
    }
}

static string DescribePoint(Point point)
{
    return point switch
    {
        (0, 0) => "原点",
        (0, _) => "Y 轴上",       // _ 为弃元，忽略 Y
        (_, 0) => "X 轴上",       // _ 为弃元，忽略 X
        (var x, var y) => $"({x}, {y})"
    };
}

// 使用
var p = new Point { X = 0, Y = 5 };
Console.WriteLine(DescribePoint(p)); // Y 轴上
```

## 关系模式（C# 9+）

使用 `<`, `>`, `<=`, `>=` 等关系运算符进行匹配。

```csharp
static string Classify(int number)
{
    return number switch
    {
        < 0 => "负数",
        > 0 => "正数",
        0 => "零"
    };
}

// 结合 and/or 模式
static string GetCategory(int score)
{
    return score switch
    {
        < 0 or > 100 => "无效分数",
        >= 90 => "优秀",
        >= 80 => "良好",
        >= 70 => "中等",
        >= 60 => "及格",
        _ => "不及格"
    };
}

// 范围检查
static bool IsInRange(int value, int min, int max)
{
    return value switch
    {
        >= min and <= max => true,
        _ => false
    };
}

Console.WriteLine(Classify(-5));   // 负数
Console.WriteLine(GetCategory(85)); // 良好
Console.WriteLine(IsInRange(50, 0, 100)); // True
```

## 逻辑模式（C# 9+）

使用 `and`、`or`、`not` 组合多个模式。

```csharp
static string Describe(object obj)
{
    return obj switch
    {
        // not 模式
        not null => $"有值：{obj}",

        // and 组合
        int i and > 0 and < 10 => "1~9 之间的整数",

        // or 组合
        string s or int i => $"字符串或整数：{obj}",

        // 复杂组合
        int i when i >= 0 => $"非负整数：{i}",
        // 等价于：int i and >= 0

        _ => "其他"
    };
}

// 注意：not 模式要放在前面，因为 switch 按顺序匹配
// 上面第一个 not null 会匹配所有非 null 值
// 但示例仅用于演示语法
```

## 列表模式（C# 11+）

匹配数组或集合的元素。

```csharp
static string DescribeArray(int[] numbers)
{
    return numbers switch
    {
        // 空数组
        [] => "空数组",

        // 一个元素
        [var first] => $"只有一个元素：{first}",

        // 两个元素
        [var first, var second] => $"两个元素：{first}, {second}",

        // 第一个和最后一个元素
        [var first, .., var last] => $"第一个：{first}，最后一个：{last}",

        // 任意数组
        _ => $"数组长度：{numbers.Length}"
    };
}

// 匹配特定值的列表
static string CheckSequence(int[] numbers)
{
    return numbers switch
    {
        [1, 2, 3] => "完全匹配 [1, 2, 3]",
        [1, ..] => "以 1 开头",
        [.., 9] => "以 9 结尾",
        [1, 2, _, _, _] => "前两个是 1 和 2",
        _ => "其他序列"
    };
}

Console.WriteLine(DescribeArray(new int[] { }));             // 空数组
Console.WriteLine(DescribeArray(new int[] { 42 }));          // 只有一个元素：42
Console.WriteLine(DescribeArray(new int[] { 1, 2, 3, 4 })); // 第一个：1，最后一个：4
Console.WriteLine(CheckSequence(new int[] { 1, 2, 3 }));     // 完全匹配 [1, 2, 3]
Console.WriteLine(CheckSequence(new int[] { 1, 5, 7 }));     // 以 1 开头
```

## switch 表达式

### 基本用法

```csharp
// 传统 switch 语句
static string GetDayType(string day)
{
    switch (day)
    {
        case "星期一":
        case "星期二":
        case "星期三":
        case "星期四":
        case "星期五":
            return "工作日";
        case "星期六":
        case "星期日":
            return "周末";
        default:
            return "无效";
    }
}

// switch 表达式（C# 8+）
static string GetDayType(string day) => day switch
{
    "星期一" or "星期二" or "星期三" or "星期四" or "星期五" => "工作日",
    "星期六" or "星期日" => "周末",
    _ => "无效"  // _ 相当于 default
};
```

### 复杂案例

```csharp
// 计算运费
static decimal CalculateShipping(Order order) => order switch
{
    // 免运费：VIP 会员且金额 >= 100
    { IsVip: true, TotalAmount: >= 100 } => 0m,

    // VIP 会员半价运费
    { IsVip: true } => order.TotalAmount * 0.05m,

    // 大额订单免运费
    { TotalAmount: >= 200 } => 0m,

    // 普通订单
    { TotalAmount: >= 50 } => 10m,

    // 小额订单
    _ => 15m
};

public class Order
{
    public bool IsVip { get; set; }
    public decimal TotalAmount { get; set; }
}

Console.WriteLine(CalculateShipping(new Order { IsVip = true, TotalAmount = 100 }));  // 0
Console.WriteLine(CalculateShipping(new Order { IsVip = true, TotalAmount = 30 }));   // 1.5
Console.WriteLine(CalculateShipping(new Order { IsVip = false, TotalAmount = 200 })); // 0
Console.WriteLine(CalculateShipping(new Order { IsVip = false, TotalAmount = 30 }));  // 15
```

## 实际案例

### 表达式计算器

```csharp
public abstract class Expr { }

public class Constant : Expr
{
    public double Value { get; set; }
}

public class BinaryOp : Expr
{
    public Expr Left { get; set; }
    public Expr Right { get; set; }
    public string Op { get; set; }
}

public class Negate : Expr
{
    public Expr Inner { get; set; }
}

static double Evaluate(Expr expr) => expr switch
{
    Constant { Value: var v } => v,
    BinaryOp { Op: "+", Left: var l, Right: var r } => Evaluate(l) + Evaluate(r),
    BinaryOp { Op: "-", Left: var l, Right: var r } => Evaluate(l) - Evaluate(r),
    BinaryOp { Op: "*", Left: var l, Right: var r } => Evaluate(l) * Evaluate(r),
    BinaryOp { Op: "/", Left: var l, Right: var r } => Evaluate(l) / Evaluate(r),
    Negate { Inner: var inner } => -Evaluate(inner),
    _ => throw new ArgumentException("未知表达式")
};

// 使用：(3 + 5) * 2 - 4
var expr = new BinaryOp
{
    Op = "-",
    Left = new BinaryOp
    {
        Op = "*",
        Left = new BinaryOp { Op = "+", Left = new Constant { Value = 3 }, Right = new Constant { Value = 5 } },
        Right = new Constant { Value = 2 }
    },
    Right = new Constant { Value = 4 }
};

Console.WriteLine(Evaluate(expr)); // 12
```

### API 响应处理

```csharp
public class ApiResponse<T>
{
    public int StatusCode { get; set; }
    public T? Data { get; set; }
    public string? ErrorMessage { get; set; }
    public bool IsSuccess => StatusCode is >= 200 and < 300;
}

static string HandleResponse(ApiResponse<object>? response) => response switch
{
    // null 响应
    null => "没有收到响应",

    // 成功响应
    { IsSuccess: true, Data: not null } => $"成功：{response.Data}",

    // 成功但无数据
    { IsSuccess: true } => "成功（无数据）",

    // 客户端错误
    { StatusCode: >= 400 and < 500, ErrorMessage: var msg } => $"客户端错误：{msg ?? "未知错误"}",

    // 服务器错误
    { StatusCode: >= 500 } => "服务器错误",

    // 其他
    { StatusCode: var code, ErrorMessage: var msg } => $"状态码 {code}：{msg ?? "未知"}"
};

// 使用
var responses = new[]
{
    new ApiResponse<object> { StatusCode = 200, Data = "用户数据" },
    new ApiResponse<object> { StatusCode = 404, ErrorMessage = "资源未找到" },
    new ApiResponse<object> { StatusCode = 500 },
    null
};

foreach (var r in responses)
{
    Console.WriteLine(HandleResponse(r));
}
// 输出：
// 成功：用户数据
// 客户端错误：资源未找到
// 服务器错误
// 没有收到响应
```