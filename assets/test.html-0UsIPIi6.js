import{_ as t,c as e,o as s,d as r}from"./app-CbULZrmi.js";const o={},n=r(`<h1 id="rust-测试" tabindex="-1"><a class="header-anchor" href="#rust-测试"><span>rust 测试</span></a></h1><h2 id="在src内部" tabindex="-1"><a class="header-anchor" href="#在src内部"><span>在src内部</span></a></h2><pre><code class="language-rust">#[cfg(test)]  
mod tests {  
    use super::*;  
  
    #[test]  
    fn one_result() {  
        let query = &quot;duct&quot;;  
        let contents = &quot;\\  
Rust:  
safe, fast, productive.  
Pick three.&quot;;  
  
        assert_eq!(vec![&quot;safe, fast, productive.&quot;], search(query, contents));  
    }  
}
</code></pre><h2 id="tests文件夹" tabindex="-1"><a class="header-anchor" href="#tests文件夹"><span>tests文件夹</span></a></h2><p>在src兄弟路径创建tests文件夹,里面加入hello_test.rs</p><pre><code class="language-rust">#[test]  
fn hello(){  
     println!(&quot;{}&quot;,&quot;hhh&quot;) 
}
</code></pre>`,6),a=[n];function c(i,l){return s(),e("div",null,a)}const d=t(o,[["render",c],["__file","test.html.vue"]]),p=JSON.parse('{"path":"/go-tutor/rust-tutor/test.html","title":"rust 测试","lang":"zh-CN","frontmatter":{"description":"rust 测试 在src内部 tests文件夹 在src兄弟路径创建tests文件夹,里面加入hello_test.rs","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/rust-tutor/test.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"rust 测试"}],["meta",{"property":"og:description","content":"rust 测试 在src内部 tests文件夹 在src兄弟路径创建tests文件夹,里面加入hello_test.rs"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-17T09:02:25.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-05-17T09:02:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"rust 测试\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-17T09:02:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"在src内部","slug":"在src内部","link":"#在src内部","children":[]},{"level":2,"title":"tests文件夹","slug":"tests文件夹","link":"#tests文件夹","children":[]}],"git":{"createdTime":1715935602000,"updatedTime":1715936545000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.21,"words":63},"filePathRelative":"go-tutor/rust-tutor/test.md","localizedDate":"2024年5月17日","autoDesc":true}');export{d as comp,p as data};
