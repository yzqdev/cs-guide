import{_ as e,c as r,o as a,d as n}from"./app-CbULZrmi.js";const t={},s=n(`<h1 id="常用代码片段" tabindex="-1"><a class="header-anchor" href="#常用代码片段"><span>常用代码片段</span></a></h1><h2 id="_1-字符串反转" tabindex="-1"><a class="header-anchor" href="#_1-字符串反转"><span>1.字符串反转</span></a></h2><p>在此示例中，我们使用展开运算符，Array的<code>reverse</code>方法和 String 的<code>join</code>方法来反转给定的字符串。</p><pre><code class="language-javascript">const reverseString = string =&gt; [...string].reverse().join(&#39;&#39;)

// 事例
reverseString(&#39;Medium&#39;) // &quot;muideM&quot;
reverseString(&#39;Better Programming&#39;) // &quot;gnimmargorP retteB&quot;


</code></pre><h2 id="_2-计算指定数字的阶乘" tabindex="-1"><a class="header-anchor" href="#_2-计算指定数字的阶乘"><span>2.计算指定数字的阶乘</span></a></h2><pre><code class="language-bash">const factorialOfNumber = number =&gt; 
  number &lt; 0
    ? (() =&gt; {
      throw new TypeError(&#39;请输入正整数&#39;)
    })()
    : number &lt;= 1
      ? 1
      : number * factorialOfNumber(number - 1)
      
      
// 事例
factorialOfNumber(4) // 24
factorialOfNumber(8) // 40320

</code></pre><h2 id="_3-将数字转换为数字数组" tabindex="-1"><a class="header-anchor" href="#_3-将数字转换为数字数组"><span>3.将数字转换为数字数组</span></a></h2><pre><code class="language-javascript">const converToArray = number =&gt; [...\`\${number}\`].map(el =&gt; parseInt(el))

// 事例
converToArray(5678) // [5, 6, 7, 8]
converToArray(12345678) // [1, 2, 3, 4, 5, 6, 7, 8]

</code></pre><h2 id="_4-检查数字是否为2的幂" tabindex="-1"><a class="header-anchor" href="#_4-检查数字是否为2的幂"><span>4.检查数字是否为2的幂</span></a></h2><pre><code>const isNumberPowerOfTwo = number =&gt; !!number &amp;&amp; (number &amp; (number - 1)) == 0

// 事例
isNumberPowerOfTwo(100) // false
isNumberPowerOfTwo(128) // true

</code></pre><h2 id="_5-从对象创建键-值对数组" tabindex="-1"><a class="header-anchor" href="#_5-从对象创建键-值对数组"><span>5.从对象创建<code>键-值</code>对数组</span></a></h2><pre><code>const keyValuePairsToArray = object =&gt; Object.keys(object)
  .map(el =&gt; [el, object[el]])

// 事例
keyValuePairsToArray({Better: 4, Programming: 2})
// [[&#39;Better&#39;, 4], [&#39;Programming&#39;, 2]]

keyValuePairsToArray({x:1, y:2, z:3})
// [[&#39;x&#39;, 1], [&#39;y&#39;, 2], [&#39;z&#39;, 3]]

</code></pre><h2 id="_6-返回数字数组中的最大值" tabindex="-1"><a class="header-anchor" href="#_6-返回数字数组中的最大值"><span>6.返回数字数组中的最大值</span></a></h2><pre><code class="language-javascript">const maxElementsFromArray = (array, number = 1) =&gt; [...array].sort((x, y) =&gt; y -x).slice(0, number)

// 事例
maxElementsFromArray([1, 2, 3, 4, 5]) // [5]

maxElementsFromArray([7, 8, 9, 10, 10], 2) // [10, 10]

</code></pre><h2 id="_7-检查数组中的所有元素是否相等" tabindex="-1"><a class="header-anchor" href="#_7-检查数组中的所有元素是否相等"><span>7. 检查数组中的所有元素是否相等</span></a></h2><pre><code class="language-javascript">const elementsAreEqual = array =&gt; array.every(el =&gt; el === array[0])

// 事例
elementsAreEqual([9, 8, 7, 6, 5, 4]) // false
elementsAreEqual([4, 4, 4, 4, 4]) // true

</code></pre><h2 id="_8-返回数的平均值" tabindex="-1"><a class="header-anchor" href="#_8-返回数的平均值"><span>8. 返回数的平均值</span></a></h2><pre><code class="language-javascript">const averageOfTwoNumbers = (...numbers) =&gt; numbers.reduce((accumulator, currentValue) =&gt; accumulator + currentValue, 0) / numbers.length

// 事例
averageOfTwoNumbers(...[6, 7, 8]) // 7
averageOfTwoNumbers(...[6, 7, 8, 9]) // 7.5

</code></pre><h2 id="_9-返回两个或多个数字的和" tabindex="-1"><a class="header-anchor" href="#_9-返回两个或多个数字的和"><span>9.返回两个或多个数字的和</span></a></h2><pre><code class="language-javascript">const sumOfNumbers = (...array) =&gt; [...array].reduce((accumulator, currentValue) =&gt; accumulator + currentValue, 0)

// 事例
sumOfNumbers(5, 6, 7, 8, 9, 10) // 45
sumOfNumbers(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // 50


</code></pre><h2 id="_10-返回数字数组的幂集" tabindex="-1"><a class="header-anchor" href="#_10-返回数字数组的幂集"><span>10.返回数字数组的幂集</span></a></h2><p>所谓幂集（Power Set）， 就是原集合中所有的子集（包括全集和空集）构成的集族。可数集是最小的无限集； 它的幂集和实数集一一对应（也称同势），是不可数集。 不是所有不可数集都和实数集等势，集合的势可以无限的大。如实数集的幂集也是不可数集，但它的势比实数集大。 设X是一个有限集，|X| = k，则X的幂集的势为2的k次方。</p><pre><code class="language-javascript">const powersetOfArray = array =&gt; array.reduce((accumulator, currentValue) =&gt; accumulator.concat(accumulator.map(el =&gt; [currentValue].concat(el))), [[]])

// 事例
powersetOfArray([4, 2]) // [[], [4], [2], [2, 4]]
powersetOfArray([1, 2, 3])
// [[], [1], [2], [2,1], [3], [3,1], [3,2], [3,2,1]]

</code></pre><hr>`,24),o=[s];function c(l,i){return a(),r("div",null,o)}const d=e(t,[["render",c],["__file","snippets2.html.vue"]]),u=JSON.parse('{"path":"/cs-tips/frontend/snippets/snippets2.html","title":"常用代码片段","lang":"zh-CN","frontmatter":{"description":"常用代码片段 1.字符串反转 在此示例中，我们使用展开运算符，Array的reverse方法和 String 的join方法来反转给定的字符串。 2.计算指定数字的阶乘 3.将数字转换为数字数组 4.检查数字是否为2的幂 5.从对象创建键-值对数组 6.返回数字数组中的最大值 7. 检查数组中的所有元素是否相等 8. 返回数的平均值 9.返回两个或多个...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/snippets2.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"常用代码片段"}],["meta",{"property":"og:description","content":"常用代码片段 1.字符串反转 在此示例中，我们使用展开运算符，Array的reverse方法和 String 的join方法来反转给定的字符串。 2.计算指定数字的阶乘 3.将数字转换为数字数组 4.检查数字是否为2的幂 5.从对象创建键-值对数组 6.返回数字数组中的最大值 7. 检查数组中的所有元素是否相等 8. 返回数的平均值 9.返回两个或多个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用代码片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1.字符串反转","slug":"_1-字符串反转","link":"#_1-字符串反转","children":[]},{"level":2,"title":"2.计算指定数字的阶乘","slug":"_2-计算指定数字的阶乘","link":"#_2-计算指定数字的阶乘","children":[]},{"level":2,"title":"3.将数字转换为数字数组","slug":"_3-将数字转换为数字数组","link":"#_3-将数字转换为数字数组","children":[]},{"level":2,"title":"4.检查数字是否为2的幂","slug":"_4-检查数字是否为2的幂","link":"#_4-检查数字是否为2的幂","children":[]},{"level":2,"title":"5.从对象创建键-值对数组","slug":"_5-从对象创建键-值对数组","link":"#_5-从对象创建键-值对数组","children":[]},{"level":2,"title":"6.返回数字数组中的最大值","slug":"_6-返回数字数组中的最大值","link":"#_6-返回数字数组中的最大值","children":[]},{"level":2,"title":"7. 检查数组中的所有元素是否相等","slug":"_7-检查数组中的所有元素是否相等","link":"#_7-检查数组中的所有元素是否相等","children":[]},{"level":2,"title":"8. 返回数的平均值","slug":"_8-返回数的平均值","link":"#_8-返回数的平均值","children":[]},{"level":2,"title":"9.返回两个或多个数字的和","slug":"_9-返回两个或多个数字的和","link":"#_9-返回两个或多个数字的和","children":[]},{"level":2,"title":"10.返回数字数组的幂集","slug":"_10-返回数字数组的幂集","link":"#_10-返回数字数组的幂集","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.96,"words":589},"filePathRelative":"cs-tips/frontend/snippets/snippets2.md","localizedDate":"2023年5月25日","autoDesc":true}');export{d as comp,u as data};
