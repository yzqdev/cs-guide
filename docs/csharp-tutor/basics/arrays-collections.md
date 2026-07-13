# 数组与集合

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/arrays)

## 数组

数组是存储固定大小、相同类型元素的集合。

### 一维数组

```csharp
// 声明方式
int[] arr1 = new int[5];            // 创建长度为5的数组，默认值 0
int[] arr2 = new int[] { 1, 2, 3 }; // 声明并初始化
int[] arr3 = { 1, 2, 3, 4, 5 };     // 简化语法
string[] names = { "Alice", "Bob", "Charlie" };

// 访问和修改
int[] numbers = { 10, 20, 30, 40, 50 };
Console.WriteLine(numbers[0]);  // 10
Console.WriteLine(numbers[^1]); // 50（C# 8+ 索引从末尾）
numbers[2] = 99;               // 修改
Console.WriteLine(numbers[2]); // 99

// 获取长度
Console.WriteLine(numbers.Length);  // 5

// 遍历数组
for (int i = 0; i < numbers.Length; i++)
{
    Console.Write($"{numbers[i]} ");
}
// 输出：10 20 99 40 50

// foreach 遍历
foreach (int num in numbers)
{
    Console.Write($"{num} ");
}
```

### 多维数组

```csharp
// 二维数组
int[,] matrix = new int[3, 4]; // 3行4列

// 声明并初始化
int[,] grid =
{
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

Console.WriteLine(grid[1, 1]); // 5（第2行第2列）
Console.WriteLine(grid.Rank);  // 2（维数）
Console.WriteLine(grid.GetLength(0)); // 3（行数）
Console.WriteLine(grid.GetLength(1)); // 3（列数）

// 遍历二维数组
for (int i = 0; i < grid.GetLength(0); i++)
{
    for (int j = 0; j < grid.GetLength(1); j++)
    {
        Console.Write($"{grid[i, j]} ");
    }
    Console.WriteLine();
}
// 输出：
// 1 2 3
// 4 5 6
// 7 8 9
```

### 交错数组（数组的数组）

```csharp
// 交错数组中的每个子数组长度可以不同
int[][] jagged = new int[3][];
jagged[0] = new int[] { 1, 2 };
jagged[1] = new int[] { 3, 4, 5 };
jagged[2] = new int[] { 6, 7, 8, 9 };

// 访问
Console.WriteLine(jagged[0][1]); // 2
Console.WriteLine(jagged[2][3]); // 9

// 遍历
for (int i = 0; i < jagged.Length; i++)
{
    for (int j = 0; j < jagged[i].Length; j++)
    {
        Console.Write($"{jagged[i][j]} ");
    }
    Console.WriteLine();
}
```

### 数组常用方法

```csharp
int[] nums = { 5, 3, 8, 1, 9, 2 };

// 排序
Array.Sort(nums);
Console.WriteLine(string.Join(", ", nums)); // 1, 2, 3, 5, 8, 9

// 反转
Array.Reverse(nums);
Console.WriteLine(string.Join(", ", nums)); // 9, 8, 5, 3, 2, 1

// 查找
int index = Array.IndexOf(nums, 5);
Console.WriteLine($"5 的位置：{index}"); // 2

// 是否包含
bool hasNumber = Array.Exists(nums, x => x > 10);
Console.WriteLine($"是否有大于10的数：{hasNumber}"); // False

// 查找所有符合条件的元素
int[] evens = Array.FindAll(nums, x => x % 2 == 0);
Console.WriteLine($"偶数：{string.Join(", ", evens)}"); // 8, 2

// 复制
int[] copy = new int[3];
Array.Copy(nums, 1, copy, 0, 3);
Console.WriteLine($"复制结果：{string.Join(", ", copy)}");

// 清空
Array.Clear(nums, 0, 2);
Console.WriteLine($"清空后：{string.Join(", ", nums)}"); // 0, 0, 5, 3, 2, 1

// 转换（非泛型）
int[] numbers = { 1, 2, 3 };
string[] strArray = Array.ConvertAll(numbers, x => x.ToString());
```

## 集合（System.Collections.Generic）

### List\<T\> — 动态数组

