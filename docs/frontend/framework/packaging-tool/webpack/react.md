# Webpack + React 配置

## 使用 swc（推荐，最快）

```bash
npm install -D swc-loader @swc/core
```

```ts
// webpack.common.ts
import * as path from 'path';
import * as webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';

const conf: webpack.Configuration = {
  entry: './src/index.tsx',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  devServer: { port: 3200, host: '0.0.0.0', hot: true, historyApiFallback: true },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: { loader: 'swc-loader', options: { jsc: { parser: { syntax: 'typescript' } } } },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [{ loader: 'url-loader', options: { limit: 8192, publicPath: '/' } }],
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'less-loader', options: { sourceMap: true, lessOptions: { javascriptEnabled: true } } }],
      },
    ],
  },
  plugins: [
    new HtmlwebpackPlugin({ title: 'My App', template: './src/index.html', inject: true, hash: true }),
    new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
  ],
};

export default conf;
```

## 使用 babel

```bash
npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react ts-loader
```

```json
// babel.config.json
{
  "presets": [["@babel/preset-env", { "modules": false }], "@babel/preset-react"]
}
```

```ts
// webpack.base.ts
module: {
  rules: [
    {
      test: /\.tsx?$/,
      use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
      exclude: /node_modules/,
    },
    {
      test: /\.(jpg|png|svg|gif)$/,
      type: 'asset/resource',
    },
    {
      test: /\.(less|css)$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'less-loader', options: { sourceMap: true, lessOptions: { javascriptEnabled: true } } }],
    },
  ],
},
```

## 使用 esbuild

```bash
npm install -D esbuild-loader
```

```ts
// webpack.base.ts
module: {
  rules: [
    {
      test: /\.[jt]sx?$/,
      use: [{ loader: 'esbuild-loader', options: { target: 'es2015' } }],
      exclude: /node_modules/,
    },
    // ...
  ],
},

// webpack.build.ts - 生产构建使用 esbuild 压缩
import { EsbuildPlugin } from 'esbuild-loader';

const conf = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new EsbuildPlugin({ target: 'es2015', css: true }),
    ],
  },
});
```

## 使用 CSS Modules

```ts
module: {
  rules: [
    {
      test: /\.module\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: '[local]--[contenthash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
    },
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /\.module\.(sa|sc|c)ss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    },
  ],
},
```

## 参考

- [Webpack + React 官方指南](https://webpack.js.org/guides/typescript/)