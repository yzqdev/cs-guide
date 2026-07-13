# Go HTTP 编程

[官方文档](https://pkg.go.dev/net/http)

## HTTP 服务端

### 基本 HTTP 服务

```go
package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Go!")
}

func main() {
	// 注册路由
	http.HandleFunc("/", helloHandler)
	http.HandleFunc("/hello", helloHandler)

	// 启动服务
	fmt.Println("服务启动在 :8080")
	http.ListenAndServe(":8080", nil)
}
```

### 处理请求

```go
func handler(w http.ResponseWriter, r *http.Request) {
	// 请求信息
	fmt.Println("Method:", r.Method)       // GET/POST
	fmt.Println("URL:", r.URL.Path)        // /path
	fmt.Println("Query:", r.URL.RawQuery)  // ?key=value
	fmt.Println("Header:", r.Header)       // 请求头

	// 读取 body
	body, _ := io.ReadAll(r.Body)
	fmt.Println("Body:", string(body))

	// 设置响应头
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// 返回响应
	w.Write([]byte(`{"status": "ok"}`))
}
```

### 路由处理

```go
func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "首页")
	})

	http.HandleFunc("/user", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			fmt.Fprintf(w, "获取用户列表")
		case "POST":
			fmt.Fprintf(w, "创建用户")
		case "PUT":
			fmt.Fprintf(w, "更新用户")
		case "DELETE":
			fmt.Fprintf(w, "删除用户")
		default:
			http.Error(w, "Method not allowed", 405)
		}
	})

	http.HandleFunc("/user/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/user/")
		fmt.Fprintf(w, "用户ID: %s", id)
	})

	http.ListenAndServe(":8080", nil)
}
```

### 中间件

```go
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		fmt.Printf("[%s] %s %s\n", 
			r.Method, r.URL.Path, time.Since(start))
		next.ServeHTTP(w, r)
	})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", homeHandler)
	
	// 应用中间件
	http.ListenAndServe(":8080", loggingMiddleware(mux))
}
```

### 静态文件服务

```go
func main() {
	// 提供静态文件目录
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.ListenAndServe(":8080", nil)
}
```

## HTTP 客户端

### 基本请求

```go
func main() {
	// GET 请求
	resp, err := http.Get("https://api.example.com/data")
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	fmt.Println("Status:", resp.Status)     // 200 OK
	fmt.Println("Body:", string(body))
}
```

### POST 请求

```go
func main() {
	// POST JSON
	data := []byte(`{"name": "张三", "age": 25}`)
	resp, err := http.Post(
		"https://api.example.com/users",
		"application/json",
		bytes.NewBuffer(data),
	)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	fmt.Println(string(body))
}
```

### 自定义请求

```go
func main() {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	req, _ := http.NewRequest("GET", "https://api.example.com", nil)
	req.Header.Set("Authorization", "Bearer token123")
	req.Header.Set("User-Agent", "Go-Client/1.0")

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	fmt.Println(string(body))
}
```

## 第三方框架

### Gin

```go
import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.GET("/user/:id", func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(200, gin.H{"id": id})
	})

	r.Run(":8080")
}
```

### Echo

```go
import "github.com/labstack/echo/v4"

func main() {
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello, Echo!")
	})

	e.GET("/user/:id", func(c echo.Context) error {
		id := c.Param("id")
		return c.JSON(200, map[string]string{"id": id})
	})

	e.Start(":8080")
}
```
