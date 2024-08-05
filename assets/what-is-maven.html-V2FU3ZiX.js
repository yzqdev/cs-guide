import{_ as t,c as n,o as e,d as l}from"./app-CbULZrmi.js";const g={},i=l(`<h1 id="maven总述" tabindex="-1"><a class="header-anchor" href="#maven总述"><span>maven总述</span></a></h1><p>maven的配置文件settings.xml存在于两个地方：</p><ul><li>安装的地方：<code>\${M2_HOME}/conf/settings.xml</code></li><li>用户的目录：<code>\${user.home}/.m2/settings.xml</code></li></ul><p>前者又被叫做<strong>全局配置</strong>，对操作系统的所有使用者生效；后者被称为<strong>用户配置</strong>，只对当前操作系统的使用者生效。如果两者都存在，它们的内容将被合并，并且用户范围的settings.xml会覆盖全局的settings.xml。</p><p>Maven安装后，用户目录下不会自动生成settings.xml，只有全局配置文件。如果需要创建用户范围的settings.xml，可以将安装路径下的settings复制到目录<code>\${user.home}/.m2/</code>。Maven默认的settings.xml是一个包含了注释和例子的模板，可以快速的修改它来达到你的要求。</p><p>全局配置一旦更改，所有的用户都会受到影响，而且如果maven进行升级，所有的配置都会被清除，所以要提前复制和备份<code>\${M2_HOME}/conf/settings.xml</code>文件，一般情况下不推荐配置全局的settings.xml。</p><p>下面的配置文件对各个节点的含义及作用都有注解。实际应用中，经常使用的是<code>&lt;localRepository&gt;</code>、<code>&lt;servers&gt;</code>、<code>&lt;mirrors&gt;</code>、<code>&lt;profiles&gt;</code>有限几个节点，其他节点使用默认值足够应对大部分的应用场景。</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;settings
    xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot;
    xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;      xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd&quot;&gt;

    &lt;!--本地仓库。该值表示构建系统本地仓库的路径。其默认值为\${user.home}/.m2/repository。  --&gt;
    &lt;localRepository&gt;usr/local/maven&lt;/localRepository&gt;

    &lt;!--Maven是否需要和用户交互以获得输入。如果Maven需要和用户交互以获得输入，则设置成true，反之则应为false。默认为true。 --&gt;
    &lt;interactiveMode&gt;true&lt;/interactiveMode&gt;

    &lt;!--Maven是否需要使用plugin-registry.xml文件来管理插件版本。        如果设置为true，则在{user.home}/.m2下需要有一个plugin-registry.xml来对plugin的版本进行管理        默认为false。 --&gt;
    &lt;usePluginRegistry&gt;false&lt;/usePluginRegistry&gt;

    &lt;!--表示Maven是否需要在离线模式下运行。如果构建系统需要在离线模式下运行，则为true，默认为false。        当由于网络设置原因或者安全因素，构建服务器不能连接远程仓库的时候，该配置就十分有用。  --&gt;
    &lt;offline&gt;false&lt;/offline&gt;

    &lt;!--当插件的组织Id（groupId）没有显式提供时，供搜寻插件组织Id（groupId）的列表。        该元素包含一个pluginGroup元素列表，每个子元素包含了一个组织Id（groupId）。        当我们使用某个插件，并且没有在命令行为其提供组织Id（groupId）的时候，Maven就会使用该列表。        默认情况下该列表包含了org.apache.maven.plugins。 --&gt;

    &lt;pluginGroups&gt;
        &lt;!--plugin的组织Id（groupId）--&gt;
        &lt;pluginGroup&gt;org.codehaus.mojo&lt;/pluginGroup&gt;
    &lt;/pluginGroups&gt;

    &lt;!--用来配置不同的代理，多代理profiles可以应对笔记本或移动设备的工作环境：通过简单的设置profile id就可以很容易的更换整个代理配置 --&gt;
    &lt;proxies&gt;
        &lt;!--代理元素包含配置代理时需要的信息 --&gt;
        &lt;proxy&gt;
            &lt;!--代理的唯一定义符，用来区分不同的代理元素。 --&gt;
            &lt;id&gt;myproxy&lt;/id&gt;
            &lt;!--该代理是否是激活的那个。true则激活代理。当我们声明了一组代理，而某个时候只需要激活一个代理的时候，该元素就可以派上用处 --&gt;
            &lt;active&gt;true&lt;/active&gt;
            &lt;!--代理的协议。 协议://主机名:端口，分隔成离散的元素以方便配置。 --&gt;
            &lt;protocol&gt;http://…&lt;/protocol&gt;
            &lt;!--代理的主机名。协议://主机名:端口，分隔成离散的元素以方便配置。   --&gt;
            &lt;host&gt;proxy.somewhere.com&lt;/host&gt;
            &lt;!--代理的端口。协议://主机名:端口，分隔成离散的元素以方便配置。  --&gt;
            &lt;port&gt;8080&lt;/port&gt;
            &lt;!--代理的用户名，用户名和密码表示代理服务器认证的登录名和密码。  --&gt;
            &lt;username&gt;proxyuser&lt;/username&gt;
            &lt;!--代理的密码，用户名和密码表示代理服务器认证的登录名和密码。  --&gt;
            &lt;password&gt;somepassword&lt;/password&gt;
            &lt;!--不该被代理的主机名列表。该列表的分隔符由代理服务器指定；例子中使用了竖线分隔符，使用逗号分隔也很常见。 --&gt;
            &lt;nonProxyHosts&gt;*.google.com|ibiblio.org&lt;/nonProxyHosts&gt;
        &lt;/proxy&gt;
    &lt;/proxies&gt;

    &lt;!--配置服务端的一些设置。一些设置如安全证书不应该和pom.xml一起分发。这种类型的信息应该存在于构建服务器上的settings.xml文件中。 --&gt;
    &lt;servers&gt;
        &lt;!--服务器元素包含配置服务器时需要的信息  --&gt;
        &lt;server&gt;
            &lt;!--这是server的id（注意不是用户登陆的id），该id与distributionManagement中repository元素的id相匹配。 --&gt;
            &lt;id&gt;server001&lt;/id&gt;
            &lt;!--鉴权用户名。鉴权用户名和鉴权密码表示服务器认证所需要的登录名和密码。  --&gt;
            &lt;username&gt;my_login&lt;/username&gt;
            &lt;!--鉴权密码 。鉴权用户名和鉴权密码表示服务器认证所需要的登录名和密码。  --&gt;
            &lt;password&gt;my_password&lt;/password&gt;
            &lt;!--鉴权时使用的私钥位置。和前两个元素类似，私钥位置和私钥密码指定了一个私钥的路径                （默认是/home/hudson/.ssh/id_dsa）以及如果需要的话，一个密语。                将来passphrase和password元素可能会被提取到外部，但目前它们必须在settings.xml文件以纯文本的形式声明 --&gt;
            &lt;privateKey&gt;\${usr.home}/.ssh/id_dsa&lt;/privateKey&gt;
            &lt;!--鉴权时使用的私钥密码。 --&gt;
            &lt;passphrase&gt;some_passphrase&lt;/passphrase&gt;
            &lt;!--文件被创建时的权限。如果在部署的时候会创建一个仓库文件或者目录，这时候就可以使用权限（permission）。                这两个元素合法的值是一个三位数字，其对应了unix文件系统的权限，如664，或者775。  --&gt;
            &lt;filePermissions&gt;664&lt;/filePermissions&gt;
            &lt;!--目录被创建时的权限。  --&gt;
            &lt;directoryPermissions&gt;775&lt;/directoryPermissions&gt;
            &lt;!--传输层额外的配置项  --&gt;
            &lt;configuration&gt;&lt;/configuration&gt;
        &lt;/server&gt;
    &lt;/servers&gt;

    &lt;!--为仓库列表配置的下载镜像列表。  --&gt;
    &lt;mirrors&gt;
        &lt;!--给定仓库的下载镜像。  --&gt;
        &lt;mirror&gt;
            &lt;!--该镜像的唯一标识符。id用来区分不同的mirror元素。  --&gt;
            &lt;id&gt;planetmirror.com&lt;/id&gt;
            &lt;!--镜像名称  --&gt;
            &lt;name&gt;PlanetMirror Australia&lt;/name&gt;
            &lt;!--该镜像的URL。构建系统会优先考虑使用该URL，而非使用默认的服务器URL。  --&gt;
            &lt;url&gt;http://downloads.planetmirror.com/pub/maven2&lt;/url&gt;
            &lt;!--被镜像的服务器的id。例如，如果我们要设置了一个Maven中央仓库（http://repo1.maven.org/maven2）的镜像，就需要将该元素设置成central。这必须和中央仓库的id central完全一致。 --&gt;
            &lt;mirrorOf&gt;central&lt;/mirrorOf&gt;
        &lt;/mirror&gt;
    &lt;/mirrors&gt;

    &lt;!--根据环境参数来调整构建配置的列表。settings.xml中的profile元素是pom.xml中profile元素的裁剪版本。        它包含了id，activation, repositories, pluginRepositories和 properties元素。        这里的profile元素只包含这五个子元素是因为这里只关心构建系统这个整体（这正是settings.xml文件的角色定位），而非单独的项目对象模型设置。        如果一个settings中的profile被激活，它的值会覆盖任何其它定义在POM中或者profile.xml中的带有相同id的profile。  --&gt;
    &lt;profiles&gt;

        &lt;!--根据环境参数来调整的构件的配置 --&gt;
        &lt;profile&gt;
            &lt;!--该配置的唯一标识符。  --&gt;
            &lt;id&gt;test&lt;/id&gt;

            &lt;!--自动触发profile的条件逻辑。Activation是profile的开启钥匙。                如POM中的profile一样，profile的力量来自于它能够在某些特定的环境中自动使用某些特定的值；这些环境通过activation元素指定。                activation元素并不是激活profile的唯一方式。settings.xml文件中的activeProfile元素可以包含profile的id。                profile也可以通过在命令行，使用-P标记和逗号分隔的列表来显式的激活（如，-P test）。 --&gt;
            &lt;activation&gt;
                &lt;!--profile默认是否激活的标识 --&gt;
                &lt;activeByDefault&gt;false&lt;/activeByDefault&gt;
                &lt;!--activation有一个内建的java版本检测，如果检测到jdk版本与期待的一样，profile被激活。 --&gt;
                &lt;jdk&gt;1.7&lt;/jdk&gt;

                &lt;!--当匹配的操作系统属性被检测到，profile被激活。os元素可以定义一些操作系统相关的属性。 --&gt;
                &lt;os&gt;
                    &lt;!--激活profile的操作系统的名字  --&gt;
                    &lt;name&gt;Windows XP&lt;/name&gt;
                    &lt;!--激活profile的操作系统所属家族(如 &#39;windows&#39;)   --&gt;
                    &lt;family&gt;Windows&lt;/family&gt;
                    &lt;!--激活profile的操作系统体系结构   --&gt;
                    &lt;arch&gt;x86&lt;/arch&gt;
                    &lt;!--激活profile的操作系统版本 --&gt;
                    &lt;version&gt;5.1.2600&lt;/version&gt;
                &lt;/os&gt;

                &lt;!--如果Maven检测到某一个属性（其值可以在POM中通过\${名称}引用），其拥有对应的名称和值，Profile就会被激活。                    如果值字段是空的，那么存在属性名称字段就会激活profile，否则按区分大小写方式匹配属性值字段 --&gt;
                &lt;property&gt;
                    &lt;!--激活profile的属性的名称 --&gt;
                    &lt;name&gt;mavenVersion&lt;/name&gt;
                    &lt;!--激活profile的属性的值  --&gt;
                    &lt;value&gt;2.0.3&lt;/value&gt;
                &lt;/property&gt;

                &lt;!--提供一个文件名，通过检测该文件的存在或不存在来激活profile。missing检查文件是否存在，如果不存在则激活profile。                    另一方面，exists则会检查文件是否存在，如果存在则激活profile。 --&gt;
                &lt;file&gt;
                    &lt;!--如果指定的文件存在，则激活profile。  --&gt;
                    &lt;exists&gt;/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/&lt;/exists&gt;
                    &lt;!--如果指定的文件不存在，则激活profile。 --&gt;
                    &lt;missing&gt;/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/&lt;/missing&gt;
                &lt;/file&gt;
            &lt;/activation&gt;

            &lt;!--对应profile的扩展属性列表。Maven属性和Ant中的属性一样，可以用来存放一些值。这些值可以在POM中的任何地方使用标记\${X}来使用，这里X是指属性的名称。                属性有五种不同的形式，并且都能在settings.xml文件中访问。                      1. env.X: 在一个变量前加上&quot;env.&quot;的前缀，会返回一个shell环境变量。例如,&quot;env.PATH&quot;指代了$path环境变量（在Windows上是%PATH%）。                      2. project.x：指代了POM中对应的元素值。                         3. settings.x: 指代了settings.xml中对应元素的值。                      4. Java System Properties: 所有可通过java.lang.System.getProperties()访问的属性都能在POM中使用该形式访问，                       如/usr/lib/jvm/java-1.6.0-openjdk-1.6.0.0/jre。                         5. x: 在&lt;properties/&gt;元素中，或者外部文件中设置，以\${someVar}的形式使用。  --&gt;
            &lt;properties&gt;
                &lt;!-- 如果这个profile被激活，那么属性\${user.install}就可以被访问了 --&gt;
                &lt;user.install&gt;usr/local/winner/jobs/maven-guide&lt;/user.install&gt;
            &lt;/properties&gt;

            &lt;!--远程仓库列表，它是Maven用来填充构建系统本地仓库所使用的一组远程项目。  --&gt;
            &lt;repositories&gt;
                &lt;!--包含需要连接到远程仓库的信息  --&gt;
                &lt;repository&gt;
                    &lt;!--远程仓库唯一标识 --&gt;
                    &lt;id&gt;codehausSnapshots&lt;/id&gt;
                    &lt;!--远程仓库名称  --&gt;
                    &lt;name&gt;Codehaus Snapshots&lt;/name&gt;

                    &lt;!--如何处理远程仓库里发布版本的下载 --&gt;
                    &lt;releases&gt;
                        &lt;!--true或者false表示该仓库是否为下载某种类型构件（发布版，快照版）开启。   --&gt;
                        &lt;enabled&gt;false&lt;/enabled&gt;
                        &lt;!--该元素指定更新发生的频率。Maven会比较本地POM和远程POM的时间戳。这里的选项是：                            always（一直），daily（默认，每日），interval：X（这里X是以分钟为单位的时间间隔），或者never（从不）。  --&gt;
                        &lt;updatePolicy&gt;always&lt;/updatePolicy&gt;
                        &lt;!--当Maven验证构件校验文件失败时该怎么做:                            ignore（忽略），fail（失败），或者warn（警告）。 --&gt;
                        &lt;checksumPolicy&gt;warn&lt;/checksumPolicy&gt;
                    &lt;/releases&gt;

                    &lt;!--如何处理远程仓库里快照版本的下载。有了releases和snapshots这两组配置，POM就可以在每个单独的仓库中，为每种类型的构件采取不同的策略。                        例如，可能有人会决定只为开发目的开启对快照版本下载的支持。参见repositories/repository/releases元素 --&gt;
                    &lt;snapshots&gt;
                        &lt;enabled /&gt;
                        &lt;updatePolicy /&gt;
                        &lt;checksumPolicy /&gt;
                    &lt;/snapshots&gt;

                    &lt;!--远程仓库URL，按protocol://hostname/path形式  --&gt;
                    &lt;url&gt;http://snapshots.maven.codehaus.org/maven2&lt;/url&gt;

                    &lt;!--用于定位和排序构件的仓库布局类型-可以是default（默认）或者legacy（遗留）。                        Maven 2为其仓库提供了一个默认的布局；然而，Maven 1.x有一种不同的布局。我们可以使用该元素指定布局是default（默认）还是legacy（遗留）。  --&gt;
                    &lt;layout&gt;default&lt;/layout&gt;
                &lt;/repository&gt;
            &lt;/repositories&gt;

            &lt;!--发现插件的远程仓库列表。仓库是两种主要构件的家。第一种构件被用作其它构件的依赖。这是中央仓库中存储的大部分构件类型。另外一种构件类型是插件。                Maven插件是一种特殊类型的构件。由于这个原因，插件仓库独立于其它仓库。pluginRepositories元素的结构和repositories元素的结构类似。                每个pluginRepository元素指定一个Maven可以用来寻找新插件的远程地址。 --&gt;
            &lt;pluginRepositories&gt;
                &lt;!--包含需要连接到远程插件仓库的信息.参见profiles/profile/repositories/repository元素的说明 --&gt;
                &lt;pluginRepository&gt;
                    &lt;releases&gt;
                        &lt;enabled /&gt;
                        &lt;updatePolicy /&gt;
                        &lt;checksumPolicy /&gt;
                    &lt;/releases&gt;
                    &lt;snapshots&gt;
                        &lt;enabled /&gt;
                        &lt;updatePolicy /&gt;
                        &lt;checksumPolicy /&gt;
                    &lt;/snapshots&gt;
                    &lt;id /&gt;
                    &lt;name /&gt;
                    &lt;url /&gt;
                    &lt;layout /&gt;
                &lt;/pluginRepository&gt;
            &lt;/pluginRepositories&gt;

            &lt;!--手动激活profiles的列表，按照profile被应用的顺序定义activeProfile。 该元素包含了一组activeProfile元素，每个activeProfile都含有一个profile id。                任何在activeProfile中定义的profile id，不论环境设置如何，其对应的 profile都会被激活。                如果没有匹配的profile，则什么都不会发生。例如，env-test是一个activeProfile，则在pom.xml（或者profile.xml）中对应id的profile会被激活。                如果运行过程中找不到这样一个profile，Maven则会像往常一样运行。  --&gt;
            &lt;activeProfiles&gt;
                &lt;activeProfile&gt;env-test&lt;/activeProfile&gt;
            &lt;/activeProfiles&gt;
        &lt;/profile&gt;
    &lt;/profiles&gt;
&lt;/settings&gt;
</code></pre><h1 id="_2、pom-xml" tabindex="-1"><a class="header-anchor" href="#_2、pom-xml"><span>2、pom.xml</span></a></h1><p>setting.xml主要用于配置maven的运行环境等一系列通用的属性，是全局级别的配置文件；而pom.xml主要描述了项目的maven坐标，依赖关系，开发者需要遵循的规则，缺陷管理系统，组织和licenses，以及其他所有的项目相关因素，是项目级别的配置文件。</p><h2 id="_2-1-基础配置" tabindex="-1"><a class="header-anchor" href="#_2-1-基础配置"><span>2.1 基础配置</span></a></h2><p>一个典型的pom.xml文件配置如下：</p><pre><code class="language-xml">&lt;project
    xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot;
    xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
    xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;

    &lt;!-- 模型版本。maven2.0必须是这样写，现在是maven2唯一支持的版本 --&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;!-- 公司或者组织的唯一标志，并且配置时生成的路径也是由此生成，        如com.winner.trade，maven会将该项目打成的jar包放本地路径：/com/winner/trade --&gt;
    &lt;groupId&gt;com.winner.trade&lt;/groupId&gt;

    &lt;!-- 本项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 --&gt;
    &lt;artifactId&gt;trade-core&lt;/artifactId&gt;

    &lt;!-- 本项目目前所处的版本号 --&gt;
    &lt;version&gt;1.0.0-SNAPSHOT&lt;/version&gt;

    &lt;!-- 打包的机制，如pom, jar, maven-plugin, ejb, war, ear, rar, par，默认为jar --&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;!-- 帮助定义构件输出的一些附属构件,附属构件与主构件对应，有时候需要加上classifier才能唯一的确定该构件            不能直接定义项目的classifer,因为附属构件不是项目直接默认生成的，而是由附加的插件帮助生成的  --&gt;
    &lt;classifier&gt;...&lt;/classifier&gt;

    &lt;!-- 定义本项目的依赖关系 --&gt;
    &lt;dependencies&gt;

        &lt;!-- 每个dependency都对应这一个jar包 --&gt;
        &lt;dependency&gt;

            &lt;!-- 一般情况下，maven是通过groupId、artifactId、version这三个元素值（俗称坐标）来检索该构件，                然后引入你的工程。如果别人想引用你现在开发的这个项目（前提是已开发完毕并发布到了远程仓库），                就需要在他的pom文件中新建一个dependency节点，将本项目的groupId、artifactId、version写入，                maven就会把你上传的jar包下载到他的本地 --&gt;
            &lt;groupId&gt;com.winner.trade&lt;/groupId&gt;
            &lt;artifactId&gt;trade-test&lt;/artifactId&gt;
            &lt;version&gt;1.0.0-SNAPSHOT&lt;/version&gt;

            &lt;!-- maven认为，程序对外部的依赖会随着程序的所处阶段和应用场景而变化，所以maven中的依赖关系有作用域(scope)的限制。                scope包含如下的取值：compile（编译范围）、provided（已提供范围）、runtime（运行时范围）、test（测试范围）、system（系统范围） --&gt;
            &lt;scope&gt;test&lt;/scope&gt;

            &lt;!-- 设置指依赖是否可选，默认为false,即子项目默认都继承:为true,则子项目必需显示的引入，与dependencyManagement里定义的依赖类似 。 --&gt;
            &lt;optional&gt;false&lt;/optional&gt;

            &lt;!-- 屏蔽依赖关系。                比如项目中使用的libA依赖某个库的1.0版，libB依赖某个库的2.0版，现在想统一使用2.0版，就应该屏蔽掉对1.0版的依赖 --&gt;
            &lt;exclusions&gt;
                &lt;exclusion&gt;
                    &lt;groupId&gt;org.slf4j&lt;/groupId&gt;
                    &lt;artifactId&gt;slf4j-api&lt;/artifactId&gt;
                &lt;/exclusion&gt;
            &lt;/exclusions&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;

    &lt;!-- 为pom定义一些常量，在pom中的其它地方可以直接引用        使用方式 如下 ：\${file.encoding} --&gt;
    &lt;properties&gt;
        &lt;file.encoding&gt;UTF-8&lt;/file.encoding&gt;
        &lt;java.source.version&gt;1.5&lt;/java.source.version&gt;
        &lt;java.target.version&gt;1.5&lt;/java.target.version&gt;
    &lt;/properties&gt;

    ...

&lt;/project&gt;
</code></pre><p>一般来说，上面的几个配置项对任何项目都是必不可少的，定义了项目的基本属性。</p><p>这里有必要对一个不太常用的属性<code>classifier</code>做一下解释，因为有时候引用某个jar包，classifier不写的话会报错。</p><p>classifier元素用来帮助定义构件输出的一些附属构件。附属构件与主构件对应，比如主构件是 kimi-app-2.0.0.jar，该项目可能还会通过使用一些插件生成 如 kimi-app-2.0.0-javadoc.jar （Java文档）、 kimi-app-2.0.0-sources.jar（Java源代码） 这样两个附属构件。这时候，javadoc、sources就是这两个附属构件的classifier，这样附属构件也就拥有了自己唯一的坐标。</p><p>classifier的用途在于:</p><ul><li>maven download javadoc / sources jar包的时候，需要借助classifier指明要下载那个附属构件</li><li>引入依赖的时候，有时候仅凭groupId、artifactId、version无法唯一的确定某个构件，需要借助classifier来进一步明确目标。比如JSON-lib，有时候会同一个版本会提供多个jar包，在JDK1.5环境下是一套，在JDK1.3环境下是一套：</li></ul><p><img src="https://upload-images.jianshu.io/upload_images/8775426-56db5d40fbb03371.png?imageMogr2/auto-orient/strip|imageView2/2/w/865/format/webp#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=w5gPQ&amp;originHeight=418&amp;originWidth=865&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt=""></p><p>1.png</p><p>引用它的时候就要注明JDK版本，否则maven不知道你到底需要哪一套jar包：</p><pre><code class="language-xml">&lt;dependency&gt;
            &lt;groupId&gt;net.sf.json-lib&lt;/groupId&gt;
            &lt;artifactId&gt;json-lib&lt;/artifactId&gt;
            &lt;version&gt;2.4&lt;/version&gt;
            &lt;classifier&gt;jdk15&lt;/classifier&gt; 
&lt;/dependency&gt;
</code></pre><h2 id="_2-2-构建配置" tabindex="-1"><a class="header-anchor" href="#_2-2-构建配置"><span>2.2 构建配置</span></a></h2><pre><code class="language-xml">&lt;build&gt;

    &lt;!-- 产生的构件的文件名，默认值是\${artifactId}-\${version}。 --&gt; 
    &lt;finalName&gt;myPorjectName&lt;/finalName&gt; 

    &lt;!-- 构建产生的所有文件存放的目录,默认为\${basedir}/target，即项目根目录下的target --&gt; 
    &lt;directory&gt;\${basedir}/target&lt;/directory&gt; 

    &lt;!-- 当项目没有规定目标（Maven2 叫做阶段（phase））时的默认值，        必须跟命令行上的参数相同例如jar:jar，或者与某个阶段（phase）相同例如install、compile等 --&gt; 
    &lt;defaultGoal&gt;install&lt;/defaultGoal&gt;

    &lt;!-- 当filtering开关打开时，使用到的过滤器属性文件列表。        项目配置信息中诸如\${spring.version}之类的占位符会被属性文件中的实际值替换掉 --&gt; 
    &lt;filters&gt;
            &lt;filter&gt;../filter.properties&lt;/filter&gt;
    &lt;/filters&gt; 

    &lt;!-- 项目相关的所有资源路径列表，例如和项目相关的配置文件、属性文件，这些资源被包含在最终的打包文件里。 --&gt; 
    &lt;resources&gt; 
        &lt;resource&gt; 

            &lt;!-- 描述了资源的目标路径。该路径相对target/classes目录（例如\${project.build.outputDirectory}）。            举个例子，如果你想资源在特定的包里(org.apache.maven.messages)，你就必须该元素设置为org/apache/maven/messages。            然而，如果你只是想把资源放到源码目录结构里，就不需要该配置。 --&gt; 
            &lt;targetPath&gt;resources&lt;/targetPath&gt; 

            &lt;!-- 是否使用参数值代替参数名。参数值取自properties元素或者文件里配置的属性，文件在filters元素里列出。 --&gt; 
            &lt;filtering&gt;true&lt;/filtering&gt; 

            &lt;!-- 描述存放资源的目录，该路径相对POM路径 --&gt; 
            &lt;directory&gt;src/main/resources&lt;/directory&gt; 

            &lt;!-- 包含的模式列表 --&gt; 
            &lt;includes&gt;  
                &lt;include&gt;**/*.properties&lt;/include&gt;  
                &lt;include&gt;**/*.xml&lt;/include&gt;  
            &lt;/includes&gt;  

            &lt;!-- 排除的模式列表                如果&lt;include&gt;与&lt;exclude&gt;划定的范围存在冲突，以&lt;exclude&gt;为准 --&gt; 
            &lt;excludes&gt;  
                &lt;exclude&gt;jdbc.properties&lt;/exclude&gt;  
                &lt;/excludes&gt; 

        &lt;/resource&gt; 
    &lt;/resources&gt; 

    &lt;!-- 单元测试相关的所有资源路径，配制方法与resources类似--&gt; 
    &lt;testResources&gt; 
        &lt;testResource&gt; 
            &lt;targetPath /&gt;&lt;filtering /&gt;&lt;directory /&gt;&lt;includes /&gt;&lt;excludes /&gt; 
        &lt;/testResource&gt; 
    &lt;/testResources&gt; 

    &lt;!-- 项目源码目录，当构建项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径。 --&gt; 
    &lt;sourceDirectory&gt;\${basedir}\\src\\main\\java&lt;/sourceDirectory&gt; 

    &lt;!-- 项目脚本源码目录，该目录和源码目录不同，        绝大多数情况下，该目录下的内容会被拷贝到输出目录(因为脚本是被解释的，而不是被编译的)。 --&gt; 
    &lt;scriptSourceDirectory&gt;\${basedir}\\src\\main\\scripts&lt;/scriptSourceDirectory&gt;

    &lt;!-- 项目单元测试使用的源码目录，当测试项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径。 --&gt; 
    &lt;testSourceDirectory&gt;\${basedir}\\src\\test\\java&lt;/testSourceDirectory&gt;

    &lt;!-- 被编译过的应用程序class文件存放的目录。 --&gt; 
    &lt;outputDirectory&gt;\${basedir}\\target\\classes&lt;/outputDirectory&gt;

    &lt;!-- 被编译过的测试class文件存放的目录。 --&gt; 
    &lt;testOutputDirectory&gt;\${basedir}\\target\\test-classes&lt;/testOutputDirectory&gt; 

    &lt;!-- 项目的一系列构建扩展,它们是一系列build过程中要使用的产品，会包含在running bulid‘s classpath里面。        他们可以开启extensions，也可以通过提供条件来激活plugins。        简单来讲，extensions是在build过程被激活的产品--&gt; 
    &lt;extensions&gt; 

        &lt;!-- 例如，通常情况下，程序开发完成后部署到线上Linux服务器，可能需要经历打包、            将包文件传到服务器、SSH连上服务器、敲命令启动程序等一系列繁琐的步骤。            实际上这些步骤都可以通过Maven的一个插件 wagon-maven-plugin 来自动完成            下面的扩展插件wagon-ssh用于通过SSH的方式连接远程服务器，            类似的还有支持ftp方式的wagon-ftp插件 --&gt; 
        &lt;extension&gt; 
            &lt;groupId&gt;org.apache.maven.wagon&lt;/groupId&gt;
            &lt;artifactId&gt;wagon-ssh&lt;/artifactId&gt;
            &lt;version&gt;2.8&lt;/version&gt;
        &lt;/extension&gt; 

    &lt;/extensions&gt; 

    &lt;!-- 使用的插件列表 。 --&gt; 
    &lt;plugins&gt; 
        &lt;plugin&gt; 
            &lt;groupId&gt;&lt;/groupId&gt;
            &lt;artifactId&gt;maven-assembly-plugin&lt;/artifactId&gt;
            &lt;version&gt;2.5.5&lt;/version&gt;

            &lt;!-- 在构建生命周期中执行一组目标的配置。每个目标可能有不同的配置。 --&gt; 
            &lt;executions&gt;
                &lt;execution&gt;

                        &lt;!-- 执行目标的标识符，用于标识构建过程中的目标，或者匹配继承过程中需要合并的执行目标 --&gt; 
                    &lt;id&gt;assembly&lt;/id&gt;

                    &lt;!-- 绑定了目标的构建生命周期阶段，如果省略，目标会被绑定到源数据里配置的默认阶段 --&gt; 
                    &lt;phase&gt;package&lt;/phase&gt;

                    &lt;!-- 配置的执行目标 --&gt; 
                    &lt;goals&gt;
                        &lt;goal&gt;single&lt;/goal&gt;
                    &lt;/goals&gt;

                    &lt;!-- 配置是否被传播到子POM --&gt; 
                    &lt;inherited&gt;false&lt;/inherited&gt; 

                &lt;/execution&gt;
            &lt;/executions&gt;

            &lt;!-- 作为DOM对象的配置,配置项因插件而异 --&gt;
            &lt;configuration&gt;
                &lt;finalName&gt;\${finalName}&lt;/finalName&gt;
                &lt;appendAssemblyId&gt;false&lt;/appendAssemblyId&gt;
                &lt;descriptor&gt;assembly.xml&lt;/descriptor&gt;
            &lt;/configuration&gt;

            &lt;!-- 是否从该插件下载Maven扩展（例如打包和类型处理器），                由于性能原因，只有在真需要下载时，该元素才被设置成true。 --&gt; 
            &lt;extensions&gt;false&lt;/extensions&gt; 

            &lt;!-- 项目引入插件所需要的额外依赖 --&gt; 
            &lt;dependencies&gt; 
                &lt;dependency&gt;...&lt;/dependency&gt; 
            &lt;/dependencies&gt; 

            &lt;!-- 任何配置是否被传播到子项目 --&gt; 
            &lt;inherited&gt;true&lt;/inherited&gt;

        &lt;/plugin&gt; 
    &lt;/plugins&gt; 

    &lt;!-- 主要定义插件的共同元素、扩展元素集合，类似于dependencyManagement，        所有继承于此项目的子项目都能使用。该插件配置项直到被引用时才会被解析或绑定到生命周期。        给定插件的任何本地配置都会覆盖这里的配置 --&gt; 
    &lt;pluginManagement&gt; 
        &lt;plugins&gt;...&lt;/plugins&gt;
    &lt;/pluginManagement&gt;

&lt;/build&gt;
</code></pre><p>pom里面的仓库与setting.xml里的仓库功能是一样的。主要的区别在于，pom里的仓库是个性化的。比如一家大公司里的setting文件是公用的，所有项目都用一个setting文件，但各个子项目却会引用不同的第三方库，所以就需要在pom里设置自己需要的仓库地址。</p><h2 id="_2-3-分发配置" tabindex="-1"><a class="header-anchor" href="#_2-3-分发配置"><span>2.3 分发配置</span></a></h2><pre><code class="language-xml">&lt;!-- 项目分发信息，在执行mvn deploy后表示要发布的位置。    有了这些信息就可以把网站部署到远程服务器或者把构件部署到远程仓库。 --&gt; 
&lt;distributionManagement&gt; 

    &lt;!-- 部署项目产生的构件到远程仓库需要的信息 --&gt; 
    &lt;repository&gt; 

        &lt;!-- 是分配给快照一个唯一的版本号（由时间戳和构建流水号），还是每次都使用相同的版本号            参见repositories/repository元素 --&gt; 
        &lt;uniqueVersion&gt;true&lt;/uniqueVersion&gt; 

        &lt;id&gt; repo-id &lt;/id&gt; 
        &lt;name&gt; repo-name &lt;/name&gt; 
        &lt;url&gt; file://\${basedir}/target/deploy &lt;/url&gt; 
        &lt;layout /&gt; 

    &lt;/repository&gt; 

    &lt;!-- 构件的快照部署到哪里,如果没有配置该元素，默认部署到repository元素配置的仓库 --&gt; 
    &lt;snapshotRepository&gt; 
        &lt;uniqueVersion /&gt; 
        &lt;id /&gt;
        &lt;name /&gt; 
        &lt;url /&gt; 
        &lt;layout /&gt; 
    &lt;/snapshotRepository&gt; 

    &lt;!-- 部署项目的网站需要的信息 --&gt; 
    &lt;site&gt; 

        &lt;!-- 部署位置的唯一标识符，用来匹配站点和settings.xml文件里的配置 --&gt; 
        &lt;id&gt; site-id &lt;/id&gt; 

        &lt;!-- 部署位置的名称 --&gt; 
        &lt;name&gt; site-name &lt;/name&gt; 

        &lt;!-- 部署位置的URL，按protocol://hostname/path形式 --&gt; 
        &lt;url&gt; scp://svn.baidu.com/banseon:/var/www/localhost/banseon-web &lt;/url&gt; 

    &lt;/site&gt; 

    &lt;!-- 项目下载页面的URL。如果没有该元素，用户应该参考主页。        使用该元素的原因是：帮助定位那些不在仓库里的构件（由于license限制）。 --&gt; 
    &lt;downloadUrl /&gt; 

    &lt;!-- 如果构件有了新的group ID和artifact ID（构件移到了新的位置），这里列出构件的重定位信息。 --&gt; 
    &lt;relocation&gt; 

        &lt;!-- 构件新的group ID --&gt; 
        &lt;groupId /&gt; 

        &lt;!-- 构件新的artifact ID --&gt; 
        &lt;artifactId /&gt; 

        &lt;!-- 构件新的版本号 --&gt; 
        &lt;version /&gt; 

        &lt;!-- 显示给用户的，关于移动的额外信息，例如原因。 --&gt; 
        &lt;message /&gt; 

    &lt;/relocation&gt; 

    &lt;!-- 给出该构件在远程仓库的状态。不得在本地项目中设置该元素，因为这是工具自动更新的。有效的值有：none（默认），converted（仓库管理员从Maven 1 POM转换过来），partner（直接从伙伴Maven 2仓库同步过来），deployed（从Maven 2实例部署），verified（被核实时正确的和最终的）。 --&gt; 
    &lt;status /&gt; 

&lt;/distributionManagement&gt;
</code></pre><h2 id="_2-4-仓库配置" tabindex="-1"><a class="header-anchor" href="#_2-4-仓库配置"><span>2.4 仓库配置</span></a></h2><pre><code class="language-xml">&lt;!-- 发现依赖和扩展的远程仓库列表。 --&gt; 
&lt;repositories&gt; 

    &lt;!-- 包含需要连接到远程仓库的信息 --&gt; 
    &lt;repository&gt; 

        &lt;!-- 如何处理远程仓库里发布版本的下载 --&gt; 
        &lt;releases&gt; 

            &lt;!-- true或者false表示该仓库是否为下载某种类型构件（发布版，快照版）开启。 --&gt; 
            &lt;enabled /&gt; 

            &lt;!-- 该元素指定更新发生的频率。Maven会比较本地POM和远程POM的时间戳。                这里的选项是：always（一直），daily（默认，每日），                interval：X（这里X是以分钟为单位的时间间隔），或者never（从不）。 --&gt; 
            &lt;updatePolicy /&gt; 

            &lt;!-- 当Maven验证构件校验文件失败时该怎么做：                ignore（忽略），fail（失败），或者warn（警告）。 --&gt; 
            &lt;checksumPolicy /&gt; 

        &lt;/releases&gt; 

        &lt;!-- 如何处理远程仓库里快照版本的下载。有了releases和snapshots这两组配置，            POM就可以在每个单独的仓库中，为每种类型的构件采取不同的策略。            例如，可能有人会决定只为开发目的开启对快照版本下载的支持 --&gt; 
        &lt;snapshots&gt; 
            &lt;enabled /&gt;&lt;updatePolicy /&gt;&lt;checksumPolicy /&gt; 
        &lt;/snapshots&gt; 

        &lt;!-- 远程仓库唯一标识符。可以用来匹配在settings.xml文件里配置的远程仓库 --&gt; 
        &lt;id&gt; repo-id &lt;/id&gt; 

        &lt;!-- 远程仓库名称 --&gt; 
        &lt;name&gt; repo-name &lt;/name&gt; 

        &lt;!-- 远程仓库URL，按protocol://hostname/path形式 --&gt; 
        &lt;url&gt; http://192.168.1.169:9999/repository/ &lt;/url&gt; 

        &lt;!-- 用于定位和排序构件的仓库布局类型-可以是default（默认）或者legacy（遗留）。            Maven 2为其仓库提供了一个默认的布局；            然而，Maven 1.x有一种不同的布局。            我们可以使用该元素指定布局是default（默认）还是legacy（遗留）。 --&gt; 
        &lt;layout&gt; default &lt;/layout&gt; 

    &lt;/repository&gt; 

&lt;/repositories&gt; 

&lt;!-- 发现插件的远程仓库列表，这些插件用于构建和报表 --&gt; 
&lt;pluginRepositories&gt; 

    &lt;!-- 包含需要连接到远程插件仓库的信息.参见repositories/repository元素 --&gt; 
    &lt;pluginRepository /&gt; 

&lt;/pluginRepositories&gt;
</code></pre><h2 id="_2-5-报表配置" tabindex="-1"><a class="header-anchor" href="#_2-5-报表配置"><span>2.5 报表配置</span></a></h2><pre><code class="language-xml">&lt;!-- 描述使用报表插件产生报表的规范,特定的maven 插件能输出相应的定制和配置报表.当用户执行“mvn site”，这些报表就会运行,在页面导航栏能看到所有报表的链接。 --&gt; 
&lt;reporting&gt; 

    &lt;!-- true，则网站不包括默认的报表。这包括“项目信息”菜单中的报表。 --&gt; 
    &lt;excludeDefaults /&gt; 

    &lt;!-- 所有产生的报表存放到哪里。默认值是\${project.build.directory}/site。 --&gt; 
    &lt;outputDirectory /&gt; 

    &lt;!-- 使用的报表插件和他们的配置。 --&gt; 
    &lt;plugins&gt; 

        &lt;plugin&gt; 
            &lt;groupId /&gt; 
            &lt;artifactId /&gt;
            &lt;version /&gt;
            &lt;inherited /&gt;
            &lt;configuration&gt; 
                &lt;links&gt; 
                    &lt;link&gt;http://java.sun.com/j2se/1.5.0/docs/api/&lt;/link&gt; 
                &lt;/links&gt; 
            &lt;/configuration&gt;
            &lt;!-- 一组报表的多重规范，每个规范可能有不同的配置。            一个规范（报表集）对应一个执行目标 。例如，有1，2，3，4，5，6，7，8，9个报表。            1，2，5构成A报表集，对应一个执行目标。2，5，8构成B报表集，对应另一个执行目标 --&gt; 
            &lt;reportSets&gt; 

                &lt;!-- 表示报表的一个集合，以及产生该集合的配置 --&gt; 
                &lt;reportSet&gt; 

                    &lt;!-- 报表集合的唯一标识符，POM继承时用到 --&gt; 
                    &lt;id&gt;sunlink&lt;/id&gt; 

                    &lt;!-- 产生报表集合时，被使用的报表的配置 --&gt; 
                    &lt;configuration /&gt; 

                    &lt;!-- 配置是否被继承到子POMs --&gt; 
                    &lt;inherited /&gt; 

                    &lt;!-- 这个集合里使用到哪些报表 --&gt; 
                    &lt;reports&gt;
                        &lt;report&gt;javadoc&lt;/report&gt;  
                    &lt;/reports&gt;

                &lt;/reportSet&gt; 

            &lt;/reportSets&gt; 

        &lt;/plugin&gt; 

    &lt;/plugins&gt; 

&lt;/reporting&gt;
</code></pre><h2 id="_2-6-项目配置" tabindex="-1"><a class="header-anchor" href="#_2-6-项目配置"><span>2.6 项目配置</span></a></h2><pre><code class="language-xml">&lt;!-- 项目的问题管理系统(Bugzilla, Jira, Scarab,或任何你喜欢的问题管理系统)的名称和URL，本例为 jira --&gt; 
&lt;issueManagement&gt; 

    &lt;!-- 问题管理系统（例如jira）的名字， --&gt; 
    &lt;system&gt; jira &lt;/system&gt; 

    &lt;!-- 该项目使用的问题管理系统的URL --&gt; 
    &lt;url&gt; http://jira.clf.com/ &lt;/url&gt; 

&lt;/issueManagement&gt; 

&lt;!-- 项目持续集成信息 --&gt; 
&lt;ciManagement&gt; 

    &lt;!-- 持续集成系统的名字，例如continuum --&gt; 
    &lt;system /&gt; 

    &lt;!-- 该项目使用的持续集成系统的URL（如果持续集成系统有web接口的话）。 --&gt; 
    &lt;url /&gt; 

    &lt;!-- 构建完成时，需要通知的开发者/用户的配置项。包括被通知者信息和通知条件（错误，失败，成功，警告） --&gt; 
    &lt;notifiers&gt; 

        &lt;!-- 配置一种方式，当构建中断时，以该方式通知用户/开发者 --&gt; 
        &lt;notifier&gt; 

            &lt;!-- 传送通知的途径 --&gt; 
            &lt;type /&gt; 

            &lt;!-- 发生错误时是否通知 --&gt; 
            &lt;sendOnError /&gt; 

            &lt;!-- 构建失败时是否通知 --&gt; 
            &lt;sendOnFailure /&gt; 

            &lt;!-- 构建成功时是否通知 --&gt; 
            &lt;sendOnSuccess /&gt; 

            &lt;!-- 发生警告时是否通知 --&gt; 
            &lt;sendOnWarning /&gt; 

            &lt;!-- 不赞成使用。通知发送到哪里 --&gt; 
            &lt;address /&gt; 

            &lt;!-- 扩展配置项 --&gt; 
            &lt;configuration /&gt; 

        &lt;/notifier&gt; 

    &lt;/notifiers&gt; 

&lt;/ciManagement&gt;

&lt;!-- 项目的名称, Maven产生的文档用 --&gt; 
&lt;name&gt; banseon-maven &lt;/name&gt; 

&lt;!-- 项目主页的URL, Maven产生的文档用 --&gt; 
&lt;url&gt; http://www.clf.com/ &lt;/url&gt; 

&lt;!-- 项目的详细描述, Maven 产生的文档用。 当这个元素能够用HTML格式描述时    （例如，CDATA中的文本会被解析器忽略，就可以包含HTML标签），不鼓励使用纯文本描述。    如果你需要修改产生的web站点的索引页面，你应该修改你自己的索引页文件，而不是调整这里的文档。 --&gt; 
&lt;description&gt; A maven project to study maven. &lt;/description&gt; 

&lt;!-- 描述了这个项目构建环境中的前提条件。 --&gt; 
&lt;prerequisites&gt; 

    &lt;!-- 构建该项目或使用该插件所需要的Maven的最低版本 --&gt; 
    &lt;maven /&gt; 

&lt;/prerequisites&gt; 

&lt;!-- 项目创建年份，4位数字。当产生版权信息时需要使用这个值。 --&gt; 
&lt;inceptionYear /&gt; 

&lt;!-- 项目相关邮件列表信息 --&gt; 
&lt;mailingLists&gt; 

    &lt;!-- 该元素描述了项目相关的所有邮件列表。自动产生的网站引用这些信息。 --&gt; 
    &lt;mailingList&gt; 

        &lt;!-- 邮件的名称 --&gt; 
        &lt;name&gt; Demo &lt;/name&gt; 

        &lt;!-- 发送邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 --&gt; 
        &lt;post&gt; clf@126.com &lt;/post&gt; 

        &lt;!-- 订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 --&gt; 
        &lt;subscribe&gt; clf@126.com &lt;/subscribe&gt; 

        &lt;!-- 取消订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 --&gt; 
        &lt;unsubscribe&gt; clf@126.com &lt;/unsubscribe&gt; 

        &lt;!-- 你可以浏览邮件信息的URL --&gt; 
        &lt;archive&gt; http:/hi.clf.com/ &lt;/archive&gt; 

    &lt;/mailingList&gt; 

&lt;/mailingLists&gt; 

&lt;!-- 项目开发者列表 --&gt; 
&lt;developers&gt; 

    &lt;!-- 某个项目开发者的信息 --&gt; 
    &lt;developer&gt; 

        &lt;!-- SCM里项目开发者的唯一标识符 --&gt; 
        &lt;id&gt; HELLO WORLD &lt;/id&gt; 

        &lt;!-- 项目开发者的全名 --&gt; 
        &lt;name&gt; banseon &lt;/name&gt; 

        &lt;!-- 项目开发者的email --&gt; 
        &lt;email&gt; banseon@126.com &lt;/email&gt; 

        &lt;!-- 项目开发者的主页的URL --&gt; 
        &lt;url /&gt; 

        &lt;!-- 项目开发者在项目中扮演的角色，角色元素描述了各种角色 --&gt; 
        &lt;roles&gt; 
            &lt;role&gt; Project Manager &lt;/role&gt; 
            &lt;role&gt; Architect &lt;/role&gt; 
        &lt;/roles&gt; 

        &lt;!-- 项目开发者所属组织 --&gt; 
        &lt;organization&gt; demo &lt;/organization&gt; 

        &lt;!-- 项目开发者所属组织的URL --&gt; 
        &lt;organizationUrl&gt; http://hi.clf.com/ &lt;/organizationUrl&gt; 

        &lt;!-- 项目开发者属性，如即时消息如何处理等 --&gt; 
        &lt;properties&gt; 
            &lt;dept&gt; No &lt;/dept&gt; 
        &lt;/properties&gt; 

        &lt;!-- 项目开发者所在时区， -11到12范围内的整数。 --&gt; 
        &lt;timezone&gt; -5 &lt;/timezone&gt; 

    &lt;/developer&gt; 

&lt;/developers&gt; 

&lt;!-- 项目的其他贡献者列表 --&gt; 
&lt;contributors&gt; 

    &lt;!-- 项目的其他贡献者。参见developers/developer元素 --&gt; 
    &lt;contributor&gt; 
        &lt;name /&gt;&lt;email /&gt;&lt;url /&gt;&lt;organization /&gt;&lt;organizationUrl /&gt;
        &lt;roles /&gt;&lt;timezone /&gt;&lt;properties /&gt; 
    &lt;/contributor&gt; 

&lt;/contributors&gt; 

&lt;!-- 该元素描述了项目所有License列表。应该只列出该项目的license列表，不要列出依赖项目的license列表。    如果列出多个license，用户可以选择它们中的一个而不是接受所有license。 --&gt; 
&lt;licenses&gt; 

    &lt;!-- 描述了项目的license，用于生成项目的web站点的license页面，其他一些报表和validation也会用到该元素。 --&gt; 
    &lt;license&gt; 

        &lt;!-- license用于法律上的名称 --&gt; 
        &lt;name&gt; Apache 2 &lt;/name&gt; 

        &lt;!-- 官方的license正文页面的URL --&gt; 
        &lt;url&gt; http://www.clf.com/LICENSE-2.0.txt &lt;/url&gt; 

        &lt;!-- 项目分发的主要方式：         repo，可以从Maven库下载         manual， 用户必须手动下载和安装依赖 --&gt; 
        &lt;distribution&gt; repo &lt;/distribution&gt; 

        &lt;!-- 关于license的补充信息 --&gt; 
        &lt;comments&gt; A business-friendly OSS license &lt;/comments&gt; 

    &lt;/license&gt; 

&lt;/licenses&gt; 

&lt;!-- SCM(Source Control Management)标签允许你配置你的代码库，供Maven web站点和其它插件使用。 --&gt; 
&lt;scm&gt; 

    &lt;!-- SCM的URL,该URL描述了版本库和如何连接到版本库。欲知详情，请看SCMs提供的URL格式和列表。该连接只读。 --&gt; 
    &lt;connection&gt;scm:svn:http://svn.baidu.com/banseon/maven/&lt;/connection&gt; 

    &lt;!-- 给开发者使用的，类似connection元素。即该连接不仅仅只读 --&gt; 
    &lt;developerConnection&gt;scm:svn:http://svn.baidu.com/banseon/maven/&lt;/developerConnection&gt; 

    &lt;!-- 当前代码的标签，在开发阶段默认为HEAD --&gt; 
    &lt;tag /&gt; 

    &lt;!-- 指向项目的可浏览SCM库（例如ViewVC或者Fisheye）的URL。 --&gt; 
    &lt;url&gt; http://svn.baidu.com/banseon &lt;/url&gt; 

&lt;/scm&gt; 

&lt;!-- 描述项目所属组织的各种属性。Maven产生的文档用 --&gt; 
&lt;organization&gt; 

    &lt;!-- 组织的全名 --&gt; 
    &lt;name&gt; demo &lt;/name&gt; 

    &lt;!-- 组织主页的URL --&gt; 
    &lt;url&gt; http://www.clf.com/ &lt;/url&gt; 

&lt;/organization&gt;
</code></pre><h1 id="_3、profile" tabindex="-1"><a class="header-anchor" href="#_3、profile"><span>3、profile</span></a></h1><p>pom.xml中的profile可以看做pom.xml的副本，拥有与pom.xml相同的子元素与配置方法。它包含可选的activation（profile的触发器）和一系列的changes。例如test过程可能会指向不同的数据库（相对最终的deployment）或者不同的dependencies或者不同的repositories，并且是根据不同的JDK来改变的。只需要其中一个成立就可以激活profile，如果第一个条件满足了，那么后面就不会在进行匹配。</p><pre><code class="language-xml">&lt;!-- 在列的项目构建profile，如果被激活，会修改构建处理 --&gt; 
&lt;profiles&gt; 

    &lt;!-- 根据环境参数或命令行参数激活某个构建处理 --&gt; 
    &lt;profile&gt; 
        &lt;!--自动触发profile的条件逻辑。Activation是profile的开启钥匙。--&gt;
        &lt;activation&gt;

             &lt;!--profile默认是否激活的标识 --&gt;
            &lt;activeByDefault&gt;false&lt;/activeByDefault&gt;

             &lt;!--activation有一个内建的java版本检测，如果检测到jdk版本与期待的一样，profile被激活。 --&gt;
            &lt;jdk&gt;1.7&lt;/jdk&gt;

             &lt;!--当匹配的操作系统属性被检测到，profile被激活。os元素可以定义一些操作系统相关的属性。 --&gt;
            &lt;os&gt;

                 &lt;!--激活profile的操作系统的名字  --&gt;
                &lt;name&gt;Windows XP&lt;/name&gt;

                 &lt;!--激活profile的操作系统所属家族(如 &#39;windows&#39;)   --&gt;
                &lt;family&gt;Windows&lt;/family&gt;

                 &lt;!--激活profile的操作系统体系结构   --&gt;
                &lt;arch&gt;x86&lt;/arch&gt;

                 &lt;!--激活profile的操作系统版本 --&gt;
                &lt;version&gt;5.1.2600&lt;/version&gt;

            &lt;/os&gt;

             &lt;!--如果Maven检测到某一个属性（其值可以在POM中通过\${名称}引用），其拥有对应的名称和值，Profile就会被激活。                如果值字段是空的，那么存在属性名称字段就会激活profile，否则按区分大小写方式匹配属性值字段 --&gt;
            &lt;property&gt;

                 &lt;!--激活profile的属性的名称 --&gt;
                &lt;name&gt;mavenVersion&lt;/name&gt;

                 &lt;!--激活profile的属性的值  --&gt;
                &lt;value&gt;2.0.3&lt;/value&gt;

            &lt;/property&gt;

             &lt;!--提供一个文件名，通过检测该文件的存在或不存在来激活profile。missing检查文件是否存在，如果不存在则激活profile。                另一方面，exists则会检查文件是否存在，如果存在则激活profile。 --&gt;
            &lt;file&gt;

                 &lt;!--如果指定的文件存在，则激活profile。  --&gt;
                &lt;exists&gt;/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/&lt;/exists&gt;

                 &lt;!--如果指定的文件不存在，则激活profile。 --&gt;
                &lt;missing&gt;/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/&lt;/missing&gt;

            &lt;/file&gt;

        &lt;/activation&gt;
        &lt;id /&gt; 
        &lt;build /&gt;
        &lt;modules /&gt; 
        &lt;repositories /&gt; 
        &lt;pluginRepositories /&gt; 
        &lt;dependencies /&gt; 
        &lt;reporting /&gt; 
        &lt;dependencyManagement /&gt; 
        &lt;distributionManagement /&gt; 
        &lt;properties /&gt; 
    &lt;/profile&gt;
</code></pre><p>profile可以让maven能够自动适应外部的环境变化，比如同一个项目，在linux下编译linux的版本，在win下编译win的版本等。一个项目可以设置多个profile，也可以在同一时间设置多个profile被激活（active）的。自动激活的 profile的条件可以是各种各样的设定条件，组合放置在activation节点中，也可以通过命令行直接指定。如果认为profile设置比较复杂，可以将所有的profiles内容移动到专门的 profiles.xml 文件中，不过记得和pom.xml放在一起。</p><p>activation节点是设置该profile在什么条件下会被激活，常见的条件有如下几个：</p><ul><li><strong>os</strong></li></ul><p>判断操作系统相关的参数，它包含如下可以自由组合的子节点元素</p><ol><li>message - 规则失败之后显示的消息</li><li>arch - 匹配cpu结构，常见为x86</li><li>family - 匹配操作系统家族，常见的取值为：dos，mac，netware，os/2，unix，windows，win9x，os/400等</li><li>name - 匹配操作系统的名字</li><li>version - 匹配的操作系统版本号</li><li>display - 检测到操作系统之后显示的信息</li></ol><ul><li><strong>jdk</strong></li></ul><p>检查jdk版本，可以用区间表示。</p><ul><li><strong>property</strong></li></ul><p>检查属性值，本节点可以包含name和value两个子节点。</p><ul><li><strong>file</strong></li></ul><p>检查文件相关内容，包含两个子节点：exists和missing，用于分别检查文件存在和不存在两种情况。</p><p>如果想要某个profile默认处于激活状态，可以在<code>&lt;activeProfiles&gt;</code>中将该profile的id放进去。这样，不论环境设置如何，其对应的 profile都会被激活。</p><p>profile配置项在setting.xml中页有，<strong>是pom.xml中profile元素的裁剪版本</strong>，包含了id，activation, repositories, pluginRepositories和 properties元素。这里的profile元素只包含这五个子元素是因为setting.xml只关心构建系统这个整体（这正是settings.xml文件的角色定位），而非单独的项目对象模型设置。<strong>如果一个settings中的profile被激活，它的值会覆盖任何其它定义在POM中或者profile.xml中的带有相同id的profile</strong></p>`,49),o=[i];function r(s,a){return e(),n("div",null,o)}const c=t(g,[["render",r],["__file","what-is-maven.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/package-manager/what-is-maven.html","title":"maven总述","lang":"zh-CN","frontmatter":{"description":"maven总述 maven的配置文件settings.xml存在于两个地方： 安装的地方：${M2_HOME}/conf/settings.xml 用户的目录：${user.home}/.m2/settings.xml 前者又被叫做全局配置，对操作系统的所有使用者生效；后者被称为用户配置，只对当前操作系统的使用者生效。如果两者都存在，它们的内容将被合并...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/package-manager/what-is-maven.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"maven总述"}],["meta",{"property":"og:description","content":"maven总述 maven的配置文件settings.xml存在于两个地方： 安装的地方：${M2_HOME}/conf/settings.xml 用户的目录：${user.home}/.m2/settings.xml 前者又被叫做全局配置，对操作系统的所有使用者生效；后者被称为用户配置，只对当前操作系统的使用者生效。如果两者都存在，它们的内容将被合并..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://upload-images.jianshu.io/upload_images/8775426-56db5d40fbb03371.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/865/format/webp#crop=0&crop=0&crop=1&crop=1&id=w5gPQ&originHeight=418&originWidth=865&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title="}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-03T08:02:20.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-03T08:02:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"maven总述\\",\\"image\\":[\\"https://upload-images.jianshu.io/upload_images/8775426-56db5d40fbb03371.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/865/format/webp#crop=0&crop=0&crop=1&crop=1&id=w5gPQ&originHeight=418&originWidth=865&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=\\"],\\"dateModified\\":\\"2022-04-03T08:02:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"2.1 基础配置","slug":"_2-1-基础配置","link":"#_2-1-基础配置","children":[]},{"level":2,"title":"2.2 构建配置","slug":"_2-2-构建配置","link":"#_2-2-构建配置","children":[]},{"level":2,"title":"2.3 分发配置","slug":"_2-3-分发配置","link":"#_2-3-分发配置","children":[]},{"level":2,"title":"2.4 仓库配置","slug":"_2-4-仓库配置","link":"#_2-4-仓库配置","children":[]},{"level":2,"title":"2.5 报表配置","slug":"_2-5-报表配置","link":"#_2-5-报表配置","children":[]},{"level":2,"title":"2.6 项目配置","slug":"_2-6-项目配置","link":"#_2-6-项目配置","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1648972940000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":30.76,"words":9227},"filePathRelative":"java-tutor/package-manager/what-is-maven.md","localizedDate":"2022年3月21日","autoDesc":true}');export{c as comp,d as data};
