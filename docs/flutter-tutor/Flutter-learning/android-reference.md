---
order: 3
---

# Android Developer Reference

This document is from: <http://doc.flutter-dev.cn/flutter-for-android/

For the original English version, please see: <https://flutter.io/flutter-for-android/

Since the Chinese documentation is translated from the official English website, it may not be the latest. It is recommended to check the original English version.

---

This document is intended for Android developers who can apply their existing Android knowledge to Flutter and build mobile applications. If you understand the basics of the Android framework, you can use this article as an introduction to Flutter development.

Your existing Android knowledge and skills are highly valuable for building Flutter applications. Because Flutter relies on the operating system to provide numerous features and related configurations. Flutter is a new way to build UI for mobile devices, but besides UI construction, it also has a plugin system for communicating with Android or iOS systems. If you are an Android expert, you don't need to learn everything about Flutter.

---

Table of Contents:

## 1. View

#### What is the equivalent of View in Android in Flutter?

#### How to update a Widget?

#### How to use Widgets for layout? Do I need XML layout files?

#### How to add or remove widgets in a layout?

#### In Android, you can use View.animate() to animate a View. How do you animate a Widget in Flutter?

#### How to draw using Canvas?

#### How to build a custom Widget?

## 2. Intents

#### What is the equivalent of Intent in Android in Flutter?

#### How to handle incoming Intents in Flutter?

#### How to implement startActivityForResult in Flutter?

## 3. Async UI

#### What is the equivalent of runOnUiThread in Flutter?

#### What is the equivalent of Android's AsyncTask or IntentService in Flutter?

#### What is the equivalent of Android's OkHttp in Flutter?

#### How to show progress when a task is executing in Flutter?

## 4. Project Structure & Resources

#### Where should resolution-dependent image resources be stored (hdpi/xxhdpi)?

#### How to store strings, and how to store strings in different languages?

#### What is the equivalent of Android's Gradle files in Flutter?

## 5. Activities and Fragments

#### What is the equivalent of Android's Activity and Fragment in Flutter?

#### How to listen to Android Activity lifecycle?

## 6. Layout

#### What is the equivalent of Android's LinearLayout in Flutter?

#### What is the equivalent of Android's RelativeLayout in Flutter?

#### What is the equivalent of Android's ScrollView in Flutter?

## 7. Gesture Detection & Touch Event Handling

#### How to add an onClick listener to a Widget in Flutter?

#### How to handle other gestures on a Widget?

## 8. ListView and Adapter

#### What is the equivalent of Android's ListView in Flutter?

#### How to know when a ListView item is clicked?

#### How to dynamically update a ListView?

## 9. Text Usage

#### How to customize fonts for Text?

#### How to customize the display style of Text?

## 10. Forms

#### What is the equivalent of Android's hint in Flutter?

#### How to display form validation error messages?

## 11. Flutter Plugins

#### How to use GPS?

#### How to use the camera?

#### How to use Facebook login?

#### How to build your own plugin?

#### How to use NDK in Flutter?

## 12. Theme

#### How to customize a Material-style app?

## 13. Database & Local Storage

#### How to use Shared Preferences in Flutter?

#### How to use SQLite in Flutter?

## 14. Notifications

#### How to set up and push notifications?

---

## 1. View

#### What is the equivalent of View in Android in Flutter?

In Android, View is the foundation for displaying content on the screen. Buttons, toolbars, and input fields are all concrete implementations of View. In Flutter, the equivalent of View is Widget. However, Widgets have some differences compared to Views. First, Widget instances only exist between frames, and Flutter actively creates a Widget tree for the next frame's rendering between each frame. In contrast, when drawing Views on Android, the view will not redraw unless the `invalidate` method is called.

In Android, Views are mutable, while in Flutter, Widgets are immutable. This characteristic makes Flutter Widgets very lightweight.

#### How to update a Widget?

In Android, you can directly update the state of Views. But in Flutter, Widgets are immutable, so you cannot update them directly. If you need to update a Widget, you must use State.

This introduces the two classes `StatefulWidget` and `StatelessWidget`. Literally, `StatelessWidget` has no internal state, meaning it is immutable. `StatefulWidget` has state, meaning it can be refreshed.

When the UI elements you build have some parts that are immutable, using StatelessWidget is a good choice.

For example, in Android, you would typically display an app's logo through an ImageView. Since the logo generally doesn't change, in Flutter you can use a StatelessWidget to display your logo.

If you want to refresh the UI based on data obtained from HTTP requests or user interaction, you need to use StatefulWidget and actively tell the underlying Flutter that the Widget's state has changed. Only then will Flutter refresh the corresponding Widget.

There is an important point to note here: the core content of StatelessWidget and StatefulWidget is the same; they are both reconstructed in each frame. The difference is that StatefulWidget has a State object that can store data for the StatefulWidget between frames.

If you're still confused, just remember: if a Widget changes, it has state. But if a child Widget is stateful while its parent Widget is immutable, the parent Widget can still be a StatelessWidget.

Now let's see how to use StatelessWidget. Text is a common StatelessWidget. If you look at its source code, you'll find that Text is a subclass of StatelessWidget.

