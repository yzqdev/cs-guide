# 装饰器模式 (Decorator)

> **动态地将新的职责附加到对象上。** 装饰器模式提供了比继承更灵活的替代方案——通过组合的方式为对象添加功能。

## 场景

- Java I/O 流：`new BufferedInputStream(new FileInputStream("file.txt"))`
- Spring 中的 `TransactionAwareCacheDecorator`
- 需要动态增加功能且避免类爆炸的场景

## 核心角色

| 角色 | 说明 |
|------|------|
| **Component（抽象组件）** | 定义对象接口 |
| **ConcreteComponent（具体组件）** | 被装饰的原始对象 |
| **Decorator（抽象装饰器）** | 持有 Component 引用，实现 Component 接口 |
| **ConcreteDecorator（具体装饰器）** | 在调用父类方法前后增加额外行为 |

## 代码示例

以动物行为为例——一只老虎本来只会跑，使用装饰器后可以飞、可以扔石头。

```java

@Slf4j
class DecoratorPatternTest {
  @Test
  void test() {
    Tiger tiger = new Tiger();
    Living flyDecorator = new ThrowStoneDecorator(new FlyDecorator(tiger));
    flyDecorator.behave();
  }
}

interface Living {
  void behave();
}

class Tiger implements Living {


  @Override
  public void behave() {
    System.out.println("tiger behave");
  }
}

class Bird implements Living {
  @Override
  public void behave() {
    System.out.println("bird behave");
  }
}

abstract class LivingDecorator implements Living {
  Living living;

  public LivingDecorator(Living living) {
    this.living = living;
  }

  @Override
  public void behave() {
    this.living.behave();
  }
}

class FlyDecorator extends LivingDecorator {

  public FlyDecorator(Living living) {
    super(living);
  }

  @Override
  public void behave() {
    super.behave();
    System.out.println("i can fly");
  }
}

class ThrowStoneDecorator extends LivingDecorator {
  public ThrowStoneDecorator(Living living) {
    super(living);
  }

  @Override
  public void behave() {
    super.behave();
    System.out.println("i can throw stone");
  }
}

```

## 装饰器 vs 继承

| 特性 | 装饰器 | 继承 |
|------|--------|------|
| 扩展方式 | 组合，运行时添加 | 静态编译期 |
| 灵活性 | 高：可以自由组合 | 低：类爆炸 |
| 复杂度 | 中等（多了一些小类） | 简单（单一继承链） |
| 典型场景 | Java I/O 流 | 模板方法模式 |

## 优缺点

| 优点 | 缺点 |
|------|------|
| ✅ 比继承更灵活，可在运行时添加行为 | ❌ 产生大量小类，增加复杂度 |
| ✅ 符合开闭原则，无需修改源码即可扩展 | ❌ 多层装饰时调试困难 |
| ✅ 可以将多个装饰器组合使用 | ❌ 类型识别困难（外层包装的对象类型变了） |

## JDK 中的应用

- `java.io.InputStream` / `FilterInputStream` / `BufferedInputStream`
- `java.io.OutputStream` / `FilterOutputStream` / `BufferedOutputStream`
- `java.io.Reader` / `FilterReader`
- `java.util.Collections.synchronizedList()` / `unmodifiableList()`
