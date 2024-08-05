import{_ as e,c as t,o,d as a}from"./app-CbULZrmi.js";const n={},r=a(`<h1 id="go导入包" tabindex="-1"><a class="header-anchor" href="#go导入包"><span>go导入包</span></a></h1><p>golang 使用包 package 来管理定义模块，可以使用 import 关键字来导入使用。</p><ul><li>如果导入的是 go 自带的包，则会去安装目录<code>$GOROOT/src</code> 按包路径加载，如 fmt 包</li><li>如果是我们 go get 安装或自定义的包，则会去 <code>$GOPATH/src</code> 下加载</li></ul><h2 id="package-的定义" tabindex="-1"><a class="header-anchor" href="#package-的定义"><span>package 的定义</span></a></h2><p>package 的存放位置是以 <code>$GOPATH/src</code> 作为根目录，然后灵活的按照目录去组织，且包名需与最后一级目录名一致。</p><p>例如我们自定义 baz 包，包模块的存放位置则为 <code>$GOPATH/src/foo/bar/baz</code>，baz 包的源码都存放在此目录下，foo/bar/baz 则作为包路径被 import 载入。</p><p>我们需要规范的将 baz 包中源码的 package 定义为 baz，就定义好一个可 import 载入的的包了。</p><p>hello 模块</p><pre><code class="language-go">//$GOPATH/src/foo/bar/baz/hello.go
package baz

import (
    &quot;fmt&quot;
)

// 模块初始化函数 import 包时被调用
func init() {
    fmt.Println(&quot;hello module init function&quot;)
}

func Hello() {
    return &quot;hello&quot;
}
</code></pre><p>world 模块</p><pre><code class="language-go">//$GOPATH/src/foo/bar/baz/world.go
package baz

import (
    &quot;fmt&quot;
)

// 模块初始化函数 import 包时被调用
func init() {
    fmt.Println(&quot;world module init function&quot;)
}

func World() string {
    return &quot;world&quot;
}
package main

import (
    &quot;fmt&quot;
    &quot;foo/bar/baz&quot; //引入我们自定义的包
)

func main() {
    fmt.Println(baz.Hello(), baz.World())
}
</code></pre><h2 id="import的使用" tabindex="-1"><a class="header-anchor" href="#import的使用"><span>import的使用</span></a></h2><h3 id="普通操作" tabindex="-1"><a class="header-anchor" href="#普通操作"><span>普通操作</span></a></h3><pre><code class="language-go">import (
    &quot;fmt&quot;
    &quot;log&quot;
    &quot;foo/bar/baz&quot;
)
</code></pre><p>普通导入就是按照加载机制，将要使用的包导入进来，然后使用 packageName.MethodName 的方式调用包内的方法即可。注意如果要包方法在其他包中可以调用，包方法需要首字母大写，例如：fmt.Println() fmt.Printf()。</p><h3 id="别名操作" tabindex="-1"><a class="header-anchor" href="#别名操作"><span>别名操作</span></a></h3><pre><code class="language-go">package main

import (
    &quot;fmt&quot;
    myBaz &quot;foo/bar/baz&quot;
)

func main() {
    fmt.Println(myBaz.Hello(), myBaz.World())
}
</code></pre><p>如果两个包的包名存在冲突，或者包名太长需要简写时，我们可以使用别名导入来解决。</p><h3 id="点操作" tabindex="-1"><a class="header-anchor" href="#点操作"><span>点操作</span></a></h3><pre><code class="language-go">package main

import (
    &quot;fmt&quot;
    . &quot;foo/bar/baz&quot;
)

func main() {
    fmt.Println(Hello(), World()) // 直接使用包内的方法即可 不需要显式使用包名
}
</code></pre><p>. 导入可以让包内的方法注册到当前包的上下文中，直接调用方法名即可，不需要再加包前缀。</p><h3 id="下划线操作" tabindex="-1"><a class="header-anchor" href="#下划线操作"><span>下划线操作</span></a></h3><pre><code class="language-go">package main

import (
    &quot;fmt&quot;
    _ &quot;foo/bar/baz&quot;
)

func main() {
    fmt.Println(baz.Hello(), baz.World()) // 错误 _ 并没有导入包 只是引入并执行包模块的 init  方法
}
</code></pre><p>_ 是包引用操作，只会执行包下各模块中的 init 方法，并不会真正的导入包，所以不可以调用包内的其他方法。</p>`,24),i=[r];function c(p,l){return o(),t("div",null,i)}const g=e(n,[["render",c],["__file","go-import.html.vue"]]),s=JSON.parse('{"path":"/go-tutor/basics/go-import.html","title":"go导入包","lang":"zh-CN","frontmatter":{"headerDepth":4,"description":"go导入包 golang 使用包 package 来管理定义模块，可以使用 import 关键字来导入使用。 如果导入的是 go 自带的包，则会去安装目录$GOROOT/src 按包路径加载，如 fmt 包 如果是我们 go get 安装或自定义的包，则会去 $GOPATH/src 下加载 package 的定义 package 的存放位置是以 $GO...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/go-import.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"go导入包"}],["meta",{"property":"og:description","content":"go导入包 golang 使用包 package 来管理定义模块，可以使用 import 关键字来导入使用。 如果导入的是 go 自带的包，则会去安装目录$GOROOT/src 按包路径加载，如 fmt 包 如果是我们 go get 安装或自定义的包，则会去 $GOPATH/src 下加载 package 的定义 package 的存放位置是以 $GO..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-21T02:04:02.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-21T02:04:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"go导入包\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-21T02:04:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"package 的定义","slug":"package-的定义","link":"#package-的定义","children":[]},{"level":2,"title":"import的使用","slug":"import的使用","link":"#import的使用","children":[{"level":3,"title":"普通操作","slug":"普通操作","link":"#普通操作","children":[]},{"level":3,"title":"别名操作","slug":"别名操作","link":"#别名操作","children":[]},{"level":3,"title":"点操作","slug":"点操作","link":"#点操作","children":[]},{"level":3,"title":"下划线操作","slug":"下划线操作","link":"#下划线操作","children":[]}]}],"git":{"createdTime":1655535285000,"updatedTime":1661047442000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.96,"words":588},"filePathRelative":"go-tutor/basics/go-import.md","localizedDate":"2022年6月18日","autoDesc":true}');export{g as comp,s as data};
