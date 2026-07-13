# 异常处理

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/fundamentals/exceptions/)

## 基本语法

### try / catch / finally

```csharp
try
{
    // 可能抛出异常的代码
    int result = Divide(10, 0);
    Console.WriteLine(result);
}
catch (DivideByZeroException ex)
{
    // 处理特定异常
    Console.WriteLine($"发生除零异常：{ex.Message}");
}
catch (Exception ex)
{
    // 处理其他所有异常
    Console.WriteLine($"发生异常：{ex.Message}");
}
finally
{
    // 无论是否发生异常都会执行（用于清理资源）
    Console.WriteLine("清理工作完成");
}

static int Divide(int a, int b)
{
    return a / b;
}
```

### 异常过滤器（C# 6+）

```csharp
try
{
    // 某些操作
}
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
{
    Console.WriteLine("资源不存在（404）");
}
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.Unauthorized)
{
    Console.WriteLine("未授权（401）");
}
catch (HttpRequestException ex)
{
    Console.WriteLine($"HTTP 请求失败：{ex.Message}");
}
```

## 常见异常类型

```csharp
// System.Exception —— 所有异常的基类
// System.SystemException —— 系统抛出的异常基类
//   ├── System.ArgumentException
//   │   ├── System.ArgumentNullException
//   │   └── System.ArgumentOutOfRangeException
//   ├── System.ArithmeticException
//   │   ├── System.DivideByZeroException
//   │   └── System.OverflowException
//   ├── System.ArrayTypeMismatchException
//   ├── System.IndexOutOfRangeException
//   ├── System.InvalidCastException
//   ├── System.InvalidOperationException
//   ├── System.NullReferenceException
//   └── System.FormatException

try
{
    // ArgumentNullException
    string str = null;
    if (str == null)
        throw new ArgumentNullException(nameof(str));

    // ArgumentOutOfRangeException
    int[] arr = new int[5];
    if (10 >= arr.Length)
        throw new ArgumentOutOfRangeException("index");

    // FormatException
    int.Parse("不是数字");

    // InvalidOperationException
    var list = new List<int>();
    var first = list.First(); // 空集合上调用 First()

    // NullReferenceException
    object obj = null;
    Console.WriteLine(obj.ToString());
}
catch (ArgumentNullException ex)
{
    Console.WriteLine($"参数为空：{ex.ParamName}");
}
catch (FormatException ex)
{
    Console.WriteLine($"格式错误：{ex.Message}");
}
catch (InvalidOperationException ex)
{
    Console.WriteLine($"无效操作：{ex.Message}");
}
catch (NullReferenceException ex)
{
    Console.WriteLine($"空引用：{ex.Message}");
}
```

## 抛出异常

### throw 语句

```csharp
static void ValidateAge(int age)
{
    if (age < 0)
        throw new ArgumentOutOfRangeException(nameof(age), "年龄不能为负数");
    if (age > 150)
        throw new ArgumentOutOfRangeException(nameof(age), "年龄不能超过150岁");
}

static void RegisterUser(string name, int age)
{
    if (string.IsNullOrWhiteSpace(name))
        throw new ArgumentException("用户名不能为空", nameof(name));

    ValidateAge(age);

    Console.WriteLine($"用户 {name}（{age}岁）注册成功");
}

// 使用
try
{
    RegisterUser("", 25); // 抛出异常
}
catch (ArgumentException ex)
{
    Console.WriteLine($"参数错误：{ex.Message}");
}
```

### throw 与异常重新抛出

```csharp
static void ProcessData()
{
    try
    {
        // 某些操作
        throw new InvalidOperationException("数据无效");
    }
    catch (Exception ex)
    {
        // ❌ 错误方式：丢失原始异常堆栈
        // throw ex;

        // ✅ 正确方式：保留原始异常堆栈
        throw;
    }
}

static void SafeProcessData()
{
    try
    {
        ProcessData();
    }
    catch (Exception ex)
    {
        // 包装异常：添加额外信息
        throw new ApplicationException("数据处理失败", ex);
    }
}
```

### 自定义异常

```csharp
// 自定义异常类
class InsufficientFundsException : Exception
{
    public decimal Balance { get; }
    public decimal Amount { get; }

    public InsufficientFundsException(decimal balance, decimal amount)
        : base($"余额不足。当前余额：{balance:C}，需要：{amount:C}")
    {
        Balance = balance;
        Amount = amount;
    }
}

class BankAccount
{
    private decimal _balance;

    public decimal Balance => _balance;

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("取款金额必须为正数", nameof(amount));

        if (amount > _balance)
            throw new InsufficientFundsException(_balance, amount);

        _balance -= amount;
    }

    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("存款金额必须为正数", nameof(amount));

        _balance += amount;
    }
}

// 使用自定义异常
var account = new BankAccount();
account.Deposit(1000);

try
{
    account.Withdraw(1500);
}
catch (InsufficientFundsException ex)
{
    Console.WriteLine(ex.Message);
    Console.WriteLine($"你的余额：{ex.Balance:C}");
}
// 输出：
// 余额不足。当前余额：¥1,000.00，需要：¥1,500.00
// 你的余额：¥1,000.00
```

## 使用模式

### 防御性编程 vs 异常

```csharp
// 方法1：防御性编程（提前检查，避免异常）
static int? SafeDivide(int a, int b)
{
    return b == 0 ? null : a / b;
}

// 方法2：使用异常
static int DivideWithException(int a, int b)
{
    if (b == 0)
        throw new DivideByZeroException("除数不能为零");
    return a / b;
}

// 方法3：TryParse 模式（推荐，避免异常性能开销）
static bool TryDivide(int a, int b, out int result)
{
    if (b == 0)
    {
        result = 0;
        return false;
    }
    result = a / b;
    return true;
}

// 使用 Try 模式
if (TryDivide(10, 0, out int result))
{
    Console.WriteLine(result);
}
else
{
    Console.WriteLine("计算失败");
}
```

