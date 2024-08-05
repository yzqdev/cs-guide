import{_ as e,c as t,o as a,d as o}from"./app-CbULZrmi.js";const c={},d=o(`<h2 id="为什么要有-tag" tabindex="-1"><a class="header-anchor" href="#为什么要有-tag"><span>为什么要有 tag</span></a></h2><p>发布一个版本时，我们通常先在版本库中打一个标签 (<code>tag</code>)，这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。</p><p>Git 的标签虽然是版本库的快照，但其实它就是指向某个 <code>commit</code> 的指针(跟分支很像对不对? 但是分支可以移动，标签不能移动)，所以，创建和删除标签都是瞬间完成的。</p><p>Git 有 <code>commit</code>，为什么还要引入 <code>tag</code>?</p><p>“请把上周一的那个版本打包发布，<code>commit</code> 号是 6a5819e...”</p><p>“一串乱七八糟的数字不好找! ”</p><p>如果换一个办法:</p><p>“请把上周一的那个版本打包发布，版本号是 <code>v1.2</code>”</p><p>“好的，按照 <code>tag v1.2</code> 查找 <code>commit</code> 就行! ”</p><p>所以，<code>tag</code> 就是一个让人容易记住的有意义的名字，它跟某个 <code>commit</code> 绑在一起。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>推荐的标签规范是以小写字母 <code>v</code> 开头，后接 <code>x.x</code> 或 <code>x.x.x</code> 等若干位版本号。</p></div><h2 id="创建轻量标签" tabindex="-1"><a class="header-anchor" href="#创建轻量标签"><span>创建轻量标签</span></a></h2><p>在 Git 中打标签非常简单，首先，切换到需要打标签的分支上:</p><pre><code class="language-sh">$ git branch
* dev
  master
$ git checkout master
Switched to branch &#39;master&#39;
</code></pre><p>然后，敲命令 <code>git tag &lt;name&gt;</code> 就可以打一个新标签:</p><pre><code class="language-sh">$ git tag v1.0
-- no output --
</code></pre><p>可以用命令 <code>git tag</code> 查看所有标签:</p><pre><code class="language-sh">$ git tag
v1.0
</code></pre><p>默认标签是打在最新提交的 <code>commit</code> 上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办?</p><p>方法是找到历史提交的 <code>commit id</code>，然后打上就可以了:</p><pre><code class="language-sh">$ git log --pretty=oneline --abbrev-commit
12a631b (HEAD -&gt; master, tag: v1.0, origin/master) merged bug fix 101
4c805e2 fix bug 101
e1e9c68 merge with no-ff
f52c633 add merge
cf810e4 conflict fixed
5dc6824 &amp; simple
14096d0 AND simple
b17d20e branch test
d46f35e remove test.txt
b84166e add test.txt
519219b git tracks changes
e43a48b understand how stage works
1094adb append GPL
e475afc add distributed
eaadf4e wrote a readme file
</code></pre><p>比方说要对 <code>add merge</code> 这次提交打标签，它对应的 <code>commit id</code> 是 <code>f52c633</code>，敲入命令:</p><pre><code class="language-sh">$ git tag v0.9 f52c633
--no output --
</code></pre><p>再用命令 <code>git tag</code> 查看标签:</p><pre><code class="language-sh">$ git tag
v0.9
v1.0
</code></pre><p>注意，标签不是按时间顺序列出，而是按字母排序的。可以用 <code>git show &lt;tagname&gt;</code> 查看标签信息:</p><pre><code class="language-sh">$ git show v0.9
commit f52c63349bc3c1593499807e5c8e972b82c8f286 (tag: v0.9)
Author: Michael Liao &lt;askxuefeng@gmail.com&gt;
Date:   Fri May 18 21:56:54 2018 +0800

    add merge

diff --git a/readme.txt b/readme.txt
...
</code></pre><p>可以看到，<code>v0.9</code> 确实打在 <code>add merge</code> 这次提交上。</p><h2 id="附注标签" tabindex="-1"><a class="header-anchor" href="#附注标签"><span>附注标签</span></a></h2><p>Git 还可以创建带有说明的标签，用 <code>-a</code> 指定标签名，<code>-m</code> 指定说明文字:</p><pre><code class="language-sh">$ git tag -a v0.1 -m &quot;version 0.1 released&quot; 1094adb
--no output --
</code></pre><p>用命令 <code>git show &lt;tagname&gt;</code> 可以看到说明文字:</p><pre><code class="language-sh">$ git show v0.1
tag v0.1
Tagger: Michael Liao &lt;askxuefeng@gmail.com&gt;
Date:   Fri May 18 22:48:43 2018 +0800

version 0.1 released

commit 1094adb7b9b3807259d8cb349e7df1d4d6477073 (tag: v0.1)
Author: Michael Liao &lt;askxuefeng@gmail.com&gt;
Date:   Fri May 18 21:06:15 2018 +0800

    append GPL

diff --git a/readme.txt b/readme.txt
...
</code></pre><div class="hint-container tip"><p class="hint-container-title">提示</p><p>标签总是和某个 commit 挂钩。如果这个 commit 既出现在 master 分支，又出现在 dev 分支，那么在这两个分支上都可以看到这个标签。</p></div><h3 id="添加小结" tabindex="-1"><a class="header-anchor" href="#添加小结"><span>添加小结</span></a></h3><p>命令 <code>git tag &lt;tagname&gt;</code> 用于新建一个标签，默认为 <code>HEAD</code>，也可以指定一个 <code>commit id</code>；</p><p>命令 <code>git tag -a &lt;tagname&gt; -m &quot;blablabla...&quot;</code> 可以指定标签信息；</p><p>命令 <code>git tag</code> 可以查看所有标签。</p><h2 id="操作标签" tabindex="-1"><a class="header-anchor" href="#操作标签"><span>操作标签</span></a></h2><p>如果标签打错了，也可以删除:</p><pre><code class="language-sh">$ git tag -d v0.1
Deleted tag &#39;v0.1&#39; (was f15b0dd)\\
</code></pre><p>因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。</p><p>如果要推送某个标签到远程，使用命令 <code>git push origin &lt;tagname&gt;</code>:</p><pre><code class="language-sh">$ git push origin v1.0
Total 0 (delta 0), reused 0 (delta 0)
To github.com:Hope-Studio/learngit.git
 * [new tag]         v1.0 -&gt; v1.0
</code></pre><p>或者，一次性推送全部尚未推送到远程的本地标签:</p><pre><code class="language-sh">$ git push origin --tags
Total 0 (delta 0), reused 0 (delta 0)
To github.com:Hope-Studio/learngit.git
 * [new tag]         v0.9 -&gt; v0.9
</code></pre><p>如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除:</p><pre><code class="language-sh">$ git tag -d v0.9
Deleted tag &#39;v0.9&#39; (was f52c633)
</code></pre><p>然后，从远程删除。删除命令也是 push，但是格式如下:</p><pre><code class="language-sh">$ git push origin :refs/tags/v0.9
To github.com:Hope-Studio/learngit.git
 - [deleted]         v0.9
</code></pre><p>要看看是否真的从远程库删除了标签，可以登陆 GitHub 查看。</p><h3 id="管理标签小结" tabindex="-1"><a class="header-anchor" href="#管理标签小结"><span>管理标签小结</span></a></h3><ul><li><p>命令 <code>git push origin &lt;tagname&gt;</code> 可以推送一个本地标签；</p></li><li><p>命令 <code>git push origin --tags</code> 可以推送全部未推送过的本地标签；</p></li><li><p>命令 <code>git tag -d &lt;tagname&gt;</code> 可以删除一个本地标签；</p></li><li><p>命令 <code>git push origin :refs/tags/&lt;tagname&gt;</code> 可以删除一个远程标签。</p></li></ul>`,53),i=[d];function n(g,p){return a(),t("div",null,i)}const s=e(c,[["render",n],["__file","tag.html.vue"]]),l=JSON.parse('{"path":"/git-tutor/git/tag.html","title":"标签管理","lang":"zh-CN","frontmatter":{"index":11,"title":"标签管理","icon":"tag","author":"廖雪峰","category":"Git","tag":["Git","软件"],"copyright":"Copyright by 廖雪峰 Edited by Mr.Hope","description":"为什么要有 tag 发布一个版本时，我们通常先在版本库中打一个标签 (tag)，这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。 Git 的标签虽然是版本库的快照，但其实它就是指向某个 commit 的指针(跟分支很像对不对? 但是分支可以移动，标签不能移动...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/git/tag.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"标签管理"}],["meta",{"property":"og:description","content":"为什么要有 tag 发布一个版本时，我们通常先在版本库中打一个标签 (tag)，这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。 Git 的标签虽然是版本库的快照，但其实它就是指向某个 commit 的指针(跟分支很像对不对? 但是分支可以移动，标签不能移动..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"廖雪峰"}],["meta",{"property":"article:tag","content":"Git"}],["meta",{"property":"article:tag","content":"软件"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"标签管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"廖雪峰\\"}]}"]]},"headers":[{"level":2,"title":"为什么要有 tag","slug":"为什么要有-tag","link":"#为什么要有-tag","children":[]},{"level":2,"title":"创建轻量标签","slug":"创建轻量标签","link":"#创建轻量标签","children":[]},{"level":2,"title":"附注标签","slug":"附注标签","link":"#附注标签","children":[{"level":3,"title":"添加小结","slug":"添加小结","link":"#添加小结","children":[]}]},{"level":2,"title":"操作标签","slug":"操作标签","link":"#操作标签","children":[{"level":3,"title":"管理标签小结","slug":"管理标签小结","link":"#管理标签小结","children":[]}]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.98,"words":1193},"filePathRelative":"git-tutor/git/tag.md","localizedDate":"2023年6月25日","autoDesc":true}');export{s as comp,l as data};
