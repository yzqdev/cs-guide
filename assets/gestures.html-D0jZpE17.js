import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const r={},a=o(`<h1 id="手势" tabindex="-1"><a class="header-anchor" href="#手势"><span>手势</span></a></h1><p>Android提供了特殊类型的触摸屏事件，例如捏，双击，滚动，长按和退格。这些都称为手势。Android提供了<strong>GestureDetector</strong>类来接收手势事件，并告诉我们这些事件是否与手势相对应。要使用它，您需要创建一个<strong>GestureDetector</strong>对象，然后使用<strong>GestureDetector.SimpleOnGestureListener</strong>扩展另一个类以充当侦听器并重写某些方法。其语法如下</p><pre><code class="language-java">  GestureDetector myG;
  myG = new GestureDetector(this,new Gesture());
  
  class Gesture extends GestureDetector.SimpleOnGestureListener{
     public boolean onSingleTapUp(MotionEvent ev) {
     }
  
     public void onLongPress(MotionEvent ev) {
     }
  
     public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
     float distanceY) {
     }
  
     public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
     float velocityY) {
     }
  }
</code></pre><h2 id="处理捏手势" tabindex="-1"><a class="header-anchor" href="#处理捏手势"><span>处理捏手势</span></a></h2><p>Android提供了<strong>ScaleGestureDetector</strong>类来处理诸如捏等的手势。要使用它，您需要实例化此类的对象。它的语法如下-</p><pre><code class="language-java">  ScaleGestureDetector SGD;
  SGD = new ScaleGestureDetector(this,new ScaleListener());
</code></pre><p>第一个参数是上下文，第二个参数是事件侦听器。我们必须定义事件侦听器，并重写函数OnTouchEvent使其起作用。其语法如下-</p><pre><code class="language-java">  public boolean onTouchEvent(MotionEvent ev) {
     SGD.onTouchEvent(ev);
     return true;
  }
  
  private class ScaleListener extends ScaleGestureDetector.SimpleOnScaleGestureListener {
     @Override
     public boolean onScale(ScaleGestureDetector detector) {
        float scale = detector.getScaleFactor();
        return true;
     }
  }
</code></pre><p>除了捏合手势外，还有其他方法可以通知更多有关触摸事件的信息。它们在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>getEventTime()</strong></td><td>此方法获取正在处理的当前事件的事件时间。</td></tr><tr><td><strong>getFocusX()</strong></td><td>此方法获取当前手势的焦点的X坐标。</td></tr><tr><td><strong>getFocusY()</strong></td><td>此方法获取当前手势焦点的Y坐标。</td></tr><tr><td><strong>getTimeDelta()</strong></td><td>此方法返回以前接受的缩放事件和当前缩放事件之间的时间差（以毫秒为单位）。</td></tr><tr><td><strong>isInProgress()</strong></td><td>如果正在进行缩放手势，则此方法返回true。</td></tr><tr><td><strong>onTouchEvent(MotionEvent event)</strong></td><td>此方法接受MotionEvents并在适当时调度事件。</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是一个演示<strong>ScaleGestureDetector</strong>类的用法的示例。它创建了一个基本应用程序，可让您通过捏放大和缩小。 为了试验该示例，您可以在实际设备上或在启用了触摸屏的仿真器中运行此示例。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>从互联网上下载一种字体，并将其放在assets/font文件夹下。</li><li>修改src/MainActivity.java文件添加必要代码。</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  

import android.app.Activity;
 import android.graphics.Matrix;
 import android.os.Bundle;
 import android.view.MotionEvent;
 import android.view.ScaleGestureDetector;
 import android.widget.ImageView;

public class MainActivity extends Activity {
 private ImageView iv;
 private Matrix matrix = new Matrix();
 private float scale = 1f;
 private ScaleGestureDetector SGD;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      iv=(ImageView)findViewById(R.id.imageView);
      SGD = new ScaleGestureDetector(this,new ScaleListener());
  }

  public boolean onTouchEvent(MotionEvent ev) {
      SGD.onTouchEvent(ev);
      return true;
  }

  private class ScaleListener extends ScaleGestureDetector.
          SimpleOnScaleGestureListener {

      @Override
      public boolean onScale(ScaleGestureDetector detector) {
          scale *= detector.getScaleFactor();
          scale = Math.max(0.1f, Math.min(scale, 5.0f));
          matrix.setScale(scale, scale);
          iv.setImageMatrix(matrix);
          return true;
      }
  }

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;RelativeLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot; &gt;

    &lt;TextView android:text=&quot;手势例子&quot; android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/textview&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

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
        android:background=&quot;#22112200&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:scaleType=&quot;matrix&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_alignParentEnd=&quot;true&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/gestures1.png" alt=""></p><p>现在，将两根手指放在android屏幕上，将它们分开一部分，您将看到android图像正在缩放。如下面的图像所示-</p>`,20),i=[a];function d(c,s){return n(),e("div",null,i)}const u=t(r,[["render",d],["__file","gestures.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/gestures.html","title":"手势","lang":"zh-CN","frontmatter":{"description":"手势 Android提供了特殊类型的触摸屏事件，例如捏，双击，滚动，长按和退格。这些都称为手势。Android提供了GestureDetector类来接收手势事件，并告诉我们这些事件是否与手势相对应。要使用它，您需要创建一个GestureDetector对象，然后使用GestureDetector.SimpleOnGestureListener扩展另一...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/gestures.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"手势"}],["meta",{"property":"og:description","content":"手势 Android提供了特殊类型的触摸屏事件，例如捏，双击，滚动，长按和退格。这些都称为手势。Android提供了GestureDetector类来接收手势事件，并告诉我们这些事件是否与手势相对应。要使用它，您需要创建一个GestureDetector对象，然后使用GestureDetector.SimpleOnGestureListener扩展另一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/gestures1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"手势\\",\\"image\\":[\\"https://www.jc2182.com/images/android/gestures1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"处理捏手势","slug":"处理捏手势","link":"#处理捏手势","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.47,"words":1042},"filePathRelative":"android-tutor/advanced/gestures.md","localizedDate":"2023年5月22日","autoDesc":true}');export{u as comp,p as data};
