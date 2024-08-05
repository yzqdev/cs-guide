import{_ as e,c as t,o as n,d as i}from"./app-CbULZrmi.js";const o={},a=i(`<h1 id="关于yield" tabindex="-1"><a class="header-anchor" href="#关于yield"><span>关于yield</span></a></h1><blockquote><p>原文：<a href="http://stackoverflow.com/questions/231767/the-python-yield-keyword-explained" target="_blank" rel="noopener noreferrer">http://stackoverflow.com/questions/231767/the-python-yield-keyword-explained</a></p><p>注：这是一篇 stackoverflow 上一个火爆帖子的译文</p></blockquote><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h2><p>Python 关键字 yield 的作用是什么？用来干什么的？</p><p>比如，我正在试图理解下面的代码:</p><pre><code class="language-python">def node._get_child_candidates(self, distance, min_dist, max_dist):
    if self._leftchild and distance - max_dist &lt; self._median:
        yield self._leftchild
    if self._rightchild and distance + max_dist &gt;= self._median:
        yield self._rightchild
</code></pre><p>下面的是调用:</p><pre><code class="language-python">result, candidates = list(), [self]
while candidates:
    node = candidates.pop()
    distance = node._get_dist(obj)
    if distance &lt;= max_dist and distance &gt;= min_dist:
        result.extend(node._values)
    candidates.extend(node._get_child_candidates(distance, min_dist, max_dist))
return result
</code></pre><p>当调用 <code>_get_child_candidates</code> 的时候发生了什么？返回了一个列表？返回了一个元素？被重复调用了么？ 什么时候这个调用结束呢？</p><h2 id="回答" tabindex="-1"><a class="header-anchor" href="#回答"><span>回答</span></a></h2><p>为了理解什么是 yield ,你必须理解什么是生成器。在理解生成器之前，让我们先走近迭代。</p><p><strong>可迭代对象</strong></p><p>当你建立了一个列表，你可以逐项地读取这个列表，这叫做一个可迭代对象:</p><pre><code class="language-Python">&gt;&gt;&gt; mylist = [1, 2, 3]
&gt;&gt;&gt; for i in mylist :
...    print(i)
1
2
3
</code></pre><p>mylist 是一个可迭代的对象。当你使用一个列表生成式来建立一个列表的时候，就建立了一个可迭代的对象:</p><pre><code class="language-python">&gt;&gt;&gt; mylist = [x*x for x in range(3)]
&gt;&gt;&gt; for i in mylist :
...    print(i)
0
1
4
</code></pre><p>所有你可以使用 <code>for .. in ..</code> 语法的叫做一个迭代器：列表，字符串，文件……你经常使用它们是因为你可以如你所愿的读取其中的元素，但是你把所有的值都存储到了内存中，如果你有大量数据的话这个方式并不是你想要的。</p><p><strong>生成器</strong></p><p>生成器是可以迭代的，但是你 只可以读取它一次 ，因为它并不把所有的值放在内存中，它是实时地生成数据:</p><pre><code class="language-python">&gt;&gt;&gt; mygenerator = (x*x for x in range(3))
&gt;&gt;&gt; for i in mygenerator :
...    print(i)
0
1
4
</code></pre><p>看起来除了把 [] 换成 () 外没什么不同。但是，你不可以再次使用 <code>for i in mygenerator</code> , 因为生成器只能被迭代一次：先计算出0，然后继续计算1，然后计算4，一个跟一个的…</p><p><strong>yield 关键字</strong></p><p>yield 是一个类似 return 的关键字，只是这个函数返回的是个生成器。</p><pre><code class="language-python">&gt;&gt;&gt; def createGenerator() :
...    mylist = range(3)
...    for i in mylist :
...        yield i*i
...
&gt;&gt;&gt; mygenerator = createGenerator() # create a generator
&gt;&gt;&gt; print(mygenerator) # mygenerator is an object!
&lt;generator object createGenerator at 0xb7555c34&gt;
&gt;&gt;&gt; for i in mygenerator:
...     print(i)
0
1
4
</code></pre><p>这个例子没什么用途，但是它让你知道，这个函数会返回一大批你只需要读一次的值.</p><p>为了精通 yield ,你必须要理解：当你调用这个函数的时候，函数内部的代码并不立马执行 ，这个函数只是返回一个生成器对象，这有点蹊跷不是吗。</p><p>那么，函数内的代码什么时候执行呢？当你使用for进行迭代的时候.</p><p>现在到了关键点了！</p><p>第一次迭代中你的函数会执行，从开始到达 yield 关键字，然后返回 yield 后的值作为第一次迭代的返回值. 然后，每次执行这个函数都会继续执行你在函数内部定义的那个循环的下一次，再返回那个值，直到没有可以返回的。</p><p>如果生成器内部没有定义 yield 关键字，那么这个生成器被认为成空的。这种情况可能因为是循环进行没了，或者是没有满足 if/else 条件。</p><p><strong>回到你的代码</strong></p><p>生成器:</p><pre><code class="language-Python"># Here you create the method of the node object that will return the generator
def node._get_child_candidates(self, distance, min_dist, max_dist):

  # Here is the code that will be called each time you use the generator object :

  # If there is still a child of the node object on its left
  # AND if distance is ok, return the next child
  if self._leftchild and distance - max_dist &lt; self._median:
            yield self._leftchild

  # If there is still a child of the node object on its right
  # AND if distance is ok, return the next child
  if self._rightchild and distance + max_dist &gt;= self._median:
                yield self._rightchild

  # If the function arrives here, the generator will be considered empty
  # there is no more than two values : the left and the right children
</code></pre><p>调用者:</p><pre><code class="language-Python"># Create an empty list and a list with the current object reference
result, candidates = list(), [self]

# Loop on candidates (they contain only one element at the beginning)
while candidates:

    # Get the last candidate and remove it from the list
    node = candidates.pop()

    # Get the distance between obj and the candidate
    distance = node._get_dist(obj)

    # If distance is ok, then you can fill the result
    if distance &lt;= max_dist and distance &gt;= min_dist:
        result.extend(node._values)

    # Add the children of the candidate in the candidates list
    # so the loop will keep running until it will have looked
    # at all the children of the children of the children, etc. of the candidate
    candidates.extend(node._get_child_candidates(distance, min_dist, max_dist))

return result
</code></pre><p>这个代码包含了几个小部分：</p><ul><li>我们对一个列表进行迭代，但是迭代中列表还在不断的扩展。它是一个迭代这些嵌套的数据的简洁方式，即使这样有点危险，因为可能导致无限迭代。 <code>candidates.extend(node._get_child_candidates(distance, min_dist, max_dist))</code> 穷尽了生成器的所有值，但 while 不断地在产生新的生成器，它们会产生和上一次不一样的值，既然没有作用到同一个节点上.</li><li><code>extend()</code> 是一个迭代器方法，作用于迭代器，并把参数追加到迭代器的后面。</li></ul><p>通常我们传给它一个列表参数:</p><pre><code class="language-Python">&gt;&gt;&gt; a = [1, 2]
&gt;&gt;&gt; b = [3, 4]
&gt;&gt;&gt; a.extend(b)
&gt;&gt;&gt; print(a)
[1, 2, 3, 4]
</code></pre><p>但是在你的代码中的是一个生成器，这是不错的，因为：</p><ul><li>你不必读两次所有的值</li><li>你可以有很多子对象，但不必叫他们都存储在内存里面。</li></ul><p>并且这很奏效，因为 Python 不关心一个方法的参数是不是个列表。Python 只希望它是个可以迭代的，所以这个参数可以是列表，元组，字符串，生成器... 这叫做 <code>duck typing</code>,这也是为何 Python 如此棒的原因之一，但这已经是另外一个问题了...</p><p>你可以在这里停下，来看看生成器的一些高级用法:</p><p><strong>控制生成器的穷尽</strong></p><pre><code class="language-Python">&gt;&gt;&gt; class Bank(): # let&#39;s create a bank, building ATMs
...    crisis = False
...    def create_atm(self) :
...        while not self.crisis :
...            yield &quot;$100&quot;
&gt;&gt;&gt; hsbc = Bank() # when everything&#39;s ok the ATM gives you as much as you want
&gt;&gt;&gt; corner_street_atm = hsbc.create_atm()
&gt;&gt;&gt; print(corner_street_atm.next())
$100
&gt;&gt;&gt; print(corner_street_atm.next())
$100
&gt;&gt;&gt; print([corner_street_atm.next() for cash in range(5)])
[&#39;$100&#39;, &#39;$100&#39;, &#39;$100&#39;, &#39;$100&#39;, &#39;$100&#39;]
&gt;&gt;&gt; hsbc.crisis = True # crisis is coming, no more money!
&gt;&gt;&gt; print(corner_street_atm.next())
&lt;type &#39;exceptions.StopIteration&#39;&gt;
&gt;&gt;&gt; wall_street_atm = hsbc.create_atm() # it&#39;s even true for new ATMs
&gt;&gt;&gt; print(wall_street_atm.next())
&lt;type &#39;exceptions.StopIteration&#39;&gt;
&gt;&gt;&gt; hsbc.crisis = False # trouble is, even post-crisis the ATM remains empty
&gt;&gt;&gt; print(corner_street_atm.next())
&lt;type &#39;exceptions.StopIteration&#39;&gt;
&gt;&gt;&gt; brand_new_atm = hsbc.create_atm() # build a new one to get back in business
&gt;&gt;&gt; for cash in brand_new_atm :
...    print cash
$100
$100
$100
$100
$100
$100
$100
$100
$100
...
</code></pre><p>对于控制一些资源的访问来说这很有用。</p><p><strong>Itertools,你最好的朋友</strong></p><p>itertools 包含了很多特殊的迭代方法。是不是曾想过复制一个迭代器?串联两个迭代器？把嵌套的列表分组？不用创造一个新的列表的 zip/map?</p><p>只要 import itertools</p><p>需要个例子？让我们看看比赛中4匹马可能到达终点的先后顺序的可能情况:</p><pre><code class="language-python">&gt;&gt;&gt; horses = [1, 2, 3, 4]
&gt;&gt;&gt; races = itertools.permutations(horses)
&gt;&gt;&gt; print(races)
&lt;itertools.permutations object at 0xb754f1dc&gt;
&gt;&gt;&gt; print(list(itertools.permutations(horses)))
[(1, 2, 3, 4),
 (1, 2, 4, 3),
 (1, 3, 2, 4),
 (1, 3, 4, 2),
 (1, 4, 2, 3),
 (1, 4, 3, 2),
 (2, 1, 3, 4),
 (2, 1, 4, 3),
 (2, 3, 1, 4),
 (2, 3, 4, 1),
 (2, 4, 1, 3),
 (2, 4, 3, 1),
 (3, 1, 2, 4),
 (3, 1, 4, 2),
 (3, 2, 1, 4),
 (3, 2, 4, 1),
 (3, 4, 1, 2),
 (3, 4, 2, 1),
 (4, 1, 2, 3),
 (4, 1, 3, 2),
 (4, 2, 1, 3),
 (4, 2, 3, 1),
 (4, 3, 1, 2),
 (4, 3, 2, 1)]
</code></pre><p><strong>了解迭代器的内部机理</strong></p><p>迭代是一个实现可迭代对象(实现的是 <code>__iter__()</code> 方法)和迭代器(实现的是 <code>__next__()</code> 方法)的过程。可迭代对象是你可以从其获取到一个迭代器的任一对象。迭代器是那些允许你迭代可迭代对象的对象。</p>`,53),r=[a];function s(d,l){return n(),t("div",null,r)}const p=e(o,[["render",s],["__file","about-yield.html.vue"]]),g=JSON.parse('{"path":"/python-tutor/python-tips/about-yield.html","title":"关于yield","lang":"zh-CN","frontmatter":{"description":"关于yield 原文：http://stackoverflow.com/questions/231767/the-python-yield-keyword-explained 注：这是一篇 stackoverflow 上一个火爆帖子的译文 问题 Python 关键字 yield 的作用是什么？用来干什么的？ 比如，我正在试图理解下面的代码: 下面的是调...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/python-tips/about-yield.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"关于yield"}],["meta",{"property":"og:description","content":"关于yield 原文：http://stackoverflow.com/questions/231767/the-python-yield-keyword-explained 注：这是一篇 stackoverflow 上一个火爆帖子的译文 问题 Python 关键字 yield 的作用是什么？用来干什么的？ 比如，我正在试图理解下面的代码: 下面的是调..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-15T12:35:10.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-10-15T12:35:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"关于yield\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-15T12:35:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":2,"title":"回答","slug":"回答","link":"#回答","children":[]}],"git":{"createdTime":1653497324000,"updatedTime":1697373310000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":6.39,"words":1918},"filePathRelative":"python-tutor/python-tips/about-yield.md","localizedDate":"2022年5月25日","autoDesc":true}');export{p as comp,g as data};
