import{_ as n,c as a,a as e,o as l}from"./app-B6vXTniy.js";const i={};function t(c,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="ansible-安装和配置" tabindex="-1"><a class="header-anchor" href="#ansible-安装和配置"><span>Ansible 安装和配置</span></a></h1><h2 id="ansible-说明" tabindex="-1"><a class="header-anchor" href="#ansible-说明"><span>Ansible 说明</span></a></h2><ul><li>Ansible 官网：<a href="https://www.ansible.com/" target="_blank" rel="noopener noreferrer">https://www.ansible.com/</a></li><li>Ansible 官网 Github：<a href="https://github.com/ansible/ansible" target="_blank" rel="noopener noreferrer">https://github.com/ansible/ansible</a></li><li>Ansible 官网文档：<a href="https://docs.ansible.com//" target="_blank" rel="noopener noreferrer">https://docs.ansible.com//</a></li><li>简单讲：它的作用就是把写 shell 这件事变成标准化、模块化。方便更好的自动化运维</li></ul><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><ul><li>官网说明：<a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html</a></li><li>CentOS：<code>sudo yum install -y ansible</code><ul><li>查看版本：<code>ansible --version</code></li></ul></li></ul><hr><h2 id="配置基本概念" tabindex="-1"><a class="header-anchor" href="#配置基本概念"><span>配置基本概念</span></a></h2><h4 id="ansible-基本配置文件顺序" tabindex="-1"><a class="header-anchor" href="#ansible-基本配置文件顺序"><span>Ansible 基本配置文件顺序</span></a></h4><ul><li>Ansible 执行的时候会按照以下顺序查找配置项，所以修改的时候要特别注意改的是哪个文件</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ANSIBLE_CONFIG (环境变量)</span>
<span class="line">ansible.cfg (脚本所在当前目录下)</span>
<span class="line">~/.ansible.cfg (用户家目录下，默认没有)</span>
<span class="line">/etc/ansible/ansible.cfg（安装后会自动生成）</span>
<span class="line"></span></code></pre></div><h4 id="配置远程主机地址-ansible-称这些地址为-inventory" tabindex="-1"><a class="header-anchor" href="#配置远程主机地址-ansible-称这些地址为-inventory"><span>配置远程主机地址 (Ansible 称这些地址为 Inventory)</span></a></h4><ul><li>假设我有 3 台机子： <ul><li>192.168.0.223</li><li>192.168.0.70</li><li>192.168.0.103</li></ul></li><li>官网对此的配置说明：<a href="https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#hosts-and-groups" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#hosts-and-groups</a></li></ul><h6 id="给这三台机子设置免密登录的情况-一般推荐方式" tabindex="-1"><a class="header-anchor" href="#给这三台机子设置免密登录的情况-一般推荐方式"><span>给这三台机子设置免密登录的情况（一般推荐方式）</span></a></h6><ul><li>编辑 Ansible 配置文件：<code>vim /etc/ansible/hosts</code></li><li>添加如下内容</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[hadoop-host]</span>
<span class="line">192.168.0.223</span>
<span class="line">192.168.0.70</span>
<span class="line">192.168.0.103</span>
<span class="line"></span></code></pre></div><ul><li>其中 <code>[hadoop-host]</code> 表示这些主机代表的一个组名</li></ul><h6 id="如果不设置免密-直接采用账号密码-容易泄露信息" tabindex="-1"><a class="header-anchor" href="#如果不设置免密-直接采用账号密码-容易泄露信息"><span>如果不设置免密，直接采用账号密码（容易泄露信息）</span></a></h6><ul><li>编辑 Ansible 配置文件：<code>vim /etc/ansible/hosts</code></li><li>添加如下内容</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">[hadoop-host]</span>
<span class="line">hadoop-master ansible_host=192.168.0.223 ansible_user=root ansible_ssh_pass=123456</span>
<span class="line">hadoop-node1  ansible_host=192.168.0.70 ansible_user=root ansible_ssh_pass=123456</span>
<span class="line">hadoop-node2  ansible_host=192.168.0.103 ansible_user=root ansible_ssh_pass=123456</span>
<span class="line"></span></code></pre></div><h2 id="简单使用-ad-hoc方式" tabindex="-1"><a class="header-anchor" href="#简单使用-ad-hoc方式"><span>简单使用（<code>ad hoc</code>方式）</span></a></h2><ul><li>ad hoc 官网：<a href="https://docs.ansible.com/ansible/latest/user_guide/intro_adhoc.html" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/user_guide/intro_adhoc.html</a></li></ul><h5 id="运行-ansible" tabindex="-1"><a class="header-anchor" href="#运行-ansible"><span>运行 Ansible</span></a></h5><ul><li>运行 Ansible 的 <code>ping</code> 命令，看看配置正确时输出如下：</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">sudo ansible --private-key ~/.ssh/id_rsa all -m ping</span>
<span class="line"></span></code></pre></div><ul><li>让远程所有主机都执行 <code>ps</code> 命令，输出如下</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ansible all -a &#39;ps&#39;</span>
<span class="line"></span></code></pre></div><ul><li>让远程所有 hadoop-host 组的主机都执行 <code>ps</code> 命令，输出如下</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ansible hadoop-host -a &#39;ps&#39;</span>
<span class="line"></span></code></pre></div><hr><h2 id="playbook-脚本方式" tabindex="-1"><a class="header-anchor" href="#playbook-脚本方式"><span>Playbook 脚本方式</span></a></h2><ul><li>官网：<a href="https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html</a></li><li>一些语法：<a href="https://docs.ansible.com/ansible/latest/modules/command_module.html" target="_blank" rel="noopener noreferrer">https://docs.ansible.com/ansible/latest/modules/command_module.html</a></li><li>playbook（剧本），顾名思义，就是需要定义一个脚本或者说配置文件，然后定义好要做什么。之后 ansible 就会根据 playbook 脚本对远程主机进行操作</li></ul><h4 id="简单脚本" tabindex="-1"><a class="header-anchor" href="#简单脚本"><span>简单脚本</span></a></h4><ul><li>下面脚本让所有远程主机执行 <code>whoami</code> 命令，并把结果（当前用户名）输出到 <code>/opt/whoami.txt</code> 文件</li><li>创建脚本文件：<code>vim /opt/simple-playbook.yml</code></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">- hosts: all</span>
<span class="line">  tasks:</span>
<span class="line">    - name: whoami</span>
<span class="line">      shell: &#39;whoami &gt; /opt/whoami.txt&#39;</span>
<span class="line"></span></code></pre></div><ul><li>执行命令：<code>ansible-playbook /opt/simple-playbook.yml</code>，结果如下，并且 opt 下也有文件生成</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">PLAY [all] **************************************************************************************************************************</span>
<span class="line"></span>
<span class="line">TASK [Gathering Facts] **************************************************************************************************************</span>
<span class="line">ok: [192.168.0.223]</span>
<span class="line">ok: [192.168.0.103]</span>
<span class="line">ok: [192.168.0.70]</span>
<span class="line"></span>
<span class="line">TASK [whoami] ***********************************************************************************************************************</span>
<span class="line">changed: [192.168.0.103]</span>
<span class="line">changed: [192.168.0.223]</span>
<span class="line">changed: [192.168.0.70]</span>
<span class="line"></span>
<span class="line">PLAY RECAP **************************************************************************************************************************</span>
<span class="line">192.168.0.103              : ok=2    changed=1    unreachable=0    failed=0</span>
<span class="line">192.168.0.223              : ok=2    changed=1    unreachable=0    failed=0</span>
<span class="line">192.168.0.70               : ok=2    changed=1    unreachable=0    failed=0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="平时用来测试" tabindex="-1"><a class="header-anchor" href="#平时用来测试"><span>平时用来测试</span></a></h2><ul><li>创建脚本文件：<code>vim /opt/test-playbook.yml</code></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">- hosts: hadoop-test</span>
<span class="line">  remote_user: root</span>
<span class="line">  vars:</span>
<span class="line">    java_install_folder: /usr/local</span>
<span class="line">  tasks:</span>
<span class="line">    # 按行的方式写入</span>
<span class="line">    - name: Set JAVA_HOME 1</span>
<span class="line">      lineinfile: </span>
<span class="line">        dest=/etc/profile</span>
<span class="line">        line=&quot;JAVA_HOME={{ java_install_folder }}/jdk1.8.0_181&quot;</span>
<span class="line">    # 按块的方式写入，#{mark} 会被自动替换成：begin 和 end 字符来包裹整块内容（我这里自己定义了词语）</span>
<span class="line">    - name: Set JAVA_HOME 2</span>
<span class="line">      blockinfile: </span>
<span class="line">        path: /etc/profile</span>
<span class="line">        marker: &quot;#{mark} JDK ENV&quot;</span>
<span class="line">        marker_begin: &quot;开始&quot;</span>
<span class="line">        marker_end: &quot;结束&quot;</span>
<span class="line">        block: |</span>
<span class="line">          export JAVA_HOME={{ java_install_folder }}/jdk1.8.0_181</span>
<span class="line">          export PATH=$PATH:$JAVA_HOME/bin</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>执行命令：<code>ansible-playbook /opt/test-playbook.yml</code></li></ul><hr><h2 id="更多-playbook-实战" tabindex="-1"><a class="header-anchor" href="#更多-playbook-实战"><span>更多 playbook 实战</span></a></h2><h4 id="禁用防火墙-centos-7-x" tabindex="-1"><a class="header-anchor" href="#禁用防火墙-centos-7-x"><span>禁用防火墙（CentOS 7.x）</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/disable-firewalld-playbook.yml</code></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">- hosts: all</span>
<span class="line">  remote_user: root</span>
<span class="line">  tasks:</span>
<span class="line">    - name: Disable SELinux at next reboot</span>
<span class="line">      selinux:</span>
<span class="line">        state: disabled</span>
<span class="line">    - name: disable firewalld</span>
<span class="line">      command: &quot;{{ item }}&quot;</span>
<span class="line">      with_items:</span>
<span class="line">         - systemctl stop firewalld</span>
<span class="line">         - systemctl disable firewalld</span>
<span class="line">         - setenforce 0</span>
<span class="line"></span></code></pre></div><h4 id="基础环境-centos-7-x" tabindex="-1"><a class="header-anchor" href="#基础环境-centos-7-x"><span>基础环境（CentOS 7.x）</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/install-basic-playbook.yml</code></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">- hosts: all</span>
<span class="line">  remote_user: root</span>
<span class="line">  tasks:</span>
<span class="line">    - name: Disable SELinux at next reboot</span>
<span class="line">      selinux:</span>
<span class="line">        state: disabled</span>
<span class="line">        </span>
<span class="line">    - name: disable firewalld</span>
<span class="line">      command: &quot;{{ item }}&quot;</span>
<span class="line">      with_items:</span>
<span class="line">         - systemctl stop firewalld</span>
<span class="line">         - systemctl disable firewalld</span>
<span class="line">         - setenforce 0</span>
<span class="line">         </span>
<span class="line">    - name: install-basic</span>
<span class="line">      command: &quot;{{ item }}&quot;</span>
<span class="line">      with_items:</span>
<span class="line">         - yum install -y zip unzip lrzsz git epel-release wget htop deltarpm</span>
<span class="line">         </span>
<span class="line">    - name: install-vim</span>
<span class="line">      shell: &quot;{{ item }}&quot;</span>
<span class="line">      with_items:</span>
<span class="line">         - yum install -y vim</span>
<span class="line">         - curl https://raw.githubusercontent.com/wklken/vim-for-server/master/vimrc &gt; ~/.vimrc</span>
<span class="line">         </span>
<span class="line">    - name: install-docker</span>
<span class="line">      shell: &quot;{{ item }}&quot;</span>
<span class="line">      with_items:</span>
<span class="line">         - yum install -y yum-utils device-mapper-persistent-data lvm2</span>
<span class="line">         - yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo</span>
<span class="line">         - yum makecache fast</span>
<span class="line">         - yum install -y docker-ce</span>
<span class="line">         - systemctl start docker.service</span>
<span class="line">         - docker run hello-world</span>
<span class="line">         </span>
<span class="line">    - name: install-docker-compose</span>
<span class="line">      shell: &quot;{{ item }}&quot;</span>
<span class="line">      with_items:</span>
<span class="line">         - curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-\`uname -s\`-\`uname -m\` -o /usr/local/bin/docker-compose</span>
<span class="line">         - chmod +x /usr/local/bin/docker-compose</span>
<span class="line">         - docker-compose --version</span>
<span class="line">         - systemctl restart docker.service</span>
<span class="line">         - systemctl enable docker.service</span>
<span class="line">         </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>执行命令：<code>ansible-playbook /opt/install-basic-playbook.yml</code></li></ul><h4 id="修改-hosts" tabindex="-1"><a class="header-anchor" href="#修改-hosts"><span>修改 hosts</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/hosts-playbook.yml</code></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">- hosts: all</span>
<span class="line">  remote_user: root</span>
<span class="line">  tasks:</span>
<span class="line">    - name: update hosts</span>
<span class="line">      blockinfile: </span>
<span class="line">        path: /etc/hosts</span>
<span class="line">        block: |</span>
<span class="line">          192.168.0.223     linux01</span>
<span class="line">          192.168.0.223     linux02</span>
<span class="line">          192.168.0.223     linux03</span>
<span class="line">          192.168.0.223     linux04</span>
<span class="line">          192.168.0.223     linux05</span>
<span class="line"></span></code></pre></div><ul><li>执行命令：<code>ansible-playbook /opt/hosts-playbook.yml</code></li></ul><h4 id="部署-jdk" tabindex="-1"><a class="header-anchor" href="#部署-jdk"><span>部署 JDK</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/jdk8-playbook.yml</code></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">- hosts: hadoop-host</span>
<span class="line">  remote_user: root</span>
<span class="line">  vars:</span>
<span class="line">    java_install_folder: /usr/local</span>
<span class="line">  tasks:</span>
<span class="line">    - name: copy jdk</span>
<span class="line">      copy: src=/opt/jdk-8u181-linux-x64.tar.gz dest={{ java_install_folder }}</span>
<span class="line">      </span>
<span class="line">    - name: tar jdk</span>
<span class="line">      shell: chdir={{ java_install_folder }} tar zxf jdk-8u181-linux-x64.tar.gz</span>
<span class="line">      </span>
<span class="line">    - name: set JAVA_HOME</span>
<span class="line">      blockinfile: </span>
<span class="line">        path: /etc/profile</span>
<span class="line">        marker: &quot;#{mark} JDK ENV&quot;</span>
<span class="line">        block: |</span>
<span class="line">          JAVA_HOME={{ java_install_folder }}/jdk1.8.0_181</span>
<span class="line">          JRE_HOME=$JAVA_HOME/jre</span>
<span class="line">          PATH=$PATH:$JAVA_HOME/bin</span>
<span class="line">          CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar</span>
<span class="line">          export JAVA_HOME</span>
<span class="line">          export JRE_HOME</span>
<span class="line">          export PATH</span>
<span class="line">          export CLASSPATH</span>
<span class="line">    </span>
<span class="line">    - name: source profile</span>
<span class="line">      shell: source /etc/profile</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>执行命令：<code>ansible-playbook /opt/jdk8-playbook.yml</code></li></ul><h4 id="部署-hadoop-集群" tabindex="-1"><a class="header-anchor" href="#部署-hadoop-集群"><span>部署 Hadoop 集群</span></a></h4><ul><li>创建脚本文件：<code>vim /opt/hadoop-playbook.yml</code></li><li>刚学 Ansible，不好动配置文件，所以就只保留环境部分的设置，其他部分自行手工~</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">- hosts: hadoop-host</span>
<span class="line">  remote_user: root</span>
<span class="line">  tasks:</span>
<span class="line">    - name: Creates directory</span>
<span class="line">      file:</span>
<span class="line">        path: /data/hadoop/hdfs/name</span>
<span class="line">        state: directory</span>
<span class="line">    - name: Creates directory</span>
<span class="line">      file:</span>
<span class="line">        path: /data/hadoop/hdfs/data</span>
<span class="line">        state: directory</span>
<span class="line">    - name: Creates directory</span>
<span class="line">      file:</span>
<span class="line">        path: /data/hadoop/hdfs/tmp</span>
<span class="line">        state: directory</span>
<span class="line"></span>
<span class="line">    - name: set HADOOP_HOME</span>
<span class="line">      blockinfile: </span>
<span class="line">        path: /etc/profile</span>
<span class="line">        marker: &quot;#{mark} HADOOP ENV&quot;</span>
<span class="line">        block: |</span>
<span class="line">          HADOOP_HOME=/usr/local/hadoop</span>
<span class="line">          PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin</span>
<span class="line">          export HADOOP_HOME</span>
<span class="line">          export PATH</span>
<span class="line">    </span>
<span class="line">    - name: source profile</span>
<span class="line">      shell: source /etc/profile</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>执行命令：<code>ansible-playbook /opt/hadoop-playbook.yml</code></li></ul><hr><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><ul><li><a href="https://www.jianshu.com/p/081139f73613" target="_blank" rel="noopener noreferrer">ANSIBLE模块 - shell和command区别</a></li><li><a href="https://www.the5fire.com/ansible-guide-cn.html" target="_blank" rel="noopener noreferrer">https://www.the5fire.com/ansible-guide-cn.html</a></li><li><a href="https://www.jianshu.com/p/62388a4fcbc6" target="_blank" rel="noopener noreferrer">https://www.jianshu.com/p/62388a4fcbc6</a></li><li><a href="http://showme.codes/2017-06-12/ansible-introduce/" target="_blank" rel="noopener noreferrer">http://showme.codes/2017-06-12/ansible-introduce/</a></li></ul>`,65)])])}const p=n(i,[["render",t]]),r=JSON.parse('{"path":"/linux-tutor/server/Ansible-Install-And-Settings.html","title":"Ansible 安装和配置","lang":"zh-CN","frontmatter":{"description":"Ansible 安装和配置 Ansible 说明 Ansible 官网：https://www.ansible.com/ Ansible 官网 Github：https://github.com/ansible/ansible Ansible 官网文档：https://docs.ansible.com// 简单讲：它的作用就是把写 shell 这件事变...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Ansible 安装和配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-27T01:37:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/server/Ansible-Install-And-Settings.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Ansible 安装和配置"}],["meta",{"property":"og:description","content":"Ansible 安装和配置 Ansible 说明 Ansible 官网：https://www.ansible.com/ Ansible 官网 Github：https://github.com/ansible/ansible Ansible 官网文档：https://docs.ansible.com// 简单讲：它的作用就是把写 shell 这件事变..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-27T01:37:35.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-27T01:37:35.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1653615455000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.97,"words":1192},"filePathRelative":"linux-tutor/server/Ansible-Install-And-Settings.md","autoDesc":true}');export{p as comp,r as data};
