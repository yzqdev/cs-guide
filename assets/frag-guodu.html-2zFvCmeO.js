import{_ as t,c as n,o,d as e}from"./app-CbULZrmi.js";const a={},i=e(`<h1 id="android-片段过渡" tabindex="-1"><a class="header-anchor" href="#android-片段过渡"><span>Android 片段过渡</span></a></h1><p>切换中的Activity和片段（Fragment）过渡是建立在Android中一个相对较新的功能（称为过渡）之上的。在KitKat中引入的过渡框架为在应用程序中的不同UI状态之间进行动画处理提供了便捷的API。该框架围绕两个关键概念构建：场景和过渡。场景定义了应用程序UI的给定状态，而过渡则定义了两个场景之间的动画更改。 当场景改变时，过渡有两个主要职责-</p><ul><li>在开始和结束场景中捕获每个视图的状态。</li><li>根据差异创建一个动画器，以动画化一个场景到另一个场景的视图。</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>本示例将向您说明如何使用片段过渡创建自定义动画。因此，让我们按照以下步骤进行操作，类似于创建<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World 例子</a>时遵循的步骤-</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为HelloWorld，位于com.jc2182.helloworld包下，activity为空。</li><li>修改位于res/layout/activity_main.xml的activity_main.xml，以添加文本视图</li><li>在res/layout目录下创建一个名为fragment_stack.xml的布局，以定义您的fragment标签和button标签</li><li>创建一个位于res/的文件夹，并将其命名为animator，然后添加fragment_slide_right_enter.xml和fragment_slide_left_exit.xml 和 fragment_slide_right_exit.xml和fragment_slide_left_enter.xml</li><li>在MainActivity.java中，需要添加片段堆栈，片段管理器和onCreateView()</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是包含TextView 的res.layout/activity_main.xml的内容</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;LinearLayout
      xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      android:layout_width=&quot;match_parent&quot;
      android:layout_height=&quot;match_parent&quot;
      android:orientation=&quot;vertical&quot; &gt;
  
      &lt;FrameLayout
          android:id=&quot;@+id/fragment1&quot;
          android:layout_width=&quot;match_parent&quot;
          android:layout_height=&quot;0dp&quot;
          android:layout_weight=&quot;1&quot; /&gt;
  
      &lt;Button
          android:id=&quot;@+id/new_fragment&quot;
          android:layout_width=&quot;wrap_content&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:text=&quot;添加新片段&quot; /&gt;
  
  &lt;/LinearLayout&gt;
</code></pre><p>以下是res/layout/fragment_stack.xml文件的内容。它包含框架布局和按钮</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      android:orientation=&quot;vertical&quot; android:layout_width=&quot;match_parent&quot;
      android:layout_height=&quot;match_parent&quot;&gt;
      &lt;TextView
          android:id=&quot;@+id/text&quot;
          android:layout_width=&quot;match_parent&quot;
          android:layout_height=&quot;match_parent&quot;
          android:gravity=&quot;center&quot;/&gt;
  &lt;/LinearLayout&gt;
</code></pre><p>以下是res/animator/fragment_slide_left_enter.xml文件的内容。它包含set和objectAnimator标签</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
      &lt;objectAnimator
          android:interpolator=&quot;@android:interpolator/decelerate_quint&quot;
          android:valueFrom=&quot;100dp&quot; android:valueTo=&quot;0dp&quot;
          android:valueType=&quot;floatType&quot;
          android:propertyName=&quot;translationX&quot;
          android:duration=&quot;@android:integer/config_mediumAnimTime&quot; /&gt;
  
      &lt;objectAnimator
          android:interpolator=&quot;@android:interpolator/decelerate_quint&quot;
          android:valueFrom=&quot;0.0&quot; android:valueTo=&quot;1.0&quot;
          android:valueType=&quot;floatType&quot;
          android:propertyName=&quot;alpha&quot;
          android:duration=&quot;@android:integer/config_mediumAnimTime&quot; /&gt;
  &lt;/set&gt;
</code></pre><p>以下是res/animator/fragment_slide_left_exit.xml文件的内容。它包含set和objectAnimator标签。</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
      &lt;objectAnimator
          android:interpolator=&quot;@android:interpolator/decelerate_quint&quot;
          android:valueFrom=&quot;100dp&quot; android:valueTo=&quot;0dp&quot;
          android:valueType=&quot;floatType&quot;
          android:propertyName=&quot;translationX&quot;
          android:duration=&quot;@android:integer/config_mediumAnimTime&quot; /&gt;
  
      &lt;objectAnimator
          android:interpolator=&quot;@android:interpolator/decelerate_quint&quot;
          android:valueFrom=&quot;0.0&quot; android:valueTo=&quot;1.0&quot;
          android:valueType=&quot;floatType&quot;
          android:propertyName=&quot;alpha&quot;
          android:duration=&quot;@android:integer/config_mediumAnimTime&quot; /&gt;
  &lt;/set&gt;
</code></pre><p>以下是res/animator/fragment_slide_right_enter.xml文件的内容。它包含set和objectAnimator标签</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
      &lt;objectAnimator
          android:interpolator=&quot;@android:interpolator/decelerate_quint&quot;
          android:valueFrom=&quot;-100dp&quot; android:valueTo=&quot;0dp&quot;
          android:valueType=&quot;floatType&quot;
          android:propertyName=&quot;translationX&quot;
          android:duration=&quot;@android:integer/config_mediumAnimTime&quot; /&gt;
  
      &lt;objectAnimator
          android:interpolator=&quot;@android:interpolator/decelerate_quint&quot;
          android:valueFrom=&quot;0.0&quot; android:valueTo=&quot;1.0&quot;
          android:valueType=&quot;floatType&quot;
          android:propertyName=&quot;alpha&quot;
          android:duration=&quot;@android:integer/config_mediumAnimTime&quot; /&gt;
  &lt;/set&gt;
</code></pre><p>以下是res/animator/fragment_slide_right_exit.xml文件的内容，其中包含set和objectAnimator标签</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;set xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
      &lt;objectAnimator
          android:interpolator=&quot;@android:interpolator/decelerate_quint&quot;
          android:valueFrom=&quot;0dp&quot; android:valueTo=&quot;100dp&quot;
          android:valueType=&quot;floatType&quot;
          android:propertyName=&quot;translationX&quot;
          android:duration=&quot;@android:integer/config_mediumAnimTime&quot; /&gt;
  
      &lt;objectAnimator
          android:interpolator=&quot;@android:interpolator/decelerate_quint&quot;
          android:valueFrom=&quot;1.0&quot; android:valueTo=&quot;0.0&quot;
          android:valueType=&quot;floatType&quot;
          android:propertyName=&quot;alpha&quot;
          android:duration=&quot;@android:integer/config_mediumAnimTime&quot; /&gt;
  &lt;/set&gt;
</code></pre><p>以下代码将是src/main/java/MainActivity.java文件的内容。它包含按钮侦听器，堆栈片段和onCreateView</p><pre><code class="language-java">  
  
  import android.app.Activity;
  import android.app.Fragment;
  import android.app.FragmentTransaction;
  import android.os.Bundle;
  
  import android.view.LayoutInflater;
  import android.view.View;
  import android.view.View.OnClickListener;
  import android.view.ViewGroup;
  
  import android.widget.Button;
  import android.widget.TextView;
  
  /** * 演示在判断事务中使用自定义动画. */
  public class MainActivity extends Activity {
      int mStackLevel = 1;
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
  
          Button button = (Button)findViewById(R.id.new_fragment);
  
          button.setOnClickListener(new OnClickListener() {
              public void onClick(View v) {
                  addFragmentToStack();
              }
          });
  
          if (savedInstanceState == null) {
              // 添加初始碎片
              Fragment newFragment = CountingFragment.newInstance(mStackLevel);
              FragmentTransaction ft = getFragmentManager().beginTransaction();
              ft.add(R.id.fragment1, newFragment).commit();
          }
          else
          {
              mStackLevel = savedInstanceState.getInt(&quot;level&quot;);
          }
      }
  
      @Override
      public void onSaveInstanceState(Bundle outState) {
          super.onSaveInstanceState(outState);
          outState.putInt(&quot;level&quot;, mStackLevel);
      }
  
      void addFragmentToStack() {
          mStackLevel++;
  
          // 实例化新的碎片
          Fragment newFragment = CountingFragment.newInstance(mStackLevel);
  
          // 添加碎片到活动，并将其放入后退栈中
          FragmentTransaction ft = getFragmentManager().beginTransaction();
          ft.setCustomAnimations(R.animator.fragment_slide_left_enter,
                  R.animator.fragment_slide_left_exit,
                  R.animator.fragment_slide_right_enter,
                  R.animator.fragment_slide_right_exit);
          ft.replace(R.id.fragment1, newFragment);
          ft.addToBackStack(null);
          ft.commit();
      }
  
      public static class CountingFragment extends Fragment {
          int mNum;
          /**         * 创建CountingFragment的实例，提供&quot;num&quot;作为参数         */
          static CountingFragment newInstance(int num) {
              CountingFragment f = new CountingFragment();
  
              Bundle args = new Bundle();
              args.putInt(&quot;num&quot;, num);
              f.setArguments(args);
              return f;
          }
  
          /**         * 在创建时，获取实例的number参数.         */
          @Override
          public void onCreate(Bundle savedInstanceState) {
              super.onCreate(savedInstanceState);
              mNum = getArguments() != null ? getArguments().getInt(&quot;num&quot;) : 1;
          }
          /**         * 碎片的界面仅包含一个TextView，用于显示number         */
          @Override
          public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {
              View v = inflater.inflate(R.layout.fragment_stack, container, false);
              View tv = v.findViewById(R.id.text);
              ((TextView)tv).setText(&quot;Fragment #&quot; + mNum);
              tv.setBackgroundDrawable(getResources().getDrawable(android.R.drawable.gallery_thumb));
              return v;
          }
      }
  }
</code></pre><p>以下将是AndroidManifest.xml的内容</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      package=&quot;com.jc2182.helloworld&quot;&gt;
  
      &lt;application
          android:allowBackup=&quot;true&quot;
          android:icon=&quot;@drawable/ic_launcher&quot;
          android:label=&quot;@string/app_name&quot;
          android:theme=&quot;@style/AppTheme&quot; &gt;
  
          &lt;activity
              android:name=&quot;.MainActivity&quot;
              android:label=&quot;@string/app_name&quot; &gt;
  
              &lt;intent-filter&gt;
                  &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;
                  &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;
              &lt;/intent-filter&gt;
  
          &lt;/activity&gt;
  
      &lt;/application&gt;
  
  &lt;/manifest&gt;
</code></pre><p>运行应用程序::</p><p>让我们尝试运行我们刚刚创建的HelloWorld应用程序。我假设您是在进行环境设置时创建的AVD。要从Android Studio运行该应用，请打开您项目的Activity文件之一，然后运行图标从工具栏中单击运行图标。Android在您的AVD上安装该应用程序并启动它，如果您的设置和应用程序一切正常，它将在“模拟器”窗口中显示-</p><p><img src="https://www.jc2182.com/images/android/fragmenttransitions1.png" alt="fragment"></p><p>点击“添加片段”按钮，会出现如下：</p>`,26),r=[i];function d(u,l){return o(),n("div",null,r)}const c=t(a,[["render",d],["__file","frag-guodu.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/basic/frag-guodu.html","title":"Android 片段过渡","lang":"zh-CN","frontmatter":{"description":"Android 片段过渡 切换中的Activity和片段（Fragment）过渡是建立在Android中一个相对较新的功能（称为过渡）之上的。在KitKat中引入的过渡框架为在应用程序中的不同UI状态之间进行动画处理提供了便捷的API。该框架围绕两个关键概念构建：场景和过渡。场景定义了应用程序UI的给定状态，而过渡则定义了两个场景之间的动画更改。 当场...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/basic/frag-guodu.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Android 片段过渡"}],["meta",{"property":"og:description","content":"Android 片段过渡 切换中的Activity和片段（Fragment）过渡是建立在Android中一个相对较新的功能（称为过渡）之上的。在KitKat中引入的过渡框架为在应用程序中的不同UI状态之间进行动画处理提供了便捷的API。该框架围绕两个关键概念构建：场景和过渡。场景定义了应用程序UI的给定状态，而过渡则定义了两个场景之间的动画更改。 当场..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/fragmenttransitions1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Android 片段过渡\\",\\"image\\":[\\"https://www.jc2182.com/images/android/fragmenttransitions1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.41,"words":1323},"filePathRelative":"android-tutor/basic/frag-guodu.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,p as data};
