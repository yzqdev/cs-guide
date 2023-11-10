# 技巧1

```powershell
# clone 下来指定的单一分支
git clone -b <branch-name> --single-branch https://github.com/user/repo.git
# 只会 clone 最近一次提交，将减少 clone 时间
git clone --depth=1 https://github.com/user/repo.git

```

## gitclone单个文件夹

```
git config core.sparsecheckout true


 mkdir models # 创建一个与要clone的仓库同名或不同命的目录
 cd models
 git init #初始化
 git remote add origin  https://github.com/tensorflow/models.git # 增加远端的仓库地址
 git config core.sparsecheckout true # 设置Sparse Checkout 为true 
 echo "research/deeplab" >> .git/info/sparse-checkout # 将要部分clone的目录相对根目录的路径写入配置文件
 git pull --depth 1 origin master 
```
