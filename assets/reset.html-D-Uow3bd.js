import{_ as s,c as n,a as e,o as t}from"./app-C8DxhDIZ.js";const p="/cs-guide/assets/timeline-D7Ph1VNE.jpg",i="/cs-guide/assets/git1-hKWnLlXB.jpg",c="/cs-guide/assets/git2-Ca3SP0d1.jpg",l={};function o(d,a){return t(),n("div",null,a[0]||(a[0]=[e(`<p>修改 readme.txt 文件如下:</p><div class="language-markdown" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">Git is a distributed version control system.</span>
<span class="line">Git is free software distributed under the GPL.</span>
<span class="line"></span></code></pre></div><p>然后尝试提交:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">git</span> <span class="token function">add</span> readme.txt</span>
<span class="line"><span class="token comment"># nothing displayed</span></span>
<span class="line">$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;append GPL&quot;</span></span>
<span class="line"><span class="token punctuation">[</span>master 1094adb<span class="token punctuation">]</span> append GPL</span>
<span class="line"> <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">1</span> insertion<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">1</span> deletion<span class="token punctuation">(</span>-<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>像这样不断对文件进行修改，然后不断提交修改到版本库里，每当文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在 Git 中被称为 <code>commit</code>。如果把文件改乱了，或者误删了文件，还可以从最近的一个 <code>commit</code> 恢复，然后继续工作，而不是把几个月的工作成果全部丢失。</p><p>现在，我们回顾一下 <code>readme.txt</code> 文件一共有几个版本被提交到 Git 仓库里了:</p><ul><li>版本 1: wrote a readme file</li></ul><div class="language-markdown" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">Git is a version control system.</span>
<span class="line">Git is free software.</span>
<span class="line"></span></code></pre></div><ul><li>版本 2: add distributed</li></ul><div class="language-markdown" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">Git is a distributed version control system.</span>
<span class="line">Git is free software.</span>
<span class="line"></span></code></pre></div><ul><li>版本 3: append GPL</li></ul><div class="language-markdown" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line">Git is a distributed version control system.</span>
<span class="line">Git is free software distributed under the GPL.</span>
<span class="line"></span></code></pre></div><h2 id="查看版本信息" tabindex="-1"><a class="header-anchor" href="#查看版本信息"><span>查看版本信息</span></a></h2><p>版本控制系统用 <code>git log</code> 命令可以告诉我们历史记录，在 Git 中，我们查看:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">git</span> log</span>
<span class="line">commit 1094adb7b9b3807259d8cb349e7df1d4d6477073 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span></span>
<span class="line">Author: Michael Liao <span class="token operator">&lt;</span>askxuefeng@gmail.com<span class="token operator">&gt;</span></span>
<span class="line">Date:   Fri May <span class="token number">18</span> <span class="token number">21</span>:06:15 <span class="token number">2018</span> +0800</span>
<span class="line"></span>
<span class="line">    append GPL</span>
<span class="line"></span>
<span class="line">commit e475afc93c209a690c39c13a46716e8fa000c366</span>
<span class="line">Author: Michael Liao <span class="token operator">&lt;</span>askxuefeng@gmail.com<span class="token operator">&gt;</span></span>
<span class="line">Date:   Fri May <span class="token number">18</span> <span class="token number">21</span>:03:36 <span class="token number">2018</span> +0800</span>
<span class="line"></span>
<span class="line">    <span class="token function">add</span> distributed</span>
<span class="line"></span>
<span class="line">commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0</span>
<span class="line">Author: Michael Liao <span class="token operator">&lt;</span>askxuefeng@gmail.com<span class="token operator">&gt;</span></span>
<span class="line">Date:   Fri May <span class="token number">18</span> <span class="token number">20</span>:59:18 <span class="token number">2018</span> +0800</span>
<span class="line"></span>
<span class="line">    wrote a readme <span class="token function">file</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>git log</code> 命令显示从最近到最远的提交日志，我们可以看到 3 次提交，最近的一次是 <code>append GPL</code>，上一次是 <code>add distributed</code>，最早的一次是 <code>wrote a readme file</code>。</p><p>如果嫌输出信息太多，看得眼花缭乱的，可以试试加上 <code>--pretty=oneline</code> 参数:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">git</span> log <span class="token parameter variable">--pretty</span><span class="token operator">=</span>oneline</span>
<span class="line">1094adb7b9b3807259d8cb349e7df1d4d6477073 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> append GPL</span>
<span class="line">e475afc93c209a690c39c13a46716e8fa000c366 <span class="token function">add</span> distributed</span>
<span class="line">eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0 wrote a readme <span class="token function">file</span></span>
<span class="line"></span></code></pre></div><p>一大串类似 <code>1094adb...</code> 的是 commit id (版本号)，和 SVN 不一样，Git 的 commit id 不是 1，2，3…… 递增的数字，而是一个 SHA1 计算出来的一个非常大的数字，用十六进制表示，为什么 commit id 需要用这么一大串数字表示呢? 因为 Git 是分布式的版本控制系统，多人在同一个版本库里工作，如果大家都用 1，2，3…… 作为版本号，那肯定就冲突了。</p><p>每提交一个新版本，实际上 Git 就会把它们自动串成一条时间线。如果使用可视化工具查看 Git 历史，就可以更清楚地看到提交历史的时间线:</p><p><img src="`+p+`" alt="Git 时间线"></p><div class="hint-container tip"><p class="hint-container-title">更多选项</p><p>关于 <code>git log</code> 的更多选项，请见 <a href="/file/git/progit_v2.1.45.pdf" target="_blank" rel="noopener noreferrer">ProGit 书籍</a> 的 P43。</p></div><h2 id="回退版本" tabindex="-1"><a class="header-anchor" href="#回退版本"><span>回退版本</span></a></h2><p>好了，现在准备把 readme.txt 回退到上一个版本，也就是 <code>add distributed</code> 的那个版本，怎么做呢?</p><p>首先，Git 必须知道当前版本是哪个版本，在 Git 中，用 <code>HEAD</code> 表示当前版本，也就是最新的提交 <code>1094adb...</code> (注意我的提交 ID 和您的肯定不一样)，上一个版本就是 <code>HEAD^</code>，上上一个版本就是 <code>HEAD^^</code>，当然往上 100 个版本写 100 个 <code>^</code> 比较容易数不过来，所以写成 <code>HEAD~100</code>。</p><p>现在，要把当前版本 <code>append GPL</code> 回退到上一个版本 <code>add distributed</code>，就可以使用 <code>git reset</code> 命令:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD^</span>
<span class="line">HEAD is now at e475afc <span class="token function">add</span> distributed</span>
<span class="line"></span></code></pre></div><p>看看 readme.txt 的内容是不是版本 add distributed:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">cat</span> readme.txt</span>
<span class="line">Git is a distributed version control system.</span>
<span class="line">Git is <span class="token function">free</span> software.</span>
<span class="line"></span></code></pre></div><p>果然被还原了。</p><p>还可以继续回退到上一个版本 wrote a readme file，不过且慢，然我们用 <code>git log</code> 再看看现在版本库的状态:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">git</span> log</span>
<span class="line">commit e475afc93c209a690c39c13a46716e8fa000c366 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span></span>
<span class="line">Author: Michael Liao <span class="token operator">&lt;</span>askxuefeng@gmail.com<span class="token operator">&gt;</span></span>
<span class="line">Date:   Fri May <span class="token number">18</span> <span class="token number">21</span>:03:36 <span class="token number">2018</span> +0800</span>
<span class="line"></span>
<span class="line">    <span class="token function">add</span> distributed</span>
<span class="line"></span>
<span class="line">commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0</span>
<span class="line">Author: Michael Liao <span class="token operator">&lt;</span>askxuefeng@gmail.com<span class="token operator">&gt;</span></span>
<span class="line">Date:   Fri May <span class="token number">18</span> <span class="token number">20</span>:59:18 <span class="token number">2018</span> +0800</span>
<span class="line"></span>
<span class="line">    wrote a readme <span class="token function">file</span></span>
<span class="line"></span></code></pre></div><p>最新的那个版本 append GPL 已经看不到了! 肿么办?</p><p>办法其实还是有的，只要上面的命令行窗口还没有被关掉，您就可以顺着往上找啊找啊，找到那个 append GPL 的 commit id 是 1094adb...，于是就可以指定回到未来的某个版本:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">git</span> reset <span class="token parameter variable">--hard</span> 1094a</span>
<span class="line">HEAD is now at 83b0afe append GPL</span>
<span class="line"></span></code></pre></div><p>版本号没必要写全，前几位就可以了，Git 会自动去找。当然也不能只写前一两位，因为 Git 可能会找到多个版本号，就无法确定是哪一个了。</p><p>再小心翼翼地看看 readme.txt 的内容:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">cat</span> readme.txt</span>
<span class="line">Git is a distributed version control system.</span>
<span class="line">Git is <span class="token function">free</span> software distributed under the GPL.</span>
<span class="line"></span></code></pre></div><p>果然，我胡汉三又回来了。</p><p>Git 的版本回退速度非常快，因为 Git 在内部有个指向当前版本的 <code>HEAD</code> 指针，当您回退版本的时候，Git 仅仅是把 <code>HEAD</code> 从指向 append GPL:</p><p><img src="`+i+'" alt="示例图4"></p><p>改为指向 <code>add distributed</code>:</p><p><img src="'+c+`" alt="示例图5"></p><p>然后顺便把工作区的文件更新了。所以您让 <code>HEAD</code> 指向哪个版本号，您就把当前版本定位在哪。</p><h2 id="找回-commit-id" tabindex="-1"><a class="header-anchor" href="#找回-commit-id"><span>找回 commit id</span></a></h2><p>如果回退到了某个版本找不到新版本的 <code>commit id</code>，在 Git 中，就无法用 <code>$ git reset --hard HEAD^</code> 回退。</p><p>所以 Git 提供了一个命令 <code>git reflog</code> 用来记录您的每一次命令:</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">git</span> reflog</span>
<span class="line">e475afc HEAD@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: reset: moving to HEAD^</span>
<span class="line">1094adb <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>: commit: append GPL</span>
<span class="line">e475afc HEAD@<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span>: commit: <span class="token function">add</span> distributed</span>
<span class="line">eaadf4e HEAD@<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">}</span>: commit <span class="token punctuation">(</span>initial<span class="token punctuation">)</span>: wrote a readme <span class="token function">file</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">$ <span class="token function">git</span> reflog</span>
<span class="line">e475afc HEAD@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: reset: moving to HEAD^</span>
<span class="line">1094adb <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>: commit: append GPL</span>
<span class="line">e475afc HEAD@<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span>: commit: <span class="token function">add</span> distributed</span>
<span class="line">eaadf4e HEAD@<span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">}</span>: commit <span class="token punctuation">(</span>initial<span class="token punctuation">)</span>: wrote a readme <span class="token function">file</span></span>
<span class="line"></span></code></pre></div><p>终于舒了口气，从输出可知，append GPL 的 commit id 是 1094adb，现在，您又可以乘坐时光机回到未来了。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2><ul><li><p><code>HEAD</code> 指向的版本就是当前版本，因此，Git 允许我们在版本的历史之间穿梭，使用命令 <code>git reset --hard commit_id</code>。</p></li><li><p>用 <code>git log</code> 可以查看提交历史，以便确定要回退到哪个版本。</p></li><li><p>用 <code>git reflog</code> 查看命令历史，以便确定要回到未来的哪个版本。</p></li></ul>`,52)]))}const u=s(l,[["render",o]]),m=JSON.parse('{"path":"/git-tutor/git/reset.html","title":"版本回退","lang":"zh-CN","frontmatter":{"title":"版本回退","icon":"return","author":"廖雪峰","category":"Git","tag":["Git","软件"],"copyright":"Copyright by 廖雪峰 Edited by Mr.Hope","description":"修改 readme.txt 文件如下: 然后尝试提交: 像这样不断对文件进行修改，然后不断提交修改到版本库里，每当文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在 Git 中被称为 commit。如果把文件改乱了，或者误删了文件，还可以从最近的一个 commit 恢复，然后继续工作，而不是把几个月的工作成果全部丢失。 现在，我们回顾一下 r...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/git-tutor/git/reset.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"版本回退"}],["meta",{"property":"og:description","content":"修改 readme.txt 文件如下: 然后尝试提交: 像这样不断对文件进行修改，然后不断提交修改到版本库里，每当文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在 Git 中被称为 commit。如果把文件改乱了，或者误删了文件，还可以从最近的一个 commit 恢复，然后继续工作，而不是把几个月的工作成果全部丢失。 现在，我们回顾一下 r..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"廖雪峰"}],["meta",{"property":"article:tag","content":"Git"}],["meta",{"property":"article:tag","content":"软件"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"版本回退\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"廖雪峰\\"}]}"]]},"headers":[{"level":2,"title":"查看版本信息","slug":"查看版本信息","link":"#查看版本信息","children":[]},{"level":2,"title":"回退版本","slug":"回退版本","link":"#回退版本","children":[]},{"level":2,"title":"找回 commit id","slug":"找回-commit-id","link":"#找回-commit-id","children":[]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.92,"words":1477},"filePathRelative":"git-tutor/git/reset.md","localizedDate":"2023年6月25日","autoDesc":true}');export{u as comp,m as data};
