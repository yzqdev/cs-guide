---
order: 6
---

# 字符串

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/strings/)

## 字符串基础

### 字符串不可变性

字符串是引用类型，但**不可变（immutable）**——任何修改操作都会返回新字符串，原字符串不变。

```csharp
string s = "Hello";
string t = s.ToUpper();

Console.WriteLine(s); // Hello（原字符串不变）
Console.WriteLine(t); // HELLO（返回新字符串）

// 修改字符串实际是创建新对象
string a = "abc";
string b = a;       // b 引用同一个字符串
a = "xyz";          // a 指向新字符串，"abc" 仍存在
Console.WriteLine(b); // abc
```

### 字符串创建方式

```csharp
// 直接赋值
string s1 = "Hello, World!";

// 使用构造函数
char[] chars = { 'H', 'e', 'l', 'l', 'o' };
string s2 = new string(chars);       // Hello
string s3 = new string('A', 5);      // AAAAA（重复字符）
string s4 = new string(chars, 1, 3); // ell（子数组）

// 字符串数组
string[] names = { "张三", "李四", "王五" };

// 逐字字符串（verbatim string，@ 前缀）
string path = @"C:\Users\张三\Documents";   // 不需要转义反斜杠
string multiLine = @"第一行
第二行
第三行"; // 可以跨行，包含换行符

// 原始字符串（raw string，C# 11+，三个引号）
string json = """
{
    "name": "张三",
    "age": 25
}
""";

// 原始字符串插值（C# 11+）
string name = "张三";
int age = 25;
string json2 = $$"""
{
    "name": "{{name}}",
    "age": {{age}}
}
""";
Console.WriteLine(json2);
```

## 字符串插值

使用 `$` 前缀将表达式嵌入字符串。

```csharp
string name = "张三";
int age = 25;
double salary = 12345.6789;

// 基本插值
Console.WriteLine($"我叫{name}，今年{age}岁。");

// 表达式
Console.WriteLine($"明年我{age + 1}岁。");

// 格式化
Console.WriteLine($"我的工资是{salary:C}");       // 货币：¥12,345.68
Console.WriteLine($"圆周率：{Math.PI:F4}");        // 保留4位小数：3.1416
Console.WriteLine($"百分比：{0.85:P2}");           // 百分比：85.00%
Console.WriteLine($"十六进制：{255:X}");            // 十六进制：FF

// 对齐
Console.WriteLine($"|{"姓名",-10}|{"年龄",5}|");   // 左对齐 -10，右对齐 5
Console.WriteLine($"|{"张三",-10}|{25,5}|");
// 输出：
// |姓名       |   年龄|
// |张三       |   25|

// 条件表达式（需加括号）
Console.WriteLine($"状态：{age >= 18 ? "成年" : "未成年"}");

// 多层 $（逐字字符串 + 插值）
string path = $"C:\\Users\\{name}\\Documents";   // 需转义
string path2 = $@"C:\Users\{name}\Documents";    // @ 前缀，不需要转义
```

## 常用方法

### 查找与判断

```csharp
string text = "Hello, World! Welcome to C#.";

// 是否包含
Console.WriteLine(text.Contains("World"));    // True
Console.WriteLine(text.StartsWith("Hello"));  // True
Console.WriteLine(text.EndsWith("C#"));       // False（后面还有句点）

// 查找位置
Console.WriteLine(text.IndexOf("World"));     // 7
Console.WriteLine(text.IndexOf("Java"));      // -1（未找到）
Console.WriteLine(text.LastIndexOf("o"));     // 8（最后一个 o 的位置）

// 索引从末尾（C# 8+）
Console.WriteLine(text[^1]);  // .（最后一个字符）
Console.WriteLine(text[^3]);  // C
```

### 提取与截取

```csharp
string text = "Hello, World!";

// Substring
Console.WriteLine(text.Substring(7));     // World!（从索引7到末尾）
Console.WriteLine(text.Substring(0, 5));  // Hello（从0开始取5个）

// 范围语法（C# 8+）
Console.WriteLine(text[..5]);             // Hello
Console.WriteLine(text[7..]);             // World!
Console.WriteLine(text[^6..^1]);          // World

// Split
string csv = "苹果,香蕉,橘子,葡萄";
string[] fruits = csv.Split(',');
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}

// Split 多个分隔符
string sentence = "Hello, World! Welcome to C#.";
string[] words = sentence.Split(new[] { ' ', ',', '!', '.' },
    StringSplitOptions.RemoveEmptyEntries);
Console.WriteLine(string.Join(" | ", words)); // Hello | World | Welcome | to | C#
```

