---
order: 8
---

# 面向对象编程

[官方文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/fundamentals/object-oriented/)

## 类与对象

类是对象的蓝图，对象是类的实例。

### 定义类

```csharp
// 定义类
class Person
{
    // 字段（field）
    private string _name;
    private int _age;

    // 属性（property）
    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }

    public int Age
    {
        get { return _age; }
        set
        {
            if (value >= 0 && value <= 150)
                _age = value;
            else
                throw new ArgumentException("年龄不合法");
        }
    }

    // 自动属性（auto-property）
    public string Email { get; set; }

    // 只读属性（只有 get）
    public bool IsAdult => Age >= 18;

    // 构造函数
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    // 方法
    public void Introduce()
    {
        Console.WriteLine($"你好，我是{Name}，今年{Age}岁。");
    }
}

// 使用类
Person person = new Person("张三", 25);
person.Email = "zhangsan@example.com";
person.Introduce(); // 你好，我是张三，今年25岁。
Console.WriteLine(person.IsAdult); // True
```

### 对象初始化器

```csharp
class Student
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Grade { get; set; }
}

// 使用对象初始化器（无需写构造函数）
Student stu = new Student
{
    Name = "李四",
    Age = 18,
    Grade = "高三"
};
```

### 构造函数

```csharp
class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }

    // 无参构造函数
    public Product()
    {
        Category = "未分类";
    }

    // 有参构造函数
    public Product(string name, decimal price) : this()
    {
        Name = name;
        Price = price;
    }

    // 使用 this 调用其他构造函数
    public Product(string name, decimal price, string category) : this(name, price)
    {
        Category = category;
    }

    // 静态构造函数（类第一次被使用时执行一次）
    static Product()
    {
        Console.WriteLine("Product 类已初始化");
    }

    // 析构函数（很少用）
    ~Product()
    {
        Console.WriteLine($"Product {Name} 被销毁");
    }
}

// 使用
var p1 = new Product();                       // Category = "未分类"
var p2 = new Product("手机", 2999);            // Category = "未分类"
var p3 = new Product("电脑", 5999, "数码");    // Category = "数码"
```

## 继承

```csharp
// 基类
class Animal
{
    public string Name { get; set; }

    public Animal(string name)
    {
        Name = name;
    }

    // virtual 方法：可以在派生类中重写
    public virtual void Speak()
    {
        Console.WriteLine("动物发出声音");
    }

    public void Eat()
    {
        Console.WriteLine($"{Name} 在吃东西");
    }
}

// 派生类
class Dog : Animal
{
    public Dog(string name) : base(name) // 调用基类构造函数
    {
    }

    // override 重写基类的 virtual 方法
    public override void Speak()
    {
        Console.WriteLine($"{Name} 说：汪汪！");
    }

    // 子类特有的方法
    public void FetchBall()
    {
        Console.WriteLine($"{Name} 跑去捡球");
    }
}

class Cat : Animal
{
    public Cat(string name) : base(name)
    {
    }

    public override void Speak()
    {
        Console.WriteLine($"{Name} 说：喵喵！");
    }
}

// 使用
Dog dog = new Dog("旺财");
Cat cat = new Cat("咪咪");

dog.Speak();     // 旺财 说：汪汪！
cat.Speak();     // 咪咪 说：喵喵！

// 多态：以基类类型引用派生类对象
Animal animal1 = new Dog("小黑");
Animal animal2 = new Cat("小白");

animal1.Speak(); // 小黑 说：汪汪！
animal2.Speak(); // 小白 说：喵喵！

// animal1.FetchBall(); // ❌ 编译错误，Animal 类型没有 FetchBall 方法

// 类型检查与转换
if (animal1 is Dog d)
{
    d.FetchBall(); // 小黑 跑去捡球
}
```

### sealed 类

阻止其他类继承。

```csharp
sealed class FinalClass
{
    // 这个类不能被继承
}

// class Derived : FinalClass { } // ❌ 编译错误
```

### sealed 方法

阻止派生类继续重写该方法。

```csharp
class Base
{
    public virtual void Method() { }
}

class Derived : Base
{
    public sealed override void Method()  // sealed 阻止进一步重写
    {
        Console.WriteLine("这是最终版本");
    }
}

// class MoreDerived : Derived
// {
//     public override void Method() { } // ❌ 编译错误
// }
```

## 抽象类与抽象方法

