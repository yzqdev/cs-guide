# C# 委托

[参考文档](https://www.jianshu.com/p/7aff7509fe2a)

委托就是把一个方法传入另一个方法，类似 JavaScript 的回调函数。下面详细举例。

先来看一段 JavaScript 代码：

```javascript
function aaa() {
    alert("aaa");
}

function bbb(callback) {
    alert("bbb");
    callback();
}

// 调用
bbb(aaa);
```

再看 C# 委托：

```csharp
static void Main(string[] args)
{
    bbb(aaa);
    Console.ReadKey();
}

public static void aaa()
{
    Console.WriteLine("aaa");
}

public static void bbb(Action action)
{
    Console.WriteLine("bbb");
    action();
}
```