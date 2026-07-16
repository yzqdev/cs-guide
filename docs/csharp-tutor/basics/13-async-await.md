---
order: 13
---

# 异步编程

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/asynchronous-programming/)

## async / await 基础

`async` / `await` 是 C# 5 引入的异步编程模型，让异步代码写起来像同步代码一样简洁。

### 基本语法

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        // 调用异步方法
        await DoWorkAsync();
        Console.WriteLine("完成！");
    }

    static async Task DoWorkAsync()
    {
        Console.WriteLine("开始工作...");
        await Task.Delay(1000); // 模拟异步操作（不阻塞线程）
        Console.WriteLine("工作完成...");
    }
}
// 输出：
// 开始工作...
// （1秒后）
// 工作完成...
// 完成！
```

### 返回值类型

```csharp
// 1. Task：无返回值
async Task DoSomethingAsync()
{
    await Task.Delay(100);
    Console.WriteLine("完成");
}

// 2. Task<T>：有返回值
async Task<int> CalculateAsync()
{
    await Task.Delay(100); // 模拟异步计算
    return 42;
}

// 3. void：仅用于事件处理（不推荐其他场景）
async void Button_Click(object sender, EventArgs e)
{
    await DoSomethingAsync();
}

// 4. ValueTask<T>：减少分配（高性能场景）
async ValueTask<int> GetCachedValueAsync()
{
    await Task.CompletedTask;
    return 42;
}

// 使用
int result = await CalculateAsync();
Console.WriteLine(result); // 42
```

### async Main 方法（C# 7.1+）

```csharp
// 传统方式
// static void Main() { ... }

// 现代方式：直接在 Main 中使用 await
static async Task Main()
{
    await DoWorkAsync();
    Console.WriteLine("程序结束");
}

// 带返回值
static async Task<int> Main()
{
    await DoWorkAsync();
    return 0;
}
```

## 异步方法调用

### 等待单个任务

```csharp
async Task DownloadAndProcessAsync()
{
    using var client = new HttpClient();

    // 同步等待（阻塞线程）
    // var content = client.GetStringAsync("...").Result; // ❌ 可能导致死锁

    // 异步等待（不阻塞线程）
    var content = await client.GetStringAsync("https://api.example.com/data");
    Console.WriteLine($"下载了 {content.Length} 个字符");
}
```

### 等待多个任务

```csharp
// 并行执行多个任务
async Task DownloadMultipleAsync()
{
    using var client = new HttpClient();

    var url1 = "https://api.example.com/data1";
    var url2 = "https://api.example.com/data2";
    var url3 = "https://api.example.com/data3";

    // 启动所有任务
    var task1 = client.GetStringAsync(url1);
    var task2 = client.GetStringAsync(url2);
    var task3 = client.GetStringAsync(url3);

    // 等待所有完成
    var results = await Task.WhenAll(task1, task2, task3);

    Console.WriteLine($"数据1：{results[0].Length} 字符");
    Console.WriteLine($"数据2：{results[1].Length} 字符");
    Console.WriteLine($"数据3：{results[2].Length} 字符");
}

// 等待任意一个完成
async Task<string> GetFirstResponseAsync()
{
    using var client = new HttpClient();

    var task1 = client.GetStringAsync("https://api1.example.com");
    var task2 = client.GetStringAsync("https://api2.example.com");

    var completedTask = await Task.WhenAny(task1, task2);
    return await completedTask;
}
```

### 顺序执行

```csharp
async Task SequentialAsync()
{
    // 每个 await 等待上一个完成
    var result1 = await Step1Async();
    var result2 = await Step2Async(result1);
    var result3 = await Step3Async(result2);
    Console.WriteLine(result3);
}
```

## 异常处理

### try / catch 在异步方法中

```csharp
async Task SafeDownloadAsync()
{
    try
    {
        using var client = new HttpClient();
        var content = await client.GetStringAsync("https://api.example.com");
        Console.WriteLine(content);
    }
    catch (HttpRequestException ex)
    {
        Console.WriteLine($"网络错误：{ex.Message}");
    }
    catch (TaskCanceledException)
    {
        Console.WriteLine("请求超时或被取消");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"未知错误：{ex.Message}");
    }
}
```

### 多个任务时的异常处理

```csharp
async Task HandleMultipleExceptionsAsync()
{
    var tasks = new[]
    {
        Task.Run(() => throw new InvalidOperationException("任务1失败")),
        Task.Run(() => throw new AccessViolationException("任务2失败")),
        Task.Run(() => "成功")
    };

    try
    {
        var results = await Task.WhenAll(tasks);
    }
    catch (AggregateException ae)
    {
        // Task.WhenAll 在 AggregateException 中包装多个异常
        foreach (var ex in ae.InnerExceptions)
        {
            Console.WriteLine($"异常：{ex.Message}");
        }
    }
    // 或者：
    // 注意：await 会展开 AggregateException，只抛出第一个
    // 如果需要所有异常，使用 tasks 的 Exception 属性
}
```

## 取消异步操作

使用 `CancellationToken` 取消异步操作。

```csharp
async Task DownloadWithCancellationAsync()
{
    using var client = new HttpClient();
    using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5)); // 5秒超时

    try
    {
        var content = await client.GetStringAsync(
            "https://api.example.com/data",
            cts.Token);
        Console.WriteLine(content);
    }
    catch (OperationCanceledException)
    {
        Console.WriteLine("操作被取消（超时）");
    }
}

