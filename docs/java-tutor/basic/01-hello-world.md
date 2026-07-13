# Hello World — 第一个 Java 程序

> Java 是一种面向对象的编程语言，遵循"一次编写，到处运行"（Write Once, Run Anywhere）的理念。

## Hello World 程序

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### 逐行解析

| 代码 | 说明 |
|------|------|
| `public class HelloWorld` | 声明一个公开的类，类名必须与文件名一致 |
| `public static void main(String[] args)` | **主方法** — Java 程序的入口点 |
| `System.out.println(...)` | 打印一行文本到控制台 |
| `;` | 语句结束符，每条语句必须以分号结尾 |

## 编译与运行

### 方式一：命令行

```bash
# 1. 编译 .java 文件 → 生成 .class 字节码
javac HelloWorld.java

# 2. 运行字节码（不要加 .class 后缀）
java HelloWorld
```

### 方式二：使用 IDE

推荐使用 IntelliJ IDEA 或 Eclipse，直接点击运行按钮即可。

### 执行流程

```
源代码 (.java)  --javac编译--> 字节码 (.class)  --JVM运行--> 机器码
```

Java 通过 JVM（Java Virtual Machine）实现跨平台——编译生成的 `.class` 文件可以在任何安装了 JVM 的平台上运行。

## 程序基本结构

```java
/**
 * 这是一个 Java 程序的完整结构示例
 */
package com.example.demo;        // 包声明（可选，但推荐）

import java.util.Scanner;         // 导入语句（可选）

/**
 * 类注释
 */
public class StructureDemo {      // 类声明

    // 成员变量
    private String name;

    // 构造方法
    public StructureDemo(String name) {
        this.name = name;
    }

    // 成员方法
    public void sayHello() {
        System.out.println("Hello, " + name);
    }

    // 主方法 — 程序入口
    public static void main(String[] args) {
        StructureDemo demo = new StructureDemo("Java");
        demo.sayHello();
    }
}
```

## 注释

```java
// 单行注释

/*
 * 多行注释
 * 可以写多行
 */

/**
 * 文档注释（Javadoc）
 * 可以用 javadoc 工具生成 API 文档
 * @author 作者
 * @param 参数说明
 * @return 返回值说明
 */
```

## 关键字与标识符

### 命名规则

- 标识符由字母、数字、下划线 `_`、美元符 `$` 组成
- 不能以数字开头
- 不能使用 Java 关键字
- 大小写敏感

### 命名规范（驼峰命名）

| 类型 | 规范 | 示例 |
|------|------|------|
| 类名 | 大驼峰（首字母大写） | `HelloWorld`, `StudentInfo` |
| 方法名 | 小驼峰（首字母小写） | `getName()`, `setAge()` |
| 变量名 | 小驼峰 | `studentName`, `totalCount` |
| 常量名 | 全大写 + 下划线 | `MAX_VALUE`, `PI` |
| 包名 | 全小写 | `com.example.demo` |

## 练习

```java
// 试着写一个程序，输出你的名字和年龄
public class AboutMe {
    public static void main(String[] args) {
        System.out.println("我叫小明");
        System.out.println("今年18岁");
    }
}
```
