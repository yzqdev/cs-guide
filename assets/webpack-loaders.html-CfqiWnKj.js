import{_ as e,c as o,o as s,d as t}from"./app-CbULZrmi.js";const a={},n=t(`<h1 id="loaders" tabindex="-1"><a class="header-anchor" href="#loaders"><span>loaders</span></a></h1><h2 id="image-loader" tabindex="-1"><a class="header-anchor" href="#image-loader"><span>image-loader</span></a></h2><pre><code class="language-json">{
  rules:[
     {
        test: /\\.(png|svg|jpg|jpeg|gif)$/,
        type: &quot;asset/resource&quot;,
      },
  ]
}

</code></pre><h2 id="css-loader" tabindex="-1"><a class="header-anchor" href="#css-loader"><span>css-loader</span></a></h2><pre><code class="language-ts">module.exports = {
  module: {
    rules: [
      {
        test: /\\.css$/i,
        use: [&quot;style-loader&quot;, &quot;css-loader&quot;],
      },
    ],
  },
};
</code></pre><h2 id="style-loader" tabindex="-1"><a class="header-anchor" href="#style-loader"><span>style-loader</span></a></h2><pre><code class="language-ts">module.exports = {
  module: {
    rules: [
      {
        test: /\\.css$/i,
        use: [&quot;style-loader&quot;, &quot;css-loader&quot;],
      },
    ],
  },
};
</code></pre><h2 id="sass-loader" tabindex="-1"><a class="header-anchor" href="#sass-loader"><span>sass-loader</span></a></h2><pre><code class="language-ts">module.exports = {
  module: {
    rules: [
      {
        test: /\\.s[ac]ss$/i,
        use: [
          // Creates \`style\` nodes from JS strings
          &quot;style-loader&quot;,
          // Translates CSS into CommonJS
          &quot;css-loader&quot;,
          // Compiles Sass to CSS
          &quot;sass-loader&quot;,
        ],
      },
    ],
  },
};
</code></pre><h2 id="less-loader" tabindex="-1"><a class="header-anchor" href="#less-loader"><span>less-loader</span></a></h2><pre><code class="language-ts">module.exports = {
  module: {
    rules: [
      {
        test: /\\.less$/i,
        use: [
          // compiles Less to CSS
          &quot;style-loader&quot;,
          &quot;css-loader&quot;,
          &quot;less-loader&quot;,
        ],
      },
    ],
  },
};
</code></pre><h2 id="babel-loader" tabindex="-1"><a class="header-anchor" href="#babel-loader"><span>babel-loader</span></a></h2><pre><code class="language-powershell">npm install -D babel-loader @babel/core @babel/preset-env webpack

</code></pre><p>用法</p><pre><code class="language-ts">module.exports={
  module: {
  rules: [
    {
      test: /\\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: &#39;babel-loader&#39;,
        options: {
          presets: [
            [&#39;@babel/preset-env&#39;, { targets: &quot;defaults&quot; }]
          ],
          plugins: [&#39;@babel/plugin-proposal-class-properties&#39;]
        }
      }
    }
  ]
}
}
</code></pre><p>tsx</p><pre><code class="language-ts">const jsxLoader = {
  test: /\\.tsx?$/,
  use: [
    {
      loader: &quot;babel-loader&quot;,
      // options: {
      //   presets: [&#39;@babel/preset-env&#39;, &#39;@babel/preset-react&#39;]
      // }
    },
    {
      loader: &quot;ts-loader&quot;,
    },
  ],
  exclude: /node_modules/,
};
</code></pre><h2 id="ts-loader" tabindex="-1"><a class="header-anchor" href="#ts-loader"><span>ts-loader</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>ts-loader 需要配合 babel-loader,esbuild-register,ts-node, swc,sucrase之类的使用,推荐esbuild-register</p></div><pre><code class="language-ts">const path = require(&quot;path&quot;);

module.exports = {
  devtool: &quot;inline-source-map&quot;,
  entry: &quot;./src/index.ts&quot;,
  output: {
    filename: &quot;main.js&quot;,
    path: path.resolve(__dirname, &quot;dist&quot;),
  },
  module: {
    rules: [
      {
        test: /\\.([cm]?ts|tsx)$/,
        loader: &quot;ts-loader&quot;,
         exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [&quot;.ts&quot;, &quot;.tsx&quot;, &quot;.js&quot;],
    extensionAlias: {
      &quot;.ts&quot;: [&quot;.js&quot;, &quot;.ts&quot;],
      &quot;.cts&quot;: [&quot;.cjs&quot;, &quot;.cts&quot;],
      &quot;.mts&quot;: [&quot;.mjs&quot;, &quot;.mts&quot;],
    },
  },
};


</code></pre><h2 id="esbuild-loader" tabindex="-1"><a class="header-anchor" href="#esbuild-loader"><span>esbuild-loader</span></a></h2><p>这个也可以编译ts文件</p><pre><code class="language-ts">module.exports = {
  module: {
    rules: [
      {
        // Match \`.js\`, \`.jsx\`, \`.ts\` or \`.tsx\` files
        test: /\\.[jt]sx?$/,
        loader: &quot;esbuild-loader&quot;,
        options: {
          // JavaScript version to compile to
          target: &quot;es2015&quot;,
        },
      },
    ],
  },
};


// webpack.build.ts
import * as webpack from &quot;webpack&quot;;
import { merge } from &quot;webpack-merge&quot;;
import base from &quot;./webpack.config&quot;;
import { EsbuildPlugin } from &quot;esbuild-loader&quot;;
import &quot;webpack-dev-server&quot;;
console.log(&quot;production build==============&gt;&quot;)
const conf: webpack.Configuration = merge(base, {
  mode: &quot;production&quot;,
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: &quot;all&quot;,
      maxSize: 244 * 1024,
    },
    minimizer: [
      new EsbuildPlugin({
        target: &quot;es2015&quot;,
        
        minify:false,
        css: true, // Apply minification to CSS assets
      }),
    ],
  },
});

export default conf;

</code></pre><h2 id="vue-loader" tabindex="-1"><a class="header-anchor" href="#vue-loader"><span>vue-loader</span></a></h2><pre><code class="language-ts">// webpack.config.js
const { VueLoaderPlugin } = require(&#39;vue-loader&#39;)

module.exports = {
  module: {
    rules: [
      // ... other rules
      {
        test: /\\.vue$/,
        loader: &#39;vue-loader&#39;
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}

</code></pre>`,25),l=[n];function r(d,u){return s(),o("div",null,l)}const c=e(a,[["render",r],["__file","webpack-loaders.html.vue"]]),p=JSON.parse('{"path":"/frontend/framework/packaging-tool/webpack-loaders.html","title":"loaders","lang":"zh-CN","frontmatter":{"description":"loaders image-loader css-loader style-loader sass-loader less-loader babel-loader 用法 tsx ts-loader 提示 ts-loader 需要配合 babel-loader,esbuild-register,ts-node, swc,sucrase之类的使用,推荐es...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/packaging-tool/webpack-loaders.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"loaders"}],["meta",{"property":"og:description","content":"loaders image-loader css-loader style-loader sass-loader less-loader babel-loader 用法 tsx ts-loader 提示 ts-loader 需要配合 babel-loader,esbuild-register,ts-node, swc,sucrase之类的使用,推荐es..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-04T19:25:57.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-04T19:25:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"loaders\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-04T19:25:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"image-loader","slug":"image-loader","link":"#image-loader","children":[]},{"level":2,"title":"css-loader","slug":"css-loader","link":"#css-loader","children":[]},{"level":2,"title":"style-loader","slug":"style-loader","link":"#style-loader","children":[]},{"level":2,"title":"sass-loader","slug":"sass-loader","link":"#sass-loader","children":[]},{"level":2,"title":"less-loader","slug":"less-loader","link":"#less-loader","children":[]},{"level":2,"title":"babel-loader","slug":"babel-loader","link":"#babel-loader","children":[]},{"level":2,"title":"ts-loader","slug":"ts-loader","link":"#ts-loader","children":[]},{"level":2,"title":"esbuild-loader","slug":"esbuild-loader","link":"#esbuild-loader","children":[]},{"level":2,"title":"vue-loader","slug":"vue-loader","link":"#vue-loader","children":[]}],"git":{"createdTime":1699125957000,"updatedTime":1699125957000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.28,"words":384},"filePathRelative":"frontend/framework/packaging-tool/webpack-loaders.md","localizedDate":"2023年11月4日","autoDesc":true}');export{c as comp,p as data};
