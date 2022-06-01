# asp运行局域网访问

找到项目目录 下的.vs/config文件夹下的`applicationhost.config`文件并打开

修改以下内容

```xml
 <bindings>
          <binding protocol="http" bindingInformation="*:53785:localhost" />
           <binding protocol="http" bindingInformation="*:53785:192.168.0.102" />
        </bindings>
```

其中`192.168.0.102`是你的本机ip地址
然后把vs用管理员权限运行(必须!)
既可以在`192.168.0.102:53785/index.html`访问了
