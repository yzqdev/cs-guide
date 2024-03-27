import{_ as e,r as o,o as i,c as l,d as n,e as t,b as d,a as s}from"./app-BO2oONDQ.js";const c={},p=s(`<h1 id="go语言-mod模块-modules-使用" tabindex="-1"><a class="header-anchor" href="#go语言-mod模块-modules-使用"><span>go语言 mod模块(Modules)使用</span></a></h1><blockquote><p>Go语言从诞生之初就一直有个被诟病的问题: 缺少一个行之有效的“官方”包依赖管理工具. 其原因是在Google内部，所有人都是在一个代码库上进行开发的,因此并不是非常需要.但是Go语言变成一个社区化的工程语言之后,这个问题被放大了.</p></blockquote><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token number">1.</span> 设置 GO111MODULE
<span class="token number">2.</span> <span class="token keyword">go</span>模块使用说明
<span class="token number">3.</span> <span class="token keyword">go</span> mod模块示例
<span class="token number">4.</span> 如何升级模块版本
<span class="token number">5.</span> 一个模块多版本共存
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),r={href:"https://www.melvinvivas.com/go-version-1-11-modules/",target:"_blank",rel:"noopener noreferrer"},u=s(`<p><strong>go mod模块特点</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1. 模块是相关Go包的集合(即一个模块可以包含多个package,一个包package包含多个go源文件)
2. go命令直接支持使用模块
3. 模块中记录和解决对其他模块的依赖性
4. 模块取代了旧的基于GOPATH的方法来指定
5. 有利于程序维护
6. 提高代码重用性(供他人使用)
7. 一个模块多版本共存(即同时使用同一个模块多个版本,例如为了更好的升级模块,我们先修改一小部分代码用新的版本,当模块新版本稳定后,我们在全面升级)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>go mod命令</strong></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>   go mod download    下载依赖的module到本地cache（默认为<span class="token variable">$GOPATH</span>/pkg/mod目录）
    go mod edit        编辑go.mod文件
    go mod graph       打印模块依赖图
    go mod init        初始化当前文件夹, 创建go.mod文件
    go mod tidy        增加缺少的module，删除无用的module
    go mod vendor      将依赖复制到vendor下
    go mod verify      校验依赖
    go mod why         解释为什么需要依赖 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-设置-go111module" tabindex="-1"><a class="header-anchor" href="#_1-设置-go111module"><span>1. 设置 GO111MODULE</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>可以用环境变量 GO111MODULE 开启或关闭模块支持，它有三个可选值：off、on、auto,默认值是 auto.
<span class="token number">1</span>. <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>off 无模块支持,go 会从 GOPATH 和 vendor 文件夹寻找包.
<span class="token number">2</span>. <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on 模块支持,go 会忽略 GOPATH 和 vendor 文件夹,只根据 go.mod 下载依赖.
<span class="token number">3</span>. <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>auto 如果找到任何go.mod,即使在GOPATH内部也开启模块支持.
<span class="token punctuation">(</span>注意: 在Go <span class="token number">1.13</span>之前，GO111MODULE<span class="token operator">=</span>auto永远不会在GOPATH中启用模块模式<span class="token punctuation">)</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-go模块使用说明" tabindex="-1"><a class="header-anchor" href="#_2-go模块使用说明"><span>2. go模块使用说明</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token number">1</span>. <span class="token punctuation">(</span>GO111MODULE<span class="token operator">=</span>off,把项目放到<span class="token variable">$GOPATH</span>/src之外<span class="token punctuation">)</span>或者<span class="token punctuation">(</span>设置GO111MODULE<span class="token operator">=</span>on,把项目放到任意目录<span class="token punctuation">)</span>即可激活模块模式
<span class="token number">2</span>. 在项目目录下创建模块: <span class="token string">&quot;go mod init 模块名&quot;</span>,创建模块后,会在模块所在的文件夹生成go.mod文件
<span class="token number">3</span>. 然后在项目目录下运行命令: <span class="token string">&quot;go build&quot;</span> 、<span class="token string">&quot;go test&quot;</span> 或 <span class="token string">&quot;go run&quot;</span>执行时，会自己去修改go.mod文件，生成<span class="token string">&quot;go.sum&quot;</span>文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-go-mod模块示例" tabindex="-1"><a class="header-anchor" href="#_3-go-mod模块示例"><span>3. go mod模块示例</span></a></h3><h6 id="_3-1-创建模块-hellomod-go-mod-init-hellomod" tabindex="-1"><a class="header-anchor" href="#_3-1-创建模块-hellomod-go-mod-init-hellomod"><span>3.1 创建模块 hellomod: go mod init &quot;hellomod&quot;</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 1. 在github上创建仓库 hellomod</span>
<span class="token comment"># 为什么要创建创库, 为了其他人也可以使用这个模块</span>

<span class="token comment"># 2. 进入examples目录</span>
<span class="token builtin class-name">cd</span> examples 

<span class="token comment"># 3. 下载 hellomod 仓库</span>
<span class="token function">git</span> clone git@github.com:qq1060656096/hellomod.git

<span class="token comment"># 4. 进入 hellomod目录</span>
<span class="token builtin class-name">cd</span> hellomod

<span class="token comment"># 5. 创建模块</span>
go mod init <span class="token string">&quot;github.com/qq1060656096/hellomod&quot;</span>
<span class="token comment"># 创建模块失败会提示: &quot;go: modules disabled inside GOPATH/src by GO111MODULE=auto; see &#39;go help modules&#39;&quot;</span>

<span class="token comment"># 为什么创建模块失败</span>
<span class="token comment"># 因为GO111MODULE默认值是auto, 在 GOPATH/src 之外的目录才开启模块支持</span>
<span class="token comment"># 我们有2中方式解决以上问题</span>
<span class="token comment">#   第1种: 在 GOPATH/src 之外的目录创建模块</span>
<span class="token comment">#   第2种: 直接设置GO111MODULE=on 模块支持</span>

<span class="token comment"># 这里我们直接使用第2种</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on
go mod init <span class="token string">&quot;github.com/qq1060656096/hellomod&quot;</span>
<span class="token comment"># 创建模块成功会提示&quot;go: creating new go.mod: module github.com/qq1060656096/hellomod&quot;</span>
<span class="token comment"># 模块创建后里面会有一个go.mod文件</span>

<span class="token comment"># 6. 查看go.mod文件的内容</span>
$ <span class="token function">cat</span> go.mod
module github.com/qq1060656096/hellomod
<span class="token comment"># 里面只有一行, 就定义的模块名字</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_3-2-hellomod模块目录下-创建hello-go文件-并增加以下内容" tabindex="-1"><a class="header-anchor" href="#_3-2-hellomod模块目录下-创建hello-go文件-并增加以下内容"><span>3.2 hellomod模块目录下,创建hello.go文件, 并增加以下内容</span></a></h6><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> hellomod

<span class="token keyword">func</span> <span class="token function">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token string">&quot;Hello World!&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_3-3-hellomod模块目录下-创建hello-test-go文件-并增加以下内容" tabindex="-1"><a class="header-anchor" href="#_3-3-hellomod模块目录下-创建hello-test-go文件-并增加以下内容"><span>3.3 hellomod模块目录下,创建hello_test.go文件, 并增加以下内容</span></a></h6><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> hellomod

<span class="token keyword">import</span> <span class="token string">&quot;testing&quot;</span>

<span class="token keyword">func</span> <span class="token function">TestHello</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 want <span class="token operator">:=</span> <span class="token string">&quot;Hello World!&quot;</span>
 <span class="token keyword">if</span> <span class="token function">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> want <span class="token punctuation">{</span>
  t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello() != %s&quot;</span><span class="token punctuation">,</span> want<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_3-4-hellomod模块目录下-运行模块测试-go-test-v-会输出以下内容" tabindex="-1"><a class="header-anchor" href="#_3-4-hellomod模块目录下-运行模块测试-go-test-v-会输出以下内容"><span>3.4 hellomod模块目录下,运行模块测试 &quot;go test -v&quot;会输出以下内容</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token operator">==</span><span class="token operator">=</span> RUN   TestHello
--- PASS: TestHello <span class="token punctuation">(</span><span class="token number">0</span>.00s<span class="token punctuation">)</span>
PASS
ok      github.com/qq1060656096/hellomod        <span class="token number">0</span>.004s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_3-5-提交-hellomod-模块代码到github" tabindex="-1"><a class="header-anchor" href="#_3-5-提交-hellomod-模块代码到github"><span>3.5 提交 hellomod 模块代码到github</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 提交代码到github</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;aaa: go hello模块第一次提交&#39;</span>
<span class="token function">git</span> push origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_3-6-回到examples目录并创建一个模块测试-testmod" tabindex="-1"><a class="header-anchor" href="#_3-6-回到examples目录并创建一个模块测试-testmod"><span>3.6 回到examples目录并创建一个模块测试 testmod</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 回到 examples 并创建 testmod 目录, 然后在进入 testmod 目录</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/ <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> testmod <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> testmod
<span class="token comment"># 创建 testmod 模块</span>
go mod init <span class="token string">&quot;testmod&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_3-7-testmod-模块中创建-main-go-文件" tabindex="-1"><a class="header-anchor" href="#_3-7-testmod-模块中创建-main-go-文件"><span>3.7 testmod 模块中创建 main.go 文件</span></a></h6><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
 <span class="token string">&quot;fmt&quot;</span>
 <span class="token string">&quot;github.com/qq1060656096/hellomod&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>hellomod<span class="token punctuation">.</span><span class="token function">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_3-8-testmod-模块中执行命令-go-run-main-go" tabindex="-1"><a class="header-anchor" href="#_3-8-testmod-模块中执行命令-go-run-main-go"><span>3.8 testmod 模块中执行命令: go run main.go</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>
<span class="token comment"># go run main.go</span>
<span class="token comment"># 命令会输出以下内容</span>
go: finding github.com/qq1060656096/hellomod
go: downloading github.com/qq1060656096/hellomod
Hello World<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-如何升级模块版本" tabindex="-1"><a class="header-anchor" href="#_4-如何升级模块版本"><span>4. 如何升级模块版本</span></a></h2><h6 id="_4-1-修改-hellomod-模块-hello-go文件" tabindex="-1"><a class="header-anchor" href="#_4-1-修改-hellomod-模块-hello-go文件"><span>4.1 修改 hellomod 模块 hello.go文件</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>package hellomod

func Hello<span class="token punctuation">(</span><span class="token punctuation">)</span> string <span class="token punctuation">{</span>
 <span class="token builtin class-name">return</span> <span class="token string">&quot;v2: Hello World!&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_4-2-修改-hellomod-模块-hello-test-go-文件" tabindex="-1"><a class="header-anchor" href="#_4-2-修改-hellomod-模块-hello-test-go-文件"><span>4.2 修改 hellomod 模块 hello_test.go 文件</span></a></h6><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> hellomod


<span class="token keyword">import</span> <span class="token string">&quot;testing&quot;</span>

<span class="token keyword">func</span> <span class="token function">TestHello</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 want <span class="token operator">:=</span> <span class="token string">&quot;v2: Hello World!&quot;</span>
 <span class="token keyword">if</span> <span class="token function">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> want <span class="token punctuation">{</span>
  t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello() != %s&quot;</span><span class="token punctuation">,</span> want<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_4-3-提交-hellomod-模块代码" tabindex="-1"><a class="header-anchor" href="#_4-3-提交-hellomod-模块代码"><span>4.3 提交 hellomod 模块代码</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;hellomod v2版本提交&quot;</span>
<span class="token function">git</span> tag <span class="token parameter variable">-m</span> <span class="token string">&quot;v2.0.0&quot;</span> v2.0.0
<span class="token function">git</span> push origin master <span class="token parameter variable">--tags</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_4-4-进入-testmod-模块目录-升级模块" tabindex="-1"><a class="header-anchor" href="#_4-4-进入-testmod-模块目录-升级模块"><span>4.4 进入 testmod 模块目录, 升级模块</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/ <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> testmod
<span class="token comment"># 更新模块, 注意更新模块会更改 go.mod 文件对应模块的版本, 当然你也可以手动编辑版本号</span>
go mod edit <span class="token parameter variable">-require</span> github.com/qq1060656096/hellomod@v2.0.0

go run main.go
<span class="token comment"># 命令会输出: &quot;v2: Hello World!&quot;</span>
<span class="token comment"># 现在 hellomod 模块以及使用v2.0.0的代码了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-一个模块多版本共存" tabindex="-1"><a class="header-anchor" href="#_5-一个模块多版本共存"><span>5. 一个模块多版本共存</span></a></h2><p><strong>注意</strong></p><blockquote><p>为了更好的升级模块,我们先修改一小部分代码用新的版本,当模块新版本稳定后,我们在全面升级</p></blockquote><h6 id="_5-1-修改-hellomod-模块-go-mod-文件" tabindex="-1"><a class="header-anchor" href="#_5-1-修改-hellomod-模块-go-mod-文件"><span>5.1 修改 hellomod 模块 go.mod 文件</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>module github.com/qq1060656096/hellomod/v3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="_5-2-修改-hellomod-模块-hello-go-文件" tabindex="-1"><a class="header-anchor" href="#_5-2-修改-hellomod-模块-hello-go-文件"><span>5.2 修改 hellomod 模块 hello.go 文件</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>package hellomod

func Hello<span class="token punctuation">(</span><span class="token punctuation">)</span> string <span class="token punctuation">{</span>
 <span class="token builtin class-name">return</span> <span class="token string">&quot;v2: Hello World!&quot;</span>
<span class="token punctuation">}</span>

func HelloV3<span class="token punctuation">(</span><span class="token punctuation">)</span> string <span class="token punctuation">{</span>
 <span class="token builtin class-name">return</span> <span class="token string">&quot;v3.HelloV3: Hello World!&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-3-提交-hellomod-模块代码" tabindex="-1"><a class="header-anchor" href="#_5-3-提交-hellomod-模块代码"><span>5.3 提交 hellomod 模块代码</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> v3
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;hellomod v3版本提交&quot;</span>
<span class="token function">git</span> push origin v3
<span class="token function">git</span> tag <span class="token parameter variable">-m</span> <span class="token string">&quot;v3.0.0&quot;</span> v3.0.0
<span class="token function">git</span> push origin master <span class="token parameter variable">--tags</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-3-testmod-模块中修改-main-go-文件" tabindex="-1"><a class="header-anchor" href="#_5-3-testmod-模块中修改-main-go-文件"><span>5.3 testmod 模块中修改 main.go 文件</span></a></h6><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
 <span class="token string">&quot;fmt&quot;</span>
 <span class="token string">&quot;github.com/qq1060656096/hellomod&quot;</span>
 hellomodV3 <span class="token string">&quot;github.com/qq1060656096/hellomod/v3&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>hellomod<span class="token punctuation">.</span><span class="token function">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>hellomodV3<span class="token punctuation">.</span><span class="token function">HelloV3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_5-4-testmod-模块中执行命令-go-run-main-go" tabindex="-1"><a class="header-anchor" href="#_5-4-testmod-模块中执行命令-go-run-main-go"><span>5.4 testmod 模块中执行命令: go run main.go</span></a></h6><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>/ <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> testmod
<span class="token comment"># 添加v3版本模块, 注意更新模块会更改 go.mod 文件对应模块的版本, 当然你也可以手动编辑版本号</span>
go mod edit <span class="token parameter variable">-require</span> github.com/qq1060656096/hellomod/v3@v3.0.0
<span class="token comment"># 如果你没有执行 &quot;go mod edit -require github.com/qq1060656096/hellomod/v3@v3.0.0&quot; 命令, go 在构建的时候也会自动查到依赖</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>go run main.go执行结果</strong></p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>$ <span class="token keyword">go</span> run main<span class="token punctuation">.</span><span class="token keyword">go</span>                                                 
Hello World<span class="token operator">!</span>
v3<span class="token punctuation">.</span>HelloV3<span class="token punctuation">:</span> Hello World<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关于直接依赖和间接依赖" tabindex="-1"><a class="header-anchor" href="#关于直接依赖和间接依赖"><span>关于直接依赖和间接依赖</span></a></h2><p>比如开源软件 Kubernetes（v1.17.0版本）的 go.mod 文件中就有数十个依赖包被标记为<code>indirect</code>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>require (
 github.com/Rican7/retry v0.1.0 // indirect
 github.com/auth0/go-jwt-middleware v0.0.0-20170425171159-5493cabe49f7 // indirect
 github.com/boltdb/bolt v1.3.1 // indirect
 github.com/checkpoint-restore/go-criu v0.0.0-20190109184317-bdb7599cd87b // indirect
 github.com/codegangsta/negroni v1.0.0 // indirect
 ...
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在执行命令<code>go mod tidy</code>时，Go module 会自动整理<code>go.mod 文件</code>，如果有必要会在部分依赖包的后面增加<code>// indirect</code>注释。一般而言，被添加注释的包肯定是间接依赖的包，而没有添加<code>// indirect</code>注释的包则是直接依赖的包，即明确的出现在某个<code>import</code>语句中。</p><p>然而，这里需要着重强调的是：并不是所有的间接依赖都会出现在 <code>go.mod</code>文件中。</p><p>间接依赖出现在<code>go.mod</code>文件的情况，可能符合下面所列场景的一种或多种：</p><ul><li>直接依赖未启用 Go module</li><li>直接依赖go.mod 文件中缺失部分依赖</li></ul><h3 id="直接依赖未启用-go-module" tabindex="-1"><a class="header-anchor" href="#直接依赖未启用-go-module"><span>直接依赖未启用 Go module</span></a></h3><p>如下图所示，Module A 依赖 B，但是 B 还未切换成 Module，也即没有<code>go.mod</code>文件，此时，当使用<code>go mod tidy</code>命令更新A的<code>go.mod</code>文件时，B的两个依赖B1和B2将会被添加到A的<code>go.mod</code>文件中（前提是A之前没有依赖B1和B2），并且B1 和B2还会被添加<code>// indirect</code>的注释。</p><p><img src="https://oscimg.oschina.net/oscnet/up-11e7a118e04c3ee4ffcb258bd744ab1ab13.png#id=V03F0&amp;originHeight=228&amp;originWidth=406&amp;originalType=binary&amp;ratio=1&amp;status=done&amp;style=none" alt="a"></p><p>此时Module A的<code>go.mod</code>文件中require部分将会变成：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>require (
 B vx.x.x
 B1 vx.x.x // indirect
 B2 vx.x.x // indirect
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>依赖B及B的依赖B1和B2都会出现在<code>go.mod</code>文件中。</p><h3 id="直接依赖-go-mod-文件不完整" tabindex="-1"><a class="header-anchor" href="#直接依赖-go-mod-文件不完整"><span>直接依赖 go.mod 文件不完整</span></a></h3><p>如上面所述，如果依赖B没有<code>go.mod</code>文件，则Module A 将会把B的所有依赖记录到A 的<code>go.mod</code>文件中。即便B拥有<code>go.mod</code>，如果<code>go.mod</code>文件不完整的话，Module A依然会记录部分B的依赖到<code>go.mod</code>文件中。</p><p>如下图所示，Module B虽然提供了<code>go.mod</code>文件中，但<code>go.mod</code>文件中只添加了依赖B1，那么此时A在引用B时，则会在A的<code>go.mod</code>文件中添加B2作为间接依赖，B1则不会出现在A的<code>go.mod</code>文件中。</p><p><img src="https://oscimg.oschina.net/oscnet/up-f185e4a01c63ffce70767ecdf065819100c.png#id=RK4Ku&amp;originHeight=228&amp;originWidth=406&amp;originalType=binary&amp;ratio=1&amp;status=done&amp;style=none" alt="a"></p><p>此时Module A的<code>go.mod</code>文件中require部分将会变成：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>require (
 B vx.x.x
 B2 vx.x.x // indirect
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于B1已经包含进B的<code>go.mod</code>文件中，A的<code>go.mod</code>文件则不必再记录，只会记录缺失的B2。</p><h3 id="为什么要记录间接依赖" tabindex="-1"><a class="header-anchor" href="#为什么要记录间接依赖"><span>为什么要记录间接依赖</span></a></h3><p>在上面的例子中，如果某个依赖B 没有<code>go.mod</code>文件，在A 的<code>go.mod</code>文件中已经记录了依赖B及其版本号，为什么还要增加间接依赖呢？</p><p>我们知道Go module需要精确地记录软件的依赖情况，虽然此处记录了依赖B的版本号，但B的依赖情况没有记录下来，所以如果B的<code>go.mod</code>文件缺失了（或没有）这个信息，则需要在A的<code>go.mod</code>文件中记录下来。此时间接依赖的版本号将会跟据Go module的版本选择机制确定一个最优版本。</p><h3 id="如何处理间接依赖" tabindex="-1"><a class="header-anchor" href="#如何处理间接依赖"><span>如何处理间接依赖</span></a></h3><p>综上所述间接依赖出现在<code>go.mod</code>中，可以一定程度上说明依赖有瑕疵，要么是其不支持Go module，要么是其<code>go.mod</code>文件不完整。</p><p>由于Go 语言从v1.11版本才推出module的特性，众多开源软件迁移到go module还需要一段时间，在过渡期必然会出现间接依赖，但随着时间的推进，在<code>go.mod</code>中出现<code>// indirect</code>的机率会越来越低。</p><p>出现间接依赖可能意味着你在使用过时的软件，如果有精力的话还是推荐尽快消除间接依赖。可以通过使用依赖的新版本或者替换依赖的方式消除间接依赖。</p><h3 id="如何查找间接依赖来源" tabindex="-1"><a class="header-anchor" href="#如何查找间接依赖来源"><span>如何查找间接依赖来源</span></a></h3><p>Go module提供了<code>go mod why</code> 命令来解释为什么会依赖某个软件包，若要查看<code>go.mod</code>中某个间接依赖是被哪个依赖引入的，可以使用命令<code>go mod why -m &lt;pkg&gt;</code>来查看。</p><p>比如，我们有如下的<code>go.mod</code>文件片断：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>require (
 github.com/Rican7/retry v0.1.0 // indirect
 github.com/google/uuid v1.0.0
 github.com/renhongcai/indirect v1.0.0
 github.com/spf13/pflag v1.0.5 // indirect
 golang.org/x/text v0.3.2
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们希望确定间接依赖<code>github.com/Rican7/retry v0.1.0 // indirect</code>是被哪个依赖引入的，则可以使用命令<code>go mod why</code>来查看：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[root@ecs-d8b6 gomodule]# go mod why -m github.com/Rican7/retry
# github.com/Rican7/retry
github.com/renhongcai/gomodule
github.com/renhongcai/indirect
github.com/Rican7/retry
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的打印信息中<code># github.com/Rican7/retry</code> 表示当前正在分析的依赖，后面几行则表示依赖链。<code>github.com/renhongcai/gomodule</code> 依赖<code>github.com/renhongcai/indirect</code>，而<code>github.com/renhongcai/indirect</code>依赖<code>github.com/Rican7/retry</code>。由此我们就可以判断出间接依赖<code>github.com/Rican7/retry</code>是被<code>github.com/renhongcai/indirect</code>引入的。</p><p>另外，命令<code>go mod why -m all</code>则可以分析所有依赖的依赖链。</p>`,84);function m(v,g){const a=o("ExternalLinkIcon");return i(),l("div",null,[p,n("p",null,[n("a",r,[t("参考文章"),d(a)])]),u])}const h=e(c,[["render",m],["__file","go-mod.html.vue"]]),k=JSON.parse('{"path":"/go-tutor/basics/go-mod.html","title":"go语言 mod模块(Modules)使用","lang":"zh-CN","frontmatter":{"description":"go语言 mod模块(Modules)使用 Go语言从诞生之初就一直有个被诟病的问题: 缺少一个行之有效的“官方”包依赖管理工具. 其原因是在Google内部，所有人都是在一个代码库上进行开发的,因此并不是非常需要.但是Go语言变成一个社区化的工程语言之后,这个问题被放大了. 参考文章 go mod模块特点 go mod命令 1. 设置 GO111MO...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/go-mod.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"go语言 mod模块(Modules)使用"}],["meta",{"property":"og:description","content":"go语言 mod模块(Modules)使用 Go语言从诞生之初就一直有个被诟病的问题: 缺少一个行之有效的“官方”包依赖管理工具. 其原因是在Google内部，所有人都是在一个代码库上进行开发的,因此并不是非常需要.但是Go语言变成一个社区化的工程语言之后,这个问题被放大了. 参考文章 go mod模块特点 go mod命令 1. 设置 GO111MO..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://oscimg.oschina.net/oscnet/up-11e7a118e04c3ee4ffcb258bd744ab1ab13.png#id=V03F0&originHeight=228&originWidth=406&originalType=binary&ratio=1&status=done&style=none"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-21T02:04:02.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-21T02:04:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"go语言 mod模块(Modules)使用\\",\\"image\\":[\\"https://oscimg.oschina.net/oscnet/up-11e7a118e04c3ee4ffcb258bd744ab1ab13.png#id=V03F0&originHeight=228&originWidth=406&originalType=binary&ratio=1&status=done&style=none\\",\\"https://oscimg.oschina.net/oscnet/up-f185e4a01c63ffce70767ecdf065819100c.png#id=RK4Ku&originHeight=228&originWidth=406&originalType=binary&ratio=1&status=done&style=none\\"],\\"dateModified\\":\\"2022-08-21T02:04:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":3,"title":"1. 设置 GO111MODULE","slug":"_1-设置-go111module","link":"#_1-设置-go111module","children":[]},{"level":3,"title":"2. go模块使用说明","slug":"_2-go模块使用说明","link":"#_2-go模块使用说明","children":[]},{"level":3,"title":"3. go mod模块示例","slug":"_3-go-mod模块示例","link":"#_3-go-mod模块示例","children":[]},{"level":2,"title":"4. 如何升级模块版本","slug":"_4-如何升级模块版本","link":"#_4-如何升级模块版本","children":[]},{"level":2,"title":"5. 一个模块多版本共存","slug":"_5-一个模块多版本共存","link":"#_5-一个模块多版本共存","children":[]},{"level":2,"title":"关于直接依赖和间接依赖","slug":"关于直接依赖和间接依赖","link":"#关于直接依赖和间接依赖","children":[{"level":3,"title":"直接依赖未启用 Go module","slug":"直接依赖未启用-go-module","link":"#直接依赖未启用-go-module","children":[]},{"level":3,"title":"直接依赖 go.mod 文件不完整","slug":"直接依赖-go-mod-文件不完整","link":"#直接依赖-go-mod-文件不完整","children":[]},{"level":3,"title":"为什么要记录间接依赖","slug":"为什么要记录间接依赖","link":"#为什么要记录间接依赖","children":[]},{"level":3,"title":"如何处理间接依赖","slug":"如何处理间接依赖","link":"#如何处理间接依赖","children":[]},{"level":3,"title":"如何查找间接依赖来源","slug":"如何查找间接依赖来源","link":"#如何查找间接依赖来源","children":[]}]}],"git":{"createdTime":1659079509000,"updatedTime":1661047442000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":9.44,"words":2831},"filePathRelative":"go-tutor/basics/go-mod.md","localizedDate":"2022年7月29日","autoDesc":true}');export{h as comp,k as data};
