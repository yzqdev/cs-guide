---
index: 1
---
# 第一批shell

## 定时清空文件内容，定时记录文件大小

```shell
#!/bin/bash
################################################################
#每小时执行一次脚本（任务计划），当时间为0点或12点时，将目标目录下的所有文件内
#容清空，但不删除文件，其他时间则只统计各个文件的打小，一个文件一行，输出到以时
#间和日期命名的文件中，需要考虑目标目录下二级、三级等子目录的文件
################################################################
logfile=/tmp/`date +%H-%F`.log
n=`date +%H`
if [ $n -eq 00 ] || [ $n -eq 12 ]
then
#通过for循环，以find命令作为遍历条件，将目标目录下的所有文件进行遍历并做相应操作
for i in `find /data/log/ -type f`
do
true > $i
done
else
for i in `find /data/log/ -type f`
do
du -sh $i >> $logfile
done
fi
```

## 检测网卡流量，并按规定格式记录在日志中

```shell
#!/bin/bash
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
logfile=/tmp/`date +%d`.log
#将下面执行的命令结果输出重定向到logfile日志中
exec >> $logfile
date +"%F %H:%M"
#sar命令统计的流量单位为kb/s，日志格式为bps，因此要*1000*8
sar -n DEV 1 59|grep Average|grep ens33|awk '{print $2,"\t","input:","\t",$5*1000*8,"bps","\n",$2,"\t","output:","\t",$6*1000*8,"bps"}'
echo "####################"
#因为执行sar命令需要59秒，因此不需要sleep
done
```

## 计算文档每行出现的数字个数，并计算整个文档的数字总数

```shell
#!/bin/bash
#########################################################
#计算文档每行出现的数字个数，并计算整个文档的数字总数
########################################################
#使用awk只输出文档行数（截取第一段）
n=`wc -l a.txt|awk '{print $1}'`
sum=0
#文档中每一行可能存在空格，因此不能直接用文档内容进行遍历
for i in `seq 1 $n`
do
#输出的行用变量表示时，需要用双引号
line=`sed -n "$i"p a.txt`
#wc -L选项，统计最长行的长度
n_n=`echo $line|sed s'/[^0-9]//'g|wc -L`
echo $n_n
sum=$[$sum+$n_n]
done
echo "sum:$sum"
```

## 杀死所有脚本

```shell
#!/bin/bash
################################################################
#有一些脚本加入到了cron之中，存在脚本尚未运行完毕又有新任务需要执行的情况，
#导致系统负载升高，因此可通过编写脚本，筛选出影响负载的进程一次性全部杀死。
################################################################
ps aux|grep 指定进程名|grep -v grep|awk '{print $2}'|xargs kill -9
```

## 从FTP服务器下载文件

```shell
#!/bin/bash
if [ $# -ne 1 ]; then
    echo "Usage: $0 filename"
fi
dir=$(dirname $1)
file=$(basename $1)
ftp -n -v << EOF   # -n 自动登录
open 192.168.1.10  # ftp服务器
user admin password
binary   # 设置ftp传输模式为二进制，避免MD5值不同或.tar.gz压缩包格式错误
cd $dir
get "$file"
EOF
```

## 连续输入5个100以内的数字，统计和、最小和最大

```shell
#!/bin/bash
COUNT=1
SUM=0
MIN=0
MAX=100
while [ $COUNT -le 5 ]; do
    read -p "请输入1-10个整数：" INT
    if [[ ! $INT =~ ^[0-9]+$ ]]; then
        echo "输入必须是整数！"
        exit 1
    elif [[ $INT -gt 100 ]]; then
        echo "输入必须是100以内！"
        exit 1
    fi
    SUM=$(($SUM+$INT))
    [ $MIN -lt $INT ] && MIN=$INT
    [ $MAX -gt $INT ] && MAX=$INT
    let COUNT++
done
echo "SUM: $SUM"
echo "MIN: $MIN"
echo "MAX: $MAX"
```

## 用户猜数字

```shell
#!/bin/bash  # 脚本生成一个 100 以内的随机数,提示用户猜数字,根据用户的输入,提示用户猜对了,
# 猜小了或猜大了,直至用户猜对脚本结束。
# RANDOM 为系统自带的系统变量,值为 0‐32767的随机数
# 使用取余算法将随机数变为 1‐100 的随机数num=$[RANDOM%100+1]echo "$num" 
# 使用 read 提示用户猜数字
# 使用 if 判断用户猜数字的大小关系:‐eq(等于),‐ne(不等于),‐gt(大于),‐ge(大于等于),
# ‐lt(小于),‐le(小于等于)

while :
  do     
    read -p "计算机生成了一个 1‐100 的随机数,你猜: " cai    
    if [ $cai -eq $num ]    
    then        
        echo "恭喜,猜对了"           
        exit        
    elif [ $cai -gt $num ]       
    then            
        echo "Oops,猜大了"         
    else            
        echo "Oops,猜小了"     
    fi
  done
```

