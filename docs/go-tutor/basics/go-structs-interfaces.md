# Go 结构体与接口

[官方文档](https://go.dev/tour/methods)

## 结构体（Struct）

### 定义与使用

```go
type User struct {
	ID       int
	Name     string
	Email    string
	Age      int
	IsActive bool
}

func main() {
	// 方式1：按顺序赋值
	u1 := User{1, "张三", "zhangsan@test.com", 25, true}

	// 方式2：指定字段名（推荐）
	u2 := User{
		ID:       2,
		Name:     "李四",
		Email:    "lisi@test.com",
		Age:      30,
		IsActive: false,
	}

	// 方式3：部分字段（其余为零值）
	u3 := User{Name: "王五"}

	// 访问和修改
	fmt.Println(u1.Name) // 张三
	u1.Age = 26
}
```

### 结构体嵌套

```go
type Address struct {
	Street  string
	City    string
	Country string
}

type Employee struct {
	Name     string
	Age      int
	Address  Address        // 命名嵌套
	Phone    string
}

type Manager struct {
	Name    string
	Address // 匿名嵌套（字段提升）
	Level   int
}

func main() {
	// 命名嵌套访问
	emp := Employee{
		Name: "张三",
		Address: Address{
			Street:  "长安街",
			City:    "北京",
			Country: "中国",
		},
	}
	fmt.Println(emp.Address.City) // 北京

	// 匿名嵌套（字段提升）
	mgr := Manager{
		Name:  "李四",
		Address: Address{City: "上海"},
		Level: 2,
	}
	fmt.Println(mgr.City) // 上海（直接访问提升字段）
}
```

### 结构体方法

```go
type Rectangle struct {
	Width  float64
	Height float64
}

// 值接收者
func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

// 指针接收者（可以修改原值）
func (r *Rectangle) Scale(factor float64) {
	r.Width *= factor
	r.Height *= factor
}

func main() {
	r := Rectangle{Width: 10, Height: 5}
	fmt.Println(r.Area()) // 50

	r.Scale(2)
	fmt.Println(r.Width)  // 20
	fmt.Println(r.Height) // 10
}
```

### 构造方法

```go
type Config struct {
	Host string
	Port int
	User string
	Pass string
}

// 构造函数（非必须，Go没有构造方法语法）
func NewConfig(host string, port int) *Config {
	return &Config{
		Host: host,
		Port: port,
		User: "admin",
		Pass: "default",
	}
}

func (c *Config) WithAuth(user, pass string) *Config {
	c.User = user
	c.Pass = pass
	return c
}

func main() {
	// 工厂函数
	cfg := NewConfig("localhost", 8080)
	cfg.WithAuth("root", "secret")
}
```

### 结构体标签（Tag）

```go
type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price,omitempty"`
	Tags  []string `json:"tags,omitempty"`
}

func main() {
	p := Product{ID: 1, Name: "手机", Price: 2999}
	
	// 序列化 JSON
	data, _ := json.Marshal(p)
	fmt.Println(string(data))
	// {"id":1,"name":"手机","price":2999}

	// 反序列化
	var p2 Product
	json.Unmarshal(data, &p2)
	fmt.Println(p2.Name) // 手机

	// 获取标签
	t := reflect.TypeOf(Product{})
	field, _ := t.FieldByName("Name")
	fmt.Println(field.Tag.Get("json")) // name
}
```

## 接口（Interface）

### 定义与实现

```go
// 定义接口
type Animal interface {
	Speak() string
	Move() string
}

// Dog 实现 Animal 接口
type Dog struct{}

func (d Dog) Speak() string { return "汪汪！" }
func (d Dog) Move() string  { return "奔跑" }

// Cat 实现 Animal 接口
type Cat struct{}

func (c Cat) Speak() string { return "喵喵！" }
func (c Cat) Move() string  { return "爬行" }

func main() {
	var a Animal

	a = Dog{}
	fmt.Println(a.Speak(), a.Move()) // 汪汪！ 奔跑

	a = Cat{}
	fmt.Println(a.Speak(), a.Move()) // 喵喵！ 爬行
}
```

### 空接口

```go
// interface{} 可以表示任意类型（Go 1.18+ 可用 any）
var v any

v = 42
v = "hello"
v = true
v = []int{1, 2, 3}

// 类型断言
func printValue(v any) {
	switch val := v.(type) {
	case int:
		fmt.Println("整数:", val)
	case string:
		fmt.Println("字符串:", val)
	case bool:
		fmt.Println("布尔值:", val)
	default:
		fmt.Println("其他类型:", val)
	}
}

printValue(42)       // 整数: 42
printValue("hello") // 字符串: hello
```

### 接口组合

```go
type Reader interface {
	Read(p []byte) (n int, err error)
}

type Writer interface {
	Write(p []byte) (n int, err error)
}

// 组合接口
type ReadWriter interface {
	Reader
	Writer
}

// 也可以用这种方式组合
type Closer interface {
	Close() error
}

type ReadWriteCloser interface {
	Reader
	Writer
	Closer
}
```

### 类型断言

```go
var i any = "hello"

// 安全断言
s, ok := i.(string)
if ok {
	fmt.Println(s) // hello
}

// 直接断言（不成功则 panic）
// s := i.(string) // 安全

// switch 类型判断
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
	default:
		fmt.Println("unknown")
	}
}
```

## 泛型（Go 1.18+）

```go
// 泛型函数
func Min[T ~int | ~float64](a, b T) T {
	if a < b {
		return a
	}
	return b
}

// 泛型结构体
type Stack[T any] struct {
	items []T
}

func (s *Stack[T]) Push(item T) {
	s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
	if len(s.items) == 0 {
		var zero T
		return zero, false
	}
	item := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return item, true
}

func main() {
	fmt.Println(Min(10, 20))      // 10
	fmt.Println(Min(3.14, 2.71)) // 2.71

	stack := Stack[string]{}
	stack.Push("a")
	stack.Push("b")
	val, ok := stack.Pop()
	fmt.Println(val, ok) // b true
}

// 泛型约束
type Number interface {
	~int | ~int32 | ~int64 | ~float32 | ~float64
}

func Sum[T Number](nums []T) T {
	var total T
	for _, n := range nums {
		total += n
	}
	return total
}
```

## 实际案例

```go
// 简单的 ORM 模型
type Model struct {
	ID        int64     `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type User struct {
	Model
	Name  string `json:"name"`
	Email string `json:"email"`
	Age   int    `json:"age,omitempty"`
}

type Post struct {
	Model
	Title   string `json:"title"`
	Content string `json:"content"`
	UserID  int64  `json:"user_id"`
}

// 仓储接口
type Repository[T any] interface {
	Create(entity *T) error
	GetByID(id int64) (*T, error)
	Update(entity *T) error
	Delete(id int64) error
}

// 接口实现多态
type PaymentMethod interface {
	Pay(amount float64) string
}

type Alipay struct{}
func (a Alipay) Pay(amount float64) string {
	return fmt.Sprintf("支付宝支付 %.2f 元", amount)
}

type WechatPay struct{}
func (w WechatPay) Pay(amount float64) string {
	return fmt.Sprintf("微信支付 %.2f 元", amount)
}

func checkout(pm PaymentMethod, amount float64) {
	fmt.Println(pm.Pay(amount))
}

func main() {
	checkout(Alipay{}, 99.9)
	checkout(WechatPay{}, 50.5)
}
```
