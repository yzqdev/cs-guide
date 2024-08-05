import{_ as t,c as e,o,a as n}from"./app-CbULZrmi.js";const i={},r=n("h1",{id:"scope",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#scope"},[n("span",null,"scope")])],-1),a=n("pre",null,[n("code",{class:"language-kotlin"},` 

 
class ScopeFun {
    private fun customPrint(s: String) {
        print(s.uppercase())
    }
    //let 函数把当前对象作为闭包的 it 参数，返回值是函数里面最后一行，或者指定 return
    //let 函数跟 run 函数的区别是：let 函数在函数内可以通过 it 指代该对象
    @Test
    fun letFun(){
        val empty = "test".let {               // 1
            customPrint(it)                    // 2
            it.isEmpty()                       // 3
        }
        println(" is empty: $empty")
    }
    //run 函数类似于 apply 函数，但是 run 函数返回的是最后一行的值
    @Test
    fun runFun(){
        fun getNullableLength(ns: String?) {
            println("for \\"$ns\\":")
            ns?.run {                                                  // 1
                println("\\tis empty? " + isEmpty())                    // 2
                println("\\tlength = $length")
                length                                                 // 3
            }
        }
        getNullableLength(null)
        getNullableLength("")
        getNullableLength("some string with Kotlin")
    }
    //with函数会把对象结构,可以直接使用对象的属性
    @Test
    fun withFun(){
        val configuration = Configuration(host = "127.0.0.1", port = 9000)

        with(configuration) {
            println("with scope$host:$port")
        }

        // instead of:
        println("\${configuration.host}:\${configuration.port}")
    }
    //apply 函数是指在函数块内可以通过 this 指代该对象，返回值为该对象自己
    @Test
    fun applyFun(){

        val jake = Person()                                     // 1
        val stringDescription = jake.apply {                    // 2
            name = "Jake"                                       // 3
            age = 30

        }.toString()                                            // 4
        println(stringDescription)
    }
//also 对于执行一些将上下文对象作为参数的操作很有用。 对于需要引用对象而不是其属性与函数的操作，或者不想屏蔽来自外部作用域的 this 引用时，请使用 als
    @Test
    fun alsoFun(){
        val jake = Person("Jake", 30, "Android developer")   // 1
            .also {                                          // 2
                writeCreationLog(it)                         // 3
            }
        println(jake)
    }
}
`)],-1),s=[r,a];function p(l,c){return o(),e("div",null,s)}const m=t(i,[["render",p],["__file","scope-fun.html.vue"]]),d=JSON.parse('{"path":"/kotlin-tutor/scope-fun.html","title":"scope","lang":"zh-CN","frontmatter":{"description":"scope","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/scope-fun.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"scope"}],["meta",{"property":"og:description","content":"scope"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"scope\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.11,"words":332},"filePathRelative":"kotlin-tutor/scope-fun.md","localizedDate":"2023年5月22日","autoDesc":true}');export{m as comp,d as data};
