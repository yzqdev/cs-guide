import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const i={},r=n(`<h1 id="笔记" tabindex="-1"><a class="header-anchor" href="#笔记"><span>笔记</span></a></h1><h2 id="安卓组件" tabindex="-1"><a class="header-anchor" href="#安卓组件"><span>安卓组件</span></a></h2><table><thead><tr><th>编号</th><th>组件</th><th>描述</th></tr></thead><tbody><tr><td>1</td><td><code>Fragments</code></td><td>表示<code>Activity</code>中的用户界面的一部分。</td></tr><tr><td>2</td><td><code>Views</code></td><td>在屏幕上绘制的UI元素，包括按钮，列表形式等</td></tr><tr><td>3</td><td><code>Layouts</code></td><td>查看控制屏幕格式和视图外观的层次结构。</td></tr><tr><td>4</td><td><code>Intents</code></td><td>消息连接组件在一起。</td></tr><tr><td>5</td><td><code>Resources</code></td><td>外部元素，如字符串，常量和可绘制图片。</td></tr><tr><td>6</td><td><code>Manifest</code></td><td>应用程序的配置文件。</td></tr></tbody></table><h2 id="manifest详解" tabindex="-1"><a class="header-anchor" href="#manifest详解"><span>manifest详解</span></a></h2><p>Activity启动模式(launchMode)</p><pre><code class="language-text">android:launchMode=&quot;singleTop&quot;

</code></pre><h2 id="关于字体大小" tabindex="-1"><a class="header-anchor" href="#关于字体大小"><span>关于字体大小</span></a></h2><ul><li>使用sp作为字体大小单位,会随着系统的字体大小改变</li><li>而dp作为单位则不会.</li></ul><h2 id="设置颜色的几种方式" tabindex="-1"><a class="header-anchor" href="#设置颜色的几种方式"><span>设置颜色的几种方式</span></a></h2><pre><code class="language-kotlin"> basicTv.setTextColor(Color.GREEN)

basicTv.setTextColor(0xff00ff)
basicTv.setTextColor(Color.rgb(22,33,55))
basicTv.setTextColor(Color.argb(0,200,0,0))
basicTv.setTextColor(Color.parseColor(&quot;#00ff00&quot;))
</code></pre><h2 id="安卓打包修改名字" tabindex="-1"><a class="header-anchor" href="#安卓打包修改名字"><span>安卓打包修改名字</span></a></h2><h3 id="关于打包的定义" tabindex="-1"><a class="header-anchor" href="#关于打包的定义"><span>关于打包的定义</span></a></h3><pre><code class="language-text">Make Project:- Means you create a real aplication which is working on device and has a executable file like apk.

Make Module:- means you create a library project for you aplication which is executed with that project and has no executable file like apk but has jar files which work as a library.

Build apk: when you normally run your application an apk file is generated locally which is like a zipfile and is easily unzipable no security is implemented and you can get the code from that apk file. It is used basically for local testing.

Signed apk: it is that apk you can create with a password and security and it is not easily unzipable and is used for production.
</code></pre><h3 id="定义打包名称" tabindex="-1"><a class="header-anchor" href="#定义打包名称"><span>定义打包名称</span></a></h3><pre><code class="language-groovy">    // 打包 用来打包修改名字的 跟defaultConfig是同一级的
    applicationVariants.all { variant -&gt;
        variant.outputs.all { output -&gt; // 这里和2.0的不一样 2.0是each 3.0是all
            def outputFile = output.outputFile
            def fileName;
            if (outputFile != null &amp;&amp; outputFile.name.endsWith(&#39;.apk&#39;)) {
                if (variant.buildType.name.equals(&#39;release&#39;)) {
                    fileName = &quot;[项目名]\${releaseTime()}_\${defaultConfig.versionName}_release.apk&quot;
                } else if (variant.buildType.name.equals(&#39;debug&#39;)) {
                    fileName = &quot;[项目名]\${releaseTime()}_\${defaultConfig.versionName}_debug.apk&quot;
                }
                outputFileName = fileName // 这里和2.0不一样
            }
        }
    }
</code></pre><h3 id="定义一个时间" tabindex="-1"><a class="header-anchor" href="#定义一个时间"><span>定义一个时间</span></a></h3><pre><code class="language-groovy">//打包 打包版本需要的当前时间名字 跟 Android 是同一级的
def releaseTime() {
    //注意时间不对 请注意时区问题 时区在小时分钟的时候不一样
    return new Date().format(&quot;yyyy-MM-dd-HH-mm&quot;, TimeZone.getTimeZone(&quot;Asia/Shanghai&quot;))
}
</code></pre><h2 id="在build-gradle-kts引入function-gradle中方法" tabindex="-1"><a class="header-anchor" href="#在build-gradle-kts引入function-gradle中方法"><span>在build.gradle.kts引入function.gradle中方法</span></a></h2><pre><code class="language-kotlin">import groovy.lang.Closure
apply(from=&quot;functions.gradle&quot;)
val buildVersionName: Closure&lt;Any&gt; by ext
buildVersionName()
</code></pre><h2 id="获取所有的provider" tabindex="-1"><a class="header-anchor" href="#获取所有的provider"><span>获取所有的provider</span></a></h2><pre><code class="language-kotlin">
@Composable

fun ThirdScreen() {
  val ctx = LocalContext.current as ComponentActivity
  Button(onClick = {
    for (pack in ctx.getPackageManager().getInstalledPackages(PackageManager.GET_PROVIDERS)) {
      val providers = pack.providers
      if (providers != null) {
        for (provider in providers) {
          if (provider.toString().contains(&quot;neofileprovider&quot;)){
            XLog.d(  &quot;provider: &quot; + provider.authority)
            XLog.d(ctx.getPackageName() )
          }

        }
      }
    }
  }) {
    Text(text = &quot;provide&quot;)
  }
}
</code></pre><h2 id="provider冲突解决办法" tabindex="-1"><a class="header-anchor" href="#provider冲突解决办法"><span>provider冲突解决办法</span></a></h2><p>添加一个MiniProvider继承FileProvider,authority都要<code>\${applicationId}..multi_image.provider</code>这种,然后使用<code>requireActivity().getPackageName()+&quot;.multi_image.provider&quot;</code>,</p><pre><code>FileProvider.getUriForFile(  requireActivity(),  requireActivity().getPackageName()+&quot;.multi_image.provider&quot;,  mTmpFile)
</code></pre><h3 id="使用fragmentutils" tabindex="-1"><a class="header-anchor" href="#使用fragmentutils"><span>使用fragmentutils</span></a></h3><pre><code class="language-kotlin">  FragmentUtils.add(supportFragmentManager, frags, R.id.lib_frag, 0)
    val callback = object : OnBackPressedCallback(
      true // default to enabled
    ) {
      override fun handleOnBackPressed() {
        XLog.enableStackTrace(2).d( FragmentUtils.getTopShow(supportFragmentManager))
        if (FragmentUtils.getTopShow(supportFragmentManager) is LiblistFragment){
          finish()
        }else{
          FragmentUtils.replace(supportFragmentManager,LiblistFragment(),R.id.lib_frag)
        }
      }
    }
    this.onBackPressedDispatcher.addCallback(callback)
</code></pre><h2 id="kotlin获取appllication实例" tabindex="-1"><a class="header-anchor" href="#kotlin获取appllication实例"><span>kotlin获取appllication实例</span></a></h2><pre><code class="language-kotlin">class MyApp: Application() {

    override fun onCreate() {
        super.onCreate()
        instance = this
    }

    companion object {
        lateinit var instance: MyApp
            private set
    }
}
</code></pre>`,28),o=[r];function l(d,s){return a(),t("div",null,o)}const p=e(i,[["render",l],["__file","note.html.vue"]]),u=JSON.parse('{"path":"/android-tips/note.html","title":"笔记","lang":"zh-CN","frontmatter":{"description":"笔记 安卓组件 manifest详解 Activity启动模式(launchMode) 关于字体大小 使用sp作为字体大小单位,会随着系统的字体大小改变 而dp作为单位则不会. 设置颜色的几种方式 安卓打包修改名字 关于打包的定义 定义打包名称 定义一个时间 在build.gradle.kts引入function.gradle中方法 获取所有的prov...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/note.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"笔记"}],["meta",{"property":"og:description","content":"笔记 安卓组件 manifest详解 Activity启动模式(launchMode) 关于字体大小 使用sp作为字体大小单位,会随着系统的字体大小改变 而dp作为单位则不会. 设置颜色的几种方式 安卓打包修改名字 关于打包的定义 定义打包名称 定义一个时间 在build.gradle.kts引入function.gradle中方法 获取所有的prov..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-27T13:03:42.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-27T13:03:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"笔记\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-27T13:03:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安卓组件","slug":"安卓组件","link":"#安卓组件","children":[]},{"level":2,"title":"manifest详解","slug":"manifest详解","link":"#manifest详解","children":[]},{"level":2,"title":"关于字体大小","slug":"关于字体大小","link":"#关于字体大小","children":[]},{"level":2,"title":"设置颜色的几种方式","slug":"设置颜色的几种方式","link":"#设置颜色的几种方式","children":[]},{"level":2,"title":"安卓打包修改名字","slug":"安卓打包修改名字","link":"#安卓打包修改名字","children":[{"level":3,"title":"关于打包的定义","slug":"关于打包的定义","link":"#关于打包的定义","children":[]},{"level":3,"title":"定义打包名称","slug":"定义打包名称","link":"#定义打包名称","children":[]},{"level":3,"title":"定义一个时间","slug":"定义一个时间","link":"#定义一个时间","children":[]}]},{"level":2,"title":"在build.gradle.kts引入function.gradle中方法","slug":"在build-gradle-kts引入function-gradle中方法","link":"#在build-gradle-kts引入function-gradle中方法","children":[]},{"level":2,"title":"获取所有的provider","slug":"获取所有的provider","link":"#获取所有的provider","children":[]},{"level":2,"title":"provider冲突解决办法","slug":"provider冲突解决办法","link":"#provider冲突解决办法","children":[{"level":3,"title":"使用fragmentutils","slug":"使用fragmentutils","link":"#使用fragmentutils","children":[]}]},{"level":2,"title":"kotlin获取appllication实例","slug":"kotlin获取appllication实例","link":"#kotlin获取appllication实例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1711544622000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":2.16,"words":648},"filePathRelative":"android-tips/note.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,u as data};
