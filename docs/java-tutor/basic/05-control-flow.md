---
title: "流程控制"
order: 5
---

# 流程控制

> 流程控制决定了程序的执行路径。Java 支持条件判断、循环和分支跳转。

## 条件判断

### if 语句

```java
if (条件) {
    // 条件为 true 时执行
}
```

```java
int score = 85;

// 单分支
if (score >= 60) {
    System.out.println("及格");
}

// 双分支
if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}

// 多分支
if (score >= 90) {
    System.out.println("优秀");
} else if (score >= 80) {
    System.out.println("良好");
} else if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}
```

### if 的注意事项

```java
// 常见的坑：赋值 = 与比较 ==
boolean flag = false;
if (flag = true) {   // ❌ 这是赋值，永远为 true！
    // ...
}

// 推荐写法：常量放左边，避免误写
if (true == flag) {  // 即使少写一个 =，编译会报错
    // ...
}
```

## switch 语句

### 传统 switch

```java
int day = 3;
String dayName;

switch (day) {
    case 1:
        dayName = "周一";
        break;
    case 2:
        dayName = "周二";
        break;
    case 3:
        dayName = "周三";
        break;
    case 4:
        dayName = "周四";
        break;
    case 5:
        dayName = "周五";
        break;
    case 6:
    case 7:
        dayName = "周末";
        break;
    default:
        dayName = "无效";
        break;
}
System.out.println(dayName);  // "周三"
```

:::warning
不要忘记 `break`！否则会"穿透"（fall-through）执行下一个 case。
:::

### switch 支持的类型

- `byte`, `short`, `int`, `char`
- `String`（Java 7+）
- 枚举（Enum）
- `var`（如果类型推导为以上类型）

```java
// String switch（Java 7+）
String fruit = "apple";
switch (fruit) {
    case "apple":
        System.out.println("苹果");
        break;
    case "banana":
        System.out.println("香蕉");
        break;
    default:
        System.out.println("未知水果");
        break;
}
```

### switch 表达式（Java 12+）

```java
// 箭头语法 → 每个分支末尾自动 break
String result = switch (day) {
    case 1 -> "周一";
    case 2 -> "周二";
    case 3 -> "周三";
    case 4 -> "周四";
    case 5 -> "周五";
    case 6, 7 -> "周末";
    default -> "无效";
};

// 带代码块的写法
String result = switch (day) {
    case 1 -> { yield "周一"; }
    case 2 -> { yield "周二"; }
    default -> "其他";
};
```

## 循环

### while 循环

```java
// 先判断，后执行
int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;
}
// 输出: 1 2 3 4 5
```

### do-while 循环

```java
// 先执行一次，再判断（至少执行一次）
int i = 1;
do {
    System.out.println(i);
    i++;
} while (i <= 5);
```

### for 循环

```java
// 语法: for (初始化; 条件; 迭代) { ... }

// 标准 for 循环
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
// 输出: 0 1 2 3 4

// 多个变量
for (int i = 0, j = 10; i < j; i++, j--) {
    System.out.println("i=" + i + ", j=" + j);
}

// 死循环
// for (;;) { System.out.println("无限循环"); }
```

### 增强 for 循环（for-each）

```java
// 遍历数组或集合
int[] numbers = {10, 20, 30, 40, 50};
for (int num : numbers) {
    System.out.println(num);
}

// 遍历 List
List<String> names = Arrays.asList("张三", "李四", "王五");
for (String name : names) {
    System.out.println(name);
}
```

## break 与 continue

```java
// break — 终止整个循环
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // 当 i=5 时跳出循环
    }
    System.out.print(i + " ");
}
// 输出: 1 2 3 4

// continue — 跳过本次循环，进入下一次
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;  // 跳过偶数
    }
    System.out.print(i + " ");
}
// 输出: 1 3 5 7 9
```

### 标签（Label）

Java 支持使用标签跳出外层循环（类似 goto 但更规范）：

```java
// 跳出外层循环
outer: for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == 2 && j == 2) {
            break outer;  // 跳出 outer 标记的循环
        }
        System.out.println("(" + i + "," + j + ")");
    }
}
// 输出: (1,1) (1,2) (1,3) (2,1)

// continue 也可以配合标签
outer: for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i == 1) {
            continue outer;  // 跳过 i=1 的所有内层循环
        }
        System.out.println("(" + i + "," + j + ")");
    }
}
```

## return

`return` 用于结束方法，可以带返回值：

```java
// 无返回值方法
public void sayHello(String name) {
    if (name == null) {
        return;  // 提前结束方法
    }
    System.out.println("Hello, " + name);
}

// 带返回值的方法
public int max(int a, int b) {
    return a > b ? a : b;
}
```

## 综合示例

```java
// 打印 9×9 乘法表
public class MultiplicationTable {
    public static void main(String[] args) {
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + "×" + i + "=" + (i * j) + "\t");
            }
            System.out.println();
        }
    }
}

// 输出:
// 1×1=1
// 1×2=2   2×2=4
// 1×3=3   2×3=6   3×3=9
// ...
```

## 练习

```java
// 1. 判断一个数是否为素数
int num = 17;
boolean isPrime = true;
for (int i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) {
        isPrime = false;
        break;
    }
}
System.out.println(num + (isPrime ? "是素数" : "不是素数"));

// 2. 输出斐波那契数列前 10 项
int a = 0, b = 1;
for (int i = 0; i < 10; i++) {
    System.out.print(a + " ");
    int next = a + b;
    a = b;
    b = next;
}
// 输出: 0 1 1 2 3 5 8 13 21 34

// 3. 猜数字游戏
int target = (int) (Math.random() * 100) + 1;
Scanner scanner = new Scanner(System.in);
int guess;
do {
    System.out.print("猜一个 1-100 的数字: ");
    guess = scanner.nextInt();
    if (guess > target) {
        System.out.println("大了");
    } else if (guess < target) {
        System.out.println("小了");
    }
} while (guess != target);
System.out.println("恭喜，猜对了！");
```
