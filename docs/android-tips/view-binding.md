# 视图绑定
# 视图绑定

在gradle文件中开启ViewBinding功能后,编译器就会为此模块下的每个布局文件都产生一个对应的绑定类。
这个绑定类是我们的布局名称去掉下划线使用驼峰的形式结尾接Binding；
例如：
activity_gender_guide.xml
就是：
ActivityGenderGuideBinding

使用viewbinding后，不需要再findViewById找控件，
直接通过binding.控件Id名称就可以，控件id名称也是去掉下滑线使用驼峰的形式。
viewbinding的inflate有两种方法，根据直接所需选择
1：inflate(getLayoutInflater());
2：inflate(inflater, container, false);

## 在activity使用

### kotlin(不使用viewbinding)

```kotlin
class MainActivity : AppCompatActivity() {  
  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        setContentView(R.layout.activity_main)  
       
    }  
}
```
###  kotlin(使用viewbinding)

```kotlin
class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding=ActivityMainBinding.inflate(layoutInflater)
        setContentView(R.layout.activity_main)
    }
}

```

 
## fragment使用

###  不使用viewbinding

```kotlin
private const val ARG_PARAM1 = "param1"  
private const val ARG_PARAM2 = "param2"  
  
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
```
### 使用viewbinding
```kotlin
class HomeFragment : Fragment() {  
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
    binding.homeTv.text = "hello"  
  }  
}
```

## BaseAdapter使用

以前的写法

```java
public class ListAdapter extends BaseAdapter {
    private Activity activity;
    private List<String> list;

    public ListAdapter(Activity activity, List<String> list) {
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

```

viewbinding写法

```java
public class ListAdapter extends BaseAdapter {
    private Activity activity;
    private List<String> list;

    public ListAdapter(Activity activity, List<String> list) {
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
        binding.tvBookname.setText("标题");
        return convertView;
    }
    }

```

kotlin

```kotlin
private inner class MyAdapter : BaseAdapter() {
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

```

## 在RecyclerView结合Adapter使用

```java
public class MainAdapter extends RecyclerView.Adapter<MainAdapter.ViewHolder> {

    private List<String> mList;

    public MainAdapter(List<String> list) {
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
        holder.mTextView.setText("标题");
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
```

kotlin

```kotlin
class FruitAdapter(val fruitList: List<Fruit>) : RecyclerView.Adapter<FruitAdapter.ViewHolder>() {
 
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
```

## 自定义dialog使用

```java
 public static void showRechargeAlertDialog(Context context, String title, int type, final OnSingleChoiceSelectedListener singleChoiceSelectedListener){
  //之前的写法
  View view = View.inflate(context, R.layout.dialog_recharge, null);
  TextView dialog_title = view.findViewById(R.id.dialog_title);
  dialog_title.setText("标题");
  final AlertDialog alertDialog = createAlertDialog(context, view, true);
  //使用viewbinding的写法
  DialogRechargeBinding binding = DialogRechargeBinding.inflate(LayoutInflater.from(context));
        binding.dialogTitle.setText("标题");
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

```

例子

```java
package kim.hsl.vb;

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
        binding.textView.setText("视图绑定对话框示例 \nDialogBinding");

        // 4 . 设置对话框大小 ( 仅做参考 美观处理 与主题无关 )
        WindowManager.LayoutParams params = getWindow().getAttributes();
        params.width = WindowManager.LayoutParams.MATCH_PARENT;
        params.height = 400;
        getWindow().setAttributes(params);
    }   
}
```

:::tip
在布局文件中使用viewBinding
include标签的viewBinding使用
:::

MainActivity

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
 
    <include 
        android:id="@+id/titleBar"
        layout="@layout/titlebar" />
    ...
</LinearLayout>
```

下面是插入的布局
一定要记得给include的布局加上id属性，不然到MainActivity中就找不到了！！

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >
 
    <Button
        android:id="@+id/back"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_centerVertical="true"
        android:text="Back" />
 
    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="Title"
        android:textSize="20sp" />
 
    <Button
        android:id="@+id/done"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:layout_centerVertical="true"
        android:text="Done" />
 
</RelativeLayout>
```

kotlin代码

```kotlin
class MainActivity : AppCompatActivity() {
 
    private lateinit var binding: ActivityMainBinding
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.titleBar.title.text = "Title"
        binding.titleBar.back.setOnClickListener {
        }
        binding.titleBar.done.setOnClickListener {
        }
    }
 
}

```

## merge标签的viewBinding使用

使用merge标签时，假设我们引入的布局文件如下：

```xml
<merge xmlns:android="http://schemas.android.com/apk/res/android">
 
    <Button
        android:id="@+id/back"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_centerVertical="true"
        android:text="Back" />
 
    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="Title"
        android:textSize="20sp" />
 
    <Button
        android:id="@+id/done"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:layout_centerVertical="true"
        android:text="Done" />
 
</merge>

```

 与include不同的是，在引入时去掉id属性防止崩溃：

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
 
    <include
        layout="@layout/titlebar" />
 
</LinearLayout>
```

kotlin代码

```kotlin
class MainActivity : AppCompatActivity() {
 
    private lateinit var binding: ActivityMainBinding
    private lateinit var titlebarBinding: TitlebarBinding
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        titlebarBinding = TitlebarBinding.bind(binding.root)
        setContentView(binding.root)
        titlebarBinding.title.text = "Title"
        titlebarBinding.back.setOnClickListener {
        }
        titlebarBinding.done.setOnClickListener {
        }
    }
 
}
```


## 如何操作

可替代`findViewById`,

```groovy
android {
        ...
        viewBinding {
            enabled = true
        }
    }
    
