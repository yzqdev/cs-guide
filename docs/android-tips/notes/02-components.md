---
order: 2
---

# 常用控件笔记

## Button

```xml
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="按钮"
    android:textAllCaps="false"  <!-- 关闭英文自动大写 -->
    android:backgroundTint="@color/primary" />
```

```kotlin
button.setOnClickListener {
    // 点击事件
}
```

## TextView

```xml
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Hello World"
    android:textSize="16sp"
    android:textColor="@color/black"
    android:maxLines="2"
    android:ellipsize="end" />  <!-- 超出省略号 -->
```

## EditText

```xml
<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="请输入内容"
    android:inputType="text"
    android:maxLines="3" />
```

```kotlin
val text = editText.text.toString()
```

## ImageView

```xml
<ImageView
    android:layout_width="100dp"
    android:layout_height="100dp"
    android:src="@drawable/ic_launcher"
    android:scaleType="centerCrop" />
```

```kotlin
// 加载网络图片（需要 Glide 或 Coil）
// Glide
Glide.with(this).load(url).into(imageView)

// Coil
imageView.load(url)
```

## RecyclerView

```xml
<androidx.recyclerview.widget.RecyclerView
    android:id="@+id/recyclerView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

```kotlin
recyclerView.layoutManager = LinearLayoutManager(this)
recyclerView.adapter = MyAdapter(dataList)
```

## 常用属性速查

| 控件 | 重要属性 |
|------|---------|
| Button | `textAllCaps`, `backgroundTint` |
| TextView | `maxLines`, `ellipsize`, `textSize` |
| EditText | `hint`, `inputType`, `maxLength` |
| ImageView | `scaleType`, `src` |
| RecyclerView | `layoutManager`, `adapter` |
| ProgressBar | `max`, `progress`, `indeterminate` |
| Switch | `checked`, `thumbTint`, `trackTint` |
| SeekBar | `max`, `progress`, `OnSeekBarChangeListener` |