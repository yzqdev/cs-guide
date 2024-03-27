import{_ as i,r as t,o as l,c as r,d as e,e as n,b as s,a as o}from"./app-BO2oONDQ.js";const c={},d=e("h1",{id:"git-技巧",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#git-技巧"},[e("span",null,"git 技巧")])],-1),p={href:"https://www.gitkraken.com/download/windows64",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/tj/git-extras/",target:"_blank",rel:"noopener noreferrer"},v=o(`<h2 id="清空所有commit记录" tabindex="-1"><a class="header-anchor" href="#清空所有commit记录"><span>清空所有commit记录</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 1.Checkout</span>

<span class="token function">git</span> checkout <span class="token parameter variable">--orphan</span> latest_branch<span class="token comment"># (不能用switch会什么文件都没有)</span>

<span class="token comment"># 2. Add all the files</span>

<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>

<span class="token comment"># 3. Commit the changes</span>

<span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&quot;commit message&quot;</span>


<span class="token comment"># 4. Delete the branch</span>

<span class="token function">git</span> branch <span class="token parameter variable">-D</span> main

<span class="token comment"># 5.Rename the current branch to master</span>

<span class="token function">git</span> branch <span class="token parameter variable">-m</span> main

<span class="token comment"># 6.Finally, force update your repository</span>

<span class="token function">git</span> push <span class="token parameter variable">-f</span> origin main

<span class="token comment"># 7.清理gc</span>
<span class="token function">git</span> gc <span class="token parameter variable">--aggressive</span> <span class="token parameter variable">--prune</span><span class="token operator">=</span>all 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="git分支合并" tabindex="-1"><a class="header-anchor" href="#git分支合并"><span>git分支合并</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#当前是dev分支,要合并到main分支,push然后回到dev分支</span>
<span class="token function">git</span> switch main

<span class="token function">git</span> merge dev

<span class="token function">git</span> push origin dev

<span class="token function">git</span> switch dev

<span class="token comment"># 更简单的方法,使用rebase(当前是dev分支)</span>
<span class="token function">git</span> rebase origin main

<span class="token function">git</span> push origin main <span class="token comment">#此时还在dev分支</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="git删除远程" tabindex="-1"><a class="header-anchor" href="#git删除远程"><span>git删除远程</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> main

<span class="token comment"># 删除本地缓存</span>
<span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git-解除fork关系" tabindex="-1"><a class="header-anchor" href="#git-解除fork关系"><span>git 解除fork关系</span></a></h2><p>实际做起来却意外的简单。 首先，把删去所有与本地仓库连接的远程仓库</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>git remote remove origin
git remote remove upstream 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，把 GitHub 上自己的远程仓库给删了。 最后，在 GitHub 上重新建立同名仓库，然后把本地仓库关联上去。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>git remote add origin <span class="token generics"><span class="token punctuation">&lt;</span>your repo<span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>于是就大功告成了</p>`,12);function u(g,h){const a=t("ExternalLinkIcon");return l(),r("div",null,[d,e("p",null,[n("软件 tortoise git "),e("a",p,[n("https://www.gitkraken.com/download/windows64"),s(a)]),n(" github desktop ​")]),e("p",null,[e("a",m,[n("https://github.com/tj/git-extras/"),s(a)])]),v])}const k=i(c,[["render",u],["__file","git-snippets.html.vue"]]),f=JSON.parse('{"path":"/git-tutor/github/git-snippets.html","title":"git 技巧","lang":"zh-CN","frontmatter":{"description":"git 技巧 软件 tortoise git https://www.gitkraken.com/download/windows64 github desktop ​ https://github.com/tj/git-extras/ 清空所有commit记录 git分支合并 git删除远程 git 解除fork关系 实际做起来却意外的简单。 首先，...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/github/git-snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"git 技巧"}],["meta",{"property":"og:description","content":"git 技巧 软件 tortoise git https://www.gitkraken.com/download/windows64 github desktop ​ https://github.com/tj/git-extras/ 清空所有commit记录 git分支合并 git删除远程 git 解除fork关系 实际做起来却意外的简单。 首先，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git 技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"清空所有commit记录","slug":"清空所有commit记录","link":"#清空所有commit记录","children":[{"level":3,"title":"git分支合并","slug":"git分支合并","link":"#git分支合并","children":[]},{"level":3,"title":"git删除远程","slug":"git删除远程","link":"#git删除远程","children":[]}]},{"level":2,"title":"git 解除fork关系","slug":"git-解除fork关系","link":"#git-解除fork关系","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.96,"words":288},"filePathRelative":"git-tutor/github/git-snippets.md","localizedDate":"2023年6月25日","autoDesc":true}');export{k as comp,f as data};
