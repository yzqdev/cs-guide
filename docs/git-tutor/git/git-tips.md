# git-tips

## git忽略文件夹,但是添加文件

  git 忽略文件夹除了xx文件

比如有个文件夹，cache文件夹，我们要忽略除了cache文件夹的index.html文件，其他的文件都忽略掉，规则如下：

```
**/cache/*
!**/cache/index.html
```

## 清空所有commit

### 一些小技巧

```shell
# 获取当前origin对应的url 
git ls-remote --get-url origin
# git获取当前分支名字
git rev-parse --abbrev-ref HEAD
```

### 删除所有commit

#### 直接删除.git文件夹

```powershell
function clearAllCommits {
    $remote = git ls-remote --get-url origin
    Write-Host -ForegroundColor Cyan "获取git remote地址=>$remote"
     
    Write-Host -ForegroundColor Red "删除.git文件夹"
    Remove-Item -Recurse -Force ./.git 
    Write-Host -ForegroundColor Green "删除完毕,git操作"
    git init
    git remote add origin "$remote" 
    git add -A
    git commit -m "init" 
    git push origin main -f

}
```

#### 使用`git reset --soft <first commit id>`

```powershell

    $firstCommitId= git rev-list --max-parents=0 HEAD
       Write-Host -ForegroundColor Green "第一次commit的id=>$firstCommitId"
    git reset --soft $firstCommitId
    git add -A
    git commit -m "add files" 
    git push origin main -f
```

也可以用

```shell
 git checkout --orphan dev ;
    git add -A ;
    git branch -D main ;
    git branch -m main ;
    git commit -m 'Initial commit' ;
    git push origin main -f ;
    git gc --aggressive --prune=all
```

:::tip
`git checkout --orphan tmp`不会删除文件
`git switch --orphan tmp`会删除所有跟踪的的文件,所有不能用来清空commit
`git rev-list --max-parents=0 HEAD`可以获取第一个commit的id
然后`git reset --soft <commitid>`就行了
:::

## git push force如何pull

```powershell
git fetch origin
git checkout -b tmp
git branch -D main
git checkout -b main origin/main
git branch -D tmp
```

## 设置自动跟踪remote

```powershell

git config --global --add --bool push.autoSetupRemote true

```

## 如何使用git命令回滚到指定版本以及返回到新版本

:::tip
1.git branch:查看当前分支，如果在后面加-a则表示查看所有分支。

2.git log:查看提交历史，在commit id这一项中可以看到提交的历史版本id。

3.git reflog:查看每一次命令的记录

4.git reset --soft:回退到某个版本，只回退了commit的信息。

5.git reset --mixed:为默认方式，不带任何参数的git reset，即时这种方式，它回退到某个版本，只保留源码，回退commit和index信息。

6.git reset --hard:彻底回退到某个版本，本地的源码也会变为上一个版本的内容，撤销的commit中所包含的更改被冲掉,未提交的文件也会消失。
:::

### 1.回滚到指定版本

首先进入项目根目录下，使用git log 命令，找到需要返回的commit id 号，使用`git reset --hard` 后跟你需要的commit id号，这样你就回到了指定的版本，注意`git reset --hard`与`git reset  --soft`的区别：

`git reset –-soft`：回退到某个版本，只回退了commit的信息，不会恢复到index file一级。通常使用在当你git commit -m "注释"提交了你修改的内容，但内容有点问题想撤销，又还要提交，就使用soft，相当于软着路；

git reset -–hard：彻底回退到某个版本，本地的源码也会变为上一个版本的内容，撤销的commit中所包含的更改被冲掉，相当于硬着路，回滚最彻底。

### 2.返回到最新版本

当你发现需要回滚到最新版本时，可以采用以下指今步骤

`git log`：查看历史提交

`git reflog`：查看每一次命令记录
通过git reflog命令查看到之后，我们再利用 git reset 来返回到相应的版本即可，HEAD前面的一串字符为我们简写的ID，所以最后输入

`git reset --hard ca936c3`即回滚到了最新的版本号了

## amend操作

:::warn
但是不能是已经 push 的提交
:::
修改文件后

git add file

用法

git commit --amend

合并缓存的修改和上一次的提交，用新的快照替换上一个提交。缓存区没有文件时运行这个命令可以用来编辑上次提交的提交信息，而不会更改快照。

修改提交信息

```shell
git commit --amend -m 'amend message'
```

//修改提交信息操作 force

```shell
git push --force-with-lease origin main
```

### 如果只是添加了一些文件,不想改commit

适用场景：上一次提交遗漏了一些文件，需要补交，但不想多一次commit

```shell
git commit -m 'initial commit'
git add forgotten_file
git commit --amend --no-edit
```

该操作会修改上一次提交的内容，但不会要求你编辑提交信息，仍保持上一次commit的message

## 给文件夹添加git remote

会出现错误`The following untracked working tree files would be overwritten by merge`

The problem is that you are not tracking the files locally but identical files are tracked remotely so in order to "pull" your system would be forced to overwrite the local files which are not version controlled.

Try running

```shell
git add *
git stash
git pull
```

This will track all files, remove all of your local changes to those files, and then get the files from the server.
或者  
**推荐**

```shell
git fetch
 # 删除所有untrack的文件
git clean  -d  -fx .
git reset --hard origin/main

```

## 常用操作

```shell
git checkout -b dev#作用是如果没有dev分支，创建dev分支并切换至该分支
git show HEAD^#显示当前改动的文件
git tag #打标签
git push --tag 
git tag -D "v1.0.0"
git stash #暂存
```

## git add和git stash的区别

git add是针对新建文件  
git stash是针对被修改文件  
执行add命令时，可自动将文件提交到暂存区  
执行stash命令时，若该文件是新建文件却没有add，则stash无效，若该文件不是新建文件，则stash可自动将文件提交到暂存区

相关命令

```shell
git stash #保存工作现场

git stash list #查看保存到工作现场

git stash apply #恢复工作现场，现场还在list中没删

git stash pop #恢复并删除现场

git stash drop #删除现场

git stash clear #删除所有现场
```

## 关于git restore

`git restore`指令使得在工作空间但是不在暂存区的文件撤销更改(内容恢复到没修改之前的状态)

而`git restore --staged`的作用是将暂存区的文件从暂存区撤出，但不会更改文件的内容

## 获取当前git仓库文件数量

```powershell
 git ls-files|Measure-Object -Line

```
