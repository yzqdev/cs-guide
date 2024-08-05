import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const o={},c=n(`<h1 id="csharp委托" tabindex="-1"><a class="header-anchor" href="#csharp委托"><span>csharp委托</span></a></h1><p><a href="https://www.jianshu.com/p/7aff7509fe2a" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/7aff7509fe2a</a></p><p>委托就是把一个方法传入另一个法，类似javascript的回调函数。下面详细举例。先来看一段javascript代码</p><pre><code class="language-js">function aaa(){

    alert(&quot;aaa&quot;);

}

function bbb(callback){

      alert(&quot;bbb&quot;);

      callback();

}

//调用

bbb(aaa);
</code></pre><p>再看c#委托</p><pre><code class="language-csharp">static void Main(string[] args)

        {

            bbb(aaa);

            Console.ReadKey();

        }

        public static void aaa()

        {

            Console.WriteLine(&quot;aaa&quot;);

        }

        public static void bbb(Action action)

        {

            Console.WriteLine(&quot;bbb&quot;);

            action();

        }
</code></pre>`,6),r=[c];function s(i,p){return a(),t("div",null,r)}const l=e(o,[["render",s],["__file","delegete.html.vue"]]),h=JSON.parse('{"path":"/csharp-tutor/basics/delegete.html","title":"csharp委托","lang":"zh-CN","frontmatter":{"description":"csharp委托 https://www.jianshu.com/p/7aff7509fe2a 委托就是把一个方法传入另一个法，类似javascript的回调函数。下面详细举例。先来看一段javascript代码 再看c#委托","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/basics/delegete.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"csharp委托"}],["meta",{"property":"og:description","content":"csharp委托 https://www.jianshu.com/p/7aff7509fe2a 委托就是把一个方法传入另一个法，类似javascript的回调函数。下面详细举例。先来看一段javascript代码 再看c#委托"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"csharp委托\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1647861419000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.3,"words":89},"filePathRelative":"csharp-tutor/basics/delegete.md","localizedDate":"2022年3月21日","autoDesc":true}');export{l as comp,h as data};
