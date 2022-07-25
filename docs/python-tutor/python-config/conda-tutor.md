# conda常见命令

## 安装miniconda

不要选择使用环境变量,因为一会儿自己配
anaconda下载地址: [https://www.anaconda.com/products/individual#windows](https://www.anaconda.com/products/individual#windows)(请选择清华镜像)
miniconda下载地址: [https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Windows-x86_64.exe](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/Miniconda3-latest-Windows-x86_64.exe) (点击下载)
我把anaconda安装在了  d:\Miniconda3  目录
安装后查看文档
[https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#before-you-start](https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#before-you-start)
​

## 新建虚拟环境

```bash
# 创建一个名为condapkg的环境，指定Python版本是3.5（不用管是3.10，conda会为我们自动寻找3.10中的最新版本）
conda create --name condapkg python=3.10
```

## 然后配置python

```java
# 在环境变量里面加了这些
D:\Miniconda3\Scripts
D:\Miniconda3\envs\condapkg
D:\Miniconda3\envs\condapkg\Scripts
```

## 添加.condarc和pip.ini文件

.condarc  

```java
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

```java
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
```

## **Conda的包管理**

安装命令行工具建议用`conda install`,或者`pip3 install` 不能用`python -m pip install`

```java
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

```
# 查看某个指定环境的已安装包
conda list -n py35
```

## 搜索package的信息

```
# 查找package信息
conda search numpy
Loading channels: done
# Name                  Version           Build  Channel             
numpy                     1.5.1          py26_1  pkgs/free           

...

numpy                    1.15.1  py37hec00662_0  anaconda/pkgs/main  
numpy                    1.15.1  py37hec00662_0  pkgs/main
```

## 安装package到指定的环境

```
# 安装package
conda install -n py35 numpy
# 如果不用-n指定环境名称，则被安装在当前活跃环境
# 也可以通过-c指定通过某个channel安装
```

## 更新package

```
# 更新package
conda update -n py35 numpy
```

## 删除package

```
# 删除package
conda remove -n py35 numpy
```

## 更新conda

```
# 更新conda，保持conda最新
conda update conda
```

## 更新anaconda

```
# 更新anaconda
conda update anaconda
 ```

### 更新Python

## 更新python

```shell
conda update python
```

:::tip
 兼容pip,所以直接可以用pip安装
:::
