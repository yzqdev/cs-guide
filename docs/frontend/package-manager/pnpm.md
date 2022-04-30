# pnpm教程

## 注意,建议不要配置store-dir,这样他会在每个磁盘的根目录创建.pnpm-store文件夹来存储缓存

原因:包存储应与安装的位置处于同一驱动器和文件系统上，否则，包将被复制，而不是被链接。 这是由于硬链接的工作方式带来的一个限制，因为一个文件系统上的文件无法寻址另一个文件系统中的位置

```bash
pnpm config set store-dir /path/to/.pnpm-store

并且设置自动安装peerdependencies
pnpm config set auto-install-peers true
```

## 安装

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
