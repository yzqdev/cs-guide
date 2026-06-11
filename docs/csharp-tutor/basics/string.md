# 字符串

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/interpolated)

```csharp
public void StringTest1()
{
    // 可以将 string 类型看做是 char 类型的一个只读数组
    string s = "abcdefg";
    s = "bbcdefg";
    // s[0] = 'b'; 不能这样做，因为是只读的

    // 首先将字符串转换为 char 类型的数组
    char[] chs = s.ToCharArray();
    chs[0] = 'b';
    // 将字符数组转换为我们的字符串
    s = new string(chs);

    // 既然可以将 string 看做 char 类型的只读数组，所以我可以通过下标去访问字符串中的某一个元素
    Console.WriteLine(s[0]);
    Console.WriteLine(s);
}
```
