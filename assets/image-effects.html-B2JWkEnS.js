import{_ as t,c as o,o as n,d as i}from"./app-CbULZrmi.js";const a={},e=i(`<h1 id="图像效果" tabindex="-1"><a class="header-anchor" href="#图像效果"><span>图像效果</span></a></h1><p>Android允许您通过在图像上添加不同种类的效果来操纵图像。您可以轻松地应用图像处理技术在图像上添加某些种类的效果。效果可能是亮度，暗度，灰度转换等，Android提供了<strong>Bitmap</strong>类来处理图像。可以在android.graphics.bitmap下找到。您可以通过多种方式实例化位图。我们正在从imageView创建图像的位图。</p><pre><code class="language-java">  private Bitmap bmp;
  private ImageView img;
  img = (ImageView)findViewById(R.id.imageView1);
  BitmapDrawable  abmp = (BitmapDrawable)img.getDrawable();
</code></pre><p>现在，我们将通过调用<strong>BitmapDrawable</strong>类的**getBitmap()**函数来创建位图。其语法如下-</p><pre><code class="language-java">  bmp = abmp.getBitmap();
</code></pre><p>图像不过是二维矩阵。用同样的方式处理位图。图像由像素组成。因此，您将从该位图中获取像素并对其进行处理。它的语法如下-</p><pre><code class="language-java">  for(int i=0; i &lt; bmp.getWidth(); i++){
     for(int j=0; j &lt; bmp.getHeight(); j++){
        int p = bmp.getPixel(i, j);
     }
  }
</code></pre><p>getWidth()和getHeight()函数返回矩阵的高度和宽度。getPixel()方法返回指定索引处的像素。一旦获得像素，就可以根据需要轻松地对其进行操作。除了这些方法之外，还有其他方法可以帮助我们更好地处理图像。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>copy(Bitmap.Config config, boolean isMutable)</strong></td><td>此方法将此位图的像素到新的位图中</td></tr><tr><td><strong>createBitmap(DisplayMetrics display, int width, int height, Bitmap.Config config)</strong></td><td>返回具有指定宽度和高度的可变位图</td></tr><tr><td><strong>createBitmap(int width, int height, Bitmap.Config config)</strong></td><td>返回具有指定宽度和高度的可变位图</td></tr><tr><td><strong>createBitmap(Bitmap src)</strong></td><td>从源位图返回一个不变的位图</td></tr><tr><td><strong>extractAlpha()</strong></td><td>返回捕获原始图像的Alpha值的新位图</td></tr><tr><td><strong>getConfig()</strong></td><td>此方法将返回该配置，否则返回null</td></tr><tr><td><strong>getDensity()</strong></td><td>返回此位图的密度</td></tr><tr><td><strong>getRowBytes()</strong></td><td>返回位图像素中行之间的字节数</td></tr><tr><td><strong>setPixel(int x, int y, int color)</strong></td><td>W假设指定的颜色在x，y坐标处是可变的，则将其放入位图</td></tr><tr><td><strong>setDensity(int density)</strong></td><td>此方法指定此位图的密度</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>下面的示例演示了位图上的某些图像效果。它创建了一个基本应用程序，可让您将图片转换为灰度图等等。要试验此示例，您需要在实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件添加必要代码。</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  

import android.app.Activity;
 import android.graphics.Bitmap;
 import android.graphics.Color;
 import android.graphics.drawable.BitmapDrawable;
 import android.os.Bundle;
 import android.view.View;
 import android.widget.Button;
 import android.widget.ImageView;

public class MainActivity extends Activity {
 Button b1, b2, b3;
 ImageView im;

  private Bitmap bmp;
  private Bitmap operation;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      b1 = (Button) findViewById(R.id.button);
      b2 = (Button) findViewById(R.id.button2);
      b3 = (Button) findViewById(R.id.button3);
      im = (ImageView) findViewById(R.id.imageView);

      BitmapDrawable abmp = (BitmapDrawable) im.getDrawable();
      bmp = abmp.getBitmap();
  }

  public void gray(View view) {
      operation = Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(), bmp.getConfig());
      double red = 0.33;
      double green = 0.59;
      double blue = 0.11;

      for (int i = 0; i &lt; bmp.getWidth(); i++) {
          for (int j = 0; j &lt; bmp.getHeight(); j++) {
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);

              r = (int) red * r;
              g = (int) green * g;
              b = (int) blue * b;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void bright(View view){
      operation= Bitmap.createBitmap(bmp.getWidth(), bmp.getHeight(),bmp.getConfig());

      for(int i=0; i&lt; bmp.getWidth(); i++){
          for(int j=0; j&lt; bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r = 100  +  r;
              g = 100  + g;
              b = 100  + b;
              alpha = 100 + alpha;
              operation.setPixel(i, j, Color.argb(alpha, r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void dark(View view){
      operation= Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(),bmp.getConfig());

      for(int i=0; i &lt; bmp.getWidth(); i++){
          for(int j=0; j &lt; bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r =  r - 50;
              g =  g - 50;
              b =  b - 50;
              alpha = alpha -50;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void gama(View view) {
      operation = Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(),bmp.getConfig());

      for(int i=0; i &lt; bmp.getWidth(); i++){
          for(int j=0; j &lt; bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r =  r + 150;
              g =  0;
              b =  0;
              alpha = 0;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void green(View view){
      operation = Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(), bmp.getConfig());

      for(int i=0; i &lt; bmp.getWidth(); i++){
          for(int j=0; j &lt; bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r =  0;
              g =  g+150;
              b =  0;
              alpha = 0;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

  public void blue(View view){
      operation = Bitmap.createBitmap(bmp.getWidth(),bmp.getHeight(), bmp.getConfig());

      for(int i=0; i &lt; bmp.getWidth(); i++){
          for(int j=0; j &lt; bmp.getHeight(); j++){
              int p = bmp.getPixel(i, j);
              int r = Color.red(p);
              int g = Color.green(p);
              int b = Color.blue(p);
              int alpha = Color.alpha(p);

              r =  0;
              g =  0;
              b =  b+150;
              alpha = 0;
              operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b));
          }
      }
      im.setImageBitmap(operation);
  }

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;com.jc2182.demo.MainActivity&quot;&gt;

    &lt;TextView
        android:id=&quot;@+id/textView&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;110dp&quot;
        android:paddingTop=&quot;50dp&quot;
        android:text=&quot;图像效果&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView2&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;35dp&quot;
        android:textColor=&quot;#ff16ff01&quot; /&gt;

    &lt;ImageView
        android:id=&quot;@+id/imageView&quot;
        android:layout_width=&quot;353dp&quot;
        android:layout_height=&quot;112dp&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;70dp&quot;
        android:src=&quot;@drawable/logo&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;134dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_centerInParent=&quot;true&quot;
        android:layout_marginStart=&quot;10dp&quot;
        android:layout_marginLeft=&quot;10dp&quot;
        android:layout_marginBottom=&quot;117dp&quot;
        android:onClick=&quot;gray&quot;
        android:text=&quot;灰暗&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;135dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignBottom=&quot;@+id/button&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:onClick=&quot;dark&quot;
        android:text=&quot;黑暗&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button3&quot;
        android:layout_width=&quot;117dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignTop=&quot;@+id/button2&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;3dp&quot;
        android:layout_marginBottom=&quot;20dp&quot;
        android:onClick=&quot;bright&quot;
        android:text=&quot;明亮&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button4&quot;
        android:layout_width=&quot;127dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/button3&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_marginTop=&quot;9dp&quot;
        android:layout_marginBottom=&quot;20dp&quot;
        android:onClick=&quot;gama&quot;
        android:paddingBottom=&quot;50dp&quot;
        android:text=&quot;殷红&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button5&quot;
        android:layout_width=&quot;111dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignStart=&quot;@+id/button3&quot;
        android:layout_alignLeft=&quot;@+id/button3&quot;
        android:layout_alignTop=&quot;@+id/button4&quot;
        android:layout_marginStart=&quot;0dp&quot;
        android:layout_marginLeft=&quot;0dp&quot;
        android:layout_marginTop=&quot;3dp&quot;
        android:layout_marginBottom=&quot;20dp&quot;
        android:onClick=&quot;green&quot;
        android:paddingBottom=&quot;50dp&quot;
        android:text=&quot;翠绿&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button6&quot;
        android:layout_width=&quot;93dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/button2&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:layout_marginStart=&quot;49dp&quot;
        android:layout_marginLeft=&quot;49dp&quot;
        android:layout_marginTop=&quot;6dp&quot;
        android:layout_marginEnd=&quot;0dp&quot;
        android:layout_toEndOf=&quot;@+id/textView&quot;
        android:layout_toRightOf=&quot;@+id/textView&quot;
        android:onClick=&quot;blue&quot;
        android:paddingBottom=&quot;50dp&quot;
        android:text=&quot;天蓝&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/imageeffects1.png" alt=""></p><p>点击按钮展示各种图片效果-</p>`,19),d=[e];function r(u,p){return n(),o("div",null,d)}const g=t(a,[["render",r],["__file","image-effects.html.vue"]]),m=JSON.parse('{"path":"/android-tutor/advanced/image-effects.html","title":"图像效果","lang":"zh-CN","frontmatter":{"description":"图像效果 Android允许您通过在图像上添加不同种类的效果来操纵图像。您可以轻松地应用图像处理技术在图像上添加某些种类的效果。效果可能是亮度，暗度，灰度转换等，Android提供了Bitmap类来处理图像。可以在android.graphics.bitmap下找到。您可以通过多种方式实例化位图。我们正在从imageView创建图像的位图。 现在，我们...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/image-effects.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"图像效果"}],["meta",{"property":"og:description","content":"图像效果 Android允许您通过在图像上添加不同种类的效果来操纵图像。您可以轻松地应用图像处理技术在图像上添加某些种类的效果。效果可能是亮度，暗度，灰度转换等，Android提供了Bitmap类来处理图像。可以在android.graphics.bitmap下找到。您可以通过多种方式实例化位图。我们正在从imageView创建图像的位图。 现在，我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/imageeffects1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"图像效果\\",\\"image\\":[\\"https://www.jc2182.com/images/android/imageeffects1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.5,"words":1651},"filePathRelative":"android-tutor/advanced/image-effects.md","localizedDate":"2023年5月22日","autoDesc":true}');export{g as comp,m as data};