```csharp
// 创建
List<int> numbers = new List<int>();
List<string> fruits = new List<string> { "苹果", "香蕉", "橘子" };

// 添加元素
numbers.Add(1);
numbers.Add(2);
numbers.Add(3);
fruits.Add("葡萄");

// 插入元素
numbers.Insert(0, 0); // 在索引0处插入0
fruits.Insert(1, "草莓"); // 在索引1处插入"草莓"

// 访问元素
Console.WriteLine(fruits[0]);     // 苹果
Console.WriteLine(numbers[^1]);   // 3

// 删除元素
numbers.Remove(2);         // 删除值为2的元素
numbers.RemoveAt(0);       // 删除索引0处的元素
fruits.RemoveRange(1, 2);  // 从索引1开始删2个

// 查找
List<int> nums = new List<int> { 10, 20, 30, 20, 40 };
Console.WriteLine(nums.Contains(20));   // True
Console.WriteLine(nums.IndexOf(20));    // 1
Console.WriteLine(nums.LastIndexOf(20));// 3

// 排序与反转
nums.Sort();
nums.Reverse();

// 转换数组
int[] arr = nums.ToArray();

// 遍历
foreach (int num in nums)
{
    Console.Write($"{num} ");
}

// List 高级操作
List<int> list = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// 查找所有偶数
List<int> evens = list.FindAll(x => x % 2 == 0);
Console.WriteLine($"偶数：{string.Join(", ", evens)}");

// 映射
List<string> mapped = list.ConvertAll(x => $"数字 {x}");

// 筛选 + 转换（使用 LINQ）
var result = list
    .Where(x => x > 5)
    .Select(x => x * x)
    .ToList();
Console.WriteLine($"大于5的平方：{string.Join(", ", result)}");
```

### Dictionary\<TKey, TValue\> — 字典（键值对）

```csharp
// 创建
Dictionary<string, int> scores = new Dictionary<string, int>();

// 添加元素
scores["张三"] = 90;
scores["李四"] = 85;
scores["王五"] = 78;

// 或者使用 Add 方法（键不能重复）
scores.Add("赵六", 92);

// 访问
Console.WriteLine(scores["张三"]); // 90

// 安全访问
if (scores.TryGetValue("小明", out int score))
{
    Console.WriteLine($"小明的成绩：{score}");
}
else
{
    Console.WriteLine("找不到小明");
}

// 检查键是否存在
if (scores.ContainsKey("李四"))
{
    Console.WriteLine("李四存在");
}

// 修改
scores["张三"] = 95;

// 删除
scores.Remove("王五");

// 遍历
foreach (KeyValuePair<string, int> pair in scores)
{
    Console.WriteLine($"{pair.Key}：{pair.Value}分");
}

// 只遍历键
foreach (string name in scores.Keys)
{
    Console.WriteLine(name);
}

// 只遍历值
foreach (int s in scores.Values)
{
    Console.WriteLine(s);
}

// 字典的其他方式创建
var dict1 = new Dictionary<int, string>
{
    { 1, "一" },
    { 2, "二" },
    { 3, "三" }
};

var dict2 = new Dictionary<int, string>
{
    [1] = "一",
    [2] = "二",
    [3] = "三"
};
```

### HashSet\<T\> — 哈希集合（不重复元素）

```csharp
// 创建
HashSet<int> set = new HashSet<int> { 1, 2, 3, 3, 2, 1 };
Console.WriteLine(string.Join(", ", set)); // 1, 2, 3（重复被自动剔除）

// 添加
set.Add(4);
set.Add(1);  // 已存在，不会添加

// 删除
set.Remove(2);

// 集合运算
HashSet<int> a = new HashSet<int> { 1, 2, 3, 4 };
HashSet<int> b = new HashSet<int> { 3, 4, 5, 6 };

// 交集
a.IntersectWith(b);     // a = { 3, 4 }
Console.WriteLine($"交集：{string.Join(", ", a)}");

// 并集
a.UnionWith(b);         // a = { 1, 2, 3, 4, 5, 6 }
Console.WriteLine($"并集：{string.Join(", ", a)}");

// 差集
a.ExceptWith(b);        // a = { 1, 2 }
Console.WriteLine($"差集：{string.Join(", ", a)}");

// 检查
bool isSubset = a.IsSubsetOf(b);
bool isSuperset = a.IsSupersetOf(b);
bool overlaps = a.Overlaps(b);
```

