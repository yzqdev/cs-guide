# C# 开发技巧

<Catalog />

## 目录

| 文件 | 内容 |
|------|------|
| [数组操作](./array.md) | C# 数组声明、初始化、循环遍历 |
| [字符串操作](./string.md) | 逐字字符串、原始字符串、字符串内插 |
| [WebAPI](./webapi.md) | ASP.NET Core WebAPI 入门与最佳实践 |

## 资源链接

- 源码查看：https://referencesource.microsoft.com/
- .NET 文档：https://learn.microsoft.com/zh-cn/dotnet/

## 快速参考

```csharp
// 常用 using
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// 顶级语句（C# 9+）
Console.WriteLine("Hello, C#!");

// 记录类型（C# 9+）
public record Person(string Name, int Age);

// 模式匹配
string GetGrade(int score) => score switch
{
    >= 90 => "优秀",
    >= 60 => "及格",
    _ => "不及格"
};
```
