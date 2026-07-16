---
order: 6
---

# C# 开发实用笔记

本文档整理 C# 学习与开发过程中的常见知识点和注意事项。

## 命名空间

命名空间用于组织类，类似于 Java 的包。

```csharp
// 类属于命名空间，使用 using 导入
using System;
using System.Collections.Generic;

namespace MyApp.Models
{
    public class User { }
}

// 导入方式
// 1. 在文件顶部写 using 语句
// 2. 在 VS 中鼠标悬停 → 灯泡图标 → 引入
// 3. 快捷键：Alt+Shift+F10 → 自动导入
// 4. 手动输入完整命名空间
```

### 跨项目引用

1. 添加项目引用：右键依赖项 → 添加项目引用
2. 引用目标项目的命名空间

## 值类型与引用类型

### 区别

| 特性 | 值类型 | 引用类型 |
|------|--------|----------|
| 存储位置 | 栈（Stack） | 堆（Heap） |
| 传递方式 | 值传递（复制） | 引用传递（共享） |
| 默认值 | 0 / false / '\0' | null |

### 类型分类

| 类型 | 分类 |
|------|------|
| **值类型** | `int`, `double`, `bool`, `char`, `decimal`, `struct`, `enum` |
| **引用类型** | `string`, 数组, 自定义类, `interface`, `object`, 集合 |

```csharp
// 值类型：赋值时复制数据
int a = 10;
int b = a;     // b 是 a 的副本
b = 20;
Console.WriteLine(a); // 10（不受影响）

// 引用类型：赋值时复制引用
int[] arr1 = { 1, 2, 3 };
int[] arr2 = arr1;   // 指向同一个数组
arr2[0] = 99;
Console.WriteLine(arr1[0]); // 99（受影响）
```

## 字符串

### 不可变性

字符串一旦创建，内容不可改变。任何修改操作都会创建新字符串。

```csharp
string s1 = "Hello";
string s2 = s1.ToUpper(); // 返回新字符串，s1 不变

Console.WriteLine(s1); // Hello
Console.WriteLine(s2); // HELLO
```

### 字符串与字符数组

```csharp
string text = "Hello";

// 字符串 → char 数组（允许修改）
char[] chars = text.ToCharArray();
chars[0] = 'h';

// char 数组 → 字符串
string modified = new string(chars);
Console.WriteLine(modified); // hello

// 字符串可通过索引访问（只读）
Console.WriteLine(text[0]);  // H
// text[0] = 'h';            // ❌ 编译错误
```

### 常用字符串方法

```csharp
string str = "  Hello, World!  ";

int len = str.Length;                    // 长度
string upper = str.ToUpper();            // 大写化
string lower = str.ToLower();            // 小写化
bool eq = str.Equals("hello", StringComparison.OrdinalIgnoreCase); // 忽略大小写比较

string[] parts = str.Split(',');         // 分割
string sub = str.Substring(2, 5);        // 截取
int idx = str.IndexOf("World");          // 查找位置（-1 表示未找到）
int lastIdx = str.LastIndexOf("o");      // 最后一次出现位置

bool starts = str.StartsWith("  He");    // 以...开头
bool ends = str.EndsWith("!  ");         // 以...结尾
string replaced = str.Replace("World", "C#"); // 替换
bool contains = str.Contains("Hello");    // 是否包含

string trimmed = str.Trim();             // 去除首尾空格
string trimStart = str.TrimStart();      // 去除开头空格
string trimEnd = str.TrimEnd();          // 去除结尾空格

bool isNullOrEmpty = string.IsNullOrEmpty(str);   // 是否为空或 null
string joined = string.Join(", ", new[] { "A", "B", "C" }); // 拼接
```

## 继承

### 基础概念

把多个类中重复的成员提取到父类中，子类通过继承获得父类的成员。

```csharp
// 父类（基类）
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public void Introduce() => Console.WriteLine($"我是{Name}");
}

// 子类（派生类）
class Student : Person
{
    public string Grade { get; set; }
}

class Teacher : Person
{
    public string Subject { get; set; }
}
```

### 继承的要点

- 子类继承父类的**属性和方法**（非 `private` 成员）
- 子类**不继承**父类的私有字段
- 子类**不继承**父类的构造函数
- 子类默认调用父类的**无参数构造函数**

```csharp
class Animal
{
    public string Name { get; set; }

    public Animal() { }                    // 无参构造函数
    public Animal(string name)             // 有参构造函数
    {
        Name = name;
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name)   // 显式调用父类构造函数
    {
    }
}
```

### 继承的特性

1. **单根性**：一个子类只能有一个直接父类
2. **传递性**：子类继承父类，父类继承祖父类，祖孙类具有所有祖先的成员

### 查看类图

在 Visual Studio 中：右键项目 → 查看 → 类图（Class Diagram）

### object — 所有类的基类

`System.Object` 是所有类型的最终基类，提供：

```csharp
object obj = new Student();
Type type = obj.GetType();     // 获取运行时类型
bool equal = obj.Equals(obj);  // 比较
int hash = obj.GetHashCode();  // 哈希码
string str = obj.ToString();   // 字符串表示
```

## new 关键字

```csharp
// 1. 创建对象
Person p = new Person();

// 2. 隐藏父类同名成员
class Base
{
    public void Method() { }
}
class Derived : Base
{
    public new void Method() { } // 隐藏基类方法
}
```

## 装箱与拆箱

```csharp
int num = 42;

// 装箱：值类型 → 引用类型（耗性能）
object boxed = num;

// 拆箱：引用类型 → 值类型（需显式转换）
int unboxed = (int)boxed;
```

> 判断是否发生装箱/拆箱：看两种类型是否存在**继承关系**。