// 手动取消
async Task ManualCancelAsync()
{
    using var cts = new CancellationTokenSource();

    // 3秒后取消
    cts.CancelAfter(3000);

    try
    {
        await Task.Delay(10000, cts.Token); // 模拟耗时操作
    }
    catch (OperationCanceledException)
    {
        Console.WriteLine("操作被手动取消");
    }
}

// 响应取消的异步方法
async Task ProcessAsync(CancellationToken cancellationToken = default)
{
    for (int i = 0; i < 100; i++)
    {
        // 检查是否被取消
        cancellationToken.ThrowIfCancellationRequested();

        await Task.Delay(100, cancellationToken);
        Console.WriteLine($"处理进度：{i}%");
    }
}
```

## 异步流（C# 8+）

`async foreach` 配合 `IAsyncEnumerable<T>` 实现异步流式处理。

```csharp
// 生成异步流
async IAsyncEnumerable<int> GenerateNumbersAsync(int count)
{
    for (int i = 0; i < count; i++)
    {
        await Task.Delay(500); // 模拟异步生成
        yield return i;
    }
}

// 消费异步流
async Task ConsumeAsync()
{
    await foreach (var number in GenerateNumbersAsync(5))
    {
        Console.WriteLine($"收到：{number}");
    }
}
// 输出（每0.5秒一个）：
// 收到：0
// 收到：1
// 收到：2
// 收到：3
// 收到：4

// 带取消的异步流
async IAsyncEnumerable<string> ReadLinesAsync(string path,
    [EnumeratorCancellation] CancellationToken cancellationToken = default)
{
    using var reader = new StreamReader(path);
    while (!reader.EndOfStream)
    {
        cancellationToken.ThrowIfCancellationRequested();
        var line = await reader.ReadLineAsync();
        yield return line;
    }
}

// 使用
await foreach (var line in ReadLinesAsync("data.txt").WithCancellation(cts.Token))
{
    Console.WriteLine(line);
}
```

## 异步编程最佳实践

### 避免 async void

```csharp
// ❌ 错误：async void 无法被等待，异常难以捕获
async void BadMethod()
{
    await Task.Delay(100);
    throw new Exception("这个异常不会被捕获");
}

// ✅ 正确：使用 async Task
async Task GoodMethod()
{
    await Task.Delay(100);
    throw new Exception("这个异常可以被捕获");
}

// ✅ 事件处理中使用 async void 是合理的
button.Click += async (sender, e) =>
{
    await DoWorkAsync();
};
```

### 避免阻塞

```csharp
// ❌ 错误：阻塞当前线程，可能导致死锁
string result = GetStringAsync().Result;
string result = GetStringAsync().GetAwaiter().GetResult();

// ✅ 正确：一直使用 await
string result = await GetStringAsync();
```

### ConfigureAwait

```csharp
// 在库代码中使用 ConfigureAwait(false) 避免强制回到原始上下文
async Task<string> LibraryMethodAsync()
{
    using var client = new HttpClient();
    var content = await client.GetStringAsync("https://api.example.com")
        .ConfigureAwait(false); // 不回到原始同步上下文

    // 后续代码在 ThreadPool 线程上执行
    return content;
}

