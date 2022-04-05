# 环境变量配置

```
%SystemRoot%\system32;%INTEL_DEV_REDIST%redist\intel64\compiler;%JAVA_HOME%\bin;C:\Program Files (x86)\Common Files\Oracle\Java\javapath;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;%SYSTEMROOT%\System32\OpenSSH\;C:\Program Files\dotnet\;%NVM_HOME%;%NVM_SYMLINK%;C:\Android_Reverse\apkTool;C:\Go\bin;C:\Program Files (x86)\dotnet-core-uninstall\;C:\codeblocks-20.03mingw-nosetup\MinGW\bin;C:\Program Files\Memurai\;C:\Users\yzqde\AppData\Local\Yarn\bin;C:\Users\yzqde\.conda\envs\condapkg;C:\Program Files\Git\cmd
```

环境变量默认编辑界面是这样的
![image.png](https://cdn.nlark.com/yuque/0/2021/png/295914/1626400042083-7c07f28f-db13-4387-871d-b8fa7e13678f.png#height=416&id=XO1HX&margin=%5Bobject%20Object%5D&name=image.png&originHeight=664&originWidth=677&originalType=binary&ratio=1&size=49381&status=done&style=none&width=424)
编辑编辑文本会变成
![image.png](https://cdn.nlark.com/yuque/0/2021/png/295914/1626400138935-2780232b-782f-4afb-b057-2b65315c17f3.png#height=109&id=F4GPV&margin=%5Bobject%20Object%5D&name=image.png&originHeight=217&originWidth=839&originalType=binary&ratio=1&size=14711&status=done&style=none&width=419.5)

如果出现环境变量path的编辑一直是编辑文本的样式,则需要将`%SystemRoot%\system32` 这个变量移到最前面,这样干就变成了列表的样式

# 使用powershell编辑环境变量

查看微软官方文档 [链接](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_environment_variables?view=powershell-7.1)

```powershell
# 获取path环境变量
$env:path 
# 获取用户名
$env:USERNAME
# env有如下变量: USERPROFILE,username,path,windir,COMPUTERNAME等等

#Powershell设置环境变量

#查看所有环境变量  
ls env:

#搜索环境变量   
ls env:NODE*

#查看单个环境变量 
$env:NODE_ENV

#添加/更新环境变量 
$env:NODE_ENV=development

#删除环境变量        
del evn:NODE_ENV

# 改变path环境变量
$env:PATH += ";$env:ERLANG_HOME\bin;c:\temp"
```