```dart
new Text(
  'I like Flutter!',
  style: new TextStyle(
    fontWeight: FontWeight.bold,
  ),
);
```

As you can see, Text has no state information; it merely displays the information passed to it through the constructor.

But what if you want to change 'I like Flutter!' by clicking a button?

The answer is to wrap the Text with a StatefulWidget and refresh the Text content through button clicks.

The code is as follows:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default placeholder text
  String textToShow = "I Like Flutter";

  void _updateText() {
    setState(() {
      // update the text
      textToShow = "Flutter is Awesome!";
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new Center(child: new Text(textToShow)),
      floatingActionButton: new FloatingActionButton(
        onPressed: _updateText,
        tooltip: 'Update Text',
        child: new Icon(Icons.update),
      ),
    );
  }
}
```

#### How to use Widgets for layout? Do I need XML layout files?

In Android, UI layouts are typically done using XML, but in Flutter, UI layout is achieved by building a Widget tree in Dart files.

Here is a simple example to display a button centered on the screen.

```dart
@override
Widget build(BuildContext context) {
  return new Scaffold(
    appBar: new AppBar(
      title: new Text("Sample App"),
    ),
    body: new Center(
      child: new MaterialButton(
        onPressed: () {},
        child: new Text('Hello'),
        padding: new EdgeInsets.only(left: 10.0, right: 10.0),
      ),
    ),
  );
}
```

You can view all layouts provided by Flutter at [http://doc.flutter-dev.cn/widgets/layout/](http://doc.flutter-dev.cn/widgets/layout/):

#### How to add or remove widgets in a layout?

In Android, you can add or remove child views by calling the parent layout's `addChild` or `removeChild` methods. But in Flutter, Widgets are immutable, so there are no `addChild` or `removeChild` methods. Instead, you can pass a function to the parent widget that returns a child Widget to the parent Widget. Within this function, you can control the creation of the child Widget using a boolean value.

The following example shows how to toggle between different child Widgets by pressing a button:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default value for toggle
  bool toggle = true;
  void _toggle() {
    setState(() {
      toggle = !toggle;
    });
  }

  _getToggleChild() {
    if (toggle) {
      return new Text('Toggle One');
    } else {
      return new MaterialButton(onPressed: () {}, child: new Text('Toggle Two'));
    }
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new Center(
        child: _getToggleChild(),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _toggle,
        tooltip: 'Update Text',
        child: new Icon(Icons.update),
      ),
    );
  }
}
```

#### In Android, you can use View.animate() to animate a View. How do you animate a Widget in Flutter?

In Flutter, you can use the `animation` library to animate Widgets.

In Android, you can create animations through XML, or call the `animate()` method on a View. In Flutter, you need to wrap the Widget as a child of AnimationWidget to produce animations.

Similar to Android, Flutter has AnimationController and Interpolator, both extending the Animation class. To implement an animation, you can pass AnimationController and Animation to AnimationWidget, and start the animation through AnimationController.

The following example shows how to write an animation with fade-in and fade-out effects:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(new FadeAppTest());
}

class FadeAppTest extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Fade Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyFadeTest(title: 'Fade Demo'),
    );
  }
}

class MyFadeTest extends StatefulWidget {
  MyFadeTest({Key key, this.title}) : super(key: key);
  final String title;
  @override
  _MyFadeTest createState() = new _MyFadeTest();
}

class _MyFadeTest extends State<MyFadeTest> with TickerProviderStateMixin {
  AnimationController controller;
  CurvedAnimation curve;

  @override
  void initState() {
    controller = new AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
    curve = new CurvedAnimation(parent: controller, curve: Curves.easeIn);
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
          child: new Container(
              child: new FadeTransition(
                  opacity: curve,
                  child: new FlutterLogo(
                    size: 100.0,
                  )))),
      floatingActionButton: new FloatingActionButton(
        tooltip: 'Fade',
        child: new Icon(Icons.brush),
        onPressed: () {
          controller.forward();
        },
      ),
    );
  }
}
```

Refer to [http://doc.flutter-dev.cn/widgets/animation/](http://doc.flutter-dev.cn/widgets/animation/) and [http://doc.flutter-dev.cn/tutorials/animation](http://doc.flutter-dev.cn/tutorials/animation) for more details about animations.

#### How to draw using Canvas?

In Android, you can use Canvas for custom drawing.

In Flutter, the `CustomPaint` and `CustomPainter` classes help you draw on Canvas.

Check the following link to learn how to use the above two classes to implement a signature feature:
<https://stackoverflow.com/questions/46241071/create-signature-area-for-mobile-app-in-dart-flutter>

Example code:

```dart
import 'package:flutter/material.dart';

void main() = runApp(new MaterialApp(home: new DemoApp()));

class DemoApp extends StatelessWidget {
  Widget build(BuildContext context) = new Scaffold(body: new Signature());
}

class Signature extends StatefulWidget {
  SignatureState createState() = new SignatureState();
}

