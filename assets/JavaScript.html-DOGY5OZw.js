import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const r={},s=a(`<h1 id="js代码片段" tabindex="-1"><a class="header-anchor" href="#js代码片段"><span>js代码片段</span></a></h1><h2 id="格式化文件大小" tabindex="-1"><a class="header-anchor" href="#格式化文件大小"><span>格式化文件大小</span></a></h2><pre><code class="language-javascript">//格式化文件大小
export const renderSize = value =&gt; {
  if (null == value || value == &#39;&#39;) {
    return &#39;0 Bytes&#39;
  }
  let unitArr = new Array(&#39;Bytes&#39;, &#39;KB&#39;, &#39;MB&#39;, &#39;GB&#39;, &#39;TB&#39;, &#39;PB&#39;, &#39;EB&#39;, &#39;ZB&#39;, &#39;YB&#39;)
  let index = 0
  let srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size = srcsize / Math.pow(1024, index)
  size = size.toFixed(2) //保留的小数位数
  return size + unitArr[index]
}

</code></pre><h2 id="文本链接复制" tabindex="-1"><a class="header-anchor" href="#文本链接复制"><span>文本链接复制</span></a></h2><pre><code class="language-javascript">copyPersonURL(content) {
    let that = this
    if (window.ClipboardData) {
        window.clipboardData.setData(&#39;text&#39;, content)
        this.$message.success(&#39;链接复制成功&#39;)
    } else {
        ;(function (content) {
            document.oncopy = function (e) {
                e.clipboardData.setData(&#39;text&#39;, content)
                e.preventDefault()
                document.oncopy = null
                that.$message.success(&#39;链接复制成功&#39;)
            }
        })(content)
        document.execCommand(&#39;Copy&#39;)
    }
},

</code></pre><h2 id="时间戳转换-可以用dayjs替换" tabindex="-1"><a class="header-anchor" href="#时间戳转换-可以用dayjs替换"><span>时间戳转换(可以用dayjs替换)</span></a></h2><pre><code class="language-javascript">// 时间戳转年月日 时分秒
export const Time = value =&gt; {
  return transformTime(value)
}
function transformTime(timestamp = +new Date()) {
  if (timestamp) {
    let time = new Date(timestamp)
    let y = time.getFullYear()
    let M = time.getMonth() + 1
    let d = time.getDate()
    let h = time.getHours()
    let m = time.getMinutes()
    let s = time.getSeconds()
    return y + &#39;-&#39; + addZero(M) + &#39;-&#39; + addZero(d) + &#39; &#39; + addZero(h) + &#39;:&#39; + addZero(m) + &#39;:&#39; + addZero(s)
  } else {
    return &#39;&#39;
  }
}
function addZero(m) {
  return m &lt; 10 ? &#39;0&#39; + m : m
}

</code></pre><h2 id="数据类型验证" tabindex="-1"><a class="header-anchor" href="#数据类型验证"><span>数据类型验证</span></a></h2><pre><code class="language-javascript">function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    &#39;[object Boolean]&#39;  : &#39;boolean&#39;,
    &#39;[object Number]&#39;   : &#39;number&#39;,
    &#39;[object String]&#39;   : &#39;string&#39;,
    &#39;[object Function]&#39; : &#39;function&#39;,
    &#39;[object Array]&#39;    : &#39;array&#39;,
    &#39;[object Date]&#39;     : &#39;date&#39;,
    &#39;[object RegExp]&#39;   : &#39;regExp&#39;,
    &#39;[object Undefined]&#39;: &#39;undefined&#39;,
    &#39;[object Null]&#39;     : &#39;null&#39;,
    &#39;[object Object]&#39;   : &#39;object&#39;,
    &#39;[object FormData]&#39; : &#39;formData&#39;
  };
  return map[toString.call(obj)];
}

</code></pre><h2 id="h5全屏代码" tabindex="-1"><a class="header-anchor" href="#h5全屏代码"><span>h5全屏代码</span></a></h2><pre><code class="language-javascript">function fullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
fullscreen(document.documentElement)
</code></pre><h2 id="字符串中某字符出现最多次数" tabindex="-1"><a class="header-anchor" href="#字符串中某字符出现最多次数"><span>字符串中某字符出现最多次数</span></a></h2><pre><code class="language-javascript">/**
 * @param {String}str 只接受字符串类型
 * @return{JSON} key:出现最多字符， value:出现次数;  数组类型不是String类型，则返回空对象
 **/
function getMax(str) {
  let hash = {};
  let num = 0;
  let json = {}; //返回的对象
  //判断是否是字符串
  if (Object.prototype.toString.call(str) !== &quot;[object String]&quot;) {
    return json;
  }
  for (let i = 0; i &lt; str.length; i++) {
    if (hash[str[i]] === undefined) {
      hash[str[i]] = 1;
    } else {
      hash[str[i]]++;
    }
  }
  for (let item in hash) {
    if (num &lt; hash[item]) {
      num = hash[item];
      json = { 字符: item, 次数: hash[item] };
    }
  }
  return json;
}
console.log(getMax(&quot;aaaabbbbcccccccceeeeeeeeeeeeeeetttttttttt&quot;))
</code></pre><h2 id="字符串中某字符出现次数" tabindex="-1"><a class="header-anchor" href="#字符串中某字符出现次数"><span>字符串中某字符出现次数</span></a></h2><pre><code class="language-javascript">function getMost(str) {
  // 步骤1
  let result = {};
  for (let i in str) {
    if (str[i] in result) {
      // 步骤2
      result[str[i]]++;
    } else {
      // 步骤3
      let object = {};
      object[str[i]] = 1;
      result = Object.assign(result, object);
    }
  }
  return result;
}

let result = getMost(&quot;xyzzyxyz&quot;);
console.log(result); //{x: 2, y: 3, z: 3}

</code></pre><h3 id="使用reduce" tabindex="-1"><a class="header-anchor" href="#使用reduce"><span>使用reduce</span></a></h3><pre><code class="language-javascript">function getMost(str) {
    let result = Array.prototype.reduce.call(str, function(allWords, curWord) {
        allWords[curWord] ? allWords[curWord]++ : allWords[curWord] = 1;
        return allWords;
    }, {});

    return result;
}

let result = getMost(&quot;xyzzyxyz&quot;);
console.log(result);        //{x: 2, y: 3, z: 3}
</code></pre><h2 id="根据id对数组进行分组" tabindex="-1"><a class="header-anchor" href="#根据id对数组进行分组"><span>根据id对数组进行分组</span></a></h2><pre><code class="language-javascript">let arr = [
  { id: &#39;1001&#39;, name: &#39;值1&#39;, value: &#39;111&#39; },
  { id: &#39;1001&#39;, name: &#39;值1&#39;, value: &#39;11111&#39; },
  { id: &#39;1002&#39;, name: &#39;值2&#39;, value: &#39;25462&#39; },
  { id: &#39;1002&#39;, name: &#39;值2&#39;, value: &#39;23131&#39; },
  { id: &#39;1002&#39;, name: &#39;值2&#39;, value: &#39;2315432&#39; },
  { id: &#39;1003&#39;, name: &#39;值3&#39;, value: &#39;333333&#39; }
]
let map = {}
let dest = []
for (let i = 0; i &lt; arr.length; i++) {
  let ai = arr[i]
  if (!map[ai.id]) {
    dest.push({
      id: ai.id,
      name: ai.name,
      data: [ai]
    })
    map[ai.id] = ai
  } else {
    for (let j = 0; j &lt; dest.length; j++) {
      let dj = dest[j]
      if (dj.id == ai.id) {
        dj.data.push(ai)
        break
      }
    }
  }
}
console.log(dest)

</code></pre><h3 id="或者使用reduce" tabindex="-1"><a class="header-anchor" href="#或者使用reduce"><span>或者使用reduce</span></a></h3><pre><code class="language-javascript">let a=[
  { name:&quot;张三1&quot;, age: 13 },
  { name:&quot;张三2&quot;, age: 13 },
  { name:&quot;张三3&quot;, age: 13 },
  { name:&quot;张三4&quot;, age: 14 },
  { name:&quot;张三5&quot;, age: 14 },
  { name:&quot;张三6&quot;, age: 14 },
  { name:&quot;张三7&quot;, age: 15 }
]
let b=a.reduce(
  (a, b) =&gt; {
    let item = a.filter(
      x =&gt; x[0] &amp;&amp; x[0].age == b.age)[0];
    item ? item.push(b) : a.push([b]);
    return a;
  },
  []
);
console.log(b)

</code></pre>`,21),l=[s];function o(i,c){return t(),n("div",null,l)}const u=e(r,[["render",o],["__file","JavaScript.html.vue"]]),p=JSON.parse('{"path":"/cs-tips/frontend/snippets/JavaScript.html","title":"js代码片段","lang":"zh-CN","frontmatter":{"description":"js代码片段 格式化文件大小 文本链接复制 时间戳转换(可以用dayjs替换) 数据类型验证 h5全屏代码 字符串中某字符出现最多次数 字符串中某字符出现次数 使用reduce 根据id对数组进行分组 或者使用reduce","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/JavaScript.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"js代码片段"}],["meta",{"property":"og:description","content":"js代码片段 格式化文件大小 文本链接复制 时间戳转换(可以用dayjs替换) 数据类型验证 h5全屏代码 字符串中某字符出现最多次数 字符串中某字符出现次数 使用reduce 根据id对数组进行分组 或者使用reduce"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"js代码片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"格式化文件大小","slug":"格式化文件大小","link":"#格式化文件大小","children":[]},{"level":2,"title":"文本链接复制","slug":"文本链接复制","link":"#文本链接复制","children":[]},{"level":2,"title":"时间戳转换(可以用dayjs替换)","slug":"时间戳转换-可以用dayjs替换","link":"#时间戳转换-可以用dayjs替换","children":[]},{"level":2,"title":"数据类型验证","slug":"数据类型验证","link":"#数据类型验证","children":[]},{"level":2,"title":"h5全屏代码","slug":"h5全屏代码","link":"#h5全屏代码","children":[]},{"level":2,"title":"字符串中某字符出现最多次数","slug":"字符串中某字符出现最多次数","link":"#字符串中某字符出现最多次数","children":[]},{"level":2,"title":"字符串中某字符出现次数","slug":"字符串中某字符出现次数","link":"#字符串中某字符出现次数","children":[{"level":3,"title":"使用reduce","slug":"使用reduce","link":"#使用reduce","children":[]}]},{"level":2,"title":"根据id对数组进行分组","slug":"根据id对数组进行分组","link":"#根据id对数组进行分组","children":[{"level":3,"title":"或者使用reduce","slug":"或者使用reduce","link":"#或者使用reduce","children":[]}]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.36,"words":708},"filePathRelative":"cs-tips/frontend/snippets/JavaScript.md","localizedDate":"2023年5月25日","autoDesc":true}');export{u as comp,p as data};