// UI 代码中需要 ConfigureAwait(true)（默认）以回到 UI 线程
async Task UIMethodAsync()
{
    var data = await LoadDataAsync(); // 默认回到 UI 线程
    textBox.Text = data; // 安全访问 UI 控件
}
```

### 使用 ValueTask 减少分配

```csharp
// 当结果经常立即可用时，使用 ValueTask<T> 减少堆分配
class Cache
{
    private string? _cachedData;

    public async ValueTask<string> GetDataAsync()
    {
        if (_cachedData != null)
            return _cachedData; // 同步返回，不分配 Task

        _cachedData = await LoadFromDatabaseAsync();
        return _cachedData;
    }

    private async Task<string> LoadFromDatabaseAsync()
    {
        await Task.Delay(100);
        return "数据库数据";
    }
}
```

## 实际案例

### 并发下载器

```csharp
class ConcurrentDownloader
{
    private readonly HttpClient _client = new();

    public async Task DownloadAllAsync(string[] urls)
    {
        var tasks = urls.Select(url => DownloadSingleAsync(url));
        await Task.WhenAll(tasks);
        Console.WriteLine("所有下载完成");
    }

    private async Task DownloadSingleAsync(string url)
    {
        try
        {
            Console.WriteLine($"开始下载：{url}");
            var content = await _client.GetStringAsync(url);
            Console.WriteLine($"下载完成：{url}，大小：{content.Length}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"下载失败：{url}，错误：{ex.Message}");
        }
    }

    public async Task DownloadWithProgressAsync(string[] urls,
        IProgress<int>? progress = null)
    {
        int completed = 0;
        var tasks = urls.Select(async url =>
        {
            await DownloadSingleAsync(url);
            Interlocked.Increment(ref completed);
            progress?.Report(completed * 100 / urls.Length);
        });

        await Task.WhenAll(tasks);
    }
}

// 使用
var downloader = new ConcurrentDownloader();
var urls = new[]
{
    "https://api.example.com/data1",
    "https://api.example.com/data2",
    "https://api.example.com/data3"
};

var progress = new Progress<int>(p =>
    Console.WriteLine($"总进度：{p}%"));

await downloader.DownloadWithProgressAsync(urls, progress);
```

### 超时重试

```csharp
class RetryHelper
{
    public static async Task<T> ExecuteWithRetryAsync<T>(
        Func<Task<T>> operation,
        int maxRetries = 3,
        int delayMs = 1000)
    {
        int retryCount = 0;
        while (true)
        {
            try
            {
                return await operation();
            }
            catch (Exception ex) when (retryCount < maxRetries - 1)
            {
                retryCount++;
                Console.WriteLine($"第{retryCount}次重试：{ex.Message}");
                await Task.Delay(delayMs * retryCount); // 递增延迟
            }
        }
    }
}

// 使用
var result = await RetryHelper.ExecuteWithRetryAsync(async () =>
{
    using var client = new HttpClient();
    return await client.GetStringAsync("https://api.example.com");
}, maxRetries: 3);
```

### 并行处理数据

```csharp
async Task ProcessDataInParallelAsync(List<int> data)
{
    // 使用 Parallel.ForEach 并行处理 CPU 密集型任务
    Parallel.ForEach(data, item =>
    {
        Console.WriteLine($"处理：{item}（线程 {Thread.CurrentThread.ManagedThreadId}）");
    });

    // 使用 Task.WhenAll 并行处理 IO 密集型任务
    var tasks = data.Select(async item =>
    {
        await Task.Delay(100); // 模拟 IO 操作
        return item * 2;
    });
    var results = await Task.WhenAll(tasks);
    Console.WriteLine($"结果：{string.Join(", ", results)}");
}

// 限制并发数
async Task ProcessWithThrottlingAsync(List<string> items, int maxConcurrency = 5)
{
    using var semaphore = new SemaphoreSlim(maxConcurrency);
    var tasks = items.Select(async item =>
    {
        await semaphore.WaitAsync();
        try
        {
            await ProcessItemAsync(item);
        }
        finally
        {
            semaphore.Release();
        }
    });
    await Task.WhenAll(tasks);
}

async Task ProcessItemAsync(string item)
{
    Console.WriteLine($"开始处理：{item}");
    await Task.Delay(500);
    Console.WriteLine($"完成处理：{item}");
}
```