class SignatureState extends State<Signature> {
  List<Offset> _points = <Offset>[];
  Widget build(BuildContext context) {
    return new GestureDetector(
      onPanUpdate: (DragUpdateDetails details) {
        setState(() {
          RenderBox referenceBox = context.findRenderObject();
          Offset localPosition =
          referenceBox.globalToLocal(details.globalPosition);
          _points = new List.from(_points)..add(localPosition);
        });
      },
      onPanEnd: (DragEndDetails details) = _points.add(null),
      child: new CustomPaint(painter: new SignaturePainter(_points)),
    );
  }
}

class SignaturePainter extends CustomPainter {
  SignaturePainter(this.points);
  final List<Offset> points;
  void paint(Canvas canvas, Size size) {
    var paint = new Paint()
      ..color = Colors.black
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 5.0;
    for (int i = 0; i < points.length - 1; i++) {
      if (points[i] != null && points[i + 1] != null)
        canvas.drawLine(points[i], points[i + 1], paint);
    }
  }
  bool shouldRepaint(SignaturePainter other) = other.points != points;
}
```

#### How to build a custom Widget?

In Android, you typically build a custom View by inheriting from View or its subclasses.

In Flutter, building a custom Widget typically uses the approach of `composing other Widgets` rather than traditional inheritance.

Let's see how to build a custom button that displays the text passed to its constructor as the button text. Here we can see that it is implemented by combining the two, rather than inheriting from RaisedButton.

```dart
class CustomButton extends StatelessWidget {
  final String label;
  CustomButton(this.label);

  @override
  Widget build(BuildContext context) {
    return new RaisedButton(onPressed: () {}, child: new Text(label));
  }
}
// Now you can use CustomButton just like any other Widget:
@override
  Widget build(BuildContext context) {
    return new Center(
      child: new CustomButton("Hello"),
    );
  }
}
```

## 2. Intents

#### What is the equivalent of Intent in Android in Flutter?

In Android, Intent has two main uses: switching between Activities and calling external components. Flutter doesn't have the concept of Intent, but if needed, Flutter can indirectly use Intent through plugins.

In Flutter, you can switch between screens using `Route`. It's also worth noting that when managing multiple screens in Flutter, there are two important concepts: `Route` and `Navigator`. A `Route` represents a screen (similar to an Activity), while `Navigator` is a Widget that manages Routes. Navigator can switch between screens using `pop` and `push` methods.

Similar to how you can define Activities in AndroidManifest.xml in Android, in Flutter, you can add a collection of Route mappings to the root of MaterialApp.

```dart
void main() {
  runApp(new MaterialApp(
    home: new MyAppHome(), // becomes the route named '/'
    routes: <String, WidgetBuilder>{
      '/a': (BuildContext context) = new MyPage(title: 'page A'),
      '/b': (BuildContext context) = new MyPage(title: 'page B'),
      '/c': (BuildContext context) = new MyPage(title: 'page C'),
    },
  ));
}
```

Then you can manipulate Routes as follows:

```dart
    Navigator.of(context).pushNamed('/b');
```

Another practical use of Intent is to call external components, such as the Camera or file picker. To implement similar functionality in Flutter, you need to integrate existing libraries or re-implement them in the platform code.

See the [Developing Packages](http://doc.flutter-dev.cn/developing-packages/) section to learn how to integrate platform native functionality.

#### How to handle incoming Intents in Flutter?

Flutter can interact with the Android layer to share incoming Intents.

In the following example, we register an Intent filter for sending text in AndroidManifest.xml, and then the Android layer of the app can share the incoming text with the Flutter layer.

The basic flow of the example below is: first, we process the data from the Intent on the Android layer, and then when the Flutter layer sends a request, the text is passed to the Flutter layer through `MethodChannel`.

First, register the Intent in AndroidManifest.xml.

```xml
<activity
    android:name=".MainActivity"
    android:launchMode="singleTop"
    android:theme="@style/LaunchTheme"
    android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection"
    android:hardwareAccelerated="true"
    android:windowSoftInputMode="adjustResize">
    <!-- This keeps the window background of the activity showing
        until Flutter renders its first frame. It can be removed if
        there is no splash screen (such as the default splash screen
        defined in @style/LaunchTheme). -->
    <meta-data
       android:name="io.flutter.app.android.SplashScreenUntilFirstFrame"
       android:value="true" />
    <intent-filter>
       <action android:name="android.intent.action.MAIN"/>
       <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
    <intent-filter>
       <action android:name="android.intent.action.SEND" />
       <category android:name="android.intent.category.DEFAULT" />
       <data android:mimeType="text/plain" />
    </intent-filter>
</activity>
```

Then, in MainActivity, process the received text information, save it, and pass it to the Flutter layer when requested.

```java
package com.yourcompany.shared;

import android.content.Intent;
import android.os.Bundle;

import java.nio.ByteBuffer;

import io.flutter.app.FlutterActivity;
import io.flutter.plugin.common.ActivityLifecycleListener;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugins.GeneratedPluginRegistrant;

