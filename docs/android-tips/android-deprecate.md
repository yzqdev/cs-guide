# 安卓已经弃用的

## `getDrawable(int id)`

虽然getDrawable(int id)已经废弃了，但是依旧还是可以用的。

如果你的Android版本比较高，那就按照官方的提示，可以使用`getDrawable(int, Theme)`替代。
使用drawable资源但不为其设置theme主题

```java
ResourcesCompat.getDrawable(getResources(), R.drawable.name, null);
```

使用默认的activity主题

```java
ContextCompat.getDrawable(getActivity(), R.drawable.name);
```

使用自定义主题

```java

ResourcesCompat.getDrawable(getResources(), R.drawable.name, anotherTheme);
```

为了兼容,可以使用

```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
    return resources.getDrawable(id, context.getTheme());
} else {
    return resources.getDrawable(id);
}

```

## onBackPress

```kotlin
  @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (mTag != "activity_constraint") {
            mTag = "activity_constraint"
            setContentView(mTag)
        } else {
            super.onBackPressed()
        }
    }

```

替代

```kotlin

# 在onCreate里面
onBackPressedDispatcher.addCallback(object: OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (mTag != "activity_constraint") {
                    mTag = "activity_constraint"
                    setContentView(mTag)
                } else {
                    
                }
            }

        })

```

## 创建menu
```kotlin
class Activity{
override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {  
    super.onCreateOptionsMenu(menu, inflater)  
    inflater.inflate(R.menu.menu, menu)  
}  
  
@Deprecated("Deprecated in Java")  
override fun onOptionsItemSelected(item: MenuItem): Boolean {  
    when (item.itemId) {  
        R.id.get -> GET()  
    
    }  
    return super.onOptionsItemSelected(item)  
}
}
```

替代为

```kotlin
class Fragment{
   fun onViewCreated(){


   requireActivity().addMenuProvider(object :MenuProvider{  
    override fun onCreateMenu(menu: Menu, menuInflater: MenuInflater) {  
       menuInflater.inflate(R.menu.menu_request_method, menu)  
    }  
  
    override fun onMenuItemSelected(menuItem: MenuItem): Boolean {  
        when (menuItem.itemId) {  
            R.id.get -> GET()  
            R.id.post -> POST()  
            R.id.head -> HEAD()  
            R.id.trace -> TRACE()  
            R.id.options -> OPTIONS()  
            R.id.delete -> DELETE()  
            R.id.put -> PUT()  
            R.id.patch -> PATCH()  
            R.id.json -> JSON()  
        }  
        return true  
    }  
 //下面表示只在当前fragment生效,关闭fragment menu消失
}, viewLifecycleOwner, Lifecycle.State.RESUMED)
 


   }

}
```
## handler()被弃用
### 使用java

```java
 
new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
    @Override
    public void run() {
        // Your Code
    }
}, 3000);
 
```
### 使用kotlin
```kotlin
```scss
Handler(Looper.getMainLooper()).postDelayed({
    // Your Code
}, 3000)
```
```