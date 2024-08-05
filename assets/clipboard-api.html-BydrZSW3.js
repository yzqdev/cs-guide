import{_ as a,r as i,c as r,b as o,w as n,d as c,a as e,o as d}from"./app-CbULZrmi.js";const l={},s=c('<h1 id="剪切板api" tabindex="-1"><a class="header-anchor" href="#剪切板api"><span>剪切板api</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p><code>document.execCommand</code>已经废弃了<br> 推荐用<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API" target="_blank" rel="noopener noreferrer">clipboard</a></p></div>',2),p=e("pre",null,[e("code",{class:"language-html"},`<button onclick='run()'>点击我(会把剪切板的内容复制到下面的div里面)</button>
<div id='editor'>#editor</div>
`)],-1),m=e("pre",null,[e("code",{class:"language-js"},`function run (){
    navigator.clipboard.readText().then(
  clipText => document.querySelector("#editor").innerText += clipText);
}

`)],-1),u=e("h2",{id:"写入剪切板",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#写入剪切板"},[e("span",null,"写入剪切板")])],-1),h=e("pre",null,[e("code",{class:"language-html"},`<button onclick='run()'>点击我(会把下面的div里面复制到剪切板的)</button>
<div id='editor'>复制我12345678</div>
`)],-1),g=e("pre",null,[e("code",{class:"language-js"},`function run (){
    navigator.clipboard.writeText(document.querySelector("#editor").innerText).then(function() {
  /*clipboard successfully set*/
  alert('复制成功')
}, function() {
     alert('复制失败')
  /*clipboard write failed*/
});
}


`)],-1);function f(b,y){const t=i("CodeDemo");return d(),r("div",null,[s,o(t,{id:"code-demo-8",type:"normal",code:"eJw9jrFOwzAQhl/FMkNsgdIdkrwEjF7S2FBDegZjV6CqCwISCgyslbogJgbEhKhA4mXqVH0LLm3Vm07/f/9/35D2XL+k+zTpeucMEANFqYuzNLIeGI+yxc0sVD9N/cLmv5NmPA4P76GumunfYnIb7u/Cxyy8PYf6K9Sf8+/H5fQVdakHy+oJd5501rWZgARVomUaKamdsVG2s16SDhro0z16eokgxx4Kp5EEAQjjQwEEB/KBPsnxPEa8867JrYytyuWRunKMx66ngLWXrdtqJM2INIXvK3DxhVf2+lCVqsACJujms6A81gDKrgK76TbMDwSMBCDT6B+H5HfM"},{default:n(()=>[p,m]),_:1}),u,o(t,{id:"code-demo-15",type:"normal",code:"eJxdj89KAzEQxl8lxMMmpezif9FtX0KPe9nupjaaZjWbVEvpRYSuVUGvhSJIvXhSEFEUfJmmtW/hbEuFdgJhYH7zfd+0cE3XBd7FfsVonUiUyEjw6LjkKCMJdcrji0/b+Rpl92T43Rt1u8OP60n/cdy7jHlj0rmB3g5ubfZusxd79Wyzzqj/A1PqezPBciB9QBGPSw6LuU6UU55tgObq2vrG5tb2ju8BAiQu4qMUwlSNjDSHNBACEdoKJIKSYYMfhqDgQsSTShKq2D1TXLMDdq5JnESmzqR2Tw1TzX0mWAQoCfDKzDbA1OVSMpXT1NU1Jsnch1A09fAK/8ooNVHE0rRqhGiilOmClxOhYEoTZ37Bne0+ODSQ7SJa1oJagO3g9fftKYcXfaYXoGrIBYtzjzbdgy+Q+cPtP9GCq8Y="},{default:n(()=>[h,g]),_:1})])}const v=a(l,[["render",f],["__file","clipboard-api.html.vue"]]),x=JSON.parse('{"path":"/frontend/basic-js/clipboard-api.html","title":"剪切板api","lang":"zh-CN","frontmatter":{"description":"剪切板api 提示 document.execCommand已经废弃了 推荐用clipboard 写入剪切板","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/clipboard-api.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"剪切板api"}],["meta",{"property":"og:description","content":"剪切板api 提示 document.execCommand已经废弃了 推荐用clipboard 写入剪切板"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-24T22:42:20.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-24T22:42:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"剪切板api\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-24T22:42:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"写入剪切板","slug":"写入剪切板","link":"#写入剪切板","children":[]}],"git":{"createdTime":1650201329000,"updatedTime":1653432140000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.43,"words":128},"filePathRelative":"frontend/basic-js/clipboard-api.md","localizedDate":"2022年4月17日","autoDesc":true}');export{v as comp,x as data};
