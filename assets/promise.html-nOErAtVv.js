import{_ as e,c as t,o,d as r}from"./app-CbULZrmi.js";const s={},l=r(`<h1 id="关于promise" tabindex="-1"><a class="header-anchor" href="#关于promise"><span>关于promise</span></a></h1><h2 id="promise-all" tabindex="-1"><a class="header-anchor" href="#promise-all"><span>promise.all</span></a></h2><p><code>Promise.all()</code>方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。</p><pre><code class="language-js">const p1 = new Promise((resolve, reject) =&gt; {
  resolve(&#39;hello&#39;);
})
.then(result =&gt; result)
.catch(e =&gt; e);

const p2 = new Promise((resolve, reject) =&gt; {
  throw new Error(&#39;报错了&#39;);
})
.then(result =&gt; result)
.catch(e =&gt; e);

Promise.all([p1, p2])
.then(result =&gt; console.log(result))
.catch(e =&gt; console.log(e));

//或者使用await 
try {
    let result=await Promise.all([p1,p2])
    console.log(result);
} catch (error) {
    console.log(error)
}
</code></pre><h2 id="promise-allsetled" tabindex="-1"><a class="header-anchor" href="#promise-allsetled"><span>promise.allSetled</span></a></h2><p><code>Promise.allSettled()</code>方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是<code>fulfilled</code>还是<code>rejected</code>），返回的 Promise 对象才会发生状态变更</p><pre><code class="language-js">const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: &#39;fulfilled&#39;, value: 42 },
//    { status: &#39;rejected&#39;, reason: -1 }
// ]
</code></pre><h2 id="promise-rece" tabindex="-1"><a class="header-anchor" href="#promise-rece"><span>promise.rece()</span></a></h2><pre><code class="language-js">const promise1 = new Promise((resolve, reject) =&gt; {
  setTimeout(resolve, 500, &#39;one&#39;);
});

const promise2 = new Promise((resolve, reject) =&gt; {
  setTimeout(resolve, 100, &#39;two&#39;);
});

Promise.race([promise1, promise2]).then((value) =&gt; {
  console.log(value);
 
});

// 两个都完成，但 p2 更快, 返回&quot;two&quot;
</code></pre>`,9),n=[l];function i(a,c){return o(),t("div",null,n)}const m=e(s,[["render",i],["__file","promise.html.vue"]]),d=JSON.parse('{"path":"/frontend/basic-js/es/promise.html","title":"关于promise","lang":"zh-CN","frontmatter":{"description":"关于promise promise.all Promise.all()方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。 promise.allSetled Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/es/promise.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"关于promise"}],["meta",{"property":"og:description","content":"关于promise promise.all Promise.all()方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。 promise.allSetled Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-01T04:28:17.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-01T04:28:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"关于promise\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-01T04:28:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"promise.all","slug":"promise-all","link":"#promise-all","children":[]},{"level":2,"title":"promise.allSetled","slug":"promise-allsetled","link":"#promise-allsetled","children":[]},{"level":2,"title":"promise.rece()","slug":"promise-rece","link":"#promise-rece","children":[]}],"git":{"createdTime":1659328097000,"updatedTime":1659328097000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.85,"words":254},"filePathRelative":"frontend/basic-js/es/promise.md","localizedDate":"2022年8月1日","autoDesc":true}');export{m as comp,d as data};
