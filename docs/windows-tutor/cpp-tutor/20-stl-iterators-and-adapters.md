---
order: 21
---

# 20 - STL 迭代器与适配器

## 迭代器类别

| 类别 | 能力 | 示例容器 |
|------|------|---------|
| Input Iterator | 读取，前移 | istream_iterator |
| Output Iterator | 写入，前移 | ostream_iterator, back_inserter |
| Forward Iterator | 读写，前移 | forward_list, unordered容器 |
| Bidirectional Iterator | 读写，前后移 | list, set, map |
| Random Access Iterator | 读写，随机跳转 | vector, deque, array |

## 迭代器基本操作

```cpp
std::vector<int> v = {1, 2, 3, 4, 5};

auto it = v.begin();     // 指向第一个元素
*it;                     // 解引用 → 1
it++;                    // 前移到下一个
it--;                    // 后退
it += 2;                 // 跳2步
it - v.begin();          // 距离
it[2];                   // 随机访问
```

## 迭代器失效

```cpp
std::vector<int> v = {1, 2, 3, 4, 5};
auto it = v.begin() + 2;  // 指向3

// 插入可能导致重新分配 → 所有迭代器失效
v.push_back(6);            // 可能失效！
// 使用 it 前必须重新获取
it = v.begin() + 2;

// 删除
v.erase(it);               // 被删除位置及之后的迭代器失效
```

## 插入迭代器

```cpp
#include <iterator>

std::vector<int> src = {1, 2, 3};
std::vector<int> dst;

// back_inserter — 调用push_back
std::copy(src.begin(), src.end(), std::back_inserter(dst));

// front_inserter — 调用push_front
std::deque<int> dq;
std::copy(src.begin(), src.end(), std::front_inserter(dq));

// inserter — 调用insert
std::list<int> lst;
std::copy(src.begin(), src.end(), std::inserter(lst, lst.begin()));
```

## 流迭代器

```cpp
#include <iterator>
#include <fstream>

// 输出流迭代器
std::ostream_iterator<int> out(std::cout, " ");
std::copy(v.begin(), v.end(), out);  // 输出到cout

// 写入文件
std::ofstream file("data.txt");
std::ostream_iterator<int> file_out(file, "\n");
std::copy(v.begin(), v.end(), file_out);

// 输入流迭代器
std::ifstream in("data.txt");
std::istream_iterator<int> file_in(in);
std::istream_iterator<int> end_of_stream;
std::vector<int> data(file_in, end_of_stream);
```

## 迭代器适配器

### std::reverse_iterator

```cpp
std::vector<int> v = {1, 2, 3, 4, 5};

// 反向遍历
for (auto rit = v.rbegin(); rit != v.rend(); ++rit) {
    std::cout << *rit << " ";  // 5 4 3 2 1
}

// 范围for（C++11）
for (int x : v | std::views::reverse) {
    std::cout << x << " ";
}
```

### std::move_iterator（C++11）

```cpp
std::vector<std::string> src = {"hello", "world"};
std::vector<std::string> dst;

// 移动而不是拷贝
std::copy(std::make_move_iterator(src.begin()),
          std::make_move_iterator(src.end()),
          std::back_inserter(dst));
// src中的字符串现在是空的
```

## Lambda 与算法

```cpp
std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};

// 自定义比较排序
std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });

// 条件查找
auto it = std::find_if(v.begin(), v.end(), [](int x) { return x > 5; });

// 分区
auto mid = std::partition(v.begin(), v.end(), [](int x) { return x % 2 == 0; });

// for_each
std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << " ";
});
```

## 综合示例：学生成绩处理

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <string>

struct Student {
    std::string name;
    int score;
};

int main() {
    std::vector<Student> students = {
        {"Alice", 85}, {"Bob", 92}, {"Charlie", 78},
        {"Diana", 95}, {"Eve", 88}
    };

    // 按成绩排序
    std::sort(students.begin(), students.end(),
        [](const Student& a, const Student& b) {
            return a.score > b.score;
        });

    // 输出
    for (const auto& [name, score] : students) {
        std::cout << name << ": " << score << "\n";
    }

    // 平均分
    double avg = std::accumulate(students.begin(), students.end(), 0.0,
        [](double sum, const Student& s) { return sum + s.score; })
        / students.size();

    // 统计
    int above90 = std::count_if(students.begin(), students.end(),
        [](const Student& s) { return s.score >= 90; });

    std::cout << "平均分: " << avg << "\n";
    std::cout << "90分以上: " << above90 << "人\n";
}
```

---

**下一步**: [21-内存管理](21-内存管理.md)
