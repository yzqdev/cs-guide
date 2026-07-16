# 11 — 技巧与 FAQ

> 本章收集了日常开发中最高频的技巧和最常见的问题，帮你少踩坑、提效率。

---

## 第一部分：提效技巧

---

### 11.1 保存时自动格式化（ESLint + Prettier）

这是前端开发的"黄金组合"——保存文件时，Prettier 自动格式化，ESLint 自动修复 lint 错误。

**安装扩展**：

- ESLint（`dbaeumer.vscode-eslint`）
- Prettier（`esbenp.prettier-vscode`）

**配置**：

```jsonc
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit",
  },
}
```

**项目级 .prettierrc**：

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100,
  "endOfLine": "lf"
}
```

---

### 11.2 Command Palette 的隐藏用法

`Ctrl+Shift+P` 不只是命令列表，还有很多前缀技巧：

| 前缀 | 输入示例          | 作用                 |
| ---- | ----------------- | -------------------- |
| `>`  | `> Reload Window` | VS Code 命令（默认） |
| `@`  | `@render`         | 当前文件中的符号     |
| `@:` | `@:render`        | 按分类显示符号       |
| `#`  | `#UserService`    | 跨文件搜索符号       |
| `:`  | `:42`             | 跳转到行号           |
| `?`  | `?`               | 显示帮助信息         |

**常用魔法命令**：

| 命令                                             | 作用                                   |
| ------------------------------------------------ | -------------------------------------- |
| `> Reload Window`                                | 重载窗口（扩展没反应时先试这个）       |
| `> Developer: Toggle Developer Tools`            | 打开 Chrome DevTools 调试 VS Code 本身 |
| `> Developer: Inspect Tokens and Colors`         | 查看 token 的语法作用域                |
| `> Developer: Show Running Extensions`           | 查看扩展启动耗时                       |
| `> Extensions: Disable All Installed Extensions` | 禁用所有扩展                           |
| `> Preferences: Open Keyboard Shortcuts (JSON)`  | 直接编辑快捷键 JSON                    |
| `> Tasks: Run Task`                              | 运行任务                               |

---

### 11.3 编辑器分屏布局

```
┌──────────────┬──────────────┐
│              │              │
│   主编辑      │   预览/参考   │
│   (左)       │   (右)       │
│              │              │
├──────────────┴──────────────┤
│       终端 / 输出            │
│       (下方面板)              │
└─────────────────────────────┘
```

**Markdown 写作场景**：

1. 左组：编辑 `.md` 文件
2. 右组：`Ctrl+K V` 实时预览
3. 下面板：`Ctrl+`` 终端运行 `pnpm dev`

---

### 11.4 列选择模式

按住 `Shift+Alt` 拖动鼠标，可以按列选择文本：

```
// 列选择后，每个"行"同时输入
const a = 1;
const b = 2;
const c = 3;
// 列选择选中 a, b, c 区域，输入 new 后：
const new = 1;
const new = 2;
const new = 3;
```

---

### 11.5 快速打开项目

```bash
# 在终端中
code ~/projects/my-app

