# 技巧

## react vite使用装饰器

先安装babel插件`@babel/plugin-proposal-decorators`,`@babel/plugin-proposal-class-properties`
在vite.config.ts加入下面这个

```js

  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
  ],
```

在tsconfig.json配置

```
   "experimentalDecorators": true,
```

## react vite导入图片

::: warning
第二种方法不能使用`<img src='@/assets/vite.svg'/>`这样的写法
:::

- 第一种方法

<https://vitejs.dev/guide/assets.html>

```js
import viteImg from '@/assets/vite.svg'


<img src={viteImg}/>
```

- 第二种

```js
 function getImageUrl(url) {
    return new URL(url, import.meta.url).href
  }

  // 然后,这里不能使用`@/assets/react.svg

   <img src={getImageUrl('../../assets/react.svg')}/>
```

- 第三种

在assets文件夹加一个index.ts,并把图片导出

比如我的assets文件夹有一个vite.svg,那index.ts就是

```ts
import reactSvg from './react.svg'


export {
  reactSvg
}

```

之后再我们的react组件中,添加

```tsx
import * as svgAssets from '@/assets/index'

export function ImgWrap(){
  return <div>   <img src={svgAssets.reactSvg}/></div>
}
```

## 解决React中遇到的 “xxxx”不能用作 JSX 组件 问题

是`@types/react`和`@types/react-dom`版本不对,重新安装即可


## `Uncaught ReferenceError: global is not defined`

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
+  define: {
+    global: 'window',
+  }
})

```