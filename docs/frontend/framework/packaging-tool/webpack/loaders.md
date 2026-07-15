# Webpack Loaders

Loader 用于对模块的源代码进行转换。Webpack 默认只识别 JS 和 JSON，其他文件类型需要 Loader 处理。

## 样式 Loaders

### css-loader + style-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

### sass-loader

```bash
npm install sass sass-loader -D
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
```

### less-loader

```bash
npm install less less-loader -D
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
};
```

## 资源 Loaders

### 图片/字体

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // Webpack 5 内置
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
```

### url-loader（小文件转 base64）

```bash
npm install url-loader -D
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 8192 }, // 小于 8KB 转 base64
        }],
      },
    ],
  },
};
```

## 脚本 Loaders

### babel-loader

```bash
npm install -D babel-loader @babel/core @babel/preset-env
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
};
```

### ts-loader

```bash
npm install -D ts-loader typescript
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
```

### esbuild-loader（推荐，更快）

```bash
npm install -D esbuild-loader
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: { target: 'es2015' },
      },
    ],
  },
};
```

### swc-loader

```bash
npm install -D swc-loader @swc/core
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: { parser: { syntax: 'typescript' } },
          },
        },
      },
    ],
  },
};
```

## 框架 Loaders

### vue-loader

```bash
npm install -D vue-loader
```

```js
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
```

## 参考

- [Webpack Loaders 文档](https://webpack.js.org/loaders/)