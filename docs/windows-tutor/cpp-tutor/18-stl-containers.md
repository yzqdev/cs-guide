---
order: 19
---

# 18 - STL 容器

## 序列容器

### std::vector（动态数组）

```cpp
#include <vector>

std::vector<int> v = {1, 2, 3, 4, 5};

v.push_back(6);       // 尾部添加
v.emplace_back(7);    // 原地构造（更高效）
v.pop_back();         // 尾部删除

v[0];                 // 访问（不检查边界）
v.at(0);              // 访问（越界抛异常）

v.size();             // 元素个数
v.capacity();         // 已分配容量
v.shrink_to_fit();    // 释放多余容量
v.reserve(100);       // 预分配空间
v.resize(10);         // 调整大小
```

### std::deque（双端队列）

```cpp
#include <deque>

std::deque<int> d = {1, 2, 3};

d.push_front(0);      // 头部添加（vector没有）
d.push_back(4);       // 尾部添加
d.pop_front();        // 头部删除

d[0];                 // 随机访问（和vector一样快）
```

### std::list（双向链表）

```cpp
#include <list>

std::list<int> l = {3, 1, 4, 1, 5};

l.push_back(6);
l.push_front(0);
l.sort();             // O(n log n) 排序
l.unique();           // 删除连续重复
l.reverse();          // 反转
l.remove(1);          // 删除所有值为1的元素

// 插入和删除是O(1)，但不支持随机访问
auto it = l.begin();
++it;
l.insert(it, 10);     // 在it前插入10
```

### std::forward_list（单向链表）

```cpp
#include <forward_list>

std::forward_list<int> fl = {1, 2, 3};
fl.push_front(0);     // 只能头部操作
fl.reverse();
```

## 关联容器

### std::set / std::multiset

```cpp
#include <set>

std::set<int> s = {3, 1, 4, 1, 5};  // 自动排序，去重
// s = {1, 3, 4, 5}

s.insert(2);          // O(log n)
s.erase(3);           // O(log n)
s.count(4);           // 0或1（set）
s.find(4) != s.end(); // O(log n)

// multiset 允许重复
std::multiset<int> ms = {1, 1, 2, 3};
ms.count(1);          // 2
```

### std::map / std::multimap

```cpp
#include <map>

std::map<std::string, int> m;
m["alice"] = 90;      // 不存在则创建
m["bob"] = 85;
m.insert({"charlie", 95});

m["alice"];            // 90
m.at("bob");           // 85（越界抛异常）
m.count("alice");      // 1
m.find("bob") != m.end();

// 遍历（按key排序）
for (const auto& [key, value] : m) {  // C++17结构化绑定
    std::cout << key << ": " << value << "\n";
}

// multimap 允许重复key
std::multimap<std::string, int> mm;
mm.insert({"a", 1});
mm.insert({"a", 2});  // 同一个key
```

## 无序关联容器（C++11）

```cpp
#include <unordered_map>
#include <unordered_set>

// O(1)平均查找，O(n)最坏
std::unordered_map<std::string, int> um;
um["key"] = 42;

std::unordered_set<int> us = {1, 2, 3};
us.insert(4);
```

## 容器适配器

### std::stack

```cpp
#include <stack>

std::stack<int> s;
s.push(1);
s.push(2);
std::cout << s.top();  // 2
s.pop();
s.empty();             // false
s.size();              // 1
```

### std::queue

```cpp
#include <queue>

std::queue<int> q;
q.push(1);
q.push(2);
std::cout << q.front();  // 1（先入先出）
q.pop();
```

### std::priority_queue

```cpp
#include <queue>

std::priority_queue<int> pq;  // 默认最大堆
pq.push(3);
pq.push(1);
pq.push(4);
std::cout << pq.top();  // 4（最大值）

// 最小堆
std::priority_queue<int, std::vector<int>, std::greater<int>> minPQ;
```

## std::array（固定大小数组）

```cpp
#include <array>

std::array<int, 5> a = {1, 2, 3, 4, 5};
a.size();     // 5
a[0];         // 1
a.fill(0);    // 全部设为0
```

## 其他容器

```cpp
// std::bitset — 位集合
std::bitset<8> b(42);  // 00101010
b.set(0);              // 00101011
b.flip();              // 11010100

// std::tuple — 元组
auto t = std::make_tuple(1, 3.14, "hello");
auto [i, d, s] = t;  // C++17结构化绑定

// std::pair — 键值对
auto p = std::make_pair(1, "one");
auto [key, val] = p;  // C++17
```

## 容器选择指南

| 需求 | 推荐容器 |
|------|---------|
| 随机访问快 | vector, deque |
| 频繁头部插入 | deque, list |
| 频繁中间插入/删除 | list |
| 有序存储 | set, map |
| 快速查找（无序） | unordered_set, unordered_map |
| LIFO | stack |
| FIFO | queue |
| 优先级 | priority_queue |

---

**下一步**: [19-STL算法](19-STL算法.md)