public class MainActivity extends FlutterActivity {
    String sharedText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        GeneratedPluginRegistrant.registerWith(this);
        Intent intent = getIntent();
        String action = intent.getAction();
        String type = intent.getType();

        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if ("text/plain".equals(type)) {
                handleSendText(intent); // Handle text being sent
            }
        }

        new MethodChannel(getFlutterView(), "app.channel.shared.data").setMethodCallHandler(new MethodChannel.MethodCallHandler() {
            @Override
            public void onMethodCall(MethodCall methodCall, MethodChannel.Result result) {
                if (methodCall.method.contentEquals("getSharedText")) {
                    result.success(sharedText);
                    sharedText = null;
                }
            }
        });
    }

    void handleSendText(Intent intent) {
        sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
    }
}
```

Finally, on the Flutter side, you can request the text in `initState`.

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample Shared App Handler',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  static const platform = const MethodChannel('app.channel.shared.data');
  String dataShared = "No data";

  @override
  void initState() {
    super.initState();
    getSharedText();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(body: new Center(child: new Text(dataShared)));
  }

  getSharedText() async {
    var sharedData = await platform.invokeMethod("getSharedText");
    if (sharedData != null) {
      setState(() {
        dataShared = sharedData;
      });
    }
  }
}
```

#### How to implement startActivityForResult in Flutter?

You can use the Future returned by the Navigator's push method to get the return data from the page.

For example, if you want to launch a location selection screen and get the user's selection result, you can use the following method:

```dart
Map coordinates = await Navigator.of(context).pushNamed('/location');
```

Then, on the location selection screen, when the user finishes selecting a location, you can call the following method to pass the result back to the `coordinates` above.

```dart
Navigator.of(context).pop({"lat":43.821757,"long":-79.226392});
```

## 3. Async UI

#### What is the equivalent of runOnUiThread in Flutter?

Dart has a single-threaded execution model, supporting Isolate (a multi-threaded model), event loops, and asynchronous programming. Unless you use Isolate, your Dart code runs on the UI thread and is driven by an event loop.

For example, you can make a network request on the UI thread without blocking it:

```dart
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = JSON.decode(response.body);
  });
}
```

Calling the setState method triggers a rebuild of the interface to refresh and update the data.

Here is a complete example of getting network data and updating it on a ListView:

```dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Sample App"),
        ),
        body: new ListView.builder(
            itemCount: widgets.length,
            itemBuilder: (BuildContext context, int position) {
              return getRow(position);
            }));
  }

  Widget getRow(int i) {
    return new Padding(
        padding: new EdgeInsets.all(10.0),
        child: new Text("Row ${widgets[i]["title"]}")
    );
  }

  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = JSON.decode(response.body);
    });
  }
}
```

#### What is the equivalent of Android's AsyncTask or IntentService in Flutter?

In Android, you typically use AsyncTask for network operations to avoid blocking the main thread. AsyncTask also has a thread pool that manages threads for you.

Since `Flutter is single-threaded and event-driven` (similar to Node.js), you don't need to worry about thread management or need AsyncTask and IntentService.

When you need to execute something asynchronously, just declare the method as an `async method` and use `await` to wait for it.

```dart
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = JSON.decode(response.body);
  });
}
```

**This is how you typically perform network or database operations.**

In Android, when inheriting AsyncTask, you usually override its 3 methods: `OnPreExecute, doInBackground, and onPostExecute`. In Flutter, there's no such hassle; you just need to `await` a long-running operation, and the rest is handled by Dart's event loop mechanism.

However, sometimes you might process operations with large amounts of data that are CPU-intensive, and Flutter's UI might still be affected.

In this case, Flutter has a solution similar to AsyncTask. In Flutter, you can utilize the `multi-core nature of the CPU to process tasks in parallel`, which is done by `Isolate`.

Isolate is an independent execution thread that does not share any memory with the main thread. This means you cannot assign values to main thread variables or call setState to update UI within an Isolate.

Let's look at a simple example of `Isolate` to learn `how Isolate communicates with the main thread and shares data to update the UI`:

```dart
loadData() async {
    ReceivePort receivePort = new ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message
    SendPort sendPort = await receivePort.first;

    List msg = await sendReceive(sendPort, "https://jsonplaceholder.typicode.com/posts");

    setState(() {
      widgets = msg;
    });
  }

// the entry point for the isolate
  static dataLoader(SendPort sendPort) async {
    // Open the ReceivePort for incoming messages.
    ReceivePort port = new ReceivePort();

    // Notify any other isolates what port this isolate listens to.
    sendPort.send(port.sendPort);

    await for (var msg in port) {
      String data = msg[0];
      SendPort replyTo = msg[1];

      String dataURL = data;
      http.Response response = await http.get(dataURL);
      // Lots of JSON to parse
      replyTo.send(JSON.decode(response.body));
    }
  }

  Future sendReceive(SendPort port, msg) {
    ReceivePort response = new ReceivePort();
    port.send([msg, response.sendPort]);
    return response.first;
  }
```

The `dataLoader` method runs in its own independent `Isolate`, where you can perform more CPU-intensive processing, such as parsing more than 10,000 lines of JSON data or performing intensive mathematical calculations.

