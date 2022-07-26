# fiber教程

## 显示所有路由

```go
func createRouteMap(engine *fiber.App) {
 routes := engine.Stack()
 for _, route := range routes {
  for _, r := range route {
   color.Redln("[debug]", r.Method, r.Path, r.Params)
  }
 }

}
```
