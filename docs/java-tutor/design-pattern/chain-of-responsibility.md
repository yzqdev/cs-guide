# 责任链模式 (Chain of Responsibility)

> **将请求沿着一条"链"传递，直到有一个处理器处理它为止。** 每个处理器都有机会处理请求，也可以选择将其传递给下一个处理器。

## 场景

- 审批流程：员工请假 → 部门经理 → 总监 → CEO
- Java Servlet Filter：请求在到达 Servlet 前经过多个过滤器
- 日志框架：Logger Level 的传递（DEBUG → INFO → WARN → ERROR）
- 异常处理：多个 catch 块

## 核心角色

| 角色 | 说明 |
|------|------|
| **Handler（抽象处理者）** | 定义处理请求的接口和下一个处理者的引用 |
| **ConcreteHandler（具体处理者）** | 处理它能处理的请求，否则传递给下一个 |

## 代码示例

```java
abstract class Logger {
    public static final int DEBUG = 1;
    public static final int INFO = 2;
    public static final int ERROR = 3;

    protected int level;
    protected Logger nextLogger;  // 链中的下一个处理者

    public void setNext(Logger nextLogger) {
        this.nextLogger = nextLogger;
    }

    public void log(int level, String message) {
        if (this.level <= level) {
            write(message);
        }
        if (nextLogger != null) {
            nextLogger.log(level, message);
        }
    }

    abstract protected void write(String message);
}

class DebugLogger extends Logger {
    public DebugLogger() { this.level = DEBUG; }
    @Override protected void write(String message) {
        System.out.println("[DEBUG] " + message);
    }
}

class InfoLogger extends Logger {
    public InfoLogger() { this.level = INFO; }
    @Override protected void write(String message) {
        System.out.println("[INFO] " + message);
    }
}

class ErrorLogger extends Logger {
    public ErrorLogger() { this.level = ERROR; }
    @Override protected void write(String message) {
        System.out.println("[ERROR] " + message);
    }
}

// ----- 使用 -----
public class ChainOfResponsibilityDemo {
    public static void main(String[] args) {
        // 构建责任链：DEBUG → INFO → ERROR
        Logger debug = new DebugLogger();
        Logger info = new InfoLogger();
        Logger error = new ErrorLogger();
        debug.setNext(info);
        info.setNext(error);

        // 发送不同级别的日志
        debug.log(Logger.DEBUG, "调试信息");
        System.out.println("---");
        debug.log(Logger.INFO, "普通信息");
        System.out.println("---");
        debug.log(Logger.ERROR, "错误信息");
    }
}
```

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 请求发送者和接收者解耦 | ❌ 无法保证请求一定会被处理 |
| ✅ 可以动态增加或删除处理者 | ❌ 调试复杂（不知道请求最终被谁处理了） |
| ✅ 符合单一职责原则 | ❌ 链太长时影响性能 |

## JDK 中的应用

- `javax.servlet.Filter` 和 `FilterChain` — Servlet 过滤器链
- `java.util.logging.Logger` 中的 Logger 父子层次关系
- Apache Commons Chain
- Spring Security 中的 Filter Chain
