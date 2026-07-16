---
order: 14
---

# 13 - 运算符重载

## 基本概念

运算符重载让自定义类型像内置类型一样使用运算符。

```cpp
class Vec2 {
public:
    double x, y;

    Vec2(double x = 0, double y = 0) : x(x), y(y) {}

    // 成员函数重载
    Vec2 operator+(const Vec2& other) const {
        return {x + other.x, y + other.y};
    }

    Vec2& operator+=(const Vec2& other) {
        x += other.x;
        y += other.y;
        return *this;
    }

    bool operator==(const Vec2& other) const {
        return x == other.x && y == other.y;
    }

    bool operator!=(const Vec2& other) const {
        return !(*this == other);
    }
};
```

## 友元函数重载

```cpp
class Vec2 {
public:
    double x, y;
    Vec2(double x = 0, double y = 0) : x(x), y(y) {}

    // 友元：左操作数不是本类时使用
    friend Vec2 operator*(double scalar, const Vec2& v) {
        return {scalar * v.x, scalar * v.y};
    }

    friend std::ostream& operator<<(std::ostream& os, const Vec2& v) {
        return os << "(" << v.x << ", " << v.y << ")";
    }
};

Vec2 v(1, 2);
std::cout << 3.0 * v;  // (3, 6)
```

## 常用运算符重载

### 索引运算符 []

```cpp
class Matrix {
    std::vector<std::vector<int>> data;
public:
    Matrix(int rows, int cols) : data(rows, std::vector<int>(cols, 0)) {}

    // 非const版本（可读可写）
    std::vector<int>& operator[](int row) {
        return data[row];
    }

    // const版本（只读）
    const std::vector<int>& operator[](int row) const {
        return data[row];
    }
};

Matrix m(3, 3);
m[0][1] = 5;          // 非const
const Matrix& cm = m;
int val = cm[0][1];   // const
```

### 函数调用运算符 ()

```cpp
class Adder {
    int offset;
public:
    Adder(int offset) : offset(offset) {}
    int operator()(int x) const { return x + offset; }
};

Adder add5(5);
std::cout << add5(10);  // 15（像函数一样调用对象）
```

### 类型转换运算符

```cpp
class BoolWrapper {
    bool value;
public:
    BoolWrapper(bool v) : value(v) {}
    explicit operator bool() const { return value; }  // explicit避免隐式转换
};

BoolWrapper b(true);
if (b) { /* OK，explicit允许在if中隐式转换 */ }
// int x = b;  // 错误：explicit阻止了隐式转换
```

## 自增/自减运算符

```cpp
class Counter {
    int value;
public:
    Counter(int v = 0) : value(v) {}

    // 前置 ++（返回引用）
    Counter& operator++() {
        ++value;
        return *this;
    }

    // 后置 ++（返回旧值的副本，接受int参数区分）
    Counter operator++(int) {
        Counter old = *this;
        ++value;
        return old;
    }

    // 前置 --
    Counter& operator--() {
        --value;
        return *this;
    }

    // 后置 --
    Counter operator--(int) {
        Counter old = *this;
        --value;
        return old;
    }

    int get() const { return value; }
};
```

## 赋值运算符

```cpp
class DynArray {
    int* data;
    size_t size;
public:
    DynArray(size_t n) : data(new int[n]{}), size(n) {}
    ~DynArray() { delete[] data; }

    // 拷贝赋值运算符（五法则之一）
    DynArray& operator=(const DynArray& other) {
        if (this != &other) {  // 防止自赋值
            delete[] data;
            size = other.size;
            data = new int[size];
            std::copy(other.data, other.data + size, data);
        }
        return *this;
    }

    // 移动赋值运算符
    DynArray& operator=(DynArray&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }
};
```

## 不能重载的运算符

```
::   .   .*   ?:   sizeof   typeid
```

## 重载规则总结

| 运算符 | 推荐方式 | 说明 |
|--------|---------|------|
| `+` `-` `*` `/` | 友元或成员 | 对称运算符用友元 |
| `+=` `-=` `*=` | 成员函数 | 修改自身 |
| `==` `!=` | 友元或成员 | 对称比较 |
| `<` `<=` `>` `>=` | 友元或成员 | 建议同时重载<=> |
| `[]` | 成员函数 | 只能是成员 |
| `()` | 成员函数 | 只能是成员 |
| `->` | 成员函数 | 只能是成员 |
| `<<` `>>` | 友元函数 | 左操作数是流 |
| `++` `--` | 成员或友元 | 区分前置后置 |

---

**下一步**: [14-继承](14-继承.md)
