# 04 — 扩展推荐与管理

> VS Code 的强大 80% 来自扩展生态。本章按分类推荐真正值得安装的扩展，并教你如何管理它们。

---

## 4.1 扩展操作基础

| 操作         | 快捷键                          |
| ------------ | ------------------------------- |
| 打开扩展视图 | `Ctrl+Shift+X`                  |
| 搜索扩展     | 在扩展视图搜索框输入名称        |
| 安装/卸载    | 点击 Install / Uninstall 按钮   |
| 禁用/启用    | 右键扩展卡片 → Disable / Enable |
| 查看推荐扩展 | 打开项目后，右下角弹窗建议      |

### 扩展设置

很多扩展安装后可以在 `settings.json` 中配置：

```jsonc
// 搜索 "extensions" 设置
// 或点击扩展卡片上的齿轮图标 → Extension Settings
{
  "eslint.validate": ["javascript", "typescript", "vue"],
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5",
}
```

---

## 4.2 必装扩展（通用）

### 代码格式化

**Prettier** — 代码格式化之王

- 扩展 ID: `esbenp.prettier-vscode`
- 安装量: 4000万+
- 配置:

```jsonc
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5",
  "prettier.tabWidth": 2,
  "prettier.printWidth": 100,
}
```

### 代码规范检查

**ESLint** — JS/TS 代码规范

- 扩展 ID: `dbaeumer.vscode-eslint`
- 安装量: 3000万+
- 配置:

```jsonc
{
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },
}
```

### Git 增强

**GitLens** — Git 超能力

- 扩展 ID: `eamodio.gitlens`
- 核心功能:
  - **Blame 注解**：每行代码旁边显示最后修改者和提交信息
  - **GitLens Inspect**：可视化 Git 历史
  - **CodeLens**：在函数上方显示最近修改信息
  - **文件历史**：时间线视图

### 图标主题

**Material Icon Theme**

- 扩展 ID: `PKief.material-icon-theme`
- 作用：根据文件类型显示不同图标，一眼识别文件类型

### 行内错误提示

**Error Lens**

- 扩展 ID: `usernamehw.errorlens`
- 作用：在代码行内直接显示错误/警告信息，无需悬停或打开问题面板

### 路径补全

**Path Intellisense**

- 扩展 ID: `christian-kohler.path-intellisense`
- 作用：在输入 `import ... from './'` 时自动补全文件路径

---

## 4.3 前端开发扩展

| 扩展名                    | 扩展 ID                             | 用途                       |
| ------------------------- | ----------------------------------- | -------------------------- |
| Auto Rename Tag           | `formulahendry.auto-rename-tag`     | 自动重命名 HTML/JSX 标签对 |
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss`         | Tailwind CSS 类名补全      |
| Volar (Vue)               | `Vue.volar`                         | Vue 3 全面支持             |
| TypeScript Vue Plugin     | `Vue.vscode-typescript-vue-plugin`  | Vue 的 TS 支持             |
| CSS Modules               | `clinyong.vscode-css-modules`       | CSS Modules 类型提示       |
| npm Intellisense          | `christian-kohler.npm-intellisense` | npm 包名自动补全           |

### 配置文件参考

为了更好的 Vue 开发体验，建议在工作区配置：

```jsonc
{
  "vue3snippets.enable-compile-vars": true,
  "volar.autoCompleteRefs": true,
  "volar.completion.preferredAttrName": "kebab-case",
  "typescript.preferences.autoImportFileExcludePatterns": ["vue-router"],
}
```

---

## 4.4 后端开发扩展

| 语言            | 扩展名                  | 扩展 ID                       |
| --------------- | ----------------------- | ----------------------------- |
| Python          | Python                  | `ms-python.python`            |
| Python 格式化   | Black Formatter         | `ms-python.black-formatter`   |
| Python 类型检查 | Pylance                 | `ms-python.vscode-pylance`    |
| Go              | Go                      | `golang.Go`                   |
| Rust            | rust-analyzer           | `rust-lang.rust-analyzer`     |
| Java            | Extension Pack for Java | `vscjava.vscode-java-pack`    |
| C#              | C# Dev Kit              | `ms-dotnettools.csdevkit`     |
| SQL             | SQLTools                | `mtxr.sqltools`               |
| Docker          | Docker                  | `ms-azuretools.vscode-docker` |
| YAML            | YAML                    | `redhat.vscode-yaml`          |

---

## 4.5 主题与美化扩展

| 扩展名           | 扩展 ID                          | 风格            |
| ---------------- | -------------------------------- | --------------- |
| One Dark Pro     | `zhuangtongfa.Material-theme`    | Atom 经典       |
| GitHub Theme     | `GitHub.github-vscode-theme`     | GitHub 官方     |
| Catppuccin       | `Catppuccin.catppuccin-vscode`   | 柔和护眼        |
| Dracula Official | `dracula-theme.theme-dracula`    | 高对比度        |
| Tokyo Night      | `enkia.tokyo-night`              | 蓝紫色系        |
| Material Theme   | `Equinusocio.vsc-material-theme` | Material Design |

### 自定义配色

```jsonc
// settings.json
{
  "workbench.colorCustomizations": {
    "editor.background": "#1e1e2e", // 编辑器背景色
    "editorLineNumber.foreground": "#6c7086", // 行号颜色
    "tab.activeBackground": "#181825", // 激活 Tab 背景
  },
}
```

---

## 4.6 生产力工具

| 扩展名              | 扩展 ID                                 | 用途                            |
| ------------------- | --------------------------------------- | ------------------------------- |
| Todo Tree           | `Gruntfuggly.todo-tree`                 | 高亮并管理 TODO/FIXME 注释      |
| Better Comments     | `aaron-bond.better-comments`            | 彩色注释                        |
| Code Spell Checker  | `streetsidesoftware.code-spell-checker` | 拼写检查                        |
| Markdown All in One | `yzhang.markdown-all-in-one`            | Markdown 增强                   |
| Live Share          | `ms-vsliveshare.vsliveshare`            | 实时协作编辑                    |
| GitHub Copilot      | `GitHub.copilot`                        | AI 代码补全                     |
| Thunder Client      | `rangav.vscode-thunder-client`          | 轻量级 API 测试（替代 Postman） |
| Peacock             | `johnpapa.vscode-peacock`               | 给不同窗口设置不同颜色          |

---

## 4.7 扩展管理技巧

### ① 推荐工作区扩展

在项目 `.vscode/extensions.json` 中声明推荐/禁止的扩展：

```json
{
  "recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint", "bradlc.vscode-tailwindcss"],
  "unwantedRecommendations": [
    "hookyqr.beautify" // 已被 Prettier 取代的旧扩展
  ]
}
```

当其他开发者打开项目时，VS Code 右下角会提示安装这些推荐扩展。

### ② 批量禁用排查性能问题

如果 VS Code 变慢：

1. 命令面板 → `> Developer: Show Running Extensions`
2. 查看每个扩展的启动耗时
3. 禁用耗时最高的扩展

### ③ 导出扩展列表

```bash
# 列出所有已安装扩展
code --list-extensions

# 导出为安装脚本
code --list-extensions | xargs -L 1 echo code --install-extension > install-extensions.sh
```

### ④ 同步扩展

Settings Sync 会同步扩展列表（详见 [09 — 工作区与同步](./09-workspace-profile-sync.md)）。

---

## 下一步

安装好扩展后，进入 [05 — 集成终端](./05-terminal.md) 学习终端的使用技巧。
