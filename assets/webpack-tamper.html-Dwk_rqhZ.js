import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const u={},s=n(`<h1 id="webpack开发油猴脚本" tabindex="-1"><a class="header-anchor" href="#webpack开发油猴脚本"><span>webpack开发油猴脚本</span></a></h1><h2 id="第一种-直接webpack-watch-有缓存-不推荐" tabindex="-1"><a class="header-anchor" href="#第一种-直接webpack-watch-有缓存-不推荐"><span>第一种,直接<code>webpack --watch</code> (有缓存,不推荐)</span></a></h2><ol><li>webpack --watch 打包 <code>dist/simple.user.js</code></li><li>在暴力猴里面使用<code>//@require file://xx/dist/simple.user.js</code></li></ol><p>这个方法有缺陷,@require加载的脚本会有缓存,需要好久脚本内容才会改变</p><p>https://stackoverflow.com/questions/30109626/how-do-i-prevent-require-from-caching-external-js-scripts</p><h2 id="第二种-使用webpack-dev-server-时间戳" tabindex="-1"><a class="header-anchor" href="#第二种-使用webpack-dev-server-时间戳"><span>第二种,使用webpack-dev-server+时间戳</span></a></h2><pre><code>{  
  &quot;name&quot;: &quot;webpack-simple&quot;,  
  &quot;version&quot;: &quot;1.0.0&quot;,  
  &quot;license&quot;: &quot;MIT&quot;,  
  &quot;scripts&quot;: {  
    &quot;dev&quot;: &quot;dotenv -v NODE_OPTIONS=&#39;--import=tsx/esm&#39; --  webpack serve --watch --config webpack.dev.mts&quot;,  
    &quot;build&quot;: &quot;webpack &quot;  
  },  
  &quot;devDependencies&quot;: {  
    &quot;@types/node&quot;: &quot;^20.12.7&quot;,  
    &quot;clean-webpack-plugin&quot;: &quot;^4.0.0&quot;,  
    &quot;css-loader&quot;: &quot;^7.1.1&quot;,  
    &quot;html-webpack-plugin&quot;: &quot;^5.6.0&quot;,  
    &quot;html-webpack-template&quot;: &quot;^6.2.0&quot;,  
    &quot;mini-css-extract-plugin&quot;: &quot;latest&quot;,  
    &quot;prettier&quot;: &quot;^3.2.5&quot;,  
    &quot;sass&quot;: &quot;^1.76.0&quot;,  
    &quot;sass-loader&quot;: &quot;^14.2.1&quot;,  
    &quot;style-loader&quot;: &quot;^4.0.0&quot;,  
    &quot;terser-webpack-plugin&quot;: &quot;^5.3.10&quot;,  
    &quot;ts-loader&quot;: &quot;^9.5.1&quot;,  
    &quot;tslib&quot;: &quot;^2.6.2&quot;,  
    &quot;tsx&quot;: &quot;^4.8.2&quot;,  
    &quot;typescript&quot;: &quot;^5.4.5&quot;,  
    &quot;webpack&quot;: &quot;^5.91.0&quot;,  
    &quot;webpack-cli&quot;: &quot;^5.1.4&quot;,  
    &quot;webpack-dev-middleware&quot;: &quot;^7.2.1&quot;,  
    &quot;webpack-dev-server&quot;: &quot;^5.0.4&quot;,  
    &quot;webpack-hot-middleware&quot;: &quot;^2.26.1&quot;,  
    &quot;webpack-merge&quot;: &quot;^5.10.0&quot;  
  }  
}
</code></pre><p>然后<code>nr dev</code> 脚本内容就在<code>http://localhost:9000/simple.bundle.js</code> 此时需要再暴力猴脚本内部写下如下代码,使用时间戳避免缓存</p><pre><code class="language-ts">const script=document.createElement(&#39;script&#39;)
script.src=&#39;http://localhost:9000/simple.bundle.js?ts=&#39;+new Date().valueOf()
  document.body.appendChild(init)
</code></pre><h2 id="第三种webpack-userscript" tabindex="-1"><a class="header-anchor" href="#第三种webpack-userscript"><span>第三种<code>webpack-userscript</code></span></a></h2><p>package.json</p><pre><code class="language-json">{  
  &quot;name&quot;: &quot;webpack-script&quot;,  
  &quot;version&quot;: &quot;1.0.0&quot;,  
  &quot;license&quot;: &quot;MIT&quot;,  
  &quot;scripts&quot;: {  
    &quot;dev&quot;: &quot;dotenv -v NODE_ENV=development -v NODE_OPTIONS=&#39;--import=tsx/esm&#39; --  webpack serve  --config webpack.dev.mts&quot;,  
    &quot;build&quot;: &quot;dotenv -v NODE_ENV=production -v NODE_OPTIONS=&#39;--import=tsx/esm&#39; --  webpack   --config webpack.prod.mts&quot;  
  },  
  &quot;devDependencies&quot;: {  
    &quot;@types/node&quot;: &quot;^20.12.7&quot;,  
    &quot;clean-webpack-plugin&quot;: &quot;^4.0.0&quot;,  
    &quot;css-loader&quot;: &quot;^7.1.1&quot;,  
    &quot;html-webpack-plugin&quot;: &quot;^5.6.0&quot;,  
    &quot;html-webpack-template&quot;: &quot;^6.2.0&quot;,  
    &quot;mini-css-extract-plugin&quot;: &quot;latest&quot;,  
    &quot;prettier&quot;: &quot;^3.2.5&quot;,  
    &quot;sass&quot;: &quot;^1.76.0&quot;,  
    &quot;sass-loader&quot;: &quot;^14.2.1&quot;,  
    &quot;style-loader&quot;: &quot;^4.0.0&quot;,  
    &quot;terser-webpack-plugin&quot;: &quot;^5.3.10&quot;,  
    &quot;ts-loader&quot;: &quot;^9.5.1&quot;,  
    &quot;tslib&quot;: &quot;^2.6.2&quot;,  
    &quot;tsx&quot;: &quot;^4.8.2&quot;,  
    &quot;typescript&quot;: &quot;^5.4.5&quot;,  
    &quot;webpack&quot;: &quot;^5.91.0&quot;,  
    &quot;webpack-cli&quot;: &quot;^5.1.4&quot;,  
    &quot;webpack-dev-middleware&quot;: &quot;^7.2.1&quot;,  
    &quot;webpack-dev-server&quot;: &quot;^5.0.4&quot;,  
    &quot;webpack-hot-middleware&quot;: &quot;^2.26.1&quot;,  
    &quot;webpack-merge&quot;: &quot;^5.10.0&quot;,  
    &quot;webpack-userscript&quot;: &quot;^3.2.2&quot;  
  }  
}
</code></pre><p>webpack.base.mts</p><pre><code class="language-ts">import webpack from &quot;webpack&quot;;  
import path from &quot;node:path&quot;;  
import {HeadersProps, UserscriptPlugin} from &quot;webpack-userscript&quot;;  
import {VueLoaderPlugin} from &quot;vue-loader&quot;;  
import {fileURLToPath, pathToFileURL} from &quot;node:url&quot;;  
  
const __dirname = path.dirname(fileURLToPath(import.meta.url));  
const dev = process.env.NODE_ENV == &quot;development&quot;;  
import Components from &quot;unplugin-vue-components/webpack&quot;;  
import {ElementPlusResolver} from &quot;unplugin-vue-components/resolvers&quot;;  
import AutoImport from &quot;unplugin-auto-import/webpack&quot;;  
   
const conf: webpack.Configuration = {  
    entry: {  
        usescriptPlus: &quot;./src/main.ts&quot;,  
    },  
    output: {  
        clean: true,  
        path: path.resolve(&quot;dist&quot;),  
        filename: &quot;[name].user.js&quot;,  
    },  
    resolve: {  
        extensions: [&quot;.ts&quot;, &quot;.tsx&quot;, &quot;.js&quot;, &quot;.json&quot;],  
    },  
    module: {  
        rules: [  
            {  
                test: /\\.ts$/,  
                use: [  
                    {  
                        loader: &quot;ts-loader&quot;,  
                        options: {  
                            transpileOnly: true,  
                            appendTsSuffixTo: [/\\.vue$/],  
                        },  
                    },  
                ],  
            },  
            {  
                test: /\\.vue$/,  
                loader: &quot;vue-loader&quot;,  
                options: {  
                    shadowMode: true  
                },  
            },  
            {  
                test: /\\.scss$/,  
                use: [{loader: &#39;style-loader&#39;, options: {}}, &quot;css-loader&quot;, &quot;sass-loader&quot;],  
            },  
            {  
                test: /\\.css$/,  
                use: [{loader: &#39;style-loader&#39;, options: {}}, &quot;css-loader&quot;],  
            },  
            {  
                test: /\\.(png|jpe?g|gif|svg)(\\?.*)?$/,  
                type: &quot;asset/inline&quot;,  
            },  
            {  
                test: /\\.(woff2?|eot|ttf|otf)(\\?.*)?$/,  
                type: &quot;asset/inline&quot;,  
            },  
        ],  
    },  
    externals: {  
        vue: &#39;Vue&#39;,  
        dayjs: &quot;dayjs&quot;,  
        &#39;element-plus&#39;:&quot;ElementPlus&quot;,  
        &quot;psl&quot;:&quot;psl&quot;,  
        &#39;vue-i18n&#39;:&#39;VueI18n&#39;,  
        &#39;@element-plus/icons-vue&#39;:&#39;ElementPlusIconsVue&#39;  
    },  
    plugins: [  
        AutoImport({  
  
            resolvers: [ElementPlusResolver({importStyle:false})],  
        }),  
        Components({  
            resolvers: [ElementPlusResolver({importStyle:false})],  
        }),  
        new VueLoaderPlugin(),  
        new UserscriptPlugin({  
  
            headers(original: HeadersProps) {  
                original.grant = [&quot;GM.setValue&quot;];  
               original.resource={  
                   &#39;element&#39;: &#39;https://registry.npmmirror.com/element-plus/2.7.2/files/dist/index.css&#39;,  
                   &#39;animate&#39;:&#39;https://registry.npmmirror.com/animate.css/4.1.1/files/animate.min.css&#39;  
               }  
                original.require = [ &quot;https://registry.npmmirror.com/vue/3.4.26/files/dist/vue.global.prod.js&quot;,  
                    &quot;https://registry.npmmirror.com/vue-i18n/9.13.1/files/dist/vue-i18n.global.prod.js&quot;,  
                    &#39;https://registry.npmmirror.com/psl/1.9.0/files/dist/psl.min.js&#39;,  
  
                    &#39;https://registry.npmmirror.com/dayjs/1.11.11/files/dayjs.min.js&#39;,  
                &quot;https://registry.npmmirror.com/element-plus/2.7.2/files/dist/index.full.min.js&quot;,  
                    &#39;https://registry.npmmirror.com/@element-plus/icons-vue/2.3.1/files/dist/index.iife.js&#39;  
  
            ]  
                if (dev) {  
                    // original.updateURL=&quot;https://github.com/trim21/webpack-userscript-template&quot;  
  
                    return {  
                        ...original,  
                        version: \`\${original.version}-build.[buildNo]\`,  
                    };  
                }  
  
                return original;  
            },  
            proxyScript: {  
                // http://localhost:9020/userscriptPlus.user.js  
                baseURL: pathToFileURL(&quot;./dist&quot;).href + &quot;/&quot;,  
                // baseURL: &quot;http://localhost:9010&quot;,  
                filename: &quot;[basename].proxy.user.js&quot;,  
            },  
        }),  
    ],  
};  
export default conf;
</code></pre><p>webpack.dev.mts</p><pre><code class="language-ts">import { merge } from &quot;webpack-merge&quot;;  
import base from &quot;./webpack.base.mjs&quot;;  
import path from &quot;node:path&quot;;  
import { fileURLToPath } from &quot;node:url&quot;;  
import &quot;webpack-dev-server&quot;;  
import { styleText } from &quot;node:util&quot;;  
import { type HeadersProps, UserscriptPlugin } from &quot;webpack-userscript&quot;;  
const dev = process.env.NODE_ENV == &quot;development&quot;;  
  
const devConf = merge(base, {  
  mode: &quot;development&quot;,  
  
  devServer: {  
    allowedHosts: &quot;all&quot;,  
    hot: false,  
    devMiddleware: {  
      writeToDisk: true,  
    },  
    client: {  
      overlay: false,  
      progress: true,  
      reconnect: 3,  
    },  
  
    static: {  
      directory: fileURLToPath(new URL(&quot;./dist&quot;, import.meta.url)),  
    },  
    port: 9020,  
  },  
  plugins: [],  
});  
export default devConf;
</code></pre><p><strong>如何hot reload</strong></p><h3 id="对于暴力猴" tabindex="-1"><a class="header-anchor" href="#对于暴力猴"><span>对于暴力猴</span></a></h3><ol><li>直接用浏览器打开本地js文件,然后跟踪外部编辑</li><li>网页打开<code>http://127.0.0.1:9010/simple.user.js</code>,在暴力猴安装界面选择 <code>跟踪外部编辑</code>,不要 关闭外部界面即可,关闭后需要重新打开上面的链接 这里使用的@require file:// 所以不会cache</li></ol><h3 id="对于油猴" tabindex="-1"><a class="header-anchor" href="#对于油猴"><span>对于油猴</span></a></h3><p>手动复制<code>dist/simple.proxy.user.js</code>里面的内容,创建新的脚本,然后页面刷新即可</p>`,21),r=[s];function a(p,q){return o(),e("div",null,r)}const c=t(u,[["render",a],["__file","webpack-tamper.html.vue"]]),l=JSON.parse('{"path":"/frontend/chrome-plugins/webpack-tamper.html","title":"webpack开发油猴脚本","lang":"zh-CN","frontmatter":{"description":"webpack开发油猴脚本 第一种,直接webpack --watch (有缓存,不推荐) webpack --watch 打包 dist/simple.user.js 在暴力猴里面使用//@require file://xx/dist/simple.user.js 这个方法有缺陷,@require加载的脚本会有缓存,需要好久脚本内容才会改变 http...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/chrome-plugins/webpack-tamper.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"webpack开发油猴脚本"}],["meta",{"property":"og:description","content":"webpack开发油猴脚本 第一种,直接webpack --watch (有缓存,不推荐) webpack --watch 打包 dist/simple.user.js 在暴力猴里面使用//@require file://xx/dist/simple.user.js 这个方法有缺陷,@require加载的脚本会有缓存,需要好久脚本内容才会改变 http..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-08T13:17:19.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-05-08T13:17:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"webpack开发油猴脚本\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-08T13:17:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"第一种,直接webpack --watch (有缓存,不推荐)","slug":"第一种-直接webpack-watch-有缓存-不推荐","link":"#第一种-直接webpack-watch-有缓存-不推荐","children":[]},{"level":2,"title":"第二种,使用webpack-dev-server+时间戳","slug":"第二种-使用webpack-dev-server-时间戳","link":"#第二种-使用webpack-dev-server-时间戳","children":[]},{"level":2,"title":"第三种webpack-userscript","slug":"第三种webpack-userscript","link":"#第三种webpack-userscript","children":[{"level":3,"title":"对于暴力猴","slug":"对于暴力猴","link":"#对于暴力猴","children":[]},{"level":3,"title":"对于油猴","slug":"对于油猴","link":"#对于油猴","children":[]}]}],"git":{"createdTime":1714738880000,"updatedTime":1715174239000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":2.62,"words":785},"filePathRelative":"frontend/chrome-plugins/webpack-tamper.md","localizedDate":"2024年5月3日","autoDesc":true}');export{c as comp,l as data};
