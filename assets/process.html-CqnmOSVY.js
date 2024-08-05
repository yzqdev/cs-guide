import{_ as e,c as n,o as t,d as o}from"./app-CbULZrmi.js";const r={},i=o(`<h1 id="进程" tabindex="-1"><a class="header-anchor" href="#进程"><span>进程</span></a></h1><p>Python 中的多线程其实并不是真正的多线程，如果想要充分地使用多核 CPU 的资源，在 Python 中大部分情况需要使用多进程。</p><p>Python 提供了非常好用的多进程包 multiprocessing，只需要定义一个函数，Python 会完成其他所有事情。</p><p>借助这个包，可以轻松完成从单进程到并发执行的转换。multiprocessing 支持子进程、通信和共享数据、执行不同形式的同步，提供了 Process、Queue、Pipe、Lock 等组件。</p><h2 id="_1、类-process" tabindex="-1"><a class="header-anchor" href="#_1、类-process"><span>1、类 Process</span></a></h2><p>创建进程的类：<code>Process([group [, target [, name [, args [, kwargs]]]]])</code></p><ul><li>target 表示调用对象</li><li>args 表示调用对象的位置参数元组</li><li>kwargs表示调用对象的字典</li><li>name为别名</li><li>group实质上不使用</li></ul><p>下面看一个创建函数并将其作为多个进程的例子：</p><pre><code class="language-python">#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import multiprocessing
import time


def worker(interval, name):
    print(name + &#39;【start】&#39;)
    time.sleep(interval)
    print(name + &#39;【end】&#39;)


if __name__ == &quot;__main__&quot;:
    p1 = multiprocessing.Process(target=worker, args=(2, &#39;两点水1&#39;))
    p2 = multiprocessing.Process(target=worker, args=(3, &#39;两点水2&#39;))
    p3 = multiprocessing.Process(target=worker, args=(4, &#39;两点水3&#39;))

    p1.start()
    p2.start()
    p3.start()

    print(&quot;The number of CPU is:&quot; + str(multiprocessing.cpu_count()))
    for p in multiprocessing.active_children():
        print(&quot;child   p.name:&quot; + p.name + &quot;\\tp.id&quot; + str(p.pid))
    print(&quot;END!!!!!!!!!!!!!!!!!&quot;)

</code></pre><p>输出的结果：</p><p><img src="http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-多进程输出结果.gif" alt=""></p><h2 id="_2、把进程创建成类" tabindex="-1"><a class="header-anchor" href="#_2、把进程创建成类"><span>2、把进程创建成类</span></a></h2><p>当然我们也可以把进程创建成一个类，如下面的例子，当进程 p 调用 start() 时，自动调用 run() 方法。</p><pre><code class="language-python"># -*- coding: UTF-8 -*-

import multiprocessing
import time


class ClockProcess(multiprocessing.Process):
    def __init__(self, interval):
        multiprocessing.Process.__init__(self)
        self.interval = interval

    def run(self):
        n = 5
        while n &gt; 0:
            print(&quot;当前时间: {0}&quot;.format(time.ctime()))
            time.sleep(self.interval)
            n -= 1


if __name__ == &#39;__main__&#39;:
    p = ClockProcess(3)
    p.start()

</code></pre><p>输出结果如下：</p><p><img src="http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-创建进程类.gif" alt=""></p><h2 id="_3、daemon-属性" tabindex="-1"><a class="header-anchor" href="#_3、daemon-属性"><span>3、daemon 属性</span></a></h2><p>想知道 daemon 属性有什么用，看下下面两个例子吧，一个加了 daemon 属性，一个没有加，对比输出的结果：</p><p>没有加 deamon 属性的例子：</p><pre><code class="language-python"># -*- coding: UTF-8 -*-
import multiprocessing
import time


def worker(interval):
    print(&#39;工作开始时间：{0}&#39;.format(time.ctime()))
    time.sleep(interval)
    print(&#39;工作结果时间：{0}&#39;.format(time.ctime()))


if __name__ == &#39;__main__&#39;:
    p = multiprocessing.Process(target=worker, args=(3,))
    p.start()
    print(&#39;【EMD】&#39;)

</code></pre><p>输出结果：</p><pre><code class="language-txt">【EMD】
工作开始时间：Mon Oct  9 17:47:06 2017
工作结果时间：Mon Oct  9 17:47:09 2017
</code></pre><p>在上面示例中，进程 p 添加 daemon 属性：</p><pre><code class="language-python"># -*- coding: UTF-8 -*-

import multiprocessing
import time


def worker(interval):
    print(&#39;工作开始时间：{0}&#39;.format(time.ctime()))
    time.sleep(interval)
    print(&#39;工作结果时间：{0}&#39;.format(time.ctime()))


if __name__ == &#39;__main__&#39;:
    p = multiprocessing.Process(target=worker, args=(3,))
    p.daemon = True
    p.start()
    print(&#39;【EMD】&#39;)
</code></pre><p>输出结果：</p><pre><code class="language-txt">【EMD】
</code></pre><p>根据输出结果可见，如果在子进程中添加了 daemon 属性，那么当主进程结束的时候，子进程也会跟着结束。所以没有打印子进程的信息。</p><h2 id="_4、join-方法" tabindex="-1"><a class="header-anchor" href="#_4、join-方法"><span>4、join 方法</span></a></h2><p>结合上面的例子继续，如果我们想要让子线程执行完该怎么做呢？</p><p>那么我们可以用到 join 方法，join 方法的主要作用是：阻塞当前进程，直到调用 join 方法的那个进程执行完，再继续执行当前进程。</p><p>因此看下加了 join 方法的例子：</p><pre><code class="language-python">import multiprocessing
import time


def worker(interval):
    print(&#39;工作开始时间：{0}&#39;.format(time.ctime()))
    time.sleep(interval)
    print(&#39;工作结果时间：{0}&#39;.format(time.ctime()))


if __name__ == &#39;__main__&#39;:
    p = multiprocessing.Process(target=worker, args=(3,))
    p.daemon = True
    p.start()
    p.join()
    print(&#39;【EMD】&#39;)
</code></pre><p>输出的结果：</p><pre><code class="language-txt">工作开始时间：Tue Oct 10 11:30:08 2017
工作结果时间：Tue Oct 10 11:30:11 2017
【EMD】
</code></pre><h2 id="_5、pool" tabindex="-1"><a class="header-anchor" href="#_5、pool"><span>5、Pool</span></a></h2><p>如果需要很多的子进程，难道我们需要一个一个的去创建吗？</p><p>当然不用，我们可以使用进程池的方法批量创建子进程。</p><p>例子如下：</p><pre><code class="language-python"># -*- coding: UTF-8 -*-

from multiprocessing import Pool
import os, time, random


def long_time_task(name):
    print(&#39;进程的名称：{0} ；进程的PID: {1} &#39;.format(name, os.getpid()))
    start = time.time()
    time.sleep(random.random() * 3)
    end = time.time()
    print(&#39;进程 {0} 运行了 {1} 秒&#39;.format(name, (end - start)))


if __name__ == &#39;__main__&#39;:
    print(&#39;主进程的 PID：{0}&#39;.format(os.getpid()))
    p = Pool(4)
    for i in range(6):
        p.apply_async(long_time_task, args=(i,))
    p.close()
    # 等待所有子进程结束后在关闭主进程
    p.join()
    print(&#39;【End】&#39;)
</code></pre><p>输出的结果如下：</p><pre><code class="language-txt">主进程的 PID：7256
进程的名称：0 ；进程的PID: 1492
进程的名称：1 ；进程的PID: 12232
进程的名称：2 ；进程的PID: 4332
进程的名称：3 ；进程的PID: 11604
进程 2 运行了 0.6500370502471924 秒
进程的名称：4 ；进程的PID: 4332
进程 1 运行了 1.0830621719360352 秒
进程的名称：5 ；进程的PID: 12232
进程 5 运行了 0.029001712799072266 秒
进程 4 运行了 0.9720554351806641 秒
进程 0 运行了 2.3181326389312744 秒
进程 3 运行了 2.5331451892852783 秒
【End】
</code></pre><p>这里有一点需要注意： <code>Pool</code> 对象调用 <code>join()</code> 方法会等待所有子进程执行完毕，调用 <code>join()</code> 之前必须先调用 <code>close()</code> ，调用<code>close()</code> 之后就不能继续添加新的 Process 了。</p><p>请注意输出的结果，子进程 0，1，2，3是立刻执行的，而子进程 4 要等待前面某个子进程完成后才执行，这是因为 Pool 的默认大小在我的电脑上是 4，因此，最多同时执行 4 个进程。这是 Pool 有意设计的限制，并不是操作系统的限制。如果改成：</p><pre><code class="language-python">p = Pool(5)
</code></pre><p>就可以同时跑 5 个进程。</p><h2 id="_6、进程间通信" tabindex="-1"><a class="header-anchor" href="#_6、进程间通信"><span>6、进程间通信</span></a></h2><p>Process 之间肯定是需要通信的，操作系统提供了很多机制来实现进程间的通信。Python 的 multiprocessing 模块包装了底层的机制，提供了Queue、Pipes 等多种方式来交换数据。</p><p>以 Queue 为例，在父进程中创建两个子进程，一个往 Queue 里写数据，一个从 Queue 里读数据：</p><pre><code class="language-python">#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from multiprocessing import Process, Queue
import os, time, random


def write(q):
    # 写数据进程
    print(&#39;写进程的PID:{0}&#39;.format(os.getpid()))
    for value in [&#39;两点水&#39;, &#39;三点水&#39;, &#39;四点水&#39;]:
        print(&#39;写进 Queue 的值为：{0}&#39;.format(value))
        q.put(value)
        time.sleep(random.random())


def read(q):
    # 读取数据进程
    print(&#39;读进程的PID:{0}&#39;.format(os.getpid()))
    while True:
        value = q.get(True)
        print(&#39;从 Queue 读取的值为：{0}&#39;.format(value))


if __name__ == &#39;__main__&#39;:
    # 父进程创建 Queue，并传给各个子进程
    q = Queue()
    pw = Process(target=write, args=(q,))
    pr = Process(target=read, args=(q,))
    # 启动子进程 pw
    pw.start()
    # 启动子进程pr
    pr.start()
    # 等待pw结束:
    pw.join()
    # pr 进程里是死循环，无法等待其结束，只能强行终止
    pr.terminate()

</code></pre><p>输出的结果为：</p><pre><code class="language-txt">读进程的PID:13208
写进程的PID:10864
写进 Queue 的值为：两点水
从 Queue 读取的值为：两点水
写进 Queue 的值为：三点水
从 Queue 读取的值为：三点水
写进 Queue 的值为：四点水
从 Queue 读取的值为：四点水
</code></pre>`,51),p=[i];function a(s,c){return t(),n("div",null,p)}const m=e(r,[["render",a],["__file","process.html.vue"]]),d=JSON.parse('{"path":"/python-tutor/basics/process.html","title":"进程","lang":"zh-CN","frontmatter":{"description":"进程 Python 中的多线程其实并不是真正的多线程，如果想要充分地使用多核 CPU 的资源，在 Python 中大部分情况需要使用多进程。 Python 提供了非常好用的多进程包 multiprocessing，只需要定义一个函数，Python 会完成其他所有事情。 借助这个包，可以轻松完成从单进程到并发执行的转换。multiprocessing 支...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/basics/process.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"进程"}],["meta",{"property":"og:description","content":"进程 Python 中的多线程其实并不是真正的多线程，如果想要充分地使用多核 CPU 的资源，在 Python 中大部分情况需要使用多进程。 Python 提供了非常好用的多进程包 multiprocessing，只需要定义一个函数，Python 会完成其他所有事情。 借助这个包，可以轻松完成从单进程到并发执行的转换。multiprocessing 支..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-%E5%A4%9A%E8%BF%9B%E7%A8%8B%E8%BE%93%E5%87%BA%E7%BB%93%E6%9E%9C.gif"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T07:13:03.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-26T07:13:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"进程\\",\\"image\\":[\\"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-%E5%A4%9A%E8%BF%9B%E7%A8%8B%E8%BE%93%E5%87%BA%E7%BB%93%E6%9E%9C.gif\\",\\"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-%E5%88%9B%E5%BB%BA%E8%BF%9B%E7%A8%8B%E7%B1%BB.gif\\"],\\"dateModified\\":\\"2022-05-26T07:13:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1、类 Process","slug":"_1、类-process","link":"#_1、类-process","children":[]},{"level":2,"title":"2、把进程创建成类","slug":"_2、把进程创建成类","link":"#_2、把进程创建成类","children":[]},{"level":2,"title":"3、daemon 属性","slug":"_3、daemon-属性","link":"#_3、daemon-属性","children":[]},{"level":2,"title":"4、join 方法","slug":"_4、join-方法","link":"#_4、join-方法","children":[]},{"level":2,"title":"5、Pool","slug":"_5、pool","link":"#_5、pool","children":[]},{"level":2,"title":"6、进程间通信","slug":"_6、进程间通信","link":"#_6、进程间通信","children":[]}],"git":{"createdTime":1653497324000,"updatedTime":1653549183000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.48,"words":1644},"filePathRelative":"python-tutor/basics/process.md","localizedDate":"2022年5月25日","autoDesc":true}');export{m as comp,d as data};
