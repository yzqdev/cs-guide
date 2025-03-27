import{_ as e,c as t,a as o,o as n}from"./app-C8DxhDIZ.js";const d={};function s(i,a){return n(),t("div",null,a[0]||(a[0]=[o(`<h1 id="androidx迁移" tabindex="-1"><a class="header-anchor" href="#androidx迁移"><span>androidx迁移</span></a></h1><h2 id="compose兼容性" tabindex="-1"><a class="header-anchor" href="#compose兼容性"><span>compose兼容性</span></a></h2><p><a href="https://developer.android.google.cn/jetpack/androidx/releases/compose-kotlin" target="_blank" rel="noopener noreferrer">https://developer.android.google.cn/jetpack/androidx/releases/compose-kotlin</a></p><p>迁移文档: <a href="https://developer.android.google.cn/jetpack/androidx/migrate" target="_blank" rel="noopener noreferrer">谷歌开发者迁移文档</a> Google 2018 IO 大会推出了 Android新的扩展库 AndroidX，用于替换原来的 Android扩展库，将原来的<code>android.*</code>替换成<code>androidx.*</code>；只有包名和Maven工件名受到影响，原来的类名，方法名和字段名不会更改。接下来我们来看看使用 AndroidX的扩展库需要哪些配置。</p><h2 id="_1-androidx变化" tabindex="-1"><a class="header-anchor" href="#_1-androidx变化"><span>1. AndroidX变化</span></a></h2><p><strong>1）常用依赖库对比：</strong></p><table><thead><tr><th>Old  build artifact</th><th>AndroidX  build artifact</th></tr></thead><tbody><tr><td><code>com.android.support:appcompat-v7:28.0.2</code></td><td><code>androidx.appcompat:appcompat:1.0.0</code></td></tr><tr><td><code>com.android.support:design:28.0.2</code></td><td><code>com.google.android.material:material:1.0.0</code></td></tr><tr><td><code>com.android.support:support-v4:28.0.2</code></td><td><code>androidx.legacy:legacy-support-v4:1.0.0</code></td></tr><tr><td><code>com.android.support:recyclerview-v7:28.0.2</code></td><td><code>androidx.recyclerview:recyclerview:1.0.0</code></td></tr><tr><td><code>com.android.support.constraint:constraint-layout:1.1.2</code></td><td><code>androidx.constraintlayout:constraintlayout:1.1.2</code></td></tr></tbody></table><p>更多详细变化内容，可以<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.android.google.cn%2Ftopic%2Flibraries%2Fsupport-library%2Fdownloads%2Fandroidx-artifact-mapping.csv" target="_blank" rel="noopener noreferrer">下载CSV格式</a>映射文件；</p><p><strong>2）常用支持库类对比：</strong></p><table><thead><tr><th>Support Library class</th><th>AndroidX class</th></tr></thead><tbody><tr><td><code>android.support.v4.app.Fragment</code></td><td><code>androidx.fragment.app.Fragment</code></td></tr><tr><td><code>android.support.v4.app.FragmentActivity</code></td><td><code>androidx.fragment.app.FragmentActivity</code></td></tr><tr><td><code>android.support.v7.app.AppCompatActivity</code></td><td><code>androidx.appcompat.app.AppCompatActivity</code></td></tr><tr><td><code>android.support.v7.app.ActionBar</code></td><td><code>androidx.appcompat.app.ActionBar</code></td></tr><tr><td><code>android.support.v7.widget.RecyclerView</code></td><td><code>androidx.recyclerview.widget.RecyclerView</code></td></tr></tbody></table><p>更多详细变化内容，可以<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.android.google.cn%2Ftopic%2Flibraries%2Fsupport-library%2Fdownloads%2Fandroidx-class-mapping.csv" target="_blank" rel="noopener noreferrer">下载CSV格式</a>映射文件。</p><h2 id="_2-androidx配置" tabindex="-1"><a class="header-anchor" href="#_2-androidx配置"><span>2. AndroidX配置</span></a></h2><p><strong>1）更新升级插件</strong></p><ul><li>将AS更新至 <strong>AS 3.2</strong>及以上；</li><li>Gradle 插件版本改为 <strong>4.6</strong>及以上； 项目下 <code>gradle/wrapper/gradle-wrapper.propertie</code> 文件中的<code>distributionUrl</code>改为：</li></ul><div class="language-ruby" data-highlighter="prismjs" data-ext="rb" data-title="rb"><pre><code><span class="line">distributionUrl<span class="token operator">=</span>https\\<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>services<span class="token punctuation">.</span>gradle<span class="token punctuation">.</span>org<span class="token operator">/</span>distributions<span class="token operator">/</span>gradle<span class="token operator">-</span><span class="token number">4.6</span><span class="token operator">-</span>all<span class="token punctuation">.</span>zip</span>
<span class="line"></span></code></pre></div><ul><li>compileSdkVersion 版本升级到 <strong>28</strong>及以上；</li><li>buildToolsVersion 版本改为 <strong>28.0.2</strong>及以上。</li></ul><p><img src="https://upload-images.jianshu.io/upload_images/4625401-92ed6de990f27533.png?imageMogr2/auto-orient/strip|imageView2/2/w/546/format/webp#align=left&amp;display=inline&amp;height=261&amp;id=Kdgqq&amp;margin=[object Object]&amp;originHeight=261&amp;originWidth=546&amp;status=done&amp;style=none&amp;width=546" alt=""></p><p>插件更新提示</p><p><strong>2）开启迁移AndroidX</strong> 在项目的<code>gradle.properties</code>文件里添加如下配置：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token assign-left variable">android.useAndroidX</span><span class="token operator">=</span>true</span>
<span class="line"><span class="token assign-left variable">android.enableJetifier</span><span class="token operator">=</span>true</span>
<span class="line"></span></code></pre></div><p>表示项目启用 AndroidX 并迁移到 AndroidX。</p><p><strong>3）替换依赖库</strong> 修改项目app目录下的<code>build.gradle</code>依赖库：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">implementation <span class="token string">&#39;com.android.support:appcompat-v7:28.0.2&#39;</span> → implementation <span class="token string">&#39;androidx.appcompat:appcompat:1.0.0&#39;</span></span>
<span class="line">implementation <span class="token string">&#39;com.android.support:design:28.0.2&#39;</span>  → implementation <span class="token string">&#39;com.google.android.material:material:1.0.0&#39;</span></span>
<span class="line">implementation <span class="token string">&#39;com.android.support.constraint:constraint-layout:1.1.2&#39;</span> → implementation <span class="token string">&#39;androidx.constraintlayout:constraintlayout:1.1.2&#39;</span></span>
<span class="line"><span class="token punctuation">..</span>.</span>
<span class="line"></span></code></pre></div><p><strong>4）修改支持库类</strong> 将原来<code>import</code>的<code>android.**</code>包删除，重新<code>import</code>新的<code>androidx.**</code>包；</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>support<span class="token punctuation">.</span>v7<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">AppCompatActivity</span></span><span class="token punctuation">;</span> → <span class="token keyword">import</span> <span class="token import"><span class="token namespace">androidx<span class="token punctuation">.</span>appcompat<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">AppCompatActivity</span></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p><strong>5）一键迁移AndroidX库</strong> AS 3.2 及以上版本提供了更加方便快捷的方法一键迁移到 AndroidX。选择菜单上的<strong>ReFactor —— Migrate to AndroidX...</strong> 即可。（如果迁移失败，就需要重复上面1，2，3，4步手动去修改迁移）</p><p><img src="https://upload-images.jianshu.io/upload_images/4625401-b9524e8fa789d620.png?imageMogr2/auto-orient/strip|imageView2/2/w/316/format/webp#align=left&amp;display=inline&amp;height=423&amp;id=yiTs2&amp;margin=[object Object]&amp;originHeight=423&amp;originWidth=316&amp;status=done&amp;style=none&amp;width=316" alt=""></p><p>AndroidX 迁移</p><p>**注意：**如果你的项目compileSdkVersion 低于28，点击Refactor to AndroidX...会提示：</p><div class="language-cpp" data-highlighter="prismjs" data-ext="cpp" data-title="cpp"><pre><code><span class="line">You need to have at least have compileSdk <span class="token number">28</span> set in your <span class="token keyword">module</span> <span class="token module">build<span class="token punctuation">.</span>gradle</span> to refactor to androidx</span>
<span class="line"></span></code></pre></div><p>提示让你使用不低于28的sdk，升级最新到SDK，然后点击 <strong>Migrate to AndroidX...</strong>，AS就会自动将项目重构并使用AndroidX库。</p><h2 id="_3-androidx迁移问题" tabindex="-1"><a class="header-anchor" href="#_3-androidx迁移问题"><span>3. AndroidX迁移问题</span></a></h2><p><a href="https://www.jianshu.com/p/7507c25fd986" target="_blank" rel="noopener noreferrer">《Android Support库和AndroidX冲突问题》</a></p><h2 id="_4-androidx影响" tabindex="-1"><a class="header-anchor" href="#_4-androidx影响"><span>4. AndroidX影响</span></a></h2><p>虽然说目前对我们没有多大影响，我们可以不使用仍然使用旧版本的支持库，毕竟没有强制，但长远来看还是有好处的。AndroidX重新设计了包结构，旨在鼓励库的小型化，支持库和架构组件包的名字也都简化了；而且也是减轻Android生态系统碎片化的有效方式。</p>`,35)]))}const p=e(d,[["render",s]]),c=JSON.parse('{"path":"/android-tips/migrate-to-androidx.html","title":"androidx迁移","lang":"zh-CN","frontmatter":{"description":"androidx迁移 compose兼容性 https://developer.android.google.cn/jetpack/androidx/releases/compose-kotlin 迁移文档: 谷歌开发者迁移文档 Google 2018 IO 大会推出了 Android新的扩展库 AndroidX，用于替换原来的 Android扩展库，...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/migrate-to-androidx.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"androidx迁移"}],["meta",{"property":"og:description","content":"androidx迁移 compose兼容性 https://developer.android.google.cn/jetpack/androidx/releases/compose-kotlin 迁移文档: 谷歌开发者迁移文档 Google 2018 IO 大会推出了 Android新的扩展库 AndroidX，用于替换原来的 Android扩展库，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://upload-images.jianshu.io/upload_images/4625401-92ed6de990f27533.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/546/format/webp#align=left&display=inline&height=261&id=Kdgqq&margin=%5Bobject%20Object%5D&originHeight=261&originWidth=546&status=done&style=none&width=546"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"androidx迁移\\",\\"image\\":[\\"https://upload-images.jianshu.io/upload_images/4625401-92ed6de990f27533.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/546/format/webp#align=left&display=inline&height=261&id=Kdgqq&margin=%5Bobject%20Object%5D&originHeight=261&originWidth=546&status=done&style=none&width=546\\",\\"https://upload-images.jianshu.io/upload_images/4625401-b9524e8fa789d620.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/316/format/webp#align=left&display=inline&height=423&id=yiTs2&margin=%5Bobject%20Object%5D&originHeight=423&originWidth=316&status=done&style=none&width=316\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"compose兼容性","slug":"compose兼容性","link":"#compose兼容性","children":[]},{"level":2,"title":"1. AndroidX变化","slug":"_1-androidx变化","link":"#_1-androidx变化","children":[]},{"level":2,"title":"2. AndroidX配置","slug":"_2-androidx配置","link":"#_2-androidx配置","children":[]},{"level":2,"title":"3. AndroidX迁移问题","slug":"_3-androidx迁移问题","link":"#_3-androidx迁移问题","children":[]},{"level":2,"title":"4. AndroidX影响","slug":"_4-androidx影响","link":"#_4-androidx影响","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.59,"words":776},"filePathRelative":"android-tips/migrate-to-androidx.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,c as data};
