import{_ as n,c as e,o as t,d as s}from"./app-CbULZrmi.js";const o={},a=s(`<h1 id="webpack搭建react开发" tabindex="-1"><a class="header-anchor" href="#webpack搭建react开发"><span>webpack搭建react开发</span></a></h1><h2 id="使用swc" tabindex="-1"><a class="header-anchor" href="#使用swc"><span>使用swc</span></a></h2><p>webpack.common.ts</p><pre><code class="language-ts">import * as path from &#39;path&#39;;
import * as webpack from &#39;webpack&#39;;
// const Dotenv = require(&#39;dotenv-webpack&#39;);
import MiniCssExtractPlugin from &#39;mini-css-extract-plugin&#39;;
import HtmlwebpackPlugin from &#39;html-webpack-plugin&#39;;
// import * as CopyWebpackPlugin from &#39;copy-webpack-plugin&#39;

import &#39;webpack-dev-server&#39;;
const conf: webpack.Configuration = {
  entry: &#39;./src/index.tsx&#39;,
  devtool: &#39;source-map&#39;,
  mode: &#39;development&#39;,
  resolve: {
    // Add &#39;.ts&#39; and &#39;.tsx&#39; as resolvable extensions.
    extensions: [&#39;.ts&#39;, &#39;.tsx&#39;, &#39;.js&#39;, &#39;.json&#39;],
    alias: {
      &#39;@&#39;: path.resolve(__dirname, &#39;src&#39;)
    }
  },
  devServer: {
    port: 3200,
    host: &#39;0.0.0.0&#39;,
    hot: true,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, &#39;dist&#39;),
    filename: &#39;bundle.js&#39;,
    publicPath: &#39;/&#39;
  },

  module: {
    rules: [
  
      {
        test: /\\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: &#39;swc-loader&#39;,
          options: {
            jsc: {
              parser: {
                syntax: &#39;typescript&#39;
              }
            }
          }
        }
      },
      {
        test: /\\.(jpg|png|svg)$/,
        use: [
          {
            loader: &#39;url-loader&#39;,
            options: {
              limit: 8192,
              publicPath: &#39;/&#39;
            }
          }
        ]
      },
      {
        test: /\\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: &#39;css-loader&#39;
          },
          {
            loader: &#39;less-loader&#39;,
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
    //   path: process.env.NODE_ENV === &#39;production&#39; ? &#39;.env.production&#39; : &#39;.env&#39;,
    //   defaults: &#39;.env&#39;,
    // }),
    // new CopyWebpackPlugin({patterns:[
    //     {
    //       from: &quot;public&quot;,
    //
    //     }
    //   ]}),
    new HtmlwebpackPlugin({
      title: &#39;Kanban Boards Template&#39;,
      filename: &#39;index.html&#39;,
      template: &#39;./src/index.html&#39;,
      inject: true,
      hash: true,
      path: &#39;./&#39;
    }),
    new MiniCssExtractPlugin({
      filename: &#39;[name].css&#39;,
      chunkFilename: &#39;[id].css&#39;
    })
  ]
};

export default conf;

</code></pre><h2 id="使用babel" tabindex="-1"><a class="header-anchor" href="#使用babel"><span>使用babel</span></a></h2><p>babel.config.json</p><pre><code class="language-json">{
  &quot;presets&quot;: [[&quot;@babel/preset-env&quot;, { &quot;modules&quot;: false }], &quot;@babel/preset-react&quot;],
  &quot;plugins&quot;: []
}

</code></pre><p>webpack.base.ts</p><pre><code class="language-ts">import * as path from &#39;path&#39;;
import * as webpack from &#39;webpack&#39;;
// const Dotenv = require(&#39;dotenv-webpack&#39;);
import MiniCssExtractPlugin from &#39;mini-css-extract-plugin&#39;;
import HtmlwebpackPlugin from &#39;html-webpack-plugin&#39;;
// import * as CopyWebpackPlugin from &#39;copy-webpack-plugin&#39;

import &#39;webpack-dev-server&#39;;
const conf: webpack.Configuration = {
  entry: &#39;./src/index.tsx&#39;,
  devtool: &#39;source-map&#39;,
  mode: &#39;development&#39;,
  resolve: {
    // Add &#39;.ts&#39; and &#39;.tsx&#39; as resolvable extensions.
    extensions: [&#39;.ts&#39;, &#39;.tsx&#39;, &#39;.js&#39;, &#39;.json&#39;],
    alias: {
      &#39;@&#39;: path.resolve(__dirname, &#39;src&#39;)
    }
  },
  devServer: {
    port: 3200,
    host: &#39;0.0.0.0&#39;,
    hot: true,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, &#39;dist&#39;),
    filename: &#39;[name].[contenthash].js&#39;,
    publicPath: &#39;/&#39;
  },

  module: {
    rules: [
      // {
      //   test: /\\.tsx?$/,
      //   use: [&#39;babel-loader&#39;],
      //   exclude: /node_modules/
      // },
      {
        test: /\\.tsx?$/,

        use: [
          {
            loader: &#39;babel-loader&#39;,
            // options: {
            //   presets: [&#39;@babel/preset-env&#39;, &#39;@babel/preset-react&#39;]
            // }
          },
          {
            loader: &#39;ts-loader&#39;
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\\.(jpg|png|svg|gif)$/,
        type: &#39;asset/resource&#39;
      },
      {
        test: /\\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: &#39;css-loader&#39;
          },
          {
            loader: &#39;less-loader&#39;,
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
    //   path: process.env.NODE_ENV === &#39;production&#39; ? &#39;.env.production&#39; : &#39;.env&#39;,
    //   defaults: &#39;.env&#39;,
    // }),
    // new CopyWebpackPlugin({patterns:[
    //     {
    //       from: &quot;public&quot;,
    //
    //     }
    //   ]}),
    new HtmlwebpackPlugin({
      title: &#39;Kanban Boards Template&#39;,
      filename: &#39;index.html&#39;,
      template: &#39;./src/index.html&#39;,
      inject: true,
      hash: true,
      path: &#39;./&#39;
    }),
    new MiniCssExtractPlugin({
      filename: &#39;[name].css&#39;,
      chunkFilename: &#39;[id].css&#39;
    })
  ],
  optimization:{
    splitChunks:{
      chunks:&#39;all&#39;
    }
  }
};

export default conf;

</code></pre><h2 id="使用esbuild" tabindex="-1"><a class="header-anchor" href="#使用esbuild"><span>使用esbuild</span></a></h2><p>webpack.base.ts</p><pre><code class="language-ts">import * as path from &#39;path&#39;;
import * as webpack from &#39;webpack&#39;;
// const Dotenv = require(&#39;dotenv-webpack&#39;);
import MiniCssExtractPlugin from &#39;mini-css-extract-plugin&#39;;
import HtmlwebpackPlugin from &#39;html-webpack-plugin&#39;;
// import * as CopyWebpackPlugin from &#39;copy-webpack-plugin&#39;

import &#39;webpack-dev-server&#39;;
const conf: webpack.Configuration = {
  entry: &#39;./src/index.tsx&#39;,
  devtool: &#39;source-map&#39;,
  mode: &#39;development&#39;,
  resolve: {
    // Add &#39;.ts&#39; and &#39;.tsx&#39; as resolvable extensions.
    extensions: [&#39;.ts&#39;, &#39;.tsx&#39;, &#39;.js&#39;, &#39;.json&#39;],
    alias: {
      &#39;@&#39;: path.resolve(__dirname, &#39;src&#39;)
    }
  },
  devServer: {
    port: 3200,
    host: &#39;0.0.0.0&#39;,
    hot: true,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, &#39;dist&#39;),
    filename: &#39;[name].[contenthash].js&#39;,
    publicPath: &#39;/&#39;
  },

  module: {
    rules: [
      {
        test: /\\.[jt]sx?$/,

        use: [
          {
            loader: &#39;esbuild-loader&#39;,
            options: {
              target: &#39;es2015&#39;
            }
          },
          
        ],
        exclude: /node_modules/
      },
      {
        test: /\\.(jpg|png|svg|gif)$/,
        type: &#39;asset/resource&#39;
      },
      {
        test: /\\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: &#39;css-loader&#39;
          },
          {
            loader: &#39;less-loader&#39;,
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
      title: &#39;Kanban Boards Template&#39;,
      filename: &#39;index.html&#39;,
      template: &#39;./src/index.html&#39;,
      inject: true,
      hash: true,
      path: &#39;./&#39;
    }),
    new MiniCssExtractPlugin({
      filename: &#39;[name].css&#39;,
      chunkFilename: &#39;[id].css&#39;
    })
  ]
};

export default conf;

</code></pre><p>webpack.build.ts</p><pre><code class="language-ts">import * as webpack from &#39;webpack&#39;;
import { merge } from &#39;webpack-merge&#39;;
import base from &#39;./webpack.common&#39;;
import {EsbuildPlugin} from &#39;esbuild-loader&#39;
import &#39;webpack-dev-server&#39;;
const conf: webpack.Configuration = merge(base, {
  mode: &#39;production&#39;,
  devtool: false,
  optimization: {
    splitChunks:{
      chunks: &#39;all&#39;
      ,maxSize: 244*1024
    },
      minimizer: [
        new EsbuildPlugin({
          target: &#39;es2015&#39;,
         css: true  // Apply minification to CSS assets
        })
      ]
    },
});

export default conf;

</code></pre><h2 id="使用cssmodules" tabindex="-1"><a class="header-anchor" href="#使用cssmodules"><span>使用cssmodules</span></a></h2><pre><code class="language-js">const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;);

const path = require(&quot;path&quot;);
const webpack = require(&quot;webpack&quot;);
const { CleanWebpackPlugin } = require(&quot;clean-webpack-plugin&quot;);
const HtmlWebpackPlugin = require(&quot;html-webpack-plugin&quot;);

const Dotenv = require(&quot;dotenv-webpack&quot;);
const uno = import(&quot;@unocss/webpack&quot;).then();
/**
 * @type import(&#39;webpack&#39;).Configuration
 */
module.exports = {
  entry: {
    app: path.resolve(__dirname, &quot;./src/main.tsx&quot;),
  },

  output: {
    filename: &quot;js/[name].[chunkhash:8].js&quot;,
    path: path.resolve(__dirname, &quot;./dist&quot;),
  },
  resolve: {
    extensions: [&quot;.js&quot;, &quot;.jsx&quot;, &quot;.json&quot;, &quot;.ts&quot;, &quot;.tsx&quot;],
  },
  module: {
    rules: [
      {
        test: /\\.jsx?$/,
        loader: &quot;babel-loader&quot;,
        exclude: /node_modules/,
      },
      {
        test: /\\.tsx?$/,
        use: [
          {
            loader: &quot;babel-loader&quot;,
            options: {
              plugins: [
                ...(process.env.NODE_ENV === &quot;development&quot;
                  ? [require.resolve(&quot;react-refresh/babel&quot;)]
                  : []),
              ],
            },
          },

          {
            loader: &quot;ts-loader&quot;,
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\\.(sa|sc|c)ss$/,
        exclude: /\\.module\\.(sa|sc|c)ss$/,

        use: [
          MiniCssExtractPlugin.loader,
          { loader: &quot;css-loader&quot; },
          &quot;sass-loader&quot;,
        ],
      },
      {
        test: /\\.module\\.(sa|sc|c)ss$/,

        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: &quot;css-loader&quot;,
            options: {
              importLoaders: 1,
              esModule: false,
              modules: {
                localIdentName: &quot;[local]--[contenthash:base64:5]&quot;,
              },
            },
          },
          &quot;sass-loader&quot;,
        ],
      },

      {
        test: /\\.(png|jpe?g|gif|svg)(\\?.*)?$/,
        type: &quot;asset/resource&quot;,
        generator: {
          filename: &quot;imgs/[name].[contenthash:8].[ext]&quot;,
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\\.(woff2?|eot|ttf|otf)(\\?.*)?$/,
        type: &quot;asset/resource&quot;,
        generator: {
          filename: &quot;fonts/[name].[contenthash:8].[ext]&quot;,
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\\.(mp3)(\\?.*)?$/,
        type: &quot;asset/resource&quot;,
        generator: {
          filename: &quot;audios/[name].[contenthash:8].[ext]&quot;,
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
      filename: &quot;index.html&quot;,
      template: path.resolve(__dirname, &quot;./index.html&quot;),
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: &quot;css/[name].[contenthash:8].css&quot;,
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      silent: true,
    }),
  ],
};


</code></pre><p>需要配置</p><pre><code>     {

            loader: &quot;css-loader&quot;,

            options: {

              importLoaders: 1,

              esModule: false,

              modules: {

                localIdentName: &quot;[local]--[hash:base64:5]&quot;,

              },

            },
</code></pre><p>否则导入scss需要使用</p><pre><code>import * as styles from &#39;./styles.module.scss&#39;
</code></pre><p>若使用<code>imort styles from &#39;./style.module.scss&#39;</code>则会报错<code># [Attempted import error: &#39;styles&#39; is not exported from &#39;./styles.scss&#39; (imported as &#39;styles&#39;) </code></p>`,21),r=[a];function l(i,c){return t(),e("div",null,r)}const u=n(o,[["render",l],["__file","webpack-react.html.vue"]]),d=JSON.parse('{"path":"/frontend/framework/packaging-tool/webpack-react.html","title":"webpack搭建react开发","lang":"zh-CN","frontmatter":{"description":"webpack搭建react开发 使用swc webpack.common.ts 使用babel babel.config.json webpack.base.ts 使用esbuild webpack.base.ts webpack.build.ts 使用cssmodules 需要配置 否则导入scss需要使用 若使用imort styles from...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/webpack-react.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"webpack搭建react开发"}],["meta",{"property":"og:description","content":"webpack搭建react开发 使用swc webpack.common.ts 使用babel babel.config.json webpack.base.ts 使用esbuild webpack.base.ts webpack.build.ts 使用cssmodules 需要配置 否则导入scss需要使用 若使用imort styles from..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-16T07:53:47.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-04-16T07:53:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"webpack搭建react开发\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-16T07:53:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用swc","slug":"使用swc","link":"#使用swc","children":[]},{"level":2,"title":"使用babel","slug":"使用babel","link":"#使用babel","children":[]},{"level":2,"title":"使用esbuild","slug":"使用esbuild","link":"#使用esbuild","children":[]},{"level":2,"title":"使用cssmodules","slug":"使用cssmodules","link":"#使用cssmodules","children":[]}],"git":{"createdTime":1699125957000,"updatedTime":1713254027000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":3.28,"words":983},"filePathRelative":"frontend/framework/packaging-tool/webpack-react.md","localizedDate":"2023年11月4日","autoDesc":true}');export{u as comp,d as data};
