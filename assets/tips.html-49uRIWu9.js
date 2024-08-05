import{_ as e,c as a,o as t,d as o}from"./app-CbULZrmi.js";const n="/cs-guide/assets/database-DmjrvoIa.png",d={},r=o('<h1 id="一些小技巧" tabindex="-1"><a class="header-anchor" href="#一些小技巧"><span>一些小技巧</span></a></h1><h2 id="改包名" tabindex="-1"><a class="header-anchor" href="#改包名"><span>改包名</span></a></h2><p>在 Flutter 中，并没有统一地修改图标、应用名称和包名的地方，所以要在各自语言对应的地方进行修改:</p><h3 id="包名" tabindex="-1"><a class="header-anchor" href="#包名"><span>包名</span></a></h3><ul><li>Android 是在 <code>android</code> ▸ <code>app</code> ▸ <code>src</code> ▸ <code>main</code> ▸ <code>AndroidManifest.xml</code> 中修改<code>package=&quot;xxx.xxx.xxx&quot;</code>; 以及在 <code>android</code> ▸ <code>app</code> ▸ <code>src</code> ▸ <code>build.gradle</code>中修改<code>applicationId &quot;xxx.xxx.xxx&quot;</code>; 并且需要修改<code>android</code> ▸ <code>app</code> ▸ <code>src</code> ▸ <code>main</code> ▸ <code>......</code> ▸ <code>MainActivity.java</code>对应的包路径</li><li>iOS 在 <code>ios</code> ▸ <code>Runner</code> ▸ <code>Info.plist</code> 中修改<code>CFBundleIdentifier</code>对应的Value</li></ul><p>写法与原生相同，并且可以不一致。</p><blockquote><p>PS:不推荐修改包名，包名最好在项目开始时定下...之后修改可能会出点什么小问题...</p></blockquote><h3 id="应用名称" tabindex="-1"><a class="header-anchor" href="#应用名称"><span>应用名称</span></a></h3><ul><li>Android 是在 <code>android</code> ▸ <code>app</code> ▸ <code>src</code> ▸ <code>main</code> ▸ <code>AndroidManifest.xml</code> 中修改<code>android:label=&quot;XXX&quot;</code>;</li><li>iOS 在 <code>ios</code> ▸ <code>Runner</code> ▸ <code>Info.plist</code> 中修改<code>CFBundleName</code>对应的Value</li></ul><h3 id="图标" tabindex="-1"><a class="header-anchor" href="#图标"><span>图标</span></a></h3><ul><li>Android 在<code>android</code> ▸ <code>app</code> ▸ <code>src</code> ▸ <code>res</code> ▸ <code>mipmap-...</code> 文件夹中替换相应图片</li><li>iOS 在 <code>ios</code> ▸ <code>Runner</code> ▸ <code>Assets.xcassets</code> ▸ <code>AppIcon.appiconset</code>文件夹中替换相应尺寸的图片， 如果使用不同的文件名，那还必须更新同一目录中的<code>Contents.json</code>文件。</li></ul><h3 id="启动图片" tabindex="-1"><a class="header-anchor" href="#启动图片"><span>启动图片</span></a></h3><ul><li>Android 在<code>android</code> ▸ <code>app</code> ▸ <code>src</code> ▸ <code>res</code> ▸ <code>drawable</code> ▸ <code>launch_background.xml</code> 通过自定义drawable来实现自定义启动界面。</li><li>iOS 在 <code>ios</code> ▸ <code>Runner</code> ▸ <code>Assets.xcassets</code> ▸ <code>LaunchImage.imageset</code>文件夹中替换相应尺寸的图片， 如果使用不同的文件名，那还必须更新同一目录中的<code>Contents.json</code>文件。</li></ul><h3 id="其他方式" tabindex="-1"><a class="header-anchor" href="#其他方式"><span>其他方式</span></a></h3><p>可以使用Xcode打开ios文件夹下的<code>Runner.xcworkspace</code>项目，像原生项目一样修改。</p><h2 id="查看数据库和shared-references" tabindex="-1"><a class="header-anchor" href="#查看数据库和shared-references"><span>查看数据库和shared_references</span></a></h2><blockquote><p>查看数据库</p></blockquote><p>点在android studio下面的<code>App Inspecttion</code>,找到连接的设备就可以看到sqlite数据库 <img src="'+n+`" alt="图片"></p><p>点开android studio右侧的<code>Device File Explorer</code>,找到 <code>data =&gt; data =&gt; 包名</code>,下面有一个<code>shared_prefs</code>文件夹,就是shared_preference数据</p><h2 id="响应式布局" tabindex="-1"><a class="header-anchor" href="#响应式布局"><span>响应式布局</span></a></h2><h3 id="flutter适配ipad和平板的原理" tabindex="-1"><a class="header-anchor" href="#flutter适配ipad和平板的原理"><span>Flutter适配iPad和平板的原理</span></a></h3><p>其实吧，在Flutter中适配各种尺寸像iPad、平板甚至现在Flutter可以支持web、Desktop之后，有更多的屏幕适配。试着想一想我们在ios、Android原生中怎么做的适配？</p><p>首先，我们的知道屏幕是什么尺寸的，然后给不同尺寸的屏幕定义一个范围，如：手机屏幕在一个范围内，pad在一个范围内。然后在获取当前的横竖屏状态，根据屏幕尺寸和横竖屏状态，给屏幕设置一个layout布局。</p><p>其实，在Flutter中也一样。很多第三方库中设置了当屏幕最小边的范围小于600时就是手机屏幕。大于600就是pad...</p><pre><code class="language-text">&lt; 600: mobile
600 &lt; ScreenSize &lt; 950: tablet
大于950: desktop
</code></pre><p>定义好标准后，第三方库做的无非就是定义一些widget wrapper，(包装类)。一些定义设置值得方法。仅此而已。</p><h2 id="app更新" tabindex="-1"><a class="header-anchor" href="#app更新"><span>app更新</span></a></h2><p>使用<a href="https://github.com/xuexiangjys/flutter_xupdate" target="_blank" rel="noopener noreferrer">https://github.com/xuexiangjys/flutter_xupdate</a></p><h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h3><p>json格式必须完全一样,<code>versionCode</code>,<code>VersionName</code>,<code>ApkMd5</code>必须认真检查(不过你可以自定义json) md5可以用上面的md5工具判断</p><pre><code class="language-json">{
  &quot;Code&quot;: 0,
  &quot;Msg&quot;: &quot;&quot;,
  &quot;UpdateStatus&quot;: 1,
  &quot;VersionCode&quot;: 3,
  &quot;VersionName&quot;: &quot;1.0.1&quot;,
  &quot;UploadTime&quot;: &quot;2020-04-10 17:28:41&quot;,
  &quot;ModifyContent&quot;: &quot;\\r\\n1、优化api接口。\\r\\n2、添加使用demo演示。\\r\\n3、新增自定义更新服务API接口。\\r\\n4、优化更新提示界面。&quot;,
  &quot;DownloadUrl&quot;: &quot;http://localhost:5244/d/app-release.apk&quot;,
  &quot;ApkSize&quot;: 2048,
  &quot;ApkMd5&quot;: &quot;03beecef824fb7e274bd858d39689fb4&quot;
}
</code></pre><h3 id="如何定义已经是最新版本" tabindex="-1"><a class="header-anchor" href="#如何定义已经是最新版本"><span>如何定义已经是最新版本?</span></a></h3><p>下面的错误代码2004就是最新版本,按照这个来就好</p><pre><code class="language-dart">void initXUpdate() {
    if (Platform.isAndroid || Platform.isWindows) {
      FlutterXUpdate.init(

              ///是否输出日志
              debug: true,

              ///是否使用post请求
              isPost: false,

              ///post请求是否是上传json
              isPostJson: false,

              ///请求响应超时时间
              timeout: 25000,

              ///是否开启自动模式
              isWifiOnly: false,

              ///是否开启自动模式
              isAutoMode: false,

              ///需要设置的公共参数
              supportSilentInstall: false,

              ///在下载过程中，如果点击了取消的话，是否弹出切换下载方式的重试提示弹窗
              enableRetry: false)
          .then((value) {})
          .catchError((error) {
        print(error);
      });

 

      FlutterXUpdate.setUpdateHandler(
          onUpdateError: (Map&lt;String, dynamic&gt;? message) async {
        print(message);
        //下载失败
        if (message![&quot;code&quot;] == 2004) {
          ToastUtils.success(&quot;已是最新版本!&quot;, duration: const Duration(seconds: 5));
        }
        if (message[&quot;code&quot;] == 4000) {
          FlutterXUpdate.showRetryUpdateTipDialog(
              retryContent: &#39;服务器故障无法继续下载，是否考虑切换码云下载？&#39;,
              retryUrl:
                  &#39;https://gitee.com/yzqdev/app-release/attach_files/1040158/download&#39;);
        }
        setState(() {
          _message = &#39;$message&#39;;
        });
      }, onUpdateParse: (String? json) async {
        //这里是自定义json解析
        return customParseJson(json ?? &quot;&quot;);
      });
    } else {
      updateMessage(&#39;ios暂不支持XUpdate更新&#39;);
    }
  }
</code></pre><h2 id="flutter瘦身" tabindex="-1"><a class="header-anchor" href="#flutter瘦身"><span>flutter瘦身</span></a></h2><h3 id="分开打包" tabindex="-1"><a class="header-anchor" href="#分开打包"><span>分开打包</span></a></h3><pre><code class="language-powershell">flutter build apk --split-per-abi
</code></pre><p>这个命令会把arm64-v8a和armeabi v7a分开,只会有三十二位或者64位的包 安卓打包分为两种：</p><ol><li>拆分打包（上传应用市场使用）</li><li>合并打包（分发使用）</li></ol><h2 id="_1-拆分打包" tabindex="-1"><a class="header-anchor" href="#_1-拆分打包"><span>1. 拆分打包</span></a></h2><p>拆分打包是指的针对不同的CPU进行打包，比如arm和arm64指的是32位、64位的abi。</p><p>这种方式主要是为了上架google市场使用的。 这种方式打的包，其中的版本号不是flutter的pubspec.yaml中填写的版本，而是会带上前缀。这是google官方推荐的方式（<a href="https://developer.android.com/studio/build/configure-apk-splits#configure-APK-versions" target="_blank" rel="noopener noreferrer">https://developer.android.com/studio/build/configure-apk-splits#configure-APK-versions</a>）。</p><p>即如果我们版本code填10，那么会带有前缀，比如“1010”、“2010”，比如我们填写的版本号是10，那么通过反编译apk我们可以看到。</p><pre><code class="language-text">app-armeabi-v7a-release.apk打出来的versionCode是1010。
 app-arm64-v8a-release.apk打出来的versionCode是2010。
 app-x86_64-release.apk打出来的versionCode是4010。
</code></pre><p>拆分打包命令</p><pre><code class="language-powershell">flutter build apk --obfuscate --split-debug-info debuginfo   --target-platform android-arm,android-arm64,android-x64 --split-per-abi
</code></pre><p>此时会生成</p><pre><code class="language-txt">app-arm64-v8a-release.apk   app-armeabi-v7a-release.apk   app-x86_64-release.apk 
</code></pre><p>对应不同CPU类型的包</p><h3 id="合并打包" tabindex="-1"><a class="header-anchor" href="#合并打包"><span>合并打包</span></a></h3><p>合并打包是指将两个版本或者三个版本的安装包，打到一个apk中，即会增加apk的大小，但是对于国内手机是比较友好的。比如2020款的红米9A居然还是32位版本。</p><p>这种方式可以用来在国内的各种分发平台或者直接发给用户使用。</p><pre><code class="language-powershell">flutter build apk --obfuscate --split-debug-info debuginfo   --target-platform android-arm,android-arm64,android-x64
</code></pre><p>去掉--split-per-abi即可，target-platform选择自己想要加入的cpu架构，这种打包会生成</p><pre><code class="language-text">app-release.apk
</code></pre><p>这种打包方式会增加apk包的大小。</p><h3 id="设置extractnativelibs" tabindex="-1"><a class="header-anchor" href="#设置extractnativelibs"><span>设置extractNativeLibs</span></a></h3><p>在<code>&lt;application&gt;&lt;/application&gt;</code>加上<code>android:extractNativeLibs=&quot;true&quot;</code>进行so的压缩</p><p>类似这样</p><pre><code class="language-xml">&lt;application
        android:allowBackup=&quot;true&quot;
        android:label=&quot;@string/app_name&quot;
        android:usesCleartextTraffic=&quot;true&quot;
        android:icon=&quot;@mipmap/ic_launcher&quot;
        android:extractNativeLibs=&quot;true&quot;
        tools:targetApi=&quot;n&quot;&gt;
</code></pre><h2 id="版本号不生效" tabindex="-1"><a class="header-anchor" href="#版本号不生效"><span>版本号不生效</span></a></h2><p>Flutter的App版本号设置在pubspec.yaml中，+号前面是版本名称，后面是版本号，在此修改会自动应用到Android和IOS项目对应版本号中，修改完安装发现并未生效，解决方法：</p><p>1、修改后执行flutter get</p><p>2、执行flutter clean</p><p>现在重新build 安装就能生效了</p><pre><code class="language-txt">version: 1.0.0+1
</code></pre><h2 id="the-argument-type-function-can-t-be-assigned-to-the-parameter-type-void-function-after-null-safety" tabindex="-1"><a class="header-anchor" href="#the-argument-type-function-can-t-be-assigned-to-the-parameter-type-void-function-after-null-safety"><span>The argument type &#39;Function&#39; can&#39;t be assigned to the parameter type &#39;void Function()?&#39; after null safety</span></a></h2><p>Instead of</p><pre><code class="language-dart">final Function? onPressed; // Bad
</code></pre><p>use</p><pre><code class="language-dart">final void Function()? onPressed; // Good
final VoidCallback? onPressed; // Good
</code></pre>`,71),i=[r];function l(s,c){return t(),a("div",null,i)}const u=e(d,[["render",l],["__file","tips.html.vue"]]),h=JSON.parse(`{"path":"/flutter-tutor/tips.html","title":"一些小技巧","lang":"zh-CN","frontmatter":{"description":"一些小技巧 改包名 在 Flutter 中，并没有统一地修改图标、应用名称和包名的地方，所以要在各自语言对应的地方进行修改: 包名 Android 是在 android ▸ app ▸ src ▸ main ▸ AndroidManifest.xml 中修改package=\\"xxx.xxx.xxx\\"; 以及在 android ▸ app ▸ src ▸...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"一些小技巧"}],["meta",{"property":"og:description","content":"一些小技巧 改包名 在 Flutter 中，并没有统一地修改图标、应用名称和包名的地方，所以要在各自语言对应的地方进行修改: 包名 Android 是在 android ▸ app ▸ src ▸ main ▸ AndroidManifest.xml 中修改package=\\"xxx.xxx.xxx\\"; 以及在 android ▸ app ▸ src ▸..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一些小技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"改包名","slug":"改包名","link":"#改包名","children":[{"level":3,"title":"包名","slug":"包名","link":"#包名","children":[]},{"level":3,"title":"应用名称","slug":"应用名称","link":"#应用名称","children":[]},{"level":3,"title":"图标","slug":"图标","link":"#图标","children":[]},{"level":3,"title":"启动图片","slug":"启动图片","link":"#启动图片","children":[]},{"level":3,"title":"其他方式","slug":"其他方式","link":"#其他方式","children":[]}]},{"level":2,"title":"查看数据库和shared_references","slug":"查看数据库和shared-references","link":"#查看数据库和shared-references","children":[]},{"level":2,"title":"响应式布局","slug":"响应式布局","link":"#响应式布局","children":[{"level":3,"title":"Flutter适配iPad和平板的原理","slug":"flutter适配ipad和平板的原理","link":"#flutter适配ipad和平板的原理","children":[]}]},{"level":2,"title":"app更新","slug":"app更新","link":"#app更新","children":[{"level":3,"title":"注意事项","slug":"注意事项","link":"#注意事项","children":[]},{"level":3,"title":"如何定义已经是最新版本?","slug":"如何定义已经是最新版本","link":"#如何定义已经是最新版本","children":[]}]},{"level":2,"title":"flutter瘦身","slug":"flutter瘦身","link":"#flutter瘦身","children":[{"level":3,"title":"分开打包","slug":"分开打包","link":"#分开打包","children":[]}]},{"level":2,"title":"1. 拆分打包","slug":"_1-拆分打包","link":"#_1-拆分打包","children":[{"level":3,"title":"合并打包","slug":"合并打包","link":"#合并打包","children":[]},{"level":3,"title":"设置extractNativeLibs","slug":"设置extractnativelibs","link":"#设置extractnativelibs","children":[]}]},{"level":2,"title":"版本号不生效","slug":"版本号不生效","link":"#版本号不生效","children":[]},{"level":2,"title":"The argument type 'Function' can't be assigned to the parameter type 'void Function()?' after null safety","slug":"the-argument-type-function-can-t-be-assigned-to-the-parameter-type-void-function-after-null-safety","link":"#the-argument-type-function-can-t-be-assigned-to-the-parameter-type-void-function-after-null-safety","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.6,"words":1679},"filePathRelative":"flutter-tutor/tips.md","localizedDate":"2023年5月22日","autoDesc":true}`);export{u as comp,h as data};
