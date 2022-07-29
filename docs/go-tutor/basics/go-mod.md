# go语言 mod模块(Modules)使用

> Go语言从诞生之初就一直有个被诟病的问题: 缺少一个行之有效的“官方”包依赖管理工具. 其原因是在Google内部，所有人都是在一个代码库上进行开发的,因此并不是非常需要.但是Go语言变成一个社区化的工程语言之后,这个问题被放大了.

```go
1. 设置 GO111MODULE
2. go模块使用说明
3. go mod模块示例
4. 如何升级模块版本
5. 一个模块多版本共存
```

[参考文章](https://www.melvinvivas.com/go-version-1-11-modules/)

**go mod模块特点**

```
1. 模块是相关Go包的集合(即一个模块可以包含多个package,一个包package包含多个go源文件)
2. go命令直接支持使用模块
3. 模块中记录和解决对其他模块的依赖性
4. 模块取代了旧的基于GOPATH的方法来指定
5. 有利于程序维护
6. 提高代码重用性(供他人使用)
7. 一个模块多版本共存(即同时使用同一个模块多个版本,例如为了更好的升级模块,我们先修改一小部分代码用新的版本,当模块新版本稳定后,我们在全面升级)
```

**go mod命令**

```sh
download    download modules to local cache (下载依赖的module到本地cache))
edit        edit go.mod from tools or scripts (编辑go.mod文件)
graph       print module requirement graph (打印模块依赖图))
init        initialize new module in current directory (在当前⽂件夹下初始化⼀个新的模块,创建go.mod⽂件))
tidy        add missing and remove unused modules (增加缺少的module,删除未⽤的module)
vendor      make vendored copy of dependencies (将依赖复制到vendor下)
verify      verify dependencies have expected content (校验依赖的HASH码)
why         explain why packages or modules are needed (解释为什么需要依赖)
```

### 1. 设置 GO111MODULE

```sh
可以用环境变量 GO111MODULE 开启或关闭模块支持，它有三个可选值：off、on、auto,默认值是 auto.
1. GO111MODULE=off 无模块支持,go 会从 GOPATH 和 vendor 文件夹寻找包.
2. GO111MODULE=on 模块支持,go 会忽略 GOPATH 和 vendor 文件夹,只根据 go.mod 下载依赖.
3. GO111MODULE=auto 如果找到任何go.mod,即使在GOPATH内部也开启模块支持.
(注意: 在Go 1.13之前，GO111MODULE=auto永远不会在GOPATH中启用模块模式).
```

### 2. go模块使用说明

```sh
1. (GO111MODULE=off,把项目放到$GOPATH/src之外)或者(设置GO111MODULE=on,把项目放到任意目录)即可激活模块模式
2. 在项目目录下创建模块: "go mod init 模块名",创建模块后,会在模块所在的文件夹生成go.mod文件
3. 然后在项目目录下运行命令: "go build" 、"go test" 或 "go run"执行时，会自己去修改go.mod文件，生成"go.sum"文件
```

### 3. go mod模块示例

###### 3.1 创建模块 hellomod: go mod init "hellomod"

```sh
# 1. 在github上创建仓库 hellomod
# 为什么要创建创库, 为了其他人也可以使用这个模块

# 2. 进入examples目录
cd examples 

# 3. 下载 hellomod 仓库
git clone git@github.com:qq1060656096/hellomod.git

# 4. 进入 hellomod目录
cd hellomod

# 5. 创建模块
go mod init "github.com/qq1060656096/hellomod"
# 创建模块失败会提示: "go: modules disabled inside GOPATH/src by GO111MODULE=auto; see 'go help modules'"

# 为什么创建模块失败
# 因为GO111MODULE默认值是auto, 在 GOPATH/src 之外的目录才开启模块支持
# 我们有2中方式解决以上问题
#   第1种: 在 GOPATH/src 之外的目录创建模块
#   第2种: 直接设置GO111MODULE=on 模块支持

# 这里我们直接使用第2种
export GO111MODULE=on
go mod init "github.com/qq1060656096/hellomod"
# 创建模块成功会提示"go: creating new go.mod: module github.com/qq1060656096/hellomod"
# 模块创建后里面会有一个go.mod文件

# 6. 查看go.mod文件的内容
$ cat go.mod
module github.com/qq1060656096/hellomod
# 里面只有一行, 就定义的模块名字
```

###### 3.2 hellomod模块目录下,创建hello.go文件, 并增加以下内容

```go
package hellomod

func Hello() string {
 return "Hello World!"
}
```

###### 3.3 hellomod模块目录下,创建hello_test.go文件, 并增加以下内容

```go
package hellomod

import "testing"

func TestHello(t *testing.T) {
 want := "Hello World!"
 if Hello() != want {
  t.Errorf("Hello() != %s", want)
 }
}
```

###### 3.4 hellomod模块目录下,运行模块测试 "go test -v"会输出以下内容

```sh
=== RUN   TestHello
--- PASS: TestHello (0.00s)
PASS
ok      github.com/qq1060656096/hellomod        0.004s
```

###### 3.5 提交 hellomod 模块代码到github

```sh
# 提交代码到github
git add .
git commit -m 'aaa: go hello模块第一次提交'
git push origin master
```

###### 3.6 回到examples目录并创建一个模块测试 testmod

```sh
# 回到 examples 并创建 testmod 目录, 然后在进入 testmod 目录
cd ../ && mkdir testmod && cd testmod
# 创建 testmod 模块
go mod init "testmod"

```

###### 3.7 testmod 模块中创建 main.go 文件

```go
package main

import (
 "fmt"
 "github.com/qq1060656096/hellomod"
)

func main()  {
 fmt.Println(hellomod.Hello())
}
```

###### 3.8 testmod 模块中执行命令: go run main.go

```sh

# go run main.go
# 命令会输出以下内容
go: finding github.com/qq1060656096/hellomod
go: downloading github.com/qq1060656096/hellomod
Hello World!
```

## 4. 如何升级模块版本

###### 4.1 修改 hellomod 模块 hello.go文件

```sh
package hellomod

func Hello() string {
 return "v2: Hello World!"
}
```

###### 4.2 修改 hellomod 模块 hello_test.go 文件

```go
package hellomod


import "testing"

func TestHello(t *testing.T) {
 want := "v2: Hello World!"
 if Hello() != want {
  t.Errorf("Hello() != %s", want)
 }
}
```

###### 4.3 提交 hellomod 模块代码

```sh
git add .
git commit -m "hellomod v2版本提交"
git tag -m "v2.0.0" v2.0.0
git push origin master --tags
```

###### 4.4 进入 testmod 模块目录, 升级模块

```sh
cd ../ && cd testmod
# 更新模块, 注意更新模块会更改 go.mod 文件对应模块的版本, 当然你也可以手动编辑版本号
go mod edit -require github.com/qq1060656096/hellomod@v2.0.0

go run main.go
# 命令会输出: "v2: Hello World!"
# 现在 hellomod 模块以及使用v2.0.0的代码了
```

## 5. 一个模块多版本共存

**注意**
> 为了更好的升级模块,我们先修改一小部分代码用新的版本,当模块新版本稳定后,我们在全面升级

###### 5.1 修改 hellomod 模块 go.mod 文件

```sh
module github.com/qq1060656096/hellomod/v3
```

###### 5.2 修改 hellomod 模块 hello.go 文件

```sh
package hellomod

func Hello() string {
 return "v2: Hello World!"
}

func HelloV3() string {
 return "v3.HelloV3: Hello World!"
}
```

###### 5.3 提交 hellomod 模块代码

```sh
git checkout -b v3
git add .
git commit -m "hellomod v3版本提交"
git push origin v3
git tag -m "v3.0.0" v3.0.0
git push origin master --tags
```

###### 5.3 testmod 模块中修改 main.go 文件

```go
package main

import (
 "fmt"
 "github.com/qq1060656096/hellomod"
 hellomodV3 "github.com/qq1060656096/hellomod/v3"
)

func main()  {
 fmt.Println(hellomod.Hello())
 fmt.Println(hellomodV3.HelloV3())
}
```

###### 5.4 testmod 模块中执行命令: go run main.go

```sh
cd ../ && cd testmod
# 添加v3版本模块, 注意更新模块会更改 go.mod 文件对应模块的版本, 当然你也可以手动编辑版本号
go mod edit -require github.com/qq1060656096/hellomod/v3@v3.0.0
# 如果你没有执行 "go mod edit -require github.com/qq1060656096/hellomod/v3@v3.0.0" 命令, go 在构建的时候也会自动查到依赖
```

**go run main.go执行结果**

```go
$ go run main.go                                                 
Hello World!
v3.HelloV3: Hello World!
```
