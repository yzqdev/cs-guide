# Git 命令

## 常用操作

```bash
# 基础
git init                    # 初始化仓库
git clone <url>             # 克隆仓库
git add .                   # 暂存所有文件
git commit -m "消息"        # 提交
git push                    # 推送
git pull                    # 拉取
git status                  # 查看状态
git log                     # 查看日志

# 分支
git branch                  # 查看分支
git branch <name>           # 创建分支
git checkout <name>         # 切换分支
git switch <name>           # 切换分支（新方式）
git merge <name>            # 合并分支
git branch -d <name>        # 删除分支

# 撤销
git reset HEAD <file>       # 取消暂存
git checkout -- <file>      # 撤销工作区修改
git reset --hard HEAD       # 回退到最近提交
git revert <commit>         # 撤销某次提交

# 远程
git remote -v               # 查看远程仓库
git remote add origin <url> # 添加远程仓库
git fetch                   # 获取远程更新
git rebase                  # 变基

# 查看文件数量
git ls-files | wc -l        # 查看 git 中文件数量

# 清理
git clean -f                # 删除 untracked 文件
git clean -df               # 删除 untracked 目录和文件
git reset --hard            # 删除 add 过的文件修改
```

## 配置

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global core.autocrlf true   # Windows
git config --global core.editor "code --wait"

# 查看配置
git config --list
```

## .gitignore 常用

```gitignore
node_modules/
dist/
.env
*.log
.DS_Store
Thumbs.db
.vscode/
.idea/
```
