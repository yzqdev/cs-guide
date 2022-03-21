# 使用nvm

:::tip
nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。下面列出下载、安装及使用方法:
:::

## linux安装nvm

见 [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

​

​

## windows安装nvm

### 下载地址

[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

```shell
# nvm 设置淘宝镜像
#windows版本
# 设置npm_mirror:
nvm npm_mirror https://npmmirror.com/mirrors/npm/

#设置node_mirror:
nvm node_mirror https://npmmirror.com/mirrors/node/
```

之后就是安装nodejs了

```bash
#安装最新的node
nvm install node

#使用某个版本
nvm use 16.2.0

#卸载某个版本
nvm uninstall 16.2.0
```
