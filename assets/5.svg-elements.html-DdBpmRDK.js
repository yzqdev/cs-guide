import{_ as i,r as d,c,b as s,w as l,d as o,a as e,e as n,o as a}from"./app-CbULZrmi.js";const h={},r=o('<h1 id="svg元素" tabindex="-1"><a class="header-anchor" href="#svg元素"><span>svg元素</span></a></h1><h2 id="g元素" tabindex="-1"><a class="header-anchor" href="#g元素"><span><code>g</code>元素</span></a></h2><p>“ g”元素用于将几个图形元素组合在一起。</p><ul><li><p><code>&lt;g id=val style=val &gt;elements&lt;/g&gt;</code></p><p>将一组元素分组</p></li></ul><p>分组是有用的，因为:</p><ul><li>在其他地方或多次重用图形集，而不需要每次都定义它们</li><li>对组中的所有图形使用单一样式,</li><li>对组中的所有图形应用坐标变换<a href="http://xahlee.info/js/svg_transformation.html" target="_blank" rel="noopener noreferrer">坐标变换</a>]</li></ul>',6),g=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100">
<g id="abc46"
 style="fill:yellow; stroke:blue; stroke-width:5" >
 <rect x="9" y="0" width="30" height="80"/>
 <circle cx="50" cy="50" r="20"/>
