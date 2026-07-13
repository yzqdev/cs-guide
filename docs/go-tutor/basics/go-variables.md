# Go 变量与数据类型

[官方文档](https://go.dev/tour/basics)

## Hello World

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, Go!")
}
```

## 变量声明

### 基本声明

```go
// var 声明
var name string = "张三"
var age int = 25
var height float64 = 175.5
var isStudent bool = true

// 类型推断（省略类型）
var city = "北京"       // string
var score = 95         // int
var temp = 36.5        // float64

// 短变量声明（函数内使用）
func main() {
	name := "张三"     // 等价于 var name string = "张三"
	age := 25
}
```

### 批量声明

```go
var (
	name    = "张三"
	age     = 25
	address = "北京"
)

// 一行声明多个
var x, y int = 1, 2
var a, b = "hello", 42
c, d := true, 3.14
```

## 常量

```go
// const 声明
const Pi = 3.14159
const AppName = "MyApp"

// 批量声明
const (
	StatusOK   = 200
	Status404  = 404
	Status500  = 500
)

// iota 枚举
const (
	Monday    = iota // 0
	Tuesday          // 1
	Wednesday        // 2
	Thursday         // 3
	Friday           // 4
	Saturday         // 5
	Sunday           // 6
)

// iota 跳过值
const (
	_   = iota           // 0（忽略）
	KB  = 1 << (10 * iota) // 1 << 10 = 1024
	MB                     // 1 << 20 = 1048576
	GB                     // 1 << 30
)
```

## 基本数据类型

### 整数类型

```go
var (
	a int     // 32或64位（取决于平台）
	b int8    // -128 ~ 127
	c int16   // -32768 ~ 32767
	d int32   // -21亿 ~ 21亿
	e int64   // 很大
	f uint    // 无符号整数
	g uint8   // 0 ~ 255 (byte)
	h uint16  // 0 ~ 65535
	i uint32  // 0 ~ 42亿
	j uint64  // 0 ~ 很大
)

// 字面量
n := 42          // 十进制
n2 := 0xFF       // 十六进制 = 255
n3 := 0o77       // 八进制 = 63
n4 := 0b1010     // 二进制 = 10

// 类型转换（Go 没有隐式转换）
var x int = 10
var y float64 = float64(x) // 必须显式转换
```

### 浮点类型

```go
var (
	f32 float32     // 约 ±3.4e38
	f64 float64     // 约 ±1.8e308（推荐）
)

pi := 3.1415926
sci := 1.23e5        // 科学计数法 = 123000
```

### 布尔类型

```go
var isOK bool = true
var isDone = false

// Go 不允许 0/1 代替 bool
// if (1) {} // ❌ 编译错误
```

### 字符串

```go
var s1 string = "Hello"
var s2 = "World"

// 多行字符串（反引号）
var multi = `这是第一行
这是第二行
这是第三行`

// 字符串拼接
s := "Hello, " + "Go!"

// 字符串长度
fmt.Println(len(s)) // 9

// 索引访问
fmt.Println(s[0]) // 72 ('H' 的 ASCII)

// 切片
fmt.Println(s[0:5]) // Hello
```

### 零值

Go 变量声明后会自动分配零值，没有未初始化的变量。

```go
var i int       // 0
var f float64   // 0
var b bool      // false
var s string    // ""
var p *int      // nil
var arr [3]int  // [0 0 0]
var slice []int // nil
var m map[string]int // nil
var ch chan int // nil
```

## 复合类型

### 数组

```go
// 固定长度
var arr1 [5]int           // [0 0 0 0 0]
var arr2 = [3]int{1, 2, 3}
arr3 := [...]int{1, 2, 3, 4, 5} // 自动推断长度

// 索引访问
fmt.Println(arr2[0]) // 1
arr2[1] = 99

// 遍历
for i, v := range arr3 {
	fmt.Printf("arr[%d] = %d\n", i, v)
}
```

### 切片（Slice）

```go
// 创建切片
var s1 []int
s2 := []int{1, 2, 3}
s3 := make([]int, 5)      // len=5, cap=5
s4 := make([]int, 3, 5)   // len=3, cap=5

// 追加
s := []int{1, 2, 3}
s = append(s, 4, 5)
s = append(s, []int{6, 7}...)

// 切片操作
arr := [5]int{1, 2, 3, 4, 5}
slice := arr[1:4]  // [2, 3, 4]

// len 和 cap
fmt.Println(len(s), cap(s))

// 遍历
for i, v := range s {
	fmt.Printf("s[%d] = %d\n", i, v)
}

// 复制
src := []int{1, 2, 3}
dst := make([]int, len(src))
copy(dst, src)
```

### Map

```go
// 创建 map
var m1 map[string]int         // nil，不能直接赋值
m2 := map[string]int{}
m3 := make(map[string]int)
m4 := map[string]int{
	"苹果": 5,
	"香蕉": 3,
}

// 增删改查
scores := make(map[string]int)
scores["张三"] = 95
scores["李四"] = 87
scores["王五"] = 78

delete(scores, "李四")        // 删除

score, ok := scores["张三"]    // 安全获取
if ok {
	fmt.Println(score)
}

// 遍历
for name, score := range scores {
	fmt.Printf("%s: %d\n", name, score)
}

// 仅遍历 key
for name := range scores {
	fmt.Println(name)
}
```

### 结构体

```go
type Person struct {
	Name string
	Age  int
	City string
}

// 创建
p1 := Person{"张三", 25, "北京"}
p2 := Person{Name: "李四", Age: 30}
p3 := Person{Name: "王五"}  // Age=0, City=""

// 访问
fmt.Println(p1.Name, p1.Age)

// 指针
p4 := &Person{Name: "赵六"}
fmt.Println(p4.Name) // 自动解引用

// 匿名结构体
user := struct {
	ID   int
	Name string
}{ID: 1, Name: "admin"}
```

## 类型别名与自定义类型

```go
// 类型别名
type MyInt = int
var n MyInt = 42

// 自定义类型（新类型）
type Age int
type Score float64

var a Age = 25
// int(a) // 需要显式转换
```

## 类型转换

```go
// Go 没有隐式类型转换
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)

// 字符串与数字
s := strconv.Itoa(42)          // int → string
n, _ := strconv.Atoi("42")     // string → int
f2, _ := strconv.ParseFloat("3.14", 64)

// 接口类型断言
var val interface{} = "hello"
str := val.(string)
str, ok := val.(string) // 安全断言
```

## 输出与格式化

```go
fmt.Println("Hello")           // 换行输出
fmt.Printf("年龄: %d\n", 25)   // 格式化
fmt.Sprintf("name: %s", "张三") // 返回字符串

// 常用格式化动词
// %v  值的默认格式
// %+v 结构体带字段名
// %#v Go 语法格式
// %T  类型
// %d  十进制整数
// %f  浮点数
// %s  字符串
// %t  布尔值
// %p  指针
```