You can refer to the complete example below:

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:isolate';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  showLoadingDialog() {
    if (widgets.length == 0) {
      return true;
    }
    return false;
  }

  getBody() {
    if (showLoadingDialog()) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  getProgressDialog() {
    return new Center(child: new CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Sample App"),
        ),
        body: getBody());
  }

  ListView getListView() = new ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (BuildContext context, int position) {
        return getRow(position);
      });

  Widget getRow(int i) {
    return new Padding(padding: new EdgeInsets.all(10.0), child: new Text("Row ${widgets[i]["title"]}"));
  }

  loadData() async {
    ReceivePort receivePort = new ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message
    SendPort sendPort = await receivePort.first;

    List msg = await sendReceive(sendPort, "https://jsonplaceholder.typicode.com/posts");

    setState(() {
      widgets = msg;
    });
  }

// the entry point for the isolate
  static dataLoader(SendPort sendPort) async {
    // Open the ReceivePort for incoming messages.
    ReceivePort port = new ReceivePort();

    // Notify any other isolates what port this isolate listens to.
    sendPort.send(port.sendPort);

    await for (var msg in port) {
      String data = msg[0];
      SendPort replyTo = msg[1];

      String dataURL = data;
      http.Response response = await http.get(dataURL);
      // Lots of JSON to parse
      replyTo.send(JSON.decode(response.body));
    }
  }

  Future sendReceive(SendPort port, msg) {
    ReceivePort response = new ReceivePort();
    port.send([msg, response.sendPort]);
    return response.first;
  }
}
```

#### What is the equivalent of Android's OkHttp in Flutter?

Using the `http` package in Flutter makes network communication extremely simple.

Although the http package doesn't implement all of OkHttp's features, it abstracts many common functions, turning network calls that you would need to implement yourself into very simple methods.

You can download it from pub: <https://pub.dartlang.org/packages/http>

You can also add the http package dependency in pubspec.yaml:

```yaml
dependencies:
  ...
  http: '=0.11.3+12'
```

Then you can make network requests as follows:

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
[...]
  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = JSON.decode(response.body);
    });
  }
}
```

Once you have the data you need, you can call the `setState` method to notify Flutter to update the UI with the network call results.

#### How to show progress when a task is executing in Flutter?

In Android, when you execute a long-running task, you display a progress indicator on the screen to indicate that a task is in progress.

In Flutter, you can use the `progress indicator Widget`. You can use a boolean value to tell Flutter whether to show the progress indicator.

In the following example, we break the build method into three different methods. If showLoadingDialog is true, show the progress indicator; otherwise, show the ListView with data:

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  showLoadingDialog() {
    if (widgets.length == 0) {
      return true;
    }
    return false;
  }

  getBody() {
    if (showLoadingDialog()) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  getProgressDialog() {
    return new Center(child: new CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Sample App"),
        ),
        body: getBody());
  }

  ListView getListView() = new ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (BuildContext context, int position) {
        return getRow(position);
      });

  Widget getRow(int i) {
    return new Padding(padding: new EdgeInsets.all(10.0), child: new Text("Row ${widgets[i]["title"]}"));
  }

  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = JSON.decode(response.body);
    });
  }
}
```

## 4. Project Structure & Resources

#### Where should resolution-dependent image resources be stored (hdpi/xxhdpi)?

Flutter follows a simple 3-resolution format like iOS: `1x`, `2x`, and `3x`.

You can create a folder called `images` and generate @2x and @3x image files for each image file, placing them in corresponding folders like this:

```
../my_icon.png
../2.0x/my_icon.png
../3.0x/my_icon.png
```

Then declare these image resources in `pubspec.yaml`.

```yaml
assets:
  - images/a_dot_burr.jpeg
  - images/a_dot_ham.jpeg
```

Then you can use `AssetImage` to get these image resources.

```dart
return new AssetImage("images/a_dot_burr.jpeg");
```

#### How to store strings, and how to store strings in different languages?

The best solution currently is to create a `Strings` class and store strings as static fields:

```dart
class Strings{
  static String welcomeMessage = "Welcome To Flutter";
}
```

Then you can access it as follows:

```dart
new Text(Strings.welcomeMessage)
```

Flutter provides basic support for Android resource accessibility, but this feature is still in progress.

Flutter encourages developers to use the [intl package](https://pub.dartlang.org/packages/intl) for `internationalization and localization`.

#### What is the equivalent of Android's Gradle files in Flutter?

In Android, you can add dependencies through Gradle files located in the Android project.

In Flutter, although there are Gradle files under the Flutter project's Android folder, `these Gradle files should only be used when adding dependencies needed for platform integration`. Otherwise, use `pubspec.yaml` to declare Flutter-specific `external dependencies`.

You can find many useful dependency libraries on [Pub](https://pub.dartlang.org).

## 5. Activities and Fragments

#### What is the equivalent of Android's Activity and Fragment in Flutter?

In Android, an Activity represents a screen where users can complete a specific function or task. A Fragment represents a modular way of UI, used to build more complex user interfaces for larger screens and help scale your app between small and large screens. In Flutter, both correspond to the concept of `Widget`.

#### How to listen to Android Activity lifecycle?

In Android, you can listen to Activity lifecycle by overriding lifecycle methods.

In Flutter, you can listen to lifecycle events by registering as an observer to `WidgetsBinding` and listening to `didChangeAppLifecycleState`.

Here are the lifecycle events you can listen to:

- `resumed` - The application is visible and can interact with the user, equivalent to Android's `onResume`.
- `inactive` - The application is in an inactive state and cannot interact with the user. This event only applies to iOS devices.
- `paused` - The application is currently not visible to the user, cannot interact with the user, and is running in the background. Equivalent to Android's `onPause`.
- `suspending` - The application will be temporarily suspended. This is not used on iOS.

Example:

```dart
import 'package:flutter/widgets.dart';

