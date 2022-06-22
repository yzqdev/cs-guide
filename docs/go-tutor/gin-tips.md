# gin的使用

## 跨域

```go
package main
import (
    "github.com/gin-gonic/gin"
    "strings"
    "fmt"
    "net/http"
)

func main() {
        r := gin.Default()
        r.Use(Cors()) //开启中间件 允许使用跨域请求
        r.run()
}

func Cors() gin.HandlerFunc {
    return func(c *gin.Context) {
        method := c.Request.Method
        origin := c.Request.Header.Get("Origin") //请求头部
        if origin != "" {
            //接收客户端发送的origin （重要！）
            c.Writer.Header().Set("Access-Control-Allow-Origin", origin) 
            //服务器支持的所有跨域请求的方法
            c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE,UPDATE") 
            //允许跨域设置可以返回其他子段，可以自定义字段
            c.Header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-CSRF-Token, Token,session")
            // 允许浏览器（客户端）可以解析的头部 （重要）
            c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers") 
            //设置缓存时间
            c.Header("Access-Control-Max-Age", "172800") 
            //允许客户端传递校验信息比如 cookie (重要)
            c.Header("Access-Control-Allow-Credentials", "true")                                                                                                                                                                                                                          
        }

        //允许类型校验 
        if method == "OPTIONS" {
            c.JSON(http.StatusOK, "ok!")
        }

        defer func() {
            if err := recover(); err != nil {
                log.Printf("Panic info is: %v", err)
            }
        }()

        c.Next()
    }
}

```

如果端口不一样还需要加端口

```go
 r.Use(cors.New(cors.Config{
  //AllowOrigins: []string{"*"},
  AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8080", "http://www.juejin.cn:8580", "http://45.445.443.170:8585"},
  AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
  AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization", "version"},
  ExposeHeaders:    []string{"Content-Length"},
  AllowCredentials: true,

  MaxAge: 12 * time.Hour,
 }))
```

## 出现js不是module的错误

```txt
Failed to load module script: The server responded with a non-JavaScript MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
```

解决方法

```go
//中间件
func headersByRequestUrl( ) gin.HandlerFunc{
    return func(c *gin.Context) {
        if strings.HasPrefix(c.Request.RequestURI, "/ui/") {
            c.Header("Cache-Control", "public,max-age=86400")
            if strings.HasSuffix(c.Request.RequestURI, ".js") {
                c.Header("Content-Type", "text/javascript")
            }
        }
    }
}


```
