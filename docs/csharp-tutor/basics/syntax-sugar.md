# C# 语法糖

语法糖（Syntactic Sugar）是指编程语言中那些让代码更简洁、更易读的语法特性，它们在编译时会被转换成更基础的代码。C# 在多个版本中引入了大量语法糖。

## 自动属性

编译器自动生成私有字段和 getter/setter 实现。

```csharp
// 语法糖写法
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

// 编译器实际生成的代码（简化）
public class Person
{
    private string _name;
    private int _age;

    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }

    public int Age
    {
        get { return _age; }
        set { _age = value; }
    }
}
```

## var 隐式类型推断

编译器根据初始化表达式推断变量类型。

```csharp
// 语法糖写法
var name = "张三";       // string
var age = 25;           // int
var prices = new List<decimal>(); // List<decimal>
var dict = new Dictionary<string, int>(); // Dictionary<string, int>

// 编译器生成的代码（等价）
string name = "张三";
int age = 25;
List<decimal> prices = new List<decimal>();
Dictionary<string, int> dict = new Dictionary<string, int>();

// var 不能用于：
// var x;              // ❌ 必须初始化
// var y = null;       // ❌ 不能推断为 null
// var z = (object)null; // ✅ 可以，但 z 是 object 类型
```

## 对象初始化器

在创建对象时直接给属性赋值，省去重复的赋值语句。

```csharp
// 传统写法
var person = new Person();
person.Name = "张三";
person.Age = 25;
person.Email = "zhangsan@example.com";

// 语法糖写法（对象初始化器）
var person = new Person
{
    Name = "张三",
    Age = 25,
    Email = "zhangsan@example.com"
};

// 编译器实际生成的代码（简化）
var person = new Person();
person.Name = "张三";
person.Age = 25;
person.Email = "zhangsan@example.com";
```

## 集合初始化器

```csharp
// 传统写法
var list = new List<int>();
list.Add(1);
list.Add(2);
list.Add(3);

// 语法糖写法
var list = new List<int> { 1, 2, 3 };

// 字典初始化器
var dict = new Dictionary<string, int>
{
    { "一", 1 },
    { "二", 2 },
    { "三", 3 }
};

// 字典初始化器（C# 6+ 索引初始化器语法）
var dict = new Dictionary<string, int>
{
    ["一"] = 1,
    ["二"] = 2,
    ["三"] = 3
};
```

## 字符串插值

```csharp
string name = "张三";
int age = 25;

// 传统写法（string.Format）
string msg1 = string.Format("我叫{0}，今年{1}岁。", name, age);

// 字符串拼接
string msg2 = "我叫" + name + "，今年" + age + "岁。";

// 语法糖写法（字符串插值，C# 6+）
string msg3 = $"我叫{name}，今年{age}岁。";

Console.WriteLine(msg3); // 我叫张三，今年25岁。

// 高级用法：表达式、格式化
double price = 19.99;
int quantity = 3;
Console.WriteLine($"总价：{price * quantity:C}"); // 总价：¥59.97

DateTime now = DateTime.Now;
Console.WriteLine($"当前时间：{now:yyyy-MM-dd HH:mm:ss}");

// 原始字符串插值（C# 11+）
string json = $$"""
{
    "name": "{{name}}",
    "age": {{age}}
}
""";
Console.WriteLine(json);
```

## using 声明

自动释放资源，省去显式的 try/finally。

```csharp
// 传统写法（using 语句）
using (var reader = new StreamReader("file.txt"))
{
    string content = reader.ReadToEnd();
    Console.WriteLine(content);
}

// 语法糖写法（using 声明，C# 8+）
using var reader = new StreamReader("file.txt");
string content = reader.ReadToEnd();
Console.WriteLine(content);
// 在作用域结束时自动调用 reader.Dispose()
```

## 表达式体成员

用 `=>` 替代完整的代码块，让方法、属性等更简洁。

```csharp
public class MathUtils
{
    // 传统写法
    public int Add(int a, int b)
    {
        return a + b;
    }

    // 表达式体方法（C# 6+）
    public int Add(int a, int b) => a + b;

    // 传统属性
    public string FullName
    {
        get { return $"{FirstName} {LastName}"; }
    }

    // 表达式体只读属性（C# 6+）
    public string FullName => $"{FirstName} {LastName}";

    // 表达式体构造函数（C# 7+）
    public MathUtils(int seed) => _seed = seed;

    // 表达式体终结器（C# 7+）
    ~MathUtils() => Console.WriteLine("销毁");
}
```

## null 合并运算符

