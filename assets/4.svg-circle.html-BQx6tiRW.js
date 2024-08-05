import{_ as r,r as e,c,b as n,a as t,d as a,o as i}from"./app-CbULZrmi.js";const u={},l=t("h1",{id:"使用代码实现svg",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#使用代码实现svg"},[t("span",null,"使用代码实现svg")])],-1),g=t("p",null,"下面是一个例子",-1),d=a(`<pre><code class="language-vue">&lt;template&gt;
  &lt;div class=&quot;box&quot;&gt;
    &lt;div ref=&quot;svgRef&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script setup&gt;
import { ref, onMounted } from &quot;vue&quot;;

let svgRef = ref();

onMounted(() =&gt; {
  const svg1 = document.createElementNS(&quot;http://www.w3.org/2000/svg&quot;, &quot;svg&quot;);

  // set width and height
  svg1.setAttribute(&quot;width&quot;, &quot;100&quot;);
  svg1.setAttribute(&quot;height&quot;, &quot;100&quot;);

  // create a circle
  const cir1 = document.createElementNS(&quot;http://www.w3.org/2000/svg&quot;, &quot;circle&quot;);
  cir1.setAttribute(&quot;cx&quot;, &quot;80&quot;);
  cir1.setAttribute(&quot;cy&quot;, &quot;80&quot;);
  cir1.setAttribute(&quot;r&quot;, &quot;30&quot;);
  cir1.setAttribute(&quot;fill&quot;, &quot;red&quot;);

  // attach it to the container
  svg1.appendChild(cir1);
  console.log(svgRef);
  svgRef.value.appendChild(svg1);
});
&lt;/script&gt;
&lt;style&gt;
.box span {
  color: red;
}
&lt;/style&gt;
</code></pre><h2 id="创建-svg-元素" tabindex="-1"><a class="header-anchor" href="#创建-svg-元素"><span>创建 SVG 元素</span></a></h2><p>首先，需要创建一个 SVG 元素。</p><pre><code class="language-js">const svg1 = document.createElementNS(&quot;http://www.w3.org/2000/svg&quot;, &quot;svg&quot;);
svg1. setAttribute (&quot;width&quot;, &quot;100&quot; );
svg1. setAttribute (&quot;height&quot;, &quot;100&quot; );
</code></pre><p>下面是 viewBox 的一个例子:</p><pre><code class="language-js">const svg1 = document.createElementNS(&quot;http://www.w3.org/2000/svg&quot;, &quot;svg&quot;);
svg1. setAttribute (&quot;viewBox&quot;, &quot;0 0 300 300&quot; );
</code></pre><h2 id="创建-svg-形状" tabindex="-1"><a class="header-anchor" href="#创建-svg-形状"><span>创建 SVG 形状</span></a></h2><p>任何 SVG 元素都是这样创建的:</p><pre><code class="language-js">const cir1 = document.createElementNS(&quot;http://www.w3.org/2000/svg&quot;, &quot;circle&quot;);
cir1.setAttribute(&quot;cx&quot;, 0 );
cir1.setAttribute(&quot;cy&quot;, 0 );
cir1.setAttribute(&quot;r&quot;, 50);
</code></pre><p>要创建其他形状，代码类似。创建 shape 标记，然后设置其属性。</p><p>创建一个形状之后，需要将其附加到 SVG 元素上:</p><pre><code class="language-js">// create svg element
const svg1 = document.createElementNS(&quot;http://www.w3.org/2000/svg&quot;, &quot;svg&quot;);
svg1. setAttribute (&quot;width&quot;, &quot;100&quot; );
svg1. setAttribute (&quot;height&quot;, &quot;100&quot; );

// create a shape
const cir1 = document.createElementNS(&quot;http://www.w3.org/2000/svg&quot;, &quot;circle&quot;);
cir1.setAttribute(&quot;cx&quot;, 0 );
cir1.setAttribute(&quot;cy&quot;, 0 );
cir1.setAttribute(&quot;r&quot;, 50);

// attach the shape to svg
svg1 . appendChild ( cir1 );

// attach the svg to a element on page
document.getElementById (&#39;x77738&#39;). appendChild ( svg1 );
</code></pre><h2 id="将-svg-元素附加到网页" tabindex="-1"><a class="header-anchor" href="#将-svg-元素附加到网页"><span>将 SVG 元素附加到网页</span></a></h2><p>您需要将 SVG 元素附加到网页上的一个元素上。</p><pre><code class="language-js">const svg1 = document.createElementNS(&quot;http://www.w3.org/2000/svg&quot;, &quot;svg&quot;);

// code for adding shapes ...

// attach the svg to a element on the web page
const e1 = document.getElementById (&#39;x43865&#39;);
e1 . appendChild ( svg1 );
</code></pre><p>这件事应该最后再做。</p><h2 id="如何编写-svg-脚本" tabindex="-1"><a class="header-anchor" href="#如何编写-svg-脚本"><span>如何编写 SVG 脚本？</span></a></h2><p>记住 SVG 只是 XML。(XML 类似于 HTML，但语法更加严格)所以，要编写 SVG 脚本，您不必做任何特殊的事情。只需要使用 JavaScript 编写普通的 XML 脚本。</p><p>以下是你需要做的。</p><ol><li>使用“ createElementNS”创建一个 SVG 元素</li><li>使用“ createElementNS”创建 SVG 形状元素(例如，circle、 rect、 path、 ... ...)</li><li>将 shape 元素附加到 SVG 元素</li><li>将 SVG 元素附加到文档中</li></ol><h2 id="创建一个圆" tabindex="-1"><a class="header-anchor" href="#创建一个圆"><span>创建一个圆</span></a></h2>`,21),p=t("pre",null,[t("code",{class:"language-vue"},`<template>
  <div ref="circle"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
let circle = ref();
onMounted(() => {
  const cos = Math.cos;
  const sin = Math.sin;
  const π = Math.PI;

  const f_matrix_times = ([[a, b], [c, d]], [x, y]) => [
    a * x + b * y,
    c * x + d * y,
  ];
  const f_rotate_matrix = (x) => [
    [cos(x), -sin(x)],
    [sin(x), cos(x)],
  ];
  const f_vec_add = ([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2];

  const f_svg_ellipse_arc = ([cx, cy], [rx, ry], [t1, Δ], φ) => {
    Δ = Δ % (2 * π);
    const rotMatrix = f_rotate_matrix(φ);
    const [sX, sY] = f_vec_add(
      f_matrix_times(rotMatrix, [rx * cos(t1), ry * sin(t1)]),
      [cx, cy]
    );
    const [eX, eY] = f_vec_add(
      f_matrix_times(rotMatrix, [rx * cos(t1 + Δ), ry * sin(t1 + Δ)]),
      [cx, cy]
    );
    const fA = Δ > π ? 1 : 0;
    const fS = Δ > 0 ? 1 : 0;
    // 命名空间
    var SVG_NS = "http://www.w3.org/2000/svg";
    var svgArea = document.getElementById("circle");

    // 1、创建svg容器
    var svg = document.createElementNS(SVG_NS, "svg");

    // 2、创建svg中的 tag, 如rect

    const path_2wk2r = document.createElementNS(SVG_NS, "path");
    path_2wk2r.setAttribute(
      "d",
      "M " +
        sX +
        " " +
        sY +
        " A " +
        [rx, ry, (φ / (2 * π)) * 360, fA, fS, eX, eY].join(" ")
    );

    // 4、将tag塞进svg中
    svg.appendChild(path_2wk2r);
    // 5、将svg塞进指定容器

    return svg;
  };
  let svgDom = f_svg_ellipse_arc([100, 100], [30, 30], [5, 5], 5);

  circle.value.appendChild(svgDom);
});
<\/script>
`)],-1);function v(h,q){const o=e("create-svg"),s=e("svg-list");return i(),c("div",null,[l,g,n(o),d,n(s),p])}const _=r(u,[["render",v],["__file","4.svg-circle.html.vue"]]),w=JSON.parse('{"path":"/frontend/drawing/4.svg-circle.html","title":"使用代码实现svg","lang":"zh-CN","frontmatter":{"order":4,"description":"使用代码实现svg 下面是一个例子","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/drawing/4.svg-circle.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"使用代码实现svg"}],["meta",{"property":"og:description","content":"使用代码实现svg 下面是一个例子"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T16:22:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-26T16:22:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用代码实现svg\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-26T16:22:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"创建 SVG 元素","slug":"创建-svg-元素","link":"#创建-svg-元素","children":[]},{"level":2,"title":"创建 SVG 形状","slug":"创建-svg-形状","link":"#创建-svg-形状","children":[]},{"level":2,"title":"将 SVG 元素附加到网页","slug":"将-svg-元素附加到网页","link":"#将-svg-元素附加到网页","children":[]},{"level":2,"title":"如何编写 SVG 脚本？","slug":"如何编写-svg-脚本","link":"#如何编写-svg-脚本","children":[]},{"level":2,"title":"创建一个圆","slug":"创建一个圆","link":"#创建一个圆","children":[]}],"git":{"createdTime":1649482247000,"updatedTime":1653582152000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.37,"words":412},"filePathRelative":"frontend/drawing/4.svg-circle.md","localizedDate":"2022年4月9日","autoDesc":true}');export{_ as comp,w as data};
