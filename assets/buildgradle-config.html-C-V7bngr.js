import{_ as n,o as s,c as a,a as t}from"./app-BO2oONDQ.js";const e={},i=t(`<h1 id="build-gradle" tabindex="-1"><a class="header-anchor" href="#build-gradle"><span>build.gradle</span></a></h1><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h2><h3 id="kts" tabindex="-1"><a class="header-anchor" href="#kts"><span>kts</span></a></h3><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>plugins <span class="token punctuation">{</span>  
  <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;com.android.application&quot;</span></span><span class="token punctuation">)</span>  
  <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;org.jetbrains.kotlin.android&quot;</span></span><span class="token punctuation">)</span>  
  <span class="token function">alias</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span>kapt<span class="token punctuation">)</span>  
<span class="token punctuation">}</span>  
<span class="token function">apply</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span><span class="token function">getenv</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;gradle_ext&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal singleline"><span class="token string">&quot;\\\\sign.gradle&quot;</span></span><span class="token punctuation">)</span>  
android <span class="token punctuation">{</span>  
  namespace <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;ab.yzq.tutor.xpagemini&quot;</span></span>  
  
  defaultConfig <span class="token punctuation">{</span>  
    applicationId <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;ab.yzq.tutor.xpagemini&quot;</span></span>  
    versionCode <span class="token operator">=</span> <span class="token number">1</span>  
    versionName <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;1.0&quot;</span></span>  
  
    testInstrumentationRunner <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;androidx.test.runner.AndroidJUnitRunner&quot;</span></span>  
  <span class="token punctuation">}</span>  
  
  buildTypes <span class="token punctuation">{</span>  
    release <span class="token punctuation">{</span>  
      isMinifyEnabled <span class="token operator">=</span> <span class="token boolean">false</span>  
      <span class="token function">proguardFiles</span><span class="token punctuation">(</span>  
        <span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;proguard-android-optimize.txt&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>  
        <span class="token string-literal singleline"><span class="token string">&quot;proguard-rules.pro&quot;</span></span>  
      <span class="token punctuation">)</span>  
    <span class="token punctuation">}</span>  
  <span class="token punctuation">}</span>  
  compileOptions <span class="token punctuation">{</span>  
    sourceCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8  
    targetCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8  
  <span class="token punctuation">}</span>  
  kotlinOptions <span class="token punctuation">{</span>  
    jvmTarget <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;1.8&quot;</span></span>  
  <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
  
dependencies <span class="token punctuation">{</span>  
  <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>bundles<span class="token punctuation">.</span>core<span class="token punctuation">)</span>  
  <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>xui<span class="token punctuation">)</span>  
  <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>xpage<span class="token punctuation">)</span>  
  <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>glide<span class="token punctuation">)</span>  
  <span class="token function">kapt</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>xpage<span class="token punctuation">.</span>compiler<span class="token punctuation">)</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="groovy" tabindex="-1"><a class="header-anchor" href="#groovy"><span>groovy</span></a></h3><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>plugins <span class="token punctuation">{</span>  
  id <span class="token string">&#39;com.android.application&#39;</span>  
  id <span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlin.kapt&quot;</span></span>  
  id <span class="token string">&#39;kotlin-android&#39;</span>  
  id <span class="token string">&#39;img-optimizer&#39;</span>  
<span class="token punctuation">}</span>  
<span class="token comment">//打包时，记得设置true启用  </span>
  
apply from<span class="token punctuation">:</span> System<span class="token punctuation">.</span><span class="token function">getenv</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;gradle_ext&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token interpolation-string"><span class="token string">&quot;\\\\sign.gradle&quot;</span></span>  
android <span class="token punctuation">{</span>  
  
  
  defaultConfig <span class="token punctuation">{</span>  
    applicationId <span class="token interpolation-string"><span class="token string">&quot;ab.yzq.tutor&quot;</span></span>  
  
    versionCode <span class="token number">1</span>  
    versionName <span class="token interpolation-string"><span class="token string">&quot;1.0&quot;</span></span>  
    testInstrumentationRunner <span class="token interpolation-string"><span class="token string">&quot;androidx.test.runner.AndroidJUnitRunner&quot;</span></span>  
  
    vectorDrawables<span class="token punctuation">.</span>useSupportLibrary <span class="token operator">=</span> <span class="token boolean">true</span>  
  
    javaCompileOptions <span class="token punctuation">{</span>  
      annotationProcessorOptions <span class="token punctuation">{</span>  
        arguments <span class="token operator">=</span> <span class="token punctuation">[</span>moduleName<span class="token punctuation">:</span> project<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>  
      <span class="token punctuation">}</span>  
    <span class="token punctuation">}</span>  
  <span class="token punctuation">}</span>  
buildTypes <span class="token punctuation">{</span>  
  release<span class="token punctuation">{</span>  
    buildConfigField <span class="token interpolation-string"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;APP_ID_UMENG&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;appID&quot;</span></span>  
  <span class="token punctuation">}</span>  
  debug<span class="token punctuation">{</span>  
    buildConfigField <span class="token interpolation-string"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;APP_ID_UMENG&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;aa&quot;</span></span>  
  <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
  
  compileOptions <span class="token punctuation">{</span>  
    sourceCompatibility JavaVersion<span class="token punctuation">.</span>VERSION_1_8  
    targetCompatibility JavaVersion<span class="token punctuation">.</span>VERSION_1_8  
  <span class="token punctuation">}</span>  
  kotlinOptions <span class="token punctuation">{</span>  
    jvmTarget <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.8&quot;</span></span>  
  <span class="token punctuation">}</span>  
  buildFeatures <span class="token punctuation">{</span>  
    viewBinding <span class="token boolean">true</span>  
  <span class="token punctuation">}</span>  
  namespace <span class="token string">&#39;ab.yzq.tutor&#39;</span>  
  lint <span class="token punctuation">{</span>  
    abortOnError <span class="token boolean">false</span>  
  <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
  
dependencies <span class="token punctuation">{</span>  
  implementation <span class="token function">fileTree</span><span class="token punctuation">(</span>dir<span class="token punctuation">:</span> <span class="token string">&#39;libs&#39;</span><span class="token punctuation">,</span> include<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;*.jar&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  
  <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>bundles<span class="token punctuation">.</span>core<span class="token punctuation">)</span>  
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖"><span>添加依赖</span></a></h2><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token function">files</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;./commonjar/3rdparty/gson-2.8.5.jar&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">implementation</span><span class="token punctuation">(</span><span class="token function">fileTree</span><span class="token punctuation">(</span><span class="token function">mapOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;dir&quot;</span></span> <span class="token keyword">to</span> <span class="token string-literal singleline"><span class="token string">&quot;libs&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;include&quot;</span></span> <span class="token keyword">to</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;*.jar&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;*.aar&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">implementation</span><span class="token punctuation">(</span><span class="token function">fileTree</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;libs&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">include</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;*.jar&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;*.aar&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置ndk" tabindex="-1"><a class="header-anchor" href="#配置ndk"><span>配置ndk</span></a></h2><h3 id="goovy" tabindex="-1"><a class="header-anchor" href="#goovy"><span>goovy</span></a></h3><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>defaultConfig <span class="token punctuation">{</span>  
  ndk <span class="token punctuation">{</span>  
    abiFilters <span class="token interpolation-string"><span class="token string">&quot;arm64-v8a&quot;</span></span><span class="token comment">//, &quot;armeabi-v7a&quot;  </span>
  <span class="token punctuation">}</span>  
  
  minSdk <span class="token number">26</span>  
  targetSdk <span class="token number">34</span>  
  
  testInstrumentationRunner <span class="token string">&#39;androidx.test.runner.AndroidJUnitRunner&#39;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kts-1" tabindex="-1"><a class="header-anchor" href="#kts-1"><span>kts</span></a></h3><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>\`\`\`kotlin
 ndk <span class="token punctuation">{</span>
        abiFilters <span class="token operator">+=</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;armeabi-v7a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;arm64-v8a&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;x86&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;x86_64&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置buildtypes" tabindex="-1"><a class="header-anchor" href="#配置buildtypes"><span>配置buildTypes</span></a></h2><h3 id="groovy-1" tabindex="-1"><a class="header-anchor" href="#groovy-1"><span>groovy</span></a></h3><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code> signingConfigs <span class="token punctuation">{</span>  
  debug <span class="token punctuation">{</span>  
    storeFile <span class="token function">file</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span><span class="token function">getenv</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;gradle_ext&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token interpolation-string"><span class="token string">&quot;\\\\appkey.jks&quot;</span></span><span class="token punctuation">)</span><span class="token comment">//file(&quot;$rootDir/appkey.jks&quot;)  </span>
    storePassword <span class="token interpolation-string"><span class="token string">&quot;123456&quot;</span></span>  
    keyAlias <span class="token interpolation-string"><span class="token string">&quot;appkey&quot;</span></span>  
    keyPassword <span class="token interpolation-string"><span class="token string">&quot;123456&quot;</span></span>  
  <span class="token punctuation">}</span>  
  release <span class="token punctuation">{</span>  
    storeFile <span class="token function">file</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span><span class="token function">getenv</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;gradle_ext&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token interpolation-string"><span class="token string">&quot;\\\\appkey.jks&quot;</span></span><span class="token punctuation">)</span><span class="token comment">//file(&quot;$rootDir/appkey.jks&quot;)  </span>
    storePassword <span class="token interpolation-string"><span class="token string">&quot;123456&quot;</span></span>  
    keyAlias <span class="token interpolation-string"><span class="token string">&quot;appkey&quot;</span></span>  
    keyPassword <span class="token interpolation-string"><span class="token string">&quot;123456&quot;</span></span>  
  <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
   buildTypes <span class="token punctuation">{</span>
        release <span class="token punctuation">{</span>
            minifyEnabled <span class="token boolean">true</span>
            <span class="token comment">//后缀</span>
			applicationIdSuffix <span class="token string">&#39;.jv.debug&#39;</span>  
            <span class="token comment">//版本名前缀</span>
			versionNameSuffix <span class="token string">&#39;-DEBUG&#39;</span>
            proguardFiles <span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string">&#39;proguard-android.txt&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;proguard-rules.pro&#39;</span>
            signingConfig signingConfigs<span class="token punctuation">.</span>config
            <span class="token comment">//buildConfigField用于给BuildConfig文件添加一个字段</span>
            <span class="token comment">//三个参数:1.要定义的常量的类型 2.该常量的命名 3.该常量的值</span>
            <span class="token function">buildConfigField</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;HTTP_BASE&quot;</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&quot;https://www.baidu.com/api/release/&quot;&#39;</span><span class="token punctuation">)</span>
            <span class="token function">buildConfigField</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;HAHA&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;\\&quot;haahahah\\&quot;&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        debug<span class="token punctuation">{</span>
            <span class="token function">buildConfigField</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;HTTP_BASE&quot;</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&quot;https://www.baidu.com/api/debug&quot;&#39;</span><span class="token punctuation">)</span>
            <span class="token function">buildConfigField</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;HAHA&quot;</span></span><span class="token punctuation">,</span><span class="token interpolation-string"><span class="token string">&quot;\\&quot;haahahah\\&quot;&quot;</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kts-2" tabindex="-1"><a class="header-anchor" href="#kts-2"><span>kts</span></a></h3><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>android <span class="token punctuation">{</span>
    signingConfigs <span class="token punctuation">{</span>
        <span class="token function">getByName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;debug&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            keyAlias <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;debug&quot;</span></span>
            keyPassword <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;my debug key password&quot;</span></span>
            storeFile <span class="token operator">=</span> <span class="token function">file</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;/home/miles/keystore.jks&quot;</span></span><span class="token punctuation">)</span>
            storePassword <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;my keystore password&quot;</span></span>
        <span class="token punctuation">}</span>
        <span class="token function">create</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;release&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            keyAlias <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;release&quot;</span></span>
            keyPassword <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;my release key password&quot;</span></span>
            storeFile <span class="token operator">=</span> <span class="token function">file</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;/home/miles/keystore.jks&quot;</span></span><span class="token punctuation">)</span>
            storePassword <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;my keystore password&quot;</span></span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">compileSdkVersion</span><span class="token punctuation">(</span><span class="token number">28</span><span class="token punctuation">)</span>
    defaultConfig <span class="token punctuation">{</span>
        applicationId <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;com.mileskrell.someneatapp&quot;</span></span>
        <span class="token function">minSdkVersion</span><span class="token punctuation">(</span><span class="token number">19</span><span class="token punctuation">)</span>
        <span class="token function">targetSdkVersion</span><span class="token punctuation">(</span><span class="token number">28</span><span class="token punctuation">)</span>
        versionCode <span class="token operator">=</span> <span class="token number">1</span>
        versionName <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;1.0&quot;</span></span>
        testInstrumentationRunner <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;androidx.test.runner.AndroidJUnitRunner&quot;</span></span>
    <span class="token punctuation">}</span>
    buildTypes <span class="token punctuation">{</span>
        <span class="token function">getByName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;release&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            isMinifyEnabled <span class="token operator">=</span> <span class="token boolean">false</span>
            <span class="token function">buildConfigField</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span><span class="token string-literal singleline"><span class="token string">&quot;myId&quot;</span></span><span class="token punctuation">,</span><span class="token function">gradleLocalProperties</span><span class="token punctuation">(</span>rootDir<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;myId&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token function">proguardFiles</span><span class="token punctuation">(</span><span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;proguard-android-optimize.txt&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;proguard-rules.pro&quot;</span></span><span class="token punctuation">)</span>
            signingConfig <span class="token operator">=</span> signingConfigs<span class="token punctuation">.</span><span class="token function">getByName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;release&quot;</span></span><span class="token punctuation">)</span>
            isDebuggable <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
        <span class="token function">getByName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;debug&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
           <span class="token function">proguardFiles</span><span class="token punctuation">(</span><span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;proguard-android-optimize.txt&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;proguard-rules.pro&quot;</span></span><span class="token punctuation">)</span>
           <span class="token function">buildConfigField</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;String&quot;</span></span><span class="token punctuation">,</span><span class="token string-literal singleline"><span class="token string">&quot;myId&quot;</span></span><span class="token punctuation">,</span><span class="token function">gradleLocalProperties</span><span class="token punctuation">(</span>rootDir<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;myId&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            signingConfig <span class="token operator">=</span> signingConfigs<span class="token punctuation">.</span><span class="token function">getByName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;debug&quot;</span></span><span class="token punctuation">)</span>
            isDebuggable <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置jdk" tabindex="-1"><a class="header-anchor" href="#配置jdk"><span>配置jdk</span></a></h2><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>compileOptions <span class="token punctuation">{</span>  
  sourceCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_17  
  targetCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_17  
<span class="token punctuation">}</span>  
kotlinOptions <span class="token punctuation">{</span>  
  jvmTarget <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;17&quot;</span></span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2><h2 id="apply" tabindex="-1"><a class="header-anchor" href="#apply"><span>apply</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//groovy  
apply from: &#39;custom.gradle&#39;  
  
// kotlin-dsl  
apply(from = &quot;custom.gradle&quot;)

//groovy
apply plugin:&quot;kotlin-android&quot;
//kts
apply(plugin=&quot;kotlin-android&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ext" tabindex="-1"><a class="header-anchor" href="#ext"><span>ext</span></a></h2><h3 id="groovy-2" tabindex="-1"><a class="header-anchor" href="#groovy-2"><span>groovy</span></a></h3><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code>ext <span class="token punctuation">{</span>  
    compileSdkVersion <span class="token operator">=</span> <span class="token number">28</span>  
    buildToolsVersion <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;28.0.3&quot;</span></span>  
  
    supportLibVersion <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;28.0.0&quot;</span></span>  
    <span class="token punctuation">...</span>  
<span class="token punctuation">}</span>
<span class="token comment">//使用</span>
minSdk <span class="token operator">=</span> rootProject<span class="token punctuation">.</span>extra<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;minSdk&quot;</span></span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kts-3" tabindex="-1"><a class="header-anchor" href="#kts-3"><span>kts</span></a></h3><div class="language-kotlin line-numbers-mode" data-ext="kt" data-title="kt"><pre class="language-kotlin"><code>
extra<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;minSdk&quot;</span></span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">24</span>
extra<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;compileSdk&quot;</span></span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">34</span>

<span class="token comment">//使用</span>
minSdk <span class="token operator">=</span> rootProject<span class="token punctuation">.</span>extra<span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;minSdk&quot;</span></span><span class="token punctuation">]</span> <span class="token keyword">as</span> Int
minSdk <span class="token operator">=</span> rootProject<span class="token punctuation">.</span>extra<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;minSdk&quot;</span></span><span class="token punctuation">)</span> <span class="token keyword">as</span> Int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取local-properties" tabindex="-1"><a class="header-anchor" href="#获取local-properties"><span>获取local.properties</span></a></h2><h2 id="groovy-3" tabindex="-1"><a class="header-anchor" href="#groovy-3"><span>groovy</span></a></h2><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><pre class="language-groovy"><code> 
Properties properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
properties<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>project<span class="token punctuation">.</span>rootProject<span class="token punctuation">.</span><span class="token function">file</span><span class="token punctuation">(</span><span class="token string">&#39;local.properties&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newDataInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> sdkDir <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&#39;sdk.dir&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> ndkDir <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&#39;ndk.dir&#39;</span><span class="token punctuation">)</span>


 
Properties properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>rootProject<span class="token punctuation">.</span><span class="token function">file</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;local.properties&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    properties<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>rootProject<span class="token punctuation">.</span><span class="token function">file</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;local.properties&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newDataInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

println properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">&quot;sdk.dir&quot;</span></span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>## kts

\`\`\`kotlin
//第一种
import java.util.*
// ...

val properties = Properties().apply {
    load(rootProject.file(&quot;local.properties&quot;).reader())
}
val myProp = properties[&quot;propName&quot;]


//第二种

 
import com.android.build.gradle.internal.cxx.configure.gradleLocalProperties
// ...

val properties = gradleLocalProperties(rootDir)
val myProp = properties[&quot;propName&quot;]
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32),p=[i];function o(l,c){return s(),a("div",null,p)}const r=n(e,[["render",o],["__file","buildgradle-config.html.vue"]]),d=JSON.parse('{"path":"/android-tips/buildgradle-config.html","title":"build.gradle","lang":"zh-CN","frontmatter":{"description":"build.gradle 例子 kts groovy 添加依赖 配置ndk goovy kts 配置buildTypes groovy kts 配置jdk 其他 apply ext groovy kts 获取local.properties groovy","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/buildgradle-config.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"build.gradle"}],["meta",{"property":"og:description","content":"build.gradle 例子 kts groovy 添加依赖 配置ndk goovy kts 配置buildTypes groovy kts 配置jdk 其他 apply ext groovy kts 获取local.properties groovy"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-20T18:32:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-09-20T18:32:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"build.gradle\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-20T18:32:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"例子","slug":"例子","link":"#例子","children":[{"level":3,"title":"kts","slug":"kts","link":"#kts","children":[]},{"level":3,"title":"groovy","slug":"groovy","link":"#groovy","children":[]}]},{"level":2,"title":"添加依赖","slug":"添加依赖","link":"#添加依赖","children":[]},{"level":2,"title":"配置ndk","slug":"配置ndk","link":"#配置ndk","children":[{"level":3,"title":"goovy","slug":"goovy","link":"#goovy","children":[]},{"level":3,"title":"kts","slug":"kts-1","link":"#kts-1","children":[]}]},{"level":2,"title":"配置buildTypes","slug":"配置buildtypes","link":"#配置buildtypes","children":[{"level":3,"title":"groovy","slug":"groovy-1","link":"#groovy-1","children":[]},{"level":3,"title":"kts","slug":"kts-2","link":"#kts-2","children":[]}]},{"level":2,"title":"配置jdk","slug":"配置jdk","link":"#配置jdk","children":[]},{"level":2,"title":"其他","slug":"其他","link":"#其他","children":[]},{"level":2,"title":"apply","slug":"apply","link":"#apply","children":[]},{"level":2,"title":"ext","slug":"ext","link":"#ext","children":[{"level":3,"title":"groovy","slug":"groovy-2","link":"#groovy-2","children":[]},{"level":3,"title":"kts","slug":"kts-3","link":"#kts-3","children":[]}]},{"level":2,"title":"获取local.properties","slug":"获取local-properties","link":"#获取local-properties","children":[]},{"level":2,"title":"groovy","slug":"groovy-3","link":"#groovy-3","children":[]}],"git":{"createdTime":1695234758000,"updatedTime":1695234758000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.86,"words":559},"filePathRelative":"android-tips/buildgradle-config.md","localizedDate":"2023年9月20日","autoDesc":true}');export{r as comp,d as data};
