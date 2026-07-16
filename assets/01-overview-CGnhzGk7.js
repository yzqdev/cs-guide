import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/node-tutor/nestjs/01-overview.html","title":"NestJS 概述与项目搭建","lang":"zh-CN","frontmatter":{"order":1,"description":"NestJS 概述与项目搭建 NestJS 是一个用于构建高效、可扩展的 Node.js 服务端应用的框架。它使用 TypeScript，融合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式响应式编程）的理念。 一、NestJS 核心特性 二、环境准备 1. 安装 Node.js 确保已安装 Node.js v16+： 2. 安装 Ne...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NestJS 概述与项目搭建\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/nestjs/01-overview.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"NestJS 概述与项目搭建"}],["meta",{"property":"og:description","content":"NestJS 概述与项目搭建 NestJS 是一个用于构建高效、可扩展的 Node.js 服务端应用的框架。它使用 TypeScript，融合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式响应式编程）的理念。 一、NestJS 核心特性 二、环境准备 1. 安装 Node.js 确保已安装 Node.js v16+： 2. 安装 Ne..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.02,"words":607},"filePathRelative":"node-tutor/nestjs/01-overview.md","autoDesc":true}`),a={name:`01-overview.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="nestjs-概述与项目搭建" tabindex="-1"><a class="header-anchor" href="#nestjs-概述与项目搭建"><span>NestJS 概述与项目搭建</span></a></h1><p>NestJS 是一个用于构建高效、可扩展的 Node.js 服务端应用的框架。它使用 TypeScript，融合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式响应式编程）的理念。</p><h2 id="一、nestjs-核心特性" tabindex="-1"><a class="header-anchor" href="#一、nestjs-核心特性"><span>一、NestJS 核心特性</span></a></h2><table><thead><tr><th>特性</th><th>说明</th></tr></thead><tbody><tr><td><strong>模块化架构</strong></td><td>借鉴 Angular 的模块系统，代码组织清晰</td></tr><tr><td><strong>依赖注入</strong></td><td>内置 DI 容器，松耦合、易测试</td></tr><tr><td><strong>面向切面编程</strong></td><td>通过 Guards / Interceptors / Pipes / Filters 实现横切关注点分离</td></tr><tr><td><strong>TypeScript 支持</strong></td><td>原生 TypeScript，类型安全</td></tr><tr><td><strong>多种传输层</strong></td><td>支持 HTTP / WebSocket / gRPC / GraphQL</td></tr><tr><td><strong>丰富的生态</strong></td><td>官方和社区提供了大量模块（数据库、认证、配置等）</td></tr></tbody></table><h2 id="二、环境准备" tabindex="-1"><a class="header-anchor" href="#二、环境准备"><span>二、环境准备</span></a></h2><h3 id="_1-安装-node-js" tabindex="-1"><a class="header-anchor" href="#_1-安装-node-js"><span>1. 安装 Node.js</span></a></h3><p>确保已安装 Node.js v16+：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">node</span> <span class="token parameter variable">--version</span>   <span class="token comment"># ≥ v16</span></span>
<span class="line"><span class="token function">npm</span> <span class="token parameter variable">--version</span>    <span class="token comment"># ≥ v8</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-安装-nestjs-cli" tabindex="-1"><a class="header-anchor" href="#_2-安装-nestjs-cli"><span>2. 安装 NestJS CLI</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> @nestjs/cli</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证安装</span></span>
<span class="line">nest <span class="token parameter variable">--version</span></span>
<span class="line"></span></code></pre></div><h2 id="三、创建新项目" tabindex="-1"><a class="header-anchor" href="#三、创建新项目"><span>三、创建新项目</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建项目</span></span>
<span class="line">nest new my-nest-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 选择包管理器（npm / yarn / pnpm）</span></span>
<span class="line"><span class="token comment"># 创建完成后进入项目目录</span></span>
<span class="line"><span class="token builtin class-name">cd</span> my-nest-app</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动开发服务器</span></span>
<span class="line"><span class="token function">npm</span> run start:dev</span>
<span class="line"></span></code></pre></div><p>项目结构：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">my-nest-app/</span>
<span class="line">├── src/</span>
<span class="line">│   ├── main.ts          # 入口文件</span>
<span class="line">│   ├── app.module.ts    # 根模块</span>
<span class="line">│   ├── app.controller.ts # 根控制器</span>
<span class="line">│   └── app.service.ts   # 根服务</span>
<span class="line">├── test/                # 测试文件</span>
<span class="line">├── nest-cli.json        # Nest CLI 配置</span>
<span class="line">├── tsconfig.json        # TypeScript 配置</span>
<span class="line">├── tsconfig.build.json  # 构建配置</span>
<span class="line">├── package.json</span>
<span class="line">└── .eslintrc.js</span>
<span class="line"></span></code></pre></div><h2 id="四、入口文件分析" tabindex="-1"><a class="header-anchor" href="#四、入口文件分析"><span>四、入口文件分析</span></a></h2><div class="language-typescript" data-highlighter="prismjs" data-ext="ts"><pre><code class="language-typescript"><span class="line"><span class="token comment">// src/main.ts</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> NestFactory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/core&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> AppModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./app.module&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><ul><li><code>NestFactory.create()</code> — 创建 Nest 应用实例</li><li><code>AppModule</code> — 应用的根模块</li><li><code>app.listen(3000)</code> — 监听 3000 端口</li></ul><p>添加常用配置：</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre><code class="language-typescript"><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> NestFactory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/core&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> AppModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./app.module&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> NestFactory<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>AppModule<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 启用 CORS</span></span>
<span class="line">    app<span class="token punctuation">.</span><span class="token function">enableCors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 设置全局路由前缀</span></span>
<span class="line">    app<span class="token punctuation">.</span><span class="token function">setGlobalPrefix</span><span class="token punctuation">(</span><span class="token string">&#39;api&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 设置全局管道（自动验证）</span></span>
<span class="line">    <span class="token comment">// app.useGlobalPipes(new ValidationPipe());</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;应用已启动：http://localhost:3000&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token function">bootstrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、启动方式" tabindex="-1"><a class="header-anchor" href="#五、启动方式"><span>五、启动方式</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 开发模式（热重载）</span></span>
<span class="line"><span class="token function">npm</span> run start:dev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生产模式</span></span>
<span class="line"><span class="token function">npm</span> run build</span>
<span class="line"><span class="token function">npm</span> run start:prod</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 调试模式</span></span>
<span class="line"><span class="token function">npm</span> run start:debug</span>
<span class="line"></span></code></pre></div><h2 id="六、hello-world" tabindex="-1"><a class="header-anchor" href="#六、hello-world"><span>六、Hello World</span></a></h2><p>创建项目后默认的 <code>app.controller.ts</code>：</p><div class="language-typescript" data-highlighter="prismjs" data-ext="ts"><pre><code class="language-typescript"><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> Controller<span class="token punctuation">,</span> Get <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@nestjs/common&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Controller</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppController</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Get</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">getHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;Hello NestJS!&#39;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>访问 <code>http://localhost:3000</code>，返回 <code>Hello NestJS!</code>。</p><h2 id="七、cli-快速创建资源" tabindex="-1"><a class="header-anchor" href="#七、cli-快速创建资源"><span>七、CLI 快速创建资源</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建 CRUD 资源（推荐）</span></span>
<span class="line">nest g resource <span class="token function">users</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 选择 REST API，自动生成：</span></span>
<span class="line"><span class="token comment"># - users.controller.ts</span></span>
<span class="line"><span class="token comment"># - users.service.ts</span></span>
<span class="line"><span class="token comment"># - users.module.ts</span></span>
<span class="line"><span class="token comment"># - users.entity.ts</span></span>
<span class="line"><span class="token comment"># - users.dto.ts</span></span>
<span class="line"><span class="token comment"># - 完整 CRUD 代码</span></span>
<span class="line"></span></code></pre></div><h2 id="八、练习" tabindex="-1"><a class="header-anchor" href="#八、练习"><span>八、练习</span></a></h2><ol><li>使用 CLI 创建一个新的 NestJS 项目</li><li>修改 <code>main.ts</code>，在启动时打印&quot;服务器已启动&quot;</li><li>在根控制器中添加一个返回当前时间的 GET 接口</li></ol>`,29)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};