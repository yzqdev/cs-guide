import{_ as e,c as t,o,d as a}from"./app-CbULZrmi.js";const n={},i=a(`<h1 id="代码片段" tabindex="-1"><a class="header-anchor" href="#代码片段"><span>代码片段</span></a></h1><h2 id="contentalpha" tabindex="-1"><a class="header-anchor" href="#contentalpha"><span>contentAlpha</span></a></h2><p>The &quot;Emphasis and content alpha&quot; section in the Migrate from Material 2 to Material 3 in Compose details the API changes.</p><p>material2</p><pre><code class="language-kotlin">
import androidx.compose.material.ContentAlpha
import androidx.compose.material.LocalContentAlpha

// High emphasis
CompositionLocalProvider(LocalContentAlpha provides ContentAlpha.high) {
    Icon(…)
}
// Medium emphasis
CompositionLocalProvider(LocalContentAlpha provides ContentAlpha.medium) {
    Icon(…)
}
// Disabled emphasis
CompositionLocalProvider(LocalContentAlpha provides ContentAlpha.disabled) {
    Icon(…)
}
</code></pre><p>material3</p><pre><code class="language-kotlin">import androidx.compose.material3.LocalContentColor

// High emphasis
CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onSurface) {
    Icon(…)
}
// Medium emphasis
CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onSurfaceVariant) {
    Icon(…)
}
// Disabled emphasis
CompositionLocalProvider(LocalContentColor provides MaterialTheme.colorScheme.onSurface.copy(alpha = 0.38f)) {
    Icon(…)
}
</code></pre>`,7),r=[i];function p(c,l){return o(),t("div",null,r)}const m=e(n,[["render",p],["__file","snippets.html.vue"]]),h=JSON.parse('{"path":"/kotlin-tutor/compose/snippets.html","title":"代码片段","lang":"zh-CN","frontmatter":{"description":"代码片段 contentAlpha The \\"Emphasis and content alpha\\" section in the Migrate from Material 2 to Material 3 in Compose details the API changes. material2 material3","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/compose/snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"代码片段"}],["meta",{"property":"og:description","content":"代码片段 contentAlpha The \\"Emphasis and content alpha\\" section in the Migrate from Material 2 to Material 3 in Compose details the API changes. material2 material3"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-26T13:31:44.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-01-26T13:31:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"代码片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-26T13:31:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"contentAlpha","slug":"contentalpha","link":"#contentalpha","children":[]}],"git":{"createdTime":1706275904000,"updatedTime":1706275904000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.29,"words":86},"filePathRelative":"kotlin-tutor/compose/snippets.md","localizedDate":"2024年1月26日","autoDesc":true}');export{m as comp,h as data};
