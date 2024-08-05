import{_ as e,c as t,o as n,d as i}from"./app-CbULZrmi.js";const r={},o=i(`<h1 id="网络相关" tabindex="-1"><a class="header-anchor" href="#网络相关"><span>网络相关</span></a></h1><ul><li><p>ping</p></li><li><p>telnet</p></li><li><p>nslookup</p></li><li><p>netsh</p></li><li></li></ul><pre><code class="language-powershell">Get-NetTCPConnection
# 获取已建立的链接
Get-NetTCPConnection -State Established
</code></pre><h2 id="get-netipaddress" tabindex="-1"><a class="header-anchor" href="#get-netipaddress"><span>Get-NetIPAddress</span></a></h2><pre><code class="language-powershell">Get-NetIPAddress
   [[-IPAddress] &lt;String[]&gt;]
   [-InterfaceIndex &lt;UInt32[]&gt;]
   [-InterfaceAlias &lt;String[]&gt;]
   [-AddressFamily &lt;AddressFamily[]&gt;]
   [-Type &lt;Type[]&gt;]
   [-PrefixLength &lt;Byte[]&gt;]
   [-PrefixOrigin &lt;PrefixOrigin[]&gt;]
   [-SuffixOrigin &lt;SuffixOrigin[]&gt;]
   [-AddressState &lt;AddressState[]&gt;]
   [-ValidLifetime &lt;TimeSpan[]&gt;]
   [-PreferredLifetime &lt;TimeSpan[]&gt;]
   [-SkipAsSource &lt;Boolean[]&gt;]
   [-AssociatedIPInterface &lt;CimInstance&gt;]
   [-PolicyStore &lt;String&gt;]
   [-IncludeAllCompartments]
   [-CimSession &lt;CimSession[]&gt;]
   [-ThrottleLimit &lt;Int32&gt;]
   [-AsJob]
   [&lt;CommonParameters&gt;]

Get-NetIPAddress | Format-Table
</code></pre>`,5),s=[o];function a(l,d){return n(),t("div",null,s)}const c=e(r,[["render",a],["__file","network.html.vue"]]),g=JSON.parse('{"path":"/windows-tutor/powershell/basics/network.html","title":"网络相关","lang":"zh-CN","frontmatter":{"description":"网络相关 ping telnet nslookup netsh Get-NetIPAddress","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/basics/network.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"网络相关"}],["meta",{"property":"og:description","content":"网络相关 ping telnet nslookup netsh Get-NetIPAddress"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-05T22:42:48.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-05T22:42:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络相关\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-05T22:42:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Get-NetIPAddress","slug":"get-netipaddress","link":"#get-netipaddress","children":[]}],"git":{"createdTime":1659275609000,"updatedTime":1659739368000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.22,"words":67},"filePathRelative":"windows-tutor/powershell/basics/network.md","localizedDate":"2022年7月31日","autoDesc":true}');export{c as comp,g as data};
