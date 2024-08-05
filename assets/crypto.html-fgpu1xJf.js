import{_ as e,c as t,o,d as a}from"./app-CbULZrmi.js";const r={},c=a(`<h1 id="crypto" tabindex="-1"><a class="header-anchor" href="#crypto"><span>crypto</span></a></h1><p>crypto模块提供加密相关操作</p><pre><code class="language-ts">// getHashes 方法用于查看支持的加密算法
console.log(crypto.getHashes());
</code></pre><h2 id="md5加密" tabindex="-1"><a class="header-anchor" href="#md5加密"><span>md5加密</span></a></h2><pre><code class="language-ts">let md5 = crypto.createHash(&quot;md5&quot;); // 创建 md5
let md5Sum = md5.update(&quot;hello&quot;); // update 加密
let result = md5Sum.digest(); // 获取加密后结果
console.log(result) //// &lt;Buffer 5d 41 40 2a bc 4b 2a 76 b9 71 9d 91 10 17 c5 92&gt;
</code></pre><p>digest 方法参数用于指定加密后的返回值的格式，不传参默认返回加密后的 Buffer，常用的参数有 hex 和 Base64，hex 代表十六进制，加密后长度为 32，Base64 的结果长度为 24，以 == 结尾。</p><pre><code class="language-ts">let md5 = crypto.createHash(&quot;md5&quot;); // 创建 md5
let md5Sum = md5.update(&quot;hello&quot;); // update 加密
let result = md5Sum.digest(&#39;hex&#39;); // 获取加密后结果
//let result = md5Sum.digest(&quot;Base64&quot;);使用base64
console.log(result)//5d41402abc4b2a76b9719d911017c592
</code></pre><p>crypto支持链式调用</p><pre><code class="language-ts">let result = crypto
    .createHash(&quot;md5&quot;)
    .update(&quot;he&quot;)
    .update(&quot;llo&quot;)
    .digest(&quot;hex&quot;);

console.log(result);
</code></pre>`,9),d=[c];function s(p,n){return o(),t("div",null,d)}const u=e(r,[["render",s],["__file","crypto.html.vue"]]),i=JSON.parse('{"path":"/node-tutor/apis/crypto.html","title":"crypto","lang":"zh-CN","frontmatter":{"description":"crypto crypto模块提供加密相关操作 md5加密 digest 方法参数用于指定加密后的返回值的格式，不传参默认返回加密后的 Buffer，常用的参数有 hex 和 Base64，hex 代表十六进制，加密后长度为 32，Base64 的结果长度为 24，以 == 结尾。 crypto支持链式调用","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/apis/crypto.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"crypto"}],["meta",{"property":"og:description","content":"crypto crypto模块提供加密相关操作 md5加密 digest 方法参数用于指定加密后的返回值的格式，不传参默认返回加密后的 Buffer，常用的参数有 hex 和 Base64，hex 代表十六进制，加密后长度为 32，Base64 的结果长度为 24，以 == 结尾。 crypto支持链式调用"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"crypto\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"md5加密","slug":"md5加密","link":"#md5加密","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.69,"words":206},"filePathRelative":"node-tutor/apis/crypto.md","localizedDate":"2023年6月25日","autoDesc":true}');export{u as comp,i as data};
