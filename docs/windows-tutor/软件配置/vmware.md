![](https://cdn.nlark.com/yuque/0/2020/png/295914/1604019656110-afaaccb0-e97b-474d-810e-ffba1522379f.png#align=left&display=inline&height=213&margin=%5Bobject%20Object%5D&originHeight=213&originWidth=300&size=0&status=done&style=none&width=300)
![](https://cdn.nlark.com/yuque/0/2020/png/295914/1604019656105-84843891-62d6-4d15-9df1-bf347a2956c3.png#align=left&display=inline&height=166&margin=%5Bobject%20Object%5D&originHeight=166&originWidth=224&size=0&status=done&style=none&width=224)
打开VMware Workstation出现错误提示：Could not open /dev/vmmon: No such device.Please make sure that the kernel module `vmmon’ is loaded.

# 解决方法1

你可以在启动VMware前运行`/etc/init.d/vmware start`来启动服务

# 解决方法2

在Arch Linux上可以通过安装`vmware-systemd-serverices`这个AUR包，来添加systemctl服务

- 使用`systemctl enable vmware.service`让它每次开机都运行
- 使用`systemctl start vmware.service`让它临时启动

# 解决方法3

添加这个文件
_/etc/systemd/system/vmware.service_

```bash
[Unit]
Description=VMware daemon
Requires=vmware-usbarbitrator.service
Before=vmware-usbarbitrator.service
After=network.target

[Service]
ExecStart=/etc/init.d/vmware start
ExecStop=/etc/init.d/vmware stop
PIDFile=/var/lock/subsys/vmware
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

- 使用`systemctl enable vmware.service`让它每次开机都运行
- 使用`systemctl start vmware.service`让它临时启动
