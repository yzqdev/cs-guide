import{_ as s,c as e,a as n,o as l}from"./app-B6vXTniy.js";const t={};function p(i,a){return l(),e("div",null,[...a[0]||(a[0]=[n(`<h1 id="adb命令" tabindex="-1"><a class="header-anchor" href="#adb命令"><span>adb命令</span></a></h1><h1 id="adb命令-1" tabindex="-1"><a class="header-anchor" href="#adb命令-1"><span>adb命令</span></a></h1><p><a href="https://blog.csdn.net/Next_Second/article/details/73648754" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/Next_Second/article/details/73648754</a></p><h2 id="常用" tabindex="-1"><a class="header-anchor" href="#常用"><span>常用</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb version 查看adb版本</span>
<span class="line">adb devices 查看连接设备</span>
<span class="line">adb connect &lt;android_ip&gt;    连接android设备（需要在同一网段下）</span>
<span class="line">adb kill-server 杀死adb 服务</span>
<span class="line">adb start-server 启动adb服务</span>
<span class="line">adb reboot 重启手机</span>
<span class="line"></span></code></pre></div><h2 id="应用相关" tabindex="-1"><a class="header-anchor" href="#应用相关"><span>应用相关</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb shell pm list packages    显示所有应用信息</span>
<span class="line">adb shell pm list packages -s    显示系统应用信息</span>
<span class="line">adb shell pm list packages -3   显示第三方应用信息</span>
<span class="line">adb shell pm list permissions -d -g    显示权限信息</span>
<span class="line">adb shell pm clear &lt;package_name&gt;    清除数据</span>
<span class="line">adb shell pm install &lt;package_name&gt;    安装应用</span>
<span class="line">adb shell pm install -r -r &lt;package_name&gt;    保留数据和缓存文件，重新安装apk</span>
<span class="line">adb shell pm uninstall &lt;package_name&gt;    卸载应用(与adb uninstall相同)</span>
<span class="line"></span>
<span class="line">adb install &lt;package_name&gt;    安装应用</span>
<span class="line">adb install -r &lt;package_name&gt;    保留数据和缓存文件，重新安装apk</span>
<span class="line">adb uninstall &lt;package_name&gt;    卸载应用</span>
<span class="line"></span></code></pre></div><h2 id="获取系统信息" tabindex="-1"><a class="header-anchor" href="#获取系统信息"><span>获取系统信息</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb shell cat /proc/cpuinfo     显示cpu信息</span>
<span class="line">adb get-serialno    获取序列号</span>
<span class="line">adb shell  cat /sys/class/net/wlan0/address    获取mac地址</span>
<span class="line">adb shell getprop ro.product.model    获取设备型号</span>
<span class="line">adb shell wm size    查看屏幕分辨率</span>
<span class="line">adb shell wm density    查看屏幕密度</span>
<span class="line"></span></code></pre></div><h2 id="log相关" tabindex="-1"><a class="header-anchor" href="#log相关"><span>log相关</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb logcat -v time    带时间戳的log</span>
<span class="line">adb logcat -b &lt;buffer&gt;    查看不同类型的log，如main,system,radio,events,crash,all.默认为main log</span>
<span class="line">adb logcat -c    清除log</span>
<span class="line">adb logcat | grep -i &quot;str&quot;    忽略大小写筛选指定字符串log</span>
<span class="line">adb logcat | grep -iE &quot;str1|str2|str3&quot;    筛选多个字符串</span>
<span class="line">adb logcat &gt; log.txt    打印log输入到文件</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="fastboot" tabindex="-1"><a class="header-anchor" href="#fastboot"><span>fastboot</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb reboot-bootloader</span>
<span class="line">fastboot flash boot boot.img</span>
<span class="line">fastboot flash recovery recovery.img</span>
<span class="line">fastboot flash android system.img</span>
<span class="line"></span></code></pre></div><h2 id="截屏录屏" tabindex="-1"><a class="header-anchor" href="#截屏录屏"><span>截屏录屏</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">截屏：</span>
<span class="line">adb shell screencap -p &lt;output_file&gt;    截取屏幕，并设置图片存储路径</span>
<span class="line">adb pull &lt;output_file&gt; .    拉取该截图到PC</span>
<span class="line">adb shell rm &lt;output_file&gt;    删除截图文件</span>
<span class="line">eg.</span>
<span class="line">adb shell screencap -p /sdcard/screen.png</span>
<span class="line"></span>
<span class="line">录屏：</span>
<span class="line">adb shell screenrecord &lt;output_file&gt; 录屏</span>
<span class="line"></span></code></pre></div><h2 id="am相关" tabindex="-1"><a class="header-anchor" href="#am相关"><span>am相关</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">启动Activity:</span>
<span class="line">adb shell am start -n &lt;package_name&gt;/&lt;package_name&gt;.&lt;activity_name&gt;</span>
<span class="line">eg.</span>
<span class="line">adb shell am start -n com.example.hello/com.example.hello.MainActivity</span>
<span class="line"></span>
<span class="line">启动Service:</span>
<span class="line">adb shell am startservice -n &lt;package_name&gt;/&lt;package_name&gt;.&lt;service_name&gt;    启动service</span>
<span class="line">eg.</span>
<span class="line">adb shell am startservice -n com.example.test/com.example.test.TestService</span>
<span class="line"></span>
<span class="line">发送广播:</span>
<span class="line">adb shell am broadcast -a &lt;action&gt;    发送广播</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="网络相关" tabindex="-1"><a class="header-anchor" href="#网络相关"><span>网络相关</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb shell netcfg    查看设备的 ip 地址</span>
<span class="line">adb shell netstat    查看设备的端口号信息</span>
<span class="line"></span>
<span class="line"># 获取属性</span>
<span class="line">adb shell getprop [prop_name]    查看属性信息</span>
<span class="line">adb shell setprop &lt;prop_name&gt; &lt;value&gt;    设置属性值</span>
<span class="line"></span></code></pre></div><h2 id="adb安装apk" tabindex="-1"><a class="header-anchor" href="#adb安装apk"><span>adb安装apk</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">adb install -t .\\app-debug.apk</span>
<span class="line"></span></code></pre></div><h2 id="adb传输文件" tabindex="-1"><a class="header-anchor" href="#adb传输文件"><span>adb传输文件</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">2，输入: adb pull 手机存储路径  电脑路径</span>
<span class="line">adb pull  /sdcard/xxx  /Users/xxxx/ xxx.tx</span>
<span class="line">二 从电脑端向手机复制文件</span>
<span class="line">输入: adb push 电脑路径  手机存储路径  </span>
<span class="line"> adb push  /Users/xxxx/xxx.txt   /sdcard/xxx</span>
<span class="line"></span></code></pre></div>`,23)])])}const d=s(t,[["render",p]]),r=JSON.parse('{"path":"/cs-tips/android/adb.html","title":"adb命令","lang":"zh-CN","frontmatter":{"description":"adb命令 adb命令 https://blog.csdn.net/Next_Second/article/details/73648754 常用 应用相关 获取系统信息 log相关 fastboot 截屏录屏 am相关 网络相关 adb安装apk adb传输文件","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"adb命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/android/adb.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"adb命令"}],["meta",{"property":"og:description","content":"adb命令 adb命令 https://blog.csdn.net/Next_Second/article/details/73648754 常用 应用相关 获取系统信息 log相关 fastboot 截屏录屏 am相关 网络相关 adb安装apk adb传输文件"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}]]},"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.03,"words":608},"filePathRelative":"cs-tips/android/adb.md","autoDesc":true}');export{d as comp,r as data};
