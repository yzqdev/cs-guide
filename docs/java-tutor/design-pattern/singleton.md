# 单例模式 (Singleton)

> **确保一个类只有一个实例，并提供全局访问点。** 单例模式是最简单也最常用的设计模式之一。

## 场景

- 线程池、数据库连接池、缓存、日志对象等只需要一个实例的场景
- 配置管理类，整个系统只需要一份配置数据
- 需要严格控制全局唯一访问点的场景

## 四种单例模式

以下代码包含四种单例实现，并通过并发测试验证线程安全：

```java
package ab.yzq.tutor.design;

import org.junit.jupiter.api.Test;

import java.util.Set;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

class SingleTest {
  @Test
  void singleTest() throws InterruptedException {
    int threadCount = 100; // 测试线程数量
    CountDownLatch startLatch = new CountDownLatch(1);
    CountDownLatch endLatch = new CountDownLatch(threadCount);

    Set<LazySingle> instances = ConcurrentHashMap.newKeySet();
    AtomicInteger creationCount = new AtomicInteger(0);

    var pool = new ThreadPoolExecutor(
      10,
      50,
      20,
      TimeUnit.SECONDS,
      new ArrayBlockingQueue<>(100),
      new ThreadPoolExecutor.CallerRunsPolicy()
    );

    try {
      // 提交多个任务
      for (int i = 0; i < threadCount; i++) {
        pool.execute(() -> {
          try {
            startLatch.await(); // 等待所有线程就绪

            LazySingle instance = LazySingle.getInstance();
            instances.add(instance);

            if (instance != null) {
              creationCount.incrementAndGet();
            }

          } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
          } finally {
            endLatch.countDown();
          }
        });
      }

      // 同时启动所有线程
      startLatch.countDown();

      // 等待所有线程完成
      endLatch.await(10, TimeUnit.SECONDS);

      // 验证结果
      System.out.println("创建的实例数量: " + instances.size());
      System.out.println("getInstance() 调用次数: " + creationCount.get());

      // 断言：应该只有一个实例
      assert instances.size() == 1 : "单例模式失败，创建了多个实例: " + instances.size();
      assert creationCount.get() == threadCount : "方法调用次数不正确";

      System.out.println("✅ 单例模式测试通过！");

    } finally {
      pool.shutdown();
      if (!pool.awaitTermination(5, TimeUnit.SECONDS)) {
        pool.shutdownNow();
      }
    }
  }
}

/**
 * 懒加载式
 */
class LazySingle {
  private LazySingle() {    // 模拟创建耗时
    try {
      Thread.sleep(10);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
    System.out.println("LazySingle 实例被创建，线程: " + Thread.currentThread().getName());
  }

  static volatile LazySingle instance;

  /**
   * 第一个检测是检测是否存在,如果存在就直接返回,不再创建单例
   * synchronized是防止多个线程进入,导致创建多个实例
   * 第二次检测是防止两个线程同时创建实例,保证第一个线程创建完实例,第二个线程不会进去instance==null
   *
   * @return
   */
  static LazySingle getInstance() {
    if (instance == null) {
      synchronized (LazySingle.class) {
        if (instance == null) {
          instance = new LazySingle();
        }
      }
    }
    return instance;
  }

}

/**
 * 饿汉单例模式
 */
class Single1 {
  private Single1() {
  }

  static private final Single1 INSTANCE = new Single1();

  static Single1 getInstance() {
    return INSTANCE;
  }

}

/**
 * 静态内部类
 *
 */
class Single2 {
  private Single2() {
  }

  static class Holder {
    static Single2 instance = new Single2();
  }

  static Single2 getInstance() {
    return Holder.instance;
  }
}

/**
 * 使用enum
 */

enum Single3 {
  INSTANCE;

  static Single3 getInstance() {
    return Single3.INSTANCE;
  }

}
```

## 四种方式对比

| 方式 | 线程安全 | 懒加载 | 防止反射破坏 | 推荐度 |
|------|---------|--------|------------|-------|
| **饿汉式** | ✅ 天生安全 | ❌ 类加载即创建 | ❌ | ⭐⭐⭐ |
| **懒汉式 DCL** | ✅ volatile + synchronized | ✅ | ❌ | ⭐⭐⭐⭐ |
| **静态内部类** | ✅ JVM 类加载机制保证 | ✅ | ❌ | ⭐⭐⭐⭐ |
| **枚举** | ✅ 天然保证 | ❌ | ✅ 天然防御 | ⭐⭐⭐⭐⭐ |

## 推荐

- **一般场景**：用 `静态内部类` 或 `饿汉式`，简单高效
- **需要防御反射攻击**：用 `枚举`，Joshua Bloch 在《Effective Java》中推荐枚举是最佳单例方案
- **需要懒加载 + 线程安全**：用 `双重检查锁定（DCL）`

> 枚举单例不仅能防反射，还能防序列化破坏，是最可靠的方案。
