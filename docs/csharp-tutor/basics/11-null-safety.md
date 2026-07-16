---
order: 11
---

# 空值安全处理

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/null-conditional-operators)

C# 提供了多个运算符来处理 null，避免 `NullReferenceException`，让代码更简洁安全。

## null 条件运算符 ?.

### 基本用法

```csharp
// 传统写法
string? name = GetName();
int length;
if (name != null)
    length = name.Length;
else
    length = 0;

// 语法糖：?. 运算符
int? length = name?.Length;

// 链式调用
string? city = person?.Address?.City;
// 如果 person 为 null → 返回 null
// 如果 person.Address 为 null → 返回 null
// 否则返回 person.Address.City
```

### 事件调用

```csharp
// 传统写法：需要检查 null
EventHandler handler = OnClick;
if (handler != null)
    handler(sender, args);

// 语法糖写法：?.Invoke()
OnClick?.Invoke(sender, args);

// 多个事件
OnClick?.Invoke(sender, args);
OnKeyDown?.Invoke(sender, args);
```

### 索引器访问

```csharp
List<int>? numbers = GetNumbers();
int? first = numbers?[0]; // 如果 numbers 为 null，返回 null

Dictionary<string, int>? dict = GetDict();
int? value = dict?["key"];

// 注意：?. 和 [] 结合时，[] 也在 ?. 的作用范围内
```

## null 合并运算符 ??

### 基本用法

```csharp
string? name = null;

// 传统写法
string displayName = name != null ? name : "匿名用户";

// 语法糖写法
string displayName = name ?? "匿名用户";

// 链式合并
string? a = null, b = null, c = "Hello";
string result = a ?? b ?? c ?? "默认值";
Console.WriteLine(result); // Hello
```

### 与 ?. 配合使用

```csharp
// ?. 和 ?? 组合是最常见的模式
string city = person?.Address?.City ?? "未知城市";

// 等价于：
if (person != null && person.Address != null && person.Address.City != null)
    city = person.Address.City;
else
    city = "未知城市";

// 实际案例
decimal totalPrice = order?.Items?.Sum(i => i.Price) ?? 0;
```

## null 合并赋值 ??=

C# 8+ 引入，如果变量为 null 则赋值，否则保持不变。

```csharp
// 传统写法
if (cache == null)
    cache = LoadData();

// 语法糖写法
cache ??= LoadData();

// 链式使用
list ??= new List<int>();
list ??= new(); // C# 9+ 目标类型 new

// 实际案例
public class CacheService
{
    private List<string>? _items;

    public List<string> GetItems()
    {
        // 懒加载：首次访问时初始化
        _items ??= LoadFromDatabase();
        return _items;
    }

    private List<string> LoadFromDatabase()
    {
        Console.WriteLine("从数据库加载数据...");
        return new List<string> { "数据1", "数据2", "数据3" };
    }
}

// 使用
var cache = new CacheService();
var items1 = cache.GetItems(); // 输出：从数据库加载数据...
var items2 = cache.GetItems(); // 不再输出，使用缓存
```

## null 包容运算符 !

C# 8+ 可空引用类型上下文中使用，告诉编译器这个值不会为 null。

```csharp
#nullable enable

string? nullableString = GetString();

// ! 告诉编译器：我知道它是 null，但不用警告
int length = nullableString!.Length;

// 实际案例：属性延迟初始化
public class Person
{
    public string Name { get; set; }

    public Person()
    {
        // 编译器会警告 Name 未初始化
        // 如果确定构造函数外会初始化，可以用 !
        Name = null!;
    }

    public void Initialize(string name)
    {
        Name = name;
    }
}

// 测试中的断言
var result = GetNullableResult();
Assert.IsNotNull(result);   // 断言
var processed = result!.Data; // 编译器知道 result 不为 null

#nullable disable
```

## 可空引用类型

C# 8+ 引入，帮助在编译时检测潜在的 null 引用问题。

```csharp
// 在项目文件或文件顶部启用
#nullable enable

// 不可为 null 的引用类型
string name = "张三";
// name = null; // CS8600 警告

// 可为 null 的引用类型
string? nullableName = null;
// string? 类型在使用前需要检查
if (nullableName != null)
{
    Console.WriteLine(nullableName.Length); // 安全
}

// 方法参数
void PrintLength(string? text)
{
    // 需要处理 null
    if (text == null)
    {
        Console.WriteLine("文本为 null");
        return;
    }
    Console.WriteLine(text.Length);
}

// 方法返回值
string? FindUser(int id)
{
    // 可能返回 null
    return id > 0 ? "用户" : null;
}

// 使用
string? user = FindUser(1);
if (user != null)
{
    Console.WriteLine(user.ToUpper()); // 安全
}

#nullable disable
```

