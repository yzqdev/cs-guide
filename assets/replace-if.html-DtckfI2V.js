import{_ as e,c as n,o as t,d as r}from"./app-CbULZrmi.js";const i={},o=r(`<h1 id="替换if" tabindex="-1"><a class="header-anchor" href="#替换if"><span>替换if</span></a></h1><h2 id="使用-array-的-includes-方法" tabindex="-1"><a class="header-anchor" href="#使用-array-的-includes-方法"><span>使用 <code>Array</code> 的 <code>includes</code> 方法</span></a></h2><blockquote><p>场景：多种条件对应相同的处理 修改前：</p></blockquote><pre><code class="language-js">function region(province) {
 let result = &#39;&#39;;
 if (
   province === &#39;广东&#39; ||
   province === &#39;广西&#39; ||
   province === &#39;福建&#39; ||
   province === &#39;浙江&#39; ||
   province === &#39;云南&#39;
 ) {
   result = &#39;南方&#39;;
 }
 if (
   province === &#39;河北&#39; ||
   province === &#39;黑龙江&#39; ||
   province === &#39;辽宁&#39; ||
   province === &#39;山东&#39; ||
   province === &#39;吉林&#39;
 ) {
   result = &#39;北方&#39;;
 }
}
   
</code></pre><p>在上面的场景中，我们通过在 <code>if</code> 语句中使用 <code>||</code> 对多种条件进行相同的处理，显而易见，这样的代码很糟糕（尤其是 <code>province === &quot;广东&quot;|| province === &quot;广西&quot;|| province === &quot;福建&quot; || province === &quot;浙江&quot; || province === &quot;云南</code>这一大串） 这种场景我们其实可以通过 <code>Array</code> 的 <code>includes</code> 方法来规避。</p><p>修改后：</p><pre><code class="language-js">function region(province) {
 let result = &#39;&#39;;
 let northProvinceArr = [&#39;河北&#39;, &#39;黑龙江&#39;, &#39;辽宁&#39;, &#39;山东&#39;, &#39;吉林&#39;];
 let southProvinceArr = [&#39;广东&#39;, &#39;广西&#39;, &#39;福建&#39;, &#39;浙江&#39;, &#39;云南&#39;];
 if (southProvinceArr.includes(province)) result = &#39;南方&#39;;
 if (northProvinceArr.includes(province)) result = &#39;北方&#39;;
}
</code></pre><p>通过这样的处理，我们的最终代码变得好看了许多。</p><h2 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式"><span>策略模式</span></a></h2><blockquote><p>场景：并列的多条件判断 修改前：</p></blockquote><pre><code class="language-js">function permission(role) {
  if (role === &#39;operations&#39;) {
    getOperationPermission();
  } else if (role === &#39;admin&#39;) {
    getAdminPermission();
  } else if (role === &#39;superAdmin&#39;) {
    getSuperAdminPermission();
  } else if (role === &#39;user&#39;) {
    getUserPermission();
  }
}
</code></pre><p>这段代码中我们就是采用 <code>if-else</code> 的方式判断多个不同的条件，不过这种多条件的判断你可能会采用 <code>switch</code> 语句：</p><pre><code class="language-js">function permission(role) {
  switch (role) {
    case &#39;operations&#39;: {
      getOperationPermission();
      break;
    }
    case &#39;admin&#39;: {
      getAdminPermission();
      break;
    }
    case &#39;superAdmin&#39;: {
      getSuperAdminPermission();
      break;
    }
    case &#39;user&#39;: {
      getUserPermission();
      break;
    }
  }
} 
</code></pre><p>这种写法虽然使代码清晰了许多，但是个人觉得依旧不合格，接下来我们看看采用策略模式后的结果。</p><p>修改后：</p><pre><code class="language-js">function permission(role) {
  const actions = {
    operations: getOperationPermission,
    admin: getAdminPermission,
    superAdmin: getSuperAdminPermission,
    user: getUserPermission,
  };
  actions[role].call();
}
 
</code></pre><p>比起前面两种写法，显然采用策略模式要更加优雅。</p><h2 id="对象数组" tabindex="-1"><a class="header-anchor" href="#对象数组"><span>对象数组</span></a></h2><blockquote><p>场景：多条件嵌套多分支判断 当我们遇到需要进行多个条件判断，同时每个条件内又需要判断多个子条件时，代码处理起来是最棘手的。一旦处理不好，代码就会变得无比糟糕。</p></blockquote><p>修改前：</p><pre><code class="language-js">function getAmount(type, quantity, price) {
  let result = 0;
  if (type === &#39;shoe&#39;) {
    if (quantity &gt; 5) {
      result = price * quantity * 0.7;
    } else {
      result = price * quantity * 0.8;
    }
  } else {
    if (quantity &gt; 5) {
      result = price * quantity * 0.9;
    } else {
      result = price * quantity * 0.95;
    }
  }
}

</code></pre><p>再来一个简单的例子</p><h3 id="使用对象" tabindex="-1"><a class="header-anchor" href="#使用对象"><span>使用对象</span></a></h3><pre><code class="language-js">let type = &#39;A&#39;

let tactics = {
    &#39;A&#39;: 1,
    &#39;B&#39;: 1,
    &#39;C&#39;: 2,
    &#39;D&#39;: 3,
    default: 0
}
console.log(tactics[type]) // 1
</code></pre><h3 id="使用map" tabindex="-1"><a class="header-anchor" href="#使用map"><span>使用map</span></a></h3><pre><code class="language-ts">// 获取折扣 -- 使用对象配置/策略模式
const getDiscount = (userKey) =&gt; {
    // 我们可以根据用户类型来生成我们的折扣对象
    let discounts = new Map([
        [&#39;普通会员&#39;, 0.9],
        [&#39;年费会员&#39;, 0.85],
        [&#39;超级会员&#39;, 0.8],
        [&#39;default&#39;, 1]
    ])
    return discounts.get(userKey) || discounts.get(&#39;default&#39;)
}
console.log(getDiscount(&#39;普通会员&#39;)) // 0.9
</code></pre><p>当遇到这种情况时，采用对象数组的方式能够得到较好的优化效果。</p><p>修改后：</p><pre><code class="language-js">function getAmount(type, quantity, price) {
  let result = 0;
  const isShoe = type === &#39;shoe&#39;;
  const greater = quantity &gt; 5;
  const discountArr = [
    { isShoe: true, greater: true, amount: 0.7 * quantity * price },
    { isShoe: true, greater: false, amount: 0.8 * quantity * price },
    { isShoe: false, greater: true, amount: 0.9 * quantity * price },
    { isShoe: false, greater: false, amount: 0.95 * quantity * price },
  ];
  result = discountArr.filter(
    (item) =&gt; item.isShoe === isShoe &amp;&amp; item.greater === greater
  )[0].amount;
}
</code></pre><h2 id="三元表达式" tabindex="-1"><a class="header-anchor" href="#三元表达式"><span>三元表达式</span></a></h2><p>在这里也顺便提一下三元表达式，在某些情境下，使用三元表达式实现条件判断会是个不错的选择，它可以让代码更加简洁（虽然在我看来，它跟 <code>if-else</code> 本质上没太大区别）。</p><p>修改前：</p><pre><code class="language-js">    if(a&gt;0){
        a+=1;
    }else{
        a-=1
    }
</code></pre><p>修改后：</p><pre><code class="language-js">  a&gt;0? a+=1 : a-=1;
</code></pre><p>不过，太多复杂的条件判断时，使用三元表达式则会适得其反。</p>`,36),s=[o];function a(c,p){return t(),n("div",null,s)}const d=e(i,[["render",a],["__file","replace-if.html.vue"]]),u=JSON.parse('{"path":"/cs-tips/frontend/typescript/replace-if.html","title":"替换if","lang":"zh-CN","frontmatter":{"description":"替换if 使用 Array 的 includes 方法 场景：多种条件对应相同的处理 修改前： 在上面的场景中，我们通过在 if 语句中使用 || 对多种条件进行相同的处理，显而易见，这样的代码很糟糕（尤其是 province === \\"广东\\"|| province === \\"广西\\"|| province === \\"福建\\" || province ==...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/typescript/replace-if.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"替换if"}],["meta",{"property":"og:description","content":"替换if 使用 Array 的 includes 方法 场景：多种条件对应相同的处理 修改前： 在上面的场景中，我们通过在 if 语句中使用 || 对多种条件进行相同的处理，显而易见，这样的代码很糟糕（尤其是 province === \\"广东\\"|| province === \\"广西\\"|| province === \\"福建\\" || province ==..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"替换if\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用 Array 的 includes 方法","slug":"使用-array-的-includes-方法","link":"#使用-array-的-includes-方法","children":[]},{"level":2,"title":"策略模式","slug":"策略模式","link":"#策略模式","children":[]},{"level":2,"title":"对象数组","slug":"对象数组","link":"#对象数组","children":[{"level":3,"title":"使用对象","slug":"使用对象","link":"#使用对象","children":[]},{"level":3,"title":"使用map","slug":"使用map","link":"#使用map","children":[]}]},{"level":2,"title":"三元表达式","slug":"三元表达式","link":"#三元表达式","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.84,"words":851},"filePathRelative":"cs-tips/frontend/typescript/replace-if.md","localizedDate":"2023年5月25日","autoDesc":true}');export{d as comp,u as data};
