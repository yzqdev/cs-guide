import{_ as n,c as a,a as e,o as l}from"./app-B6vXTniy.js";const i={};function t(p,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="javascript-实用技巧和写法建议" tabindex="-1"><a class="header-anchor" href="#javascript-实用技巧和写法建议"><span>JavaScript 实用技巧和写法建议</span></a></h1><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言"><span>1.前言</span></a></h2><p>从大学到现在，接触前端已经有几年了，感想方面，就是对于程序员而言，想要提高自己的技术水平和编写易于阅读和维护的代码，我觉得不能每天都是平庸的写代码，更要去推敲，去摸索和优化代码，总结当中的技巧，积极听取别人的建议，这样自己的技术水平会提高的更快。那么今天，我在这里就分享一下关于javascript方面的写作的实用技巧和建议，这些技巧和建议是我平常在开发项目上会用到的，希望能让大家学到知识，更希望能起到一个交流意见的作用，也就是说大家有什么好的技巧或者建议，欢迎分享，或者觉得我的想法存在什么问题，欢迎指出!</p><h2 id="_2-更短的数组去重写法" tabindex="-1"><a class="header-anchor" href="#_2-更短的数组去重写法"><span>2.更短的数组去重写法</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[...new Set([2,&quot;12&quot;,2,12,1,2,1,6,12,13,6])]</span>
<span class="line">//[2, &quot;12&quot;, 12, 1, 6, 13]</span>
<span class="line">//es6的新特性</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre></div><h2 id="_3-对象深浅拷贝" tabindex="-1"><a class="header-anchor" href="#_3-对象深浅拷贝"><span>3.对象深浅拷贝</span></a></h2><p>关于对象的深浅拷贝，我个人见解就是有一下几点：</p><p>1.深拷贝和浅拷贝只针对像Object, Array这样的引用类型数据。</p><p>2.浅拷贝是对对象引用地址进行拷贝，并没有开辟新的栈，也就是拷贝后的结果是两个对象指向同一个引用地址，修改其中一个对象的属性，则另一个对象的属性也会改变。</p><p>3.深拷贝则是开启一个新的栈，两个对象对应两个不同的引用地址，修改一个对象的属性，不会改变另一个对象的属性。</p><h3 id="浅拷贝" tabindex="-1"><a class="header-anchor" href="#浅拷贝"><span>浅拷贝</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let myInfo={name:&#39;守候&#39;,sex:&#39;男&#39;};</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444b153bd43~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let newInfo=myInfo;</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444e6487915~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">newInfo.sex=&#39;女&#39;;</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444e2d6a43b~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">console.log(myInfo)   //{name: &quot;守候&quot;, sex: &quot;女&quot;}</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre></div><h3 id="假-深拷贝" tabindex="-1"><a class="header-anchor" href="#假-深拷贝"><span>假-深拷贝</span></a></h3><p>假-深拷贝这个是自己随性命名的，大家看看就好，别当真！</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let myInfo={name:&#39;守候&#39;,sex:&#39;男&#39;};复制代码</span>
<span class="line"></span></code></pre></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444b153bd43~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let newInfo=Object.assign({},myInfo)复制代码</span>
<span class="line"></span></code></pre></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444ea8bca2c~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">newInfo.sex=&#39;女&#39;;复制代码</span>
<span class="line"></span></code></pre></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444a56dc84e~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">console.log(myInfo)   //{name: &quot;守候&quot;, sex: &quot;男&quot;}</span>
<span class="line">console.log(newInfo)   //{name: &quot;守候&quot;, sex: &quot;女&quot;}</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre></div><h3 id="真-深拷贝" tabindex="-1"><a class="header-anchor" href="#真-深拷贝"><span>真-深拷贝</span></a></h3><p>真-深拷贝这个是自己随性命名的，大家看看就好，别当真！</p><p>看着深浅拷贝，区别写法很简单，但是那个上面的深拷贝写法是有问题的。看下面案例</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let arr=[{a:1,b:2},{a:3,b:4}]</span>
<span class="line">let newArr=Object.assign([],arr)</span>
<span class="line">//截断数组</span>
<span class="line">newArr.length=1</span>
<span class="line">console.log(newArr)//[{a:1,b:2}]</span>
<span class="line">console.log(arr)//[{a:1,b:2},{a:3,b:4}]</span>
<span class="line">//操作newArr，这里看着对arr没影响，实际上已经挖了一个坑，下面就跳进去</span>
<span class="line">newArr[0].a=123</span>
<span class="line">//修改newArr[0]这个对象，也是影响了arr[0]这个对象</span>
<span class="line">console.log(arr[0])//{a: 123, b: 2}复制代码</span>
<span class="line"></span></code></pre></div><p>为什么会这样呢，因为Object.assign并不是深拷贝，是披着深拷贝外衣的浅拷贝。最多也是Object.assign会课拷贝第一层的值，对于第一层的值都是深拷贝，而到第二层的时候就是 复制引用。类似的情况还有，slice方法和concat方法等。 要解决这个问题，就得自己封装方法！如下</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//利用递归来实现深拷贝，如果对象属性的值是引用类型（Array,Object），那么对该属性进行深拷贝，直到遍历到属性的值是基本类型为止。  </span>
<span class="line">function deepClone(obj){    </span>
<span class="line">  if(!obj&amp;&amp; typeof obj!== &#39;object&#39;){      </span>
<span class="line">    return;    </span>
<span class="line">  }    </span>
<span class="line">  let newObj= obj.constructor === Array ? [] : {};    </span>
<span class="line">  for(let key in obj){       </span>
<span class="line">    if(obj[key]){          </span>
<span class="line">      if(obj[key] &amp;&amp; typeof obj[key] === &#39;object&#39;){  </span>
<span class="line">        newObj[key] = obj[key].constructor === Array ? [] : {}; </span>
<span class="line">        //递归</span>
<span class="line">        newObj[key] = deepClone(obj[key]);          </span>
<span class="line">      }else{            </span>
<span class="line">        newObj[key] = obj[key];         </span>
<span class="line">      }       </span>
<span class="line">    }    </span>
<span class="line">  }    </span>
<span class="line">  return newObj; </span>
<span class="line">}</span>
<span class="line">let arr=[{a:1,b:2},{a:3,b:4}]</span>
<span class="line">let newArr=deepClone(arr)</span>
<span class="line">console.log(arr[0])//{a:1,b:2}</span>
<span class="line">newArr[0].a=123</span>
<span class="line">console.log(arr[0])//{a:1,b:2}复制代码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一个方法就是简单粗暴法，我现在在用的一个方法！原理很简单，就是先把对象转成字符串，再把字符串转成对象！也能实现同样效果</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let newArr2=JSON.parse(JSON.stringify(arr));</span>
<span class="line">console.log(arr[0])//{a:1,b:2}</span>
<span class="line">newArr2[0].a=123</span>
<span class="line">console.log(arr[0])//{a:1,b:2}复制代码</span>
<span class="line"></span></code></pre></div><p>上面所说的浅拷贝，真假深拷贝（自己随性命名的），这几种情况，在开发上都有可能要用到，至于要使用哪一种方式，视情况而定！</p><h2 id="_4-使用事件委托" tabindex="-1"><a class="header-anchor" href="#_4-使用事件委托"><span>4.使用事件委托</span></a></h2><p>一个简单的需求，比如想给ul下面的li加上点击事件，点击哪个li，就显示那个li的innerHTML。这个貌似很简单！代码如下！</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;!DOCTYPE html&gt;</span>
<span class="line">&lt;html&gt;</span>
<span class="line">    &lt;head&gt;</span>
<span class="line">        &lt;meta charset=&quot;UTF-8&quot;&gt;</span>
<span class="line">        &lt;title&gt;&lt;/title&gt;</span>
<span class="line">    &lt;/head&gt;</span>
<span class="line">    &lt;body&gt;</span>
<span class="line">        &lt;ul id=&quot;ul-test&quot;&gt;</span>
<span class="line">            &lt;li&gt;0&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;1&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;2&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;3&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;4&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;5&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;6&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;7&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;8&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;9&lt;/li&gt;</span>
<span class="line">        &lt;/ul&gt;</span>
<span class="line">    &lt;/body&gt;</span>
<span class="line">    &lt;script type=&quot;text/javascript&quot;&gt;</span>
<span class="line">        let oUl=document.getElementById(&quot;ul-test&quot;);</span>
<span class="line">        let oLi=oUl.getElementsByTagName(&quot;li&quot;);</span>
<span class="line">        for(let i=0,len=oLi.length;i&lt;len;i++){</span>
<span class="line">            oLi[i].addEventListener(&quot;click&quot;,function(){</span>
<span class="line">                alert(this.innerHTML)</span>
<span class="line">            })</span>
<span class="line">        }</span>
<span class="line">    &lt;/script&gt;</span>
<span class="line">&lt;/html&gt;复制代码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很简单，这样就实现了，实际上这里有坑，也待优化！ 1.for循环，循环的是li，10个li就循环10次，绑定10次事件，100个就循环了100次，绑定100次事件！ 2.如果li不是本来就在页面上的，是未来元素，是页面加载了，再通过js动态加载进来了，上面的写法是无效的，点击li是没有反应的！ 所以就者需要用事件委托（即使不考虑上面的第二种情况，也是建议使用事件委托）！代码如下</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;!DOCTYPE html&gt;</span>
<span class="line">&lt;html&gt;</span>
<span class="line">    &lt;head&gt;</span>
<span class="line">        &lt;meta charset=&quot;UTF-8&quot;&gt;</span>
<span class="line">        &lt;title&gt;&lt;/title&gt;</span>
<span class="line">    &lt;/head&gt;</span>
<span class="line">    &lt;body&gt;</span>
<span class="line">        &lt;ul id=&quot;ul-test&quot;&gt;</span>
<span class="line">            &lt;li&gt;0&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;1&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;2&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;3&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;4&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;5&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;6&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;7&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;8&lt;/li&gt;</span>
<span class="line">            &lt;li&gt;9&lt;/li&gt;</span>
<span class="line">        &lt;/ul&gt;</span>
<span class="line">    &lt;/body&gt;</span>
<span class="line">    &lt;script type=&quot;text/javascript&quot;&gt;</span>
<span class="line">        let oUl=document.getElementById(&quot;ul-test&quot;);</span>
<span class="line">        oUl.addEventListener(&quot;click&quot;,function(ev){</span>
<span class="line">            let ev=ev||window.event;</span>
<span class="line">            let target=ev.target||ev.srcElement;</span>
<span class="line">            //如果点击的最底层是li元素</span>
<span class="line">            if(target.tagName.toLowerCase()===&#39;li&#39;){</span>
<span class="line">                alert(target.innerHTML)</span>
<span class="line">            }</span>
<span class="line">        })</span>
<span class="line">    &lt;/script&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样写，即使是动态添加进来的li点击也有反应，还有一个就是ul只有一个，事件绑定在ul上，无论li多少个，都是添加一次事件！但是也是可能会有问题，如果li下面还有子元素，那么点击的时候，target可能不是li，而是鼠标点击那个位置的最底层元素！如下图，如果鼠标点击白色区域，那个target就是body元素,鼠标点击绿色区域target就是div元素，鼠标点击蓝色区域target就是ul，点击橙色就是li。</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444ed94451a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><h2 id="_5-使用对象作为函数参数" tabindex="-1"><a class="header-anchor" href="#_5-使用对象作为函数参数"><span>5.使用对象作为函数参数</span></a></h2><p>大家试想下这样一个函数--函数接受几个参数，但是这几个参数都不是必填的，函数该怎么处理？是不是下面这样</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">function personInfo(name,phone,card){</span>
<span class="line">    ...</span>
<span class="line">}</span>
<span class="line">//以上函数，可以任意传参数。比如我想传card等于1472586326。这下是不是这样写</span>
<span class="line">personInfo(&#39;&#39;,&#39;&#39;,&#39;1472586326&#39;)复制代码</span>
<span class="line"></span></code></pre></div><p>有没有觉得上面写法奇怪，不太优雅？下面这里看着舒服一点！</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">function personInfo(opt){</span>
<span class="line">    ...</span>
<span class="line">}</span>
<span class="line">personInfo({card:&#39;1472586326&#39;})复制代码</span>
<span class="line"></span></code></pre></div><p>再想一下，如果一个函数，参数很多，怎么处理？</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">function test(arg1,arg2,arg3,arg4,arg5,arg6,arg7){</span>
<span class="line">    ...</span>
<span class="line">}复制代码</span>
<span class="line"></span></code></pre></div><p>密集恐惧症复发没有复发？下面这样看着会舒服一点！</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">function personInfo(opt){</span>
<span class="line">    ...</span>
<span class="line">}复制代码</span>
<span class="line"></span></code></pre></div><p>最后再想一下，如果需求改了，操作函数也要改！函数也要增加一个参数。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//原来函数</span>
<span class="line">function personInfo(name,phone,card){</span>
<span class="line">    ...</span>
<span class="line">}</span>
<span class="line">//修改后</span>
<span class="line">function personInfo(name,age,phone,card){</span>
<span class="line">    ...</span>
<span class="line">}复制代码</span>
<span class="line"></span></code></pre></div><p>这样就是参数修改一次，函数的参数就要修改一次！如果是用对象，就不会出现这样问题！</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//修改前后都是这样，变得是函数的操作内容和调用时候的传参！</span>
<span class="line">function personInfo(opt){</span>
<span class="line">    ...</span>
<span class="line">}复制代码</span>
<span class="line"></span></code></pre></div><p>看了上面的几个栗子，总结来说，就是当函数的参数不固定的时候，参数多(三个或者三个以上)的时候，建议用一个对象记录参数，这样会比较方便，也为以后如果参数要改留了条后路！</p><h2 id="_6-使用push和apply合并数组" tabindex="-1"><a class="header-anchor" href="#_6-使用push和apply合并数组"><span>6.使用push和apply合并数组</span></a></h2><p>合并数组这个已经是老生常谈的话题了，方法也是多种多样！</p><h3 id="concat" tabindex="-1"><a class="header-anchor" href="#concat"><span>concat</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let arr1=[1,2,3,4,5],arr2=[6,7,8,9,10];</span>
<span class="line">arr1=arr1.concat(arr2)</span>
<span class="line">console.log(arr1)//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]复制代码</span>
<span class="line"></span></code></pre></div><p>concat会一个全新的数组，表示arr1和arr2两个数组的组合，并让arr1和arr2不变。简单吧？ 但如果arr1和arr2的长度都很长，那就产生了一个很长很长的数组，内存又被占用了那么多。但是数组长度没限制！</p><h3 id="for" tabindex="-1"><a class="header-anchor" href="#for"><span>for</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let arr1=[1,2,3,4,5],arr2=[6,7,8,9,10];</span>
<span class="line">for(let i=0,len=arr2.length;i&lt;len;i++){</span>
<span class="line">    arr1.push(arr2[i])</span>
<span class="line">}</span>
<span class="line">console.log(arr1)//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]复制代码</span>
<span class="line"></span></code></pre></div><p>这里是往arr1循环添加arr2的元素，但是有一个情况，arr1的长度远小于arr2的长度，是不是循环arr1性能更好，循环次数更少。处理这个很简单，但是万一不知道arr1和arr2到底哪个长度更少呢？而且，for循环不够优雅！（当然，这个可以用迭代方法来替代）</p><h3 id="reduce" tabindex="-1"><a class="header-anchor" href="#reduce"><span>reduce</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let arr1=[1,2,3,4,5],arr2=[6,7,8,9,10];</span>
<span class="line">arr1 = arr2.reduce( function(coll,item){</span>
<span class="line">     coll.push( item );</span>
<span class="line">     return coll;</span>
<span class="line"> }, arr1 );</span>
<span class="line"> console.log(arr1)//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]复制代码</span>
<span class="line"></span></code></pre></div><p>逼格高了一点，而且用ES6的箭头函数还可以减少一些代码量，但它仍然需要一个函数，每个元素都需要调用一次。</p><h3 id="push-apply" tabindex="-1"><a class="header-anchor" href="#push-apply"><span>push.apply</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let arr1=[1,2,3,4,5],arr2=[6,7,8,9,10];</span>
<span class="line">arr1.push.apply(arr1,arr2);</span>
<span class="line">console.log(arr1)//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre></div><p>逼格看着高，代码少，也不会产生新的数组，也不难理解，就是调用<code>arr1.push</code>这个函数实例的<code>apply</code>方法，同时把<code>arr2</code>当作参数传入，这样<code>arr1.push</code>这个方法就会遍历<code>arr2</code>数组的所有元素，达到合并的效果。相当于<code>arr1.push.apply(arr1,[6,7,8,9,10]);</code>，最后相当于<code>arr1.push(6,7,8,9,10)</code>。遗憾的就是，这个方法对数组长度有限制，网上说法是不同浏览器，不同的长度限制，一般不超过10万！</p><p>之前是建议用push.apply，但是现在保留意见，就是大家觉得哪个方式用哪个方式！这个没有一定的对错！</p><h2 id="_7-tofixed保留整数" tabindex="-1"><a class="header-anchor" href="#_7-tofixed保留整数"><span>7.toFixed保留整数</span></a></h2><p>在开发上，经常会遇到最多保留多少位小数或者类似的问题，针对这个，使用toFixed可以很简单的解决问题，但是如果数据是要和后台交互的，而且后台存储的数据一般是保存数字类型，而使用toFixed后生成的是一个字符串，这下，就需要把toFixed生成的是一个字符串转成数字类型，转发很多。今天我说一个最简单--+。代码如下</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let a=123.36896335.toFixed(2)</span>
<span class="line">console.log(a)//&#39;123.37&#39;</span>
<span class="line">a=+a</span>
<span class="line">console.log(a)//123.37复制代码</span>
<span class="line"></span></code></pre></div><p>PS：a=a|0和~~a也可以实现，但是生成的是一个整数，如下</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let a=123.36896335.toFixed(2)</span>
<span class="line">console.log(a)//&#39;123.37&#39;</span>
<span class="line">a=a|0  </span>
<span class="line">console.log(a)//123 </span>
<span class="line">//---------------------------------分割线</span>
<span class="line">let a=123.36896335.toFixed(2)</span>
<span class="line">console.log(a)//&#39;123.37&#39;</span>
<span class="line">a=~~a  </span>
<span class="line">console.log(a)//123        </span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre></div><h2 id="_8-其它类型数据转布尔数据" tabindex="-1"><a class="header-anchor" href="#_8-其它类型数据转布尔数据"><span>8.其它类型数据转布尔数据</span></a></h2><p>下面的转换，大家一看就明白了，不多说。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">console.log(!!&#39;123&#39;)</span>
<span class="line">//true</span>
<span class="line">!!12</span>
<span class="line">//true</span>
<span class="line">!!-1</span>
<span class="line">//true</span>
<span class="line">!![]</span>
<span class="line">//true</span>
<span class="line">!!&#39;&#39;</span>
<span class="line">//false</span>
<span class="line">!!null</span>
<span class="line">//false复制代码</span>
<span class="line"></span></code></pre></div><h2 id="_9-缓存变量" tabindex="-1"><a class="header-anchor" href="#_9-缓存变量"><span>9.缓存变量</span></a></h2><h3 id="for循环缓存length" tabindex="-1"><a class="header-anchor" href="#for循环缓存length"><span>for循环缓存length</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let arr=[1,2,3,4,5,6]</span>
<span class="line">for(let i=0,i&lt;arr.length;i++){</span>
<span class="line">    ...</span>
<span class="line">}</span>
<span class="line">//------------------------分割线</span>
<span class="line">let arr=[1,2,3,4,5,6]</span>
<span class="line">for(let i=0,len=arr.length;i&lt;len;i++){</span>
<span class="line">    ...</span>
<span class="line">}复制代码</span>
<span class="line"></span></code></pre></div><p>第一段就是每一次循环的时候，都要查询一次arr.length。第二段代码就是缓存了arr.length，每次对比len就好，理论上是第二段代码的写法比较好，性能比较高！但是随着浏览器的发展，这个细节的性能上的影响貌似远远小于预期，现在还是建议缓存！我写了下面的测试用例(谷歌浏览器测试)！</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let arr100=[], arr10000=[];</span>
<span class="line">for(let i=0;i&lt;100;i++){</span>
<span class="line">    arr100.push(i)</span>
<span class="line">}</span>
<span class="line">for(let i=0;i&lt;10000;i++){</span>
<span class="line">    arr10000.push(i)</span>
<span class="line">}</span>
<span class="line">//缓存情况</span>
<span class="line">function testCache(arr){</span>
<span class="line">    console.time();</span>
<span class="line">    for(let i=0,len=arr.length;i&lt;len;i++){</span>
<span class="line">        </span>
<span class="line">    }</span>
<span class="line">    console.timeEnd()</span>
<span class="line">}</span>
<span class="line">//不缓存情况</span>
<span class="line">function testNoCache(arr){</span>
<span class="line">    console.time();</span>
<span class="line">    for(let i=0,len=arr.length;i&lt;len;i++){</span>
<span class="line">        </span>
<span class="line">    }</span>
<span class="line">    console.timeEnd()</span>
<span class="line">}</span>
<span class="line">testCache(arr100)//default: 0.007ms</span>
<span class="line">testCache(arr10000)//default: 0.035ms</span>
<span class="line">testNoCache(arr100)//default: 0.012ms</span>
<span class="line">testNoCache(arr10000)//default: 0.109ms</span>
<span class="line">//这只是一个最简单的数组，如果遍历的是一个nodeList（元素列表），效果可能会更明显。</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元素事件" tabindex="-1"><a class="header-anchor" href="#元素事件"><span>元素事件</span></a></h3><p>这里我用jquery来讲解，比较容易理解，原生js也是这个道理！如下代码</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$(&#39;.div1&#39;).click(function(){</span>
<span class="line">   ...</span>
<span class="line">})</span>
<span class="line">//--------------------------分割线   </span>
<span class="line">let $div1=$(&#39;.div1&#39;);</span>
<span class="line">$div1.click(function(){</span>
<span class="line">   ...</span>
<span class="line">})复制代码</span>
<span class="line"></span></code></pre></div><p>上面的代码，改变的也是缓存了$(&#39;.div1&#39;)，但是这里就建议是第二种写法了，因为第一种点击一次就要查询一次.div1，Dom的操作还是能减少就减少！</p><h2 id="_10-使用innerhtml添加元素" tabindex="-1"><a class="header-anchor" href="#_10-使用innerhtml添加元素"><span>10.使用innerHTML添加元素</span></a></h2><p>比如有一个需求，往<code>ul</code>里面添加10个<code>li</code>，两种方法，如下代码</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;!DOCTYPE html&gt;</span>
<span class="line">&lt;html&gt;</span>
<span class="line">    &lt;head&gt;</span>
<span class="line">        &lt;meta charset=&quot;UTF-8&quot;&gt;</span>
<span class="line">        &lt;title&gt;&lt;/title&gt;</span>
<span class="line">    &lt;/head&gt;</span>
<span class="line">    &lt;body&gt;</span>
<span class="line">        &lt;ul id=&quot;ul-test&quot;&gt;</span>
<span class="line">            </span>
<span class="line">        &lt;/ul&gt;</span>
<span class="line">    &lt;/body&gt;</span>
<span class="line">    &lt;script type=&quot;text/javascript&quot;&gt;</span>
<span class="line">        let oUl=document.getElementById(&quot;ul-test&quot;);</span>
<span class="line">        //createElement方式</span>
<span class="line">        console.time();</span>
<span class="line">        for(let i=0;i&lt;10;i++){</span>
<span class="line">            let oLi=document.createElement(&#39;li&#39;);</span>
<span class="line">            oLi.innerHTML=i;</span>
<span class="line">            oUl.appendChild(oLi);</span>
<span class="line">        }</span>
<span class="line">        console.timeEnd();</span>
<span class="line">        //innerHTML方式</span>
<span class="line">        console.time();</span>
<span class="line">        let _html=&#39;&#39;;</span>
<span class="line">        for(let i=0;i&lt;10;i++){</span>
<span class="line">            _html+=&#39;&lt;li&gt;&#39;+i+&#39;&lt;/li&gt;&#39;</span>
<span class="line">        }</span>
<span class="line">        oUl.innerHTML=_html;</span>
<span class="line">        console.timeEnd();</span>
<span class="line">    &lt;/script&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大家把代码用浏览器打开，发现基本是第二种方式更快，第8点也说了，DOM操作能少就少！第一种要操作10次DOM，第二种只需要操作1次DOM。还有一个就是，这个只是很简单的li,如果是下面的列表呢？用第一种方式，得createElement多少次，innerHTML多少次，appendChild多少次？代码多，各个节点的逻辑和嵌套关系也乱！用第二种方式就是一个拼接字符串的操作，比第一种方式好多了，如果用es6的模板字符串，就更简单了！</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf4453fd37b0a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><h2 id="_11-将参数转成数组" tabindex="-1"><a class="header-anchor" href="#_11-将参数转成数组"><span>11.将参数转成数组</span></a></h2><p>函数里的arguments，虽然拥有length属性，但是arguments不是一个数组，是一个类数组，没有push,slice等方法。有些时候，需要把arguments转成数组，转的方法也不止一个，推荐的是是下面的写法！</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let _arguments=Array.prototype.slice.apply(arguments)</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre></div><h2 id="_12-函数节流" tabindex="-1"><a class="header-anchor" href="#_12-函数节流"><span>12.函数节流</span></a></h2><p>这里拿一个栗子说，比如mousemove,onscroll,onresize这些事件触发的时候，可能已经触发了60次事件，这样很消耗性能，而且实际上，我们并不需要这么频繁的触发，只要大约100毫秒触发一次就好！那么这样就需要函数节流了！</p><p>普通写法</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let count = 0;</span>
<span class="line">function beginCount() {</span>
<span class="line">    count++;</span>
<span class="line">    console.log(count);</span>
<span class="line">}</span>
<span class="line">document.onmousemove = function () {</span>
<span class="line">   beginCount();</span>
<span class="line">};复制代码</span>
<span class="line"></span></code></pre></div><p>效果</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf4453fbde66a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><p>节流写法</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let count = 0;</span>
<span class="line">function beginCount() {</span>
<span class="line">    count++;</span>
<span class="line">    console.log(count);</span>
<span class="line">}</span>
<span class="line">function delayFn(method, thisArg) {</span>
<span class="line">    clearTimeout(method.props);</span>
<span class="line">    method.props = setTimeout(function () {</span>
<span class="line">        method.call(thisArg)</span>
<span class="line">    },100)</span>
<span class="line">}</span>
<span class="line">document.onmousemove = function () {</span>
<span class="line">    delayFn(beginCount)</span>
<span class="line">};</span>
<span class="line">复制代码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果</p><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf445673b76fc~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><p>这种方式，其实是有问题的，在不断触发停下来等待100ms才开始执行，中间操作得太快直接无视。于是在网上找到下面这种方案！</p><p>第二种节流写法</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">function delayFn2 (fn, delay, mustDelay){</span>
<span class="line">     let timer = null;</span>
<span class="line">     let t_start;</span>
<span class="line">     return function(){</span>
<span class="line">         let context = this, args = arguments, t_cur = +new Date();</span>
<span class="line">         //先清理上一次的调用触发（上一次调用触发事件不执行）</span>
<span class="line">         clearTimeout(timer);</span>
<span class="line">         //如果不存触发时间，那么当前的时间就是触发时间</span>
<span class="line">         if(!t_start){</span>
<span class="line">             t_start = t_cur;</span>
<span class="line">         }</span>
<span class="line">         //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数</span>
<span class="line">         if(t_cur - t_start &gt;= mustDelay){</span>
<span class="line">             fn.apply(context, args);</span>
<span class="line">             t_start = t_cur;</span>
<span class="line">         }</span>
<span class="line">         //否则延迟执行</span>
<span class="line">         else {</span>
<span class="line">             timer = setTimeout(function(){</span>
<span class="line">                 fn.apply(context, args);</span>
<span class="line">             }, delay);</span>
<span class="line">         }</span>
<span class="line">     };</span>
<span class="line">}</span>
<span class="line">let count=0;</span>
<span class="line">function fn1(){</span>
<span class="line">    count++;</span>
<span class="line">    console.log(count)</span>
<span class="line">} </span>
<span class="line">//100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次</span>
<span class="line">document.onmousemove=delayFn2(fn1,100,200)复制代码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf44576a04947~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp" alt="img"></p><blockquote><p>我现在函数节流用得很少，这两个写法是比较基础的，希望大家能共享下自己的比较好的方法！</p></blockquote><h2 id="_13-其他写作建议" tabindex="-1"><a class="header-anchor" href="#_13-其他写作建议"><span>13.其他写作建议</span></a></h2><p>关于其它的一些写法技巧和建议，都是比较老生常谈的，比如命名规范，函数单一性原则等。这一部分内容我自己总结和别人写的基本一致！我就不展开说了（感觉展开说也基本是复制粘贴别人的文章，这事我不干），所以我推荐大家去看这篇文章（<a href="https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F28910636" target="_blank" rel="noopener noreferrer">如何优雅的编写 JavaScript 代码</a>）。有些知识我也是从这里获得的！</p><h2 id="_14-小结" tabindex="-1"><a class="header-anchor" href="#_14-小结"><span>14.小结</span></a></h2><p>好了，关于我自己总结的一些实用技巧和建议，就到这里了！关于javascript的技巧和建议，这点大家还是要多看网上的资源，也要自己多总结，毕竟我自己总结的只是我自己发现的，只是冰山一角。但还是希望这篇文章能帮到大家，让大家学习到知识。当然，更希望的是能起到一个交流意见的作用。如果大家有什么建议，技巧。也欢迎分享。觉得我哪里写错了，写得不够好，也欢迎指出！让大家一起互相帮助，互相学习！</p><p>作者：守候i 链接：<a href="https://juejin.cn/post/6844903526796099591" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/6844903526796099591</a> 来源：稀土掘金 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>`,117)])])}const r=n(i,[["render",t]]),d=JSON.parse('{"path":"/cs-tips/frontend/others/js-format.html","title":"JavaScript 实用技巧和写法建议","lang":"zh-CN","frontmatter":{"description":"JavaScript 实用技巧和写法建议 1.前言 从大学到现在，接触前端已经有几年了，感想方面，就是对于程序员而言，想要提高自己的技术水平和编写易于阅读和维护的代码，我觉得不能每天都是平庸的写代码，更要去推敲，去摸索和优化代码，总结当中的技巧，积极听取别人的建议，这样自己的技术水平会提高的更快。那么今天，我在这里就分享一下关于javascript方面...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JavaScript 实用技巧和写法建议\\",\\"image\\":[\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444b153bd43~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444e6487915~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444e2d6a43b~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444b153bd43~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444ea8bca2c~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444a56dc84e~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444ed94451a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf4453fd37b0a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf4453fbde66a~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf445673b76fc~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\",\\"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf44576a04947~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/others/js-format.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"JavaScript 实用技巧和写法建议"}],["meta",{"property":"og:description","content":"JavaScript 实用技巧和写法建议 1.前言 从大学到现在，接触前端已经有几年了，感想方面，就是对于程序员而言，想要提高自己的技术水平和编写易于阅读和维护的代码，我觉得不能每天都是平庸的写代码，更要去推敲，去摸索和优化代码，总结当中的技巧，积极听取别人的建议，这样自己的技术水平会提高的更快。那么今天，我在这里就分享一下关于javascript方面..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/15/15fbf444b153bd43~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}]]},"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":15.22,"words":4565},"filePathRelative":"cs-tips/frontend/others/js-format.md","autoDesc":true}');export{r as comp,d as data};