## 实际案例

### 安全的数据访问

```csharp
public class Address
{
    public string Street { get; set; }
    public string City { get; set; }
    public string? ZipCode { get; set; }
}

public class Customer
{
    public string Name { get; set; }
    public Address? Address { get; set; }
    public string? Email { get; set; }
}

public class OrderService
{
    public void SendNotification(Customer? customer)
    {
        // 1. 检查 customer 是否为 null
        // 2. 检查 Email 是否为 null
        // 3. 检查 Address 是否为 null，然后获取 City
        string email = customer?.Email ?? "无邮箱";
        string city = customer?.Address?.City ?? "未知城市";

        Console.WriteLine($"通知发送到：{email}");
        Console.WriteLine($"客户所在城市：{city}");
    }

    public string GetShippingAddress(Customer customer)
    {
        // 确保 customer 不为 null
        ArgumentNullException.ThrowIfNull(customer);

        // 安全访问嵌套属性
        string street = customer.Address?.Street ?? "地址不详";
        string city = customer.Address?.City ?? "";
        string zip = customer.Address?.ZipCode ?? "";

        return $"{street}, {city} {zip}".Trim();
    }
}

// 使用
var service = new OrderService();

// 场景1：完全为 null
service.SendNotification(null); // 通知发送到：无邮箱

// 场景2：部分数据
var customer = new Customer
{
    Name = "张三",
    Email = "zhangsan@example.com",
    Address = new Address
    {
        Street = "长安街",
        City = "北京"
    }
};

service.SendNotification(customer); // 通知发送到：zhangsan@example.com
Console.WriteLine(service.GetShippingAddress(customer)); // 长安街, 北京
```

### 配置读取

```csharp
public class AppConfig
{
    private readonly Dictionary<string, string?> _settings = new();

    public string? GetSetting(string key)
    {
        return _settings.TryGetValue(key, out var value) ? value : null;
    }

    public string GetString(string key, string defaultValue = "")
    {
        return GetSetting(key) ?? defaultValue;
    }

    public int GetInt(string key, int defaultValue = 0)
    {
        string? value = GetSetting(key);
        return int.TryParse(value, out int result) ? result : defaultValue;
    }

    public bool GetBool(string key, bool defaultValue = false)
    {
        string? value = GetSetting(key);
        return bool.TryParse(value, out bool result) ? result : defaultValue;
    }
}

// 使用
var config = new AppConfig();
string server = config.GetString("Server", "localhost");
int port = config.GetInt("Port", 8080);
bool enableLog = config.GetBool("EnableLog", true);

Console.WriteLine($"服务器：{server}:{port}，日志：{enableLog}");
```

### 集合安全操作

```csharp
List<string>? items = GetItems();

// 安全遍历
foreach (string? item in items ?? Enumerable.Empty<string>())
{
    Console.WriteLine(item ?? "空值");
}

// 或使用 ?. 和 ?? 组合
int count = items?.Count ?? 0;
string? first = items?.FirstOrDefault();

// 避免 null 集合的 LINQ 操作
var result = (items ?? new List<string>())
    .Where(x => x != null)
    .Select(x => x.ToUpper())
    .ToList();
```

### 完整示例：表单验证

```csharp
#nullable enable

public class FormData
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public int? Age { get; set; }
    public string? Phone { get; set; }
}

public class Validator
{
    public List<string> Validate(FormData? form)
    {
        var errors = new List<string>();

        // 为 null 时整体检查
        if (form is null)
        {
            errors.Add("表单数据不能为空");
            return errors;
        }

        // 逐个字段检查
        if (string.IsNullOrWhiteSpace(form.Name))
            errors.Add("姓名不能为空");

        if (string.IsNullOrWhiteSpace(form.Email))
            errors.Add("邮箱不能为空");
        else if (!form.Email.Contains('@'))
            errors.Add("邮箱格式不正确");

        if (form.Age is null or < 0 or > 150)
            errors.Add("年龄不合法");

        // 可选字段，有值时才验证
        if (form.Phone?.Length < 11)
            errors.Add("手机号格式不正确");

        return errors;
    }
}

// 使用
var validator = new Validator();
var form = new FormData
{
    Name = "张三",
    Email = "invalid-email",
    Age = -1
};

var errors = validator.Validate(form);
if (errors.Count == 0)
    Console.WriteLine("验证通过");
else
    errors.ForEach(e => Console.WriteLine($"错误：{e}"));

#nullable disable
```