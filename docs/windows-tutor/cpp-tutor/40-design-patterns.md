---
order: 41
---

# 40 - 设计模式

## 单例模式

```cpp
class Singleton {
public:
    static Singleton& instance() {
        static Singleton inst;  // C++11线程安全
        return inst;
    }

    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;

    void doSomething() { /* ... */ }

private:
    Singleton() = default;
};

// 使用
Singleton::instance().doSomething();
```

## 工厂模式

```cpp
class Shape {
public:
    enum Type { CIRCLE, RECT, TRIANGLE };
    virtual double area() const = 0;
    virtual ~Shape() = default;

    static std::unique_ptr<Shape> create(Type type);
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};

class Rect : public Shape {
    double w, h;
public:
    Rect(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
};

std::unique_ptr<Shape> Shape::create(Type type) {
    switch (type) {
        case CIRCLE: return std::make_unique<Circle>(1.0);
        case RECT:   return std::make_unique<Rect>(1.0, 1.0);
    }
    return nullptr;
}
```

## 观察者模式

```cpp
class Observer {
public:
    virtual void update(const std::string& event) = 0;
    virtual ~Observer() = default;
};

class Subject {
    std::vector<std::weak_ptr<Observer>> observers;
public:
    void subscribe(std::shared_ptr<Observer> obs) {
        observers.push_back(obs);
    }

    void notify(const std::string& event) {
        for (auto it = observers.begin(); it != observers.end();) {
            if (auto obs = it->lock()) {
                obs->update(event);
                ++it;
            } else {
                it = observers.erase(it);  // 清理过期的
            }
        }
    }
};
```

## 策略模式

```cpp
class SortStrategy {
public:
    virtual void sort(std::vector<int>& data) = 0;
    virtual ~SortStrategy() = default;
};

class QuickSort : public SortStrategy {
public:
    void sort(std::vector<int>& data) override {
        std::sort(data.begin(), data.end());
    }
};

class BubbleSort : public SortStrategy {
public:
    void sort(std::vector<int>& data) override {
        // 冒泡排序实现
    }
};

class Sorter {
    std::unique_ptr<SortStrategy> strategy;
public:
    void setStrategy(std::unique_ptr<SortStrategy> s) {
        strategy = std::move(s);
    }
    void doSort(std::vector<int>& data) {
        if (strategy) strategy->sort(data);
    }
};
```

## RAII 模式

```cpp
// 锁守卫
template<typename Mutex>
class LockGuard {
    Mutex& mutex;
public:
    LockGuard(Mutex& m) : mutex(m) { mutex.lock(); }
    ~LockGuard() { mutex.unlock(); }
    LockGuard(const LockGuard&) = delete;
};

// 文件守卫
class FileGuard {
    FILE* handle;
public:
    FileGuard(const char* name, const char* mode)
        : handle(fopen(name, mode)) {}
    ~FileGuard() { if (handle) fclose(handle); }
    FILE* get() { return handle; }
};
```

## Pimpl 惯用法

```cpp
// widget.h
class Widget {
public:
    Widget();
    ~Widget();
    Widget(Widget&&) noexcept;
    Widget& operator=(Widget&&) noexcept;
    void doWork();
private:
    struct Impl;
    std::unique_ptr<Impl> pImpl;
};

// widget.cpp
struct Widget::Impl {
    std::string name;
    std::vector<int> data;
};

Widget::Widget() : pImpl(std::make_unique<Impl>()) {}
Widget::~Widget() = default;
void Widget::doWork() { /* ... */ }
```

## 综合示例：插件系统

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>

class Plugin {
public:
    virtual ~Plugin() = default;
    virtual std::string name() const = 0;
    virtual void execute() = 0;
};

class PluginManager {
    std::unordered_map<std::string, std::unique_ptr<Plugin>> plugins;
public:
    void registerPlugin(std::unique_ptr<Plugin> plugin) {
        plugins[plugin->name()] = std::move(plugin);
    }

    void execute(const std::string& name) {
        if (auto it = plugins.find(name); it != plugins.end()) {
            it->second->execute();
        }
    }
};

class HelloPlugin : public Plugin {
public:
    std::string name() const override { return "hello"; }
    void execute() override { std::cout << "Hello from plugin!\n"; }
};

int main() {
    PluginManager mgr;
    mgr.registerPlugin(std::make_unique<HelloPlugin>());
    mgr.execute("hello");
}
```

---

**恭喜你完成了整个 C++ 教程！**

**回到目录**: [00-目录与导航](00-目录与导航.md)
