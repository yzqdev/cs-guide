import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const r={},u=n(`<h1 id="gin的使用" tabindex="-1"><a class="header-anchor" href="#gin的使用"><span>gin的使用</span></a></h1><h2 id="跨域" tabindex="-1"><a class="header-anchor" href="#跨域"><span>跨域</span></a></h2><pre><code class="language-go">package main
import (
    &quot;github.com/gin-gonic/gin&quot;
    &quot;strings&quot;
    &quot;fmt&quot;
    &quot;net/http&quot;
)

func main() {
        r := gin.Default()
        r.Use(Cors()) //开启中间件 允许使用跨域请求
        r.run()
}

func Cors() gin.HandlerFunc {
    return func(c *gin.Context) {
        method := c.Request.Method
        origin := c.Request.Header.Get(&quot;Origin&quot;) //请求头部
        if origin != &quot;&quot; {
            //接收客户端发送的origin （重要！）
            c.Writer.Header().Set(&quot;Access-Control-Allow-Origin&quot;, origin) 
            //服务器支持的所有跨域请求的方法
            c.Header(&quot;Access-Control-Allow-Methods&quot;, &quot;POST, GET, OPTIONS, PUT, DELETE,UPDATE&quot;) 
            //允许跨域设置可以返回其他子段，可以自定义字段
            c.Header(&quot;Access-Control-Allow-Headers&quot;, &quot;Authorization, Content-Length, X-CSRF-Token, Token,session&quot;)
            // 允许浏览器（客户端）可以解析的头部 （重要）
            c.Header(&quot;Access-Control-Expose-Headers&quot;, &quot;Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers&quot;) 
            //设置缓存时间
            c.Header(&quot;Access-Control-Max-Age&quot;, &quot;172800&quot;) 
            //允许客户端传递校验信息比如 cookie (重要)
            c.Header(&quot;Access-Control-Allow-Credentials&quot;, &quot;true&quot;)                                                                                                                                                                                                                          
        }

        //允许类型校验 
        if method == &quot;OPTIONS&quot; {
            c.JSON(http.StatusOK, &quot;ok!&quot;)
        }

        defer func() {
            if err := recover(); err != nil {
                log.Printf(&quot;Panic info is: %v&quot;, err)
            }
        }()

        c.Next()
    }
}

</code></pre><p>如果端口不一样还需要加端口</p><pre><code class="language-go"> r.Use(cors.New(cors.Config{
  //AllowOrigins: []string{&quot;*&quot;},
  AllowOrigins:     []string{&quot;http://localhost:3000&quot;, &quot;http://localhost:8080&quot;, &quot;http://www.juejin.cn:8580&quot;, &quot;http://45.445.443.170:8585&quot;},
  AllowMethods:     []string{&quot;GET&quot;, &quot;POST&quot;, &quot;PUT&quot;, &quot;PATCH&quot;, &quot;DELETE&quot;, &quot;HEAD&quot;},
  AllowHeaders:     []string{&quot;Origin&quot;, &quot;Content-Length&quot;, &quot;Content-Type&quot;, &quot;Authorization&quot;, &quot;version&quot;},
  ExposeHeaders:    []string{&quot;Content-Length&quot;},
  AllowCredentials: true,

  MaxAge: 12 * time.Hour,
 }))
</code></pre><h2 id="出现js不是module的错误" tabindex="-1"><a class="header-anchor" href="#出现js不是module的错误"><span>出现js不是module的错误</span></a></h2><pre><code class="language-txt">Failed to load module script: The server responded with a non-JavaScript MIME type of &quot;text/html&quot;. Strict MIME type checking is enforced for module scripts per HTML spec.
</code></pre><p>解决方法</p><pre><code class="language-go">//中间件
func headersByRequestUrl( ) gin.HandlerFunc{
    return func(c *gin.Context) {
        if strings.HasPrefix(c.Request.RequestURI, &quot;/ui/&quot;) {
            c.Header(&quot;Cache-Control&quot;, &quot;public,max-age=86400&quot;)
            if strings.HasSuffix(c.Request.RequestURI, &quot;.js&quot;) {
                c.Header(&quot;Content-Type&quot;, &quot;text/javascript&quot;)
            }
        }
    }
}


</code></pre>`,9),i=[u];function s(a,c){return o(),e("div",null,i)}const q=t(r,[["render",s],["__file","gin-tips.html.vue"]]),d=JSON.parse('{"path":"/go-tutor/framework/gin-tips.html","title":"gin的使用","lang":"zh-CN","frontmatter":{"description":"gin的使用 跨域 如果端口不一样还需要加端口 出现js不是module的错误 解决方法","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/framework/gin-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"gin的使用"}],["meta",{"property":"og:description","content":"gin的使用 跨域 如果端口不一样还需要加端口 出现js不是module的错误 解决方法"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-26T16:41:58.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-26T16:41:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gin的使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-26T16:41:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"跨域","slug":"跨域","link":"#跨域","children":[]},{"level":2,"title":"出现js不是module的错误","slug":"出现js不是module的错误","link":"#出现js不是module的错误","children":[]}],"git":{"createdTime":1651412607000,"updatedTime":1658853718000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.22,"words":365},"filePathRelative":"go-tutor/framework/gin-tips.md","localizedDate":"2022年5月1日","autoDesc":true}');export{q as comp,d as data};
