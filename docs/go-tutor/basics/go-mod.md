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
   go mod download    下载依赖的module到本地cache（默认为$GOPATH/pkg/mod目录）
    go mod edit        编辑go.mod文件
    go mod graph       打印模块依赖图
    go mod init        初始化当前文件夹, 创建go.mod文件
    go mod tidy        增加缺少的module，删除无用的module
    go mod vendor      将依赖复制到vendor下
    go mod verify      校验依赖
    go mod why         解释为什么需要依赖 
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

## 关于直接依赖和间接依赖

比如开源软件 Kubernetes（v1.17.0版本）的 go.mod 文件中就有数十个依赖包被标记为`indirect`：

```text
require (
 github.com/Rican7/retry v0.1.0 // indirect
 github.com/auth0/go-jwt-middleware v0.0.0-20170425171159-5493cabe49f7 // indirect
 github.com/boltdb/bolt v1.3.1 // indirect
 github.com/checkpoint-restore/go-criu v0.0.0-20190109184317-bdb7599cd87b // indirect
 github.com/codegangsta/negroni v1.0.0 // indirect
 ...
)
```

在执行命令`go mod tidy`时，Go module 会自动整理`go.mod 文件`，如果有必要会在部分依赖包的后面增加`// indirect`注释。一般而言，被添加注释的包肯定是间接依赖的包，而没有添加`// indirect`注释的包则是直接依赖的包，即明确的出现在某个`import`语句中。

然而，这里需要着重强调的是：并不是所有的间接依赖都会出现在 `go.mod`文件中。

间接依赖出现在`go.mod`文件的情况，可能符合下面所列场景的一种或多种：

- 直接依赖未启用 Go module
- 直接依赖go.mod 文件中缺失部分依赖

### 直接依赖未启用 Go module

如下图所示，Module A 依赖 B，但是 B 还未切换成 Module，也即没有`go.mod`文件，此时，当使用`go mod tidy`命令更新A的`go.mod`文件时，B的两个依赖B1和B2将会被添加到A的`go.mod`文件中（前提是A之前没有依赖B1和B2），并且B1 和B2还会被添加`// indirect`的注释。

![a](https://oscimg.oschina.net/oscnet/up-11e7a118e04c3ee4ffcb258bd744ab1ab13.png#id=V03F0&originHeight=228&originWidth=406&originalType=binary&ratio=1&status=done&style=none)

此时Module A的`go.mod`文件中require部分将会变成：

```text
require (
 B vx.x.x
 B1 vx.x.x // indirect
 B2 vx.x.x // indirect
)
```

依赖B及B的依赖B1和B2都会出现在`go.mod`文件中。

### 直接依赖 go.mod 文件不完整

如上面所述，如果依赖B没有`go.mod`文件，则Module A 将会把B的所有依赖记录到A 的`go.mod`文件中。即便B拥有`go.mod`，如果`go.mod`文件不完整的话，Module A依然会记录部分B的依赖到`go.mod`文件中。

如下图所示，Module B虽然提供了`go.mod`文件中，但`go.mod`文件中只添加了依赖B1，那么此时A在引用B时，则会在A的`go.mod`文件中添加B2作为间接依赖，B1则不会出现在A的`go.mod`文件中。

![a](https://oscimg.oschina.net/oscnet/up-f185e4a01c63ffce70767ecdf065819100c.png#id=RK4Ku&originHeight=228&originWidth=406&originalType=binary&ratio=1&status=done&style=none)

此时Module A的`go.mod`文件中require部分将会变成：

```text
require (
 B vx.x.x
 B2 vx.x.x // indirect
)
```

由于B1已经包含进B的`go.mod`文件中，A的`go.mod`文件则不必再记录，只会记录缺失的B2。

### 为什么要记录间接依赖

在上面的例子中，如果某个依赖B 没有`go.mod`文件，在A 的`go.mod`文件中已经记录了依赖B及其版本号，为什么还要增加间接依赖呢？

我们知道Go module需要精确地记录软件的依赖情况，虽然此处记录了依赖B的版本号，但B的依赖情况没有记录下来，所以如果B的`go.mod`文件缺失了（或没有）这个信息，则需要在A的`go.mod`文件中记录下来。此时间接依赖的版本号将会跟据Go module的版本选择机制确定一个最优版本。

### 如何处理间接依赖

综上所述间接依赖出现在`go.mod`中，可以一定程度上说明依赖有瑕疵，要么是其不支持Go module，要么是其`go.mod`文件不完整。

由于Go 语言从v1.11版本才推出module的特性，众多开源软件迁移到go module还需要一段时间，在过渡期必然会出现间接依赖，但随着时间的推进，在`go.mod`中出现`// indirect`的机率会越来越低。

出现间接依赖可能意味着你在使用过时的软件，如果有精力的话还是推荐尽快消除间接依赖。可以通过使用依赖的新版本或者替换依赖的方式消除间接依赖。

### 如何查找间接依赖来源

Go module提供了`go mod why` 命令来解释为什么会依赖某个软件包，若要查看`go.mod`中某个间接依赖是被哪个依赖引入的，可以使用命令`go mod why -m <pkg>`来查看。

比如，我们有如下的`go.mod`文件片断：

```
require (
 github.com/Rican7/retry v0.1.0 // indirect
 github.com/google/uuid v1.0.0
 github.com/renhongcai/indirect v1.0.0
 github.com/spf13/pflag v1.0.5 // indirect
 golang.org/x/text v0.3.2
)
```

我们希望确定间接依赖`github.com/Rican7/retry v0.1.0 // indirect`是被哪个依赖引入的，则可以使用命令`go mod why`来查看：

```
[root@ecs-d8b6 gomodule]# go mod why -m github.com/Rican7/retry
# github.com/Rican7/retry
github.com/renhongcai/gomodule
github.com/renhongcai/indirect
github.com/Rican7/retry
```

上面的打印信息中`# github.com/Rican7/retry` 表示当前正在分析的依赖，后面几行则表示依赖链。`github.com/renhongcai/gomodule` 依赖`github.com/renhongcai/indirect`，而`github.com/renhongcai/indirect`依赖`github.com/Rican7/retry`。由此我们就可以判断出间接依赖`github.com/Rican7/retry`是被`github.com/renhongcai/indirect`引入的。

另外，命令`go mod why -m all`则可以分析所有依赖的依赖链。
