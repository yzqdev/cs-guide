import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const a={},l=o(`<h1 id="代码高亮" tabindex="-1"><a class="header-anchor" href="#代码高亮"><span>代码高亮</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>代码高亮可以使用highlight.js或者prismjs</p></div><h2 id="可以使用highlight-js自己封装组件" tabindex="-1"><a class="header-anchor" href="#可以使用highlight-js自己封装组件"><span>可以使用highlight.js自己封装组件</span></a></h2><p><a href="https://highlightjs.org/" target="_blank" rel="noopener noreferrer">官网</a></p><pre><code class="language-ts">import { ref, h, computed, defineComponent, Plugin, watch } from &quot;vue&quot;;
import hljs from &quot;highlight.js/lib/core&quot;;
import &quot;highlight.js/styles/atom-one-dark.css&quot;;
export function escapeHtml(value: string): string {
  return value
    .replace(/&amp;/g, &quot;&amp;amp;&quot;)
    .replace(/&lt;/g, &quot;&amp;lt;&quot;)
    .replace(/&gt;/g, &quot;&amp;gt;&quot;)
    .replace(/&quot;/g, &quot;&amp;quot;&quot;)
    .replace(/&#39;/g, &quot;&amp;#x27;&quot;);
}

const Highlight = defineComponent({
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: &quot;&quot;,
    },
    autodetect: {
      type: Boolean,
      default: true,
    },
    ignoreIllegals: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const language = ref(props.language);
    watch(
      () =&gt; props.language,
      (newLanguage) =&gt; {
        language.value = newLanguage;
      }
    );

    const autodetect = computed(() =&gt; props.autodetect || !language.value);
    const cannotDetectLanguage = computed(
      () =&gt; !autodetect.value &amp;&amp; !hljs.getLanguage(language.value)
    );

    const className = computed((): string =&gt; {
      if (cannotDetectLanguage.value) {
        return &quot;&quot;;
      } else {
        return \`hljs \${language.value}\`;
      }
    });

    const highlightedCode = computed((): string =&gt; {
      // No idea what language to use, return raw code
      if (cannotDetectLanguage.value) {
        console.warn(
          \`The language &quot;\${language.value}&quot; you specified could not be found.\`
        );
        return escapeHtml(props.code);
      }

      if (autodetect.value) {
        const result = hljs.highlightAuto(props.code);
        language.value = result.language ?? &quot;&quot;;
        return result.value;
      } else {
        const result = hljs.highlight(props.code, {
          language: language.value,
          ignoreIllegals: props.ignoreIllegals,
        });
        return result.value;
      }
    });

    return {
      className,
      highlightedCode,
    };
  },
  render() {
    return h(&quot;pre&quot;, {}, [
      h(&quot;code&quot;, {
        class: this.className,
        innerHTML: this.highlightedCode,
      }),
    ]);
  },
});

// const plugin: Plugin &amp; { component: typeof component } = {
//   install(app) {
//     app.component(&quot;highlightjs&quot;, component);
//   },
//   component,
// };

// export default plugin;
export default Highlight;
</code></pre><h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用"><span>如何使用</span></a></h2><pre><code class="language-html">&lt;div id=&quot;app&quot;&gt;
    &lt;!-- bind to a data property named \`code\` --&gt;
    &lt;highlight autodetect :code=&quot;code&quot; /&gt;
    &lt;!-- or literal code works as well --&gt;
    &lt;highlight language=&#39;javascript&#39; code=&quot;let x = 5;&quot; /&gt;
&lt;/div&gt;
</code></pre><h2 id="prismjs" tabindex="-1"><a class="header-anchor" href="#prismjs"><span>prismjs</span></a></h2><p><a href="https://prismjs.com/" target="_blank" rel="noopener noreferrer">官网</a></p><p>示例</p><iframe style="height:25rem;width:100%;border:1px solid cyan;" src="/cs-guide/prism.html"></iframe><pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    ...
    &lt;link
      href=&quot;https://unpkg.com/prismjs@1.27.0/themes/prism-tomorrow.min.css&quot;
      rel=&quot;stylesheet&quot;
    /&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div&gt;
      &lt;pre&gt;
            &lt;code class=&quot;language-javascript line-numbers&quot;&gt;
import { h, ref } from &#39;vue&#39;

const RedDiv = (_, ctx) =&gt; h(
  &#39;div&#39;,
  {
    class: &#39;red-div&#39;,
  },
  ctx.slots.default()
)
const msg = &#39;Markdown 中的 Vue&#39;
const count = ref(0)
                
            &lt;/code&gt;
        &lt;/pre&gt;
    &lt;/div&gt;
    &lt;script src=&quot;https://unpkg.com/prismjs@1.27.0/components/prism-core.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://unpkg.com/prismjs@1.27.0/plugins/autoloader/prism-autoloader.min.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>`,12),r=[l];function s(i,g){return n(),e("div",null,r)}const u=t(a,[["render",s],["__file","highlight-code.html.vue"]]),h=JSON.parse('{"path":"/frontend/framework/vue/highlight-code.html","title":"代码高亮","lang":"zh-CN","frontmatter":{"description":"代码高亮 提示 代码高亮可以使用highlight.js或者prismjs 可以使用highlight.js自己封装组件 官网 如何使用 prismjs 官网 示例","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/vue/highlight-code.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"代码高亮"}],["meta",{"property":"og:description","content":"代码高亮 提示 代码高亮可以使用highlight.js或者prismjs 可以使用highlight.js自己封装组件 官网 如何使用 prismjs 官网 示例"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"代码高亮\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"可以使用highlight.js自己封装组件","slug":"可以使用highlight-js自己封装组件","link":"#可以使用highlight-js自己封装组件","children":[]},{"level":2,"title":"如何使用","slug":"如何使用","link":"#如何使用","children":[]},{"level":2,"title":"prismjs","slug":"prismjs","link":"#prismjs","children":[]}],"git":{"createdTime":1649576450000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.31,"words":94},"filePathRelative":"frontend/framework/vue/highlight-code.md","localizedDate":"2022年4月10日","autoDesc":true}');export{u as comp,h as data};
