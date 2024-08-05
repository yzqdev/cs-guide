import{_ as t,c as e,o as n,d as a}from"./app-CbULZrmi.js";const o={},r=a(`<h1 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制"><span>流程控制</span></a></h1><h2 id="使用if" tabindex="-1"><a class="header-anchor" href="#使用if"><span>使用if</span></a></h2><pre><code class="language-go">func main() {
   /* 定义局部变量 */
   var a int = 100
   var b int = 200
   /* 判断条件 */
   if a == 100 {
       /* if 条件语句为 true 执行 */
       if b == 200 {
          /* if 条件语句为 true 执行 */
          fmt.Printf(&quot;a 的值为 100 ， b 的值为 200\\n&quot; )
       }
   }
   fmt.Printf(&quot;a 值为 : %d\\n&quot;, a )
   fmt.Printf(&quot;b 值为 : %d\\n&quot;, b )
}  
</code></pre><h2 id="switch语句" tabindex="-1"><a class="header-anchor" href="#switch语句"><span>switch语句</span></a></h2><pre><code class="language-go">
func main() {
   /* 定义局部变量 */
   var grade string = &quot;B&quot;
   var marks int = 90

   switch marks {
      case 90: grade = &quot;A&quot;
      case 80: grade = &quot;B&quot;
      case 50,60,70 : grade = &quot;C&quot;
      default: grade = &quot;D&quot;  
   }

   switch {
      case grade == &quot;A&quot; :
         fmt.Printf(&quot;优秀!\\n&quot; )     
      case grade == &quot;B&quot;, grade == &quot;C&quot; :
         fmt.Printf(&quot;良好\\n&quot; )      
      case grade == &quot;D&quot; :
         fmt.Printf(&quot;及格\\n&quot; )      
      case grade == &quot;F&quot;:
         fmt.Printf(&quot;不及格\\n&quot; )
      default:
         fmt.Printf(&quot;差\\n&quot; )
   }
   fmt.Printf(&quot;你的等级是 %s\\n&quot;, grade )
}

</code></pre><h3 id="type-switch" tabindex="-1"><a class="header-anchor" href="#type-switch"><span>type-switch</span></a></h3><pre><code class="language-go">switch x.(type){
    case type:
       statement(s)      
    case type:
       statement(s)
    /* 你可以定义任意个数的case */
    default: /* 可选 */
       statement(s)
}  
</code></pre><h2 id="for" tabindex="-1"><a class="header-anchor" href="#for"><span>for</span></a></h2><p>for可以</p><ul><li>遍历array和slice</li><li>遍历key为整型递增的map</li><li>遍历string</li></ul><pre><code class="language-go">for i, n := 0, len(s); i &lt; n; i++ { // 常见的 for 循环，支持初始化语句。
    println(s[i])
}
for a := 0; a &lt; 10; a++ {
    fmt.Printf(&quot;a 的值为: %d\\n&quot;, a)
}
// for range
func main() {
    s := &quot;abc&quot;
    // 忽略 2nd value，支持 string/array/slice/map。
    for i := range s {
        println(s[i])
    }
    // 忽略 index。
    for _, c := range s {
        println(c)
    }
    // 忽略全部返回值，仅迭代。
    for range s {

    }

    m := map[string]int{&quot;a&quot;: 1, &quot;b&quot;: 2}
    // 返回 (key, value)。
    for k, v := range m {
        println(k, v)
    }
}  
</code></pre>`,11),i=[r];function s(c,l){return n(),e("div",null,i)}const d=t(o,[["render",s],["__file","flow-control.html.vue"]]),p=JSON.parse('{"path":"/go-tutor/basics/flow-control.html","title":"流程控制","lang":"zh-CN","frontmatter":{"description":"流程控制 使用if switch语句 type-switch for for可以 遍历array和slice 遍历key为整型递增的map 遍历string","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/flow-control.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"流程控制"}],["meta",{"property":"og:description","content":"流程控制 使用if switch语句 type-switch for for可以 遍历array和slice 遍历key为整型递增的map 遍历string"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-19T12:27:31.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-19T12:27:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"流程控制\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-19T12:27:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用if","slug":"使用if","link":"#使用if","children":[]},{"level":2,"title":"switch语句","slug":"switch语句","link":"#switch语句","children":[{"level":3,"title":"type-switch","slug":"type-switch","link":"#type-switch","children":[]}]},{"level":2,"title":"for","slug":"for","link":"#for","children":[]}],"git":{"createdTime":1660912051000,"updatedTime":1660912051000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.12,"words":337},"filePathRelative":"go-tutor/basics/flow-control.md","localizedDate":"2022年8月19日","autoDesc":true}');export{d as comp,p as data};
