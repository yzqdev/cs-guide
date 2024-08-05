import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const o={},c=a(`<h1 id="类" tabindex="-1"><a class="header-anchor" href="#类"><span>类</span></a></h1><h2 id="kotlin-扩展" tabindex="-1"><a class="header-anchor" href="#kotlin-扩展"><span>Kotlin 扩展</span></a></h2><pre><code class="language-kotlin">open class Shape

class Rectangle: Shape()

fun Shape.getName() = &quot;Shape&quot;

fun Rectangle.getName() = &quot;Rectangle&quot;

fun printClassName(s: Shape) {
    println(s.getName())
}    

printClassName(Rectangle())
fun main(arg:Array&lt;String&gt;){
    var rect=Rectangle()
    rect.getName()
}
</code></pre><p>像compose中的<code>18.dp</code>就是拓展</p><pre><code class="language-kotlin">val Float.dp
  get() = TypedValue.applyDimension(
    TypedValue.COMPLEX_UNIT_DIP,
    this,
    Resources.getSystem().displayMetrics
  )

...

val RADIUS = 200f.dp
</code></pre>`,5),r=[c];function l(i,s){return n(),t("div",null,r)}const d=e(o,[["render",l],["__file","class.html.vue"]]),m=JSON.parse('{"path":"/kotlin-tutor/class.html","title":"类","lang":"zh-CN","frontmatter":{"description":"类 Kotlin 扩展 像compose中的18.dp就是拓展","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/class.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"类"}],["meta",{"property":"og:description","content":"类 Kotlin 扩展 像compose中的18.dp就是拓展"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"类\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Kotlin 扩展","slug":"kotlin-扩展","link":"#kotlin-扩展","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.19,"words":56},"filePathRelative":"kotlin-tutor/class.md","localizedDate":"2023年5月22日","autoDesc":true}');export{d as comp,m as data};
