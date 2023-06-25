# git整体流程

<https://backlog.com/git-tutorial/cn/>
[https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448](https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448)

## 整体流程

```bash
# 空目录
git init 
git remote add origin  <your_repo>
# 添加文件
git add a.txt
# 添加commit
git commit -m "添加commit"

# 修改完a.txt之后
git add a.txt&&git git commit -m "修改a.txt"
# 或者
git commit -am "修改a.txt"
# 推送
git push origin main

```

- 使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
- 使用命令`git commit -m <message>`，完成。

- 要随时掌握工作区的状态，使用git status命令。
- 如果git status告诉你有文件被修改过，用`git diff <your_file>`可以查看修改内容

- HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。

```bash
#返回上一个版本
git reset --hard HEAD^
# 返回commitid为e475afc的版本
git reset --hard e475afc
```

- 穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本 ,用`--pretty=oneline`更好看一些。
- 要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本

```bash
git log --pretty=oneline
#下面是返回的信息
1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -> master) append GPL
e475afc93c209a690c39c13a46716e8fa000c366 add distributed
eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0 wrote a readme file



git reflog
e475afc HEAD@{1}: reset: moving to HEAD^
1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
e475afc HEAD@{3}: commit: add distributed
eaadf4e HEAD@{4}: commit (initial): wrote a readme file
```

- 当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git restore <file>`。
- 当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。
- 命令`git rm <file>`用于删除一个文件

​

注意:git checkout不推荐使用了,可以用git switch 和git restore

```bash
创建新分支
git switch -b dev

查看当前分支
git branch

如何合并分支
在dev分支上
git commit -am "modify a.txt"
git switch -c main
git merge dev
就把dev合并到了main分支

删除分支

git branch -d dev

查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>或者git switch <name>
创建+切换分支：git checkout -b <name>或者git switch -c <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>
​```

## 多人合作

- 查看远程库信息，使用git remote -v；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用git switch -c branch-name origin/branch-name，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
- 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

​

## tag管理

- 命令git push origin <tagname>可以推送一个本地标签；
- 命令git push origin --tags可以推送全部未推送过的本地标签；
- 命令git tag -d <tagname>可以删除一个本地标签；
- 命令git push origin :refs/tags/<tagname>可以删除一个远程标签。
