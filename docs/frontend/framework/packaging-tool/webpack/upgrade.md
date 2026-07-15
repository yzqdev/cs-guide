# Webpack 5 升级指南

## 热部署

### webpack-dev-server

```json
{
  "scripts": {
    "dev": "webpack serve --open"
  }
}
```

```js
module.exports = {
  devServer: {
    contentBase: './dist',  // Webpack 4
    // Webpack 5: static: { directory: './dist' }
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
```

## 常见升级问题

### 1. `webpack-cli` 命令变更

Webpack 5 中，不能通过 `webpack-dev-server` 启动项目，需要通过 `webpack serve`：

```json
{
  "scripts": {
    "dev": "webpack serve ..."  // Webpack 5
  }
}
```

### 2. `NamedModulesPlugin` 已移除

```js
// Webpack 4 - ❌
new webpack.NamedModulesPlugin();

// Webpack 5 - ✅ 功能已内置，无需配置
```

### 3. `@babel/runtime` 引入错误

```bash
# 锁定版本
npm install @babel/runtime@7.12.0 -D
```

### 4. Node.js polyfill 移除

Webpack 5 移除了 Node.js 核心模块的 polyfill 自动引入：

```js
module.exports = {
  resolve: {
    // 如果需要 polyfill，手动安装并配置
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify/'),
    },
    // 如果不需要，设置为 false
    alias: {
      crypto: false,
    },
  },
};
```

Vue CLI 项目中的配置：

```js
module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
      },
    },
  },
};
```

### 5. `html-webpack-plugin` 警告

```bash
npm install html-webpack-plugin@next -D
```

### 6. `webpack-merge` 升级

```js
// Webpack 4
const merge = require('webpack-merge');
const config = merge(defaultConfig, { ... });

// Webpack 5
const { merge } = require('webpack-merge');
const config = merge(defaultConfig, { ... });
```

### 7. `hard-source-webpack-plugin` 兼容

```js
// Webpack 5 中
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  plugins: [
    new HardSourceWebpackPlugin(),
    new HardSourceWebpackPlugin.ExcludeModulePlugin([]),
  ],
};
```

### 8. `webpack-cli` 版本问题

```bash
npm install webpack-cli@4.2.0 --save-dev
```

## 参考

- [Webpack 5 迁移指南](https://webpack.js.org/migrate/5/)