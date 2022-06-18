# pnpm教程

:::tip
注意,建议不要配置store-dir,这样他会在每个磁盘的根目录创建.pnpm-store文件夹来存储缓存

原因:包存储应与安装的位置处于同一驱动器和文件系统上，否则，包将被复制，而不是被链接。 这是由于硬链接的工作方式带来的一个限制，因为一个文件系统上的文件无法寻址另一个文件系统中的位置
:::

```bash
pnpm config set store-dir /path/to/.pnpm-store

并且设置自动安装peerdependencies
pnpm config set auto-install-peers true
```

## 介绍

全称performant npm(高性能的npm)，见名知意，就是一个npm的替代品，至于为什么高性能，用什么样的方式解决了依赖包体积趋近于黑洞的问题,解决了什么问题呢?可以参考大佬的说明[掘金](https://juejin.cn/post/6932046455733485575),[官网](https://pnpm.io/zh/motivation)

## 安装

:::warning

不推荐使用corepack

建议直接`npm i -g pnpm`
:::
nodejs v16.13.0之后的版本内置了实验性的工具corepack，就是nodejs内置的一个管理包管理器的一个东西,[文档](https://github.com/nodejs/corepack/blob/main/README.md)

这个corepack就是版本之后默认自带的一个工具，专门用来管理这些安装依赖的这些个工具，自带npm,yarn,pnpm,不用我们手动安装

切换到指定版本，接着按照pnpm官网的文档，先把实验性的corepack开启

```shell
corepack enable
```

通常corepack中的包管理器版本都不是最新的所以我们要升级到最新，关于最新的pnpm版本号，[![npm version](https://img.shields.io/npm/v/pnpm.svg)](https://www.npmjs.com/package/pnpm)可以去npmjs官网去看

yarn版本[![npm version](https://img.shields.io/npm/v/yarn.svg)](https://www.npmjs.com/package/yarn)

```shell

corepack prepare pnpm@x.x.x --activate
```

或者使用npm安装

```bash
npm i -g pnpm


pnpm安装包
pnpm install

```

workspace用于lerna项目,不需要在子项目做install的操作
pnpm-workspace.yaml

```bash
packages:
  # all packages in subdirs of packages/ and components/
  - 'packages/**'
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

硬链接的优点：

- 兼容性好
- 盘符被更改也不会受影响
- 无需管理员的权限  

硬链接的缺点：

- 必须在同一个分区
- 仅支持本地驱动器
- 不支持为文件夹创建硬链接
