# go命令

## go命令

注意 cgo 不支持交叉编译

```powershell
param (
    [String]$Type = "run"
)
$name = "bpass-server"
$curDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "当前路径"$curDir   -ForegroundColor Yellow
if ($Type -eq "build") {
    Write-Host "编译" -ForegroundColor Red
    gf build main.go
}
elseif ($Type -eq "run") {
    Write-Host "运行" -ForegroundColor Cyan
    $env:CGO_ENABLED = 1
    Write-Host "CGO_ENABLED => $env:CGO_ENABLED" -ForegroundColor Cyan
    gf run  main.go
}

```

使用pure go sqlite driver

```
https://github.com/glebarez/sqlite
```

或者使用`https://github.com/msys2/msys2-installer/`不要使用mingw windows上用不了

## go 交叉编译

```powershell
$Env:GOOS = "linux"; $Env:GOARCH = "amd64"; go build
```

## pm2命令

```
pm2 start `which verdaccio`
```

# go 命令详解

:::tip
常用命令

```shell
#运行(相当于go build&&./main.exe)
go run main.go
# 打包
go build

# 去除调试信息
go build -ldflags="-s -w"
#安装依赖
go get github.com/golang-jwt/jwt/v4

go get -u

go mod tidy 

#查看所有可以更新的依赖
go list -u -f '{{if (and (not (or .Main .Indirect)) .Update)}}{{.Path}}: {{.Version}} -> {{.Update.Version}}{{end}}' -m all > update.txt 

或者使用go-mod-upgrade
https://github.com/oligot/go-mod-upgrade

```

关于gin打包
写一个build.ps1文件

```powershell
$Env:GOOS = "linux";
$Env:GOARCH = "amd64"
$Env:GIN_MODE="release"
#$env:CGO_ENABLED = "1"
go build
```

:::

:::info

1. build 编译包和依赖项
2. clean 删除对象文件和缓存的文件
3. doc与godoc 显示包文档
4. env 打印Go语言的环境信息
5. fix与go tool fix 会把指定包中的所有Go语言源码文件中旧版本代码修正为新版本的代码,升级版本时非常有用
6. fmt与gofmt 格式化go源文件
7. generate
8. get 下载并安装包和依赖(下载包和依赖,并对它们进行编译安装)
9. install 编译并安装指定包及它们的依赖包,
10. list 列出包和模块信息
11. mod 管理模块
12. run 编译并运行Go程序
13. test 测试包
14. tool 运行指定的go工具
15. version 查看当前go语言版本
16. vet 报告包中可能出现的错误
:::

## 1. build 编译包和依赖项

```sh
build 编译包和依赖项
usage: go build [-o output] [-i] [build flags] [packages]
 用法:  go build [-o output] [-i] [build 参数] [包]
 可选参数:
    -o 编译单个包才能使用(不能同时对多个代码包进行编译),例如我们经常重新命名可执行文件名字
    -i 标志安装的包是目标的依赖项
    -a 强制重新构建已经更新的包
    -n 打印编译时执行的命令,但不真正执行
    -p 开启并发编译,默认情况下该值为CPU逻辑核数
    -race 开启竞态检测,只支持linux/amd64、freebsd/amd64、darwin/amd64和windows/amd64.
    -msan 内存扫描
    -v 编译包时打印包的名称
    -work 编译时打印临时工作目录的名称,退出时不删除它
    -x 打印编译时执行的命令(打印编译时会用到的所有命令)
    -asmflags '[pattern=]arg list',传递给每个go工具asm调用的参数
    -buildmode mode 使用编译模式, 更多信息请参见“go help buildmode”
    -compiler name 设置编译时使用编译器名,编译器名称只有2个选项(gccgo或gc)
    -gccgoflags '[pattern=]arg list' 传递每个gccgo编译器/链接器调用的参数列表
    -gcflags '[pattern=]arg list' 用于指定需要传递给go tool compile命令的参数的列表,更多信息参见(go tool compile)
    -installsuffix suffix 为了使当前的输出目录与默认的编译输出目录分离,可以使用这个标记.此标记的值会作为结果文件的父目录名称的后缀.其实,如果使用了-race标记,这个标记会被自动追加且其值会为race.如果我们同时使用了-race标记和-installsuffix,那么在-installsuffix标记的值的后面会再被追加_race,并以此来作为实际使用的后缀
    -ldflags '[pattern=]arg list' 用于指定需要传递给go tool link命令的参数的列表
    -linkshared
    -mod mode 模块下载方式,只有2个选项(readonly或vendor),更多信息请参见(go help modules)
    -pkgdir dir 设置包目录.编译器会只从该目录中加载代码包的归档文件,并会把编译可能会生成的代码包归档文件放置在该目录下
    -tags 'tag list'
    -toolexec 'cmd args' 用于在编译期间使用一些Go语言自带工具(如vet、asm等)的方式
示例:
go build [1个或多个go源文件, 或者包名, 或者包所在目录]
go build a.go b.go main.go
go build main.go
go build hello
# 把main.go编译成可执行文件hello.exe
go build -o hello.exe  main.go
# 打印编译时执行的命令,但不真正执行
go build -n 
# 答应工作目录
go build -work 
```

