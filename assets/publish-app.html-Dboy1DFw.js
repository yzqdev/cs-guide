import{_ as e,c as a,a as d,o}from"./app-C8DxhDIZ.js";const r={};function n(p,t){return o(),a("div",null,t[0]||(t[0]=[d(`<h1 id="发布应用程序" tabindex="-1"><a class="header-anchor" href="#发布应用程序"><span>发布应用程序</span></a></h1><p>Android应用程序发布是一个让你的Android应用程序对用户可用的过程。发布是Android应用程序开发过程的最后一个阶段。</p><p>开发并全面测试了Android应用程序之后，您就可以开始使用Google Play（著名的Android市场）或者其他的应用市场免费销售或分发。您还可以通过将应用程序直接发送给用户或让用户从您自己的网站下载它们来发布应用程序。您可以在Android官方网站上查看详细的发布过程，但是本教程将引导您完成一些简单的步骤，以便在Google Play上启动您的应用程序。这是一个简化的检查清单，可帮助您启动Android应用程序-</p><table><thead><tr><th>分发流程</th><th>说明</th></tr></thead><tbody><tr><td><strong>回归测试</strong></td><td>在发布应用程序之前，您需要确保它在所定位的所有设备上都满足所有Android应用程序的基本质量要求。因此，请在不同的设备（包括手机和平板电脑）上执行所有必需的测试。</td></tr><tr><td><strong>应用程序分级</strong></td><td>当您要在Google Play上发布应用程序时，必须为应用程序指定内容分级，以告知Google Play用户其成熟度级别。当前可用的评级是(a) Everyone (b) Low maturity (c) Medium maturity (d) High maturity。</td></tr><tr><td><strong>目标地区</strong></td><td>Google Play可让您控制将您的应用出售的国家和地区。因此，您必须注意根据目标区域设置时区，本地化或任何其他特定要求。</td></tr><tr><td><strong>应用程序大小</strong></td><td>当前，在Google Play上发布的APK的最大大小为50 MB。如果您的应用超出了该大小，或者您想提供二次下载，则可以使用APK扩展文件，Google Play将免费在其服务器基础结构上托管APK扩展文件，并自动处理向设备的下载。</td></tr><tr><td><strong>SDK和屏幕兼容性</strong></td><td>重要的是要确保您的应用程序设计为在要定位的Android平台版本和设备屏幕尺寸上正确运行。</td></tr><tr><td><strong>应用程序定价</strong></td><td>确定您的应用程序是免费还是付费很重要，因为在Google Play上，免费应用程序必须保持免费。如果要出售您的应用程序，则必须以其他货币指定其价格。</td></tr><tr><td><strong>促销内容</strong></td><td>提供各种高质量的图形资产来展示您的应用程序或品牌是一种良好的营销习惯。发布后，这些内容就会显示在您的产品详细信息页面，商店列表和搜索结果以及其他地方。</td></tr><tr><td><strong>构建并上传准备</strong></td><td>发布的APK您可以将准备发布的APK上传到开发者控制台并分发给用户。您可以检查有关如何创建应用程序的可发布版本的完整详细信息：准备发布。</td></tr><tr><td><strong>最终确定应用程序详细信息</strong></td><td>Google Play提供了多种方法来推广您的应用程序，并在产品详细信息页面上与用户互动，从彩色图形，屏幕截图和视频到本地化说明，发布详细信息以及指向其他应用程序的链接。因此，您可以装饰您的应用程序页面，并提供尽可能多的清晰细节。</td></tr></tbody></table><h2 id="导出android应用程序" tabindex="-1"><a class="header-anchor" href="#导出android应用程序"><span>导出Android应用程序</span></a></h2><p><img src="https://www.jc2182.com/images/android/relaseapp1.jpg" alt=""></p><p>导出应用之前，您必须先使用一些工具::</p><ul><li><p><strong>Dx工具</strong>（Dalvik可执行工具）：它会将.class文件转换为.dex文件。它对内存优化和减少启动速度时间很有用。</p></li><li><p><strong>AAPT</strong>（Android辅助打包工具）：将.Dex文件转换为.Apk很有用。</p></li><li><p><strong>APK</strong> （Android包装工具包）：部署过程的最后阶段称为.apk。</p><p>您需要先将应用程序导出为APK（Android软件包）文件，然后再将其上传到Google Play市场。 要导出应用程序，只需在Android Studio中打开该应用程序项目，然后从Android Studio中选择Build→Generate Signed APK，然后按照简单的步骤导出应用程序</p><p><img src="https://www.jc2182.com/images/android/deployapp1.png" alt=""></p><p>接下来，选择“APK”选项，如上面的屏幕截图所示</p><p><img src="https://www.jc2182.com/images/android/deployapp2.png" alt=""></p><p>下一步</p><p><img src="https://www.jc2182.com/images/android/deployapp3.png" alt=""></p><p>选择release 选择签名版本， 然后finish</p><p><img src="https://www.jc2182.com/images/android/deployapp4.png" alt=""></p><p>最后，它将生成您的Android应用程序作为APK格式文件保存到release文件夹下面，并将其上传到各个应用市场。</p></li></ul><h2 id="应用程序手动签名打包" tabindex="-1"><a class="header-anchor" href="#应用程序手动签名打包"><span>应用程序手动签名打包</span></a></h2><p>上面的是Android Studio的图形界面自动打包，下面介绍一些手动打包的过程。</p><p>您不需要Android Studio即可对您的应用进行签名。您可以使用Android SDK和JDK中的标准工具从命令行对应用程序进行签名。从命令行以发布模式对应用程序进行签名-</p><p>1,使用keytool生成私钥</p><div class="language-t4" data-highlighter="prismjs" data-ext="t4" data-title="t4"><pre><code><span class="line">  $ keytool -genkey -v -keystore my-release-key.keystore</span>
<span class="line">  -alias alias_name -keyalg RSA -keysize 2048 -validity 10000</span>
<span class="line"></span></code></pre></div><p>2,在发布模式下编译您的应用以获取未签名的APK</p><p>3,使用<a href="https://docs.oracle.com/javase/6/docs/technotes/tools/windows/jarsigner.html" target="_blank" rel="noopener noreferrer">jarsigner</a>使用私钥对应用程序签名</p><div class="language-t4" data-highlighter="prismjs" data-ext="t4" data-title="t4"><pre><code><span class="line">  $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1</span>
<span class="line">  -keystore my-release-key.keystore my_application.apk alias_name</span>
<span class="line"></span></code></pre></div><p>4,确认您的APK已签名。例如-</p><div class="language-t4" data-highlighter="prismjs" data-ext="t4" data-title="t4"><pre><code><span class="line">  jarsigner -verify -verbose -certs my_application.apk</span>
<span class="line"></span></code></pre></div><p>5,使用<a href="https://developer.android.com/studio/command-line/zipalign" target="_blank" rel="noopener noreferrer">zipalign</a>对齐最终的APK包。</p><div class="language-t4" data-highlighter="prismjs" data-ext="t4" data-title="t4"><pre><code><span class="line">  zipalign -v 4 your_project_name-unaligned.apk your_project_name.apk![](https://www.jc2182.com/images/android/call2.png)</span>
<span class="line"></span></code></pre></div>`,20)]))}const s=e(r,[["render",n]]),l=JSON.parse('{"path":"/android-tutor/advanced/publish-app.html","title":"发布应用程序","lang":"zh-CN","frontmatter":{"description":"发布应用程序 Android应用程序发布是一个让你的Android应用程序对用户可用的过程。发布是Android应用程序开发过程的最后一个阶段。 开发并全面测试了Android应用程序之后，您就可以开始使用Google Play（著名的Android市场）或者其他的应用市场免费销售或分发。您还可以通过将应用程序直接发送给用户或让用户从您自己的网站下载它...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/publish-app.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"发布应用程序"}],["meta",{"property":"og:description","content":"发布应用程序 Android应用程序发布是一个让你的Android应用程序对用户可用的过程。发布是Android应用程序开发过程的最后一个阶段。 开发并全面测试了Android应用程序之后，您就可以开始使用Google Play（著名的Android市场）或者其他的应用市场免费销售或分发。您还可以通过将应用程序直接发送给用户或让用户从您自己的网站下载它..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/relaseapp1.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"发布应用程序\\",\\"image\\":[\\"https://www.jc2182.com/images/android/relaseapp1.jpg\\",\\"https://www.jc2182.com/images/android/deployapp1.png\\",\\"https://www.jc2182.com/images/android/deployapp2.png\\",\\"https://www.jc2182.com/images/android/deployapp3.png\\",\\"https://www.jc2182.com/images/android/deployapp4.png\\",\\"https://www.jc2182.com/images/android/call2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"导出Android应用程序","slug":"导出android应用程序","link":"#导出android应用程序","children":[]},{"level":2,"title":"应用程序手动签名打包","slug":"应用程序手动签名打包","link":"#应用程序手动签名打包","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.47,"words":1342},"filePathRelative":"android-tutor/advanced/publish-app.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,l as data};
