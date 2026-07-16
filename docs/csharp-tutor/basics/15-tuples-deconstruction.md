---
order: 15
---

# 元组与解构

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/value-tuples)

## 元组（Tuple）

元组可以让你将多个值组合成一个轻量级的数据结构，无需定义类或结构体。

### 基本语法

```csharp
// 无命名元组
var person = ("张三", 25);
Console.WriteLine(person.Item1); // 张三
Console.WriteLine(person.Item2); // 25

// 命名元组（C# 7+）
var person = (Name: "张三", Age: 25);
Console.WriteLine(person.Name);  // 张三
Console.WriteLine(person.Age);   // 25

// 也可以在方法中指定返回类型
(string Name, int Age) GetPerson() => ("张三", 25);

var result = GetPerson();
Console.WriteLine(result.Name); // 张三
Console.WriteLine(result.Age);  // 25
```

### 元组 vs 传统方式

```csharp
// 传统方式：使用 out 参数
bool TryParsePoint(string input, out int x, out int y)
{
    // ...
}

// 传统方式：定义小类
class PointResult
{
    public int X { get; set; }
    public int Y { get; set; }
    public bool Success { get; set; }
}

// 使用元组（更简洁）
(bool Success, int X, int Y) TryParsePoint(string input)
{
    var parts = input.Split(',');
    if (parts.Length == 2 &&
        int.TryParse(parts[0], out int x) &&
        int.TryParse(parts[1], out int y))
    {
        return (true, x, y);
    }
    return (false, 0, 0);
}

// 使用
var result = TryParsePoint("3, 4");
if (result.Success)
{
    Console.WriteLine($"坐标：({result.X}, {result.Y})");
}
```

### 命名元组的字段名

```csharp
// 方法返回命名元组
static (string Name, int Age, string City) GetPerson()
{
    return ("张三", 25, "北京");
}

// 使用命名元组
var person = GetPerson();
Console.WriteLine($"姓名：{person.Name}，年龄：{person.Age}，城市：{person.City}");

// 也可以在接收时重命名
var (name, age, city) = GetPerson();
Console.WriteLine($"{name}, {age}, {city}");

// 元组作为参数
void PrintPerson((string Name, int Age) person)
{
    Console.WriteLine($"{person.Name}：{person.Age}岁");
}

PrintPerson(("李四", 30));
```

### 元组与 LINQ

```csharp
var people = new List<(string Name, int Age, string City)>
{
    ("张三", 25, "北京"),
    ("李四", 30, "上海"),
    ("王五", 22, "广州"),
    ("赵六", 35, "北京")
};

// 筛选 + 投影
var result = people
    .Where(p => p.Age > 25)
    .Select(p => (p.Name, p.City))
    .ToList();

foreach (var (name, city) in result)
{
    Console.WriteLine($"{name} 在 {city}");
}

// 分组
var grouped = people
    .GroupBy(p => p.City)
    .Select(g => (City: g.Key, Count: g.Count(), AverageAge: g.Average(p => p.Age)));

foreach (var (city, count, avgAge) in grouped)
{
    Console.WriteLine($"{city}：{count}人，平均年龄{avgAge:F1}");
}
```

### 元组作为字典键

```csharp
// 元组实现了 Equals 和 GetHashCode，可以作为字典键
var cache = new Dictionary<(int, string), string>();

cache[(1, "en")] = "Hello";
cache[(1, "zh")] = "你好";
cache[(2, "en")] = "World";
cache[(2, "zh")] = "世界";

Console.WriteLine(cache[(1, "zh")]); // 你好
Console.WriteLine(cache[(2, "en")]); // World

// 查找
if (cache.TryGetValue((1, "jp"), out string value))
{
    Console.WriteLine(value);
}
else
{
    Console.WriteLine("未找到"); // 未找到
}
```

## 解构

解构是将元组或其他类型分解为独立变量的过程。

### 解构元组

```csharp
// 方式1：显式类型
(string name, int age) = GetPerson();

// 方式2：var 推断
var (name, age) = GetPerson();

// 方式3：混合（部分显式，部分 var）
(string name, var age) = GetPerson();

// 方式4：丢弃不需要的元素（弃元 _）
var (name, _, city) = GetPerson(); // 忽略 age
Console.WriteLine($"{name} 在 {city}");
```

### 解构自定义类型

需要实现 `Deconstruct` 方法。

```csharp
public class Point
{
    public int X { get; set; }
    public int Y { get; set; }

    // 实现 Deconstruct 方法
    public void Deconstruct(out int x, out int y)
    {
        x = X;
        y = Y;
    }
}

// 使用解构
var point = new Point { X = 10, Y = 20 };
var (x, y) = point;
Console.WriteLine($"x={x}, y={y}"); // x=10, y=20

// 多个 Deconstruct 重载
public class Rectangle
{
    public int Width { get; set; }
    public int Height { get; set; }

    public void Deconstruct(out int width, out int height)
    {
        width = Width;
        height = Height;
    }

    public void Deconstruct(out int width, out int height, out int area)
    {
        width = Width;
        height = Height;
        area = Width * Height;
    }
}

var rect = new Rectangle { Width = 5, Height = 3 };
var (w, h) = rect;          // 调用第一个重载
var (w2, h2, area) = rect; // 调用第二个重载
Console.WriteLine($"{w}x{h}={area}"); // 5x3=15
```

### 解构接口

