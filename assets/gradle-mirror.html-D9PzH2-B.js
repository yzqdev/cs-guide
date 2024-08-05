import{_ as e,c as n,o,d as t}from"./app-CbULZrmi.js";const r={},l=t(`<h1 id="gradle添加镜像源" tabindex="-1"><a class="header-anchor" href="#gradle添加镜像源"><span>gradle添加镜像源</span></a></h1><p>添加镜像源 参见阿里云的依赖教程 <a href="https://maven.aliyun.com/mvn/guide" target="_blank" rel="noopener noreferrer">https://maven.aliyun.com/mvn/guide</a></p><h2 id="全局镜像源" tabindex="-1"><a class="header-anchor" href="#全局镜像源"><span>全局镜像源</span></a></h2><h2 id="dependencyresolutionmanagement-gradle7使用" tabindex="-1"><a class="header-anchor" href="#dependencyresolutionmanagement-gradle7使用"><span>dependencyResolutionManagement(gradle7使用)</span></a></h2><p>在<code>.gradle</code>文件夹添加下面这个<code>&lt;UserDir&gt;/.gradle/init.d/init.gradle.kts</code>:</p><pre><code class="language-kotlin"> 
val urlMappings1 = mapOf(
    &quot;https://repo.maven.apache.org/maven2&quot; to &quot;https://maven.aliyun.com/repository/public/&quot;,
    &quot;https://dl.google.com/dl/android/maven2&quot; to &quot;https://maven.aliyun.com/repository/google/&quot;,
    &quot;https://plugins.gradle.org/m2&quot; to &quot;https://maven.aliyun.com/repository/gradle-plugin/&quot;
)
val urlMappings  = mapOf(
    &quot;https://repo.maven.apache.org/maven2&quot; to &quot;https://mirrors.tencent.com/nexus/repository/maven-public/&quot;,
    &quot;https://dl.google.com/dl/android/maven2&quot; to &quot;https://mirrors.tencent.com/nexus/repository/maven-public/&quot;,
    &quot;https://plugins.gradle.org/m2&quot; to &quot;https://mirrors.tencent.com/nexus/repository/gradle-plugins/&quot;
)
fun RepositoryHandler.enableMirror() {
    all {
        if (this is MavenArtifactRepository) {
            val originalUrl = this.url.toString().removeSuffix(&quot;/&quot;)
            urlMappings[originalUrl]?.let {
                logger.lifecycle(&quot;Repository[$url] is mirrored to $it&quot;)
                this.setUrl(it)
            }
        }
    }
}
gradle.allprojects {
    buildscript {
        repositories.enableMirror()
    }
    repositories.enableMirror()
}

gradle.beforeSettings { 
    pluginManagement.repositories.enableMirror()
    dependencyResolutionManagement.repositories.enableMirror()
}

 
</code></pre><h2 id="修改单个项目" tabindex="-1"><a class="header-anchor" href="#修改单个项目"><span>修改单个项目</span></a></h2><p>需要在根路径的<code>setting.gradle</code>添加</p><pre><code class="language-kotlin">pluginManagement {
    repositories {
        gradlePluginPortal()
        maven { url &#39;https://jitpack.io&#39; }
        google()
        mavenCentral()
        
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
         maven { url &#39;https://jitpack.io&#39; }
        google()
        mavenCentral()
    
    }
}

</code></pre><h2 id="配置国内镜像-低于gradle7" tabindex="-1"><a class="header-anchor" href="#配置国内镜像-低于gradle7"><span>配置国内镜像(低于gradle7)</span></a></h2><p><a href="https://doc.nju.edu.cn/books/35f4a/page/gradle" target="_blank" rel="noopener noreferrer">https://doc.nju.edu.cn/books/35f4a/page/gradle</a> 第一种</p><pre><code class="language-groovy">
settingsEvaluated { settings -&gt;
    settings.dependencyResolutionManagement {
        repositories {
            maven {
            url &quot;https://maven.aliyun.com/repository/public&quot;
        }
        google {
            url &quot;https://maven.aliyun.com/repository/google&quot;
        }
        }
    }
}
allprojects {
    repositories {
        maven {
            url &quot;https://maven.aliyun.com/repository/public&quot;
        }
        google {
            url &quot;https://maven.aliyun.com/repository/google&quot;
        }
    }

    buildscript {
        repositories {
            maven {
                url &quot;https://maven.aliyun.com/repository/public&quot;
            }
            google {
                url &quot;https://maven.aliyun.com/repository/google&quot;
            }
        }
    }
}

</code></pre><p>第二种</p><pre><code class="language-groovy">
def repoConfig = {
    all { ArtifactRepository repo -&gt;
        if (repo instanceof MavenArtifactRepository) {
            def url = repo.url.toString()
            if (url.contains(&#39;maven.org&#39;)||url.contains(&quot;maven.apache.org&quot;) || url.startsWith(&#39;https://jcenter.bintray.com/&#39;)||url.contains(&#39;dl.google.com&#39;)) {
                println &quot;gradle init: (\${repo.name}: \${repo.url}) removed&quot;
                println(&quot;(\${repo.name}: \${repo.url})已被移除&quot;)
                remove repo
            }
        }
    }
    // maven { url &#39;http://mirrors.cloud.tencent.com/nexus/repository/maven-public/&#39; }
    maven { url &#39;https://maven.aliyun.com/repository/central&#39; }
    maven { url &#39;https://maven.aliyun.com/repository/jcenter&#39; }
    maven { url &#39;https://maven.aliyun.com/repository/google&#39; }
    maven { url &#39;https://maven.aliyun.com/repository/gradle-plugin&#39; }
    maven{
        url &quot;https://jitpack.io&quot;
    }
}

allprojects {
    buildscript {
        repositories repoConfig
    }
    repositories repoConfig
}

</code></pre><p>或者</p><pre><code class="language-groovy">gradle.projectsLoaded {
    rootProject.allprojects {
        buildscript {
            repositories {
                def JCENTER_URL = &#39;https://maven.aliyun.com/repository/public&#39;
                def GOOGLE_URL = &#39;https://maven.aliyun.com/repository/google&#39;
                def NEXUS_URL = &#39;https://maven.aliyun.com/repository/central&#39;
                all { ArtifactRepository repo -&gt;
                    if (repo instanceof MavenArtifactRepository) {
                        def url = repo.url.toString()
                        if (url.startsWith(&#39;https://jcenter.bintray.com/&#39;)) {
                            project.logger.lifecycle &quot;Repository \${repo.url} replaced by $JCENTER_URL.&quot;
                            println(&quot;buildscript \${repo.url} replaced by $JCENTER_URL.&quot;)
                            remove repo
                        }
                        else if (url.startsWith(&#39;https://dl.google.com/dl/android/maven2/&#39;)) {
                            project.logger.lifecycle &quot;Repository \${repo.url} replaced by $GOOGLE_URL.&quot;
                            println(&quot;buildscript \${repo.url} replaced by $GOOGLE_URL.&quot;)
                            remove repo
                        }
                        else if (url.startsWith(&#39;https://repo1.maven.org/maven2&#39;)) {
                            project.logger.lifecycle &quot;Repository \${repo.url} replaced by $REPOSITORY_URL.&quot;
                            println(&quot;buildscript \${repo.url} replaced by $REPOSITORY_URL.&quot;)
                            remove repo
                        }
                    }
                }
                jcenter {
                    url JCENTER_URL
                }
                google {
                    url GOOGLE_URL
                }
                maven {
                    url NEXUS_URL
                }
            }
        }
        repositories {
            def JCENTER_URL = &#39;https://maven.aliyun.com/repository/public&#39;
            def GOOGLE_URL = &#39;https://maven.aliyun.com/repository/google&#39;
            def NEXUS_URL = &#39;https://maven.aliyun.com/repository/central&#39;
            all { ArtifactRepository repo -&gt;
                if (repo instanceof MavenArtifactRepository) {
                    def url = repo.url.toString()
                    if (url.startsWith(&#39;https://jcenter.bintray.com/&#39;)) {
                        project.logger.lifecycle &quot;Repository \${repo.url} replaced by $JCENTER_URL.&quot;
                        println(&quot;buildscript \${repo.url} replaced by $JCENTER_URL.&quot;)
                        remove repo
                    }
                    else if (url.startsWith(&#39;https://dl.google.com/dl/android/maven2/&#39;)) {
                        project.logger.lifecycle &quot;Repository \${repo.url} replaced by $GOOGLE_URL.&quot;
                        println(&quot;buildscript \${repo.url} replaced by $GOOGLE_URL.&quot;)
                        remove repo
                    }
                    else if (url.startsWith(&#39;https://repo1.maven.org/maven2&#39;)) {
                        project.logger.lifecycle &quot;Repository \${repo.url} replaced by $REPOSITORY_URL.&quot;
                        println(&quot;buildscript \${repo.url} replaced by $REPOSITORY_URL.&quot;)
                        remove repo
                    }
                }
            }
            jcenter {
                url JCENTER_URL
            }
            google {
                url GOOGLE_URL
            }
            maven {
                url NEXUS_URL
            }
        }
    }
}
</code></pre><h2 id="groovy-dsl转kotlin-dsl" tabindex="-1"><a class="header-anchor" href="#groovy-dsl转kotlin-dsl"><span>groovy dsl转kotlin dsl</span></a></h2><p><a href="https://docs.gradle.org/current/userguide/migrating_from_groovy_to_kotlin_dsl.html" target="_blank" rel="noopener noreferrer">https://docs.gradle.org/current/userguide/migrating_from_groovy_to_kotlin_dsl.html</a></p>`,18),a=[l];function i(p,s){return o(),n("div",null,a)}const d=e(r,[["render",i],["__file","gradle-mirror.html.vue"]]),c=JSON.parse('{"path":"/kotlin-tutor/gradle/gradle-mirror.html","title":"gradle添加镜像源","lang":"zh-CN","frontmatter":{"description":"gradle添加镜像源 添加镜像源 参见阿里云的依赖教程 https://maven.aliyun.com/mvn/guide 全局镜像源 dependencyResolutionManagement(gradle7使用) 在.gradle文件夹添加下面这个<UserDir>/.gradle/init.d/init.gradle.kts: 修改单个项目...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/kotlin-tutor/gradle/gradle-mirror.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"gradle添加镜像源"}],["meta",{"property":"og:description","content":"gradle添加镜像源 添加镜像源 参见阿里云的依赖教程 https://maven.aliyun.com/mvn/guide 全局镜像源 dependencyResolutionManagement(gradle7使用) 在.gradle文件夹添加下面这个<UserDir>/.gradle/init.d/init.gradle.kts: 修改单个项目..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-05T15:16:51.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-01-05T15:16:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gradle添加镜像源\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-01-05T15:16:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"全局镜像源","slug":"全局镜像源","link":"#全局镜像源","children":[]},{"level":2,"title":"dependencyResolutionManagement(gradle7使用)","slug":"dependencyresolutionmanagement-gradle7使用","link":"#dependencyresolutionmanagement-gradle7使用","children":[]},{"level":2,"title":"修改单个项目","slug":"修改单个项目","link":"#修改单个项目","children":[]},{"level":2,"title":"配置国内镜像(低于gradle7)","slug":"配置国内镜像-低于gradle7","link":"#配置国内镜像-低于gradle7","children":[]},{"level":2,"title":"groovy dsl转kotlin dsl","slug":"groovy-dsl转kotlin-dsl","link":"#groovy-dsl转kotlin-dsl","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1704467811000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.55,"words":465},"filePathRelative":"kotlin-tutor/gradle/gradle-mirror.md","localizedDate":"2023年6月25日","autoDesc":true}');export{d as comp,c as data};
