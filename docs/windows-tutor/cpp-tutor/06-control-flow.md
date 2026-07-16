---
order: 7
---

# 06 - 控制流

## if / else

```cpp
int score = 85;

if (score >= 90) {
    std::cout << "A";
} else if (score >= 80) {
    std::cout << "B";
} else if (score >= 70) {
    std::cout << "C";
} else {
    std::cout << "D";
}
```

### if 带初始化语句（C++17）

```cpp
// 在if中声明变量，作用域仅限if/else块
if (auto it = map.find(key); it != map.end()) {
    std::cout << "Found: " << it->second;
} else {
    std::cout << "Not found";
}
// it 在这里不可见
```

### if constexpr（C++17）

```cpp
template<typename T>
auto convert(T val) {
    if constexpr (std::is_integral_v<T>) {
        return val * 2;      // 编译时决定，另一分支不编译
    } else {
        return val + 0.5;
    }
}
```

## switch

```cpp
enum Color { RED, GREEN, BLUE };

Color c = GREEN;

switch (c) {
    case RED:
        std::cout << "Red";
        break;
    case GREEN:
        std::cout << "Green";
        break;
    case BLUE:
        std::cout << "Blue";
        break;
    default:
        std::cout << "Unknown";
        break;
}
```

### switch 注意事项

```cpp
// 1. case必须是常量表达式
// 2. 忘记break会导致穿透（fallthrough）
switch (x) {
    case 1:
        std::cout << "one";
        // 没有break → 穿透到下一个case
    case 2:
        std::cout << "two";  // case 1也会执行到这里
        break;
}

// C++17 显式穿透属性
switch (x) {
    case 1:
        std::cout << "one";
        [[fallthrough]];  // 明确告诉编译器：我就是要穿透
    case 2:
        std::cout << "two";
        break;
}
```

## while 循环

```cpp
int i = 0;
while (i < 10) {
    std::cout << i << " ";
    i++;
}
// 输出: 0 1 2 3 4 5 6 7 8 9
```

## do-while 循环

```cpp
int n;
do {
    std::cout << "请输入1-100的数字: ";
    std::cin >> n;
} while (n < 1 || n > 100);  // 至少执行一次
```

## for 循环

```cpp
// 经典for
for (int i = 0; i < 10; i++) {
    std::cout << i << " ";
}

// C++11 范围for（推荐）
std::vector<int> v = {1, 2, 3, 4, 5};
for (int x : v) {           // 按值（拷贝）
    std::cout << x;
}
for (const auto& x : v) {   // 按const引用（不拷贝，推荐）
    std::cout << x;
}
for (auto& x : v) {         // 按引用（可以修改）
    x *= 2;
}

// C++20 带初始化的for
for (std::vector<int> v = {1,2,3}; auto x : v) {
    std::cout << x;
}
```

## break 与 continue

```cpp
// break — 跳出循环
for (int i = 0; i < 100; i++) {
    if (i == 5) break;  // i=5时退出循环
    std::cout << i;     // 输出 0 1 2 3 4
}

// continue — 跳过当前迭代
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;  // 跳过偶数
    std::cout << i;             // 输出 1 3 5 7 9
}
```

## goto（尽量避免使用）

```cpp
// goto 可以跳转到函数内的标签
for (int i = 0; i < 10; i++) {
    for (int j = 0; j < 10; j++) {
        if (i * j == 42) {
            goto found;  // 跳出多层循环的唯一方式（break只能跳出一层）
        }
    }
}
found:
    std::cout << "Found!";

// 更好的替代方案：用函数或异常
```

## 结构化绑定中的控制流

```cpp
std::map<std::string, int> m = {{"a", 1}, {"b", 2}};

for (auto& [key, value] : m) {
    if (value > 1) {
        std::cout << key << ": " << value;
    }
}
```

## 综合示例：猜数字游戏

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    std::srand(std::time(nullptr));
    int secret = std::rand() % 100 + 1;
    int guess;

    do {
        std::cout << "猜一个1-100的数字: ";
        std::cin >> guess;

        if (guess > secret) {
            std::cout << "太大了！\n";
        } else if (guess < secret) {
            std::cout << "太小了！\n";
        } else {
            std::cout << "恭喜你猜对了！\n";
        }
    } while (guess != secret);

    return 0;
}
```

---

**下一步**: [07-函数](07-函数.md)
