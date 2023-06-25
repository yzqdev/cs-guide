# listview实例

## homefragment

```kotlin
  
import android.os.Bundle  
import android.view.LayoutInflater  
import android.view.View  
import android.view.ViewGroup  
import android.widget.Toast  
import androidx.fragment.app.Fragment  
import androidx.navigation.fragment.findNavController  
  
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
    //这里跳转fragment  
    val cats = listOf<Cat>(Cat("tom", 4), Cat("jerry", 3), Cat("spark", 5))  
    val navController = findNavController()  
    binding.homeLv.adapter = ListAdapter(requireActivity(),cats)  
    binding.homeLv.setOnItemClickListener { parent, view, position, id ->  
      Toast.makeText(requireContext(), cats[position].toString(), Toast.LENGTH_SHORT).show()  
    }  
  }  
}
```
## fragment_home.xml
```xml
<?xml version="1.0" encoding="utf-8"?>  
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"  
  xmlns:app="http://schemas.android.com/apk/res-auto"  
  android:layout_width="match_parent"  
  android:layout_height="match_parent">  
  
  <ListView  
    android:id="@+id/home_lv"  
    android:layout_width="match_parent"  
    android:layout_height="wrap_content"  
    app:layout_constraintStart_toStartOf="parent"  
    app:layout_constraintTop_toTopOf="parent" />  
</androidx.constraintlayout.widget.ConstraintLayout>
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
## Cat.kt

```kotlin
data class Cat(val name:String,val age:Int)
```

## ListAdapter.kt

```kotlin
  
import android.view.LayoutInflater  
import android.view.View  
import android.view.ViewGroup  
import android.widget.BaseAdapter  
import androidx.fragment.app.FragmentActivity  
  
class ListAdapter(val ctx: FragmentActivity, private val data: List<Cat>) : BaseAdapter() {  
  override fun getCount(): Int {  
    return data.size  
  }  
  
  override fun getItem(position: Int): Any {  
    return data[position]  
  }  
  
  override fun getItemId(position: Int): Long {  
    return position.toLong()  
  }  
  
  override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {  
    val binding = ListItemBinding.inflate(  
      LayoutInflater.from(parent?.context),  
      parent,  
      false  
    )  
    val view: View = convertView ?: binding.root  
    binding.listTv.text = data[position].name  
    return view  
  }  
  
}
```