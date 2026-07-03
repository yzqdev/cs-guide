# 工厂方法模式 (Factory Method)

> **定义一个创建对象的接口，让子类决定实例化哪个类。** 工厂方法将对象的创建延迟到子类。

## 场景

- 日志框架：根据配置创建 FileLogger / ConsoleLogger / DatabaseLogger
- 数据库访问：根据数据库类型创建 MySQLConnection / PostgreSQLConnection
- UI 框架：根据操作系统创建 WindowsButton / MacButton / LinuxButton

## 核心角色

| 角色 | 说明 |
|------|------|
| **Product（抽象产品）** | 定义对象的接口 |
| **ConcreteProduct（具体产品）** | 实现 Product 接口的具体类 |
| **Creator（抽象创建者）** | 声明工厂方法，返回 Product 对象 |
| **ConcreteCreator（具体创建者）** | 实现工厂方法，返回 ConcreteProduct 实例 |

## 代码示例

```java
// ----- 产品 -----
interface Button {
    void render();
    void onClick();
}

class WindowsButton implements Button {
    @Override
    public void render() {
        System.out.println("渲染 Windows 风格按钮");
    }
    @Override
    public void onClick() {
        System.out.println("Windows 按钮被点击");
    }
}

class MacButton implements Button {
    @Override
    public void render() {
        System.out.println("渲染 Mac 风格按钮");
    }
    @Override
    public void onClick() {
        System.out.println("Mac 按钮被点击");
    }
}

// ----- 创建者 -----
abstract class Dialog {
    public void renderWindow() {
        Button okButton = createButton();
        okButton.render();
        okButton.onClick();
    }
    // 工厂方法：子类实现
    abstract Button createButton();
}

class WindowsDialog extends Dialog {
    @Override
    Button createButton() {
        return new WindowsButton();
    }
}

class MacDialog extends Dialog {
    @Override
    Button createButton() {
        return new MacButton();
    }
}

// ----- 使用 -----
public class FactoryMethodDemo {
    public static void main(String[] args) {
        Dialog dialog;
        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("win")) {
            dialog = new WindowsDialog();
        } else {
            dialog = new MacDialog();
        }
        dialog.renderWindow();
    }
}
```

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 避免创建者和具体产品之间的紧耦合 | ❌ 每增加一种产品就需要增加一个子类 |
| ✅ 符合单一职责原则：创建逻辑集中 | ❌ 会引入大量 Creator 子类 |
| ✅ 符合开闭原则：新增产品无需修改现有代码 | |

## JDK 中的应用

- `java.util.Collection.iterator()`（返回具体的 Iterator）
- `java.net.URLConnection.getInputStream()`
- Spring BeanFactory 中的 `getBean()`
