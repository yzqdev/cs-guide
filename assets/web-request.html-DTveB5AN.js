import{_ as e,c as t,o,d as n}from"./app-CbULZrmi.js";const a={},s=n(`<h1 id="web请求" tabindex="-1"><a class="header-anchor" href="#web请求"><span>web请求</span></a></h1><p>提交key1=value1&amp;key2=value2类型参数：</p><p>方法一：</p><pre><code class="language-powershell">$textmod=&quot;key=$key&amp;content=$data&amp;touser=$touser&quot;

Invoke-WebRequest -UseBasicParsing $url  -Method POST -Body $textmod
Invoke-WebRequest -UseBasicParsing $url -ContentType &#39;application/x-www-form-urlencoded;charset=UTF-8&#39; -Method POST -Body $textmod  #提交的数据中如果包含符号&amp;使用%26代替，contentType解决中文乱码问题
 
</code></pre><p>方法二：</p><pre><code class="language-powershell">#中文和特殊符号无需特殊处理
$textmod = @{key=$key;content=$data;touser=$touser}
Invoke-WebRequest -UseBasicParsing $url -Method POST -Body $textmod  
</code></pre><p>提交json类型参数，未测试</p><pre><code class="language-powershell">$text = @{
 &quot;content&quot; = $data,
 &quot;touser&quot; = $touser,
 &quot;sn&quot; = $sn
} | ConvertTo-Json

Invoke-WebRequest -UseBasicParsing $url -ContentType &quot;application/json&quot; -Method POST -Body $text
</code></pre>`,8),r=[s];function c(p,d){return o(),t("div",null,r)}const l=e(a,[["render",c],["__file","web-request.html.vue"]]),u=JSON.parse('{"path":"/windows-tutor/powershell/basics/web-request.html","title":"web请求","lang":"zh-CN","frontmatter":{"description":"web请求 提交key1=value1&key2=value2类型参数： 方法一： 方法二： 提交json类型参数，未测试","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/basics/web-request.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"web请求"}],["meta",{"property":"og:description","content":"web请求 提交key1=value1&key2=value2类型参数： 方法一： 方法二： 提交json类型参数，未测试"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-31T13:53:29.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-31T13:53:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"web请求\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-31T13:53:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1658584315000,"updatedTime":1659275609000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.46,"words":138},"filePathRelative":"windows-tutor/powershell/basics/web-request.md","localizedDate":"2022年7月23日","autoDesc":true}');export{l as comp,u as data};
