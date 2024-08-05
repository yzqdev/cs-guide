import{_ as e,c as t,o as n,d as a}from"./app-CbULZrmi.js";const s={},o=a(`<h1 id="打包注意事项" tabindex="-1"><a class="header-anchor" href="#打包注意事项"><span>打包注意事项</span></a></h1><h2 id="教程" tabindex="-1"><a class="header-anchor" href="#教程"><span>教程</span></a></h2><ul><li>安卓离线打包教程 <a href="https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android" target="_blank" rel="noopener noreferrer">https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android</a></li><li>关于appkey的问题 <a href="https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey" target="_blank" rel="noopener noreferrer">https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey</a></li></ul><h2 id="生成签名证书" tabindex="-1"><a class="header-anchor" href="#生成签名证书"><span>生成签名证书</span></a></h2><pre><code class="language-shell">keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
</code></pre><p>其中:</p><ul><li>testalias是证书别名，可修改为自己想设置的字符，建议使用英文字母和数字</li><li>test.keystore是证书文件名称，可修改为自己想设置的文件名称，也可以指定完整文件路径</li><li>36500是证书的有效期，表示100年有效期，单位天，建议时间设置长一点，避免证书过期</li></ul><pre><code class="language-text">Enter keystore password:  //输入证书文件密码，输入完成回车  
Re-enter new password:   //再次输入证书文件密码，输入完成回车  
What is your first and last name?  
  [Unknown]:  //输入名字和姓氏，输入完成回车  
What is the name of your organizational unit?  
  [Unknown]:  //输入组织单位名称，输入完成回车  
What is the name of your organization?  
  [Unknown]:  //输入组织名称，输入完成回车  
What is the name of your City or Locality?  
  [Unknown]:  //输入城市或区域名称，输入完成回车  
What is the name of your State or Province?  
  [Unknown]:  //输入省/市/自治区名称，输入完成回车  
What is the two-letter country code for this unit?  
  [Unknown]:  //输入国家/地区代号（两个字母），中国为CN，输入完成回车  
Is CN=XX, OU=XX, O=XX, L=XX, ST=XX, C=XX correct?  
  [no]:  //确认上面输入的内容是否正确，输入y，回车  

Enter key password for &lt;testalias&gt;  
        (RETURN if same as keystore password):  //确认证书密码与证书文件密码一样（HBuilder|HBuilderX要求这两个密码一致），直接回车就可以
</code></pre><h3 id="查看证书信息" tabindex="-1"><a class="header-anchor" href="#查看证书信息"><span>查看证书信息</span></a></h3><pre><code class="language-shell">keytool -list -v -keystore test.keystore  
</code></pre><h3 id="使用android-studio生成证书" tabindex="-1"><a class="header-anchor" href="#使用android-studio生成证书"><span>使用android studio生成证书</span></a></h3><p>菜单栏-&gt;build-&gt;generate signed apk 生成一个jks证书</p><h2 id="分离abi-分开64位和32位" tabindex="-1"><a class="header-anchor" href="#分离abi-分开64位和32位"><span>分离abi(分开64位和32位)</span></a></h2><p>在build.gradle添加</p><pre><code class="language-groovy">
 defaultConfig{

     splits {
         abi {
             enable true
             
    // 排除不必要的架构
 exclude &#39;x86&#39;,&#39;arm64-v8a&#39;
  // 重置包含的目录
 reset()
  // 设置包含，调用前需要先用 reset 将默认清除
 include &#39;armeabi-v7a&#39;, &#39;x86&#39;
 
 // 是否打出包含全部的apk
 universalApk true
         }
     }
 }
</code></pre><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h2><ul><li>uni-app运行环境版本和编译器版本不一致的问题<a href="https://ask.dcloud.net.cn/article/35627" target="_blank" rel="noopener noreferrer">https://ask.dcloud.net.cn/article/35627</a></li></ul>`,17),r=[o];function i(d,p){return n(),t("div",null,r)}const c=e(s,[["render",i],["__file","build-apps.html.vue"]]),u=JSON.parse('{"path":"/android-tips/hybrid/uniapp/build-apps.html","title":"打包注意事项","lang":"zh-CN","frontmatter":{"description":"打包注意事项 教程 安卓离线打包教程 https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android 关于appkey的问题 https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey 生成签名证书 其中: testalias是证书别名，可修改...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/hybrid/uniapp/build-apps.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"打包注意事项"}],["meta",{"property":"og:description","content":"打包注意事项 教程 安卓离线打包教程 https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android 关于appkey的问题 https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey 生成签名证书 其中: testalias是证书别名，可修改..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"打包注意事项\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"教程","slug":"教程","link":"#教程","children":[]},{"level":2,"title":"生成签名证书","slug":"生成签名证书","link":"#生成签名证书","children":[{"level":3,"title":"查看证书信息","slug":"查看证书信息","link":"#查看证书信息","children":[]},{"level":3,"title":"使用android studio生成证书","slug":"使用android-studio生成证书","link":"#使用android-studio生成证书","children":[]}]},{"level":2,"title":"分离abi(分开64位和32位)","slug":"分离abi-分开64位和32位","link":"#分离abi-分开64位和32位","children":[]},{"level":2,"title":"常见问题","slug":"常见问题","link":"#常见问题","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.85,"words":554},"filePathRelative":"android-tips/hybrid/uniapp/build-apps.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,u as data};
