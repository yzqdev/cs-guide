---
order: 3
---

# Flutter 与原生 Android 组件对比

| Flutter Widget             | Android Widget                                  |
| -------------------------- | ----------------------------------------------- |
| AppBar                     | ActionBar/ToolBar                               |
| ListView                   | ListView/RecyclerView                           |
| Text                       | TextView                                        |
| Center                     | ViewGroup                                       |
| FloatingActionButton       | FloatingActionButton（来自设计库）              |
| BottomNavigationBar        | BottomNavigation（来自设计库）                  |
| RaisedButton/Button        | Button                                          |
| Column                     | LinearLayout 的 android:orientation="vertical"  |
| Row                        | android:orientation="horizontal"                |
| DecorationImage            | ImageView                                       |
| Image                      | ImageView                                       |
| Stack                      | FrameLayout/RelativeLayout                      |
| Container                  | RelativeLayout                                  |
| CustomMultiChildLayout     | RelativeLayout                                  |
| Align                      | alignParentXXX 属性                             |
| resizeToAvoidBottomPadding | android:windowSoftInputMode="adjustResize" 属性 |
| SingleChildScrollView      | ScrollView                                      |
| CustomScrollerView         | Recyclerview                                    |

---

Image 中 BoxFit 参数介绍（相当于 Android ImageView 的 scaleType 参数）

// fill - 通过扭曲源图像的宽高比来填充目标框

![](https://flutter.github.io/assets-for-api-docs/assets/painting/box_fit_fill.png)

/// contain - 尽可能大，同时仍然将源图像完全包含在目标框中。

![](https://flutter.github.io/assets-for-api-docs/assets/painting/box_fit_contain.png)

/// cover - 尽可能小，同时仍然覆盖整个目标框。

![](https://flutter.github.io/assets-for-api-docs/assets/painting/box_fit_cover.png)

/// fitWidth - 确保显示源的完整宽度，无论这是否意味着源在垂直方向上超出目标框。

![](https://flutter.github.io/assets-for-api-docs/assets/painting/box_fit_fitWidth.png)

/// fitHeight - 确保显示源的完整高度，无论这是否意味着源在水平方向上超出目标框。

![](https://flutter.github.io/assets-for-api-docs/assets/painting/box_fit_fitHeight.png)

/// none - 在目标框内对齐源图像（默认为居中），并丢弃任何超出目标框的部分。源图像不会调整大小。

![](https://flutter.github.io/assets-for-api-docs/assets/painting/box_fit_none.png)

/// scaleDown - 在目标框内对齐源图像（默认为居中），如有必要，缩小源图像以确保其适合目标框。如果缩小图像，效果等同于 contain，否则等同于 none。

![](https://flutter.github.io/assets-for-api-docs/assets/painting/box_fit_scaleDown.png)