### 修改与转换

```csharp
string text = "  Hello, World!  ";

// 大小写
Console.WriteLine(text.ToUpper());   //   HELLO, WORLD!
Console.WriteLine(text.ToLower());   //   hello, world!

// 去除空白
Console.WriteLine(text.Trim());      // Hello, World!
Console.WriteLine(text.TrimStart()); // Hello, World!  
Console.WriteLine(text.TrimEnd());   //   Hello, World!

// 替换
Console.WriteLine(text.Replace("World", "C#")); //   Hello, C#!
Console.WriteLine("a,b,c,d".Replace(",", "→")); // a→b→c→d

// 插入与移除
Console.WriteLine("Hello".Insert(5, ", World")); // Hello, World
Console.WriteLine("Hello, World!".Remove(5));     // Hello
Console.WriteLine("Hello, World!".Remove(5, 7));  // Hello!

// 填充
Console.WriteLine("123".PadLeft(5));    // "  123"
Console.WriteLine("123".PadRight(5));   // "123  "
Console.WriteLine("123".PadLeft(5, '0')); // "00123"

// 反转
string reversed = new string("Hello".Reverse().ToArray());
Console.WriteLine(reversed); // olleH
```

### 拼接

```csharp
// + 运算符
string fullName = "张" + "三";

// Concat
string s = string.Concat("Hello", " ", "World");

// Join（最常用）
string[] parts = { "2024", "01", "15" };
string date = string.Join("-", parts);        // 2024-01-15
string list = string.Join(", ", parts);       // 2024, 01, 15

// 带前缀后缀的拼接（.NET 8+）
string result = string.Join(',', parts, 1, 2); // 子数组拼接：01,15

// 重复
string line = new string('-', 20);            // --------------------
Console.WriteLine(string.Concat(Enumerable.Repeat("=-", 5))); // =--=--=--=--=--=-
```

### 字符串比较

```csharp
string a = "hello";
string b = "Hello";

// 默认区分大小写
Console.WriteLine(a == b);              // False
Console.WriteLine(a.Equals(b));         // False

// 忽略大小写
Console.WriteLine(a.Equals(b, StringComparison.OrdinalIgnoreCase)); // True

// 排序比较
Console.WriteLine(string.Compare("A", "B"));           // -1（A < B）
Console.WriteLine(string.Compare("B", "A"));           // 1（B > A）
Console.WriteLine(string.Compare("A", "A"));            // 0（相等）

// 推荐使用 ordinal 比较（性能好）
bool equal = string.Equals("hello", "HELLO",
    StringComparison.OrdinalIgnoreCase);
Console.WriteLine(equal); // True

// 文化相关比较
int result = string.Compare("straße", "strasse",
    StringComparison.CurrentCulture);
Console.WriteLine(result); // 在德语文化下可能为 0
```

## 字符串与字符数组

```csharp
string text = "Hello";

// 字符串 → char 数组
char[] chars = text.ToCharArray();
chars[0] = 'h';                    // 修改数组
string modified = new string(chars);
Console.WriteLine(modified);       // hello

// 遍历字符
foreach (char c in text)
{
    Console.Write($"{c} ");        // H e l l o
}

// 按索引访问（只读）
Console.WriteLine(text[0]);        // H
Console.WriteLine(text[^1]);       // o

// 字符判断
char ch = '5';
Console.WriteLine(char.IsDigit(ch));    // True
Console.WriteLine(char.IsLetter('A'));  // True
Console.WriteLine(char.IsWhiteSpace(' ')); // True
Console.WriteLine(char.IsUpper('A'));   // True
Console.WriteLine(char.IsLower('a'));   // True
Console.WriteLine(char.IsLetterOrDigit('1')); // True
```

## StringBuilder — 高效字符串拼接

