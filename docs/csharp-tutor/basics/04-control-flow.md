---
order: 4
---

# 控制流

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/selection-statements)

## 条件语句

### if / else if / else

```csharp
int score = 85;

if (score >= 90)
{
    Console.WriteLine("优秀");
}
else if (score >= 80)
{
    Console.WriteLine("良好");   // 输出：良好
}
else if (score >= 60)
{
    Console.WriteLine("及格");
}
else
{
    Console.WriteLine("不及格");
}
```

### 三元运算符

```csharp
int age = 18;
string status = age >= 18 ? "成年" : "未成年";
Console.WriteLine(status); // 输出：成年

// 嵌套三元（不推荐过多嵌套）
int x = 5;
string result = x > 0 ? "正数" : x < 0 ? "负数" : "零";
Console.WriteLine(result); // 输出：正数
```

### switch 语句

```csharp
// 传统 switch
string day = "星期一";

switch (day)
{
    case "星期一":
        Console.WriteLine("新的一周开始");
        break;
    case "星期五":
        Console.WriteLine("快到周末了");
        break;
    case "星期六":
    case "星期日":
        Console.WriteLine("周末愉快！");
        break;
    default:
        Console.WriteLine("普通工作日");
        break;
}
```

### switch 表达式（C# 8+）

```csharp
// switch 表达式更简洁，直接返回值
string day = "星期一";

string message = day switch
{
    "星期一" => "新的一周开始",
    "星期五" => "快到周末了",
    "星期六" or "星期日" => "周末愉快！",
    _ => "普通工作日"     // _ 相当于 default
};

Console.WriteLine(message);
```

### 模式匹配 switch（C# 7+）

```csharp
object value = 42;

string description = value switch
{
    int i when i > 0 => $"正整数 {i}",
    int i when i < 0 => $"负整数 {i}",
    int i => "零",
    string s => $"字符串：{s}",
    double d => $"小数：{d}",
    null => "空值",
    _ => $"未知类型：{value.GetType().Name}"
};

Console.WriteLine(description); // 输出：正整数 42
```

### 实际案例：成绩等级评定

```csharp
static string GetGrade(int score)
{
    return score switch
    {
        >= 90 => "A",
        >= 80 => "B",
        >= 70 => "C",
        >= 60 => "D",
        _ => "F"
    };
}

Console.WriteLine(GetGrade(95)); // A
Console.WriteLine(GetGrade(82)); // B
Console.WriteLine(GetGrade(55)); // F
```

## 循环语句

### for 循环

```csharp
// 基本 for 循环
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"i = {i}");
}
// 输出：
// i = 0
// i = 1
// i = 2
// i = 3
// i = 4

// 倒序循环
for (int i = 5; i > 0; i--)
{
    Console.Write($"{i} ");
}
// 输出：5 4 3 2 1

// 跳步循环
for (int i = 0; i <= 10; i += 2)
{
    Console.Write($"{i} ");
}
// 输出：0 2 4 6 8 10

// 多个变量
for (int i = 0, j = 10; i < j; i++, j--)
{
    Console.WriteLine($"i={i}, j={j}");
}
```

### while 循环

```csharp
// while 循环：先判断再执行
int count = 0;
while (count < 5)
{
    Console.Write($"{count} ");
    count++;
}
// 输出：0 1 2 3 4

// 无限循环（需要 break 退出）
while (true)
{
    Console.WriteLine("按 q 退出...");
    string input = Console.ReadLine();
    if (input == "q")
        break;
}
```

### do-while 循环

```csharp
// do-while：至少执行一次，再判断
int num = 1;
do
{
    Console.Write($"{num} ");
    num++;
} while (num <= 5);
// 输出：1 2 3 4 5

// 即使条件不满足，也会执行一次
int x = 10;
do
{
    Console.WriteLine($"x = {x}"); // 执行一次
} while (x < 5);
// 输出：x = 10
```

### foreach 循环

