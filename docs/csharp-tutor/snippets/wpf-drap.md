# 拖动事件

> 当产品间需要交互实现数据传递，或产品需要从外部导入文件时，通过控件拖拽来实现是个不错的选择。在UI上支持控件拖拽，可极大提升用户体验。
> 拖拽本身并不神秘，它的本质实际是一个数据交换的过程。控件接受从其他地方来的数据，并进行处理。数据交换有多种方法，Windows中剪贴板可能就是用的最多，但最不被注意的一种方法。
> 下面介绍用C#实现控件拖拽，并通过剪切板交换数据。

# **控件拖拽触发/响应函数**

对于拖拽的对象，需要在**MouseDown**或**ItemDrag**中调用**DoDragDrop**，传递要拖拽的数据对象并触发拖拽。总的来说，当用户调用DoDragDrop方法后，就进入到一个循环中。 循环会一直跟踪鼠标，检查鼠标所在的窗体是否实现IDropTarget，如果实现了则：调用**DropEnter**，并通过调用GiveFeedBack来显示效果；鼠标在控件上时，调用**DropOver**，也是通过GiveFeedBack来显示效果；在拖拽过程中，键盘或鼠标按键发生变化，可以通过QueryContinueDrag来检查是否能继续操作，根据不同的返回结果，调用**DropOver**或**DropLeave**；鼠标释放时触发**DragDrop**事件，执行拖拽逻辑。

- **DragEnter、DragOver、DragLeave事件**
   **触发：** 当用鼠标拖拽一个对象到控件的窗口时，首先触发DragEnter，然后是DragOver，拖放对象悬浮于拖放区域，在拖放区域内移动时多次触发DragOver，当离开窗体时触发DragLeave。
   **作用：** 设置判断对象是否是要接受的类型以及鼠标的样式。
- **DragDrop事件**  
   **触发：** 当用户拖拽对象到控件上，并释放时触发。
   **作用：** 接受拖拽数据，实现拖拽逻辑

# **实现控件拖拽的典型流程**

1. **设置AllowDrop**  
    在对一个控件进行拖拽编程时，我们必须把AllowDrop属性设置为True
2. **拖动对象触发DragDrop**

```csharp
private void listBox1_MouseDown(object sender, System.Windows.Forms.MouseEventArgs e)
{
    this.listBox1.DoDragDrop("Drag Data", DragDropEffects.Move);
}
```

1. **拖到目标响应DragDrop**

```csharp
private void listBox2_DragEnter(object sender, System.Windows.Forms.DragEventArgs e)
{
    if (e.Data.GetDataPresent(DataFormats.Text))
    {
        //设置DragDrop效果
        e.Effect = DragDropEffects.Move;
    }
}

private void listBox2_DragDrop(object sender, System.Windows.Forms.DragEventArgs e)
{
    //执行DragDrop逻辑
    this.listBox2.Items.Add(e.Data.GetData(DataFormats.Text));
    this.listBox1.Items.Remove(e.Data.GetData(DataFormats.Text));
}
```

# **控件拖拽的参数**

```kotlin
public DragDropEffects DoDragDrop ( Object data,DragDropEffects allowedEffects)
```

- **data：**户所要拖动的数据内容。必须将所要拖动的内容传入到这个方法的第一个参数位置。并不是必须得，比如在不同应用间传递数据时，可以借由[剪切板](https://www.jianshu.com/p/b60b77fcb2a3)。

# **控件拖拽的特效**

控件拖拽的特效由DragDropEffects枚举来指定。

- **DragDropEffects说明**

| 成员名称 | 说明                                                                         |
| -------- | :--------------------------------------------------------------------------- |
| All      | Copy、Move 和 Scroll 效果的组合                                              |
| Copy     | 将拖动源中的数据复制到放置目标，图标为一个框右上角带+                        |
| Link     | 将拖动源中的数据链接到放置目标，图标为数据快捷图标                           |
| Move     | 将拖动源的数据移动到放置目标，图标为一个框                                   |
| None     | 放置目标不接受该数据，图标为禁止标识                                         |
| Scroll   | 拖动时，如果有滚动条目，可以滚动目标，以定位在目标中当前不可见的某个放置位置 |

 [Demo](https://github.com/xiong-ang/CShape_SLN)

- 界面

  ![img](https://github.com/xiong-ang/CShape_SLN/blob/master/Image/DragDrop.PNG?raw=true)

- **功能**  
   实现文件的拖拽以及应用程序之间的拖拽。