字符串不可变，频繁拼接会创建大量临时对象，用 `StringBuilder` 解决。

```csharp
using System.Text;

// 创建
StringBuilder sb = new StringBuilder();

// 追加
sb.Append("Hello");
sb.Append(", ");
sb.Append("World");
sb.Append('!', 3);      // 追加 3 个 !
Console.WriteLine(sb.ToString()); // Hello, World!!!

// 链式调用
StringBuilder sb2 = new StringBuilder()
    .Append("Hello")
    .AppendLine(", World") // 追加并换行
    .Append("Welcome to C#");
Console.WriteLine(sb2.ToString());

// 插入、替换、移除
sb2.Insert(0, ">> ");
sb2.Replace("World", "C#");
sb2.Remove(0, 3);
Console.WriteLine(sb2.ToString());

// 容量管理
StringBuilder sb3 = new StringBuilder(100); // 初始容量 100
Console.WriteLine($"容量：{sb3.Capacity}，长度：{sb3.Length}");

// 性能对比
static string BuildStringBad(int count)
{
    string result = "";
    for (int i = 0; i < count; i++)
    {
        result += i.ToString(); // ❌ 每次创建新字符串，O(n²)
    }
    return result;
}

static string BuildStringGood(int count)
{
    StringBuilder sb = new StringBuilder(count * 3);
    for (int i = 0; i < count; i++)
    {
        sb.Append(i); // ✅ 高效，O(n)
    }
    return sb.ToString();
}

// 对比测试（count = 10000 时，StringBuilder 快 1000 倍以上）
// Console.WriteLine(BuildStringBad(10000));  // 很慢
// Console.WriteLine(BuildStringGood(10000)); // 很快
```

## 字符串格式化

### 复合格式化

```csharp
// string.Format
string msg = string.Format("我叫{0}，今年{1}岁。", "张三", 25);
Console.WriteLine(msg);

// 占位符顺序可以改变
string msg2 = string.Format("{1}，你好！我是{0}。", "老师", "同学们");
Console.WriteLine(msg2);

// 格式化数值
Console.WriteLine(string.Format("小数：{0:F2}", Math.PI));       // 3.14
Console.WriteLine(string.Format("货币：{0:C}", 99.9));           // ¥99.90
Console.WriteLine(string.Format("百分比：{0:P1}", 0.856));       // 85.6%
Console.WriteLine(string.Format("科学计数：{0:E2}", 12345));     // 1.23E+004
Console.WriteLine(string.Format("十六进制：{0:X}", 255));         // FF
Console.WriteLine(string.Format("千分位：{0:N0}", 1234567));      // 1,234,567
```

### 自定义数值格式

```csharp
int number = 12345;
double pi = 3.1415926;

// 自定义格式
Console.WriteLine(number.ToString("000000")); // 012345（补零）
Console.WriteLine(number.ToString("#####"));  // 12345
Console.WriteLine(pi.ToString("0.00"));       // 3.14
Console.WriteLine(pi.ToString("0.0000"));     // 3.1416

// 日期格式
DateTime now = DateTime.Now;
Console.WriteLine(now.ToString("yyyy-MM-dd"));          // 2024-01-15
Console.WriteLine(now.ToString("yyyy年MM月dd日 HH:mm")); // 2024年01月15日 14:30
Console.WriteLine(now.ToString("ddd"));                  // 周一（缩写星期）
Console.WriteLine(now.ToString("MMMM"));                 // 一月（完整月份）
```

## 逐字字符串与转义

```csharp
// 普通字符串需要转义
string path1 = "C:\\Users\\张三\\Documents\\file.txt";
string quote1 = "他说：\"你好！\"";
string newline1 = "第一行\n第二行";

// 逐字字符串 @ 前缀，不需要转义
string path2 = @"C:\Users\张三\Documents\file.txt";
string quote2 = @"他说：""你好！"""; // 双引号需要两个 ""
string multi = @"第一行
第二行
第三行";

// 原始字符串（C# 11+，三个引号，完全不需要转义）
string raw = """"
路径：C:\Users\张三\Documents
引号：他说"你好！"
换行：直接写即可
"""";

Console.WriteLine(raw);
```

## 实际案例

