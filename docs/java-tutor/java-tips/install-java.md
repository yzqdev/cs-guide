# java安装使用

## java下载地址

官方openjdk(adoptjdk或者说termurin)下载: [https://adoptium.net/](https://adoptium.net/)
下载openjdk(oracle jdk收费)
[https://www.injdk.cn/](https://www.injdk.cn/)  
下载java8的压缩包: [地址](https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html)

### java

​

oracle 的jdk 1.8之后已经不可以商用了,建议使用adoptopenjdk,比较推荐openj9版本的,内存占用少
  [清华镜像](https://mirror.tuna.tsinghua.edu.cn/AdoptOpenJDK/)
:::tip

建议使用压缩包方便配置

:::

单击 "新建" 创建一个名为 JAVA_HOME 新的环境变量。  
输入路径JDK目录。
变量名称:`JAVA_HOME`
变量值: `C:\Users\yzqde\.jdks\jdk8u302-b08`

下一步修改环境变量路径(Path)。  
添加到路径(Path)的前面(或后面或中间都可以)：  
`%JAVA_HOME%\bin`

## java版本没有变化?

 如果安装了java8,再去安装java16会发现改变`JAVA_HOME`  java 版本并没有变
在系统目录里面有java.exe？导致优先调用了系统目录中的java.exe，而不是自己配置的JAVA_HOME中的java.exe？
立马来到`C:\WINDOWS\system32`目录下进行验证。果然，`java.exe`、`javac.exe`等exe程序华丽丽地躺在那里！
修改环境变量即可解决。
因为PATH环境变量中默认将system32等系统重要目录添加在最前面，所以运行`java -version`时当然是调用system32目录下的java.exe了。所以只要将%JAVA_HOME%/bin这一句放到PATH环境变量的最前面，问题就迎刃而解了。