```csharp
public interface IShape
{
    void Deconstruct(out double area, out double perimeter);
}

public class Circle : IShape
{
    public double Radius { get; set; }

    public void Deconstruct(out double area, out double perimeter)
    {
        area = Math.PI * Radius * Radius;
        perimeter = 2 * Math.PI * Radius;
    }
}

public class Square : IShape
{
    public double Side { get; set; }

    public void Deconstruct(out double area, out double perimeter)
    {
        area = Side * Side;
        perimeter = 4 * Side;
    }
}

// 使用
IShape[] shapes = { new Circle { Radius = 5 }, new Square { Side = 4 } };
foreach (var shape in shapes)
{
    var (area, perimeter) = shape;
    Console.WriteLine($"面积：{area:F2}，周长：{perimeter:F2}");
}
```

### 解构 record

record 类型自动生成 `Deconstruct` 方法。

```csharp
// record 位置语法自动生成 Deconstruct
public record Person(string Name, int Age, string City);

// record 传统语法不会自动生成，需要手动实现
public record Student
{
    public string Name { get; init; }
    public int Age { get; init; }
    public string Grade { get; init; }

    public void Deconstruct(out string name, out int age)
    {
        name = Name;
        age = Age;
    }
}

// 使用
var person = new Person("张三", 25, "北京");
var (name, age, city) = person;
Console.WriteLine($"{name}，{age}岁，来自{city}");

var student = new Student { Name = "李四", Age = 18, Grade = "高三" };
var (stuName, stuAge) = student;
Console.WriteLine($"{stuName}，{stuAge}岁");
```

## 实际案例

### 统计词频

```csharp
static Dictionary<string, int> CountWords(string text)
{
    var words = text.Split(new[] { ' ', '.', ',', '!', '?' },
        StringSplitOptions.RemoveEmptyEntries);

    var counts = new Dictionary<string, int>();
    foreach (var word in words.Select(w => w.ToLower()))
    {
        // 使用元组作为模式匹配
        if (counts.TryGetValue(word, out int count))
            counts[word] = count + 1;
        else
            counts[word] = 1;
    }
    return counts;
}

static List<(string Word, int Count)> GetTopWords(string text, int top = 5)
{
    return CountWords(text)
        .Select(kvp => (kvp.Key, kvp.Value))
        .OrderByDescending(w => w.Count)
        .Take(top)
        .ToList();
}

// 使用
string text = "hello world hello csharp hello world dotnet csharp is great";
var topWords = GetTopWords(text, 3);

// 解构遍历
foreach (var (word, count) in topWords)
{
    Console.WriteLine($"{word}：{count}次");
}
// 输出：
// hello：3次
// world：2次
// csharp：2次
```

### 范围查询结果

```csharp
static (int Min, int Max, double Average, int Count) Analyze(int[] numbers)
{
    if (numbers.Length == 0)
        return (0, 0, 0, 0);

    return (
        numbers.Min(),
        numbers.Max(),
        numbers.Average(),
        numbers.Length
    );
}

// 使用
var data = new[] { 3, 1, 4, 1, 5, 9, 2, 6, 5, 3 };

var (min, max, avg, count) = Analyze(data);
Console.WriteLine($"数据量：{count}");
Console.WriteLine($"最小值：{min}，最大值：{max}");
Console.WriteLine($"平均值：{avg:F2}");

// 部分解构（忽略不需要的）
var (_, _, average, _) = Analyze(data);
Console.WriteLine($"平均：{average:F2}");
```

### 坐标运算

```csharp
// 使用元组表示坐标
static (double X, double Y) Add((double X, double Y) a, (double X, double Y) b)
    => (a.X + b.X, a.Y + b.Y);

static (double X, double Y) Scale((double X, double Y) point, double factor)
    => (point.X * factor, point.Y * factor);

static double Distance((double X, double Y) a, (double X, double Y) b)
{
    var dx = a.X - b.X;
    var dy = a.Y - b.Y;
    return Math.Sqrt(dx * dx + dy * dy);
}

// 使用
var p1 = (X: 1.0, Y: 2.0);
var p2 = (X: 4.0, Y: 6.0);

var sum = Add(p1, p2);
var scaled = Scale(p1, 3);
var dist = Distance(p1, p2);

Console.WriteLine($"和：({sum.X}, {sum.Y})");          // (5, 8)
Console.WriteLine($"缩放：({scaled.X}, {scaled.Y})");  // (3, 6)
Console.WriteLine($"距离：{dist:F2}");                  // 5
```

### 多重返回值

```csharp
class DataParser
{
    // 解析日期
    public static (bool Success, DateTime Date, string? Error) ParseDate(string input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return (false, default, "输入为空");

        if (DateTime.TryParse(input, out var date))
            return (true, date, null);

        return (false, default, $"无法解析日期：{input}");
    }

    // 解析用户信息
    public static (bool Success, string? Name, int? Age, string? Email, string? Error)
        ParseUserInfo(string line)
    {
        var parts = line.Split('|');
        if (parts.Length != 3)
            return (false, null, null, null, "格式错误，需要 name|age|email 格式");

        if (!int.TryParse(parts[1], out int age))
            return (false, null, null, null, "年龄格式错误");

        return (true, parts[0], age, parts[2], null);
    }
}

// 使用
var (success, date, error) = DataParser.ParseDate("2024-01-15");
if (success)
    Console.WriteLine($"日期：{date:yyyy年MM月dd日}");
else
    Console.WriteLine($"错误：{error}");

var (ok, name, age, email, err) = DataParser.ParseUserInfo("张三|25|zhangsan@test.com");
if (ok)
    Console.WriteLine($"用户：{name}，{age}岁，{email}");
else
    Console.WriteLine($"错误：{err}");
```