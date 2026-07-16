---
order: 35
---

# 34 - 文件 I/O

## 文件流

```cpp
#include <fstream>

// 写文件
std::ofstream out("test.txt");
out << "Hello, World!\n";
out << 42 << " " << 3.14;
out.close();

// 读文件
std::ifstream in("test.txt");
std::string line;
while (std::getline(in, line)) {
    std::cout << line << "\n";
}
in.close();

// RAII方式（推荐）
{
    std::ofstream out("test.txt");
    out << "auto-closed\n";
}  // 离开作用域自动关闭
```

## 文件打开模式

```cpp
std::ofstream f1("a.txt", std::ios::out);        // 写（覆盖）
std::ofstream f2("b.txt", std::ios::app);        // 追加
std::ofstream f3("c.txt", std::ios::binary);     // 二进制模式
std::fstream f4("d.txt", std::ios::in | std::ios::out);  // 读写
```

## stringstream

```cpp
#include <sstream>

// 字符串拼接
std::stringstream ss;
ss << "Name: " << "Alice" << ", Age: " << 25;
std::string result = ss.str();

// 解析
std::stringstream parser("10 3.14 hello");
int i;
double d;
std::string s;
parser >> i >> d >> s;  // i=10, d=3.14, s="hello"

// 格式化
std::ostringstream formatted;
formatted << std::setw(10) << std::setfill('*') << 42;
// "********42"
```

## 格式化输出

```cpp
#include <iomanip>

std::cout << std::hex << 255 << "\n";           // ff
std::cout << std::oct << 255 << "\n";           // 377
std::cout << std::setw(10) << std::setfill('*') << 42;  // ********42
std::cout << std::fixed << std::setprecision(2) << 3.14159;  // 3.14
std::cout << std::scientific << 314159.0;        // 3.141590e+05

// C++20 std::format（推荐）
#include <format>
std::cout << std::format("Name: {}, Age: {}\n", "Alice", 25);
std::cout << std::format("{:>10}\n", "right");     //     right
std::cout << std::format("{:<10}\n", "left");       // left
std::cout << std::format("{:^10}\n", "center");    //   center
std::cout << std::format("{:#x}\n", 255);           // 0xff
```

## 二进制文件

```cpp
// 写入二进制
struct Record {
    int id;
    char name[32];
    double score;
};

Record r = {1, "Alice", 95.5};
{
    std::ofstream out("data.bin", std::ios::binary);
    out.write(reinterpret_cast<char*>(&r), sizeof(r));
}

// 读取二进制
Record r2;
{
    std::ifstream in("data.bin", std::ios::binary);
    in.read(reinterpret_cast<char*>(&r2), sizeof(r2));
}
```

## 文件定位

```cpp
std::fstream file("test.txt", std::ios::in | std::ios::out);

// 获取当前位置
auto pos = file.tellg();  // 读位置
auto pos2 = file.tellp(); // 写位置

// 移动到指定位置
file.seekg(0, std::ios::beg);    // 文件开头
file.seekg(-10, std::ios::end);  // 末尾前10字节
file.seekg(5, std::ios::cur);    // 当前位置+5
```

## 综合示例：CSV处理

```cpp
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>

struct Student {
    std::string name;
    int age;
    double gpa;
};

std::vector<Student> readCSV(const std::string& filename) {
    std::vector<Student> students;
    std::ifstream file(filename);
    std::string line;

    std::getline(file, line);  // 跳过标题

    while (std::getline(file, line)) {
        std::stringstream ss(line);
        Student s;
        std::string ageStr, gpaStr;

        std::getline(ss, s.name, ',');
        std::getline(ss, ageStr, ',');
        std::getline(ss, gpaStr, ',');

        s.age = std::stoi(ageStr);
        s.gpa = std::stod(gpaStr);
        students.push_back(s);
    }
    return students;
}

int main() {
    auto students = readCSV("students.csv");
    for (const auto& s : students) {
        std::cout << s.name << ", " << s.age << ", " << s.gpa << "\n";
    }
}
```

---

**下一步**: [35-多线程](35-多线程.md)
