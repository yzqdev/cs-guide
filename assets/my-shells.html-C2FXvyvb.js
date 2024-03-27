import{_ as s,o as n,c as a,a as e}from"./app-BO2oONDQ.js";const t={},p=e(`<h1 id="我的一些shell1" tabindex="-1"><a class="header-anchor" href="#我的一些shell1"><span>我的一些shell1</span></a></h1><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 执行golang的二进制文件</span>
<span class="token comment">#!/bin/bash</span>
<span class="token comment"># 定义变量</span>
<span class="token comment"># 要运行的jar包路径，加不加引号都行。 注意：等号两边 不能 有空格，不然会提示command找不到</span>
<span class="token assign-left variable">binName</span><span class="token operator">=</span><span class="token string">&quot;filebrowser&quot;</span>
<span class="token comment"># 日志路径，加不加引号都行。 注意：等号两边 不能 有空格，不然会提示command找不到</span>
<span class="token assign-left variable">LOG_PATH</span><span class="token operator">=</span><span class="token string">&quot;/opt/filebrowser.log&quot;</span>
<span class="token comment"># 若是输入格式不对，给出提示！</span>
<span class="token function-name function">tips</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;WARNING!!!......Tips, please use command: sh auto_deploy.sh [start|stop|restart|status]. For example: sh auto_deploy.sh start &quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token comment"># 启动方法</span>
<span class="token function-name function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># 从新获取一下pid，由于其它操做如stop会致使pid的状态更新</span>
    <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $binName <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">)</span></span>
    <span class="token comment"># -z 表示若是$pid为空时执行</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token variable">$pid</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token function">nohup</span> ./<span class="token variable">$binName</span> <span class="token operator">&gt;&gt;</span><span class="token variable">$LOG_PATH</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
        <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $binName <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">)</span></span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is starting！pid=<span class="token variable">\${pid}</span>&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;........................Here is the log..............................&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;.....................................................................&quot;</span>
        <span class="token comment"># tail -f $LOG_PATH</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;........................Start successfully！.........................&quot;</span>
    <span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is already running,it&#39;s pid = <span class="token variable">\${pid}</span>. If necessary, please use command: sh auto_deploy.sh restart.&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># 中止方法</span>
<span class="token function-name function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># 从新获取一下pid，由于其它操做如start会致使pid的状态更新</span>
    <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $binName <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">)</span></span>
    <span class="token comment"># -z 表示若是$pid为空时执行。 注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token variable">$pid</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is not running! It&#39;s not necessary to stop it!&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">else</span>
        <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable">$pid</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service stop successfully！pid:<span class="token variable">\${pid}</span> which has been killed forcibly!&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># 输出运行状态方法</span>
<span class="token function-name function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># 从新获取一下pid，由于其它操做如stop、restart、start等会致使pid的状态更新</span>
    <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $binName <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">)</span></span>
    <span class="token comment"># -z 表示若是$pid为空时执行。注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token variable">$pid</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is not running!&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is running. It&#39;s pid=<span class="token variable">\${pid}</span>&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># 重启方法</span>
<span class="token function-name function">restart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;.............................Restarting..............................&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;.....................................................................&quot;</span>
    <span class="token comment"># 从新获取一下pid，由于其它操做如start会致使pid的状态更新</span>
    <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $binName <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">)</span></span>
    <span class="token comment"># -z 表示若是$pid为空时执行。 注意：每一个命令和变量之间必定要先后加空格，不然会提示command找不到</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-z</span> <span class="token variable">$pid</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable">$pid</span>
    <span class="token keyword">fi</span>
    start
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;....................Restart successfully！...........................&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 根据输入参数执行对应方法，不输入则执行tips提示方法</span>
<span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
<span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span>
    start
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token string">&quot;stop&quot;</span><span class="token punctuation">)</span>
    stop
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token string">&quot;status&quot;</span><span class="token punctuation">)</span>
    status
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token string">&quot;restart&quot;</span><span class="token punctuation">)</span>
    restart
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
*<span class="token punctuation">)</span>
    tips
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),i=[p];function l(o,c){return n(),a("div",null,i)}const u=s(t,[["render",l],["__file","my-shells.html.vue"]]),d=JSON.parse('{"path":"/linux-tutor/linux-tips/my-shells.html","title":"我的一些shell1","lang":"zh-CN","frontmatter":{"description":"我的一些shell1","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/my-shells.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"我的一些shell1"}],["meta",{"property":"og:description","content":"我的一些shell1"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T13:45:58.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T13:45:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"我的一些shell1\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T13:45:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1649166358000,"updatedTime":1649166358000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.02,"words":605},"filePathRelative":"linux-tutor/linux-tips/my-shells.md","localizedDate":"2022年4月5日","autoDesc":true}');export{u as comp,d as data};
