# astro使用

## 安装sharp失败

```
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
```


## 使用ssr (即查看网站源码,动态数据也可以看到)
必须添加适配器,建议
```js
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";
// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  output: "hybrid",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [mdx(), sitemap()],
  server: {
    port: 8455,
    host: "0.0.0.0",
  },
});

```

对于需要ssr的页面要添加
```
export const prerender = false;
```
且不能使用`getStaticPaths()`,这个函数式ssg使用的,静态页面使用

最后打包`npm run build`
部署`node .\dist\server\entry.mjs`即可

如果打包静态网页的话, `[slug].astro` 必须使用 `getStaticPaths()`获取数据

注意: `getStaticPaths` will only run during build in production, it will not be called during runtime.
也就是说里面不能使用fetch请求数据,要想获取数据只能ssr
