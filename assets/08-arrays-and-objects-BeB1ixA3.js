import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/08-arrays-and-objects.html","title":"08 - 数组与对象","lang":"zh-CN","frontmatter":{"order":8,"description":"08 - 数组与对象 Array（数组） 创建数组 AHK v2 数组索引从 1 开始（不是 0）。 访问与修改 添加与删除 Push vs InsertAt 长度与遍历 数组常用操作 Map（映射/字典） 创建 Map 访问与修改 删除键 遍历 Map Map 遍历顺序是插入顺序（AHK v2）。 Map 的键类型 Object（对象） AHK v2...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"08 - 数组与对象\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/08-arrays-and-objects.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"08 - 数组与对象"}],["meta",{"property":"og:description","content":"08 - 数组与对象 Array（数组） 创建数组 AHK v2 数组索引从 1 开始（不是 0）。 访问与修改 添加与删除 Push vs InsertAt 长度与遍历 数组常用操作 Map（映射/字典） 创建 Map 访问与修改 删除键 遍历 Map Map 遍历顺序是插入顺序（AHK v2）。 Map 的键类型 Object（对象） AHK v2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.03,"words":1210},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/08-arrays-and-objects.md","autoDesc":true}`),u={name:`08-arrays-and-objects.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_08-数组与对象" tabindex="-1"><a class="header-anchor" href="#_08-数组与对象"><span>08 - 数组与对象</span></a></h1><h2 id="array-数组" tabindex="-1"><a class="header-anchor" href="#array-数组"><span>Array（数组）</span></a></h2><h3 id="创建数组" tabindex="-1"><a class="header-anchor" href="#创建数组"><span>创建数组</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; 用 [] 创建数组</span>
<span class="line">arr := [10, 20, 30, 40, 50]</span>
<span class="line"></span>
<span class="line">; 空 Array</span>
<span class="line">arr := []</span>
<span class="line"></span>
<span class="line">; 用 Array() 函数创建</span>
<span class="line">arr := Array(10, 20, 30)</span>
<span class="line"></span>
<span class="line">; 混合类型</span>
<span class="line">arr := [1, &quot;hello&quot;, true, [1, 2]]   ; 可以包含不同类型</span>
<span class="line"></span></code></pre></div><blockquote><p>AHK v2 数组索引从 <strong>1</strong> 开始（不是 0）。</p></blockquote><h3 id="访问与修改" tabindex="-1"><a class="header-anchor" href="#访问与修改"><span>访问与修改</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">arr := [10, 20, 30, 40]</span>
<span class="line"></span>
<span class="line">MsgBox arr[1]       ; 10（第一个元素）</span>
<span class="line">MsgBox arr[4]       ; 40（最后一个元素）</span>
<span class="line"></span>
<span class="line">; 修改元素</span>
<span class="line">arr[2] := 25        ; arr 变为 [10, 25, 30, 40]</span>
<span class="line"></span>
<span class="line">; 越界访问返回空字符串</span>
<span class="line">MsgBox arr[10]      ; &quot;&quot;（空字符串，不是报错）</span>
<span class="line"></span></code></pre></div><h3 id="添加与删除" tabindex="-1"><a class="header-anchor" href="#添加与删除"><span>添加与删除</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">arr := [10, 20, 30]</span>
<span class="line"></span>
<span class="line">; Push — 在末尾添加</span>
<span class="line">arr.Push(40)          ; [10, 20, 30, 40]</span>
<span class="line">arr.Push(50, 60)      ; [10, 20, 30, 40, 50, 60] — 可添加多个</span>
<span class="line"></span>
<span class="line">; InsertAt — 在指定位置插入</span>
<span class="line">arr.InsertAt(2, 15)   ; [10, 15, 20, 30, 40, 50, 60]</span>
<span class="line"></span>
<span class="line">; RemoveAt — 删除指定位置</span>
<span class="line">arr.RemoveAt(2)       ; [10, 20, 30, 40, 50, 60] — 删除第2个</span>
<span class="line"></span>
<span class="line">; Pop — 删除末尾并返回</span>
<span class="line">last := arr.Pop()     ; last = 60, arr = [10, 20, 30, 40, 50]</span>
<span class="line"></span>
<span class="line">; Delete — 删除指定位置（不移动后续元素，留下空洞）</span>
<span class="line">arr.Delete(3)         ; arr[3] = &quot;&quot;（空洞），不影响 arr[4]</span>
<span class="line"></span>
<span class="line">; Clear — 清空数组</span>
<span class="line">arr.Clear()</span>
<span class="line">MsgBox arr.Length     ; 0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="push-vs-insertat" tabindex="-1"><a class="header-anchor" href="#push-vs-insertat"><span>Push vs InsertAt</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Push: 在末尾追加，最常用</span>
<span class="line">arr := [1, 2]</span>
<span class="line">arr.Push(3)           ; [1, 2, 3]</span>
<span class="line"></span>
<span class="line">; InsertAt: 在指定位置插入，后续元素往后移</span>
<span class="line">arr := [1, 3]</span>
<span class="line">arr.InsertAt(2, 2)    ; [1, 2, 3]</span>
<span class="line"></span>
<span class="line">; InsertAt 可以插入多个</span>
<span class="line">arr := [1, 5]</span>
<span class="line">arr.InsertAt(2, 2, 3, 4)  ; [1, 2, 3, 4, 5]</span>
<span class="line"></span></code></pre></div><h3 id="长度与遍历" tabindex="-1"><a class="header-anchor" href="#长度与遍历"><span>长度与遍历</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">arr := [10, 20, 30, 40, 50]</span>
<span class="line"></span>
<span class="line">MsgBox arr.Length      ; 5</span>
<span class="line"></span>
<span class="line">MsgBox arr.MaxIndex()  ; 5（最大索引）</span>
<span class="line"></span>
<span class="line">; 用 for 遍历</span>
<span class="line">for index, value in arr {</span>
<span class="line">    MsgBox index &quot;: &quot; value</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 用 Loop 遍历</span>
<span class="line">Loop arr.Length {</span>
<span class="line">    MsgBox A_Index &quot;: &quot; arr[A_Index]</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数组常用操作" tabindex="-1"><a class="header-anchor" href="#数组常用操作"><span>数组常用操作</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 查找元素</span>
<span class="line">arr := [10, 20, 30]</span>
<span class="line">pos := arr.IndexOf(20)       ; 2（第2个位置）</span>
<span class="line">pos := arr.IndexOf(99)       ; 0（不存在）</span>
<span class="line"></span>
<span class="line">; 包含判断</span>
<span class="line">if arr.IndexOf(20)</span>
<span class="line">    MsgBox &quot;包含 20&quot;</span>
<span class="line"></span>
<span class="line">; 判断是否为空</span>
<span class="line">if arr.Length = 0</span>
<span class="line">    MsgBox &quot;空数组&quot;</span>
<span class="line"></span>
<span class="line">; 排序</span>
<span class="line">arr := [30, 10, 20]</span>
<span class="line">arr.Sort()                   ; [10, 20, 30]</span>
<span class="line"></span>
<span class="line">; 自定义排序</span>
<span class="line">arr.Sort((a, b) =&gt; a &gt; b)   ; 降序 [30, 20, 10]</span>
<span class="line"></span>
<span class="line">; 反转</span>
<span class="line">arr.Reverse()               ; [10, 20, 30] → [30, 20, 10]</span>
<span class="line"></span>
<span class="line">; 拷贝（浅拷贝）</span>
<span class="line">arr2 := arr.Clone()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="map-映射-字典" tabindex="-1"><a class="header-anchor" href="#map-映射-字典"><span>Map（映射/字典）</span></a></h2><h3 id="创建-map" tabindex="-1"><a class="header-anchor" href="#创建-map"><span>创建 Map</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 用 Map() 创建</span>
<span class="line">m := Map(&quot;name&quot;, &quot;AHK&quot;, &quot;version&quot;, 2, &quot;type&quot;, &quot;脚本&quot;)</span>
<span class="line"></span>
<span class="line">; 空 Map</span>
<span class="line">m := Map()</span>
<span class="line"></span>
<span class="line">; 添加键值对</span>
<span class="line">m[&quot;author&quot;] := &quot;Chris&quot;</span>
<span class="line">m[&quot;year&quot;] := 2024</span>
<span class="line"></span></code></pre></div><h3 id="访问与修改-1" tabindex="-1"><a class="header-anchor" href="#访问与修改-1"><span>访问与修改</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">m := Map(&quot;name&quot;, &quot;AHK&quot;, &quot;version&quot;, 2)</span>
<span class="line"></span>
<span class="line">MsgBox m[&quot;name&quot;]          ; &quot;AHK&quot;</span>
<span class="line">MsgBox m[&quot;version&quot;]       ; 2</span>
<span class="line"></span>
<span class="line">; 修改</span>
<span class="line">m[&quot;version&quot;] := 2.1</span>
<span class="line"></span>
<span class="line">; 访问不存在的键会报错！</span>
<span class="line">; MsgBox m[&quot;notexist&quot;]     ; Error!</span>
<span class="line"></span>
<span class="line">; 安全访问：Has 先判断</span>
<span class="line">if m.Has(&quot;notexist&quot;)</span>
<span class="line">    MsgBox m[&quot;notexist&quot;]</span>
<span class="line">else</span>
<span class="line">    MsgBox &quot;键不存在&quot;</span>
<span class="line"></span>
<span class="line">; Get 方式（可设默认值）</span>
<span class="line">MsgBox m.Get(&quot;notexist&quot;, &quot;默认值&quot;)  ; &quot;默认值&quot; — 键不存在时返回默认值</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除键" tabindex="-1"><a class="header-anchor" href="#删除键"><span>删除键</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">m := Map(&quot;a&quot;, 1, &quot;b&quot;, 2, &quot;c&quot;, 3)</span>
<span class="line"></span>
<span class="line">; Delete — 删除指定键</span>
<span class="line">m.Delete(&quot;b&quot;)</span>
<span class="line"></span>
<span class="line">; Clear — 清空</span>
<span class="line">m.Clear()</span>
<span class="line"></span>
<span class="line">; Count — 键数量</span>
<span class="line">MsgBox m.Count            ; 0（已清空）</span>
<span class="line"></span></code></pre></div><h3 id="遍历-map" tabindex="-1"><a class="header-anchor" href="#遍历-map"><span>遍历 Map</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">m := Map(&quot;name&quot;, &quot;AHK&quot;, &quot;version&quot;, 2, &quot;type&quot;, &quot;脚本&quot;)</span>
<span class="line"></span>
<span class="line">for key, value in m {</span>
<span class="line">    MsgBox key &quot;: &quot; value</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><blockquote><p>Map 遍历顺序是<strong>插入顺序</strong>（AHK v2）。</p></blockquote><h3 id="map-的键类型" tabindex="-1"><a class="header-anchor" href="#map-的键类型"><span>Map 的键类型</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Map 可以用不同类型的键</span>
<span class="line">m := Map()</span>
<span class="line">m[&quot;stringKey&quot;] := 1       ; 字符串键</span>
<span class="line">m[42] := &quot;数字键&quot;          ; 数字键</span>
<span class="line">m[true] := &quot;布尔键&quot;        ; 布尔键</span>
<span class="line"></span>
<span class="line">; 区分大小写！</span>
<span class="line">m[&quot;abc&quot;] := 1</span>
<span class="line">m[&quot;ABC&quot;] := 2</span>
<span class="line">MsgBox m[&quot;abc&quot;]           ; 1</span>
<span class="line">MsgBox m[&quot;ABC&quot;]           ; 2（不同的键）</span>
<span class="line"></span></code></pre></div><h2 id="object-对象" tabindex="-1"><a class="header-anchor" href="#object-对象"><span>Object（对象）</span></a></h2><p>AHK v2 的 Object 可以定义属性和方法：</p><h3 id="基本对象" tabindex="-1"><a class="header-anchor" href="#基本对象"><span>基本对象</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 创建对象</span>
<span class="line">obj := Object()</span>
<span class="line">obj.name := &quot;AHK&quot;</span>
<span class="line">obj.version := 2</span>
<span class="line">obj.greet := GreetMethod   ; 引用函数</span>
<span class="line"></span>
<span class="line">GreetMethod() {</span>
<span class="line">    MsgBox &quot;Hello from &quot; this.name   ; this 指向调用对象</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">obj.greet()               ; &quot;Hello from AHK&quot;</span>
<span class="line"></span></code></pre></div><h3 id="用类定义对象" tabindex="-1"><a class="header-anchor" href="#用类定义对象"><span>用类定义对象</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 定义类</span>
<span class="line">class Animal {</span>
<span class="line">    name := &quot;&quot;</span>
<span class="line">    age := 0</span>
<span class="line"></span>
<span class="line">    __New(name, age) {          ; 构造函数</span>
<span class="line">        this.name := name</span>
<span class="line">        this.age := age</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    Speak() {</span>
<span class="line">        MsgBox this.name &quot; says: ...&quot;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    Info() {</span>
<span class="line">        return this.name &quot; (age: &quot; this.age &quot;)&quot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 创建实例</span>
<span class="line">dog := Animal(&quot;Buddy&quot;, 3)</span>
<span class="line">dog.Speak()                   ; &quot;Buddy says: ...&quot;</span>
<span class="line">MsgBox dog.Info()             ; &quot;Buddy (age: 3)&quot;</span>
<span class="line"></span>
<span class="line">; 继承</span>
<span class="line">class Dog extends Animal {</span>
<span class="line">    breed := &quot;&quot;</span>
<span class="line"></span>
<span class="line">    __New(name, age, breed) {</span>
<span class="line">        super.__New(name, age)    ; 调用父类构造函数</span>
<span class="line">        this.breed := breed</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    Speak() {</span>
<span class="line">        MsgBox this.name &quot; says: Woof!&quot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">myDog := Dog(&quot;Max&quot;, 5, &quot;Golden&quot;)</span>
<span class="line">myDog.Speak()                ; &quot;Max says: Woof!&quot;</span>
<span class="line">MsgBox myDog.breed           ; &quot;Golden&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类的属性和方法" tabindex="-1"><a class="header-anchor" href="#类的属性和方法"><span>类的属性和方法</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">class Rectangle {</span>
<span class="line">    width := 0</span>
<span class="line">    height := 0</span>
<span class="line"></span>
<span class="line">    __New(w, h) {</span>
<span class="line">        this.width := w</span>
<span class="line">        this.height := h</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    ; 计算属性</span>
<span class="line">    Area {</span>
<span class="line">        get =&gt; this.width * this.height</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    ; 方法</span>
<span class="line">    Scale(factor) {</span>
<span class="line">        this.width *= factor</span>
<span class="line">        this.height *= factor</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    ToString() {</span>
<span class="line">        return &quot;Rectangle(&quot; this.width &quot; x &quot; this.height &quot;)&quot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">rect := Rectangle(10, 5)</span>
<span class="line">MsgBox rect.Area             ; 50</span>
<span class="line">rect.Scale(2)</span>
<span class="line">MsgBox rect.Area             ; 200</span>
<span class="line">MsgBox rect.ToString()       ; &quot;Rectangle(20 x 10)&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="嵌套结构" tabindex="-1"><a class="header-anchor" href="#嵌套结构"><span>嵌套结构</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 数组嵌套数组（二维结构）</span>
<span class="line">matrix := [</span>
<span class="line">    [1, 2, 3],</span>
<span class="line">    [4, 5, 6],</span>
<span class="line">    [7, 8, 9]</span>
<span class="line">]</span>
<span class="line"></span>
<span class="line">MsgBox matrix[2][3]          ; 6（第2行第3列）</span>
<span class="line"></span>
<span class="line">; Map 嵌套</span>
<span class="line">config := Map(</span>
<span class="line">    &quot;window&quot;, Map(&quot;width&quot;, 800, &quot;height&quot;, 600),</span>
<span class="line">    &quot;colors&quot;, Map(&quot;bg&quot;, &quot;#fff&quot;, &quot;fg&quot;, &quot;#000&quot;)</span>
<span class="line">)</span>
<span class="line"></span>
<span class="line">MsgBox config[&quot;window&quot;][&quot;width&quot;]   ; 800</span>
<span class="line"></span>
<span class="line">; 对象嵌套数组</span>
<span class="line">class Student {</span>
<span class="line">    name := &quot;&quot;</span>
<span class="line">    scores := []</span>
<span class="line"></span>
<span class="line">    __New(name, scores*) {</span>
<span class="line">        this.name := name</span>
<span class="line">        this.scores := scores</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    Average() {</span>
<span class="line">        total := 0</span>
<span class="line">        for i, s in this.scores</span>
<span class="line">            total += s</span>
<span class="line">        return total / this.scores.Length</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">stu := Student(&quot;Alice&quot;, 85, 90, 78, 92)</span>
<span class="line">MsgBox stu.name              ; &quot;Alice&quot;</span>
<span class="line">MsgBox stu.Average()         ; 86.25</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组常用函数模式" tabindex="-1"><a class="header-anchor" href="#数组常用函数模式"><span>数组常用函数模式</span></a></h2><h3 id="过滤" tabindex="-1"><a class="header-anchor" href="#过滤"><span>过滤</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">Filter(arr, predicate) {</span>
<span class="line">    result := []</span>
<span class="line">    for i, v in arr {</span>
<span class="line">        if predicate(v)</span>
<span class="line">            result.Push(v)</span>
<span class="line">    }</span>
<span class="line">    return result</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">arr := [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span>
<span class="line">evens := Filter(arr, (n) =&gt; Mod(n, 2) = 0)</span>
<span class="line">MsgBox evesn[1]  ; 2</span>
<span class="line">MsgBox evens[2]  ; 4</span>
<span class="line"></span></code></pre></div><h3 id="映射" tabindex="-1"><a class="header-anchor" href="#映射"><span>映射</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">MapArray(arr, func) {</span>
<span class="line">    result := []</span>
<span class="line">    for i, v in arr {</span>
<span class="line">        result.Push(func(v))</span>
<span class="line">    }</span>
<span class="line">    return result</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">arr := [1, 2, 3, 4]</span>
<span class="line">doubled := MapArray(arr, (n) =&gt; n * 2)</span>
<span class="line">; doubled = [2, 4, 6, 8]</span>
<span class="line"></span></code></pre></div><h3 id="查找" tabindex="-1"><a class="header-anchor" href="#查找"><span>查找</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">arr := [10, 20, 30, 40, 50]</span>
<span class="line"></span>
<span class="line">; 查找满足条件的元素</span>
<span class="line">FindItem(arr, predicate) {</span>
<span class="line">    for i, v in arr {</span>
<span class="line">        if predicate(v)</span>
<span class="line">            return v</span>
<span class="line">    }</span>
<span class="line">    return &quot;&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MsgBox FindItem(arr, (n) =&gt; n &gt; 25)   ; 30</span>
<span class="line"></span>
<span class="line">; IndexOf 查找具体值</span>
<span class="line">MsgBox arr.IndexOf(30)                  ; 3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="求和" tabindex="-1"><a class="header-anchor" href="#求和"><span>求和</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">Sum(arr) {</span>
<span class="line">    total := 0</span>
<span class="line">    for i, v in arr</span>
<span class="line">        total += v</span>
<span class="line">    return total</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MsgBox Sum([1, 2, 3, 4, 5])     ; 15</span>
<span class="line"></span></code></pre></div><hr>`,47),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/09-hotkeys.html`},{default:r(()=>[...l[0]||=[e(`09-键盘热键`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};