 
# fragment 路由实例
## MainActivity
```kotlin
import android.os.Bundle  
import androidx.appcompat.app.AppCompatActivity  
import androidx.navigation.findNavController  
import androidx.navigation.fragment.NavHostFragment  
import androidx.navigation.ui.AppBarConfiguration  
import androidx.navigation.ui.navigateUp  
import androidx.navigation.ui.setupActionBarWithNavController

class MainActivity : AppCompatActivity()  {  
   private lateinit var binding: ActivityMainBinding  
    private lateinit var appBarConfiguration: AppBarConfiguration  
    override fun onCreate(savedInstanceState: Bundle?) {  
        super.onCreate(savedInstanceState)  
        binding = ActivityMainBinding.inflate(  layoutInflater  )  
        setContentView(binding.root)  
        setSupportActionBar(binding.toolbar)  
         val navHostFragment =  
            supportFragmentManager.findFragmentById(R.id.nav_host_fragment)  
                    as NavHostFragment  
         val navController = navHostFragment.navController  
        appBarConfiguration = AppBarConfiguration(navController.graph)  
        setupActionBarWithNavController(navController, appBarConfiguration)  
  
    }  
    override fun onSupportNavigateUp(): Boolean {  
        val navController = findNavController(R.id.nav_host_fragment)  
        return navController.navigateUp(appBarConfiguration)  
                || super.onSupportNavigateUp()  
    }  
  
}
```
## activity_main.xml
```xml
<?xml version="1.0" encoding="utf-8"?>  
  
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"  
    xmlns:app="http://schemas.android.com/apk/res-auto"  
    xmlns:tools="http://schemas.android.com/tools"  
    android:id="@+id/main_container"  
    android:layout_width="match_parent"  
    android:layout_height="match_parent"  
    android:orientation="vertical"  
    tools:context="ab.yzq.recycler.MainActivity">  
  
    <androidx.appcompat.widget.Toolbar  
        android:id="@+id/toolbar"  
        android:layout_width="match_parent"  
        android:layout_height="?attr/actionBarSize"  
        android:background="?attr/colorPrimary"  
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"  
        app:popupTheme="@style/ThemeOverlay.AppCompat.Light" />  
  
    <androidx.fragment.app.FragmentContainerView        android:id="@+id/nav_host_fragment"  
        android:name="androidx.navigation.fragment.NavHostFragment"  
        android:layout_width="match_parent"  
        android:layout_height="match_parent"  
        app:layout_constraintLeft_toLeftOf="parent"  
        app:layout_constraintRight_toRightOf="parent"  
        app:layout_constraintTop_toTopOf="parent"  
        app:layout_constraintBottom_toBottomOf="parent"  
  
        app:defaultNavHost="true"  
        app:navGraph="@navigation/home_list_nav" />  
  
</LinearLayout>
```
## `res/navigation/home_nav.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>  
<navigation xmlns:android="http://schemas.android.com/apk/res/android"  
  xmlns:app="http://schemas.android.com/apk/res-auto"  
  xmlns:tools="http://schemas.android.com/tools"  
  android:id="@+id/home_nav"  
  app:startDestination="@id/homeFragment">  
  
  <fragment  
    android:id="@+id/blankFragment"  
    android:name="ab.yzq.tutor.customview.ui.main.BlankFragment"  
    android:label="fragment_blank"  
    tools:layout="@layout/fragment_blank" />  
  <fragment    android:id="@+id/homeFragment"  
    android:name="ab.yzq.tutor.customview.ui.main.HomeFragment"  
    android:label="HomeFragment" />  
  <fragment    android:id="@+id/mainFragment"  
    android:name="ab.yzq.tutor.customview.ui.main.MainFragment"  
    android:label="fragment_main"  
    tools:layout="@layout/fragment_main" />  
</navigation>
```

## HomeFragment
```kotlin
  
import android.os.Bundle  
import android.view.LayoutInflater  
import android.view.View  
import android.view.ViewGroup  
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
    val navController = findNavController()  
    binding.homeTv.setOnClickListener {  
      navController.navigate(R.id.mainFragment)  
    }  
  }  
}
```