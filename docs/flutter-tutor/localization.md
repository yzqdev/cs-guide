# flutter多语言

## 使用官方推荐的

### 添加您自己的本地化信息

引入 `flutter_localizations` package 后，请按照以下说明将本地化的文本添加到您的应用程序。

1. 将 `intl` package 添加到 `pubspec.yaml` 文件中：

```yaml
   dependencies:
     flutter:
       sdk: flutter
     flutter_localizations:
       sdk: flutter
     intl: ^0.17.0 # Add this line
```

2. 另外，在 `pubspec.yaml` 文件中，启用 `generate` 标志。该设置项添加在 pubspec 中 Flutter 部分，通常处在 pubspec 文件中后面的部分。

```yaml
   # The following section is specific to Flutter.
   flutter:
     generate: true # Add this line
```

3. 在 Flutter 项目的根目录中添加一个新的 yaml 文件，命名为 `l10n.yaml`，其内容如下：

```yaml
   arb-dir: lib/l10n
   template-arb-file: app_en.arb
   output-localization-file: app_localizations.dart
```

   该文件用于配置本地化工具；在上面的示例中，指定输入文件在 `${FLUTTER_PROJECT}/lib/l10n` 中，`app_en.arb` 文件提供模板，生成的本地化文件在 `app_localizations.dart` 文件中。

4. 在 `${FLUTTER_PROJECT}/lib/l10n` 中，添加 `app_en.arb` 模板文件。如下：

```json
   {
       "helloWorld": "Hello World!",
       "@helloWorld": {
         "description": "The conventional newborn programmer greeting"
       }
   }
```

5. 接下来，在同一目录中添加一个 `app_es.arb` 文件，对同一条信息做西班牙语的翻译：

```json
   {
       "helloWorld": "¡Hola Mundo!"
   }
```

6. 运行 `flutter gen-l10n` 命令，您将在 `${FLUTTER_PROJECT}/.dart_tool/flutter_gen/gen_l10n` 中看到生成的文件。

7. 在调用 `MaterialApp` 的构造函数时候，添加 `import` 语句，导入 `app_localizations.dart` 和 `AppLocalizations.delegate`。

```dart
   import 'package:flutter_gen/gen_l10n/app_localizations.dart';
```

```dart
   return const MaterialApp(
     title: 'Localizations Sample App',
     localizationsDelegates: [
       AppLocalizations.delegate, // Add this line
       GlobalMaterialLocalizations.delegate,
       GlobalWidgetsLocalizations.delegate,
       GlobalCupertinoLocalizations.delegate,
     ],
     supportedLocales: [
       Locale('en', ''), // English, no country code
       Locale('es', ''), // Spanish, no country code
     ],
     home: MyHomePage(),
   );
```

8. 在你应用的任何地方，都使用 `AppLocalizations`，这里它被用于在 Text widget 里展示翻译过的消息。

```dart
   Text(AppLocalizations.of(context)!.helloWorld);
```

9. 您也可以使用生成的 `localizationsDelegates` 和 `supportedLocales` 列表，而不是手动提供它们。

```dart
   const MaterialApp(
     title: 'Localizations Sample App',
     localizationsDelegates: AppLocalizations.localizationsDelegates,
     supportedLocales: AppLocalizations.supportedLocales,
   );
```

   如果目标设备的语言环境设置为英语，此代码生成的 Text widget 会展示「Hello World!」。如果目标设备的语言环境设置为西班牙语，则展示「Hola Mundo!」，在 `arb` 文件中，每个条目的键值都被用作 getter 的方法名称，而该条目的值则表示本地化的信息。

要查看使用该工具的示例 Flutter 应用，请参阅 [`gen_l10n_example`](https://github.com/cfug/flutter.cn/tree/master/examples/internationalization/gen_l10n_example)。

如需本地化设备应用描述，你可以将本地化后的字符串传递给 [`MaterialApp.onGenerateTitle`](https://api.flutter-io.cn/flutter/material/MaterialApp/onGenerateTitle.html):

```dart
return MaterialApp(
  onGenerateTitle: (context) =>
      DemoLocalizations.of(context).title,
```

有关本地化工具的更多信息，例如处理 DateTime 和复数，请参见 [国际化用户指南](https://flutter.cn/docs/go/i18n-user-guide)。

## 使用idea插件

使用[flutter-intl](https://plugins.jetbrains.com/plugin/13666-flutter-intl)插件,什么都不用配置,直接生成即可
