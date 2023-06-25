# git克隆单个文件夹

```shell
新建一个空的文件夹,进入该文件夹  
git init
 # 设置允许克隆子目录
git config core.sparsecheckout true 
echo 'docs' >> '.git/info/sparse-checkout' 
# 最后
git pull origin main
```
