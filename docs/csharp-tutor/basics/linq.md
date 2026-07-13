# LINQ 用法

[官方文档](https://learn.microsoft.com/zh-cn/dotnet/csharp/linq/)

LINQ（Language Integrated Query，语言集成查询）是 C# 中的一组功能，让你可以用类似 SQL 的语法对集合、数据库、XML 等数据源进行查询操作。

## LINQ 的两种形式

### 1. 查询语法（Query Syntax）

类似 SQL 的声明式语法。

```csharp
int[] numbers = { 5, 3, 8, 1, 9, 2, 7, 4, 6 };

var result = from n in numbers
             where n > 5
             orderby n descending
             select n;

Console.WriteLine(string.Join(", ", result)); // 9, 8, 7, 6
```

### 2. 方法语法（Method Syntax / Fluent Syntax）

使用扩展方法和 Lambda 表达式。

```csharp
int[] numbers = { 5, 3, 8, 1, 9, 2, 7, 4, 6 };

var result = numbers
    .Where(n => n > 5)
    .OrderByDescending(n => n);

Console.WriteLine(string.Join(", ", result)); // 9, 8, 7, 6
```

### 两种语法等价

```csharp
// 编译后相同，选你喜欢的风格
// 简单操作推荐方法语法，复杂查询推荐查询语法

// 查询语法
var q1 = from n in numbers where n % 2 == 0 select n;

// 方法语法
var q2 = numbers.Where(n => n % 2 == 0);
```

## 常用操作符

### Where — 筛选

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// 查询语法
var evens = from n in numbers
            where n % 2 == 0
            select n;

// 方法语法
var evens2 = numbers.Where(n => n % 2 == 0);

Console.WriteLine(string.Join(", ", evens)); // 2, 4, 6, 8, 10

// 多个条件
var selected = numbers.Where(n => n > 3 && n < 8);
Console.WriteLine(string.Join(", ", selected)); // 4, 5, 6, 7

// 使用索引
var indexed = numbers.Where((n, i) => n > i);
Console.WriteLine(string.Join(", ", indexed)); // 2, 3, 4, 5, 6, 7, 8, 9, 10
```

### Select — 投影（映射）

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

// 查询语法
var squares = from n in numbers
              select n * n;

// 方法语法
var squares2 = numbers.Select(n => n * n);

Console.WriteLine(string.Join(", ", squares)); // 1, 4, 9, 16, 25

// 投影到匿名类型
var people = new[]
{
    new { Name = "张三", Age = 25, City = "北京" },
    new { Name = "李四", Age = 30, City = "上海" },
    new { Name = "王五", Age = 22, City = "北京" }
};

var names = people.Select(p => p.Name);
Console.WriteLine(string.Join(", ", names)); // 张三, 李四, 王五

// Select 带索引
var withIndex = numbers.Select((n, i) => $"索引{i} = {n}");
foreach (var item in withIndex)
{
    Console.WriteLine(item);
}
// 输出：
// 索引0 = 1
// 索引1 = 2
// 索引2 = 3
```

### SelectMany — 扁平化

```csharp
// 将嵌套集合展平
var teams = new[]
{
    new { Team = "开发组", Members = new[] { "张三", "李四", "王五" } },
    new { Team = "测试组", Members = new[] { "赵六", "钱七" } }
};

// 查询语法（多个 from）
var allMembers = from team in teams
                 from member in team.Members
                 select member;

// 方法语法
var allMembers2 = teams.SelectMany(team => team.Members);

Console.WriteLine(string.Join(", ", allMembers));
// 张三, 李四, 王五, 赵六, 钱七

// SelectMany 带结果选择器
var teamInfo = teams.SelectMany(
    team => team.Members,
    (team, member) => $"{member} 属于 {team.Team}"
);
foreach (var item in teamInfo)
{
    Console.WriteLine(item);
}
// 输出：
// 张三 属于 开发组
// 李四 属于 开发组
// 王五 属于 开发组
// 赵六 属于 测试组
// 钱七 属于 测试组
```

### OrderBy / ThenBy — 排序

```csharp
var people = new[]
{
    new { Name = "张三", Age = 25, City = "北京" },
    new { Name = "李四", Age = 30, City = "上海" },
    new { Name = "王五", Age = 22, City = "北京" },
    new { Name = "赵六", Age = 25, City = "广州" }
};

// 升序
var byAge = people.OrderBy(p => p.Age);

// 降序
var byAgeDesc = people.OrderByDescending(p => p.Age);

// 多级排序
var multiSort = people
    .OrderBy(p => p.City)          // 先按城市
    .ThenByDescending(p => p.Age); // 再按年龄降序

// 查询语法
var sorted = from p in people
             orderby p.City, p.Age descending
             select p;

Console.WriteLine("按城市+年龄排序：");
foreach (var p in multiSort)
{
    Console.WriteLine($"  {p.Name} — {p.City} — {p.Age}");
}
// 输出：
//   张三 — 北京 — 25
//   王五 — 北京 — 22
//   赵六 — 广州 — 25
//   李四 — 上海 — 30
```

### GroupBy — 分组

```csharp
var people = new[]
{
    new { Name = "张三", Age = 25, City = "北京" },
    new { Name = "李四", Age = 30, City = "上海" },
    new { Name = "王五", Age = 22, City = "北京" },
    new { Name = "赵六", Age = 35, City = "广州" },
    new { Name = "钱七", Age = 28, City = "上海" }
};

// 查询语法
var groups = from p in people
             group p by p.City;

// 方法语法
var groups2 = people.GroupBy(p => p.City);

foreach (var group in groups)
{
    Console.WriteLine($"\n城市：{group.Key}（{group.Count()}人）");
    foreach (var person in group)
    {
        Console.WriteLine($"  {person.Name}，{person.Age}岁");
    }
}
// 输出：
// 城市：北京（2人）
//   张三，25岁
//   王五，22岁
// 城市：上海（2人）
//   李四，30岁
//   钱七，28岁
// 城市：广州（1人）
//   赵六，35岁

// 分组后投影（GroupBy + Select）
var summary = people
    .GroupBy(p => p.City)
    .Select(g => new
    {
        City = g.Key,
        Count = g.Count(),
        AverageAge = g.Average(p => p.Age),
        MaxAge = g.Max(p => p.Age)
    });

foreach (var item in summary)
{
    Console.WriteLine($"{item.City}：{item.Count}人，平均{item.AverageAge:F1}岁");
}
```

### Join — 连接

```csharp
var students = new[]
{
    new { Id = 1, Name = "张三" },
    new { Id = 2, Name = "李四" },
    new { Id = 3, Name = "王五" }
};

var scores = new[]
{
    new { StudentId = 1, Subject = "数学", Score = 90 },
    new { StudentId = 1, Subject = "英语", Score = 85 },
    new { StudentId = 2, Subject = "数学", Score = 78 },
    new { StudentId = 3, Subject = "英语", Score = 92 }
};

// 查询语法
var query = from s in students
            join sc in scores on s.Id equals sc.StudentId
            select new { s.Name, sc.Subject, sc.Score };

// 方法语法
var query2 = students.Join(
    scores,
    s => s.Id,
    sc => sc.StudentId,
    (s, sc) => new { s.Name, sc.Subject, sc.Score }
);

Console.WriteLine("学生成绩：");
foreach (var item in query)
{
    Console.WriteLine($"  {item.Name} — {item.Subject}：{item.Score}");
}
// 输出：
//   张三 — 数学：90
//   张三 — 英语：85
//   李四 — 数学：78
//   王五 — 英语：92

// GroupJoin（左外连接）
var groupJoin = from s in students
                join sc in scores on s.Id equals sc.StudentId into studentScores
                select new
                {
                    s.Name,
                    Scores = studentScores.DefaultIfEmpty(),
                    Average = studentScores.Any() ? studentScores.Average(sc => sc.Score) : 0
                };
```

### 聚合函数

```csharp
int[] numbers = { 3, 1, 4, 1, 5, 9, 2, 6 };

Console.WriteLine($"Count：{numbers.Count()}");      // 8
Console.WriteLine($"Sum：{numbers.Sum()}");           // 31
Console.WriteLine($"Average：{numbers.Average()}");   // 3.875
Console.WriteLine($"Min：{numbers.Min()}");           // 1
Console.WriteLine($"Max：{numbers.Max()}");           // 9

// 带筛选的聚合
var evenAvg = numbers.Where(n => n % 2 == 0).Average();
Console.WriteLine($"偶数平均值：{evenAvg}");          // 4

// 自定义聚合（Aggregate）
var product = numbers.Aggregate((a, b) => a * b);
Console.WriteLine($"乘积：{product}");                // 6480

var sentence = new[] { "Hello", "World", "from", "C#" };
var combined = sentence.Aggregate((a, b) => $"{a} {b}");
Console.WriteLine(combined); // Hello World from C#
```

## 元素操作符

```csharp
int[] numbers = { 3, 1, 4, 1, 5, 9, 2, 6 };
int[] empty = { };

// 取单个元素
Console.WriteLine(numbers.First());          // 3
Console.WriteLine(numbers.First(n => n > 5)); // 9
Console.WriteLine(numbers.FirstOrDefault(n => n > 10)); // 0（默认值）
Console.WriteLine(empty.FirstOrDefault());   // 0

Console.WriteLine(numbers.Last());           // 6
Console.WriteLine(numbers.Last(n => n < 5)); // 2

Console.WriteLine(numbers.Single(n => n > 8)); // 9（只有一个匹配项）
// Console.WriteLine(numbers.Single(n => n > 2)); // ❌ InvalidOperationException（多个匹配）

// 按位置取
Console.WriteLine(numbers.ElementAt(2));     // 4
Console.WriteLine(numbers.ElementAtOrDefault(100)); // 0（越界返回默认值）
```

## 集合操作符

```csharp
int[] set1 = { 1, 2, 3, 4, 5 };
int[] set2 = { 4, 5, 6, 7, 8 };

// Distinct — 去重
int[] duplicates = { 1, 2, 2, 3, 3, 3, 4 };
Console.WriteLine(string.Join(", ", duplicates.Distinct())); // 1, 2, 3, 4

// Union — 并集
Console.WriteLine($"并集：{string.Join(", ", set1.Union(set2))}"); // 1, 2, 3, 4, 5, 6, 7, 8

// Intersect — 交集
Console.WriteLine($"交集：{string.Join(", ", set1.Intersect(set2))}"); // 4, 5

// Except — 差集
Console.WriteLine($"差集(set1 - set2)：{string.Join(", ", set1.Except(set2))}"); // 1, 2, 3

// Concat — 拼接（不去重）
Console.WriteLine($"拼接：{string.Join(", ", set1.Concat(set2))}"); // 1, 2, 3, 4, 5, 4, 5, 6, 7, 8
```

## 分区操作符

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Take — 取前N个
Console.WriteLine(string.Join(", ", numbers.Take(3)));    // 1, 2, 3

// Skip — 跳过前N个
Console.WriteLine(string.Join(", ", numbers.Skip(3)));    // 4, 5, 6, 7, 8, 9, 10

// TakeWhile — 取直到条件不满足
Console.WriteLine(string.Join(", ", numbers.TakeWhile(n => n < 5))); // 1, 2, 3, 4

// SkipWhile — 跳过直到条件不满足
Console.WriteLine(string.Join(", ", numbers.SkipWhile(n => n < 5))); // 5, 6, 7, 8, 9, 10

// 分页（Skip + Take）
int pageSize = 3;
for (int page = 1; page <= 4; page++)
{
    var pageData = numbers.Skip((page - 1) * pageSize).Take(pageSize);
    Console.WriteLine($"第{page}页：{string.Join(", ", pageData)}");
}
// 输出：
// 第1页：1, 2, 3
// 第2页：4, 5, 6
// 第3页：7, 8, 9
// 第4页：10

// Take(^N) — 取后N个（.NET 6+）
Console.WriteLine(string.Join(", ", numbers.Take(^3))); // 8, 9, 10

// Skip(^N) — 跳过最后N个（.NET 6+）
Console.WriteLine(string.Join(", ", numbers.Skip(^3))); // 1, 2, 3, 4, 5, 6, 7
```

## 判断与量词

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

Console.WriteLine(numbers.Any());           // True（是否有任何元素）
Console.WriteLine(numbers.Any(n => n > 5)); // False（是否有大于5的）
Console.WriteLine(numbers.All(n => n > 0)); // True（是否全部大于0）
Console.WriteLine(numbers.Contains(3));     // True（是否包含3）
Console.WriteLine(numbers.SequenceEqual(new[] { 1, 2, 3, 4, 5 })); // True（序列相等）
```

## 转换操作符

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

// ToList
List<int> list = numbers.ToList();

// ToArray
int[] array = numbers.ToArray();

// ToDictionary
var dict = numbers.ToDictionary(n => n, n => n * n);
foreach (var kvp in dict)
{
    Console.WriteLine($"{kvp.Key} → {kvp.Value}");
}

// ToHashSet
HashSet<int> set = numbers.ToHashSet();

// 转换为其他类型
string result = string.Join(", ", numbers);
```

## 延迟执行（Deferred Execution）

```csharp
// LINQ 查询默认延迟执行——在需要结果时才执行
var numbers = new List<int> { 1, 2, 3 };

// 定义查询（此时还未执行）
var query = numbers.Where(n =>
{
    Console.WriteLine($"  检查 {n}");
    return n > 1;
});

Console.WriteLine("查询已定义，但未执行。");

// 遍历时才会执行
Console.WriteLine("开始遍历：");
foreach (var n in query)
{
    Console.WriteLine($"  得到 {n}");
}
// 输出：
// 查询已定义，但未执行。
// 开始遍历：
//   检查 1
//   检查 2
//   得到 2
//   检查 3
//   得到 3

// 立即执行：使用 ToList/ToArray/Count/First 等
var eager = numbers.Where(n => n > 1).ToList(); // 立即执行
```

## LINQ 与不同数据源

### 内存集合（LINQ to Objects）

```csharp
// 数组
int[] numbers = { 1, 2, 3, 4, 5 };
var result1 = numbers.Where(n => n > 2);

// List<T>
List<string> fruits = new() { "苹果", "香蕉", "橘子" };
var result2 = fruits.Where(f => f.Length == 2);

// HashSet
HashSet<int> set = new() { 1, 2, 3, 4, 5 };
var result3 = set.Where(n => n % 2 == 0);

// Dictionary
Dictionary<string, int> scores = new()
{
    { "张三", 90 }, { "李四", 85 }, { "王五", 78 }
};
var result4 = scores.Where(kvp => kvp.Value >= 80);
```

### 文件（LINQ to Files）

```csharp
// 读取文件并用 LINQ 处理
var largeFiles = new DirectoryInfo("C:/Windows")
    .GetFiles()
    .Where(f => f.Length > 10_000_000)
    .OrderByDescending(f => f.Length)
    .Select(f => $"{f.Name} ({f.Length / 1024 / 1024} MB)");

foreach (var file in largeFiles.Take(5))
{
    Console.WriteLine(file);
}
```

## 实际案例

### 员工数据分析

```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
    public decimal Salary { get; set; }
    public DateTime HireDate { get; set; }
}

