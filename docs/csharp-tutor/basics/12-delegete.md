---
order: 12
---

# C# 委托与事件

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/delegates/)

委托（Delegate）是 C# 中的类型安全函数指针，可以把方法作为参数传递，也常用于实现回调机制和事件系统。

## 委托基础

### 委托的定义与使用

```csharp
// 1. 定义委托类型（指定方法的签名）
delegate void MyDelegate(string message);

// 2. 定义匹配该签名的方法
static void SayHello(string name)
{
    Console.WriteLine($"你好，{name}！");
}

static void SayGoodbye(string name)
{
    Console.WriteLine($"再见，{name}！");
}

// 3. 使用委托
MyDelegate del = SayHello;   // 将方法赋值给委托变量
del("张三");                  // 通过委托调用方法

del = SayGoodbye;            // 切换方法
del("李四");

// 或者使用 new 语法
MyDelegate del2 = new MyDelegate(SayHello);
del2("王五");
```

### 作为方法参数

```csharp
// 委托作为参数（回调函数）
void ProcessData(string data, MyDelegate callback)
{
    // 处理数据...
    string result = $"处理完毕：{data}";
    callback(result); // 调用回调
}

// 使用
ProcessData("用户数据", SayHello);
// 输出：你好，处理完毕：用户数据！

// 也可以直接传 Lambda
ProcessData("订单数据", msg => Console.WriteLine($"日志：{msg}"));
```

## 内置委托类型

C# 提供了 `Action`、`Func`、`Predicate` 等内置泛型委托，大多数情况下不需要自定义委托。

### Action — 无返回值

```csharp
// Action: 无参数，无返回值
Action sayHello = () => Console.WriteLine("你好！");
sayHello();

// Action<T>: 1个参数，无返回值
Action<string> print = msg => Console.WriteLine(msg);
print("Hello, World!");

// Action<T1, T2, ...>: 最多16个参数
Action<int, int> add = (a, b) => Console.WriteLine($"{a} + {b} = {a + b}");
add(3, 5); // 3 + 5 = 8
```

### Func — 有返回值

```csharp
// Func<TReturn>: 无参数，有返回值
Func<int> getNumber = () => 42;
Console.WriteLine(getNumber()); // 42

// Func<T, TReturn>: 1个参数，有返回值
Func<int, int> square = x => x * x;
Console.WriteLine(square(5)); // 25

// Func<T1, T2, TReturn>: 2个参数，有返回值
Func<int, int, int> add = (a, b) => a + b;
Console.WriteLine(add(3, 4)); // 7

// Func<T1, ..., T16, TReturn>: 最多16个参数
Func<string, int, string> format = (name, age) => $"{name}，{age}岁";
Console.WriteLine(format("张三", 25));
```

### Predicate — 返回 bool

```csharp
// Predicate<T>: 接收一个参数，返回 bool
Predicate<int> isEven = x => x % 2 == 0;
Console.WriteLine(isEven(4)); // True
Console.WriteLine(isEven(5)); // False

// 实际应用：集合筛选
List<int> numbers = new() { 1, 2, 3, 4, 5, 6 };
List<int> evens = numbers.FindAll(isEven);
Console.WriteLine(string.Join(", ", evens)); // 2, 4, 6
```

## 多播委托

一个委托可以同时引用多个方法，使用 `+=` 添加，用 `-=` 移除。

```csharp
// 定义委托
delegate void Notify(string message);

static void WriteToConsole(string msg)
    => Console.WriteLine($"[Console] {msg}");

static void WriteToFile(string msg)
    => Console.WriteLine($"[File] {msg}"); // 实际使用中写入文件

static void SendEmail(string msg)
    => Console.WriteLine($"[Email] {msg}"); // 实际使用中发送邮件

// 多播：组合多个方法
Notify notifier = WriteToConsole;
notifier += WriteToFile;
notifier += SendEmail;

// 调用时会依次执行所有方法
notifier("系统启动");
// 输出：
// [Console] 系统启动
// [File] 系统启动
// [Email] 系统启动

// 移除方法
notifier -= WriteToFile;
notifier("执行任务");
// 输出：
// [Console] 执行任务
// [Email] 执行任务

// 获取调用列表
Delegate[] methods = notifier.GetInvocationList();
Console.WriteLine($"方法数量：{methods.Length}"); // 2
```

### 多播委托的返回值

当多播委托有返回值时，只返回最后一个方法的返回值。

```csharp
Func<int> GetNumber = () =>
{
    Console.WriteLine("第一个方法返回 10");
    return 10;
};
GetNumber += () =>
{
    Console.WriteLine("第二个方法返回 20");
    return 20;
};

int result = GetNumber();
Console.WriteLine($"最终结果：{result}"); // 20
```

## 匿名方法与 Lambda

### 匿名方法

