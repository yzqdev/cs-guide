import{_ as e,c as n,o,a as t}from"./app-CbULZrmi.js";const a={},r=t("h1",{id:"高阶函数",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#高阶函数"},[t("span",null,"高阶函数")])],-1),i=t("pre",null,[t("code",{class:"language-kotlin"},`fun calculate(x: Int, y: Int, operation: (Int, Int) -> Int): Int {  // 1
    return operation(x, y)                                          // 2
}

fun sum(x: Int, y: Int) = x + y                                     // 3

fun main() {
    val sumResult = calculate(4, 5, ::sum)                          // 4
    val mulResult = calculate(4, 5) { a, b -> a * b }               // 5
    println("sumResult $sumResult, mulResult $mulResult")
}
`)],-1),l=t("pre",null,[t("code",{class:"language-kotlin"},`fun operation(): (Int) -> Int {                                     // 1
    return ::square
}

fun square(x: Int) = x * x                                          // 2

fun main() {
    val func = operation()                                          // 3
    println(func(2))                                                // 4
}
`)],-1),c=[r,i,l];function s(u,p){return o(),n("div",null,c)}const m=e(a,[["render",s],["__file","high-order.html.vue"]]),h=JSON.parse('{"path":"/kotlin-tutor/high-order.html","title":"高阶函数","lang":"zh-CN","frontmatter":{"description":"高阶函数","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/high-order.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"高阶函数"}],["meta",{"property":"og:description","content":"高阶函数"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"高阶函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.3,"words":89},"filePathRelative":"kotlin-tutor/high-order.md","localizedDate":"2023年5月22日","autoDesc":true}');export{m as comp,h as data};
