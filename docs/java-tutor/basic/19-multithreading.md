# 多线程与并发

> 多线程允许程序同时执行多个任务，充分利用 CPU 资源。Java 内置了丰富的多线程支持。

## 线程的创建方式

### 方式一：继承 Thread 类

```java
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(getName() + ": " + i);
            try {
                Thread.sleep(1000);  // 休眠 1 秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// 使用
MyThread t1 = new MyThread();
t1.setName("线程1");
t1.start();  // 启动线程（不要直接调用 run()）
```

### 方式二：实现 Runnable 接口（推荐）

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
        }
    }
}

// 使用
Thread t2 = new Thread(new MyRunnable(), "线程2");
t2.start();

// Lambda 简化
Thread t3 = new Thread(() -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("Lambda线程: " + i);
    }
});
t3.start();
```

### Runnable vs Thread

| 对比 | 继承 Thread | 实现 Runnable |
|------|-------------|---------------|
| 灵活性 | 不能继承其他类 | 可以继承其他类 |
| 共享资源 | 共享较麻烦 | 容易（多个线程共用一个 Runnable 实例） |
| 推荐 | 不推荐 | **推荐** |

## 线程状态

```
新建（New） → 就绪（Runnable） → 运行（Running） → 终止（Terminated）
                   ↕
              阻塞（Blocked）
                   ↕
              等待（Waiting）
                   ↕
              超时等待（Timed Waiting）
```

```java
Thread thread = new Thread(() -> {
    System.out.println("线程运行中");
});

thread.getState();  // NEW — 新建
thread.start();
thread.getState();  // RUNNABLE — 运行中或就绪
thread.join();      // 等待线程结束
thread.getState();  // TERMINATED — 终止
```

## 线程同步

### 问题的产生

多个线程同时访问共享资源可能产生数据不一致：

```java
class Counter {
    private int count = 0;

    public void increment() {
        count++;  // 不是原子操作：读取→加1→写入
    }

    public int getCount() {
        return count;
    }
}

// 两个线程各加 10000 次，结果可能不是 20000
Counter counter = new Counter();
Runnable task = () -> {
    for (int i = 0; i < 10000; i++) {
        counter.increment();
    }
};

new Thread(task).start();
new Thread(task).start();
// 最终 count 可能 < 20000（数据竞争）
```

### synchronized 关键字

```java
class SafeCounter {
    private int count = 0;

    // 同步方法
    public synchronized void increment() {
        count++;  // 同一时间只有一个线程能执行
    }

    // 同步代码块
    public void increment2() {
        synchronized (this) {
            count++;
        }
    }

    public synchronized int getCount() {
        return count;
    }
}
```

### Lock 接口

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class LockCounter {
    private int count = 0;
    private Lock lock = new ReentrantLock();

    public void increment() {
        lock.lock();  // 获取锁
        try {
            count++;
        } finally {
            lock.unlock();  // 释放锁（必须在 finally 中）
        }
    }

    public int getCount() {
        return count;
    }
}
```

### synchronized vs Lock

| 对比 | synchronized | Lock |
|------|-------------|------|
| 语法 | 关键字，自动释放锁 | API，需手动释放 |
| 功能 | 功能有限 | 更灵活（可中断、可超时、可尝试获取） |
| 性能 | 优化后接近 Lock | 较好 |
| 推荐 | 简单场景 | 复杂场景 |

## 线程间通信

### wait / notify

```java
class MessageQueue {
    private String message;
    private boolean empty = true;

    public synchronized String take() {
        while (empty) {
            try {
                wait();  // 等待消息
            } catch (InterruptedException e) {
                // ignore
            }
        }
        empty = true;
        notifyAll();  // 通知所有等待的线程
        return message;
    }

    public synchronized void put(String message) {
        while (!empty) {
            try {
                wait();  // 等待消息被取走
            } catch (InterruptedException e) {
                // ignore
            }
        }
        empty = false;
        this.message = message;
        notifyAll();
    }
}
```

## 线程池（Executor Framework）

线程池重用线程，避免频繁创建和销毁线程的开销。

