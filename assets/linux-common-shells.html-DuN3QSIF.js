import{_ as e,c as l,o as n,d as t}from"./app-CbULZrmi.js";const a={},p=t(`<h1 id="linux-shell常用" tabindex="-1"><a class="header-anchor" href="#linux-shell常用"><span>linux-shell常用</span></a></h1><p>本文将介绍Linux下使用Shell处理文本时最常用的工具：find、grep、xargs、sort、uniq、tr、cut、paste、wc、sed、awk；提供的例子和参数都是最常用和最为实用的；对shell脚本使用的原则是命令单行书写，尽量不要超过2行；如果有更为复杂的任务需求，还是考虑python吧.</p><h2 id="_1、find-文件查找" tabindex="-1"><a class="header-anchor" href="#_1、find-文件查找"><span>1、find 文件查找</span></a></h2><p>查找txt和pdf文件</p><pre><code class="language-bash">find . ( -name &quot;*.txt&quot; -o -name &quot;*.pdf&quot; ) -print
</code></pre><p>正则方式查找.txt和pdf</p><pre><code class="language-bash">find . -regex  &quot;.*(.txt|.pdf)$&quot;
#-iregex：忽略大小写的正则
</code></pre><p>否定参数:查找所有非txt文本</p><pre><code class="language-bash">find . ! -name &quot;*.txt&quot; -print
</code></pre><p>指定搜索深度:打印出当前目录的文件（深度为1）</p><pre><code class="language-bash">find . -maxdepth 1 -type f
</code></pre><p>定制搜索</p><pre><code class="language-bash">#按类型搜索：
find . -type d -print  //只列出所有目录
#按时间搜索：
-atime 访问时间 (单位是天，分钟单位则是-amin，以下类似）
-mtime 修改时间 （内容被修改）
-ctime 变化时间 （元数据或权限变化）
最近7天被访问过的所有文件：
find . -atime 7 -type f -print
#按大小搜索：
寻找大于2k的文件
find . -type f -size +2k
#按权限查找：
find . -type f -perm 644 -print //找具有可执行权限的所有文件
#按用户查找：
find . -type f -user weber -print// 找用户weber所拥有的文件
</code></pre><p>找到后的后续动作删除：</p><pre><code class="language-shell">#删除当前目录下所有的swp文件：
find . -type f -name &quot;*.swp&quot; -delete
#执行动作（强大的exec）
find . -type f -user root -exec chown weber {} ; //将当前目录下的所有权变更为weber
注：{}是一个特殊的字符串，对于每一个匹配的文件，{}会被替换成相应的文件名；
eg：将找到的文件全都copy到另一个目录：
find . -type f -mtime +10 -name &quot;*.txt&quot; -exec cp {} OLD ;
</code></pre><p>结合多个命令tips: 如果需要后续执行多个命令，可以将多个命令写成一个脚本。然后 -exec 调用时执行脚本即可；</p><pre><code class="language-shell">-exec ./commands.sh {} ;
#-print的定界符
</code></pre><ul><li>默认使用&#39; &#39;作为文件的定界符；</li><li>-print0 使用&#39;&#39;作为文件的定界符，这样就可以搜索包含空格的文件；</li></ul><h2 id="_2、grep-文本搜索" tabindex="-1"><a class="header-anchor" href="#_2、grep-文本搜索"><span>2、grep 文本搜索</span></a></h2><p>grep match_patten file // 默认访问匹配行</p><p>常用参数:</p><ul><li>-o 只输出匹配的文本行 VS -v 只输出没有匹配的文本行</li><li>-c 统计文件中包含文本的次数</li></ul><p>grep -c &quot;text&quot; filename</p><ul><li>n 打印匹配的行号</li><li>i 搜索时忽略大小写</li><li>l 只打印文件名</li></ul><p>在多级目录中对文本递归搜索(程序员搜代码的最爱）：</p><pre><code class="language-shell">grep &quot;class&quot; . -R -n
</code></pre><p>匹配多个模式</p><pre><code class="language-shell">grep -e &quot;class&quot; -e &quot;vitural&quot; file
</code></pre><p>grep输出以作为结尾符的文件名：（-z）</p><pre><code class="language-shell">grep &quot;test&quot; file* -lZ| xargs -0 rm
</code></pre><p>xargs 命令行参数转换</p><p>xargs 能够将输入数据转化为特定命令的命令行参数；这样，可以配合很多命令来组合使用。比如grep，比如find；</p><p>将多行输出转化为单行输出</p><pre><code class="language-shell">cat file.txt| xargs
</code></pre><ul><li>是多行文本间的定界符</li><li>将单行转化为多行输出</li></ul><pre><code class="language-shell">cat single.txt | xargs -n 3
#-n：指定每行显示的字段数
</code></pre><p>xargs参数说明</p><ul><li>-d 定义定界符 （默认为空格 多行的定界符为 ）</li><li>-n 指定输出为多行</li><li>-I {} 指定替换字符串，这个字符串在xargs扩展时会被替换掉,用于待执行的命令需要多个参数时</li></ul><pre><code class="language-shell">cat file.txt | xargs -I {} ./command.sh -p {} -1
#-0：指定为输入定界符
#统计程序行数
find source_dir/ -type f -name &quot;*.cpp&quot; -print0 |xargs -0 wc -l
</code></pre><h2 id="_3、sort-排序" tabindex="-1"><a class="header-anchor" href="#_3、sort-排序"><span>3、sort 排序</span></a></h2><p>字段说明：</p><ul><li>-n 按数字进行排序 VS -d 按字典序进行排序</li><li>-r 逆序排序</li><li>-k N 指定按第N列排序</li></ul><pre><code class="language-shell">sort -nrk 1 data.txt
sort -bd data // 忽略像空格之类的前导空白字符
</code></pre><h2 id="_4、uniq-消除重复行" tabindex="-1"><a class="header-anchor" href="#_4、uniq-消除重复行"><span>4、uniq 消除重复行</span></a></h2><p>消除重复行</p><pre><code class="language-shell">sort unsort.txt | uniq
</code></pre><p>统计各行在文件中出现的次数</p><pre><code class="language-shell">sort unsort.txt | uniq -c
</code></pre><p>找出重复行</p><pre><code class="language-shell">sort unsort.txt | uniq -d
</code></pre><p>可指定每行中需要比较的重复内容：-s 开始位置 -w 比较字符数</p><h2 id="_5、用-tr-进行转换" tabindex="-1"><a class="header-anchor" href="#_5、用-tr-进行转换"><span>5、用 tr 进行转换</span></a></h2><p>通用用法</p><pre><code class="language-shell">echo 12345| tr &#39;0-9&#39;&#39;9876543210&#39; //加解密转换，替换对应字符
cat text| tr &#39;    &#39;&#39; &#39;  //制表符转空格
</code></pre><p>tr删除字符</p><pre><code class="language-shell">cat file | tr -d &#39;0-9&#39;   // 删除所有数字
</code></pre><p>-c 求补集</p><pre><code class="language-shell">cat file | tr -c  &#39;0-9&#39;   //获取文件中所有数字
cat file | tr -d -c &#39;0-9&#39;  //删除非数字数据
</code></pre><p>tr压缩字符</p><pre><code class="language-shell">tr -s 压缩文本中出现的重复字符；最常用于压缩多余的空格
cat file | tr -s &#39; &#39;
</code></pre><p>字符类：tr中可用各种字符类</p><ul><li>alnum：字母和数字</li><li>alpha：字母</li><li>digit：数字</li><li>space：空白字符</li><li>lower：小写</li><li>upper：大写</li><li>cntrl：控制（非可打印）字符</li><li>print：可打印字符</li></ul><pre><code class="language-shell">使用方法：tr [:class:] [:class:]
eg: tr 
&#39;[:lower:]&#39;&#39;[:upper:]&#39;
</code></pre><h2 id="_6、cut-按列切分文本" tabindex="-1"><a class="header-anchor" href="#_6、cut-按列切分文本"><span>6、cut 按列切分文本</span></a></h2><pre><code class="language-shell">#截取文件的第2列和第4列：
cut -f2,4 filename
#去文件除第3列的所有列：
cut -f3 --complement filename
#-d 指定定界符：
cat -f2 -d &quot;;&quot; filename
</code></pre><p>cut 取的范围</p><ul><li>N- 第N个字段到结尾</li><li>-M 第1个字段为M</li><li>N-M N到M个字段cut 取的单位</li><li>-b 以字节为单位</li><li>-c 以字符为单位</li><li>-f 以字段为单位（使用定界符）</li></ul><pre><code class="language-shell">cut -c1-5 file //打印第一到5个字符
cut -c-2 file  //打印前2个字符
</code></pre><h2 id="_7、paste-按列拼接文本" tabindex="-1"><a class="header-anchor" href="#_7、paste-按列拼接文本"><span>7、paste 按列拼接文本</span></a></h2><p>将两个文本按列拼接到一起</p><pre><code class="language-shell">cat file1
1
2
cat file2
colin
book
paste file1 file2
1colin
2 book
</code></pre><p>默认的定界符是制表符，可以用-d指明定界符</p><pre><code class="language-shell">paste file1 file2 -d &quot;,&quot;
1,colin
2,book
</code></pre><h2 id="_8、wc-统计行和字符的工具" tabindex="-1"><a class="header-anchor" href="#_8、wc-统计行和字符的工具"><span>8、wc 统计行和字符的工具</span></a></h2><pre><code class="language-bash">wc -l file // 统计行数
wc -w file // 统计单词数
wc -c file // 统计字符数
</code></pre><h2 id="_9、sed-文本替换利器" tabindex="-1"><a class="header-anchor" href="#_9、sed-文本替换利器"><span>9、sed 文本替换利器</span></a></h2><p>首处替换</p><pre><code class="language-shell">sed &#39;s/text/replace_text/&#39;file   //替换每一行的第一处匹配的text
</code></pre><p>全局替换</p><pre><code class="language-shell">sed &#39;s/text/replace_text/g&#39; file
</code></pre><p>默认替换后，输出替换后的内容，如果需要直接替换原文件,使用-i：</p><pre><code class="language-shell">sed -i &#39;s/text/repalce_text/g&#39; file
</code></pre><p>移除空白行：</p><pre><code class="language-shell">sed &#39;/^$/d&#39; file
</code></pre><p>变量转换</p><p>已匹配的字符串通过标记&amp;来引用.</p><pre><code class="language-shell">echo this is en example | seg &#39;s/w+/[&amp;]/g&#39;
$&gt;[this]  [is] [en] [example]
</code></pre><p>子串匹配标记</p><p>第一个匹配的括号内容使用标记 来引用</p><pre><code class="language-shell">sed &#39;s/hello([0-9])//&#39;
</code></pre><p>双引号求值</p><ul><li>sed通常用单引号来引用；也可使用双引号，使用双引号后，双引号会对表达式求值：</li><li>sed &#39;s/$var/HLLOE/&#39;当使用双引号时，我们可以在sed样式和替换字符串中指定变量；</li></ul><pre><code class="language-shell">p=patten
r=replaced
echo &quot;line con a patten&quot;| sed &quot;s/$p/$r/g&quot;
$&gt;line con a replaced
</code></pre><p>字符串插入字符：将文本中每行内容（PEKSHA） 转换为 PEK/SHA</p><pre><code class="language-shell">sed &#39;s/^.{3}/&amp;//g&#39; file
</code></pre><h2 id="_10、awk-数据流处理工具" tabindex="-1"><a class="header-anchor" href="#_10、awk-数据流处理工具"><span>10、awk 数据流处理工具</span></a></h2><p>awk脚本结构</p><pre><code class="language-shell">awk &#39; BEGIN{ statements } statements2 END{ statements } &#39;
</code></pre><p>工作方式</p><ul><li>1.执行begin中语句块；</li><li>2.从文件或stdin中读入一行，然后执行statements2，重复这个过程，直到文件全部被读取完毕；</li><li>3.执行end语句块；</li></ul><p>print 打印当前行,使用不带参数的print时，会打印当前行;</p><pre><code class="language-shell">echo -e &quot;line1 line2&quot;| awk &#39;BEGIN{print &quot;start&quot;} {print } END{ print &quot;End&quot; }&#39;
#print 以逗号分割时，参数以空格定界;
echo | awk &#39; {var1 = &quot;v1&quot; ; var2 = &quot;V2&quot;; var3=&quot;v3&quot;;
print var1, var2 , var3; }&#39;
$&gt;v1 V2 v3
#使用-拼接符的方式（&quot;&quot;作为拼接符）;
echo | awk &#39; {var1 = &quot;v1&quot; ; var2 = &quot;V2&quot;; var3=&quot;v3&quot;;
print var1&quot;-&quot;var2&quot;-&quot;var3; }&#39;
$&gt;v1-V2-v3
</code></pre><p>特殊变量：NR NF 1 $2</p><ul><li>NR:表示记录数量，在执行过程中对应当前行号；</li><li>NF:表示字段数量，在执行过程总对应当前行的字段数；</li><li>$0:这个变量包含执行过程中当前行的文本内容；</li><li>$1:第一个字段的文本内容；</li><li>$2:第二个字段的文本内容；</li></ul><pre><code class="language-shell">echo -e &quot;line1 f2 f3 line2 line 3&quot;| awk &#39;{print NR&quot;:&quot;$0&quot;-&quot;$1&quot;-&quot;$2}&#39; 
#打印每一行的第二和第三个字段
awk &#39;{print $2, $3}&#39; file 
#统计文件的行数：
awk &#39; END {print NR}&#39; file 
#累加每一行的第一个字段：
echo -e &quot;1 2 3 4 &quot;| awk &#39;BEGIN{num = 0 ;print &quot;begin&quot;;} {sum += $1;}END {print &quot;==&quot;; print sum }&#39;   
#传递外部变量
var=1000
echo | awk &#39;{print vara}&#39; vara=$var #输入来自stdin
awk &#39;{print vara}&#39; vara=$var file # 输入来自文件
</code></pre><p>用样式对awk处理的行进行过滤</p><pre><code class="language-shell">awk &#39;NR &lt; 5&#39; #行号小于5
awk &#39;NR==1,NR==4 {print}&#39; file #行号等于1和4的打印出来
awk &#39;/linux/&#39;  #包含linux文本的行（可以用正则表达式来指定，超级强大）
awk &#39;!/linux/&#39;  #不包含linux文本的行
</code></pre><p>设置定界符</p><p>使用-F来设置定界符（默认为空格）</p><pre><code class="language-shell">awk -F: &#39;{print $NF}&#39;/etc/passwd
</code></pre><p>读取命令输出</p><p>使用getline，将外部shell命令的输出读入到变量cmdout中；</p><pre><code class="language-shell">echo | awk &#39;{&quot;grep root /etc/passwd&quot; | getline cmdout; print cmdout }&#39;
</code></pre><p>在awk中使用循环</p><pre><code class="language-shell">for (i=0;i&lt;10;i++){print $i;}
for (i in array){print array[i];}
</code></pre><p>以逆序的形式打印行：(tac命令的实现）</p><pre><code class="language-shell">seq 9|awk &#39;{lifo[NR] = $0; lno=NR}END{ for(;lno&gt;-1;lno--){print lifo[lno];}} &#39;
</code></pre><p>awk实现head、tail命令</p><pre><code class="language-shell">head:
 awk &#39;NR&lt;=10{print}&#39; filename
tail:
  awk &#39;{buffer[NR%10] = $0;} END{for(i=0;i&lt;11;i++){
  print buffer[i %10]} } &#39; filename
</code></pre><p>打印指定列</p><pre><code class="language-shell">#awk方式实现：
ls -lrt | awk 
&#39;{print $6}&#39;
#cut方式实现
ls -lrt | cut -f6
</code></pre><p>打印指定文本区域</p><pre><code class="language-shell">#确定行号
seq 100| awk &#39;NR==4,NR==6{print}&#39;
#确定文本
打印处于startpattern 和endpattern之间的文本；
awk &#39;/start_pattern/, /end_pattern/&#39; filename
seq 100| awk &#39;/13/,/15/&#39;
cat /etc/passwd| awk &#39;/mai.*mail/,/news.*news/&#39;
</code></pre><p>awk常用内建函数</p><ul><li>index(string,search_string):返回search_string在string中出现的位置 sub(regex,replacement_str,string):将正则匹配到的第一处内容替换为replacement_str;</li><li>match(regex,string):检查正则表达式是否能够匹配字符串；</li><li>length(string)：返回字符串长度</li></ul><pre><code class="language-shell">echo | awk &#39;{&quot;grep root /etc/passwd&quot; | getline cmdout; print length(cmdout) }&#39;
#printf 类似c语言中的printf，对输出进行格式化
seq 10| awk &#39;{printf &quot;-&gt;%4s &quot;, $1}&#39;  #迭代文件中的行、单词和字符
</code></pre><ol><li>迭代文件中的每一行</li></ol><pre><code class="language-shell">while 循环法
while read line;
do
echo $line;
done &lt; file.txt
</code></pre><p>改成子shell:</p><pre><code class="language-shell">cat file.txt | (
while read line;
do
 echo $line;
done
)
</code></pre><p>awk法：</p><pre><code class="language-shell">cat file.txt| awk &#39;{print}&#39;
</code></pre><p>2.迭代一行中的每一个单词</p><pre><code class="language-shell">for word in $line;
do
echo $word;
done
</code></pre><ol><li>迭代每一个字符{#word}:返回变量word的长度</li></ol><pre><code class="language-shell">for ((i=0;i&lt;\${#word};i++))
do
echo \${word:i:1);
done
</code></pre><p>作者 | 大CC 来源 | www.cnblogs.com/me15/p/3427319.html</p>`,137),s=[p];function i(r,o){return n(),l("div",null,s)}const d=e(a,[["render",i],["__file","linux-common-shells.html.vue"]]),u=JSON.parse('{"path":"/linux-tutor/linux-tips/linux-common-shells.html","title":"linux-shell常用","lang":"zh-CN","frontmatter":{"description":"linux-shell常用 本文将介绍Linux下使用Shell处理文本时最常用的工具：find、grep、xargs、sort、uniq、tr、cut、paste、wc、sed、awk；提供的例子和参数都是最常用和最为实用的；对shell脚本使用的原则是命令单行书写，尽量不要超过2行；如果有更为复杂的任务需求，还是考虑python吧. 1、find ...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/linux-common-shells.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"linux-shell常用"}],["meta",{"property":"og:description","content":"linux-shell常用 本文将介绍Linux下使用Shell处理文本时最常用的工具：find、grep、xargs、sort、uniq、tr、cut、paste、wc、sed、awk；提供的例子和参数都是最常用和最为实用的；对shell脚本使用的原则是命令单行书写，尽量不要超过2行；如果有更为复杂的任务需求，还是考虑python吧. 1、find ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T13:45:58.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T13:45:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"linux-shell常用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T13:45:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1、find 文件查找","slug":"_1、find-文件查找","link":"#_1、find-文件查找","children":[]},{"level":2,"title":"2、grep 文本搜索","slug":"_2、grep-文本搜索","link":"#_2、grep-文本搜索","children":[]},{"level":2,"title":"3、sort 排序","slug":"_3、sort-排序","link":"#_3、sort-排序","children":[]},{"level":2,"title":"4、uniq 消除重复行","slug":"_4、uniq-消除重复行","link":"#_4、uniq-消除重复行","children":[]},{"level":2,"title":"5、用 tr 进行转换","slug":"_5、用-tr-进行转换","link":"#_5、用-tr-进行转换","children":[]},{"level":2,"title":"6、cut 按列切分文本","slug":"_6、cut-按列切分文本","link":"#_6、cut-按列切分文本","children":[]},{"level":2,"title":"7、paste 按列拼接文本","slug":"_7、paste-按列拼接文本","link":"#_7、paste-按列拼接文本","children":[]},{"level":2,"title":"8、wc 统计行和字符的工具","slug":"_8、wc-统计行和字符的工具","link":"#_8、wc-统计行和字符的工具","children":[]},{"level":2,"title":"9、sed 文本替换利器","slug":"_9、sed-文本替换利器","link":"#_9、sed-文本替换利器","children":[]},{"level":2,"title":"10、awk 数据流处理工具","slug":"_10、awk-数据流处理工具","link":"#_10、awk-数据流处理工具","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649166358000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":8.7,"words":2610},"filePathRelative":"linux-tutor/linux-tips/linux-common-shells.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,u as data};
