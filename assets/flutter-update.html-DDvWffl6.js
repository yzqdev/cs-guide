import{_ as n,c as a,a as p,o as t}from"./app-C8DxhDIZ.js";const e={};function o(l,s){return t(),a("div",null,s[0]||(s[0]=[p(`<h1 id="flutter安卓更新" tabindex="-1"><a class="header-anchor" href="#flutter安卓更新"><span>flutter安卓更新</span></a></h1><h3 id="应用程序升级流程" tabindex="-1"><a class="header-anchor" href="#应用程序升级流程"><span>应用程序升级流程</span></a></h3><p>由于在 IOS 中没法直接下载安装，如果版本不一致则直接跳转到IOS应用对应的应用市场就可以了，所以本文仅介绍Android App的升级流程。</p><p><strong>Android App升级流程：</strong></p><ol><li><p>获取本地版本号；</p></li><li><p>请求<a href="https://cloud.tencent.com/product/cvm?from=10680" target="_blank" rel="noopener noreferrer">服务器</a>获取服务器版本号；</p></li><li><p>如果本地版本和服务器版本不一致则提示升级，弹窗提示用户是否更新；</p></li><li><p>用户确定升级，调用文件传输方法下载apk文件；</p></li><li><p>监听下载进度；</p></li><li><p>下载完成打开apk进行安装。</p></li></ol><h3 id="_2-android-升级-app-涉及的-api-库" tabindex="-1"><a class="header-anchor" href="#_2-android-升级-app-涉及的-api-库"><span>2. Android 升级 App 涉及的 API 库</span></a></h3><table><thead><tr><th>名称</th><th>作用</th><th>地址</th></tr></thead><tbody><tr><td>package_info</td><td>获取版本信息</td><td>地址</td></tr><tr><td>path_provider</td><td>获取文件存储位置</td><td>地址</td></tr><tr><td>flutter_downloader</td><td>文件下载</td><td>地址</td></tr><tr><td>open_file</td><td>打开文件</td><td>地址</td></tr></tbody></table><h3 id="_3-获取版本信息" tabindex="-1"><a class="header-anchor" href="#_3-获取版本信息"><span>3. 获取版本信息</span></a></h3><p><a href="https://pub.flutter-io.cn/packages/package_info" target="_blank" rel="noopener noreferrer">https://pub.flutter-io.cn/packages/package_info</a></p><ol><li>安装插件</li></ol><div class="language-dart" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line">dependencies<span class="token punctuation">:</span></span>
<span class="line">  package_info<span class="token punctuation">:</span> <span class="token operator">^</span><span class="token number">0.4</span><span class="token number">.3</span><span class="token operator">+</span><span class="token number">4</span></span>
<span class="line"></span></code></pre></div><p>在pubspec.yaml中配置保存后，在VS Code环境中会自动下载依赖包。</p><p>如果无法正常下载，执行 flutter pub get 。</p><ol start="2"><li>引入并使用</li></ol><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token comment">// 引入获取版本信息包</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:package_info/package_info.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">PackageInfo</span> packageInfo <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token class-name">PackageInfo</span><span class="token punctuation">.</span><span class="token function">fromPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">String</span> appName <span class="token operator">=</span> packageInfo<span class="token punctuation">.</span>appName<span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">String</span> packageName <span class="token operator">=</span> packageInfo<span class="token punctuation">.</span>packageName<span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">String</span> version <span class="token operator">=</span> packageInfo<span class="token punctuation">.</span>version<span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">String</span> buildNumber <span class="token operator">=</span> packageInfo<span class="token punctuation">.</span>buildNumber<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 应用名称</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;appName:</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">appName</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 包名称</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;packageName:</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">packageName</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 版本号</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;version:</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">version</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 构建编号</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;buildNumber:</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">buildNumber</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-获取文件存储路径" tabindex="-1"><a class="header-anchor" href="#_4-获取文件存储路径"><span>4. 获取<a href="https://cloud.tencent.com/product/cfs?from=10680" target="_blank" rel="noopener noreferrer">文件存储</a>路径</span></a></h3><p><a href="https://pub.flutter-io.cn/packages/path_provider" target="_blank" rel="noopener noreferrer">https://pub.flutter-io.cn/packages/path_provider</a></p><ol><li>安装插件</li></ol><div class="language-dart" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line">dependencies<span class="token punctuation">:</span></span>
<span class="line">  path_provider<span class="token punctuation">:</span> <span class="token operator">^</span><span class="token number">1.6</span><span class="token number">.27</span></span>
<span class="line"></span></code></pre></div><p>在pubspec.yaml中配置保存后，在VS Code环境中会自动下载依赖包。</p><p>如果无法正常下载，执行 flutter pub get 。</p><ol start="2"><li>引入并使用</li></ol><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token comment">// 引入获取文件存储路径的包</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:path_provider/path_provider.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">Directory</span> tempDir <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getTemporaryDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">String</span> tempPath <span class="token operator">=</span> tempDir<span class="token punctuation">.</span>path<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">Directory</span> appDocDir <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getApplicationDocumentsDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">String</span> appDocPath <span class="token operator">=</span> appDocDir<span class="token punctuation">.</span>path<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> directory <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getExternalStorageDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">String</span> storageDirectory <span class="token operator">=</span> directory<span class="token punctuation">.</span>path<span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 获取临时目录</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;tempPath:</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">tempPath</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 获取应用的安装目录</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;appDocDir:</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">appDocPath</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 获取存储卡的路径</span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;StorageDirectory:</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">storageDirectory</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-文件下载" tabindex="-1"><a class="header-anchor" href="#_5-文件下载"><span>5. 文件下载</span></a></h3><p><a href="https://pub.flutter-io.cn/packages/flutter_downloader" target="_blank" rel="noopener noreferrer">https://pub.flutter-io.cn/packages/flutter_downloader</a></p><ol><li>安装插件</li></ol><div class="language-dart" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line">dependencies<span class="token punctuation">:</span></span>
<span class="line">  flutter_downloader<span class="token punctuation">:</span> <span class="token operator">^</span><span class="token number">1.5</span><span class="token number">.2</span></span>
<span class="line"></span></code></pre></div><p>在pubspec.yaml中配置保存后，在VS Code环境中会自动下载依赖包。</p><p>如果无法正常下载，执行 flutter pub get 。</p><ol start="2"><li>配置权限</li></ol><p><img src="https://ask.qcloudimg.com/http-save/yehe-7992912/upp00rg5gr.png?imageView2/2/w/1620" alt="img"></p><p>代码如下：</p><div class="language-dart" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 配置下载与安装相关的权限 <span class="token operator">--</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span>uses<span class="token operator">-</span>permission android<span class="token punctuation">:</span>name<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;android.permission.INTERNET&quot;</span></span><span class="token operator">/</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span>uses<span class="token operator">-</span>permission android<span class="token punctuation">:</span>name<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;android.permission.WRITE_EXTERNAL_STORAGE&quot;</span></span> <span class="token operator">/</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span>uses<span class="token operator">-</span>permission android<span class="token punctuation">:</span>name<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;android.permission.READ_EXTERNAL_STORAGE&quot;</span></span> <span class="token operator">/</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span>uses<span class="token operator">-</span>permission android<span class="token punctuation">:</span>name<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;android.permission.REQUEST_INSTALL_PACKAGES&quot;</span></span> <span class="token operator">/</span><span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre></div><p>其它配置：</p><p><img src="https://ask.qcloudimg.com/http-save/yehe-7992912/t5rxesp89j.png?imageView2/2/w/1620" alt="img"></p><p>代码如下：</p><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 处理在<span class="token class-name">Android</span>上打开下载文件的通知上的点击操作<span class="token operator">--</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span>provider</span>
<span class="line">    android<span class="token punctuation">:</span>name<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;vn.hunghd.flutterdownloader.DownloadedFileProvider&quot;</span></span></span>
<span class="line">    android<span class="token punctuation">:</span>authorities<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">applicationId</span><span class="token punctuation">}</span></span><span class="token string">.flutter_downloader.provider&quot;</span></span></span>
<span class="line">    android<span class="token punctuation">:</span>exported<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;false&quot;</span></span></span>
<span class="line">    android<span class="token punctuation">:</span>grantUriPermissions<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;true&quot;</span></span><span class="token operator">&gt;</span></span>
<span class="line">    <span class="token operator">&lt;</span>meta<span class="token operator">-</span>data</span>
<span class="line">        android<span class="token punctuation">:</span>name<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;android.support.FILE_PROVIDER_PATHS&quot;</span></span></span>
<span class="line">        android<span class="token punctuation">:</span>resource<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;@xml/provider_paths&quot;</span></span><span class="token operator">/</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>provider<span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 配置最大并发任务数<span class="token punctuation">:</span>插件依赖于<span class="token class-name">WorkManager</span>库 <span class="token operator">--</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span>provider</span>
<span class="line">    android<span class="token punctuation">:</span>name<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;androidx.work.impl.WorkManagerInitializer&quot;</span></span></span>
<span class="line">    android<span class="token punctuation">:</span>authorities<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">applicationId</span><span class="token punctuation">}</span></span><span class="token string">.workmanager-init&quot;</span></span></span>
<span class="line">    tools<span class="token punctuation">:</span>node<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;remove&quot;</span></span> <span class="token operator">/</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span>provider</span>
<span class="line">    android<span class="token punctuation">:</span>name<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;vn.hunghd.flutterdownloader.FlutterDownloaderInitializer&quot;</span></span></span>
<span class="line">    android<span class="token punctuation">:</span>authorities<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">applicationId</span><span class="token punctuation">}</span></span><span class="token string">.flutter-downloader-init&quot;</span></span></span>
<span class="line">    android<span class="token punctuation">:</span>exported<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;false&quot;</span></span><span class="token operator">&gt;</span></span>
<span class="line">    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 设定数字以配置最大并发任务数 <span class="token operator">--</span><span class="token operator">&gt;</span></span>
<span class="line">    <span class="token operator">&lt;</span>meta<span class="token operator">-</span>data</span>
<span class="line">        android<span class="token punctuation">:</span>name<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;vn.hunghd.flutterdownloader.MAX_CONCURRENT_TASKS&quot;</span></span></span>
<span class="line">        android<span class="token punctuation">:</span>value<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;5&quot;</span></span> <span class="token operator">/</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>provider<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>引入并使用</li></ol><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token comment">// 引入获取文件路径的包（提前安装）</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:path_provider/path_provider.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 引入文件下载的包</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flutter_downloader/flutter_downloader.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 获取存储卡的路径</span></span>
<span class="line"><span class="token keyword">final</span> directory <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getExternalStorageDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">String</span> _localPath <span class="token operator">=</span> directory<span class="token punctuation">.</span>path<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">await</span> <span class="token class-name">FlutterDownloader</span><span class="token punctuation">.</span><span class="token function">enqueue</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token comment">// 远程的APK地址（注意：安卓9.0以上后要求用https）</span></span>
<span class="line">    url<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&quot;http://www.ionic.wang/shop.apk&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 下载保存的路径</span></span>
<span class="line">    savedDir<span class="token punctuation">:</span> _localPath<span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// 是否在手机顶部显示下载进度（仅限安卓）</span></span>
<span class="line">    showNotification<span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>   </span>
<span class="line">    <span class="token comment">// 是否允许下载完成点击打开文件（仅限安卓）      </span></span>
<span class="line">    openFileFromNotification<span class="token punctuation">:</span><span class="token boolean">true</span><span class="token punctuation">,</span> </span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">FlutterDownloader</span><span class="token punctuation">.</span><span class="token function">registerCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> status<span class="token punctuation">,</span> progress<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">print</span><span class="token punctuation">(</span>progress<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-打开文件" tabindex="-1"><a class="header-anchor" href="#_6-打开文件"><span>6. 打开文件</span></a></h3><p><a href="https://pub.flutter-io.cn/packages/open_file" target="_blank" rel="noopener noreferrer">https://pub.flutter-io.cn/packages/open_file</a></p><ol><li>安装插件</li></ol><div class="language-dart" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line">dependencies<span class="token punctuation">:</span></span>
<span class="line">  open_file<span class="token punctuation">:</span> <span class="token operator">^</span><span class="token number">3.0</span><span class="token number">.3</span></span>
<span class="line"></span></code></pre></div><p>在pubspec.yaml中配置保存后，在VS Code环境中会自动下载依赖包。</p><p>如果无法正常下载，执行 flutter pub get 。</p><ol start="2"><li>引入并使用</li></ol><div class="language-dart" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token comment">// 引入打开文件的包</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:open_file/open_file.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// 引入获取文件路径的包（提前安装）</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:path_provider/path_provider.dart&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 获取存储卡的路径</span></span>
<span class="line"><span class="token keyword">final</span> directory <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getExternalStorageDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">String</span> _localPath <span class="token operator">=</span> directory<span class="token punctuation">.</span>path<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 打开文件,apk的名称需要与下载时对应</span></span>
<span class="line"><span class="token class-name">OpenFile</span><span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;</span><span class="token interpolation"><span class="token punctuation">\${</span><span class="token expression">_localPath</span><span class="token punctuation">}</span></span><span class="token string">/shop.apk&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="_7-替换版本" tabindex="-1"><a class="header-anchor" href="#_7-替换版本"><span>7. 替换版本</span></a></h3><p>安装包下载安装后，默认会生成一个新的版本，并不会覆盖原有的应用程序，为此，需要提前做一些版本号的配置。</p><div class="language-dart" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> android<span class="token operator">/</span>app<span class="token operator">/</span>src<span class="token operator">/</span>min<span class="token operator">/</span><span class="token class-name">AndroidManifest</span><span class="token punctuation">.</span>xml <span class="token operator">--</span><span class="token operator">&gt;</span></span>
<span class="line"><span class="token operator">&lt;</span>manifest </span>
<span class="line">    xmlns<span class="token punctuation">:</span>android<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;http://schemas.android.com/apk/res/android&quot;</span></span></span>
<span class="line">    package<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;com.example.my_app&quot;</span></span> </span>
<span class="line">    android<span class="token punctuation">:</span>versionCode<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;2&quot;</span></span> </span>
<span class="line">    android<span class="token punctuation">:</span>versionName<span class="token operator">=</span><span class="token string-literal"><span class="token string">&quot;0.0.2&quot;</span></span><span class="token operator">&gt;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>manifest<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre></div><p>上面的代码在打包时，注意事项如下：</p><ol><li><p>package的值不能变，即包名不能变；</p></li><li><p>android:versionCode的值要增加；</p></li><li><p>android:versionName的值要增加。</p></li></ol><p>另外，上面代码中配置的版本号在 <a href="https://pub.flutter-io.cn/packages/package_info" target="_blank" rel="noopener noreferrer">package_info</a> 这个插件中是无法获取的，所以还需要在pubspec.yaml配置同样的版本信息，这样才能获取版本信息进行对比。</p><div class="language-dart" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"># pubspec<span class="token punctuation">.</span>yaml</span>
<span class="line">version<span class="token punctuation">:</span> <span class="token number">0.0</span><span class="token number">.2</span><span class="token operator">+</span><span class="token number">2</span></span>
<span class="line"></span></code></pre></div><p>上面的代码中0.0.2对应的是android:versionName的值，+2对应的是android:versionCode的值。</p><p>完成上面这些步骤，就可以开始开始正式打包了。</p>`,56)]))}const c=n(e,[["render",o]]),r=JSON.parse('{"path":"/flutter-tutor/flutter-update.html","title":"flutter安卓更新","lang":"zh-CN","frontmatter":{"description":"flutter安卓更新 应用程序升级流程 由于在 IOS 中没法直接下载安装，如果版本不一致则直接跳转到IOS应用对应的应用市场就可以了，所以本文仅介绍Android App的升级流程。 Android App升级流程： 获取本地版本号； 请求服务器获取服务器版本号； 如果本地版本和服务器版本不一致则提示升级，弹窗提示用户是否更新； 用户确定升级，调用...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/flutter-update.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"flutter安卓更新"}],["meta",{"property":"og:description","content":"flutter安卓更新 应用程序升级流程 由于在 IOS 中没法直接下载安装，如果版本不一致则直接跳转到IOS应用对应的应用市场就可以了，所以本文仅介绍Android App的升级流程。 Android App升级流程： 获取本地版本号； 请求服务器获取服务器版本号； 如果本地版本和服务器版本不一致则提示升级，弹窗提示用户是否更新； 用户确定升级，调用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ask.qcloudimg.com/http-save/yehe-7992912/upp00rg5gr.png?imageView2/2/w/1620"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"flutter安卓更新\\",\\"image\\":[\\"https://ask.qcloudimg.com/http-save/yehe-7992912/upp00rg5gr.png?imageView2/2/w/1620\\",\\"https://ask.qcloudimg.com/http-save/yehe-7992912/t5rxesp89j.png?imageView2/2/w/1620\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":3,"title":"应用程序升级流程","slug":"应用程序升级流程","link":"#应用程序升级流程","children":[]},{"level":3,"title":"2.  Android 升级 App 涉及的 API 库","slug":"_2-android-升级-app-涉及的-api-库","link":"#_2-android-升级-app-涉及的-api-库","children":[]},{"level":3,"title":"3. 获取版本信息","slug":"_3-获取版本信息","link":"#_3-获取版本信息","children":[]},{"level":3,"title":"4. 获取文件存储路径","slug":"_4-获取文件存储路径","link":"#_4-获取文件存储路径","children":[]},{"level":3,"title":"5. 文件下载","slug":"_5-文件下载","link":"#_5-文件下载","children":[]},{"level":3,"title":"6.  打开文件","slug":"_6-打开文件","link":"#_6-打开文件","children":[]},{"level":3,"title":"7. 替换版本","slug":"_7-替换版本","link":"#_7-替换版本","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.96,"words":1189},"filePathRelative":"flutter-tutor/flutter-update.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,r as data};
