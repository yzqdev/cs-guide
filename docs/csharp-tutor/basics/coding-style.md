# 代码规范

:::tip
<https://docs.microsoft.com/zh-cn/dotnet/csharp/fundamentals/coding-style/coding-conventions>
:::

## 帕斯卡拼写法

命名 class、record 或 struct 时，使用 pascal 大小写（“PascalCasing”）。

```cs
public class DataService
{
}

public record PhysicalAddress(
    string Street,
    string City,
    string StateOrProvince,
    string ZipCode);

public struct ValueCoordinate
{
}
```

命名 interface 时，使用 pascal 大小写并在名称前面加上前缀 I。 这可以清楚地向使用者表明这是 interface

```cs
public interface IWorkerQueue
{
}
```

命名类型的 public 成员（例如字段、属性、事件、方法和本地函数）时，请使用 pascal 大小写。

```cs
public class ExampleEvents
{
    // A public field, these should be used sparingly
    public bool IsValid;

    // An init-only property
    public IWorkerQueue WorkerQueue { get; init; }

    // An event
    public event Action EventProcessing;

    // Method
    public void StartEventProcessing()
    {
        // Local function
        static int CountQueueItems() => WorkerQueue.Count;
        // ...
    }
}
```

## 驼峰式大小写

命名 private 或 internal 字段时，使用驼峰式大小写（“camelCasing”），并且它们以 _ 作为前缀。

```cs
public class DataService
{
    private IWorkerQueue _workerQueue;
}
```

使用为 private 或 internal 的static 字段时 请使用 s_前缀，对于线程静态，请使用 t_。

```cs
public class DataService
{
    private static IWorkerQueue s_workerQueue;

    [ThreadStatic]
    private static TimeSpan t_timeSpan;
}
```

编写方法参数时，请使用驼峰式大小写。

```cs
public T SomeMethod<T>(int someNumber, bool isValid)
{
}
```

linq使用

```cs
var seattleCustomers = from customer in customers
                       where customer.City == "Seattle"
                       select customer.Name;
```
