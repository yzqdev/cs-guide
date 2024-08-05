import{_ as e,c as n,o as a,d as r}from"./app-CbULZrmi.js";const t={},s=r(`<h1 id="js算法" tabindex="-1"><a class="header-anchor" href="#js算法"><span>js算法</span></a></h1><h2 id="_1、js-统计一个字符串出现频率最高的字母-数字" tabindex="-1"><a class="header-anchor" href="#_1、js-统计一个字符串出现频率最高的字母-数字"><span>1、js 统计一个字符串出现频率最高的字母/数字</span></a></h2><pre><code class="language-javascript">let str = &quot;asdfghjklaqwertyuiopiaia&quot;;
const strChar = (str) =&gt; {
  let string = [...str],
    maxValue = &quot;&quot;,
    obj = {},
    max = 0;
  string.forEach((value) =&gt; {
    obj[value] = obj[value] === undefined ? 1 : obj[value] + 1;
    if (obj[value] &gt; max) {
      max = obj[value];
      maxValue = value;
    }
  });
  return maxValue;
};
console.log(strChar(str)); // a
</code></pre><h2 id="_2、数组去重" tabindex="-1"><a class="header-anchor" href="#_2、数组去重"><span>2、数组去重</span></a></h2><h3 id="_2-1、foreach" tabindex="-1"><a class="header-anchor" href="#_2-1、foreach"><span>2.1、forEach</span></a></h3><pre><code class="language-javascript">let arr = [&#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;1&#39;, &#39;a&#39;, &#39;b&#39;, &#39;b&#39;]
const unique = arr =&gt; {
    let obj = {}
    arr.forEach(value =&gt; {
        obj[value] = 0
    })
    return Object.keys(obj)
}
console.log(unique(arr))  // [&#39;1&#39;,&#39;2&#39;,&#39;3&#39;,&#39;a&#39;,&#39;b&#39;]
</code></pre><h3 id="_2-2、filter" tabindex="-1"><a class="header-anchor" href="#_2-2、filter"><span>2.2、filter</span></a></h3><pre><code class="language-javascript">let arr = [&#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;1&#39;, &#39;a&#39;, &#39;b&#39;, &#39;b&#39;]
const unique = arr =&gt; {
    return arr.filter((ele, index, array) =&gt; {
        return index === array.indexOf(ele)
    })
}
console.log(unique(arr))  // [&#39;1&#39;,&#39;2&#39;,&#39;3&#39;,&#39;a&#39;,&#39;b&#39;]
</code></pre><h3 id="_2-3、set" tabindex="-1"><a class="header-anchor" href="#_2-3、set"><span>2.3、set</span></a></h3><pre><code class="language-javascript">let arr = [&#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;1&#39;, &#39;a&#39;, &#39;b&#39;, &#39;b&#39;]
const unique = arr =&gt; {
    return [...new Set(arr)]
}
console.log(unique(arr))  // [&#39;1&#39;,&#39;2&#39;,&#39;3&#39;,&#39;a&#39;,&#39;b&#39;]
</code></pre><h3 id="_2-4、reduce" tabindex="-1"><a class="header-anchor" href="#_2-4、reduce"><span>2.4、reduce</span></a></h3><pre><code class="language-javascript">let arr = [&#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;1&#39;, &#39;a&#39;, &#39;b&#39;, &#39;b&#39;]
const unique = arr.reduce((map, item) =&gt; {
    map[item] = 0
    return map
}, {})
console.log(Object.keys(unique))  // [&#39;1&#39;,&#39;2&#39;,&#39;3&#39;,&#39;a&#39;,&#39;b&#39;]

</code></pre><h2 id="_3、翻转字符串" tabindex="-1"><a class="header-anchor" href="#_3、翻转字符串"><span>3、翻转字符串</span></a></h2><pre><code class="language-javascript">let str =&quot;Hello Dog&quot;;
const reverseString = str =&gt;{
    return [...str].reverse().join(&quot;&quot;);
}
console.log(reverseString(str))   // goD olleH

</code></pre><h2 id="_4、数组中最大差值" tabindex="-1"><a class="header-anchor" href="#_4、数组中最大差值"><span>4、数组中最大差值</span></a></h2><h3 id="_4-1、foreach" tabindex="-1"><a class="header-anchor" href="#_4-1、foreach"><span>4.1、forEach</span></a></h3><pre><code class="language-javascript">let arr = [23, 4, 5, 2, 4, 5, 6, 6, 71, -3];
const difference = arr =&gt; {
    let min = arr[0],
        max = 0;
    arr.forEach(value =&gt; {
        if (value &lt; min) min = value
        if (value &gt; max) max = value
    })
    return max - min ;
}
console.log(difference(arr))  // 74
</code></pre><h3 id="_4-2、max、min" tabindex="-1"><a class="header-anchor" href="#_4-2、max、min"><span>4.2、max、min</span></a></h3><pre><code class="language-javascript">let arr = [23, 4, 5, 2, 4, 5, 6, 6, 71, -3];
const difference = arr =&gt; {
    let max = Math.max(...arr),
        min = Math.min(...arr);
    return max - min ;
}
console.log(difference(arr)) // 74

</code></pre><h2 id="_5、不借助临时变量-进行两个整数的交换" tabindex="-1"><a class="header-anchor" href="#_5、不借助临时变量-进行两个整数的交换"><span>5、不借助临时变量，进行两个整数的交换</span></a></h2><h3 id="_5-1、数组解构" tabindex="-1"><a class="header-anchor" href="#_5-1、数组解构"><span>5.1、数组解构</span></a></h3><pre><code class="language-javascript">let a = 2,
    b = 3;
    [b,a] = [a,b]
    console.log(a,b)   // 3 2

</code></pre><h3 id="_5-2、算术运算-加减" tabindex="-1"><a class="header-anchor" href="#_5-2、算术运算-加减"><span>5.2、算术运算（加减）</span></a></h3><p>输入a = 2,b = 3,输出 a = 3,b = 2</p><pre><code class="language-javascript">let a = 2,
    b = 3;
const swop = (a, b) =&gt; {
    b = b - a;
    a = a + b;
    b = a - b;
    return [a,b];
}
console.log(swop(2,3)) // [3,2]

</code></pre><h3 id="_5-3、逻辑运算-异或" tabindex="-1"><a class="header-anchor" href="#_5-3、逻辑运算-异或"><span>5.3、逻辑运算（异或）</span></a></h3><pre><code class="language-javascript">let a = 2,
    b = 3;
const swop = (a, b) =&gt; {
    a ^= b; //x先存x和y两者的信息
    b ^= a; //保持x不变，利用x异或反转y的原始值使其等于x的原始值
    a ^= b; //保持y不变，利用x异或反转y的原始值使其等于y的原始值
    return [a,b];
}
console.log(swop(2,3)) // [3,2]

</code></pre><h2 id="_6、排序-从小到大" tabindex="-1"><a class="header-anchor" href="#_6、排序-从小到大"><span>6、排序 (从小到大)</span></a></h2><h3 id="_6-1、冒泡排序" tabindex="-1"><a class="header-anchor" href="#_6-1、冒泡排序"><span>6.1、冒泡排序</span></a></h3><pre><code class="language-javascript">let arr = [43, 32, 1, 5, 9, 22];
const sort = arr =&gt; {
    arr.forEach((v, i) =&gt; {
        for (let j = i + 1; j &lt; arr.length; j++) {
            if (arr[i] &gt; arr[j]) {
                [arr[i],arr[j]] = [arr[j],arr[i]]
            }
        }
    })
    return arr
}
console.log(sort(arr))  // [1, 5, 9, 22, 32, 43]
</code></pre><pre><code class="language-javascript">// 数组分组求和
  let groupSum = {
    groupBy: function (array, callback) {
      return new Promise((resolve) =&gt; {
        let groups = {};
        array.forEach(item =&gt; {
          let group = JSON.stringify(callback(item));
          groups[group] = groups[group] || [];
          groups[group].push(item);
        });
        let res = Object.keys(groups).map(group =&gt; {
          return groups[group];
        });
        resolve(res)
      })
    },
    getSum: function (arr,bykey) {
      return new Promise((resolve) =&gt; {
        let res = this.groupBy(arr, function (item) {
          return item.shopId
        }).then(res =&gt; {
          console.log(res)
          let resultSum = res.map(item =&gt; {
            let sum = item.reduce((total, curr) =&gt; {
              return total + curr[bykey]
            }, 0);
            return sum
          })
          return resultSum
        })
        resolve(res)
      })
    }
  }
  let testArr = [
    { shopId: 1, shopName: &#39;测试&#39;, money: 0, },
    { shopId: 2, shopName: &#39;123&#39;, money: 1 },
    { shopId: 1, shopName: &#39;测试&#39;, money: 2 },
    { shopId: 1, shopName: &#39;测试&#39;, money: 3 },
    { shopId: 2, shopName: &#39;123&#39;, money: 4 },
    { shopId: 1, shopName: &#39;测试&#39;, money: 5 },
    { shopId: 2, shopName: &#39;123&#39;, money: 6 },
  ]
  groupSum.getSum(testArr,&#39;money&#39;).then(res =&gt; {
    console.log(res)
  }).catch(err =&gt; {
    console.log(err)
  })

</code></pre>`,31),l=[s];function o(i,c){return a(),n("div",null,l)}const d=e(t,[["render",o],["__file","js-algorithm.html.vue"]]),p=JSON.parse('{"path":"/frontend/interview/js-algorithm.html","title":"js算法","lang":"zh-CN","frontmatter":{"description":"js算法 1、js 统计一个字符串出现频率最高的字母/数字 2、数组去重 2.1、forEach 2.2、filter 2.3、set 2.4、reduce 3、翻转字符串 4、数组中最大差值 4.1、forEach 4.2、max、min 5、不借助临时变量，进行两个整数的交换 5.1、数组解构 5.2、算术运算（加减） 输入a = 2,b = 3,...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/interview/js-algorithm.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"js算法"}],["meta",{"property":"og:description","content":"js算法 1、js 统计一个字符串出现频率最高的字母/数字 2、数组去重 2.1、forEach 2.2、filter 2.3、set 2.4、reduce 3、翻转字符串 4、数组中最大差值 4.1、forEach 4.2、max、min 5、不借助临时变量，进行两个整数的交换 5.1、数组解构 5.2、算术运算（加减） 输入a = 2,b = 3,..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:30:24.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:30:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"js算法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:30:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1、js 统计一个字符串出现频率最高的字母/数字","slug":"_1、js-统计一个字符串出现频率最高的字母-数字","link":"#_1、js-统计一个字符串出现频率最高的字母-数字","children":[]},{"level":2,"title":"2、数组去重","slug":"_2、数组去重","link":"#_2、数组去重","children":[{"level":3,"title":"2.1、forEach","slug":"_2-1、foreach","link":"#_2-1、foreach","children":[]},{"level":3,"title":"2.2、filter","slug":"_2-2、filter","link":"#_2-2、filter","children":[]},{"level":3,"title":"2.3、set","slug":"_2-3、set","link":"#_2-3、set","children":[]},{"level":3,"title":"2.4、reduce","slug":"_2-4、reduce","link":"#_2-4、reduce","children":[]}]},{"level":2,"title":"3、翻转字符串","slug":"_3、翻转字符串","link":"#_3、翻转字符串","children":[]},{"level":2,"title":"4、数组中最大差值","slug":"_4、数组中最大差值","link":"#_4、数组中最大差值","children":[{"level":3,"title":"4.1、forEach","slug":"_4-1、foreach","link":"#_4-1、foreach","children":[]},{"level":3,"title":"4.2、max、min","slug":"_4-2、max、min","link":"#_4-2、max、min","children":[]}]},{"level":2,"title":"5、不借助临时变量，进行两个整数的交换","slug":"_5、不借助临时变量-进行两个整数的交换","link":"#_5、不借助临时变量-进行两个整数的交换","children":[{"level":3,"title":"5.1、数组解构","slug":"_5-1、数组解构","link":"#_5-1、数组解构","children":[]},{"level":3,"title":"5.2、算术运算（加减）","slug":"_5-2、算术运算-加减","link":"#_5-2、算术运算-加减","children":[]},{"level":3,"title":"5.3、逻辑运算（异或）","slug":"_5-3、逻辑运算-异或","link":"#_5-3、逻辑运算-异或","children":[]}]},{"level":2,"title":"6、排序 (从小到大)","slug":"_6、排序-从小到大","link":"#_6、排序-从小到大","children":[{"level":3,"title":"6.1、冒泡排序","slug":"_6-1、冒泡排序","link":"#_6-1、冒泡排序","children":[]}]}],"git":{"createdTime":1647861419000,"updatedTime":1649172624000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.32,"words":695},"filePathRelative":"frontend/interview/js-algorithm.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,p as data};
