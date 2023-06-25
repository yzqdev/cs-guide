# 使用反向代理

## 安装http-proxy-middleware

```js
import  { createProxyMiddleware} from 'http-proxy-middleware';

// 然后在bootstrap方法加上
//跟vite,vue-cli用法一样
app.use('/mihoyo', createProxyMiddleware({ target: 'https://bbs-api.mihoyo.com', changeOrigin: true ,pathRewrite: {
    '^/mihoyo': '/', // rewrite path
  },}))
```