通常会引发装箱/拆箱的操作：
- `ArrayList` 和 `Hashtable`（旧集合，存储 object）→ 应使用 `List<T>` 和 `Dictionary<TKey, TValue>`

## 多态的两种实现

### 虚方法（virtual / override）

```csharp
class Animal
{
    public virtual void Speak() => Console.WriteLine("动物叫声");
}
class Dog : Animal
{
    public override void Speak() => Console.WriteLine("汪汪！");
}

// 多态调用
Animal a = new Dog();
a.Speak(); // 汪汪！（运行时确定具体实现）
```

### 抽象类（abstract）

```csharp
abstract class Shape
{
    public abstract double GetArea(); // 抽象方法：无实现
}
class Circle : Shape
{
    public double Radius { get; set; }
    public override double GetArea() => Math.PI * Radius * Radius;
}
```

## out / ref / params

### out 参数

用于方法返回多个不同类型的值，调用方无需初始化，被调用方必须赋值。

```csharp
bool TryDivide(int a, int b, out int result)
{
    if (b == 0)
    {
        result = 0;
        return false;
    }
    result = a / b;
    return true;
}
```

### ref 参数

将变量传入方法中修改，修改后带出。调用方必须初始化。

```csharp
void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}

int x = 5, y = 10;
Swap(ref x, ref y);
```

### params 可变参数

```csharp
int Sum(params int[] numbers)
{
    int total = 0;
    foreach (int n in numbers) total += n;
    return total;
}

Console.WriteLine(Sum(1, 2, 3));     // 6
Console.WriteLine(Sum(1, 2, 3, 4));  // 10
```

> `params` 参数必须是方法参数的**最后一个**。

## 方法的重载

方法名相同，参数列表不同（参数类型不同 或 参数数量不同）。

```csharp
class Calc
{
    public int Add(int a, int b) => a + b;
    public double Add(double a, double b) => a + b;  // 参数类型不同
    public int Add(int a, int b, int c) => a + b + c; // 参数数量不同

    // ❌ 重载跟返回值无关
    // public double Add(int a, int b) => a + b; // 编译错误
}
```

## 方法的递归

方法自己调用自己。

```csharp
// 阶乘
int Factorial(int n)
{
    if (n <= 1) return 1;
    return n * Factorial(n - 1);
}

// 遍历文件夹
void FindAllFiles(string path)
{
    foreach (string file in Directory.GetFiles(path))
        Console.WriteLine(file);

    foreach (string dir in Directory.GetDirectories(path))
        FindAllFiles(dir); // 递归调用
}
```

## 访问修饰符

| 修饰符 | 范围 | 说明 |
|--------|------|------|
| `public` | 任何地方 | 公开访问 |
| `private` | 仅当前类 | 默认的类成员访问级别 |
| `protected` | 当前类 + 派生类 | 受保护的 |
| `internal` | 当前项目 | 程序集内访问 |
| `protected internal` | 当前项目 + 派生类 | 并集 |

> 类级别的访问修饰符只有两种：`public` 和 `internal`（默认）

## 常用关键字速查

| 关键字 | 用途 |
|--------|------|
| `this` | 当前类的对象 / 调用自己的构造函数 |
| `base` | 调用父类的成员 |
| `new` | 创建对象 / 隐藏父类成员 |
| `virtual` | 标记方法可被重写 |
| `override` | 重写父类的虚方法 |
| `abstract` | 抽象类或抽象方法 |
| `sealed` | 密封类（禁止继承） |
| `partial` | 分部类（拆分到多个文件） |
| `static` | 静态成员（属于类型本身） |
| `const` | 编译时常量 |
| `readonly` | 运行时常量（可在构造函数赋值） |
| `interface` | 接口 |
| `struct` | 结构体 |
| `enum` | 枚举 |

## 集合类型

```csharp
// 非泛型（旧，不推荐，有装箱问题）
ArrayList list = new ArrayList();
Hashtable table = new Hashtable();

// 泛型（推荐）
List<int> numbers = new List<int>();
Dictionary<string, int> scores = new Dictionary<string, int>();
```

## 结构与类的区别

| 对比项 | 结构体（struct） | 类（class） |
|--------|------------------|-------------|
| 类型 | 值类型 | 引用类型 |
| 构造函数 | 有无参默认构造，写新构造后默认还在 | 写新构造后默认构造被覆盖 |
| 构造函数要求 | 必须给所有字段赋值 | 无限制 |
| 继承 | 不能继承类/被继承 | 支持单继承 |
| 默认成员访问 | `private` | `private` |

```csharp
// 结构体构造函数特点
struct Point
{
    public int X;
    public int Y;

    // 在构造函数中必须给所有字段赋值
    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
    // 默认无参构造函数仍然存在（类中不存在）
}
```

> 结构体不具备面向对象的全部特征，它更多用于表示轻量级数据结构。
> 如果不创建结构体对象（不使用 new），则不能调用其非静态方法。

## 语法糖

### 范围运算符 `..`

```csharp
int[] numbers = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
int[] slice = numbers[2..5];  // { 2, 3, 4 }
Console.WriteLine(string.Join(", ", slice));
```

### 字符串操作优化

```csharp
string text = "fwobz the fwutzle";

// ❌ 每次 Substring 都会分配新字符串
string s1 = text.Substring(10) + "---" + text.Substring(0, 5);

// ✅ 使用 AsSpan 避免临时字符串分配
string s2 = string.Concat(text.AsSpan(10), "---", text.AsSpan(0, 5));
```

## 资源释放

```csharp
// 使用 using 确保资源自动释放
using (var reader = new StreamReader("file.txt"))
{
    string content = reader.ReadToEnd();
}

// using 声明（C# 8+）
using var writer = new StreamWriter("output.txt");
writer.WriteLine("Hello");
// 方法结束时自动释放
```