## 2. clean 删除对象文件和缓存的文件

```sh
clean 删除执行其他命令时产生的文件、目录和缓存文件.
    具体地说.clean 会删除从导入路径对应的源码目录中,删除以下这些文件和目录
        _obj/            old object directory, left from Makefiles
        _test/           old test directory, left from Makefiles
        _testmain.go     old gotest file, left from Makefiles
        test.out         old test log, left from Makefiles
        build.out        old test log, left from Makefiles
        *.[568ao]        object files, left from Makefiles
        DIR(.exe)        from go build
        DIR.test(.exe)   from go test -c
        MAINFILE(.exe)   from go build MAINFILE.go
        *.so             from SWIG
usage: go clean [clean flags] [build flags] [packages]
  用法: go clean [clean 参数]   [build参数]   包
  可选参数:
    -i 会删除安装当前代码包所有产生的所有文件, 如果当前包是一个普通包(不是main包),则结果文件指的就是在工作区的pkg目录的相应目录下的归档文件.如果当前代码包中只包含一个命令源码文件, 则删除当前目录和在工作区的bin目录下的可执行文件和测试文件.
    -n 打印clean执行的命令,但不真正执行
    -r 删除当前代码包和所有的依赖包产生的文件、目录和缓存文件
    -x 打印clean执行的删除命令
    -cache 删除所有 go build 的缓存
    -testcache 删除当前包所有的测试结果
```

## 3. doc 显示包文档

```sh
doc与godoc 显示包或符号的文档, 更多用法请参考(godoc -h)
usage: go doc [-u] [-c] [package|[package.]symbol[.methodOrField]]
 用法:  go doc [-u] [-c] [package|[package.]symbol[.methodOrField]]
 可选参数:
    -c 区分参数包名的大小写.默认情况下,包名是大小写不敏感的
    -cmd 打印 main 包文档, 默认情况下不会打印 main 包文档
    -u 打印出所有的文档(同事包含可导出和不可导出实体)

示例:
# 显示 hellomod 包文档,(注意 hellomod 和 Hellomod是不同的包)
go doc -c hellomod
```

## 4. env 打印Go语言的环境信息

```sh
env 打印Go语言的环境信息
usage: go env [-json] [var ...]
 用法: go env [-json] [变量 ...]
 可选参数:
    -json 以json格式打印环境信息

示例:
# 以json格式打印所有环境信息
go env -json 

# 以json格式只打印 GOOS 程序构建环境的目标操作系统
go env -json GOOS

# 打印所有环境信息
go env

# 只打印 GOOS 程序构建环境的目标操作系统
go env GOOS
```

## 5. fix与go tool fix 会把指定包中的所有Go语言源码文件中旧版本代码修正为新版本的代码,升级版本时非常有用

```sh
fix 会把指定包中的所有Go语言源码文件中旧版本代码修正为新版本的代码
usage: go fix [packages]

示例:
go fix testmod


go tool fix -h
usage: go tool fix [-diff] [-r fixname,...] [-force fixname,...] [path ...]
    -diff 不将修正后的内容写入文件, 而只打印修正前后的内容的对比信息到标准输出
    -force string 使用此参数后, 即使源码文件中的代码已经与Go语言的最新版本相匹配, 也会强行执行指定的修正操作.该参数值就是需要强行执行的修正操作的名称,多个名称之间用英文半角逗号分隔
    -r string 只对目标源码文件做有限的修正操作.该参数的值即为允许的修正操作的名称.多个名称之间用英文半角逗号分隔
```

