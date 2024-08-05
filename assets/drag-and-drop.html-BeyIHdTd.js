import{_ as t,c as n,o as e,d as o}from"./app-CbULZrmi.js";const r={},a=o(`<h1 id="拖放" tabindex="-1"><a class="header-anchor" href="#拖放"><span>拖放</span></a></h1><p>Android拖放框架允许您的用户使用图形化的拖放手势将数据从当前布局中的一个视图移动到另一视图。从API 11开始，支持将视图拖放到其他视图或视图组上。该框架包括以下三个重要组件以支持拖放功能-</p><ul><li>DragEvent类.</li><li>Drag 监听.</li><li>Helper 方法和类.</li></ul><h2 id="拖放过程" tabindex="-1"><a class="header-anchor" href="#拖放过程"><span>拖放过程</span></a></h2><p>拖放过程中基本上有四个步骤或状态-</p><ul><li><strong>已开始</strong> -当您开始在布局中拖动项目时，此事件发生，您的应用程序调用<strong>startDrag()<strong>方法来告诉系统开始拖动。<strong>startDrag()<strong>方法内的参数提供要拖动的数据，该数据的元数据，以及用于绘制拖动阴影的回调。 系统首先通过回呼您的应用程序来获得拖动阴影作为响应。然后，它将在设备上显示拖动阴影。接下来，系统将动作类型为</strong>ACTION_DRAG_STARTED</strong>的拖动事件发送到当前布局中所有View对象的已注册拖动事件侦听器。 要继续接收拖动事件（包括可能的放置事件），拖动事件侦听器必须返回true，如果拖动事件侦听器返回false，则它将不接收当前操作的拖动事件，直到系统发送具有操作类型的拖动事件为止</strong>ACTION_DRAG_ENDED</strong>。</li><li><strong>继续中</strong> -用户继续拖动。系统将<strong>ACTION_DRAG_ENTERED</strong>操作，然后是<strong>ACTION_DRAG_LOCATION</strong>操作，发送到已注册的拖动事件侦听器，以供输入拖动点的View使用。侦听器可以选择响应事件而更改其View对象的外观，也可以通过突出显示其View做出反应。用户将拖动阴影移到视图的边界框之外之后，拖动事件侦听器将收到<strong>ACTION_DRAG_EXITED</strong>动作。</li><li><strong>已放下</strong> -用户释放一个视图的边框内拖曳的项目。系统向View对象的侦听器发送操作类型为<strong>ACTION_DROP</strong>的拖动事件。</li><li><strong>已结束</strong> -在动作类型<strong>ACTION_DROP</strong>之后，系统会发出动作类型为<strong>ACTION_DRAG_ENDED</strong>的拖动事件，以指示拖动操作已结束。</li></ul><h2 id="dragevent类" tabindex="-1"><a class="header-anchor" href="#dragevent类"><span>DragEvent类</span></a></h2><p><strong>dragEvent</strong>表示被一个拖放操作期间在不同的时间发送出由系统中的事件。此类提供了一些常量和在拖放过程中使用的重要方法。</p><p><em>常量</em></p><p>以下是可作为DragEvent类的一部分使用的所有常量整数。</p><table><thead><tr><th>常量</th><th>说明</th></tr></thead><tbody><tr><td><strong>ACTION_DRAG_STARTED</strong></td><td>指示开始拖放操作。</td></tr><tr><td><strong>ACTION_DRAG_ENTERED</strong></td><td>向视图发出信号，指示拖动点已进入视图的边界框。</td></tr><tr><td><strong>ACTION_DRAG_LOCATION</strong></td><td>如果拖动阴影仍在View对象的边界框内，则在<strong>ACTION_DRAG_ENTERED</strong>之后发送给View</td></tr><tr><td><strong>ACTION_DRAG_EXITED</strong></td><td>表示用户已将拖动阴影移到视图的边界框之外。</td></tr><tr><td><strong>ACTION_DROP</strong></td><td>向视图发出信号，表明用户已释放拖动阴影，并且拖动点在视图的边界框内。</td></tr><tr><td><strong>ACTION_DRAG_ENDED</strong></td><td>向View发出拖放操作已完成的信号。</td></tr></tbody></table><p><em>方法</em></p><p>以下是可作为DragEvent类的一部分使用的一些重要且最常用的方法。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>int getAction()</strong></td><td>检查此事件的操作值。</td></tr><tr><td><strong>ClipData getClipData()</strong></td><td>返回作为startDrag()调用的一部分发送到系统的ClipData对象。</td></tr><tr><td><strong>ClipDescription getClipDescription()</strong></td><td>返回ClipData中包含的ClipDescription对象。</td></tr><tr><td><strong>boolean getResult()</strong></td><td>返回拖放操作结果的指示。</td></tr><tr><td><strong>float getX()</strong></td><td>获取拖动点的X坐标。</td></tr><tr><td><strong>float getY()</strong></td><td>获取拖动点的Y坐标。</td></tr><tr><td><strong>String toString()</strong></td><td>返回此DragEvent对象的字符串表示形式。</td></tr></tbody></table><h2 id="监听拖放事件" tabindex="-1"><a class="header-anchor" href="#监听拖放事件"><span>监听拖放事件</span></a></h2><p>如果您希望布局中的任何视图都应响应Drag事件，则您的视图可以实现<strong>View.OnDragListener</strong>或设置<strong>onDragEvent(DragEvent)<strong>回调方法。当系统调用方法或侦听器时，系统会将上述的</strong>DragEvent</strong>对象传递给他们。您可以同时具有View对象的侦听器和回调方法。如果发生这种情况，系统将首先调用侦听器，然后在侦听器返回true时定义回调。所述的组合<strong>onDragEvent(dragEvent)方法和</strong>View.OnDragListener类似于的组合的<strong>onTouchEvent()<strong>和</strong>View.OnTouchListener</strong>与旧版本的Android触摸事件使用。</p><ul><li><p><em><strong></strong></em></p><h2 id="开始拖动事件" tabindex="-1"><a class="header-anchor" href="#开始拖动事件"><span><strong>开始拖动事件</strong></span></a></h2><p><strong>首先，为要移动的数据创建一个ClipData和ClipData.Item。作为ClipData对象的一部分，提供存储在ClipData中的ClipDescription对象中的元数据。对于不代表数据移动的拖放操作，您可能需要使用null而不是实际对象。接下来，您可以扩展extend View.DragShadowBuilder以创建用于拖动视图的拖动阴影，或者可以简单地使用View.DragShadowBuilder(View)来创建默认的拖动阴影，该拖动阴影的大小与传递给它的View参数的大小相同，点位于拖动阴影的中心。</strong></p><h2 id="拖放示例演示" tabindex="-1"><a class="header-anchor" href="#拖放示例演示"><span>拖放示例演示</span></a></h2><p>以下示例显示使用<strong>View.setOnLongClickListener()</strong>，**View.setOnTouchListener()<strong>和</strong>View.OnDragEventListener()**进行简单拖放的功能。</p><ol><li>您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。</li><li>修改src/MainActivity.java文件并添加代码以定义事件侦听器，以及示例中使用的徽标图像的回调方法。</li><li>将图像logo.png到res/drawable-*文件夹中。如果要为不同的设备提供图像，则可以使用不同分辨率的图像。</li><li>修改布局XML文件res/layout / activity_main.xml来定义徽标图像的默认视图。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p></li></ul><pre><code class="language-java">  package com.jc2182.demo;
  
  

import android.annotation.SuppressLint;
 import android.app.Activity;
 import android.content.ClipData;
 import android.content.ClipDescription;
 import android.os.Bundle;
 import android.util.Log;
 import android.view.DragEvent;
 import android.view.MotionEvent;
 import android.view.View;
 import android.widget.ImageView;
 import android.widget.RelativeLayout;

public class MainActivity extends Activity {
 ImageView img;
 String msg;

  private android.widget.RelativeLayout.LayoutParams layoutParams;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      img=(ImageView)findViewById(R.id.imageView);

      img.setOnLongClickListener(new View.OnLongClickListener() {
          @Override
          public boolean onLongClick(View v) {
              ClipData.Item item = new ClipData.Item((CharSequence)v.getTag());
              String[] mimeTypes = {ClipDescription.MIMETYPE_TEXT_PLAIN};

              ClipData dragData = new ClipData(v.getTag().toString(),mimeTypes, item);
              View.DragShadowBuilder myShadow = new View.DragShadowBuilder(img);

              v.startDrag(dragData,myShadow,null,0);
              return true;
          }
      });


      img.setOnDragListener(new View.OnDragListener() {
          @SuppressLint(&quot;NewApi&quot;)
          @Override
          public boolean onDrag(View v, DragEvent event) {
              switch(event.getAction()) {
                  case DragEvent.ACTION_DRAG_STARTED:
                      layoutParams = (RelativeLayout.LayoutParams)v.getLayoutParams();
                      Log.d(msg, &quot;操作是：： DragEvent.ACTION_DRAG_STARTED&quot;);

                      // Do nothing
                      return  true;

                  case DragEvent.ACTION_DRAG_ENTERED:
                      Log.d(msg, &quot;操作是：： DragEvent.ACTION_DRAG_ENTERED&quot;);
                      int x_cord = (int) event.getX();
                      int y_cord = (int) event.getY();
                      return  true;

                  case DragEvent.ACTION_DRAG_EXITED :
                      Log.d(msg, &quot;操作是：： DragEvent.ACTION_DRAG_EXITED&quot;);
                      x_cord = (int) event.getX();
                      y_cord = (int) event.getY();
                      layoutParams.leftMargin = x_cord;
                      layoutParams.topMargin = y_cord;
                      v.setLayoutParams(layoutParams);
                      return  true;

                  case DragEvent.ACTION_DRAG_LOCATION  :
                      Log.d(msg, &quot;操作是：： DragEvent.ACTION_DRAG_LOCATION&quot;);
                      x_cord = (int) event.getX();
                      y_cord = (int) event.getY();
                      return  true;

                  case DragEvent.ACTION_DRAG_ENDED   :
                      img.setVisibility(View.VISIBLE);
                      Log.d(msg, &quot;操作是：： DragEvent.ACTION_DRAG_ENDED&quot;);
                      // Do nothing
                      return  true;

                  case DragEvent.ACTION_DROP:
                      x_cord = (int) event.getX();
                      y_cord = (int) event.getY();
                      layoutParams.leftMargin = x_cord;
                      layoutParams.topMargin = y_cord;

                      img.setLayoutParams(layoutParams);

                      Log.d(msg, &quot;ACTION_DROP 事件&quot;);
                      return  true;

                  default:
                      break;
              }
              return true;
          }
      });

      img.setOnTouchListener(new View.OnTouchListener() {
          @Override
          public boolean onTouch(View v, MotionEvent event) {
              if (event.getAction() == MotionEvent.ACTION_DOWN) {
                  ClipData data = ClipData.newPlainText(&quot;&quot;, &quot;&quot;);
                  View.DragShadowBuilder shadowBuilder = new View.DragShadowBuilder(img);

                  img.startDrag(data, shadowBuilder, img, 0);
                  img.setVisibility(View.INVISIBLE);
                  return true;
              } else {
                  return false;
              }
          }
      });

  }


}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:id=&quot;@+id/textView&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;50dp&quot;
        android:text=&quot;拖放示例&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView2&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;30dp&quot;
        android:textColor=&quot;#ff14be3c&quot; /&gt;


    &lt;ImageView
        android:id=&quot;@+id/imageView&quot;
        android:layout_width=&quot;219dp&quot;
        android:layout_height=&quot;108dp&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_alignStart=&quot;@+id/textView2&quot;
        android:layout_alignLeft=&quot;@+id/textView2&quot;
        android:layout_alignEnd=&quot;@+id/textView2&quot;
        android:layout_alignRight=&quot;@+id/textView2&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginStart=&quot;-102dp&quot;
        android:layout_marginLeft=&quot;-102dp&quot;
        android:layout_marginTop=&quot;-8dp&quot;
        android:layout_marginEnd=&quot;6dp&quot;
        android:layout_marginRight=&quot;6dp&quot;
        android:background=&quot;#88005522&quot;
        android:src=&quot;@drawable/logo&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/drop1.png" alt=""></p><p>尝试去拖放图片，并观察控制台日志输出。</p>`,23),i=[a];function d(g,s){return e(),n("div",null,i)}const u=t(r,[["render",d],["__file","drag-and-drop.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/drag-and-drop.html","title":"拖放","lang":"zh-CN","frontmatter":{"description":"拖放 Android拖放框架允许您的用户使用图形化的拖放手势将数据从当前布局中的一个视图移动到另一视图。从API 11开始，支持将视图拖放到其他视图或视图组上。该框架包括以下三个重要组件以支持拖放功能- DragEvent类. Drag 监听. Helper 方法和类. 拖放过程 拖放过程中基本上有四个步骤或状态- 已开始 -当您开始在布局中拖动项目时...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/drag-and-drop.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"拖放"}],["meta",{"property":"og:description","content":"拖放 Android拖放框架允许您的用户使用图形化的拖放手势将数据从当前布局中的一个视图移动到另一视图。从API 11开始，支持将视图拖放到其他视图或视图组上。该框架包括以下三个重要组件以支持拖放功能- DragEvent类. Drag 监听. Helper 方法和类. 拖放过程 拖放过程中基本上有四个步骤或状态- 已开始 -当您开始在布局中拖动项目时..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/drop1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"拖放\\",\\"image\\":[\\"https://www.jc2182.com/images/android/drop1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"拖放过程","slug":"拖放过程","link":"#拖放过程","children":[]},{"level":2,"title":"DragEvent类","slug":"dragevent类","link":"#dragevent类","children":[]},{"level":2,"title":"监听拖放事件","slug":"监听拖放事件","link":"#监听拖放事件","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":6.43,"words":1930},"filePathRelative":"android-tutor/advanced/drag-and-drop.md","localizedDate":"2023年5月22日","autoDesc":true}');export{u as comp,p as data};
