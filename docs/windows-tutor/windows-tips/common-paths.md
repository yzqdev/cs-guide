# windows常用路径

## 环境变量备份

Win + R打开搜索框，输入`regedit` 打开注册表

### 系统变量：
 

- 在注册表框中输入: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment`
- 右键`Environment` --> 导出 --> 保存文本为 `.reg`文件即可
### 用户变量：

- 在注册表框中输入: `HKEY_CURRENT_USER\Environment`
- 右键`Environment` --> 导出 --> 保存文本为 `.reg`文件即可

## 各种编程语言下载依赖的环境变量

### java

:::tip

## maven
默认在`C:\Users\用户名\.m2\repository\`,修改方法:
修改.m2文件夹中,setting.xml,添加
```xml
 <localRepository>D:\configuration\repomaven</localRepository>
```

## gradle
设置环境变量`GRADLE_USER_HOME`为`D:\configuration\.gradle`

:::
### rust

cargo环境变量

cargo默认cache在`~/.cargo`路径,要更改这个路径,可以修改`CARGO_HOME`为`D:\configuration\.cargo`

同理配置**RUSTUP_HOME**为`D:\configuration\.rustup`
记得编辑"**Path**"变量，新增"**%RUSTUP_HOME%**"与"**%CARGO_HOME%**"

修改为国内镜像源

在你配置的`.cargo`文件夹添加一个config文件,写入以下内容
```toml
[source.crates-io]
replace-with = 'ustc'

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```
也可以使用字节的代理
[https://rsproxy.cn/#getStarted](https://rsproxy.cn/#getStarted)
### nuget
修改nuget环境变量,官方文档链接[https://learn.microsoft.com/zh-cn/nuget/consume-packages/managing-the-global-packages-and-cache-folders]

下面是老办法,推荐用上面官网的方法


我们通过NuGet包管理器下载的引用包，默认是存放在C盘的，存储路径一般是：
```
C:\Users\{系统用户名}\.nuget\packages
```
根据下述文件路径，找到一个名为“NuGet.Config”的文件，或者通过搜索，直接查找该文件
```
C:\Users\{系统用户名}\AppData\Roaming\NuGet
```
然后替换内容

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <packageSources>
        <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    </packageSources>
    
    <!--新增的内容-->
    <config>
        <!--默认全局包文件夹的位置。【仅使用 PackageReference 的 globalPackagesFolder (项目)】-->
        <add key="globalPackagesFolder" value="你想要NuGet包存放的新路径" />
        
        <!--安装 NuGet 包的位置，而非默认的 $(Solutiondir)/packages 文件夹。【仅限于 packages.config】 -->
        <add key="repositoryPath" value="你想要NuGet包存放的新路径" />
    </config>
</configuration>
```

### dart

配置`PUB_CACHE`环境变量为`D:\flutter\.pub-cache`
配置`FLUTTER_STORAGE_BASE_URL`为`https://storage.flutter-io.cn`
配置`PUB_HOSTED_URL`为`https://pub.flutter-io.cn`

## nodejs
配置`ELECTRON_MIRROR`为`https://npmmirror.com/mirrors/electron/`

### deno

配置`DENO_DIR`为`D:\configuration\denocache`


配置`NPM_CONFIG_REGISTRY`为`https://registry.npmmirror.com`
### python

:::tip
### poetry
poetry cache路径 `C:\Users\<username>\AppData\Roaming\pypoetry`
```
  
poetry config --list
```
:::


jetbrains系列,自己配,不解释

## blender

blender配置路径 `C:\Users\yanni\AppData\Roaming\Blender Foundation\Blender\2.91\config`  

vscode配置文件路径`C:\Users\yanni\AppData\Roaming\Code\User`

### windows路径

默认安装路径 `C:\Users\yanni\AppData\Local\Programs`

默认软件配置路径`C:\Users\yanni\AppData\Roaming`

## win10开始菜单路径

```python
C:\ProgramData\Microsoft\Windows\Start Menu
C:\Users\wz\AppData\Roaming\Microsoft\Windows\Start Menu
```

## 程序自启动文件夹

```python
所有用户
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp
你的用户
C:\Users\你的用户名\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```

| 程序安装目录     | %ProgramFiles%                                     | C:\Program Files                                                                     |
| ---------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 程序安装目录32位 | %PROGRAMFILES(X86)%                                | C:\Program Files (x86)                                                               |
| 公用文件夹       | %CommonProgramFiles%                               | C:\Program Files\Common Files                                                        |
| 公用文件夹32位   | %COMMONPROGRAMFILES(x86)%                          | C:\Program Files (x86)\Common Files                                                  |
| 用户目录         | %HOMEPATH%                                         | C:\Users\用户名                                                                      |
| 用户目录         | %USERPROFILE%                                      | C:\Users\用户名                                                                      |
| 用户程序目录     | %APPDATA%                                          | C:\Users\Administrator\AppData\Roaming                                               |
| 所有用户目录     | %ALLUSERSPROFILE%                                  | C:\ProgramData                                                                       |
| 临时文件         | %TEMP%                                             | C:\Users\用户名\AppData\Local\Temp                                                   |
| 本地程序数据     | %LOCALAPPDATA%                                     | C:\Users\用户名\AppData\Local                                                        |
|                  | %PROGRAMDATA%                                      | C:\ProgramData                                                                       |
| 字体目录         | %WINDIR%\FONTS                                     | C:\Windows\Fonts                                                                     |
| 输入法目录       | %WINDIR%\IME                                       | C:\Windows\IME                                                                       |
| 桌面             | %USERPROFILE%\桌面                                 | C:\Users\Administrator\Desktop                                                       |
| 收藏夹           | %USERPROFILE%\Favorites                            | C:\Users\Administrator\Favorites                                                     |
| 快速启动         | %APPDATA%\Microsoft\Internet Explorer\Quick Launch | C:\Users\Administrator\AppData\Roaming\Microsoft\Internet Explorer\Quick Launch      |
| 开始菜单         |                                                    | C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Start Menu                  |
| 开始菜单“启动”项 |                                                    | C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup |
| 公共目录         | %PUBLIC%                                           | C:\Users\Public                                                                      |
