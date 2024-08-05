import{_ as t,c as o,o as n,d as i}from"./app-CbULZrmi.js";const a={},d=i(`<h1 id="动画" tabindex="-1"><a class="header-anchor" href="#动画"><span>动画</span></a></h1><p>动画是创造运动和形状变化的过程，Android中的动画可以通过多种方式实现。在本章中，我们将讨论一种简单且广泛使用的动画制作方法，称为补间动画。</p><h2 id="补间动画" tabindex="-1"><a class="header-anchor" href="#补间动画"><span>补间动画</span></a></h2><p>补间动画采用一些参数，例如开始值，结束值，大小，持续时间，旋转角度等，并对该对象执行所需的动画。它可以应用于任何类型的对象。因此，为了使用此功能，Android为我们提供了一个名为Animation的类。为了在Android中执行动画，我们将调用AnimationUtils类的静态函数loadAnimation()。我们将在Animation 对象的实例中接收结果。它的语法如下-</p><pre><code class="language-java">  Animation animation = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.myanimation);
</code></pre><p>注意第二个参数。这是我们的动画xml文件的名称。您必须在res目录下创建一个名为anim的新文件夹，并在anim文件夹下创建一个xml文件。这个动画类具有许多有用的功能，在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>start()</strong></td><td>此方法开始动画。</td></tr><tr><td><strong>setDuration(long duration)</strong></td><td>此方法设置动画的持续时间。</td></tr><tr><td><strong>getDuration()</strong></td><td>此方法获取由上述方法设置的持续时间</td></tr><tr><td><strong>end()</strong></td><td>此方法结束动画。</td></tr><tr><td><strong>cancel()</strong></td><td>此方法取消动画。</td></tr></tbody></table><p>为了将此动画应用于对象，我们将只调用对象的**startAnimation()**方法。它的语法是-</p><pre><code class="language-java">  ImageView image1 = (ImageView)findViewById(R.id.imageView1);
  image.startAnimation(animation);
</code></pre><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>以下示例演示了在Android中使用Animation的方法。您将能够从菜单中选择不同类型的动画，并且所选的动画将应用于屏幕上的imageView上。要试验该示例，您需要在仿真器或实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加动画代码</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>在res目录下创建一个新文件夹，并将其命名为anim。通过访问res/anim对其进行确认</li><li>右键单击anim，然后单击新建，然后选择Android XML文件。您必须创建下面列出的其他文件。 创建文件myanimation.xml，clockwise.xml，fade.xml，move.xml，blink.xml，slide.xml并添加XML代码。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.view.View;
  import android.view.animation.Animation;
  import android.view.animation.AnimationUtils;
  import android.widget.ImageView;
  

public class MainActivity extends Activity {
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);
 }

  public void clockwise(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.myanimation);
      image.startAnimation(animation);
  }

  public void zoom(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.clockwise);
      image.startAnimation(animation1);
  }

  public void fade(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.fade);
      image.startAnimation(animation1);
  }

  public void blink(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 =  AnimationUtils.loadAnimation(getApplicationContext(), R.anim.blink);
      image.startAnimation(animation1);
  }

  public void move(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.move);
      image.startAnimation(animation1);
  }

  public void slide(View view){
      ImageView image = (ImageView)findViewById(R.id.imageView);
      Animation animation1 = AnimationUtils.loadAnimation(getApplicationContext(), R.anim.slide);
      image.startAnimation(animation1);
  }

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;RelativeLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;动画示例&quot;
        android:id=&quot;@+id/textView&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView2&quot;
        android:textColor=&quot;#ff3eff0f&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;ImageView
        android:id=&quot;@+id/imageView&quot;
        android:layout_width=&quot;189dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_alignLeft=&quot;@+id/textView&quot;
        android:layout_alignRight=&quot;@+id/textView2&quot;
        android:layout_centerVertical=&quot;true&quot;
        android:layout_marginLeft=&quot;-65dp&quot;
        android:layout_marginTop=&quot;8dp&quot;
        android:layout_marginRight=&quot;-52dp&quot;
        android:background=&quot;#22334455&quot;
        android:src=&quot;@drawable/logo&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;112dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_marginTop=&quot;8dp&quot;
        android:onClick=&quot;clockwise&quot;
        android:text=&quot;放大&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;75dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignTop=&quot;@+id/button&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:onClick=&quot;zoom&quot;
        android:text=&quot;顺时针&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button3&quot;
        android:layout_width=&quot;123dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignTop=&quot;@+id/button2&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_marginTop=&quot;2dp&quot;
        android:layout_marginEnd=&quot;46dp&quot;
        android:layout_marginRight=&quot;46dp&quot;
        android:onClick=&quot;fade&quot;
        android:text=&quot;淡出&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button4&quot;
        android:layout_width=&quot;110dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/button&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:onClick=&quot;blink&quot;
        android:text=&quot;闪烁&quot; /&gt;

    &lt;Button
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;移动&quot;
        android:onClick=&quot;move&quot;
        android:id=&quot;@+id/button5&quot;
        android:layout_below=&quot;@+id/button2&quot;
        android:layout_alignRight=&quot;@+id/button2&quot;
        android:layout_alignEnd=&quot;@+id/button2&quot;
        android:layout_alignLeft=&quot;@+id/button2&quot;
        android:layout_alignStart=&quot;@+id/button2&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button6&quot;
        android:layout_width=&quot;81dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/button3&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:layout_marginLeft=&quot;48dp&quot;
        android:layout_marginTop=&quot;10dp&quot;
        android:layout_marginEnd=&quot;-9dp&quot;
        android:layout_toRightOf=&quot;@+id/textView&quot;
        android:onClick=&quot;slide&quot;
        android:text=&quot;滑动&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>这是res/anim/myanimation.xml的代码。</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;

    &lt;scale xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
        android:fromXScale=&quot;0.5&quot;
        android:toXScale=&quot;3.0&quot;
        android:fromYScale=&quot;0.5&quot;
        android:toYScale=&quot;3.0&quot;
        android:duration=&quot;5000&quot;
        android:pivotX=&quot;50%&quot;
        android:pivotY=&quot;50%&quot; &gt;
    &lt;/scale&gt;

    &lt;scale xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
        android:startOffset=&quot;5000&quot;
        android:fromXScale=&quot;3.0&quot;
        android:toXScale=&quot;0.5&quot;
        android:fromYScale=&quot;3.0&quot;
        android:toYScale=&quot;0.5&quot;
        android:duration=&quot;5000&quot;
        android:pivotX=&quot;50%&quot;
        android:pivotY=&quot;50%&quot; &gt;
    &lt;/scale&gt;

&lt;/set&gt;
</code></pre><p>这是res/anim/clockwise.xml的代码。</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;

    &lt;rotate xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
        android:fromDegrees=&quot;0&quot;
        android:toDegrees=&quot;360&quot;
        android:pivotX=&quot;50%&quot;
        android:pivotY=&quot;50%&quot;
        android:duration=&quot;5000&quot; &gt;
    &lt;/rotate&gt;

    &lt;rotate xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
        android:startOffset=&quot;5000&quot;
        android:fromDegrees=&quot;360&quot;
        android:toDegrees=&quot;0&quot;
        android:pivotX=&quot;50%&quot;
        android:pivotY=&quot;50%&quot;
        android:duration=&quot;5000&quot; &gt;
    &lt;/rotate&gt;

&lt;/set&gt;
</code></pre><p>这是res/anim/fade.xml的代码。</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:interpolator=&quot;@android:anim/accelerate_interpolator&quot; &gt;

    &lt;alpha
        android:fromAlpha=&quot;0&quot;
        android:toAlpha=&quot;1&quot;
        android:duration=&quot;2000&quot; &gt;
    &lt;/alpha&gt;

    &lt;alpha
        android:startOffset=&quot;2000&quot;
        android:fromAlpha=&quot;1&quot;
        android:toAlpha=&quot;0&quot;
        android:duration=&quot;2000&quot; &gt;
    &lt;/alpha&gt;

&lt;/set&gt;
</code></pre><p>这是res/anim/blink.xml的代码。</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
    &lt;alpha android:fromAlpha=&quot;0.0&quot;
        android:toAlpha=&quot;1.0&quot;
        android:interpolator=&quot;@android:anim/accelerate_interpolator&quot;
        android:duration=&quot;600&quot;
        android:repeatMode=&quot;reverse&quot;
        android:repeatCount=&quot;infinite&quot;/&gt;
&lt;/set&gt;
</code></pre><p>这是res/anim/move.xml的代码。</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;set
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:interpolator=&quot;@android:anim/linear_interpolator&quot;
    android:fillAfter=&quot;true&quot;&gt;

    &lt;translate
        android:fromXDelta=&quot;0%p&quot;
        android:toXDelta=&quot;75%p&quot;
        android:duration=&quot;800&quot; /&gt;
&lt;/set&gt;
</code></pre><p>这是res/anim/slide.xml的代码。</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:fillAfter=&quot;true&quot; &gt;

    &lt;scale
        android:duration=&quot;500&quot;
        android:fromXScale=&quot;1.0&quot;
        android:fromYScale=&quot;1.0&quot;
        android:interpolator=&quot;@android:anim/linear_interpolator&quot;
        android:toXScale=&quot;1.0&quot;
        android:toYScale=&quot;0.0&quot; /&gt;
&lt;/set&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/animation1.png" alt=""></p><p>您可以依次点击各个按钮来展示各种动画效果。</p>`,31),e=[d];function r(u,l){return n(),o("div",null,e)}const m=t(a,[["render",r],["__file","animation.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/animation.html","title":"动画","lang":"zh-CN","frontmatter":{"description":"动画 动画是创造运动和形状变化的过程，Android中的动画可以通过多种方式实现。在本章中，我们将讨论一种简单且广泛使用的动画制作方法，称为补间动画。 补间动画 补间动画采用一些参数，例如开始值，结束值，大小，持续时间，旋转角度等，并对该对象执行所需的动画。它可以应用于任何类型的对象。因此，为了使用此功能，Android为我们提供了一个名为Animat...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/animation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"动画"}],["meta",{"property":"og:description","content":"动画 动画是创造运动和形状变化的过程，Android中的动画可以通过多种方式实现。在本章中，我们将讨论一种简单且广泛使用的动画制作方法，称为补间动画。 补间动画 补间动画采用一些参数，例如开始值，结束值，大小，持续时间，旋转角度等，并对该对象执行所需的动画。它可以应用于任何类型的对象。因此，为了使用此功能，Android为我们提供了一个名为Animat..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/animation1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"动画\\",\\"image\\":[\\"https://www.jc2182.com/images/android/animation1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"补间动画","slug":"补间动画","link":"#补间动画","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.22,"words":1565},"filePathRelative":"android-tutor/advanced/animation.md","localizedDate":"2023年5月22日","autoDesc":true}');export{m as comp,p as data};
