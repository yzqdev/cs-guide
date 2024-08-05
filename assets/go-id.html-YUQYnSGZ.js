import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const r={},i=o(`<h1 id="id生成策略" tabindex="-1"><a class="header-anchor" href="#id生成策略"><span>id生成策略</span></a></h1><h2 id="雪花算法生成id" tabindex="-1"><a class="header-anchor" href="#雪花算法生成id"><span>雪花算法生成id</span></a></h2><p>使用<a href="https://github.com/bwmarrin/snowflake" target="_blank" rel="noopener noreferrer">https://github.com/bwmarrin/snowflake</a></p><pre><code class="language-go">package main

import (
 &quot;fmt&quot;

 &quot;github.com/bwmarrin/snowflake&quot;
)

func main() {

 // Create a new Node with a Node number of 1
 node, err := snowflake.NewNode(1)
 if err != nil {
  fmt.Println(err)
  return
 }

 // Generate a snowflake ID.
 id := node.Generate()

 // Print out the ID in a few different ways.
 fmt.Printf(&quot;Int64  ID: %d\\n&quot;, id)
 fmt.Printf(&quot;String ID: %s\\n&quot;, id)
 fmt.Printf(&quot;Base2  ID: %s\\n&quot;, id.Base2())
 fmt.Printf(&quot;Base64 ID: %s\\n&quot;, id.Base64())

 // Print out the ID&#39;s timestamp
 fmt.Printf(&quot;ID Time  : %d\\n&quot;, id.Time())

 // Print out the ID&#39;s node number
 fmt.Printf(&quot;ID Node  : %d\\n&quot;, id.Node())

 // Print out the ID&#39;s sequence number
 fmt.Printf(&quot;ID Step  : %d\\n&quot;, id.Step())

  // Generate and print, all in one.
  fmt.Printf(&quot;ID       : %d\\n&quot;, node.Generate().Int64())
}
</code></pre><h2 id="生成uuid" tabindex="-1"><a class="header-anchor" href="#生成uuid"><span>生成uuid</span></a></h2><table><thead><tr><th style="text-align:left;">package</th><th style="text-align:left;">id</th><th style="text-align:left;">format</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="https://github.com/segmentio/ksuid" target="_blank" rel="noopener noreferrer">github.com/segmentio/ksuid</a>421</td><td style="text-align:left;"><code>0pPKHjWprnVxGH7dEsAoXX2YQvU</code></td><td style="text-align:left;">4 bytes of time (seconds) + 16 random bytes</td></tr><tr><td style="text-align:left;"><a href="https://github.com/rs/xid" target="_blank" rel="noopener noreferrer">github.com/rs/xid</a>960</td><td style="text-align:left;"><code>b50vl5e54p1000fo3gh0</code></td><td style="text-align:left;">4 bytes of time (seconds) + 3 byte machine id + 2 byte process id + 3 bytes random</td></tr><tr><td style="text-align:left;"><a href="https://github.com/kjk/betterguid" target="_blank" rel="noopener noreferrer">github.com/kjk/betterguid</a>96</td><td style="text-align:left;"><code>-Kmdih_fs4ZZccpx2Hl1</code></td><td style="text-align:left;">8 bytes of time (milliseconds) + 9 random bytes</td></tr><tr><td style="text-align:left;"><a href="https://github.com/sony/sonyflake" target="_blank" rel="noopener noreferrer">github.com/sony/sonyflake</a>283</td><td style="text-align:left;"><code>20f8707d6000108</code></td><td style="text-align:left;">~6 bytes of time (10 ms) + 1 byte sequence + 2 bytes machine id</td></tr><tr><td style="text-align:left;"><a href="https://github.com/oklog/ulid" target="_blank" rel="noopener noreferrer">github.com/oklog/ulid</a>142</td><td style="text-align:left;"><code>01BJMVNPBBZC3E36FJTGVF0C4S</code></td><td style="text-align:left;">6 bytes of time (milliseconds) + 8 bytes random</td></tr><tr><td style="text-align:left;"><a href="https://github.com/chilts/sid" target="_blank" rel="noopener noreferrer">github.com/chilts/sid</a>105</td><td style="text-align:left;"><code>1JADkqpWxPx-4qaWY47~FqI</code></td><td style="text-align:left;">8 bytes of time (ns) + 8 random bytes</td></tr><tr><td style="text-align:left;"><a href="https://github.com/gofrs/uuid" target="_blank" rel="noopener noreferrer">github.com/satori/go.uuid</a>582</td><td style="text-align:left;"><code>5b52d72c-82b3-4f8e-beb5-437a974842c</code></td><td style="text-align:left;">UUIDv4 from <a href="http://tools.ietf.org/html/rfc4122" target="_blank" rel="noopener noreferrer">RFC 4112</a>44 for comparison</td></tr><tr><td style="text-align:left;"><a href="https://github.com/edwingeng/wuid" target="_blank" rel="noopener noreferrer">https://github.com/edwingeng/wuid</a></td><td style="text-align:left;"><code>187500764</code></td><td style="text-align:left;">6 bytes</td></tr></tbody></table>`,6),d=[i];function a(l,s){return n(),e("div",null,d)}const f=t(r,[["render",a],["__file","go-id.html.vue"]]),m=JSON.parse('{"path":"/go-tutor/framework/gorm/go-id.html","title":"id生成策略","lang":"zh-CN","frontmatter":{"description":"id生成策略 雪花算法生成id 使用https://github.com/bwmarrin/snowflake 生成uuid","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/framework/gorm/go-id.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"id生成策略"}],["meta",{"property":"og:description","content":"id生成策略 雪花算法生成id 使用https://github.com/bwmarrin/snowflake 生成uuid"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-22T07:03:15.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-22T07:03:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"id生成策略\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-22T07:03:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"雪花算法生成id","slug":"雪花算法生成id","link":"#雪花算法生成id","children":[]},{"level":2,"title":"生成uuid","slug":"生成uuid","link":"#生成uuid","children":[]}],"git":{"createdTime":1652718387000,"updatedTime":1684738995000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.89,"words":266},"filePathRelative":"go-tutor/framework/gorm/go-id.md","localizedDate":"2022年5月16日","autoDesc":true}');export{f as comp,m as data};
