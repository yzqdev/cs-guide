import{_ as e,c as n,o as r,d as t}from"./app-CbULZrmi.js";const o={},a=t(`<h1 id="go命名规范" tabindex="-1"><a class="header-anchor" href="#go命名规范"><span>Go命名规范</span></a></h1><p>好的命名可以提高代码的可读性，特点：</p><ul><li>统一 ： 容易猜想，约定俗成</li><li>简短 ：容易书写（Go尤为强调）</li><li>准确 ：准确表达意思</li></ul><h2 id="核心准则" tabindex="-1"><a class="header-anchor" href="#核心准则"><span>核心准则</span></a></h2><p>声明的地方和使用的地方离得越远，名字就建议越详细，相对也会越长，同样上下文没提供有效的描述也是如此。</p><h2 id="常见命名" tabindex="-1"><a class="header-anchor" href="#常见命名"><span>常见命名</span></a></h2><h3 id="camel命名" tabindex="-1"><a class="header-anchor" href="#camel命名"><span>Camel命名</span></a></h3><ul><li>Go推荐驼峰命名方式，不建议使用下划线（包括常量，包名） <strong>Good</strong><strong>Bed</strong></li></ul><pre><code class="language-go">userManger
UserManager
</code></pre><pre><code class="language-go">user_manager
</code></pre><ul><li>单词缩写默认全大写，或全小写 <strong>Good</strong><strong>Bed</strong></li></ul><pre><code class="language-go">userID
baiduCDN
id
cdn
</code></pre><pre><code class="language-go">userId
baiduCdn
</code></pre><h3 id="项目名-仓库名" tabindex="-1"><a class="header-anchor" href="#项目名-仓库名"><span>项目名（仓库名）</span></a></h3><ul><li>多个单词建议采用中划线分隔. \v 目前github中大多数项目都是使用中划线，不建议采用驼峰式分隔，不要使用下划线(kubernetes中的组件名称不允许使用下划线) \v<strong>例如</strong></li></ul><pre><code class="language-go">github.com/redis-go
github.com/mattn/go-sqlite3
github.com/gin-gonic
</code></pre><ul><li>命名尽量在三个单词以内。</li><li>命名可以是项目功能的描述；也可以是一个代号（如神话人物的名字，或者希腊语） （注：适合采用代号的项目有两种：公司的基础组件或者开源项目，一般这种项目都有详细的文档）</li></ul><h3 id="local变量" tabindex="-1"><a class="header-anchor" href="#local变量"><span>Local变量</span></a></h3><ul><li>保持简短。太长的命名有的时候反而使代码不简洁，影响阅读\v 索引：i （Good），index（Bad） reader：简写：r buffer：简写为：b</li><li>避免冗余。命名不要和上下文重叠，例如： 在user上下文中 变量名count 会比userCount更简洁 在map的上下文下可以简写：v,ok=m[k]</li></ul><pre><code>func UserCount() int
</code></pre><p>注：一般情况下<strong>不需要</strong>长命名，长命名出现的情况是func<strong>很长，变量很多</strong>（意味着<strong>你该重构了</strong>）</p><p><strong>Local变量 - 例子1</strong></p><p><strong>Bad</strong></p><pre><code class="language-go">func RuneCount(buffer []byte) int {
    runeCount := 0
    for index := 0; index &lt; len(buffer); {
        if buffer[index] &lt; RuneSelf {
            index++
        } else {
            _, size := DecodeRune(buffer[index:])
            index += size
        }
        runeCount++
    }
    return runeCount
}
</code></pre><p><strong>Good</strong></p><pre><code class="language-go">func RuneCount(b []byte) int {
    count := 0
    for i := 0; i &lt; len(b); {
        if b[i] &lt; RuneSelf {
            i++
        } else {
            _, n := DecodeRune(b[i:])
            i += n
        }
        count++
    }
    return count
}
</code></pre><p><strong>Local变量 - 例子2</strong></p><p><strong>Bad</strong></p><pre><code class="language-go">func Read(buffer *Buffer, inBuffer []byte) (size int, err error){
        if buffer.empty() {
                buffer.Reset()
        }
        size = copy(
                inBuffer,
                buffer.buffer[buffer.offset:])
        buffer.offset += size
        return size, nil
}
</code></pre><p><strong>Good</strong></p><pre><code class="language-go">func Read(b *Buffer, p []byte) (n int, err error) {
        if b.empty() {
                b.Reset()
        }
        n = copy(p, b.buf[b.off:])
        b.off += n
        return n, nil
}
</code></pre><h3 id="receiver命名" tabindex="-1"><a class="header-anchor" href="#receiver命名"><span>Receiver命名</span></a></h3><p>方法接收名称也是特殊的参数，一般用一个或两个字母（优先r）</p><p>例如：</p><pre><code class="language-go">func (b *Buffer) Read(p []byte) (n int, err error)
func (sh serverHandler) ServeHTTP(rw ResponseWriter, req *Request)
func (r Rectangle) Size() Point
</code></pre><p>注：</p><ul><li>同一个接收者的命名要保持全局唯一</li><li>不会体现到文档里，指向性强</li><li>避免是用&quot;me&quot;, &quot;this&quot; or &quot;self&quot;</li></ul><h3 id="func-method-参数" tabindex="-1"><a class="header-anchor" href="#func-method-参数"><span>func/method - 参数</span></a></h3><p>和本地变量一样，但是名称还会作为文档，一般规则：</p><ul><li>如果类型具有描述特征，变量名可以简短，例如：</li></ul><pre><code class="language-go">func Escape(w io.Writer, s []byte)
func (mux *ServeMux) ServeHTTP(w ResponseWriter, r *Request)
</code></pre><ul><li>如果类型没有指向性，名字可以完整，例如：strings包：</li></ul><pre><code class="language-go">HasSuffix(s, suffix string) bool
Map(mapping func(rune) rune, s string) string
</code></pre><h3 id="func-method-返回值" tabindex="-1"><a class="header-anchor" href="#func-method-返回值"><span>func/method - 返回值</span></a></h3><ul><li>函数/方法可以对返回值定义变量名</li><li>变量名仅作为文档，不能只是为了在方法体内少定义变量</li><li>规则和参数类似，取决于类型是否具有描述性，例如：</li></ul><pre><code class="language-go">func Copy(dst Writer, src Reader) (written int64, err error)
func ScanBytes(data []byte, atEOF bool) (advance int, token []byte, err error)
</code></pre><h3 id="method-get-set" tabindex="-1"><a class="header-anchor" href="#method-get-set"><span>method - get/set</span></a></h3><p>Go没对get/set特别支持，必要的时候可以自己定义\v。Go对get有不同建议，认为不符合语言习惯，例如：</p><p>读取Persion获取FirstName</p><p>Bad：</p><pre><code class="language-go">p.GetFirstName()
</code></pre><p>Good：</p><pre><code class="language-go">p.FirstName()
</code></pre><h3 id="package导出命名" tabindex="-1"><a class="header-anchor" href="#package导出命名"><span>package导出命名</span></a></h3><p>包对外导出变量、函数、类型等，在包的上下文中，避免冗余</p><p><strong>Good</strong></p><pre><code class="language-go">bytes.Buffer
strings.Reader
</code></pre><p><strong>Bad</strong></p><pre><code class="language-go">bytes.Buffer
strings.Reader
</code></pre><h3 id="接口命名" tabindex="-1"><a class="header-anchor" href="#接口命名"><span>接口命名</span></a></h3><ul><li>如果接口只有一个方法，默认为方法名+er 来命名接口：例如： 注：有的时候加er不一定是正确的单词，但是也还是会遵守</li></ul><pre><code class="language-go">type Reader interface {
    Read(p []byte) (n int, err error)
}
type Purger interface {
  Purge(u PurgeURL) error
}
</code></pre><ul><li>如果接口有多个方法， 会以用一个能准备描述他的用途来命名 type ResponseWriter interface</li></ul><h3 id="error的命名" tabindex="-1"><a class="header-anchor" href="#error的命名"><span>error的命名</span></a></h3><ul><li>自定义error命名通常： “名称+Error” 作为结构体的名字，例如：</li></ul><pre><code class="language-go">type TypeError struct {
    Errors []string
}
</code></pre><ul><li>变量时会用简写err + 名称</li></ul><pre><code class="language-go">ErrShortDst = errors.New(&quot;transform: short destination buffer&quot;)
ErrShortSrc = errors.New(&quot;transform: short source buffer&quot;)
ErrEndOfSpan = errors.New(&quot;transform: input and output are not identical&quot;)
</code></pre><h3 id="包命名" tabindex="-1"><a class="header-anchor" href="#包命名"><span>包命名</span></a></h3><p>包名选择有意义的名称，尽量避免：util ， common</p><pre><code class="language-go">bytes.Buffer
ioutil.ReadFile
strconv.Atoi
</code></pre><h3 id="import路径" tabindex="-1"><a class="header-anchor" href="#import路径"><span>import路径</span></a></h3><ul><li>路径中的最后一段尽量和包名保持一致，例如： &quot;net/http&quot; // package http 调用：http.File</li><li>路径尽量流畅，避免类似这样： “github.com/goauth/oauth2” 类库一般会把代码放在根目录： “github.com/oauth2”</li><li>路径都是小写，尽量避免混合大小写</li></ul><h2 id="常用缩写" tabindex="-1"><a class="header-anchor" href="#常用缩写"><span>常用缩写</span></a></h2><pre><code>src = source
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
</code></pre>`,75),l=[a];function i(s,c){return r(),n("div",null,l)}const d=e(o,[["render",i],["__file","go-format.html.vue"]]),p=JSON.parse('{"path":"/go-tutor/basics/go-format.html","title":"Go命名规范","lang":"zh-CN","frontmatter":{"description":"Go命名规范 好的命名可以提高代码的可读性，特点： 统一 ： 容易猜想，约定俗成 简短 ：容易书写（Go尤为强调） 准确 ：准确表达意思 核心准则 声明的地方和使用的地方离得越远，名字就建议越详细，相对也会越长，同样上下文没提供有效的描述也是如此。 常见命名 Camel命名 Go推荐驼峰命名方式，不建议使用下划线（包括常量，包名） Good Bed 单...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/go-format.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Go命名规范"}],["meta",{"property":"og:description","content":"Go命名规范 好的命名可以提高代码的可读性，特点： 统一 ： 容易猜想，约定俗成 简短 ：容易书写（Go尤为强调） 准确 ：准确表达意思 核心准则 声明的地方和使用的地方离得越远，名字就建议越详细，相对也会越长，同样上下文没提供有效的描述也是如此。 常见命名 Camel命名 Go推荐驼峰命名方式，不建议使用下划线（包括常量，包名） Good Bed 单..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-29T07:25:09.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-29T07:25:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Go命名规范\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-29T07:25:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"核心准则","slug":"核心准则","link":"#核心准则","children":[]},{"level":2,"title":"常见命名","slug":"常见命名","link":"#常见命名","children":[{"level":3,"title":"Camel命名","slug":"camel命名","link":"#camel命名","children":[]},{"level":3,"title":"项目名（仓库名）","slug":"项目名-仓库名","link":"#项目名-仓库名","children":[]},{"level":3,"title":"Local变量","slug":"local变量","link":"#local变量","children":[]},{"level":3,"title":"Receiver命名","slug":"receiver命名","link":"#receiver命名","children":[]},{"level":3,"title":"func/method - 参数","slug":"func-method-参数","link":"#func-method-参数","children":[]},{"level":3,"title":"func/method - 返回值","slug":"func-method-返回值","link":"#func-method-返回值","children":[]},{"level":3,"title":"method - get/set","slug":"method-get-set","link":"#method-get-set","children":[]},{"level":3,"title":"package导出命名","slug":"package导出命名","link":"#package导出命名","children":[]},{"level":3,"title":"接口命名","slug":"接口命名","link":"#接口命名","children":[]},{"level":3,"title":"error的命名","slug":"error的命名","link":"#error的命名","children":[]},{"level":3,"title":"包命名","slug":"包命名","link":"#包命名","children":[]},{"level":3,"title":"import路径","slug":"import路径","link":"#import路径","children":[]}]},{"level":2,"title":"常用缩写","slug":"常用缩写","link":"#常用缩写","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1659079509000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.13,"words":1239},"filePathRelative":"go-tutor/basics/go-format.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,p as data};
