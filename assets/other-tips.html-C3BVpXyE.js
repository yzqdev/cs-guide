import{_ as n,c as a,a as e,o as i}from"./app-B6vXTniy.js";const p={};function l(c,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="git简单介绍" tabindex="-1"><a class="header-anchor" href="#git简单介绍"><span>Git简单介绍</span></a></h1><p><a href="https://juejin.cn/post/7131713973572861966#heading-16" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/7131713973572861966#heading-16</a><code>Git</code>是一个分布式版本控制软件，最初由<code>Linus Torvalds</code>创作，于2005年以<code>GPL</code>发布。最初目的是为更好地管理<code>Linux</code>内核开发而设计。</p><h2 id="git工作流程以及各个区域" tabindex="-1"><a class="header-anchor" href="#git工作流程以及各个区域"><span>Git工作流程以及各个区域</span></a></h2><p><img src="https://img.iisheng.cn/git-area.png?01" alt="img"></p><ul><li>Workspace：工作区</li><li>Staging/Index：暂存区</li><li>Local Repository：本地仓库（可修改）</li><li>/refs/remotes：远程仓库的引用（不可修改）</li><li>Remote：远程仓库</li></ul><h2 id="git文件状态变化" tabindex="-1"><a class="header-anchor" href="#git文件状态变化"><span>Git文件状态变化</span></a></h2><p><img src="https://img.iisheng.cn/git-file-status.png?01" alt="img"></p><h2 id="git各种命令" tabindex="-1"><a class="header-anchor" href="#git各种命令"><span>Git各种命令</span></a></h2><h3 id="git简单命令" tabindex="-1"><a class="header-anchor" href="#git简单命令"><span>Git简单命令</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 在当前目录新建一个git仓库</span></span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 打开git仓库图形界面</span></span>
<span class="line">gitk</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 显示所有变更信息</span></span>
<span class="line"><span class="token function">git</span> status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除所有Untracked files</span></span>
<span class="line"><span class="token function">git</span> clean <span class="token parameter variable">-fd</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 下载远程仓库的所有更新</span></span>
<span class="line"><span class="token function">git</span> fetch remote</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 下载远程仓库的所有更新，并且Merge</span></span>
<span class="line"><span class="token function">git</span> pull romote branch-name</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看上次commit id</span></span>
<span class="line"><span class="token function">git</span> rev-parse HEAD </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将指定分支合并到当前分支</span></span>
<span class="line"><span class="token function">git</span> merge branch-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将最近的一次commit打包到patch文件中</span></span>
<span class="line"><span class="token function">git</span> format-patch HEAD^ </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将patch文件 添加到本地仓库</span></span>
<span class="line"><span class="token function">git</span> am  patch-file</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看指定文件修改历史</span></span>
<span class="line"><span class="token function">git</span> blame file-name</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="git常用命令" tabindex="-1"><a class="header-anchor" href="#git常用命令"><span>Git常用命令</span></a></h3><h4 id="git-clone" tabindex="-1"><a class="header-anchor" href="#git-clone"><span>git clone</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 将远程git仓库克隆到本地</span></span>
<span class="line"><span class="token function">git</span> clone url</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将远程git仓库克隆到本地</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token parameter variable">-b</span> branch url </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="git-stash" tabindex="-1"><a class="header-anchor" href="#git-stash"><span>git stash</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 将修改过，未add到Staging区的文件，暂时存储起来</span></span>
<span class="line"><span class="token function">git</span> stash</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复之前stash存储的内容</span></span>
<span class="line"><span class="token function">git</span> stash apply</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 保存stash 并写message</span></span>
<span class="line"><span class="token function">git</span> stash save <span class="token string">&quot;stash test&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看stash了哪些存储</span></span>
<span class="line"><span class="token function">git</span> stash list</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将stash@{1}存储的内容还原到工作区</span></span>
<span class="line"><span class="token function">git</span> stash apply stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除stash@{1}存储的内容</span></span>
<span class="line"><span class="token function">git</span> stash drop stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除所有缓存的stash</span></span>
<span class="line"><span class="token function">git</span> stash <span class="token function">clear</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-config" tabindex="-1"><a class="header-anchor" href="#git-config"><span>git config</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 配置git图形界面编码为utf-8</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token assign-left variable">gui.encoding</span><span class="token operator">=</span>utf-8 </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置全局提交代码的用户名 </span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name name  </span>
<span class="line"><span class="token comment"># 设置全局提交代码时的邮箱</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email email</span>
<span class="line"><span class="token comment"># 设置当前项目提交代码的用户名 </span></span>
<span class="line"><span class="token function">git</span> config user.name name  </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="git-remote" tabindex="-1"><a class="header-anchor" href="#git-remote"><span>git remote</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 显示所有远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token parameter variable">-v</span>  </span>
<span class="line"></span>
<span class="line"><span class="token comment">#  增加一个新的远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> name url </span>
<span class="line"></span>
<span class="line"><span class="token comment">#  删除指定远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote remove name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取指定远程仓库的详细信息</span></span>
<span class="line"><span class="token function">git</span> remote show origin</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="git-add" tabindex="-1"><a class="header-anchor" href="#git-add"><span>git add</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 添加所有的修改到Staging区</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">--all</span>  </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加指定文件到Staging区</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token function">file</span>   </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加多个修改的文件到Staging区</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file1 file2   </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加修改的目录到Staging区</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token function">dir</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加所有src目录下main开头的所有文件到Staging区    </span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> src/main*  </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-commit" tabindex="-1"><a class="header-anchor" href="#git-commit"><span>git commit</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 提交Staging区的代码到本地仓库区</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;message&quot;</span>  </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 提交Staging中在指定文件到本地仓库区</span></span>
<span class="line"><span class="token function">git</span> commit file1 file2 <span class="token parameter variable">-m</span> <span class="token string">&quot;message&quot;</span>  </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用新的一次commit，来覆盖上一次commit</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;message&quot;</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改上次提交的用户名和邮箱</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">--author</span><span class="token operator">=</span><span class="token string">&quot;name &lt;email&gt;&quot;</span> --no-edit</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="git-branch" tabindex="-1"><a class="header-anchor" href="#git-branch"><span>git branch</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 列出本地所有分支</span></span>
<span class="line"><span class="token function">git</span> branch   </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出本地所有分支 并显示最后一次提交的哈希值</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-v</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在-v 的基础上 并且显示上游分支的名字</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-vv</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出上游所有分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-r</span>  </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 新建一个分支，但依然停留在当前分支</span></span>
<span class="line"><span class="token function">git</span> branch branch-name  </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> branch-name   </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置分支上游</span></span>
<span class="line"><span class="token function">git</span> branch --set-upstream-to origin/master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 本地分支重命名</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-m</span> old-branch new-branch</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-checkout" tabindex="-1"><a class="header-anchor" href="#git-checkout"><span>git checkout</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建本地分支并关联远程分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> local-branch origin/remote-branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 新建一个分支，且切换到新分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> branch-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切换到另一个分支</span></span>
<span class="line"><span class="token function">git</span> checkout branch-name  </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销工作区文件的修改，跟上次Commit一样</span></span>
<span class="line"><span class="token function">git</span> checkout commit-file  </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="git-tag" tabindex="-1"><a class="header-anchor" href="#git-tag"><span>git tag</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建带有说明的标签</span></span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.4 <span class="token parameter variable">-m</span> <span class="token string">&#39;my version 1.4&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#  打标签</span></span>
<span class="line"><span class="token function">git</span> tag tag-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有标签</span></span>
<span class="line"><span class="token function">git</span> tag </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 给指定commit打标签</span></span>
<span class="line"><span class="token function">git</span> tag tag-name commit-id</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除标签</span></span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-d</span> tag-name   </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-push" tabindex="-1"><a class="header-anchor" href="#git-push"><span>git push</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 删除远程分支</span></span>
<span class="line"><span class="token function">git</span> push origin :master   </span>
<span class="line"></span>
<span class="line"><span class="token comment">#  删除远程标签</span></span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> tag tag-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 上传本地仓库到远程分支</span></span>
<span class="line"><span class="token function">git</span> push remote branch-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强行推送当前分支到远程分支</span></span>
<span class="line"><span class="token function">git</span> push remote branch-name <span class="token parameter variable">--force</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 推送所有分支到远程仓库</span></span>
<span class="line"><span class="token function">git</span> push remote <span class="token parameter variable">--all</span>  </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 推送所有标签</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--tags</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 推送指定标签</span></span>
<span class="line"><span class="token function">git</span> push origin tag-name</span>
<span class="line"></span>
<span class="line"><span class="token comment">#  删除远程标签（需要先删除本地标签）</span></span>
<span class="line"><span class="token function">git</span> push origin :refs/tags/tag-name  </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将本地dev分支push到远程master分支</span></span>
<span class="line"><span class="token function">git</span> push origin dev:master</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-reset" tabindex="-1"><a class="header-anchor" href="#git-reset"><span>git reset</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 将未commit的文件移出Staging区</span></span>
<span class="line"><span class="token function">git</span> reset HEAD</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重置Staging区与上次commit的一样</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span>  </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重置Commit代码和远程分支代码一样</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> origin/master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 回退到上个commit</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD^</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 回退到前3次提交之前，以此类推，回退到n次提交之前</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~3</span>
<span class="line"></span>
<span class="line">回退到指定commit</span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> commit-id     </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-diff" tabindex="-1"><a class="header-anchor" href="#git-diff"><span>git diff</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看文件在工作区和暂存区区别</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> file-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看暂存区和本地仓库区别</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--cached</span>  file-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看文件和另一个分支的区别</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> branch-name file-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看两次提交的区别</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> commit-id commit-id  </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="git-show" tabindex="-1"><a class="header-anchor" href="#git-show"><span>git show</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看指定标签的提交信息</span></span>
<span class="line"><span class="token function">git</span> show tag-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看具体的某次改动</span></span>
<span class="line"><span class="token function">git</span> show commit-id </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="git-log" tabindex="-1"><a class="header-anchor" href="#git-log"><span>git log</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 指定文件夹 log</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">&quot;%h %cn %s %cd&quot;</span> <span class="token parameter variable">--author</span><span class="token operator">=</span><span class="token string">&quot;iisheng\\|胜哥&quot;</span>  <span class="token parameter variable">--date</span><span class="token operator">=</span>short src</span>
<span class="line"><span class="token comment"># 查看指定用户指定format 提交</span></span>
<span class="line">  <span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">&quot;%h %cn %s %cd&quot;</span> <span class="token parameter variable">--author</span><span class="token operator">=</span>iisheng <span class="token parameter variable">--date</span><span class="token operator">=</span>short </span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看该文件的改动历史</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline <span class="token function">file</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 图形化查看历史提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline --abbrev-commit</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 统计仓库提交排名前5</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span><span class="token string">&#39;%aN&#39;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k1</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-r</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">5</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看指定用户添加代码行数，和删除代码行数</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--author</span><span class="token operator">=</span><span class="token string">&quot;iisheng&quot;</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>tformat: <span class="token parameter variable">--numstat</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{ add += $1 ; subs += $2 } END { printf &quot;added lines: %s removed lines : %s \\n&quot;,add,subs }&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-rebase" tabindex="-1"><a class="header-anchor" href="#git-rebase"><span>git rebase</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 将指定分支合并到当前分支</span></span>
<span class="line"><span class="token function">git</span> rebase branch-name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行commit id 将rebase 停留在指定commit 处</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">-i</span> commit-id</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行commit id 将rebase 停留在 项目首次commit处</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">-i</span> <span class="token parameter variable">--root</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="git-restore" tabindex="-1"><a class="header-anchor" href="#git-restore"><span>git restore</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 恢复第一次add 的文件，同 git rm --cached</span></span>
<span class="line"><span class="token function">git</span> restore <span class="token parameter variable">--staged</span> <span class="token function">file</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 移除staging区的文件，同 git checkout</span></span>
<span class="line"><span class="token function">git</span> restore <span class="token function">file</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="git-revert" tabindex="-1"><a class="header-anchor" href="#git-revert"><span>git revert</span></a></h4><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 撤销前一次commit</span></span>
<span class="line"><span class="token function">git</span> revert HEAD</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销前前一次commit</span></span>
<span class="line"><span class="token function">git</span> revert HEAD^</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销指定某次commit</span></span>
<span class="line"><span class="token function">git</span> revert commit-id</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="git骚操作" tabindex="-1"><a class="header-anchor" href="#git骚操作"><span>Git骚操作</span></a></h2><h4 id="git命令不能自动补全-mac版" tabindex="-1"><a class="header-anchor" href="#git命令不能自动补全-mac版"><span>Git命令不能自动补全？（Mac版）</span></a></h4><blockquote><p>我见过有的人使用<code>Git</code>别名，反正因为有自动补全的存在，我从来没用过<code>Git</code>别名。不过我的确将我的<code>rm -rf</code>命令替换成了别的脚本了...</p></blockquote><p>安装<code>bash-completion</code></p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">brew install bash-completion</span>
<span class="line"></span></code></pre></div><p>添加 bash-completion 到<code>~/.bash_profile</code>:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"> <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span><span class="token variable">)</span></span>/etc/bash_completion <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">.</span> <span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--prefix</span><span class="token variable">)</span></span>/etc/bash_completion</span>
<span class="line"> <span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><blockquote><p><code>shell</code>有不同种类，我这里使用的是<code>bash</code>。</p></blockquote><h4 id="代码没写完-突然要切换到别的分支怎么办" tabindex="-1"><a class="header-anchor" href="#代码没写完-突然要切换到别的分支怎么办"><span>代码没写完，突然要切换到别的分支怎么办？</span></a></h4><p>暂存未提交的代码</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> stash</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>还原暂存的代码</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> stash apply</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="怎么合并其他分支的指定commit" tabindex="-1"><a class="header-anchor" href="#怎么合并其他分支的指定commit"><span>怎么合并其他分支的指定Commit？</span></a></h4><p>使用<code>cherry-pick</code>命令</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> cherry-pick 指定commit-id</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="本地临时代码不想提交-怎么一次性清空" tabindex="-1"><a class="header-anchor" href="#本地临时代码不想提交-怎么一次性清空"><span>本地临时代码不想提交，怎么一次性清空？</span></a></h4><p>还原未<code>commit</code>的本地更改的代码</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>还原包含<code>commit</code>的代码，到跟远程分支相同</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> origin/master</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="已经提交的代码-不需要了-怎么当做没提交过" tabindex="-1"><a class="header-anchor" href="#已经提交的代码-不需要了-怎么当做没提交过"><span>已经提交的代码，不需要了，怎么当做没提交过？</span></a></h4><p>还原到上次<code>commit</code></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD^</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>还原到当前之前的几次<code>commit</code></p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~2</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>强制推送到远程分支，确保没有其他人在<code>push</code>，不然可能会丢失代码</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> push origin develop <span class="token parameter variable">--force</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="历史commit作者邮箱写错了-怎么一次性改过来" tabindex="-1"><a class="header-anchor" href="#历史commit作者邮箱写错了-怎么一次性改过来"><span>历史commit作者邮箱写错了，怎么一次性改过来？</span></a></h4><p>使用<code>git filter-branch</code>命令。</p><p>复制下面的脚本，替换相关变量</p><ul><li><code>OLD_EMAIL</code></li><li><code>CORRECT_NAME</code></li><li><code>CORRECT_EMAIL</code></li></ul><p>脚本如下：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> filter-branch --env-filter <span class="token string">&#39;</span>
<span class="line"></span>
<span class="line">OLD_EMAIL=&quot;your-old-email@example.com&quot;</span>
<span class="line">CORRECT_NAME=&quot;Your Correct Name&quot;</span>
<span class="line">CORRECT_EMAIL=&quot;your-correct-email@example.com&quot;</span>
<span class="line"></span>
<span class="line">if [ &quot;$GIT_COMMITTER_EMAIL&quot; = &quot;$OLD_EMAIL&quot; ]</span>
<span class="line">then</span>
<span class="line">export GIT_COMMITTER_NAME=&quot;$CORRECT_NAME&quot;</span>
<span class="line">export GIT_COMMITTER_EMAIL=&quot;$CORRECT_EMAIL&quot;</span>
<span class="line">fi</span>
<span class="line">if [ &quot;$GIT_AUTHOR_EMAIL&quot; = &quot;$OLD_EMAIL&quot; ]</span>
<span class="line">then</span>
<span class="line">export GIT_AUTHOR_NAME=&quot;$CORRECT_NAME&quot;</span>
<span class="line">export GIT_AUTHOR_EMAIL=&quot;$CORRECT_EMAIL&quot;</span>
<span class="line">fi</span>
<span class="line">&#39;</span> --tag-name-filter <span class="token function">cat</span> -- <span class="token parameter variable">--branches</span> <span class="token parameter variable">--tags</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>强制推送替换</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> push <span class="token parameter variable">--force</span> <span class="token parameter variable">--tags</span> origin <span class="token string">&#39;refs/heads/*&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="不小心把不该提交的文件commit了-怎么永久删除" tabindex="-1"><a class="header-anchor" href="#不小心把不该提交的文件commit了-怎么永久删除"><span>不小心把不该提交的文件commit了，怎么永久删除？</span></a></h4><p>也是使用<code>git filter-branch</code>命令。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> filter-branch <span class="token parameter variable">--force</span> --index-filter <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token string">&quot;git rm --cached --ignore-unmatch FILE-PATH-AND-NAME&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">  --prune-empty --tag-name-filter <span class="token function">cat</span> -- <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>强制推送覆盖远程分支。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--force</span> <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>强制推送覆盖远程<code>tag</code>。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--force</span> <span class="token parameter variable">--tags</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="删除文件" tabindex="-1"><a class="header-anchor" href="#删除文件"><span>删除文件</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> filter-branch <span class="token parameter variable">--force</span> --index-filter <span class="token string">&#39;git rm --cached --ignore-unmatch walterlv.xml&#39;</span> --prune-empty --tag-name-filter <span class="token function">cat</span> -- <span class="token parameter variable">--all</span></span>
<span class="line"><span class="token comment"># 删除文件夹多了一个-r</span></span>
<span class="line"><span class="token function">git</span> filter-branch <span class="token parameter variable">--force</span> --index-filter <span class="token string">&#39;git rm --cached -r --ignore-unmatch folder&#39;</span> --prune-empty --tag-name-filter <span class="token function">cat</span> -- <span class="token parameter variable">--all</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 然后强制推送</span></span>
<span class="line"><span class="token function">git</span> push origin main <span class="token parameter variable">-f</span></span>
<span class="line"></span></code></pre></div><h4 id="怎么保证团队成员提交的代码都是可运行的" tabindex="-1"><a class="header-anchor" href="#怎么保证团队成员提交的代码都是可运行的"><span>怎么保证团队成员提交的代码都是可运行的？</span></a></h4><p>这里想说的是使用<code>git hooks</code>，一般在项目目录<code>.git/hooks</code>，客户端可以使用<code>hooks</code>，控制团队<code>commit</code>提交规范，或者<code>push</code>之前，自动编译项目校验项目可运行。服务端可以使用<code>hooks</code>，控制push之后自动构建项目，<code>merge</code>等自动触发单元测试等。</p><h4 id="git-reset-hard命令-执行错了-能恢复吗" tabindex="-1"><a class="header-anchor" href="#git-reset-hard命令-执行错了-能恢复吗"><span><code>git reset --hard</code>命令，执行错了，能恢复吗？</span></a></h4><p>查看当前<code>commit log</code> <img src="https://img.iisheng.cn/current-commit-log.png" alt="img"></p><p>误操作<code>git reset --hard 8529cb7</code> <img src="https://img.iisheng.cn/after-reset.png" alt="img"></p><p>执行<code>git reflog</code> <img src="https://img.iisheng.cn/reflog.png" alt="img"></p><p>还原到之前的样子 <img src="https://img.iisheng.cn/restore.png" alt="img"></p><h4 id="公司使用gitlab-平时还用github-多账号ssh-如何配置" tabindex="-1"><a class="header-anchor" href="#公司使用gitlab-平时还用github-多账号ssh-如何配置"><span>公司使用GitLab，平时还用GitHub，多账号SSH，如何配置？</span></a></h4><p>编辑 <code>~/.ssh/config</code>文件 没有就创建</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># github</span></span>
<span class="line">Host github.com</span>
<span class="line">Port <span class="token number">22</span></span>
<span class="line">HostName github.com</span>
<span class="line">PreferredAuthentications publickey</span>
<span class="line">AddKeysToAgent <span class="token function">yes</span></span>
<span class="line">IdentityFile ~/.ssh/github_id_rsa</span>
<span class="line">UseKeychain <span class="token function">yes</span></span>
<span class="line">User iisheng</span>
<span class="line"></span>
<span class="line"><span class="token comment"># gitlab</span></span>
<span class="line">Host gitlab.iisheng.cn</span>
<span class="line">Port <span class="token number">22</span></span>
<span class="line">HostName gitlab.iisheng.cn</span>
<span class="line">PreferredAuthentications publickey</span>
<span class="line">AddKeysToAgent <span class="token function">yes</span></span>
<span class="line">IdentityFile ~/.ssh/gitlab_id_rsa</span>
<span class="line">UseKeychain <span class="token function">yes</span></span>
<span class="line">User iisheng</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="git-commits历史如何变得清爽起来" tabindex="-1"><a class="header-anchor" href="#git-commits历史如何变得清爽起来"><span>Git commits历史如何变得清爽起来？</span></a></h4><p>多用<code>git rebase</code>。</p><p>比如，开发分支是<code>feature</code>，主干分支是<code>master</code>。我们在进行代码合并的时候，可以执行下面的命令。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 切换当前分支到feature</span></span>
<span class="line"><span class="token function">git</span> checkout feature</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 将当前分支代码变基为基于master</span></span>
<span class="line"><span class="token function">git</span> rebase master</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>然后我们再切换到<code>master</code>分支，执行<code>git merge feature</code>，就可以进行快进式合并了，<code>commmits</code>历史就不会有交叉了。后文我们会详细讲解。</p><blockquote><p><code>git rebase</code>会更改commit历史，请谨慎使用。</p></blockquote><p>下面的图是<code>Guava</code>项目的<code>commit</code>记录。 <img src="https://img.iisheng.cn/commits-history.png" alt="img"></p><h4 id="如何修改已经提交的commit信息" tabindex="-1"><a class="header-anchor" href="#如何修改已经提交的commit信息"><span>如何修改已经提交的commit信息？</span></a></h4><p>原始<code>Git</code>提交记录是这样的 <img src="https://img.iisheng.cn/origin-log.png" alt="img"></p><p>执行<code>git rebase -i 070943d</code>，对指定commitId之前的提交，进行修改 <img src="https://img.iisheng.cn/rebase-modifying.png" alt="img"></p><p>修改后<code>Git</code>提交记录变成了这样 <img src="https://img.iisheng.cn/modified-log.png" alt="img"></p><blockquote><p><code>git rebase -i</code>非常实用，还可以将多个commit合并成一个等很多事情，务必要记下。</p></blockquote><h4 id="不小心执行了git-stash-clear怎么办" tabindex="-1"><a class="header-anchor" href="#不小心执行了git-stash-clear怎么办"><span>不小心执行了<code>git stash clear</code>怎么办？</span></a></h4><div class="language-Java" data-highlighter="prismjs" data-ext="Java"><pre><code class="language-Java"><span class="line">git fsck --lost-found</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>执行之后，可以找到相关丢失的<code>commit-id</code>，然后<code>merge</code>一下即可。</p><p>该命令上可以找回<code>git add</code>之后被弄丢的文件。</p><blockquote><p>啥？你没执行过<code>git add</code>代码就丢了？别怕，一般编译器有<code>Local History</code>赶紧去试试吧。</p></blockquote><h2 id="详解git-merge" tabindex="-1"><a class="header-anchor" href="#详解git-merge"><span>详解<code>git merge</code></span></a></h2><p>我们执行<code>git merge</code>命令的时候，经常会看到<code>Fast-forward</code>字样，<code>Fast-forward</code>到底是个什么东西？</p><p>其实，<code>git merge</code>一般有三种场景。</p><h3 id="快进式合并" tabindex="-1"><a class="header-anchor" href="#快进式合并"><span>快进式合并</span></a></h3><p>举个栗子，假如初始存在<code>master</code>和<code>hotfix</code>分支是这样的。 <img src="https://img.iisheng.cn/fast-forward1.png" alt="img"></p><p>然后我们在<code>hotfix</code>分支加了些代码，分支变成这样了。 <img src="https://img.iisheng.cn/fast-forward2.png" alt="img"></p><p>这个时候，我们将<code>hotfix</code>分支，<code>merge</code>到<code>master</code>，即执行<code>git merge hotfix</code>。 <img src="https://img.iisheng.cn/fast-forward3.png" alt="img"></p><p>由于的分支<code>hotfix</code>所指向的提交<code>C3</code>是<code>C2</code>的直接后继， 因此<code>Git</code>会直接将指针向前移动。换句话说，如果顺着一个分支走下去能够到达另一个分支，那么<code>Git</code>在合并两者的时候， 只会简单的将指针向前推进（指针右移），因为这种情况下的合并操作没有需要解决的分歧——这就叫做 <strong>快进（fast-forward）</strong>。</p><h3 id="三方合并" tabindex="-1"><a class="header-anchor" href="#三方合并"><span>三方合并</span></a></h3><p>再举个栗子，假如初始存在<code>feature</code>和<code>master</code>分支情况是这样的。 <img src="https://img.iisheng.cn/tripartite1.png" alt="img"></p><p>然后我们在<code>feature</code>分支加了些代码，而<code>master</code>分支也有人加了代码，现在分支变成这样了。 <img src="https://img.iisheng.cn/tripartite2.png" alt="img"></p><p>这个时候，我们将<code>feature</code>分支，<code>merge</code>到<code>master</code>，即执行<code>git merge feature</code>。 <img src="https://img.iisheng.cn/tripartite3.png" alt="img"></p><p>和之前将分支指针向前推进所不同的是，<code>Git</code>将此次三方合并的结果做了一个<strong>新的快照并且自动创建一个新的提交</strong>指向它。这个被称作一次<strong>合并提交</strong>，它的特别之处在于他有不止一个父提交。</p><blockquote><p>所以我们也知道了，为什么有的时候merge之后会产生新的commit，而有的时候没有。</p></blockquote><h3 id="遇到冲突时的合并" tabindex="-1"><a class="header-anchor" href="#遇到冲突时的合并"><span>遇到冲突时的合并</span></a></h3><p>如果在两个分支分别对同一个文件做了改动，<code>Git</code>就没法直接合并他们。当遇到冲突的时候，<code>Git</code>会自动停下来，等待我们解决冲突。就像这样</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">git</span> merge dev </span>
<span class="line">Auto-merging <span class="token number">111</span>.txt</span>
<span class="line">CONFLICT <span class="token punctuation">(</span>content<span class="token punctuation">)</span>: Merge conflict <span class="token keyword">in</span> <span class="token number">111</span>.txt</span>
<span class="line">Automatic merge failed<span class="token punctuation">;</span> fix conflicts and <span class="token keyword">then</span> commit the result.</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>我们可以在合并冲突后的任意时刻使用<code>git status</code>命令来查看那些因包含合并冲突而处于未合并<code>unmerged</code>状态的文件。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">git</span> status </span>
<span class="line">On branch master</span>
<span class="line">You have unmerged paths.</span>
<span class="line">  <span class="token punctuation">(</span>fix conflicts and run <span class="token string">&quot;git commit&quot;</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">(</span>use <span class="token string">&quot;git merge --abort&quot;</span> to abort the merge<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">Unmerged paths:</span>
<span class="line">  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to mark resolution<span class="token punctuation">)</span></span>
<span class="line"> both modified:   <span class="token number">111</span>.txt</span>
<span class="line"></span>
<span class="line">no changes added to commit <span class="token punctuation">(</span>use <span class="token string">&quot;git add&quot;</span> and/or <span class="token string">&quot;git commit -a&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>待解决冲突的文件<code>Git</code>会以未合并的状态标识出来，出现冲突的文件会出现一些特殊的区段，看起来像下面的样子。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;&lt;&lt;</span><span class="token operator">&lt;</span> HEAD</span>
<span class="line">111aaa</span>
<span class="line"><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span></span>
<span class="line">111b</span>
<span class="line"><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> dev</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>后面的是当前分支的引用，我们的例子中，就代表<code>master</code>分支。<code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>后面表示的是要合并到当前分支的分支，即<code>dev</code>分支。<code>=======</code>的上半部分，表示当前分支的代码。下半部分表示<code>dev</code>分支的代码。</p><p>我们可以把上面的测试内容改成下面的样子来解决冲突</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">111aaa</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>在解决了所有文件里的冲突之后，对每个文件使用<code>git add</code>命令来将其标记为冲突已解决。</p><p>解决冲突的过程中，每一步都可以执行<code>git status</code>查看当前状态，<code>Git</code>也会给出相应提示，进行下一步操作。当我们所有的文件都暂存之后时，执行<code>git status</code>时，<code>Git</code>会给我们看起来像下面的这种提示</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">git</span> status </span>
<span class="line">On branch master</span>
<span class="line">All conflicts fixed but you are still merging.</span>
<span class="line">  <span class="token punctuation">(</span>use <span class="token string">&quot;git commit&quot;</span> to conclude merge<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>然后，我们根据提示执行<code>git commit</code>。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">Merge branch <span class="token string">&#39;dev&#39;</span></span>
<span class="line">  </span>
<span class="line"><span class="token comment"># Conflicts:</span></span>
<span class="line"><span class="token comment">#       111.txt</span></span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"><span class="token comment"># It looks like you may be committing a merge.</span></span>
<span class="line"><span class="token comment"># If this is not correct, please remove the file</span></span>
<span class="line"><span class="token comment">#       .git/MERGE_HEAD</span></span>
<span class="line"><span class="token comment"># and try again.</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Please enter the commit message for your changes. Lines starting</span></span>
<span class="line"><span class="token comment"># with &#39;#&#39; will be ignored, and an empty message aborts the commit.</span></span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"><span class="token comment"># On branch master</span></span>
<span class="line"><span class="token comment"># All conflicts fixed but you are still merging.</span></span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们保存这次提交就完成了这次冲突合并。</p><h2 id="详解git-rebase" tabindex="-1"><a class="header-anchor" href="#详解git-rebase"><span>详解<code>git rebase</code></span></a></h2><h3 id="rebase做了什么" tabindex="-1"><a class="header-anchor" href="#rebase做了什么"><span>rebase做了什么</span></a></h3><p>举个栗子。我们同样用刚才<code>merge</code>的场景。</p><p>如果不用<code>rebase</code>，使用<code>merge</code>是下面这样的，合并分支的时候会产生一个合并提交，而且会有分支交叉的情况。 <img src="https://img.iisheng.cn/rebase1.png" alt="img"></p><p>使用<code>rebase</code>是下面这样的。 <img src="https://img.iisheng.cn/rebase2.png" alt="img"></p><p>然后，切换到<code>master</code>分支，进行一次快进式合并。 <img src="https://img.iisheng.cn/rebase3.png" alt="img"></p><blockquote><p>变基实际上就是基于其他分支重塑当前分支。变基之后，当前分支就相当于是基于最新的其他分支新加了一些commit，这样的话就可以进行快进式合并了。</p></blockquote><h3 id="rebase原理" tabindex="-1"><a class="header-anchor" href="#rebase原理"><span>rebase原理</span></a></h3><p>它的原理是首先找到这两个分支（即当前分支 <code>dev</code>、变基操作的目标基底分支<code>master</code>）的最近共同祖先 <code>C2</code>，然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件， 然后将当前分支指向目标基底<code>C3</code>, 最后以此将之前另存为临时文件的修改依序应用，也就是在<code>C3</code>后面添加<code>C4&#39;</code>、<code>C5&#39;</code>。</p><h2 id="git对象与快照" tabindex="-1"><a class="header-anchor" href="#git对象与快照"><span>Git对象与快照</span></a></h2><p>提到<code>Git</code>，总有人会说<strong>快照</strong>，<strong>快照</strong>是个什么鬼？</p><p>实际上，<code>Git</code>是一个内容寻址文件系统，其核心部分是一个简单的键值对数据库。将<code>Git</code>中的对象，存储在<code>.git/objects</code>目录下。</p><p><code>Git</code>对象主要分为，<strong>数据对象（blob object）</strong>、<strong>树对象（tree object）</strong>、<strong>提交对象（commit object）</strong>、<strong>标签对象（tag object）</strong>。</p><h3 id="数据对象" tabindex="-1"><a class="header-anchor" href="#数据对象"><span>数据对象</span></a></h3><p>我们新建一个目录，然后在该目录下执行<code>git init</code>初始化一个<code>Git</code>项目。</p><p>然后，查看<code>.git/objects</code>目录下都有什么。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">find</span> .git/objects</span>
<span class="line">.git/objects</span>
<span class="line">.git/objects/pack</span>
<span class="line">.git/objects/info</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>接着，我们写一个文件<code>echo &#39;1111&#39; &gt; 111.txt</code>，并执行<code>git add</code>之后，再查看。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">find</span> .git/objects</span>
<span class="line">.git/objects</span>
<span class="line">.git/objects/5f</span>
<span class="line">.git/objects/5f/2f16bfff90e6620509c0cf442e7a3586dad8fb</span>
<span class="line">.git/objects/pack</span>
<span class="line">.git/objects/info</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>我们发现<code>.git/objects</code>目录下，多了个文件和目录。实际上，<code>Git</code>会将我们的文件数据外加一个头部信息<code>header</code>一起做<code>SHA-1</code>校验运算而得到校验和。然后，校验和的前2个字符用于命名子目录，余下的38个字符则用作文件名。</p><p>我们可以使用下面的命令，显示在<code>Git</code>对象中存储的内容。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">git</span> cat-file <span class="token parameter variable">-p</span> 5f2f16bfff90e6620509c0cf442e7a3586dad8fb</span>
<span class="line"><span class="token number">1111</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>这就是我们在上文写入的文件内容。</p><p>上述类型的对象称之为<strong>数据对象（blob object）</strong>。数据对象，仅保存了文件内容，而文件名字没有被保存。</p><h3 id="树对象" tabindex="-1"><a class="header-anchor" href="#树对象"><span>树对象</span></a></h3><p>数据对象大致对应<code>UNIX</code>中的<code>inodes</code>或文件内容，树对象则对应了<code>UNIX</code>中的目录项。一个<strong>树对象</strong>包含了一条或多条<strong>树对象记录（tree entry）</strong>，每条记录含有一个指向数据对象或者子树对象的<code>SHA-1</code>指针，以及相应的模式、类型、文件名信息。</p><p>通常，<code>Git</code>根据某一时刻暂存区（即<code>index</code>区域）所表示的状态创建并记录一个对应的树对象。</p><p>当我们执行过<code>git add</code>之后，暂存区就有内容了，我们可以通过<code>Git</code>底层命令，生成树对象。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">git</span> write-tree</span>
<span class="line">b716c7b049ccd9048b0566a57cfd516c17c1e39f</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>查看该树对象的内容。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">git</span> cat-file <span class="token parameter variable">-p</span> b716c7b049ccd9048b0566a57cfd516c17c1e39f</span>
<span class="line"><span class="token number">100644</span> blob 5f2f16bfff90e6620509c0cf442e7a3586dad8fb <span class="token number">111</span>.txt</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="提交对象" tabindex="-1"><a class="header-anchor" href="#提交对象"><span>提交对象</span></a></h3><p>数据对象保存了数据的内容，树对象可以表示当前目录的快照。但是，若想重用这些快照，必须记住树对象的<code>SHA-1</code>哈希值。而且，我们也不知道是谁保存了这些快照，在什么时刻保存的，以及为什么保存这些快照。而以上这些，正是 <strong>提交对象（commit object）</strong> 能保存的基本信息。</p><p>我们对当前暂存区进行一次提交，<code>git commit -m &quot;first commit&quot;</code>。</p><p>然后查看一下<code>log</code>找到该次提交的<code>commit</code>哈希值。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> </span>
<span class="line">5281f7e <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> first commit</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>接着，我们查看一下该提交对象的内容。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ <span class="token function">git</span> cat-file <span class="token parameter variable">-p</span> 5281f7e</span>
<span class="line">tree b716c7b049ccd9048b0566a57cfd516c17c1e39f</span>
<span class="line">author iisheng <span class="token operator">&lt;</span>***@gmail.com<span class="token operator">&gt;</span> <span class="token number">1596073568</span> +0800</span>
<span class="line">committer iisheng <span class="token operator">&lt;</span>***@gmail.com<span class="token operator">&gt;</span> <span class="token number">1596073568</span> +0800</span>
<span class="line"></span>
<span class="line">first commit</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>提交对象的格式很简单：它先指定一个顶层树对象，代表当前项目快照；然后是可能存在的父提交（前面描述的提交对象并不存在任何父提交）；之后是作者/提交者信息（依据你的<code>user.name</code>和<code>user.email</code>配置来设定，外加一个时间戳）；留空一行，最后是提交注释。</p><h3 id="标签对象" tabindex="-1"><a class="header-anchor" href="#标签对象"><span>标签对象</span></a></h3><p><strong>标签对象（tag object）</strong> 非常类似于一个提交对象——它包含一个标签创建者信息、一个日期、一段注释信息，以及一个指针。主要的区别在于，<strong>标签对象通常指向一个提交对象</strong>，而不是一个树对象。它像是一个永不移动的分支引用——永远指向同一个提交对象，只不过给这个提交对象加上一个更友好的名字罢了。</p><blockquote><p>实际上<code>Git</code>中的各种对象都是类似的，只不过因为各种对象自身功能不同，存储结构不同而已。</p></blockquote><h2 id="git引用-我从远程拉的代码不是最新的" tabindex="-1"><a class="header-anchor" href="#git引用-我从远程拉的代码不是最新的"><span>Git引用-我从远程拉的代码不是最新的？</span></a></h2><p><code>Git</code>引用相当于是<code>Git</code>中特定哈希值的别名。一长串的哈希值不是很友好，但是起个别名，我们就可以像这样<code>git show master</code>、<code>git log master</code>的去使用他们。</p><p><code>Git</code>中的引用存储在<code>.git/refs</code>目录下。我们可以执行<code>find .git/refs/</code>查看当前<code>Git</code>项目中都存在哪些引用。</p><h3 id="head引用" tabindex="-1"><a class="header-anchor" href="#head引用"><span>HEAD引用</span></a></h3><p>在<code>.git</code>目录下有一个名字叫做<code>HEAD</code>的文件，<code>HEAD</code>文件通常是一个符号引用（symbolic reference）指向目前所在的分支。所谓符号引用，表示它是一个指向其他引用的指针。</p><p>如果我们在工作区<code>checkout</code>一个<code>SHA-1</code>值，<code>HEAD</code>引用也会指向这个包含<code>Git</code>对象的<code>SHA-1</code>值。</p><h3 id="标签引用" tabindex="-1"><a class="header-anchor" href="#标签引用"><span>标签引用</span></a></h3><p><code>Git</code>标签分为，附注标签和轻量标签。轻量标签，使用<code>git tag v1.0</code>即可创建。附注标签需要使用<code>-a</code>选项，即<code>git tag -a v1.0 -m &quot;my version 1.0&quot;</code>这种。</p><p>轻量标签就是一个固定的引用。附注标签需要创建标签对象，并记录一个引用来指向该标签对象。</p><h3 id="远程引用" tabindex="-1"><a class="header-anchor" href="#远程引用"><span>远程引用</span></a></h3><p>不熟悉<code>Git</code>的同学，可能会犯这样一个错误。其他同学让他拉取一下远程最新的<code>master</code>分支代码，他可能直接用<code>IDE</code>找到本地的远程分支的引用，也就是<code>origin/master</code>，直接<code>checkout</code>一个本地分支。</p><p>其实，<code>origin/master</code>只是远程分支的一个引用，不一定跟远程分支代码同步，我们可以用<code>git fetch</code>或者<code>git pull</code>来让<code>origin/master</code>和远程分支同步。</p>`,201)])])}const o=n(p,[["render",l]]),r=JSON.parse('{"path":"/git-tutor/git/other-tips.html","title":"Git简单介绍","lang":"zh-CN","frontmatter":{"description":"Git简单介绍 https://juejin.cn/post/7131713973572861966#heading-16 Git是一个分布式版本控制软件，最初由Linus Torvalds创作，于2005年以GPL发布。最初目的是为更好地管理Linux内核开发而设计。 Git工作流程以及各个区域 img Workspace：工作区 Staging/I...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Git简单介绍\\",\\"image\\":[\\"https://img.iisheng.cn/git-area.png?01\\",\\"https://img.iisheng.cn/git-file-status.png?01\\",\\"https://img.iisheng.cn/current-commit-log.png\\",\\"https://img.iisheng.cn/after-reset.png\\",\\"https://img.iisheng.cn/reflog.png\\",\\"https://img.iisheng.cn/restore.png\\",\\"https://img.iisheng.cn/commits-history.png\\",\\"https://img.iisheng.cn/origin-log.png\\",\\"https://img.iisheng.cn/rebase-modifying.png\\",\\"https://img.iisheng.cn/modified-log.png\\",\\"https://img.iisheng.cn/fast-forward1.png\\",\\"https://img.iisheng.cn/fast-forward2.png\\",\\"https://img.iisheng.cn/fast-forward3.png\\",\\"https://img.iisheng.cn/tripartite1.png\\",\\"https://img.iisheng.cn/tripartite2.png\\",\\"https://img.iisheng.cn/tripartite3.png\\",\\"https://img.iisheng.cn/rebase1.png\\",\\"https://img.iisheng.cn/rebase2.png\\",\\"https://img.iisheng.cn/rebase3.png\\"],\\"dateModified\\":\\"2024-01-26T13:31:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/git/other-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Git简单介绍"}],["meta",{"property":"og:description","content":"Git简单介绍 https://juejin.cn/post/7131713973572861966#heading-16 Git是一个分布式版本控制软件，最初由Linus Torvalds创作，于2005年以GPL发布。最初目的是为更好地管理Linux内核开发而设计。 Git工作流程以及各个区域 img Workspace：工作区 Staging/I..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img.iisheng.cn/git-area.png?01"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-26T13:31:44.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-26T13:31:44.000Z"}]]},"git":{"createdTime":1687669238000,"updatedTime":1706275904000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":17.81,"words":5343},"filePathRelative":"git-tutor/git/other-tips.md","autoDesc":true}');export{o as comp,r as data};
