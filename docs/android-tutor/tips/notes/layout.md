# 布局

## linearlayout

竖向`android:orientation="vertical"`  
根据`android:layout_weight`确定长宽比例

## relativelayout

添加`android:layout_centerVertical="true"`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="400dp"
    tools:context=".RelativeLayoutActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:text="中间"
        android:textSize="20sp" />

    <TextView
        android:id="@+id/tv_center_vertical"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:text="下面" />

    <TextView
        android:id="@+id/tv_center_center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true"
        android:text="中间中间" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignBottom="@+id/tv_center_center"
        android:layout_toStartOf="@+id/tv_center_center"
        android:text="中间的左边" />    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/tv_center_center"
        android:layout_toLeftOf="@+id/tv_center_center"
        android:text="中间的下面" />
</RelativeLayout>

```

## gridlayout

```xml
<?xml version="1.0" encoding="utf-8"?>
<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:columnCount="2"
    android:rowCount="2"
    tools:context=".GridLayoutActivity">

    <TextView
        android:layout_columnWeight="1"
        android:layout_height="60dp"
        android:background="#555555"
        android:text="左上"
        android:textSize="20sp" />

    <TextView
      
        android:layout_height="60dp"
        android:layout_columnWeight="1"
        android:background="#009688"
        android:text="右上"
        android:textSize="20sp" />

    <TextView
        android:layout_columnWeight="1"
        android:layout_height="60dp"
        android:background="#9C27B0"
        android:text="左下"
        android:textSize="20sp" />

    <TextView
        android:layout_columnWeight="1"
        android:layout_height="60dp"
        android:background="#FFEB3B"
        android:text="右下"
        android:textSize="20sp" />
</GridLayout>

```
