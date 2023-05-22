# 打包注意事项

## 教程

- 安卓离线打包教程 <https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android>
- 关于appkey的问题 <https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey>

## 生成签名证书

```shell
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
```

其中:

- testalias是证书别名，可修改为自己想设置的字符，建议使用英文字母和数字
- test.keystore是证书文件名称，可修改为自己想设置的文件名称，也可以指定完整文件路径
- 36500是证书的有效期，表示100年有效期，单位天，建议时间设置长一点，避免证书过期

```text
Enter keystore password:  //输入证书文件密码，输入完成回车  
Re-enter new password:   //再次输入证书文件密码，输入完成回车  
What is your first and last name?  
  [Unknown]:  //输入名字和姓氏，输入完成回车  
What is the name of your organizational unit?  
  [Unknown]:  //输入组织单位名称，输入完成回车  
What is the name of your organization?  
  [Unknown]:  //输入组织名称，输入完成回车  
What is the name of your City or Locality?  
  [Unknown]:  //输入城市或区域名称，输入完成回车  
What is the name of your State or Province?  
  [Unknown]:  //输入省/市/自治区名称，输入完成回车  
What is the two-letter country code for this unit?  
  [Unknown]:  //输入国家/地区代号（两个字母），中国为CN，输入完成回车  
Is CN=XX, OU=XX, O=XX, L=XX, ST=XX, C=XX correct?  
  [no]:  //确认上面输入的内容是否正确，输入y，回车  

Enter key password for <testalias>  
        (RETURN if same as keystore password):  //确认证书密码与证书文件密码一样（HBuilder|HBuilderX要求这两个密码一致），直接回车就可以
```

### 查看证书信息

```shell
keytool -list -v -keystore test.keystore  
```

### 使用android studio生成证书

菜单栏->build->generate signed apk 生成一个jks证书

## 分离abi(分开64位和32位)

在build.gradle添加

```groovy

 defaultConfig{

     splits {
         abi {
             enable true
             
    // 排除不必要的架构
 exclude 'x86','arm64-v8a'
  // 重置包含的目录
 reset()
  // 设置包含，调用前需要先用 reset 将默认清除
 include 'armeabi-v7a', 'x86'
 
 // 是否打出包含全部的apk
 universalApk true
         }
     }
 }
```

## 常见问题

- uni-app运行环境版本和编译器版本不一致的问题<https://ask.dcloud.net.cn/article/35627>
