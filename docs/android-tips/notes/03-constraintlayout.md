---
order: 3
---

# 约束布局笔记

## 简介

ConstraintLayout 是 Android 中最灵活的布局方式，通过约束关系定位子 View 的位置，避免嵌套布局。

## 添加依赖

```groovy
// build.gradle (module)
implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
```

## 基本约束

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!-- 相对父布局 -->
    <Button
        android:id="@+id/btn1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="按钮1"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <!-- 相对其他控件 -->
    <Button
        android:id="@+id/btn2"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="按钮2"
        app:layout_constraintStart_toEndOf="@id/btn1"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="@id/btn1" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## 常用约束属性

| 属性 | 说明 |
|------|------|
| `layout_constraintStart_toStartOf` | 左边对齐到某控件左边 |
| `layout_constraintStart_toEndOf` | 左边对齐到某控件右边 |
| `layout_constraintEnd_toEndOf` | 右边对齐到某控件右边 |
| `layout_constraintEnd_toStartOf` | 右边对齐到某控件左边 |
| `layout_constraintTop_toTopOf` | 上边对齐到某控件上边 |
| `layout_constraintTop_toBottomOf` | 上边对齐到某控件下边 |
| `layout_constraintBottom_toBottomOf` | 下边对齐到某控件下边 |
| `layout_constraintBottom_toTopOf` | 下边对齐到某控件上边 |
| `layout_constraintBaseline_toBaselineOf` | 文字基线对齐 |

## 居中对齐

```xml
<!-- 水平居中 -->
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintEnd_toEndOf="parent"

<!-- 垂直居中 -->
app:layout_constraintTop_toTopOf="parent"
app:layout_constraintBottom_toBottomOf="parent"

<!-- 完全居中（同时使用以上四个） -->
```

## 比例约束

```xml
<ImageView
    android:layout_width="0dp"
    android:layout_height="0dp"
    app:layout_constraintDimensionRatio="16:9"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintBottom_toBottomOf="parent" />
```

## 链（Chain）

```xml
<!-- 创建水平链：两个控件互相约束 -->
<Button android:id="@+id/btnA" ... 
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintEnd_toStartOf="@id/btnB" />
<Button android:id="@+id/btnB" ...
    app:layout_constraintStart_toEndOf="@id/btnA"
    app:layout_constraintEnd_toEndOf="parent" />

<!-- 链样式：在第一个控件上设置 -->
app:layout_constraintHorizontal_chainStyle="spread"  <!-- 默认：均匀分布 -->
app:layout_constraintHorizontal_chainStyle="spread_inside"  <!-- 两端贴边 -->
app:layout_constraintHorizontal_chainStyle="packed"  <!-- 居中紧凑 -->
```

## 参考链接

- [ConstraintLayout 官方文档](https://developer.android.com/reference/androidx/constraintlayout/widget/ConstraintLayout)
- [掘金教程](https://juejin.cn/post/6949186887609221133)