import{_ as a,r as s,c as d,b as l,w as t,d as o,a as e,o as c}from"./app-CbULZrmi.js";const r={},i=o('<h1 id="css选择器" tabindex="-1"><a class="header-anchor" href="#css选择器"><span>css选择器</span></a></h1><h2 id="元素选择器" tabindex="-1"><a class="header-anchor" href="#元素选择器"><span>元素选择器</span></a></h2><p><a href="https://developer.mozilla.org/en-US/docs/Learn/CSS" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/en-US/docs/Learn/CSS</a> css properties <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/en-US/docs/Web/CSS</a></p>',3),p=e("pre",null,[e("code",{class:"language-html"},`<span>这里是由 span 包裹的一些文字.</span>
<p>这里是由 p 包裹的一些文字.</p>
`)],-1),u=e("pre",null,[e("code",{class:"language-css"},`span {
  background-color: red;
  color: #ffffff;
}
 
`)],-1),h=e("h2",{id:"类选择器",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#类选择器"},[e("span",null,"类选择器")])],-1),g=e("p",null,"注意它和属性选择器这样的写法等价",-1),m=e("pre",null,[e("code",{class:"language-text"},`[class~=类名] {样式声明 }
`)],-1),_=e("pre",null,[e("code",{class:"language-html"},`  <span class="classy">Here's a span with some text.</span>
  <span>Here's another.</span>
`)],-1),y=e("pre",null,[e("code",{class:"language-css"},`span.classy {
  background-color: DodgerBlue;
}
`)],-1),f=e("h2",{id:"id选择器",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#id选择器"},[e("span",null,"id选择器")])],-1),v=e("p",null,"注意它和属性选择器这样的写法等价",-1),b=e("pre",null,[e("code",{class:"language-text"},`[id=id 属性值] {样式声明 }
`)],-1),k=e("pre",null,[e("code",{class:"language-css"},`span#identified {
  background-color: DodgerBlue;
}
`)],-1),S=e("pre",null,[e("code",{class:"language-html"},`  <span id="identified">Here's a span with some text.</span>
  <span>Here's another.</span>
`)],-1),x=o(`<h2 id="属性选择器" tabindex="-1"><a class="header-anchor" href="#属性选择器"><span>属性选择器</span></a></h2><pre><code class="language-css">/* 存在 title 属性的&lt;a&gt; 元素 */
a[title] {
  color: purple;
}

/* 存在 href 属性并且属性值匹配&quot;https://example.org&quot;的&lt;a&gt; 元素 */
a[href=&quot;https://example.org&quot;] {
  color: green;
}

/* 存在 href 属性并且属性值包含&quot;example&quot;的&lt;a&gt; 元素 */
a[href*=&quot;example&quot;] {
  font-size: 2em;
}

/* 存在 href 属性并且属性值结尾是&quot;.org&quot;的&lt;a&gt; 元素 */
a[href$=&quot;.org&quot;] {
  font-style: italic;
}

/* 存在 class 属性并且属性值包含以空格分隔的&quot;logo&quot;的&lt;a&gt;元素 */
a[class~=&quot;logo&quot;] {
  padding: 2px;
}

</code></pre><pre><code>[attr]
</code></pre><p>表示带有以 attr 命名的属性的元素。</p><pre><code>[attr=value]
</code></pre><p>表示带有以 attr 命名的属性，且属性值为 value 的元素。</p><pre><code>[attr~=value]
</code></pre><p>表示带有以 attr 命名的属性的元素，并且该属性是一个以空格作为分隔的值列表，其中至少有一个值为 value。</p><pre><code>[attr|=value]
</code></pre><p>表示带有以 attr 命名的属性的元素，属性值为“value”或是以“value-”为前缀（&quot;<code>-</code>&quot;为连字符，Unicode 编码为 U+002D）开头。典型的应用场景是用来匹配语言简写代码（如 zh-CN，zh-TW 可以用 zh 作为 value）。</p><pre><code>[attr^=value]
</code></pre><p>表示带有以 attr 命名的属性，且属性值是以 value 开头的元素。</p><pre><code>[attr$=value]
</code></pre><p>表示带有以 attr 命名的属性，且属性值是以 value 结尾的元素。</p><pre><code>[attr*=value]
</code></pre><p>表示带有以 attr 命名的属性，且属性值至少包含一个 value 值的元素。</p><pre><code>[*attr* *operator* *value* i]
</code></pre><p>在属性选择器的右方括号前添加一个用空格隔开的字母 <code>i</code>（或 <code>I</code>），可以在匹配属性值时忽略大小写（支持 ASCII 字符范围之内的字母）。</p><p><code>[*attr* *operator* *value* s]</code> Experimental</p><p>在属性选择器的右方括号前添加一个用空格隔开的字母 <code>s</code>（或 <code>S</code>），可以在匹配属性值时区分大小写（支持 ASCII 字符范围之内的字母）</p>`,20),A=e("pre",null,[e("code",{class:"language-css"},`a {
  color: blue;
}

/* 以 "#" 开头的页面本地链接 */
a[href^="#"] {
  background-color: gold;
}

/* 包含 "example" 的链接 */
a[href*="example"] {
  background-color: silver;
}

/* 包含 "insensitive" 的链接，不区分大小写 */
a[href*="insensitive" i] {
  color: cyan;
}

/* 包含 "cAsE" 的链接，区分大小写 */
a[href*="cAsE" s] {
  color: pink;
}

/* 以 ".org" 结尾的链接 */
a[href$=".org"] {
  color: red;
}

/* 列表类型不需要大小写敏感标志，这是由于 HTML 处理 type 属性的一个怪癖。 */
ol[type="a"] {
  list-style-type: lower-alpha;
  background: red;
}

ol[type="a" s] {
  list-style-type: lower-alpha;
  background: lime;
}

ol[type="A" s] {
  list-style-type: upper-alpha;
  background: lime;
}
`)],-1),E=e("pre",null,[e("code",{class:"language-html"},`<ul>
  <li><a href="#internal">Internal link</a></li>
  <li><a href="http://example.com">Example link</a></li>
  <li><a href="#InSensitive">Insensitive internal link</a></li>
  <li><a href="http://example.org">Example org link</a></li>
</ul>

<ol type="A">
  <li>Example list</li>
</ol>
`)],-1),K=e("h2",{id:"选择器列表",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#选择器列表"},[e("span",null,"选择器列表")])],-1),U=e("pre",null,[e("code",{class:"language-css"},`/* 选择所有 <span> 和 <div> 元素 */
span, div {
  border: red 2px solid;
}
`)],-1),q=e("pre",null,[e("code",{class:"language-html"},`<span>这是一个span</span>
<div>这是一个div</div>
`)],-1),C=e("h2",{id:"后代选择器",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#后代选择器"},[e("span",null,"后代选择器")])],-1),T=e("p",null,"后代组合器（通常用单个空格（ ）字符表示）组合了两个选择器，如果第二个选择器匹配的元素具有与第一个选择器匹配的祖先（父母，父母的父母，父母的父母的父母等）元素，则它们将被选择。利用后代组合器的选择器称为后代选择器。",-1),j=e("pre",null,[e("code",{class:"language-css"},`li {
  list-style-type: disc;
}

li li {
  list-style-type: circle;
}
`)],-1),w=e("pre",null,[e("code",{class:"language-html"},`<ul>
  <li>
    <div>Item 1</div>
    <ul>
      <li>Subitem A</li>
      <li>Subitem B</li>
    </ul>
  </li>
  <li>
    <div>Item 2</div>
    <ul>
      <li>Subitem A</li>
      <li>Subitem B</li>
    </ul>
  </li>
</ul>

`)],-1),J=e("h2",{id:"直接子代选择器",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#直接子代选择器"},[e("span",null,"直接子代选择器")])],-1),O=e("p",null,'当使用 > 选择符分隔两个元素时，它只会匹配那些作为第一个元素的直接后代 (子元素) 的第二元素。与之相比，当两个元素由 后代选择器 相连时，它表示匹配存在的所有由第一个元素作为祖先元素 (但不一定是父元素) 的第二个元素，无论它在 DOM 中"跳跃" 多少次。',-1),P=e("pre",null,[e("code",{class:"language-css"},`span { background-color: white; }
div > span {
  background-color: DodgerBlue;
}
`)],-1),L=e("pre",null,[e("code",{class:"language-html"},`<div>
  <span>Span 1. In the div.
    <span>Span 2. In the span that's in the div.</span>
  </span>
</div>
<span>Span 3. Not in a div at all</span>
`)],-1),z=e("h2",{id:"通用兄弟选择器",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#通用兄弟选择器"},[e("span",null,"通用兄弟选择器")])],-1),B=e("p",null,"兄弟选择符，位置无须紧邻，只须同层级，A~B 选择A元素之后所有同层级B元素",-1),F=e("pre",null,[e("code",{class:"language-css"},`p ~ span {
  color: red;
}
`)],-1),W=e("pre",null,[e("code",{class:"language-html"},`<span>This is not red.</span>
<p>Here is a paragraph.</p>
<code>Here is some code.</code>
<span>And here is a span.</span>
`)],-1),H=e("h2",{id:"相邻兄弟选择器",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#相邻兄弟选择器"},[e("span",null,"相邻兄弟选择器")])],-1),V=e("p",null,"相邻兄弟选择器 (+) 介于两个选择器之间，当第二个元素紧跟在第一个元素之后，并且两个元素都是属于同一个父元素的子元素，则第二个元素将被选中",-1),I=e("pre",null,[e("code",{class:"language-css"},`li:first-of-type + li {
  color: red;
}
`)],-1),N=e("pre",null,[e("code",{class:"language-html"},`<ul>
  <li>One</li>
  <li>Two!</li>
  <li>Three</li>
</ul>
`)],-1),Q=e("h2",{id:"列选择器-实验中",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#列选择器-实验中"},[e("span",null,"列选择器(实验中)")])],-1),G=e("p",null,"通过列合并符 (||) 链接两个元素时，它只会匹配被第二个 CSS 选择器匹配的元素，且此元素属于被第一个 CSS 选择器匹配的列元素。",-1),D=e("pre",null,[e("code",{class:"language-css"},`col.selected || td {
  background: gray;
  color: white;
  font-weight: bold;
}
`)],-1),Y=e("pre",null,[e("code",{class:"language-html"},`<table border="1">
  <colgroup>
    <col span="2"/>
    <col class="selected"/>
  </colgroup>
  <tbody>
    <tr>
      <td>A
      <td>B
      <td>C
    </tr>
    <tr>
      <td colspan="2">D</td>
      <td>E</td>
    </tr>
    <tr>
      <td>F</td>
      <td colspan="2">G</td>
    </tr>
  </tbody>
</table>
`)],-1),M=e("h2",{id:"伪类",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#伪类"},[e("span",null,"伪类")])],-1),R=e("p",null,"CSS 伪类 是添加到选择器的关键字，指定要选择的元素的特殊状态。例如，:hover 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色。",-1),Z=e("pre",null,[e("code",{class:"language-css"},`/* 所有用户指针悬停的按钮 */
button:hover {
  color: blue;
  background:red;
}
`)],-1),X=e("pre",null,[e("code",{class:"language-html"},`<button>按钮</button>
`)],-1),$=e("h2",{id:"伪元素",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#伪元素"},[e("span",null,"伪元素")])],-1),ee=e("p",null,"伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。下例中的 ::first-line 伪元素可改变段落首行文字的样式。",-1),ne=e("pre",null,[e("code",{class:"language-css"},`/* 每一个 <p> 元素的第一行。 */
p::first-line {
  color: blue;
  text-transform: uppercase;
}
`)],-1),le=e("pre",null,[e("code",{class:"language-html"},`<p>aaaaaa</p>
<p>bbbbb</p>
<p>aaaaaa</p>
`)],-1);function te(oe,ae){const n=s("CodeDemo");return c(),d("div",null,[i,l(n,{id:"code-demo-9",type:"normal",title:"%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9%E5%99%A8",code:"eJyrVsooyc1RslKyKS5IzLN7sX/my/aeZzPWP5+yUQEkovC0p/XF4p3PZ7U82dHwZNfsZ9Pan66drmejD1Yek2dTgKqnAKeGAqBqJR2l5OJioG1go6tj8hQUkhKTs9OL8kvzUnST83Pyi6wUilJTrEEyUK5yGhgAhWqBokAzagGA2FRA"},{default:t(()=>[p,u]),_:1}),h,g,m,l(n,{id:"code-demo-20",type:"normal",title:"%E7%B1%BB%E9%80%89%E6%8B%A9",code:"eJxFjbEOwjAMRH/F8sICZS+lA2LgI7KE1GoQaYxiV4Cq/jtNqdrJ8t29uwG9dgFLBKjkZSO4YEXOBuf7NVjfKNFOwMJsvx/qQbgjUPpoUR2zWpu44Gs6snpKm497dCLTTv6LfzkMmbtb92wT97E5OA6cSrhy01K6hJ5OJo4TO/4AWXc5Ww=="},{default:t(()=>[_,y]),_:1}),f,v,b,l(n,{id:"code-demo-31",type:"normal",title:"id%E9%80%89%E6%8B%A9%E5%99%A8",code:"eJxFjTsOwjAQRK+yWgoaPn0IKRAFh3Bj7CW2cHaRvRFIUe4OTkHaeTNvJnSlYIPlZXkTPbHGRyQPk2GAu3XPPsvIfu8kSW7gKr6nfEkjnQzPhnGHQYf0EwC01QHRnw2uIoPdjTJtC1hY+DtqgCIDgdJHD+2xpl19W/b/NosGyivH+QvwATsT"},{default:t(()=>[k,S]),_:1}),x,l(n,{id:"code-demo-77",type:"normal",code:"eJyVk9FqE0EUhl9l2HoVTPc+roFeFCzold51FabbMRkymVl2NtVQCqvEWDC2hao1EquV1EoVTEAhNKV9GHd2kytfwdnNOummsbZ3M+z5v//fc86sahbnWk6DYNWkAFiMMCcHlkgF3TDpmklNqmeA398HpjZjakAce6L9I3xXG+79HL7/FLS+iVZnuH0SbOyDjG5SuFh00MMHN+Pq+yPmErRKBYdV6HI2wRcYWT6DF41nYuurdECPYdkmSPpEDpPUjKSqin+yOSYryJlGx5QjyrGLV1IOv48bfu+laByJ9bpoH4jOpqg3J2zTUpyYJ45WFdJpftYcn58wutglEfA03sa0dG4Ws8wpROz+tuicTGvWNckbFaVpDkp1fn1nsPcl7PbF7gvZhGHLG3x+ouIFrzeD2ofg43NxuiPDD06bwdvv4auuf7QBbt27cxuIdi3cqgO3aiMguruBdyCj+D3P7x0G3mHYfPPLexpnYmQxKpKZoApEMHez3K0SlI2+5QBhj5CThcQuQhnx7GxTsVMs1awr0Qguq/Ue4+YuwlVs+xI47bpWdMtEviejQvJRnUFw3oAgGkn0KDB1kUMhMbX8QnKUcloydJg3dFl7XlN0XTun68nmz1qsLMXzo9v/tDML9O54caWlWmPwN8kV7eOVUvbyNqk39PjP5YGReDNGnVXkcXLuKgmLJNraH6np2Sc="},{default:t(()=>[A,E]),_:1}),K,l(n,{id:"code-demo-84",type:"normal",code:"eJyrVkouLlayUtLXUnjZ0Pmse+WzzoZnczoVbIoLEvPsFJ5O6lGwScksA7Jam59vWaCgpR+TB5LSUQCKKlTH5CkoJOUXpaQWWSkUpaYoGBVUKBTn52SmWMfk1cbkKekoZZTk5gDNh5j3Yv/MZzPWP9nR8GTHKpCAjT5YOCYPbAeyLJBvow8SBBpSCwA9RUcO"},{default:t(()=>[U,q]),_:1}),C,T,l(n,{id:"code-demo-94",type:"normal",code:"eJyrVkouLlayUsrJVKiOyVNQyMksLtEtLqnMSdUtqSxItVJIySxOto7Jq43Ji8kDKsKpLjmzKDknFaJSSUcpoyQ3B2isTWmOHUi5TU4mmAayUjLL7DxLUnMVDG30QWyoMFQhmA1UHFyalAlS5GijD9eKKuOEJGOjD7MHJobNQiPaWQjlA71eCwAgCmex"},{default:t(()=>[j,w]),_:1}),J,O,l(n,{id:"code-demo-104",type:"normal",code:"eJxtjbEOgjAURX/lpouLQtQNGgbj4uLiylKhocTaGvrQgfDvtiWiJmwvOfecN7DKOZYx9xAGA66iujWd7U29qay2XYaXaknmGEtTt08UmIalwcL2aOtGdgfdy7w03mBrpuiufZ57uQgSD35xCZFtgpMBKQkPkwD/8G7G8SUpQSuH9mvwNI5j9XPydHr009knOFsKoggaBEFoPRtsfAOaK1Z1"},{default:t(()=>[P,L]),_:1}),z,B,l(n,{id:"code-demo-114",type:"normal",code:"eJxFjTEKwzAMRa8iNJd2T02gWw/Q0YuxRV1IZGFlC+nZK3lIQdN/j6cdsypOKPAFlcSwRwbIbWl9gk7lHvmIjBes27qYF1yaX/WjYMdtc+kabmOOHGR+UidnCST19O5JqnFxmFuhk2tbyR4VMjqACaPy4AL1jPj07+PxA6hbO+I="},{default:t(()=>[F,W]),_:1}),H,V,l(n,{id:"code-demo-124",type:"normal",code:"eJyrVkouLlayUsrJtErLLCou0c1P0y2pLEhV0FbIyVSojslTUEjOz8kvslIoSk2xjsmrjclT0lHKKMnNAWqyKc2xA6mwycm0889LtdEH0jB+SHm+IqpARlEqTImNPlinUi0AYEQpJw=="},{default:t(()=>[I,N]),_:1}),Q,G,l(n,{id:"code-demo-134",type:"normal",code:"eJx1kM2OwjAMhF/F8nl3q91jt1Ti/yVySZPQIkKCEiOEgHfHgRZKBbeZieeTnROqGDFH5e1PNNYoMhrOZyANJ+EAKqk2dfB7p3Oogzz+p5CHfcjh0KzJ3IKVd/R9MOu6oRwqbzWnF+HwCxvaWsYXJCtr+CloE0YCfwWWqVgwKuF3N3f3EHfS8cyfwKwfKytj5Lxbs3sushdIQZXXx65IoVVJ63LcN5O+mbaF7NEYdNPVz83KGU/qF/a8l3zGlIthcQBevsOwaK9ilb6SFV6uAZuGJg=="},{default:t(()=>[D,Y]),_:1}),M,R,l(n,{id:"code-demo-144",type:"normal",code:"eJyrVkouLlayUtLXUnjW2fBsTufzKSuedWx/1tP+clLHs6Y1TxvnPJ/V8qyn8+WkdQpa+jF5SaUlJfl5Vhn5ZalFCtUxeQoKyfk5+UVWCkk5panWIH5SYnJ2elF+aV6KVVFqClCoNiZPSUcpoyQ3B2iRDcQAO4iRNvpQLlBJLQDzYT0P"},{default:t(()=>[Z,X]),_:1}),$,ee,l(n,{id:"code-demo-154",type:"normal",code:"eJyrVkouLlayUtLXUni2vv/JjoYnO1Yp2BTYKTxtbX6+ZcHzWS3P16wBCr9Y2PO4oUlBSz8mr8DKKi2zqLhENyczL1WhOiZPQSE5Pye/yEohKac01RrEL0mtKNEtKUrMK07LL8q1UigtKEgtSk4sBsnWxuQp6ShllOTmAK0F2pQIBjb6BXYxeUBuEgjAeciSSrUAYatEmg=="},{default:t(()=>[ne,le]),_:1})])}const de=a(r,[["render",te],["__file","selector.html.vue"]]),ce=JSON.parse('{"path":"/frontend/basic-css/selector.html","title":"css选择器","lang":"zh-CN","frontmatter":{"description":"css选择器 元素选择器 https://developer.mozilla.org/en-US/docs/Learn/CSS css properties https://developer.mozilla.org/en-US/docs/Web/CSS 类选择器 注意它和属性选择器这样的写法等价 id选择器 注意它和属性选择器这样的写法等价 属性选择...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-css/selector.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"css选择器"}],["meta",{"property":"og:description","content":"css选择器 元素选择器 https://developer.mozilla.org/en-US/docs/Learn/CSS css properties https://developer.mozilla.org/en-US/docs/Web/CSS 类选择器 注意它和属性选择器这样的写法等价 id选择器 注意它和属性选择器这样的写法等价 属性选择..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-28T23:33:53.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-04-28T23:33:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"css选择器\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-28T23:33:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"元素选择器","slug":"元素选择器","link":"#元素选择器","children":[]},{"level":2,"title":"类选择器","slug":"类选择器","link":"#类选择器","children":[]},{"level":2,"title":"id选择器","slug":"id选择器","link":"#id选择器","children":[]},{"level":2,"title":"属性选择器","slug":"属性选择器","link":"#属性选择器","children":[]},{"level":2,"title":"选择器列表","slug":"选择器列表","link":"#选择器列表","children":[]},{"level":2,"title":"后代选择器","slug":"后代选择器","link":"#后代选择器","children":[]},{"level":2,"title":"直接子代选择器","slug":"直接子代选择器","link":"#直接子代选择器","children":[]},{"level":2,"title":"通用兄弟选择器","slug":"通用兄弟选择器","link":"#通用兄弟选择器","children":[]},{"level":2,"title":"相邻兄弟选择器","slug":"相邻兄弟选择器","link":"#相邻兄弟选择器","children":[]},{"level":2,"title":"列选择器(实验中)","slug":"列选择器-实验中","link":"#列选择器-实验中","children":[]},{"level":2,"title":"伪类","slug":"伪类","link":"#伪类","children":[]},{"level":2,"title":"伪元素","slug":"伪元素","link":"#伪元素","children":[]}],"git":{"createdTime":1658156029000,"updatedTime":1682724833000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":5.49,"words":1647},"filePathRelative":"frontend/basic-css/selector.md","localizedDate":"2022年7月18日","autoDesc":true}');export{de as comp,ce as data};
