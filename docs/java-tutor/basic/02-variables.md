---
title: "变量与数据类型"
order: 2
---

# 变量与数据类型

> 变量是程序中存储数据的基本单元，Java 是一种强类型语言，每个变量都必须声明类型。

## 变量声明

```java
// 语法: 类型 变量名 = 初始值;
int age = 25;            // 声明整数变量
double price = 19.99;    // 声明浮点变量
String name = "张三";    // 声明字符串变量
boolean isActive = true; // 声明布尔变量

// 可以先声明，再赋值
int count;
count = 10;

// 可以同时声明多个同类型变量
int a = 1, b = 2, c = 3;
```

## 基本数据类型（8 种）

Java 的基本数据类型分为四大类：

### 整数类型（4 种）

| 类型 | 占用 | 范围 | 默认值 | 示例 |
|------|------|------|--------|------|
| `byte` | 1 字节 | -128 ~ 127 | 0 | `byte b = 100;` |
| `short` | 2 字节 | -32,768 ~ 32,767 | 0 | `short s = 1000;` |
| `int` | 4 字节 | -2^31 ~ 2^31-1 | 0 | `int i = 100000;` |
| `long` | 8 字节 | -2^63 ~ 2^63-1 | 0L | `long l = 100000L;` |

```java
// 整数字面量
int decimal = 100;       // 十进制
int octal = 0144;        // 八进制（以 0 开头）
int hex = 0x64;          // 十六进制（以 0x 开头）
int binary = 0b1100100;  // 二进制（以 0b 开头，Java 7+）
int withUnderscore = 1_000_000;  // 下划线分隔（Java 7+）

// long 类型需要 L 后缀（大小写均可，建议大写）
long longValue = 10000000000L;
```

### 浮点类型（2 种）

| 类型 | 占用 | 范围 | 默认值 | 示例 |
|------|------|------|--------|------|
| `float` | 4 字节 | ±3.4E-38 ~ ±3.4E+38 | 0.0f | `float f = 3.14f;` |
| `double` | 8 字节 | ±4.9E-324 ~ ±1.7E+308 | 0.0d | `double d = 3.14;` |

```java
// float 需要 F/f 后缀
float price = 19.99F;
float scientific = 1.23e-4f;  // 科学计数法

// double 是默认的浮点类型（D/d 后缀可选）
double pi = 3.14159265358979;
double scientific = 1.23e-4;
```

:::warning
浮点数不适合精确计算（如金额），应使用 `BigDecimal`。因为浮点数存在精度丢失问题：

```java
double result = 0.1 + 0.2;  // 0.30000000000000004（不是精确的 0.3）
```
:::

### 字符类型（1 种）

```java
char c = 'A';       // 用单引号
char ch = 65;       // Unicode 编码，输出 A
char uni = '\u0041'; // Unicode 转义，输出 A
char tab = '\t';    // 转义字符：制表符
char newline = '\n'; // 转义字符：换行
```

**常见转义字符：**

| 转义符 | 含义 |
|--------|------|
| `\n` | 换行 |
| `\t` | 制表符（Tab） |
| `\\` | 反斜杠 |
| `\'` | 单引号 |
| `\"` | 双引号 |
| `\r` | 回车 |

### 布尔类型（1 种）

```java
boolean isJavaFun = true;
boolean isHard = false;

// 布尔值常用于条件判断
if (isJavaFun) {
    System.out.println("Java is fun!");
}
```

## 类型转换

### 自动类型转换（隐式转换）

小范围类型可以自动转换为大范围类型：

```java
byte → short → int → long → float → double
                ↑
              char

// 示例
int i = 100;
long l = i;      // int → long ✅
float f = l;     // long → float ✅
double d = f;    // float → double ✅
```

### 强制类型转换（显式转换）

大范围类型转小范围类型需要强制转换，可能丢失精度：

```java
double pi = 3.14159;
int intPi = (int) pi;  // 3（精度丢失）

long big = 100000L;
int small = (int) big; // 若超出 int 范围，数据会溢出
```

### 表达式中的类型提升

```java
byte a = 10;
byte b = 20;
// int c = a + b;       // ✅ byte 运算时自动提升为 int
int c = a + b;
```

## 包装类（Wrapper Class）

每个基本类型都有对应的包装类，用于在需要对象的场景下使用：

| 基本类型 | 包装类 | 示例 |
|----------|--------|------|
| `byte` | `Byte` | `Byte b = 100;` |
| `short` | `Short` | `Short s = 1000;` |
| `int` | `Integer` | `Integer i = 100;` |
| `long` | `Long` | `Long l = 100L;` |
| `float` | `Float` | `Float f = 3.14f;` |
| `double` | `Double` | `Double d = 3.14;` |
| `char` | `Character` | `Character c = 'A';` |
| `boolean` | `Boolean` | `Boolean b = true;` |

### 自动装箱与拆箱

```java
// 自动装箱（基本类型 → 包装类）
Integer i = 100;  // 等价于 Integer.valueOf(100)

// 自动拆箱（包装类 → 基本类型）
int n = i;        // 等价于 i.intValue()
```

## 变量作用域

```java
public class ScopeDemo {
    // 成员变量（类内部可见）
    int instanceVar = 10;

    public void method() {
        // 局部变量（方法内部可见）
        int localVar = 20;

        if (true) {
            // 块变量（代码块内可见）
            int blockVar = 30;
            System.out.println(blockVar);  // ✅
        }
        // System.out.println(blockVar);   // ❌ 块外不可见
    }
}
```

## 常量

使用 `final` 关键字声明常量，赋值后不可修改：

```java
final double PI = 3.14159;
final int MAX_SIZE = 100;

// PI = 3.14;  // ❌ 编译错误，常量不可修改

// 类常量（使用 static final）
public static final String APP_NAME = "MyApp";
```

## 练习

```java
// 1. 声明各种类型的变量
int myAge = 25;
double myHeight = 175.5;
String myName = "张三";
boolean isStudent = true;

// 2. 类型转换练习
double d = 100.5;
int i = (int) d;  // 100

// 3. 计算圆的面积
final double PI = 3.14159;
double radius = 5.0;
double area = PI * radius * radius;
System.out.println("面积: " + area);
```
