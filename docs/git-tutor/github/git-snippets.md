# Git 实用技巧

## 推荐工具

| 工具 | 说明 |
|------|------|
| [TortoiseGit](https://tortoisegit.org/) | Windows 图形化 Git 客户端 |
| [GitKraken](https://www.gitkraken.com/) | 跨平台 Git 客户端 |
| [GitHub Desktop](https://desktop.github.com/) | GitHub 官方桌面客户端 |
| [git-extras](https://github.com/tj/git-extras/) | Git 扩展命令集合 |

## 清空所有提交记录

> 警告：此操作会丢失所有历史提交，仅适用于需要彻底重置的场景

```bash
# 1. 创建无历史的新分支
git checkout --orphan latest_branch

# 2. 添加所有文件
git add -A

# 3. 提交
git commit -m "Initial commit"

# 4. 删除旧分支
git branch -D main

# 5. 重命名当前分支
git branch -m main

# 6. 强制推送
git push -f origin main

# 7. 清理垃圾对象
git gc --aggressive --prune=all
```

## 分支合并

### merge 方式

```bash
# 当前在 dev 分支，合并到 main
git switch main
git merge dev
git push origin main
git switch dev
```

### rebase 方式（更干净的历史）

```bash
# 当前在 dev 分支
git rebase origin/main
git push origin main
```

## 删除远程分支

```bash
git push origin --delete branch-name
```

## 删除本地缓存的文件追踪

```bash
git rm --cached <file>
```

## 解除 Fork 关系

Fork 后想脱离上游仓库的关联：

```bash
# 1. 移除所有远程仓库
git remote remove origin
git remote remove upstream

# 2. 在 GitHub 上删除自己的远程仓库

# 3. 重新创建同名仓库并关联
git remote add origin <your-repo-url>
```
