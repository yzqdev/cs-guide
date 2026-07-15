# Babel 配置

## 简介

Babel 是一个 JavaScript 编译器，用于将现代 JS/TS 代码转换为向下兼容的版本。

## 安装

```bash
npm install -D @babel/core @babel/cli @babel/preset-env
```

## 配置文件

### babel.config.json（推荐，项目级别）

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "edge": "17",
        "firefox": "60",
        "chrome": "67",
        "safari": "11.1"
      },
      "useBuiltIns": "usage",
      "corejs": "3.6.5"
    }]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

### babel.config.js（动态配置）

```js
module.exports = function (api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { targets: { browsers: ['last 1 version'] } }],
    '@babel/preset-typescript',
  ];
  const plugins = ['@babel/plugin-transform-runtime'];

  return { presets, plugins };
};
```

## 常用 Presets

| Preset | 用途 |
|--------|------|
| `@babel/preset-env` | 根据目标环境自动转换 JS 语法 |
| `@babel/preset-react` | 支持 JSX 语法 |
| `@babel/preset-typescript` | 支持 TypeScript |
| `@babel/preset-flow` | 支持 Flow 类型 |

## 常用 Plugins

| Plugin | 用途 |
|--------|------|
| `@babel/plugin-transform-runtime` | 复用辅助函数，减少打包体积 |
| `@babel/plugin-proposal-decorators` | 支持装饰器语法 |
| `@babel/plugin-proposal-class-properties` | 支持类属性 |
| `babel-plugin-module-resolver` | 模块路径别名 |

## 与 Webpack 集成

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};
```

## 与 React 集成

```json
{
  "presets": [
    ["@babel/preset-env", { "modules": false }],
    "@babel/preset-react"
  ]
}
```

## 参考

- [Babel 官方文档](https://babeljs.io/)
- [Babel 中文文档](https://www.babeljs.cn/)