// 模拟数据
var employees = new List<Employee>
{
    new() { Id = 1, Name = "张三", Department = "技术部", Salary = 15000, HireDate = new DateTime(2020, 3, 1) },
    new() { Id = 2, Name = "李四", Department = "市场部", Salary = 12000, HireDate = new DateTime(2021, 6, 15) },
    new() { Id = 3, Name = "王五", Department = "技术部", Salary = 18000, HireDate = new DateTime(2018, 1, 10) },
    new() { Id = 4, Name = "赵六", Department = "人事部", Salary = 10000, HireDate = new DateTime(2022, 9, 1) },
    new() { Id = 5, Name = "钱七", Department = "市场部", Salary = 14000, HireDate = new DateTime(2019, 11, 20) },
    new() { Id = 6, Name = "孙八", Department = "技术部", Salary = 22000, HireDate = new DateTime(2016, 5, 5) },
};

// 各部门平均薪资
var deptStats = employees
    .GroupBy(e => e.Department)
    .Select(g => new
    {
        Department = g.Key,
        Count = g.Count(),
        AvgSalary = g.Average(e => e.Salary),
        MaxSalary = g.Max(e => e.Salary),
        MinSalary = g.Min(e => e.Salary)
    })
    .OrderByDescending(d => d.AvgSalary);

