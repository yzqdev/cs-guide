# loaders

## image-loader

```json
{
  rules:[
     {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
  ]
}

```

## css-loader

```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

## style-loader

```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

## sass-loader

```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
```

## less-loader

```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
};
```

## babel-loader

```powershell
npm install -D babel-loader @babel/core @babel/preset-env webpack

```

用法

```ts
module.exports={
  module: {
  rules: [
    {
      test: /\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    }
  ]
}
}
```

tsx

```ts
const jsxLoader = {
  test: /\.tsx?$/,
  use: [
    {
      loader: "babel-loader",
      // options: {
      //   presets: ['@babel/preset-env', '@babel/preset-react']
      // }
    },
    {
      loader: "ts-loader",
    },
  ],
  exclude: /node_modules/,
};
```

## ts-loader

:::tip
ts-loader 需要配合 babel-loader,esbuild-register,ts-node, swc,sucrase之类的使用,推荐esbuild-register

:::

```ts
const path = require("path");

module.exports = {
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
         exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
      ".ts": [".js", ".ts"],
      ".cts": [".cjs", ".cts"],
      ".mts": [".mjs", ".mts"],
    },
  },
};


```

## esbuild-loader

这个也可以编译ts文件

```ts
module.exports = {
  module: {
    rules: [
      {
        // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        test: /\.[jt]sx?$/,
        loader: "esbuild-loader",
        options: {
          // JavaScript version to compile to
          target: "es2015",
        },
      },
    ],
  },
};


// webpack.build.ts
import * as webpack from "webpack";
import { merge } from "webpack-merge";
import base from "./webpack.config";
import { EsbuildPlugin } from "esbuild-loader";
import "webpack-dev-server";
console.log("production build==============>")
const conf: webpack.Configuration = merge(base, {
  mode: "production",
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: "all",
      maxSize: 244 * 1024,
    },
    minimizer: [
      new EsbuildPlugin({
        target: "es2015",
        
        minify:false,
        css: true, // Apply minification to CSS assets
      }),
    ],
  },
});

export default conf;

```

## vue-loader

```ts
// webpack.config.js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}

```
