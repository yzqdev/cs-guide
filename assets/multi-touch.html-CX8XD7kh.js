import{_ as t,c as o,o as n,d}from"./app-CbULZrmi.js";const e={},i=d(`<h1 id="多点触控" tabindex="-1"><a class="header-anchor" href="#多点触控"><span>多点触控</span></a></h1><p>当多于一个手指同时触摸屏幕时，就会发生多点触摸手势。Android允许我们检测这些手势。每当多个手指同时触摸屏幕时，Android系统都会生成以下触摸事件。</p><table><thead><tr><th>事件</th><th>说明</th></tr></thead><tbody><tr><td><strong>ACTION_DOWN</strong></td><td>对于触摸屏幕的第一个指针。这开始手势。</td></tr><tr><td><strong>ACTION_POINTER_DOWN</strong></td><td>对于进入第一个屏幕之外的其他指针。</td></tr><tr><td><strong>ACTION_MOVE</strong></td><td>按下手势时发生了变化。</td></tr><tr><td><strong>ACTION_POINTER_UP</strong></td><td>当非主要指针上升时发送。</td></tr><tr><td><strong>ACTION_UP</strong></td><td>当最后一个指针离开屏幕时发送。</td></tr></tbody></table><p>因此，为了检测上述任何事件，您需要重写onTouchEvent()方法并手动检查这些事件。其语法如下-</p><pre><code class="language-java">  public boolean onTouchEvent(MotionEvent ev){
     final int actionPeformed = ev.getAction();
  
     switch(actionPeformed){
        case MotionEvent.ACTION_DOWN:{
           break;
        }
  
        case MotionEvent.ACTION_MOVE:{
           break;
        }
        return true;
     }
  }
</code></pre><p>在这些情况下，您可以执行任何喜欢的计算。例如缩放，缩小等为了获得X和Y轴的坐标，可以调用getX()和getY()方法。其语法如下-</p><pre><code class="language-java">  final float x = ev.getX();
  final float y = ev.getY();
</code></pre><p>除了这些方法之外，此MotionEvent类还提供了其他方法，可以更好地处理多点触摸。这些方法在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>getAction()</strong></td><td>此方法返回正在执行的操作的种类</td></tr><tr><td><strong>getPressure()</strong></td><td>此方法为第一个索引返回此事件的当前压力</td></tr><tr><td><strong>getRawX()</strong></td><td>此方法返回此事件的原始原始X坐标</td></tr><tr><td><strong>getRawY()</strong></td><td>此方法返回此事件的原始原始Y坐标</td></tr><tr><td><strong>getSize()</strong></td><td>此方法返回第一个指针索引的大小</td></tr><tr><td><strong>getSource()</strong></td><td>此方法获取事件的来源</td></tr><tr><td><strong>getXPrecision()</strong></td><td>此方法返回要报告的X坐标的精度</td></tr><tr><td><strong>getYPrecision()</strong></td><td>此方法返回报告的Y坐标的精度</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是演示使用多点触控的示例。它创建一个基本的Multitouch手势应用程序，使您可以在执行多点触摸时查看坐标。要试验此示例，您需要在实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加多点触控代码。</li><li>修改res/layout/activity_main以添加相应的XML组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.view.MotionEvent;
  import android.view.View;
  import android.widget.EditText;
  import android.widget.TextView;

  public class MainActivity extends Activity {

      float xAxis = 0f;
      float yAxis = 0f;
    
      float lastXAxis = 0f;
      float lastYAxis = 0f;
    
      EditText ed1, ed2, ed3, ed4;
      TextView tv1;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          ed1 = (EditText) findViewById(R.id.editText);
          ed2 = (EditText) findViewById(R.id.editText2);
          ed3 = (EditText) findViewById(R.id.editText3);
          ed4 = (EditText) findViewById(R.id.editText4);
    
          tv1=(TextView)findViewById(R.id.textView2);
    
          tv1.setOnTouchListener(new View.OnTouchListener() {
              @Override
              public boolean onTouch(View v, MotionEvent event) {
                  final int actionPeformed = event.getAction();
    
                  switch(actionPeformed){
                      case MotionEvent.ACTION_DOWN:{
                          final float x = event.getX();
                          final float y = event.getY();
    
                          lastXAxis = x;
                          lastYAxis = y;
    
                          ed1.setText(Float.toString(lastXAxis));
                          ed2.setText(Float.toString(lastYAxis));
                          break;
                      }
    
                      case MotionEvent.ACTION_MOVE:{
                          final float x = event.getX();
                          final float y = event.getY();
    
                          final float dx = x - lastXAxis;
                          final float dy = y - lastYAxis;
    
                          xAxis += dx;
                          yAxis += dy;
    
                          ed3.setText(Float.toString(xAxis));
                          ed4.setText(Float.toString(yAxis));
                          break;
                      }
                  }
                  return true;
              }
          });
      }

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;
    android:transitionGroup=&quot;true&quot;&gt;

    &lt;TextView
        android:id=&quot;@+id/textview&quot;
        android:layout_width=&quot;385dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;3dp&quot;
        android:text=&quot;多点触控示例&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView&quot;
        android:layout_below=&quot;@+id/textview&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:background=&quot;#22FFFF&quot;
        android:theme=&quot;@style/Base.TextAppearance.AppCompat&quot; /&gt;

    &lt;EditText
        android:id=&quot;@+id/editText&quot;
        android:layout_width=&quot;351dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignStart=&quot;@+id/textview&quot;
        android:layout_alignLeft=&quot;@+id/textview&quot;
        android:layout_alignEnd=&quot;@+id/textview&quot;
        android:layout_alignRight=&quot;@+id/textview&quot;
        android:layout_marginStart=&quot;-25dp&quot;
        android:layout_marginLeft=&quot;-25dp&quot;
        android:layout_marginTop=&quot;6dp&quot;
        android:hint=&quot;X-坐标&quot;
        android:textColorHint=&quot;#ff69ff0e&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText2&quot;
        android:layout_below=&quot;@+id/editText&quot;
        android:layout_alignLeft=&quot;@+id/editText&quot;
        android:layout_alignStart=&quot;@+id/editText&quot;
        android:textColorHint=&quot;#ff21ff11&quot;
        android:hint=&quot;Y-坐标&quot;
        android:layout_alignRight=&quot;@+id/editText&quot;
        android:layout_alignEnd=&quot;@+id/editText&quot; /&gt;

    &lt;EditText
        android:id=&quot;@+id/editText3&quot;
        android:layout_width=&quot;390dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/editText2&quot;
        android:layout_alignStart=&quot;@+id/editText2&quot;
        android:layout_alignLeft=&quot;@+id/editText2&quot;
        android:layout_alignEnd=&quot;@+id/editText2&quot;
        android:layout_alignRight=&quot;@+id/editText2&quot;
        android:layout_marginStart=&quot;-22dp&quot;
        android:layout_marginLeft=&quot;-22dp&quot;
        android:layout_marginTop=&quot;6dp&quot;
        android:hint=&quot;移动 X&quot;
        android:textColorHint=&quot;#ff33ff20&quot; /&gt;

    &lt;EditText
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/editText4&quot;
        android:layout_below=&quot;@+id/editText3&quot;
        android:layout_alignLeft=&quot;@+id/editText3&quot;
        android:layout_alignStart=&quot;@+id/editText3&quot;
        android:textColorHint=&quot;#ff31ff07&quot;
        android:hint=&quot;移动 Y&quot;
        android:layout_alignRight=&quot;@+id/editText3&quot;
        android:layout_alignEnd=&quot;@+id/editText3&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;231dp&quot;
        android:layout_height=&quot;123dp&quot;
        android:layout_alignStart=&quot;@+id/imageView&quot;
        android:layout_alignLeft=&quot;@+id/imageView&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_marginStart=&quot;-6dp&quot;
        android:layout_marginLeft=&quot;-59dp&quot;
        android:layout_marginBottom=&quot;123dp&quot;
        android:clickable=&quot;true&quot;
        android:focusable=&quot;true&quot;
        android:text=&quot;触摸这里&quot;
        android:textColor=&quot;#ff5480ff&quot;
        android:textSize=&quot;35dp&quot;
        android:typeface=&quot;sans&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/multitouch1.png" alt=""></p><p>尝试触摸屏幕来看效果</p>`,19),a=[i];function r(u,l){return n(),o("div",null,a)}const c=t(e,[["render",r],["__file","multi-touch.html.vue"]]),s=JSON.parse('{"path":"/android-tutor/advanced/multi-touch.html","title":"多点触控","lang":"zh-CN","frontmatter":{"description":"多点触控 当多于一个手指同时触摸屏幕时，就会发生多点触摸手势。Android允许我们检测这些手势。每当多个手指同时触摸屏幕时，Android系统都会生成以下触摸事件。 因此，为了检测上述任何事件，您需要重写onTouchEvent()方法并手动检查这些事件。其语法如下- 在这些情况下，您可以执行任何喜欢的计算。例如缩放，缩小等为了获得X和Y轴的坐标，可...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/multi-touch.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"多点触控"}],["meta",{"property":"og:description","content":"多点触控 当多于一个手指同时触摸屏幕时，就会发生多点触摸手势。Android允许我们检测这些手势。每当多个手指同时触摸屏幕时，Android系统都会生成以下触摸事件。 因此，为了检测上述任何事件，您需要重写onTouchEvent()方法并手动检查这些事件。其语法如下- 在这些情况下，您可以执行任何喜欢的计算。例如缩放，缩小等为了获得X和Y轴的坐标，可..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/multitouch1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"多点触控\\",\\"image\\":[\\"https://www.jc2182.com/images/android/multitouch1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.11,"words":1234},"filePathRelative":"android-tutor/advanced/multi-touch.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,s as data};
