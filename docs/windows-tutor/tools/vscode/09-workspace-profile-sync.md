# 09 — 工作区、Profile 与同步

> 本章介绍三个提升 VS Code 多项目管理能力的特性：Multi-root Workspaces、Profiles 和 Settings Sync。

---

## 第一部分：Multi-root Workspaces（多根工作区）

当你需要同时处理多个项目（如 monorepo、前后端分离、微服务）时，Multi-root Workspaces 允许你将多个文件夹添加到同一个工作区中。

---

### 9.1 创建多根工作区

**方式一：菜单操作**

1. `File > Add Folder to Workspace...`
2. 选择要添加的文件夹
3. 重复添加多个
4. `File > Save Workspace As...` → 保存为 `.code-workspace` 文件

**方式二：直接编辑 .code-workspace 文件**

```json
{
  "folders": [
    {
      "name": "前端",
      "path": "packages/frontend"
    },
    {
      "name": "后端",
      "path": "packages/backend"
    },
    {
      "name": "共享库",
      "path": "packages/shared"
    },
    {
      "name": "文档",
      "path": "docs"
    }
  ],
  "settings": {
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
    "editor.fontSize": 14
  },
  "extensions": {
    "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
  }
}
```

### 9.2 多根工作区的优势

| 功能     | 单文件夹         | 多根工作区                  |
| -------- | ---------------- | --------------------------- |
| 文件浏览 | 只显示一个根目录 | 显示所有根目录              |
| 搜索     | 搜索当前文件夹   | 可选择搜索范围（所有/当前） |
| Git      | 显示一个仓库     | 显示每个仓库的分支状态      |
| 调试     | 一个 launch.json | 可以为每个子项目配置        |
| 任务     | 一个 tasks.json  | 可以为每个子项目配置        |

### 9.3 多根工作区的配置

在多根工作区中，配置覆盖规则如下：

```
.code-workspace 中的 settings
  └── 覆盖 User settings
    └── 被 .vscode/settings.json 覆盖（如果有）
```

> **注意**：`.code-workspace` 文件本身应该提交到 Git 仓库，让团队成员共享相同的项目结构。

---

## 第二部分：Profiles（配置文件）

Profiles 允许你为不同开发场景保存独立的设置、扩展和快捷键，一键切换。

---

### 9.4 创建 Profile

1. 左下角齿轮 → `Profiles` → `Create Profile...`
2. 输入名称（如 "Frontend"、"Python Data"、"LeetCode"）
3. 选择要包含的内容：
   - **Settings**：该场景下的设置
   - **Extensions**：该场景需要的扩展
   - **Keybindings**：快捷键绑定
   - **Snippets**：代码片段
   - **UI State**：布局状态

### 9.5 推荐 Profile 规划

| Profile      | 场景          | 包含的扩展                                     |
| ------------ | ------------- | ---------------------------------------------- |
| **Default**  | 日常全栈开发  | ESLint, Prettier, GitLens, Error Lens          |
| **Frontend** | 前端开发      | 同上 + Volar, Tailwind, Auto Rename Tag        |
| **Python**   | 数据分析/后端 | Python, Pylance, Jupyter, Black                |
| **LeetCode** | 刷题          | 精简版：只保留基础语言支持                     |
| **Writing**  | 写作          | Markdown All in One, Spell Checker, 无代码提示 |
| **Minimal**  | 演示/面试     | 极简：只有基本编辑器功能                       |

### 9.6 切换 Profile

| 方式     | 操作                                                 |
| -------- | ---------------------------------------------------- |
| 命令面板 | `> Profiles: Switch Profile`                         |
| 齿轮菜单 | 左下角齿轮 → `Profiles` → 选择                       |
| 快捷键   | 命令面板 → `> Profiles: Switch Profile` → 绑定快捷键 |

### 9.7 导出 Profile

```json
// 导出为文件，分享给同事
// 齿轮 → Profiles → Export Profile...
// 生成 .code-profile 文件
```

---

## 第三部分：Settings Sync（设置同步）

Settings Sync 基于 Microsoft 或 GitHub 账号，跨机器同步你的 VS Code 配置。

---

### 9.8 开启 Settings Sync

1. 左下角齿轮 → `Turn on Settings Sync...`
2. 选择登录方式（Microsoft 或 GitHub）
3. 选择要同步的内容：

| 同步项目               | 说明                 |
| ---------------------- | -------------------- |
| **Settings**           | User `settings.json` |
| **Keyboard Shortcuts** | `keybindings.json`   |
| **Extensions**         | 已安装的扩展列表     |
| **User Snippets**      | 自定义代码片段       |
| **UI State**           | 布局、面板状态等     |

### 9.9 同步冲突处理

当多台机器上的设置冲突时，VS Code 会提示：

| 选项               | 含义                   |
| ------------------ | ---------------------- |
| **Merge**          | 合并本地和云端的配置   |
| **Accept Local**   | 保留本地配置，覆盖云端 |
| **Accept Remote**  | 使用云端配置，覆盖本地 |
| **Show Conflicts** | 查看具体冲突项         |

### 9.10 同步管理

```jsonc
// settings.json
{
  "sync.autoDownload": true, // 自动下载云端配置
  "sync.autoUpload": true, // 自动上传本地配置
  "sync.quietSync": false, // 静默同步（不弹提示）
  "sync.gist": "YOUR_GIST_ID", // 指定同步的 Gist（高级用法）
  "sync.forceUpload": false, // 强制上传覆盖云端
  "sync.forceDownload": false, // 强制下载覆盖本地
}
```

### 9.11 同步管理命令

| 命令                            | 用途             |
| ------------------------------- | ---------------- |
| `> Sync: Turn On/Off`           | 开启/关闭同步    |
| `> Sync: Show Sync Data`        | 查看同步数据     |
| `> Sync: Reset Sync Data`       | 重置云端同步数据 |
| `> Sync: Clear Local Sync Data` | 清除本地同步缓存 |

---

## 9.12 三者的关系

```
Profiles ───── 不同场景的配置集合
    │
    ├── 包含 Settings（设置）
    ├── 包含 Extensions（扩展）
    ├── 包含 Keybindings（快捷键）
    └── 包含 Snippets（片段）
        │
        └── Settings Sync 同步所有这些内容到云端
            │
            └── Multi-root Workspaces 管理多个项目
```

> 💡 **最佳实践**：
>
> - 在 **公司电脑** 和 **个人电脑** 上登录同一个 GitHub 账号，Settings Sync 自动同步
> - 用 **Profiles** 区分不同语言/场景的配置
> - 用 **Multi-root Workspaces** 管理 monorepo 项目

---

## 下一步

进入 [10 — 快捷键速查表](./10-keyboard-shortcuts.md) 查看完整的快捷键对照表。
