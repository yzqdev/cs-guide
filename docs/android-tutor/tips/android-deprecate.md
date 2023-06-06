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