Console.WriteLine("=== 各部门薪资统计 ===");
foreach (var dept in deptStats)
{
    Console.WriteLine($"{dept.Department}：{dept.Count}人，平均{dept.AvgSalary:C}，" +
                      $"最高{dept.MaxSalary:C}，最低{dept.MinSalary:C}");
}

// 薪资 Top 3
var topEarners = employees
    .OrderByDescending(e => e.Salary)
    .Take(3)
    .Select((e, i) => $"第{i + 1}名：{e.Name} — {e.Salary:C}");

Console.WriteLine("\n=== 薪资 Top 3 ===");
foreach (var item in topEarners)
{
    Console.WriteLine(item);
}

// 工龄分析
var tenureAnalysis = employees
    .Select(e => new
    {
        e.Name,
        e.Department,
        TenureYears = (DateTime.Now - e.HireDate).Days / 365.0
    })
    .OrderByDescending(e => e.TenureYears);

Console.WriteLine("\n=== 工龄分析 ===");
foreach (var emp in tenureAnalysis)
{
    Console.WriteLine($"{emp.Name}（{emp.Department}）— {emp.TenureYears:F1}年");
}

// 复杂筛选：薪资高于部门平均的员工
var aboveAvg = employees
    .GroupBy(e => e.Department)
    .SelectMany(g =>
    {
        var avg = g.Average(e => e.Salary);
        return g.Where(e => e.Salary > avg);
    });

