import{_ as t,c as o,o as n,a as e}from"./app-CbULZrmi.js";const a={},d=e("h1",{id:"控制台显示badge",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#控制台显示badge"},[e("span",null,"控制台显示badge")])],-1),r=e("p",null,"见简书的控制台",-1),s=e("pre",null,[e("code",{class:"language-js"},`function showBadge(name, version, nameStyle, versionStyle) {
  console.log(
    "%c ".concat(name, " %c ").concat(version, " "),
    "padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat(
      nameStyle,
      ";"
    ),
    "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(
      versionStyle,
      ";"
    )
  );
}



`)],-1),c=e("p",null,"然后就可以打印了",-1),i=e("pre",null,[e("code",{class:"language-js"},` showBadge("Environment", "production", "#606060", "RGB(66,192,46)");
  showBadge("Platform", "shakespeare", "#606060", "RGB(20,117,178)");
  showBadge("Version ", "1.1.0", "#606060", "RGB(20,117,178)");
  showBadge(
    "Build Date",
    "2020-08-26T02:44:50.105Z",
    "#606060",
    "RGB(20,117,178)"
  );
`)],-1),p=[d,r,s,c,i];function l(g,m){return n(),o("div",null,p)}const u=t(a,[["render",l],["__file","show-badge.html.vue"]]),_=JSON.parse('{"path":"/node-tutor/node-snippets/show-badge.html","title":"控制台显示badge","lang":"zh-CN","frontmatter":{"description":"控制台显示badge 见简书的控制台 然后就可以打印了","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/node-tutor/node-snippets/show-badge.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"控制台显示badge"}],["meta",{"property":"og:description","content":"控制台显示badge 见简书的控制台 然后就可以打印了"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"控制台显示badge\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.33,"words":99},"filePathRelative":"node-tutor/node-snippets/show-badge.md","localizedDate":"2023年6月25日","autoDesc":true}');export{u as comp,_ as data};
