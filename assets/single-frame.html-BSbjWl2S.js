import{_ as t,c as n,o as e,d as a}from"./app-CbULZrmi.js";const o={},r=a(`<h1 id="单帧片段-single-frame-fragment" tabindex="-1"><a class="header-anchor" href="#单帧片段-single-frame-fragment"><span>单帧片段（Single frame fragment）</span></a></h1><h2 id="android-单帧片段" tabindex="-1"><a class="header-anchor" href="#android-单帧片段"><span>Android 单帧片段</span></a></h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p><strong>单帧片段（Single frame fragment)</strong> 是为小屏幕设备（例如手持设备（手机））设计的，并且应高于android 3.0版本。</p></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>本示例将向您说明如何创建自己的片段。在这里，我们将创建两个片段，其中一个片段将在设备处于横向模式时使用，另一个片段将在竖屏模式下使用。因此，让我们按照以下步骤进行操作，类似于创建<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World 例子</a>时遵循的步骤-</p><ol><li>您将使用Android StudioIDE创建一个Android应用程序，并将其命名为Helloworld，位于com.jc2182.helloworld包下，Activity为空。</li><li>修改主Activity文件MainActivity.java，如下代码所示。在这里，我们将检查设备的方向，并因此在不同的片段之间进行切换。</li><li>在包com.jc2182.helloworld下创建两个Java文件PM_Fragment.java和LM_Fragement.java，以定义您的片段和相关方法。</li><li>创建布局文件res/layout/lm_fragment.xml和res/layout/pm_fragment.xml并为两个片段定义布局。</li><li>修改res/layout/activity_main.xml文件的默认内容以包括两个片段。</li><li>在res/values/strings.xml文件中定义所需的常量</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要Activity文件MainActivity.java的内容 -</p><pre><code class="language-java">  
  

import android.app.FragmentManager;
 import android.app.FragmentTransaction;
 import android.content.res.Configuration;
 import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {


  /** 在Activity首次创建时调用。 */
  @Override
  public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      Configuration config = getResources().getConfiguration();

      FragmentManager fragmentManager = getFragmentManager();
      FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

      /**         * 检查设备的方向并采取相应的行动         */

      if (config.orientation == Configuration.ORIENTATION_LANDSCAPE) {
          /**             * 设备的横屏模式             */
          LM_Fragement ls_fragment = new LM_Fragement();
          fragmentTransaction.replace(android.R.id.content, ls_fragment);
      }else{
          /**             * 设备竖屏模式             */
          PM_Fragement pm_fragment = new PM_Fragement();
          fragmentTransaction.replace(android.R.id.content, pm_fragment);
      }
      fragmentTransaction.commit();
  }

}

</code></pre><p>创建两个片段文件LM_Fragement.java和PM_Fragment.java</p><p>以下是LM_Fragement.java文件的内容-</p><pre><code class="language-java">


import android.os.Bundle;

import android.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

/** * A simple {@link Fragment} subclass. * Use the {@link LM_Fragement#newInstance} factory method to * create an instance of this fragment. */
public class LM_Fragement extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        /**         * 膨胀这个片段的布局         */

        return inflater.inflate(R.layout.lm_fragement, container, false);
    }
}
</code></pre><p>以下是PM_Fragement.java文件的内容-</p><pre><code class="language-java">

import android.os.Bundle;

import android.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup; 

/** * A simple {@link Fragment} subclass. * Use the {@link PM_Fragement#newInstance} factory method to * create an instance of this fragment. */
public class PM_Fragement extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        /**         * 膨胀这个片段的布局         */
        return inflater.inflate(R.layout.pm_fragment, container, false);
    }
}
</code></pre><p>在res/layout目录下创建两个布局文件lm_fragement.xml和pm_fragment.xml。</p><p>以下是lm_fragement.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.LM_Fragement&quot;&gt;

    &lt;TextView
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;@string/landscape_message&quot;
        android:textColor=&quot;#000000&quot;
        android:textSize=&quot;100px&quot; /&gt;

    &lt;!-- 这里可以配置更多图形组件  --&gt;

&lt;/LinearLayout&gt;
</code></pre><p>以下是pm_fragment.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.PM_Fragement&quot;&gt;

    &lt;TextView
        android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;@string/portrait_message&quot;
        android:textColor=&quot;#000000&quot;
        android:textSize=&quot;100px&quot; /&gt;
    &lt;!-- 这里可以配置更多图形组件  --&gt;

&lt;/LinearLayout&gt;
</code></pre><p>以下是res/layout/activity_main.xml文件的内容 -</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:paddingLeft=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingRight=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;
    android:paddingBottom=&quot;@dimen/activity_vertical_margin&quot;
    tools:context=&quot;.MainActivity&quot;&gt;


    &lt;fragment
        android:name=&quot;com.example.fragments&quot;
        android:id=&quot;@+id/lm_fragment&quot;
        android:layout_weight=&quot;1&quot;
        android:layout_width=&quot;0dp&quot;
        android:layout_height=&quot;match_parent&quot; /&gt;

    &lt;fragment
        android:name=&quot;com.example.fragments&quot;
        android:id=&quot;@+id/pm_fragment&quot;
        android:layout_weight=&quot;2&quot;
        android:layout_width=&quot;0dp&quot;
        android:layout_height=&quot;match_parent&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>确保您具有以下res/values/strings.xml文件的内容-</p><pre><code class="language-xml">&lt;resources&gt;
    &lt;string name=&quot;app_name&quot;&gt;HelloWorld&lt;/string&gt;
    &lt;!-- TODO: Remove or change this placeholder text --&gt;
    &lt;string name=&quot;landscape_message&quot;&gt;这是横屏模式片段&lt;/string&gt;
    &lt;string name=&quot;portrait_message&quot;&gt;这是竖屏模式片段&lt;/string&gt;
&lt;/resources&gt;
</code></pre><p>让我们尝试运行刚刚创建的修改后的HelloWorld应用程序。我假设您是在进行环境设置时创建的AVD。要从Android Studio运行该应用，请打开您项目的Activity文件之一，然后从工具栏中单击“运行”图标。Android Studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示“模拟器”窗口。请耐心等待，因为这可能需要花费一些时间，具体取决于您的计算机速度，出现以下内容-</p><p><img src="https://www.jc2182.com/images/android/singlefragment1.png" alt="fragment"></p><p>这时候让我们来切换屏幕为横屏</p><p><img src="https://www.jc2182.com/images/android/singlefragment2.png" alt="fragment"></p><p>这时候我们看到如下效果： <img src="https://www.jc2182.com/images/android/singlefragment3.png" alt="frame"></p>`,27),i=[r];function d(l,m){return e(),n("div",null,i)}const g=t(o,[["render",d],["__file","single-frame.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/basic/single-frame.html","title":"单帧片段（Single frame fragment）","lang":"zh-CN","frontmatter":{"description":"单帧片段（Single frame fragment） Android 单帧片段 提示 单帧片段（Single frame fragment) 是为小屏幕设备（例如手持设备（手机））设计的，并且应高于android 3.0版本。 示例 本示例将向您说明如何创建自己的片段。在这里，我们将创建两个片段，其中一个片段将在设备处于横向模式时使用，另一个片段将在...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/basic/single-frame.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"单帧片段（Single frame fragment）"}],["meta",{"property":"og:description","content":"单帧片段（Single frame fragment） Android 单帧片段 提示 单帧片段（Single frame fragment) 是为小屏幕设备（例如手持设备（手机））设计的，并且应高于android 3.0版本。 示例 本示例将向您说明如何创建自己的片段。在这里，我们将创建两个片段，其中一个片段将在设备处于横向模式时使用，另一个片段将在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/singlefragment1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"单帧片段（Single frame fragment）\\",\\"image\\":[\\"https://www.jc2182.com/images/android/singlefragment1.png\\",\\"https://www.jc2182.com/images/android/singlefragment2.png\\",\\"https://www.jc2182.com/images/android/singlefragment3.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Android 单帧片段","slug":"android-单帧片段","link":"#android-单帧片段","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.53,"words":1058},"filePathRelative":"android-tutor/basic/single-frame.md","localizedDate":"2023年5月22日","autoDesc":true}');export{g as comp,p as data};
