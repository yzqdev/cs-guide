# 外观模式 (Facade)

> **为子系统的一组接口提供一个统一的简化接口。** 外观模式定义了一个高层接口，使子系统更容易使用。

## 场景

- 复杂的第三方库提供简洁的调用入口（如 Slf4j 是众多日志框架的外观）
- 系统分层：为下层复杂逻辑提供一个简单的 API 层
- 支付系统：统一的 `pay()` 方法内部处理校验、扣款、通知等

## 核心角色

| 角色 | 说明 |
|------|------|
| **Facade（外观）** | 对外提供简单的接口，内部编排子系统 |
| **Subsystem（子系统）** | 一组复杂的类，客户端不直接调用 |

## 代码示例

```java
// ----- 子系统 -----
class CPU {
    public void freeze() { System.out.println("CPU 冻结"); }
    public void execute() { System.out.println("CPU 执行"); }
}

class Memory {
    public void load() { System.out.println("内存加载数据"); }
}

class HardDrive {
    public void read() { System.out.println("硬盘读取数据"); }
}

// ----- Facade -----
class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;

    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    public void start() {
        System.out.println("===== 电脑启动 =====");
        cpu.freeze();
        memory.load();
        hardDrive.read();
        cpu.execute();
        System.out.println("===== 启动完成 =====");
    }
}

// ----- 使用（客户端只需调用 Facade） -----
public class FacadeDemo {
    public static void main(String[] args) {
        ComputerFacade computer = new ComputerFacade();
        computer.start();  // 一行代码完成复杂启动过程
    }
}
```

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 简化客户端调用，降低耦合 | ❌ 外观类可能变成"上帝类"（承担过多职责） |
| ✅ 让子系统更易于使用和理解 | ❌ 无法完全阻止客户直接访问子系统 |
| ✅ 将子系统的变化隔离在外观层后 | |

## JDK 中的应用

- `java.net.URL` — 封装了 URL 的解析、连接建立等复杂过程
- SLF4J — 各种日志框架（Logback、Log4j2）的外观接口
- `javax.faces.context.FacesContext` — JavaServer Faces 的外观类
