# C# 修饰符

## 文档位置

- [官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/)
- [菜鸟教程](https://www.runoob.com/csharp/csharp-methods.html)
- [C# Java Python](https://www.cjavapy.com/)

## out 修饰符

```csharp
public void OutFunc()
{
    int n;
    bool b = MyTryParse("123", out n);
    Console.WriteLine(b);
    Console.WriteLine(n);
}

public static bool MyTryParse(string s, out int result)
{
    result = 0;
    try
    {
        result = Convert.ToInt32(s);
        return true;
    }
    catch
    {
        return false;
    }
}
```

## 类型转换

```csharp
Person p = new Teacher();
```

子类可以隐式的转换成父类：

```csharp
Teacher t = (Teacher)p;
```

### is 和 as 操作符

- `typeA is typeB` - 仅判断
- `typeA as typeB` - 先判断，再转换
- 如果成功了那就是真的成功了，如果不成功返回空
- `as` 也是转换，但是如果转换不了不报异常，返回来的是 `null`
- `is` 转换，返回的是 `bool` 值，`true` 就是能转换，`false` 就是不能转换