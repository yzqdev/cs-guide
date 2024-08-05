import{_ as e,c as t,o as r,d as a}from"./app-CbULZrmi.js";const n={},c=a(`<h1 id="regex函数" tabindex="-1"><a class="header-anchor" href="#regex函数"><span>regex函数</span></a></h1><h2 id="reg-test" tabindex="-1"><a class="header-anchor" href="#reg-test"><span>reg.test</span></a></h2><pre><code class="language-js">let r = /\\d{3}/;
let a = &#39;123&#39;;
let b = &#39;123ABC&#39;;
let c = &#39;abc&#39;;

r.test(a)  //true
r.test(b) //true
r.test(c) //false
</code></pre><h2 id="str-match" tabindex="-1"><a class="header-anchor" href="#str-match"><span>str.match</span></a></h2><pre><code class="language-js">let r = /compus/
let reg = /w+/
let s = &quot;compus, I know something about you&quot;
r.test(s)  //true
s.match(r)  //[&quot;compus&quot;]
s.match(reg) //[&quot;compus&quot;]
</code></pre><h2 id="reg-exec" tabindex="-1"><a class="header-anchor" href="#reg-exec"><span>reg.exec</span></a></h2><p><code>reg.exec()</code>每次调用，返回一个匹配的结果，匹配结果和分组以数组的形式返回，不断的调用即可返回下一个结果，直到返回</p><pre><code class="language-js">let str = &quot;Here is a Phone Number 111-2313 and 133-2311&quot; ;
let srg = /(\\d{3})[-.]\\d{4}/g;
let result = srg.exec(str);
while(result !== null) {
    console.log(result);
    result = srg.exec(str);
}
</code></pre><h2 id="str-replace" tabindex="-1"><a class="header-anchor" href="#str-replace"><span>str.replace()</span></a></h2><pre><code class="language-js">var s = &quot;Hello,My name is Vincent. What is your name?&quot;
var newStr = s.replace(/\\b\\w{4}\\b/g,replacer)
console.log(newStr)
function replacer(match) {
    console.log(match);
    return match.toUpperCase();
} 
</code></pre>`,10),s=[c];function o(l,i){return r(),t("div",null,s)}const g=e(n,[["render",o],["__file","reg-function.html.vue"]]),d=JSON.parse('{"path":"/frontend/basic-js/regex/reg-function.html","title":"regex函数","lang":"zh-CN","frontmatter":{"description":"regex函数 reg.test str.match reg.exec reg.exec()每次调用，返回一个匹配的结果，匹配结果和分组以数组的形式返回，不断的调用即可返回下一个结果，直到返回 str.replace()","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/regex/reg-function.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"regex函数"}],["meta",{"property":"og:description","content":"regex函数 reg.test str.match reg.exec reg.exec()每次调用，返回一个匹配的结果，匹配结果和分组以数组的形式返回，不断的调用即可返回下一个结果，直到返回 str.replace()"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T04:28:17.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-01T04:28:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"regex函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-01T04:28:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"reg.test","slug":"reg-test","link":"#reg-test","children":[]},{"level":2,"title":"str.match","slug":"str-match","link":"#str-match","children":[]},{"level":2,"title":"reg.exec","slug":"reg-exec","link":"#reg-exec","children":[]},{"level":2,"title":"str.replace()","slug":"str-replace","link":"#str-replace","children":[]}],"git":{"createdTime":1659328097000,"updatedTime":1659328097000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.57,"words":170},"filePathRelative":"frontend/basic-js/regex/reg-function.md","localizedDate":"2022年8月1日","autoDesc":true}');export{g as comp,d as data};
