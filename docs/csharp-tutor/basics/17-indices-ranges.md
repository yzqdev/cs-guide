---
order: 17
---

# 索引与范围

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/proposals/csharp-8.0/ranges)

C# 8+ 引入了 `Index` 和 `Range` 结构体，以及新的 `^` 和 `..` 语法，让数组、字符串、集合的切片操作更加简洁。

## 索引（Index）

### 从末尾开始索引

```csharp
int[] numbers = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

// 传统方式：从开头
Console.WriteLine(numbers[0]); // 0
Console.WriteLine(numbers[9]); // 9

// 新语法：从末尾（^ 运算符，C# 8+）
Console.WriteLine(numbers[^1]); // 9（倒数第一个）
Console.WriteLine(numbers[^2]); // 8（倒数第二个）
Console.WriteLine(numbers[^3]); // 7（倒数第三个）

// ^0 是越界的（对应 length 位置）
// Console.WriteLine(numbers[^0]); // ❌ IndexOutOfRangeException
```

### Index 结构体

```csharp
// 隐式创建 Index
Index last = ^1;         // 从末尾数第1个
Index secondLast = ^2;   // 从末尾数第2个
Index first = 0;         // 从开头数第1个
Index third = 3;         // 从开头数第3个

int[] numbers = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

Console.WriteLine(numbers[last]);       // 9
Console.WriteLine(numbers[secondLast]); // 8
Console.WriteLine(numbers[first]);      // 0
Console.WriteLine(numbers[third]);      // 3

// Index 结构体属性
Console.WriteLine(last.IsFromEnd);  // True（从末尾）
Console.WriteLine(last.Value);      // 1（倒数第1个）
Console.WriteLine(first.IsFromEnd); // False（从开头）
Console.WriteLine(first.Value);     // 0（第0个）
```

## 范围（Range）

### 范围运算符 ..

```csharp
int[] numbers = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

// 切片语法：start..end（包含 start，不包含 end）
int[] slice1 = numbers[2..5];  // 索引 2, 3, 4
Console.WriteLine(string.Join(", ", slice1)); // 2, 3, 4

// 省略开头（从 0 开始）
int[] slice2 = numbers[..3];   // 索引 0, 1, 2
Console.WriteLine(string.Join(", ", slice2)); // 0, 1, 2

// 省略结尾（到末尾）
int[] slice3 = numbers[5..];   // 索引 5, 6, 7, 8, 9
Console.WriteLine(string.Join(", ", slice3)); // 5, 6, 7, 8, 9

// 使用 ^ 索引
int[] slice4 = numbers[^5..^2]; // 倒数第5到倒数第2（不包含倒数第2）
Console.WriteLine(string.Join(", ", slice4)); // 5, 6, 7

// 全部范围
int[] slice5 = numbers[..];    // 整个数组
Console.WriteLine(string.Join(", ", slice5)); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
```

### Range 结构体

```csharp
int[] numbers = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

// 使用 Range 结构体
Range range = 2..7;
int[] slice = numbers[range];
Console.WriteLine(string.Join(", ", slice)); // 2, 3, 4, 5, 6

// Range 属性
Console.WriteLine(range.Start); // 2（Index 结构体）
Console.WriteLine(range.End);   // 7（Index 结构体）
Console.WriteLine(range.Start.IsFromEnd); // False
Console.WriteLine(range.End.IsFromEnd);   // False

// 方法
var (start, end) = range.GetOffsetAndLength(numbers.Length);
Console.WriteLine($"Offset: {start}, Length: {end}"); // Offset: 2, Length: 5
```

## 字符串操作

```csharp
string text = "Hello, World!";

// 传统方式
string sub1 = text.Substring(0, 5);
Console.WriteLine(sub1); // Hello

string sub2 = text.Substring(7);
Console.WriteLine(sub2); // World!

// 使用范围语法
string hello = text[..5];       // Hello
string world = text[7..];       // World!
string helloWorld = text[..];   // Hello, World!
string ow = text[7..^1];       // World（去掉末尾的 !）

Console.WriteLine(hello);      // Hello
Console.WriteLine(world);      // World!
Console.WriteLine(ow);         // World

// 提取邮箱中的用户名和域名
string email = "zhangsan@example.com";
string name = email[..^13];           // zhangsan（去掉 @example.com）
string domain = email[^12..];         // example.com
Console.WriteLine($"用户名：{name}，域名：{domain}");

// 更通用的方式（推荐）
int atIndex = email.IndexOf('@');
string username = email[..atIndex];   // zhangsan
string domainName = email[(atIndex + 1)..]; // example.com
Console.WriteLine($"{username} @ {domainName}");
```

## 数组切片

```csharp
// 一维数组
int[] numbers = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

// 取前3个
int[] first3 = numbers[..3];

// 取后3个
int[] last3 = numbers[^3..];

// 取中间一段
int[] middle = numbers[3..7];

// 取除首尾的中间部分
int[] body = numbers[1..^1];

// 交错数组支持范围
int[][] jagged = {
    new[] { 1, 2, 3 },
    new[] { 4, 5, 6, 7 },
    new[] { 8, 9 }
};
int[] slice = jagged[0][..2]; // { 1, 2 }
```

## 集合支持

### List\<T\>

List\<T\> 从 .NET 6 / C# 8 开始支持范围语法（需要 `System.Index` 和 `System.Range` 支持）。

```csharp
List<int> numbers = new() { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

// 范围切片返回 List<T>
List<int> slice1 = numbers[2..5];
Console.WriteLine(string.Join(", ", slice1)); // 2, 3, 4

List<int> last3 = numbers[^3..];
Console.WriteLine(string.Join(", ", last3)); // 7, 8, 9

List<int> body = numbers[1..^1];
Console.WriteLine(string.Join(", ", body)); // 1, 2, 3, 4, 5, 6, 7, 8

// 使用 Index 索引（返回元素，不是切片）
int last = numbers[^1];
Console.WriteLine(last); // 9
```

