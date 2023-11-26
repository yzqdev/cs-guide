# css 方案

## css in js方案

将 CSS 写在 JS 里。例如使用 styled-components, Emotion 等 CSS in JS 方案。代表组件库有 MUI、Mantine 等。

- <https://styled-components.com/>
- <https://emotion.sh/docs/introduction>
- <https://github.com/cristianbote/goober>
- <https://vanilla-extract.style/>
- <https://github.com/callstack/linaria>
- <https://panda-css.com/>
- <https://github.com/ben-rogerson/twin.macro>
- <https://github.com/vercel/styled-jsx>
- <https://github.com/cssinjs/jss>
- <https://github.com/parcel-bundler/lightningcss>

## pandacss

<https://panda-css.com/>

## emotion 和vite搭配

```
yarn add @emotion/react
yarn add -D @emotion/babel-plugin
```

然后更新vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
});
```

最后,添加tsconfig.json

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```

### 使用方法

使用antd的组件

```tsx
import { Icon } from 'antd';
const DarkHoverStyle = styled(Icon)`
  color: gray;
  :hover {
    color: palevioletred;
  }
`;
```

覆盖样式

```tsx
const GlobalStyle = createGlobalStyle`
  .ant-tooltip-inner {
    background-color: palevioletred;
    color: black;
  }
`;
```

最后使用

```tsx
export default function App() {
  return (
    <FlexBox>
      <GlobalStyle />
      <Tooltip title="Github Icon">
        <DarkHoverStyle type="github" style={{ fontSize: 100 }} />
      </Tooltip>
    </FlexBox>
  );
}
```

## css modules

<https://github.com/css-modules/css-modules>
像vite,webpack 基本都支持cssmodules
用法

```js
import styles from 'index.module.css'
export function Home(){
  <div className={styles.wrap}></div>
}
```

## 基本的css

如less,scss等等

## 原子化css

如tailwindcss,unocss等等

## unocss

审查界面`localhost:5173/__unocss`
