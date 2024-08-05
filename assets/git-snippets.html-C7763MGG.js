import{_ as t,c as e,o as i,d as n}from"./app-CbULZrmi.js";const a={},o=n(`<h1 id="git-技巧" tabindex="-1"><a class="header-anchor" href="#git-技巧"><span>git 技巧</span></a></h1><p>软件 tortoise git <a href="https://www.gitkraken.com/download/windows64" target="_blank" rel="noopener noreferrer">https://www.gitkraken.com/download/windows64</a> github desktop ​</p><p><a href="https://github.com/tj/git-extras/" target="_blank" rel="noopener noreferrer">https://github.com/tj/git-extras/</a></p><h2 id="清空所有commit记录" tabindex="-1"><a class="header-anchor" href="#清空所有commit记录"><span>清空所有commit记录</span></a></h2><pre><code class="language-bash"># 1.Checkout

git checkout --orphan latest_branch# (不能用switch会什么文件都没有)

# 2. Add all the files

git add -A

# 3. Commit the changes

git commit -am &quot;commit message&quot;


# 4. Delete the branch

git branch -D main

# 5.Rename the current branch to master

git branch -m main

# 6.Finally, force update your repository

git push -f origin main

# 7.清理gc
git gc --aggressive --prune=all 
</code></pre><h3 id="git分支合并" tabindex="-1"><a class="header-anchor" href="#git分支合并"><span>git分支合并</span></a></h3><pre><code class="language-bash">#当前是dev分支,要合并到main分支,push然后回到dev分支
git switch main

git merge dev

git push origin dev

git switch dev

# 更简单的方法,使用rebase(当前是dev分支)
git rebase origin main

git push origin main #此时还在dev分支


</code></pre><h3 id="git删除远程" tabindex="-1"><a class="header-anchor" href="#git删除远程"><span>git删除远程</span></a></h3><pre><code class="language-bash">git push origin --delete main

# 删除本地缓存
git rm --cached &lt;file&gt;
</code></pre><h2 id="git-解除fork关系" tabindex="-1"><a class="header-anchor" href="#git-解除fork关系"><span>git 解除fork关系</span></a></h2><p>实际做起来却意外的简单。 首先，把删去所有与本地仓库连接的远程仓库</p><pre><code class="language-java">git remote remove origin
git remote remove upstream 
</code></pre><p>然后，把 GitHub 上自己的远程仓库给删了。 最后，在 GitHub 上重新建立同名仓库，然后把本地仓库关联上去。</p><pre><code class="language-java">git remote add origin &lt;your repo&gt;
</code></pre><p>于是就大功告成了</p>`,15),r=[o];function g(s,c){return i(),e("div",null,r)}const d=t(a,[["render",g],["__file","git-snippets.html.vue"]]),h=JSON.parse('{"path":"/git-tutor/github/git-snippets.html","title":"git 技巧","lang":"zh-CN","frontmatter":{"description":"git 技巧 软件 tortoise git https://www.gitkraken.com/download/windows64 github desktop ​ https://github.com/tj/git-extras/ 清空所有commit记录 git分支合并 git删除远程 git 解除fork关系 实际做起来却意外的简单。 首先，...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/github/git-snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"git 技巧"}],["meta",{"property":"og:description","content":"git 技巧 软件 tortoise git https://www.gitkraken.com/download/windows64 github desktop ​ https://github.com/tj/git-extras/ 清空所有commit记录 git分支合并 git删除远程 git 解除fork关系 实际做起来却意外的简单。 首先，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git 技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"清空所有commit记录","slug":"清空所有commit记录","link":"#清空所有commit记录","children":[{"level":3,"title":"git分支合并","slug":"git分支合并","link":"#git分支合并","children":[]},{"level":3,"title":"git删除远程","slug":"git删除远程","link":"#git删除远程","children":[]}]},{"level":2,"title":"git 解除fork关系","slug":"git-解除fork关系","link":"#git-解除fork关系","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.96,"words":288},"filePathRelative":"git-tutor/github/git-snippets.md","localizedDate":"2023年6月25日","autoDesc":true}');export{d as comp,h as data};
