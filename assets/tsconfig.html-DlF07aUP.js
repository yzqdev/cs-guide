import{_ as t,c as o,o as e,d as n}from"./app-CbULZrmi.js";const u={},r=n(`<h1 id="tsconfig配置" tabindex="-1"><a class="header-anchor" href="#tsconfig配置"><span>tsconfig配置</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>tsconfig.json 文件是 TypeScript 项目的核心配置文件，它包含了 tsconfig.json 文件的所有可用选项。</p><h2 id="target" tabindex="-1"><a class="header-anchor" href="#target"><span>target</span></a></h2><p>就是TypeScript文件编译后生成的javascript文件里的语法应该遵循哪个JavaScript的版本。可选项为：&quot;ES5&quot;， &quot;ES6&quot;/ &quot;ES2015&quot;， &quot;ES2016&quot;， &quot;ES2017&quot;或 &quot;ESNext&quot;</p><h2 id="module" tabindex="-1"><a class="header-anchor" href="#module"><span>module</span></a></h2><p>就是你的TypeScript文件中的module，采用何种方式实现，可选项为：&quot;None&quot;， &quot;CommonJS&quot;， &quot;AMD&quot;， &quot;System&quot;， &quot;UMD&quot;， &quot;ES6&quot;或 &quot;ES2015&quot;</p><h2 id="moduleresolution" tabindex="-1"><a class="header-anchor" href="#moduleresolution"><span>moduleResolution</span></a></h2><p>就是告诉TypeScript编译器，采用何种方式解析（也就是查找）TypeScript文件中依赖的模块的位置</p><p>简而言之:</p><p><strong>target指的是js语法糖,基本不用管,而module表示编译出来的js是<code>export default</code>这种格式,还是<code>module.exports=</code>这种格式的,moduleResolution也基本不用管,大部分时间用<code>Node</code>和<code>Bundler</code>即可</strong></p><p><strong>注意</strong></p><p>如果设置了<code>type:module</code>，使用ts-node会出现<code>TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension &quot;.ts&quot;</code>,建议使用其他的工具像<code>esbuild,swc,sucrase</code> 然而不设置的话会出现<code>SyntaxError: Cannot use import statement outside a module</code></p></div><p>见<a href="https://segmentfault.com/a/1190000021421461" target="_blank" rel="noopener noreferrer">segmentfault</a></p><p><a href="https://www.typescriptlang.org/tsconfig" target="_blank" rel="noopener noreferrer">官网教程</a></p><pre><code class="language-json">{
  &quot;compilerOptions&quot;: {
    /* 基本选项 */
    &quot;target&quot;: &quot;ES2015&quot;,                       // 指定 ECMAScript 目标版本: &#39;ES3&#39; (default), &#39;ES5&#39;, &#39;ES2015&#39;, &#39;ES2016&#39;, &#39;ES2017&#39;, or &#39;ESNEXT&#39;（&quot;ESNext&quot;表示最新的ES语法，包括还处在stage X阶段）
    &quot;module&quot;: &quot;commonjs&quot;,                  // 指定使用模块: &#39;commonjs&#39;, &#39;amd&#39;, &#39;system&#39;, &#39;umd&#39; or &#39;es2015&#39;
    &quot;lib&quot;: [],                             // 指定要包含在编译中的库文件
    &quot;allowJs&quot;: true,                       // 允许编译 javascript 文件
    &quot;checkJs&quot;: true,                       // 报告 javascript 文件中的错误
    &quot;jsx&quot;: &quot;preserve&quot;,                     // 指定 jsx 代码的生成: &#39;preserve&#39;, &#39;react-native&#39;, or &#39;react&#39;
    &quot;declaration&quot;: true,                   // 生成相应的 &#39;.d.ts&#39; 文件
    &quot;sourceMap&quot;: true,                     // 生成相应的 &#39;.map&#39; 文件
    &quot;outFile&quot;: &quot;./&quot;,                       // 将输出文件合并为一个文件
    &quot;outDir&quot;: &quot;./&quot;,                        // 指定输出目录
    &quot;rootDir&quot;: &quot;./&quot;,                       // 用来控制输出目录结构 --outDir.
    &quot;removeComments&quot;: true,                // 删除编译后的所有的注释
    &quot;noEmit&quot;: true,                        // 不生成输出文件
    &quot;importHelpers&quot;: true,                 // 从 tslib 导入辅助工具函数
    &quot;isolatedModules&quot;: true,               // 将每个文件做为单独的模块 （与 &#39;ts.transpileModule&#39; 类似）.

    /* 严格的类型检查选项 */
    &quot;strict&quot;: true,                        // 启用所有严格类型检查选项
    &quot;noImplicitAny&quot;: true,                 // 在表达式和声明上有隐含的 any类型时报错
    &quot;strictNullChecks&quot;: true,              // 启用严格的 null 检查
    &quot;noImplicitThis&quot;: true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    &quot;alwaysStrict&quot;: true,                  // 以严格模式检查每个模块，并在每个文件里加入 &#39;use strict&#39;

    /* 额外的检查 */
    &quot;noUnusedLocals&quot;: true,                // 有未使用的变量时，抛出错误
    &quot;noUnusedParameters&quot;: true,            // 有未使用的参数时，抛出错误
    &quot;noImplicitReturns&quot;: true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    &quot;noFallthroughCasesInSwitch&quot;: true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    &quot;moduleResolution&quot;: &quot;node&quot;,            // 选择模块解析策略： &#39;node&#39; (Node.js) or &#39;classic&#39; (TypeScript pre-1.6)。默认是classic
    &quot;baseUrl&quot;: &quot;./&quot;,                       // 用于解析非相对模块名称的基目录
    &quot;paths&quot;: {},                           // 模块名到基于 baseUrl 的路径映射的列表
    &quot;rootDirs&quot;: [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    &quot;typeRoots&quot;: [],                       // 包含类型声明的文件列表
    &quot;types&quot;: [],                           // 需要包含的类型声明文件名列表
    &quot;allowSyntheticDefaultImports&quot;: true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    &quot;sourceRoot&quot;: &quot;./&quot;,                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    &quot;mapRoot&quot;: &quot;./&quot;,                       // 指定调试器应该找到映射文件而不是生成文件的位置
    &quot;inlineSourceMap&quot;: true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    &quot;inlineSources&quot;: true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    &quot;experimentalDecorators&quot;: true,        // 启用装饰器
    &quot;emitDecoratorMetadata&quot;: true,         // 为装饰器提供元数据的支持
    &quot;strictFunctionTypes&quot;: false           // 禁用函数参数双向协变检查。
  },
  /* 指定编译文件或排除指定编译文件 */
  &quot;include&quot;: [
      &quot;src/**/*&quot;
  ],
  &quot;exclude&quot;: [
      &quot;node_modules&quot;,
      &quot;**/*.spec.ts&quot;
  ],
  &quot;files&quot;: [
    &quot;core.ts&quot;,
    &quot;sys.ts&quot;
  ],
  // 从另一个配置文件里继承配置
  &quot;extends&quot;: &quot;./config/base&quot;,
  // 让IDE在保存文件的时候根据tsconfig.json重新生成文件
  &quot;compileOnSave&quot;: true // 支持这个特性需要Visual Studio 2015， TypeScript1.8.4以上并且安装atom-typescript插件
}
</code></pre><h2 id="错误-trynpm-i-save-dev-types-node-fetchif-it-exists-or-add-a-new-declaration-d-ts-file-containingdeclare-module-node-fetch" tabindex="-1"><a class="header-anchor" href="#错误-trynpm-i-save-dev-types-node-fetchif-it-exists-or-add-a-new-declaration-d-ts-file-containingdeclare-module-node-fetch"><span>错误<code> Try</code>npm i --save-dev @types/node-fetch<code>if it exists or add a new declaration (.d.ts) file containing</code>declare module &#39;node-fetch&#39;;\`</span></a></h2><p>tsconfig.json添加<code>skipLibCheck:true</code>或者<code>  &quot;noImplicitAny&quot;: false,</code></p>`,7),s=[r];function a(i,c){return e(),o("div",null,s)}const p=t(u,[["render",a],["__file","tsconfig.html.vue"]]),q=JSON.parse(`{"path":"/frontend/typescript/tsconfig.html","title":"tsconfig配置","lang":"zh-CN","frontmatter":{"description":"tsconfig配置 提示 tsconfig.json 文件是 TypeScript 项目的核心配置文件，它包含了 tsconfig.json 文件的所有可用选项。 target 就是TypeScript文件编译后生成的javascript文件里的语法应该遵循哪个JavaScript的版本。可选项为：\\"ES5\\"， \\"ES6\\"/ \\"ES2015\\"， \\"E...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/typescript/tsconfig.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"tsconfig配置"}],["meta",{"property":"og:description","content":"tsconfig配置 提示 tsconfig.json 文件是 TypeScript 项目的核心配置文件，它包含了 tsconfig.json 文件的所有可用选项。 target 就是TypeScript文件编译后生成的javascript文件里的语法应该遵循哪个JavaScript的版本。可选项为：\\"ES5\\"， \\"ES6\\"/ \\"ES2015\\"， \\"E..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-08T13:17:19.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-05-08T13:17:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"tsconfig配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-08T13:17:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"错误 Trynpm i --save-dev @types/node-fetchif it exists or add a new declaration (.d.ts) file containingdeclare module 'node-fetch';\`","slug":"错误-trynpm-i-save-dev-types-node-fetchif-it-exists-or-add-a-new-declaration-d-ts-file-containingdeclare-module-node-fetch","link":"#错误-trynpm-i-save-dev-types-node-fetchif-it-exists-or-add-a-new-declaration-d-ts-file-containingdeclare-module-node-fetch","children":[]}],"git":{"createdTime":1656898214000,"updatedTime":1715174239000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":3.63,"words":1090},"filePathRelative":"frontend/typescript/tsconfig.md","localizedDate":"2022年7月4日","autoDesc":true}`);export{p as comp,q as data};
