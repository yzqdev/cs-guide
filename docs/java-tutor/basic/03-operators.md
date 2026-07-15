---
title: "运算符与表达式"
order: 3
---

# 运算符与表达式

> 运算符用于对数据进行操作，表达式是由运算符和操作数组成的式子。

## 算术运算符

| 运算符 | 含义 | 示例 | 结果 |
|--------|------|------|------|
| `+` | 加法 | `5 + 3` | `8` |
| `-` | 减法 | `5 - 3` | `2` |
| `*` | 乘法 | `5 * 3` | `15` |
| `/` | 除法 | `5 / 3` | `1`（整数除法） |
| `%` | 取模（求余） | `5 % 3` | `2` |
| `++` | 自增 | `i++` | 先取值后加 1 |
| `--` | 自减 | `--i` | 先减 1 后取值 |

```java
int a = 10, b = 3;
System.out.println(a + b);   // 13
System.out.println(a - b);   // 7
System.out.println(a * b);   // 30
System.out.println(a / b);   // 3（整数除法，小数部分被丢弃）
System.out.println((double) a / b);  // 3.3333...（浮点除法）
System.out.println(a % b);   // 1

// 自增自减
int i = 5;
int j = i++;   // j = 5, i = 6（先取值，后自增）
int k = ++i;   // k = 7, i = 7（先自增，后取值）
```

## 关系运算符

| 运算符 | 含义 | 示例 | 结果 |
|--------|------|------|------|
| `==` | 等于 | `5 == 3` | `false` |
| `!=` | 不等于 | `5 != 3` | `true` |
| `>` | 大于 | `5 > 3` | `true` |
| `<` | 小于 | `5 < 3` | `false` |
| `>=` | 大于等于 | `5 >= 3` | `true` |
| `<=` | 小于等于 | `5 <= 3` | `false` |

```java
int x = 5, y = 10;
boolean result = x < y;   // true
boolean eq = (x == y);    // false

// 字符串比较必须用 equals()，不能用 ==
String s1 = "Hello";
String s2 = "Hello";
System.out.println(s1.equals(s2));  // true（比较值）
System.out.println(s1 == s2);       // true（字面量，常量池优化）
// 对于 new 出来的字符串，== 会返回 false
String s3 = new String("Hello");
System.out.println(s1 == s3);       // false（不同对象）
```

## 逻辑运算符

| 运算符 | 含义 | 示例 | 结果 |
|--------|------|------|------|
| `&&` | 短路与 | `true && false` | `false` |
| `\|\|` | 短路或 | `true \|\| false` | `true` |
| `!` | 非 | `!true` | `false` |
| `&` | 非短路与 | `true & false` | `false` |
| `\|` | 非短路或 | `true \| false` | `true` |
| `^` | 异或 | `true ^ false` | `true` |

### 短路与 &&、短路或 ||

```java
int a = 5, b = 10;

// && 短路：如果左边为 false，右边不再执行
boolean result1 = (a > 10) && (b++ > 5);
System.out.println(b);  // 10（b++ 未执行）

// & 非短路：两边都会执行
boolean result2 = (a > 10) & (b++ > 5);
System.out.println(b);  // 11（b++ 执行了）
```

## 赋值运算符

| 运算符 | 含义 | 示例 | 等价于 |
|--------|------|------|--------|
| `=` | 赋值 | `x = 5` | `x = 5` |
| `+=` | 加后赋值 | `x += 3` | `x = x + 3` |
| `-=` | 减后赋值 | `x -= 3` | `x = x - 3` |
| `*=` | 乘后赋值 | `x *= 3` | `x = x * 3` |
| `/=` | 除后赋值 | `x /= 3` | `x = x / 3` |
| `%=` | 取模后赋值 | `x %= 3` | `x = x % 3` |

```java
int x = 10;
x += 5;   // x = 15
x -= 3;   // x = 12
x *= 2;   // x = 24
x /= 4;   // x = 6
x %= 5;   // x = 1
```

## 位运算符

| 运算符 | 含义 | 示例 |
|--------|------|------|
| `&` | 按位与 | `5 & 3` → `1` |
| `\|` | 按位或 | `5 \| 3` → `7` |
| `^` | 按位异或 | `5 ^ 3` → `6` |
| `~` | 按位取反 | `~5` → `-6` |
| `<<` | 左移 | `5 << 1` → `10` |
| `>>` | 右移（符号位填充） | `5 >> 1` → `2` |
| `>>>` | 无符号右移 | `5 >>> 1` → `2` |

```java
// 位运算的实际应用：权限控制
int READ = 1;    // 001
int WRITE = 2;   // 010
int EXEC = 4;    // 100

int permission = READ | WRITE;  // 011 = 读写权限
boolean canRead = (permission & READ) != 0;   // true
boolean canExec = (permission & EXEC) != 0;   // false
```

## 三元运算符

```java
// 语法: 条件 ? 表达式1 : 表达式2
// 条件为 true 返回表达式1，否则返回表达式2

int age = 20;
String status = (age >= 18) ? "成年" : "未成年";
System.out.println(status);  // "成年"

// 可以嵌套（但不建议，影响可读性）
int a = 10, b = 20;
int max = (a > b) ? a : b;  // 20
```

## instanceof 运算符

用于检查对象是否为某个类型：

```java
String str = "Hello";
boolean isString = str instanceof String;  // true
boolean isObject = str instanceof Object;  // true
boolean isInteger = str instanceof Integer; // false（编译错误？不，运行返回 false）

// 常用于类型判断后做安全转换
Object obj = "Hello";
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}
```

## 运算符优先级

从高到低（上方的优先级高）：

| 优先级 | 运算符 |
|--------|--------|
| 1 | `()` `[]` `.` |
| 2 | `++` `--` `!` `~` |
| 3 | `*` `/` `%` |
| 4 | `+` `-` |
| 5 | `<<` `>>` `>>>` |
| 6 | `<` `<=` `>` `>=` `instanceof` |
| 7 | `==` `!=` |
| 8 | `&` |
| 9 | `^` |
| 10 | `\|` |
| 11 | `&&` |
| 12 | `\|\|` |
| 13 | `?:`（三元） |
| 14 | `=` `+=` `-=` 等赋值运算符 |

:::tip
当不确定优先级时，使用 **小括号 `()`** 明确运算顺序，提高代码可读性。
:::

```java
int result = 5 + 3 * 2;         // 11（* 优先于 +）
int result2 = (5 + 3) * 2;      // 16（括号优先）
```

## 练习

```java
// 1. 计算 BMI
double weight = 70.0;  // kg
double height = 1.75;  // m
double bmi = weight / (height * height);
System.out.println("BMI: " + bmi);

// 2. 判断闰年
int year = 2024;
boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
System.out.println(year + "是闰年吗？" + isLeap);

// 3. 交换两个变量（不使用第三个变量）
int a = 5, b = 10;
a = a ^ b;
b = a ^ b;
a = a ^ b;
System.out.println("a=" + a + ", b=" + b);  // a=10, b=5
```