```java
import java.util.concurrent.*;

public class ThreadPoolDemo {

    public static void main(String[] args) {
        // 1. 固定线程数
        ExecutorService fixedPool = Executors.newFixedThreadPool(4);

        // 2. 缓存线程池（动态扩容）
        ExecutorService cachedPool = Executors.newCachedThreadPool();

        // 3. 单线程池
        ExecutorService singlePool = Executors.newSingleThreadExecutor();

        // 4. 定时任务线程池
        ScheduledExecutorService scheduledPool = Executors.newScheduledThreadPool(2);

        // 提交任务
        fixedPool.submit(() -> {
            System.out.println("任务执行中...");
        });

        // 提交带返回值的任务
        Future<Integer> future = fixedPool.submit(() -> {
            Thread.sleep(1000);
            return 42;
        });

        try {
            Integer result = future.get();  // 获取结果（会阻塞）
            System.out.println("结果: " + result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        // 定时执行
        scheduledPool.schedule(() -> {
            System.out.println("3 秒后执行");
        }, 3, TimeUnit.SECONDS);

        // 周期性执行
        scheduledPool.scheduleAtFixedRate(() -> {
            System.out.println("每 2 秒执行一次");
        }, 0, 2, TimeUnit.SECONDS);

        // 关闭线程池
        fixedPool.shutdown();  // 不再接收新任务，等待已有任务完成
        // fixedPool.shutdownNow();  // 立即停止
    }
}
```

### 自定义线程池

```java
// 推荐使用 ThreadPoolExecutor 自定义
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    2,                 // corePoolSize — 核心线程数
    5,                 // maximumPoolSize — 最大线程数
    60,                // keepAliveTime — 空闲线程存活时间
    TimeUnit.SECONDS,  // 时间单位
    new LinkedBlockingQueue<>(10),  // 工作队列
    new ThreadPoolExecutor.CallerRunsPolicy()  // 拒绝策略
);

// 拒绝策略
// AbortPolicy — 抛出 RejectedExecutionException（默认）
// CallerRunsPolicy — 由调用者线程执行
// DiscardPolicy — 直接丢弃
// DiscardOldestPolicy — 丢弃队列中最旧的任务
```

## volatile 关键字

`volatile` 保证变量的**可见性**（一个线程修改后，其他线程立即可见），但不保证原子性。

```java
class Flag {
    volatile boolean running = true;  // 保证线程间可见
}

Flag flag = new Flag();

// 线程1
new Thread(() -> {
    while (flag.running) {
        // 如果没有 volatile，可能永远看不到线程2的修改
    }
    System.out.println("线程1 结束");
}).start();

// 线程2
new Thread(() -> {
    try { Thread.sleep(1000); } catch (Exception e) {}
    flag.running = false;  // 停止线程1
}).start();
```

## 原子类

```java
import java.util.concurrent.atomic.*;

AtomicInteger count = new AtomicInteger(0);

// 原子操作
count.incrementAndGet();     // 自增并返回
count.getAndIncrement();     // 返回并自增
count.addAndGet(5);          // 加 5 并返回
count.compareAndSet(6, 10);  // 如果当前值是 6，更新为 10

// 常用原子类
AtomicBoolean
AtomicLong
AtomicReference<String>
LongAdder       // 更高性能的计数器
```

## 并发集合

```java
// 线程安全的集合
ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
CopyOnWriteArraySet<String> set = new CopyOnWriteArraySet<>();
BlockingQueue<String> queue = new LinkedBlockingQueue<>();

// BlockingQueue 常用实现
// ArrayBlockingQueue — 有界阻塞队列
// LinkedBlockingQueue — 可选有界/无界
// PriorityBlockingQueue — 优先级队列
// SynchronousQueue — 不存储元素的队列
```

## 练习

```java
// 1. 生产者-消费者模式
class ProducerConsumer {
    private static final BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(10);

    static class Producer implements Runnable {
        @Override
        public void run() {
            try {
                for (int i = 0; i < 20; i++) {
                    queue.put(i);
                    System.out.println("生产: " + i);
                    Thread.sleep(500);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    static class Consumer implements Runnable {
        @Override
        public void run() {
            try {
                while (true) {
                    Integer value = queue.take();
                    System.out.println("消费: " + value);
                    Thread.sleep(1000);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    public static void main(String[] args) {
        new Thread(new Producer()).start();
        new Thread(new Consumer()).start();
    }
}

// 2. 使用 CompletableFuture 实现异步任务（Java 8+）
CompletableFuture.supplyAsync(() -> {
    // 异步执行
    return "Hello";
}).thenApply(s -> {
    // 结果转换
    return s + " World";
}).thenAccept(System.out::println);  // Hello World
```
