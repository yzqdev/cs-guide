---
title: "包与访问修饰符"
order: 11
---

# 包与访问修饰符

> 包（Package）用于组织类，访问修饰符控制类成员的可见性。

## 包（Package）

### 为什么需要包？

- **避免命名冲突** — 不同包中可以有同名类
- **组织代码** — 按功能模块分类管理
- **控制访问权限** — 包级别可见性

### 包的定义

```java
// 文件: src/com/example/demo/Hello.java
// 包声明必须是文件的第一行（非注释）
package com.example.demo;

public class Hello {
    // ...
}
```

### 包的命名规范

```java
// 域名反转 + 项目名
com.example.myapp
org.apache.commons
cn.edu.tsinghua.cs
```

### 使用包中的类

```java
// 方式一：使用全限定名
com.example.demo.Hello hello = new com.example.demo.Hello();

// 方式二：使用 import（推荐）
import com.example.demo.Hello;
// 或导入整个包
import com.example.demo.*;

// 方式三：静态导入（导入静态方法或常量，Java 5+）
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;

public class Main {
    public static void main(String[] args) {
        System.out.println(PI);         // 直接使用常量
        System.out.println(sqrt(16));   // 4.0
    }
}
```

### 包的目录结构

包的层级必须与文件系统的目录结构一致：

```
src/
└── com/
    └── example/
        └── demo/
            ├── Hello.java        (package com.example.demo)
            └── util/
                └── StringUtil.java  (package com.example.demo.util)
```

## 访问修饰符

Java 有四种访问级别，从宽到窄：

| 修饰符 | 类内部 | 同包 | 子类（不同包） | 其他 |
|--------|--------|------|----------------|------|
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `default`（无修饰符） | ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

```java
package com.example.demo;

public class AccessModifierDemo {
    // private — 仅类内部可见
    private int privateVar = 1;

    // default（无修饰符）— 同包可见
    int defaultVar = 2;

    // protected — 同包 + 子类可见
    protected int protectedVar = 3;

    // public — 所有地方可见
    public int publicVar = 4;

    // private 方法
    private void privateMethod() {
        System.out.println("private 方法");
    }

    // default 方法
    void defaultMethod() {
        System.out.println("default 方法");
    }

    // protected 方法
    protected void protectedMethod() {
        System.out.println("protected 方法");
    }

    // public 方法
    public void publicMethod() {
        // 类内部可以访问所有级别
        System.out.println(privateVar);    // ✅
        System.out.println(defaultVar);    // ✅
        System.out.println(protectedVar);  // ✅
        System.out.println(publicVar);     // ✅
    }
}
```

### 不同场景的可见性

```java
// 同一个包中的类
package com.example.demo;

public class SamePackage {
    public void test() {
        AccessModifierDemo demo = new AccessModifierDemo();
        // System.out.println(demo.privateVar);    // ❌
        System.out.println(demo.defaultVar);      // ✅ 同包
        System.out.println(demo.protectedVar);    // ✅ 同包
        System.out.println(demo.publicVar);       // ✅ 所有
    }
}
```

```java
// 不同包中的子类
package com.example.other;

import com.example.demo.AccessModifierDemo;

public class SubClass extends AccessModifierDemo {
    public void test() {
        // System.out.println(privateVar);    // ❌
        // System.out.println(defaultVar);    // ❌ 不同包
        System.out.println(protectedVar);     // ✅ 子类
        System.out.println(publicVar);        // ✅ 所有
    }
}
```

```java
// 不同包中的非子类
package com.example.other;

import com.example.demo.AccessModifierDemo;

public class UnrelatedClass {
    public void test() {
        AccessModifierDemo demo = new AccessModifierDemo();
        // System.out.println(demo.privateVar);    // ❌
        // System.out.println(demo.defaultVar);    // ❌
        // System.out.println(demo.protectedVar);  // ❌
        System.out.println(demo.publicVar);       // ✅
    }
}
```

### 类的访问修饰符

```java
// public 类 — 可以被任意包访问
public class PublicClass { }

// default 类 — 只能被同包访问
class DefaultClass { }

// 注意：外部类不能声明为 private 或 protected
// private class PrivateClass { }  // ❌ 编译错误
// protected class ProtectedClass { }  // ❌ 编译错误
```

## import 详解

```java
// 导入单个类
import java.util.ArrayList;
import java.util.List;

// 导入整个包下的所有类
import java.util.*;

// 静态导入
import static java.lang.Math.*;

// 导入多个同名类时的处理
import java.util.Date;
// import java.sql.Date;  // 冲突！
// 解决方案：在代码中使用全限定名
java.sql.Date sqlDate = new java.sql.Date(1000);
java.util.Date utilDate = new java.util.Date();
```

## 常用 JDK 包

| 包名 | 用途 |
|------|------|
| `java.lang` | 核心语言包（自动导入），如 String、Math、System |
| `java.util` | 集合框架、日期时间、Scanner 等工具类 |
| `java.io` | 输入输出流 |
| `java.nio` | 新 I/O（非阻塞 I/O） |
| `java.net` | 网络编程 |
| `java.sql` | 数据库操作（JDBC） |
| `java.time` | Java 8+ 日期时间 API |
| `java.math` | BigDecimal、BigInteger 等数学运算 |
| `java.awt` / `javax.swing` | GUI 图形界面 |
| `java.util.concurrent` | 并发编程工具类 |

## 编译与运行带包的程序

```java
// 文件: src/com/example/Hello.java
package com.example;

public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello from package!");
    }
}
```

```bash
# 在 src 目录下编译
javac com/example/Hello.java

# 运行（需要全限定名）
java com.example.Hello
```

## 练习

```java
// 创建如下包结构并编写代码
//
// src/
// └── com/
//     └── myapp/
//         ├── Main.java          (package com.myapp)
//         ├── model/
//         │   └── User.java      (package com.myapp.model)
//         └── service/
//             └── UserService.java (package com.myapp.service)

// Main.java
package com.myapp;

import com.myapp.model.User;
import com.myapp.service.UserService;

public class Main {
    public static void main(String[] args) {
        UserService service = new UserService();
        User user = service.findById(1L);
        System.out.println(user);
    }
}

// User.java
package com.myapp.model;

public class User {
    private Long id;
    private String name;

    public User(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // getter / setter ...
}

// UserService.java
package com.myapp.service;

import com.myapp.model.User;

public class UserService {
    public User findById(Long id) {
        return new User(id, "张三");
    }
}
```