使用 `delegate` 关键字创建内联方法。

```csharp
// 使用命名方法
Action show1 = ShowMessage;

// 匿名方法（C# 2.0+）
Action show2 = delegate
{
    Console.WriteLine("匿名方法执行");
};

Func<int, int, int> add = delegate(int a, int b)
{
    return a + b;
};

Console.WriteLine(add(3, 4)); // 7

// 可以忽略参数
Action<string> print = delegate
{
    Console.WriteLine("忽略参数");
};
print("任何内容"); // 忽略参数
```

### Lambda 表达式

更简洁的匿名函数语法（C# 3.0+）。

```csharp
// 语句 Lambda（多行）
Action<string> greet = (name) =>
{
    string msg = $"你好，{name}！";
    Console.WriteLine(msg);
};
greet("张三");

// 表达式 Lambda（单行，最常用）
Func<int, int, int> add = (a, b) => a + b;
Func<int, int> square = x => x * x; // 单个参数可省略括号

// 无参数
Action hello = () => Console.WriteLine("你好！");

// 显式指定参数类型
Func<int, int, string> compare = (int a, int b) =>
    a > b ? "大于" : a < b ? "小于" : "等于";

Console.WriteLine(compare(5, 3)); // 大于

// 捕获外部变量（闭包）
int factor = 10;
Func<int, int> multiply = x => x * factor;
Console.WriteLine(multiply(5)); // 50

factor = 20; // 捕获的是引用
Console.WriteLine(multiply(5)); // 100
```

## 事件

事件是建立在委托之上的机制，提供发布/订阅模式。事件只能由声明它的类触发，外部只能 `+=` 或 `-=`。

### 定义和使用事件

```csharp
// 事件发布者
class Button
{
    // 使用 EventHandler 或 EventHandler<TArgs>
    public event EventHandler? Clicked;
    public event EventHandler<EventArgs>? DoubleClicked;

    // 标准的事件触发方法（protected virtual）
    protected virtual void OnClicked()
    {
        Clicked?.Invoke(this, EventArgs.Empty);
    }

    public void Click()
    {
        Console.WriteLine("按钮被点击");
        OnClicked();
    }
}

// 事件订阅者
class Window
{
    private Button _button;

    public Window()
    {
        _button = new Button();

        // 订阅事件（+=）
        _button.Clicked += OnButtonClicked;
        _button.Clicked += (sender, e) =>
            Console.WriteLine("Lambda 订阅的事件处理器");

        // 模拟点击
        _button.Click();
    }

    private void OnButtonClicked(object? sender, EventArgs e)
    {
        Console.WriteLine("窗口响应按钮点击");
    }

    public void Close()
    {
        // 取消订阅（-=）
        _button.Clicked -= OnButtonClicked;
    }
}

// 使用
var window = new Window();
// 输出：
// 按钮被点击
// 窗口响应按钮点击
// Lambda 订阅的事件处理器
```

### 自定义事件参数

```csharp
// 自定义事件参数
class KeyPressedEventArgs : EventArgs
{
    public ConsoleKey Key { get; }
    public DateTime Timestamp { get; }

    public KeyPressedEventArgs(ConsoleKey key)
    {
        Key = key;
        Timestamp = DateTime.Now;
    }
}

// 发布者
class Keyboard
{
    // 使用自定义 EventArgs
    public event EventHandler<KeyPressedEventArgs>? KeyPressed;

    public void PressKey(ConsoleKey key)
    {
        Console.WriteLine($"按下按键：{key}");
        OnKeyPressed(new KeyPressedEventArgs(key));
    }

    protected virtual void OnKeyPressed(KeyPressedEventArgs e)
    {
        KeyPressed?.Invoke(this, e);
    }
}

// 订阅者
Keyboard keyboard = new();
keyboard.KeyPressed += (sender, e) =>
{
    Console.WriteLine($"按键：{e.Key}，时间：{e.Timestamp:HH:mm:ss}");
};

keyboard.PressKey(ConsoleKey.A);
// 输出：
// 按下按键：A
// 按键：A，时间：14:30:00
```

### 事件与委托的区别

```csharp
delegate void MyDelegate(string msg);

class EventDemo
{
    // 委托字段（外部可以任意操作）
    public MyDelegate? DelegateField;

    // 事件（外部只能 += 和 -=）
    public event MyDelegate? MyEvent;

    public void Demo()
    {
        // 事件只能在声明类内部触发
        MyEvent?.Invoke("内部触发事件");

        // 委托可以直接赋值（替换全部）
        DelegateField?.Invoke("通过委托调用");
    }
}

// 使用
var demo = new EventDemo();

// 委托：可以任意操作
demo.DelegateField = msg => Console.WriteLine(msg);    // ✅ 允许直接赋值
demo.DelegateField = null;                              // ✅ 允许清空
demo.DelegateField?.Invoke("直接调用");                 // ✅ 允许外部调用

// 事件：仅允许 += 和 -=
demo.MyEvent += msg => Console.WriteLine(msg);           // ✅ 允许订阅
demo.MyEvent -= msg => Console.WriteLine(msg);           // ✅ 取消订阅
// demo.MyEvent = msg => Console.WriteLine(msg);          // ❌ 编译错误
// demo.MyEvent = null;                                   // ❌ 编译错误
// demo.MyEvent?.Invoke("外部触发");                       // ❌ 编译错误
```

