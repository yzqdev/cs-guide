import{_ as e,c as t,o,d as n}from"./app-CbULZrmi.js";const s={},r=n(`<h1 id="express配置跨域" tabindex="-1"><a class="header-anchor" href="#express配置跨域"><span>express配置跨域</span></a></h1><pre><code class="language-javascript">const allowCrossDomain = function (req, res, next) {
    const allowedOrigins = [&#39;http://localhost:3401&#39;, &#39;http://localhost:3402&#39;, &#39;http://127.0.0.1:9000&#39;, &#39;http://localhost:9000&#39;];
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header(&#39;Access-Control-Allow-Origin&#39;, origin);
    }

    res.header(&#39;Access-Control-Allow-Methods&#39;, &#39;*&#39;);
    res.header(&#39;Access-Control-Allow-Headers&#39;, &#39;*&#39;);
    res.header(&#39;Access-Control-Allow-Credentials&#39;, &#39;true&#39;);
    next();
};

app.use(allowCrossDomain) 
</code></pre><p>或者直接</p><pre><code class="language-javascript">app.all(&quot;*&quot;,function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header(&quot;Access-Control-Allow-Origin&quot;,&quot;http://localhost:9080&quot;);
    //允许的header类型
    res.header(&quot;Access-Control-Allow-Headers&quot;,&quot;content-type&quot;);
    //跨域允许的请求方式
    res.header(&quot;Access-Control-Allow-Methods&quot;,&quot;DELETE,PUT,POST,GET,OPTIONS&quot;);
    if (req.method.toLowerCase() == &#39;options&#39;)
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
</code></pre><h1 id="根据域名获取后端接口-注意这个vite不适用" tabindex="-1"><a class="header-anchor" href="#根据域名获取后端接口-注意这个vite不适用"><span>根据域名获取后端接口(注意这个vite不适用)</span></a></h1><pre><code class="language-javascript">/**
 * get api url on the basis of domain url
 * @param str
 * @returns {string}
 */
export const getApiUrl = str =&gt; {
  const devArr = [&quot;devapi.com&quot;, &quot;localhost&quot;];
  const apiArr = [&quot;api.com&quot;];
  let localUrl = &quot;192.168.&quot;;
  let isDev =
    devArr.includes(document.domain) || document.domain.includes(localUrl);
  let isProd = apiArr.includes(document.domain);
  // 需要后端接   线上环境的域名组

  if (str === &quot;socket&quot;) {
    if (isDev) {
      return &quot;wss://devapi.com/ws&quot;;
    }
    if (isProd) {
      return &quot;wss://api.com/ws&quot;;
    }
  }
  if (isDev) {
    return &quot;https://devapi.com&quot;;
  }
  if (isProd) {
    return &quot;https://api.com&quot;;
  }
  return &quot;https://api.com&quot;;
};
</code></pre><h1 id="css美化滚动条" tabindex="-1"><a class="header-anchor" href="#css美化滚动条"><span>css美化滚动条</span></a></h1><pre><code class="language-css">         ::-webkit-scrollbar {
            /*滚动条整体样式*/
            width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
            height: 10px;
        }
         ::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            background   : rgba(144,147,153,.3);
        }
        ::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background   : #ededed;
        }
</code></pre>`,8),a=[r];function i(c,p){return o(),t("div",null,a)}const l=e(s,[["render",i],["__file","expres-snippets.html.vue"]]),u=JSON.parse('{"path":"/cs-tips/frontend/snippets/expres-snippets.html","title":"express配置跨域","lang":"zh-CN","frontmatter":{"description":"express配置跨域 或者直接 根据域名获取后端接口(注意这个vite不适用) css美化滚动条","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/expres-snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"express配置跨域"}],["meta",{"property":"og:description","content":"express配置跨域 或者直接 根据域名获取后端接口(注意这个vite不适用) css美化滚动条"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"express配置跨域\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.15,"words":344},"filePathRelative":"cs-tips/frontend/snippets/expres-snippets.md","localizedDate":"2023年5月25日","autoDesc":true}');export{l as comp,u as data};