```csharp
// 遍历数组
int[] numbers = { 10, 20, 30, 40, 50 };
foreach (int num in numbers)
{
    Console.Write($"{num} ");
}
// 输出：10 20 30 40 50

// 遍历字符串（字符串也是字符数组）
string hello = "你好C#";
foreach (char c in hello)
{
    Console.Write($"{c} ");
}
// 输出：你 好 C #

// 遍历集合
List<string> fruits = new List<string> { "苹果", "香蕉", "橘子" };
foreach (string fruit in fruits)
{
    Console.WriteLine($"我喜欢吃{fruit}");
}
// 输出：
// 我喜欢吃苹果
// 我喜欢吃香蕉
// 我喜欢吃橘子

// 遍历字典
Dictionary<string, int> scores = new()
{
    { "张三", 90 },
    { "李四", 85 },
    { "王五", 78 }
};
foreach (KeyValuePair<string, int> pair in scores)
{
    Console.WriteLine($"{pair.Key}：{pair.Value}分");
}
```

## 跳转语句

### break

```csharp
// 提前退出循环
for (int i = 0; i < 10; i++)
{
    if (i == 5)
        break; // 跳出循环
    Console.Write($"{i} ");
}
// 输出：0 1 2 3 4
```

### continue

```csharp
// 跳过当前迭代，进入下一次循环
for (int i = 1; i <= 10; i++)
{
    if (i % 2 == 0)
        continue; // 跳过偶数
    Console.Write($"{i} ");
}
// 输出：1 3 5 7 9
```

### return

```csharp
static bool IsEven(int number)
{
    if (number % 2 == 0)
        return true; // 立即返回
    return false;
}

static void PrintNumbers()
{
    for (int i = 0; i < 10; i++)
    {
        if (i > 5)
            return; // 提前结束方法
        Console.Write($"{i} ");
    }
    Console.WriteLine("这行不会执行");
}
// PrintNumbers() 输出：0 1 2 3 4 5
```

### goto（谨慎使用）

```csharp
// goto 可以跳转到标签位置
for (int i = 0; i < 10; i++)
{
    for (int j = 0; j < 10; j++)
    {
        if (i == 3 && j == 3)
            goto Found; // 跳出多层循环
    }
}
Console.WriteLine("没找到");
return;

Found:
Console.WriteLine("在 (3, 3) 找到了！");
```

## 实际案例

### 猜数字游戏

```csharp
static void GuessNumber()
{
    Random random = new Random();
    int target = random.Next(1, 101); // 1~100 随机数
    int attempts = 0;

    Console.WriteLine("猜数字游戏（1~100）");

    while (true)
    {
        Console.Write("请输入你的猜测：");
        string input = Console.ReadLine();

        if (!int.TryParse(input, out int guess))
        {
            Console.WriteLine("请输入有效数字");
            continue;
        }

        attempts++;

        if (guess < target)
        {
            Console.WriteLine("太小了，再试试");
        }
        else if (guess > target)
        {
            Console.WriteLine("太大了，再试试");
        }
        else
        {
            Console.WriteLine($"恭喜你猜对了！答案是 {target}");
            Console.WriteLine($"你用了 {attempts} 次猜中");
            break;
        }
    }
}
```

### 打印乘法表

```csharp
static void PrintMultiplicationTable()
{
    for (int i = 1; i <= 9; i++)
    {
        for (int j = 1; j <= i; j++)
        {
            Console.Write($"{j}×{i}={i * j}\t");
        }
        Console.WriteLine();
    }
}
// 输出：
// 1×1=1
// 1×2=2    2×2=4
// 1×3=3    2×3=6    3×3=9
// ...
```

### 简易计算器

```csharp
static void Calculator()
{
    while (true)
    {
        Console.WriteLine("\n=== 简易计算器 ===");
        Console.WriteLine("1. 加法");
        Console.WriteLine("2. 减法");
        Console.WriteLine("3. 乘法");
        Console.WriteLine("4. 除法");
        Console.WriteLine("5. 退出");

        Console.Write("请选择操作：");
        string choice = Console.ReadLine();

        if (choice == "5")
        {
            Console.WriteLine("再见！");
            break;
        }

        Console.Write("输入第一个数字：");
        if (!double.TryParse(Console.ReadLine(), out double a)) continue;

        Console.Write("输入第二个数字：");
        if (!double.TryParse(Console.ReadLine(), out double b)) continue;

        double result = choice switch
        {
            "1" => a + b,
            "2" => a - b,
            "3" => a * b,
            "4" when b != 0 => a / b,
            "4" => double.NaN,
            _ => double.NaN
        };

        if (double.IsNaN(result))
        {
            Console.WriteLine("无效操作或除数不能为零");
        }
        else
        {
            Console.WriteLine($"结果：{result}");
        }
    }
}
```