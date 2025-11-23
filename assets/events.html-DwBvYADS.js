import{_ as s,c as a,a as e,o as t}from"./app-B6vXTniy.js";const i={};function l(o,n){return t(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="事件" tabindex="-1"><a class="header-anchor" href="#事件"><span>事件</span></a></h1><blockquote><p><strong>事件</strong>是一种收集有关用户与应用程序的交互式组件进行交互的数据的有用方法。像按下按钮或触摸屏幕等。Android框架将事件队列保持为先进先出（FIFO）的基础。您可以在程序中捕获这些事件，并根据要求采取适当的措施。</p></blockquote><p>与Android事件管理相关的以下三个概念-</p><ul><li><strong>事件监听器</strong> - 事件监听器是View类中的一个接口，其中包含一个回调方法。当用户与UI中的项目进行交互触发了已注册侦听器的View时，Android框架将调用这些方法。</li><li><strong>事件侦听器注册</strong> - 事件注册是事件处理程序向事件侦听器注册的过程，以便在事件侦听器触发事件​​时调用该处理程序。</li><li><strong>事件处理程序</strong> - 当事件发生并且我们已经为该事件注册了一个事件侦听器时，该事件侦听器将调用事件处理程序，这是实际处理该事件的方法。</li></ul><h2 id="事件监听器和事件处理程序" tabindex="-1"><a class="header-anchor" href="#事件监听器和事件处理程序"><span>事件监听器和事件处理程序</span></a></h2><table><thead><tr><th>事件处理</th><th>事件监听器</th><th>描述</th></tr></thead><tbody><tr><td><strong>onClick()</strong></td><td>OnClickListener()</td><td>当用户单击或触摸或聚焦于任何小部件（如按钮，文本，图像等）时，将调用此方法。您将使用onClick()事件处理程序来处理此类事件。</td></tr><tr><td><strong>onLongClick()</strong></td><td>OnLongClickListener()</td><td>当用户单击或触摸或聚焦在任何小部件（如按钮，文本，图像等）上一秒钟或更长时间时，将调用此方法。您将使用onLongClick()事件处理程序来处理此类事件。</td></tr><tr><td><strong>onFocusChange()</strong></td><td>OnFocusChangeListener()</td><td>当小部件失去焦点时即调用此方法。用户离开视图项。您将使用onFocusChange()事件处理程序来处理此类事件。</td></tr><tr><td><strong>onKey()</strong></td><td>OnFocusChangeListener()</td><td>当用户专注于该项目并按下或释放设备上的硬件键时，将调用此方法。您将使用onKey()事件处理程序来处理此类事件。</td></tr><tr><td><strong>onTouch()</strong></td><td>OnTouchListener()</td><td>当用户按下键，释放键或屏幕上的任何移动手势时，将调用此方法。您将使用onTouch()事件处理程序来处理此类事件。</td></tr><tr><td><strong>onMenuItemClick()</strong></td><td>OnMenuItemClickListener()</td><td>用户选择菜单项时调用此方法。您将使用onMenuItemClick()事件处理程序来处理此类事件。</td></tr><tr><td><strong>onCreateContextMenu()</strong></td><td>onCreateContextMenuItemListener()</td><td>在构建上下文菜单时调用（持续的“长按”结果）</td></tr></tbody></table><p>作为<strong>View</strong>类的一部分，可能还有更多事件侦听器，例如OnHoverListener，OnDragListener等，它们可能是您的应用程序所需要的。因此，如果您要开发复杂的应用程序，建议您参考Android应用程序开发的官方文档。</p><h2 id="事件监听器注册" tabindex="-1"><a class="header-anchor" href="#事件监听器注册"><span>事件监听器注册</span></a></h2><p>事件注册是事件处理程序向事件监听器注册的过程，以便在事件监听器触发事件​​时调用该处理程序。尽管有几种技巧可以为任何事件注册事件侦听器，但是我将仅列出前三种方式，您可以根据情况使用其中三种方式。</p><ul><li>使用匿名内部类</li><li>Activity类实现Listener接口。</li><li>使用布局文件activity_main.xml直接指定事件处理程序。</li></ul><p>以下部分将为您提供有关这三种情况的详细示例-</p><h2 id="触控模式" tabindex="-1"><a class="header-anchor" href="#触控模式"><span>触控模式</span></a></h2><p>用户可以使用硬件键或按钮或触摸屏幕与设备进行交互。触摸屏幕可使设备进入触摸模式。然后，用户可以通过触摸屏幕上的虚拟按钮，图像等与之交互。您可以通过调用View类的isInTouchMode()方法来检查设备是否处于触摸模式。</p><h2 id="焦点" tabindex="-1"><a class="header-anchor" href="#焦点"><span>焦点</span></a></h2><p>视图或窗口小部件通常在突出显示时会突出显示或显示闪烁的光标。这表明已准备好接受用户的输入。</p><ul><li><strong>isFocusable()</strong> - 返回true或false</li><li><strong>isFocusableInTouchMode()</strong> -检查在触摸模式下视图是否可聚焦。（使用硬件键时，视图可能是可聚焦的，但设备处于触摸模式时则不能。）</li></ul><div class="language-xml" data-highlighter="prismjs" data-ext="xml"><pre><code class="language-xml"><span class="line">  android:foucsUp=&quot;@=id/button_l&quot;</span>
<span class="line"></span></code></pre></div><p><em>onTouchEvent()</em></p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java"><pre><code class="language-java"><span class="line">  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">onTouchEvent</span><span class="token punctuation">(</span>motionEvent event<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">switch</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span><span class="token function">getAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token constant">TOUCH_DOWN</span><span class="token operator">:</span></span>
<span class="line">        <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span><span class="token string">&quot;you have clicked down Touch button&quot;</span><span class="token punctuation">,</span><span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENTH_LONG</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">break</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">        <span class="token keyword">case</span> <span class="token constant">TOUCH_UP</span><span class="token operator">:</span></span>
<span class="line">        <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span><span class="token string">&quot;you have clicked up touch button&quot;</span><span class="token punctuation">,</span><span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENTH_LONG</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">        <span class="token keyword">case</span> <span class="token constant">TOUCH_MOVE</span><span class="token operator">:</span></span>
<span class="line">        <span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token function">makeText</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span><span class="token string">&quot;you have clicked move touch button&quot;</span><span class="token class-name">Toast</span><span class="token punctuation">.</span><span class="token constant">LENTH_LONG</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line">     <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onTouchEvent</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件处理示例" tabindex="-1"><a class="header-anchor" href="#事件处理示例"><span>事件处理示例</span></a></h2><p>使用匿名内部类注册事件侦听器 在这里，您将创建侦听器的匿名实现，如果每个类仅应用于单个控件，并且您具有将参数传递给事件处理程序的优势，则将很有用。在这种方法中，事件处理程序方法可以访问Activity的私有数据。无需引用即可调用“活动”。但是，如果将处理程序应用于多个控件，则必须剪切并粘贴该处理程序的代码，如果该处理程序的代码很长，则会使代码难以维护。以下是简单的步骤，以展示我们将如何利用单独的Listener类注册和捕获click事件。您可以类似的方式为任何其他必需的事件类型实现侦听器。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件创建一个简单的列TableView，其中包含显示为微调器项目的项目。</li><li>修改res/layout/activity_main.xml文件的默认内容以包括创建一个简单的列表视图。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><div class="language-java" data-highlighter="prismjs" data-ext="java"><pre><code class="language-java"><span class="line">  <span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>jc2182<span class="token punctuation">.</span>demo</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">Activity</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">ProgressDialog</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>os<span class="token punctuation">.</span></span><span class="token class-name">Bundle</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>view<span class="token punctuation">.</span></span><span class="token class-name">View</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">Button</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>widget<span class="token punctuation">.</span></span><span class="token class-name">TextView</span></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>public class MainActivity extends Activity { private ProgressDialog progress; Button b1,b2;</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">  @Override</span>
<span class="line">  protected void onCreate(Bundle savedInstanceState) {</span>
<span class="line">      super.onCreate(savedInstanceState);</span>
<span class="line">      setContentView(R.layout.activity_main);</span>
<span class="line">      progress = new ProgressDialog(this);</span>
<span class="line"></span>
<span class="line">      b1=(Button)findViewById(R.id.button);</span>
<span class="line">      b2=(Button)findViewById(R.id.button2);</span>
<span class="line">      b1.setOnClickListener(new View.OnClickListener() {</span>
<span class="line"></span>
<span class="line">          @Override</span>
<span class="line">          public void onClick(View v) {</span>
<span class="line">              TextView txtView = (TextView) findViewById(R.id.textView);</span>
<span class="line">              txtView.setTextSize(25);</span>
<span class="line">          }</span>
<span class="line">      });</span>
<span class="line"></span>
<span class="line">      b2.setOnClickListener(new View.OnClickListener() {</span>
<span class="line"></span>
<span class="line">          @Override</span>
<span class="line">          public void onClick(View v) {</span>
<span class="line">              TextView txtView = (TextView) findViewById(R.id.textView);</span>
<span class="line">              txtView.setTextSize(55);</span>
<span class="line">          }</span>
<span class="line">      });</span>
<span class="line">  }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>}</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span>
<span class="line">以下是res/layout/activity_main.xml文件的内容-</span>
<span class="line"></span>
<span class="line">\`\`\`xml</span>
<span class="line"></span>
<span class="line">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="line">&lt;RelativeLayout</span>
<span class="line">    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;</span>
<span class="line">    xmlns:tools=&quot;http://schemas.android.com/tools&quot;</span>
<span class="line">    android:layout_width=&quot;match_parent&quot;</span>
<span class="line">    android:layout_height=&quot;match_parent&quot;</span>
<span class="line">    tools:context=&quot;.MainActivity&quot;&gt;</span>
<span class="line"></span>
<span class="line">    &lt;TextView</span>
<span class="line">        android:id=&quot;@+id/textView1&quot;</span>
<span class="line">        android:layout_width=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:text=&quot;事件处理示例 &quot;</span>
<span class="line">        android:layout_alignParentTop=&quot;true&quot;</span>
<span class="line">        android:layout_centerHorizontal=&quot;true&quot;</span>
<span class="line">        android:textSize=&quot;30dp&quot;/&gt;</span>
<span class="line"></span>
<span class="line">    &lt;TextView</span>
<span class="line">        android:id=&quot;@+id/textView2&quot;</span>
<span class="line">        android:layout_width=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:text=&quot;蝴蝶教程 &quot;</span>
<span class="line">        android:textColor=&quot;#ff87ff09&quot;</span>
<span class="line">        android:textSize=&quot;30dp&quot;</span>
<span class="line">        android:layout_above=&quot;@+id/imageButton&quot;</span>
<span class="line">        android:layout_centerHorizontal=&quot;true&quot;</span>
<span class="line">        android:layout_marginBottom=&quot;40dp&quot; /&gt;</span>
<span class="line"></span>
<span class="line">    &lt;ImageButton</span>
<span class="line">        android:layout_width=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:id=&quot;@+id/imageButton&quot;</span>
<span class="line">        android:src=&quot;@drawable/logo&quot;</span>
<span class="line">        android:layout_centerVertical=&quot;true&quot;</span>
<span class="line">        android:layout_centerHorizontal=&quot;true&quot; /&gt;</span>
<span class="line"></span>
<span class="line">    &lt;Button</span>
<span class="line">        android:layout_width=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:text=&quot;小字体&quot;</span>
<span class="line">        android:id=&quot;@+id/button&quot;</span>
<span class="line">        android:layout_below=&quot;@+id/imageButton&quot;</span>
<span class="line">        android:layout_centerHorizontal=&quot;true&quot; /&gt;</span>
<span class="line"></span>
<span class="line">    &lt;Button</span>
<span class="line">        android:layout_width=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:text=&quot;大字体&quot;</span>
<span class="line">        android:id=&quot;@+id/button2&quot;</span>
<span class="line">        android:layout_below=&quot;@+id/button&quot;</span>
<span class="line">        android:layout_alignRight=&quot;@+id/button&quot;</span>
<span class="line">        android:layout_alignEnd=&quot;@+id/button&quot; /&gt;</span>
<span class="line"></span>
<span class="line">    &lt;TextView</span>
<span class="line">        android:layout_width=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:text=&quot;Hello World!&quot;</span>
<span class="line">        android:id=&quot;@+id/textView&quot;</span>
<span class="line">        android:layout_below=&quot;@+id/button2&quot;</span>
<span class="line">        android:layout_centerHorizontal=&quot;true&quot;</span>
<span class="line">        android:textSize=&quot;25dp&quot; /&gt;</span>
<span class="line"></span>
<span class="line">&lt;/RelativeLayout&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/event1.png" alt=""></p><p>点击“大字体”按钮，如下界面</p><p><img src="https://www.jc2182.com/images/android/event2.png" alt=""></p><blockquote><p>我建议尝试为不同的事件类型编写不同的事件处理程序，并了解不同事件类型及其处理方式的确切区别。与菜单，微调器，选择器小部件相关的事件几乎没有什么不同，但它们也基于与上述相同的概念。</p></blockquote>`,33)])])}const c=s(i,[["render",l]]),d=JSON.parse('{"path":"/android-tutor/interface/events.html","title":"事件","lang":"zh-CN","frontmatter":{"description":"事件 事件是一种收集有关用户与应用程序的交互式组件进行交互的数据的有用方法。像按下按钮或触摸屏幕等。Android框架将事件队列保持为先进先出（FIFO）的基础。您可以在程序中捕获这些事件，并根据要求采取适当的措施。 与Android事件管理相关的以下三个概念- 事件监听器 - 事件监听器是View类中的一个接口，其中包含一个回调方法。当用户与UI中的...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"事件\\",\\"image\\":[\\"https://www.jc2182.com/images/android/event1.png\\",\\"https://www.jc2182.com/images/android/event2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/interface/events.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"事件"}],["meta",{"property":"og:description","content":"事件 事件是一种收集有关用户与应用程序的交互式组件进行交互的数据的有用方法。像按下按钮或触摸屏幕等。Android框架将事件队列保持为先进先出（FIFO）的基础。您可以在程序中捕获这些事件，并根据要求采取适当的措施。 与Android事件管理相关的以下三个概念- 事件监听器 - 事件监听器是View类中的一个接口，其中包含一个回调方法。当用户与UI中的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/event1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}]]},"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":6.45,"words":1934},"filePathRelative":"android-tutor/interface/events.md","autoDesc":true}');export{c as comp,d as data};