```

## 用法

为某个模块启用视图绑定功能后，系统会为该模块中包含的每个 XML 布局文件生成一个绑定类。每个绑定类均包含对根视图以及具有 ID 的所有视图的引用。系统会通过以下方式生成绑定类的名称：将 XML 文件的名称转换为驼峰式大小写，并在末尾添加“Binding”一词。

例如，假设某个布局文件的名称为 `result_profile.xml`：

```xml
<LinearLayout ... >
        <TextView android:id="@+id/name" />
        <ImageView android:cropToPadding="true" />
        <Button android:id="@+id/button"
            android:background="@drawable/rounded_button" />
    </LinearLayout>
    
```

所生成的绑定类的名称就为 `ResultProfileBinding`。此类具有两个字段：一个是名为 `name` 的 `TextView`，另一个是名为 `button` 的 `Button`。该布局中的 `ImageView` 没有 ID，因此绑定类中不存在对它的引用。

每个绑定类还包含一个 `getRoot()` 方法，用于为相应布局文件的根视图提供直接引用。在此示例中，`ResultProfileBinding` 类中的 `getRoot()` 方法会返回 `LinearLayout` 根视图。

:::tip
**注意**：Fragment 的存在时间比其视图长。请务必在 Fragment 的 [`onDestroyView()`](https://developer.android.google.cn/reference/kotlin/androidx/fragment/app/Fragment#ondestroyview) 方法中清除对绑定类实例的所有引用。
:::
## 与 findViewById 的区别

与使用 `findViewById` 相比，视图绑定具有一些很显著的优点：

- **Null 安全**：由于视图绑定会创建对视图的直接引用，因此不存在因视图 ID 无效而引发 Null 指针异常的风险。此外，如果视图仅出现在布局的某些配置中，则绑定类中包含其引用的字段会使用 `@Nullable` 标记。
- **类型安全**：每个绑定类中的字段均具有与它们在 XML 文件中引用的视图相匹配的类型。这意味着不存在发生类转换异常的风险。

这些差异意味着布局和代码之间的不兼容将会导致构建在编译时（而非运行时）失败。

## 与数据绑定的对比

视图绑定和[数据绑定](https://developer.android.google.cn/topic/libraries/data-binding)均会生成可用于直接引用视图的绑定类。但是，视图绑定旨在处理更简单的用例，与数据绑定相比，具有以下优势：

- **更快的编译速度**：视图绑定不需要处理注释，因此编译时间更短。
- **易于使用**：视图绑定不需要特别标记的 XML 布局文件，因此在应用中采用速度更快。在模块中启用视图绑定后，它会自动应用于该模块的所有布局。

反过来，与数据绑定相比，视图绑定也具有以下限制：

- 视图绑定不支持[布局变量或布局表达式](https://developer.android.google.cn/topic/libraries/data-binding/expressions)，因此不能用于直接在 XML 布局文件中声明动态界面内容。
- 视图绑定不支持[双向数据绑定](https://developer.android.google.cn/topic/libraries/data-binding/two-way)。

考虑到这些因素，在某些情况下，最好在项目中同时使用视图绑定和数据绑定。您可以在需要高级功能的布局中使用数据绑定，而在不需要高级功能的布局中使用视图绑定。

## 绑定activity包含include

In case of:

1. Include with generic layout (not merge node), we need to assign ID to included part, this way in binding we will have access to included sub part

```xml
<include
    android:id="@+id/your_id"
    layout="@layout/some_layout" />
```

This way in your activity code:

```kotlin
private lateinit var exampleBinding: ActivityExampleBinding  //activity_example.xml layout

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    exampleBinding = ActivityExampleBinding.inflate(layoutInflater)
    setContentView(exampleBinding.root)
    //we will be able to access included layouts view like this
    val includedView: View = exampleBinding.yourId.idOfIncludedView
//[...]
}
```

1. Include with merge block in external layout. We can't add ID to it because merge block is not a view. Let's say we have such eternal merge layout (merge_layout.xm):

```xml
<?xml version="1.0" encoding="utf-8"?>
<merge xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:showIn="@layout/activity_example">

    <TextView
        android:id="@+id/some_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World" />
</merge>
```

To properly bind such merge layout we need to:

In your activity code:

```kotlin
private lateinit var exampleBinding: ActivityExampleBinding  //activity_example.xml layout
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
```
## base activity

```kotlin
 
abstract class BaseFragment<T : ViewBinding>(
    private val viewBindingInflater: (
        inflater: LayoutInflater,
        parent: ViewGroup?,
        attachToParent: Boolean
    ) -> T
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
 
```
- 使用

```kotlin

class MyFragment : 
    BaseFragment<MyFragmentBinding>(MyFragmentBinding::inflate) { }
```


### 安卓baseactivity的viewbinding

<https://stackoverflow.com/questions/62407823/how-to-use-viewbinding-with-an-abstract-base-class>

```kotlin
/*
 * In Activity
 * source : https://chetangupta.net/viewbinding/
 * Author : ChetanGupta.net
 */
abstract class ViewBindingActivity<VB : ViewBinding> : AppCompatActivity() {

    private var _binding: ViewBinding? = null
    abstract val bindingInflater: (LayoutInflater) -> VB

    @Suppress("UNCHECKED_CAST")
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
```

```kotlin
/*
 * In Fragment
 * source : https://chetangupta.net/viewbinding/
 * Author : ChetanGupta.net
 */
abstract class ViewBindingFragment<VB : ViewBinding> : Fragment() {

    private var _binding: ViewBinding? = null
    abstract val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> VB

    @Suppress("UNCHECKED_CAST")
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
```
