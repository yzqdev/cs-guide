import{_ as n,c as e,a as s,o as i}from"./app-B6vXTniy.js";const l={};function c(r,a){return i(),e("div",null,[...a[0]||(a[0]=[s(`<h1 id="java-bin-目录下的工具" tabindex="-1"><a class="header-anchor" href="#java-bin-目录下的工具"><span>Java bin 目录下的工具</span></a></h1><h2 id="jvm-内存结构" tabindex="-1"><a class="header-anchor" href="#jvm-内存结构"><span>JVM 内存结构</span></a></h2><ul><li>参考资料：<a href="https://blog.csdn.net/qq_34457118/article/details/81712293" target="_blank" rel="noopener noreferrer">JVM内存结构（基于JDK8）</a></li></ul><h4 id="运行时数据区-jvm-规范" tabindex="-1"><a class="header-anchor" href="#运行时数据区-jvm-规范"><span>运行时数据区（JVM 规范）</span></a></h4><p><img src="https://upload-images.jianshu.io/upload_images/12159-f8cdb04243ea36e4.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="image.png"></p><ul><li>VM 栈（JVM 虚拟机栈） <ul><li>是线程私有的，它的生命周期和线程相同。它描述的是 Java 方法执行的内存模式。</li></ul></li><li>Java 堆区（Heap） <ul><li>是 Java 虚拟机所管理的内存中最大的一块。是被所有线程共享的一块内存区域，在虚拟机启动时候创建。用于存放对象实例。</li></ul></li><li>方法区（Method Area） <ul><li>也是各个线程共享的内存区域，用于存储已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。</li><li>虽然在 JVM 规范上是描述为堆的一个逻辑部分，但是它有一个别名：Non-Heap（非堆），独立于堆区之外的。JDK8 它是：Metaspace 区 <ul><li>Metaspace：主要存放：Class、Package、Method、Field、字节码、常量池、符号引用等等</li></ul></li><li>方法区里面有一个：运行时常量池（Run-Time Constant Pool），用于存放编译期生成的各种字面量和符号应用，在类加载后进入该池存放。</li></ul></li><li>本地方法栈（Native Method Stacks） <ul><li>与虚拟机栈所发挥的作用类似，之间的区别： <ul><li>虚拟机栈是为虚拟机执行 Java 方法（也就是字节码）服务</li><li>本地方法栈是为了虚拟机使用到 Native 方法服务。</li></ul></li></ul></li></ul><h4 id="jdk8-真实内存结构-hotspot" tabindex="-1"><a class="header-anchor" href="#jdk8-真实内存结构-hotspot"><span>JDK8 真实内存结构（HotSpot）</span></a></h4><ul><li>HotSpot--Java HotSpot Performance Engine，是 Java 虚拟机的一个实现，目前是 Oracle 在维护和发布。</li></ul><p><img src="https://upload-images.jianshu.io/upload_images/12159-045ea5a11000e8df.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="image.png"></p><h4 id="jdk8-hotspot-的堆内存区域结构" tabindex="-1"><a class="header-anchor" href="#jdk8-hotspot-的堆内存区域结构"><span>JDK8 HotSpot 的堆内存区域结构</span></a></h4><p><img src="https://upload-images.jianshu.io/upload_images/12159-6a94044da388bb0e.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="image.png"></p><ul><li>组成：Eden + Surviver（S0 + S1） + Old</li><li>对象生命周期：Eden &gt; Surviver（S0 + S1） &gt; Old</li><li>Eden:该区域是最主要的刚创建的对象的内存分配区域，绝大多数对象都会被创建到这里（除了部分大对象通过内存担保机制创建到Old区域，默认大对象都是能够存活较长时间的），该区域的对象大部分都是短时间都会死亡的，故垃圾回收器针对该部分主要采用标记整理算法了回收该区域。</li><li>Surviver:该区域也是属于新生代的区域，该区域是将在Eden中未被清理的对象存放到该区域中，该区域分为两块区域，采用的是复制算法，每次只使用一块，Eden与Surviver区域的比例是8:1，是根据大量的业务运行总结出来的规律。</li><li>Old:该区域是属于老年代，一般能够在Surviver中没有被清除出去的对象才会进入到这块区域，该区域主要是采用标记清除算法。</li><li>总结：java堆的垃圾回收是垃圾回收器最主要的光顾对象，整体采用分代收集的策略，对不同区域结合其特点采用不同的垃圾收集算法。我们在编程中也应该关注这一块区域，尽量不适用大对象，尽可能的创建局部对象，使用过后确定废弃不用的对象及时断开引用，尽量避免使用循环的对象引用（可达性分析也是比较消耗资源的）等等。</li></ul><h4 id="jvm内存区域的详解图" tabindex="-1"><a class="header-anchor" href="#jvm内存区域的详解图"><span>JVM内存区域的详解图</span></a></h4><p><img src="https://upload-images.jianshu.io/upload_images/12159-deafd9588b74a2cf.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="image.png"></p><h4 id="更多这类文章" tabindex="-1"><a class="header-anchor" href="#更多这类文章"><span>更多这类文章</span></a></h4><ul><li><a href="https://tech.meituan.com/jvm_optimize.html" target="_blank" rel="noopener noreferrer">从实际案例聊聊Java应用的GC优化</a></li></ul><h2 id="频繁gc问题或内存溢出排查流程" tabindex="-1"><a class="header-anchor" href="#频繁gc问题或内存溢出排查流程"><span>频繁GC问题或内存溢出排查流程</span></a></h2><ul><li>使用 <code>jps</code>，查看线程ID，假设 PID 为 12011</li><li>使用 <code>jstat -gc PID 250 20</code>，查看gc情况，一般比较关注PERM区的情况，查看GC的增长情况。</li><li>使用 <code>jstat -gccause PID</code>：额外输出上次GC原因</li><li>使用 <code>jmap -dump:format=b,file=/opt/myHeapDumpFileName 12011</code>，生成堆转储文件</li><li>使用 jhat 或者可视化工具（Eclipse Memory Analyzer 、IBM HeapAnalyzer）分析堆情况。</li><li>结合代码解决内存溢出或泄露问题。</li></ul><h2 id="死锁问题" tabindex="-1"><a class="header-anchor" href="#死锁问题"><span>死锁问题</span></a></h2><ul><li>使用 <code>jps</code>查看线程ID，假设 PID 为 12011</li><li>使用 <code>jstack 12011</code> 查看线程情况</li></ul><h2 id="jps" tabindex="-1"><a class="header-anchor" href="#jps"><span>jps</span></a></h2><ul><li>显示当前所有 java 进程 pid 的命令</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">16470 Jps</span>
<span class="line">12011 Bootstrap</span>
<span class="line"></span></code></pre></div><ul><li><code>jps -v</code> 跟：<code>ps -ef|grep java</code> 主要输出内容一样</li><li><code>12011</code> 是我这边的一个 java 应用的 pid，下面的其他命令都是自己与此应用进行分析的</li></ul><h2 id="jstat-重要" tabindex="-1"><a class="header-anchor" href="#jstat-重要"><span>jstat（重要）</span></a></h2><ul><li>显示进程中的类装载、内存、垃圾收集、JIT编译等运行数据。</li><li>查看类加载信息：<code>jstat -class PID</code></li></ul><h4 id="垃圾回收统计" tabindex="-1"><a class="header-anchor" href="#垃圾回收统计"><span>垃圾回收统计</span></a></h4><ul><li><code>jstat -gc PID 250 10</code>，每250毫秒查询一次，一共查询10次。</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT   </span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line">34944.0 34944.0 1006.5  0.0   279616.0 235729.8  699072.0   12407.5   20736.0 20145.5 2560.0 2411.8      6    0.392   0      0.000    0.392</span>
<span class="line"></span></code></pre></div><ul><li>列含义说明： <ul><li><strong>34944.0 表示 34M 大小，235729.8 表示 235M</strong></li><li><strong>SO + S1 + Eden = young 区</strong> -S0C 年轻代中第一个survivor（幸存区）的容量 (字节) -S1C 年轻代中第二个survivor（幸存区）的容量 (字节) -S0U 年轻代中第一个survivor（幸存区）目前已使用空间 (字节) （字母 U 表示 used） -S1U 年轻代中第二个survivor（幸存区）目前已使用空间 (字节) （字母 U 表示 used） -EC 年轻代中Eden（伊甸园）的容量 (字节) -EU 年轻代中Eden（伊甸园）目前已使用空间 (字节)</li><li><strong>OC + OU = old 区</strong> -OC Old代的容量 (字节) -OU Old代目前已使用空间 (字节)</li><li><strong>MC + MU = Metaspace 区</strong><ul><li>MC 方法区大小</li><li>MU 方法区使用大小</li></ul></li><li>其他 <ul><li>CCSC 压缩类空间大小</li><li>CCSU 压缩类空间使用大小</li><li>YGC 年轻代垃圾回收次数</li><li>YGCT 年轻代垃圾回收消耗时间</li><li>FGC 老年代垃圾回收次数</li><li>FGCT 老年代垃圾回收消耗时间</li><li>GCT 垃圾回收消耗总时间</li></ul></li></ul></li></ul><h4 id="堆内存统计" tabindex="-1"><a class="header-anchor" href="#堆内存统计"><span>堆内存统计</span></a></h4><ul><li><code>jstat -gccapacity 12011 250 10</code>，查询进程 12011 VM内存中三代（young,old,perm）对象的使用和占用大小，每250毫秒查询一次，一共查询10次。</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> NGCMN    NGCMX     NGC     S0C   S1C       EC      OGCMN      OGCMX       OGC         OC       MCMN     MCMX      MC     CCSMN    CCSMX     CCSC    YGC    FGC </span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line">349504.0 1398080.0 349504.0 34944.0 34944.0 279616.0   699072.0  2796224.0   699072.0   699072.0      0.0 1067008.0  20736.0      0.0 1048576.0   2560.0      6     0</span>
<span class="line"></span></code></pre></div><ul><li>列含义说明： <ul><li>NGCMN 年轻代(young)中初始化(最小)的大小(字节)</li><li>NGCMX 年轻代(young)的最大容量 (字节)</li><li>NGC 年轻代(young)中当前的容量 (字节)</li><li>S0C 年轻代中第一个survivor（幸存区）的容量 (字节)</li><li>S1C 年轻代中第二个survivor（幸存区）的容量 (字节)</li><li>EC 年轻代中Eden（伊甸园）的容量 (字节)</li><li>OGCMN old代中初始化(最小)的大小 (字节)</li><li>OGCMX old代的最大容量(字节)</li><li>OGC old代当前新生成的容量 (字节)</li><li>OC Old代的容量 (字节)</li><li>MCMN 最小元数据容量</li><li>MCMX 最大元数据容量</li><li>MC 当前元数据空间大小</li><li>CCSMN 最小压缩类空间大小</li><li>CCSMX 最大压缩类空间大小</li><li>CCSC 当前压缩类空间大小</li><li>YGC 年轻代gc次数，从应用程序启动到采样时年轻代中gc次数</li><li>FGC 老年代GC次数，从应用程序启动到采样时old代(全gc = Full gc次数)gc次数</li></ul></li><li>更多其他参数的使用可以看： <ul><li><a href="https://mp.weixin.qq.com/s?__biz=MzI3NzE0NjcwMg==&amp;mid=402330276&amp;idx=2&amp;sn=58117de92512f83090d0a9de738eeacd&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">Java命令学习系列（四）——jstat</a></li><li><a href="https://blog.csdn.net/maosijunzi/article/details/46049117" target="_blank" rel="noopener noreferrer">java高分局之jstat命令使用</a></li><li><a href="https://www.cnblogs.com/yjd_hycf_space/p/7755633.html" target="_blank" rel="noopener noreferrer">jstat命令查看jvm的GC情况 （以Linux为例）</a></li></ul></li></ul><h4 id="gcutil" tabindex="-1"><a class="header-anchor" href="#gcutil"><span>gcutil</span></a></h4><ul><li>使用：<code>jstat -gcutil PID 3000 10</code>：</li><li>正常情况结果应该是这样的：</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT</span>
<span class="line">0.00   0.00  67.63  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line">0.00   0.00  67.68  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line">0.00   0.00  67.68  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line">0.00   0.00  67.68  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line">0.00   0.00  67.68  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line">0.00   0.00  67.68  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line">0.00   0.00  67.68  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line">0.00   0.00  67.68  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line">0.00   0.00  67.71  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line">0.00   0.00  67.71  38.09  78.03  68.82    124    0.966     5    0.778    1.744</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><ul><li>S0：SO 当前使用比例</li><li>S1：S1 当前使用比例</li><li>E：<strong>Eden 区使用比例（百分比）（异常的时候，这里可能会接近 100%）</strong></li><li>O：<strong>old 区使用比例（百分比）（异常的时候，这里可能会接近 100%）</strong></li><li>M：<strong>Metaspace 区使用比例（百分比）（异常的时候，这里可能会接近 100%）</strong></li><li>CCS：压缩使用比例</li><li>YGC：年轻代垃圾回收次数</li><li>FGC：老年代垃圾回收次数</li><li>FGCT：老年代垃圾回收消耗时间（Full gc耗时）（单位秒）</li><li>GCT：垃圾回收消耗总时间（单位秒）</li><li><strong>异常的时候每次 Full GC 时间也可能非常长，每次时间计算公式=FGCT值/FGC指）</strong></li><li>在 YGC 之前 年轻代 = eden + S1；YGC 之后，年轻代 = eden + S0。</li><li>如果看到 YGC 之后 old 区空间没变，表示此次 YGC，没有对象晋升到 old 区</li></ul><h2 id="jmap" tabindex="-1"><a class="header-anchor" href="#jmap"><span>jmap</span></a></h2><ul><li>生成堆转储快照（heap dump） <ul><li>heap dump 主要记录了在某一时刻JVM堆中对象使用的情况，即某个时刻JVM堆的快照，是一个二进制文件，主要用于分析哪些对象占用了太对的堆空间，从而发现导致内存泄漏的对象。</li></ul></li><li>堆Dump是反应Java堆使用情况的内存镜像，其中主要包括系统信息、虚拟机属性、完整的线程Dump、所有类和对象的状态等。 一般，在内存不足、GC异常等情况下，我们就会怀疑有内存泄露。这个时候我们就可以制作堆Dump来查看具体情况，分析原因。</li><li>常见内存错误： <ul><li>outOfMemoryError 年老代内存不足。</li><li>outOfMemoryError:PermGen Space 永久代内存不足。</li><li>outOfMemoryError:GC overhead limit exceed 垃圾回收时间占用系统运行时间的98%或以上。</li></ul></li><li><code>jmap -heap 12011</code>，查看指定进程堆（heap）使用情况</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Attaching to process ID 12011, please wait...</span>
<span class="line">Debugger attached successfully.</span>
<span class="line">Server compiler detected.</span>
<span class="line">JVM version is 25.151-b12</span>
<span class="line"></span>
<span class="line">using thread-local object allocation.</span>
<span class="line">Mark Sweep Compact GC</span>
<span class="line"></span>
<span class="line">Heap Configuration:</span>
<span class="line">   MinHeapFreeRatio         = 40</span>
<span class="line">   MaxHeapFreeRatio         = 70</span>
<span class="line">   MaxHeapSize              = 4294967296 (4096.0MB)</span>
<span class="line">   NewSize                  = 357892096 (341.3125MB)</span>
<span class="line">   MaxNewSize               = 1431633920 (1365.3125MB)</span>
<span class="line">   OldSize                  = 715849728 (682.6875MB)</span>
<span class="line">   NewRatio                 = 2</span>
<span class="line">   SurvivorRatio            = 8</span>
<span class="line">   MetaspaceSize            = 21807104 (20.796875MB)</span>
<span class="line">   CompressedClassSpaceSize = 1073741824 (1024.0MB)</span>
<span class="line">   MaxMetaspaceSize         = 17592186044415 MB</span>
<span class="line">   G1HeapRegionSize         = 0 (0.0MB)</span>
<span class="line"></span>
<span class="line">Heap Usage:</span>
<span class="line">New Generation (Eden + 1 Survivor Space):</span>
<span class="line">   capacity = 322109440 (307.1875MB)</span>
<span class="line">   used     = 242418024 (231.1878433227539MB)</span>
<span class="line">   free     = 79691416 (75.9996566772461MB)</span>
<span class="line">   75.2595217327378% used</span>
<span class="line">Eden Space:</span>
<span class="line">   capacity = 286326784 (273.0625MB)</span>
<span class="line">   used     = 241387328 (230.20489501953125MB)</span>
<span class="line">   free     = 44939456 (42.85760498046875MB)</span>
<span class="line">   84.30483681191348% used</span>
<span class="line">From Space:</span>
<span class="line">   capacity = 35782656 (34.125MB)</span>
<span class="line">   used     = 1030696 (0.9829483032226562MB)</span>
<span class="line">   free     = 34751960 (33.142051696777344MB)</span>
<span class="line">   2.88043458819826% used</span>
<span class="line">To Space:</span>
<span class="line">   capacity = 35782656 (34.125MB)</span>
<span class="line">   used     = 0 (0.0MB)</span>
<span class="line">   free     = 35782656 (34.125MB)</span>
<span class="line">   0.0% used</span>
<span class="line">tenured generation:</span>
<span class="line">   capacity = 715849728 (682.6875MB)</span>
<span class="line">   used     = 12705280 (12.11669921875MB)</span>
<span class="line">   free     = 703144448 (670.57080078125MB)</span>
<span class="line">   1.774852947908084% used</span>
<span class="line"></span>
<span class="line">7067 interned Strings occupying 596016 bytes.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>jmap -histo 12011</code>，查看堆内存(histogram)中的对象数量及大小（下面 demo 内容太多，所以选取其中一部分） <ul><li><code>jmap -histo:live 12011</code>，查看堆内存(histogram)中的对象数量及大小，但是JVM会先触发gc，然后再统计信息</li><li><code>jmap -dump:format=b,file=/opt/myHeapDumpFileName 12011</code>，将内存使用的详细情况输出到文件，之后一般使用其他工具进行分析。</li><li>生成的文件可以用一些可视化工具（Eclipse Memory Analyzer 、IBM HeapAnalyzer）来查看</li></ul></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">编号              个数          字节   类名</span>
<span class="line"> 508:             6            192  java.lang.invoke.LambdaForm$BasicType</span>
<span class="line"> 509:             8            192  java.lang.invoke.MethodHandleImpl$Intrinsic</span>
<span class="line"> 510:             8            192  java.math.RoundingMode</span>
<span class="line"> 511:             6            192  java.net.NetworkInterface$1checkedAddresses</span>
<span class="line"> 512:             6            192  java.rmi.server.UID</span>
<span class="line"> 513:             3            192  java.text.DateFormatSymbols</span>
<span class="line"> 514:             8            192  java.util.Formatter$FixedString</span>
<span class="line"> 515:             6            192  java.util.TreeMap$KeyIterator</span>
<span class="line"> 516:             8            192  java.util.regex.Pattern$Slice</span>
<span class="line"> 517:             8            192  jdk.net.SocketFlow$Status</span>
<span class="line"> 518:             6            192  net.sf.ehcache.DefaultElementEvictionData</span>
<span class="line"> 519:             3            192  net.sf.ehcache.store.chm.SelectableConcurrentHashMap</span>
<span class="line"> 520:             8            192  org.apache.logging.log4j.Level</span>
<span class="line"> 521:             8            192  org.apache.logging.log4j.core.appender.rolling.RolloverFrequency</span>
<span class="line"> 522:             4            192  org.apache.logging.log4j.core.impl.ThrowableProxy</span>
<span class="line"> 523:             3            192  org.apache.logging.log4j.core.layout.PatternLayout</span>
<span class="line"> 524:            12            192  org.apache.logging.log4j.core.util.datetime.FastDateParser$NumberStrategy</span>
<span class="line"> 525:             3            192  org.apache.logging.log4j.core.util.datetime.FixedDateFormat</span>
<span class="line"> 526:             8            192  org.apache.logging.log4j.spi.StandardLevel</span>
<span class="line"> 527:             2            192  sun.nio.ch.ServerSocketChannelImpl</span>
<span class="line"> 528:             4            192  sun.nio.cs.StreamEncoder</span>
<span class="line"> 529:             6            192  sun.reflect.generics.reflectiveObjects.TypeVariableImpl</span>
<span class="line"> 530:            11            176  java.text.NumberFormat$Field</span>
<span class="line"> 531:            11            176  java.util.concurrent.ConcurrentSkipListSet</span>
<span class="line"> 532:             2            176  javax.management.remote.rmi.NoCallStackClassLoader</span>
<span class="line"> 533:            11            176  org.apache.logging.log4j.core.lookup.MapLookup</span>
<span class="line"> 534:             8            168  [Ljava.lang.reflect.TypeVariable;</span>
<span class="line"> 535:             1            168  [[Ljava.math.BigInteger;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jstack-线程快照-cpu-负载高" tabindex="-1"><a class="header-anchor" href="#jstack-线程快照-cpu-负载高"><span>jstack（线程快照 -- CPU 负载高）</span></a></h2><ul><li>jstack命令主要用来查看Java线程的调用堆栈的，可以用来分析线程问题（如死锁）</li><li>jstack用于生成java虚拟机当前时刻的 <strong>线程快照（thread dump）</strong>。主要记录JVM在某一时刻各个线程执行的情况，以栈的形式显示，是一个文本文件。</li><li>线程快照是当前java虚拟机内每一条线程正在执行的方法堆栈的集合，生成线程快照的主要目的是定位线程出现长时间停顿的原因，如线程间死锁、死循环、请求外部资源导致的长时间等待等。 <ul><li>线程出现停顿的时候通过jstack来查看各个线程的调用堆栈，就可以知道没有响应的线程到底在后台做什么事情，或者等待什么资源。</li><li>如果java程序崩溃生成core文件，jstack工具可以用来获得core文件的java stack和native stack的信息，从而可以轻松地知道java程序是如何崩溃和在程序何处发生问题。</li><li>另外，jstack工具还可以附属到正在运行的java程序中，看到当时运行的java程序的java stack和native stack的信息, 如果现在运行的java程序呈现hung的状态，jstack是非常有用的。</li></ul></li><li><code>jstack 12011</code>，查看线程情况</li><li><code>jstack -l 12011</code>，除堆栈外，显示关于锁的附件信息</li><li>导出文件：<code>jstack -l PID &gt;&gt; /opt/jstack-tomcat1-20180917.log</code><ul><li>把占用 CPU 资源高的线程十进制的 PID 转换成 16 进制：<code>printf &quot;%x\\n&quot; PID</code>，比如：<code>printf &quot;%x\\n&quot; 12401</code> 得到结果是：<code>3071</code></li><li>在刚刚输出的那个 log 文件中搜索：<code>3071</code>，可以找到：<code>nid=0x3071</code></li></ul></li><li>在线看某个线程 PID 的情况：<code>jstack 进程ID | grep 十六进制线程ID -A 10</code><ul><li><code>-A 10</code> 参数用来指定显示行数，否则只会显示一行信息</li></ul></li><li>下面 demo 内容太多，所以选取其中一部分结构：</li><li>常见线程状态 <ul><li>Runnable：正在运行的线程</li><li>Sleeping：休眠的线程</li><li>Waiting：等待的线程</li></ul></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">2018-03-08 14:28:13</span>
<span class="line">Full thread dump Java HotSpot(TM) 64-Bit Server VM (25.151-b12 mixed mode):</span>
<span class="line"></span>
<span class="line">&quot;Attach Listener&quot; #53 daemon prio=9 os_prio=0 tid=0x00007f8a34009000 nid=0x865 waiting on condition [0x0000000000000000]</span>
<span class="line">   java.lang.Thread.State: RUNNABLE</span>
<span class="line"></span>
<span class="line">&quot;Log4j2-AsyncLoggerConfig-1&quot; #16 daemon prio=5 os_prio=0 tid=0x00007f8a5c48d800 nid=0x2f0c waiting on condition [0x00007f8a4cbfe000]</span>
<span class="line">   java.lang.Thread.State: WAITING (parking)</span>
<span class="line"> at sun.misc.Unsafe.park(Native Method)</span>
<span class="line"> - parking to wait for  &lt;0x00000007155e4850&gt; (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)</span>
<span class="line"> at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)</span>
<span class="line"> at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2039)</span>
<span class="line"> at com.lmax.disruptor.BlockingWaitStrategy.waitFor(BlockingWaitStrategy.java:45)</span>
<span class="line"> at com.lmax.disruptor.ProcessingSequenceBarrier.waitFor(ProcessingSequenceBarrier.java:56)</span>
<span class="line"> at com.lmax.disruptor.BatchEventProcessor.run(BatchEventProcessor.java:124)</span>
<span class="line"> at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)</span>
<span class="line"> at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)</span>
<span class="line"> at java.lang.Thread.run(Thread.java:748)</span>
<span class="line"></span>
<span class="line">&quot;Wrapper-Control-Event-Monitor&quot; #13 daemon prio=5 os_prio=0 tid=0x00007f8a5c34e000 nid=0x2efc waiting on condition [0x00007f8a60314000]</span>
<span class="line">   java.lang.Thread.State: TIMED_WAITING (sleeping)</span>
<span class="line"> at java.lang.Thread.sleep(Native Method)</span>
<span class="line"> at org.tanukisoftware.wrapper.WrapperManager$3.run(WrapperManager.java:731)</span>
<span class="line"></span>
<span class="line">&quot;RMI TCP Accept-0&quot; #11 daemon prio=5 os_prio=0 tid=0x00007f8a5c32f800 nid=0x2efa runnable [0x00007f8a60619000]</span>
<span class="line">   java.lang.Thread.State: RUNNABLE</span>
<span class="line"> at java.net.PlainSocketImpl.socketAccept(Native Method)</span>
<span class="line"> at java.net.AbstractPlainSocketImpl.accept(AbstractPlainSocketImpl.java:409)</span>
<span class="line"> at java.net.ServerSocket.implAccept(ServerSocket.java:545)</span>
<span class="line"> at java.net.ServerSocket.accept(ServerSocket.java:513)</span>
<span class="line"> at sun.management.jmxremote.LocalRMIServerSocketFactory$1.accept(LocalRMIServerSocketFactory.java:52)</span>
<span class="line"> at sun.rmi.transport.tcp.TCPTransport$AcceptLoop.executeAcceptLoop(TCPTransport.java:400)</span>
<span class="line"> at sun.rmi.transport.tcp.TCPTransport$AcceptLoop.run(TCPTransport.java:372)</span>
<span class="line"> at java.lang.Thread.run(Thread.java:748)</span>
<span class="line"></span>
<span class="line">&quot;Service Thread&quot; #7 daemon prio=9 os_prio=0 tid=0x00007f8a5c0b4800 nid=0x2ef3 runnable [0x0000000000000000]</span>
<span class="line">   java.lang.Thread.State: RUNNABLE</span>
<span class="line"></span>
<span class="line">&quot;C1 CompilerThread1&quot; #6 daemon prio=9 os_prio=0 tid=0x00007f8a5c0b1800 nid=0x2ef2 waiting on condition [0x0000000000000000]</span>
<span class="line">   java.lang.Thread.State: RUNNABLE</span>
<span class="line"></span>
<span class="line">&quot;C2 CompilerThread0&quot; #5 daemon prio=9 os_prio=0 tid=0x00007f8a5c0af800 nid=0x2ef1 waiting on condition [0x0000000000000000]</span>
<span class="line">   java.lang.Thread.State: RUNNABLE</span>
<span class="line"></span>
<span class="line">&quot;Signal Dispatcher&quot; #4 daemon prio=9 os_prio=0 tid=0x00007f8a5c0aa800 nid=0x2ef0 runnable [0x0000000000000000]</span>
<span class="line">   java.lang.Thread.State: RUNNABLE</span>
<span class="line"></span>
<span class="line">&quot;Finalizer&quot; #3 daemon prio=8 os_prio=0 tid=0x00007f8a5c07b000 nid=0x2eef in Object.wait() [0x00007f8a614f4000]</span>
<span class="line">   java.lang.Thread.State: WAITING (on object monitor)</span>
<span class="line"> at java.lang.Object.wait(Native Method)</span>
<span class="line"> - waiting on &lt;0x00000007155e5ba8&gt; (a java.lang.ref.ReferenceQueue$Lock)</span>
<span class="line"> at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:143)</span>
<span class="line"> - locked &lt;0x00000007155e5ba8&gt; (a java.lang.ref.ReferenceQueue$Lock)</span>
<span class="line"> at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:164)</span>
<span class="line"> at java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)</span>
<span class="line"></span>
<span class="line">&quot;VM Thread&quot; os_prio=0 tid=0x00007f8a5c06e800 nid=0x2eed runnable </span>
<span class="line"></span>
<span class="line">&quot;VM Periodic Task Thread&quot; os_prio=0 tid=0x00007f8a5c332000 nid=0x2efb waiting on condition </span>
<span class="line"></span>
<span class="line">JNI global references: 281</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="https://juejin.im/entry/5a9220f85188257a856f5d6e" target="_blank" rel="noopener noreferrer">https://juejin.im/entry/5a9220f85188257a856f5d6e</a></li><li><a href="https://www.javatang.com/archives/2017/10/19/33151873.html" target="_blank" rel="noopener noreferrer">https://www.javatang.com/archives/2017/10/19/33151873.html</a></li><li><a href="https://juejin.im/post/5a9b811a6fb9a028e46e1c88" target="_blank" rel="noopener noreferrer">https://juejin.im/post/5a9b811a6fb9a028e46e1c88</a></li></ul>`,48)])])}const p=n(l,[["render",c]]),d=JSON.parse('{"path":"/linux-tutor/server/Java-bin.html","title":"Java bin 目录下的工具","lang":"zh-CN","frontmatter":{"description":"Java bin 目录下的工具 JVM 内存结构 参考资料：JVM内存结构（基于JDK8） 运行时数据区（JVM 规范） image.png VM 栈（JVM 虚拟机栈） 是线程私有的，它的生命周期和线程相同。它描述的是 Java 方法执行的内存模式。 Java 堆区（Heap） 是 Java 虚拟机所管理的内存中最大的一块。是被所有线程共享的一块内存...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java bin 目录下的工具\\",\\"image\\":[\\"https://upload-images.jianshu.io/upload_images/12159-f8cdb04243ea36e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\",\\"https://upload-images.jianshu.io/upload_images/12159-045ea5a11000e8df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\",\\"https://upload-images.jianshu.io/upload_images/12159-6a94044da388bb0e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\",\\"https://upload-images.jianshu.io/upload_images/12159-deafd9588b74a2cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240\\"],\\"dateModified\\":\\"2022-06-04T21:01:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Java-bin.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Java bin 目录下的工具"}],["meta",{"property":"og:description","content":"Java bin 目录下的工具 JVM 内存结构 参考资料：JVM内存结构（基于JDK8） 运行时数据区（JVM 规范） image.png VM 栈（JVM 虚拟机栈） 是线程私有的，它的生命周期和线程相同。它描述的是 Java 方法执行的内存模式。 Java 堆区（Heap） 是 Java 虚拟机所管理的内存中最大的一块。是被所有线程共享的一块内存..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://upload-images.jianshu.io/upload_images/12159-f8cdb04243ea36e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-04T21:01:43.000Z"}],["meta",{"property":"article:modified_time","content":"2022-06-04T21:01:43.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1654376503000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":13.4,"words":4019},"filePathRelative":"linux-tutor/server/Java-bin.md","autoDesc":true}');export{p as comp,d as data};
