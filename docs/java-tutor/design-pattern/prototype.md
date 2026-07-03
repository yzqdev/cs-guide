# 原型模式 (Prototype)

> **通过复制已有对象来创建新对象，而不是通过 new 创建。** 当对象的创建成本较高时，原型模式可以通过克隆来提升性能。

## 场景

- 对象创建成本高（数据库查询、网络请求、复杂计算）
- 对象的状态差异不大，只需要修改个别字段
- Java 中实现 `Cloneable` 接口的场景

## 核心角色

| 角色 | 说明 |
|------|------|
| **Prototype（原型）** | 声明克隆方法的接口 |
| **ConcretePrototype（具体原型）** | 实现克隆方法 |
| **Client（客户端）** | 通过调用原型对象的 clone 来创建新对象 |

## 代码示例

```java
// 原型接口
interface Prototype extends Cloneable {
    Prototype clone();
}

// 具体原型
class Shape implements Prototype {
    private String type;
    private String color;
    private int x, y;

    public Shape(String type, String color) {
        this.type = type;
        this.color = color;
    }

    // Getters and Setters
    public void setX(int x) { this.x = x; }
    public void setY(int y) { this.y = y; }

    @Override
    public Prototype clone() {
        Shape clone = new Shape(this.type, this.color);
        clone.x = this.x;
        clone.y = this.y;
        return clone;
    }

    @Override
    public String toString() {
        return "Shape{type='" + type + "', color='" + color + "', x=" + x + ", y=" + y + "}";
    }
}

// ----- 使用 -----
public class PrototypeDemo {
    public static void main(String[] args) {
        // 创建一个原型（成本高，假设需要从数据库加载）
        Shape circlePrototype = new Shape("圆形", "红色");

        // 通过克隆创建新对象（成本低）
        Shape circle1 = (Shape) circlePrototype.clone();
        circle1.setX(10);
        circle1.setY(20);

        Shape circle2 = (Shape) circlePrototype.clone();
        circle2.setX(30);
        circle2.setY(40);

        System.out.println(circle1);
        System.out.println(circle2);
    }
}
```

## 浅拷贝 vs 深拷贝

| 类型 | 说明 | Java 实现 |
|------|------|-----------|
| **浅拷贝** | 只复制基本类型和引用地址 | `Object.clone()` 默认 |
| **深拷贝** | 复制所有字段，包括引用的对象 | 重写 clone() 或序列化 |

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 提高创建性能（避免昂贵的初始化） | ❌ 需要实现 Cloneable |
| ✅ 简化创建过程 | ❌ 深拷贝实现复杂（循环引用问题） |
| ✅ 可以动态增加产品类 | |

## JDK 中的应用

- `java.lang.Object.clone()`（需要实现 Cloneable）
- `java.util.Arrays.copyOf()`
- Spring 中的 Prototype Scope Bean（每次返回新实例）
