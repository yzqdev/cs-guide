import{_ as e,c as n,o as t,d as l}from"./app-CbULZrmi.js";const a={},o=l(`<h1 id="第一批shell" tabindex="-1"><a class="header-anchor" href="#第一批shell"><span>第一批shell</span></a></h1><h2 id="定时清空文件内容-定时记录文件大小" tabindex="-1"><a class="header-anchor" href="#定时清空文件内容-定时记录文件大小"><span>定时清空文件内容，定时记录文件大小</span></a></h2><pre><code class="language-shell">#!/bin/bash
################################################################
#每小时执行一次脚本（任务计划），当时间为0点或12点时，将目标目录下的所有文件内
#容清空，但不删除文件，其他时间则只统计各个文件的打小，一个文件一行，输出到以时
#间和日期命名的文件中，需要考虑目标目录下二级、三级等子目录的文件
################################################################
logfile=/tmp/\`date +%H-%F\`.log
n=\`date +%H\`
if [ $n -eq 00 ] || [ $n -eq 12 ]
then
#通过for循环，以find命令作为遍历条件，将目标目录下的所有文件进行遍历并做相应操作
for i in \`find /data/log/ -type f\`
do
true &gt; $i
done
else
for i in \`find /data/log/ -type f\`
do
du -sh $i &gt;&gt; $logfile
done
fi
</code></pre><h2 id="检测网卡流量-并按规定格式记录在日志中" tabindex="-1"><a class="header-anchor" href="#检测网卡流量-并按规定格式记录在日志中"><span>检测网卡流量，并按规定格式记录在日志中</span></a></h2><pre><code class="language-shell">#!/bin/bash
#######################################################
#检测网卡流量，并按规定格式记录在日志中
#规定一分钟记录一次
#日志格式如下所示:
#2019-08-12 20:40
#ens33 input: 1234bps
#ens33 output: 1235bps
######################################################3
while :
do
#设置语言为英文，保障输出结果是英文，否则会出现bug
LANG=en
logfile=/tmp/\`date +%d\`.log
#将下面执行的命令结果输出重定向到logfile日志中
exec &gt;&gt; $logfile
date +&quot;%F %H:%M&quot;
#sar命令统计的流量单位为kb/s，日志格式为bps，因此要*1000*8
sar -n DEV 1 59|grep Average|grep ens33|awk &#39;{print $2,&quot;\\t&quot;,&quot;input:&quot;,&quot;\\t&quot;,$5*1000*8,&quot;bps&quot;,&quot;\\n&quot;,$2,&quot;\\t&quot;,&quot;output:&quot;,&quot;\\t&quot;,$6*1000*8,&quot;bps&quot;}&#39;
echo &quot;####################&quot;
#因为执行sar命令需要59秒，因此不需要sleep
done
</code></pre><h2 id="计算文档每行出现的数字个数-并计算整个文档的数字总数" tabindex="-1"><a class="header-anchor" href="#计算文档每行出现的数字个数-并计算整个文档的数字总数"><span>计算文档每行出现的数字个数，并计算整个文档的数字总数</span></a></h2><pre><code class="language-shell">#!/bin/bash
#########################################################
#计算文档每行出现的数字个数，并计算整个文档的数字总数
########################################################
#使用awk只输出文档行数（截取第一段）
n=\`wc -l a.txt|awk &#39;{print $1}&#39;\`
sum=0
#文档中每一行可能存在空格，因此不能直接用文档内容进行遍历
for i in \`seq 1 $n\`
do
#输出的行用变量表示时，需要用双引号
line=\`sed -n &quot;$i&quot;p a.txt\`
#wc -L选项，统计最长行的长度
n_n=\`echo $line|sed s&#39;/[^0-9]//&#39;g|wc -L\`
echo $n_n
sum=$[$sum+$n_n]
done
echo &quot;sum:$sum&quot;
</code></pre><h2 id="杀死所有脚本" tabindex="-1"><a class="header-anchor" href="#杀死所有脚本"><span>杀死所有脚本</span></a></h2><pre><code class="language-shell">#!/bin/bash
################################################################
#有一些脚本加入到了cron之中，存在脚本尚未运行完毕又有新任务需要执行的情况，
#导致系统负载升高，因此可通过编写脚本，筛选出影响负载的进程一次性全部杀死。
################################################################
ps aux|grep 指定进程名|grep -v grep|awk &#39;{print $2}&#39;|xargs kill -9
</code></pre><h2 id="从ftp服务器下载文件" tabindex="-1"><a class="header-anchor" href="#从ftp服务器下载文件"><span>从FTP服务器下载文件</span></a></h2><pre><code class="language-shell">#!/bin/bash
if [ $# -ne 1 ]; then
    echo &quot;Usage: $0 filename&quot;
fi
dir=$(dirname $1)
file=$(basename $1)
ftp -n -v &lt;&lt; EOF   # -n 自动登录
open 192.168.1.10  # ftp服务器
user admin password
binary   # 设置ftp传输模式为二进制，避免MD5值不同或.tar.gz压缩包格式错误
cd $dir
get &quot;$file&quot;
EOF
</code></pre><h2 id="连续输入5个100以内的数字-统计和、最小和最大" tabindex="-1"><a class="header-anchor" href="#连续输入5个100以内的数字-统计和、最小和最大"><span>连续输入5个100以内的数字，统计和、最小和最大</span></a></h2><pre><code class="language-shell">#!/bin/bash
COUNT=1
SUM=0
MIN=0
MAX=100
while [ $COUNT -le 5 ]; do
    read -p &quot;请输入1-10个整数：&quot; INT
    if [[ ! $INT =~ ^[0-9]+$ ]]; then
        echo &quot;输入必须是整数！&quot;
        exit 1
    elif [[ $INT -gt 100 ]]; then
        echo &quot;输入必须是100以内！&quot;
        exit 1
    fi
    SUM=$(($SUM+$INT))
    [ $MIN -lt $INT ] &amp;&amp; MIN=$INT
    [ $MAX -gt $INT ] &amp;&amp; MAX=$INT
    let COUNT++
done
echo &quot;SUM: $SUM&quot;
echo &quot;MIN: $MIN&quot;
echo &quot;MAX: $MAX&quot;
</code></pre><h2 id="用户猜数字" tabindex="-1"><a class="header-anchor" href="#用户猜数字"><span>用户猜数字</span></a></h2><pre><code class="language-shell">#!/bin/bash  # 脚本生成一个 100 以内的随机数,提示用户猜数字,根据用户的输入,提示用户猜对了,
# 猜小了或猜大了,直至用户猜对脚本结束。
# RANDOM 为系统自带的系统变量,值为 0‐32767的随机数
# 使用取余算法将随机数变为 1‐100 的随机数num=$[RANDOM%100+1]echo &quot;$num&quot; 
# 使用 read 提示用户猜数字
# 使用 if 判断用户猜数字的大小关系:‐eq(等于),‐ne(不等于),‐gt(大于),‐ge(大于等于),
# ‐lt(小于),‐le(小于等于)

while :
  do     
    read -p &quot;计算机生成了一个 1‐100 的随机数,你猜: &quot; cai    
    if [ $cai -eq $num ]    
    then        
        echo &quot;恭喜,猜对了&quot;           
        exit        
    elif [ $cai -gt $num ]       
    then            
        echo &quot;Oops,猜大了&quot;         
    else            
        echo &quot;Oops,猜小了&quot;     
    fi
  done
</code></pre><h2 id="监测nginx访问日志502情况-并做相应动作" tabindex="-1"><a class="header-anchor" href="#监测nginx访问日志502情况-并做相应动作"><span>监测Nginx访问日志502情况，并做相应动作</span></a></h2><p>假设服务器环境为lnmp，近期访问经常出现502现象，且502错误在重启php-fpm服务后消失，因此需要编写监控脚本，一旦出现502，则自动重启php-fpm服务。</p><pre><code class="language-shell">#场景：
#1.访问日志文件的路径：/data/log/access.log
#2.脚本死循环，每10秒检测一次，10秒的日志条数为300条，出现502的比例不低于10%（30条）则需要重启php-fpm服务
#3.重启命令为：/etc/init.d/php-fpm restart
#!/bin/bash
###########################################################
#监测Nginx访问日志502情况，并做相应动作
###########################################################
log=/data/log/access.log
N=30 #设定阈值
while :
do
 #查看访问日志的最新300条，并统计502的次数
 err=\`tail -n 300 $log |grep -c &#39;502&quot; &#39;\`
 if [ $err -ge $N ]
 then
 /etc/init.d/php-fpm restart 2&gt; /dev/null
 #设定60s延迟防止脚本bug导致无限重启php-fpm服务
  sleep 60
 fi
 sleep 10
done
</code></pre><h2 id="将结果分别赋值给变量" tabindex="-1"><a class="header-anchor" href="#将结果分别赋值给变量"><span>将结果分别赋值给变量</span></a></h2><p>应用场景：希望将执行结果或者位置参数赋值给变量，以便后续使用。</p><p>方法1：</p><pre><code class="language-shell">for i in $(echo &quot;4 5 6&quot;); do
   eval a$i=$i
done
echo $a4 $a5 $a6
</code></pre><p>方法2：将位置参数192.168.1.1{1,2}拆分为到每个变量</p><pre><code class="language-shell">num=0
for i in $(eval echo $*);do   #eval将{1,2}分解为1 2
   let num+=1
   eval node\${num}=&quot;$i&quot;
done
echo $node1 $node2 $node3
# bash a.sh 192.168.1.1{1,2}
192.168.1.11 192.168.1.12
</code></pre><p>方法3：</p><pre><code class="language-shell">arr=(4 5 6)
INDEX1=$(echo \${arr[0]})
INDEX2=$(echo \${arr[1]})
INDEX3=$(echo \${arr[2]})
</code></pre><h2 id="批量修改文件名" tabindex="-1"><a class="header-anchor" href="#批量修改文件名"><span>批量修改文件名</span></a></h2><pre><code class="language-shell">示例：

# touch article_{1..3}.html
# ls
article_1.html  article_2.html  article_3.html

目的：把article改为bbs

方法1：

for file in $(ls *html); do
    mv $file bbs_\${file#*_}
    # mv $file $(echo $file |sed -r &#39;s/.*(_.*)/bbs\\1/&#39;)
    # mv $file $(echo $file |echo bbs_$(cut -d_ -f2)
done

方法2：

for file in $(find . -maxdepth 1 -name &quot;*html&quot;); do
     mv $file bbs_\${file#*_}
done

方法3：

# rename article bbs *.html
</code></pre><h1 id="安装的-rm-删除" tabindex="-1"><a class="header-anchor" href="#安装的-rm-删除"><span>安装的 rm（删除）</span></a></h1><h2 id="由来" tabindex="-1"><a class="header-anchor" href="#由来"><span>由来</span></a></h2><ul><li>我们都知道 <code>rm -rf</code> 是一个危险的操作，所以我们应该尽可能养成一个不要 rm 的习惯，而是 mv。</li></ul><h2 id="设置" tabindex="-1"><a class="header-anchor" href="#设置"><span>设置</span></a></h2><ul><li>创建一个用来存放要被我们删除的文件夹存放地：<code>cd $home &amp;&amp; mkdir .trash</code></li><li>赋予最高权限（个人习惯）：<code>chmod 777 .trash</code></li><li>如果你使用 bash，你需要修改你的 home 目录下的：<code>.bashrc</code></li><li>我使用的是 zsh，所以我修改：<code>vim .zshrc</code>，在文件的最后面增加下面内容：</li></ul><pre><code class="language-shell"># rm transform
function rm() {
    # garbage collect
    now=$(date +%s)
    for s in $(ls --indicator-style=none $HOME/.trash/) ;do
        dir_name=\${s//_/-}
        dir_time=$(date +%s -d $dir_name)
        # if big than one month then delete
        if [[ 0 -eq dir_time || $(($now - $dir_time)) -gt 2592000 ]] ;then
            echo &quot;Trash &quot; $dir_name &quot; has Gone &quot;
            /bin/rm $s -rf
        fi
    done
    
    # add new folder
    prefix=$(date +%Y_%m_%d)
    hour=$(date +%H)
    mkdir -p $HOME/.trash/$prefix/$hour
    if [[ -z $1 ]] ;then
            echo &#39;Missing Args&#39;
        return
    fi
    echo &quot;Hi, Trashing&quot; $1 &quot;to /root/.trash&quot;
    mv $1 $HOME/.trash/$prefix/$hour
}
</code></pre><ul><li>刷新配置：<code>source ~/.zshrc</code></li><li>然后断开终端，重新连接</li><li>此时如果你使用：<code>rm -rf a.txt</code> 会出现这样的提示：</li></ul><pre><code>Hi, Trashing -rf to /root/.trash
mv: invalid option -- &#39;r&#39;
Try &#39;mv --help&#39; for more information.
</code></pre><ul><li>现在我们删除一个测试文件：<code>rm a.txt</code>，会事显示：<code>Hi, Trashing a.txt to /root/.trash</code></li><li>因为我们上面的 shell 每次触发 rm 明白的时候都会去删除一个月前的目录，所以就不需要定时器来删除 .trash 里面的文件了。</li><li>如果你要强制删除，清空 .trash 目录，可以使用真正的 rm 命令：<code>/usr/bin/rm -rf ~/.trash/*</code></li></ul><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="http://www.linuxde.net/2013/02/11915.html" target="_blank" rel="noopener noreferrer">http://www.linuxde.net/2013/02/11915.html</a></li></ul>`,39),i=[o];function r(s,h){return t(),n("div",null,i)}const c=e(a,[["render",r],["__file","shell1.html.vue"]]),p=JSON.parse('{"path":"/linux-tutor/awesome-shell/shell1.html","title":"第一批shell","lang":"zh-CN","frontmatter":{"index":1,"description":"第一批shell 定时清空文件内容，定时记录文件大小 检测网卡流量，并按规定格式记录在日志中 计算文档每行出现的数字个数，并计算整个文档的数字总数 杀死所有脚本 从FTP服务器下载文件 连续输入5个100以内的数字，统计和、最小和最大 用户猜数字 监测Nginx访问日志502情况，并做相应动作 假设服务器环境为lnmp，近期访问经常出现502现象，且5...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/awesome-shell/shell1.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"第一批shell"}],["meta",{"property":"og:description","content":"第一批shell 定时清空文件内容，定时记录文件大小 检测网卡流量，并按规定格式记录在日志中 计算文档每行出现的数字个数，并计算整个文档的数字总数 杀死所有脚本 从FTP服务器下载文件 连续输入5个100以内的数字，统计和、最小和最大 用户猜数字 监测Nginx访问日志502情况，并做相应动作 假设服务器环境为lnmp，近期访问经常出现502现象，且5..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-26T16:41:58.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-26T16:41:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第一批shell\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-26T16:41:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"定时清空文件内容，定时记录文件大小","slug":"定时清空文件内容-定时记录文件大小","link":"#定时清空文件内容-定时记录文件大小","children":[]},{"level":2,"title":"检测网卡流量，并按规定格式记录在日志中","slug":"检测网卡流量-并按规定格式记录在日志中","link":"#检测网卡流量-并按规定格式记录在日志中","children":[]},{"level":2,"title":"计算文档每行出现的数字个数，并计算整个文档的数字总数","slug":"计算文档每行出现的数字个数-并计算整个文档的数字总数","link":"#计算文档每行出现的数字个数-并计算整个文档的数字总数","children":[]},{"level":2,"title":"杀死所有脚本","slug":"杀死所有脚本","link":"#杀死所有脚本","children":[]},{"level":2,"title":"从FTP服务器下载文件","slug":"从ftp服务器下载文件","link":"#从ftp服务器下载文件","children":[]},{"level":2,"title":"连续输入5个100以内的数字，统计和、最小和最大","slug":"连续输入5个100以内的数字-统计和、最小和最大","link":"#连续输入5个100以内的数字-统计和、最小和最大","children":[]},{"level":2,"title":"用户猜数字","slug":"用户猜数字","link":"#用户猜数字","children":[]},{"level":2,"title":"监测Nginx访问日志502情况，并做相应动作","slug":"监测nginx访问日志502情况-并做相应动作","link":"#监测nginx访问日志502情况-并做相应动作","children":[]},{"level":2,"title":"将结果分别赋值给变量","slug":"将结果分别赋值给变量","link":"#将结果分别赋值给变量","children":[]},{"level":2,"title":"批量修改文件名","slug":"批量修改文件名","link":"#批量修改文件名","children":[]},{"level":2,"title":"由来","slug":"由来","link":"#由来","children":[]},{"level":2,"title":"设置","slug":"设置","link":"#设置","children":[]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1658853718000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":6.18,"words":1853},"filePathRelative":"linux-tutor/awesome-shell/shell1.md","localizedDate":"2022年5月26日","autoDesc":true}');export{c as comp,p as data};
