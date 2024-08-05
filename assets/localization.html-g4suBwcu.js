import{_ as e,c as t,o,d as a}from"./app-CbULZrmi.js";const l={},n=a(`<h1 id="flutter多语言" tabindex="-1"><a class="header-anchor" href="#flutter多语言"><span>flutter多语言</span></a></h1><h2 id="使用官方推荐的" tabindex="-1"><a class="header-anchor" href="#使用官方推荐的"><span>使用官方推荐的</span></a></h2><h3 id="添加您自己的本地化信息" tabindex="-1"><a class="header-anchor" href="#添加您自己的本地化信息"><span>添加您自己的本地化信息</span></a></h3><p>引入 <code>flutter_localizations</code> package 后，请按照以下说明将本地化的文本添加到您的应用程序。</p><ol><li>将 <code>intl</code> package 添加到 <code>pubspec.yaml</code> 文件中：</li></ol><pre><code class="language-yaml">   dependencies:
     flutter:
       sdk: flutter
     flutter_localizations:
       sdk: flutter
     intl: ^0.17.0 # Add this line
</code></pre><ol start="2"><li>另外，在 <code>pubspec.yaml</code> 文件中，启用 <code>generate</code> 标志。该设置项添加在 pubspec 中 Flutter 部分，通常处在 pubspec 文件中后面的部分。</li></ol><pre><code class="language-yaml">   # The following section is specific to Flutter.
   flutter:
     generate: true # Add this line
</code></pre><ol start="3"><li>在 Flutter 项目的根目录中添加一个新的 yaml 文件，命名为 <code>l10n.yaml</code>，其内容如下：</li></ol><pre><code class="language-yaml">   arb-dir: lib/l10n
   template-arb-file: app_en.arb
   output-localization-file: app_localizations.dart
</code></pre><p>该文件用于配置本地化工具；在上面的示例中，指定输入文件在 <code>\${FLUTTER_PROJECT}/lib/l10n</code> 中，<code>app_en.arb</code> 文件提供模板，生成的本地化文件在 <code>app_localizations.dart</code> 文件中。</p><ol start="4"><li>在 <code>\${FLUTTER_PROJECT}/lib/l10n</code> 中，添加 <code>app_en.arb</code> 模板文件。如下：</li></ol><pre><code class="language-json">   {
       &quot;helloWorld&quot;: &quot;Hello World!&quot;,
       &quot;@helloWorld&quot;: {
         &quot;description&quot;: &quot;The conventional newborn programmer greeting&quot;
       }
   }
</code></pre><ol start="5"><li>接下来，在同一目录中添加一个 <code>app_es.arb</code> 文件，对同一条信息做西班牙语的翻译：</li></ol><pre><code class="language-json">   {
       &quot;helloWorld&quot;: &quot;¡Hola Mundo!&quot;
   }
</code></pre><ol start="6"><li><p>运行 <code>flutter gen-l10n</code> 命令，您将在 <code>\${FLUTTER_PROJECT}/.dart_tool/flutter_gen/gen_l10n</code> 中看到生成的文件。</p></li><li><p>在调用 <code>MaterialApp</code> 的构造函数时候，添加 <code>import</code> 语句，导入 <code>app_localizations.dart</code> 和 <code>AppLocalizations.delegate</code>。</p></li></ol><pre><code class="language-dart">   import &#39;package:flutter_gen/gen_l10n/app_localizations.dart&#39;;
</code></pre><pre><code class="language-dart">   return const MaterialApp(
     title: &#39;Localizations Sample App&#39;,
     localizationsDelegates: [
       AppLocalizations.delegate, // Add this line
       GlobalMaterialLocalizations.delegate,
       GlobalWidgetsLocalizations.delegate,
       GlobalCupertinoLocalizations.delegate,
     ],
     supportedLocales: [
       Locale(&#39;en&#39;, &#39;&#39;), // English, no country code
       Locale(&#39;es&#39;, &#39;&#39;), // Spanish, no country code
     ],
     home: MyHomePage(),
   );
</code></pre><ol start="8"><li>在你应用的任何地方，都使用 <code>AppLocalizations</code>，这里它被用于在 Text widget 里展示翻译过的消息。</li></ol><pre><code class="language-dart">   Text(AppLocalizations.of(context)!.helloWorld);
</code></pre><ol start="9"><li>您也可以使用生成的 <code>localizationsDelegates</code> 和 <code>supportedLocales</code> 列表，而不是手动提供它们。</li></ol><pre><code class="language-dart">   const MaterialApp(
     title: &#39;Localizations Sample App&#39;,
     localizationsDelegates: AppLocalizations.localizationsDelegates,
     supportedLocales: AppLocalizations.supportedLocales,
   );
</code></pre><p>如果目标设备的语言环境设置为英语，此代码生成的 Text widget 会展示「Hello World!」。如果目标设备的语言环境设置为西班牙语，则展示「Hola Mundo!」，在 <code>arb</code> 文件中，每个条目的键值都被用作 getter 的方法名称，而该条目的值则表示本地化的信息。</p><p>要查看使用该工具的示例 Flutter 应用，请参阅 <a href="https://github.com/cfug/flutter.cn/tree/master/examples/internationalization/gen_l10n_example" target="_blank" rel="noopener noreferrer"><code>gen_l10n_example</code></a>。</p><p>如需本地化设备应用描述，你可以将本地化后的字符串传递给 <a href="https://api.flutter-io.cn/flutter/material/MaterialApp/onGenerateTitle.html" target="_blank" rel="noopener noreferrer"><code>MaterialApp.onGenerateTitle</code></a>:</p><pre><code class="language-dart">return MaterialApp(
  onGenerateTitle: (context) =&gt;
      DemoLocalizations.of(context).title,
</code></pre><p>有关本地化工具的更多信息，例如处理 DateTime 和复数，请参见 <a href="https://flutter.cn/docs/go/i18n-user-guide" target="_blank" rel="noopener noreferrer">国际化用户指南</a>。</p><h2 id="使用idea插件" tabindex="-1"><a class="header-anchor" href="#使用idea插件"><span>使用idea插件</span></a></h2><p>使用<a href="https://plugins.jetbrains.com/plugin/13666-flutter-intl" target="_blank" rel="noopener noreferrer">flutter-intl</a>插件,什么都不用配置,直接生成即可</p>`,29),r=[n];function i(c,p){return o(),t("div",null,r)}const s=e(l,[["render",i],["__file","localization.html.vue"]]),u=JSON.parse('{"path":"/flutter-tutor/localization.html","title":"flutter多语言","lang":"zh-CN","frontmatter":{"description":"flutter多语言 使用官方推荐的 添加您自己的本地化信息 引入 flutter_localizations package 后，请按照以下说明将本地化的文本添加到您的应用程序。 将 intl package 添加到 pubspec.yaml 文件中： 另外，在 pubspec.yaml 文件中，启用 generate 标志。该设置项添加在 pubs...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/localization.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"flutter多语言"}],["meta",{"property":"og:description","content":"flutter多语言 使用官方推荐的 添加您自己的本地化信息 引入 flutter_localizations package 后，请按照以下说明将本地化的文本添加到您的应用程序。 将 intl package 添加到 pubspec.yaml 文件中： 另外，在 pubspec.yaml 文件中，启用 generate 标志。该设置项添加在 pubs..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"flutter多语言\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用官方推荐的","slug":"使用官方推荐的","link":"#使用官方推荐的","children":[{"level":3,"title":"添加您自己的本地化信息","slug":"添加您自己的本地化信息","link":"#添加您自己的本地化信息","children":[]}]},{"level":2,"title":"使用idea插件","slug":"使用idea插件","link":"#使用idea插件","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.12,"words":637},"filePathRelative":"flutter-tutor/localization.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,u as data};
