---
 
order: 1
 
---
# 应用程序

## 应用程序组件

应用程序组件是Android应用程序的基本构建块。这些组件与应用程序清单文件AndroidManifest.xml松散耦合，该清单文件描述了应用程序的每个组件以及它们如何交互。Android应用程序可以使用以下四个主要组件-

| 组件                    | 描述                                         |
| ----------------------- | -------------------------------------------- |
| **Activities**          | 它们指示UI，并处理与智能手机屏幕的用户交互。 |
| **Services**            | 它们处理与应用程序关联的后台处理。           |
| **Broadcast Receivers** | 它们处理Android OS与应用程序之间的通信。     |
| **Content Providers**   | 他们处理数据和数据库管理问题。               |

## Activities

**Activity**代表具有用户界面的单个屏幕，简而言之，活动在屏幕上执行操作。例如，电子邮件应用程序可能具有一个显示新电子邮件列表的Activity，用于撰写电子邮件的另一 Activity 以及用于阅读电子邮件的另一 Activity。如果一个应用程序有多个Activity，则应将其中一个标记为启动该应用程序时显示的 Activity。

Activity被实现为Activity类的子类，如下所示-

```java
public class MainActivity extends Activity { 
}
```



## Services

**Service**是在后台运行以执行长时间运行的操作的组件。例如，服务可能会在用户处于其他应用程序中时在后台播放音乐，或者可能会在不阻止用户与 Activity 交互的情况下通过网络获取数据。

Service被实现为Service类的子类，如下所示-

```java
public class MyService extends Service {
}
```



## Broadcast Receivers(广播接收器)

**广播接收器**仅响应来自其他应用程序或系统的广播消息。例如，应用程序还可以启动广播，以使其他应用程序知道某些数据已下载到设备并可供他们使用，因此，这是广播接收器，它将拦截此通信并启动适当的操作。

广播接收器被实现为BroadcastReceiver类的子类，并且每个消息都被广播为**Intent**对象。

```java
public class MyReceiver  extends  BroadcastReceiver {
   public void onReceive(context,intent){}
}
```



## Content Providers(内容提供者)

**内容提供者**组件应要求将数据从一个应用程序提供给其他应用程序。此类请求由**ContentResolver**类的方法处理。数据可以存储在文件系统，数据库或其他任何地方。内容提供程序作为**ContentProvider**类的子类实现，并且必须实现一组标准的API，这些API可使其他应用程序执行事务。

```java
public class MyContentProvider extends  ContentProvider {
   public void onCreate(){}
}
```



我们将在各个章节中详细介绍这些标签，同时涵盖应用程序组件。

## 附加组件

在上述实体的构造，其逻辑以及它们之间的接线中将使用其他组件。这些成分是-

| 组件          | 描述                                         |
| ------------- | -------------------------------------------- |
| **Fragments** | 表示Activity中用户界面的一部分。             |
| **Views**     | 在屏幕上绘制的UI元素，包括按钮，列表表单等。 |
| **Layouts**   | 用于控制屏幕格式和视图外观的视图层次结构。   |
| **Intents**   | 提示将组件连接在一起。                       |
| **Resources** | 外部元素，例如字符串，常量和可绘制图片。     |
| **Manifest**  | 应用程序的配置文件。                         |