```csharp
string? name = null;

// 传统写法
string displayName;
if (name != null)
    displayName = name;
else
    displayName = "匿名用户";

// 语法糖 ??（C# 6+）
string displayName = name ?? "匿名用户";

// 链式使用
string? a = null, b = null, c = "Hello";
string result = a ?? b ?? c ?? "默认值";
Console.WriteLine(result); // Hello

// ??= 空合并赋值（C# 8+）
string? text = null;
text ??= "初始值";    // 如果 text 为 null 则赋值
Console.WriteLine(text); // 初始值
text ??= "不生效";     // text 不为 null，不赋值
Console.WriteLine(text); // 初始值
```

## null 条件运算符

```csharp
Person? person = GetPerson();

// 传统写法
string? name;
if (person != null)
    name = person.Name;
else
    name = null;

// 语法糖 ?.（C# 6+）
string? name = person?.Name;

// 链式调用
string? city = person?.Address?.City;

// 结合 null 合并运算符
string city = person?.Address?.City ?? "未知城市";

// 事件调用（传统写法需要检查 null）
if (OnClick != null)
    OnClick.Invoke(sender, args);

// 语法糖写法
OnClick?.Invoke(sender, args);
```

## 使用 new() 简化类型声明

```csharp
// 传统写法
List<string> list = new List<string>();
Dictionary<string, int> dict = new Dictionary<string, int>();

// 语法糖写法（目标类型 new 表达式，C# 9+）
List<string> list = new();
Dictionary<string, int> dict = new();

// 方法参数中
void Process(List<int> numbers) { }
Process(new()); // 编译通过，类型推断为 List<int>

// 字段初始化
public class Example
{
    public List<string> Items { get; set; } = new();
}
```

## 弃元（Discard）

用 `_` 忽略不需要的值。

```csharp
// 忽略 out 参数
if (int.TryParse("123", out _))
{
    Console.WriteLine("解析成功");
}

// 忽略元组元素
var (name, _, age) = GetPersonInfo();
Console.WriteLine(name); // 只使用 name

// 忽略异步任务返回值
_ = Task.Run(() => DoWork());

// switch 表达式中忽略不需要的 case
string result = value switch
{
    int i => $"数字 {i}",
    _ => "其他"
};
```

## 各种语法糖对比

| 特性 | 引入版本 | 语法糖 | 编译后等价形式 |
|------|---------|--------|---------------|
| 自动属性 | C# 3 | `{ get; set; }` | 手动字段 + getter/setter |
| var | C# 3 | `var x = 1;` | `int x = 1;` |
| 对象初始化器 | C# 3 | `new Foo { X=1 }` | `new Foo(); foo.X=1;` |
| 集合初始化器 | C# 3 | `new List<int>{1,2}` | `new List(); Add(1); Add(2);` |
| Lambda | C# 3 | `x => x > 0` | 匿名方法 / 委托 |
| 字符串插值 | C# 6 | `$"Hello {name}"` | `string.Format("Hello {0}", name)` |
| null 条件运算符 | C# 6 | `obj?.Prop` | `obj==null ? null : obj.Prop` |
| null 合并 | C# 6 | `a ?? b` | `a != null ? a : b` |
| 表达式体 | C# 6/7 | `=> expr` | 完整方法体 |
| 元组 | C# 7 | `(int, string)` | `ValueTuple<int,string>` |
| 弃元 | C# 7 | `_` | 忽略变量 |
| 索引/范围 | C# 8 | `^1` / `1..^1` | `Index` / `Range` 结构体 |
| using 声明 | C# 8 | `using var x = ...` | `try { ... } finally { x.Dispose(); }` |
| 目标类型 new | C# 9 | `new()` | 完整的 `new T()` |
| 集合表达式 | C# 12 | `[1, 2, 3]` | `new int[]{1,2,3}` 或 `List<int>...` |

## 完整示例：语法糖组合使用

```csharp
using System;

// 语法糖：自动属性、表达式体、目标类型 new
public class Order
{
    public List<OrderItem> Items { get; set; } = new();
    public decimal Total => Items.Sum(i => i.Price * i.Quantity);
    public DateTime CreatedAt { get; init; } = DateTime.Now;
    public string? Note { get; set; }
}

public class OrderItem
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

class Program
{
    static void Main()
    {
        // 语法糖：对象初始化器、集合初始化器、目标类型 new
        var order = new Order
        {
            Items = new()
            {
                new() { Name = "鼠标", Price = 99.99m, Quantity = 2 },
                new() { Name = "键盘", Price = 199.99m, Quantity = 1 }
            },
            Note = "加急配送"
        };

        // 语法糖：字符串插值、null 条件运算符、null 合并
        Console.WriteLine($"订单创建时间：{order.CreatedAt:yyyy-MM-dd}");
        Console.WriteLine($"订单备注：{order.Note ?? "无"}");
        Console.WriteLine($"订单总价：{order.Total:C}");

        // 语法糖：??= 赋值
        order.Note ??= "默认备注";
    }
}
```