## 6. fmt与gofmt 格式化go源文件

> Go 开发团队不想要 Go 语言像许多其它语言那样总是在为代码风格而引发无休止的争论,浪费大量宝贵的开发时间,因此他们制作了一个工具:go fmt（gofmt）

```sh
fmt与gofmt 命令 格式化go源文件,fmt命令实际"gofmt -l -w"命令之上做了一层包装,我们一般使用
usage: go fmt [-n] [-x] [packages]
 用法: go fmt [-n] [-x] 包
 可选参数:
    -x 打印执行的命令
    -n 打印执行的命令,但不真正执行

示例:
# 格式化 testmod 包, 并显示执行命令
go fmt -x testmod


gofmt 命令
usage: gofmt [flags] [path ...]
 用法: gofmt [参数] [路径 ...]
 可选参数:
    -cpuprofile string 将cpu配置文件写入此文件
    -d 显示格式化前后差异,但不写入文件
    -e 打印所有错误, 默认只会打印不同行的前10个错误
    -l 列出需要格式化的文件
    -r string 重新规则,方便我们做批量替换,例如我们需要把hellomod.Hello替换成hellomod.HelloNew("hellomod.Hello -> hellomod.HelloNew")
    -s 简化代码
    -w 将结果直接写入到文件中
    
示例:
# 格式当前目录代码
gofmt -w ./

# 把当前目录中的“hellomod.Hello” 替换成 "hellomod.HelloNew"
gofmt -r "hellomod.Hello -> hellomod.HelloNew" -w ./
```

## 8. get 下载并安装包和依赖(下载包和依赖,并对它们进行编译安装)

```sh
get 命令 下载并安装包和依赖(下载包和依赖,并对它们进行编译安装)
usage: go get [-d] [-f] [-t] [-u] [-v] [-fix] [-insecure] [build flags] [packages]
 用法: go get [-d] [-f] [-t] [-u] [-v] [-fix] [-insecure] [build flags] [包]
 可选参数:
    -d 只下载不安装(只执行下载动作, 不执行安装动作)
    -f 只有在包含了-u参数的时候才有效.该参数会让命令程序忽略掉对已下载代码包的导入路径的检查.如果下载并安装的代码包所属的项目是你从别人那里Fork过来的,那么这样做就尤为重要了
    -fix 会下载代码包后先执行修正动作,而后再进行编译和安装
    -insecure 请谨慎使用, 允许使用不安全(http或者自定义域)的存储库中下载解析.
        即:允许命令程序使用非安全的scheme（如HTTP）去下载指定的代码包.如果你用的代码仓库(如公司内部的Gitlab)没有HTTPS支持,可以添加此标记.请在确定安全的情况下使用它.
    -t 同时也下载需要为运行测试所需要的包
    -u 强制从网络更新包和它的依赖包.默认情况下,该命令只会从网络上下载本地不存在的代码包,而不会更新已有的代码包
    -v 显示执行的命令

示例:
# 下载包
go get github.com/donvito/hellomod
```

## 9. install 编译并安装指定包及它们的依赖包

```sh
install 编译并安装指定包及它们的依赖包,先生成中间文件(可执行文件或者.a包),然后把编译好的结果移到$GOPATH/pkg或者$GOPATH/bin
usage: go install [-i] [build flags] [packages]
 用法: go install [-i] [编译 flags] [包]
 可选参数:
    -i 

示例:
# 安装包
go install github.com/gin-gonic/gin
```

## 10. list 列出包和模块信息

```sh
list 列出包和模块信息
usage: go list [-f format] [-json] [-m] [list flags] [build flags] [packages]
 用法: go list [-f format] [-json] [-m] [list flags] [build flags] [包]
 可选参数:
    -f {{.字段名}} 查看指定的字段信息
    -json 以json格式打印信息
    -m 列出模块信息
更多用法请参考(go help list)

示例:
# 以json格式打印gapp包信息
go list -json gapp

# 打印模块信息
go list -m testmod

# 以json格式打印模块信息
go list -m -json testmod 
# testmod模块打印结果:
{
        "Path": "testmod",
        "Main": true,
        "Dir": "/Users/zhaoweijie/go/src/business-card/docker-compose/go-tutorials/9/examples/testmod",
        "GoMod": "/Users/zhaoweijie/go/src/business-card/docker-compose/go-tutorials/9/examples/testmod/go.mod"
}

```

