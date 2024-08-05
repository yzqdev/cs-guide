import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const s={},u=o(`<h1 id="打包工具" tabindex="-1"><a class="header-anchor" href="#打包工具"><span>打包工具</span></a></h1><ul><li>esbuild</li><li>rollup</li><li>unbuild</li><li>tsup</li><li>webpack</li><li>parcel</li><li>vite</li><li>tsc</li><li>father</li><li><a href="https://github.com/huozhi/bunchee" target="_blank" rel="noopener noreferrer">bunchee</a></li><li><a href="https://github.com/privatenumber/pkgroll" target="_blank" rel="noopener noreferrer">pkgroll</a></li><li><a href="https://github.com/developit/microbundle" target="_blank" rel="noopener noreferrer">microbundle</a><a href="https://antfu.me/posts/publish-esm-and-cjs" target="_blank" rel="noopener noreferrer">https://antfu.me/posts/publish-esm-and-cjs</a></li><li><a href="https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c" target="_blank" rel="noopener noreferrer">pure esm</a></li><li><a href="https://publint.dev/" target="_blank" rel="noopener noreferrer">https://publint.dev/</a></li><li><a href="https://arethetypeswrong.github.io/" target="_blank" rel="noopener noreferrer">https://arethetypeswrong.github.io/</a></li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>external的意思是dependencies里面的依赖不会打包进去,而是需要自己手动安装,inlineDependencies就是把devDependencies里面你用到的依赖的源码打包进去,会导致包很大</p></div><h2 id="自动化工具" tabindex="-1"><a class="header-anchor" href="#自动化工具"><span>自动化工具</span></a></h2><ul><li><a href="https://github.com/jakejs/jake" target="_blank" rel="noopener noreferrer">https://github.com/jakejs/jake</a></li><li>gulp</li><li>grunt</li></ul><h2 id="rollup" tabindex="-1"><a class="header-anchor" href="#rollup"><span>rollup</span></a></h2><p>默认<strong>不会</strong>把dependencies里面的依赖源码全部打包,但是会出现warning,所以一般需要设置<code>external:[&#39;lodash&#39;]</code>之类的,如果实在想把dependency里面的依赖打包进你的库,需要用<a href="https://github.com/rollup/plugins/tree/master/packages/node-resolve" target="_blank" rel="noopener noreferrer">@rollup/plugin-node-resolve</a> 如下 https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency</p><h2 id="打包既支持esm又支持cjs的包" tabindex="-1"><a class="header-anchor" href="#打包既支持esm又支持cjs的包"><span>打包既支持esm又支持cjs的包</span></a></h2><h3 id="tsc" tabindex="-1"><a class="header-anchor" href="#tsc"><span>tsc</span></a></h3><p><strong>cjs</strong>(tsconfig.json)</p><pre><code class="language-json">{
  &quot;compilerOptions&quot;: {
    &quot;target&quot;: &quot;ES2015&quot;,
    &quot;module&quot;: &quot;commonjs&quot;,
    &quot;outDir&quot;: &quot;./dist/cjs&quot;,
    &quot;esModuleInterop&quot;: true,
    &quot;moduleResolution&quot;: &quot;node&quot;
  }
}
</code></pre><p>esm (tsconfig-esm.json)</p><pre><code class="language-json">{
  &quot;extends&quot;: &quot;./tsconfig.json&quot;,

  &quot;compilerOptions&quot;: {
    &quot;target&quot;: &quot;es2015&quot;,
    &quot;module&quot;: &quot;es2015&quot;,
    &quot;outDir&quot;: &quot;./dist/esm&quot;,
    &quot;moduleResolution&quot;: &quot;node&quot;
  }
}

</code></pre><p>package.json</p><pre><code class="language-json">{
  &quot;main&quot;: &quot;./dist/cjs/index.js&quot;,
  &quot;module&quot;: &quot;./dist/esm/index.js&quot;,
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;rm -rf dist &amp;&amp; tsc -p tsconfig.json &amp;&amp; tsc -p tsconfig-esm.json&quot;
  },
}
</code></pre><h3 id="rollup-1" tabindex="-1"><a class="header-anchor" href="#rollup-1"><span>rollup</span></a></h3><p>rollup.config.ts</p><pre><code class="language-ts">export default [
  {
    input: &quot;src/index.js&quot;,
    output: [
      { file: &quot;dist/index.cjs.js&quot;, format: &quot;cjs&quot; },
      { file: &quot;dist/index.esm.js&quot;, format: &quot;es&quot; },
    ],
  },
];

</code></pre><p>package.json</p><pre><code class="language-json">{
  &quot;main&quot;: &quot;dist/index.cjs.js&quot;,
  &quot;module&quot;: &quot;dist/index.esm.js&quot;,
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;rollup -c&quot;,
  },
}

</code></pre><h3 id="webpack" tabindex="-1"><a class="header-anchor" href="#webpack"><span>webpack</span></a></h3><pre><code class="language-ts">const path = require(&quot;path&quot;);

module.exports = {
  mode: &#39;none&#39;,
  entry: {
    &quot;index.cjs&quot;: {
      import: &#39;./src/index.js&#39;,
      library: {
        type: &#39;commonjs2&#39;,
      },

    },
    &quot;index.esm&quot;: {
      import: &#39;./src/index.js&#39;,
      library: {
        type: &#39;module&#39;,
      },
    },
  },
  output: {
    path: path.resolve(__dirname, &#39;dist&#39;),
    filename: &quot;[name].js&quot;,
    clean: true,
  },
  experiments: {
    outputModule: true
  }
};

</code></pre><p>package.json</p><pre><code class="language-json">{
  &quot;main&quot;: &quot;dist/index.cjs.js&quot;,
  &quot;module&quot;: &quot;dist/index.esm.js&quot;,
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack&quot;,
  },
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^5&quot;,
    &quot;webpack-cli&quot;: &quot;^4&quot;
  }
}

</code></pre><h3 id="esbuild" tabindex="-1"><a class="header-anchor" href="#esbuild"><span>esbuild</span></a></h3><p>package.json</p><pre><code class="language-json">{
  &quot;main&quot;: &quot;dist/index.cjs.js&quot;,
  &quot;module&quot;: &quot;dist/index.esm.js&quot;,
  &quot;scripts&quot;: {
    &quot;esbuild:cjs&quot;: &quot;esbuild ./src/index.js --bundle --outfile=dist/index.cjs.js --format=cjs&quot;,
    &quot;esbuild:esm&quot;: &quot;esbuild ./src/index.js --bundle --outfile=dist/index.esm.js --format=esm&quot;,
    &quot;build&quot;: &quot;npm run esbuild:cjs &amp;&amp; npm run esbuild:esm&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;esbuild&quot;: &quot;^0.14.49&quot;
  },
}
</code></pre><h3 id="tsup" tabindex="-1"><a class="header-anchor" href="#tsup"><span>tsup</span></a></h3><p>tsup.config.ts</p><pre><code class="language-ts">import { defineConfig } from &quot;tsup&quot;;

export default defineConfig({
  entry: [&quot;src/&quot;],
  splitting: false,
  sourcemap: false,
  minify: false,
  dts: true,
  format: [&quot;esm&quot;, &quot;cjs&quot;],
  clean: true,
});

</code></pre><h3 id="unbuild" tabindex="-1"><a class="header-anchor" href="#unbuild"><span>unbuild</span></a></h3><p>build.config.ts</p><pre><code class="language-ts">import { defineBuildConfig } from &quot;unbuild&quot;;

export default defineBuildConfig({
  entries: [&quot;./src/index&quot;, ],
   // entries: [&quot;src/&quot;],
  rollup: {
    emitCJS:true,
    inlineDependencies:false,
  },
  clean: true,
  declaration: true,

});

</code></pre><p>默认会把dependencies和peerdependencies放进external,所以要想像<a href="https://github.com/rollup/plugins/tree/master/packages/node-resolve" target="_blank" rel="noopener noreferrer">@rollup/plugin-node-resolve</a>.一样吧node_modules里面的依赖打包进去,需要把<code>lodash-es</code>放进 devDependencies,然后<code>inlineDependencies:true</code>,不过这样是不推荐的, 因为如果用户安装了lodash-es,那么就会在你的库里和用户依赖都出现lodash-es</p>`,34),l=[u];function r(i,a){return n(),t("div",null,l)}const d=e(s,[["render",r],["__file","pkg.html.vue"]]),c=JSON.parse('{"path":"/node-tutor/build-system/pkg.html","title":"打包工具","lang":"zh-CN","frontmatter":{"description":"打包工具 esbuild rollup unbuild tsup webpack parcel vite tsc father bunchee pkgroll microbundle https://antfu.me/posts/publish-esm-and-cjs pure esm https://publint.dev/ https://aret...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/build-system/pkg.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"打包工具"}],["meta",{"property":"og:description","content":"打包工具 esbuild rollup unbuild tsup webpack parcel vite tsc father bunchee pkgroll microbundle https://antfu.me/posts/publish-esm-and-cjs pure esm https://publint.dev/ https://aret..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-09T15:35:21.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-04-09T15:35:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"打包工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-09T15:35:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"自动化工具","slug":"自动化工具","link":"#自动化工具","children":[]},{"level":2,"title":"rollup","slug":"rollup","link":"#rollup","children":[]},{"level":2,"title":"打包既支持esm又支持cjs的包","slug":"打包既支持esm又支持cjs的包","link":"#打包既支持esm又支持cjs的包","children":[{"level":3,"title":"tsc","slug":"tsc","link":"#tsc","children":[]},{"level":3,"title":"rollup","slug":"rollup-1","link":"#rollup-1","children":[]},{"level":3,"title":"webpack","slug":"webpack","link":"#webpack","children":[]},{"level":3,"title":"esbuild","slug":"esbuild","link":"#esbuild","children":[]},{"level":3,"title":"tsup","slug":"tsup","link":"#tsup","children":[]},{"level":3,"title":"unbuild","slug":"unbuild","link":"#unbuild","children":[]}]}],"git":{"createdTime":1687669238000,"updatedTime":1712676921000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":1.6,"words":481},"filePathRelative":"node-tutor/build-system/pkg.md","localizedDate":"2023年6月25日","autoDesc":true}');export{d as comp,c as data};
