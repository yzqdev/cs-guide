# webpack开发油猴脚本

## 第一种,直接`webpack --watch` (有缓存,不推荐)

1. webpack --watch 打包 `dist/simple.user.js`
2. 在暴力猴里面使用`//@require  file://xx/dist/simple.user.js`

这个方法有缺陷,@require加载的脚本会有缓存,需要好久脚本内容才会改变

https://stackoverflow.com/questions/30109626/how-do-i-prevent-require-from-caching-external-js-scripts

## 第二种,使用webpack-dev-server+时间戳

```
{  
  "name": "webpack-simple",  
  "version": "1.0.0",  
  "license": "MIT",  
  "scripts": {  
    "dev": "dotenv -v NODE_OPTIONS='--import=tsx/esm' --  webpack serve --watch --config webpack.dev.mts",  
    "build": "webpack "  
  },  
  "devDependencies": {  
    "@types/node": "^20.12.7",  
    "clean-webpack-plugin": "^4.0.0",  
    "css-loader": "^7.1.1",  
    "html-webpack-plugin": "^5.6.0",  
    "html-webpack-template": "^6.2.0",  
    "mini-css-extract-plugin": "latest",  
    "prettier": "^3.2.5",  
    "sass": "^1.76.0",  
    "sass-loader": "^14.2.1",  
    "style-loader": "^4.0.0",  
    "terser-webpack-plugin": "^5.3.10",  
    "ts-loader": "^9.5.1",  
    "tslib": "^2.6.2",  
    "tsx": "^4.8.2",  
    "typescript": "^5.4.5",  
    "webpack": "^5.91.0",  
    "webpack-cli": "^5.1.4",  
    "webpack-dev-middleware": "^7.2.1",  
    "webpack-dev-server": "^5.0.4",  
    "webpack-hot-middleware": "^2.26.1",  
    "webpack-merge": "^5.10.0"  
  }  
}
```

然后`nr dev` 脚本内容就在`http://localhost:9000/simple.bundle.js`
此时需要再暴力猴脚本内部写下如下代码,使用时间戳避免缓存

```ts
const script=document.createElement('script')
script.src='http://localhost:9000/simple.bundle.js?ts='+new Date().valueOf()
  document.body.appendChild(init)
```

## 第三种`webpack-userscript`

package.json
```json
{  
  "name": "webpack-script",  
  "version": "1.0.0",  
  "license": "MIT",  
  "scripts": {  
    "dev": "dotenv -v NODE_ENV=development -v NODE_OPTIONS='--import=tsx/esm' --  webpack serve  --config webpack.dev.mts",  
    "build": "dotenv -v NODE_ENV=production -v NODE_OPTIONS='--import=tsx/esm' --  webpack   --config webpack.prod.mts"  
  },  
  "devDependencies": {  
    "@types/node": "^20.12.7",  
    "clean-webpack-plugin": "^4.0.0",  
    "css-loader": "^7.1.1",  
    "html-webpack-plugin": "^5.6.0",  
    "html-webpack-template": "^6.2.0",  
    "mini-css-extract-plugin": "latest",  
    "prettier": "^3.2.5",  
    "sass": "^1.76.0",  
    "sass-loader": "^14.2.1",  
    "style-loader": "^4.0.0",  
    "terser-webpack-plugin": "^5.3.10",  
    "ts-loader": "^9.5.1",  
    "tslib": "^2.6.2",  
    "tsx": "^4.8.2",  
    "typescript": "^5.4.5",  
    "webpack": "^5.91.0",  
    "webpack-cli": "^5.1.4",  
    "webpack-dev-middleware": "^7.2.1",  
    "webpack-dev-server": "^5.0.4",  
    "webpack-hot-middleware": "^2.26.1",  
    "webpack-merge": "^5.10.0",  
    "webpack-userscript": "^3.2.2"  
  }  
}
```

webpack.dev.mts
```ts
import webpack from "webpack";  
import path from "node:path";  
import { HeadersProps, UserscriptPlugin } from "webpack-userscript";  
  
const dev = process.env.NODE_ENV == "development";  
console.log("");  
const conf: webpack.Configuration = {  
  entry: {  
    simple: "./src/index.ts",  
  },  
  output: {  
    path: path.resolve("dist"),  
    filename: "[name].user.js",  
  },  
  resolve: {  
    extensions: [".ts", ".tsx", ".js", ".json"],  
  },  
  module: {  
    rules: [  
      {  
        test: /\.ts$/,  
        use: [  
          {  
            loader: "ts-loader",  
            options: {  
              transpileOnly: true,  
              appendTsSuffixTo: [/\.vue$/],  
            },  
          },  
        ],  
      },  
      {  
        test: /\.vue$/,  
        loader: "vue-loader",  
        options: {},  
      },  
      {  
        test: /\.css$/,  
        use: ["style-loader", "css-loader"],  
      },  
      {  
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,  
        type: "asset/inline",  
      },  
      {  
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,  
        type: "asset/inline",  
      },  
    ],  
  },  
  plugins: [  
    new UserscriptPlugin({  
      headers(original: HeadersProps) {  
        original.grant = ["GM.setValue"];  
        if (dev) {  
          // original.updateURL="https://github.com/trim21/webpack-userscript-template"  
  
          return {  
            ...original,  
            version: `${original.version}-build.[buildNo]`,  
          };  
        }  
  
        return original;  
      },  
   proxyScript: {  
  // http://localhost:9010/simple.proxy.user.js  
	  baseURL:   pathToFileURL('./dist')+"/",  
  // baseURL: "http://localhost:9010",  
	  filename: "[basename].proxy.user.js",  
}, 
    }),  
  ],  
};  
export default conf;
```
webpack.dev.mts

```ts
import { merge } from "webpack-merge";  
import base from "./webpack.base.mjs";  
import path from "node:path";  
import { fileURLToPath } from "node:url";  
import "webpack-dev-server";  
import { styleText } from "node:util";  
setInterval(() => {  
  const errorMessage = styleText("red", `http://localhost:9010/simple.user.js`);  
  console.log(errorMessage);  
}, 60 * 1000);  
const devConf = merge(base, {  
  mode: "development",  
  devServer: {  
    static: {  
      directory: fileURLToPath(new URL("./dist", import.meta.url)),  
    },  
      client:{
      overlay:false,
      progress:true,
      reconnect: 3

    },
    hot: false,  
devMiddleware: {  
  writeToDisk: true,  
},
    port: 9010,  
  },  
});  
export default devConf;
```


**如何hot reload**

### 对于暴力猴
1. 直接用浏览器打开本地js文件,然后跟踪外部编辑
2. 网页打开`http://127.0.0.1:9010/simple.user.js`,在暴力猴安装界面选择 `跟踪外部编辑`,不要 关闭外部界面即可,关闭后需要重新打开上面的链接
这里使用的@require file:// 所以不会cache

### 对于油猴



手动复制`dist/simple.proxy.user.js`里面的内容,创建新的脚本,然后页面刷新即可

