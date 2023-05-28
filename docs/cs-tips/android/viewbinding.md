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

```java
public class GenderGuideActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //之前的写法
        setContentView(R.layout.activity_gender_guide);
        TextView guide_title = (TextView) findViewById(R.id.guide_title);
        guide_title.setText("标题");
        
        //使用viewbinding的写法
        ActivityGenderGuideBinding binding = ActivityGenderGuideBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
         binding.guideTitle.setText("标题");
     }
}


// viewbindng用法

class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding=ActivityMainBinding.inflate(layoutInflater)
        setContentView(R.layout.activity_main)
    }
}

```

### 带有include

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_money_income);
        ActivityMoneyIncomeBinding moneyIncomeBinding = ActivityMoneyIncomeBinding.bind(getContainer());;
  //如果include的布局是当前 module里的布局
  //就可以直接调用
  //moneyIncomeBinding.moneyView.title.setText("标题");
  //如果是其它module里的
  //那么需要在哪个module里开启viewbinding
  //调用方法
        View money_view = findViewById(R.id.money_view);
        MartianMoneyWithdrawViewBinding moneyBinding = MartianMoneyWithdrawViewBinding.bind(money_view);
  moneyBinding.title.setText("标题");
}



```

```kotlin
class MainFragment : Fragment() {
 
    private var _binding: FragmentMainBinding? = null
 
    private val binding get() = _binding!!
 
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentMainBinding.inflate(inflater, container, false)
        return binding.root
    }
 
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
 
}
```

## fragment使用

```java
public class ReadingHistoryFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
     //以前的写法
     View view = inflater.inflate(R.layout.list_with_empty_view, null);
     TextView empty_text = (TextView) view.findViewById(R.id.empty_text);
     empty_text.setText("标题");
     return view;
     //使用viewbinding的写法
        ListWithEmptyViewBinding binding = ListWithEmptyViewBinding.inflate(inflater, container, false);
        binding.emptyText.setText("标题");
        return binding.getRoot();
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

```kt
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

```kotin
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
