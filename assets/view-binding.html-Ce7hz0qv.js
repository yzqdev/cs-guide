import{_ as n,c as e,o as t,d as i}from"./app-CbULZrmi.js";const a={},o=i(`<h1 id="视图绑定" tabindex="-1"><a class="header-anchor" href="#视图绑定"><span>视图绑定</span></a></h1><h1 id="视图绑定-1" tabindex="-1"><a class="header-anchor" href="#视图绑定-1"><span>视图绑定</span></a></h1><p>在gradle文件中开启ViewBinding功能后,编译器就会为此模块下的每个布局文件都产生一个对应的绑定类。 这个绑定类是我们的布局名称去掉下划线使用驼峰的形式结尾接Binding； 例如： activity_gender_guide.xml 就是： ActivityGenderGuideBinding</p><p>使用viewbinding后，不需要再findViewById找控件， 直接通过binding.控件Id名称就可以，控件id名称也是去掉下滑线使用驼峰的形式。 viewbinding的inflate有两种方法，根据直接所需选择 1：inflate(getLayoutInflater()); 2：inflate(inflater, container, false);</p><h2 id="在activity使用" tabindex="-1"><a class="header-anchor" href="#在activity使用"><span>在activity使用</span></a></h2><h3 id="kotlin-不使用viewbinding" tabindex="-1"><a class="header-anchor" href="#kotlin-不使用viewbinding"><span>kotlin(不使用viewbinding)</span></a></h3><pre><code class="language-kotlin">class MainActivity : AppCompatActivity() {  
  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        setContentView(R.layout.activity_main)  
       
    }  
}
</code></pre><h3 id="kotlin-使用viewbinding" tabindex="-1"><a class="header-anchor" href="#kotlin-使用viewbinding"><span>kotlin(使用viewbinding)</span></a></h3><pre><code class="language-kotlin">class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding=ActivityMainBinding.inflate(layoutInflater)
        setContentView(R.layout.activity_main)
    }
}

</code></pre><h2 id="fragment使用" tabindex="-1"><a class="header-anchor" href="#fragment使用"><span>fragment使用</span></a></h2><h3 id="不使用viewbinding" tabindex="-1"><a class="header-anchor" href="#不使用viewbinding"><span>不使用viewbinding</span></a></h3><pre><code class="language-kotlin">private const val ARG_PARAM1 = &quot;param1&quot;  
private const val ARG_PARAM2 = &quot;param2&quot;  
  
class BlankFragment : Fragment() {  
    // TODO: Rename and change types of parameters  
    private var param1: String? = null  
    private var param2: String? = null  
  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        arguments?.let {  
            param1 = it.getString(ARG_PARAM1)  
            param2 = it.getString(ARG_PARAM2)  
        }  
    }  
  
    override fun onCreateView(  
        inflater: LayoutInflater, container: ViewGroup?,  
        savedInstanceState: Bundle?  
    ): View? {  
        // Inflate the layout for this fragment  
        return inflater.inflate(R.layout.fragment_blank, container, false)  
    }  
  
    companion object {  
  
        @JvmStatic  
        fun newInstance(param1: String, param2: String) =  
            BlankFragment().apply {  
                arguments = Bundle().apply {  
                    putString(ARG_PARAM1, param1)  
                    putString(ARG_PARAM2, param2)  
                }  
            }  
    }  
}
</code></pre><h3 id="使用viewbinding" tabindex="-1"><a class="header-anchor" href="#使用viewbinding"><span>使用viewbinding</span></a></h3><pre><code class="language-kotlin">class HomeFragment : Fragment() {  
  private var _binding: FragmentHomeBinding? = null  
  private val binding get() = _binding!!  
  override fun onCreateView(  
    inflater: LayoutInflater,  
    container: ViewGroup?,  
    savedInstanceState: Bundle?  
  ): View? {  
    _binding = FragmentHomeBinding.inflate(inflater, container, false)  
    return binding.root  
  }  
  
  override fun onDestroyView() {  
    super.onDestroyView()  
    _binding = null  
  }  
  
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {  
    super.onViewCreated(view, savedInstanceState)  
    binding.homeTv.text = &quot;hello&quot;  
  }  
}
</code></pre><h2 id="baseadapter使用" tabindex="-1"><a class="header-anchor" href="#baseadapter使用"><span>BaseAdapter使用</span></a></h2><p>以前的写法</p><pre><code class="language-java">public class ListAdapter extends BaseAdapter {
    private Activity activity;
    private List&lt;String&gt; list;

    public ListAdapter(Activity activity, List&lt;String&gt; list) {
        this.activity = activity;
        this.list = list;
    }

    @Override
    public int getCount() {
        return list == null ? 0 : list.size();
    }

    @Override
    public Object getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    class ViewHolder {
        ImageView iv_cover;
        TextView tv_bookname;
   
    }
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;
        if (convertView == null) {
            convertView = LayoutInflater.from(activity).inflate(R.layout.archive_list_item, null);
            holder = new ViewHolder();
            holder.iv_cover = (ImageView) convertView.findViewById(R.id.iv_cover);
            holder.tv_bookname = (TextView) convertView.findViewById(R.id.tv_bookname);
            convertView.setTag(holder);
        } else {
            holder = (ViewHolder) convertView.getTag();
        }
        return convertView;
    }
    }

</code></pre><p>viewbinding写法</p><pre><code class="language-java">public class ListAdapter extends BaseAdapter {
    private Activity activity;
    private List&lt;String&gt; list;

    public ListAdapter(Activity activity, List&lt;String&gt; list) {
        this.activity = activity;
        this.list = list;
    }

    @Override
    public int getCount() {
        return list == null ? 0 : list.size();
    }

    @Override
    public Object getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ArchiveListItemBinding binding; 
        if (convertView == null) {
            binding = ArchiveListItemBinding.inflate(activity.getLayoutInflater(), null, false);
            convertView = binding.getRoot();
            convertView.setTag(binding);
        } else {
            binding = (ArchiveListItemBinding) convertView.getTag();
        }
        binding.tvBookname.setText(&quot;标题&quot;);
        return convertView;
    }
    }

</code></pre><p>kotlin</p><pre><code class="language-kotlin">private inner class MyAdapter : BaseAdapter() {
        override fun getCount(): Int {
            return projects.size
        }

        override fun getItem(position: Int): Project {
            return projects[position]
        }

        override fun getItemId(position: Int): Long {
            return position.toLong()
        }

        override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
            val view: View
            val binding = ViewcoreItemListBinding.inflate(
                LayoutInflater.from(requireContext()),
                null,
                false
            )
            if (convertView == null) {
                val project = getItem(position)

                binding.title.text = project.title
                binding.desc.text = project.desc
                return binding.root
 
            } else {
                view = convertView
            }

            return view
        }
    }

</code></pre><h2 id="在recyclerview结合adapter使用" tabindex="-1"><a class="header-anchor" href="#在recyclerview结合adapter使用"><span>在RecyclerView结合Adapter使用</span></a></h2><pre><code class="language-java">public class MainAdapter extends RecyclerView.Adapter&lt;MainAdapter.ViewHolder&gt; {

    private List&lt;String&gt; mList;

    public MainAdapter(List&lt;String&gt; list) {
        mList = list;
    }

    @NonNull
    @Override
    public MainAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        //之前的写法
        //View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_comment_item, parent, false);
        //ViewHolder holder = new ViewHolder(view);

        //使用ViewBinding的写法
        LayoutCommentItemBinding commentItemBinding = LayoutCommentItemBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false);
        ViewHolder holder = new ViewHolder(commentBinding);
        return holder;
    }

    @Override
    public void onBindViewHolder(@NonNull MainAdapter.ViewHolder holder, int position) {
        holder.mTextView.setText(&quot;标题&quot;);
    }

    @Override
    public int getItemCount() {
        return mList.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView mTextView;
        //之前的写法
        //public ViewHolder(@NonNull View itemView) {
        //    super(itemView);
        //    mTextView = itemView.findViewById(R.id.tv_name);
        //}

        //使用ViewBinding的写法
        ViewHolder(@NonNull LayoutCommentItemBinding commentItemBinding) {
            super(commentItemBinding.getRoot());
            mTextView = commentItemBinding.tvName;
        }

    }
}
</code></pre><p>kotlin</p><pre><code class="language-kotlin">class FruitAdapter(val fruitList: List&lt;Fruit&gt;) : RecyclerView.Adapter&lt;FruitAdapter.ViewHolder&gt;() {
 
    inner class ViewHolder(binding: FruitItemBinding) : RecyclerView.ViewHolder(binding.root) {
        val fruitImage: ImageView = binding.fruitImage
        val fruitName: TextView = binding.fruitName
    }
 
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = FruitItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }
 
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val fruit = fruitList[position]
        holder.fruitImage.setImageResource(fruit.imageId)
        holder.fruitName.text = fruit.name
    }
 
    override fun getItemCount() = fruitList.size
</code></pre><h2 id="自定义dialog使用" tabindex="-1"><a class="header-anchor" href="#自定义dialog使用"><span>自定义dialog使用</span></a></h2><pre><code class="language-java"> public static void showRechargeAlertDialog(Context context, String title, int type, final OnSingleChoiceSelectedListener singleChoiceSelectedListener){
  //之前的写法
  View view = View.inflate(context, R.layout.dialog_recharge, null);
  TextView dialog_title = view.findViewById(R.id.dialog_title);
  dialog_title.setText(&quot;标题&quot;);
  final AlertDialog alertDialog = createAlertDialog(context, view, true);
  //使用viewbinding的写法
  DialogRechargeBinding binding = DialogRechargeBinding.inflate(LayoutInflater.from(context));
        binding.dialogTitle.setText(&quot;标题&quot;);
        final AlertDialog alertDialog = createAlertDialog(context, binding.getRoot(), true);
 }
 //创建共用的dialog的属性
    public static AlertDialog createAlertDialog(Context context, View view, boolean isCancelable){
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setView(view);
        final AlertDialog catDialog = builder.show();
        catDialog.setCancelable(isCancelable);//按返回键是否可以退出，true允许
        catDialog.getWindow().setBackgroundDrawable(null);
        catDialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);
        WindowManager.LayoutParams lp = catDialog.getWindow().getAttributes();
        lp.width = SystemUtil.getScreenWidth(context); //设置宽度
        lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
        catDialog.getWindow().setAttributes(lp);
        return catDialog;
    }

</code></pre><p>例子</p><pre><code class="language-java">package kim.hsl.vb;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.RecyclerView;

import kim.hsl.vb.databinding.DialogBinding;

public class ViewBindingDialog extends Dialog {

    public ViewBindingDialog(@NonNull Context context) {
        super(context);
    }

    public ViewBindingDialog(@NonNull Context context, int themeResId) {
        super(context, themeResId);
    }

    protected ViewBindingDialog(@NonNull Context context, boolean cancelable,
                                @Nullable OnCancelListener cancelListener) {
        super(context, cancelable, cancelListener);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 1 . 获取视图绑定类
        DialogBinding binding = DialogBinding.inflate(getLayoutInflater());

        // 2 . 设置对话框布局
        setContentView(binding.getRoot());

        // 3 . 通过视图绑定类访问布局中的视图组件
        binding.textView.setText(&quot;视图绑定对话框示例 \\nDialogBinding&quot;);

        // 4 . 设置对话框大小 ( 仅做参考 美观处理 与主题无关 )
        WindowManager.LayoutParams params = getWindow().getAttributes();
        params.width = WindowManager.LayoutParams.MATCH_PARENT;
        params.height = 400;
        getWindow().setAttributes(params);
    }   
}
</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在布局文件中使用viewBinding include标签的viewBinding使用</p></div><p>MainActivity</p><pre><code class="language-xml">&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:orientation=&quot;vertical&quot;&gt;
 
    &lt;include 
        android:id=&quot;@+id/titleBar&quot;
        layout=&quot;@layout/titlebar&quot; /&gt;
    ...
&lt;/LinearLayout&gt;
</code></pre><p>下面是插入的布局 一定要记得给include的布局加上id属性，不然到MainActivity中就找不到了！！</p><pre><code class="language-xml">&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot; &gt;
 
    &lt;Button
        android:id=&quot;@+id/back&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_centerVertical=&quot;true&quot;
        android:text=&quot;Back&quot; /&gt;
 
    &lt;TextView
        android:id=&quot;@+id/title&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_centerInParent=&quot;true&quot;
        android:text=&quot;Title&quot;
        android:textSize=&quot;20sp&quot; /&gt;
 
    &lt;Button
        android:id=&quot;@+id/done&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_centerVertical=&quot;true&quot;
        android:text=&quot;Done&quot; /&gt;
 
&lt;/RelativeLayout&gt;
</code></pre><p>kotlin代码</p><pre><code class="language-kotlin">class MainActivity : AppCompatActivity() {
 
    private lateinit var binding: ActivityMainBinding
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.titleBar.title.text = &quot;Title&quot;
        binding.titleBar.back.setOnClickListener {
        }
        binding.titleBar.done.setOnClickListener {
        }
    }
 
}

</code></pre><h2 id="merge标签的viewbinding使用" tabindex="-1"><a class="header-anchor" href="#merge标签的viewbinding使用"><span>merge标签的viewBinding使用</span></a></h2><p>使用merge标签时，假设我们引入的布局文件如下：</p><pre><code class="language-xml">&lt;merge xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;&gt;
 
    &lt;Button
        android:id=&quot;@+id/back&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_centerVertical=&quot;true&quot;
        android:text=&quot;Back&quot; /&gt;
 
    &lt;TextView
        android:id=&quot;@+id/title&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_centerInParent=&quot;true&quot;
        android:text=&quot;Title&quot;
        android:textSize=&quot;20sp&quot; /&gt;
 
    &lt;Button
        android:id=&quot;@+id/done&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_centerVertical=&quot;true&quot;
        android:text=&quot;Done&quot; /&gt;
 
&lt;/merge&gt;

</code></pre><p>与include不同的是，在引入时去掉id属性防止崩溃：</p><pre><code class="language-xml">&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:orientation=&quot;vertical&quot;&gt;
 
    &lt;include
        layout=&quot;@layout/titlebar&quot; /&gt;
 
&lt;/LinearLayout&gt;
</code></pre><p>kotlin代码</p><pre><code class="language-kotlin">class MainActivity : AppCompatActivity() {
 
    private lateinit var binding: ActivityMainBinding
    private lateinit var titlebarBinding: TitlebarBinding
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        titlebarBinding = TitlebarBinding.bind(binding.root)
        setContentView(binding.root)
        titlebarBinding.title.text = &quot;Title&quot;
        titlebarBinding.back.setOnClickListener {
        }
        titlebarBinding.done.setOnClickListener {
        }
    }
 
}
</code></pre><h2 id="如何操作" tabindex="-1"><a class="header-anchor" href="#如何操作"><span>如何操作</span></a></h2><p>可替代<code>findViewById</code>,</p><pre><code class="language-groovy">android {
        ...
        viewBinding {
            enabled = true
        }
    }
    
</code></pre><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法"><span>用法</span></a></h2><p>为某个模块启用视图绑定功能后，系统会为该模块中包含的每个 XML 布局文件生成一个绑定类。每个绑定类均包含对根视图以及具有 ID 的所有视图的引用。系统会通过以下方式生成绑定类的名称：将 XML 文件的名称转换为驼峰式大小写，并在末尾添加“Binding”一词。</p><p>例如，假设某个布局文件的名称为 <code>result_profile.xml</code>：</p><pre><code class="language-xml">&lt;LinearLayout ... &gt;
        &lt;TextView android:id=&quot;@+id/name&quot; /&gt;
        &lt;ImageView android:cropToPadding=&quot;true&quot; /&gt;
        &lt;Button android:id=&quot;@+id/button&quot;
            android:background=&quot;@drawable/rounded_button&quot; /&gt;
    &lt;/LinearLayout&gt;
    
</code></pre><p>所生成的绑定类的名称就为 <code>ResultProfileBinding</code>。此类具有两个字段：一个是名为 <code>name</code> 的 <code>TextView</code>，另一个是名为 <code>button</code> 的 <code>Button</code>。该布局中的 <code>ImageView</code> 没有 ID，因此绑定类中不存在对它的引用。</p><p>每个绑定类还包含一个 <code>getRoot()</code> 方法，用于为相应布局文件的根视图提供直接引用。在此示例中，<code>ResultProfileBinding</code> 类中的 <code>getRoot()</code> 方法会返回 <code>LinearLayout</code> 根视图。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><strong>注意</strong>：Fragment 的存在时间比其视图长。请务必在 Fragment 的 <a href="https://developer.android.google.cn/reference/kotlin/androidx/fragment/app/Fragment#ondestroyview" target="_blank" rel="noopener noreferrer"><code>onDestroyView()</code></a> 方法中清除对绑定类实例的所有引用。</p></div><h2 id="与-findviewbyid-的区别" tabindex="-1"><a class="header-anchor" href="#与-findviewbyid-的区别"><span>与 findViewById 的区别</span></a></h2><p>与使用 <code>findViewById</code> 相比，视图绑定具有一些很显著的优点：</p><ul><li><strong>Null 安全</strong>：由于视图绑定会创建对视图的直接引用，因此不存在因视图 ID 无效而引发 Null 指针异常的风险。此外，如果视图仅出现在布局的某些配置中，则绑定类中包含其引用的字段会使用 <code>@Nullable</code> 标记。</li><li><strong>类型安全</strong>：每个绑定类中的字段均具有与它们在 XML 文件中引用的视图相匹配的类型。这意味着不存在发生类转换异常的风险。</li></ul><p>这些差异意味着布局和代码之间的不兼容将会导致构建在编译时（而非运行时）失败。</p><h2 id="与数据绑定的对比" tabindex="-1"><a class="header-anchor" href="#与数据绑定的对比"><span>与数据绑定的对比</span></a></h2><p>视图绑定和<a href="https://developer.android.google.cn/topic/libraries/data-binding" target="_blank" rel="noopener noreferrer">数据绑定</a>均会生成可用于直接引用视图的绑定类。但是，视图绑定旨在处理更简单的用例，与数据绑定相比，具有以下优势：</p><ul><li><strong>更快的编译速度</strong>：视图绑定不需要处理注释，因此编译时间更短。</li><li><strong>易于使用</strong>：视图绑定不需要特别标记的 XML 布局文件，因此在应用中采用速度更快。在模块中启用视图绑定后，它会自动应用于该模块的所有布局。</li></ul><p>反过来，与数据绑定相比，视图绑定也具有以下限制：</p><ul><li>视图绑定不支持<a href="https://developer.android.google.cn/topic/libraries/data-binding/expressions" target="_blank" rel="noopener noreferrer">布局变量或布局表达式</a>，因此不能用于直接在 XML 布局文件中声明动态界面内容。</li><li>视图绑定不支持<a href="https://developer.android.google.cn/topic/libraries/data-binding/two-way" target="_blank" rel="noopener noreferrer">双向数据绑定</a>。</li></ul><p>考虑到这些因素，在某些情况下，最好在项目中同时使用视图绑定和数据绑定。您可以在需要高级功能的布局中使用数据绑定，而在不需要高级功能的布局中使用视图绑定。</p><h2 id="绑定activity包含include" tabindex="-1"><a class="header-anchor" href="#绑定activity包含include"><span>绑定activity包含include</span></a></h2><p>In case of:</p><ol><li>Include with generic layout (not merge node), we need to assign ID to included part, this way in binding we will have access to included sub part</li></ol><pre><code class="language-xml">&lt;include
    android:id=&quot;@+id/your_id&quot;
    layout=&quot;@layout/some_layout&quot; /&gt;
</code></pre><p>This way in your activity code:</p><pre><code class="language-kotlin">private lateinit var exampleBinding: ActivityExampleBinding  //activity_example.xml layout

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    exampleBinding = ActivityExampleBinding.inflate(layoutInflater)
    setContentView(exampleBinding.root)
    //we will be able to access included layouts view like this
    val includedView: View = exampleBinding.yourId.idOfIncludedView
//[...]
}
</code></pre><ol><li>Include with merge block in external layout. We can&#39;t add ID to it because merge block is not a view. Let&#39;s say we have such eternal merge layout (merge_layout.xm):</li></ol><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;merge xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:app=&quot;http://schemas.android.com/apk/res-auto&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    tools:showIn=&quot;@layout/activity_example&quot;&gt;

    &lt;TextView
        android:id=&quot;@+id/some_view&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;Hello World&quot; /&gt;
&lt;/merge&gt;
</code></pre><p>To properly bind such merge layout we need to:</p><p>In your activity code:</p><pre><code class="language-kotlin">private lateinit var exampleBinding: ActivityExampleBinding  //activity_example.xml layout
private lateinit var mergeBinding: MergeLayoutBinding  //merge_layout.xml layout

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    exampleBinding = ActivityExampleBinding.inflate(layoutInflater)
    //we need to bind the root layout with our binder for external layout
    mergeBinding = MergeLayoutBinding.bind(exampleBinding.root)
    setContentView(exampleBinding.root)
    //we will be able to access included in merge layout views like this
    val mergedView: View = mergeBinding.someView
//[...]
}
</code></pre><h2 id="base-activity" tabindex="-1"><a class="header-anchor" href="#base-activity"><span>base activity</span></a></h2><pre><code class="language-kotlin"> 
abstract class BaseFragment&lt;T : ViewBinding&gt;(
    private val viewBindingInflater: (
        inflater: LayoutInflater,
        parent: ViewGroup?,
        attachToParent: Boolean
    ) -&gt; T
) : Fragment() {


    lateinit var viewBinding: T

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewBinding = viewBindingInflater(inflater, container, false)
        return viewBinding.root
    }
}
 
</code></pre><ul><li>使用</li></ul><pre><code class="language-kotlin">
class MyFragment : 
    BaseFragment&lt;MyFragmentBinding&gt;(MyFragmentBinding::inflate) { }
</code></pre><h3 id="安卓baseactivity的viewbinding" tabindex="-1"><a class="header-anchor" href="#安卓baseactivity的viewbinding"><span>安卓baseactivity的viewbinding</span></a></h3><p><a href="https://stackoverflow.com/questions/62407823/how-to-use-viewbinding-with-an-abstract-base-class" target="_blank" rel="noopener noreferrer">https://stackoverflow.com/questions/62407823/how-to-use-viewbinding-with-an-abstract-base-class</a></p><pre><code class="language-kotlin">/*
 * In Activity
 * source : https://chetangupta.net/viewbinding/
 * Author : ChetanGupta.net
 */
abstract class ViewBindingActivity&lt;VB : ViewBinding&gt; : AppCompatActivity() {

    private var _binding: ViewBinding? = null
    abstract val bindingInflater: (LayoutInflater) -&gt; VB

    @Suppress(&quot;UNCHECKED_CAST&quot;)
    protected val binding: VB
        get() = _binding as VB

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        _binding = bindingInflater.invoke(layoutInflater)
        setContentView(requireNotNull(_binding).root)
        setup()
    }

    abstract fun setup()

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }
}
</code></pre><pre><code class="language-kotlin">/*
 * In Fragment
 * source : https://chetangupta.net/viewbinding/
 * Author : ChetanGupta.net
 */
abstract class ViewBindingFragment&lt;VB : ViewBinding&gt; : Fragment() {

    private var _binding: ViewBinding? = null
    abstract val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -&gt; VB

    @Suppress(&quot;UNCHECKED_CAST&quot;)
    protected val binding: VB
        get() = _binding as VB

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = bindingInflater.invoke(inflater, container, false)
        return requireNotNull(_binding).root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setup()
    }

    abstract fun setup()

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
</code></pre>`,82),r=[o];function d(l,c){return t(),e("div",null,r)}const u=n(a,[["render",d],["__file","view-binding.html.vue"]]),g=JSON.parse('{"path":"/android-tips/view-binding.html","title":"视图绑定","lang":"zh-CN","frontmatter":{"description":"视图绑定 视图绑定 在gradle文件中开启ViewBinding功能后,编译器就会为此模块下的每个布局文件都产生一个对应的绑定类。 这个绑定类是我们的布局名称去掉下划线使用驼峰的形式结尾接Binding； 例如： activity_gender_guide.xml 就是： ActivityGenderGuideBinding 使用viewbindin...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tips/view-binding.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"视图绑定"}],["meta",{"property":"og:description","content":"视图绑定 视图绑定 在gradle文件中开启ViewBinding功能后,编译器就会为此模块下的每个布局文件都产生一个对应的绑定类。 这个绑定类是我们的布局名称去掉下划线使用驼峰的形式结尾接Binding； 例如： activity_gender_guide.xml 就是： ActivityGenderGuideBinding 使用viewbindin..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"视图绑定\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"在activity使用","slug":"在activity使用","link":"#在activity使用","children":[{"level":3,"title":"kotlin(不使用viewbinding)","slug":"kotlin-不使用viewbinding","link":"#kotlin-不使用viewbinding","children":[]},{"level":3,"title":"kotlin(使用viewbinding)","slug":"kotlin-使用viewbinding","link":"#kotlin-使用viewbinding","children":[]}]},{"level":2,"title":"fragment使用","slug":"fragment使用","link":"#fragment使用","children":[{"level":3,"title":"不使用viewbinding","slug":"不使用viewbinding","link":"#不使用viewbinding","children":[]},{"level":3,"title":"使用viewbinding","slug":"使用viewbinding","link":"#使用viewbinding","children":[]}]},{"level":2,"title":"BaseAdapter使用","slug":"baseadapter使用","link":"#baseadapter使用","children":[]},{"level":2,"title":"在RecyclerView结合Adapter使用","slug":"在recyclerview结合adapter使用","link":"#在recyclerview结合adapter使用","children":[]},{"level":2,"title":"自定义dialog使用","slug":"自定义dialog使用","link":"#自定义dialog使用","children":[]},{"level":2,"title":"merge标签的viewBinding使用","slug":"merge标签的viewbinding使用","link":"#merge标签的viewbinding使用","children":[]},{"level":2,"title":"如何操作","slug":"如何操作","link":"#如何操作","children":[]},{"level":2,"title":"用法","slug":"用法","link":"#用法","children":[]},{"level":2,"title":"与 findViewById 的区别","slug":"与-findviewbyid-的区别","link":"#与-findviewbyid-的区别","children":[]},{"level":2,"title":"与数据绑定的对比","slug":"与数据绑定的对比","link":"#与数据绑定的对比","children":[]},{"level":2,"title":"绑定activity包含include","slug":"绑定activity包含include","link":"#绑定activity包含include","children":[]},{"level":2,"title":"base activity","slug":"base-activity","link":"#base-activity","children":[{"level":3,"title":"安卓baseactivity的viewbinding","slug":"安卓baseactivity的viewbinding","link":"#安卓baseactivity的viewbinding","children":[]}]}],"git":{"createdTime":1684989246000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":8.99,"words":2698},"filePathRelative":"android-tips/view-binding.md","localizedDate":"2023年5月25日","autoDesc":true}');export{u as comp,g as data};
