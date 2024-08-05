import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const r={},s=o(`<h1 id="一些小问题" tabindex="-1"><a class="header-anchor" href="#一些小问题"><span>一些小问题</span></a></h1><ul><li><a href="https://stackoverflow.com/questions/63285895/make-prettier-less-uglier-prevent-split-tags" target="_blank" rel="noopener noreferrer">prettier格式html</a> 新建一个<code>.prettierrc</code> 添加如下内容</li></ul><pre><code class="language-json">{
  &quot;semi&quot;: false,
  &quot;singleQuote&quot;: true,
  &quot;printWidth&quot;: 600,
  &quot;htmlWhitespaceSensitivity&quot;: &quot;ignore&quot;

}

</code></pre><p><a href="https://colorhunt.co/" target="_blank" rel="noopener noreferrer">https://colorhunt.co/</a></p><h2 id="谷歌浏览器书签转json" tabindex="-1"><a class="header-anchor" href="#谷歌浏览器书签转json"><span>谷歌浏览器书签转json</span></a></h2><p>目前书签导出大部分都是html,此代码可以将书签提取为json格式。</p><p>1：导出书签为html文件</p><p>2：在文件中加入以下代码，可自行根据需要编辑修改</p><p>3：在控制台第一行复制json文本</p><pre><code class="language-html">&lt;script src=&quot;http://libs.baidu.com/jquery/2.0.0/jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
    $(document).ready(function() {
        var rootTag = $(&quot;DL&quot;).eq(0);
        getAll(rootTag, json);
        console.log(JSON.stringify(json));
        console.log(json);

    })
    var json = [];

    function getAll(tag, datas) {
        $.each($(tag).children(&quot;dt&quot;), function(index, item) {
            if ($(item).children(&quot;:has(a)&quot;).length == 0) {
                datas.push({
                    name: $(item).children(&quot;a&quot;).html(),
                    href: $(item).children(&quot;a&quot;).attr(&quot;href&quot;),
                });
            } else {
                var ssd = {
                    name: $(item).children(&quot;h3&quot;).html(),
                    children: []
                };
                datas.push(ssd);
                $.each($(item).children(&quot;dl&quot;), function(index, item2) {
                    getAll(item2, ssd.children);
                });
            }
        })
    }
&lt;/script&gt;
</code></pre><h2 id="编写nodejs-命令行" tabindex="-1"><a class="header-anchor" href="#编写nodejs-命令行"><span>编写nodejs 命令行</span></a></h2><p>推荐使用pnpm</p><p>在项目目录执行</p><pre><code>pnpm link --global
</code></pre><p>如果要删除全局链接,要使用</p><pre><code>pnpm uninstall --global &lt;package&gt;

\`pnpm unlink\` only removes the links in your current directory
</code></pre>`,16),a=[s];function i(l,p){return n(),e("div",null,a)}const d=t(r,[["render",i],["__file","tips.html.vue"]]),h=JSON.parse('{"path":"/frontend/tips.html","title":"一些小问题","lang":"zh-CN","frontmatter":{"order":2,"description":"一些小问题 prettier格式html 新建一个.prettierrc 添加如下内容 https://colorhunt.co/ 谷歌浏览器书签转json 目前书签导出大部分都是html,此代码可以将书签提取为json格式。 1：导出书签为html文件 2：在文件中加入以下代码，可自行根据需要编辑修改 3：在控制台第一行复制json文本 编写node...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"一些小问题"}],["meta",{"property":"og:description","content":"一些小问题 prettier格式html 新建一个.prettierrc 添加如下内容 https://colorhunt.co/ 谷歌浏览器书签转json 目前书签导出大部分都是html,此代码可以将书签提取为json格式。 1：导出书签为html文件 2：在文件中加入以下代码，可自行根据需要编辑修改 3：在控制台第一行复制json文本 编写node..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-18T14:23:02.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-10-18T14:23:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一些小问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-18T14:23:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"谷歌浏览器书签转json","slug":"谷歌浏览器书签转json","link":"#谷歌浏览器书签转json","children":[]},{"level":2,"title":"编写nodejs 命令行","slug":"编写nodejs-命令行","link":"#编写nodejs-命令行","children":[]}],"git":{"createdTime":1656587275000,"updatedTime":1697638982000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":5}]},"readingTime":{"minutes":0.81,"words":244},"filePathRelative":"frontend/tips.md","localizedDate":"2022年6月30日","autoDesc":true}');export{d as comp,h as data};
