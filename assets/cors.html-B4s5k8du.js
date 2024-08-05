import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const a={},r=n(`<h1 id="asp运行局域网访问" tabindex="-1"><a class="header-anchor" href="#asp运行局域网访问"><span>asp运行局域网访问</span></a></h1><p>打开properties文件夹下面的<code>launchSettings.json</code>然后使用<code>&quot;applicationUrl&quot;: &quot;http://0.0.0.0:5059&quot;,</code></p><p>下面是例子</p><pre><code class="language-json">
{
  &quot;$schema&quot;: &quot;https://json.schemastore.org/launchsettings.json&quot;,
  &quot;iisSettings&quot;: {
    &quot;windowsAuthentication&quot;: false,
    &quot;anonymousAuthentication&quot;: true,
    &quot;iisExpress&quot;: {
      &quot;applicationUrl&quot;: &quot;http://localhost:15455&quot;,
      &quot;sslPort&quot;: 0
    }
  },
  &quot;profiles&quot;: {
    &quot;SimpleApi&quot;: {
      &quot;commandName&quot;: &quot;Project&quot;,
      &quot;dotnetRunMessages&quot;: true,
      &quot;launchBrowser&quot;: true,
      &quot;launchUrl&quot;: &quot;swagger&quot;,
      &quot;applicationUrl&quot;: &quot;http://0.0.0.0:5059&quot;,
      &quot;environmentVariables&quot;: {
        &quot;ASPNETCORE_ENVIRONMENT&quot;: &quot;Development&quot;
      }
    },
    &quot;IIS Express&quot;: {
      &quot;commandName&quot;: &quot;IISExpress&quot;,
      &quot;launchBrowser&quot;: true,
      &quot;launchUrl&quot;: &quot;swagger&quot;,
      &quot;environmentVariables&quot;: {
        &quot;ASPNETCORE_ENVIRONMENT&quot;: &quot;Development&quot;
      }
    }
  }
}

</code></pre><h2 id="打包exe设置端口" tabindex="-1"><a class="header-anchor" href="#打包exe设置端口"><span>打包exe设置端口</span></a></h2><pre><code class="language-csharp">\`\`\`csharp
var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls(&quot;http://*:3045&quot;);
var app = builder.Build();

app.MapGet(&quot;/&quot;, () =&gt; &quot;Hello World!&quot;);

app.Run();
</code></pre><pre><code></code></pre>`,7),u=[r];function s(p,c){return o(),e("div",null,u)}const l=t(a,[["render",s],["__file","cors.html.vue"]]),q=JSON.parse('{"path":"/csharp-tutor/aspnet/cors.html","title":"asp运行局域网访问","lang":"zh-CN","frontmatter":{"description":"asp运行局域网访问 打开properties文件夹下面的launchSettings.json然后使用\\"applicationUrl\\": \\"http://0.0.0.0:5059\\", 下面是例子 打包exe设置端口","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/aspnet/cors.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"asp运行局域网访问"}],["meta",{"property":"og:description","content":"asp运行局域网访问 打开properties文件夹下面的launchSettings.json然后使用\\"applicationUrl\\": \\"http://0.0.0.0:5059\\", 下面是例子 打包exe设置端口"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"asp运行局域网访问\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"打包exe设置端口","slug":"打包exe设置端口","link":"#打包exe设置端口","children":[]}],"git":{"createdTime":1654086804000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.33,"words":100},"filePathRelative":"csharp-tutor/aspnet/cors.md","localizedDate":"2022年6月1日","autoDesc":true}');export{l as comp,q as data};
