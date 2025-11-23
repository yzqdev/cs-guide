import{_ as n,c as a,a as e,o as p}from"./app-B6vXTniy.js";const l="/cs-guide/assets/1624847415596-3352a92f-4311-4d2e-bcd4-e48721bfebe3-Dvex4BLL.png",t="/cs-guide/assets/1624847415714-529369b2-6c50-47af-93cb-3368824f70b4-D1q_U8F9.png",i="/cs-guide/assets/1624847415629-4a7a5f1e-7644-4370-9ed7-e1f83ce4873f-4UXNc5Wp.png",r="/cs-guide/assets/1624847415617-6b0abd5e-0f61-4274-b577-0d5dff873bb1-CpkBIPVR.png",o="/cs-guide/assets/1624847415620-7b86a738-135c-4192-b83f-b05866383816-ykQmro20.png",c={};function u(d,s){return p(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="vue-router教程" tabindex="-1"><a class="header-anchor" href="#vue-router教程"><span>vue-router教程</span></a></h1><h2 id="一、安装" tabindex="-1"><a class="header-anchor" href="#一、安装"><span>一、安装</span></a></h2><p>如果你用vue-cli脚手架来搭建项目，配置过程会选择是否用到路由（详细见<a href="https://mp.csdn.net/postedit/80488674" target="_blank" rel="noopener noreferrer">vue-cli 脚手架</a>），如果选择y，后面下载依赖会自动下载vue-router。 这里还是说一下安装：<code>npm install vue-router</code></p><h2 id="二、创建组件" tabindex="-1"><a class="header-anchor" href="#二、创建组件"><span>二、创建组件</span></a></h2><p>如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能，用vue-cli生产了我们的项目结构，<strong>src文件目录下会有一个router文件夹</strong>，此处就是编写路由组件的地方。在src/router/index.js，这个文件就是路由的核心文件：</p><div class="language-jsscript line-numbers-mode" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">import Vue from &#39;vue&#39;   //引入Vue</span>
<span class="line">import Router from &#39;vue-router&#39;  //引入vue-router</span>
<span class="line">import Hello from &#39;@/components/Hello&#39;  //引入根目录下的Hello.vue组件</span>
<span class="line"> </span>
<span class="line">Vue.use(Router)  //Vue全局使用Router</span>
<span class="line"> </span>
<span class="line">export default new Router({</span>
<span class="line">  routes: [              //配置路由，这里是个数组</span>
<span class="line">    {                    //每一个链接都是一个对象</span>
<span class="line">      path: &#39;/&#39;,         //链接路径</span>
<span class="line">      name: &#39;Hello&#39;,     //路由名称，</span>
<span class="line">      component: Hello   //对应的组件模板</span>
<span class="line">    }，{</span>
<span class="line">      path:&#39;/hi&#39;,</span>
<span class="line">      component:Hi,</span>
<span class="line">      children:[        //子路由,嵌套路由 （此处偷个懒，免得单独再列一点）</span>
<span class="line">        {path:&#39;/&#39;,component:Hi},</span>
<span class="line">        {path:&#39;hi1&#39;,component:Hi1},</span>
<span class="line">        {path:&#39;hi2&#39;,component:Hi2},</span>
<span class="line">      ]</span>
<span class="line">    }</span>
<span class="line">  ]</span>
<span class="line">})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、router-link制作导航" tabindex="-1"><a class="header-anchor" href="#三、router-link制作导航"><span>三、router-link制作导航</span></a></h2><p><strong>1.router-link</strong> 是一个组件，它默认会被渲染成一个带有链接的a标签，通过to属性指定链接地址。 注意：被选中的router-link将自动添加一个class属性值.router-link-active。</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>[text]<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre></div><ul><li>to：导航路径，要填写的是你在router/index.js文件里配置的path值，如果要导航到默认首页，只需要写成 to=&quot;/&quot; ，</li><li>[text] ：就是我们要显示给用户的导航名称。 <strong>2.router-view</strong> 用于渲染匹配到的组件。 ①.可以给router-view组件设置<strong>transition过渡</strong>（<a href="https://link.jianshu.com/?t=http%3A%2F%2Fhyuhan.com%2F2016%2F12%2F08%2Fvue-transition%2F" target="_blank" rel="noopener noreferrer">Vue2.0 Transition常见用法全解惑</a>）。</li></ul><div class="language-jsscript" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">&lt;transition name=&quot;fade&quot;&gt;</span>
<span class="line">  &lt;router-view &gt;&lt;/router-view&gt;</span>
<span class="line">&lt;/transition&gt;</span>
<span class="line"></span></code></pre></div><p><strong>css过渡类名：</strong> 组件过渡过程中，会有四个CSS类名进行切换，这四个类名与transition的name属性有关，比如name=&quot;fade&quot;,会有如下四个CSS类名：</p><ul><li>fade-enter:进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除。</li><li>fade-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除。</li><li>fade-leave:离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除。</li><li>fade-leave-active:离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除。 从上面四个类名可以看出，<strong>fade-enter-active</strong>和<strong>fade-leave-active</strong>在整个进入或离开过程中都有效，所以CSS的transition属性在这两个类下进行设置。 <strong>过渡模式mode：</strong></li><li>in-out(mode默认in-out模式）：新元素先进入过渡，完成之后当前元素过渡离开。</li><li>out-in：当前元素先进行过渡离开，离开完成后新元素过渡进入。 ②.还可以配合<code>&lt;keep-alive&gt;</code>使用，<strong>keep-alive</strong>可以缓存数据，这样不至于重新渲染路由组件的时候，之前那个路由组件的数据被清除了。比如对当前的路由组件a进行了一些DOM操作之后，点击进入另一个路由组件b，再回到路由组件a的时候之前的DOM操作还保存在，如果不加keep-alive再回到路由组件a时，之前的DOM操作就没有了，得重新进行。如果你的应用里有一个购物车组件，就需要用到keep-alive。</li></ul><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>transition</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>transition</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre></div><h2 id="四、动态路由匹配" tabindex="-1"><a class="header-anchor" href="#四、动态路由匹配"><span>四、动态路由匹配</span></a></h2><p>我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。 调用router的map方法映射路由，每条路由以key-value的形式存在，key是路径，value是组件。例如：&#39;/home&#39;是一条路由的key，它表示路径；{component: Home}则表示该条路由映射的组件：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line">router<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">&#39;/home&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">component</span><span class="token operator">:</span> Home <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&#39;/about&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">component</span><span class="token operator">:</span> About <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用『动态路径参数』来达到这个效果。</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">const</span> User <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;User&lt;/div&gt;&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"> </span>
<span class="line"><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token comment">// 动态路径参数 以冒号开头</span></span>
<span class="line">    <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/user/:id&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> User <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>例如： /user/foo 和 /user/bar 都将映射到相同的路由。 一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到<strong>this.$route.params</strong> 中。例如： <img src="`+l+'" alt="1624847415596-3352a92f-4311-4d2e-bcd4-e48721bfebe3.png"></p><h2 id="五、vue-router参数传递" tabindex="-1"><a class="header-anchor" href="#五、vue-router参数传递"><span>五、vue-router参数传递</span></a></h2><p>1.用name传值（不推荐） <img src="'+t+`" alt="1624847415714-529369b2-6c50-47af-93cb-3368824f70b4.png"> 2.通过 标签中的to传参</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;router-link :to=&quot;{name:‘dxl’,params:{key:value}}&quot;&gt;东西里&lt;/router-link&gt;</span>
<span class="line"></span></code></pre></div><ul><li>name：就是我们在路由配置文件中起的name值。 另：<strong>命名路由</strong>就是用一个名称来标识一个路由，在定义路由的时候设置一个name属性即可。<strong>在router-link中也可以用路由的名字来链接到一个路由。</strong></li><li>params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。 最后用<code>$route.params.username</code>进行接收. 3.用url传参 上面第五点也有提到。 <strong>:冒号的形式传递参数</strong> (1).在router路由配置文件里以冒号的形式设置参数</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">{</span>
<span class="line">    path:&#39;/params/:newsId/:userName,</span>
<span class="line">    component:Params</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>(2).组件形式，在src/components目录下建立我们params.vue组件。 我们在页面里输出了url传递的参数。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;template&gt;</span>
<span class="line">    &lt;div&gt;</span>
<span class="line">        &lt;h2&gt;{{ msg }}&lt;/h2&gt;</span>
<span class="line">        &lt;p&gt;新闻ID：{{ $route.params.newsId}}&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;用户名：{{ $route.params.userName}}&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line">&lt;script&gt;</span>
<span class="line">export default {</span>
<span class="line">  name: &#39;params&#39;,</span>
<span class="line">  data () {</span>
<span class="line">    return {</span>
<span class="line">      msg: &#39;params page&#39;</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(3).标签path路径中传值</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;router-link to=&quot;/params/888/dxl shuai&gt;params&lt;/router-link&gt;</span>
<span class="line"></span></code></pre></div><p>(4).正则表达式在URL传值中的应用 希望我们传递的新闻ID只能是数字的形式，这时候我们就需要在传递时有个基本的类型判断，<code>path:&#39;/params/:newsId(\\\\d+)/:userName&#39;</code></p><h2 id="六-响应路由参数的变化" tabindex="-1"><a class="header-anchor" href="#六-响应路由参数的变化"><span>六.响应路由参数的变化</span></a></h2><p>当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。 复用组件时，想对路由参数的变化作出响应的话: (1). watch（监测变化） $route 对象：</p><div class="language-jsscript" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">const User = {</span>
<span class="line">  template: &#39;...&#39;,</span>
<span class="line">  watch: {</span>
<span class="line">    &#39;$route&#39; (to, from) {</span>
<span class="line">      // 对路由变化作出响应...</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>(2).beforeRouteUpdate 导航守卫 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 <code>/users/1</code> -&gt; <code>/users/2</code>)，你需要使用 <code>beforeRouteUpdate</code>来响应这个变化 (比如抓取用户信息)。</p><div class="language-jsscript" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">const User = {</span>
<span class="line">  template: &#39;...&#39;,</span>
<span class="line">  beforeRouteUpdate (to, from, next) {</span>
<span class="line">    // react to route changes...</span>
<span class="line">    // don&#39;t forget to call next()</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="七、实现不同路由不同页面标题" tabindex="-1"><a class="header-anchor" href="#七、实现不同路由不同页面标题"><span>七、实现不同路由不同页面标题</span></a></h2><div class="language-jsscript" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">// 定义路由的时候如下定义，name也可为中文</span>
<span class="line">const routes = [</span>
<span class="line">  { path: &#39;/goods&#39;, component: goods, name: &#39;goods&#39; },</span>
<span class="line">  { path: &#39;/orders&#39;, component: orders, name: &#39;orders&#39; },</span>
<span class="line">  { path: &#39;/seller&#39;, component: seller, name: &#39;seller&#39; }</span>
<span class="line">];</span>
<span class="line">// 创建路由实例</span>
<span class="line">const router = new VueRouter({</span>
<span class="line">  routes: routes</span>
<span class="line">})</span>
<span class="line">// 关键在这里，设置afterEach钩子函数</span>
<span class="line">router.afterEach((to, from, next) =&gt; {</span>
<span class="line">  document.title = to.name;</span>
<span class="line">})</span>
<span class="line"></span></code></pre></div><h2 id="八、重定向" tabindex="-1"><a class="header-anchor" href="#八、重定向"><span>八、重定向</span></a></h2><p>刚进入应用都是进入到“/”这个路由的，如果想直接进入到“/goods”怎么办，有两种方法。一种是利用重定向，另一种是利用vue-router的导航式编程。 redirect基本重定向：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token string">&#39;/goods&#39;</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line">重定向的目标也可以是一个命名的路由。</span>
<span class="line"><span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">redirect</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;goods&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line">重定向时也可以传递参数</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">redirect</span><span class="token operator">:</span><span class="token string">&#39;/goods/:newsId(\\\\d+)/:userName&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>★.这里不得不提到<strong>alias</strong>别名的使用。 1.首先我们在路由配置文件里给路径起一个别名，dxl。</p><div class="language-css" data-highlighter="prismjs" data-ext="css"><pre><code class="language-css"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">path</span><span class="token punctuation">:</span> <span class="token string">&#39;/hi&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">component</span><span class="token punctuation">:</span> Hi<span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">alias</span><span class="token punctuation">:</span><span class="token string">&#39;/dxl&#39;</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>2.配置我们的，起过别名之后，可以直接使用标签里的to属性，进行重新定向。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;router-link to=&quot;/dxl&quot;&gt;jspang&lt;/router-link&gt;</span>
<span class="line"></span></code></pre></div><p>区别：</p><ul><li>redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。</li><li>alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了中的内容。 ★★★.注意一个大坑： <strong>别名alias在path为&#39;/&#39;中，是不起作用的。</strong></li></ul><div class="language-css" data-highlighter="prismjs" data-ext="css"><pre><code class="language-css"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">path</span><span class="token punctuation">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">component</span><span class="token punctuation">:</span> Hello<span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">alias</span><span class="token punctuation">:</span><span class="token string">&#39;/home&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="九、编程式导航" tabindex="-1"><a class="header-anchor" href="#九、编程式导航"><span>九、编程式导航</span></a></h2><p><strong>1.router.push( )</strong> 想要导航到不同的 URL，则使用 <strong>router.push (在创建vue实例并挂载后调用)</strong>。router.push方法就是用来动态导航到不同的链接的，这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。 当你点击  时，这个方法会在内部调用，所以说，点击  等同于调用 router.push(...)。 <img src="`+i+`" alt="1624847415629-4a7a5f1e-7644-4370-9ed7-e1f83ce4873f.png"><strong>注意： 如果提供了 path，params 会被忽略，而 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：</strong></p><div class="language-jsscript" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">const userId = 123</span>
<span class="line">router.push({ name: &#39;user&#39;, params: { userId }}) // -&gt; /user/123</span>
<span class="line">router.push({ path: \`/user/\${userId}\` }) // -&gt; /user/123</span>
<span class="line">// 这里的 params 不生效</span>
<span class="line">router.push({ path: &#39;/user&#39;, params: { userId }}) // -&gt; /user</span>
<span class="line"></span></code></pre></div><p><strong>2.router.replace( )</strong> router.replace跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。 <img src="`+r+`" alt="1624847415617-6b0abd5e-0f61-4274-b577-0d5dff873bb1.png"><strong>3.router.go(n)</strong> 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。</p><div class="language-cpp" data-highlighter="prismjs" data-ext="cpp"><pre><code class="language-cpp"><span class="line"><span class="token comment">// 在浏览器记录中前进一步，等同于 history.forward()</span></span>
<span class="line">router<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 后退一步记录，等同于 history.back()</span></span>
<span class="line">router<span class="token punctuation">.</span><span class="token function">go</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>自定义一个goback()方法，并使用this.$router.go(-1),进行后退操作</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;script&gt;</span>
<span class="line">export default {</span>
<span class="line">  name: &#39;app&#39;,</span>
<span class="line">  methods:{</span>
<span class="line">    goback(){</span>
<span class="line">      this.$router.go(-1);</span>
<span class="line">    },</span>
<span class="line">    goHome(){</span>
<span class="line">      this.$router.push(&#39;/&#39;);</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span></code></pre></div><h2 id="十、路由中的钩子" tabindex="-1"><a class="header-anchor" href="#十、路由中的钩子"><span>十、路由中的钩子</span></a></h2><p><strong>1.路由配置文件中的钩子函数：</strong> 在路由文件中我们只能写一个beforeEnter,就是在进入此路由配置时：</p><div class="language-jsscript" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">{</span>
<span class="line">      path:&#39;/params/:newsId(\\\\d+)/:userName&#39;,</span>
<span class="line">      component:Params,</span>
<span class="line">      beforeEnter:(to,from,next)=&gt;{</span>
<span class="line">        console.log(&#39;我进入了params模板&#39;);</span>
<span class="line">        console.log(to);</span>
<span class="line">        console.log(from);</span>
<span class="line">        next();</span>
<span class="line">},</span>
<span class="line"></span></code></pre></div><p>三个参数：</p><ul><li>to:路由将要跳转的路径信息，信息是包含在对像里边的。</li><li>from:路径跳转前的路径信息，也是一个对象的形式。</li><li>next:路由的控制参数，常用的有next(true)和next(false)。 <strong>2.写在模板中的钩子函数：</strong> 写在模板中就可以有两个钩子函数可以使用。 beforeRouteEnter：在路由进入前的钩子函数。 beforeRouteLeave：在路由离开前的钩子函数。</li></ul><div class="language-jsscript line-numbers-mode" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">export default {</span>
<span class="line">  name: &#39;params&#39;,</span>
<span class="line">  data () {</span>
<span class="line">    return {</span>
<span class="line">      msg: &#39;params page&#39;</span>
<span class="line">    }</span>
<span class="line">  },</span>
<span class="line">  beforeRouteEnter:(to,from,next)=&gt;{</span>
<span class="line">    console.log(&quot;准备进入路由模板&quot;);</span>
<span class="line">    next();</span>
<span class="line">  },</span>
<span class="line">  beforeRouteLeave: (to, from, next) =&gt; {</span>
<span class="line">    console.log(&quot;准备离开路由模板&quot;);</span>
<span class="line">    next();</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>★此处常用于<strong>数据获取</strong>。</p><ul><li><strong>导航完成之后获取</strong>：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示。 当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 <strong>created</strong> 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。 假设我们有一个 Post 组件，需要基于 <code>$route.params.id</code> 获取文章数据：</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;template&gt;</span>
<span class="line">  &lt;div class=&quot;post&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;loading&quot; v-if=&quot;loading&quot;&gt;</span>
<span class="line">      Loading...</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div v-if=&quot;error&quot; class=&quot;error&quot;&gt;</span>
<span class="line">      {{ error }}</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div v-if=&quot;post&quot; class=&quot;content&quot;&gt;</span>
<span class="line">      &lt;h2&gt;{{ post.title }}&lt;/h2&gt;</span>
<span class="line">      &lt;p&gt;{{ post.body }}&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/template&gt;</span>
<span class="line">export default {</span>
<span class="line">  data () {</span>
<span class="line">    return {</span>
<span class="line">      loading: false,</span>
<span class="line">      post: null,</span>
<span class="line">      error: null</span>
<span class="line">    }</span>
<span class="line">  },</span>
<span class="line">  created () {</span>
<span class="line">    // 组件创建完后获取数据，</span>
<span class="line">    // 此时 data 已经被 observed 了</span>
<span class="line">    this.fetchData()</span>
<span class="line">  },</span>
<span class="line">  watch: {</span>
<span class="line">    // 如果路由有变化，会再次执行该方法</span>
<span class="line">    &#39;$route&#39;: &#39;fetchData&#39;</span>
<span class="line">  },</span>
<span class="line">  methods: {</span>
<span class="line">    fetchData () {</span>
<span class="line">      this.error = this.post = null</span>
<span class="line">      this.loading = true</span>
<span class="line">      // replace getPost with your data fetching util / API wrapper</span>
<span class="line">      getPost(this.$route.params.id, (err, post) =&gt; {</span>
<span class="line">        this.loading = false</span>
<span class="line">        if (err) {</span>
<span class="line">          this.error = err.toString()</span>
<span class="line">        } else {</span>
<span class="line">          this.post = post</span>
<span class="line">        }</span>
<span class="line">      })</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>导航完成之前获取</strong>：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后再执行导航。 通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。</li></ul><div class="language-jsscript line-numbers-mode" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">export default {</span>
<span class="line">  data () {</span>
<span class="line">    return {</span>
<span class="line">      post: null,</span>
<span class="line">      error: null</span>
<span class="line">    }</span>
<span class="line">  },</span>
<span class="line">  beforeRouteEnter (to, from, next) {</span>
<span class="line">    getPost(to.params.id, (err, post) =&gt; {</span>
<span class="line">      next(vm =&gt; vm.setData(err, post))</span>
<span class="line">    })</span>
<span class="line">  },</span>
<span class="line">  // 路由改变前，组件就已经渲染完了</span>
<span class="line">  // 逻辑稍稍不同</span>
<span class="line">  beforeRouteUpdate (to, from, next) {</span>
<span class="line">    this.post = null</span>
<span class="line">    getPost(to.params.id, (err, post) =&gt; {</span>
<span class="line">      this.setData(err, post)</span>
<span class="line">      next()</span>
<span class="line">    })</span>
<span class="line">  },</span>
<span class="line">  methods: {</span>
<span class="line">    setData (err, post) {</span>
<span class="line">      if (err) {</span>
<span class="line">        this.error = err.toString()</span>
<span class="line">      } else {</span>
<span class="line">        this.post = post</span>
<span class="line">      }</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十一、history-模式" tabindex="-1"><a class="header-anchor" href="#十一、history-模式"><span>十一、History 模式</span></a></h2><p>vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。 如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;history&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>在学习过渡效果的时候，我们学了mode的设置，但是在路由的属性中还有一个mode。 <strong>mode的两个值：</strong></p><ul><li>histroy:当你使用 history 模式时，URL 就像正常的 url， <a href="http://www.dxl.com/user/id" target="_blank" rel="noopener noreferrer">http://www.dxl.com/user/id</a> 不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 <a href="http://www.dxl.com/user/id" target="_blank" rel="noopener noreferrer">http://www.dxl.com/user/id</a> 就会返回 404，。所以要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。 <img src="`+o+`" alt="1624847415620-7b86a738-135c-4192-b83f-b05866383816.png"> 这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 index.html 文件。 为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。</li></ul><div class="language-jsscript" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">const router = new VueRouter({</span>
<span class="line">  mode: &#39;history&#39;,</span>
<span class="line">  routes: [</span>
<span class="line">    { path: &#39;*&#39;, component: Error}</span>
<span class="line">  ]</span>
<span class="line">})</span>
<span class="line"></span></code></pre></div><p>这里的path:&#39;*&#39;就是找不到页面时的配置，component是我们新建的一个Error.vue的文件</p><ul><li>hash:默认’hash’值，但是hash看起来就像无意义的字符排列，不太好看也不符合我们一般的网址浏览习惯。不配置时是这样的：<a href="https://link.jianshu.com/?t=http%3A%2F%2Flocalhost%3A8080%2F%23%2Fusers" target="_blank" rel="noopener noreferrer">http://localhost:8080/#/users</a>，多个#号。</li></ul><h2 id="十二、路由组件传参" tabindex="-1"><a class="header-anchor" href="#十二、路由组件传参"><span>十二、路由组件传参</span></a></h2><p>（这点是直接粘贴的vue官网上的教程，此处是重点要多看多体会！） 在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。 <strong>解耦前：</strong><code>id</code>不能直接拿出来使用</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">const</span> User <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;User {{ $route.params.id }}&lt;/div&gt;&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/user/:id&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> User <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p><strong>使用 props 将组件和路由解耦：</strong></p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">const</span> User <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;User {{ id }}&lt;/div&gt;&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/user/:id&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> User<span class="token punctuation">,</span> <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"> </span>
<span class="line">    <span class="token comment">// 对于包含命名视图的路由，你必须分别为每个命名视图添加 \`props\` 选项：</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/user/:id&#39;</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token keyword">default</span><span class="token operator">:</span> User<span class="token punctuation">,</span> <span class="token literal-property property">sidebar</span><span class="token operator">:</span> Sidebar <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token keyword">default</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。 <strong>1.布尔模式</strong> 如果 props 被设置为 true，route.params 将会被设置为组件属性。 <strong>2.对象模式</strong> 如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/promotion/from-newsletter&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> Promotion<span class="token punctuation">,</span> <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">newsletterPopup</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p><strong>3.函数模式</strong> 你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。</p><div class="language-jsscript" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">const router = new VueRouter({</span>
<span class="line">  routes: [</span>
<span class="line">    { path: &#39;/search&#39;, component: SearchUser, props: (route) =&gt; ({ query: route.query.q }) }</span>
<span class="line">  ]</span>
<span class="line">})</span>
<span class="line"></span></code></pre></div><p><code>/search?q=vue</code>会将<code>{query: &#39;vue&#39;}</code>作为属性传递给 SearchUser 组件。 请尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应。</p><div class="language-jsscript line-numbers-mode" data-highlighter="prismjs" data-ext="jsscript"><pre><code class="language-jsscript"><span class="line">function dynamicPropsFn (route) {</span>
<span class="line">  const now = new Date()</span>
<span class="line">  return {</span>
<span class="line">    name: (now.getFullYear() + parseInt(route.params.years)) + &#39;!&#39;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line">const router = new VueRouter({</span>
<span class="line">  mode: &#39;history&#39;,</span>
<span class="line">  base: __dirname,</span>
<span class="line">  routes: [</span>
<span class="line">    { path: &#39;/&#39;, component: Hello }, // No props, no nothing</span>
<span class="line">    { path: &#39;/hello/:name&#39;, component: Hello, props: true }, // Pass route.params to props</span>
<span class="line">    { path: &#39;/static&#39;, component: Hello, props: { name: &#39;world&#39; }}, // static values</span>
<span class="line">    { path: &#39;/dynamic/:years&#39;, component: Hello, props: dynamicPropsFn }, // custom logic for mapping between route and props</span>
<span class="line">    { path: &#39;/attrs&#39;, component: Hello, props: { name: &#39;attrs&#39; }}</span>
<span class="line">  ]</span>
<span class="line">})</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,84)])])}const m=n(c,[["render",u]]),g=JSON.parse('{"path":"/frontend/framework/vue/vue-router.html","title":"vue-router教程","lang":"zh-CN","frontmatter":{"order":2,"description":"vue-router教程 一、安装 如果你用vue-cli脚手架来搭建项目，配置过程会选择是否用到路由（详细见vue-cli 脚手架），如果选择y，后面下载依赖会自动下载vue-router。 这里还是说一下安装：npm install vue-router 二、创建组件 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue-router教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/vue/vue-router.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vue-router教程"}],["meta",{"property":"og:description","content":"vue-router教程 一、安装 如果你用vue-cli脚手架来搭建项目，配置过程会选择是否用到路由（详细见vue-cli 脚手架），如果选择y，后面下载依赖会自动下载vue-router。 这里还是说一下安装：npm install vue-router 二、创建组件 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}]]},"git":{"createdTime":1647861419000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":6,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":13.78,"words":4134},"filePathRelative":"frontend/framework/vue/vue-router.md","autoDesc":true}');export{m as comp,g as data};