void main() {
  runApp(new Center(child: new LifecycleWatcher()));
}

class LifecycleWatcher extends StatefulWidget {
  @override
  _LifecycleWatcherState createState() = new _LifecycleWatcherState();
}

class _LifecycleWatcherState extends State<LifecycleWatcher> with WidgetsBindingObserver {
  AppLifecycleState _lastLifecyleState;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    setState(() {
      _lastLifecyleState = state;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_lastLifecyleState == null)
      return new Text('This widget has not observed any lifecycle changes.', textDirection: TextDirection.ltr);
    return new Text('The most recent lifecycle state this widget observed was: $_lastLifecyleState.',
        textDirection: TextDirection.ltr);
  }
}
```

## 6. Layout

#### What is the equivalent of Android's LinearLayout in Flutter?

In Android, you use `LinearLayout` to place your widgets vertically or horizontally. In Flutter, you can use `Row` or `Column` to achieve the same effect.

Notice how the `Row` and `Column` structures are very similar in these two code examples. Their children are identical, and you can leverage this feature to develop rich layouts with the same children.

```dart
// Using Row for horizontal layout
@override
Widget build(BuildContext context) {
  return new Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      new Text('Row One'),
      new Text('Row Two'),
      new Text('Row Three'),
      new Text('Row Four'),
    ],
  );
}
```

```dart
// Using Column for vertical layout
@override
Widget build(BuildContext context) {
  return new Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      new Text('Column One'),
      new Text('Column Two'),
      new Text('Column Three'),
      new Text('Column Four'),
    ],
  );
}
```

#### What is the equivalent of Android's RelativeLayout in Flutter?

RelativeLayout is used to position your Widgets relative to each other. In Flutter, there are several ways to achieve the same result.

You can achieve the effect of RelativeLayout by using a `combination of Widgets like Column, Row, and Stack`. You can specify layout rules relative to the parent for widget constructors.

A good example of building RelativeLayout in Flutter:
[equivalent-of-relativelayout-in-flutter](https://stackoverflow.com/questions/44396075/equivalent-of-relativelayout-in-flutter)

#### What is the equivalent of Android's ScrollView in Flutter?

In Android, ScrollView allows you to place widgets so that they can scroll when the user's device screen is smaller than your content.

In Flutter, the simplest way is to use `ListView`. In Flutter, `ListView is both a ScrollView and Android's ListView`.

```dart
@override
Widget build(BuildContext context) {
  return new ListView(
    children: <Widget>[
      new Text('Row One'),
      new Text('Row Two'),
      new Text('Row Three'),
      new Text('Row Four'),
    ],
  );
}
```

## 7. Gesture Detection & Touch Event Handling

#### How to add an onClick listener to a Widget in Flutter?

In Android, you can attach an OnClick to views like buttons by calling the `setOnClickListener` method.

**In Flutter, there are two ways to add touch listeners:**

- If the Widget supports event detection, you can pass a function to it for handling. For example, RaisedButton has an `onPressed` parameter.

```dart
@override
Widget build(BuildContext context) {
  return new RaisedButton(
      onPressed: () {
        // Write click event handling logic or pass a click event handling function
        print("click");
      },
      child: new Text("Button"));
}
```

- If the Widget doesn't support event detection, you can wrap the Widget in a GestureDetector and pass a function to its `onTap` parameter.

```dart
class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        body: new Center(
      child: new GestureDetector(
        child: new FlutterLogo(
          size: 200.0,
        ),
        onTap: () {
          // Write click event handling logic or pass a click event handling function
          print("tap");
        },
      ),
    ));
  }
}
```

#### How to handle other gestures on a Widget?

Using GestureDetector, we can listen for a wide range of gestures, such as:

| Name                     | Effect                                                                           |
| ------------------------ | -------------------------------------------------------------------------------- |
| **Tap ↓**                |
| `onTapDown`              | Gesture press event at a certain position on the screen.                         |
| `onTapUp`                | Gesture lift event at a certain position on the screen.                          |
| `onTap`                  | Gesture tap event at a certain position on the screen.                           |
| `onTapCancel`            | Event that only produces onTapDown but not onTapUp.                              |
| **Double Tap ↓**         |
| `onDoubleTap`            | User performs two quick taps at the same position.                               |
| **Long Press ↓**         |
| `onLongPress`            | Event generated when pressing and holding a point on the screen for a long time. |
| **Vertical Drag ↓**      |
| `onVerticalDragStart`    | Event when vertical movement starts at a certain point on the screen.            |
| `onVerticalDragUpdate`   | Update event during vertical movement at a point on the screen.                  |
| `onVerticalDragEnd`      | Event after vertical movement stops at a point on the screen.                    |
| **Horizontal Drag ↓**    |
| `onHorizontalDragStart`  | Event when horizontal movement starts at a certain point on the screen.          |
| `onHorizontalDragUpdate` | Update event during horizontal movement at a point on the screen.                |
| `onHorizontalDragEnd`    | Event after horizontal movement stops at a point on the screen.                  |

