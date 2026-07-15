# Yarn Berry (v4)

## 安装

Yarn Berry 需要通过 corepack 安装。建议设置环境变量避免自动修改 `packageManager` 字段：

```
COREPACK_ENABLE_STRICT=0
COREPACK_ENABLE_AUTO_PIN=0
```

### 启用 corepack 并安装

```bash
corepack enable
corepack prepare yarn@stable --activate
yarn -v
```

> 参考: [corepack 文档](https://github.com/nodejs/corepack)

## 配置

Yarn Berry 默认使用 PnP 模式（没有 `node_modules`），如需兼容传统模式，在 `~/.yarnrc.yml` 中添加：

```yaml
npmRegistryServer: "https://registry.npmmirror.com/"
nodeLinker: "node-modules"
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `yarn dlx create-vite` | 临时运行包（替代全局安装） |
| `yarn add <pkg>` | 添加依赖 |
| `yarn remove <pkg>` | 移除依赖 |

:::tip
Yarn Berry 移除了 `yarn global` 命令，推荐使用 pnpm 管理全局包。
:::

## 推荐全局包

```json
{
  "dependencies": {
    "@antfu/ni": "^0.21.8",
    "@nestjs/cli": "^10.1.18",
    "@vue/cli": "^5.0.8",
    "create-vite": "^4.4.1",
    "create-next-app": "^14.0.0",
    "prettier": "^3.0.3",
    "typescript": "^5.2.2",
    "serve": "^14.2.1",
    "rimraf": "^5.0.5",
    "pm2": "^5.3.0",
    "taze": "^0.12.0"
  }
}
```
