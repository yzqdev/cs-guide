import{_ as s,c as a,a as t,o as n}from"./app-B6vXTniy.js";const p={};function l(i,e){return n(),a("div",null,[...e[0]||(e[0]=[t(`<h1 id="reset命令可以回退版本-区别restore" tabindex="-1"><a class="header-anchor" href="#reset命令可以回退版本-区别restore"><span>reset命令可以回退版本,区别restore</span></a></h1><p>git reset 命令用于回退版本，可以指定退回某一次提交的版本。</p><p>git reset 命令语法格式如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git reset [--soft | --mixed | --hard] [HEAD]</span>
<span class="line"></span></code></pre></div><p><strong>--mixed</strong> 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git reset  [HEAD] </span>
<span class="line"></span></code></pre></div><p>实例：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git reset HEAD^            # 回退所有内容到上一个版本  </span>
<span class="line">git reset HEAD^ hello.php  # 回退 hello.php 文件的版本到上一个版本  </span>
<span class="line">git  reset  052e           # 回退到指定版本</span>
<span class="line"></span></code></pre></div><p><strong>--soft</strong> 参数用于回退到某个版本：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git reset --soft HEAD</span>
<span class="line"></span></code></pre></div><p>实例：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git reset --soft HEAD~3   # 回退上上上一个版本 </span>
<span class="line"></span></code></pre></div><p><strong>--hard</strong> 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git reset --hard HEAD</span>
<span class="line"></span></code></pre></div><p>实例：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">git reset --hard HEAD~3  # 回退上上上一个版本  </span>
<span class="line">git reset –hard bae128  # 回退到某个版本回退点之前的所有信息。 </span>
<span class="line">git reset --hard origin/master    # 将本地的状态回退到和远程的一样 </span>
<span class="line"></span></code></pre></div><p>**注意：**谨慎使用 <strong>–-hard</strong> 参数，它会删除回退点之前的所有信息。</p><p><strong>HEAD 说明：</strong></p><ul><li><p>HEAD 表示当前版本</p></li><li><p>HEAD^ 上一个版本</p></li><li><p>HEAD^^ 上上一个版本</p></li><li><p>HEAD^^^ 上上上一个版本</p></li><li><p>以此类推...</p></li></ul><p>可以使用 ～数字表示</p><ul><li><p>HEAD~0 表示当前版本</p></li><li><p>HEAD~1 上一个版本</p></li><li><p>HEAD^2 上上一个版本</p></li><li><p>HEAD^3 上上上一个版本</p></li><li><p>以此类推...</p></li></ul><h3 id="git-reset-head" tabindex="-1"><a class="header-anchor" href="#git-reset-head"><span>git reset HEAD</span></a></h3><p>git reset HEAD 命令用于取消已缓存的内容。</p><p>我们先改动文件 README 文件，内容如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># Runoob Git 测试</span>
<span class="line"># 菜鸟教程 </span>
<span class="line"></span></code></pre></div><p>hello.php 文件修改为：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;?php</span>
<span class="line">echo &#39;菜鸟教程：www.runoob.com&#39;;</span>
<span class="line">echo &#39;菜鸟教程：www.runoob.com&#39;;</span>
<span class="line">echo &#39;菜鸟教程：www.runoob.com&#39;;</span>
<span class="line">?&gt;</span>
<span class="line"></span></code></pre></div><p>现在两个文件修改后，都提交到了缓存区，我们现在要取消其中一个的缓存，操作如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ git status -s</span>
<span class="line">    M README</span>
<span class="line">    M hello.php</span>
<span class="line">$ git add .</span>
<span class="line">$ git status -s</span>
<span class="line">M  README</span>
<span class="line">M  hello.php</span>
<span class="line">$ git reset HEAD hello.php </span>
<span class="line">Unstaged changes after reset:</span>
<span class="line">M    hello.php</span>
<span class="line">$ git status -s</span>
<span class="line">M  README</span>
<span class="line">    M hello.php</span>
<span class="line"></span></code></pre></div><p>现在你执行 git commit，只会将 README 文件的改动提交，而 hello.php 是没有的。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ git commit -m &#39;修改&#39;</span>
<span class="line">[master f50cfda] 修改</span>
<span class="line">    1 file changed, 1 insertion(+)</span>
<span class="line">$ git status -s</span>
<span class="line">    M hello.php</span>
<span class="line"></span></code></pre></div><p>可以看到 hello.php 文件的修改并未提交。</p><p>这时我们可以使用以下命令将 hello.php 的修改提交：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ git commit -am &#39;修改 hello.php 文件&#39;</span>
<span class="line">[master 760f74d] 修改 hello.php 文件</span>
<span class="line">    1 file changed, 1 insertion(+)</span>
<span class="line">$ git status</span>
<span class="line">On branch master</span>
<span class="line">nothing to commit, working directory clean</span>
<span class="line"></span></code></pre></div><p>简而言之，执行 git reset HEAD 以取消之前 git add 添加，但不希望包含在下一提交快照中的缓存。</p>`,35)])])}const c=s(p,[["render",l]]),o=JSON.parse('{"path":"/git-tutor/git/git-reset.html","title":"reset命令可以回退版本,区别restore","lang":"zh-CN","frontmatter":{"description":"reset命令可以回退版本,区别restore git reset 命令用于回退版本，可以指定退回某一次提交的版本。 git reset 命令语法格式如下： --mixed 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。 实例： --soft 参数用于回退到某个版本： 实例： --hard...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"reset命令可以回退版本,区别restore\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/git/git-reset.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"reset命令可以回退版本,区别restore"}],["meta",{"property":"og:description","content":"reset命令可以回退版本,区别restore git reset 命令用于回退版本，可以指定退回某一次提交的版本。 git reset 命令语法格式如下： --mixed 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。 实例： --soft 参数用于回退到某个版本： 实例： --hard..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}]]},"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.21,"words":664},"filePathRelative":"git-tutor/git/git-reset.md","autoDesc":true}');export{c as comp,o as data};