</g>
</svg>
`)],-1),p=o(`<p>使用的例子 分组</p><p>若要在其他位置使用分组图形，请使用 use 元素。</p><h2 id="使用-元素" tabindex="-1"><a class="header-anchor" href="#使用-元素"><span>“使用”元素</span></a></h2><p>Use 元素允许您重用图形元素，而不需要重新定义它们。</p><p>“ use”的基本句法是:</p><pre><code class="language-html">&lt; use xlink: href = &quot; # id&quot; x-coord&quot; y = &quot; x-coord&quot;/&gt;
</code></pre><p>可以使用的元素是:<code>{ g，symbol，svg，use }</code></p><p>元素有可选属性 x，y，width 和 height，用于将参考元素的图形化内容映射到当前坐标系中的矩形区域。</p>`,8),u=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100">
<g id="abc46"
 style="fill:yellow; stroke:blue; stroke-width:5" >
 <rect x="9" y="0" width="30" height="80"/>
 <circle cx="50" cy="50" r="20"/>
</g>

<use xlink:href="#abc46" x="50" y="0" />

</svg>
`)],-1),y=e("p",null,[n("例如"),e("code",null,"use")],-1),_=e("h2",{id:"defs-元素",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#defs-元素"},[e("span",null,"“ defs”元素")])],-1),m=e("p",null,"Defs 元素允许您定义一些图形元素，然后在其他地方重用该定义。(这就像程序设计语言中的变量，其中变量名是 id 属性值。)",-1),x=e("p",null,"Defs 元素的基本语法是:",-1),v=e("p",null,[n("图形元素 "),e("code",null,"</def >"),n(" →定义几个东西，由 id 引用。")],-1),S=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100">
<defs id="c">
 <circle cx="10" cy="10" r="10"/>
</defs>
</svg>
`)],-1),f=o('<p>例子<code>defs</code></p><p>注意: “ defs”不呈现图形，它只定义图形。</p><p>若要使用已定义的元素，请使用标记。</p><hr><p>有些 SVG 样式属性名称不同于 CSS。</p><p>有4种方法来指定 SVG 样式:</p><ol><li>元素属性。例如,<code>&lt;line … stroke=&quot;black&quot; /&gt;</code></li><li>在标记中将内联 CSS 作为样式属性,<code>&lt;line style=&quot;stroke:black;…&quot; …/&gt;</code></li><li>内部 CSS. (在文件头中声明)</li><li>指向样式文件的链接</li></ol><p>下面是对每一个问题的解释。</p><h2 id="_1-svg-element-attribute" tabindex="-1"><a class="header-anchor" href="#_1-svg-element-attribute"><span>1，SVG Element Attribute</span></a></h2>',9),w=e("pre",null,[e("code",{class:"language-html"},`<line x1="0" y1="0" x2="50" y2="10" stroke="black" />
`)],-1),V=e("p",null,"Stroke 是 SVG line 元素的样式属性。",-1),C=e("h2",{id:"_2-inline-css-style-attribute",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-inline-css-style-attribute"},[e("span",null,"2，Inline CSS (style attribute)")])],-1),k=e("pre",null,[e("code",{class:"language-html"},`<!-- inline styling -->
<line x1="0" y1="0" x2="50" y2="10" style="stroke:black" />
`)],-1),M=e("p",null,"Style = val 是对每个 SVG 元素进行样式化的通用方法。",-1),b=e("h2",{id:"_3-内部-css-在文件头",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-内部-css-在文件头"},[e("span",null,"3，内部 CSS (在文件头)")])],-1),J=e("p",null,"下面是一个内部样式表的例子:",-1),A=e("pre",null,[e("code",{class:"language-html"},`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="12cm" height="3cm" viewBox="0 0 1200 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style type="text/css">
    <![CDATA[
      #x123 { fill: blue }
      path { fill-opacity: .5 }
      .y567 { stroke-linecap: round }
    ]]>
  </style>
</svg>
`)],-1),K=e("p",null,"注意: 因为它是 XML 文件，所以必须用 < ! [ CDATA [ ... ]] > 把它括起来。",-1),j=e("h2",{id:"_4-外部-css-链接到样式文件",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_4-外部-css-链接到样式文件"},[e("span",null,"4，外部 CSS (链接到样式文件)")])],-1),F=e("p",null,"下面是一个外部样式表的例子，基本上是一个样式文件的链接:",-1),T=e("pre",null,[e("code",{class:"language-html"},`<!-- external style sheet-->
<?xml version="1.0" standalone="no"?>
<?xml-stylesheet href="my_style.css" type="text/css"?>
<!DOCTYPE svg …>
<svg …>
…
</svg>
`)],-1),I=e("hr",null,null,-1),q=e("h2",{id:"单位是用户坐标",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#单位是用户坐标"},[e("span",null,"单位是用户坐标")])],-1),E=e("p",null,[n("当你使用字体大小属性的时候，比如说"),e("code",null,'x = "0" y = " 100" font-size = " 16" > e 16 </text >'),n("，这个单位就是用户坐标。")],-1),R=e("p",null,"[参见 SVG: viewBox，用户坐标]",-1),Q=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100">
<text x="0" y="100" font-size="100">E 100</text>
</svg>
`)],-1),B=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100" viewBox="0 0 500 500">
<text x="0" y="500" font-size="100">E 100</text>
`)],-1),z=e("p",null,"两个 SVG 的 font-size 都是100。但第一个 SVG 的宽度高度为100100，第二个 SVG 的用户坐标宽度高度为500500",-1),Y=e("h2",{id:"百分比价值",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#百分比价值"},[e("span",null,"百分比价值")])],-1),D=e("p",null,"字体大小的百分比值表示相对于默认字体大小的值。",-1),G=e("p",null,"“100%”等于 font-size = “16”",-1),U=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100">
<text x="0" y="50" font-size="16">E 16</text>
<text x="0" y="70" font-size="100%">E 100%</text>
</svg>
`)],-1),X=e("p",null,[e("code",null,'font-size="16"'),n(" vs ，在 SVG 框的宽度高度100100")],-1),L=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100">
<text x="0" y="100" font-size="200%">E 200%</text>
</svg>
`)],-1),N=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100" viewBox="0 0 500 500">
<text x="0" y="500" font-size="200%">E 200%</text>
</svg>
`)],-1),H=e("p",null,"两个 SVG 的文本都有 ，但第一个 SVG 的宽度高度为100100，第二个 SVG 的用户坐标宽度高度为500500",-1),P=e("h2",{id:"属性-vs-css",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#属性-vs-css"},[e("span",null,"属性 vs CSS")])],-1),W=e("p",null,"字体大小也可以由 CSS 指定，例如: style = “ Font-size: 16px”。",-1),O=e("p",null,"当使用 CSS 时，需要一个像“ px”这样的单位(这是 CSS 所要求的)",-1),Z=e("p",null,"当使用 CSS 时，“ px”长度的含义与没有单位的 SVG 字体大小属性完全相同。",-1),$=e("pre",null,[e("code",{class:"language-html"},`<text x="0" y="50" font-size="30">E 30</text>
<text x="0" y="80" style="font-size:30px">E 30px</text>
`)],-1),ee=e("p",null,"诸如 rem 或 em 之类的 CSS 单元不起作用。",-1),te=e("p",null,"CSS 值，例如1rem，被转换为16px，而16px 又是 SVG 用户坐标中的16个单位。当你使用用户坐标时，它们可能变得微小或不可见，或者变得巨大并且占满屏幕。",-1),se=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100">
<text x="0" y="100" style="font-size:1rem">1rem</text>
</svg>
`)],-1),le=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100" viewBox="0 0 500 500">
<text x="0" y="500" style="font-size:5rem">5rem</text>
</svg>
`)],-1),ne=e("p",null,"或 em 单元基本上只有16个单元，相对于 SVG 用户坐标",-1),oe=e("h2",{id:"使用-css-的百分比值",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#使用-css-的百分比值"},[e("span",null,"使用 CSS 的百分比值")])],-1),ie=e("p",null,"使用 CSS 的 Percentage 值与 SVG 属性的含义相同。",-1),de=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100">
<text x="0" y="50" font-size="100%">E 100%</text>
<text x="0" y="70" style="font-size:100%">E 100%</text>
</svg>
`)],-1),ce=e("p",null,"及 这里的 SVG 的宽度高度为100100",-1),ae=e("pre",null,[e("code",{class:"language-html"},`<svg width="100" height="100" viewBox="0 0 500 500">
<text x="0" y="250" font-size="200%">E 200%</text>
<text x="0" y="500" style="font-size:200%">E 200%</text>
`)],-1),he=e("p",null,[e("code",null,'font-size="200%"'),n(" vs ，在用户坐标宽度高度500500")],-1),re=e("h2",{id:"用户坐标的单位大小",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#用户坐标的单位大小"},[e("span",null,"用户坐标的单位大小")])],-1),ge=e("p",null,"有关如何在用户坐标中计算好的字体大小，请参见",-1),pe=e("p",null,"视框，用户坐标的单位大小",-1);function ue(ye,_e){const t=d("CodeDemo");return a(),c("div",null,[r,s(t,{id:"code-demo-39",type:"normal",code:"eJxVT0kOwjAM/IrlO6IsRRACL8mFpiaJMK2UBkqF+DtORA9cbM9oFvmNPt0ZFerh6WAMbfIng6uqMgiegvNphmfTaQehFXxp7HZn0HQwpIlJmGtgVhMx9+NRyNjfSDX8oBksSrKqJVVyQEeyCV5iPAgzyc59c/vmr3wvaFlMNkTLBDb76qyx2VmuKMf6J9RLV6Y8JBs/XzC2Rqw="},{default:l(()=>[g]),_:1}),p,s(t,{id:"code-demo-64",type:"normal",code:"eJxVkN0OwiAMhV+F4LVx/swook/CjWMdkNUtYcxtMb67hYwLb2hP0+8c0g+34YVccDm8DZtcHexd8X1RKM4sOGNDlg/VScNcTfpZ6dNZcdWxISwINGkcolgAsZ9uNPR9C6LCEbLYJmdRkiv5MOlBBzYTeKXJQjXm5fTjX/iF1C5B2nmNwHTkyrijI5k6T81hXZQ7Qy/VcQA2o+taYT00tLFZP56SE5ejIxdJOgJ1/PsDOQ5WaQ=="},{default:l(()=>[u]),_:1}),y,_,m,x,v,s(t,{id:"code-demo-82",type:"normal",code:"eJyrVsooyc1RslKyKS5LVyjPTCnJsI1RMjQwiFFSyEjNTM8ogXHtYvJsUlLTihUyU4BCyWABBZvkzKLknFSF5AqwMqCm5EoYqwjK0Afp1AdpBTOA9gBppVoA+1YlFA=="},{default:l(()=>[S]),_:1}),f,s(t,{id:"code-demo-129",type:"normal",code:"eJyrVsooyc1RslKyycnMS1WoMLSNUTKIUVKohDEqjIAMU7AQiGUIYhWXFOVnpwJ5STmJydlAAX27mDylWgBA3xXL"},{default:l(()=>[w]),_:1}),V,C,s(t,{id:"code-demo-138",type:"normal",code:"eJyrVsooyc1RslKyUdTVVcjMy8nMS1UoLqkE0ukKurp2MXk2YKEKQ9sYJYMYJYVKGKPCCMgwBQuBWIYgFkhjKpBTXFKUn51qlZSTmJwNFNYHGqNUCwDGoyA4"},{default:l(()=>[k]),_:1}),M,b,J,s(t,{id:"code-demo-150",type:"normal",code:"eJxtUGFPwjAU/CvP+pl1ZUHDghJghJgYJRE1hvFhbpU1lHZZC9tC+O++Dogm+qm53r17d+9AcruVJCSDYb2VsOelEVrdxYR5fkzA2ERlidSK45fSMRnex2pwFT1PFh/zKZj9Guav48eHCcSkQ+l7MKE0WkTw8jYD5jFKp0/oEuMSW4SUVlXlVYGnyzWdlUmRi9RQlFInxTGKfox5mc1i4vY4+0pkNnd5uukWrXIu1rlFHLRwL3g11jViH3xgXd+HwHfBfxdhiLGcMoj+BsEZ3y2+iMJaCrX5V8r6/T5t6TYfwMDYRnKwTeHuY3ltaWrMmUT6ajmJRovR8gQBrmvWDeAAX0LKED7ljsPxwhWJzc9URxdJKmwTgtf7EXhN7+YWFcaWesM7GIOnSRFCqXcqu8hWq1Mw2iZzR3Td8CXHb6/Mlzw="},{default:l(()=>[A]),_:1}),K,j,F,s(t,{id:"code-demo-162",type:"normal",code:"eJyrVsooyc1RslKyKS5LVyjPTCnJsI1RMjQwiFFSyEjNTM8ogXHtYvJsSlIrShQqgCIg6Uq4wrT8vBLd4syqVLhaVwUgbaMPUg/Spw80HEgr1QIAYxchjg=="},{default:l(()=>[T,I,q,E,R,s(t,{id:"code-demo-174",type:"normal",code:"eJyrVsooyc1RslKyKS5LVyjPTCnJsI1RMjQwiFFSyEjNTM8ogXHtYvJsSlIrShQqgCIg6Uq4wrT8vBLd4syqVLhaVwUgbaMPUg/Spw80HEgr1QIAYxchjg=="},{default:l(()=>[Q]),_:1})]),_:1}),s(t,{id:"code-demo-178",type:"normal",code:"eJyrVsooyc1RslKyKS5LVyjPTCnJsI1RMjQwiFFSyEjNTM8ogXPLMlPLnfIrgHwDBQMFUwMwjlGyi8mzKUmtKFEAywDVVQJpsIxCWn5eiW5xZlUqzAw7VwUgbaMPUg/Up1QLAGNWJPY="},{default:l(()=>[B]),_:1}),z,Y,D,G,s(t,{id:"code-demo-193",type:"normal",code:"eJyrVsooyc1RslKyKS5LVyjPTCnJsI1RMjQwiFFSyEjNTM8ogXHtYvJsSlIrShQqgCIg6UogbQpipOXnlegWZ1algpSaAVW6Khia2eiDFGPVZI6hycBAFaINyEBo1Ac6CUgr1QIAMOgxiA=="},{default:l(()=>[U]),_:1}),X,s(t,{id:"code-demo-199",type:"normal",code:"eJyrVsooyc1RslKyKS5LVyjPTCnJsI1RMjQwiFFSyEjNTM8ogXHtYvJsSlIrShQqgCIg6Uq4wrT8vBLd4syqVKCIkYGBKlCxqwKIYaMP0gHSqQ80Hkgr1QIAnpkh2g=="},{default:l(()=>[L]),_:1}),s(t,{id:"code-demo-202",type:"normal",code:"eJw9TTsKgDAMvUoIOIpRcJHqIHiLjlZb8DMYbFW8u2kHh/DyfrwHLa8LNqiOcwbvRratxpJII1jjZss/PZ3x/R6EExDUlE5jpzfFJjAkR3KXYHJg2jfOD3cbUSqiTMIDxEcVsRGbhcwK4vsB3yAoBQ=="},{default:l(()=>[N]),_:1}),H,P,W,O,Z,s(t,{id:"code-demo-220",type:"normal",code:"eJyrVsooyc1RslKyKUmtKFGosI1RMohRUqgE0qYgRlp+XolucWZVKlDAGChg56pgbGCjD1JsF5OHqckCxCguqcwBaYBrtjI2KKiAai6ogGtXqgUAqJInUg=="},{default:l(()=>[$]),_:1}),ee,te,s(t,{id:"code-demo-229",type:"normal",code:"eJw9jU0KgCAQha8is490K9ZJXDapoAY5lBbdvXFRq8f7+Xg3eEoRNJhyOHGGhfxkQUlpQXgMztNnZ5sNYSVROel1+4eFWkR265ZpKOFCrXZMjHQxY6c6PfIFKzwvawMlXA=="},{default:l(()=>[se]),_:1}),s(t,{id:"code-demo-232",type:"normal",code:"eJw9jbsKgDAMRX8lZBfj4CLVwe/oaLQFH2CDWsV/N+3gEC6Hm8N90MkyY4MmHBOcfhDXWqyILIJjPzn58fB89tulTEBQUz6LnV2N8CWQG/2LmrmBIHFmpXFbpQj+5qbeeVElhSmTlexSpzXx/QDFCiuP"},{default:l(()=>[le]),_:1}),ne,oe,ie,s(t,{id:"code-demo-244",type:"normal",code:"eJyrVsooyc1RslKyKS5LVyjPTCnJsI1RMjQwiFFSyEjNTM8ogXHtYvJsSlIrShQqgCIg6UogbQpipOXnlegWZ1alQpSqAtW6KoAYNvogDVg1moMYxSWVOSBNcAOscGjXBzoOSCvVAgAXFzSR"},{default:l(()=>[de]),_:1}),ce,s(t,{id:"code-demo-250",type:"normal",code:"eJxtjL0KgDAMhF8lBBzFKLhIdRB8i45WW/BnaPAX392mg5NDyF1y391oeZ6wQuW3EXbXs6015kQawRo3Wv7s5szerkfwBAQlxdHY6EWxORjiJ+TOsItS1LAunHp3GbkQJSHcgQiVCfFLxk7wfE5CfQ3VP4/PC2msOFk="},{default:l(()=>[ae]),_:1}),he,re,ge,pe])}const xe=i(h,[["render",ue],["__file","5.svg-elements.html.vue"]]),ve=JSON.parse('{"path":"/frontend/drawing/5.svg-elements.html","title":"svg元素","lang":"zh-CN","frontmatter":{"order":5,"description":"svg元素 g元素 “ g”元素用于将几个图形元素组合在一起。 <g id=val style=val >elements</g> 将一组元素分组 分组是有用的，因为: 在其他地方或多次重用图形集，而不需要每次都定义它们 对组中的所有图形使用单一样式, 对组中的所有图形应用坐标变换坐标变换] 使用的例子 分组 若要在其他位置使用分组图形，请使用 use...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/drawing/5.svg-elements.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"svg元素"}],["meta",{"property":"og:description","content":"svg元素 g元素 “ g”元素用于将几个图形元素组合在一起。 <g id=val style=val >elements</g> 将一组元素分组 分组是有用的，因为: 在其他地方或多次重用图形集，而不需要每次都定义它们 对组中的所有图形使用单一样式, 对组中的所有图形应用坐标变换坐标变换] 使用的例子 分组 若要在其他位置使用分组图形，请使用 use..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T16:22:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-26T16:22:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"svg元素\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-26T16:22:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"g元素","slug":"g元素","link":"#g元素","children":[]},{"level":2,"title":"“使用”元素","slug":"使用-元素","link":"#使用-元素","children":[]},{"level":2,"title":"“ defs”元素","slug":"defs-元素","link":"#defs-元素","children":[]},{"level":2,"title":"1，SVG Element Attribute","slug":"_1-svg-element-attribute","link":"#_1-svg-element-attribute","children":[]},{"level":2,"title":"2，Inline CSS (style attribute)","slug":"_2-inline-css-style-attribute","link":"#_2-inline-css-style-attribute","children":[]},{"level":2,"title":"3，内部 CSS (在文件头)","slug":"_3-内部-css-在文件头","link":"#_3-内部-css-在文件头","children":[]},{"level":2,"title":"4，外部 CSS (链接到样式文件)","slug":"_4-外部-css-链接到样式文件","link":"#_4-外部-css-链接到样式文件","children":[]},{"level":2,"title":"百分比价值","slug":"百分比价值","link":"#百分比价值","children":[]},{"level":2,"title":"属性 vs CSS","slug":"属性-vs-css","link":"#属性-vs-css","children":[]},{"level":2,"title":"使用 CSS 的百分比值","slug":"使用-css-的百分比值","link":"#使用-css-的百分比值","children":[]},{"level":2,"title":"用户坐标的单位大小","slug":"用户坐标的单位大小","link":"#用户坐标的单位大小","children":[]}],"git":{"createdTime":1649487947000,"updatedTime":1653582152000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.8,"words":1440},"filePathRelative":"frontend/drawing/5.svg-elements.md","localizedDate":"2022年4月9日","autoDesc":true}');export{xe as comp,ve as data};
