import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const i={},a=n(`<h1 id="图像切换器" tabindex="-1"><a class="header-anchor" href="#图像切换器"><span>图像切换器</span></a></h1><p>有时，您不希望图像突然出现在屏幕上，而是想在图像从一个图像过渡到另一个图像时对其应用某种动画。这是由Android以<strong>ImageSwitcher</strong>的形式支持的。图像切换器允许您通过图像在屏幕上的显示方式在图像上添加一些过渡效果。为了使用图像切换器，您需要首先定义其XML组件。其语法如下-</p><pre><code class="language-xml">  &lt;ImageSwitcher
     android:id=&quot;@+id/imageSwitcher1&quot;
     android:layout_width=&quot;wrap_content&quot;
     android:layout_height=&quot;wrap_content&quot;
     android:layout_centerHorizontal=&quot;true&quot;
     android:layout_centerVertical=&quot;true&quot; &gt;
  &lt;/ImageSwitcher&gt;
</code></pre><p>现在，我们在java文件中创建一个<strong>ImageSwithcer</strong>实例，并获取此XML组件的引用。其语法如下-</p><pre><code class="language-java">  private ImageSwitcher imageSwitcher;
  imageSwitcher = (ImageSwitcher)findViewById(R.id.imageSwitcher1);
</code></pre><p>接下来，我们需要实现ViewFactory接口并实现未实现的方法，该方法返回imageView。它的语法如下-</p><pre><code class="language-java">  imageSwitcher.setImageResource(R.drawable.ic_launcher);
  imageSwitcher.setFactory(new ViewFactory() {
     public View makeView() {
        ImageView myView = new ImageView(getApplicationContext());
        return myView;
     }
  }
</code></pre><p>您需要做的最后一件事是将<strong>Animation</strong>添加到<strong>ImageSwitcher</strong>。您需要通过调用静态方法loadAnimation通过AnimationUtilities类来定义Animation类的对象。其语法如下-</p><pre><code class="language-java">  Animation in = AnimationUtils.loadAnimation(this,android.R.anim.slide_in_left);
  imageSwitcher.setInAnimation(in);
  imageSwitcher.setOutAnimation(out);   
</code></pre><p>setInAnimaton方法设置对象在屏幕上的外观动画，而setOutAnimation则相反。方法loadAnimation()创建一个动画对象。除了这些方法之外，ImageSwitcher类中还定义了其他方法。它们定义如下-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>setImageDrawable(Drawable drawable)</strong></td><td>用图像切换器设置图像。 图像以位图的形式传递</td></tr><tr><td><strong>setImageResource(int resid)</strong></td><td>用图像切换器设置图像。 图片以整数id的形式传递</td></tr><tr><td><strong>setImageURI(Uri uri)</strong></td><td>用图像切换器设置图像。 图片以URI的形式传递</td></tr><tr><td><strong>ImageSwitcher(Context context, AttributeSet attrs)</strong></td><td>返回一个图像切换器对象，该对象已经设置了在方法中传递的某些属性</td></tr><tr><td><strong>onInitializeAccessibilityEvent (AccessibilityEvent event)</strong></td><td>使用有关此View的信息（事件源）初始化AccessibilityEvent</td></tr><tr><td><strong>onInitializeAccessibilityNodeInfo (AccessibilityNodeInfo info)</strong></td><td>使用有关此视图的信息初始化AccessibilityNodeInfy</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>下面的示例演示了位图上的某些图像切换器效果。它创建了一个基本应用程序，可让您查看图像上的动画效果。要试验此示例，您需要在实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件添加必要代码。</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;

import android.app.Activity;
 import android.os.Bundle;
 import android.view.View;
 import android.view.ViewGroup;
 import android.widget.Button;
 import android.widget.ImageSwitcher;
 import android.widget.ImageView;
 import android.widget.Toast;
 import android.widget.ViewSwitcher;

public class MainActivity extends Activity {
 private ImageSwitcher sw;
 private Button b1,b2;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      b1 = (Button) findViewById(R.id.button);
      b2 = (Button) findViewById(R.id.button2);

      sw = (ImageSwitcher) findViewById(R.id.imageSwitcher);
      sw.setFactory(new ViewSwitcher.ViewFactory() {
          @Override
          public View makeView() {
              ImageView myView = new ImageView(getApplicationContext());
              myView.setScaleType(ImageView.ScaleType.FIT_CENTER);
              myView.setLayoutParams(new ImageSwitcher.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
              return myView;
          }
      });

      b1.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Toast.makeText(getApplicationContext(), &quot;前一张图片&quot;, Toast.LENGTH_LONG).show();
              sw.setImageResource(R.drawable.sample0);
          }
      });

      b2.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Toast.makeText(getApplicationContext(), &quot;下一张图片&quot;,
                      Toast.LENGTH_LONG).show();
              sw.setImageResource(R.drawable.sample1);
          }
      });
  }

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView android:text=&quot;图片切换器示例&quot;
        android:layout_width=&quot;wrap_content&quot;
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

    &lt;ImageSwitcher
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageSwitcher&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;168dp&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;84dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;177dp&quot;
        android:text=&quot;上一张&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;81dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignStart=&quot;@+id/button&quot;
        android:layout_alignLeft=&quot;@+id/button&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginStart=&quot;1dp&quot;
        android:layout_marginLeft=&quot;1dp&quot;
        android:layout_marginEnd=&quot;-1dp&quot;
        android:layout_marginBottom=&quot;244dp&quot;
        android:text=&quot;下一张&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/imageswitcher1.png" alt=""></p><p>点击按钮切换上一张下一张图片-</p><p><img src="https://www.jc2182.com/images/android/imageswitcher2.png" alt=""></p><p><img src="https://www.jc2182.com/images/android/imageswitcher3.png" alt=""></p>`,23),r=[a];function d(u,c){return o(),e("div",null,r)}const s=t(i,[["render",d],["__file","image-switcher.html.vue"]]),m=JSON.parse('{"path":"/android-tutor/advanced/image-switcher.html","title":"图像切换器","lang":"zh-CN","frontmatter":{"description":"图像切换器 有时，您不希望图像突然出现在屏幕上，而是想在图像从一个图像过渡到另一个图像时对其应用某种动画。这是由Android以ImageSwitcher的形式支持的。图像切换器允许您通过图像在屏幕上的显示方式在图像上添加一些过渡效果。为了使用图像切换器，您需要首先定义其XML组件。其语法如下- 现在，我们在java文件中创建一个ImageSwithc...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/image-switcher.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"图像切换器"}],["meta",{"property":"og:description","content":"图像切换器 有时，您不希望图像突然出现在屏幕上，而是想在图像从一个图像过渡到另一个图像时对其应用某种动画。这是由Android以ImageSwitcher的形式支持的。图像切换器允许您通过图像在屏幕上的显示方式在图像上添加一些过渡效果。为了使用图像切换器，您需要首先定义其XML组件。其语法如下- 现在，我们在java文件中创建一个ImageSwithc..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/imageswitcher1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"图像切换器\\",\\"image\\":[\\"https://www.jc2182.com/images/android/imageswitcher1.png\\",\\"https://www.jc2182.com/images/android/imageswitcher2.png\\",\\"https://www.jc2182.com/images/android/imageswitcher3.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.74,"words":1121},"filePathRelative":"android-tutor/advanced/image-switcher.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,m as data};
