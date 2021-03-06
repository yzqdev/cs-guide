# 电脑硬件知识

m.2 nvme和m.2的区别是什么？

m.2是接口类型，Nvme是协议，两者之间最大区别就是支持协议的有无。

1. 协议方面：前者是支持Nvme协议的高速SSD，后者不支持协议，则是较为低速的SSD。
1. 适配方面：nvme固态需要主板有PCIE的接口支持，而普通的m.2固态则不需要。
如果要购买SSD，要先查清楚电脑是否有对应的接口，防止浪费。
扩展资料
固态硬盘的组成——主控芯片
市面上比较常见的固态硬盘有LSISandForce、Indilinx、JMicron、Marvell、Phison、Goldendisk、Samsung以及Intel等多种主控芯片。
主控芯片是固态硬盘的大脑，其作用一是合理调配数据在各个闪存芯片上的负荷，二则是承担了整个数据中转，连接闪存芯片和外部SATA接口。
不同的主控之间能力相差非常大，在数据处理能力、算法，对闪存芯片的读取写入控制上会有非常大的不同，直接会导致固态硬盘产品在性能上差距高达数十倍。
区别如下：
1、协议方面
m.2 nvme是支持Nvme协议的高速SSD，走的是PCle通道，速度超级快。m.2不支持协议，走的是SATA通道，和普通的SATA接口差不多。则是较为低速的SSD。
2、适配方面
nvme固态需要主板有PCIE的接口支持，而普通的m.2固态则不需要。
3、接口方面
m.2固态硬盘，如果是SATA协议，针脚处有两个凹，三段金手指；如果是NVMe协议则是一个凹，两段金手指。 可根据主板M.2插槽的样子看出来该插槽支持什么协议，两种协议不兼容。
资料
NVMe具体优势包括：
1、性能有数倍的提升。
2、可大幅降低延迟。
3、NVMe可以把最大队列深度从32提升到64000，SSD的IOPS能力也会得到大幅提升。
4、自动功耗状态切换和动态能耗管理功能大大降低功耗。
5、NVMe标准的出现解决了不同PCIe SSD之间的驱动适用性问题。
