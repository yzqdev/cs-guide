# Go 常用技巧

## 一、基础语法

### 变量与常量

```go
package main

import "fmt"

func main() {
    // 变量声明
    var name string = "Go"
    var version = 1.21          // 类型推断
    count := 42                  // 简短声明（仅限函数内）

    // 多变量声明
    var x, y int = 1, 2
    a, b := "hello", true

    // 常量
    const Pi = 3.14159
    const (
        StatusOK = 200
        StatusNotFound = 404
    )

    fmt.Println(name, version, count)
}
```

### 条件与循环

```go
// if
if score >= 90 {
    fmt.Println("优秀")
} else if score >= 60 {
    fmt.Println("及格")
} else {
    fmt.Println("不及格")
}

// if 带简短语句
if err := doSomething(); err != nil {
    fmt.Println("出错：", err)
}

// for（Go 只有 for 循环）
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// while 风格
sum := 1
for sum < 1000 {
    sum += sum
}

// 无限循环
// for {
//     fmt.Println("loop")
// }

// range 遍历
nums := []int{1, 2, 3, 4}
for index, value := range nums {
    fmt.Println(index, value)
}

for key, value := range map[string]string{"a": "1"} {
    fmt.Println(key, value)
}
```

## 二、函数

```go
// 多返回值
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("除数为零")
    }
    return a / b, nil
}

// 命名返回值
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return  // 裸返回
}

// 可变参数
func sum(numbers ...int) int {
    total := 0
    for _, n := range numbers {
        total += n
    }
    return total
}

// 函数作为值
func main() {
    add := func(a, b int) int { return a + b }
    fmt.Println(add(3, 5))
}
```

## 三、结构体与方法

```go
type User struct {
    Name string
    Age  int
    Email string
}

// 值接收者
func (u User) Greet() string {
    return fmt.Sprintf("你好，我是 %s", u.Name)
}

// 指针接收者（可以修改）
func (u *User) SetAge(age int) {
    u.Age = age
}

// 构造方法（约定）
func NewUser(name string, age int) *User {
    return &User{Name: name, Age: age}
}

func main() {
    u1 := User{Name: "Alice", Age: 25}
    u2 := &User{Name: "Bob", Age: 30}
    u3 := NewUser("Charlie", 28)

    fmt.Println(u1.Greet())
    u2.SetAge(31)
}
```

## 四、接口

```go
type Animal interface {
    Speak() string
}

type Dog struct{}
func (d Dog) Speak() string { return "汪汪！" }

type Cat struct{}
func (c Cat) Speak() string { return "喵喵！" }

// 空接口 —— 可以接受任何类型
func describe(i interface{}) {
    fmt.Printf("(%v, %T)\n", i, i)
}

// 类型断言
func main() {
    var animal Animal = Dog{}
    fmt.Println(animal.Speak())

    // 类型断言
    dog, ok := animal.(Dog)
    if ok {
        fmt.Println("这是狗")
    }

    // type switch
    switch v := animal.(type) {
    case Dog:
        fmt.Println("狗：", v.Speak())
    case Cat:
        fmt.Println("猫：", v.Speak())
    default:
        fmt.Println("未知动物")
    }
}
```

## 五、错误处理

```go
import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("未找到")

func findUser(id int) (string, error) {
    if id <= 0 {
        return "", ErrNotFound
    }
    return "Alice", nil
}

// 自定义错误
type ValidationError struct {
    Field string
    Value interface{}
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("字段 %s 的值 %v 无效", e.Field, e.Value)
}

func main() {
    _, err := findUser(0)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("用户未找到")
    }

    // 包装错误
    if err := doSomething(); err != nil {
        return fmt.Errorf("执行失败：%w", err)
    }
}
```

## 六、并发

```go
// goroutine
go func() {
    fmt.Println("并发执行")
}()

// channel
ch := make(chan string)
go func() {
    ch <- "Hello from goroutine"
}()
msg := <-ch
fmt.Println(msg)

// 带缓冲的 channel
ch := make(chan int, 2)
ch <- 1
ch <- 2

// select
select {
case msg := <-ch1:
    fmt.Println(msg)
case <-time.After(1 * time.Second):
    fmt.Println("超时")
default:
    fmt.Println("没有数据")
}

// sync.WaitGroup
var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        fmt.Println("工作协程：", id)
    }(i)
}
wg.Wait()
```

## 七、常用标准库

```go
// fmt
fmt.Printf("格式化：%s, %d, %f\n", "str", 42, 3.14)

// strings
strings.Contains("hello", "ll")    // true
strings.Split("a,b,c", ",")        // ["a","b","c"]
strings.Join([]string{"a","b"}, ",") // "a,b"
strings.TrimSpace("  hello  ")     // "hello"

// time
now := time.Now()
fmt.Println(now.Format("2006-01-02 15:04:05"))
// Go 的格式化时间使用这个固定日期：2006-01-02 15:04:05

// json
type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}
data, _ := json.Marshal(Person{"Alice", 25})
var p Person
json.Unmarshal(data, &p)

// io
data, _ := os.ReadFile("file.txt")
os.WriteFile("output.txt", []byte("hello"), 0644)
```

## 八、常用工具与框架

| 工具/库 | 用途 |
|---------|------|
| `go mod init` | 初始化模块 |
| `go get` | 安装依赖 |
| `go build` | 编译 |
| `go test` | 运行测试 |
| `go fmt` | 格式化代码 |
| `go vet` | 代码静态检查 |
| **Gin** | Web 框架 |
| **GORM** | ORM 库 |
| **Cobra** | CLI 工具框架 |
| **Viper** | 配置管理 |
| **Zap** | 高性能日志 |
| **Swaggo** | Swagger 文档生成 |
