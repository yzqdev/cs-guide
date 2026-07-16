---
order: 36
---

# 35 - 多线程

## std::thread

```cpp
#include <thread>

void task() {
    std::cout << "Running in thread\n";
}

int main() {
    std::thread t(task);  // 创建线程
    t.join();             // 等待线程完成

    // lambda
    std::thread t2([]{
        std::cout << "Lambda thread\n";
    });
    t2.join();
}
```

## 互斥锁

```cpp
#include <mutex>

std::mutex mtx;
int sharedData = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mtx);  // RAII锁
    sharedData++;
}

// 多个锁
std::mutex m1, m2;
void transfer() {
    std::lock(m1, m2);  // 同时锁两个（避免死锁）
    std::lock_guard<std::mutex> g1(m1, std::adopt_lock);
    std::lock_guard<std::mutex> g2(m2, std::adopt_lock);
}
```

## 条件变量

```cpp
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool ready = false;

void worker() {
    std::unique_lock<std::mutex> lock(mtx);
    cv.wait(lock, []{ return ready; });  // 等待条件满足
    std::cout << "Working\n";
}

void producer() {
    {
        std::lock_guard<std::mutex> lock(mtx);
        ready = true;
    }
    cv.notify_one();  // 通知一个等待线程
}
```

## 原子操作

```cpp
#include <atomic>

std::atomic<int> counter(0);

void increment() {
    counter++;            // 原子操作，线程安全
    counter.fetch_add(1); // 等价
}

// 内存序
counter.store(42, std::memory_order_relaxed);
int val = counter.load(std::memory_order_acquire);
```

## 异步编程

```cpp
#include <future>

// std::async 启动异步任务
auto future = std::async(std::launch::async, []{
    return 42;
});

int result = future.get();  // 等待结果

// std::promise 手动设置结果
std::promise<int> prom;
auto fut = prom.get_future();

std::thread([](std::promise<int> p) {
    p.set_value(42);
}, std::move(prom)).detach();

int val = fut.get();
```

## 线程池（简化版）

```cpp
#include <thread>
#include <queue>
#include <functional>
#include <mutex>
#include <condition_variable>

class ThreadPool {
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    std::mutex mtx;
    std::condition_variable cv;
    bool stop = false;
public:
    ThreadPool(size_t n) {
        for (size_t i = 0; i < n; i++) {
            workers.emplace_back([this]{
                while (true) {
                    std::function<void()> task;
                    {
                        std::unique_lock lock(mtx);
                        cv.wait(lock, [this]{ return stop || !tasks.empty(); });
                        if (stop && tasks.empty()) return;
                        task = std::move(tasks.front());
                        tasks.pop();
                    }
                    task();
                }
            });
        }
    }

    template<typename F>
    void enqueue(F&& f) {
        {
            std::lock_guard lock(mtx);
            tasks.emplace(std::forward<F>(f));
        }
        cv.notify_one();
    }

    ~ThreadPool() {
        { std::lock_guard lock(mtx); stop = true; }
        cv.notify_all();
        for (auto& w : workers) w.join();
    }
};
```

---

**下一步**: [36-正则表达式](36-正则表达式.md)
