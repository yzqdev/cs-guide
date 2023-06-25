# git 技巧

软件
tortoise git
[https://www.gitkraken.com/download/windows64](https://www.gitkraken.com/download/windows64)
github desktop
​

[https://github.com/tj/git-extras/](https://github.com/tj/git-extras/)

## 清空所有commit记录

```bash
# 1.Checkout

git checkout --orphan latest_branch# (不能用switch会什么文件都没有)

# 2. Add all the files

git add -A

# 3. Commit the changes

git commit -am "commit message"


# 4. Delete the branch

git branch -D main

# 5.Rename the current branch to master

git branch -m main

# 6.Finally, force update your repository

git push -f origin main

# 7.清理gc
git gc --aggressive --prune=all 
```

### git分支合并

```bash
#当前是dev分支,要合并到main分支,push然后回到dev分支
git switch main

git merge dev

git push origin dev

git switch dev

# 更简单的方法,使用rebase(当前是dev分支)
git rebase origin main

git push origin main #此时还在dev分支


```

### git删除远程

```bash
git push origin --delete main

# 删除本地缓存
git rm --cached <file>
```

## git 解除fork关系

实际做起来却意外的简单。
首先，把删去所有与本地仓库连接的远程仓库

```java
git remote remove origin
git remote remove upstream 
```

然后，把 GitHub 上自己的远程仓库给删了。
最后，在 GitHub 上重新建立同名仓库，然后把本地仓库关联上去。

```java
git remote add origin <your repo>
```

于是就大功告成了
