import{_ as e,c as t,o as r,d as o}from"./app-CbULZrmi.js";const p={},i=o(`<h1 id="reset命令可以回退版本-区别restore" tabindex="-1"><a class="header-anchor" href="#reset命令可以回退版本-区别restore"><span>reset命令可以回退版本,区别restore</span></a></h1><p>git reset 命令用于回退版本，可以指定退回某一次提交的版本。</p><p>git reset 命令语法格式如下：</p><pre><code>git reset [--soft | --mixed | --hard] [HEAD]
</code></pre><p><strong>--mixed</strong> 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。</p><pre><code>git reset  [HEAD] 
</code></pre><p>实例：</p><pre><code>git reset HEAD^            # 回退所有内容到上一个版本  
git reset HEAD^ hello.php  # 回退 hello.php 文件的版本到上一个版本  
git  reset  052e           # 回退到指定版本
</code></pre><p><strong>--soft</strong> 参数用于回退到某个版本：</p><pre><code>git reset --soft HEAD
</code></pre><p>实例：</p><pre><code>git reset --soft HEAD~3   # 回退上上上一个版本 
</code></pre><p><strong>--hard</strong> 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交：</p><pre><code>git reset --hard HEAD
</code></pre><p>实例：</p><pre><code>git reset --hard HEAD~3  # 回退上上上一个版本  
git reset –hard bae128  # 回退到某个版本回退点之前的所有信息。 
git reset --hard origin/master    # 将本地的状态回退到和远程的一样 
</code></pre><p>**注意：**谨慎使用 <strong>–-hard</strong> 参数，它会删除回退点之前的所有信息。</p><p><strong>HEAD 说明：</strong></p><ul><li><p>HEAD 表示当前版本</p></li><li><p>HEAD^ 上一个版本</p></li><li><p>HEAD^^ 上上一个版本</p></li><li><p>HEAD^^^ 上上上一个版本</p></li><li><p>以此类推...</p></li></ul><p>可以使用 ～数字表示</p><ul><li><p>HEAD~0 表示当前版本</p></li><li><p>HEAD~1 上一个版本</p></li><li><p>HEAD^2 上上一个版本</p></li><li><p>HEAD^3 上上上一个版本</p></li><li><p>以此类推...</p></li></ul><h3 id="git-reset-head" tabindex="-1"><a class="header-anchor" href="#git-reset-head"><span>git reset HEAD</span></a></h3><p>git reset HEAD 命令用于取消已缓存的内容。</p><p>我们先改动文件 README 文件，内容如下：</p><pre><code># Runoob Git 测试
# 菜鸟教程 
</code></pre><p>hello.php 文件修改为：</p><pre><code>&lt;?php
echo &#39;菜鸟教程：www.runoob.com&#39;;
echo &#39;菜鸟教程：www.runoob.com&#39;;
echo &#39;菜鸟教程：www.runoob.com&#39;;
?&gt;
</code></pre><p>现在两个文件修改后，都提交到了缓存区，我们现在要取消其中一个的缓存，操作如下：</p><pre><code>$ git status -s
    M README
    M hello.php
$ git add .
$ git status -s
M  README
M  hello.php
$ git reset HEAD hello.php 
Unstaged changes after reset:
M    hello.php
$ git status -s
M  README
    M hello.php
</code></pre><p>现在你执行 git commit，只会将 README 文件的改动提交，而 hello.php 是没有的。</p><pre><code>$ git commit -m &#39;修改&#39;
[master f50cfda] 修改
    1 file changed, 1 insertion(+)
$ git status -s
    M hello.php
</code></pre><p>可以看到 hello.php 文件的修改并未提交。</p><p>这时我们可以使用以下命令将 hello.php 的修改提交：</p><pre><code>$ git commit -am &#39;修改 hello.php 文件&#39;
[master 760f74d] 修改 hello.php 文件
    1 file changed, 1 insertion(+)
$ git status
On branch master
nothing to commit, working directory clean
</code></pre><p>简而言之，执行 git reset HEAD 以取消之前 git add 添加，但不希望包含在下一提交快照中的缓存。</p>`,35),s=[i];function n(a,c){return r(),t("div",null,s)}const l=e(p,[["render",n],["__file","git-reset.html.vue"]]),g=JSON.parse('{"path":"/git-tutor/git/git-reset.html","title":"reset命令可以回退版本,区别restore","lang":"zh-CN","frontmatter":{"description":"reset命令可以回退版本,区别restore git reset 命令用于回退版本，可以指定退回某一次提交的版本。 git reset 命令语法格式如下： --mixed 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。 实例： --soft 参数用于回退到某个版本： 实例： --hard...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/git/git-reset.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"reset命令可以回退版本,区别restore"}],["meta",{"property":"og:description","content":"reset命令可以回退版本,区别restore git reset 命令用于回退版本，可以指定退回某一次提交的版本。 git reset 命令语法格式如下： --mixed 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。 实例： --soft 参数用于回退到某个版本： 实例： --hard..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"reset命令可以回退版本,区别restore\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":3,"title":"git reset HEAD","slug":"git-reset-head","link":"#git-reset-head","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.21,"words":664},"filePathRelative":"git-tutor/git/git-reset.md","localizedDate":"2023年6月25日","autoDesc":true}');export{l as comp,g as data};
