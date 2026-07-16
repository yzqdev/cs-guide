# Babel 与 SWC

> Babel 和 SWC 是 JavaScript/TypeScript 的代码转换工具，将现代 JS/TS 转换为兼容性更好的代码。

## Babel

### 核心概念

| 概念 | 说明 |
|------|------|
| 解析（Parse） | 将源码解析为 AST |
| 转换（Transform） | 遍历 AST 并应用插件进行转换 |
| 生成（Generate） | 将转换后的 AST 生成代码 |

### 安装

```bash
pnpm add -D @babel/core @babel/cli @babel/preset-env
pnpm add -D @babel/preset-react   # React 支持
pnpm add -D @babel/preset-typescript  # TypeScript 支持
```

### 配置文件

```json
// babel.config.json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not dead"]
      },
      "useBuiltIns": "usage",
      "corejs": 3
    }],
    ["@babel/preset-react", {
      "runtime": "automatic"
    }],
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

### 常用命令

```bash
# 转换单个文件
npx babel src/index.js --out-file dist/index.js

# 转换整个目录
npx babel src --out-dir dist

# 监听文件变化
npx babel src --out-dir dist --watch
```

### 编写 Babel 插件

```ts
// babel-plugin-remove-console.js
module.exports = function () {
  return {
    visitor: {
      CallExpression(path) {
        if (
          path.node.callee.type === 'MemberExpression' &&
          path.node.callee.object.name === 'console' &&
          ['log', 'warn', 'error'].includes(path.node.callee.property.name)
        ) {
          path.remove()
        }
      }
    }
  }
}
```

### @babel/standalone

浏览器端使用 Babel：

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
  const greet = (name) => `Hello, ${name}!`;
  console.log(greet('Babel'));
</script>
```

## SWC

> SWC 是一个基于 Rust 的超快速 JavaScript/TypeScript 编译器。

### 安装

```bash
pnpm add -D @swc/core @swc/cli
```

### swcrc 配置

```json
// .swcrc
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": true
    },
    "target": "es2020",
    "transform": {
      "react": {
        "runtime": "automatic"
      }
    },
    "paths": {
      "@/*": ["./src/*"]
    },
    "baseUrl": "."
  },
  "module": {
    "type": "es6"
  },
  "env": {
    "targets": "> 1%, last 2 versions, not dead",
    "mode": "usage",
    "coreJs": "3"
  },
  "sourceMaps": true
}
```

### 常用命令

```bash
# 转换代码
npx swc src -d dist

# 监听
npx swc src -d dist -w
```

### SWC 性能对比

```
Babel 编译 1000 个文件: ~45s
SWC  编译 1000 个文件: ~2s
```

## SWC 集成到构建工具

### 在 Webpack 中使用

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript'
              }
            }
          }
        }
      }
    ]
  }
}
```

### 在 Next.js 中使用

```js
// next.config.js
module.exports = {
  swcMinify: true,     // 使用 SWC 压缩
  compiler: {
    removeConsole: true // 移除 console 语句
  }
}
```

Next.js 13+ 默认使用 SWC 编译，无需额外配置。

### 在 Vite 中使用

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import swc from 'rollup-plugin-swc'

export default defineConfig({
  plugins: [
    swc({
      jsc: {
        parser: {
          syntax: 'typescript'
        }
      }
    })
  ]
})
```

## Babel vs SWC

| 特性 | Babel | SWC |
|------|-------|-----|
| 语言 | JavaScript | Rust |
| 速度 | 慢 | 快（10-20x） |
| 生态 | 插件丰富 | 插件较少 |
| 兼容性 | 非常好 | 好 |
| TypeScript | 通过 preset | 原生支持 |
| 压缩 | Terser | 内置压缩 |
| 配置 | 复杂灵活 | 简单清晰 |

## 参考

- [Babel 文档](https://babeljs.io/docs/)
- [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook)
- [SWC 文档](https://swc.rs/)
- [Babel vs SWC 性能对比](https://swc.rs/docs/benchmarks)
