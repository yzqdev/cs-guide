# ssr部署

## astro

三种模式
`output`设置为`"hybrid" | "static" | "server"`

static是纯静态html 即为ssg模式,此时用不上ssr, 只需要`astro build`然后把dist目录扔到服务器用nginx代理一下就行(注意动态路由必须使用`getStaticPaths`)

hybrid指的是静态html和动态html混合的,此时需要ssr,同时动态页面需要设置prerender为false,不能使用`getStaticPaths`,部署就是`astro build`然后`node .\dist\server\entry.mjs`就好了

server指的是纯ssr,没有html,部署就是`astro build`然后`node .\dist\server\entry.mjs`就好了

## nuxt部署

设置ssr为true即为服务端渲染,设置为false生成为spa格式

`nuxt build`,这种需要`node .output/server/index.mjs`启动,注意不要在`onBeforeMounted`请求数据,不然无法渲染出请求数据的html,要使用[文档](https://nuxt.com/docs/getting-started/data-fetching)里面的方法

`nuxt generate`这是打包静态文件,把nuxt当做ssg来使用,把生成的html文件夹扔到服务器,用nginx代理即可

## next部署


`output: 'standalone'`这种打包需要`node .\.next\standalone\server.js`来运行,如果图片无法访问,需要把根目录的public和static复制到.next/standalone文件夹去, 服务器上只需要standalone文件夹即可,node standalone/server.js`运行
```
public -> .next/standalone/public
.next/static -> .next/standalone/static//这个是为了防止_next找不到
```
https://nextjs.org/docs/pages/api-reference/next-config-js/output

:::
 This minimal server does not copy the `public` or `.next/static` folders by default as these should ideally be handled by a CDN instead, although these folders can be copied to the `standalone/public` and `standalone/.next/static` folders manually, after which `server.js` file will serve these automatically
:::

`output: 'export'`,这种就是把next当做ssg来用,打包静态html,用nginx代理一下就行

`output: undefined`,不配置output,这种是传统模式,`next build`之后运行`next start`启动即可

推荐配置(next.config.mjs)
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  assetPrefix: '/',
  reactStrictMode: true,
};

export default nextConfig;
```

 