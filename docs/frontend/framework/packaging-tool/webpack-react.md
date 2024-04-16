# webpack搭建react开发

## 使用swc

webpack.common.ts

```ts
import * as path from 'path';
import * as webpack from 'webpack';
// const Dotenv = require('dotenv-webpack');
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlwebpackPlugin from 'html-webpack-plugin';
// import * as CopyWebpackPlugin from 'copy-webpack-plugin'

import 'webpack-dev-server';
const conf: webpack.Configuration = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: 3200,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
  
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
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
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new Dotenv({
    //   path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    //   defaults: '.env',
    // }),
    // new CopyWebpackPlugin({patterns:[
    //     {
    //       from: "public",
    //
    //     }
    //   ]}),
    new HtmlwebpackPlugin({
      title: 'Kanban Boards Template',
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      hash: true,
      path: './'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};

export default conf;

```

## 使用babel

babel.config.json

```json
{
  "presets": [["@babel/preset-env", { "modules": false }], "@babel/preset-react"],
  "plugins": []
}

```

webpack.base.ts

```ts
import * as path from 'path';
import * as webpack from 'webpack';
// const Dotenv = require('dotenv-webpack');
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlwebpackPlugin from 'html-webpack-plugin';
// import * as CopyWebpackPlugin from 'copy-webpack-plugin'

import 'webpack-dev-server';
const conf: webpack.Configuration = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: 3200,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: ['babel-loader'],
      //   exclude: /node_modules/
      // },
      {
        test: /\.tsx?$/,

        use: [
          {
            loader: 'babel-loader',
            // options: {
            //   presets: ['@babel/preset-env', '@babel/preset-react']
            // }
          },
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new Dotenv({
    //   path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    //   defaults: '.env',
    // }),
    // new CopyWebpackPlugin({patterns:[
    //     {
    //       from: "public",
    //
    //     }
    //   ]}),
    new HtmlwebpackPlugin({
      title: 'Kanban Boards Template',
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      hash: true,
      path: './'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  }
};

export default conf;

```

## 使用esbuild

webpack.base.ts

```ts
import * as path from 'path';
import * as webpack from 'webpack';
// const Dotenv = require('dotenv-webpack');
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlwebpackPlugin from 'html-webpack-plugin';
// import * as CopyWebpackPlugin from 'copy-webpack-plugin'

import 'webpack-dev-server';
const conf: webpack.Configuration = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: 3200,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,

        use: [
          {
            loader: 'esbuild-loader',
            options: {
              target: 'es2015'
            }
          },
          
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
  
    new HtmlwebpackPlugin({
      title: 'Kanban Boards Template',
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      hash: true,
      path: './'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};

export default conf;

```

webpack.build.ts

```ts
import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import base from './webpack.common';
import {EsbuildPlugin} from 'esbuild-loader'
import 'webpack-dev-server';
const conf: webpack.Configuration = merge(base, {
  mode: 'production',
  devtool: false,
  optimization: {
    splitChunks:{
      chunks: 'all'
      ,maxSize: 244*1024
    },
      minimizer: [
        new EsbuildPlugin({
          target: 'es2015',
         css: true  // Apply minification to CSS assets
        })
      ]
    },
});

export default conf;

```


## 使用cssmodules

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Dotenv = require("dotenv-webpack");
const uno = import("@unocss/webpack").then();
/**
 * @type import('webpack').Configuration
 */
module.exports = {
  entry: {
    app: path.resolve(__dirname, "./src/main.tsx"),
  },

  output: {
    filename: "js/[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "./dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                ...(process.env.NODE_ENV === "development"
                  ? [require.resolve("react-refresh/babel")]
                  : []),
              ],
            },
          },

          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,

        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          "sass-loader",
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,

        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              esModule: false,
              modules: {
                localIdentName: "[local]--[contenthash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "imgs/[name].[contenthash:8].[ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[contenthash:8].[ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.(mp3)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "audios/[name].[contenthash:8].[ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./index.html"),
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      silent: true,
    }),
  ],
};


```

需要配置
```
     {

            loader: "css-loader",

            options: {

              importLoaders: 1,

              esModule: false,

              modules: {

                localIdentName: "[local]--[hash:base64:5]",

              },

            },
```

否则导入scss需要使用
```
import * as styles from './styles.module.scss'
```

若使用`imort styles from './style.module.scss'`则会报错`# [Attempted import error: 'styles' is not exported from './styles.scss' (imported as 'styles') `