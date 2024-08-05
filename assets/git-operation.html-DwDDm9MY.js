import{_ as t,c as e,o as i,d as n}from"./app-CbULZrmi.js";const a={},o=n(`<h1 id="git整体流程" tabindex="-1"><a class="header-anchor" href="#git整体流程"><span>git整体流程</span></a></h1><p><a href="https://backlog.com/git-tutorial/cn/" target="_blank" rel="noopener noreferrer">https://backlog.com/git-tutorial/cn/</a><a href="https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448" target="_blank" rel="noopener noreferrer">https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448</a></p><h2 id="整体流程" tabindex="-1"><a class="header-anchor" href="#整体流程"><span>整体流程</span></a></h2><pre><code class="language-bash"># 空目录
git init 
git remote add origin  &lt;your_repo&gt;
# 添加文件
git add a.txt
# 添加commit
git commit -m &quot;添加commit&quot;

# 修改完a.txt之后
git add a.txt&amp;&amp;git git commit -m &quot;修改a.txt&quot;
# 或者
git commit -am &quot;修改a.txt&quot;
# 推送
git push origin main

</code></pre><ul><li><p>使用命令<code>git add &lt;file&gt;</code>，注意，可反复多次使用，添加多个文件；</p></li><li><p>使用命令<code>git commit -m &lt;message&gt;</code>，完成。</p></li><li><p>要随时掌握工作区的状态，使用git status命令。</p></li><li><p>如果git status告诉你有文件被修改过，用<code>git diff &lt;your_file&gt;</code>可以查看修改内容</p></li><li><p>HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。</p></li></ul><pre><code class="language-bash">#返回上一个版本
git reset --hard HEAD^
# 返回commitid为e475afc的版本
git reset --hard e475afc
</code></pre><ul><li>穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本 ,用<code>--pretty=oneline</code>更好看一些。</li><li>要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本</li></ul><pre><code class="language-bash">git log --pretty=oneline
#下面是返回的信息
1094adb7b9b3807259d8cb349e7df1d4d6477073 (HEAD -&gt; master) append GPL
e475afc93c209a690c39c13a46716e8fa000c366 add distributed
eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0 wrote a readme file



git reflog
e475afc HEAD@{1}: reset: moving to HEAD^
1094adb (HEAD -&gt; master) HEAD@{2}: commit: append GPL
e475afc HEAD@{3}: commit: add distributed
eaadf4e HEAD@{4}: commit (initial): wrote a readme file
</code></pre><ul><li>当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令<code>git restore &lt;file&gt;</code>。</li><li>当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令<code>git reset HEAD &lt;file&gt;</code>，就回到了场景1，第二步按场景1操作。</li><li>命令<code>git rm &lt;file&gt;</code>用于删除一个文件</li></ul><p>​</p><p>注意:git checkout不推荐使用了,可以用git switch 和git restore</p><pre><code class="language-bash">创建新分支
git switch -b dev

查看当前分支
git branch

如何合并分支
在dev分支上
git commit -am &quot;modify a.txt&quot;
git switch -c main
git merge dev
就把dev合并到了main分支

删除分支

git branch -d dev

查看分支：git branch
创建分支：git branch &lt;name&gt;
切换分支：git checkout &lt;name&gt;或者git switch &lt;name&gt;
创建+切换分支：git checkout -b &lt;name&gt;或者git switch -c &lt;name&gt;
合并某分支到当前分支：git merge &lt;name&gt;
删除分支：git branch -d &lt;name&gt;
​\`\`\`

## 多人合作

- 查看远程库信息，使用git remote -v；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用git switch -c branch-name origin/branch-name，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
- 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

​

## tag管理

- 命令git push origin &lt;tagname&gt;可以推送一个本地标签；
- 命令git push origin --tags可以推送全部未推送过的本地标签；
- 命令git tag -d &lt;tagname&gt;可以删除一个本地标签；
- 命令git push origin :refs/tags/&lt;tagname&gt;可以删除一个远程标签。
</code></pre>`,12),g=[o];function c(r,l){return i(),e("div",null,g)}const m=t(a,[["render",c],["__file","git-operation.html.vue"]]),p=JSON.parse('{"path":"/git-tutor/git/git-operation.html","title":"git整体流程","lang":"zh-CN","frontmatter":{"description":"git整体流程 https://backlog.com/git-tutorial/cn/ https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448 整体流程 使用命令git add <file>，注意，可反复多次使用，添加多个文件； 使用命令git commit -m <messa...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/git/git-operation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"git整体流程"}],["meta",{"property":"og:description","content":"git整体流程 https://backlog.com/git-tutorial/cn/ https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448 整体流程 使用命令git add <file>，注意，可反复多次使用，添加多个文件； 使用命令git commit -m <messa..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git整体流程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"整体流程","slug":"整体流程","link":"#整体流程","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.68,"words":804},"filePathRelative":"git-tutor/git/git-operation.md","localizedDate":"2023年6月25日","autoDesc":true}');export{m as comp,p as data};
