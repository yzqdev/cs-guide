import{_ as t,c as n,o,a as e}from"./app-CbULZrmi.js";const r={},a=e("h1",{id:"书签转json",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#书签转json"},[e("span",null,"书签转json")])],-1),i=e("p",null,"把书签保存为html格式,然后加入",-1),s=e("pre",null,[e("code",{class:"language-html"},`<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"><\/script>
<script>
    $(document).ready(function() {
        var rootTag = $("DL").eq(0);
        getAll(rootTag, json);
        console.log(JSON.stringify(json));
        console.log(json);
 
    })
    var json = [];
 
    function getAll(tag, datas) {
        $.each($(tag).children("dt"), function(index, item) {
            if ($(item).children(":has(a)").length == 0) {
                datas.push({
                    name: $(item).children("a").html(),
                    href: $(item).children("a").attr("href"),
                });
            } else {
                var ssd = {
                    name: $(item).children("h3").html(),
                    children: []
                };
                datas.push(ssd);
                $.each($(item).children("dl"), function(index, item2) {
                    getAll(item2, ssd.children);
                });
            }
        })
    }
<\/script>
`)],-1),c=[a,i,s];function l(d,m){return o(),n("div",null,c)}const p=t(r,[["render",l],["__file","bookmark.html.vue"]]),u=JSON.parse('{"path":"/frontend/chrome-plugins/bookmark.html","title":"书签转json","lang":"zh-CN","frontmatter":{"description":"书签转json 把书签保存为html格式,然后加入","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/chrome-plugins/bookmark.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"书签转json"}],["meta",{"property":"og:description","content":"书签转json 把书签保存为html格式,然后加入"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-27T15:13:04.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-12-27T15:13:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"书签转json\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-12-27T15:13:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1656587275000,"updatedTime":1672153984000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.31,"words":94},"filePathRelative":"frontend/chrome-plugins/bookmark.md","localizedDate":"2022年6月30日","autoDesc":true}');export{p as comp,u as data};
