import{_ as a,c as n,a as s,o as t}from"./app-B6vXTniy.js";const p={};function i(r,e){return t(),n("div",null,[...e[0]||(e[0]=[s(`<h1 id="文本处理" tabindex="-1"><a class="header-anchor" href="#文本处理"><span>文本处理</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>本节将介绍Linux下使用Shell处理文本时最常用的工具： find、grep、xargs、sort、uniq、tr、cut、paste、wc、sed、awk； 提供的例子和参数都是常用的； 我对shell脚本使用的原则是命令单行书写，尽量不要超过2行； 如果有更为复杂的任务需求，还是考虑python吧；</p></div><h2 id="find-文件查找" tabindex="-1"><a class="header-anchor" href="#find-文件查找"><span>find 文件查找</span></a></h2><p>查找txt和pdf文件:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . \\( -name &quot;*.txt&quot; -o -name &quot;*.pdf&quot; \\) -print</span>
<span class="line"></span></code></pre></div><p>正则方式查找.txt和pdf:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -regex  &quot;.*\\(\\.txt\\|\\.pdf\\)$&quot;</span>
<span class="line"></span></code></pre></div><p>-iregex： 忽略大小写的正则</p><p>否定参数 ,查找所有非txt文本:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . ! -name &quot;*.txt&quot; -print</span>
<span class="line"></span></code></pre></div><p>指定搜索深度,打印出当前目录的文件（深度为1）:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -maxdepth 1 -type f</span>
<span class="line"></span></code></pre></div><h3 id="定制搜索" tabindex="-1"><a class="header-anchor" href="#定制搜索"><span>定制搜索</span></a></h3><p>- 按类型搜索 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -type d -print  //只列出所有目录</span>
<span class="line"></span></code></pre></div><p>-type f 文件 / l 符号链接 / d 目录</p><p>find支持的文件检索类型可以区分普通文件和符号链接、目录等，但是二进制文件和文本文件无法直接通过find的类型区分出来；</p><p>file命令可以检查文件具体类型（二进制或文本）:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    $file redis-cli  # 二进制文件</span>
<span class="line">    redis-cli: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.9, not stripped</span>
<span class="line">    $file redis.pid  # 文本文件</span>
<span class="line">    redis.pid: ASCII text</span>
<span class="line"></span></code></pre></div><p>所以,可以用以下命令组合来实现查找本地目录下的所有二进制文件:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    ls -lrt | awk &#39;{print $9}&#39;|xargs file|grep  ELF| awk &#39;{print $1}&#39;|tr -d &#39;:&#39;</span>
<span class="line"></span></code></pre></div><ul><li></li></ul><pre><code>按时间搜索

:   -   -atime 访问时间 (单位是天，分钟单位则是-amin，以下类似）
    -   -mtime 修改时间 （内容被修改）
    -   -ctime 变化时间 （元数据或权限变化）
</code></pre><p>最近第7天被访问过的所有文件:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -atime 7 -type f -print</span>
<span class="line"></span></code></pre></div><p>最近7天内被访问过的所有文件:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -atime -7 -type f -print</span>
<span class="line"></span></code></pre></div><p>查询7天前被访问过的所有文件:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -atime +7 -type f -print</span>
<span class="line"></span></code></pre></div><p>- 按大小搜索： w字 k M G 寻找大于2k的文件:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -type f -size +2k</span>
<span class="line"></span></code></pre></div><p>按权限查找:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -type f -perm 644 -print //找具有可执行权限的所有文件</span>
<span class="line"></span></code></pre></div><p>按用户查找:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -type f -user weber -print// 找用户weber所拥有的文件</span>
<span class="line"></span></code></pre></div><h3 id="找到后的后续动作" tabindex="-1"><a class="header-anchor" href="#找到后的后续动作"><span>找到后的后续动作</span></a></h3><p>- 删除 删除当前目录下所有的swp文件:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -type f -name &quot;*.swp&quot; -delete</span>
<span class="line"></span></code></pre></div><p>另一种语法:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . type f -name &quot;*.swp&quot; | xargs rm</span>
<span class="line"></span></code></pre></div><p>- 执行动作（强大的exec） 将当前目录下的所有权变更为weber:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -type f -user root -exec chown weber {} \\; </span>
<span class="line"></span></code></pre></div><p>注：{}是一个特殊的字符串，对于每一个匹配的文件，{}会被替换成相应的文件名；</p><p>将找到的文件全都copy到另一个目录:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    find . -type f -mtime +10 -name &quot;*.txt&quot; -exec cp {} OLD \\;</span>
<span class="line"></span></code></pre></div><p>- 结合多个命令 如果需要后续执行多个命令，可以将多个命令写成一个脚本。然后 -exec 调用时执行脚本即可:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    -exec ./commands.sh {} \\;</span>
<span class="line"></span></code></pre></div><h3 id="print的定界符" tabindex="-1"><a class="header-anchor" href="#print的定界符"><span>-print的定界符</span></a></h3><p>默认使用&#39;\\n&#39;作为文件的定界符；</p><p>-print0 使用&#39;\\0&#39;作为文件的定界符，这样就可以搜索包含空格的文件；</p><h2 id="grep-文本搜索" tabindex="-1"><a class="header-anchor" href="#grep-文本搜索"><span>grep 文本搜索</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    grep match_patten file // 默认访问匹配行</span>
<span class="line"></span></code></pre></div><p>常用参数</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">- -o 只输出匹配的文本行 **VS** -v 只输出没有匹配的文本行</span>
<span class="line"></span>
<span class="line">-</span>
<span class="line"></span>
<span class="line">    -c 统计文件中包含文本的次数</span>
<span class="line"></span>
<span class="line">    :   grep -c \\&quot;text\\&quot; filename</span>
<span class="line"></span>
<span class="line">- -n 打印匹配的行号</span>
<span class="line"></span>
<span class="line">- -i 搜索时忽略大小写</span>
<span class="line"></span>
<span class="line">- -l 只打印文件名</span>
<span class="line"></span></code></pre></div><p>在多级目录中对文本递归搜索(程序员搜代码的最爱）:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    grep &quot;class&quot; . -R -n</span>
<span class="line"></span></code></pre></div><p>匹配多个模式:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    grep -e &quot;class&quot; -e &quot;vitural&quot; file</span>
<span class="line"></span></code></pre></div><p>grep输出以0作为结尾符的文件名（-z）:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    grep &quot;test&quot; file* -lZ| xargs -0 rm</span>
<span class="line"></span></code></pre></div><p>综合应用：将日志中的所有带where条件的sql查找查找出来:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    cat LOG.* | tr a-z A-Z | grep &quot;FROM &quot; | grep &quot;WHERE&quot; &gt; b</span>
<span class="line"></span></code></pre></div><p>查找中文示例：工程目录中utf-8格式和gb2312格式两种文件，要查找字的是中文；</p><ol><li><p>查找到它的utf-8编码和gb2312编码分别是E4B8ADE69687和D6D0CEC4</p></li><li><p>查询:</p></li></ol><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">        grep：grep -rnP &quot;\\xE4\\xB8\\xAD\\xE6\\x96\\x87|\\xD6\\xD0\\xCE\\xC4&quot; *即可</span>
<span class="line"></span></code></pre></div><p>汉字编码查询：<a href="http://bm.kdd.cc/" target="_blank" rel="noopener noreferrer">http://bm.kdd.cc/</a></p><h2 id="xargs-命令行参数转换" tabindex="-1"><a class="header-anchor" href="#xargs-命令行参数转换"><span>xargs 命令行参数转换</span></a></h2><p>xargs 能够将输入数据转化为特定命令的命令行参数；这样，可以配合很多命令来组合使用。比如grep，比如find； - 将多行输出转化为单行输出 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    cat file.txt| xargs</span>
<span class="line"></span></code></pre></div><p>n 是多行文本间的定界符</p><p>- 将单行转化为多行输出 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    cat single.txt | xargs -n 3</span>
<span class="line"></span></code></pre></div><p>-n：指定每行显示的字段数</p><p>xargs参数说明</p><ul><li>-d 定义定界符 （默认为空格 多行的定界符为 n）</li><li>-n 指定输出为多行</li><li>-I {} 指定替换字符串，这个字符串在xargs扩展时会被替换掉,用于待执行的命令需要多个参数时</li><li>-0：指定0为输入定界符</li></ul><p>示例:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    cat file.txt | xargs -I {} ./command.sh -p {} -1</span>
<span class="line"></span>
<span class="line">    #统计程序行数</span>
<span class="line">    find source_dir/ -type f -name &quot;*.cpp&quot; -print0 |xargs -0 wc -l</span>
<span class="line"></span>
<span class="line">    #redis通过string存储数据，通过set存储索引，需要通过索引来查询出所有的值：</span>
<span class="line">    ./redis-cli smembers $1  | awk &#39;{print $1}&#39;|xargs -I {} ./redis-cli get {}</span>
<span class="line"></span></code></pre></div><h2 id="sort-排序" tabindex="-1"><a class="header-anchor" href="#sort-排序"><span>sort 排序</span></a></h2><p>字段说明</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">- -n 按数字进行排序 VS -d 按字典序进行排序</span>
<span class="line">- -r 逆序排序</span>
<span class="line">- -k N 指定按第N列排序</span>
<span class="line"></span></code></pre></div><p>示例:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    sort -nrk 1 data.txt</span>
<span class="line">    sort -bd data // 忽略像空格之类的前导空白字符</span>
<span class="line"></span></code></pre></div><h2 id="uniq-消除重复行" tabindex="-1"><a class="header-anchor" href="#uniq-消除重复行"><span>uniq 消除重复行</span></a></h2><p>- 消除重复行 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    sort unsort.txt | uniq</span>
<span class="line"></span></code></pre></div><p>- 统计各行在文件中出现的次数 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    sort unsort.txt | uniq -c</span>
<span class="line"></span></code></pre></div><p>- 找出重复行 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    sort unsort.txt | uniq -d</span>
<span class="line"></span></code></pre></div><p>可指定每行中需要比较的重复内容：-s 开始位置 -w 比较字符数</p><h2 id="用tr进行转换" tabindex="-1"><a class="header-anchor" href="#用tr进行转换"><span>用tr进行转换</span></a></h2><p>- 通用用法 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    echo 12345 | tr &#39;0-9&#39; &#39;9876543210&#39; //加解密转换，替换对应字符</span>
<span class="line">    cat text| tr &#39;\\t&#39; &#39; &#39;  //制表符转空格</span>
<span class="line"></span></code></pre></div><p>- tr删除字符 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    cat file | tr -d &#39;0-9&#39; // 删除所有数字</span>
<span class="line"></span></code></pre></div><p>-c 求补集 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    cat file | tr -c &#39;0-9&#39; //获取文件中所有数字</span>
<span class="line">    cat file | tr -d -c &#39;0-9 \\n&#39;  //删除非数字数据</span>
<span class="line"></span></code></pre></div><p>- tr压缩字符 tr -s 压缩文本中出现的重复字符；最常用于压缩多余的空格:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">    cat file | tr -s &#39; &#39;</span>
<span class="line"></span></code></pre></div><p>- 字符类 tr中可用各种字符类： * alnum：字母和数字 * alpha：字母 * digit：数字 * space：空白字符 * lower：小写 * upper：大写 * cntrl：控制（非可打印）字符 * print：可打印字符</p><p>使用方法：tr [:class:] [:class:] :</p><pre><code>tr &#39;[:lower:]&#39; &#39;[:upper:]&#39;
</code></pre><h2 id="cut-按列切分文本" tabindex="-1"><a class="header-anchor" href="#cut-按列切分文本"><span>cut 按列切分文本</span></a></h2><p>- 截取文件的第2列和第4列 :</p><pre><code>cut -f2,4 filename
</code></pre><p>- 去文件除第3列的所有列 :</p><pre><code>cut -f3 --complement filename
</code></pre><p>- -d 指定定界符 :</p><pre><code>   cut -f2 -d&quot;;&quot; filename
</code></pre><ul><li></li></ul><pre><code>cut 取的范围

:   -   N- 第N个字段到结尾
    -   -M 第1个字段为M
    -   N-M N到M个字段
</code></pre><ul><li></li></ul><pre><code>cut 取的单位

:   -   -b 以字节为单位
    -   -c 以字符为单位
    -   -f 以字段为单位（使用定界符）
</code></pre><p>示例:</p><pre><code>cut -c1-5 file //打印第一到5个字符
cut -c-2 file  //打印前2个字符
</code></pre><p>截取文本的第5到第7列 :</p><pre><code>$echo string | cut -c5-7
</code></pre><h2 id="paste-按列拼接文本" tabindex="-1"><a class="header-anchor" href="#paste-按列拼接文本"><span>paste 按列拼接文本</span></a></h2><p>将两个文本按列拼接到一起; :</p><pre><code>cat file1
1
2

cat file2
colin
book

paste file1 file2
1 colin
2 book
</code></pre><p>默认的定界符是制表符，可以用-d指明定界符:</p><pre><code>paste file1 file2 -d &quot;,&quot;
1,colin
2,book
</code></pre><h2 id="wc-统计行和字符的工具" tabindex="-1"><a class="header-anchor" href="#wc-统计行和字符的工具"><span>wc 统计行和字符的工具</span></a></h2><pre><code>$wc -l file // 统计行数

$wc -w file // 统计单词数

$wc -c file // 统计字符数
</code></pre><h2 id="sed-文本替换利器" tabindex="-1"><a class="header-anchor" href="#sed-文本替换利器"><span>sed 文本替换利器</span></a></h2><p>- 首处替换 :</p><pre><code>sed &#39;s/text/replace_text/&#39; file   //替换每一行的第一处匹配的text
</code></pre><p>- 全局替换 :</p><pre><code>sed &#39;s/text/replace_text/g&#39; file
</code></pre><p>默认替换后，输出替换后的内容，如果需要直接替换原文件,使用-i:</p><pre><code>sed -i &#39;s/text/repalce_text/g&#39; file
</code></pre><p>- 移除空白行 :</p><pre><code>sed &#39;/^$/d&#39; file
</code></pre><p>- 变量转换 已匹配的字符串通过标记&amp;来引用. :</p><pre><code>echo this is en example | sed &#39;s/\\w\\+/[&amp;]/g&#39;
$&gt;[this]  [is] [en] [example]
</code></pre><p>- 子串匹配标记 第一个匹配的括号内容使用标记 1 来引用 :</p><pre><code>sed &#39;s/hello\\([0-9]\\)/\\1/&#39;
</code></pre><p>- 双引号求值 sed通常用单引号来引用；也可使用双引号，使用双引号后，双引号会对表达式求值:</p><pre><code>sed &#39;s/$var/HLLOE/&#39;
</code></pre><p>当使用双引号时，我们可以在sed样式和替换字符串中指定变量； :</p><pre><code>eg:
p=patten
r=replaced
echo &quot;line con a patten&quot; | sed &quot;s/$p/$r/g&quot;
$&gt;line con a replaced
</code></pre><p>- 其它示例 字符串插入字符：将文本中每行内容（ABCDEF） 转换为 ABC/DEF:</p><pre><code>sed &#39;s/^.\\{3\\}/&amp;\\//g&#39; file
</code></pre><h2 id="awk-数据流处理工具" tabindex="-1"><a class="header-anchor" href="#awk-数据流处理工具"><span>awk 数据流处理工具</span></a></h2><p>- awk脚本结构 :</p><pre><code>awk &#39; BEGIN{ statements } statements2 END{ statements } &#39;
</code></pre><p>- 工作方式 1.执行begin中语句块；</p><p>2.从文件或stdin中读入一行，然后执行statements2，重复这个过程，直到文件全部被读取完毕；</p><p>3.执行end语句块；</p><h3 id="print-打印当前行" tabindex="-1"><a class="header-anchor" href="#print-打印当前行"><span>print 打印当前行</span></a></h3><p>- 使用不带参数的print时，会打印当前行 :</p><pre><code>echo -e &quot;line1\\nline2&quot; | awk &#39;BEGIN{print &quot;start&quot;} {print } END{ print &quot;End&quot; }&#39;
</code></pre><p>- print 以逗号分割时，参数以空格定界; :</p><pre><code>echo | awk &#39; {var1 = &quot;v1&quot; ; var2 = &quot;V2&quot;; var3=&quot;v3&quot;; \\
print var1, var2 , var3; }&#39;
$&gt;v1 V2 v3
</code></pre><p>- 使用-拼接符的方式（&quot;&quot;作为拼接符）; :</p><pre><code>echo | awk &#39; {var1 = &quot;v1&quot; ; var2 = &quot;V2&quot;; var3=&quot;v3&quot;; \\
print var1&quot;-&quot;var2&quot;-&quot;var3; }&#39;
$&gt;v1-V2-v3
</code></pre><h3 id="特殊变量-nr-nf-0-1-2" tabindex="-1"><a class="header-anchor" href="#特殊变量-nr-nf-0-1-2"><span>特殊变量： NR NF $0 $1 $2</span></a></h3><p>NR:表示记录数量，在执行过程中对应当前行号；</p><p>NF:表示字段数量，在执行过程总对应当前行的字段数；</p><p>$0:这个变量包含执行过程中当前行的文本内容；</p><p>$1:第一个字段的文本内容；</p><p>$2:第二个字段的文本内容； :</p><pre><code>echo -e &quot;line1 f2 f3\\n line2 \\n line 3&quot; | awk &#39;{print NR&quot;:&quot;$0&quot;-&quot;$1&quot;-&quot;$2}&#39;
</code></pre><p>- 打印每一行的第二和第三个字段 :</p><pre><code>awk &#39;{print $2, $3}&#39; file
</code></pre><p>- 统计文件的行数 :</p><pre><code>awk &#39; END {print NR}&#39; file
</code></pre><p>- 累加每一行的第一个字段 :</p><pre><code>echo -e &quot;1\\n 2\\n 3\\n 4\\n&quot; | awk &#39;BEGIN{num = 0 ;
print &quot;begin&quot;;} {sum += $1;} END {print &quot;==&quot;; print sum }&#39;
</code></pre><h3 id="传递外部变量" tabindex="-1"><a class="header-anchor" href="#传递外部变量"><span>传递外部变量</span></a></h3><pre><code>var=1000
echo | awk &#39;{print vara}&#39; vara=$var #  输入来自stdin
awk &#39;{print vara}&#39; vara=$var file # 输入来自文件
</code></pre><h3 id="用样式对awk处理的行进行过滤" tabindex="-1"><a class="header-anchor" href="#用样式对awk处理的行进行过滤"><span>用样式对awk处理的行进行过滤</span></a></h3><pre><code>awk &#39;NR &lt; 5&#39; #行号小于5
awk &#39;NR==1,NR==4 {print}&#39; file #行号等于1和4的打印出来
awk &#39;/linux/&#39; #包含linux文本的行（可以用正则表达式来指定，超级强大）
awk &#39;!/linux/&#39; #不包含linux文本的行
</code></pre><h3 id="设置定界符" tabindex="-1"><a class="header-anchor" href="#设置定界符"><span>设置定界符</span></a></h3><p>使用-F来设置定界符（默认为空格）:</p><pre><code>awk -F: &#39;{print $NF}&#39; /etc/passwd
</code></pre><h3 id="读取命令输出" tabindex="-1"><a class="header-anchor" href="#读取命令输出"><span>读取命令输出</span></a></h3><p>使用getline，将外部shell命令的输出读入到变量cmdout中:</p><pre><code>echo | awk &#39;{&quot;grep root /etc/passwd&quot; | getline cmdout; print cmdout }&#39;
</code></pre><h3 id="在awk中使用循环" tabindex="-1"><a class="header-anchor" href="#在awk中使用循环"><span>在awk中使用循环</span></a></h3><pre><code>for(i=0;i&lt;10;i++){print $i;}
for(i in array){print array[i];}
</code></pre><p>eg:以下字符串，打印出其中的时间串:</p><pre><code>2015_04_02 20:20:08: mysqli connect failed, please check connect info
$echo &#39;2015_04_02 20:20:08: mysqli connect failed, please check connect info&#39;|awk -F &quot;:&quot; &#39;{ for(i=1;i&lt;=;i++) printf(&quot;%s:&quot;,$i)}&#39;
&gt;2015_04_02 20:20:08:  # 这种方式会将最后一个冒号打印出来
$echo &#39;2015_04_02 20:20:08: mysqli connect failed, please check connect info&#39;|awk -F&#39;:&#39; &#39;{print $1 &quot;:&quot; $2 &quot;:&quot; $3; }&#39;
&gt;2015_04_02 20:20:08   # 这种方式满足需求
</code></pre><p>而如果需要将后面的部分也打印出来(时间部分和后文分开打印):</p><pre><code>$echo &#39;2015_04_02 20:20:08: mysqli connect failed, please check connect info&#39;|awk -F&#39;:&#39; &#39;{print $1 &quot;:&quot; $2 &quot;:&quot; $3; print $4;}&#39;
&gt;2015_04_02 20:20:08
&gt;mysqli connect failed, please check connect info
</code></pre><p>以逆序的形式打印行：(tac命令的实现）:</p><pre><code>seq 9| \\
awk &#39;{lifo[NR] = $0; lno=NR} \\
END{ for(;lno&gt;-1;lno--){print lifo[lno];}
} &#39;
</code></pre><h3 id="awk结合grep找到指定的服务-然后将其kill掉" tabindex="-1"><a class="header-anchor" href="#awk结合grep找到指定的服务-然后将其kill掉"><span>awk结合grep找到指定的服务，然后将其kill掉</span></a></h3><pre><code>ps -fe| grep msv8 | grep -v MFORWARD | awk &#39;{print $2}&#39; | xargs kill -9;
</code></pre><h3 id="awk实现head、tail命令" tabindex="-1"><a class="header-anchor" href="#awk实现head、tail命令"><span>awk实现head、tail命令</span></a></h3><p>- head :</p><pre><code>awk &#39;NR&lt;=10{print}&#39; filename
</code></pre><p>- tail :</p><pre><code>awk &#39;{buffer[NR%10] = $0;} END{for(i=0;i&lt;11;i++){ \\
print buffer[i %10]} } &#39; filename
</code></pre><h3 id="打印指定列" tabindex="-1"><a class="header-anchor" href="#打印指定列"><span>打印指定列</span></a></h3><p>- awk方式实现 :</p><pre><code>ls -lrt | awk &#39;{print $6}&#39;
</code></pre><p>- cut方式实现 :</p><pre><code>ls -lrt | cut -f6
</code></pre><h3 id="打印指定文本区域" tabindex="-1"><a class="header-anchor" href="#打印指定文本区域"><span>打印指定文本区域</span></a></h3><p>- 确定行号 :</p><pre><code>seq 100| awk &#39;NR==4,NR==6{print}&#39;
</code></pre><p>- 确定文本 打印处于start_pattern 和end_pattern之间的文本:</p><pre><code>awk &#39;/start_pattern/, /end_pattern/&#39; filename
</code></pre><p>示例:</p><pre><code>seq 100 | awk &#39;/13/,/15/&#39;
cat /etc/passwd| awk &#39;/mai.*mail/,/news.*news/&#39;
</code></pre><h3 id="awk常用内建函数" tabindex="-1"><a class="header-anchor" href="#awk常用内建函数"><span>awk常用内建函数</span></a></h3><p>index(string,search_string):返回search_string在string中出现的位置</p><p>sub(regex,replacement_str,string):将正则匹配到的第一处内容替换为replacement_str;</p><p>match(regex,string):检查正则表达式是否能够匹配字符串；</p><p>length(string)：返回字符串长度</p><pre><code>echo | awk &#39;{&quot;grep root /etc/passwd&quot; | getline cmdout; print length(cmdout) }&#39;
</code></pre><p>printf 类似c语言中的printf，对输出进行格式化:</p><pre><code>seq 10 | awk &#39;{printf &quot;-&gt;%4s\\n&quot;, $1}&#39;
</code></pre><h2 id="迭代文件中的行、单词和字符" tabindex="-1"><a class="header-anchor" href="#迭代文件中的行、单词和字符"><span>迭代文件中的行、单词和字符</span></a></h2><h3 id="_1-迭代文件中的每一行" tabindex="-1"><a class="header-anchor" href="#_1-迭代文件中的每一行"><span>1. 迭代文件中的每一行</span></a></h3><p>- while 循环法 :</p><pre><code>while read line;
do
echo $line;
done &lt; file.txt

改成子shell:
cat file.txt | (while read line;do echo $line;done)
</code></pre><p>- awk法 :</p><pre><code>cat file.txt| awk &#39;{print}&#39;
</code></pre><h3 id="_2-迭代一行中的每一个单词" tabindex="-1"><a class="header-anchor" href="#_2-迭代一行中的每一个单词"><span>2.迭代一行中的每一个单词</span></a></h3><pre><code>for word in $line;
do
echo $word;
done
</code></pre><h3 id="_3-迭代每一个字符" tabindex="-1"><a class="header-anchor" href="#_3-迭代每一个字符"><span>3. 迭代每一个字符</span></a></h3><p>\${string:start_pos:num_of_chars}：从字符串中提取一个字符；(bash文本切片）</p><p>\${#word}:返回变量word的长度 :</p><pre><code>for((i=0;i&lt;\${#word};i++))
do
echo \${word:i:1);
done
</code></pre><p>以ASCII字符显示文件:</p><pre><code>$od -c filename
</code></pre>`,228)])])}const c=a(p,[["render",i]]),d=JSON.parse('{"path":"/linux-tutor/base/03_text_processing.html","title":"文本处理","lang":"zh-CN","frontmatter":{"oroder":3,"description":"文本处理 提示 本节将介绍Linux下使用Shell处理文本时最常用的工具： find、grep、xargs、sort、uniq、tr、cut、paste、wc、sed、awk； 提供的例子和参数都是常用的； 我对shell脚本使用的原则是命令单行书写，尽量不要超过2行； 如果有更为复杂的任务需求，还是考虑python吧； find 文件查找 查找tx...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"文本处理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-24T23:25:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/base/03_text_processing.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"文本处理"}],["meta",{"property":"og:description","content":"文本处理 提示 本节将介绍Linux下使用Shell处理文本时最常用的工具： find、grep、xargs、sort、uniq、tr、cut、paste、wc、sed、awk； 提供的例子和参数都是常用的； 我对shell脚本使用的原则是命令单行书写，尽量不要超过2行； 如果有更为复杂的任务需求，还是考虑python吧； find 文件查找 查找tx..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-24T23:25:32.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-24T23:25:32.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1682378732000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":10.6,"words":3180},"filePathRelative":"linux-tutor/base/03_text_processing.md","autoDesc":true}');export{c as comp,d as data};
