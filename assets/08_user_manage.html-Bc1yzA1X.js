import{_ as r,c as a,a as p,o}from"./app-B6vXTniy.js";const s={};function n(t,e){return o(),a("div",null,[...e[0]||(e[0]=[p(`<h1 id="用户管理工具" tabindex="-1"><a class="header-anchor" href="#用户管理工具"><span>用户管理工具</span></a></h1><h2 id="用户" tabindex="-1"><a class="header-anchor" href="#用户"><span>用户</span></a></h2><h3 id="添加用户" tabindex="-1"><a class="header-anchor" href="#添加用户"><span>添加用户</span></a></h3><pre><code>useradd -m username
</code></pre><p>该命令为用户创建相应的帐号和用户目录/home/username；</p><p>用户添加之后，设置密码：</p><p>密码以交互方式创建:</p><pre><code>passwd username
</code></pre><h3 id="删除用户" tabindex="-1"><a class="header-anchor" href="#删除用户"><span>删除用户</span></a></h3><pre><code>userdel -r username
</code></pre><p>不带选项使用 userdel，只会删除用户。用户的家目录将仍会在/home目录下。要完全的删除用户信息，使用-r选项；</p><p>帐号切换 登录帐号为userA用户状态下，切换到userB用户帐号工作:</p><pre><code>su userB
</code></pre><p>进入交互模型，输入密码授权进入；</p><h2 id="用户的组" tabindex="-1"><a class="header-anchor" href="#用户的组"><span>用户的组</span></a></h2><h3 id="将用户加入到组" tabindex="-1"><a class="header-anchor" href="#将用户加入到组"><span>将用户加入到组</span></a></h3><p>默认情况下，添加用户操作也会相应的增加一个同名的组，用户属于同名组； 查看当前用户所属的组:</p><pre><code>groups
</code></pre><p>一个用户可以属于多个组，将用户加入到组:</p><pre><code>usermod -G groupNmame username
</code></pre><p>变更用户所属的根组(将用加入到新的组，并从原有的组中除去）:</p><pre><code>usermod -g groupName username
</code></pre><h3 id="查看系统所有组" tabindex="-1"><a class="header-anchor" href="#查看系统所有组"><span>查看系统所有组</span></a></h3><p>系统的所有用户及所有组信息分别记录在两个文件中：/etc/passwd , /etc/group 默认情况下这两个文件对所有用户可读：</p><p>查看所有用户及权限:</p><pre><code>more /etc/passwd
</code></pre><p>查看所有的用户组及权限:</p><pre><code>more /etc/group
</code></pre><h2 id="用户权限" tabindex="-1"><a class="header-anchor" href="#用户权限"><span>用户权限</span></a></h2><p>使用ls -l可查看文件的属性字段，文件属性字段总共有10个字母组成，第一个字母表示文件类型，如果这个字母是一个减号&quot;-&quot;,则说明该文件是一个普通文件。字母&quot;d&quot;表示该文件是一个目录，字母&quot;d&quot;,是dirtectory(目录)的缩写。 后面的9个字母为该文件的权限标识，3个为一组，分别表示文件所属用户、用户所在组、其它用户的读写和执行权限； 例如: :</p><pre><code>[/home/weber#]ls -l /etc/group
-rwxrw-r-- colin king 725 2013-11-12 15:37 /home/colin/a
</code></pre><p>表示这个文件对文件拥有者colin这个用户可读写、可执行；对colin所在的组（king）可读可写；对其它用户只可读；</p><h3 id="更改读写权限" tabindex="-1"><a class="header-anchor" href="#更改读写权限"><span>更改读写权限</span></a></h3><p>使用chmod命令更改文件的读写权限，更改读写权限有两种方法，一种是字母方式，一种是数字方式</p><p>字母方式:</p><pre><code>chmod userMark(+|-)PermissionsMark
</code></pre><p>userMark取值：</p><ul><li>u：用户</li><li>g：组</li><li>o：其它用户</li></ul><p>- a：所有用户 PermissionsMark取值：</p><ul><li>r:读</li><li>w：写</li><li>x：执行</li></ul><p>例如:</p><pre><code>chmod a+x main         对所有用户给文件main增加可执行权限
chmod g+w blogs        对组用户给文件blogs增加可写权限
</code></pre><p>数字方式：</p><p>数字方式直接设置所有权限，相比字母方式，更加简洁方便；</p><p>使用三位八进制数字的形式来表示权限，第一位指定属主的权限，第二位指定组权限，第三位指定其他用户的权限，每位通过4(读)、2(写)、1(执行)三种数值的和来确定权限。如6(4+2)代表有读写权，7(4+2+1)有读、写和执行的权限。</p><p>例如:</p><pre><code>chmod 740 main     将main的用户权限设置为rwxr-----
</code></pre><h3 id="更改文件或目录的拥有者" tabindex="-1"><a class="header-anchor" href="#更改文件或目录的拥有者"><span>更改文件或目录的拥有者</span></a></h3><pre><code>chown username dirOrFile
</code></pre><p>使用-R选项递归更改该目下所有文件的拥有者:</p><pre><code>chown -R weber server/
</code></pre><h2 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量"><span>环境变量</span></a></h2><p>bashrc与profile都用于保存用户的环境信息，bashrc用于交互式non-loginshell，而profile用于交互式login shell。</p><p>| /etc/profile，/etc/bashrc 是系统全局环境变量设定 | ~/.profile，~/.bashrc用户目录下的私有环境变量设定 |</p><p>当登入系统获得一个shell进程时，其读取环境设置脚本分为三步:</p><ol><li>首先读入的是全局环境变量设置文件/etc/profile，然后根据其内容读取额外的文档，如/etc/profile.d和/etc/inputrc</li><li>读取当前登录用户Home目录下的文件~/.bash_profile，其次读取~/.bash_login，最后读取~/.profile，这三个文档设定基本上是一样的，读取有优先关系</li><li>读取~/.bashrc</li></ol><p>~/.profile与~/.bashrc的区别:</p><ul><li>这两者都具有个性化定制功能</li><li>~/.profile可以设定本用户专有的路径，环境变量，等，它只能登入的时候执行一次</li><li>~/.bashrc也是某用户专有设定文档，可以设定路径，命令别名，每次shell script的执行都会使用它一次</li></ul><p>例如，我们可以在这些环境变量中设置自己经常进入的文件路径，以及命令的快捷方式： :</p><pre><code>.bashrc
alias m=&#39;more&#39;
alias cp=&#39;cp -i&#39;
alias mv=&#39;mv -i&#39;
alias ll=&#39;ls -l&#39;
alias lsl=&#39;ls -lrt&#39;
alias lm=&#39;ls -al|more&#39;

log=/opt/applog/common_dir
unit=/opt/app/unittest/common

.bash_profile
. /opt/app/tuxapp/openav/config/setenv.prod.sh.linux
export PS1=&#39;PWD#&#39;
</code></pre><p>执行 source ~/.bashrc 使.bashrc中的修改生效 通过上述设置，我们进入log目录就只需要输入cd \\log即可；</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>useradd passwd userdel usermod chmod chown .bashrc .bash_profile</p>`,63)])])}const c=r(s,[["render",n]]),l=JSON.parse('{"path":"/linux-tutor/base/08_user_manage.html","title":"用户管理工具","lang":"zh-CN","frontmatter":{"order":8,"description":"用户管理工具 用户 添加用户 该命令为用户创建相应的帐号和用户目录/home/username； 用户添加之后，设置密码： 密码以交互方式创建: 删除用户 不带选项使用 userdel，只会删除用户。用户的家目录将仍会在/home目录下。要完全的删除用户信息，使用-r选项； 帐号切换 登录帐号为userA用户状态下，切换到userB用户帐号工作: 进入...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"用户管理工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-22T06:25:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/base/08_user_manage.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"用户管理工具"}],["meta",{"property":"og:description","content":"用户管理工具 用户 添加用户 该命令为用户创建相应的帐号和用户目录/home/username； 用户添加之后，设置密码： 密码以交互方式创建: 删除用户 不带选项使用 userdel，只会删除用户。用户的家目录将仍会在/home目录下。要完全的删除用户信息，使用-r选项； 帐号切换 登录帐号为userA用户状态下，切换到userB用户帐号工作: 进入..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-22T06:25:47.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-22T06:25:47.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1684736747000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.99,"words":1197},"filePathRelative":"linux-tutor/base/08_user_manage.md","autoDesc":true}');export{c as comp,l as data};
