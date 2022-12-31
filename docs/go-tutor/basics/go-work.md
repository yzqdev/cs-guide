
# go workspace

## 基础命令

```shell
#创建 workspace 工作区
mkdir workspace
cd workspace
go work init
#创建一个基础项目 demo
cd workspace
mkdir demo
go mod init demo
#添加demo项目到workspace
go work use ./demo
#重新运行项目
cd workspace
go run demo/main.go
```

## 好处

这里我们在demo项目就可以直接用libs里面的方法了
见demo的main.go

```go
package main
import (
 "fmt"
 "libs/string_lib"
)

func main() {
 fmt.Println("hello, go workspace")
 string_lib.Greet("heloo")
}

```