## 监测Nginx访问日志502情况，并做相应动作

假设服务器环境为lnmp，近期访问经常出现502现象，且502错误在重启php-fpm服务后消失，因此需要编写监控脚本，一旦出现502，则自动重启php-fpm服务。

```shell
#场景：
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
 err=`tail -n 300 $log |grep -c '502" '`
 if [ $err -ge $N ]
 then
 /etc/init.d/php-fpm restart 2> /dev/null
 #设定60s延迟防止脚本bug导致无限重启php-fpm服务
  sleep 60
 fi
 sleep 10
done
```

## 将结果分别赋值给变量

应用场景：希望将执行结果或者位置参数赋值给变量，以便后续使用。

方法1：

```shell
for i in $(echo "4 5 6"); do
   eval a$i=$i
done
echo $a4 $a5 $a6
```

方法2：将位置参数192.168.1.1{1,2}拆分为到每个变量

```shell
num=0
for i in $(eval echo $*);do   #eval将{1,2}分解为1 2
   let num+=1
   eval node${num}="$i"
done
echo $node1 $node2 $node3
# bash a.sh 192.168.1.1{1,2}
192.168.1.11 192.168.1.12
```

方法3：

```shell
arr=(4 5 6)
INDEX1=$(echo ${arr[0]})
INDEX2=$(echo ${arr[1]})
INDEX3=$(echo ${arr[2]})
```

## 批量修改文件名

```shell
示例：

# touch article_{1..3}.html
# ls
article_1.html  article_2.html  article_3.html

目的：把article改为bbs

方法1：

for file in $(ls *html); do
    mv $file bbs_${file#*_}
    # mv $file $(echo $file |sed -r 's/.*(_.*)/bbs\1/')
    # mv $file $(echo $file |echo bbs_$(cut -d_ -f2)
done

方法2：

for file in $(find . -maxdepth 1 -name "*html"); do
     mv $file bbs_${file#*_}
done

方法3：

# rename article bbs *.html
```

# 安装的 rm（删除）

## 由来

- 我们都知道 `rm -rf` 是一个危险的操作，所以我们应该尽可能养成一个不要 rm 的习惯，而是 mv。

## 设置

- 创建一个用来存放要被我们删除的文件夹存放地：`cd $home && mkdir .trash`
- 赋予最高权限（个人习惯）：`chmod 777 .trash`
- 如果你使用 bash，你需要修改你的 home 目录下的：`.bashrc`
- 我使用的是 zsh，所以我修改：`vim .zshrc`，在文件的最后面增加下面内容：

```shell
# rm transform
function rm() {
    # garbage collect
    now=$(date +%s)
    for s in $(ls --indicator-style=none $HOME/.trash/) ;do
        dir_name=${s//_/-}
        dir_time=$(date +%s -d $dir_name)
        # if big than one month then delete
        if [[ 0 -eq dir_time || $(($now - $dir_time)) -gt 2592000 ]] ;then
            echo "Trash " $dir_name " has Gone "
            /bin/rm $s -rf
        fi
    done
    
    # add new folder
    prefix=$(date +%Y_%m_%d)
    hour=$(date +%H)
    mkdir -p $HOME/.trash/$prefix/$hour
    if [[ -z $1 ]] ;then
            echo 'Missing Args'
        return
    fi
    echo "Hi, Trashing" $1 "to /root/.trash"
    mv $1 $HOME/.trash/$prefix/$hour
}
```

- 刷新配置：`source ~/.zshrc`
- 然后断开终端，重新连接
- 此时如果你使用：`rm -rf a.txt` 会出现这样的提示：

```
Hi, Trashing -rf to /root/.trash
mv: invalid option -- 'r'
Try 'mv --help' for more information.
```

- 现在我们删除一个测试文件：`rm a.txt`，会事显示：`Hi, Trashing a.txt to /root/.trash`
- 因为我们上面的 shell 每次触发 rm 明白的时候都会去删除一个月前的目录，所以就不需要定时器来删除 .trash 里面的文件了。
- 如果你要强制删除，清空 .trash 目录，可以使用真正的 rm 命令：`/usr/bin/rm -rf ~/.trash/*`

## 资料

- <http://www.linuxde.net/2013/02/11915.html>