### 邮箱脱敏

```csharp
static string MaskEmail(string email)
{
    int atIndex = email.IndexOf('@');
    if (atIndex <= 1) return email;

    string prefix = email[..1];     // 第一个字符
    string suffix = email[atIndex..]; // @xxx.com
    return $"{prefix}***{suffix}";
}

// 使用
Console.WriteLine(MaskEmail("zhangsan@example.com")); // z***@example.com
Console.WriteLine(MaskEmail("a@b.com"));               // a@b.com（太短，不脱敏）
```

### 手机号脱敏

```csharp
static string MaskPhone(string phone)
{
    if (phone.Length != 11) return phone;
    return $"{phone[..3]}****{phone[^4..]}";
}

Console.WriteLine(MaskPhone("13812345678")); // 138****5678
```

### CSV 解析

```csharp
static List<string[]> ParseCsv(string csv, char delimiter = ',')
{
    var rows = new List<string[]>();
    foreach (string line in csv.Split('\n', StringSplitOptions.RemoveEmptyEntries))
    {
        string[] fields = line.Split(delimiter);
        // 去除每个字段首尾空格
        for (int i = 0; i < fields.Length; i++)
        {
            fields[i] = fields[i].Trim().Trim('"');
        }
        rows.Add(fields);
    }
    return rows;
}

// 使用
string csvData = """
Name,Age,City
"张三",25,北京
"李四",30,上海
""";

var data = ParseCsv(csvData);
foreach (var row in data)
{
    Console.WriteLine(string.Join(" | ", row));
}
// 输出：
// Name | Age | City
// 张三 | 25 | 北京
// 李四 | 30 | 上海
```

### URL 参数解析

```csharp
static Dictionary<string, string> ParseQueryString(string queryString)
{
    var parameters = new Dictionary<string, string>();
    if (string.IsNullOrEmpty(queryString)) return parameters;

    // 去掉开头的 ?
    string query = queryString.StartsWith('?') ? queryString[1..] : queryString;

    foreach (string pair in query.Split('&', StringSplitOptions.RemoveEmptyEntries))
    {
        string[] parts = pair.Split('=', 2);
        if (parts.Length == 2)
        {
            string key = Uri.UnescapeDataString(parts[0]);
            string value = Uri.UnescapeDataString(parts[1]);
            parameters[key] = value;
        }
    }
    return parameters;
}

// 使用
string url = "?name=张三&age=25&city=北京";
var params = ParseQueryString(url);
foreach (var kvp in params)
{
    Console.WriteLine($"{kvp.Key} = {kvp.Value}");
}
// 输出：
// name = 张三
// age = 25
// city = 北京
```

### 检查回文字符串

```csharp
static bool IsPalindrome(string str)
{
    if (string.IsNullOrEmpty(str)) return false;

    // 移除非字母数字字符，转为小写
    string cleaned = new string(str
        .Where(char.IsLetterOrDigit)
        .Select(char.ToLower)
        .ToArray());

    // 双指针比较
    int left = 0, right = cleaned.Length - 1;
    while (left < right)
    {
        if (cleaned[left] != cleaned[right])
            return false;
        left++;
        right--;
    }
    return true;
}

// 使用
string[] tests = { "racecar", "A man, a plan, a canal: Panama", "Hello" };
foreach (string test in tests)
{
    Console.WriteLine($"\"{test}\" → {IsPalindrome(test)}");
}
// 输出：
// "racecar" → True
// "A man, a plan, a canal: Panama" → True
// "Hello" → False
```

### 生成随机字符串

```csharp
static string GenerateRandomString(int length, bool useNumbers = true, bool useSpecial = false)
{
    const string letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const string numbers = "0123456789";
    const string special = "!@#$%^&*()-_=+";

    string chars = letters;
    if (useNumbers) chars += numbers;
    if (useSpecial) chars += special;

    Random random = new Random();
    return new string(Enumerable.Range(0, length)
        .Select(_ => chars[random.Next(chars.Length)])
        .ToArray());
}

Console.WriteLine(GenerateRandomString(8));           // 随机8位字母数字
Console.WriteLine(GenerateRandomString(16, true, true)); // 16位含特殊字符
```