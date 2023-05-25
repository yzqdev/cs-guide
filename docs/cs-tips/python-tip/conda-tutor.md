# conda常见命令

## 安装miniconda

不要选择使用环境变量,因为一会儿自己配
anaconda下载地址: [https://www.anaconda.com/products/individual#windows](https://www.anaconda.com/products/individual#windows)(请选择清华镜像)  
miniconda下载地址: [https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Windows-x86_64.exe](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Windows-x86_64.exe) (点击下载)  
我把anaconda安装在了  `d:\Miniconda3`  目录

安装后查看文档
[conda文档](https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#before-you-start)
​

## 新建虚拟环境

```bash
# 创建一个名为condapkg的环境，指定Python版本是3.5（不用管是3.10，conda会为我们自动寻找3.10中的最新版本）
conda create --name condapkg python=3.10
```

## 然后配置python

```powershell
# 在环境变量里面加了这些
D:\Miniconda3\Scripts
D:\Miniconda3\envs\condapkg
D:\Miniconda3\envs\condapkg\Scripts
```

## 添加.condarc和pip.ini文件

.condarc  

```yaml
channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - defaults
show_channel_urls: true
default_channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  msys2: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  bioconda: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  menpo: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  simpleitk: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
changeps1: false
auto_activate_base: true

```

pip.ini   (`%userprofile%\pip\pip.ini`)

```toml
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
```

## **Conda的包管理**

安装命令行工具建议用`conda install`,或者`pip3 install` 不能用`python -m pip install`

```powershell
conda activate condapkg
conda install httpie
pip3 install httpie
不能用 python -m pip install httpie
```

## 安装库

为当前环境安装库

```
# numpy
conda install numpy
# conda会从从远程搜索numpy的相关信息和依赖项目
```

## 查看已经安装的库

```
# 查看已经安装的packages
conda list
# 最新版的conda是从site-packages文件夹中搜索已经安装的包，可以显示出通过各种方式安装的包
```

## 查看某个环境的已安装包

```shell
 # 更新python
 
conda update python
# 查看某个指定环境的已安装包
conda list -n py310
conda create -n env_name package_name #创建名为env_name的新环境，并在该环境下安装名为package_name 的包，可以指定新环境的版本号，例如：conda create -n python2 python=python2.7 numpy pandas，创建了python2环境，python版本为2.7，同时还安装了numpy pandas包
# 删除某个环境
conda remove --name env_name –all 
# 或者
conda env remove -n env_name
#在指定环境中安装包
conda install --name env_name package_name 
 
# 查找package信息
conda search numpy
 
# 安装package
conda install -n py310 numpy
# 如果不用-n指定环境名称，则被安装在当前活跃环境
# 也可以通过-c指定通过某个channel安装
 
# 更新package
conda update -n py310 numpy
 
# 删除package
conda remove -n py310 numpy
 
# 更新conda，保持conda最新
conda update conda
 
 
# 更新anaconda
conda update anaconda
 ```

:::tip
 兼容pip,所以直接可以用pip安装
:::

## conda错误

 CondaHTTPError: HTTP 000 CONNECTION FAILED for url ＜<https://repo.anaconda.com/pkgs/main/win-64/curre>

[https://github.com/conda/conda/issues/9746](https://github.com/conda/conda/issues/9746)

### 安装conda后终端出现的(base)字样去除方法

修改.condarc文件

```bash
ssl_verify: true
channels:
  defaults
changeps1: False #加上这个
```