```csharp
// 抽象类：不能实例化，只能被继承
abstract class Shape
{
    public string Color { get; set; }

    // 抽象方法：没有实现，必须在派生类中重写
    public abstract double GetArea();

    // 普通方法
    public void Display()
    {
        Console.WriteLine($"这是一个{Color}色的图形，面积为{GetArea():F2}");
    }
}

class Circle : Shape
{
    public double Radius { get; set; }

    public Circle(double radius, string color)
    {
        Radius = radius;
        Color = color;
    }

    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }
}

class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height, string color)
    {
        Width = width;
        Height = height;
        Color = color;
    }

    public override double GetArea()
    {
        return Width * Height;
    }
}

// 使用
// Shape shape = new Shape(); // ❌ 不能实例化抽象类

Circle circle = new Circle(5, "红色");
Rectangle rect = new Rectangle(4, 6, "蓝色");

circle.Display(); // 这是一个红色的图形，面积为78.54
rect.Display();   // 这是一个蓝色的图形，面积为24.00

// 多态
List<Shape> shapes = new List<Shape>
{
    new Circle(3, "绿色"),
    new Rectangle(2, 8, "黄色"),
    new Circle(4, "紫色")
};

foreach (Shape shape in shapes)
{
    Console.WriteLine(shape.GetArea());
}
```

## 接口

接口定义了一组方法签名，不包含实现。类可以实现多个接口。

```csharp
// 定义接口
interface IFlyable
{
    void Fly(); // 接口方法默认是 public abstract
}

interface ISwimmable
{
    void Swim();
}

// 实现接口
class Duck : IFlyable, ISwimmable // 可以实现多个接口
{
    public string Name { get; set; }

    public Duck(string name)
    {
        Name = name;
    }

    public void Fly()
    {
        Console.WriteLine($"{Name} 在飞翔");
    }

    public void Swim()
    {
        Console.WriteLine($"{Name} 在游泳");
    }
}

class Airplane : IFlyable
{
    public void Fly()
    {
        Console.WriteLine("飞机在飞行");
    }
}

// 使用
Duck duck = new Duck("唐老鸭");
Airplane plane = new Airplane();

duck.Fly();   // 唐老鸭 在飞翔
duck.Swim();  // 唐老鸭 在游泳
plane.Fly();  // 飞机在飞行

// 接口多态
List<IFlyable> flyables = new List<IFlyable> { duck, plane };
foreach (IFlyable f in flyables)
{
    f.Fly();
}
```

### 接口默认实现（C# 8+）

```csharp
interface ILogger
{
    void Log(string message);

    // 默认实现
    void LogError(string error)
    {
        Log($"[ERROR] {error}");
    }

    void LogWarning(string warning)
    {
        Log($"[WARNING] {warning}");
    }
}

class ConsoleLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] {message}");
    }
    // 不需要实现 LogError 和 LogWarning
}

// 使用
ILogger logger = new ConsoleLogger();
logger.Log("系统启动");
logger.LogError("文件未找到");
logger.LogWarning("磁盘空间不足");
```

## 静态成员

```csharp
class MathUtilities
{
    // 静态字段
    public static readonly double PI = 3.14159;

    // 静态方法
    public static double CircleArea(double radius)
    {
        return PI * radius * radius;
    }

    public static double Distance(double x1, double y1, double x2, double y2)
    {
        return Math.Sqrt(Math.Pow(x2 - x1, 2) + Math.Pow(y2 - y1, 2));
    }

    // 静态属性
    public static string Version { get; } = "1.0.0";
}

// 静态类：不能被实例化，所有成员都是静态的
static class AppConfig
{
    public static string AppName { get; set; } = "MyApp";
    public static string Version { get; set; } = "1.0.0";
    public static bool IsDebug { get; set; } = false;

    public static void PrintInfo()
    {
        Console.WriteLine($"{AppName} v{Version}");
    }
}

// 使用静态成员
double area = MathUtilities.CircleArea(5);
Console.WriteLine($"面积：{area:F2}"); // 面积：78.54

double dist = MathUtilities.Distance(0, 0, 3, 4);
Console.WriteLine($"距离：{dist}"); // 距离：5

AppConfig.IsDebug = true;
Console.WriteLine(AppConfig.AppName);
```

## 属性与索引器

### 属性高级用法