For example, the following example uses GestureDetector to rotate the FlutterLogo by double-tapping:

```dart
AnimationController controller;
CurvedAnimation curve;

@override
void initState() {
  controller = new AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
  curve = new CurvedAnimation(parent: controller, curve: Curves.easeIn);
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        body: new Center(
          child: new GestureDetector(
            child: new RotationTransition(
                turns: curve,
                child: new FlutterLogo(
                  size: 200.0,
                )),
            onDoubleTap: () {
              if (controller.isCompleted) {
                controller.reverse();
              } else {
                controller.forward();
              }
            },
        ),
    ));
  }
}
```

## 8. ListView and Adapter

#### What is the equivalent of Android's ListView in Flutter?

The answer is still ListView!

In Android's ListView, you create an Adapter for the ListView, pass it to the ListView, and then the ListView displays the data returned by the Adapter. However, you must ensure that each row's View object is recycled; otherwise, you'll get visual errors and memory issues.

In Flutter, due to the immutable nature of Flutter's Widgets, you just need to pass a list of Widgets to ListView, and Flutter will take care of ensuring they scroll quickly and smoothly.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new ListView(children: _getListData()),
    );
  }

  _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(new Padding(padding: new EdgeInsets.all(10.0), child: new Text("Row $i")));
    }
    return widgets;
  }
}
```

#### How to know when a ListView item is clicked?

In Android, ListView has the `onItemClickListener` method to listen for which item is clicked. In Flutter, you just need to `wrap the passed Widget with a GestureDetector`.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new ListView(children: _getListData()),
    );
  }

  _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(new GestureDetector(
        child: new Padding(
            padding: new EdgeInsets.all(10.0),
            child: new Text("Row $i")),
        onTap: () {
          print('row tapped');
        },
      ));
    }
    return widgets;
  }
}
```

#### How to dynamically update a ListView?

In Android, you need to update the Adapter and call `notifyDataSetChanged` to update the view. In Flutter, if you update the Widgets list inside `setState`, you'll find that the ListView won't change.

This is because when setState is called, the Flutter rendering engine traverses all Widgets to see if they have changed. When it reaches the ListView, it performs a == operator check and finds that the ListView before and after is the same and hasn't changed, so there's no change in the UI.

To update the ListView, you need to **create a new list of widgets in `setState`, copy all old data into the new list, and add new `widgets`**. This is one of the simple ways to implement updates.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new ListView(children: widgets),
    );
  }

  Widget getRow(int i) {
    return new GestureDetector(
      child: new Padding(
          padding: new EdgeInsets.all(10.0),
          child: new Text("Row $i")),
      onTap: () {
        setState(() {
          widgets = new List.from(widgets);
          widgets.add(getRow(widgets.length + 1));
          print('row $i');
        });
      },
    );
  }
}
```

It is highly recommended to use `ListView.builder`. This method is very efficient when you have a large amount of dynamic data. It is essentially equivalent to using `RecyclerView` in Android, as it automatically recycles list elements:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Sample App"),
        ),
        body: new ListView.builder(
            itemCount: widgets.length,
            itemBuilder: (BuildContext context, int position) {
              return getRow(position);
            }));
  }

  Widget getRow(int i) {
    return new GestureDetector(
      child: new Padding(
          padding: new EdgeInsets.all(10.0),
          child: new Text("Row $i")),
      onTap: () {
        setState(() {
          widgets.add(getRow(widgets.length + 1));
          print('row $i');
        });
      },
    );
  }
}
```

Here, instead of creating a ListView object, we create a `ListView.builder`, which takes two key parameters: the `initial length of the list` and an `ItemBuilder` function.

The ItemBuilder function is very similar to the `getView` function in Android's Adapter. It specifies the position, and you return the corresponding Widget.

Finally, if you notice the `onTap` function, we didn't recreate the Widget list as mentioned earlier, but just added new elements to it. If you understand this, it means you've mastered ListView quite well.

## 9. Text Usage

#### How to customize fonts for Text?

In the Android SDK (starting from Android O - Android 8.0), you can create a `Font` resource file and pass it to the `FontFamily` parameter of `TextView` to customize fonts.

In Flutter, first, you need to place the font file in the project folder (the best practice is to create a folder called `assets`).

Next, declare the fonts in the `pubspec.yaml` file:

```yaml
fonts:
  - family: MyCustomFont
    fonts:
      - asset: fonts/MyCustomFont.ttf
      - style: italic
```

Finally, use the font in Text:

```dart
@override
Widget build(BuildContext context) {
  return new Scaffold(
    appBar: new AppBar(
      title: new Text("Sample App"),
    ),
    body: new Center(
      child: new Text(
        'This is a custom font text',
        style: new TextStyle(fontFamily: 'MyCustomFont'),
      ),
    ),
  );
}
```

