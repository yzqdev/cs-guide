# mc服务器开发

## 服务器下载

paper   [https://papermc.io/downloads](https://papermc.io/downloads)
​

[https://getbukkit.org/download/spigot](https://getbukkit.org/download/spigot)
服务器配置
[各种服务器](https://minecraft.fandom.com/zh/wiki/%E5%AE%9A%E5%88%B6%E6%9C%8D%E5%8A%A1%E5%99%A8)
[https://bukkit.org/](https://bukkit.org/)
[https://www.spigotmc.org/](https://www.spigotmc.org/)

api地址: [https://bukkit.windit.net/javadoc/](https://bukkit.windit.net/javadoc/)

教程: [https://plgdev.xuogroup.top/#/](https://plgdev.xuogroup.top/#/)
​

基岩版下载地址:   [https://klpbbs.com/](https://klpbbs.com/)

下载服务端    [https://minecraftversion.net/](https://minecraftversion.net/)
[https://dev.bukkit.org/bukkit-plugins](https://dev.bukkit.org/bukkit-plugins)
​

​

[https://www.spigotmc.org/resources/](https://www.spigotmc.org/resources/)
​

vault地址   [https://github.com/MilkBowl/Vault/blob/master/pom.xml](https://github.com/MilkBowl/Vault/blob/master/pom.xml)
这里依赖有问题
[https://blog.csdn.net/liu_xue_xue/article/details/107544299](https://blog.csdn.net/liu_xue_xue/article/details/107544299)
​

## 插件管理工具

yum和plugmanx
​

- yum :   [https://ci.yumc.pw/job/Minecraft/job/Yum/](https://ci.yumc.pw/job/Minecraft/job/Yum/)
- plugmanx   [https://www.spigotmc.org/resources/plugmanx.88135/](https://www.spigotmc.org/resources/plugmanx.88135/)
- motd工具   [https://www.spigotmc.org/resources/advancednmotd-let-your-motd-smile.58677/](https://www.spigotmc.org/resources/advancednmotd-let-your-motd-smile.58677/)

## 使用spigotapi

maven3.8.1阻止了非https地址的接入
[https://stackoverflow.com/questions/67833372/getting-blocked-mirror-for-repositories-maven-error-even-after-adding-mirrors](https://stackoverflow.com/questions/67833372/getting-blocked-mirror-for-repositories-maven-error-even-after-adding-mirrors)
所有有些repository无法使用
需要在setting.xml添加

```xml
  <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>*,!papermc-repo,!spigotmc-repo,!placeholderapi,!citizens-repo,!jitpack.io,!dmulloy2-repo</mirrorOf>
            <name>阿里云公共仓库</name>
           
            <url>https://maven.aliyun.com/repository/public</url>
        </mirror>
```

看这个
[https://github.com/EssentialsX/Essentials/blob/2.x/settings.gradle.kts](https://github.com/EssentialsX/Essentials/blob/2.x/settings.gradle.kts)
在pom.xml添加

```xml
 <repository>
   <id>spigot-repo</id>
   <url>https://hub.spigotmc.org/nexus/content/groups/public/</url>
  </repository>
        
<dependency>
            <groupId>org.spigotmc</groupId>
            <artifactId>spigot-api</artifactId>
            <version>1.18.1-R0.1-SNAPSHOT</version>
            <scope>provided</scope>
            <exclusions>
                <exclusion>
                    <groupId>com.google.code.gson</groupId>
                    <artifactId>gson</artifactId>
                </exclusion>
                <exclusion>
                    <groupId>com.google.guava</groupId>
                    <artifactId>guava</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
            
<dependency>
      <dependency>
            <groupId>org.bukkit</groupId>
            <artifactId>bukkit</artifactId>
            <version>1.14.4-R0.1-SNAPSHOT</version>
        </dependency>
  </dependency>
```

## Vaultapi

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
<dependencies>
    <dependency>
        <groupId>com.github.MilkBowl</groupId>
        <artifactId>VaultAPI</artifactId>
        <version>1.7</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

## protocolLib

[https://github.com/dmulloy2/ProtocolLib/](https://github.com/dmulloy2/ProtocolLib/)
