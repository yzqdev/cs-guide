import{_ as n,c as a,a as s,o as e}from"./app-C8DxhDIZ.js";const o={};function p(r,t){return e(),a("div",null,t[0]||(t[0]=[s(`<h1 id="android-ui" tabindex="-1"><a class="header-anchor" href="#android-ui"><span>Android UI</span></a></h1><p>用户界面的基本构建块是从<strong>View</strong>类创建的<strong>View</strong>对象，它占据屏幕上的一个矩形区域，负责绘制和事件处理。View是widget的基类，用于创建交互式UI组件，如按钮、文本字段等。<strong>ViewGroup</strong>是<strong>View</strong>的一个子类，提供了不可见的容器，用于保存其他视图或其他视图组并定义它们的布局属性。</p><p>第三层面上我们有不同的布局ViewGroup子类的类和一个典型的布局定义了一个Android用户界面的视觉结构在运行时,可以创建使用视图ViewGroup对象或你可以声明使用简单的XML文件布局文件夹位于您的项目res/layout文件夹下。</p><p>本教程更多关于基于XML文件中定义的布局创建GUI。布局可以包含任何类型的小部件，例如按钮，标签，文本框等。以下是具有<strong>LinearLayout</strong>的XML文件的简单示例-</p><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line">  <span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LinearLayout</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://schemas.android.com/apk/res/android<span class="token punctuation">&quot;</span></span></span>
<span class="line">     <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fill_parent<span class="token punctuation">&quot;</span></span></span>
<span class="line">     <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fill_parent<span class="token punctuation">&quot;</span></span></span>
<span class="line">     <span class="token attr-name"><span class="token namespace">android:</span>orientation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>vertical<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span></span>
<span class="line">  </span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextView</span> <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/text<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>This is a TextView<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">  </span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Button</span> <span class="token attr-name"><span class="token namespace">android:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@+id/button<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>layout_height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrap_content<span class="token punctuation">&quot;</span></span></span>
<span class="line">        <span class="token attr-name"><span class="token namespace">android:</span>text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>This is a Button<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">  </span>
<span class="line">     <span class="token comment">&lt;!-- More GUI components go here  --&gt;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>LinearLayout</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建布局后，您可以在Activity.onCreate()回调实现中从应用程序代码加载布局资源，如下所示-</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token class-name">Bundle</span> savedInstanceState<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">     <span class="token function">setContentView</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>layout<span class="token punctuation">.</span>activity_main<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// activity_main 为布局文件的文件名</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="android-布局类型" tabindex="-1"><a class="header-anchor" href="#android-布局类型"><span>Android 布局类型</span></a></h2><p>Android提供了许多版式，您几乎可以在所有Android应用程序中使用它们来提供不同的视图，外观。</p><table><thead><tr><th>布局</th><th>说明</th></tr></thead><tbody><tr><td><a href="https://www.jc2182.com/android/android-linearlayout-show.html" target="_blank" rel="noopener noreferrer">线性布局</a></td><td><strong>LinearLayout</strong>是一个视图组，该视图组在单个方向上垂直或水平对齐所有子级。</td></tr><tr><td><a href="https://www.jc2182.com/android/android-relativelayout-show.html" target="_blank" rel="noopener noreferrer">相对布局</a></td><td><strong>RelativeLayout</strong>是一个视图组，在相对位置显示子视图。</td></tr><tr><td><a href="https://www.jc2182.com/android/android-tablelayout-show.html" target="_blank" rel="noopener noreferrer">表格布局</a></td><td><strong>TableLayout</strong>是将视图分为行和列的视图。</td></tr><tr><td><a href="https://www.jc2182.com/android/android-absolutelayout-show.html" target="_blank" rel="noopener noreferrer">绝对布局</a></td><td><strong>AbsoluteLayout</strong>使您可以指定其子级的确切位置。</td></tr><tr><td><a href="https://www.jc2182.com/android/android-frameLayout-show.html" target="_blank" rel="noopener noreferrer">框架布局</a></td><td><strong>FrameLayout</strong>是屏幕上的占位符，可用于显示单个视图。</td></tr><tr><td><a href="https://www.jc2182.com/android/android-listview-show.html" target="_blank" rel="noopener noreferrer">列表视图</a></td><td><strong>ListView</strong>是一个视图组，显示可滚动项的列表。</td></tr><tr><td><a href="https://www.jc2182.com/android/android-gridview-show.html" target="_blank" rel="noopener noreferrer">网格视图</a></td><td><strong>GridView</strong>是一个<strong>ViewGroup</strong>，它在二维可滚动网格中显示项目。</td></tr></tbody></table><h2 id="布局属性" tabindex="-1"><a class="header-anchor" href="#布局属性"><span>布局属性</span></a></h2><p>每个布局都有一组属性，这些属性定义该布局的视觉属性。在所有布局中，只有很少的公共属性，而其他属性是特定布局所特有的。以下是常见的属性，它们将应用于所有布局：</p><table><thead><tr><th>属性</th><th>说明</th></tr></thead><tbody><tr><td><strong>android:id</strong></td><td>这是唯一标识视图的ID。</td></tr><tr><td><strong>android:layout_width</strong></td><td>这是布局的宽度。</td></tr><tr><td><strong>android:layout_height</strong></td><td>这是布局的高度</td></tr><tr><td><strong>android:layout_marginTop</strong></td><td>这是布局顶部的额外空间。</td></tr><tr><td><strong>android:layout_marginBottom</strong></td><td>这是布局底部的额外空间。</td></tr><tr><td><strong>android:layout_marginLeft</strong></td><td>这是布局左侧的额外空间。</td></tr><tr><td><strong>android:layout_marginRight</strong></td><td>这是布局右侧的额外空间。</td></tr><tr><td><strong>android:layout_gravity</strong></td><td>这指定子视图的放置方式。</td></tr><tr><td><strong>android:layout_weight</strong></td><td>这指定应将布局中多少额外空间分配给视图。</td></tr><tr><td><strong>android:layout_x</strong></td><td>这指定布局的x坐标。</td></tr><tr><td><strong>android:layout_y</strong></td><td>这指定布局的y坐标。</td></tr><tr><td><strong>android:layout_width</strong></td><td>这是布局的宽度。</td></tr><tr><td><strong>android:paddingLeft</strong></td><td>这是为布局填充的左侧填充。</td></tr><tr><td><strong>android:paddingRight</strong></td><td>这是为布局填充的正确填充。</td></tr><tr><td><strong>android:paddingTop</strong></td><td>这是为布局填充的顶部填充。</td></tr><tr><td><strong>android:paddingBottom</strong></td><td>这是为布局填充的底部填充。</td></tr></tbody></table><p>此处的width和height是layout/view的尺寸，可以根据dp（与密度无关的像素），sp（与比例无关的像素），pt（为1/72英寸的点），px（像素），mm（毫米），最后以英寸为单位。您可以使用精确的测量来指定宽度和高度，但是更常见的是，您将使用以下常量之一来设置宽度或高度-</p><ul><li><strong>android:layout_width</strong> = wrap_content 告诉您将视图调整为其内容所需的尺寸。</li><li><strong>android:layout_width</strong> = fill_parent 告诉您视图变得与其父视图一样大。</li></ul><p>gravity属性在定位视图对象中起着重要作用，它可以采用以下一个或多个（用“|”分隔）以下常量值。</p><table><thead><tr><th>常量</th><th>值</th><th>描述</th></tr></thead><tbody><tr><td><strong>top</strong></td><td>0x30</td><td>将对象推到其容器的顶部，而不改变其大小。</td></tr><tr><td><strong>bottom</strong></td><td>0x50</td><td>将对象推到其容器的底部，而不改变其大小。</td></tr><tr><td><strong>left</strong></td><td>0x03</td><td>将对象推到其容器的左侧，不改变其大小。</td></tr><tr><td><strong>right</strong></td><td>0x05</td><td>将对象推到其容器的右侧，而不改变其大小。</td></tr><tr><td><strong>center_vertical</strong></td><td>0x10</td><td>将对象放置在其容器的垂直中心，不改变其大小。</td></tr><tr><td><strong>fill_vertical</strong></td><td>0x70</td><td>如果需要，增大对象的垂直大小，使其完全填满其容器。</td></tr><tr><td><strong>center_horizontal</strong></td><td>0x01</td><td>将对象放置在其容器的水平中心，不改变其大小。</td></tr><tr><td><strong>fill_horizontal</strong></td><td>0x07</td><td>如果需要，增大对象的水平大小，以完全填充其容器。</td></tr><tr><td><strong>center</strong></td><td>0x11</td><td>将对象放在其容器的垂直和水平轴的中心，不改变其大小。</td></tr><tr><td><strong>fill</strong></td><td>0x77</td><td>如果需要，增大对象的水平和垂直大小，使其完全填满其容器。</td></tr><tr><td><strong>clip_vertical</strong></td><td>0x80</td><td>可以设置将子元素的顶部和/或底部边缘剪切到其容器边界的附加选项。剪辑将基于垂直重力:顶部重力将剪辑底部边缘，底部重力将剪辑顶部边缘，两者都不会剪辑两个边缘。</td></tr><tr><td><strong>clip_horizontal</strong></td><td>0x08</td><td>可以设置为将子元素的左边缘和/或右边缘剪切到其容器边界的附加选项。剪辑将基于水平重力:左重力将剪辑右边缘，右重力将剪辑左边缘，两者都不会剪辑。</td></tr><tr><td><strong>start</strong></td><td>0x00800003</td><td>将object推到其容器的开头，但不改变其大小。</td></tr><tr><td><strong>end</strong></td><td>0x00800005</td><td>将对象推到其容器的末端，而不改变其大小。</td></tr></tbody></table><h2 id="视图标识符" tabindex="-1"><a class="header-anchor" href="#视图标识符"><span>视图标识符</span></a></h2><p><strong>View</strong> 对象可能具有分配给它的唯一ID，该ID将在树中唯一标识视图。XML标记内的ID的语法是-</p><div class="language-xml" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line">  android:id=&quot;@+id/my_button&quot;</span>
<span class="line"></span></code></pre></div><p>以下是@和+符号的简要说明-</p><ul><li>字符串开头的符号（@）表示XML解析器应解析并扩展ID字符串的其余部分，并将其标识为ID资源。</li><li>加号（+）表示这是必须创建并添加到我们资源中的新资源名称。要创建视图对象的实例并从布局中捕获它，请使用以下命令：</li></ul><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  <span class="token class-name">Button</span> myButton <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Button</span><span class="token punctuation">)</span> <span class="token function">findViewById</span><span class="token punctuation">(</span><span class="token class-name">R</span><span class="token punctuation">.</span>id<span class="token punctuation">.</span>my_button<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div>`,23)]))}const i=n(o,[["render",p]]),l=JSON.parse('{"path":"/android-tutor/interface/ui.html","title":"Android UI","lang":"zh-CN","frontmatter":{"description":"Android UI 用户界面的基本构建块是从View类创建的View对象，它占据屏幕上的一个矩形区域，负责绘制和事件处理。View是widget的基类，用于创建交互式UI组件，如按钮、文本字段等。ViewGroup是View的一个子类，提供了不可见的容器，用于保存其他视图或其他视图组并定义它们的布局属性。 第三层面上我们有不同的布局ViewGroup...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/interface/ui.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Android UI"}],["meta",{"property":"og:description","content":"Android UI 用户界面的基本构建块是从View类创建的View对象，它占据屏幕上的一个矩形区域，负责绘制和事件处理。View是widget的基类，用于创建交互式UI组件，如按钮、文本字段等。ViewGroup是View的一个子类，提供了不可见的容器，用于保存其他视图或其他视图组并定义它们的布局属性。 第三层面上我们有不同的布局ViewGroup..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Android UI\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Android 布局类型","slug":"android-布局类型","link":"#android-布局类型","children":[]},{"level":2,"title":"布局属性","slug":"布局属性","link":"#布局属性","children":[]},{"level":2,"title":"视图标识符","slug":"视图标识符","link":"#视图标识符","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":5.39,"words":1616},"filePathRelative":"android-tutor/interface/ui.md","localizedDate":"2023年5月22日","autoDesc":true}');export{i as comp,l as data};
