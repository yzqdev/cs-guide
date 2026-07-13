# 流程控制

[官方文档](https://go.dev/tour/flowcontrol)

## if 语句

Go 的 if 不需要括号，但必须有大括号。

```go
func main() {
	score := 85

	if score >= 90 {
		fmt.Println("优秀")
	} else if score >= 80 {
		fmt.Println("良好")
	} else if score >= 60 {
		fmt.Println("及格")
	} else {
		fmt.Println("不及格")
	}
}
```

### if 带初始化语句

```go
// if 中可以执行一个简短语句，声明的变量只在 if/else 作用域内有效
if age := 20; age >= 18 {
	fmt.Println("已成年")
} else {
	fmt.Println("未成年")
}
// fmt.Println(age) // ❌ 编译错误：age 未定义

// 常用模式：错误处理
if err := doSomething(); err != nil {
	fmt.Println("错误:", err)
	return
}
```

## switch 语句

Go 的 switch 默认带 break，不需要显式写 break。

```go
// 基本 switch
grade := "B"

switch grade {
case "A":
	fmt.Println("优秀")
case "B":
	fmt.Println("良好")
case "C":
	fmt.Println("及格")
case "D", "F":
	fmt.Println("不及格")
default:
	fmt.Println("未知等级")
}

// switch 不带表达式（相当于 if/else）
score := 85
switch {
case score >= 90:
	fmt.Println("A")
case score >= 80:
	fmt.Println("B")
case score >= 70:
	fmt.Println("C")
case score >= 60:
	fmt.Println("D")
default:
	fmt.Println("F")
}

// switch 带初始化
switch n := rand.Intn(10); n {
case 0:
	fmt.Println("零")
case 1, 3, 5, 7, 9:
	fmt.Println("奇数")
case 2, 4, 6, 8:
	fmt.Println("偶数")
}
```

### type-switch

```go
func checkType(v any) {
	switch v.(type) {
	case int:
		fmt.Println("int")
	case string:
		fmt.Println("string")
	case bool:
		fmt.Println("bool")
	case []int:
		fmt.Println("[]int")
	case nil:
		fmt.Println("nil")
	default:
		fmt.Println("unknown")
	}
}

checkType(42)       // int
checkType("hello") // string
```

## for 循环

Go 只有 `for` 一个循环关键字，但能实现所有循环模式。

### 基本 for

```go
// 标准 for 循环（类似 C/Java）
for i := 0; i < 5; i++ {
	fmt.Println(i)
}

// 省略初始化和后置语句（类似 while）
sum := 1
for sum < 1000 {
	sum += sum
}
fmt.Println(sum)

// 无限循环
// for {
//     fmt.Println("死循环")
//     time.Sleep(time.Second)
//     break // 使用 break 退出
// }
```

### for range

```go
// 遍历数组/切片
numbers := []int{10, 20, 30, 40, 50}
for i, v := range numbers {
	fmt.Printf("numbers[%d] = %d\n", i, v)
}

// 只使用索引
for i := range numbers {
	fmt.Println(numbers[i])
}

// 只使用值
for _, v := range numbers {
	fmt.Println(v)
}

// 遍历 map
scores := map[string]int{"张三": 90, "李四": 85, "王五": 78}
for name, score := range scores {
	fmt.Printf("%s: %d\n", name, score)
}

// 只遍历 key
for name := range scores {
	fmt.Println(name)
}

// 遍历字符串（按 rune）
s := "Hello, Go!"
for i, c := range s {
	fmt.Printf("s[%d] = %c\n", i, c)
}

// 遍历 channel
ch := make(chan int, 3)
ch <- 1
ch <- 2
ch <- 3
close(ch)
for v := range ch {
	fmt.Println(v) // 1, 2, 3
}
```

## break 和 continue

```go
// break 跳出当前循环
for i := 0; i < 10; i++ {
	if i == 5 {
		break // 跳出循环
	}
	fmt.Print(i) // 0 1 2 3 4
}

// continue 进入下一次循环
for i := 0; i < 5; i++ {
	if i%2 == 0 {
		continue
	}
	fmt.Print(i) // 1 3
}

// break 跳出指定层（标签）
outer:
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if i*j > 2 {
				break outer // 跳出外层循环
			}
			fmt.Printf("(%d,%d) ", i, j)
		}
	}
	// 输出: (0,0) (0,1) (0,2) (1,0) (1,1)
}
```

## defer 语句

```go
// defer 延迟执行，在函数返回前执行
func main() {
	defer fmt.Println("world")
	fmt.Println("hello")
}
// 输出: hello world

// 多个 defer 后进先出（LIFO）
func main() {
	for i := 0; i < 5; i++ {
		defer fmt.Print(i) // 4 3 2 1 0
	}
}
```

## 实用案例

```go
// 猜数字游戏
func guessNumber() {
	target := rand.Intn(100) + 1
	var guess int

	fmt.Println("猜数字（1-100）")

	for {
		fmt.Print("请输入: ")
		fmt.Scan(&guess)

		if guess < target {
			fmt.Println("太小了")
		} else if guess > target {
			fmt.Println("太大了")
		} else {
			fmt.Println("猜对了！")
			break
		}
	}
}

// 打印九九乘法表
func printTable() {
	for i := 1; i <= 9; i++ {
		for j := 1; j <= i; j++ {
			fmt.Printf("%dx%d=%-2d ", j, i, i*j)
		}
		fmt.Println()
	}
}
```
