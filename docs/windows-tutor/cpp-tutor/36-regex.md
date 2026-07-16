---
order: 37
---

# 36 - 正则表达式

## 基本用法

```cpp
#include <regex>

// 匹配
std::regex pattern(R"(\d{3}-\d{4})");  // 电话号码格式
std::string text = "Call 123-4567 or 890-1234";

if (std::regex_search(text, pattern)) {
    std::cout << "Found!\n";
}

// 提取匹配
std::smatch match;
if (std::regex_search(text, match, pattern)) {
    std::cout << match[0] << "\n";  // 123-4567
}
```

## 搜索所有匹配

```cpp
std::string text = "123-4567, 890-1234, 567-8901";
std::regex pattern(R"(\d{3}-\d{4})");

auto begin = std::sregex_iterator(text.begin(), text.end(), pattern);
auto end = std::sregex_iterator();

for (auto it = begin; it != end; ++it) {
    std::cout << it->str() << "\n";
}
```

## 替换

```cpp
std::string text = "Hello World, Hello C++";
std::regex pattern("Hello");
std::string replacement = "Hi";

std::string result = std::regex_replace(text, pattern, replacement);
// "Hi World, Hi C++"
```

## 捕获组

```cpp
std::regex pattern(R"((\w+)@(\w+)\.(\w+))");
std::string email = "user@example.com";
std::smatch match;

if (std::regex_match(email, match, pattern)) {
    std::cout << "User: " << match[1] << "\n";   // user
    std::cout << "Domain: " << match[2] << "\n";  // example
    std::cout << "TLD: " << match[3] << "\n";     // com
}
```

## regex_match vs regex_search

```cpp
std::regex pattern(R"(\d+)");

// regex_match: 整个字符串必须匹配
std::regex_match("123", pattern);    // true
std::regex_match("123abc", pattern); // false

// regex_search: 部分匹配即可
std::regex_search("123abc", pattern); // true
```

## 正则表达式语法速查

| 语法 | 说明 |
|------|------|
| `.` | 任意字符 |
| `\d` | 数字 [0-9] |
| `\w` | 单词字符 [a-zA-Z0-9_] |
| `\s` | 空白字符 |
| `*` | 0次或多次 |
| `+` | 1次或多次 |
| `?` | 0次或1次 |
| `{n}` | 恰好n次 |
| `{n,m}` | n到m次 |
| `^` | 行首 |
| `$` | 行尾 |
| `[]` | 字符类 |
| `()` | 捕获组 |
| `\|` | 或 |

## 实用示例

```cpp
// 验证邮箱
bool isValidEmail(const std::string& email) {
    std::regex pattern(R"(^[\w.-]+@[\w.-]+\.\w+$)");
    return std::regex_match(email, pattern);
}

// 提取数字
std::vector<int> extractNumbers(const std::string& text) {
    std::regex pattern(R"(-?\d+)");
    std::vector<int> numbers;
    auto begin = std::sregex_iterator(text.begin(), text.end(), pattern);
    for (auto it = begin; it != std::sregex_iterator(); ++it) {
        numbers.push_back(std::stoi(it->str()));
    }
    return numbers;
}

// 格式化日期
std::string formatDate(const std::string& input) {
    std::regex pattern(R"((\d{4})-(\d{2})-(\d{2}))");
    return std::regex_replace(input, pattern, "$3/$2/$1");
}
```

---

**下一步**: [37-编译与链接](37-编译与链接.md)
