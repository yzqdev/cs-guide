# mc mod开发

配置根目录build.gradle

```groovy
plugins {
    id 'idea'
}

allprojects {
    idea {
        module {
            downloadSources = true
            downloadJavadoc = true
        }
    }
    getLayout().getBuildDirectory().set(new File(rootDir, "build/${path.replace(':', '/')}"))
}

```

gradle开发配置neoforge代理 在gradle.properties

```
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=7897
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=7897
systemProp.socks.proxyHost=127.0.0.1
systemProp.socks.proxyPort=7897
systemProp.http.nonProxyHosts=developer.huawei.com|maven.aliyun.com|mirrors.tencent.com|192.168.*

```

开发常用的依赖

```groovy
exclusiveContent {
        forRepository {
            maven {
                url "https://cursemaven.com"
            }
        }
 forRepositories(fg.repository) 
        filter {
            includeGroup "curse.maven"
        }
    }
    exclusiveContent {
        forRepository {
            maven {
                name = "Modrinth"
                url = "https://api.modrinth.com/maven"
            }
        }
        forRepositories(fg.repository) // Only add this if you're using ForgeGradle, otherwise remove this line
        filter {
            includeGroup "maven.modrinth"
        }
    }



    runtimeOnly(fg.deobf("maven.modrinth:citadel:2.6.0"))
    runtimeOnly(fg.deobf("maven.modrinth:touhou-little-maid:xGnD0Rlf"))
    runtimeOnly(fg.deobf("curse.maven:catalogue-459701:4766090"))
      runtimeOnly(fg.deobf("maven.modrinth:modern-ui:3.11.0.1"))
        runtimeOnly(fg.deobf("maven.modrinth:collective:1.20.1-7.87-fabric+forge+neo"))
    runtimeOnly(fg.deobf("maven.modrinth:superflat-world-no-slimes:1.20.1-3.4-fabric+forge+neo"))
    runtimeOnly(fg.deobf("maven.modrinth:domestication-innovation:1.7.1"))
    runtimeOnly(fg.deobf("maven.modrinth:curios:5.11.0+1.20.1"))
    runtimeOnly(fg.deobf("maven.modrinth:jade:11.12.2+forge"))
    runtimeOnly(fg.deobf("maven.modrinth:carry-on:2.1.2.7"))
    runtimeOnly(fg.deobf("maven.modrinth:neat:1.20.1-41-forge"))
    runtimeOnly(fg.deobf("maven.modrinth:embeddium:0.3.31+mc1.20.1"))
    runtimeOnly(fg.deobf("maven.modrinth:oculus:1.20.1-1.7.0"))
    runtimeOnly(fg.deobf("maven.modrinth:xaeros-minimap:24.6.1_Forge_1.20"))
    runtimeOnly(fg.deobf("maven.modrinth:xaeros-world-map:1.39.0_Forge_1.20"))

```

fabric常用依赖

```groovy

repositories{
 maven {
  name = 'ParchmentMC'
  url = 'https://maven.parchmentmc.org'
 }
 maven {
  name = "Terraformers"
  url = "https://maven.terraformersmc.com/"
 }
 // Add repositories to retrieve artifacts from in here.
 // You should only use this when depending on other mods because
 // Loom adds the essential maven repositories to download Minecraft and libraries from automatically.
 // See https://docs.gradle.org/current/userguide/declaring_repositories.html
 // for more information about repositories.
 maven {
  name = 'GeckoLib'
  url 'https://dl.cloudsmith.io/public/geckolib3/geckolib/maven/'
  content {
   includeGroupByRegex("software\\.bernie.*")
   includeGroup("com.eliotlash.mclib")
  }
 }
 maven {
  url "https://cursemaven.com"

  content {
   includeGroup "curse.maven"
  }
 }


 exclusiveContent {
  forRepository {
   maven {
    name = "Modrinth"
    url = "https://api.modrinth.com/maven"
   }
  }
  filter {
   includeGroup "maven.modrinth"
  }
 }
}
loom {

 runs {
  client{
   vmArgs "-XX:+AllowEnhancedClassRedefinition"
   client()
  }
 }

}

dependencies {

 // To change the versions see the gradle.properties file
 minecraft "com.mojang:minecraft:${project.minecraft_version}"
 mappings loom.layered() {
  officialMojangMappings()
  parchment("org.parchmentmc.data:parchment-1.20.1:2023.09.03@zip")
 }

 modImplementation("com.terraformersmc:modmenu:${project.modmenu_version}")
 // https://mvnrepository.com/artifact/com.github.ben-manes.caffeine/caffeine
 implementation 'com.github.ben-manes.caffeine:caffeine:3.1.8'

 modRuntimeOnly("maven.modrinth:modern-ui:lzpOpVRz")
 modRuntimeOnly("maven.modrinth:forge-config-api-port:v8.0.1-1.20.1-Fabric")
 modRuntimeOnly("maven.modrinth:sodium:mc1.20.1-0.5.11")
 modRuntimeOnly("maven.modrinth:jade:11.12.0+fabric")
 modRuntimeOnly("maven.modrinth:carry-on:Mkla4B3q")

 modImplementation "net.fabricmc:fabric-loader:${project.loader_version}"

 // Fabric API. This is technically optional, but you probably want it anyway.
 modImplementation "net.fabricmc.fabric-api:fabric-api:${project.fabric_version}"
}

```

## 添加本地依赖

必须

```
flatDir{
    dir "libs"
}
```

然后添加依赖

```kts
runtimeOnly( fg.deobf("libs:curtain:mc1.20.1-1.3.2"))
runtimeOnly( fg.deobf("libs:femalesound:1.0.0"))
  // Example mod dependency using a mod jar from ./libs with a flat dir repository
    // This maps to ./libs/coolmod-${mc_version}-${coolmod_version}.jar
    // The group id is ignored when searching -- in this case, it is "blank"
    // implementation fg.deobf("blank:coolmod-${mc_version}:${coolmod_version}")

```

下面是错误的

1. 直接放到mods文件夹,不行,因为开发环境使用的是没有混淆过的代码
2. runtimeOnly( files("libs/curtain-mc1.20.1-1.3.2.jar"))不行,这里无法使用

## forge使用私有仓库

forge使用私有仓库

需要更改这里

```
   if (gradle.startParameter.taskNames.get(0)=="build"){
        finalizedBy 'reobfJar'
    }
```

只有build的时候才混淆代码
然后就可以在dependency里面写

```
runtimeOnly( "com.yzqdev.mod:femalesound:latest.release")
```
