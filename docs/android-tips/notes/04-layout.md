---
order: 4
---

# 布局笔记

## LinearLayout（线性布局）

```xml
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">  <!-- vertical 垂直 / horizontal 水平 -->

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="上"
        android:layout_weight="1" />  <!-- 权重 -->

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="下"
        android:layout_weight="2" />  <!-- 占2/3空间 -->

</LinearLayout>
```

### 权重（weight）说明

`layout_weight` 按比例分配剩余空间：
- 所有子 View 的 `weight` 之和为分母
- 各子 View 的 `weight` 为分子
- 设置为 `0dp` 时严格按比例分配

## RelativeLayout（相对布局）

```xml
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="400dp">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"  <!-- 水平居中 -->
        android:text="水平居中" />

    <TextView
        android:id="@+id/tv_center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"  <!-- 垂直居中 -->
        android:layout_centerHorizontal="true"
        android:text="完全居中" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/tv_center"     <!-- 在 tv_center 下方 -->
        android:layout_toStartOf="@id/tv_center" <!-- 在 tv_center 左侧 -->
        android:text="左下" />

</RelativeLayout>
```

### 常用属性

| 属性 | 说明 |
|------|------|
| `layout_centerHorizontal` | 水平居中 |
| `layout_centerVertical` | 垂直居中 |
| `layout_centerInParent` | 完全居中 |
| `layout_alignParentTop/Bottom/Left/Right` | 对齐父布局边 |
| `layout_below/above` | 在指定控件下方/上方 |
| `layout_toStartOf/toEndOf` | 在指定控件左边/右边 |
| `layout_alignTop/Bottom` | 顶部/底部对齐 |

## FrameLayout（帧布局）

所有子 View 默认叠放在左上角，适合层叠显示。

```xml
<FrameLayout
    android:layout_width="200dp"
    android:layout_height="200dp">

    <ImageView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:src="@drawable/bg" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|center_horizontal"
        android:text="底部文字" />

</FrameLayout>
```

## GridLayout（网格布局）

```xml
<GridLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:columnCount="2"
    android:rowCount="2">

    <TextView
        android:layout_columnWeight="1"
        android:layout_height="60dp"
        android:background="#555555"
        android:text="左上"
        android:textSize="20sp"
        android:gravity="center" />

    <TextView
        android:layout_columnWeight="1"
        android:layout_height="60dp"
        android:background="#009688"
        android:text="右上"
        android:textSize="20sp"
        android:gravity="center" />

    <TextView
        android:layout_columnWeight="1"
        android:layout_height="60dp"
        android:background="#9C27B0"
        android:text="左下"
        android:textSize="20sp"
        android:gravity="center" />

    <TextView
        android:layout_columnWeight="1"
        android:layout_height="60dp"
        android:background="#FFEB3B"
        android:text="右下"
        android:textSize="20sp"
        android:gravity="center" />

</GridLayout>
```

## 布局对比

| 布局 | 特点 | 适用场景 |
|------|------|---------|
| LinearLayout | 线性排列，支持权重 | 简单列表、表单 |
| RelativeLayout | 相对定位 | 复杂相对位置 |
| FrameLayout | 层叠显示 | 碎片容器、叠加层 |
| GridLayout | 网格排列 | 表格、计算器 |
| ConstraintLayout | 灵活约束，无嵌套 | 复杂布局（推荐） |

## 最佳实践

1. **优先使用 ConstraintLayout** — 减少嵌套，性能更好
2. **避免过度嵌套** — 嵌套过深影响渲染性能
3. **使用 `merge` 标签** — 减少不必要的布局层级
4. **使用 `include` 复用布局** — 提取公共布局