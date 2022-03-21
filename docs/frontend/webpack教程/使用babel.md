# babel教程

使用babel需要以下依赖

```json
{
      "@babel/cli": "^7.12.1",
    "@babel/core": "^7.11.4",
    "@babel/plugin-proposal-class-properties": "^7.12.1",
    "@babel/plugin-transform-runtime": "^7.12.1",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-typescript": "^7.10.4",
      "babel-jest": "^26.3.0",
    "babel-loader": "^8.1.0",
    "babel-plugin-lodash": "^3.3.4",
    "babel-plugin-module-resolver": "^4.0.0",
    "babel-preset-vue": "^2.0.2",
  
  
}
```

- 你是否采用的是单一仓库（monorepo）模式？
- 你是否需要编译 node_modules？

> 那么 [babel.config.json](https://www.babeljs.cn/docs/configuration#babelconfigjson) 文件可以满足你的的需求！

- 你的配置文件是否仅适用于项目的某个部分？

> 那么 [.babelrc.json](https://www.babeljs.cn/docs/configuration#babelrcjson) 文件适合你！
> 我们建议使用 [babel.config.json](https://www.babeljs.cn/docs/config-files#project-wide-configuration) 格式的配置文件。 [Babel 自身使用的就是这种](https://github.com/babel/babel/blob/master/babel.config.js)。

## babel.config.json

在项目的根目录（package.json 文件所在的目录）下创建一个名为 babel.config.json 的文件，并输入如下内容。

```json
{
  "presets": [...],
  "plugins": [...]
}
```

## 一个例子

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}

```

## 或者使用babel.config.js

```json
module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

```json
需要添加如下依赖
{
      "@babel/core": "^7.14.3",
    "@babel/plugin-transform-runtime": "^7.14.3",
    "@babel/preset-env": "^7.14.4",
    "babel-loader": "^8.2.2",
}

并在规则中添加如下:
{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      },

还要配置一下babel.config.json

```
