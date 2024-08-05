import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const o={},r=a(`<h1 id="go方法和函数" tabindex="-1"><a class="header-anchor" href="#go方法和函数"><span>go方法和函数</span></a></h1><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数"><span>函数</span></a></h2><p>go的函数和java,c#的方法一样,不过go没有private,public,protected之类的,小写函数名表示私有,大写函数名表示导出,其他包可以访问</p><pre><code class="language-go">func test(x, y int, s string) (int, string) {
    // 类型相同的相邻参数，参数类型可合并。 多返回值必须用括号。
    n := x + y          
    return n, fmt.Sprintf(s, n)
}
</code></pre><h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法"><span>方法</span></a></h2><pre><code class="language-go">type Test struct{}

// 无参数、无返回值
func (t Test) method0() {

}
// 单参数、无返回值
func (t Test) method1(i int) {

}
// 多参数、无返回值
func (t Test) method2(x, y int) {

}
</code></pre><h2 id="方法接收者的值类型和指针类型" tabindex="-1"><a class="header-anchor" href="#方法接收者的值类型和指针类型"><span>方法接收者的值类型和指针类型</span></a></h2><pre><code class="language-go">type User struct {
    age int
}

func (u User) add(v int) {
   u.age += v
}

func main() {
    c := User{age: 100}
    c.add(50)
    fmt.Print( &quot;age=&gt;&quot;+c.age)
}

</code></pre><p>因为接受者是值类型,所以最后user的age是100,而不是150</p><pre><code class="language-go">type User struct {
    age int
}

func (u *User) add(v int) {
   u.age += v
}

func main() {
    c := User{age: 100}
    c.add(50)
    fmt.Print( &quot;age=&gt;&quot;+c.age)
}
</code></pre><p>而这种,因为接受者是引用类型,user.age是150</p>`,11),c=[r];function s(i,d){return n(),t("div",null,c)}const g=e(o,[["render",s],["__file","method.html.vue"]]),l=JSON.parse('{"path":"/go-tutor/basics/method.html","title":"go方法和函数","lang":"zh-CN","frontmatter":{"description":"go方法和函数 函数 go的函数和java,c#的方法一样,不过go没有private,public,protected之类的,小写函数名表示私有,大写函数名表示导出,其他包可以访问 方法 方法接收者的值类型和指针类型 因为接受者是值类型,所以最后user的age是100,而不是150 而这种,因为接受者是引用类型,user.age是150","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/method.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"go方法和函数"}],["meta",{"property":"og:description","content":"go方法和函数 函数 go的函数和java,c#的方法一样,不过go没有private,public,protected之类的,小写函数名表示私有,大写函数名表示导出,其他包可以访问 方法 方法接收者的值类型和指针类型 因为接受者是值类型,所以最后user的age是100,而不是150 而这种,因为接受者是引用类型,user.age是150"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-21T02:04:02.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-21T02:04:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"go方法和函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-21T02:04:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"函数","slug":"函数","link":"#函数","children":[]},{"level":2,"title":"方法","slug":"方法","link":"#方法","children":[]},{"level":2,"title":"方法接收者的值类型和指针类型","slug":"方法接收者的值类型和指针类型","link":"#方法接收者的值类型和指针类型","children":[]}],"git":{"createdTime":1661047442000,"updatedTime":1661047442000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.83,"words":249},"filePathRelative":"go-tutor/basics/method.md","localizedDate":"2022年8月21日","autoDesc":true}');export{g as comp,l as data};