### Queue\<T\> — 队列（先进先出 FIFO）

```csharp
// 创建
Queue<string> queue = new Queue<string>();

// 入队
queue.Enqueue("任务1");
queue.Enqueue("任务2");
queue.Enqueue("任务3");

// 查看队首元素（不移除）
Console.WriteLine(queue.Peek()); // 任务1

// 出队
string task = queue.Dequeue();
Console.WriteLine($"执行：{task}"); // 执行：任务1

Console.WriteLine($"队列剩余：{queue.Count}"); // 2

// 遍历（不会移除元素）
foreach (string item in queue)
{
    Console.WriteLine(item);
}
```

### Stack\<T\> — 栈（后进先出 LIFO）

```csharp
// 创建
Stack<string> stack = new Stack<string>();

// 压栈
stack.Push("第一页");
stack.Push("第二页");
stack.Push("第三页");

// 查看栈顶元素
Console.WriteLine(stack.Peek()); // 第三页

// 出栈
string page = stack.Pop();
Console.WriteLine($"返回：{page}"); // 返回：第三页

Console.WriteLine($"栈剩余：{stack.Count}"); // 2

// 遍历
foreach (string item in stack)
{
    Console.WriteLine(item);
}
```

### LinkedList\<T\> — 链表

```csharp
// 创建
LinkedList<string> list = new LinkedList<string>();

// 添加节点
list.AddFirst("头节点");
list.AddLast("尾节点");
list.AddAfter(list.First, "第二个节点");
list.AddBefore(list.Last, "倒数第二个节点");

// 遍历
foreach (string item in list)
{
    Console.Write($"{item} → ");
}
// 输出：头节点 → 第二个节点 → 倒数第二个节点 → 尾节点 →
```

## 实际案例

### 学生成绩管理系统

```csharp
class StudentGradeManager
{
    private Dictionary<string, List<int>> _grades = new();

    // 添加学生成绩
    public void AddGrade(string name, int score)
    {
        if (!_grades.ContainsKey(name))
        {
            _grades[name] = new List<int>();
        }
        _grades[name].Add(score);
        Console.WriteLine($"已记录 {name} 的成绩：{score}");
    }

    // 计算学生平均分
    public double GetAverage(string name)
    {
        if (_grades.TryGetValue(name, out List<int> scores))
        {
            return scores.Average();
        }
        return 0;
    }

    // 获取全班排名
    public void PrintRanking()
    {
        var ranking = _grades
            .Select(g => new
            {
                Name = g.Key,
                Average = g.Value.Average()
            })
            .OrderByDescending(s => s.Average)
            .ToList();

        Console.WriteLine("\n=== 成绩排名 ===");
        for (int i = 0; i < ranking.Count; i++)
        {
            Console.WriteLine($"第{i + 1}名：{ranking[i].Name} - {ranking[i].Average:F1}分");
        }
    }
}

// 使用
var manager = new StudentGradeManager();
manager.AddGrade("张三", 85);
manager.AddGrade("张三", 90);
manager.AddGrade("李四", 78);
manager.AddGrade("李四", 92);
manager.AddGrade("王五", 88);
manager.AddGrade("王五", 76);

Console.WriteLine($"张三平均分：{manager.GetAverage("张三"):F1}");
manager.PrintRanking();
```

### 统计字符串中字符出现次数

```csharp
static Dictionary<char, int> CountCharacters(string text)
{
    Dictionary<char, int> counts = new();

    foreach (char c in text)
    {
        if (counts.ContainsKey(c))
            counts[c]++;
        else
            counts[c] = 1;
    }

    return counts;
}

// 使用
string text = "hello world";
var result = CountCharacters(text);

foreach (var pair in result)
{
    Console.WriteLine($"'{pair.Key}'：{pair.Value}次");
}
// 输出：
// 'h'：1次
// 'e'：1次
// 'l'：3次
// 'o'：2次
// ' '：1次
// 'w'：1次
// 'r'：1次
// 'd'：1次
```