## 11. mod 管理模块

```sh
mod 管理模块
Usage: go mod <command> [arguments]
 用法: go mod <命令> [参数]
 可选命令<command>: go help mod <command>
    download    下载模块到本地缓存
        usage: go mod download [-json] [modules]
          用法:
        可选参数:
            -json 
        示例:
            # 下载模块,以json格式打印模块信息
            go mod download -json github.com/qq1060656096/hellomod   
            # json格式打印 github.com/qq1060656096/hellomod 模块信息
            {
                    "Path": "github.com/qq1060656096/hellomod",
                    "Version": "v1.0.0",
                    "Info": "/Users/zhaoweijie/go/pkg/mod/cache/download/github.com/qq1060656096/hellomod/@v/v1.0.0.info",
                    "GoMod": "/Users/zhaoweijie/go/pkg/mod/cache/download/github.com/qq1060656096/hellomod/@v/v1.0.0.mod",
                    "Zip": "/Users/zhaoweijie/go/pkg/mod/cache/download/github.com/qq1060656096/hellomod/@v/v1.0.0.zip",
                    "Dir": "/Users/zhaoweijie/go/pkg/mod/github.com/qq1060656096/hellomod@v1.0.0",
                    "Sum": "h1:O66u/mTlM4cHHdwuKPNpUBmJor2XOv0Wa0j+qfOwAN4=",
                    "GoModSum": "h1:TOAQUVNcJP1uykhVNbIcfTsdYdjs2zrIYEtpAGWpcqg="
            }


    edit   提供命令来编辑go.mod文件, 主要用于工具或脚本
        usage: go mod edit [editing flags] [go.mod]
         用法: go mod edit [editing flags] [go.mod]
        可选参数:
            -fmt 只会格式化go.mod文件
            -module 更改模块路径
            -require=path@version 添加模块依赖
                示例:
                    # 添加hellomod模块v1.0.0版本
                    go mod edit -require=github.com/qq1060656096/hellomod@v1.0.0
            -droprequire=path 删除模块依赖
                示例:
                    # 删除hellomod模块
                    go mod edit -droprequire=github.com/qq1060656096/hellomod
            -exclude=path@version 排查模块
                # 排除hellomod模块v1.0.0版本
                go mod edit -exclude=github.com/qq1060656096/hellomod@v1.0.0
            -dropexclude=path@version 删除排除的模块(恢复排除的模块)
                # 恢复排除hellomod模块v1.0.0版本
                go mod edit -dropexclude=github.com/qq1060656096/hellomod@v1.0.0
            -replace=old[@v]=new[@v] 替换模块
                示例:
                    # hellomod模块v1.0.0版本替换成v2.0.0版本
                    go mod edit -replace=github.com/qq1060656096/hellomod@v1.0.0=github.com/qq1060656096/hellomod@v2.0.0
            -dropreplace=old[@v]
            -print 打印结果,不会操作go.mod文件
            -json 以json格式打印结果,不会操作go.mod文件


    graph   打印模块需求图
        usage: go mod graph
        用法: go mod graph


    init    在当前⽂件夹下初始化⼀个新的模块(创建go.mod⽂件)
        usage: go mod init [module]
        用法: go mod init [模块名]
        示例:
            # 创建“github.com/qq1060656096/hellomod”模块
            go mod init github.com/qq1060656096/hellomod


    tidy    整理模块(增加缺少的模块,删除未⽤的模块)
        usage: go mod tidy [-v]
        用法: go mod tidy [-v]
        可选参数:
            -v 打印已经删除的模块信息

        示例:
            # 整理模块,并打印已经删除的模块
            go mod tidy -v


    vendor  将依赖复制到vendor下
        usage: go mod vendor [-v]
        用法: go mod vendor [-v]
        可选参数:
            -v 打印复制到vendor的所有包和模块
        示例:
            # 打印复制到vendor的所有包和模块
            go mod vendor -v


    verify  校验依赖的HASH码,验证检查当前模块的依赖, 如果依赖本有更改就使用之前的, 如果所有模块都没有更改,就打印"all modules verified
", 否则就报告(打印)已更改的模块
        usage: go mod verify
        用法: go mod verify
        示例:
            go mod verify


    why     解释为什么需要依赖
        usage: go mod why [-m] [-vendor] packages...
        用法: go mod why [-m] [-vendor] packages...
        可选参数
            -vendor
            -m 
```

