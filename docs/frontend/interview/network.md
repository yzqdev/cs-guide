# 网络与浏览器

前端面试常考的网络、浏览器渲染、性能优化等知识点。

## HTTP

### HTTP 1.0 / 1.1 / 2.0 / 3.0

| 版本 | 特点 |
|------|------|
| HTTP 1.0 | 每次请求建立新连接 |
| HTTP 1.1 | 持久连接（Keep-Alive）、管道化 |
| HTTP 2.0 | 多路复用、头部压缩、服务器推送、二进制帧 |
| HTTP 3.0 | 基于 QUIC（UDP）、0-RTT 连接 |

### HTTP 常见状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 301 | 永久重定向 |
| 302 | 临时重定向 |
| 304 | 未修改（使用缓存） |
| 400 | 请求错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 未找到 |
| 500 | 服务器内部错误 |
| 502 | 网关错误 |
| 503 | 服务不可用 |

### HTTP 方法

| 方法 | 说明 | 幂等 | 安全 |
|------|------|------|------|
| GET | 获取资源 | 是 | 是 |
| POST | 创建资源 | 否 | 否 |
| PUT | 更新资源（全量） | 是 | 否 |
| PATCH | 更新资源（部分） | 否 | 否 |
| DELETE | 删除资源 | 是 | 否 |

### 请求头和响应头

| 头部 | 说明 |
|------|------|
| `Content-Type` | 请求/响应体的 MIME 类型 |
| `Authorization` | 认证凭据 |
| `Cache-Control` | 缓存策略 |
| `Cookie` | 携带 Cookie |
| `Access-Control-Allow-Origin` | CORS 允许的源 |
| `ETag` | 资源的唯一标识 |
| `Last-Modified` | 资源最后修改时间 |

---

## HTTPS

### 加密过程

1. 客户端发起 HTTPS 请求
2. 服务器返回证书（公钥）
3. 客户端验证证书
4. 客户端生成随机密钥，用公钥加密发送
5. 服务器用私钥解密，得到对称密钥
6. 双方使用对称密钥加密通信

### 证书验证

- CA 签发的数字证书
- 验证域名、有效期、签名

---

## TCP

### 三次握手

```
客户端 → 服务器：SYN（seq=x）
服务器 → 客户端：SYN+ACK（seq=y, ack=x+1）
客户端 → 服务器：ACK（ack=y+1）
```

### 四次挥手

```
客户端 → 服务器：FIN
服务器 → 客户端：ACK
服务器 → 客户端：FIN
客户端 → 服务器：ACK
```

### TCP vs UDP

| 特性 | TCP | UDP |
|------|-----|-----|
| 连接 | 面向连接 | 无连接 |
| 可靠性 | 可靠传输 | 不保证 |
| 速度 | 较慢 | 较快 |
| 用途 | HTTP、文件传输 | 视频、游戏、DNS |

---

## 浏览器渲染

### 渲染流程

1. **解析 HTML** → 构建 DOM 树
2. **解析 CSS** → 构建 CSSOM 树
3. **合并** → Render 树
4. **布局（Layout）** → 计算每个节点的位置和大小
5. **绘制（Paint）** → 绘制像素
6. **合成（Composite）** → 合成到屏幕

### 关键渲染路径

```
HTML → DOM → Render Tree → Layout → Paint → Composite
CSS  → CSSOM ↗
```

### 重排（Reflow）与重绘（Repaint）

| 概念 | 说明 | 触发操作 |
|------|------|----------|
| 重排 | 元素位置/尺寸变化 | 增删 DOM、窗口 resize、`offsetWidth` 变化 |
| 重绘 | 外观变化，不影响布局 | `color`、`background`、`visibility` |

**优化**：批量修改 DOM、使用 `transform` 代替 `top/left`、使用 `documentFragment`

### async vs defer

```html
<script src="app.js" async></script>     <!-- 下载完立即执行，不保证顺序 -->
<script src="app.js" defer></script>     <!-- HTML 解析完后按顺序执行 -->
```

---

## 缓存

### 强缓存

| 头部 | 说明 |
|------|------|
| `Cache-Control: max-age=31536000` | 缓存有效期（秒） |
| `Expires: Thu, 01 Dec 2024 16:00:00 GMT` | 过期时间（绝对时间，已过时） |

强缓存命中：直接使用缓存，不发送请求。

### 协商缓存

| 头部 | 说明 |
|------|------|
| `Last-Modified` / `If-Modified-Since` | 文件最后修改时间 |
| `ETag` / `If-None-Match` | 文件唯一标识 |

协商缓存：发送请求到服务器验证，未修改返回 304。

### 缓存策略

```
1. 检查强缓存 → 命中则直接使用
2. 强缓存未命中 → 发起协商缓存
3. 协商缓存命中（304）→ 使用缓存
4. 协商缓存未命中 → 返回新资源
```

---

## 跨域

### 同源策略

协议、域名、端口三者都相同才是同源。

### 解决方案

| 方案 | 说明 |
|------|------|
| CORS | 服务端设置 `Access-Control-Allow-Origin` |
| 代理 | 开发服务器代理、Nginx 反向代理 |
| JSONP | 利用 `<script>` 标签不受同源策略限制（只支持 GET） |
| WebSocket | 不受同源策略限制 |

### CORS 详解

```
简单请求：直接发送，带上 Origin 头
非简单请求：先发 OPTIONS 预检请求，确认允许后再发实际请求
```

---

## 安全

### XSS（跨站脚本攻击）

攻击者注入恶意脚本到页面中。

**防御**：
- 输入过滤和转义
- CSP（Content Security Policy）
- HttpOnly Cookie

### CSRF（跨站请求伪造）

攻击者利用用户已登录的身份发起请求。

**防御**：
- CSRF Token
- SameSite Cookie
- 验证 Referer/Origin

---

## 性能优化

### 加载优化

- 代码分割（Code Splitting）
- 懒加载（Lazy Load）
- 预加载（Preload）
- 图片优化（WebP、响应式图片）
- CDN 加速

### 渲染优化

- 减少 DOM 操作
- 使用 `transform` 做动画
- 避免强制同步布局
- 使用 `requestAnimationFrame`
- 虚拟列表

### 网络优化

- HTTP/2 多路复用
- 资源压缩（Gzip、Brotli）
- 缓存策略
- DNS 预解析

### Web Vitals

| 指标 | 说明 | 目标 |
|------|------|------|
| LCP | 最大内容绘制 | < 2.5s |
| FID | 首次输入延迟 | < 100ms |
| CLS | 累积布局偏移 | < 0.1 |
| FCP | 首次内容绘制 | < 1.8s |
| TTI | 可交互时间 | < 3.8s |
