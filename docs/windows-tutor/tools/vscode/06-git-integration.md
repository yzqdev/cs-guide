# 06 — Git 集成

> VS Code 内置了完整的 Git 支持，无需离开编辑器就能完成日常的 Git 操作。配合 GitLens 扩展更是如虎添翼。

---

## 6.1 内置 Git 功能概览

打开侧边栏的 **源代码管理** 视图（`Ctrl+Shift+G`）即可看到所有 Git 功能：

```
┌─ 源代码管理 ─────────────────────────┐
│                                       │
│  分支: main  ↑0 ↓0                    │
│                                       │
│  消息: [______________________________]│
│  ┌────────────────────────────┐       │
│  │ ✓ 提交暂存      ⌃Enter     │       │
│  │ ✓ 提交          ⌃⌘Enter   │       │
│  └────────────────────────────┘       │
│                                       │
│  ── 更改 (2) ──────────────────────── │
│  M src/app.ts                         │
│  M src/utils.ts                       │
│  ┌────────────────────────┐           │
│  │  ✓ 暂存所有更改        │           │
│  └────────────────────────┘           │
│                                       │
│  ── 暂存的更改 (0) ───────────────── │
│                                       │
└───────────────────────────────────────┘
```

### 核心操作快捷键

| 操作                   | 快捷键                     |
| ---------------------- | -------------------------- |
| 打开源代码管理         | `Ctrl+Shift+G`             |
| 提交（在消息框聚焦时） | `Ctrl+Enter`               |
| 提交所有（跳过暂存）   | `Ctrl+Shift+Enter`         |
| 暂存文件               | 点击文件旁的 `+` 号        |
| 撤销更改               | 点击文件旁的 `-` 号        |
| 查看文件差异           | 点击文件名的 **Diff 视图** |
| 刷新状态               | `Ctrl+Shift+E` 再切换回来  |

---

## 6.2 日常 Git 工作流

### 场景：从修改到推送

```bash
# 习惯在终端用 Git 的，也可以直接在 VS Code 终端里操作
# 以下是在 VS Code 图形界面中的操作流程：

1. 修改代码
2. Ctrl+Shift+G 打开源代码管理
3. 查看更改的文件（绿色 = 新增，红色 = 删除，橙色 = 修改）
4. 点击文件查看 Diff
5. 点击文件旁的 + 暂存（或 "暂存所有更改"）
6. 输入提交信息
7. Ctrl+Enter 提交
8. ... 点击底部状态栏的 "同步" 按钮推送
```

### 对比三路合并

三路合并视图会在冲突时自动打开：

```
┌───────────────┬───────────────┬───────────────┐
│  当前更改     │   合并结果     │   传入更改     │
│  (Ours)       │   (Result)    │   (Theirs)    │
│               │               │               │
│  <<<<<<<      │  final code   │  >>>>>>>      │
│  ours code    │               │  theirs code  │
│  =======      │               │               │
└───────────────┴───────────────┴───────────────┘
```

解决冲突后，点击 **"接受合并"** 按钮。

---

## 6.3 GitLens 扩展

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) 是 VS Code 上最强大的 Git 扩展，安装量超过 4000 万。

### 核心功能

| 功能                   | 说明                                 |
| ---------------------- | ------------------------------------ |
| **Blame 注解**         | 每行代码末尾显示最后修改者和提交哈希 |
| **CodeLens**           | 函数/类上方显示最近修改者和修改时间  |
| **Current Line Blame** | 状态栏显示当前行的 Git Blame 信息    |
| **文件历史**           | 右键文件 → `Open File History`       |
| **搜索提交**           | 按作者、文件、消息搜索提交历史       |
| **GitLens Inspect**    | 可视化分支、提交图                   |

### 推荐配置

```jsonc
// settings.json
{
  "gitlens.currentLine.enabled": true, // 状态栏显示当前行 Blame
  "gitlens.codeLens.enabled": true, // 函数上方显示 Git 信息
  "gitlens.codeLens.recentChange.enabled": true, // 最近修改
  "gitlens.codeLens.authors.enabled": true, // 作者
  "gitlens.blame.avatars": true, // 头像
  "gitlens.hovers.currentLine.over": "line", // 悬停显示 Blame
  "gitlens.defaultDateFormat": "YYYY-MM-DD HH:mm", // 日期格式
}
```

---

## 6.4 分支管理

### 创建/切换分支

1. 点击左下角状态栏的分支名（如 `main`）
2. 输入新分支名 → `Create new branch...`
3. 或选择已有分支切换

### 分支操作

| 操作     | 方式                                   |
| -------- | -------------------------------------- |
| 创建分支 | 状态栏 `main` → `Create new branch...` |
| 切换分支 | 状态栏 `main` → 选择分支               |
| 删除分支 | 命令面板 → `> Git: Delete Branch...`   |
| 合并分支 | 命令面板 → `> Git: Merge Branch...`    |
| 变基     | 命令面板 → `> Git: Rebase...`          |

### 查看分支图

安装 GitLens 后：

1. 点击侧边栏 GitLens 图标
2. 选择 `Branches` 或 `Commits` 视图
3. 可视化查看分支拓扑

---

## 6.5 常用 Git 配置

```jsonc
// settings.json
{
  "git.enableSmartCommit": true, // 无暂存区时直接提交
  "git.autofetch": true, // 自动拉取
  "git.confirmSync": false, // 同步时不确认
  "git.fetchOnPull": true, // 拉取前先 fetch
  "git.mergeEditor": true, // 使用三路合并编辑器
  "git.untrackedChanges": "separate", // 未跟踪文件单独显示
  "git.alwaysSignOff": false, // 自动加 Signed-off-by
  "git.defaultBranchName": "main", // 默认分支名
  "git.branchProtection": ["main", "master"], // 保护分支
  "git.branchRandomName": {
    "enable": true, // 随机分支名
  },
}
```

---

## 6.6 GitHub 集成

### 拉取请求

安装 [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) 扩展后：

| 操作    | 方式                                       |
| ------- | ------------------------------------------ |
| 查看 PR | 侧边栏 → GitHub 图标                       |
| 创建 PR | 命令面板 → `> GitHub: Create Pull Request` |
| 审查 PR | 在 PR 视图中查看 Diff、发表评论            |
| 合并 PR | 在 PR 详情页点击 `Merge`                   |

### 常见场景

**场景：审查同事的 PR**

1. 安装 GitHub Pull Requests 扩展
2. 点击侧边栏 GitHub 图标
3. 选择待审查的 PR
4. 在 Diff 视图中查看改动
5. 点击行号旁的 `+` 发表评论
6. 审核完成后选择 `Approve` 或 `Request Changes`

---

## 6.7 状态栏 Git 信息解读

VS Code 底部状态栏会显示 Git 信息：

```
main* ↓2 ↑1  ≡ +3 ~2 -1
 │   │   │   │   │   │  └─ 删除 1 个文件
 │   │   │   │   │   └──── 修改 2 个文件
 │   │   │   │   └─────── 新增 3 个文件
 │   │   │   └─────────── 未暂存的更改数
 │   │   └─────────────── 落后远程 2 个提交
 │   └─────────────────── 领先远程 1 个提交（* 表示未提交的更改）
 └─────────────────────── 当前分支名
```

---

## 下一步

掌握 Git 集成后，进入 [07 — 任务自动化与调试](./07-tasks-and-launch.md) 学习如何配置构建和调试任务。
