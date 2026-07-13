# Go 错误处理

[官方文档](https://go.dev/blog/error-handling-and-go)

## error 接口

Go 通过返回值处理错误，没有 try/catch。

```go
// error 是一个内置接口
type error interface {
	Error() string
}
```

### 基本错误处理

```go
import (
	"fmt"
	"strconv"
)

func main() {
	// 函数返回 (结果, 错误)
	n, err := strconv.Atoi("42")
	if err != nil {
		fmt.Println("转换失败:", err)
		return
	}
	fmt.Println("结果:", n)

	// 错误检查是 Go 的常见模式
	f, err := os.Open("test.txt")
	if err != nil {
		fmt.Println("打开文件失败:", err)
		return
	}
	defer f.Close()
}
```

## 创建错误

### errors.New

```go
import "errors"

var ErrNotFound = errors.New("未找到")
var ErrInvalidInput = errors.New("无效输入")

func FindUser(id int) (string, error) {
	if id <= 0 {
		return "", ErrInvalidInput
	}
	if id > 100 {
		return "", ErrNotFound
	}
	return "张三", nil
}

func main() {
	user, err := FindUser(-1)
	if err != nil {
		switch {
		case errors.Is(err, ErrInvalidInput):
			fmt.Println("输入错误")
		case errors.Is(err, ErrNotFound):
			fmt.Println("未找到用户")
		default:
			fmt.Println("未知错误")
		}
		return
	}
	fmt.Println(user)
}
```

### fmt.Errorf

```go
// 格式化错误
err := fmt.Errorf("用户 %d 不存在", 42)

// 包装错误（Go 1.13+）
func readConfig(path string) error {
	f, err := os.Open(path)
	if err != nil {
		return fmt.Errorf("读取配置失败: %w", err)
	}
	defer f.Close()
	return nil
}

func main() {
	err := readConfig("/not/exist")
	if err != nil {
		fmt.Println(err) // 读取配置失败: open /not/exist: no such file or directory

		// 使用 errors.Is 检查被包装的错误
		if errors.Is(err, os.ErrNotExist) {
			fmt.Println("文件不存在")
		}
	}
}

// errors.Unwrap 获取原始错误
// errors.As 检查错误类型
```

## 自定义错误

```go
type ValidationError struct {
	Field string
	Value any
	Msg   string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("字段 %s 验证失败: %s (值=%v)", e.Field, e.Msg, e.Value)
}

func validateAge(age int) error {
	if age < 0 {
		return &ValidationError{
			Field: "age",
			Value: age,
			Msg:   "年龄不能为负数",
		}
	}
	if age > 150 {
		return &ValidationError{
			Field: "age",
			Value: age,
			Msg:   "年龄超出范围",
		}
	}
	return nil
}

func main() {
	err := validateAge(-5)
	var ve *ValidationError
	if errors.As(err, &ve) {
		fmt.Printf("字段: %s, 消息: %s\n", ve.Field, ve.Msg)
	}
}
```

## panic 和 recover

```go
// panic 用于不可恢复的错误
func main() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("恢复:", r)
		}
	}()

	fmt.Println("开始")
	panic("严重错误")
	fmt.Println("结束") // 不会执行
}

// 利用 recover 防止程序崩溃
func safeExecute(fn func()) (err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("panic: %v", r)
		}
	}()
	fn()
	return
}

func main() {
	err := safeExecute(func() {
		panic("出错了")
	})
	fmt.Println(err) // panic: 出错了
}
```

## defer + recover 清理

```go
func main() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("程序崩溃，清理中...")
			// 清理资源
		}
	}()

	// 业务代码...
	panic("数据库连接失败")
}
```

## 错误处理最佳实践

```go
// 1. 尽早返回错误
func process(id int) error {
	if id <= 0 {
		return ErrInvalidInput
	}

	data, err := fetchData(id)
	if err != nil {
		return fmt.Errorf("获取数据失败: %w", err)
	}

	result, err := processData(data)
	if err != nil {
		return fmt.Errorf("处理数据失败: %w", err)
	}

	return saveResult(result)
}

// 2. 使用哨兵错误
var (
	ErrNotFound   = errors.New("resource not found")
	ErrForbidden  = errors.New("permission denied")
	ErrTimeout    = errors.New("operation timed out")
)

// 3. 错误类型与哨兵结合
type Temporary interface {
	Temporary() bool
}

func isTemporary(err error) bool {
	var te Temporary
	return errors.As(err, &te)
}
```

## 实际案例

```go
// 安全的除法
func safeDivide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("除数不能为零")
	}
	return a / b, nil
}

// 批量处理，收集所有错误
type BatchError struct {
	Errors []error
}

func (e *BatchError) Error() string {
	var msgs []string
	for _, err := range e.Errors {
		msgs = append(msgs, err.Error())
	}
	return strings.Join(msgs, "; ")
}

func (e *BatchError) Add(err error) {
	e.Errors = append(e.Errors, err)
}

func processBatch(items []string) error {
	var batchErr BatchError
	for _, item := range items {
		if err := processItem(item); err != nil {
			batchErr.Add(fmt.Errorf("处理 %s 失败: %w", item, err))
		}
	}
	if len(batchErr.Errors) > 0 {
		return &batchErr
	}
	return nil
}
```