Console.WriteLine("\n=== 薪资高于部门平均 ===");
foreach (var emp in aboveAvg)
{
    Console.WriteLine($"{emp.Name} — {emp.Department} — {emp.Salary:C}");
}
```

### 订单分析

```csharp
var orders = new[]
{
    new { Id = 1, Customer = "张三", Amount = 500, Date = DateTime.Parse("2024-01-05") },
    new { Id = 2, Customer = "李四", Amount = 1200, Date = DateTime.Parse("2024-01-08") },
    new { Id = 3, Customer = "张三", Amount = 300, Date = DateTime.Parse("2024-01-15") },
    new { Id = 4, Customer = "王五", Amount = 2000, Date = DateTime.Parse("2024-02-01") },
    new { Id = 5, Customer = "李四", Amount = 800, Date = DateTime.Parse("2024-02-10") },
    new { Id = 6, Customer = "张三", Amount = 1500, Date = DateTime.Parse("2024-02-20") },
};

// 客户消费统计
var customerStats = orders
    .GroupBy(o => o.Customer)
    .Select(g => new
    {
        Customer = g.Key,
        OrderCount = g.Count(),
        TotalAmount = g.Sum(o => o.Amount),
        AvgAmount = g.Average(o => o.Amount),
        MaxAmount = g.Max(o => o.Amount)
    })
    .OrderByDescending(c => c.TotalAmount);

Console.WriteLine("=== 客户消费统计 ===");
foreach (var c in customerStats)
{
    Console.WriteLine($"{c.Customer}：{c.OrderCount}笔，共计{c.TotalAmount:C}，" +
                      $"平均{c.AvgAmount:C}，最高{c.MaxAmount:C}");
}

// 月度统计
var monthlyStats = orders
    .GroupBy(o => o.Date.ToString("yyyy-MM"))
    .Select(g => new
    {
        Month = g.Key,
        OrderCount = g.Count(),
        TotalAmount = g.Sum(o => o.Amount)
    })
    .OrderBy(m => m.Month);

Console.WriteLine("\n=== 月度统计 ===");
foreach (var m in monthlyStats)
{
    Console.WriteLine($"{m.Month}：{m.OrderCount}笔，共计{m.TotalAmount:C}");
}
```