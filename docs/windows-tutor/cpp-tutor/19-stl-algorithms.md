---
order: 20
---

# 19 - STL 算法

## 基本算法

```cpp
#include <algorithm>
#include <numeric>
#include <ranges>  // C++20

std::vector<int> v = {5, 3, 1, 4, 2};

// 排序
std::sort(v.begin(), v.end());                    // 升序
std::sort(v.begin(), v.end(), std::greater<>());  // 降序
std::partial_sort(v.begin(), v.begin()+3, v.end()); // 前3个最小

// 查找
auto it = std::find(v.begin(), v.end(), 4);       // 线性查找
bool found = std::binary_search(v.begin(), v.end(), 4); // 二分（需排序）
auto [lo, hi] = std::equal_range(v.begin(), v.end(), 4); // 范围

// 反转
std::reverse(v.begin(), v.end());

// 去重（先排序）
std::sort(v.begin(), v.end());
auto last = std::unique(v.begin(), v.end());
v.erase(last, v.end());

// 计数
int count = std::count(v.begin(), v.end(), 3);
int count_if = std::count_if(v.begin(), v.end(),
    [](int x) { return x > 2; });

// 累加
int sum = std::accumulate(v.begin(), v.end(), 0);
int product = std::accumulate(v.begin(), v.end(), 1, std::multiplies<>());
```

## 变换与生成

```cpp
std::vector<int> v = {1, 2, 3, 4, 5};
std::vector<int> result;

// transform — 映射
std::transform(v.begin(), v.end(), std::back_inserter(result),
    [](int x) { return x * 2; });
// result = {2, 4, 6, 8, 10}

// 生成
std::vector<int> gen(10);
std::generate(gen.begin(), gen.end(), [n=0]() mutable { return n++; });
// gen = {0, 1, 2, ..., 9}

// fill
std::fill(v.begin(), v.end(), 0);

// replace
std::replace(v.begin(), v.end(), 3, 99);
std::replace_if(v.begin(), v.end(), [](int x) { return x > 3; }, 0);
```

## 移除与删除

```cpp
std::vector<int> v = {1, 2, 3, 2, 4, 2, 5};

// remove（逻辑删除，返回新逻辑结尾）
auto new_end = std::remove(v.begin(), v.end(), 2);
v.erase(new_end, v.end());  // 物理删除
// v = {1, 3, 4, 5}

// remove_if
v.erase(
    std::remove_if(v.begin(), v.end(), [](int x) { return x % 2 == 0; }),
    v.end()
);
// 只剩奇数
```

## 数值算法

```cpp
#include <numeric>

std::vector<int> v = {1, 2, 3, 4, 5};

std::accumulate(v.begin(), v.end(), 0);         // 15
std::inner_product(v.begin(), v.end(), v.begin(), 0);  // 55
std::iota(v.begin(), v.end(), 0);               // {0,1,2,3,4}
std::gcd(12, 8);                                 // 4 (C++17)
std::lcm(4, 6);                                  // 12 (C++17)
```

## 集合算法

```cpp
std::vector<int> a = {1, 2, 3, 4, 5};
std::vector<int> b = {3, 4, 5, 6, 7};

std::sort(a.begin(), a.end());
std::sort(b.begin(), b.end());

std::vector<int> result;

// 交集
std::set_intersection(a.begin(), a.end(), b.begin(), b.end(),
    std::back_inserter(result));
// result = {3, 4, 5}

// 并集
result.clear();
std::set_union(a.begin(), a.end(), b.begin(), b.end(),
    std::back_inserter(result));
// result = {1, 2, 3, 4, 5, 6, 7}

// 差集
result.clear();
std::set_difference(a.begin(), a.end(), b.begin(), b.end(),
    std::back_inserter(result));
// result = {1, 2}

// 子集判断
bool subset = std::includes(a.begin(), a.end(), b.begin(), b.end());
```

## C++20 Ranges

```cpp
#include <ranges>
#include <vector>

std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// 管道风格（类似Unix管道）
auto result = v
    | std::views::filter([](int x) { return x % 2 == 0; })  // 过滤偶数
    | std::views::transform([](int x) { return x * x; })     // 平方
    | std::views::take(3);                                     // 取前3个

for (int x : result) {
    std::cout << x << " ";  // 4 16 36
}

// 常用视图
auto all = std::views::iota(1, 100);          // 1到99
auto evens = all | std::views::filter([](int x) { return x % 2 == 0; });
auto chunks = v | std::views::chunk(3);       // 分块
auto reversed = v | std::views::reverse;      // 反转

// C++23: std::views::zip
std::vector<int> a = {1, 2, 3};
std::vector<std::string> b = {"a", "b", "c"};
for (auto [x, s] : std::views::zip(a, b)) {
    std::cout << x << s << "\n";  // 1a 2b 3c
}
```

## 排序与比较

```cpp
// 自定义比较
std::vector<std::string> words = {"banana", "apple", "cherry"};

std::sort(words.begin(), words.end());                     // 字典序
std::sort(words.begin(), words.end(), std::greater<>());   // 逆字典序

// 按长度排序
std::sort(words.begin(), words.end(), [](const std::string& a, const std::string& b) {
    return a.length() < b.length();
});

// nth_element — 快速找到第n小的元素
std::nth_element(v.begin(), v.begin() + 5, v.end());

// is_sorted
bool sorted = std::is_sorted(v.begin(), v.end());
```

## 查找算法

```cpp
std::vector<int> v = {1, 3, 5, 7, 9, 11};

// lower_bound — 第一个不小于目标的位置
auto lb = std::lower_bound(v.begin(), v.end(), 5);

// upper_bound — 第一个大于目标的位置
auto ub = std::upper_bound(v.begin(), v.end(), 5);

// binary_search
bool found = std::binary_search(v.begin(), v.end(), 5);

// any_of / all_of / none_of
bool any = std::any_of(v.begin(), v.end(), [](int x) { return x > 5; });
bool all = std::all_of(v.begin(), v.end(), [](int x) { return x > 0; });
bool none = std::none_of(v.begin(), v.end(), [](int x) { return x < 0; });
```

---

**下一步**: [20-STL迭代器与适配器](20-STL迭代器与适配器.md)