## 12. run 编译并运行Go程序

```sh
run 命令 编译并运行Go程序
usage: go run [build flags] [-exec xprog] package [arguments...]
用法: go run [编译 flags] [-exec xprog] 包 [arguments...]
可选参数: 其他参数请参考(go help build)
    -exec 

示例:
# 运行maing.go
go run main.go

# 运行maing.go并开启竞态检测(开发时建议开启这个选项)
go run -race main.go
```

## 13. test 测试包

```sh
go test 用于测试包
usage: go test [build/test flags] [packages] [build/test flags & test binary flags]
    -c 把包编译二进制测试包, 注意不会运行, 需要你手动执行二进制测试
        示例: 
            go test -c package_import_path
            go test -c 包的导入路径
            1. go test -c 在当前目录生成二进制测试
            2. go test -c go test -c go-tutorials/8/examples/demo1 

    -exec 运行二进制测试
        示例:
            go test -c -exec demo1.test
    -json 运行测试,并将结果输出为json格式
        示例:
            go test -json path
            1. go test -json 测试当前包
            2. go test -json ./
    -o 把测试编译成自己命名二进制包, 默认仍然会运行测试(除非指定-c或者-i)
        示例:
            go test -o file_name
            go test -o 文件名
            1. go test -o demo1.custom_name.test
    -bench 运行基准测试, 默认情况下不运行
        示例:
            go test -bench regexp
            go test -bench 正则表达式
            1. go test -bench 运行所有基准测试
            2. go test -bench=. 运行所有基准测试
            3. go test -bench=hah 运行指定的基准测试
    -benchtime 基准测试,持续时间(默认1秒)
    
    -count 运行测试次数
        示例:
            go test -count n
            go test -count 次数
            1. go test -count 10 运行所有的测试10次
    -cover 覆盖率统计, 注意覆盖率统计是通过代码注释来工作的
    -cpu 指定测试cpu数量
        示例:
            go test -cpu 1,2,4
            go test -cpu cpu数量
            1. go test -cpu 8 指定8个cpu
    -list regexp 列出匹配的测试
        示例:
            go test -list regexp
            go test -list 正则表达式
            1. go test -list Login 列出demo1中的测试
    -v 详细输出运行时记录所有的测试
        示例:
            go test -v
```

## 14. tool 运行指定的go工具

```sh
tool 命令 运行指定的go工具
usage: go tool [-n] command [args...]
用法: go tool [-n] 命令 [args...]
可选参数:
    -n 打印要执行的命令, 但是不真正的执行
示例:
# 打印vet工具执行的命令
go tool -n vet


```

**go tool 工具列表**

```sh
# go tool: 列表工具列表
# go tool 工具 -h: 查看工具帮助文档
# 查看vet工具帮助文档: go tool vet -h
addr2line
api
asm
buildid
cgo
compile
cover
dist
doc
fix
link
nm
objdump
pack
pprof 可以帮助开发者快速分析及定位各种性能问题,如 CPU 消耗、内存分配及阻塞分析
test2json
trace
vet 报告包中可能出现的错误,开发时建议使用这个工具(fmt printf函数参数不对或者声明结构体 tag声明不对等)
```

## 15. version 查看当前go语言版本

```sh
version 查看go当前的版本
usage: go version
示例:
# 查看go当前的版本
go version 
```

## 16. vet 报告包中可能出现的错误

```sh
vet 静态检查工具,报告包中可能出现的错误, 开发时建议使用这个工具(fmt printf函数参数不对或者声明结构体 tag声明不对等)
usage: go vet [-n] [-x] [build flags] [vet flags] [packages]
用法: go vet [-n] [-x] [编译参数] [vet flags] [包]
可选参数:
    -n 打印要执行的命令, 但是不真正的执行
    -x 打印执行的命令

更多参数请参考(go help build)

示例:
# 检测 testmod 包中可能存在的问题
go vet testmod 
```
