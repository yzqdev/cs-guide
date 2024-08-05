import{_ as t,c as o,o as e,d as u}from"./app-CbULZrmi.js";const l={},n=u(`<h1 id="坐标转换" tabindex="-1"><a class="header-anchor" href="#坐标转换"><span>坐标转换</span></a></h1><p>转换属性对一个形状执行几何变换操作，语法如下:</p><p>Transform = “ function1(...) function2(...) ...”</p><p>默认情况下，SVG 提供以下转换函数:</p><ul><li><code>translate</code></li><li><code>scale</code></li><li><code>reflect</code></li><li><code>rotate</code></li><li>还有更多</li></ul><p>下面是一些例子。</p><h2 id="翻译" tabindex="-1"><a class="header-anchor" href="#翻译"><span>翻译</span></a></h2><ul><li><p><code>transform=&quot;translate(x y)&quot;</code></p><p>快走 右边的单位 机组故障</p></li></ul><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;

&lt;rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:gray&quot;
/&gt;

&lt;rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:blue;&quot;
 transform=&quot;translate(20 40)&quot;/&gt;

&lt;/svg&gt;
</code></pre><h2 id="比例" tabindex="-1"><a class="header-anchor" href="#比例"><span>比例</span></a></h2><ul><li><p><code>transform=&quot;scale(s)&quot;</code></p><p>按系数均匀地比例 ，关于起源</p></li><li><p><code>transform=&quot;scale(s1, s2)&quot;</code></p><p>X 比例因子 ，y 量表的倍数s2.</p></li></ul><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;

&lt;circle cx=&quot;0&quot; cy=&quot;0&quot; r=&quot;10&quot; style=&quot;fill:none; stroke:gray&quot; /&gt;

&lt;circle cx=&quot;0&quot; cy=&quot;0&quot; r=&quot;10&quot; style=&quot;fill:none; stroke:blue&quot; transform=&quot;scale(2)&quot; /&gt;

&lt;/svg&gt;
</code></pre><p>这是另一个例子。注意，我们以一个以{10,10}为中心的圆开始。缩放后，它的中心发生了变化。因为转换是针对{0,0}完成的。也就是说，任何点{ x，y }变成{ x <em>s，y</em> s }。</p><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;

&lt;circle cx=&quot;10&quot; cy=&quot;10&quot; r=&quot;10&quot; style=&quot;fill:none; stroke:gray&quot; /&gt;

&lt;circle cx=&quot;10&quot; cy=&quot;10&quot; r=&quot;10&quot; style=&quot;fill:none; stroke:blue&quot; transform=&quot;scale(2)&quot; /&gt;

&lt;/svg&gt;
</code></pre><p>您可以通过 transform = “ scale (s1，s2)”来分别缩放 x 和 y 坐标。</p><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;

&lt;circle cx=&quot;10&quot; cy=&quot;10&quot; r=&quot;10&quot; style=&quot;fill:none; stroke:gray&quot; /&gt;

&lt;circle cx=&quot;10&quot; cy=&quot;10&quot; r=&quot;10&quot; style=&quot;fill:none; stroke:blue&quot; transform=&quot;scale(2, 3)&quot; /&gt;

&lt;/svg&gt;
</code></pre><h2 id="围绕原点旋转" tabindex="-1"><a class="header-anchor" href="#围绕原点旋转"><span>围绕原点旋转</span></a></h2><ul><li><p><code>transform=&quot;rotate(α)&quot;</code></p><p>旋转 原点周围度，正数 是顺时针方向</p></li></ul><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;

&lt;rect x=&quot;50&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:none; stroke:gray;&quot;
/&gt;

&lt;rect x=&quot;50&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:blue;&quot;
 transform=&quot;rotate(30)&quot;/&gt;

&lt;rect x=&quot;50&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:red;&quot;
 transform=&quot;rotate(60)&quot;/&gt;

&lt;/svg&gt;
</code></pre><h2 id="围绕一个点旋转" tabindex="-1"><a class="header-anchor" href="#围绕一个点旋转"><span>围绕一个点旋转</span></a></h2><ul><li><p><code>transform=&quot;rotate(α x y)&quot;</code></p><p>旋转 度，大约点{x, 肯定的 是顺时针方向</p></li></ul><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;

&lt;rect x=&quot;50&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:none; stroke:gray;&quot;
/&gt;

&lt;rect x=&quot;50&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:blue;&quot;
 transform=&quot;rotate(30 50 0)&quot;/&gt;

&lt;rect x=&quot;50&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:red;&quot;
 transform=&quot;rotate(60 50 0)&quot;/&gt;

&lt;/svg&gt;
</code></pre><h2 id="斜-x" tabindex="-1"><a class="header-anchor" href="#斜-x"><span>斜 x</span></a></h2><ul><li><p><code>transform=&quot;skewX(α)&quot;</code></p><p>斜 x 坐标由 度</p></li></ul><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;

&lt;rect x=&quot;10&quot; y=&quot;10&quot; width=&quot;30&quot; height=&quot;30&quot;
 style=&quot;fill:none; stroke:gray;&quot;
/&gt;

&lt;rect x=&quot;10&quot; y=&quot;10&quot; width=&quot;30&quot; height=&quot;30&quot;
 style=&quot;fill:none; stroke:blue;&quot;
 transform=&quot;skewX(20)&quot;
/&gt;

&lt;/svg&gt;
</code></pre><h2 id="斜-y" tabindex="-1"><a class="header-anchor" href="#斜-y"><span>斜 y</span></a></h2><ul><li><p><code>transform=&quot;skewY(α)&quot;</code></p><p>斜 y 坐标由 度</p></li></ul><p>这是一个正方形和螺旋形的结果。</p><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;

&lt;rect x=&quot;10&quot; y=&quot;10&quot; width=&quot;30&quot; height=&quot;30&quot;
 style=&quot;fill:none; stroke:gray;&quot;
/&gt;

&lt;rect x=&quot;10&quot; y=&quot;10&quot; width=&quot;30&quot; height=&quot;30&quot;
 style=&quot;fill:none; stroke:blue;&quot;
 transform=&quot;skewY(20)&quot;/&gt;

&lt;/svg&gt;
</code></pre><h2 id="结合变换" tabindex="-1"><a class="header-anchor" href="#结合变换"><span>结合变换</span></a></h2><p>多重变换可以组合起来，像这样:</p><p>变换 =”... f3 f2 f1”</p><p>注意: 首先使用最右边的函数执行转换。(与群论或线性代数矩阵乘法中的约定相同)</p><p>这是一个长方形。</p><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;
&lt;rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot; /&gt;
&lt;/svg&gt;
</code></pre><p>这是一个矩形，经过平移然后旋转(按照这个顺序)。</p><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;
&lt;rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:blue;&quot;
 transform=&quot;rotate(30) translate(40 0)&quot; /&gt;
&lt;/svg&gt;
</code></pre><p>这是一个矩形，旋转然后平移(按这个顺序)。</p><pre><code class="language-html">&lt;svg width=&quot;100&quot; height=&quot;100&quot;&gt;
&lt;rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;10&quot; height=&quot;20&quot;
 style=&quot;fill:red;&quot;
 transform=&quot;translate(40 0) rotate(30)&quot; /&gt;
&lt;/svg&gt;
</code></pre>`,39),q=[n];function r(a,s){return e(),o("div",null,q)}const c=t(l,[["render",r],["__file","svg-transform.html.vue"]]),h=JSON.parse('{"path":"/frontend/drawing/svg-transform.html","title":"坐标转换","lang":"zh-CN","frontmatter":{"order":4,"description":"坐标转换 转换属性对一个形状执行几何变换操作，语法如下: Transform = “ function1(...) function2(...) ...” 默认情况下，SVG 提供以下转换函数: translate scale reflect rotate 还有更多 下面是一些例子。 翻译 transform=\\"translate(x y)\\" 快走 右...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/drawing/svg-transform.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"坐标转换"}],["meta",{"property":"og:description","content":"坐标转换 转换属性对一个形状执行几何变换操作，语法如下: Transform = “ function1(...) function2(...) ...” 默认情况下，SVG 提供以下转换函数: translate scale reflect rotate 还有更多 下面是一些例子。 翻译 transform=\\"translate(x y)\\" 快走 右..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T16:22:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-26T16:22:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"坐标转换\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-26T16:22:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"翻译","slug":"翻译","link":"#翻译","children":[]},{"level":2,"title":"比例","slug":"比例","link":"#比例","children":[]},{"level":2,"title":"围绕原点旋转","slug":"围绕原点旋转","link":"#围绕原点旋转","children":[]},{"level":2,"title":"围绕一个点旋转","slug":"围绕一个点旋转","link":"#围绕一个点旋转","children":[]},{"level":2,"title":"斜 x","slug":"斜-x","link":"#斜-x","children":[]},{"level":2,"title":"斜 y","slug":"斜-y","link":"#斜-y","children":[]},{"level":2,"title":"结合变换","slug":"结合变换","link":"#结合变换","children":[]}],"git":{"createdTime":1649487947000,"updatedTime":1653582152000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":2.62,"words":786},"filePathRelative":"frontend/drawing/svg-transform.md","localizedDate":"2022年4月9日","autoDesc":true}');export{c as comp,h as data};
