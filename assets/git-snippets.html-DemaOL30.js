import{_ as n,c as a,a as e,o as i}from"./app-B6vXTniy.js";const t={};function l(p,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="git-技巧" tabindex="-1"><a class="header-anchor" href="#git-技巧"><span>git 技巧</span></a></h1><p>软件 tortoise git <a href="https://www.gitkraken.com/download/windows64" target="_blank" rel="noopener noreferrer">https://www.gitkraken.com/download/windows64</a> github desktop ​</p><p><a href="https://github.com/tj/git-extras/" target="_blank" rel="noopener noreferrer">https://github.com/tj/git-extras/</a></p><h2 id="清空所有commit记录" tabindex="-1"><a class="header-anchor" href="#清空所有commit记录"><span>清空所有commit记录</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1.Checkout</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">--orphan</span> latest_branch<span class="token comment"># (不能用switch会什么文件都没有)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. Add all the files</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. Commit the changes</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&quot;commit message&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. Delete the branch</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-D</span> main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5.Rename the current branch to master</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-m</span> main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6.Finally, force update your repository</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> origin main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 7.清理gc</span></span>
<span class="line"><span class="token function">git</span> gc <span class="token parameter variable">--aggressive</span> <span class="token parameter variable">--prune</span><span class="token operator">=</span>all </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="git分支合并" tabindex="-1"><a class="header-anchor" href="#git分支合并"><span>git分支合并</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#当前是dev分支,要合并到main分支,push然后回到dev分支</span></span>
<span class="line"><span class="token function">git</span> switch main</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> merge dev</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> push origin dev</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> switch dev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更简单的方法,使用rebase(当前是dev分支)</span></span>
<span class="line"><span class="token function">git</span> rebase origin main</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> push origin main <span class="token comment">#此时还在dev分支</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="git删除远程" tabindex="-1"><a class="header-anchor" href="#git删除远程"><span>git删除远程</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除本地缓存</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="git-解除fork关系" tabindex="-1"><a class="header-anchor" href="#git-解除fork关系"><span>git 解除fork关系</span></a></h2><p>实际做起来却意外的简单。 首先，把删去所有与本地仓库连接的远程仓库</p><div class="language-java" data-highlighter="prismjs" data-ext="java"><pre><code class="language-java"><span class="line">git remote remove origin</span>
<span class="line">git remote remove upstream </span>
<span class="line"></span></code></pre></div><p>然后，把 GitHub 上自己的远程仓库给删了。 最后，在 GitHub 上重新建立同名仓库，然后把本地仓库关联上去。</p><div class="language-java" data-highlighter="prismjs" data-ext="java"><pre><code class="language-java"><span class="line">git remote add origin <span class="token generics"><span class="token punctuation">&lt;</span>your repo<span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre></div><p>于是就大功告成了</p>`,15)])])}const r=n(t,[["render",l]]),o=JSON.parse('{"path":"/git-tutor/github/git-snippets.html","title":"git 技巧","lang":"zh-CN","frontmatter":{"description":"git 技巧 软件 tortoise git https://www.gitkraken.com/download/windows64 github desktop ​ https://github.com/tj/git-extras/ 清空所有commit记录 git分支合并 git删除远程 git 解除fork关系 实际做起来却意外的简单。 首先，...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git 技巧\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/github/git-snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"git 技巧"}],["meta",{"property":"og:description","content":"git 技巧 软件 tortoise git https://www.gitkraken.com/download/windows64 github desktop ​ https://github.com/tj/git-extras/ 清空所有commit记录 git分支合并 git删除远程 git 解除fork关系 实际做起来却意外的简单。 首先，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}]]},"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":0.96,"words":288},"filePathRelative":"git-tutor/github/git-snippets.md","autoDesc":true}');export{r as comp,o as data};
