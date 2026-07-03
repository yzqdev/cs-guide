# 代理模式 (Proxy)

> **为另一个对象提供一个替身或占位符以控制对这个对象的访问。** 代理模式在访问对象时引入一层间接层，用来控制、增强或延迟访问。

## 场景

- 延迟加载（虚拟代理）：大图加载时先用占位图，真正需要时才加载原图
- 访问控制（保护代理）：用户有权限才能访问某个方法
- 日志代理：在方法调用前后打印日志
- 远程代理（RPC）：本地调用远程服务如同调用本地方法

## 核心角色

| 角色 | 说明 |
|------|------|
| **Subject（主题接口）** | 定义 RealSubject 和 Proxy 的共同接口 |
| **RealSubject（真实主题）** | 实际执行业务逻辑的对象 |
| **Proxy（代理）** | 持有 RealSubject 引用，控制访问 |

## 代码示例

```java
// ----- Subject 接口 -----
interface Image {
    void display();
}

// ----- RealSubject -----
class RealImage implements Image {
    private String fileName;

    public RealImage(String fileName) {
        this.fileName = fileName;
        loadFromDisk();  // 模拟加载大图片
    }

    private void loadFromDisk() {
        System.out.println("正在加载: " + fileName);
    }

    @Override
    public void display() {
        System.out.println("显示图片: " + fileName);
    }
}

// ----- Proxy（虚拟代理 + 日志代理） -----
class ImageProxy implements Image {
    private RealImage realImage;
    private String fileName;

    public ImageProxy(String fileName) {
        this.fileName = fileName;
    }

    @Override
    public void display() {
        // 访问控制：记录日志
        System.out.println("[日志] 访问图片: " + fileName);

        // 延迟加载：第一次显示时才真正加载
        if (realImage == null) {
            realImage = new RealImage(fileName);
        }
        realImage.display();
    }
}

// ----- 使用 -----
public class ProxyDemo {
    public static void main(String[] args) {
        Image image = new ImageProxy("photo.jpg");

        // 图片尚未加载
        System.out.println("图片对象已创建，但尚未加载");

        // 第一次显示：触发加载
        image.display();

        // 第二次显示：直接使用缓存
        image.display();
    }
}
```

## 代理类型对比

| 类型 | 目的 | 典型实现 |
|------|------|---------|
| **虚拟代理** | 延迟加载 | 大图加载 |
| **保护代理** | 权限控制 | 检查用户角色 |
| **日志代理** | 记录日志 | AOP 切面 |
| **远程代理** | 远程调用 | RPC / gRPC |
| **缓存代理** | 结果缓存 | 数据库查询缓存 |

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 可以在不修改目标对象的情况下增加功能 | ❌ 增加系统复杂度 |
| ✅ 控制访问权限 | ❌ 代理层可能成为性能瓶颈 |

## JDK 中的应用

- Java 动态代理：`java.lang.reflect.Proxy`
- Spring AOP：基于代理实现事务、安全、日志等
- MyBatis Mapper 接口：JDK 动态代理生成实现类
