---
order: 9
---

# 08 - 数组与字符串

## C风格数组

```cpp
int arr[5];              // 未初始化（包含垃圾值）
int arr2[5] = {1,2,3};  // 部分初始化，剩余为0
int arr3[5] = {};        // 全部初始化为0
int arr4[] = {1,2,3};    // 编译器自动推断大小为3

// 访问
arr[0] = 10;             // 赋值
int x = arr[2];          // 读取

// 遍历
for (int i = 0; i < 5; i++) {
    std::cout << arr[i] << " ";
}

// 范围for
for (int x : arr) {
    std::cout << x << " ";
}
```

### C数组的局限

```cpp
int a[5] = {1,2,3,4,5};
int b[5] = a;          // 错误！C数组不能直接赋值
// a = b;              // 也错误

// 传递给函数时退化为指针
void func(int arr[]) {  // 实际上是 int* arr
    // sizeof(arr) 只是指针大小（4或8），不是数组大小
}
```

## std::array（C++11 推荐）

```cpp
#include <array>

std::array<int, 5> arr = {1, 2, 3, 4, 5};

// 不会退化为指针
std::cout << arr.size();     // 5
std::cout << arr[0];         // 1
std::cout << arr.at(2);      // 3（带越界检查）

// 迭代器
for (auto it = arr.begin(); it != arr.end(); ++it) {
    std::cout << *it << " ";
}

// 范围for
for (const auto& x : arr) {
    std::cout << x << " ";
}

// 填充
arr.fill(0);  // 全部设为0

// 结构化绑定
auto [a, b, c, d, e] = arr;  // C++17
```

## std::vector（动态数组）

```cpp
#include <vector>

// 创建
std::vector<int> v;                    // 空
std::vector<int> v2(5);               // 5个0
std::vector<int> v3(5, 10);           // 5个10
std::vector<int> v4 = {1, 2, 3, 4};  // 初始化列表

// 添加元素
v.push_back(1);
v.push_back(2);
v.emplace_back(3);  // 原地构造（更高效）

// 访问
v[0];         // 不检查边界
v.at(0);      // 越界抛 std::out_of_range
v.front();    // 第一个元素
v.back();     // 最后一个元素

// 大小
v.size();     // 元素个数
v.empty();    // 是否为空
v.capacity(); // 已分配的容量

// 删除
v.pop_back();          // 删除最后一个
v.erase(v.begin());    // 删除指定位置
v.clear();             // 清空所有

// 插入
v.insert(v.begin() + 1, 100);  // 在位置1插入100

// 保留空间（避免频繁重新分配）
v.reserve(1000);

// C++17 std::contains
if (std::ranges::contains(v, 3)) { /* ... */ }

// 二维vector
std::vector<std::vector<int>> matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```

## std::string

```cpp
#include <string>

// 创建
std::string s1;                    // 空字符串
std::string s2 = "Hello";         // 从C字符串
std::string s3(5, 'a');           // "aaaaa"
std::string s4 = s2;              // 拷贝

// 拼接
std::string result = s2 + " World";  // "Hello World"
s2 += "!";                            // "Hello!"

// 访问
s2[0];         // 'H'
s2.at(1);      // 'e'（越界检查）
s2.front();    // 'H'
s2.back();     // '!'

// 大小
s2.length();   // 同 size()
s2.size();     // 字符个数
s2.empty();    // 是否为空

// 查找
size_t pos = s2.find("World");  // 返回位置，未找到返回 std::string::npos
if (pos != std::string::npos) {
    std::cout << "Found at: " << pos;
}

// 子串
std::string sub = s2.substr(0, 5);  // "Hello"
std::string sub2 = s2.substr(6);    // "World!"

// 比较
if (s2 == "Hello!") { /* ... */ }
if (s2 < "World") { /* ... */ }
int cmp = s2.compare("Hello");  // 0=相等, <0=小于, >0=大于

// 修改
s2.replace(5, 1, " World");  // 替换
s2.erase(5);                  // 从位置5开始删除到末尾
s2.insert(0, "Say ");        // 在位置0插入

// 转换
int n = std::stoi("42");          // string → int
double d = std::stod("3.14");     // string → double
std::string ns = std::to_string(42); // int → string

// C风格
const char* cstr = s2.c_str();   // 获取C字符串
const char* data = s2.data();    // 同上
```

## std::string_view（C++17）

```cpp
#include <string_view>

// 不拥有字符串数据，只是"视图"
std::string_view sv = "Hello, World!";

sv.size();           // 13
sv[0];               // 'H'
sv.substr(0, 5);     // "Hello"
sv.find("World");    // 7

// 性能优势：避免不必要的string拷贝
void print_view(std::string_view sv) {
    std::cout << sv;
}

print_view("literal");      // 零拷贝
print_view(std::string("constructed"));  // 零拷贝
std::string s = "hello";
print_view(s);              // 零拷贝

// 注意：string_view不保证以'\0'结尾
// 不能直接用作需要C字符串的API
```

## 原始字符串字面量（C++11）

```cpp
// 处理包含反斜杠、引号的字符串
std::string path = R"(C:\Users\test\file.txt)";  // 不需要转义
std::string regex = R"(\d+\.\d+)";               // 正则表达式

// 自定义分隔符（避免内容中出现)）
std::string html = R"delim(
<div>
    <p>Hello</p>
</div>
)delim";
```

---

**下一步**: [09-指针](09-指针.md)
