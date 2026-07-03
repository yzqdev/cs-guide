# 抽象工厂模式 (Abstract Factory)

> **创建一组相关或相互依赖的对象，而无需指定它们的具体类。** 抽象工厂是工厂方法的升级版——一个工厂可以生产一系列产品。

## 场景

- 跨平台 GUI 组件：一个工厂生产 Button + Checkbox + TextField 一整套控件
- 主题系统：DarkTheme 工厂生产深色按钮 + 深色输入框 + 深色弹窗
- 数据库连接：MySQL Factory 生产 MySQLConnection + MySQLStatement + MySQLResultSet

## 核心角色

| 角色 | 说明 |
|------|------|
| **AbstractFactory** | 声明一组创建产品的方法 |
| **ConcreteFactory** | 实现具体产品的创建（如 WindowsFactory） |
| **AbstractProduct** | 一组相关产品的接口（如 Button、Checkbox） |
| **ConcreteProduct** | 具体产品实现（如 WindowsButton、MacCheckbox） |

## 代码示例

```java
// ----- 产品族 1: Button -----
interface Button {
    void paint();
}
class WinButton implements Button {
    @Override public void paint() { System.out.println("Windows Button"); }
}
class MacButton implements Button {
    @Override public void paint() { System.out.println("Mac Button"); }
}

// ----- 产品族 2: Checkbox -----
interface Checkbox {
    void paint();
}
class WinCheckbox implements Checkbox {
    @Override public void paint() { System.out.println("Windows Checkbox"); }
}
class MacCheckbox implements Checkbox {
    @Override public void paint() { System.out.println("Mac Checkbox"); }
}

// ----- 抽象工厂 -----
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// ----- 具体工厂 -----
class WinFactory implements GUIFactory {
    @Override public Button createButton() { return new WinButton(); }
    @Override public Checkbox createCheckbox() { return new WinCheckbox(); }
}

class MacFactory implements GUIFactory {
    @Override public Button createButton() { return new MacButton(); }
    @Override public Checkbox createCheckbox() { return new MacCheckbox(); }
}

// ----- 使用 -----
public class AbstractFactoryDemo {
    public static void main(String[] args) {
        GUIFactory factory;
        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("win")) {
            factory = new WinFactory();
        } else {
            factory = new MacFactory();
        }

        Button btn = factory.createButton();
        Checkbox cb = factory.createCheckbox();
        btn.paint();
        cb.paint();
    }
}
```

## 工厂方法 vs 抽象工厂

| 特性 | 工厂方法 | 抽象工厂 |
|------|---------|---------|
| 产品 | 生产**一种**产品 | 生产**一系列**相关产品 |
| 方法数量 | 1 个工厂方法 | 多个工厂方法 |
| 复杂度 | 简单 | 较复杂 |
| 使用场景 | 产品类型较少 | 产品族（家族）较多 |

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 保证同一工厂生产的产品之间相互兼容 | ❌ 新增产品族困难（需要改接口） |
| ✅ 避免创建者和具体产品耦合 | ❌ 代码复杂度较高 |
| ✅ 产品族切换方便（换一个工厂即可） | |
