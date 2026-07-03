# 模板方法模式 (Template Method)

> **在父类中定义算法的框架（模板），允许子类在不改变算法结构的情况下重写某些特定步骤。**

## 场景

- JUnit 测试：`setUp()` → `testXXX()` → `tearDown()` 的执行流程
- Spring 中的 `JdbcTemplate`：打开连接 → 执行 SQL → 处理结果 → 关闭连接
- 建造房屋：打地基 → 砌墙 → 封顶 → 装修（步骤固定，细节不同）

## 核心角色

| 角色 | 说明 |
|------|------|
| **AbstractClass（抽象类）** | 定义模板方法和基本操作（可能包含默认实现） |
| **ConcreteClass（具体类）** | 重写基本操作以提供具体实现 |

## 代码示例

```java
// ----- 抽象类（模板） -----
abstract class DataProcessor {
    // 模板方法：定义算法骨架，子类不能修改
    public final void process() {
        loadData();
        processData();
        saveData();
        hookMethod(); // 钩子方法（可选重写）
    }

    abstract void loadData();
    abstract void processData();
    abstract void saveData();

    // 钩子方法：子类可以重写也可以不重写
    void hookMethod() {
        // 默认空实现
    }
}

// ----- 具体类 1：PDF 处理器 -----
class PDFProcessor extends DataProcessor {
    @Override
    void loadData() {
        System.out.println("从 PDF 文件中加载数据");
    }

    @Override
    void processData() {
        System.out.println("解析 PDF 内容");
    }

    @Override
    void saveData() {
        System.out.println("将解析结果保存到数据库");
    }
}

// ----- 具体类 2：CSV 处理器 -----
class CSVProcessor extends DataProcessor {
    @Override
    void loadData() {
        System.out.println("从 CSV 文件中加载数据");
    }

    @Override
    void processData() {
        System.out.println("解析 CSV 行数据");
    }

    @Override
    void saveData() {
        System.out.println("将解析结果保存到数据库");
    }

    @Override
    void hookMethod() {
        System.out.println("[钩子] 发送处理完成通知");
    }
}

// ----- 使用 -----
public class TemplateMethodDemo {
    public static void main(String[] args) {
        DataProcessor pdf = new PDFProcessor();
        pdf.process();

        System.out.println("---");

        DataProcessor csv = new CSVProcessor();
        csv.process();
    }
}
```

## 模板方法中的钩子

| 类型 | 说明 | 示例 |
|------|------|------|
| **抽象方法** | 子类**必须**实现 | `loadData()` |
| **具体方法** | 子类**可选择**继承 | 模板方法本身 |
| **钩子方法** | 子类**可重写也可不重写** | `hookMethod()` |

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 将不变的部分封装在父类，变的部分留给子类 | ❌ 子类多了以后，维护复杂 |
| ✅ 提取公共代码，便于复用 | ❌ 模板方法骨架一旦确定，修改成本高 |
| ✅ 符合好莱坞原则："别找我们，我们找你" | |

## JDK 中的应用

- `java.util.AbstractList` — 定义 `get()`、`size()` 等模板方法
- `java.io.InputStream` — `read()` 方法模板
- `javax.servlet.http.HttpServlet` — `doGet()`、`doPost()` 是钩子
- Spring 中的 `JdbcTemplate`、`RestTemplate`、`TransactionTemplate`
