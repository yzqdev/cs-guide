import{_ as e,c as t,o,d as a}from"./app-CbULZrmi.js";const c="/cs-guide/assets/git16-npF-8tSF.png",i={},s=a(`<p>在安装 Git 一节中，我们已经配置了 <code>user.name</code> 和 <code>user.email</code>，实际上，Git 还有很多可配置项。</p><p>比如，让 Git 显示颜色，会让命令输出看起来更醒目:</p><pre><code class="language-sh">git config --global color.ui true
</code></pre><p>这样，Git 会适当地显示不同的颜色，比如 <code>git status</code> 命令，文件名就会标上颜色。</p><h2 id="配置别名" tabindex="-1"><a class="header-anchor" href="#配置别名"><span>配置别名</span></a></h2><p>有没有经常敲错命令? 比如 <code>git status</code>? <code>status</code> 这个单词真心不好记。</p><p>如果敲 <code>git st</code> 就表示 <code>git status</code> 那就简单多了，当然这种偷懒的办法我们是极力赞成的。</p><p>我们只需要敲一行命令，告诉 Git，以后 <code>st</code> 就表示 <code>status</code>:</p><pre><code class="language-sh">git config --global alias.st status
</code></pre><p>好了，现在敲 <code>git st</code> 看看效果。</p><p>当然还有别的命令可以简写，很多人都用 <code>co</code> 表示 <code>checkout</code>，<code>ci</code> 表示 <code>commit</code>，<code>br</code> 表示 <code>branch</code>:</p><pre><code class="language-sh">git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
</code></pre><p>以后提交就可以简写成:</p><pre><code class="language-sh">git ci -m &quot;bala bala bala...&quot;
</code></pre><p><code>--global</code> 参数是全局参数，也就是这些命令在这台电脑的所有 Git 仓库下都有用。</p><p>在撤销修改一节中，我们知道，命令 <code>git reset HEAD file</code> 可以把暂存区的修改撤销掉(unstage)，重新放回工作区。既然是一个 <code>unstage</code> 操作，就可以配置一个 <code>unstage</code> 别名:</p><pre><code class="language-sh">git config --global alias.unstage &#39;reset HEAD&#39;
</code></pre><p>当您敲入命令:</p><pre><code class="language-sh">git unstage test.py
</code></pre><p>实际上 Git 执行的是:</p><pre><code class="language-sh">git reset HEAD test.py
</code></pre><p>配置一个 <code>git last</code>，让其显示最后一次提交信息:</p><pre><code class="language-sh">git config --global alias.last &#39;log -1&#39;
</code></pre><p>这样，用 <code>git last</code> 就能显示最近一次的提交:</p><pre><code class="language-sh">$ git last
commit adca45d317e6d8a4b23f9811c3d7b7f0f180bfe2
Merge: bd6ae48 291bea8
Author: Mr-Hope &lt;zhangbowang1998@gmail.com&gt;
Date:   Thu Aug 22 22:49:22 2013 +0800

    merge &amp; fix hello.py
</code></pre><p>甚至还有人丧心病狂地把 <code>lg</code> 配置成了:</p><pre><code class="language-sh">git config --global alias.lg &quot;log --color --graph --pretty=format:&#39;%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset&#39; --abbrev-commit&quot;
</code></pre><p>来看看 <code>git lg</code> 的效果:</p><p><img src="`+c+`" alt="命令 git lg 示例图"></p><p>为什么不早点告诉我? 别激动，咱不是为了多记几个英文单词嘛!</p><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h2><p>配置 Git 的时候，加上 <code>--global</code> 是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。</p><p>配置文件放哪了? 每个仓库的 Git 配置文件都放在 <code>.git/config</code> 文件中:</p><pre><code class="language-sh">$ cat .git/config
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true
[remote &quot;origin&quot;]
    url = git@github.com:michaelliao/learngit.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch &quot;master&quot;]
    remote = origin
    merge = refs/heads/master
[alias]
    last = log -1
</code></pre><p>别名就在 <code>[alias]</code> 后面，要删除别名，直接把对应的行删掉即可。</p><p>而当前用户的 Git 配置文件放在用户主目录下的一个隐藏文件 <code>.gitconfig</code> 中:</p><pre><code class="language-sh">$ cat .gitconfig
[alias]
    co = checkout
    ci = commit
    br = branch
    st = status
[user]
    name = Your Name
    email = your@email.com
</code></pre><p>配置别名也可以直接修改这个文件，如果改错了，可以删掉文件重新通过命令配置。</p><h3 id="别名小结" tabindex="-1"><a class="header-anchor" href="#别名小结"><span>别名小结</span></a></h3><ul><li>给 Git 配置好别名，就可以输入命令时偷个懒。我们鼓励偷懒。</li></ul>`,40),r=[s];function n(l,d){return o(),t("div",null,r)}const p=e(i,[["render",n],["__file","custom.html.vue"]]),u=JSON.parse('{"path":"/git-tutor/git/custom.html","title":"自定义 Git","lang":"zh-CN","frontmatter":{"index":14,"title":"自定义 Git","icon":"skin","author":"廖雪峰","category":"Git","tag":["Git","软件"],"copyright":"Copyright by 廖雪峰 Edited by Mr.Hope","description":"在安装 Git 一节中，我们已经配置了 user.name 和 user.email，实际上，Git 还有很多可配置项。 比如，让 Git 显示颜色，会让命令输出看起来更醒目: 这样，Git 会适当地显示不同的颜色，比如 git status 命令，文件名就会标上颜色。 配置别名 有没有经常敲错命令? 比如 git status? status 这个单...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/git/custom.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"自定义 Git"}],["meta",{"property":"og:description","content":"在安装 Git 一节中，我们已经配置了 user.name 和 user.email，实际上，Git 还有很多可配置项。 比如，让 Git 显示颜色，会让命令输出看起来更醒目: 这样，Git 会适当地显示不同的颜色，比如 git status 命令，文件名就会标上颜色。 配置别名 有没有经常敲错命令? 比如 git status? status 这个单..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"廖雪峰"}],["meta",{"property":"article:tag","content":"Git"}],["meta",{"property":"article:tag","content":"软件"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自定义 Git\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"廖雪峰\\"}]}"]]},"headers":[{"level":2,"title":"配置别名","slug":"配置别名","link":"#配置别名","children":[]},{"level":2,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[{"level":3,"title":"别名小结","slug":"别名小结","link":"#别名小结","children":[]}]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.55,"words":766},"filePathRelative":"git-tutor/git/custom.md","localizedDate":"2023年6月25日","autoDesc":true}');export{p as comp,u as data};
