import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const r={},a=o(`<h1 id="vue3使用jsx" tabindex="-1"><a class="header-anchor" href="#vue3使用jsx"><span>vue3使用jsx</span></a></h1><h2 id="写法" tabindex="-1"><a class="header-anchor" href="#写法"><span>写法</span></a></h2><p>有两种写法 第一种写法</p><pre><code class="language-tsx">import {defineComponent} from &#39;vue&#39;
 
export default defineComponent({
 
    setup(){
 
        // 这里使用（）不用写return  如果是{}则需要写
        // 内部只能有一个跟标签，你可以使用&lt;&gt;&lt;/&gt;
        return ()=&gt;(
            &lt;div&gt;hello tsx&lt;/div&gt;
        )
    }
 
 
})
</code></pre><p>第二种使用render(options语法)</p><pre><code class="language-tsx">import {defineComponent} from &#39;vue&#39;

export default defineComponent({

   setup(){
       
       // 这里主要书写你的js代码，生命周期，状态等
       // 但是需要将状态方法暴露出去

       let a = ref&lt;string&gt;(&#39;12&#39;)
   
       return {a}    
   },
   render(){
       return (
           &lt;div&gt;{this.a}&lt;div&gt;
       )
   }

})
</code></pre>`,6),s=[a];function i(d,p){return n(),t("div",null,s)}const l=e(r,[["render",i],["__file","vue3-jsx.html.vue"]]),u=JSON.parse('{"path":"/frontend/framework/vue/vue3-jsx.html","title":"vue3使用jsx","lang":"zh-CN","frontmatter":{"description":"vue3使用jsx 写法 有两种写法 第一种写法 第二种使用render(options语法)","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/vue/vue3-jsx.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vue3使用jsx"}],["meta",{"property":"og:description","content":"vue3使用jsx 写法 有两种写法 第一种写法 第二种使用render(options语法)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T03:14:18.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-19T03:14:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue3使用jsx\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T03:14:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"写法","slug":"写法","link":"#写法","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1700363658000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.42,"words":126},"filePathRelative":"frontend/framework/vue/vue3-jsx.md","localizedDate":"2023年6月25日","autoDesc":true}');export{l as comp,u as data};