### 使用 using 语句自动释放资源

```csharp
// using 语句确保 Dispose() 被调用（即使在异常发生时）
using (var reader = new StreamReader("file.txt"))
{
    string content = reader.ReadToEnd();
    Console.WriteLine(content);
} // 自动调用 reader.Dispose()

// using 声明（C# 8+，代码块结束时自动释放）
using var writer = new StreamWriter("output.txt");
writer.WriteLine("Hello, World!");
// 在方法结束时自动释放
```

### 全局异常处理

```csharp
class Program
{
    static void Main(string[] args)
    {
        // 订阅未处理的异常事件
        AppDomain.CurrentDomain.UnhandledException += (sender, e) =>
        {
            Console.WriteLine($"未处理的异常：{(e.ExceptionObject as Exception)?.Message}");
            // 记录日志、发送通知等
        };

        try
        {
            Run();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"顶层异常捕获：{ex.Message}");
        }
    }

    static void Run()
    {
        // 程序逻辑
        throw new InvalidOperationException("运行时错误");
    }
}
```

## 实际案例

### 安全文件读取器

```csharp
class SafeFileReader
{
    public static string? ReadFileContent(string filePath)
    {
        try
        {
            if (!File.Exists(filePath))
            {
                Console.WriteLine($"文件不存在：{filePath}");
                return null;
            }

            using var reader = new StreamReader(filePath);
            return reader.ReadToEnd();
        }
        catch (UnauthorizedAccessException)
        {
            Console.WriteLine($"没有权限读取文件：{filePath}");
            return null;
        }
        catch (IOException ex)
        {
            Console.WriteLine($"文件读取错误：{ex.Message}");
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"未知错误：{ex.Message}");
            return null;
        }
    }
}

// 使用
string? content = SafeFileReader.ReadFileContent("C:/data/config.json");
if (content != null)
{
    Console.WriteLine($"文件内容：{content}");
}
```

### 用户输入验证

```csharp
static int GetValidAge()
{
    while (true)
    {
        Console.Write("请输入年龄：");
        string input = Console.ReadLine();

        try
        {
            if (!int.TryParse(input, out int age))
                throw new FormatException("输入的不是有效数字");

            if (age < 0 || age > 150)
                throw new ArgumentOutOfRangeException(nameof(age), "年龄必须在 0~150 之间");

            return age;
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"格式错误：{ex.Message}，请重新输入");
        }
        catch (ArgumentOutOfRangeException ex)
        {
            Console.WriteLine($"范围错误：{ex.Message}，请重新输入");
        }
    }
}

// 使用
int age = GetValidAge();
Console.WriteLine($"输入的年龄：{age}");
```

### 网络请求重试

```csharp
class NetworkHelper
{
    private static readonly int MaxRetries = 3;

    public static async Task<string> FetchDataWithRetry(string url)
    {
        int retryCount = 0;

        while (retryCount < MaxRetries)
        {
            try
            {
                using var client = new HttpClient();
                Console.WriteLine($"正在请求（第{retryCount + 1}次）...");
                return await client.GetStringAsync(url);
            }
            catch (HttpRequestException ex) when (retryCount < MaxRetries - 1)
            {
                retryCount++;
                Console.WriteLine($"请求失败：{ex.Message}，{retryCount}秒后重试...");
                await Task.Delay(retryCount * 1000); // 递增等待
            }
            catch (TaskCanceledException) when (retryCount < MaxRetries - 1)
            {
                retryCount++;
                Console.WriteLine("请求超时，正在重试...");
                await Task.Delay(retryCount * 1000);
            }
        }

        throw new InvalidOperationException($"多次重试后仍然失败：{url}");
    }
}

// 使用（需要 using System.Threading.Tasks;）
// try
// {
//     string data = await NetworkHelper.FetchDataWithRetry("https://api.example.com/data");
//     Console.WriteLine(data);
// }
// catch (Exception ex)
// {
//     Console.WriteLine($"最终失败：{ex.Message}");
// }
```

### 异常处理最佳实践

```csharp
// ✅ 好的做法
public class OrderService
{
    public void PlaceOrder(Order order)
    {
        // 1. 参数验证（防御性编程，提前返回）
        if (order == null)
            throw new ArgumentNullException(nameof(order));

        if (order.Items.Count == 0)
            throw new ArgumentException("订单必须包含商品");

        // 2. 业务逻辑
        try
        {
            SaveOrder(order);
            ProcessPayment(order);
            SendConfirmation(order);
        }
        catch (PaymentException ex)
        {
            // 3. 业务异常有特定处理
            RollbackOrder(order);
            throw new OrderException("支付失败，订单已回滚", ex);
        }
        catch (Exception ex)
        {
            // 4. 未知异常记录日志，不暴露实现细节
            Log.Error($"订单处理异常：{ex}");
            throw; // 保留原始堆栈
        }
    }

    private void SaveOrder(Order order) { /* ... */ }
    private void ProcessPayment(Order order) { /* ... */ }
    private void SendConfirmation(Order order) { /* ... */ }
    private void RollbackOrder(Order order) { /* ... */ }
}

// ❌ 不好的做法
// 1. 捕获 Exception 但不处理
// try { ... } catch (Exception) { }

// 2. 吞掉异常
// try { ... } catch { }

// 3. 抛出异常而不保留堆栈
// catch (Exception ex) { throw ex; }

// 4. 用异常控制流程（应该用条件判断）
// try { int.Parse(input); } catch { /* 不是数字 */ }
// ✅ 应该用 int.TryParse(input, out result)
```