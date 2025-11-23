import{_ as n,c as a,a as e,o as l}from"./app-B6vXTniy.js";const p={};function i(t,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="go命令" tabindex="-1"><a class="header-anchor" href="#go命令"><span>go命令</span></a></h1><h2 id="go命令-1" tabindex="-1"><a class="header-anchor" href="#go命令-1"><span>go命令</span></a></h2><p>注意 cgo 不支持交叉编译</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token keyword">param</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token namespace">[String]</span><span class="token variable">$Type</span> = <span class="token string">&quot;run&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token variable">$name</span> = <span class="token string">&quot;bpass-server&quot;</span></span>
<span class="line"><span class="token variable">$curDir</span> = <span class="token function">Split-Path</span> <span class="token operator">-</span>Parent <span class="token variable">$MyInvocation</span><span class="token punctuation">.</span>MyCommand<span class="token punctuation">.</span>Definition</span>
<span class="line"><span class="token function">Write-Host</span> <span class="token string">&quot;当前路径&quot;</span><span class="token variable">$curDir</span>   <span class="token operator">-</span>ForegroundColor Yellow</span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$Type</span> <span class="token operator">-eq</span> <span class="token string">&quot;build&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Write-Host</span> <span class="token string">&quot;编译&quot;</span> <span class="token operator">-</span>ForegroundColor Red</span>
<span class="line">    gf build main<span class="token punctuation">.</span>go</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">elseif</span> <span class="token punctuation">(</span><span class="token variable">$Type</span> <span class="token operator">-eq</span> <span class="token string">&quot;run&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Write-Host</span> <span class="token string">&quot;运行&quot;</span> <span class="token operator">-</span>ForegroundColor Cyan</span>
<span class="line">    <span class="token variable">$env</span>:CGO_ENABLED = 1</span>
<span class="line">    <span class="token function">Write-Host</span> <span class="token string">&quot;CGO_ENABLED =&gt; <span class="token variable">$env</span>:CGO_ENABLED&quot;</span> <span class="token operator">-</span>ForegroundColor Cyan</span>
<span class="line">    gf run  main<span class="token punctuation">.</span>go</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用pure go sqlite driver</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">https://github.com/glebarez/sqlite</span>
<span class="line"></span></code></pre></div><p>或者使用<code>https://github.com/msys2/msys2-installer/</code>不要使用mingw windows上用不了</p><h2 id="go-交叉编译" tabindex="-1"><a class="header-anchor" href="#go-交叉编译"><span>go 交叉编译</span></a></h2><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token variable">$Env</span>:GOOS = <span class="token string">&quot;linux&quot;</span><span class="token punctuation">;</span> <span class="token variable">$Env</span>:GOARCH = <span class="token string">&quot;amd64&quot;</span><span class="token punctuation">;</span> go build</span>
<span class="line"></span></code></pre></div><h2 id="pm2命令" tabindex="-1"><a class="header-anchor" href="#pm2命令"><span>pm2命令</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">pm2 start \`which verdaccio\`</span>
<span class="line"></span></code></pre></div><h1 id="go-命令详解" tabindex="-1"><a class="header-anchor" href="#go-命令详解"><span>go 命令详解</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>常用命令</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#运行(相当于go build&amp;&amp;./main.exe)</span></span>
<span class="line">go run main.go</span>
<span class="line"><span class="token comment"># 打包</span></span>
<span class="line">go build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 去除调试信息</span></span>
<span class="line">go build <span class="token parameter variable">-ldflags</span><span class="token operator">=</span><span class="token string">&quot;-s -w&quot;</span></span>
<span class="line"><span class="token comment">#安装依赖</span></span>
<span class="line">go get github.com/golang-jwt/jwt/v4</span>
<span class="line"></span>
<span class="line">go get <span class="token parameter variable">-u</span></span>
<span class="line"></span>
<span class="line">go mod tidy </span>
<span class="line"></span>
<span class="line"><span class="token comment">#查看所有可以更新的依赖</span></span>
<span class="line">go list <span class="token parameter variable">-u</span> <span class="token parameter variable">-f</span> <span class="token string">&#39;{{if (and (not (or .Main .Indirect)) .Update)}}{{.Path}}: {{.Version}} -&gt; {{.Update.Version}}{{end}}&#39;</span> <span class="token parameter variable">-m</span> all <span class="token operator">&gt;</span> update.txt </span>
<span class="line"></span>
<span class="line">或者使用go-mod-upgrade</span>
<span class="line">https://github.com/oligot/go-mod-upgrade</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于gin打包 写一个build.ps1文件</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token variable">$Env</span>:GOOS = <span class="token string">&quot;linux&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token variable">$Env</span>:GOARCH = <span class="token string">&quot;amd64&quot;</span></span>
<span class="line"><span class="token variable">$Env</span>:GIN_MODE=<span class="token string">&quot;release&quot;</span></span>
<span class="line"><span class="token comment">#$env:CGO_ENABLED = &quot;1&quot;</span></span>
<span class="line">go build</span>
<span class="line"></span></code></pre></div></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><ol><li>build 编译包和依赖项</li><li>clean 删除对象文件和缓存的文件</li><li>doc与godoc 显示包文档</li><li>env 打印Go语言的环境信息</li><li>fix与go tool fix 会把指定包中的所有Go语言源码文件中旧版本代码修正为新版本的代码,升级版本时非常有用</li><li>fmt与gofmt 格式化go源文件</li><li>generate</li><li>get 下载并安装包和依赖(下载包和依赖,并对它们进行编译安装)</li><li>install 编译并安装指定包及它们的依赖包,</li><li>list 列出包和模块信息</li><li>mod 管理模块</li><li>run 编译并运行Go程序</li><li>test 测试包</li><li>tool 运行指定的go工具</li><li>version 查看当前go语言版本</li><li>vet 报告包中可能出现的错误</li></ol></div><h2 id="_1-build-编译包和依赖项" tabindex="-1"><a class="header-anchor" href="#_1-build-编译包和依赖项"><span>1. build 编译包和依赖项</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">build 编译包和依赖项</span>
<span class="line">usage: go build <span class="token punctuation">[</span>-o output<span class="token punctuation">]</span> <span class="token punctuation">[</span>-i<span class="token punctuation">]</span> <span class="token punctuation">[</span>build flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>packages<span class="token punctuation">]</span></span>
<span class="line"> 用法:  go build <span class="token punctuation">[</span>-o output<span class="token punctuation">]</span> <span class="token punctuation">[</span>-i<span class="token punctuation">]</span> <span class="token punctuation">[</span>build 参数<span class="token punctuation">]</span> <span class="token punctuation">[</span>包<span class="token punctuation">]</span></span>
<span class="line"> 可选参数:</span>
<span class="line">    <span class="token parameter variable">-o</span> 编译单个包才能使用<span class="token punctuation">(</span>不能同时对多个代码包进行编译<span class="token punctuation">)</span>,例如我们经常重新命名可执行文件名字</span>
<span class="line">    <span class="token parameter variable">-i</span> 标志安装的包是目标的依赖项</span>
<span class="line">    <span class="token parameter variable">-a</span> 强制重新构建已经更新的包</span>
<span class="line">    <span class="token parameter variable">-n</span> 打印编译时执行的命令,但不真正执行</span>
<span class="line">    <span class="token parameter variable">-p</span> 开启并发编译,默认情况下该值为CPU逻辑核数</span>
<span class="line">    <span class="token parameter variable">-race</span> 开启竞态检测,只支持linux/amd64、freebsd/amd64、darwin/amd64和windows/amd64.</span>
<span class="line">    <span class="token parameter variable">-msan</span> 内存扫描</span>
<span class="line">    <span class="token parameter variable">-v</span> 编译包时打印包的名称</span>
<span class="line">    <span class="token parameter variable">-work</span> 编译时打印临时工作目录的名称,退出时不删除它</span>
<span class="line">    <span class="token parameter variable">-x</span> 打印编译时执行的命令<span class="token punctuation">(</span>打印编译时会用到的所有命令<span class="token punctuation">)</span></span>
<span class="line">    <span class="token parameter variable">-asmflags</span> <span class="token string">&#39;[pattern=]arg list&#39;</span>,传递给每个go工具asm调用的参数</span>
<span class="line">    <span class="token parameter variable">-buildmode</span> mode 使用编译模式, 更多信息请参见“go <span class="token builtin class-name">help</span> buildmode”</span>
<span class="line">    <span class="token parameter variable">-compiler</span> name 设置编译时使用编译器名,编译器名称只有2个选项<span class="token punctuation">(</span>gccgo或gc<span class="token punctuation">)</span></span>
<span class="line">    <span class="token parameter variable">-gccgoflags</span> <span class="token string">&#39;[pattern=]arg list&#39;</span> 传递每个gccgo编译器/链接器调用的参数列表</span>
<span class="line">    <span class="token parameter variable">-gcflags</span> <span class="token string">&#39;[pattern=]arg list&#39;</span> 用于指定需要传递给go tool compile命令的参数的列表,更多信息参见<span class="token punctuation">(</span>go tool compile<span class="token punctuation">)</span></span>
<span class="line">    <span class="token parameter variable">-installsuffix</span> suffix 为了使当前的输出目录与默认的编译输出目录分离,可以使用这个标记.此标记的值会作为结果文件的父目录名称的后缀.其实,如果使用了-race标记,这个标记会被自动追加且其值会为race.如果我们同时使用了-race标记和-installsuffix,那么在-installsuffix标记的值的后面会再被追加_race,并以此来作为实际使用的后缀</span>
<span class="line">    <span class="token parameter variable">-ldflags</span> <span class="token string">&#39;[pattern=]arg list&#39;</span> 用于指定需要传递给go tool link命令的参数的列表</span>
<span class="line">    <span class="token parameter variable">-linkshared</span></span>
<span class="line">    <span class="token parameter variable">-mod</span> mode 模块下载方式,只有2个选项<span class="token punctuation">(</span>readonly或vendor<span class="token punctuation">)</span>,更多信息请参见<span class="token punctuation">(</span>go <span class="token builtin class-name">help</span> modules<span class="token punctuation">)</span></span>
<span class="line">    <span class="token parameter variable">-pkgdir</span> <span class="token function">dir</span> 设置包目录.编译器会只从该目录中加载代码包的归档文件,并会把编译可能会生成的代码包归档文件放置在该目录下</span>
<span class="line">    <span class="token parameter variable">-tags</span> <span class="token string">&#39;tag list&#39;</span></span>
<span class="line">    <span class="token parameter variable">-toolexec</span> <span class="token string">&#39;cmd args&#39;</span> 用于在编译期间使用一些Go语言自带工具<span class="token punctuation">(</span>如vet、asm等<span class="token punctuation">)</span>的方式</span>
<span class="line">示例:</span>
<span class="line">go build <span class="token punctuation">[</span><span class="token number">1</span>个或多个go源文件, 或者包名, 或者包所在目录<span class="token punctuation">]</span></span>
<span class="line">go build a.go b.go main.go</span>
<span class="line">go build main.go</span>
<span class="line">go build hello</span>
<span class="line"><span class="token comment"># 把main.go编译成可执行文件hello.exe</span></span>
<span class="line">go build <span class="token parameter variable">-o</span> hello.exe  main.go</span>
<span class="line"><span class="token comment"># 打印编译时执行的命令,但不真正执行</span></span>
<span class="line">go build <span class="token parameter variable">-n</span> </span>
<span class="line"><span class="token comment"># 答应工作目录</span></span>
<span class="line">go build <span class="token parameter variable">-work</span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-clean-删除对象文件和缓存的文件" tabindex="-1"><a class="header-anchor" href="#_2-clean-删除对象文件和缓存的文件"><span>2. clean 删除对象文件和缓存的文件</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">clean 删除执行其他命令时产生的文件、目录和缓存文件.</span>
<span class="line">    具体地说.clean 会删除从导入路径对应的源码目录中,删除以下这些文件和目录</span>
<span class="line">        _obj/            old object directory, left from Makefiles</span>
<span class="line">        _test/           old <span class="token builtin class-name">test</span> directory, left from Makefiles</span>
<span class="line">        _testmain.go     old gotest file, left from Makefiles</span>
<span class="line">        test.out         old <span class="token builtin class-name">test</span> log, left from Makefiles</span>
<span class="line">        build.out        old <span class="token builtin class-name">test</span> log, left from Makefiles</span>
<span class="line">        *.<span class="token punctuation">[</span>568ao<span class="token punctuation">]</span>        object files, left from Makefiles</span>
<span class="line">        DIR<span class="token punctuation">(</span>.exe<span class="token punctuation">)</span>        from go build</span>
<span class="line">        DIR.test<span class="token punctuation">(</span>.exe<span class="token punctuation">)</span>   from go <span class="token builtin class-name">test</span> <span class="token parameter variable">-c</span></span>
<span class="line">        MAINFILE<span class="token punctuation">(</span>.exe<span class="token punctuation">)</span>   from go build MAINFILE.go</span>
<span class="line">        *.so             from SWIG</span>
<span class="line">usage: go clean <span class="token punctuation">[</span>clean flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>build flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>packages<span class="token punctuation">]</span></span>
<span class="line">  用法: go clean <span class="token punctuation">[</span>clean 参数<span class="token punctuation">]</span>   <span class="token punctuation">[</span>build参数<span class="token punctuation">]</span>   包</span>
<span class="line">  可选参数:</span>
<span class="line">    <span class="token parameter variable">-i</span> 会删除安装当前代码包所有产生的所有文件, 如果当前包是一个普通包<span class="token punctuation">(</span>不是main包<span class="token punctuation">)</span>,则结果文件指的就是在工作区的pkg目录的相应目录下的归档文件.如果当前代码包中只包含一个命令源码文件, 则删除当前目录和在工作区的bin目录下的可执行文件和测试文件.</span>
<span class="line">    <span class="token parameter variable">-n</span> 打印clean执行的命令,但不真正执行</span>
<span class="line">    <span class="token parameter variable">-r</span> 删除当前代码包和所有的依赖包产生的文件、目录和缓存文件</span>
<span class="line">    <span class="token parameter variable">-x</span> 打印clean执行的删除命令</span>
<span class="line">    <span class="token parameter variable">-cache</span> 删除所有 go build 的缓存</span>
<span class="line">    <span class="token parameter variable">-testcache</span> 删除当前包所有的测试结果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-doc-显示包文档" tabindex="-1"><a class="header-anchor" href="#_3-doc-显示包文档"><span>3. doc 显示包文档</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">doc与godoc 显示包或符号的文档, 更多用法请参考<span class="token punctuation">(</span>godoc -h<span class="token punctuation">)</span></span>
<span class="line">usage: go doc <span class="token punctuation">[</span>-u<span class="token punctuation">]</span> <span class="token punctuation">[</span>-c<span class="token punctuation">]</span> <span class="token punctuation">[</span>package<span class="token operator">|</span><span class="token punctuation">[</span>package.<span class="token punctuation">]</span>symbol<span class="token punctuation">[</span>.methodOrField<span class="token punctuation">]</span><span class="token punctuation">]</span></span>
<span class="line"> 用法:  go doc <span class="token punctuation">[</span>-u<span class="token punctuation">]</span> <span class="token punctuation">[</span>-c<span class="token punctuation">]</span> <span class="token punctuation">[</span>package<span class="token operator">|</span><span class="token punctuation">[</span>package.<span class="token punctuation">]</span>symbol<span class="token punctuation">[</span>.methodOrField<span class="token punctuation">]</span><span class="token punctuation">]</span></span>
<span class="line"> 可选参数:</span>
<span class="line">    <span class="token parameter variable">-c</span> 区分参数包名的大小写.默认情况下,包名是大小写不敏感的</span>
<span class="line">    <span class="token parameter variable">-cmd</span> 打印 main 包文档, 默认情况下不会打印 main 包文档</span>
<span class="line">    <span class="token parameter variable">-u</span> 打印出所有的文档<span class="token punctuation">(</span>同事包含可导出和不可导出实体<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 显示 hellomod 包文档,(注意 hellomod 和 Hellomod是不同的包)</span></span>
<span class="line">go doc <span class="token parameter variable">-c</span> hellomod</span>
<span class="line"></span></code></pre></div><h2 id="_4-env-打印go语言的环境信息" tabindex="-1"><a class="header-anchor" href="#_4-env-打印go语言的环境信息"><span>4. env 打印Go语言的环境信息</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">env</span> 打印Go语言的环境信息</span>
<span class="line">usage: go <span class="token function">env</span> <span class="token punctuation">[</span>-json<span class="token punctuation">]</span> <span class="token punctuation">[</span>var <span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line"> 用法: go <span class="token function">env</span> <span class="token punctuation">[</span>-json<span class="token punctuation">]</span> <span class="token punctuation">[</span>变量 <span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line"> 可选参数:</span>
<span class="line">    <span class="token parameter variable">-json</span> 以json格式打印环境信息</span>
<span class="line"></span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 以json格式打印所有环境信息</span></span>
<span class="line">go <span class="token function">env</span> <span class="token parameter variable">-json</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 以json格式只打印 GOOS 程序构建环境的目标操作系统</span></span>
<span class="line">go <span class="token function">env</span> <span class="token parameter variable">-json</span> GOOS</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 打印所有环境信息</span></span>
<span class="line">go <span class="token function">env</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 只打印 GOOS 程序构建环境的目标操作系统</span></span>
<span class="line">go <span class="token function">env</span> GOOS</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-fix与go-tool-fix-会把指定包中的所有go语言源码文件中旧版本代码修正为新版本的代码-升级版本时非常有用" tabindex="-1"><a class="header-anchor" href="#_5-fix与go-tool-fix-会把指定包中的所有go语言源码文件中旧版本代码修正为新版本的代码-升级版本时非常有用"><span>5. fix与go tool fix 会把指定包中的所有Go语言源码文件中旧版本代码修正为新版本的代码,升级版本时非常有用</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">fix 会把指定包中的所有Go语言源码文件中旧版本代码修正为新版本的代码</span>
<span class="line">usage: go fix <span class="token punctuation">[</span>packages<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">示例:</span>
<span class="line">go fix testmod</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">go tool fix <span class="token parameter variable">-h</span></span>
<span class="line">usage: go tool fix <span class="token punctuation">[</span>-diff<span class="token punctuation">]</span> <span class="token punctuation">[</span>-r fixname,<span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span>-force fixname,<span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span>path <span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line">    <span class="token parameter variable">-diff</span> 不将修正后的内容写入文件, 而只打印修正前后的内容的对比信息到标准输出</span>
<span class="line">    <span class="token parameter variable">-force</span> string 使用此参数后, 即使源码文件中的代码已经与Go语言的最新版本相匹配, 也会强行执行指定的修正操作.该参数值就是需要强行执行的修正操作的名称,多个名称之间用英文半角逗号分隔</span>
<span class="line">    <span class="token parameter variable">-r</span> string 只对目标源码文件做有限的修正操作.该参数的值即为允许的修正操作的名称.多个名称之间用英文半角逗号分隔</span>
<span class="line"></span></code></pre></div><h2 id="_6-fmt与gofmt-格式化go源文件" tabindex="-1"><a class="header-anchor" href="#_6-fmt与gofmt-格式化go源文件"><span>6. fmt与gofmt 格式化go源文件</span></a></h2><blockquote><p>Go 开发团队不想要 Go 语言像许多其它语言那样总是在为代码风格而引发无休止的争论,浪费大量宝贵的开发时间,因此他们制作了一个工具:go fmt（gofmt）</p></blockquote><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">fmt与gofmt 命令 格式化go源文件,fmt命令实际<span class="token string">&quot;gofmt -l -w&quot;</span>命令之上做了一层包装,我们一般使用</span>
<span class="line">usage: go <span class="token function">fmt</span> <span class="token punctuation">[</span>-n<span class="token punctuation">]</span> <span class="token punctuation">[</span>-x<span class="token punctuation">]</span> <span class="token punctuation">[</span>packages<span class="token punctuation">]</span></span>
<span class="line"> 用法: go <span class="token function">fmt</span> <span class="token punctuation">[</span>-n<span class="token punctuation">]</span> <span class="token punctuation">[</span>-x<span class="token punctuation">]</span> 包</span>
<span class="line"> 可选参数:</span>
<span class="line">    <span class="token parameter variable">-x</span> 打印执行的命令</span>
<span class="line">    <span class="token parameter variable">-n</span> 打印执行的命令,但不真正执行</span>
<span class="line"></span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 格式化 testmod 包, 并显示执行命令</span></span>
<span class="line">go <span class="token function">fmt</span> <span class="token parameter variable">-x</span> testmod</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">gofmt 命令</span>
<span class="line">usage: gofmt <span class="token punctuation">[</span>flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>path <span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line"> 用法: gofmt <span class="token punctuation">[</span>参数<span class="token punctuation">]</span> <span class="token punctuation">[</span>路径 <span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line"> 可选参数:</span>
<span class="line">    <span class="token parameter variable">-cpuprofile</span> string 将cpu配置文件写入此文件</span>
<span class="line">    <span class="token parameter variable">-d</span> 显示格式化前后差异,但不写入文件</span>
<span class="line">    <span class="token parameter variable">-e</span> 打印所有错误, 默认只会打印不同行的前10个错误</span>
<span class="line">    <span class="token parameter variable">-l</span> 列出需要格式化的文件</span>
<span class="line">    <span class="token parameter variable">-r</span> string 重新规则,方便我们做批量替换,例如我们需要把hellomod.Hello替换成hellomod.HelloNew<span class="token punctuation">(</span><span class="token string">&quot;hellomod.Hello -&gt; hellomod.HelloNew&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token parameter variable">-s</span> 简化代码</span>
<span class="line">    <span class="token parameter variable">-w</span> 将结果直接写入到文件中</span>
<span class="line">    </span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 格式当前目录代码</span></span>
<span class="line">gofmt <span class="token parameter variable">-w</span> ./</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 把当前目录中的“hellomod.Hello” 替换成 &quot;hellomod.HelloNew&quot;</span></span>
<span class="line">gofmt <span class="token parameter variable">-r</span> <span class="token string">&quot;hellomod.Hello -&gt; hellomod.HelloNew&quot;</span> <span class="token parameter variable">-w</span> ./</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-get-下载并安装包和依赖-下载包和依赖-并对它们进行编译安装" tabindex="-1"><a class="header-anchor" href="#_8-get-下载并安装包和依赖-下载包和依赖-并对它们进行编译安装"><span>8. get 下载并安装包和依赖(下载包和依赖,并对它们进行编译安装)</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">get 命令 下载并安装包和依赖<span class="token punctuation">(</span>下载包和依赖,并对它们进行编译安装<span class="token punctuation">)</span></span>
<span class="line">usage: go get <span class="token punctuation">[</span>-d<span class="token punctuation">]</span> <span class="token punctuation">[</span>-f<span class="token punctuation">]</span> <span class="token punctuation">[</span>-t<span class="token punctuation">]</span> <span class="token punctuation">[</span>-u<span class="token punctuation">]</span> <span class="token punctuation">[</span>-v<span class="token punctuation">]</span> <span class="token punctuation">[</span>-fix<span class="token punctuation">]</span> <span class="token punctuation">[</span>-insecure<span class="token punctuation">]</span> <span class="token punctuation">[</span>build flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>packages<span class="token punctuation">]</span></span>
<span class="line"> 用法: go get <span class="token punctuation">[</span>-d<span class="token punctuation">]</span> <span class="token punctuation">[</span>-f<span class="token punctuation">]</span> <span class="token punctuation">[</span>-t<span class="token punctuation">]</span> <span class="token punctuation">[</span>-u<span class="token punctuation">]</span> <span class="token punctuation">[</span>-v<span class="token punctuation">]</span> <span class="token punctuation">[</span>-fix<span class="token punctuation">]</span> <span class="token punctuation">[</span>-insecure<span class="token punctuation">]</span> <span class="token punctuation">[</span>build flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>包<span class="token punctuation">]</span></span>
<span class="line"> 可选参数:</span>
<span class="line">    <span class="token parameter variable">-d</span> 只下载不安装<span class="token punctuation">(</span>只执行下载动作, 不执行安装动作<span class="token punctuation">)</span></span>
<span class="line">    <span class="token parameter variable">-f</span> 只有在包含了-u参数的时候才有效.该参数会让命令程序忽略掉对已下载代码包的导入路径的检查.如果下载并安装的代码包所属的项目是你从别人那里Fork过来的,那么这样做就尤为重要了</span>
<span class="line">    <span class="token parameter variable">-fix</span> 会下载代码包后先执行修正动作,而后再进行编译和安装</span>
<span class="line">    <span class="token parameter variable">-insecure</span> 请谨慎使用, 允许使用不安全<span class="token punctuation">(</span>http或者自定义域<span class="token punctuation">)</span>的存储库中下载解析.</span>
<span class="line">        即:允许命令程序使用非安全的scheme（如HTTP）去下载指定的代码包.如果你用的代码仓库<span class="token punctuation">(</span>如公司内部的Gitlab<span class="token punctuation">)</span>没有HTTPS支持,可以添加此标记.请在确定安全的情况下使用它.</span>
<span class="line">    <span class="token parameter variable">-t</span> 同时也下载需要为运行测试所需要的包</span>
<span class="line">    <span class="token parameter variable">-u</span> 强制从网络更新包和它的依赖包.默认情况下,该命令只会从网络上下载本地不存在的代码包,而不会更新已有的代码包</span>
<span class="line">    <span class="token parameter variable">-v</span> 显示执行的命令</span>
<span class="line"></span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 下载包</span></span>
<span class="line">go get github.com/donvito/hellomod</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-install-编译并安装指定包及它们的依赖包" tabindex="-1"><a class="header-anchor" href="#_9-install-编译并安装指定包及它们的依赖包"><span>9. install 编译并安装指定包及它们的依赖包</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">install</span> 编译并安装指定包及它们的依赖包,先生成中间文件<span class="token punctuation">(</span>可执行文件或者.a包<span class="token punctuation">)</span>,然后把编译好的结果移到<span class="token variable">$GOPATH</span>/pkg或者<span class="token variable">$GOPATH</span>/bin</span>
<span class="line">usage: go <span class="token function">install</span> <span class="token punctuation">[</span>-i<span class="token punctuation">]</span> <span class="token punctuation">[</span>build flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>packages<span class="token punctuation">]</span></span>
<span class="line"> 用法: go <span class="token function">install</span> <span class="token punctuation">[</span>-i<span class="token punctuation">]</span> <span class="token punctuation">[</span>编译 flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>包<span class="token punctuation">]</span></span>
<span class="line"> 可选参数:</span>
<span class="line">    <span class="token parameter variable">-i</span> </span>
<span class="line"></span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 安装包</span></span>
<span class="line">go <span class="token function">install</span> github.com/gin-gonic/gin</span>
<span class="line"></span></code></pre></div><h2 id="_10-list-列出包和模块信息" tabindex="-1"><a class="header-anchor" href="#_10-list-列出包和模块信息"><span>10. list 列出包和模块信息</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">list 列出包和模块信息</span>
<span class="line">usage: go list <span class="token punctuation">[</span>-f format<span class="token punctuation">]</span> <span class="token punctuation">[</span>-json<span class="token punctuation">]</span> <span class="token punctuation">[</span>-m<span class="token punctuation">]</span> <span class="token punctuation">[</span>list flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>build flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>packages<span class="token punctuation">]</span></span>
<span class="line"> 用法: go list <span class="token punctuation">[</span>-f format<span class="token punctuation">]</span> <span class="token punctuation">[</span>-json<span class="token punctuation">]</span> <span class="token punctuation">[</span>-m<span class="token punctuation">]</span> <span class="token punctuation">[</span>list flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>build flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>包<span class="token punctuation">]</span></span>
<span class="line"> 可选参数:</span>
<span class="line">    <span class="token parameter variable">-f</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>.字段名<span class="token punctuation">}</span><span class="token punctuation">}</span> 查看指定的字段信息</span>
<span class="line">    <span class="token parameter variable">-json</span> 以json格式打印信息</span>
<span class="line">    <span class="token parameter variable">-m</span> 列出模块信息</span>
<span class="line">更多用法请参考<span class="token punctuation">(</span>go <span class="token builtin class-name">help</span> list<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 以json格式打印gapp包信息</span></span>
<span class="line">go list <span class="token parameter variable">-json</span> gapp</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 打印模块信息</span></span>
<span class="line">go list <span class="token parameter variable">-m</span> testmod</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 以json格式打印模块信息</span></span>
<span class="line">go list <span class="token parameter variable">-m</span> <span class="token parameter variable">-json</span> testmod </span>
<span class="line"><span class="token comment"># testmod模块打印结果:</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">&quot;Path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;testmod&quot;</span>,</span>
<span class="line">        <span class="token string">&quot;Main&quot;</span><span class="token builtin class-name">:</span> true,</span>
<span class="line">        <span class="token string">&quot;Dir&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/Users/zhaoweijie/go/src/business-card/docker-compose/go-tutorials/9/examples/testmod&quot;</span>,</span>
<span class="line">        <span class="token string">&quot;GoMod&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/Users/zhaoweijie/go/src/business-card/docker-compose/go-tutorials/9/examples/testmod/go.mod&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-mod-管理模块" tabindex="-1"><a class="header-anchor" href="#_11-mod-管理模块"><span>11. mod 管理模块</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">mod 管理模块</span>
<span class="line">Usage: go mod <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span> <span class="token punctuation">[</span>arguments<span class="token punctuation">]</span></span>
<span class="line"> 用法: go mod <span class="token operator">&lt;</span>命令<span class="token operator">&gt;</span> <span class="token punctuation">[</span>参数<span class="token punctuation">]</span></span>
<span class="line"> 可选命令<span class="token operator">&lt;</span>command<span class="token operator">&gt;</span>: go <span class="token builtin class-name">help</span> mod <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span></span>
<span class="line">    download    下载模块到本地缓存</span>
<span class="line">        usage: go mod download <span class="token punctuation">[</span>-json<span class="token punctuation">]</span> <span class="token punctuation">[</span>modules<span class="token punctuation">]</span></span>
<span class="line">          用法:</span>
<span class="line">        可选参数:</span>
<span class="line">            <span class="token parameter variable">-json</span> </span>
<span class="line">        示例:</span>
<span class="line">            <span class="token comment"># 下载模块,以json格式打印模块信息</span></span>
<span class="line">            go mod download <span class="token parameter variable">-json</span> github.com/qq1060656096/hellomod   </span>
<span class="line">            <span class="token comment"># json格式打印 github.com/qq1060656096/hellomod 模块信息</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token string">&quot;Path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;github.com/qq1060656096/hellomod&quot;</span>,</span>
<span class="line">                    <span class="token string">&quot;Version&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;v1.0.0&quot;</span>,</span>
<span class="line">                    <span class="token string">&quot;Info&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/Users/zhaoweijie/go/pkg/mod/cache/download/github.com/qq1060656096/hellomod/@v/v1.0.0.info&quot;</span>,</span>
<span class="line">                    <span class="token string">&quot;GoMod&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/Users/zhaoweijie/go/pkg/mod/cache/download/github.com/qq1060656096/hellomod/@v/v1.0.0.mod&quot;</span>,</span>
<span class="line">                    <span class="token string">&quot;Zip&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/Users/zhaoweijie/go/pkg/mod/cache/download/github.com/qq1060656096/hellomod/@v/v1.0.0.zip&quot;</span>,</span>
<span class="line">                    <span class="token string">&quot;Dir&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/Users/zhaoweijie/go/pkg/mod/github.com/qq1060656096/hellomod@v1.0.0&quot;</span>,</span>
<span class="line">                    <span class="token string">&quot;Sum&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;h1:O66u/mTlM4cHHdwuKPNpUBmJor2XOv0Wa0j+qfOwAN4=&quot;</span>,</span>
<span class="line">                    <span class="token string">&quot;GoModSum&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;h1:TOAQUVNcJP1uykhVNbIcfTsdYdjs2zrIYEtpAGWpcqg=&quot;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    edit   提供命令来编辑go.mod文件, 主要用于工具或脚本</span>
<span class="line">        usage: go mod edit <span class="token punctuation">[</span>editing flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>go.mod<span class="token punctuation">]</span></span>
<span class="line">         用法: go mod edit <span class="token punctuation">[</span>editing flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>go.mod<span class="token punctuation">]</span></span>
<span class="line">        可选参数:</span>
<span class="line">            <span class="token parameter variable">-fmt</span> 只会格式化go.mod文件</span>
<span class="line">            <span class="token parameter variable">-module</span> 更改模块路径</span>
<span class="line">            <span class="token parameter variable">-require</span><span class="token operator">=</span>path@version 添加模块依赖</span>
<span class="line">                示例:</span>
<span class="line">                    <span class="token comment"># 添加hellomod模块v1.0.0版本</span></span>
<span class="line">                    go mod edit <span class="token parameter variable">-require</span><span class="token operator">=</span>github.com/qq1060656096/hellomod@v1.0.0</span>
<span class="line">            <span class="token parameter variable">-droprequire</span><span class="token operator">=</span>path 删除模块依赖</span>
<span class="line">                示例:</span>
<span class="line">                    <span class="token comment"># 删除hellomod模块</span></span>
<span class="line">                    go mod edit <span class="token parameter variable">-droprequire</span><span class="token operator">=</span>github.com/qq1060656096/hellomod</span>
<span class="line">            <span class="token parameter variable">-exclude</span><span class="token operator">=</span>path@version 排查模块</span>
<span class="line">                <span class="token comment"># 排除hellomod模块v1.0.0版本</span></span>
<span class="line">                go mod edit <span class="token parameter variable">-exclude</span><span class="token operator">=</span>github.com/qq1060656096/hellomod@v1.0.0</span>
<span class="line">            <span class="token parameter variable">-dropexclude</span><span class="token operator">=</span>path@version 删除排除的模块<span class="token punctuation">(</span>恢复排除的模块<span class="token punctuation">)</span></span>
<span class="line">                <span class="token comment"># 恢复排除hellomod模块v1.0.0版本</span></span>
<span class="line">                go mod edit <span class="token parameter variable">-dropexclude</span><span class="token operator">=</span>github.com/qq1060656096/hellomod@v1.0.0</span>
<span class="line">            <span class="token parameter variable">-replace</span><span class="token operator">=</span>old<span class="token punctuation">[</span>@v<span class="token punctuation">]</span><span class="token operator">=</span>new<span class="token punctuation">[</span>@v<span class="token punctuation">]</span> 替换模块</span>
<span class="line">                示例:</span>
<span class="line">                    <span class="token comment"># hellomod模块v1.0.0版本替换成v2.0.0版本</span></span>
<span class="line">                    go mod edit <span class="token parameter variable">-replace</span><span class="token operator">=</span>github.com/qq1060656096/hellomod@v1.0.0<span class="token operator">=</span>github.com/qq1060656096/hellomod@v2.0.0</span>
<span class="line">            <span class="token parameter variable">-dropreplace</span><span class="token operator">=</span>old<span class="token punctuation">[</span>@v<span class="token punctuation">]</span></span>
<span class="line">            <span class="token parameter variable">-print</span> 打印结果,不会操作go.mod文件</span>
<span class="line">            <span class="token parameter variable">-json</span> 以json格式打印结果,不会操作go.mod文件</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    graph   打印模块需求图</span>
<span class="line">        usage: go mod graph</span>
<span class="line">        用法: go mod graph</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    init    在当前⽂件夹下初始化⼀个新的模块<span class="token punctuation">(</span>创建go.mod⽂件<span class="token punctuation">)</span></span>
<span class="line">        usage: go mod init <span class="token punctuation">[</span>module<span class="token punctuation">]</span></span>
<span class="line">        用法: go mod init <span class="token punctuation">[</span>模块名<span class="token punctuation">]</span></span>
<span class="line">        示例:</span>
<span class="line">            <span class="token comment"># 创建“github.com/qq1060656096/hellomod”模块</span></span>
<span class="line">            go mod init github.com/qq1060656096/hellomod</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    tidy    整理模块<span class="token punctuation">(</span>增加缺少的模块,删除未⽤的模块<span class="token punctuation">)</span></span>
<span class="line">        usage: go mod tidy <span class="token punctuation">[</span>-v<span class="token punctuation">]</span></span>
<span class="line">        用法: go mod tidy <span class="token punctuation">[</span>-v<span class="token punctuation">]</span></span>
<span class="line">        可选参数:</span>
<span class="line">            <span class="token parameter variable">-v</span> 打印已经删除的模块信息</span>
<span class="line"></span>
<span class="line">        示例:</span>
<span class="line">            <span class="token comment"># 整理模块,并打印已经删除的模块</span></span>
<span class="line">            go mod tidy <span class="token parameter variable">-v</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    vendor  将依赖复制到vendor下</span>
<span class="line">        usage: go mod vendor <span class="token punctuation">[</span>-v<span class="token punctuation">]</span></span>
<span class="line">        用法: go mod vendor <span class="token punctuation">[</span>-v<span class="token punctuation">]</span></span>
<span class="line">        可选参数:</span>
<span class="line">            <span class="token parameter variable">-v</span> 打印复制到vendor的所有包和模块</span>
<span class="line">        示例:</span>
<span class="line">            <span class="token comment"># 打印复制到vendor的所有包和模块</span></span>
<span class="line">            go mod vendor <span class="token parameter variable">-v</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    verify  校验依赖的HASH码,验证检查当前模块的依赖, 如果依赖本有更改就使用之前的, 如果所有模块都没有更改,就打印<span class="token string">&quot;all modules verified</span>
<span class="line">&quot;</span>, 否则就报告<span class="token punctuation">(</span>打印<span class="token punctuation">)</span>已更改的模块</span>
<span class="line">        usage: go mod verify</span>
<span class="line">        用法: go mod verify</span>
<span class="line">        示例:</span>
<span class="line">            go mod verify</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">    why     解释为什么需要依赖</span>
<span class="line">        usage: go mod why <span class="token punctuation">[</span>-m<span class="token punctuation">]</span> <span class="token punctuation">[</span>-vendor<span class="token punctuation">]</span> packages<span class="token punctuation">..</span>.</span>
<span class="line">        用法: go mod why <span class="token punctuation">[</span>-m<span class="token punctuation">]</span> <span class="token punctuation">[</span>-vendor<span class="token punctuation">]</span> packages<span class="token punctuation">..</span>.</span>
<span class="line">        可选参数</span>
<span class="line">            <span class="token parameter variable">-vendor</span></span>
<span class="line">            <span class="token parameter variable">-m</span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12-run-编译并运行go程序" tabindex="-1"><a class="header-anchor" href="#_12-run-编译并运行go程序"><span>12. run 编译并运行Go程序</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">run 命令 编译并运行Go程序</span>
<span class="line">usage: go run <span class="token punctuation">[</span>build flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>-exec xprog<span class="token punctuation">]</span> package <span class="token punctuation">[</span>arguments<span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line">用法: go run <span class="token punctuation">[</span>编译 flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>-exec xprog<span class="token punctuation">]</span> 包 <span class="token punctuation">[</span>arguments<span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line">可选参数: 其他参数请参考<span class="token punctuation">(</span>go <span class="token builtin class-name">help</span> build<span class="token punctuation">)</span></span>
<span class="line">    <span class="token parameter variable">-exec</span> </span>
<span class="line"></span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 运行maing.go</span></span>
<span class="line">go run main.go</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 运行maing.go并开启竞态检测(开发时建议开启这个选项)</span></span>
<span class="line">go run <span class="token parameter variable">-race</span> main.go</span>
<span class="line"></span></code></pre></div><h2 id="_13-test-测试包" tabindex="-1"><a class="header-anchor" href="#_13-test-测试包"><span>13. test 测试包</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">go <span class="token builtin class-name">test</span> 用于测试包</span>
<span class="line">usage: go <span class="token builtin class-name">test</span> <span class="token punctuation">[</span>build/test flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>packages<span class="token punctuation">]</span> <span class="token punctuation">[</span>build/test flags <span class="token operator">&amp;</span> <span class="token builtin class-name">test</span> binary flags<span class="token punctuation">]</span></span>
<span class="line">    <span class="token parameter variable">-c</span> 把包编译二进制测试包, 注意不会运行, 需要你手动执行二进制测试</span>
<span class="line">        示例: </span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-c</span> package_import_path</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-c</span> 包的导入路径</span>
<span class="line">            <span class="token number">1</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-c</span> 在当前目录生成二进制测试</span>
<span class="line">            <span class="token number">2</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-c</span> go <span class="token builtin class-name">test</span> <span class="token parameter variable">-c</span> go-tutorials/8/examples/demo1 </span>
<span class="line"></span>
<span class="line">    <span class="token parameter variable">-exec</span> 运行二进制测试</span>
<span class="line">        示例:</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-c</span> <span class="token parameter variable">-exec</span> demo1.test</span>
<span class="line">    <span class="token parameter variable">-json</span> 运行测试,并将结果输出为json格式</span>
<span class="line">        示例:</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-json</span> path</span>
<span class="line">            <span class="token number">1</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-json</span> 测试当前包</span>
<span class="line">            <span class="token number">2</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-json</span> ./</span>
<span class="line">    <span class="token parameter variable">-o</span> 把测试编译成自己命名二进制包, 默认仍然会运行测试<span class="token punctuation">(</span>除非指定-c或者-i<span class="token punctuation">)</span></span>
<span class="line">        示例:</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-o</span> file_name</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-o</span> 文件名</span>
<span class="line">            <span class="token number">1</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-o</span> demo1.custom_name.test</span>
<span class="line">    <span class="token parameter variable">-bench</span> 运行基准测试, 默认情况下不运行</span>
<span class="line">        示例:</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-bench</span> regexp</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-bench</span> 正则表达式</span>
<span class="line">            <span class="token number">1</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-bench</span> 运行所有基准测试</span>
<span class="line">            <span class="token number">2</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-bench</span><span class="token operator">=</span>. 运行所有基准测试</span>
<span class="line">            <span class="token number">3</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-bench</span><span class="token operator">=</span>hah 运行指定的基准测试</span>
<span class="line">    <span class="token parameter variable">-benchtime</span> 基准测试,持续时间<span class="token punctuation">(</span>默认1秒<span class="token punctuation">)</span></span>
<span class="line">    </span>
<span class="line">    <span class="token parameter variable">-count</span> 运行测试次数</span>
<span class="line">        示例:</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-count</span> n</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-count</span> 次数</span>
<span class="line">            <span class="token number">1</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-count</span> <span class="token number">10</span> 运行所有的测试10次</span>
<span class="line">    <span class="token parameter variable">-cover</span> 覆盖率统计, 注意覆盖率统计是通过代码注释来工作的</span>
<span class="line">    <span class="token parameter variable">-cpu</span> 指定测试cpu数量</span>
<span class="line">        示例:</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-cpu</span> <span class="token number">1,2</span>,4</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-cpu</span> cpu数量</span>
<span class="line">            <span class="token number">1</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-cpu</span> <span class="token number">8</span> 指定8个cpu</span>
<span class="line">    <span class="token parameter variable">-list</span> regexp 列出匹配的测试</span>
<span class="line">        示例:</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-list</span> regexp</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-list</span> 正则表达式</span>
<span class="line">            <span class="token number">1</span>. go <span class="token builtin class-name">test</span> <span class="token parameter variable">-list</span> Login 列出demo1中的测试</span>
<span class="line">    <span class="token parameter variable">-v</span> 详细输出运行时记录所有的测试</span>
<span class="line">        示例:</span>
<span class="line">            go <span class="token builtin class-name">test</span> <span class="token parameter variable">-v</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_14-tool-运行指定的go工具" tabindex="-1"><a class="header-anchor" href="#_14-tool-运行指定的go工具"><span>14. tool 运行指定的go工具</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">tool 命令 运行指定的go工具</span>
<span class="line">usage: go tool <span class="token punctuation">[</span>-n<span class="token punctuation">]</span> <span class="token builtin class-name">command</span> <span class="token punctuation">[</span>args<span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line">用法: go tool <span class="token punctuation">[</span>-n<span class="token punctuation">]</span> 命令 <span class="token punctuation">[</span>args<span class="token punctuation">..</span>.<span class="token punctuation">]</span></span>
<span class="line">可选参数:</span>
<span class="line">    <span class="token parameter variable">-n</span> 打印要执行的命令, 但是不真正的执行</span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 打印vet工具执行的命令</span></span>
<span class="line">go tool <span class="token parameter variable">-n</span> vet</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><strong>go tool 工具列表</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># go tool: 列表工具列表</span></span>
<span class="line"><span class="token comment"># go tool 工具 -h: 查看工具帮助文档</span></span>
<span class="line"><span class="token comment"># 查看vet工具帮助文档: go tool vet -h</span></span>
<span class="line">addr2line</span>
<span class="line">api</span>
<span class="line">asm</span>
<span class="line">buildid</span>
<span class="line">cgo</span>
<span class="line">compile</span>
<span class="line">cover</span>
<span class="line">dist</span>
<span class="line">doc</span>
<span class="line">fix</span>
<span class="line"><span class="token function">link</span></span>
<span class="line">nm</span>
<span class="line">objdump</span>
<span class="line">pack</span>
<span class="line">pprof 可以帮助开发者快速分析及定位各种性能问题,如 CPU 消耗、内存分配及阻塞分析</span>
<span class="line">test2json</span>
<span class="line">trace</span>
<span class="line">vet 报告包中可能出现的错误,开发时建议使用这个工具<span class="token punctuation">(</span>fmt printf函数参数不对或者声明结构体 tag声明不对等<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_15-version-查看当前go语言版本" tabindex="-1"><a class="header-anchor" href="#_15-version-查看当前go语言版本"><span>15. version 查看当前go语言版本</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">version 查看go当前的版本</span>
<span class="line">usage: go version</span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 查看go当前的版本</span></span>
<span class="line">go version </span>
<span class="line"></span></code></pre></div><h2 id="_16-vet-报告包中可能出现的错误" tabindex="-1"><a class="header-anchor" href="#_16-vet-报告包中可能出现的错误"><span>16. vet 报告包中可能出现的错误</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">vet 静态检查工具,报告包中可能出现的错误, 开发时建议使用这个工具<span class="token punctuation">(</span>fmt printf函数参数不对或者声明结构体 tag声明不对等<span class="token punctuation">)</span></span>
<span class="line">usage: go vet <span class="token punctuation">[</span>-n<span class="token punctuation">]</span> <span class="token punctuation">[</span>-x<span class="token punctuation">]</span> <span class="token punctuation">[</span>build flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>vet flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>packages<span class="token punctuation">]</span></span>
<span class="line">用法: go vet <span class="token punctuation">[</span>-n<span class="token punctuation">]</span> <span class="token punctuation">[</span>-x<span class="token punctuation">]</span> <span class="token punctuation">[</span>编译参数<span class="token punctuation">]</span> <span class="token punctuation">[</span>vet flags<span class="token punctuation">]</span> <span class="token punctuation">[</span>包<span class="token punctuation">]</span></span>
<span class="line">可选参数:</span>
<span class="line">    <span class="token parameter variable">-n</span> 打印要执行的命令, 但是不真正的执行</span>
<span class="line">    <span class="token parameter variable">-x</span> 打印执行的命令</span>
<span class="line"></span>
<span class="line">更多参数请参考<span class="token punctuation">(</span>go <span class="token builtin class-name">help</span> build<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">示例:</span>
<span class="line"><span class="token comment"># 检测 testmod 包中可能存在的问题</span></span>
<span class="line">go vet testmod </span>
<span class="line"></span></code></pre></div>`,47)])])}const o=n(p,[["render",i]]),u=JSON.parse('{"path":"/cs-tips/tool/go.html","title":"go命令","lang":"zh-CN","frontmatter":{"description":"go命令 go命令 注意 cgo 不支持交叉编译 使用pure go sqlite driver 或者使用https://github.com/msys2/msys2-installer/不要使用mingw windows上用不了 go 交叉编译 pm2命令 go 命令详解 提示 常用命令 关于gin打包 写一个build.ps1文件 相关信息 bui...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"go命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/tool/go.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"go命令"}],["meta",{"property":"og:description","content":"go命令 go命令 注意 cgo 不支持交叉编译 使用pure go sqlite driver 或者使用https://github.com/msys2/msys2-installer/不要使用mingw windows上用不了 go 交叉编译 pm2命令 go 命令详解 提示 常用命令 关于gin打包 写一个build.ps1文件 相关信息 bui..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}]]},"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":14.96,"words":4488},"filePathRelative":"cs-tips/tool/go.md","autoDesc":true}');export{o as comp,u as data};