# 打开最近的项目
code -r ~/projects/my-app  # 在当前窗口复用
```

**设置最近打开快速访问**：

```jsonc
{
  "workbench.startupEditor": "welcomePage",
  "window.restoreWindows": "preserve",
}
```

---

### 11.6 内置 Markdown 预览

| 操作         | 快捷键         |
| ------------ | -------------- |
| 预览当前文件 | `Ctrl+Shift+V` |
| 分屏预览     | `Ctrl+K V`     |

---

### 11.7 问题面板高效使用

`Ctrl+Shift+M` 打开问题面板，集中查看所有错误和警告。

**技巧**：

- 按 `F8` / `Shift+F8` 在文件间跳转错误
- 单击错误跳转到对应行
- 双击错误打开文件
- 使用搜索框过滤错误类型

---

### 11.8 快速切换主题

`Ctrl+K Ctrl+T` 快速切换颜色主题，找到让你眼睛最舒服的。

---

### 11.9 禅模式（Zen Mode）

`Ctrl+K Z` 隐藏所有 UI 元素，只保留编辑器。适合深度专注写作或编码。

退出禅模式：按 `Esc` 两次。

---

### 11.10 使用 .code-workspace 管理项目

```json
{
  "folders": [
    { "name": "前端", "path": "frontend" },
    { "name": "后端", "path": "backend" }
  ],
  "settings": {
    "editor.fontSize": 14
  }
}
```

将 `.code-workspace` 文件保存到项目根目录，双击即可打开。

---

## 第二部分：常见问题 FAQ

---

### 11.11 安装版和便携版任务栏重叠

**问题**：同时安装 VS Code 正式版和 Portable 版，任务栏图标重叠。

**解决**：修改便携版的 `product.json`，更改 `win32AppUserModelId`：

1. 打开便携版安装目录下的 `resources/app/product.json`
2. 找到 `"win32AppUserModelId"` 并修改为唯一值：

```json
"win32AppUserModelId": "Microsoft.VisualStudioCode.ForPortable"
```

---

### 11.12 Python 运行报 `ModuleNotFoundError`

**问题**：在终端运行 Python 脚本找不到自定义模块。

**解决**：设置终端环境变量 `PYTHONPATH`：

```jsonc
{
  "terminal.integrated.env.windows": {
    "PYTHONPATH": "${workspaceFolder}",
  },
}
```

---

### 11.13 VS Code 自动从 AppData 安装 TypeScript 类型

**问题**：VS Code 自动下载 `@types/*` 包到 AppData 目录。

**解决**：关闭自动类型获取，在项目中手动安装：

```jsonc
{
  "typescript.disableAutomaticTypeAcquisition": true,
}
```

```bash
npm install -D @types/react @types/node
```

---

### 11.14 单击打开文件总被新文件覆盖

**问题**：点击侧边栏文件时，当前编辑器内容总被新文件覆盖。

**原因**：VS Code 默认使用"预览模式"（Preview Mode），单击只预览，双击才固定。

**解决**：

```jsonc
{
  "workbench.editor.enablePreview": false, // 关闭预览模式
}
```

或双击文件打开（双击自动固定 Tab）。

---

### 11.15 终端字体乱码/图标不显示

**问题**：终端中的 Powerline/Nerd Font 字符不显示。

**解决**：安装 Nerd Font 并在 `settings.json` 中指定：

```jsonc
{
  "terminal.integrated.fontFamily": "MesloLGL NF",
  "terminal.integrated.fontSize": 14,
}
```

---

### 11.16 扩展不生效/没有反应

**排查步骤**：

1. 命令面板 → `> Developer: Show Running Extensions` 查看扩展是否已加载
2. 命令面板 → `> Reload Window` 重载窗口
3. 禁用所有扩展 → 逐个启用，找出有问题的
4. 查看扩展的输出通道：命令面板 → `> Output: Focus on Output View` → 选择该扩展的输出
5. 更新扩展到最新版本

---

### 11.17 VS Code 启动慢/卡顿

**优化方案**：

```jsonc
{
  // 禁用不需要的扩展
  // 减少文件监视
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true,
    "**/.git/**": true,
  },
  // 搜索优化
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
  },
  // 关闭小地图（如果不需要）
  "editor.minimap.enabled": false,
  // 减少渲染性能开销
  "editor.smoothScrolling": false,
  "editor.cursorSmoothCaretAnimation": "off",
}
```

**排查工具**：命令面板 → `> Developer: Show Running Extensions` 查看扩展启动耗时。

---

### 11.18 如何重置 VS Code 到出厂状态

```bash
# 备份当前设置
# 删除配置目录
rm -rf ~/.vscode          # Linux/macOS
rm -rf %APPDATA%\Code     # Windows

# 删除扩展目录
rm -rf ~/.vscode/extensions  # Linux/macOS
rm -rf %USERPROFILE%\.vscode\extensions  # Windows
```

> **注意**：重置前先开启 Settings Sync，重置后重新登录即可恢复。

---

### 11.19 如何查看当前文件的编码

点击 VS Code 底部状态栏右下角的编码信息（如 `UTF-8`），即可切换编码。

**常用编码配置**：

```jsonc
{
  "files.encoding": "utf8",
  "files.autoGuessEncoding": true, // 自动猜测编码
}
```

---

### 11.20 如何让 VS Code 记住编辑位置

VS Code 默认会记住文件关闭时的光标位置和折叠状态。如果发现没有记忆：

```jsonc
{
  "files.restoreUndoStack": true,
}
```

---

## 下一步

恭喜你完成了"使用篇"的学习！如果你想继续深入，可以进入 [扩展开发入门](./ext-dev/01-getting-started.md) 学习如何编写 VS Code 插件。
