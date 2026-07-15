# Rspack 与 Rsbuild

## Rspack

[Rspack](https://rspack.dev/) 是一个基于 Rust 的高性能 Web 打包工具，兼容 Webpack 配置和生态。

### 安装

```bash
npm install @rspack/cli @rspack/core -D
```

### 基本配置

```js
// rspack.config.js
const rspack = require('@rspack/core');

module.exports = {
  entry: './src/index.js',
  output: { path: './dist' },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: { loader: 'builtin:swc-loader', options: { jsc: { parser: { syntax: 'ecmascript', jsx: true } } } },
      },
    ],
  },
  plugins: [new rspack.HtmlRspackPlugin({ template: './index.html' })],
};
```

### 常见问题

#### style-loader 与 experiments.css 冲突

使用 `style-loader` 和 `css-loader` 时，必须关闭 `experiments.css`：

```json
{
  "experiments": {
    "css": false
  }
}
```

否则会打包出奇怪的 CSS。

## Rsbuild

[Rsbuild](https://rsbuild.dev/) 是基于 Rspack 的上层构建工具，提供零配置开箱即用的体验，类似 Vite 但底层使用 Rspack。

### 安装

```bash
npm create rsbuild@latest
```

### 特点

- 零配置，开箱即用
- 支持 Vue / React / Svelte / Solid
- 内置 TypeScript、CSS Modules、Less/Sass
- 插件系统完善

## 参考

- [Rspack 官方文档](https://rspack.dev/)
- [Rsbuild 官方文档](https://rsbuild.dev/)