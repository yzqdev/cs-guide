# linux死机的集中处理方案

linux的图形界面死机很正常，反正我这么感觉。而且linux死机以后鼠标键盘完全gg。
一般而言死机的主要原因系统负载过高，此时各种操作全卡，而且如果强制关机不利于硬盘等硬件，有时还会无法启动。

## 切换tty

按ctrl+alt+F2(F1-F6都可以一试，有的F1可能是图形界面)，等一会就可以进入tty，用户名密码登录后用top查看高负载的进程，kill PID即可

## reisub

### 用法

reisub是linux内核自带的方法，这个方法可以在各种情况下安全地重启计算机。大家在键盘上找，可以找到一个叫做“Sys Rq”的键，在台机的键盘上通常与 Prt Sc 共键，在笔记本可能在其他位置，如 Delete。以台机为例，要使用这种方法需要按住 ctrl+Alt-Print(Sys Rq)，然后依次按下 reisub 这几个键，按完 b 系统就会重启。

解释一下， Sys Rq 是一种叫做系统请求的东西，linux内核自带，reisub每一个代表一个操作，依次是：

unRaw 将键盘控制从 X Server 那里抢回来

tErminate 给所有进程发送 SIGTERM 信号，让他们自己解决善后

kIll 给所有进程发送 SIGKILL 信号，强制他们马上关闭

Sync 将所有数据同步至磁盘

Unmount 将所有分区挂载为只读模式

reBoot 重启

可以通过busier（busy的比较级）协助记忆。

### 不管用？

这个东西是要开启的，并不是默认自带的。查看方法为

```
cat /proc/sys/kernel/sysrq
```

输出1就能用，否则就不行

临时的使用可以编辑

```
sudo sysctl -w kernel.sysrq=1
```

终生使用请在 /etc/sysctl.d/ 中创建文件 99-sysctl.conf ，加入

```
kernel.sysrq=1
```
