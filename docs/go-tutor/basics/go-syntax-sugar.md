# Go 语法糖与惯用法

Go 语言设计哲学追求简洁，但也有不少语法糖和惯用写法让代码更简洁。

## := 短变量声明

```go
// 传统 var 声明
var name string = "张三"
var age int = 25

// 短变量声明（类型推断）
name := "张三"
age := 25
count, err := strconv.Atoi("42")

// := 至少有一个新变量
x := 1
x, y := 2, 3 // x 已存在，y 是新变量
```

## _ 忽略返回值

```go
// 忽略不需要的返回值
n, _ := strconv.Atoi("42") // 忽略 error
_, err := doSomething()     // 忽略第一个返回值

// 忽略 range 的索引
for _, v := range items {
	fmt.Println(v)
}

// 忽略 map 的 value
for key := range myMap {
	fmt.Println(key)
}
```

## ... 展开运算符

```go
// 切片展开
nums := []int{1, 2, 3}
result := append([]int{0}, nums...) // [0, 1, 2, 3]

// 可变参数
func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

numbers := []int{1, 2, 3, 4, 5}
fmt.Println(sum(numbers...)) // 15
```

## 多返回值

```go
// 直接返回多个值
func swap(a, b int) (int, int) {
	return b, a
}

// 命名返回值
func divide(a, b int) (q, r int) {
	q = a / b
	r = a % b
	return // 裸返回
}

x, y := swap(1, 2)  // x=2, y=1
```

## 类型断言

```go
var v any = "hello"

// 安全断言
s, ok := v.(string)
if ok {
	fmt.Println(s)
}

// switch 类型判断
switch v.(type) {
case int:
case string:
case bool:
}
```

## defer 延迟调用

```go
// 资源自动释放
func readFile(path string) (string, error) {
	f, err := os.Open(path)
	if err != nil {
		return "", err
	}
	defer f.Close() // 函数结束时自动执行

	data, err := io.ReadAll(f)
	return string(data), err
}

// 多个 defer 按 LIFO 顺序执行
func main() {
	defer fmt.Println(1)
	defer fmt.Println(2)
	defer fmt.Println(3)
}
// 输出: 3 2 1
```

## 切片操作

```go
// 切片就是动态数组
s := []int{1, 2, 3}

// 追加
s = append(s, 4)
s = append(s, 5, 6)
s = append(s, []int{7, 8}...)

// 删除元素
s = append(s[:2], s[3:]...) // 删除 index=2 的元素

// 复制
dst := make([]int, len(s))
copy(dst, s)
```

## 匿名结构体

```go
// 一次性使用的结构体
user := struct {
	ID   int
	Name string
}{
	ID:   1,
	Name: "张三",
}
```

## 结构体标签

```go
type User struct {
	Name string `json:"name" validate:"required"`
	Age  int    `json:"age" validate:"gte=0,lte=150"`
}

// 通过反射读取标签
t := reflect.TypeOf(User{})
field, _ := t.FieldByName("Name")
fmt.Println(field.Tag.Get("json")) // name
```

## iota 枚举

```go
const (
	_   = iota          // 0（忽略）
	KB  = 1 << (10 * iota) // 1 << 10 = 1024
	MB                     // 1 << 20 = 1048576
	GB                     // 1 << 30
	TB                     // 1 << 40
)
```

## go 关键字

```go
// 启动 goroutine
go func() {
	fmt.Println("并发执行")
}()

// 简洁的并发
go worker(jobs, results)
```

## 惯用写法速查

| 模式 | 写法 | 说明 |
|------|------|------|
| 错误处理 | `if err != nil { return err }` | Go 最常用的模式 |
| 延迟释放 | `defer f.Close()` | 确保资源释放 |
| 构造对象 | `&Config{Host: "localhost"}` | 返回指针 |
| 类型断言 | `val, ok := x.(Type)` | 安全类型转换 |
| 空检查 | `if s != ""` | 字符串非空 |
| 零值判断 | `if err != nil` | 错误非 nil |
| 简写声明 | `a, b := 1, 2` | 多变量赋值 |
| 忽略值 | `_, err := fn()` | 忽略不需要的返回值 |
| 范围遍历 | `for k, v := range m` | 遍历 map/slice |
| 实例化 | `m := map[string]int{}` | 创建空 map |
| 匿名函数 | `fn := func() { ... }` | 函数赋值 |
| 条件初始化 | `if x := fn(); x > 0 { ... }` | if 内初始化 |

## Go 与其他语言对比

| 特性 | Go | Java/C# |
|------|-----|---------|
| 变量声明 | `x := 1` 或 `var x = 1` | `int x = 1` |
| 错误处理 | `if err != nil` | try/catch |
| 循环 | 只有 `for` | `for`/`while`/`do-while` |
| 对象创建 | `&T{}` 或 `new(T)` | `new T()` |
| 泛型 | 1.18+ 支持 | 内置支持 |
| 枚举 | `iota` 常量 | `enum` 关键字 |
| 继承 | 组合 + 接口 | `extends`/`implements` |
| 并发 | `go` + channel | 线程 + 锁 |
| 包管理 | `go mod` | Maven/Gradle/NuGet |