```csharp
class Employee
{
    // 自动属性
    public string Name { get; set; }

    // 只读自动属性（只能在构造函数中赋值）
    public DateTime HireDate { get; }

    // 计算属性（只有 getter，没有 setter）
    public int YearsWorked => (DateTime.Now - HireDate).Days / 365;

    // 带验证的属性
    private decimal _salary;
    public decimal Salary
    {
        get => _salary;
        set
        {
            if (value < 0)
                throw new ArgumentException("工资不能为负");
            _salary = value;
        }
    }

    // private set
    public int Id { get; private set; }

    // init setter（C# 9+，只能在初始化时赋值）
    public string Department { get; init; }

    public Employee(int id, string name)
    {
        Id = id;
        Name = name;
        HireDate = DateTime.Now;
    }
}

// 使用
Employee emp = new Employee(1, "张三")
{
    Department = "技术部",  // init setter 只能在初始化器赋值
    Salary = 10000
};
// emp.Department = "市场部"; // ❌ init setter 不能在之后赋值
```

### 索引器

```csharp
class WeekDays
{
    private string[] _days =
    {
        "星期一", "星期二", "星期三", "星期四",
        "星期五", "星期六", "星期日"
    };

    // 索引器：允许像数组一样通过下标访问
    public string this[int index]
    {
        get
        {
            if (index < 0 || index >= _days.Length)
                throw new IndexOutOfRangeException();
            return _days[index];
        }
    }

    // 通过名称查找索引
    public int this[string name]
    {
        get
        {
            int index = Array.IndexOf(_days, name);
            if (index == -1)
                throw new ArgumentException("无效的星期名称");
            return index;
        }
    }
}

WeekDays week = new WeekDays();
Console.WriteLine(week[0]);   // 星期一
Console.WriteLine(week[6]);   // 星期日
Console.WriteLine(week["星期三"]); // 2
```

## Record 类型（C# 9+）

Record 是一种引用类型，默认具有值语义，适合不可变数据。

```csharp
// 定义 record（位置语法）
public record PersonRecord(string Name, int Age);

// 传统语法
public record StudentRecord
{
    public string Name { get; init; }
    public int Age { get; init; }
    public string Grade { get; init; }
}

// 使用
var p1 = new PersonRecord("张三", 25);
var p2 = new PersonRecord("张三", 25);

Console.WriteLine(p1);              // PersonRecord { Name = 张三, Age = 25 }
Console.WriteLine(p1 == p2);        // True（值相等，不是引用相等）

// with 表达式创建副本（非破坏性修改）
var p3 = p1 with { Age = 30 };
Console.WriteLine(p3);              // PersonRecord { Name = 张三, Age = 30 }
```

## 实际案例：员工管理系统

```csharp
// 接口
interface IWorkable
{
    void Work();
    double CalculateSalary();
}

// 抽象基类
abstract class EmployeeBase : IWorkable
{
    public int Id { get; init; }
    public string Name { get; set; }
    public DateTime HireDate { get; init; }

    protected EmployeeBase(int id, string name)
    {
        Id = id;
        Name = name;
        HireDate = DateTime.Now;
    }

    public abstract void Work();
    public abstract double CalculateSalary();

    public int YearsWorked => (DateTime.Now - HireDate).Days / 365;

    public override string ToString()
    {
        return $"{GetType().Name}: {Name}（工号{Id}）";
    }
}

// 经理类
class Manager : EmployeeBase
{
    public double BaseSalary { get; set; } = 15000;
    public double Bonus { get; set; }

    public Manager(int id, string name) : base(id, name) { }

    public override void Work()
    {
        Console.WriteLine($"{Name} 在管理团队，制定计划");
    }

    public override double CalculateSalary()
    {
        return BaseSalary + Bonus;
    }
}

// 开发人员类
class Developer : EmployeeBase
{
    public double HourlyRate { get; set; } = 200;
    public int HoursWorked { get; set; }

    public Developer(int id, string name) : base(id, name) { }

    public override void Work()
    {
        Console.WriteLine($"{Name} 在写代码");
    }

    public override double CalculateSalary()
    {
        return HourlyRate * HoursWorked;
    }
}

// 使用
var manager = new Manager(1, "李经理")
{
    Bonus = 5000
};

var developer = new Developer(2, "王开发")
{
    HourlyRate = 250,
    HoursWorked = 160
};

List<IWorkable> employees = new() { manager, developer };

foreach (var emp in employees)
{
    Console.WriteLine(emp);  // 调用 ToString()
    emp.Work();
    Console.WriteLine($"工资：{emp.CalculateSalary():C}");
    Console.WriteLine();
}
// 输出：
// Manager: 李经理（工号1）
// 李经理 在管理团队，制定计划
// 工资：¥20,000.00
//
// Developer: 王开发（工号2）
// 王开发 在写代码
// 工资：¥40,000.00
```