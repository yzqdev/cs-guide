# 命令模式 (Command)

> **将请求封装为对象，从而支持参数化、排队、日志和撤销操作。**

## 场景

- 编辑器中的撤销 / 重做（Undo / Redo）
- 任务队列：将请求放入队列异步执行
- 遥控器：每个按钮绑定一个命令
- Java 的 Runnable：将一段代码封装为对象传递

## 核心角色

| 角色 | 说明 |
|------|------|
| **Command（抽象命令）** | 声明执行操作的接口 |
| **ConcreteCommand（具体命令）** | 绑定 Receiver 和实际操作的实现 |
| **Invoker（调用者）** | 持有命令对象，触发执行 |
| **Receiver（接收者）** | 实际执行操作的对象 |

## 代码示例

```java
// ----- Command -----
interface Command {
    void execute();
    void undo();  // 支持撤销
}

// ----- Receiver -----
class Light {
    public void on() { System.out.println("灯打开了"); }
    public void off() { System.out.println("灯关闭了"); }
}

// ----- ConcreteCommand -----
class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.on();
    }

    @Override
    public void undo() {
        light.off();
    }
}

class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.off();
    }

    @Override
    public void undo() {
        light.on();
    }
}

// ----- Invoker -----
class RemoteControl {
    private Command command;
    private Command lastCommand;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
        lastCommand = command;
    }

    public void pressUndo() {
        if (lastCommand != null) {
            lastCommand.undo();
        }
    }
}

// ----- 使用 -----
public class CommandDemo {
    public static void main(String[] args) {
        Light light = new Light();
        Command on = new LightOnCommand(light);
        Command off = new LightOffCommand(light);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(on);
        remote.pressButton();     // 灯打开了
        remote.pressUndo();       // 灯关闭了

        remote.setCommand(off);
        remote.pressButton();     // 灯关闭了
        remote.pressUndo();       // 灯打开了
    }
}
```

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 将请求的发送者和接收者解耦 | ❌ 每增加一个命令就多一个类 |
| ✅ 支持撤销和重做操作 | ❌ 命令类会膨胀 |
| ✅ 支持命令的排队、日志和事务 | |
| ✅ 可以组合命令（宏命令） | |

## JDK 中的应用

- `java.lang.Runnable` — 将一段代码封装为任务
- `javax.swing.Action` — Swing 中的命令抽象
- Spring 中的 `TaskExecutor` 和 `Command` 模式结合