### 数组与 List 切片对比

```csharp
// 数组切片返回新数组（拷贝）
int[] arr = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
int[] arrSlice = arr[2..5];
arrSlice[0] = 999; // 修改切片不影响原数组
Console.WriteLine(arr[2]); // 2（不变）

// List 切片返回新 List（拷贝）
List<int> list = new() { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
List<int> listSlice = list[2..5];
listSlice[0] = 999; // 修改切片不影响原 List
Console.WriteLine(list[2]); // 2（不变）
```

## 自定义类型支持索引和范围

### 实现索引支持

```csharp
class MyCollection
{
    private int[] _data = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };

    // 支持 int 索引
    public int this[int index] => _data[index];

    // 支持 Index 索引（C# 8+）
    public int this[Index index] => _data[index];

    // 支持 Range 切片
    public int[] this[Range range] => _data[range];

    public int Length => _data.Length;
}

// 使用
var collection = new MyCollection();
Console.WriteLine(collection[0]);       // 10
Console.WriteLine(collection[^1]);      // 100
int[] mid = collection[3..7];
Console.WriteLine(string.Join(", ", mid)); // 40, 50, 60, 70
```

### Span\<T\> 和 Memory\<T\>

```csharp
// Span<T> 支持范围语法，且不分配新内存
int[] numbers = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

Span<int> all = numbers.AsSpan();
Span<int> slice = all[2..5];  // 指向原数组的一部分，无拷贝

slice[0] = 999; // 修改会反映到原数组
Console.WriteLine(numbers[2]); // 999

// 只读 Span
ReadOnlySpan<int> readOnly = numbers.AsSpan()[2..5];

// Memory<T>
Memory<int> memory = numbers.AsMemory();
Memory<int> memSlice = memory[2..5];
```

## 实际案例

### 分页功能

```csharp
static List<T> GetPage<T>(List<T> source, int pageNumber, int pageSize = 10)
{
    if (source == null || source.Count == 0)
        return new List<T>();

    int start = (pageNumber - 1) * pageSize;
    int end = Math.Min(start + pageSize, source.Count);

    if (start >= source.Count)
        return new List<T>();

    return source[start..end];
}

// 使用
var data = Enumerable.Range(1, 25).ToList();
var page1 = GetPage(data, 1, 10); // 1~10
var page2 = GetPage(data, 2, 10); // 11~20
var page3 = GetPage(data, 3, 10); // 21~25

Console.WriteLine($"第1页：{string.Join(", ", page1)}");
Console.WriteLine($"第2页：{string.Join(", ", page2)}");
Console.WriteLine($"第3页：{string.Join(", ", page3)}");
```

### 文件路径处理

```csharp
static string GetFileName(string path)
{
    // 获取最后一个 / 或 \ 之后的部分
    int lastSlash = path.LastIndexOfAny(new[] { '/', '\\' });
    return path[(lastSlash + 1)..];
}

static string GetExtension(string path)
{
    int lastDot = path.LastIndexOf('.');
    return lastDot >= 0 ? path[lastDot..] : "";
}

static string GetFileNameWithoutExtension(string path)
{
    string fileName = GetFileName(path);
    int lastDot = fileName.LastIndexOf('.');
    return lastDot >= 0 ? fileName[..lastDot] : fileName;
}

// 使用
string path = "C:/Users/张三/Documents/report.pdf";
Console.WriteLine(GetFileName(path));                // report.pdf
Console.WriteLine(GetExtension(path));              // .pdf
Console.WriteLine(GetFileNameWithoutExtension(path)); // report
```

### 数据批处理

```csharp
static List<List<T>> Batch<T>(List<T> source, int batchSize)
{
    var batches = new List<List<T>>();
    for (int i = 0; i < source.Count; i += batchSize)
    {
        int end = Math.Min(i + batchSize, source.Count);
        batches.Add(source[i..end]);
    }
    return batches;
}

// 使用
var items = Enumerable.Range(1, 20).ToList();
var batches = Batch(items, 6);

foreach (var (batch, index) in batches.Select((b, i) => (b, i)))
{
    Console.WriteLine($"批次 {index + 1}：{string.Join(", ", batch)}");
}
// 输出：
// 批次 1：1, 2, 3, 4, 5, 6
// 批次 2：7, 8, 9, 10, 11, 12
// 批次 3：13, 14, 15, 16, 17, 18
// 批次 4：19, 20
```

### 字符串脱敏

```csharp
static string MaskEmail(string email)
{
    int atIndex = email.IndexOf('@');
    if (atIndex <= 1) return email;

    // 保留第一个字符，中间用 *** 替代，显示 @ 后的部分
    string prefix = email[..1];
    string suffix = email[atIndex..];
    return $"{prefix}***{suffix}";
}

static string MaskPhone(string phone)
{
    // 手机号：显示前3后4，中间4位用 **** 替代
    if (phone.Length != 11) return phone;
    return $"{phone[..3]}****{phone[^4..]}";
}

static string MaskString(string input, int keepStart = 1, int keepEnd = 1)
{
    if (input.Length <= keepStart + keepEnd) return input;
    return $"{input[..keepStart]}{new string('*', input.Length - keepStart - keepEnd)}{input[^keepEnd..]}";
}

// 使用
Console.WriteLine(MaskEmail("zhangsan@example.com")); // z***@example.com
Console.WriteLine(MaskPhone("13812345678"));           // 138****5678
Console.WriteLine(MaskString("身份证号1234567890"));    // 身***********0
```