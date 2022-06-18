---
headerDepth: 4
---

# go导入包

golang 使用包 package 来管理定义模块，可以使用 import 关键字来导入使用。

- 如果导入的是 go 自带的包，则会去安装目录`$GOROOT/src` 按包路径加载，如 fmt 包
- 如果是我们 go get 安装或自定义的包，则会去 `$GOPATH/src` 下加载

## package 的定义

package 的存放位置是以 `$GOPATH/src` 作为根目录，然后灵活的按照目录去组织，且包名需与最后一级目录名一致。

例如我们自定义 baz 包，包模块的存放位置则为 `$GOPATH/src/foo/bar/baz`，baz 包的源码都存放在此目录下，foo/bar/baz 则作为包路径被 import 载入。

我们需要规范的将 baz 包中源码的 package 定义为 baz，就定义好一个可 import 载入的的包了。

hello 模块

```go
//$GOPATH/src/foo/bar/baz/hello.go
package baz

import (
    "fmt"
)

// 模块初始化函数 import 包时被调用
func init() {
    fmt.Println("hello module init function")
}

func Hello() {
    return "hello"
}
```

world 模块

```go
//$GOPATH/src/foo/bar/baz/world.go
package baz

import (
    "fmt"
)

// 模块初始化函数 import 包时被调用
func init() {
    fmt.Println("world module init function")
}

func World() string {
    return "world"
}
package main

import (
    "fmt"
    "foo/bar/baz" //引入我们自定义的包
)

func main() {
    fmt.Println(baz.Hello(), baz.World())
}
```

## import的使用

### 普通操作

```go
import (
    "fmt"
    "log"
    "foo/bar/baz"
)
```

普通导入就是按照加载机制，将要使用的包导入进来，然后使用 packageName.MethodName 的方式调用包内的方法即可。注意如果要包方法在其他包中可以调用，包方法需要首字母大写，例如：fmt.Println() fmt.Printf()。

### 别名操作

```go
package main

import (
    "fmt"
    myBaz "foo/bar/baz"
)

func main() {
    fmt.Println(myBaz.Hello(), myBaz.World())
}
```

如果两个包的包名存在冲突，或者包名太长需要简写时，我们可以使用别名导入来解决。

### 点操作

```go
package main

import (
    "fmt"
    . "foo/bar/baz"
)

func main() {
    fmt.Println(Hello(), World()) // 直接使用包内的方法即可 不需要显式使用包名
}
```

. 导入可以让包内的方法注册到当前包的上下文中，直接调用方法名即可，不需要再加包前缀。

### 下划线操作

```go
package main

import (
    "fmt"
    _ "foo/bar/baz"
)

func main() {
    fmt.Println(baz.Hello(), baz.World()) // 错误 _ 并没有导入包 只是引入并执行包模块的 init  方法
}
```

_ 是包引用操作，只会执行包下各模块中的 init 方法，并不会真正的导入包，所以不可以调用包内的其他方法。

#### 四级

水电费可的方法
