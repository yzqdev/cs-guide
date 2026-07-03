# 建造者模式 (Builder)

> **将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。**

## 场景

- 构建复杂对象（参数很多，有大量可选参数）
- 不可变对象（用 Builder 替代 telescoping constructor 模式）
- 链式调用的 API 设计（Lombok 的 `@Builder`）

## 核心角色

| 角色 | 说明 |
|------|------|
| **Builder（建造者）** | 定义构建产品各个部分的接口 |
| **ConcreteBuilder（具体建造者）** | 实现 Builder 接口，构建产品的具体部分 |
| **Director（指挥者）** | 控制构建过程的顺序 |
| **Product（产品）** | 最终构建出来的复杂对象 |

## 代码示例

```java
// ----- 产品 -----
public class Computer {
    private final String cpu;
    private final String ram;
    private final String storage;
    private final String gpu;

    // 私有构造器，只能通过 Builder 创建
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.gpu = builder.gpu;
    }

    @Override
    public String toString() {
        return "Computer{cpu='" + cpu + "', ram='" + ram + "', storage='" + storage + "', gpu='" + gpu + "'}";
    }

    // ----- Builder -----
    public static class Builder {
        private String cpu = "i5";       // 默认值
        private String ram = "8GB";
        private String storage = "256GB";
        private String gpu = "集成显卡";

        public Builder cpu(String cpu) { this.cpu = cpu; return this; }
        public Builder ram(String ram) { this.ram = ram; return this; }
        public Builder storage(String storage) { this.storage = storage; return this; }
        public Builder gpu(String gpu) { this.gpu = gpu; return this; }

        public Computer build() {
            return new Computer(this);
        }
    }
}

// ----- 使用 -----
public class BuilderDemo {
    public static void main(String[] args) {
        Computer gamingPC = new Computer.Builder()
            .cpu("i9")
            .ram("32GB")
            .storage("1TB SSD")
            .gpu("RTX 4090")
            .build();

        Computer officePC = new Computer.Builder()
            .cpu("i5")
            .ram("16GB")
            .build();

        System.out.println(gamingPC);
        System.out.println(officePC);
    }
}
```

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 可以分步构造对象，过程更清晰 | ❌ 需要额外创建 Builder 类 |
| ✅ 将构造代码和业务代码分离 | ❌ 如果参数很少，过度设计 |
| ✅ 可以复用相同的构建过程 | |
| ✅ 链式调用接口直观 | |

## JDK 中的应用

- `StringBuilder.append()` 链式调用
- `java.util.Calendar.Builder`
- `java.util.stream.Stream.builder()`
- Lombok `@Builder` 注解（编译期生成）
