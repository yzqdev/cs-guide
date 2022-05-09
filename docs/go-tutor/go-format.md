# Go命名规范

好的命名可以提高代码的可读性，特点：

- 统一 ： 容易猜想，约定俗成
- 简短 ：容易书写（Go尤为强调）
- 准确 ：准确表达意思

## 核心准则

声明的地方和使用的地方离得越远，名字就建议越详细，相对也会越长，同样上下文没提供有效的描述也是如此。

## 常见命名

### Camel命名

- Go推荐驼峰命名方式，不建议使用下划线（包括常量，包名）
**Good**
**Bed**  

```go
userManger
UserManager
```

```go
user_manager
```

- 单词缩写默认全大写，或全小写
**Good**
**Bed**  

```go
userID
baiduCDN
id
cdn
```

```go
userId
baiduCdn
```

### 项目名（仓库名）

- 多个单词建议采用中划线分隔.  目前github中大多数项目都是使用中划线，不建议采用驼峰式分隔，不要使用下划线(kubernetes中的组件名称不允许使用下划线) **例如**  

```go
github.com/redis-go
github.com/mattn/go-sqlite3
github.com/gin-gonic
```

- 命名尽量在三个单词以内。
- 命名可以是项目功能的描述；也可以是一个代号（如神话人物的名字，或者希腊语）
（注：适合采用代号的项目有两种：公司的基础组件或者开源项目，一般这种项目都有详细的文档）

### Local变量

- 保持简短。太长的命名有的时候反而使代码不简洁，影响阅读 索引：i （Good），index（Bad）
reader：简写：r
buffer：简写为：b
- 避免冗余。命名不要和上下文重叠，例如：
在user上下文中
变量名count 会比userCount更简洁
在map的上下文下可以简写：v,ok=m[k]

```
func UserCount() int
```

注：一般情况下**不需要**长命名，长命名出现的情况是func**很长，变量很多**（意味着**你该重构了**）

**Local变量 - 例子1**

**Bad**

```go
func RuneCount(buffer []byte) int {
    runeCount := 0
    for index := 0; index < len(buffer); {
        if buffer[index] < RuneSelf {
            index++
        } else {
            _, size := DecodeRune(buffer[index:])
            index += size
        }
        runeCount++
    }
    return runeCount
}
```

**Good**

```go
func RuneCount(b []byte) int {
    count := 0
    for i := 0; i < len(b); {
        if b[i] < RuneSelf {
            i++
        } else {
            _, n := DecodeRune(b[i:])
            i += n
        }
        count++
    }
    return count
}
```

**Local变量 - 例子2**

**Bad**

```go
func Read(buffer *Buffer, inBuffer []byte) (size int, err error){
        if buffer.empty() {
                buffer.Reset()
        }
        size = copy(
                inBuffer,
                buffer.buffer[buffer.offset:])
        buffer.offset += size
        return size, nil
}
```

**Good**

```go
func Read(b *Buffer, p []byte) (n int, err error) {
        if b.empty() {
                b.Reset()
        }
        n = copy(p, b.buf[b.off:])
        b.off += n
        return n, nil
}
```

### Receiver命名

方法接收名称也是特殊的参数，一般用一个或两个字母（优先r）

例如：

```go
func (b *Buffer) Read(p []byte) (n int, err error)
func (sh serverHandler) ServeHTTP(rw ResponseWriter, req *Request)
func (r Rectangle) Size() Point
```

注：

- 同一个接收者的命名要保持全局唯一
- 不会体现到文档里，指向性强
- 避免是用"me", "this" or "self"

### func/method - 参数

和本地变量一样，但是名称还会作为文档，一般规则：

- 如果类型具有描述特征，变量名可以简短，例如：  

```go
func Escape(w io.Writer, s []byte)
func (mux *ServeMux) ServeHTTP(w ResponseWriter, r *Request)
```

- 如果类型没有指向性，名字可以完整，例如：strings包：  

```go
HasSuffix(s, suffix string) bool
Map(mapping func(rune) rune, s string) string
```

### func/method - 返回值

- 函数/方法可以对返回值定义变量名
- 变量名仅作为文档，不能只是为了在方法体内少定义变量
- 规则和参数类似，取决于类型是否具有描述性，例如：  

```go
func Copy(dst Writer, src Reader) (written int64, err error)
func ScanBytes(data []byte, atEOF bool) (advance int, token []byte, err error)
```

### method - get/set

Go没对get/set特别支持，必要的时候可以自己定义。Go对get有不同建议，认为不符合语言习惯，例如：

读取Persion获取FirstName

Bad：

```go
p.GetFirstName()
```

Good：

```go
p.FirstName()
```

### package导出命名

包对外导出变量、函数、类型等，在包的上下文中，避免冗余

**Good**

```go
bytes.Buffer
strings.Reader
```

**Bad**

```go
bytes.Buffer
strings.Reader
```

### 接口命名

- 如果接口只有一个方法，默认为方法名+er 来命名接口：例如：
注：有的时候加er不一定是正确的单词，但是也还是会遵守

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
type Purger interface {
  Purge(u PurgeURL) error
}
```

- 如果接口有多个方法， 会以用一个能准备描述他的用途来命名 type ResponseWriter interface

### error的命名

- 自定义error命名通常： “名称+Error” 作为结构体的名字，例如：  

```go
type TypeError struct {
    Errors []string
}
```

- 变量时会用简写err + 名称  

```go
ErrShortDst = errors.New("transform: short destination buffer")
ErrShortSrc = errors.New("transform: short source buffer")
ErrEndOfSpan = errors.New("transform: input and output are not identical")
```

### 包命名

包名选择有意义的名称，尽量避免：util ， common

```go
bytes.Buffer
ioutil.ReadFile
strconv.Atoi
```

### import路径

- 路径中的最后一段尽量和包名保持一致，例如：
"net/http" // package http
调用：http.File
- 路径尽量流畅，避免类似这样：
“github.com/goauth/oauth2”
类库一般会把代码放在根目录：
“github.com/oauth2”
- 路径都是小写，尽量避免混合大小写

## 常用缩写

```
src = source
srv = server
arg = argument
conn = connect, connection
attr = attribute
abs = absolute
min = minimum
len = length
auth = authenticate
buf = buffer
ctl = control
ctx = context
str = string
msg = message
fmt = format
dest = destination
diff = difference
orig = original
recv = receive
ref = reference
repo = repository
util = utility
fmt = format
```
