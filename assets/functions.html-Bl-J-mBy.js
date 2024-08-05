import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const a={},r=o(`<h1 id="一些常用操作" tabindex="-1"><a class="header-anchor" href="#一些常用操作"><span>一些常用操作</span></a></h1><h2 id="解析json" tabindex="-1"><a class="header-anchor" href="#解析json"><span>解析json</span></a></h2><h3 id="json字符转dart对象" tabindex="-1"><a class="header-anchor" href="#json字符转dart对象"><span>json字符转dart对象</span></a></h3><pre><code class="language-dart">import &#39;package:json_annotation/json_annotation.dart&#39;;

/// This allows the \`User\` class to access private members in
/// the generated file. The value for this is *.g.dart, where
/// the star denotes the source file name.
part &#39;user.g.dart&#39;;

/// An annotation for the code generator to know that this class needs the
/// JSON serialization logic to be generated.
@JsonSerializable()
class User {
  User(this.name, this.email);

  String name;
  String email;

  /// A necessary factory constructor for creating a new User instance
  /// from a map. Pass the map to the generated \`_$UserFromJson()\` constructor.
  /// The constructor is named after the source class, in this case, User.
  factory User.fromJson(Map&lt;String, dynamic&gt; json) =&gt; _$UserFromJson(json);

  /// \`toJson\` is the convention for a class to declare support for serialization
  /// to JSON. The implementation simply calls the private, generated
  /// helper method \`_$UserToJson\`.
  Map&lt;String, dynamic&gt; toJson() =&gt; _$UserToJson(this);
}

</code></pre><p>然后</p><pre><code class="language-shell">flutter pub run build_runner watch 
</code></pre><p>json数组转dart对象</p><pre><code class="language-dart">List responseJson = json.decode(response);
List&lt;CardBean&gt; cardbeanList = responseJson.map((m) =&gt; new CardBean.fromJson(m)).toList();
CardBean cardBean = cardbeanList.first;

</code></pre>`,8),s=[r];function i(c,d){return n(),t("div",null,s)}const p=e(a,[["render",i],["__file","functions.html.vue"]]),h=JSON.parse('{"path":"/flutter-tutor/functions.html","title":"一些常用操作","lang":"zh-CN","frontmatter":{"description":"一些常用操作 解析json json字符转dart对象 然后 json数组转dart对象","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/flutter-tutor/functions.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"一些常用操作"}],["meta",{"property":"og:description","content":"一些常用操作 解析json json字符转dart对象 然后 json数组转dart对象"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一些常用操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"解析json","slug":"解析json","link":"#解析json","children":[{"level":3,"title":"json字符转dart对象","slug":"json字符转dart对象","link":"#json字符转dart对象","children":[]}]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.66,"words":197},"filePathRelative":"flutter-tutor/functions.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,h as data};
