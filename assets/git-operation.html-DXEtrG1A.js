import{_ as s,c as a,a as e,o as i}from"./app-B6vXTniy.js";const t={};function l(p,n){return i(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="git整体流程" tabindex="-1"><a class="header-anchor" href="#git整体流程"><span>git整体流程</span></a></h1><p><a href="https://backlog.com/git-tutorial/cn/" target="_blank" rel="noopener noreferrer">https://backlog.com/git-tutorial/cn/</a><a href="https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448" target="_blank" rel="noopener noreferrer">https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448</a></p><h2 id="整体流程" tabindex="-1"><a class="header-anchor" href="#整体流程"><span>整体流程</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 空目录</span></span>
<span class="line"><span class="token function">git</span> init </span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin  <span class="token operator">&lt;</span>your_repo<span class="token operator">&gt;</span></span>
<span class="line"><span class="token comment"># 添加文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> a.txt</span>
<span class="line"><span class="token comment"># 添加commit</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;添加commit&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改完a.txt之后</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> a.txt<span class="token operator">&amp;&amp;</span><span class="token function">git</span> <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;修改a.txt&quot;</span></span>
<span class="line"><span class="token comment"># 或者</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&quot;修改a.txt&quot;</span></span>
<span class="line"><span class="token comment"># 推送</span></span>
<span class="line"><span class="token function">git</span> push origin main</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>使用命令<code>git add &lt;file&gt;</code>，注意，可反复多次使用，添加多个文件；</p></li><li><p>使用命令<code>git commit -m &lt;message&gt;</code>，完成。</p></li><li><p>要随时掌握工作区的状态，使用git status命令。</p></li><li><p>如果git status告诉你有文件被修改过，用<code>git diff &lt;your_file&gt;</code>可以查看修改内容</p></li><li><p>HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。</p></li></ul><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#返回上一个版本</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD^</span>
<span class="line"><span class="token comment"># 返回commitid为e475afc的版本</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> e475afc</span>
<span class="line"></span></code></pre></div><ul><li>穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本 ,用<code>--pretty=oneline</code>更好看一些。</li><li>要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本</li></ul><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline</span>
<span class="line"><span class="token comment">#下面是返回的信息</span></span>
<span class="line">1094adb7b9b3807259d8cb349e7df1d4d6477073 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> append GPL</span>
<span class="line">e475afc93c209a690c39c13a46716e8fa000c366 <span class="token function">add</span> distributed</span>
<span class="line">eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0 wrote a readme <span class="token function">file</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> reflog</span>
<span class="line">e475afc HEAD@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: reset: moving to HEAD^</span>
<span class="line">1094adb <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>: commit: append GPL</span>
<span class="line">e475afc HEAD@<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span>: commit: <span class="token function">add</span> distributed</span>
<span class="line">eaadf4e HEAD@<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">}</span>: commit <span class="token punctuation">(</span>initial<span class="token punctuation">)</span>: wrote a readme <span class="token function">file</span></span>
<span class="line"></span></code></pre></div><ul><li>当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令<code>git restore &lt;file&gt;</code>。</li><li>当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令<code>git reset HEAD &lt;file&gt;</code>，就回到了场景1，第二步按场景1操作。</li><li>命令<code>git rm &lt;file&gt;</code>用于删除一个文件</li></ul><p>​</p><p>注意:git checkout不推荐使用了,可以用git switch 和git restore</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">创建新分支</span>
<span class="line"><span class="token function">git</span> switch <span class="token parameter variable">-b</span> dev</span>
<span class="line"></span>
<span class="line">查看当前分支</span>
<span class="line"><span class="token function">git</span> branch</span>
<span class="line"></span>
<span class="line">如何合并分支</span>
<span class="line">在dev分支上</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&quot;modify a.txt&quot;</span></span>
<span class="line"><span class="token function">git</span> switch <span class="token parameter variable">-c</span> main</span>
<span class="line"><span class="token function">git</span> merge dev</span>
<span class="line">就把dev合并到了main分支</span>
<span class="line"></span>
<span class="line">删除分支</span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> dev</span>
<span class="line"></span>
<span class="line">查看分支：git branch</span>
<span class="line">创建分支：git branch <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span></span>
<span class="line">切换分支：git checkout <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>或者git switch <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span></span>
<span class="line">创建+切换分支：git checkout <span class="token parameter variable">-b</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>或者git switch <span class="token parameter variable">-c</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span></span>
<span class="line">合并某分支到当前分支：git merge <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span></span>
<span class="line">删除分支：git branch <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span></span>
<span class="line">​\`\`\`</span>
<span class="line"></span>
<span class="line"><span class="token comment">## 多人合作</span></span>
<span class="line"></span>
<span class="line">- 查看远程库信息，使用git remote -v；</span>
<span class="line">- 本地新建的分支如果不推送到远程，对其他人就是不可见的；</span>
<span class="line">- 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；</span>
<span class="line">- 在本地创建和远程分支对应的分支，使用git switch <span class="token parameter variable">-c</span> branch-name origin/branch-name，本地和远程分支的名称最好一致；</span>
<span class="line">- 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；</span>
<span class="line">- 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。</span>
<span class="line"></span>
<span class="line">​</span>
<span class="line"></span>
<span class="line"><span class="token comment">## tag管理</span></span>
<span class="line"></span>
<span class="line">- 命令git push origin <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span>可以推送一个本地标签；</span>
<span class="line">- 命令git push origin --tags可以推送全部未推送过的本地标签；</span>
<span class="line">- 命令git tag <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span>可以删除一个本地标签；</span>
<span class="line">- 命令git push origin :refs/tags/<span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span>可以删除一个远程标签。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12)])])}const o=s(t,[["render",l]]),r=JSON.parse('{"path":"/git-tutor/git/git-operation.html","title":"git整体流程","lang":"zh-CN","frontmatter":{"description":"git整体流程 https://backlog.com/git-tutorial/cn/ https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448 整体流程 使用命令git add <file>，注意，可反复多次使用，添加多个文件； 使用命令git commit -m <messa...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git整体流程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/git/git-operation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"git整体流程"}],["meta",{"property":"og:description","content":"git整体流程 https://backlog.com/git-tutorial/cn/ https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448 整体流程 使用命令git add <file>，注意，可反复多次使用，添加多个文件； 使用命令git commit -m <messa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}]]},"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.68,"words":804},"filePathRelative":"git-tutor/git/git-operation.md","autoDesc":true}');export{o as comp,r as data};
