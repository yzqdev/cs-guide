import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const s={},a=n(`<h1 id="一些小技巧" tabindex="-1"><a class="header-anchor" href="#一些小技巧"><span>一些小技巧</span></a></h1><h2 id="网站" tabindex="-1"><a class="header-anchor" href="#网站"><span>网站</span></a></h2><ul><li><a href="https://deno.land/" target="_blank" rel="noopener noreferrer">官网</a></li></ul><h2 id="命令行" tabindex="-1"><a class="header-anchor" href="#命令行"><span>命令行</span></a></h2><pre><code class="language-shell">deno init #创建项目
deno cache --reload my_app.ts #下载依赖
deno upgrade #更新deno
deno fmt #格式化
deno test # https://deno.land/manual@v1.35.2/basics/testing
deno install -n awesome_cli https://example.com/awesome/cli.ts
deno uninstall file_server
</code></pre><h2 id="deno-jsonc" tabindex="-1"><a class="header-anchor" href="#deno-jsonc"><span>deno.jsonc</span></a></h2><pre><code class="language-json">{
  &quot;lock&quot;: false,
  &quot;tasks&quot;: {
    &quot;init:stripe&quot;: &quot;deno run --allow-read --allow-env --allow-net tools/init_stripe.ts&quot;,
    &quot;db:dump&quot;: &quot;deno run --allow-read --allow-env --unstable tools/dump_kv.ts&quot;,
    &quot;db:seed&quot;: &quot;deno run --allow-read --allow-env --allow-net --unstable tools/seed_submissions.ts&quot;,
    &quot;db:reset&quot;: &quot;deno run --allow-read --allow-env --unstable tools/reset_kv.ts&quot;,
    &quot;start&quot;: &quot;deno run --unstable -A --watch=static/,routes/ dev.ts&quot;,
    &quot;test&quot;: &quot;KV_PATH=:memory: deno test -A --unstable --parallel --coverage=./cov&quot;,
    &quot;check:license&quot;: &quot;deno run --allow-read --allow-write tools/check_license.ts&quot;,
    &quot;ok&quot;: &quot;deno fmt --check &amp;&amp; deno lint &amp;&amp; deno task check:license --check &amp;&amp; deno check main.ts &amp;&amp; deno task test&quot;,
    &quot;cov&quot;: &quot;deno coverage ./cov/ --lcov --exclude=&#39;test.ts&#39; &gt; cov.lcov&quot;,
    &quot;update&quot;: &quot;deno run -A -r https://fresh.deno.dev/update .&quot;
  },
  &quot;compilerOptions&quot;: {
    &quot;jsx&quot;: &quot;react-jsx&quot;,
    &quot;jsxImportSource&quot;: &quot;preact&quot;
  },
  &quot;imports&quot;: {
    &quot;@/&quot;: &quot;./&quot;,
    &quot;$fresh/&quot;: &quot;https://deno.land/x/fresh@1.3.0/&quot;,
    &quot;$gfm&quot;: &quot;https://deno.land/x/gfm@0.2.4/mod.ts&quot;,
    &quot;preact&quot;: &quot;https://esm.sh/preact@10.15.1&quot;,
    &quot;preact/&quot;: &quot;https://esm.sh/preact@10.15.1/&quot;,
    &quot;preact-render-to-string&quot;: &quot;https://esm.sh/*preact-render-to-string@6.2.0&quot;,
    &quot;@preact/signals&quot;: &quot;https://esm.sh/*@preact/signals@1.1.3&quot;,
    &quot;@preact/signals-core&quot;: &quot;https://esm.sh/*@preact/signals-core@1.2.3&quot;,
    &quot;twind-preset-tailwind/&quot;: &quot;https://esm.sh/@twind/preset-tailwind@1.1.4/&quot;,
    &quot;twind-preset-ext&quot;: &quot;https://esm.sh/@twind/preset-ext@1.0.7/&quot;,
    &quot;std/&quot;: &quot;https://deno.land/std@0.195.0/&quot;,
    &quot;stripe&quot;: &quot;./stripe.ts&quot;,
    &quot;feed&quot;: &quot;https://esm.sh/feed@4.2.2&quot;,
    &quot;kv_oauth&quot;: &quot;https://deno.land/x/deno_kv_oauth@v0.2.5/mod.ts&quot;,
    &quot;@twind/core&quot;: &quot;https://esm.sh/@twind/core@1.1.3&quot;,
    &quot;fresh_charts/&quot;: &quot;https://deno.land/x/fresh_charts@0.3.1/&quot;
  },
  &quot;exclude&quot;: [
    &quot;cov/&quot;
  ],
  &quot;lint&quot;: {
    &quot;rules&quot;: {
      &quot;tags&quot;: [
        &quot;fresh&quot;,
        &quot;recommended&quot;
      ]
    }
  }
}

</code></pre><h2 id="deno内部npm镜像" tabindex="-1"><a class="header-anchor" href="#deno内部npm镜像"><span>deno内部npm镜像</span></a></h2><p><a href="https://github.com/denoland/deno/issues/16105" target="_blank" rel="noopener noreferrer">https://github.com/denoland/deno/issues/16105</a></p><p>配置环境变量<code>NPM_CONFIG_REGISTRY</code>即可</p><h2 id="deno-使用npm包" tabindex="-1"><a class="header-anchor" href="#deno-使用npm包"><span>deno 使用npm包</span></a></h2><pre><code class="language-ts">// @deno-types=&quot;npm:@types/express@4.17.15&quot;
import express from &quot;npm:express@4.18.2&quot;;
</code></pre><h2 id="添加types" tabindex="-1"><a class="header-anchor" href="#添加types"><span>添加types</span></a></h2><pre><code class="language-ts">在主文件添加
 
/// &lt;reference types=&quot;./foo.d.ts&quot; /&gt;
或者在需要的文件添加
// @deno-types=&quot;npm:@types/express@4.17.17&quot;
</code></pre>`,14),u=[a];function d(r,p){return o(),e("div",null,u)}const c=t(s,[["render",d],["__file","tips.html.vue"]]),q=JSON.parse('{"path":"/frontend/deno/tips.html","title":"一些小技巧","lang":"zh-CN","frontmatter":{"description":"一些小技巧 网站 官网 命令行 deno.jsonc deno内部npm镜像 https://github.com/denoland/deno/issues/16105 配置环境变量NPM_CONFIG_REGISTRY即可 deno 使用npm包 添加types","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/deno/tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"一些小技巧"}],["meta",{"property":"og:description","content":"一些小技巧 网站 官网 命令行 deno.jsonc deno内部npm镜像 https://github.com/denoland/deno/issues/16105 配置环境变量NPM_CONFIG_REGISTRY即可 deno 使用npm包 添加types"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T03:14:18.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-19T03:14:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一些小技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T03:14:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"网站","slug":"网站","link":"#网站","children":[]},{"level":2,"title":"命令行","slug":"命令行","link":"#命令行","children":[]},{"level":2,"title":"deno.jsonc","slug":"deno-jsonc","link":"#deno-jsonc","children":[]},{"level":2,"title":"deno内部npm镜像","slug":"deno内部npm镜像","link":"#deno内部npm镜像","children":[]},{"level":2,"title":"deno 使用npm包","slug":"deno-使用npm包","link":"#deno-使用npm包","children":[]},{"level":2,"title":"添加types","slug":"添加types","link":"#添加types","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1700363658000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":1,"words":301},"filePathRelative":"frontend/deno/tips.md","localizedDate":"2023年6月25日","autoDesc":true}');export{c as comp,q as data};
