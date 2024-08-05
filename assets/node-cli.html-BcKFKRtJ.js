import{_ as o,c as t,o as e,d as n}from"./app-CbULZrmi.js";const s={},a=n(`<h1 id="nodejs命令行编写" tabindex="-1"><a class="header-anchor" href="#nodejs命令行编写"><span>nodejs命令行编写</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>推荐使用commanderjs,方便拓展</p></div><h2 id="安装使用" tabindex="-1"><a class="header-anchor" href="#安装使用"><span>安装使用</span></a></h2><h3 id="package-json" tabindex="-1"><a class="header-anchor" href="#package-json"><span>package.json</span></a></h3><pre><code class="language-json">{
  &quot;name&quot;: &quot;play&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;private&quot;: true,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;esno src/index&quot;,
    &quot;dev:nd&quot;: &quot;nodemon&quot;,
    &quot;build&quot;: &quot;tsc&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;@faker-js/faker&quot;: &quot;^8.2.0&quot;,
    &quot;@types/mongoose&quot;: &quot;^5.11.97&quot;,
    &quot;@types/node&quot;: &quot;^18.18.6&quot;,
    &quot;esno&quot;: &quot;^0.17.0&quot;,
    &quot;ts-node&quot;: &quot;^10.9.1&quot;,
    &quot;typescript&quot;: &quot;^5.2.2&quot;
  },
  &quot;dependencies&quot;: {
    &quot;@types/express&quot;: &quot;^4.17.20&quot;,
    &quot;axios&quot;: &quot;^1.5.1&quot;,
    &quot;commander&quot;: &quot;^11.1.0&quot;,
    &quot;express&quot;: &quot;^4.18.2&quot;,
    &quot;got&quot;: &quot;^13.0.0&quot; 
  }
}
</code></pre><h3 id="tsconfig-json" tabindex="-1"><a class="header-anchor" href="#tsconfig-json"><span>tsconfig.json</span></a></h3><pre><code class="language-json">{
  &quot;compilerOptions&quot;: {
    &quot;sourceMap&quot;: true,
    &quot;outDir&quot;: &quot;dist&quot;,
    &quot;module&quot;: &quot;CommonJS&quot;,
    &quot;moduleResolution&quot;: &quot;Node&quot;,
    &quot;strict&quot;: false,
    &quot;lib&quot;: [&quot;esnext&quot;],
    &quot;experimentalDecorators&quot;: true,
    &quot;emitDecoratorMetadata&quot;: true,
    &quot;esModuleInterop&quot;: true,
    // &quot;verbatimModuleSyntax&quot;: true,
    &quot;resolveJsonModule&quot;: true
  }
}

</code></pre><h3 id="index-ts-位置-src-index-ts" tabindex="-1"><a class="header-anchor" href="#index-ts-位置-src-index-ts"><span>index.ts 位置(<code>src/index.ts</code>)</span></a></h3><pre><code class="language-ts">import fs from &quot;node:fs&quot;;
import { Command } from &quot;commander&quot;;
import { version } from &quot;../package.json&quot;;

import { fileCommand } from &quot;./commands/fileCommand&quot;;

function bootstrap() {
  const program = new Command();
  program.name(&quot;yzq&quot;);
  program
    .version(version, &quot;-v, --version&quot;, &quot;当前版本.&quot;)
    .usage(&quot;&lt;command&gt; [options]&quot;)
    .helpOption(&quot;-h, --help&quot;, &quot;如何使用&quot;);
  fileCommand(program);

  program.parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}
bootstrap();

</code></pre><h3 id="filecommand-ts-位置-src-commands-filecommand-ts" tabindex="-1"><a class="header-anchor" href="#filecommand-ts-位置-src-commands-filecommand-ts"><span>fileCommand.ts 位置(<code>src/commands/fileCommand.ts</code>)</span></a></h3><pre><code class="language-ts">import type { Command } from &quot;commander&quot;;

export function fileCommand(program: Command) {
  const fileCmd = program.command(&quot;file&quot;).description(&quot;file operations&quot;);
  fileCmd
    .command(&quot;list&quot;)
    .description(&quot;list fiels&quot;)
    .action(() =&gt; {
      console.log(&quot;list files&quot;);
    });
  fileCmd
    .command(&quot;open&quot;)
    .argument(&quot;&lt;string&gt;&quot;, &quot;string to split&quot;)
    .option(&quot;--first&quot;, &quot;display just the first substring&quot;)
    .option(&quot;-s, --separator &lt;char&gt;&quot;, &quot;separator character&quot;, &quot;,&quot;)
    .action((str, options) =&gt; {
      const limit = options.first ? 1 : undefined;
      console.log(str.split(options.separator, limit));
    });
}
</code></pre><h3 id="运行" tabindex="-1"><a class="header-anchor" href="#运行"><span>运行</span></a></h3><pre><code class="language-powershell">yarn dev file list

yarn dev file open hello --first
</code></pre>`,13),u=[a];function i(r,d){return e(),t("div",null,u)}const q=o(s,[["render",i],["__file","node-cli.html.vue"]]),l=JSON.parse('{"path":"/node-tutor/node-cli.html","title":"nodejs命令行编写","lang":"zh-CN","frontmatter":{"description":"nodejs命令行编写 提示 推荐使用commanderjs,方便拓展 安装使用 package.json tsconfig.json index.ts 位置(src/index.ts) fileCommand.ts 位置(src/commands/fileCommand.ts) 运行","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/node-cli.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nodejs命令行编写"}],["meta",{"property":"og:description","content":"nodejs命令行编写 提示 推荐使用commanderjs,方便拓展 安装使用 package.json tsconfig.json index.ts 位置(src/index.ts) fileCommand.ts 位置(src/commands/fileCommand.ts) 运行"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-22T05:45:13.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-10-22T05:45:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nodejs命令行编写\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-22T05:45:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装使用","slug":"安装使用","link":"#安装使用","children":[{"level":3,"title":"package.json","slug":"package-json","link":"#package-json","children":[]},{"level":3,"title":"tsconfig.json","slug":"tsconfig-json","link":"#tsconfig-json","children":[]},{"level":3,"title":"index.ts 位置(src/index.ts)","slug":"index-ts-位置-src-index-ts","link":"#index-ts-位置-src-index-ts","children":[]},{"level":3,"title":"fileCommand.ts 位置(src/commands/fileCommand.ts)","slug":"filecommand-ts-位置-src-commands-filecommand-ts","link":"#filecommand-ts-位置-src-commands-filecommand-ts","children":[]},{"level":3,"title":"运行","slug":"运行","link":"#运行","children":[]}]}],"git":{"createdTime":1697953513000,"updatedTime":1697953513000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.77,"words":231},"filePathRelative":"node-tutor/node-cli.md","localizedDate":"2023年10月22日","autoDesc":true}');export{q as comp,l as data};
