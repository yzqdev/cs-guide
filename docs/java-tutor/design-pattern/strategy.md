# 策略模式 (Strategy)

> **定义一系列算法，把它们一个个封装起来，使它们可以互相替换。** 策略模式让算法可以独立于使用它的客户端而变化。

## 场景

- 支付系统：支付宝 / 微信 / 银行卡 —— 可任意切换
- 数据压缩：ZIP / GZIP / 7z 压缩算法切换
- 出行导航：公交 / 驾车 / 步行路线计算
- 电商促销：满减 / 打折 / 返现等促销策略

## 核心角色

| 角色 | 说明 |
|------|------|
| **Strategy（抽象策略）** | 定义所有算法的公共接口 |
| **ConcreteStrategy（具体策略）** | 实现具体的算法 |
| **Context（上下文）** | 持有策略引用，供客户端调用 |

## 代码示例

```java
// ----- Strategy -----
interface PaymentStrategy {
    void pay(int amount);
}

// ----- ConcreteStrategy -----
class AlipayStrategy implements PaymentStrategy {
    @Override
    public void pay(int amount) {
        System.out.println("使用支付宝支付 " + amount + " 元");
    }
}

class WechatPayStrategy implements PaymentStrategy {
    @Override
    public void pay(int amount) {
        System.out.println("使用微信支付 " + amount + " 元");
    }
}

class BankCardStrategy implements PaymentStrategy {
    @Override
    public void pay(int amount) {
        System.out.println("使用银行卡支付 " + amount + " 元");
    }
}

// ----- Context -----
class ShoppingCart {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }

    public void checkout(int amount) {
        if (paymentStrategy == null) {
            throw new IllegalStateException("请先选择支付方式");
        }
        paymentStrategy.pay(amount);
    }
}

// ----- 使用 -----
public class StrategyDemo {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();

        cart.setPaymentStrategy(new AlipayStrategy());
        cart.checkout(299);

        cart.setPaymentStrategy(new WechatPayStrategy());
        cart.checkout(199);
    }
}
```

## 策略 vs 状态模式

| 特性 | 策略模式 | 状态模式 |
|------|---------|---------|
| 关注点 | **如何**做（算法替换） | **何时**做（状态切换） |
| 切换时机 | 由客户端决定 | 由状态自身决定 |
| 模式目的 | 消除条件判断，替换算法 | 消除条件判断，管理状态 |

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 消除大量 if-else / switch-case | ❌ 客户端必须了解不同策略的区别 |
| ✅ 符合开闭原则 | ❌ 策略过多时会产生很多类 |
| ✅ 算法可以自由切换和扩展 | |

## JDK 中的应用

- `java.util.Comparator` 接口 —— 排序策略
- `javax.servlet.http.HttpServlet` 的 `doGet()`、`doPost()` 等
- Java 8 `Function` / `Predicate` 接口本质上也是策略
