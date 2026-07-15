# 数据包开发工具与工作流

除了手动创建文件外，现代数据包开发通常借助一系列工具来提高效率。本文档概览主流的开发工具链，每个工具都有独立的详细文档。

## 工具链概览

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code 编辑器                            │
│  ┌─────────────────┐  ┌──────────────────────────────────┐  │
│  │ Datapack Helper  │  │   syntax-mcfunction              │  │
│  │ Plus by Spyglass │  │   (mcfunction 语法高亮)          │  │
│  └─────────────────┘  └──────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Python 工具链                              │
│  ┌──────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  Beet    │  │  Mecha (验证器)  │  │  Bolt (脚本)     │  │
│  └──────────┘  └──────────────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    TypeScript 工具链                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Sandstone  (TypeScript 数据包框架)                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 工具对比

| 工具 | 语言 | 类型 | 适用场景 |
|------|------|------|----------|
| Datapack Helper Plus | - | VS Code 插件 | 编写 `.mcfunction` 时的智能补全、错误检查 |
| syntax-mcfunction | - | VS Code 插件 | `.mcfunction` 语法高亮 |
| Beet | Python | 构建工具链 | 数据包/资源包的自动化构建、合并、管道处理 |
| Mecha | Python | 验证器 | 命令语法校验、统计、CI 集成 |
| Sandstone | TypeScript | 数据包框架 | 用 TypeScript 类型安全地编写整个数据包 |

## 快速入门

### 1️⃣ 安装 VS Code 插件

在 VS Code 扩展商店搜索并安装：

- **Datapack Helper Plus by Spyglass** — 提供命令补全、语法检查、悬停文档
- **syntax-mcfunction** — 提供 `.mcfunction` 文件语法高亮

详见 [VS Code 插件](tools/vscode-plugins.md)

### 2️⃣ 安装 Beet 工具链

```bash
# 使用 uv 安装 Beet（推荐）
pip install uv
uv tool install beet

# 或使用 pip 直接安装
pip install beet

# 安装 Mecha 验证器
pip install mecha
```

详见 [Beet 构建工具](tools/beet.md) 和 [Mecha 验证器](tools/mecha.md)

### 3️⃣ 安装 Sandstone

```bash
# 使用 Bun 安装 Sandstone CLI
bun i -g sandstone-cli

# 创建项目
sand create my-datapack

# 进入开发模式
cd my-datapack && bun dev:watch
```

详见 [Sandstone 框架](tools/sandstone.md)

## 推荐工作流

### 基础流（手动 + VS Code）
```
手动创建文件结构 → VS Code 编写 .mcfunction → 复制到游戏目录 → /reload
```

### Beet 流（Python 自动化）
```
beet.yaml 配置 → 编写 Python 插件 → beet build → 自动输出到游戏目录
```

### Sandstone 流（TypeScript 全栈）
```
sand create 创建项目 → 编写 TypeScript → sand build → 自动编译输出
```

---

> 详细文档请查看对应工具的独立页面。
