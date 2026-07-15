# pnpm

pnpm（performant npm）通过硬链接和内容寻址存储，解决了 `node_modules` 依赖体积膨胀的问题。

:::tip
建议在固态硬盘上使用 pnpm，机械硬盘上安装时间可能较长。推荐在机械硬盘上使用 yarn。
:::

## 安装

### 通过 corepack（推荐）

Node.js v16.13.0+ 内置 corepack，可直接管理包管理器：

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### 通过 npm

```bash
npm i -g pnpm
```

## 配置

```bash
# 设置淘宝镜像
pnpm config set registry https://registry.npmmirror.com

# 自动安装 peerDependencies
pnpm config set auto-install-peers true
```

:::warning
建议不要手动设置 `store-dir`，pnpm 会在每个磁盘根目录创建 `.pnpm-store`。包存储必须与安装位置在同一驱动器和文件系统上，否则包会被复制而非链接。
:::

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装依赖 |
| `pnpm add <pkg>` | 添加依赖 |
| `pnpm add -g <pkg>` | 安装全局包 |
| `pnpm remove <pkg>` | 移除依赖 |
| `pnpm prune` | 清理未引用的依赖 |

## 硬链接的优缺点

| 优点 | 缺点 |
|------|------|
| 兼容性好 | 必须在同一分区 |
| 盘符更改不受影响 | 仅支持本地驱动器 |
| 无需管理员权限 | 不支持为文件夹创建硬链接 |

## 依赖提升

如果需要引用依赖的依赖，在项目根目录添加 `.npmrc`：

```ini
hoist=true
public-hoist-pattern[]=vue-router
```

## 全局包推荐

```json
{
  "dependencies": {
    "@antfu/ni": "^0.17.2",
    "@nestjs/cli": "^9.0.0",
    "@vue/cli": "^5.0.8",
    "create-vite": "^3.0.0",
    "lerna": "^5.1.6",
    "pm2": "^5.2.0",
    "prettier": "^2.7.1",
    "typescript": "^4.6.3"
  }
}
```
