# recyclerview实例

## BlankFragment.kt
```kotlin
import android.os.Bundle  
import android.view.LayoutInflater  
import android.view.View  
import android.view.ViewGroup  
import androidx.fragment.app.Fragment  
  
class BlankFragment : Fragment() {  
  private var _binding: FragmentBlankBinding? = null  
  val binding get() = _binding!!  
  
  
  override fun onCreateView(  
    inflater: LayoutInflater, container: ViewGroup?,  
    savedInstanceState: Bundle?  
  ): View? {  
    _binding = FragmentBlankBinding.inflate(inflater, container, false)  
    return binding.root  
  }  
  
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {  
    super.onViewCreated(view, savedInstanceState)  
    val cats = listOf<Cat>(Cat("tom", 4), Cat("jerry", 3), Cat("spark", 5))  
    binding.rcView.adapter = RecyclerAdapter(requireActivity(), cats)  
  }  
  
  override fun onDestroyView() {  
    super.onDestroyView()  
    _binding = null  
  }  
}
```

## fragment_blank.xml
```xml
<?xml version="1.0" encoding="utf-8"?>  
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
  xmlns:app="http://schemas.android.com/apk/res-auto"  
  xmlns:tools="http://schemas.android.com/tools"  
  android:layout_width="match_parent"  
  android:layout_height="match_parent"  
  tools:context=".ui.main.BlankFragment">  
  
  <androidx.recyclerview.widget.RecyclerView  
    android:id="@+id/rc_view"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent"  
    app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager" />  
</LinearLayout>
```
## Cat.kt
```kotlin
data class Cat(val name:String,val age:Int)
```

## list_item.xml
```xml
<?xml version="1.0" encoding="utf-8"?>  
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
  android:layout_width="match_parent"  
  android:layout_height="wrap_content">  
  
  <TextView  
    android:id="@+id/list_tv"  
    android:layout_width="match_parent"  
    android:layout_height="wrap_content"  
    android:layout_margin="20dp" />  
</LinearLayout>
```

## RecyclerAdapter.kt
```kotlin
import android.view.LayoutInflater  
import android.view.ViewGroup  
import android.widget.TextView  
import android.widget.Toast  
import androidx.fragment.app.FragmentActivity  
import androidx.recyclerview.widget.RecyclerView  
  
class RecyclerAdapter(private val ctx: FragmentActivity, private val data: List<Cat>) :  
  RecyclerView.Adapter<RecyclerAdapter.MyViewHolder>() {  
  class MyViewHolder(view: ListItemBinding) : RecyclerView.ViewHolder(view.root) {  
    val tv: TextView = view.listTv  
  
  }  
  
  override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {  
    val view = ListItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)  
    return MyViewHolder(view)  
  }  
  
  override fun getItemCount(): Int {  
    return data.size  
  }  
  
  override fun onBindViewHolder(holder: MyViewHolder, position: Int) {  
    holder.tv.text = data[position].name  
    holder.itemView.setOnClickListener {  
      Toast.makeText(ctx, data[position].name, Toast.LENGTH_SHORT).show()  
    }  
  }  
}
```