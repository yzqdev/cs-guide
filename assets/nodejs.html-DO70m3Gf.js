import{_ as e,c as t,o,d as n}from"./app-CbULZrmi.js";const r={},s=n(`<h1 id="nodejs" tabindex="-1"><a class="header-anchor" href="#nodejs"><span>nodejs</span></a></h1><h2 id="nodejs使用tsx执行命令行" tabindex="-1"><a class="header-anchor" href="#nodejs使用tsx执行命令行"><span>nodejs使用tsx执行命令行</span></a></h2><pre><code>node  --require tsx/cjs node_modules/gulp-cli/bin/gulp.js

</code></pre><h2 id="添加jsdoc的type提示" tabindex="-1"><a class="header-anchor" href="#添加jsdoc的type提示"><span>添加jsdoc的type提示</span></a></h2><p>/** @type {import(&#39;@sveltejs/kit&#39;).Config} */</p><h2 id="js" tabindex="-1"><a class="header-anchor" href="#js"><span>js</span></a></h2><p><a href="https://github.com/vangleer/vangle" target="_blank" rel="noopener noreferrer">https://github.com/vangleer/vangle</a></p><h2 id="nodejs颜色文字" tabindex="-1"><a class="header-anchor" href="#nodejs颜色文字"><span>nodejs颜色文字</span></a></h2><pre><code class="language-js">let tty = require(&quot;tty&quot;)

let isColorSupported =
 !(&quot;NO_COLOR&quot; in process.env || process.argv.includes(&quot;--no-color&quot;)) &amp;&amp;
 (&quot;FORCE_COLOR&quot; in process.env ||
  process.argv.includes(&quot;--color&quot;) ||
  process.platform === &quot;win32&quot; ||
  (tty.isatty(1) &amp;&amp; process.env.TERM !== &quot;dumb&quot;) ||
  &quot;CI&quot; in process.env)

let formatter =
 (open, close, replace = open) =&gt;
 input =&gt; {
  let string = &quot;&quot; + input
  let index = string.indexOf(close, open.length)
  return ~index
   ? open + replaceClose(string, close, replace, index) + close
   : open + string + close
 }

let replaceClose = (string, close, replace, index) =&gt; {
 let start = string.substring(0, index) + replace
 let end = string.substring(index + close.length)
 let nextIndex = end.indexOf(close)
 return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end
}

let createColors = (enabled = isColorSupported) =&gt; ({
 isColorSupported: enabled,
 reset: enabled ? s =&gt; \`\\x1b[0m\${s}\\x1b[0m\` : String,
 bold: enabled ? formatter(&quot;\\x1b[1m&quot;, &quot;\\x1b[22m&quot;, &quot;\\x1b[22m\\x1b[1m&quot;) : String,
 dim: enabled ? formatter(&quot;\\x1b[2m&quot;, &quot;\\x1b[22m&quot;, &quot;\\x1b[22m\\x1b[2m&quot;) : String,
 italic: enabled ? formatter(&quot;\\x1b[3m&quot;, &quot;\\x1b[23m&quot;) : String,
 underline: enabled ? formatter(&quot;\\x1b[4m&quot;, &quot;\\x1b[24m&quot;) : String,
 inverse: enabled ? formatter(&quot;\\x1b[7m&quot;, &quot;\\x1b[27m&quot;) : String,
 hidden: enabled ? formatter(&quot;\\x1b[8m&quot;, &quot;\\x1b[28m&quot;) : String,
 strikethrough: enabled ? formatter(&quot;\\x1b[9m&quot;, &quot;\\x1b[29m&quot;) : String,
 black: enabled ? formatter(&quot;\\x1b[30m&quot;, &quot;\\x1b[39m&quot;) : String,
 red: enabled ? formatter(&quot;\\x1b[31m&quot;, &quot;\\x1b[39m&quot;) : String,
 green: enabled ? formatter(&quot;\\x1b[32m&quot;, &quot;\\x1b[39m&quot;) : String,
 yellow: enabled ? formatter(&quot;\\x1b[33m&quot;, &quot;\\x1b[39m&quot;) : String,
 blue: enabled ? formatter(&quot;\\x1b[34m&quot;, &quot;\\x1b[39m&quot;) : String,
 magenta: enabled ? formatter(&quot;\\x1b[35m&quot;, &quot;\\x1b[39m&quot;) : String,
 cyan: enabled ? formatter(&quot;\\x1b[36m&quot;, &quot;\\x1b[39m&quot;) : String,
 white: enabled ? formatter(&quot;\\x1b[37m&quot;, &quot;\\x1b[39m&quot;) : String,
 gray: enabled ? formatter(&quot;\\x1b[90m&quot;, &quot;\\x1b[39m&quot;) : String,
 bgBlack: enabled ? formatter(&quot;\\x1b[40m&quot;, &quot;\\x1b[49m&quot;) : String,
 bgRed: enabled ? formatter(&quot;\\x1b[41m&quot;, &quot;\\x1b[49m&quot;) : String,
 bgGreen: enabled ? formatter(&quot;\\x1b[42m&quot;, &quot;\\x1b[49m&quot;) : String,
 bgYellow: enabled ? formatter(&quot;\\x1b[43m&quot;, &quot;\\x1b[49m&quot;) : String,
 bgBlue: enabled ? formatter(&quot;\\x1b[44m&quot;, &quot;\\x1b[49m&quot;) : String,
 bgMagenta: enabled ? formatter(&quot;\\x1b[45m&quot;, &quot;\\x1b[49m&quot;) : String,
 bgCyan: enabled ? formatter(&quot;\\x1b[46m&quot;, &quot;\\x1b[49m&quot;) : String,
 bgWhite: enabled ? formatter(&quot;\\x1b[47m&quot;, &quot;\\x1b[49m&quot;) : String,
})

module.exports = createColors()
module.exports.createColors = createColors
</code></pre><h2 id="js-export用法" tabindex="-1"><a class="header-anchor" href="#js-export用法"><span>js export用法</span></a></h2><pre><code class="language-ts">// xxx.js
export const Aa = &quot;a&quot;
export const Bb = 111
export default = [1,2,3]
//下面是用法

import {Aa,Bb} from &#39;./xxx&#39;
</code></pre><p>会把 xxx 中所有的非default导出</p><pre><code class="language-ts">//useLocal.ts
export function useLocalStore(){
    console.log(&quot;useLocal&quot;)
}
//useOnline.ts
export function useOnline(options: ConfigurableWindow = {}) {
  const { isOnline } = useNetwork(options)
  return isOnline
}
//index.ts
export * from &#39;./useLocal&#39;
export * from &#39;./useOnline&#39;
// 无法在外部 import {default} from &quot;xxx&quot;
//下面是用法

import {useLocalStore,useOnline} from &#39;@vueuse/core&#39;
</code></pre>`,13),a=[s];function u(l,i){return o(),t("div",null,a)}const p=e(r,[["render",u],["__file","nodejs.html.vue"]]),c=JSON.parse(`{"path":"/cs-tips/frontend/snippets/nodejs.html","title":"nodejs","lang":"zh-CN","frontmatter":{"description":"nodejs nodejs使用tsx执行命令行 添加jsdoc的type提示 /** @type {import('@sveltejs/kit').Config} */ js https://github.com/vangleer/vangle nodejs颜色文字 js export用法 会把 xxx 中所有的非default导出","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/nodejs.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"nodejs"}],["meta",{"property":"og:description","content":"nodejs nodejs使用tsx执行命令行 添加jsdoc的type提示 /** @type {import('@sveltejs/kit').Config} */ js https://github.com/vangleer/vangle nodejs颜色文字 js export用法 会把 xxx 中所有的非default导出"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-10T18:06:56.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-10T18:06:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nodejs\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-10T18:06:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"nodejs使用tsx执行命令行","slug":"nodejs使用tsx执行命令行","link":"#nodejs使用tsx执行命令行","children":[]},{"level":2,"title":"添加jsdoc的type提示","slug":"添加jsdoc的type提示","link":"#添加jsdoc的type提示","children":[]},{"level":2,"title":"js","slug":"js","link":"#js","children":[]},{"level":2,"title":"nodejs颜色文字","slug":"nodejs颜色文字","link":"#nodejs颜色文字","children":[]},{"level":2,"title":"js export用法","slug":"js-export用法","link":"#js-export用法","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1699639616000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.43,"words":429},"filePathRelative":"cs-tips/frontend/snippets/nodejs.md","localizedDate":"2023年5月25日","autoDesc":true}`);export{p as comp,c as data};
