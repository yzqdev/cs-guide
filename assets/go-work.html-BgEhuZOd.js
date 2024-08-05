import{_ as e,c as o,o as t,d as a}from"./app-CbULZrmi.js";const n={},r=a(`<h1 id="go-workspace" tabindex="-1"><a class="header-anchor" href="#go-workspace"><span>go workspace</span></a></h1><h2 id="基础命令" tabindex="-1"><a class="header-anchor" href="#基础命令"><span>基础命令</span></a></h2><pre><code class="language-shell">#创建 workspace 工作区
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
</code></pre><h2 id="好处" tabindex="-1"><a class="header-anchor" href="#好处"><span>好处</span></a></h2><p>这里我们在demo项目就可以直接用libs里面的方法了 见demo的main.go</p><pre><code class="language-go">package main
import (
 &quot;fmt&quot;
 &quot;libs/string_lib&quot;
)

func main() {
 fmt.Println(&quot;hello, go workspace&quot;)
 string_lib.Greet(&quot;heloo&quot;)
}

</code></pre>`,6),c=[r];function i(s,d){return t(),o("div",null,c)}const l=e(n,[["render",i],["__file","go-work.html.vue"]]),m=JSON.parse('{"path":"/go-tutor/basics/go-work.html","title":"go workspace","lang":"zh-CN","frontmatter":{"description":"go workspace 基础命令 好处 这里我们在demo项目就可以直接用libs里面的方法了 见demo的main.go","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/go-work.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"go workspace"}],["meta",{"property":"og:description","content":"go workspace 基础命令 好处 这里我们在demo项目就可以直接用libs里面的方法了 见demo的main.go"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-31T14:11:04.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-12-31T14:11:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"go workspace\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-12-31T14:11:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"基础命令","slug":"基础命令","link":"#基础命令","children":[]},{"level":2,"title":"好处","slug":"好处","link":"#好处","children":[]}],"git":{"createdTime":1672495864000,"updatedTime":1672495864000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.33,"words":100},"filePathRelative":"go-tutor/basics/go-work.md","localizedDate":"2022年12月31日","autoDesc":true}');export{l as comp,m as data};