## 委托的协变与逆变

```csharp
class Animal { }
class Dog : Animal { }

// 协变（out）：返回类型可以是派生类
Func<Dog> getDog = () => new Dog();
Func<Animal> getAnimal = getDog; // ✅ 协变

// 逆变（in）：参数类型可以是基类
Action<Animal> actAnimal = (animal) => Console.WriteLine(animal);
Action<Dog> actDog = actAnimal; // ✅ 逆变

// 自定义协变/逆变委托
delegate T MyFunc<out T>();           // 协变
delegate void MyAction<in T>(T obj);  // 逆变
```

## 实际案例

### 排序器

```csharp
class Sorter
{
    // 使用 Comparison<T> 委托自定义排序规则
    public static void Sort<T>(T[] items, Comparison<T> comparison)
    {
        Array.Sort(items, comparison);
    }
}

// 使用
var people = new[]
{
    (Name: "张三", Age: 25),
    (Name: "李四", Age: 30),
    (Name: "王五", Age: 22)
};

// 按年龄排序
Sorter.Sort(people, (a, b) => a.Age.CompareTo(b.Age));
foreach (var p in people)
{
    Console.WriteLine($"{p.Name}：{p.Age}岁");
}
// 输出：
// 王五：22岁
// 张三：25岁
// 李四：30岁

// 按名字长度排序
Sorter.Sort(people, (a, b) => a.Name.Length.CompareTo(b.Name.Length));
```

### 异步委托

```csharp
// 委托也可以异步调用
Func<int, int, Task<int>> asyncAdd = async (a, b) =>
{
    await Task.Delay(100);
    return a + b;
};

// 调用
int result = await asyncAdd(3, 5);
Console.WriteLine(result); // 8

// 异步事件处理器
class AsyncProcessor
{
    public event Func<string, Task>? Processed;

    public async Task ProcessAsync(string data)
    {
        Console.WriteLine($"处理：{data}");
        if (Processed != null)
        {
            // 异步调用所有事件处理器
            var handlers = Processed.GetInvocationList()
                .Cast<Func<string, Task>>();
            await Task.WhenAll(handlers.Select(h => h(data)));
        }
    }
}

// 使用
var processor = new AsyncProcessor();
processor.Processed += async data =>
{
    await Task.Delay(500);
    Console.WriteLine($"处理器1完成：{data}");
};
processor.Processed += async data =>
{
    await Task.Delay(300);
    Console.WriteLine($"处理器2完成：{data}");
};

await processor.ProcessAsync("测试数据");
```

### 基于委托的缓存

```csharp
class Memoizer
{
    private readonly Dictionary<string, object?> _cache = new();

    // 泛型委托缓存：传入方法，返回带缓存的方法
    public Func<T, TResult> Memoize<T, TResult>(Func<T, TResult> func)
        where T : notnull
    {
        return input =>
        {
            string key = $"{input}";
            if (_cache.TryGetValue(key, out var cached))
            {
                Console.WriteLine($"缓存命中：{key}");
                return (TResult)cached!;
            }

            Console.WriteLine($"计算：{key}");
            var result = func(input);
            _cache[key] = result;
            return result;
        };
    }
}

// 使用
var memoizer = new Memoizer();
var expensiveCalc = memoizer.Memoize((int n) =>
{
    // 模拟耗时计算
    Thread.Sleep(1000);
    return n * n;
});

Console.WriteLine(expensiveCalc(5)); // 第一次：计算
Console.WriteLine(expensiveCalc(5)); // 第二次：缓存命中
Console.WriteLine(expensiveCalc(10)); // 新值：计算
```

## 委托与事件速查

| 概念 | 语法 | 用途 |
|------|------|------|
| 自定义委托 | `delegate void D(string s);` | 定义类型安全函数指针 |
| Action | `Action<T1, T2, ...>` | 无返回值的方法引用 |
| Func | `Func<T1, ..., TResult>` | 有返回值的方法引用 |
| Predicate | `Predicate<T>` | 返回 bool 的判断方法 |
| Lambda | `(x, y) => x + y` | 匿名函数 |
| 事件 | `event EventHandler MyEvent;` | 发布/订阅模式 |
| 多播 | `+=` / `-=` | 组合/移除多个方法 |
