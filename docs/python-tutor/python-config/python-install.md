# python配置

## 使用conda安装

conda环境变量: path里面加上这个  `D:\Miniconda3\Scripts`
python环境变量:
注意要先建立一个环境 (用pycharm或者conda create condapkg)
​

然后写一个环境变量 py_home   值为  D:\Miniconda3\envs\condapkg
​

再去path环境变量加一条`%py_home%` 和 `%py_home%\Scripts`

如果你已经安装了conda，那么直接通过conda-forge的channel，只需要下面这一行命令即可创建新的Python
3.10正式版本虚拟环境：

```java
conda create -n py310 python=3.10 -c conda-forge -y
```

完成安装之后，激活环境进入Python的shell，可以看到版本为3.10.5

## windows安装

 在[https://www.python.org/](https://www.python.org/)下载安装即可
