# 片段

## Android 片段（Fragment）
  
 :::tip
  片段（Fragment） 是activity的一部分，这使得拥有更多的模块化activity设计。如果我们说片段（Fragment）是一种子Activity，那是没有错的。
  :::
  以下是有关片段(Fragment)的重点-
  
- 片段具有自己的布局和行为，以及自己的生命周期回调。
- 您可以在Activity运行时在Activity中添加或删除片段。
- 您可以在一个Activity中组合多个片段以构建多窗格UI。
- 一个片段可以用于多个Activity。
- 片段生命周期与其宿主Activity的生命周期密切相关，这意味着当Activity暂停时，Activity中所有可用的片段也将停止。
- 片段可以实现没有用户界面组件的行为。
- 片段已添加到Android版本的Honeycomb版本（版本为11）的Android API中。
- 您可以通过扩展**Fragment**类来创建片段，并且可以通过在Activity的布局文件中将片段声明为`<fragment>`元素，将片段插入到Activity布局中。
  
  在引入片段之前，我们有一个局限性，因为我们只能在一个给定的时间点在屏幕上显示单个Activity。因此，我们无法划分设备屏幕并分别控制不同的部分。但是随着片段的引入，我们获得了更大的灵活性，并消除了一次只能在屏幕上进行单个Activity的限制。现在我们可以有一个Activity，但是每个Activity可以包含多个片段，这些片段将具有自己的布局，事件和完整的生命周期。
  
  以下是一个典型示例，说明如何将由片段定义的两个UI模块组合到一个Activity中以进行平板电脑设计，而如何将其分开以进行手机设计。
  
  ![fragment](https://www.jc2182.com/images/android/fragment.jpg)
  
  在平板电脑大小的设备上运行时，该应用程序可以在Activity A中嵌入两个片段。但是，在手机大小的屏幕上，两个片段都没有足够的空间，因此Activity A仅包含文章列表中的片段，并且当用户选择文章时，它会启动Activity B，其中包含要读取的第二个片段文章。
  
## 片段生命周期
  
  Android片段的生命周期与android Activity非常相似。本节简要介绍了其生命周期的不同阶段。
  
  ![fragment](https://www.jc2182.com/images/android/fragment1.jpg)
  
  这是您可以在**Fragment**类中覆盖的方法的列表-
  
- **onAttach()** - 片段实例与Activity实例相关联。片段和Activity未完全初始化。通常，您在此方法中获得对Activity的引用，该Activity使用该片段进行进一步的初始化工作。
- **onCreate()** - 系统在创建片段时调用此方法。您应该初始化在暂停或停止然后恢复片段时要保留的片段的基本组件。
- **onCreateView()** - 当片段第一次绘制其用户界面时，系统将调用此回调。要为片段绘制UI，必须从此方法返回一个View组件，该组件是片段布局的根。如果片段不提供UI，则可以返回null。
- **onActivityCreated()** - 创建主机Activity时，将在**onCreateView()** 方法之后调用**onActivityCreated()** 。Activity和片段实例以及Activity的视图层次结构已创建。此时，可以使用**findViewById()** 方法访问视图。例。在这种方法中，您可以实例化需要Context对象的对象
- **onStart()** - 一旦片段可见，就会调用**onStart()** 方法。
- **onResume()** - 片段变为Activity状态。
- **onPause()** - 系统调用此方法作为用户离开该片段的第一个指示。通常，这是您应提交应保留在当前用户会话之外的任何更改的地方。
- **onStop()** - 片段将通过调用**onStop()** 来停止
- **onDestroyView()** - 片段视图将在调用此方法后销毁
- **onDestroy()** - **onDestroy()** 被调用以对片段的状态进行最终清理，但不能保证由Android平台调用。

## 如何使用片段？
  
  这涉及创建片段的简单步骤。
  
- 首先，确定要在一个Activity中使用多少个片段。例如，让我们使用两个片段来处理设备的横向和纵向模式。
- 接下来根据片段的数量，创建将扩展Fragment类的类。Fragment类具有上面提到的回调函数。您可以根据需要覆盖任何方法。
- 对应于每个片段，您将需要在XML文件中创建布局文件。这些文件将具有定义的片段的布局。
- 最后，修改Activity文件，以根据您的需求定义替换片段的实际逻辑。

## 片段类型
  
  片段基本上分为三个阶段，如下所示。
  
- [单帧片段](https://www.jc2182.com/andriod/android-single-fragments.html) - 单帧片段用于手持设备（如手机），在这里我们只能显示一个片段。
- [列表片段](https://www.jc2182.com/andriod/android-list-fragment.html) - 具有特殊列表视图的片段称为列表片段
- [片段事务](https://www.jc2182.com/andriod/android-fragment-transitions.html) - 与片段事务一起使用。我们可以将一个片段移动到另一个片段。
