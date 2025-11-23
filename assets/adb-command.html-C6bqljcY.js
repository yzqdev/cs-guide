import{_ as s,c as n,a as e,o as l}from"./app-B6vXTniy.js";const i={};function d(t,a){return l(),n("div",null,[...a[0]||(a[0]=[e(`<h1 id="adb命令" tabindex="-1"><a class="header-anchor" href="#adb命令"><span>adb命令</span></a></h1><h2 id="拍照" tabindex="-1"><a class="header-anchor" href="#拍照"><span>拍照</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line">adb shell screencap -p /sdcard/screen.png</span>
<span class="line"></span>
<span class="line">adb pull /sdcard/screen.png ~/users/download</span>
<span class="line"></span></code></pre></div><h2 id="录像" tabindex="-1"><a class="header-anchor" href="#录像"><span>录像</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb shell screenrecord --time-limit 180 --size 1280x720 --bit-rate 6000000 /sdcard/demo.mp4</span>
<span class="line"></span></code></pre></div><h2 id="adb传文件" tabindex="-1"><a class="header-anchor" href="#adb传文件"><span>adb传文件</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 单文件</span>
<span class="line">adb pull /sdcard/DCIM/Camera/IMG_1234.JPG</span>
<span class="line"></span>
<span class="line"># 重命名并放到指定目录</span>
<span class="line">adb pull /sdcard/log.txt  ~/Documents/logcat_20250708.txt</span>
<span class="line"></span>
<span class="line"># 整个相册目录</span>
<span class="line">adb pull /sdcard/DCIM .</span>
<span class="line"></span>
<span class="line"># 单文件</span>
<span class="line">adb push app-debug.apk /sdcard/</span>
<span class="line"></span>
<span class="line"># 改名并放到 Download</span>
<span class="line">adb push readme.md /sdcard/Download/readme.txt</span>
<span class="line"></span>
<span class="line"># 批量传一堆 png</span>
<span class="line">adb push icons/ /sdcard/Pictures/icons/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设备-连接" tabindex="-1"><a class="header-anchor" href="#设备-连接"><span>设备 &amp; 连接</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb devices / adb devices -l  列出在线设备（含详情）</span>
<span class="line">adb get-serialno  只拿序列号</span>
<span class="line">adb connect 192.168.x.x:5555  Wi-Fi 无线连</span>
<span class="line">adb disconnect  断开无线</span>
<span class="line">adb tcpip 5555  让设备改为 TCP 监听模式</span>
<span class="line">adb -s &lt;序列号&gt; &lt;任意命令&gt;  多设备时精准指定</span>
<span class="line"></span></code></pre></div><h2 id="服务本身" tabindex="-1"><a class="header-anchor" href="#服务本身"><span>服务本身</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb start-server / adb kill-server  重启 ADB 后台</span>
<span class="line">adb -P &lt;端口&gt; start-server  改默认 5037 端口</span>
<span class="line"></span></code></pre></div><h2 id="apk-安装与卸载" tabindex="-1"><a class="header-anchor" href="#apk-安装与卸载"><span>APK 安装与卸载</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line">adb install app.apk  全新安装</span>
<span class="line">adb install -r app.apk  保留数据重装</span>
<span class="line">adb install -d app.apk  允许降级安装</span>
<span class="line">adb uninstall &lt;包名&gt;  卸载</span>
<span class="line">adb uninstall -k &lt;包名&gt;  卸载但保数据</span>
<span class="line">adb shell pm clear &lt;包名&gt;  清数据并恢复首次安装状态</span>
<span class="line"></span></code></pre></div>`,13)])])}const c=s(i,[["render",d]]),r=JSON.parse('{"path":"/android-tips/adb-command.html","title":"adb命令","lang":"zh-CN","frontmatter":{"description":"adb命令 拍照 录像 adb传文件 设备 & 连接 服务本身 APK 安装与卸载","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"adb命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-11-04T01:53:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/adb-command.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"adb命令"}],["meta",{"property":"og:description","content":"adb命令 拍照 录像 adb传文件 设备 & 连接 服务本身 APK 安装与卸载"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-11-04T01:53:24.000Z"}],["meta",{"property":"article:modified_time","content":"2025-11-04T01:53:24.000Z"}]]},"git":{"createdTime":1762221204000,"updatedTime":1762221204000,"contributors":[{"name":"Anderson","username":"Anderson","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/Anderson"}]},"readingTime":{"minutes":0.86,"words":258},"filePathRelative":"android-tips/adb-command.md","autoDesc":true}');export{c as comp,r as data};
