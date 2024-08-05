import{_ as t,c as o,o as n,d as e}from"./app-CbULZrmi.js";const i={},d=e(`<h1 id="登录界面" tabindex="-1"><a class="header-anchor" href="#登录界面"><span>登录界面</span></a></h1><p>登录应用程序是询问您的凭据以登录某些特定应用程序的屏幕。登录微信，QQ，淘宝等时，您可能已经看到了本章介绍了如何创建登录屏幕以及在进行错误尝试时如何管理安全性。首先，您必须定义两个TextView询问用户名和用户密码。密码TextView必须将inputType设置为password。其语法如下-</p><pre><code class="language-xml">  &lt;EditText
     android:id = &quot;@+id/editText2&quot;
     android:layout_width = &quot;wrap_content&quot;
     android:layout_height = &quot;wrap_content&quot;
     android:inputType = &quot;textPassword&quot; /&gt;
  
  &lt;EditText
     android:id = &quot;@+id/editText1&quot;
     android:layout_width = &quot;wrap_content&quot;
     android:layout_height = &quot;wrap_content&quot;
  /&gt;
</code></pre><p>定义一个带有登录文本的按钮并设置其onClick属性。之后，定义java文件中onClick属性中提到的函数。</p><pre><code class="language-xml">  &lt;Button
     android:id = &quot;@+id/button1&quot;
     android:layout_width = &quot;wrap_content&quot;
     android:layout_height = &quot;wrap_content&quot;
     android:onClick = &quot;login&quot;
     android:text = &quot;@string/Login&quot; 
  /&gt;
</code></pre><p>在java文件中，在onClick方法内部，使用getText()和toString()方法获取用户名和密码文本，并使用equals()函数将其与文本匹配。</p><pre><code class="language-java">  EditText username = (EditText)findViewById(R.id.editText1);
  EditText password = (EditText)findViewById(R.id.editText2);             
  
  public void login(View view){
     if(username.getText().toString().equals(&quot;admin&quot;) &amp;&amp; password.getText().toString().equals(&quot;admin&quot;)){
  
     //验证成功 登录
     }else{
     //验证错误处理
  }       
</code></pre><p>您需要做的最后一件事是提供一种安全机制，以便避免不必要的尝试。为此，初始化变量，并在每次错误尝试时将其减小。当它达到0时，禁用登录按钮。</p><pre><code class="language-java">  int counter = 3;
  counter--;
  
  if(counter==0){
     //关闭按钮，关闭应用程序
  }
</code></pre><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是演示登录应用程序的示例。它创建一个基本的应用程序，仅给您三种尝试登录应用程序的机会。 要试验该示例，您可以在实际设备或仿真器上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加必要的代码。</li><li>修改res/layout/activity_main以添加相应的XML组件</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.graphics.Color;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.EditText;
  import android.widget.TextView;
  import android.widget.Toast;

  public class MainActivity extends Activity {

      Button b1,b2;
      EditText ed1,ed2;
    
      TextView tx1;
      int counter = 3;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1 = (Button)findViewById(R.id.button);
          ed1 = (EditText)findViewById(R.id.editText);
          ed2 = (EditText)findViewById(R.id.editText2);
    
          b2 = (Button)findViewById(R.id.button2);
          tx1 = (TextView)findViewById(R.id.textView3);
          tx1.setVisibility(View.GONE);
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  if(ed1.getText().toString().equals(&quot;admin&quot;) &amp;&amp;
                          ed2.getText().toString().equals(&quot;admin&quot;)) {
                      Toast.makeText(getApplicationContext(), &quot;登录成功跳转...&quot;,Toast.LENGTH_SHORT).show();
                  }else{
                      Toast.makeText(getApplicationContext(), &quot;登录验证失败&quot;,Toast.LENGTH_SHORT).show();
                      tx1.setVisibility(View.VISIBLE);
                      tx1.setBackgroundColor(Color.RED);
                      counter--;
                      tx1.setText(Integer.toString(counter));
    
                      if (counter == 0) {
                          b1.setEnabled(false);
                      }
                  }
              }
          });
    
          b2.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  finish();
              }
          });
      }

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:text=&quot;登录界面示例&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/textview&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView&quot;
        android:layout_width=&quot;198dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textview&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;94dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:text=&quot;下载&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:background=&quot;#11EE22bb&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;ProgressBar
        android:id=&quot;@+id/progressBar&quot;
        style=&quot;?android:attr/progressBarStyleLarge&quot;
        android:layout_width=&quot;272dp&quot;
        android:layout_height=&quot;362dp&quot;
        android:layout_below=&quot;@+id/button&quot;
        android:layout_alignStart=&quot;@+id/textview&quot;
        android:layout_alignLeft=&quot;@+id/textview&quot;
        android:layout_alignEnd=&quot;@+id/textView&quot;
        android:layout_alignRight=&quot;@+id/textView&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_marginEnd=&quot;-30dp&quot;
        android:layout_marginRight=&quot;-30dp&quot;
        android:layout_marginBottom=&quot;7dp&quot;
        android:progressDrawable=&quot;@drawable/circular_progress_bar&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/login1.png" alt=""></p><p>尝试去登录 去尝试，去试错，查看效果</p>`,19),a=[d];function r(u,l){return n(),o("div",null,a)}const p=t(i,[["render",r],["__file","login.html.vue"]]),s=JSON.parse('{"path":"/android-tutor/advanced/login.html","title":"登录界面","lang":"zh-CN","frontmatter":{"description":"登录界面 登录应用程序是询问您的凭据以登录某些特定应用程序的屏幕。登录微信，QQ，淘宝等时，您可能已经看到了本章介绍了如何创建登录屏幕以及在进行错误尝试时如何管理安全性。首先，您必须定义两个TextView询问用户名和用户密码。密码TextView必须将inputType设置为password。其语法如下- 定义一个带有登录文本的按钮并设置其onCli...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/login.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"登录界面"}],["meta",{"property":"og:description","content":"登录界面 登录应用程序是询问您的凭据以登录某些特定应用程序的屏幕。登录微信，QQ，淘宝等时，您可能已经看到了本章介绍了如何创建登录屏幕以及在进行错误尝试时如何管理安全性。首先，您必须定义两个TextView询问用户名和用户密码。密码TextView必须将inputType设置为password。其语法如下- 定义一个带有登录文本的按钮并设置其onCli..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/login1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"登录界面\\",\\"image\\":[\\"https://www.jc2182.com/images/android/login1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.31,"words":992},"filePathRelative":"android-tutor/advanced/login.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,s as data};
