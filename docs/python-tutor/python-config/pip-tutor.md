# pip使用

:::tip
常用的全局包

```python
pip install -U you-get pipenv rembg pyinstaller auto-py-to-exe
```

:::

## 安装

python3已经自带了pip,运行`python -m pip -V` ,就可以看到了

配置文件路径

- On Unix and macOS the configuration file is: `$HOME/.pip/pip.conf`
- On Windows the configuration file is: `%HOME%\pip\pip.ini`

## 配置国内镜像源

将pip源更换到国内镜像
用pip管理工具安装库文件时，默认使用国外的源文件，因此在国内的下载速度会比较慢，可能只有50KB/s。幸好，国内的一些顶级科研机构已经给我们准备好了各种镜像，下载速度可达2MB/s。
其中，比较常用的国内镜像包括：

- 阿里云 [http://mirrors.aliyun.com/pypi/simple/](http://mirrors.aliyun.com/pypi/simple/)
- 豆瓣[http://pypi.douban.com/simple/](http://pypi.douban.com/simple/)
- 清华大学 [https://pypi.tuna.tsinghua.edu.cn/simple/](https://pypi.tuna.tsinghua.edu.cn/simple/)
- 中国科学技术大学 [http://pypi.mirrors.ustc.edu.cn/simple/](http://pypi.mirrors.ustc.edu.cn/simple/)
- 华中科技大学[http://pypi.hustunique.com/](http://pypi.hustunique.com/)

注意：新版ubuntu要求使用https源。

设置方法：（以清华镜像为例，其它镜像同理）  
（1）临时使用：  
可以在使用pip的时候，加上参数-i和镜像地址(如
[https://pypi.tuna.tsinghua.edu.cn/simple)](https://pypi.tuna.tsinghua.edu.cn/simple))，
例如：pip install -i [https://pypi.tuna.tsinghua.edu.cn/simple](https://pypi.tuna.tsinghua.edu.cn/simple) pandas，这样就会从清华镜像安装pandas库。

（2）永久修改，一劳永逸：  
（a）Linux下，修改 ~/.pip/pip.conf (没有就创建一个文件夹及文件。文件夹要加“.”，表示是隐藏文件夹)
内容如下：

```ini
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = https://pypi.tuna.tsinghua.edu.cn
```

(b) windows下，直接在user目录中创建一个pip目录，如：C:\Users\xx\pip，然后新建文件pip.ini，即 %HOMEPATH%\pip\pip.ini，在pip.ini文件中输入以下内容（以豆瓣镜像为例）：

```ini
[global]
index-url = http://pypi.douban.com/simple
[install]
trusted-host = pypi.douban.com
```

 或者使用命令行

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## 安装依赖

注意:pip默认安装依赖的位置在  `python文件夹\Lib\site-packages` 比如我的就是在`C:\Users\yanni\miniconda3\envs\condapkg\Lib\site-packages`
conda在某个环境比如condapkg安装依赖比如pandas的时候,会在两个目录生成pandas包目录
使用conda安装依赖和pip安装依赖在pycharm中依赖的位置是一样的,没区别哦

```bash
miniconda3/pkgs   # 这个目录是全局的
miniconda3/envs/condapkg/Lib/site-packages   #这个是condapkg环境的依赖

```

​

```bash
python -m pip install SomePackage            # latest version
python -m pip install SomePackage==1.0.4     # specific version
python -m pip install 'SomePackage>=1.0.4'     # minimum version
python -m pip uninstall SomePackage            #删除依赖
python -m pip list                #列出依赖
python -m pip search "query"


#安装和生成requirements中的依赖
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt

```

## Ubuntu 安装最新版本的 Python3.10

> 必须在 `root` 下执行。

**安装最新版本的 Python3.10**

- 查看当前 python3 的版本

  ```bash
  $ python3 --version
  Python 3.8.10
  ```

- 升级包及安装环境前置依赖

  ```bash
  apt update
  apt install software-properties-common
  ```

- 添加 deadsnakes PPA 到源列表
  安装过程中需要按 `Enter` 进入下一步

  ```bash
  add-apt-repository ppa:deadsnakes/ppa
  apt update
  ```

- 查看软件包是否包含 python3.10

  ```bash
  apt list | grep python3.10
  ```

- 安装 python3.10

  ```bash
  apt install python3.10
  ```

- 查看当前 Python 版本，发现版本未更新

  ```bash
  python3 --version
  ```

- 设置默认版本为 Python3.10

  ```bash
  update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1
  update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 2
  ```

  执行，选择默认版本

  ```bash
  update-alternatives --config python3
  ```

- 查看最新的 Python 版本

  ```bash
  $ python --version
  Python 3.10.0
  ```

**按需要决定是否移除旧版本的 Python3.8（因是默认的 Python，建议不移除，以防个别破坏内置依赖）**

```bash
apt remove python3.8
apt autoremove
```

- 修复 pip 和 disutils
  执行 `pip --version` 会报错：

  ```bash
  ModuleNotFoundError: No module named 'distutils.util'
  ```

  解决：

  ```bash
  apt install python3.10-distutils
  ```

- 重装 pip

  ```
  curl -fSL https://bootstrap.pypa.io/get-pip.py |   python3 get-pip.py --user
  ```
