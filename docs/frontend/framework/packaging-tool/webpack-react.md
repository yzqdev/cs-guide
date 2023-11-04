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
