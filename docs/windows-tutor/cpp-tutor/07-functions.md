---
order: 8
---

# 07 - 函数

## 函数定义

```cpp
// 返回类型 函数名(参数列表) { 函数体 }
int add(int a, int b) {
    return a + b;
}

// C++14 尾置返回类型
auto divide(double a, double b) -> double {
    return a / b;
}

// void 函数（无返回值）
void printHello() {
    std::cout << "Hello!\n";
}
```

## 参数传递

### 值传递

```cpp
void increment(int x) {
    x++;  // 只修改了副本
}

int main() {
    int a = 5;
    increment(a);
    std::cout << a;  // 仍然是5
}
```

### 指针传递

```cpp
void increment(int* x) {
    (*x)++;  // 修改原始值
}

int main() {
    int a = 5;
    increment(&a);
    std::cout << a;  // 6
}
```

### 引用传递（推荐）

```cpp
void increment(int& x) {
    x++;  // 直接修改原始值
}

int main() {
    int a = 5;
    increment(a);
    std::cout << a;  // 6
}
```

### const 引用（避免拷贝，不修改）

```cpp
void print(const std::string& s) {
    std::cout << s;
    // s += "!";  // 错误：const引用不能修改
}
```

### 默认参数

```cpp
void greet(const std::string& name, int times = 1) {
    for (int i = 0; i < times; i++) {
        std::cout << "Hello, " << name << "!\n";
    }
}

greet("Alice");       // 1次
greet("Bob", 3);      // 3次
```

### 可变参数模板（C++11）

```cpp
// 递归展开
void print() {}  // 终止条件

template<typename T, typename... Args>
void print(const T& first, const Args&... rest) {
    std::cout << first << " ";
    print(rest...);
}

print(1, "hello", 3.14, 'c');  // 输出: 1 hello 3.14 c
```

## 函数重载

```cpp
// 同名函数，参数列表不同
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
std::string add(const std::string& a, const std::string& b) {
    return a + b;
}

add(1, 2);          // 调用int版本
add(1.5, 2.5);      // 调用double版本
add("a", "b");      // 调用string版本
```

## 内联函数

```cpp
// 建议编译器内联展开（小函数）
inline int square(int x) {
    return x * x;
}
```

## constexpr 函数

```cpp
constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

constexpr int f10 = factorial(10);  // 编译时计算

// 也可以在运行时调用
int runtime_val = 5;
int result = factorial(runtime_val);  // 运行时计算
```

## lambda 表达式（C++11）

```cpp
// 基本语法：[捕获列表](参数列表) -> 返回类型 { 函数体 }
auto add = [](int a, int b) { return a + b; };
std::cout << add(3, 4);  // 7

// 捕获外部变量
int factor = 10;
auto multiply = [factor](int x) { return x * factor; };  // 值捕获
auto add_factor = [&factor](int x) { return x + factor; }; // 引用捕获

// 泛型lambda（C++14）
auto generic_add = [](auto a, auto b) { return a + b; };

// C++14 初始化捕获（移动捕获）
auto ptr = std::make_unique<int>(42);
auto lambda = [p = std::move(ptr)]() { return *p; };
```

## 递归

```cpp
// 斐波那契数列
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// 尾递归优化（编译器可能优化）
int fib_tail(int n, int a = 0, int b = 1) {
    if (n == 0) return a;
    return fib_tail(n - 1, b, a + b);
}
```

## 函数指针

```cpp
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }

// 函数指针声明
int (*op)(int, int) = add;
std::cout << op(3, 4);  // 7

op = subtract;
std::cout << op(3, 4);  // -1

// 用作参数
int apply(int a, int b, int (*func)(int, int)) {
    return func(a, b);
}
apply(3, 4, add);  // 7
```

## 返回值

```cpp
// 返回引用（不能返回局部变量的引用！）
int& getFirst(std::vector<int>& v) {
    return v[0];  // OK，v的生命周期由调用者管理
}

// 返回const引用
const int& getFirst(const std::vector<int>& v) {
    return v[0];
}

// C++17 结构化绑定（通过引用返回）
std::pair<int, std::string> getInfo() { return {1, "hello"}; }
auto [id, name] = getInfo();  // id=1, name="hello"
```

---

**下一步**: [08-数组与字符串](08-数组与字符串.md)
