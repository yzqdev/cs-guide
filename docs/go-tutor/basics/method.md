# go方法和函数

## 函数

go的函数和java,c#的方法一样,不过go没有private,public,protected之类的,小写函数名表示私有,大写函数名表示导出,其他包可以访问

```go
func test(x, y int, s string) (int, string) {
    // 类型相同的相邻参数，参数类型可合并。 多返回值必须用括号。
    n := x + y          
    return n, fmt.Sprintf(s, n)
}
```

## 方法

```go
type Test struct{}

// 无参数、无返回值
func (t Test) method0() {

}
// 单参数、无返回值
func (t Test) method1(i int) {

}
// 多参数、无返回值
func (t Test) method2(x, y int) {

}
```

## 方法接收者的值类型和指针类型

```go
type User struct {
    age int
}

func (u User) add(v int) {
   u.age += v
}

func main() {
    c := User{age: 100}
    c.add(50)
    fmt.Print( "age=>"+c.age)
}

```

因为接受者是值类型,所以最后user的age是100,而不是150

```go
type User struct {
    age int
}

func (u *User) add(v int) {
   u.age += v
}

func main() {
    c := User{age: 100}
    c.add(50)
    fmt.Print( "age=>"+c.age)
}
```

而这种,因为接受者是引用类型,user.age是150
