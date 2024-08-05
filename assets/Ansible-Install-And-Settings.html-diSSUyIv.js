import{_ as e,c as l,o as n,d as a}from"./app-CbULZrmi.js";const o={},t=a(`<h1 id="ansible-安装和配置" tabindex="-1"><a class="header-anchor" href="#ansible-安装和配置"><span>Ansible 安装和配置</span></a></h1><h2 id="ansible-说明" tabindex="-1"><a class="header-anchor" href="#ansible-说明"><span>Ansible 说明</span></a></h2><ul><li>Ansible 官网：<a href="https://www.ansible.com/" target="_blank" rel="noopener noreferrer">https://www.ansible.com/</a></li><li>Ansible 官网 Github：<a href="https://github.com/ansible/ansible" target="_blank" rel="noopener noreferrer">https://github.com/ansible/ansible</a></li><li>Ansible 官网文档：<a href="https://docs.ansible.com//" target="_blank" rel="noopener noreferrer">https://docs.ansible.com//</a></li><li>简单讲：它的作用就是把写 shell 这件事变成标准化、模块化。方便更好的自动化运维</li></ul><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><ul><li>官网说明：<a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html</a></li><li>CentOS：<code>sudo yum install -y ansible</code><ul><li>查看版本：<code>ansible --version</code></li></ul></li></ul><hr><h2 id="配置基本概念" tabindex="-1"><a class="header-anchor" href="#配置基本概念"><span>配置基本概念</span></a></h2><h4 id="ansible-基本配置文件顺序" tabindex="-1"><a class="header-anchor" href="#ansible-基本配置文件顺序"><span>Ansible 基本配置文件顺序</span></a></h4><ul><li>Ansible 执行的时候会按照以下顺序查找配置项，所以修改的时候要特别注意改的是哪个文件</li></ul><pre><code>ANSIBLE_CONFIG (环境变量)
ansible.cfg (脚本所在当前目录下)
~/.ansible.cfg (用户家目录下，默认没有)
/etc/ansible/ansible.cfg（安装后会自动生成）
</code></pre><h4 id="配置远程主机地址-ansible-称这些地址为-inventory" tabindex="-1"><a class="header-anchor" href="#配置远程主机地址-ansible-称这些地址为-inventory"><span>配置远程主机地址 (Ansible 称这些地址为 Inventory)</span></a></h4><ul><li>假设我有 3 台机子： <ul><li>192.168.0.223</li><li>192.168.0.70</li><li>192.168.0.103</li></ul></li><li>官网对此的配置说明：<a href="https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#hosts-and-groups" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#hosts-and-groups</a></li></ul><h6 id="给这三台机子设置免密登录的情况-一般推荐方式" tabindex="-1"><a class="header-anchor" href="#给这三台机子设置免密登录的情况-一般推荐方式"><span>给这三台机子设置免密登录的情况（一般推荐方式）</span></a></h6><ul><li>编辑 Ansible 配置文件：<code>vim /etc/ansible/hosts</code></li><li>添加如下内容</li></ul><pre><code>[hadoop-host]
192.168.0.223
192.168.0.70
192.168.0.103
</code></pre><ul><li>其中 <code>[hadoop-host]</code> 表示这些主机代表的一个组名</li></ul><h6 id="如果不设置免密-直接采用账号密码-容易泄露信息" tabindex="-1"><a class="header-anchor" href="#如果不设置免密-直接采用账号密码-容易泄露信息"><span>如果不设置免密，直接采用账号密码（容易泄露信息）</span></a></h6><ul><li>编辑 Ansible 配置文件：<code>vim /etc/ansible/hosts</code></li><li>添加如下内容</li></ul><pre><code>[hadoop-host]
hadoop-master ansible_host=192.168.0.223 ansible_user=root ansible_ssh_pass=123456
hadoop-node1  ansible_host=192.168.0.70 ansible_user=root ansible_ssh_pass=123456
hadoop-node2  ansible_host=192.168.0.103 ansible_user=root ansible_ssh_pass=123456
</code></pre><h2 id="简单使用-ad-hoc方式" tabindex="-1"><a class="header-anchor" href="#简单使用-ad-hoc方式"><span>简单使用（<code>ad hoc</code>方式）</span></a></h2><ul><li>ad hoc 官网：<a href="https://docs.ansible.com/ansible/latest/user_guide/intro_adhoc.html" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/user_guide/intro_adhoc.html</a></li></ul><h5 id="运行-ansible" tabindex="-1"><a class="header-anchor" href="#运行-ansible"><span>运行 Ansible</span></a></h5><ul><li>运行 Ansible 的 <code>ping</code> 命令，看看配置正确时输出如下：</li></ul><pre><code>sudo ansible --private-key ~/.ssh/id_rsa all -m ping
</code></pre><ul><li>让远程所有主机都执行 <code>ps</code> 命令，输出如下</li></ul><pre><code>ansible all -a &#39;ps&#39;
</code></pre><ul><li>让远程所有 hadoop-host 组的主机都执行 <code>ps</code> 命令，输出如下</li></ul><pre><code>ansible hadoop-host -a &#39;ps&#39;
</code></pre><hr><h2 id="playbook-脚本方式" tabindex="-1"><a class="header-anchor" href="#playbook-脚本方式"><span>Playbook 脚本方式</span></a></h2><ul><li>官网：<a href="https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html</a></li><li>一些语法：<a href="https://docs.ansible.com/ansible/latest/modules/command_module.html" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/modules/command_module.html</a></li><li>playbook（剧本），顾名思义，就是需要定义一个脚本或者说配置文件，然后定义好要做什么。之后 ansible 就会根据 playbook 脚本对远程主机进行操作</li></ul><h4 id="简单脚本" tabindex="-1"><a class="header-anchor" href="#简单脚本"><span>简单脚本</span></a></h4><ul><li>下面脚本让所有远程主机执行 <code>whoami</code> 命令，并把结果（当前用户名）输出到 <code>/opt/whoami.txt</code> 文件</li><li>创建脚本文件：<code>vim /opt/simple-playbook.yml</code></li></ul><pre><code>- hosts: all
  tasks:
    - name: whoami
      shell: &#39;whoami &gt; /opt/whoami.txt&#39;
</code></pre><ul><li>执行命令：<code>ansible-playbook /opt/simple-playbook.yml</code>，结果如下，并且 opt 下也有文件生成</li></ul><pre><code>PLAY [all] **************************************************************************************************************************

TASK [Gathering Facts] **************************************************************************************************************
ok: [192.168.0.223]
ok: [192.168.0.103]
ok: [192.168.0.70]

TASK [whoami] ***********************************************************************************************************************
changed: [192.168.0.103]
changed: [192.168.0.223]
changed: [192.168.0.70]

PLAY RECAP **************************************************************************************************************************
192.168.0.103              : ok=2    changed=1    unreachable=0    failed=0
192.168.0.223              : ok=2    changed=1    unreachable=0    failed=0
192.168.0.70               : ok=2    changed=1    unreachable=0    failed=0
</code></pre><hr><h2 id="平时用来测试" tabindex="-1"><a class="header-anchor" href="#平时用来测试"><span>平时用来测试</span></a></h2><ul><li>创建脚本文件：<code>vim /opt/test-playbook.yml</code></li></ul><pre><code>- hosts: hadoop-test
  remote_user: root
  vars:
    java_install_folder: /usr/local
  tasks:
    # 按行的方式写入
    - name: Set JAVA_HOME 1
      lineinfile: 
        dest=/etc/profile
        line=&quot;JAVA_HOME={{ java_install_folder }}/jdk1.8.0_181&quot;
    # 按块的方式写入，#{mark} 会被自动替换成：begin 和 end 字符来包裹整块内容（我这里自己定义了词语）
    - name: Set JAVA_HOME 2
      blockinfile: 
        path: /etc/profile
        marker: &quot;#{mark} JDK ENV&quot;
        marker_begin: &quot;开始&quot;
        marker_end: &quot;结束&quot;
        block: |
          export JAVA_HOME={{ java_install_folder }}/jdk1.8.0_181
          export PATH=$PATH:$JAVA_HOME/bin
</code></pre><ul><li>执行命令：<code>ansible-playbook /opt/test-playbook.yml</code></li></ul><hr><h2 id="更多-playbook-实战" tabindex="-1"><a class="header-anchor" href="#更多-playbook-实战"><span>更多 playbook 实战</span></a></h2><h4 id="禁用防火墙-centos-7-x" tabindex="-1"><a class="header-anchor" href="#禁用防火墙-centos-7-x"><span>禁用防火墙（CentOS 7.x）</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/disable-firewalld-playbook.yml</code></li></ul><pre><code>- hosts: all
  remote_user: root
  tasks:
    - name: Disable SELinux at next reboot
      selinux:
        state: disabled
    - name: disable firewalld
      command: &quot;{{ item }}&quot;
      with_items:
         - systemctl stop firewalld
         - systemctl disable firewalld
         - setenforce 0
</code></pre><h4 id="基础环境-centos-7-x" tabindex="-1"><a class="header-anchor" href="#基础环境-centos-7-x"><span>基础环境（CentOS 7.x）</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/install-basic-playbook.yml</code></li></ul><pre><code>- hosts: all
  remote_user: root
  tasks:
    - name: Disable SELinux at next reboot
      selinux:
        state: disabled
        
    - name: disable firewalld
      command: &quot;{{ item }}&quot;
      with_items:
         - systemctl stop firewalld
         - systemctl disable firewalld
         - setenforce 0
         
    - name: install-basic
      command: &quot;{{ item }}&quot;
      with_items:
         - yum install -y zip unzip lrzsz git epel-release wget htop deltarpm
         
    - name: install-vim
      shell: &quot;{{ item }}&quot;
      with_items:
         - yum install -y vim
         - curl https://raw.githubusercontent.com/wklken/vim-for-server/master/vimrc &gt; ~/.vimrc
         
    - name: install-docker
      shell: &quot;{{ item }}&quot;
      with_items:
         - yum install -y yum-utils device-mapper-persistent-data lvm2
         - yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
         - yum makecache fast
         - yum install -y docker-ce
         - systemctl start docker.service
         - docker run hello-world
         
    - name: install-docker-compose
      shell: &quot;{{ item }}&quot;
      with_items:
         - curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-\`uname -s\`-\`uname -m\` -o /usr/local/bin/docker-compose
         - chmod +x /usr/local/bin/docker-compose
         - docker-compose --version
         - systemctl restart docker.service
         - systemctl enable docker.service
         
</code></pre><ul><li>执行命令：<code>ansible-playbook /opt/install-basic-playbook.yml</code></li></ul><h4 id="修改-hosts" tabindex="-1"><a class="header-anchor" href="#修改-hosts"><span>修改 hosts</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/hosts-playbook.yml</code></li></ul><pre><code>- hosts: all
  remote_user: root
  tasks:
    - name: update hosts
      blockinfile: 
        path: /etc/hosts
        block: |
          192.168.0.223     linux01
          192.168.0.223     linux02
          192.168.0.223     linux03
          192.168.0.223     linux04
          192.168.0.223     linux05
</code></pre><ul><li>执行命令：<code>ansible-playbook /opt/hosts-playbook.yml</code></li></ul><h4 id="部署-jdk" tabindex="-1"><a class="header-anchor" href="#部署-jdk"><span>部署 JDK</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/jdk8-playbook.yml</code></li></ul><pre><code>- hosts: hadoop-host
  remote_user: root
  vars:
    java_install_folder: /usr/local
  tasks:
    - name: copy jdk
      copy: src=/opt/jdk-8u181-linux-x64.tar.gz dest={{ java_install_folder }}
      
    - name: tar jdk
      shell: chdir={{ java_install_folder }} tar zxf jdk-8u181-linux-x64.tar.gz
      
    - name: set JAVA_HOME
      blockinfile: 
        path: /etc/profile
        marker: &quot;#{mark} JDK ENV&quot;
        block: |
          JAVA_HOME={{ java_install_folder }}/jdk1.8.0_181
          JRE_HOME=$JAVA_HOME/jre
          PATH=$PATH:$JAVA_HOME/bin
          CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
          export JAVA_HOME
          export JRE_HOME
          export PATH
          export CLASSPATH
    
    - name: source profile
      shell: source /etc/profile
</code></pre><ul><li>执行命令：<code>ansible-playbook /opt/jdk8-playbook.yml</code></li></ul><h4 id="部署-hadoop-集群" tabindex="-1"><a class="header-anchor" href="#部署-hadoop-集群"><span>部署 Hadoop 集群</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/hadoop-playbook.yml</code></li><li>刚学 Ansible，不好动配置文件，所以就只保留环境部分的设置，其他部分自行手工~</li></ul><pre><code>- hosts: hadoop-host
  remote_user: root
  tasks:
    - name: Creates directory
      file:
        path: /data/hadoop/hdfs/name
        state: directory
    - name: Creates directory
      file:
        path: /data/hadoop/hdfs/data
        state: directory
    - name: Creates directory
      file:
        path: /data/hadoop/hdfs/tmp
        state: directory

    - name: set HADOOP_HOME
      blockinfile: 
        path: /etc/profile
        marker: &quot;#{mark} HADOOP ENV&quot;
        block: |
          HADOOP_HOME=/usr/local/hadoop
          PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
          export HADOOP_HOME
          export PATH
    
    - name: source profile
      shell: source /etc/profile
</code></pre><ul><li>执行命令：<code>ansible-playbook /opt/hadoop-playbook.yml</code></li></ul><hr><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="https://www.jianshu.com/p/081139f73613" target="_blank" rel="noopener noreferrer">ANSIBLE模块 - shell和command区别</a></li><li><a href="https://www.the5fire.com/ansible-guide-cn.html" target="_blank" rel="noopener noreferrer">https://www.the5fire.com/ansible-guide-cn.html</a></li><li><a href="https://www.jianshu.com/p/62388a4fcbc6" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/62388a4fcbc6</a></li><li><a href="http://showme.codes/2017-06-12/ansible-introduce/" target="_blank" rel="noopener noreferrer">http://showme.codes/2017-06-12/ansible-introduce/</a></li></ul>`,65),s=[t];function i(r,d){return n(),l("div",null,s)}const h=e(o,[["render",i],["__file","Ansible-Install-And-Settings.html.vue"]]),p=JSON.parse('{"path":"/linux-tutor/server/Ansible-Install-And-Settings.html","title":"Ansible 安装和配置","lang":"zh-CN","frontmatter":{"description":"Ansible 安装和配置 Ansible 说明 Ansible 官网：https://www.ansible.com/ Ansible 官网 Github：https://github.com/ansible/ansible Ansible 官网文档：https://docs.ansible.com// 简单讲：它的作用就是把写 shell 这件事变...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Ansible-Install-And-Settings.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Ansible 安装和配置"}],["meta",{"property":"og:description","content":"Ansible 安装和配置 Ansible 说明 Ansible 官网：https://www.ansible.com/ Ansible 官网 Github：https://github.com/ansible/ansible Ansible 官网文档：https://docs.ansible.com// 简单讲：它的作用就是把写 shell 这件事变..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Ansible 安装和配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Ansible 说明","slug":"ansible-说明","link":"#ansible-说明","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"配置基本概念","slug":"配置基本概念","link":"#配置基本概念","children":[{"level":4,"title":"Ansible 基本配置文件顺序","slug":"ansible-基本配置文件顺序","link":"#ansible-基本配置文件顺序","children":[]},{"level":4,"title":"配置远程主机地址 (Ansible 称这些地址为 Inventory)","slug":"配置远程主机地址-ansible-称这些地址为-inventory","link":"#配置远程主机地址-ansible-称这些地址为-inventory","children":[]}]},{"level":2,"title":"简单使用（ad hoc方式）","slug":"简单使用-ad-hoc方式","link":"#简单使用-ad-hoc方式","children":[{"level":5,"title":"运行 Ansible","slug":"运行-ansible","link":"#运行-ansible","children":[]}]},{"level":2,"title":"Playbook 脚本方式","slug":"playbook-脚本方式","link":"#playbook-脚本方式","children":[{"level":4,"title":"简单脚本","slug":"简单脚本","link":"#简单脚本","children":[]}]},{"level":2,"title":"平时用来测试","slug":"平时用来测试","link":"#平时用来测试","children":[]},{"level":2,"title":"更多 playbook 实战","slug":"更多-playbook-实战","link":"#更多-playbook-实战","children":[{"level":4,"title":"禁用防火墙（CentOS 7.x）","slug":"禁用防火墙-centos-7-x","link":"#禁用防火墙-centos-7-x","children":[]},{"level":4,"title":"基础环境（CentOS 7.x）","slug":"基础环境-centos-7-x","link":"#基础环境-centos-7-x","children":[]},{"level":4,"title":"修改 hosts","slug":"修改-hosts","link":"#修改-hosts","children":[]},{"level":4,"title":"部署 JDK","slug":"部署-jdk","link":"#部署-jdk","children":[]},{"level":4,"title":"部署 Hadoop 集群","slug":"部署-hadoop-集群","link":"#部署-hadoop-集群","children":[]}]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.97,"words":1192},"filePathRelative":"linux-tutor/server/Ansible-Install-And-Settings.md","localizedDate":"2022年5月26日","autoDesc":true}');export{h as comp,p as data};
