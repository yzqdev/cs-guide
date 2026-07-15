---
title: "字符串"
order: 4
---

# 字符串

> Java 中使用 `java.lang.String` 类表示字符串。String 是不可变对象，一旦创建就不能修改。

## 创建字符串

```java
// 方式一：字符串字面量（推荐）
String s1 = "Hello";

// 方式二：使用 new 关键字（不推荐，会创建新对象）
String s2 = new String("Hello");

// 方式三：字符数组
char[] chars = {'H', 'e', 'l', 'l', 'o'};
String s3 = new String(chars);

// 方式四：字节数组
byte[] bytes = {72, 101, 108, 108, 111};
String s4 = new String(bytes);
```

## 字符串常量池

```java
String a = "Hello";            // 从常量池获取
String b = "Hello";            // 复用常量池中的对象
String c = new String("Hello"); // 强制创建新对象

System.out.println(a == b);    // true（指向同一个常量池对象）
System.out.println(a == c);    // false（不同对象）
System.out.println(a.equals(c)); // true（值相等）
```

## 常用方法

### 基本操作

```java
String str = "Hello, Java!";

// 长度
int len = str.length();           // 12

// 按索引获取字符
char ch = str.charAt(1);          // 'e'

// 判断是否为空
boolean empty = str.isEmpty();    // false
boolean blank = str.isBlank();    // false（Java 11+，忽略空白字符）
```

### 比较

```java
String s1 = "Hello";
String s2 = "hello";

s1.equals(s2);                          // false（区分大小写）
s1.equalsIgnoreCase(s2);                // true（忽略大小写）
s1.compareTo("Hello");                  // 0（相等返回 0）
s1.compareToIgnoreCase("hello");        // 0
s1.startsWith("He");                    // true
s1.endsWith("lo");                      // true
```

### 查找

```java
String str = "Hello, Java! Java is fun.";

str.indexOf("Java");              // 7（首次出现位置）
str.lastIndexOf("Java");          // 14（最后出现位置）
str.indexOf("Java", 10);          // 14（从索引 10 开始查找）
str.contains("Java");             // true
```

### 截取与拼接

```java
String str = "Hello, Java!";

// 截取
str.substring(7);                 // "Java!"（从索引 7 到末尾）
str.substring(7, 11);             // "Java"（[7, 11) 左闭右开）

// 拼接
String s = "Hello" + " " + "World";     // 使用 + 号
String s2 = "Hello".concat(", ").concat("World");  // 使用 concat

// 重复（Java 11+）
"Ha".repeat(3);                    // "HaHaHa"

// 拼接数组
String joined = String.join(", ", "A", "B", "C");  // "A, B, C"
```

### 替换

```java
String str = "Java is great";

str.replace('a', 'o');            // "Jovo is greot"
str.replace("Java", "Kotlin");    // "Kotlin is great"
str.replaceAll("\\s", "-");       // "Java-is-great"（支持正则）
str.replaceFirst("a", "o");       // "Jova is great"
```

### 分割

```java
String str = "apple,banana,orange";
String[] fruits = str.split(",");    // ["apple", "banana", "orange"]

// 限制分割次数
String[] parts = str.split(",", 2);  // ["apple", "banana,orange"]
```

### 大小写转换

```java
"Hello".toUpperCase();    // "HELLO"
"Hello".toLowerCase();    // "hello"
```

### 去除空白

```java
String str = "  Hello, World!  ";
str.trim();                    // "Hello, World!"（去除首尾空白）
str.strip();                   // "Hello, World!"（Java 11+，支持 Unicode）
str.stripLeading();            // "Hello, World!  "
str.stripTrailing();           // "  Hello, World!"
```

### 判断是否为空

```java
String str = "  ";
str.isEmpty();      // false（长度为 0 才为 true）
str.isBlank();      // true（Java 11+，空白字符也算 blank）
```

### 转换

```java
// 字符串 ↔ 数字
int num = Integer.parseInt("123");     // String → int
double d = Double.parseDouble("3.14"); // String → double
String s = String.valueOf(123);        // int → String
String s2 = Integer.toString(456);     // int → String

// 字符串 ↔ 字符数组
char[] chars = "Hello".toCharArray();
String str = new String(chars);

// 字符串 ↔ 字节数组
byte[] bytes = "Hello".getBytes("UTF-8");
String str2 = new String(bytes, "UTF-8");
```

## StringBuilder 与 StringBuffer

String 是不可变的，频繁拼接字符串时会产生大量临时对象，影响性能。此时应使用 `StringBuilder`（非线程安全，更快）或 `StringBuffer`（线程安全）。

```java
// 场景：拼接 10000 个数字
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i;  // ❌ 每次循环会创建新的 String 对象，性能极差
}
```

```java
// ✅ 使用 StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);
}
String result = sb.toString();

// 常用方法
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");          // 追加
sb.insert(5, ",");            // 指定位置插入
sb.replace(0, 5, "Hi");      // 替换范围
sb.delete(0, 2);              // 删除范围
sb.reverse();                 // 反转
int len = sb.length();        // 长度
```

| 特性 | String | StringBuilder | StringBuffer |
|------|--------|---------------|-------------|
| 可变性 | 不可变 | 可变 | 可变 |
| 线程安全 | 安全（不可变） | 不安全 | 安全（synchronized） |
| 性能 | 差（拼接时） | 最好 | 较好 |
| 推荐场景 | 不频繁修改 | 单线程频繁操作 | 多线程频繁操作 |

## 格式化字符串

```java
// String.format()
String msg = String.format("姓名: %s, 年龄: %d, 身高: %.1f",
        "张三", 25, 175.5);
// "姓名: 张三, 年龄: 25, 身高: 175.5"

// 常用格式化符号
// %s — 字符串
// %d — 整数
// %f — 浮点数
// %x — 十六进制
// %t — 日期时间
// %n — 换行符

// printf 直接输出
System.out.printf("PI = %.2f%n", 3.14159);  // PI = 3.14
```

## 文本块（Java 13+）

```java
// 传统方式 — 需要处理换行和引号
String html = "<html>\n" +
              "    <body>\n" +
              "        <p>Hello</p>\n" +
              "    </body>\n" +
              "</html>";

// 文本块方式（Java 13+）
String html = """
              <html>
                  <body>
                      <p>Hello</p>
                  </body>
              </html>
              """;
```

## 练习

```java
// 1. 反转字符串
String original = "Hello";
String reversed = new StringBuilder(original).reverse().toString();
System.out.println(reversed);  // "olleH"

// 2. 统计字符串中某个字符出现的次数
String str = "Hello, Java!";
long count = str.chars().filter(ch -> ch == 'a').count();
System.out.println("a 出现次数: " + count);

// 3. 验证邮箱格式
String email = "user@example.com";
boolean isValid = email.contains("@") && email.contains(".")
        && email.indexOf("@") < email.lastIndexOf(".");
System.out.println("邮箱格式: " + (isValid ? "有效" : "无效"));
```
