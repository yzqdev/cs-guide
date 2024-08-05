import{_ as e,c as t,o as s,d as n}from"./app-CbULZrmi.js";const o={},c=n(`<h2 id="scss技巧" tabindex="-1"><a class="header-anchor" href="#scss技巧"><span>scss技巧</span></a></h2><h2 id="嵌套-复用" tabindex="-1"><a class="header-anchor" href="#嵌套-复用"><span>嵌套,复用</span></a></h2><pre><code class="language-scss">//推荐使用 @extend
.button {
  font-size: 14px;
  padding: 10px 20px;
  color: #fff;
}
.button-green {
  @extend .button;
  background: green;
}
.button-red {
  @extend .button;
  background: red;
}


</code></pre><p>使用@extend产生 DRY CSS风格的代码。但是@mixin就不能产生DRY式的代码。</p><p>@extend会增加选择器之间的联系，然后把他们堆在一起。你正在为一些相关的元素设置样式，就拿一组按钮来说，使用@extend让他们共享样式看起来合情合理。但是如果这些被复用的样式片段并不仅仅局限于相关的元素，那么使用@mixin或许更好。</p><p>@mixin主要的优势就是它能够接受参数。如果想传递参数，你会很自然地选择@mixin而不是@extend</p><h2 id="少用-import-而是用-use替换" tabindex="-1"><a class="header-anchor" href="#少用-import-而是用-use替换"><span>少用@import, 而是用@use替换</span></a></h2><pre><code class="language-scss">@import &quot;./mixin.scss&quot;;
@import &quot;./variables.scss&quot;;

</code></pre><p>等价于</p><pre><code class="language-scss">@use &quot;./mixin.scss&quot; as *;
@use &quot;./variables.scss&quot; as *;
</code></pre><p>@forward 指令允许你从另一个样式表中导入变量、混合器和函数，但不导入样式。类似于</p><pre><code class="language-js">export * from &#39;./util.ts&#39;
</code></pre><h2 id="导出scss变量给js使用" tabindex="-1"><a class="header-anchor" href="#导出scss变量给js使用"><span>导出scss变量给js使用</span></a></h2><p><strong>必须是.module.scss文件</strong></p><p>vars.module.scss</p><pre><code class="language-scss">$font-sm:16px;
$red-color:#ff0000;
.home{
  color:cyan;
  .wrap{
    background-color: #ff0000;
  }
}
$white:    #fff;
$black:    #000;
$grey:     #ccc;
// etc...

// Export the color palette to make it accessible to JS
:export {
    white: $white;
    black: $black;
    grey: $grey;
    // etc...
}

</code></pre><p>CssFeat.vue</p><pre><code class="language-vue">
&lt;script setup lang=&quot;ts&quot;&gt;
import vars from &#39;./vars.module.scss&#39;
onBeforeMount(() =&gt; {
  console.log(vars )
})
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    css feat

    &lt;section&gt;
      &lt;article&gt;
        &lt;div&gt;{{ vars[&#39;white&#39;] }}&lt;/div&gt;
      &lt;/article&gt;
    &lt;/section&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style lang=&quot;scss&quot; scoped&gt;

&lt;/style&gt;

</code></pre>`,18),a=[c];function r(i,l){return s(),t("div",null,a)}const d=e(o,[["render",r],["__file","scss.html.vue"]]),u=JSON.parse('{"path":"/cs-tips/frontend/css/scss.html","title":"","lang":"zh-CN","frontmatter":{"description":"scss技巧 嵌套,复用 使用@extend产生 DRY CSS风格的代码。但是@mixin就不能产生DRY式的代码。 @extend会增加选择器之间的联系，然后把他们堆在一起。你正在为一些相关的元素设置样式，就拿一组按钮来说，使用@extend让他们共享样式看起来合情合理。但是如果这些被复用的样式片段并不仅仅局限于相关的元素，那么使用@mixin或许...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/css/scss.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:description","content":"scss技巧 嵌套,复用 使用@extend产生 DRY CSS风格的代码。但是@mixin就不能产生DRY式的代码。 @extend会增加选择器之间的联系，然后把他们堆在一起。你正在为一些相关的元素设置样式，就拿一组按钮来说，使用@extend让他们共享样式看起来合情合理。但是如果这些被复用的样式片段并不仅仅局限于相关的元素，那么使用@mixin或许..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-10T18:06:56.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-10T18:06:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-10T18:06:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"scss技巧","slug":"scss技巧","link":"#scss技巧","children":[]},{"level":2,"title":"嵌套,复用","slug":"嵌套-复用","link":"#嵌套-复用","children":[]},{"level":2,"title":"少用@import, 而是用@use替换","slug":"少用-import-而是用-use替换","link":"#少用-import-而是用-use替换","children":[]},{"level":2,"title":"导出scss变量给js使用","slug":"导出scss变量给js使用","link":"#导出scss变量给js使用","children":[]}],"git":{"createdTime":1699639616000,"updatedTime":1699639616000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.14,"words":343},"filePathRelative":"cs-tips/frontend/css/scss.md","localizedDate":"2023年11月10日","autoDesc":true}');export{d as comp,u as data};
