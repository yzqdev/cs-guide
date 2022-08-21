# 易错点

## 关于new和make

### *new*和make

我们先来看一个例子：

```go
func main() {
    var a *int
    *a = 100
    fmt.Println(*a)

    var b map[string]int
    b["测试"] = 100
    fmt.Println(b)
}
```

执行上面的代码会引发panic，为什么呢？ 在Go语言中对于引用类型的变量，我们在使用的时候不仅要声明它，还要为它分配内存空间，否则我们的值就没办法存储。而对于值类型的声明不需要分配内存空间，是因为它们在声明的时候已经默认分配好了内存空间。要分配内存，就引出来今天的*new*和make。 Go语言中*new*和make是内建的两个函数，主要用来分配内存

### *new*

*new*是一个内置的函数，它的函数签名如下：

```go
    func new(Type) *Type
```

其中，

```text
    1.Type表示类型，new函数只接受一个参数，这个参数是一个类型
    2.*Type表示类型指针，new函数返回一个指向该类型内存地址的指针。
```

*new*函数不太常用，使用*new*函数得到的是一个类型的指针，并且该指针对应的值为该类型的零值。举个例子：

```go
func main() {
    a := new(int)
    b := new(bool)
    fmt.Printf("%T\n", a) // *int
    fmt.Printf("%T\n", b) // *bool
    fmt.Println(*a)       // 0
    fmt.Println(*b)       // false
}    
```

本节开始的示例代码中`var a *int`只是声明了一个指针变量a但是没有初始化，指针作为引用类型需要初始化后才会拥有内存空间，才可以给它赋值。应该按照如下方式使用内置的*new*函数对a进行初始化之后就可以正常对其赋值了：

```go
func main() {
    var a *int
    a = new(int)
    *a = 10
    fmt.Println(*a)
}
```

### make

make也是用于内存分配的，区别于*new*，它只用于slice、map以及chan的内存创建，而且它返回的类型就是这三个类型本身，而不是他们的指针类型，因为这三种类型就是引用类型，所以就没有必要返回他们的指针了。make函数的函数签名如下：

```go
func make(t Type, size ...IntegerType) Type
```

make函数是无可替代的，我们在使用slice、map以及channel的时候，都需要使用make进行初始化，然后才可以对它们进行操作。这个我们在上一章中都有说明，关于channel我们会在后续的章节详细说明。

本节开始的示例中`var b map[string]int`只是声明变量b是一个map类型的变量，需要像下面的示例代码一样使用make函数进行初始化操作之后，才能对其进行键值对赋值：

```go
func main() {
    var b map[string]int
    b = make(map[string]int, 10)
    b["测试"] = 100
    fmt.Println(b)
}
```

## 几个例子

```go
type User struct {
 lock sync.Mutex
 name string
 age  int
}

func main() {
 u := new(User)
 u.lock.Lock()
 u.name = "张三"
 u.lock.Unlock()
 fmt.Println(u)
}
```

### *new*与make的区别

```text
    1.二者都是用来做内存分配的。
    2.make只用于slice、map以及channel的初始化，返回的还是这三个引用类型本身；
    3.而new用于类型的内存分配，并且内存对应的值为类型零值，返回的是指向类型的指针。
```

## 对于结构体指针和结构体new

```go
type Test struct {
 name string
} 

test1:=new(Test)
// 在Go语言中，对结构体进行&取地址操作时，视为对该类型进行一次 new 的实例化操作,底层仍会调用new函数，此时返回的test也是指针
test2 := &Test{}
// 所以上面两个的效果是一样的(不过test1不等于test2,因为地址不一样)
```

### 指针小练习

- 程序定义一个int变量num的地址并打印
- 将num的地址赋给指针ptr，并通过ptr去修改num的值

```go
package main

import "fmt"

func main() {
    var a int
    fmt.Println(&a)
    var p *int
    p = &a
    *p = 20
    fmt.Println(a)
}
```
