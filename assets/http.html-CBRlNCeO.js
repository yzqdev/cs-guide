import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const r={},a=o(`<h1 id="http编程" tabindex="-1"><a class="header-anchor" href="#http编程"><span>http编程</span></a></h1><h2 id="http服务端" tabindex="-1"><a class="header-anchor" href="#http服务端"><span>http服务端</span></a></h2><pre><code class="language-go">func main() {
 http.HandleFunc(&quot;/go&quot;, myHandler)
 // addr：监听的地址
 // handler：回调函数
 http.ListenAndServe(&quot;127.0.0.1:8000&quot;, nil)
}

// handler函数
func myHandler(w http.ResponseWriter, r *http.Request) {
 fmt.Println(r.RemoteAddr, &quot;连接成功&quot;)
 // 请求方式：GET POST DELETE PUT UPDATE
 fmt.Println(&quot;method:&quot;, r.Method)
 // /go
 fmt.Println(&quot;url:&quot;, r.URL.Path)
 fmt.Println(&quot;header:&quot;, r.Header)
 fmt.Println(&quot;body:&quot;, r.Body)
 // 回复
 w.Write([]byte(&quot;go is the best!&quot;))
}
</code></pre><h2 id="http客户端" tabindex="-1"><a class="header-anchor" href="#http客户端"><span>http客户端</span></a></h2><pre><code class="language-go">import (
    &quot;fmt&quot;
    &quot;io&quot;
    &quot;net/http&quot;
)

func main() {
    //resp, _ := http.Get(&quot;http://www.baidu.com&quot;)
    //fmt.Println(resp)
    resp, _ := http.Get(&quot;https://example.com/&quot;)
    defer resp.Body.Close()
    // 200 OK
    fmt.Println(resp.Status)
    fmt.Println(resp.Header)

    buf := make([]byte, 1024)
    for {
        // 接收服务端信息
        n, err := resp.Body.Read(buf)
        if err != nil &amp;&amp; err != io.EOF {
            fmt.Println(err)
            return
        } else {
            fmt.Println(&quot;读取完毕&quot;)
            res := string(buf[:n])
            fmt.Println(res)
            break
        }
    }
}
</code></pre>`,5),p=[a];function i(h,s){return n(),e("div",null,p)}const c=t(r,[["render",i],["__file","http.html.vue"]]),l=JSON.parse('{"path":"/go-tutor/basics/network/http.html","title":"http编程","lang":"zh-CN","frontmatter":{"description":"http编程 http服务端 http客户端","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/network/http.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"http编程"}],["meta",{"property":"og:description","content":"http编程 http服务端 http客户端"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-19T12:27:31.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-19T12:27:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"http编程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-19T12:27:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"http服务端","slug":"http服务端","link":"#http服务端","children":[]},{"level":2,"title":"http客户端","slug":"http客户端","link":"#http客户端","children":[]}],"git":{"createdTime":1660912051000,"updatedTime":1660912051000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.5,"words":149},"filePathRelative":"go-tutor/basics/network/http.md","localizedDate":"2022年8月19日","autoDesc":true}');export{c as comp,l as data};
