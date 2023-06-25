# 发布应用程序
  
  Android应用程序发布是一个让你的Android应用程序对用户可用的过程。发布是Android应用程序开发过程的最后一个阶段。
  
  开发并全面测试了Android应用程序之后，您就可以开始使用Google Play（著名的Android市场）或者其他的应用市场免费销售或分发。您还可以通过将应用程序直接发送给用户或让用户从您自己的网站下载它们来发布应用程序。您可以在Android官方网站上查看详细的发布过程，但是本教程将引导您完成一些简单的步骤，以便在Google Play上启动您的应用程序。这是一个简化的检查清单，可帮助您启动Android应用程序-
  
  | 分发流程                     | 说明                                                                                                                                                                                                                        |
  | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **回归测试**                 | 在发布应用程序之前，您需要确保它在所定位的所有设备上都满足所有Android应用程序的基本质量要求。因此，请在不同的设备（包括手机和平板电脑）上执行所有必需的测试。                                                               |
  | **应用程序分级**             | 当您要在Google Play上发布应用程序时，必须为应用程序指定内容分级，以告知Google Play用户其成熟度级别。当前可用的评级是(a) Everyone (b) Low maturity (c) Medium maturity (d) High maturity。                                   |
  | **目标地区**                 | Google Play可让您控制将您的应用出售的国家和地区。因此，您必须注意根据目标区域设置时区，本地化或任何其他特定要求。                                                                                                           |
  | **应用程序大小**             | 当前，在Google Play上发布的APK的最大大小为50 MB。如果您的应用超出了该大小，或者您想提供二次下载，则可以使用APK扩展文件，Google Play将免费在其服务器基础结构上托管APK扩展文件，并自动处理向设备的下载。                      |
  | **SDK和屏幕兼容性**          | 重要的是要确保您的应用程序设计为在要定位的Android平台版本和设备屏幕尺寸上正确运行。                                                                                                                                         |
  | **应用程序定价**             | 确定您的应用程序是免费还是付费很重要，因为在Google Play上，免费应用程序必须保持免费。如果要出售您的应用程序，则必须以其他货币指定其价格。                                                                                   |
  | **促销内容**                 | 提供各种高质量的图形资产来展示您的应用程序或品牌是一种良好的营销习惯。发布后，这些内容就会显示在您的产品详细信息页面，商店列表和搜索结果以及其他地方。                                                                      |
  | **构建并上传准备**           | 发布的APK您可以将准备发布的APK上传到开发者控制台并分发给用户。您可以检查有关如何创建应用程序的可发布版本的完整详细信息：准备发布。                                                                                          |
  | **最终确定应用程序详细信息** | Google Play提供了多种方法来推广您的应用程序，并在产品详细信息页面上与用户互动，从彩色图形，屏幕截图和视频到本地化说明，发布详细信息以及指向其他应用程序的链接。因此，您可以装饰您的应用程序页面，并提供尽可能多的清晰细节。 |
  
## 导出Android应用程序
  
  ![](https://www.jc2182.com/images/android/relaseapp1.jpg)
  
  导出应用之前，您必须先使用一些工具::
  
- **Dx工具**（Dalvik可执行工具）：它会将.class文件转换为.dex文件。它对内存优化和减少启动速度时间很有用。
- **AAPT**（Android辅助打包工具）：将.Dex文件转换为.Apk很有用。
- **APK** （Android包装工具包）：部署过程的最后阶段称为.apk。
  
  您需要先将应用程序导出为APK（Android软件包）文件，然后再将其上传到Google Play市场。 要导出应用程序，只需在Android Studio中打开该应用程序项目，然后从Android Studio中选择Build→Generate Signed APK，然后按照简单的步骤导出应用程序
  
  ![](https://www.jc2182.com/images/android/deployapp1.png)
  
  接下来，选择“APK”选项，如上面的屏幕截图所示
  
  ![](https://www.jc2182.com/images/android/deployapp2.png)
  
  下一步
  
  ![](https://www.jc2182.com/images/android/deployapp3.png)
  
  选择release 选择签名版本， 然后finish
  
  ![](https://www.jc2182.com/images/android/deployapp4.png)
  
  最后，它将生成您的Android应用程序作为APK格式文件保存到release文件夹下面，并将其上传到各个应用市场。
  
## 应用程序手动签名打包
  
  上面的是Android Studio的图形界面自动打包，下面介绍一些手动打包的过程。
  
  您不需要Android Studio即可对您的应用进行签名。您可以使用Android SDK和JDK中的标准工具从命令行对应用程序进行签名。从命令行以发布模式对应用程序进行签名-
  
  1,使用keytool生成私钥
  
```t4
  $ keytool -genkey -v -keystore my-release-key.keystore
  -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```
  
  2,在发布模式下编译您的应用以获取未签名的APK
  
  3,使用[jarsigner](https://docs.oracle.com/javase/6/docs/technotes/tools/windows/jarsigner.html)使用私钥对应用程序签名
  
```t4
  $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1
  -keystore my-release-key.keystore my_application.apk alias_name
```
  
  4,确认您的APK已签名。例如-
  
```t4
  jarsigner -verify -verbose -certs my_application.apk
```
  
  5,使用[zipalign](https://developer.android.com/studio/command-line/zipalign)对齐最终的APK包。
  
```t4
  zipalign -v 4 your_project_name-unaligned.apk your_project_name.apk![](https://www.jc2182.com/images/android/call2.png)
```