#### How to customize the display style of Text?

Besides custom fonts, you can customize many different styles on Text.

The Text style parameter requires a TextStyle object, in which you can customize many parameters, such as:

- color
- decoration
- decorationColor
- decorationStyle
- fontFamily
- fontSize
- fontStyle
- fontWeight
- hashCode
- height
- inherit
- letterSpacing
- textBaseline
- wordSpacing

## 10. Forms

#### What is the equivalent of Android's hint in Flutter?

In Flutter, you can display a hint by passing a value to the `decoration` parameter of the TextField constructor.

```dart
body: new Center(
  child: new TextField(
    decoration: new InputDecoration(hintText: "This is a hint"),
  )
)
```

#### How to display form validation error messages?

Just like displaying a `hint`, you can use the `decoration` parameter in the TextField constructor to display form validation error messages.

However, you probably don't want to show the error immediately; you typically want to show it when the user enters invalid data. This can be achieved by calling `setState` to update the component and passing a new InputDecoration object.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(new SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() = new _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  String _errorText;

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Sample App"),
      ),
      body: new Center(
        child: new TextField(
          onSubmitted: (String text) {
            setState(() {
              if (!isEmail(text)) {
                _errorText = 'Error: This is not an email';
              } else {
                _errorText = null;
              }
            });
          },
          decoration: new InputDecoration(hintText: "This is a hint", errorText: _getErrorText()),
        ),
      ),
    );
  }

  _getErrorText() {
    return _errorText;
  }

  bool isEmail(String em) {
    String emailRegexp =
        r'^(([^<()[\]\\.,;:\s@\"]+(\.[^<()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = new RegExp(emailRegexp);

    return regExp.hasMatch(em);
  }
}
```

## 11. Flutter Plugins

#### How to use GPS?

Use the following plugin to use the platform's GPS: [https://pub.dartlang.org/packages/location](https://pub.dartlang.org/packages/location)

#### How to use the camera?

Use the following plugin to call the system camera: [https://pub.dartlang.org/packages/image_picker](https://pub.dartlang.org/packages/image_picker)

#### How to use Facebook login?

Use the following dependency library to implement Facebook login: [https://pub.dartlang.org/packages/flutter_facebook_connect](https://pub.dartlang.org/packages/flutter_facebook_connect)

#### How to build your own plugin?

If Flutter or its community doesn't have the plugin you need, you can build your own plugin following the tutorial at [http://doc.flutter-dev.cn/developing-packages/](http://doc.flutter-dev.cn/developing-packages/).

In short, the architecture of a Flutter plugin is like using an `Event bus` in Android: you can send a message and let the receiver process it, and finally, the receiver sends the result back to you. In this case, the receiver will be the iOS or Android platform.

#### How to use NDK in Flutter?

If you use NDK in your current Android application and want to reuse your existing NDK libraries in a Flutter application, you can achieve this by `building a custom plugin`.

A custom plugin first interacts with your Android application, where you can call native methods. Once the native method call is complete, you can send the result back to Flutter and present it.

## 12. Theme

#### How to customize a Material-style app?

Flutter comes with a beautiful set of Material-style components that meet many Material design requirements. Unlike Android, which requires declaring themes in XML and then assigning them to the application through AndroidManifest.xml, in Flutter, you can declare the theme through the top-level Widget.

To fully utilize the Material-style components in your app, you can use MaterialApp as the entry point of your application. MaterialApp is a convenient widget that wraps many components needed to implement Material style (such as Scaffold). MaterialApp is implemented on top of WidgetsApp.

If you don't want to use Material-style components, you can declare a top-level WidgetsApp, which is a more general class that wraps some widgets commonly needed by applications.

To customize the colors and styles of Material components, you can pass a ThemeData object to the MaterialApp constructor. For example, in the following code, you can see that the primary color is set to blue, and all text selection colors are set to red.

```dart
class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Sample App',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
        textSelectionColor: Colors.red
      ),
      home: new SampleAppPage(),
    );
  }
}
```

## 13. Database & Local Storage

#### How to use Shared Preferences in Flutter?

In Android, you can use the SharedPreferences API to store small amounts of key-value pairs.

In Flutter, you can use the Shared Preferences plugin `shared_preferences` to store key-value pairs.

This plugin wraps the functionality of Shared Preferences and NSUserDefaults (same as iOS).

```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(
    new MaterialApp(
      home: new Scaffold(
        body: new Center(
          child: new RaisedButton(
            onPressed: _incrementCounter,
            child: new Text('Increment Counter'),
          ),
        ),
      ),
    ),
  );
}

_incrementCounter() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int counter = (prefs.getInt('counter') ?? 0) + 1;
  print('Pressed $counter times.');
  prefs.setInt('counter', counter);
}
```

#### How to use SQLite in Flutter?

In Android, you can query structured data in SQLite through SQL statements.

In Flutter, you can use the following plugin to use SQLite-related functionality: SQFlite

## Notifications

#### How to set up and push notifications?

In Android, you can use Firebase Cloud Messaging to set up push notifications for your app.

In Flutter, you can use the `firebase_messaging` plugin to achieve the same functionality.
