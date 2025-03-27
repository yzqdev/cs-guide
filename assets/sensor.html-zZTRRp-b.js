import{_ as s,c as a,a as t,o as p}from"./app-C8DxhDIZ.js";const e={};function o(c,n){return p(),a("div",null,n[0]||(n[0]=[t(`<h1 id="传感器" tabindex="-1"><a class="header-anchor" href="#传感器"><span>传感器</span></a></h1><p>大多数android设备都有内置的传感器，可以测量运动，方向和各种环境条件。android平台支持三大类传感器。</p><ul><li><p>运动传感器</p></li><li><p>环境传感器</p></li><li><p>位置传感器</p><p>有些传感器是基于硬件的传感器，有些是基于软件的传感器。无论传感器是什么，android都允许我们从这些传感器获取原始数据，并将其用于我们的应用程序中。为此，android为我们提供了一些类。</p><p>Android提供了<strong>SensorManager</strong>和<strong>Sensor</strong>类，以在我们的应用程序中使用传感器。为了使用传感器，您需要做的第一件事是实例化<strong>SensorManager</strong>类的对象。可以如下实现。</p></li></ul><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  <span class="token class-name">SensorManager</span> sMgr<span class="token punctuation">;</span></span>
<span class="line">  sMgr <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SensorManager</span><span class="token punctuation">)</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span><span class="token constant">SENSOR_SERVICE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>接下来需要做的是通过调用SensorManager类的getDefaultSensor()方法来实例化Sensor类的对象。其语法如下-</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  <span class="token class-name">Sensor</span> light<span class="token punctuation">;</span></span>
<span class="line">  light <span class="token operator">=</span> sMgr<span class="token punctuation">.</span><span class="token function">getDefaultSensor</span><span class="token punctuation">(</span><span class="token class-name">Sensor</span><span class="token punctuation">.</span><span class="token constant">TYPE_LIGHT</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>声明该传感器后，您需要注册其侦听器并重写onAccuracyChanged和onSensorChanged这两个方法。它的语法如下-</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  sMgr<span class="token punctuation">.</span><span class="token function">registerListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> light<span class="token punctuation">,</span><span class="token class-name">SensorManager</span><span class="token punctuation">.</span><span class="token constant">SENSOR_DELAY_NORMAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onAccuracyChanged</span><span class="token punctuation">(</span><span class="token class-name">Sensor</span> sensor<span class="token punctuation">,</span> <span class="token keyword">int</span> accuracy<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onSensorChanged</span><span class="token punctuation">(</span><span class="token class-name">SensorEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="获取支持的传感器列表" tabindex="-1"><a class="header-anchor" href="#获取支持的传感器列表"><span>获取支持的传感器列表</span></a></h2><p>您可以通过调用getSensorList方法获取设备支持的传感器列表，该方法将返回包含传感器名称和版本号以及更多信的传感器列表。然后，您可以遍历列表以获取信息。其语法如下-</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  sMgr <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SensorManager</span><span class="token punctuation">)</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getSystemService</span><span class="token punctuation">(</span><span class="token constant">SENSOR_SERVICE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Sensor</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> sMgr<span class="token punctuation">.</span><span class="token function">getSensorList</span><span class="token punctuation">(</span><span class="token class-name">Sensor</span><span class="token punctuation">.</span><span class="token constant">TYPE_ALL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Sensor</span> sensor<span class="token operator">:</span> list<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>除了这些方法之外，SensorManager类还提供了其他方法来管理传感器框架。这些方法在下面列出-</p><p>td&gt; td&gt; td&gt; td&gt; td&gt;</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>getDefaultSensor(int type)</strong></td><td>此方法获取给定类型的默认传感器。</td></tr><tr><td><strong>getInclination(float[] I)</strong></td><td>该方法从倾斜矩阵计算以弧度为单位的地磁倾斜角。</td></tr><tr><td><strong>registerListener(SensorListener listener, int sensors, int rate)</strong></td><td>此方法为传感器注册一个侦听器</td></tr><tr><td><strong>unregisterListener(SensorEventListener listener, Sensor sensor)</strong></td><td>此方法为注册了该传感器的传感器注销一个侦听器。</td></tr><tr><td><strong>getOrientation(float[] R, float[] values)</strong></td><td>此方法根据旋转矩阵计算设备的方向。</td></tr><tr><td><strong>getAltitude(float p0, float p)</strong></td><td>此方法从大气压力和海平面压力计算以米为单位的海拔高度。</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>本示例演示了进度对话框的旋转用法。按下按钮时将显示旋转进度对话框。 要尝试使用此示例，您需要在按照以下步骤开发应用程序后，在实际设备上运行此示例。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加必要的代码。</li><li>修改res/layout/activity_main以添加相应的XML组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  </span>
<span class="line"></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">Activity</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>hardware<span class="token punctuation">.</span></span><span class="token class-name">Sensor</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>hardware<span class="token punctuation">.</span></span><span class="token class-name">SensorManager</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>os<span class="token punctuation">.</span></span><span class="token class-name">Bundle</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">View</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">TextView</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MainActivity</span> <span class="token keyword">extends</span> <span class="token class-name">Activity</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">      <span class="token class-name">TextView</span> tv1<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">private</span> <span class="token class-name">SensorManager</span> mSensorManager<span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">      <span class="token annotation punctuation">@Override</span></span>
<span class="line">      <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token class-name">Bundle</span> savedInstanceState<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">          <span class="token function">setContentView</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>activity_main<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">          tv1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">TextView</span><span class="token punctuation">)</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>textView2<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">          tv1<span class="token punctuation">.</span><span class="token function">setVisibility</span><span class="token punctuation">(</span><span class="token class-name">View</span><span class="token punctuation">.</span><span class="token constant">GONE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">          mSensorManager <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SensorManager</span><span class="token punctuation">)</span> <span class="token function">getSystemService</span><span class="token punctuation">(</span><span class="token constant">SENSOR_SERVICE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">          <span class="token class-name">List</span> mList<span class="token operator">=</span> mSensorManager<span class="token punctuation">.</span><span class="token function">getSensorList</span><span class="token punctuation">(</span><span class="token class-name">Sensor</span><span class="token punctuation">.</span><span class="token constant">TYPE_ALL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">          <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> mList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">              tv1<span class="token punctuation">.</span><span class="token function">setVisibility</span><span class="token punctuation">(</span><span class="token class-name">View</span><span class="token punctuation">.</span><span class="token constant">VISIBLE</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">              tv1<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> mList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> mList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getVendor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\n&quot;</span> <span class="token operator">+</span> mList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getVersion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是res/layout/activity_main.xml文件的内容-</p><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RelativeLayout</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res/android<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name"><span class="token namespace">xmlns:</span>tools</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/tools<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name"><span class="token namespace">tools:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>.MainActivity<span class="token punctuation">&quot;</span></span></span>
<span class="line">    <span class="token attr-name"><span class="token namespace">android:</span>transitionGroup</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextView</span> <span class="token attr-name"><span class="token namespace">android:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>传感器 <span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/textview<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>textSize</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>35sp<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_alignParentTop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_centerHorizontal</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextView</span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>蝴蝶教程<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/textView<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_below</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/textview<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_centerHorizontal</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>textColor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#ff7aff24<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>textSize</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>35sp<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ImageView</span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/imageView<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>248dp<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>69dp<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_below</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/textView<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_centerHorizontal</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_marginTop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>4dp<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>background</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#223311<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@drawable/logo<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextView</span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/textView2<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>match_parent<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_below</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/imageView<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_alignParentStart</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_alignParentEnd</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_alignParentBottom</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_marginStart</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>0dp<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_marginTop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>21dp<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>New Text<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RelativeLayout</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/sensor.png" alt=""></p>`,23)]))}const i=s(e,[["render",o]]),u=JSON.parse('{"path":"/android-tutor/advanced/sensor.html","title":"传感器","lang":"zh-CN","frontmatter":{"description":"传感器 大多数android设备都有内置的传感器，可以测量运动，方向和各种环境条件。android平台支持三大类传感器。 运动传感器 环境传感器 位置传感器 有些传感器是基于硬件的传感器，有些是基于软件的传感器。无论传感器是什么，android都允许我们从这些传感器获取原始数据，并将其用于我们的应用程序中。为此，android为我们提供了一些类。 An...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/sensor.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"传感器"}],["meta",{"property":"og:description","content":"传感器 大多数android设备都有内置的传感器，可以测量运动，方向和各种环境条件。android平台支持三大类传感器。 运动传感器 环境传感器 位置传感器 有些传感器是基于硬件的传感器，有些是基于软件的传感器。无论传感器是什么，android都允许我们从这些传感器获取原始数据，并将其用于我们的应用程序中。为此，android为我们提供了一些类。 An..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/sensor.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"传感器\\",\\"image\\":[\\"https://www.jc2182.com/images/android/sensor.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"获取支持的传感器列表","slug":"获取支持的传感器列表","link":"#获取支持的传感器列表","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.62,"words":1086},"filePathRelative":"android-tutor/advanced/sensor.md","localizedDate":"2023年5月22日","autoDesc":true}');export{i as comp,u as data};
