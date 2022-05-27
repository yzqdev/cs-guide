# vmstat 监视内存使用情况

vmstat是Virtual Meomory
Statistics（虚拟内存统计）的缩写，可实时动态监视操作系统的虚拟内存、进程、CPU活动。

## vmstat的语法

　　vmstat \[-V\] \[-n\] \[delay \[count\]\]

> - -V表示打印出版本信息；
> - -n表示在周期性循环输出时，输出的头部信息仅显示一次；
> - delay是两次输出之间的延迟时间；
> - count是指按照这个时间间隔统计的次数。

    /root$vmstat 5 5
    procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu-----
    r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
    6  0      0 27900472 204216 28188356    0    0     0     9    1    2 11 14 75  0  0
    9  0      0 27900380 204228 28188360    0    0     0    13 33312 126221 22 20 58  0  0
    2  0      0 27900340 204240 28188364    0    0     0    10 32755 125566 22 20 58  0  0

## 字段说明

Procs（进程）:

:   -   r: 运行队列中进程数量
    -   b: 等待IO的进程数量

Memory（内存）:

:   -   swpd: 使用虚拟内存大小
    -   free: 可用内存大小
    -   buff: 用作缓冲的内存大小
    -   cache: 用作缓存的内存大小

Swap:

:   -   si: 每秒从交换区写到内存的大小
    -   so: 每秒写入交换区的内存大小

IO：（现在的Linux版本块的大小为1024bytes）

:   -   bi: 每秒读取的块数
    -   bo: 每秒写入的块数

system：

:   -   in: 每秒中断数，包括时钟中断
    -   cs: 每秒上下文切换数

CPU（以百分比表示）

:   -   us: 用户进程执行时间(user time)
    -   sy: 系统进程执行时间(system time)
    -   id: 空闲时间(包括IO等待时间)
    -   wa: 等待IO时间
