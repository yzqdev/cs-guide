# 状态模式 (State)

> **允许对象在其内部状态改变时改变其行为。** 看起来就像对象改变了它的类。

## 场景

- 订单状态：待支付 → 已支付 → 已发货 → 已签收 → 已完成
- 电梯状态：静止 → 运行 → 开门 → 关门
- 播放器状态：播放 → 暂停 → 停止

## 核心角色

| 角色 | 说明 |
|------|------|
| **Context（上下文）** | 持有当前状态对象，维护状态实例 |
| **State（抽象状态）** | 定义状态相关的行为接口 |
| **ConcreteState（具体状态）** | 实现特定状态下的行为 |

## 代码示例

```java
// ----- State -----
interface State {
    void play(Player player);
    void pause(Player player);
    void stop(Player player);
}

// ----- Context -----
class Player {
    private State state;

    public Player() {
        this.state = new StoppedState();  // 初始状态：停止
    }

    public void setState(State state) {
        this.state = state;
    }

    public void play() { state.play(this); }
    public void pause() { state.pause(this); }
    public void stop() { state.stop(this); }
}

// ----- ConcreteState -----
class PlayingState implements State {
    @Override
    public void play(Player player) {
        System.out.println("已经在播放");
    }
    @Override
    public void pause(Player player) {
        System.out.println("暂停播放");
        player.setState(new PausedState());
    }
    @Override
    public void stop(Player player) {
        System.out.println("停止播放");
        player.setState(new StoppedState());
    }
}

class PausedState implements State {
    @Override
    public void play(Player player) {
        System.out.println("继续播放");
        player.setState(new PlayingState());
    }
    @Override
    public void pause(Player player) {
        System.out.println("已经暂停");
    }
    @Override
    public void stop(Player player) {
        System.out.println("停止播放");
        player.setState(new StoppedState());
    }
}

class StoppedState implements State {
    @Override
    public void play(Player player) {
        System.out.println("开始播放");
        player.setState(new PlayingState());
    }
    @Override
    public void pause(Player player) {
        System.out.println("已停止，无法暂停");
    }
    @Override
    public void stop(Player player) {
        System.out.println("已经停止");
    }
}

// ----- 使用 -----
public class StateDemo {
    public static void main(String[] args) {
        Player player = new Player();

        player.play();    // 开始播放
        player.pause();   // 暂停播放
        player.play();    // 继续播放
        player.stop();    // 停止播放
        player.pause();   // 已停止，无法暂停
    }
}
```

## 状态 vs 策略模式

| 特性 | 状态模式 | 策略模式 |
|------|---------|---------|
| 关注点 | 对象内部状态自动切换 | 算法可替换 |
| 切换 | 状态自身决定下一个状态 | 客户端决定使用哪个策略 |
| 行为数量 | 多个方法（play/pause/stop） | 通常只有一个方法（pay/compress） |

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 消除大量的 if-else / switch-case | ❌ 状态较多时会增加类数量 |
| ✅ 状态切换逻辑集中 | ❌ 如果状态很少，过度设计 |
| ✅ 新增状态不影响其他状态 | |

## JDK 中的应用

- `java.util.Iterator` 的状态（hasNext / next）
- JSF 生命周期中的状态管理
- Spring Web Flow 中的状态机
