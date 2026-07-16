import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/19-gui.html","title":"19 - GUI 图形界面","lang":"zh-CN","frontmatter":{"order":19,"description":"19 - GUI 图形界面 创建基本窗口 添加控件 文本控件 输入控件 按钮 下拉框 列表框 复选框 Radio 按钮 进度条 Slider 事件绑定 Gui 事件 控件事件 读取控件值 布局选项 控件 Add 方法的第二个参数是选项字符串： 完整 GUI 示例 登录窗口 设置窗口 提示浮窗 下一步:","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"19 - GUI 图形界面\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/19-gui.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"19 - GUI 图形界面"}],["meta",{"property":"og:description","content":"19 - GUI 图形界面 创建基本窗口 添加控件 文本控件 输入控件 按钮 下拉框 列表框 复选框 Radio 按钮 进度条 Slider 事件绑定 Gui 事件 控件事件 读取控件值 布局选项 控件 Add 方法的第二个参数是选项字符串： 完整 GUI 示例 登录窗口 设置窗口 提示浮窗 下一步:"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.55,"words":1066},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/19-gui.md","autoDesc":true}`),u={name:`19-gui.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_19-gui-图形界面" tabindex="-1"><a class="header-anchor" href="#_19-gui-图形界面"><span>19 - GUI 图形界面</span></a></h1><h2 id="创建基本窗口" tabindex="-1"><a class="header-anchor" href="#创建基本窗口"><span>创建基本窗口</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 创建 Gui 对象</span>
<span class="line">myGui := Gui()</span>
<span class="line"></span>
<span class="line">; 设置窗口标题</span>
<span class="line">myGui.Title := &quot;我的第一个 GUI&quot;</span>
<span class="line"></span>
<span class="line">; 显示窗口</span>
<span class="line">myGui.Show()</span>
<span class="line"></span></code></pre></div><h2 id="添加控件" tabindex="-1"><a class="header-anchor" href="#添加控件"><span>添加控件</span></a></h2><h3 id="文本控件" tabindex="-1"><a class="header-anchor" href="#文本控件"><span>文本控件</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">myGui.Title := &quot;控件演示&quot;</span>
<span class="line"></span>
<span class="line">; 添加文本</span>
<span class="line">myGui.Add(&quot;Text&quot;,, &quot;这是一段文字&quot;)                   ; 简单文字</span>
<span class="line">myGui.Add(&quot;Text&quot;, &quot;w300&quot;, &quot;宽度300的文字&quot;)             ; 设置宽度</span>
<span class="line">myGui.Add(&quot;Text&quot;, &quot;cRed Bold&quot;, &quot;红色加粗文字&quot;)         ; 设置样式</span>
<span class="line"></span>
<span class="line">myGui.Show()</span>
<span class="line"></span></code></pre></div><h3 id="输入控件" tabindex="-1"><a class="header-anchor" href="#输入控件"><span>输入控件</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">myGui.Title := &quot;输入控件&quot;</span>
<span class="line"></span>
<span class="line">; Edit — 文本输入框</span>
<span class="line">myGui.Add(&quot;Text&quot;,, &quot;姓名:&quot;)</span>
<span class="line">edtName := myGui.Add(&quot;Edit&quot;, &quot;w200&quot;)                  ; 输入框宽度200</span>
<span class="line"></span>
<span class="line">myGui.Add(&quot;Text&quot;,, &quot;年龄:&quot;)</span>
<span class="line">edtAge := myGui.Add(&quot;Edit&quot;, &quot;w200 Number&quot;)            ; Number=只接受数字</span>
<span class="line"></span>
<span class="line">myGui.Add(&quot;Text&quot;,, &quot;备注:&quot;)</span>
<span class="line">edtNote := myGui.Add(&quot;Edit&quot;, &quot;w200 h100 Multi&quot;)       ; Multi=多行输入</span>
<span class="line"></span>
<span class="line">myGui.Show()</span>
<span class="line"></span></code></pre></div><h3 id="按钮" tabindex="-1"><a class="header-anchor" href="#按钮"><span>按钮</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">myGui.Title := &quot;按钮演示&quot;</span>
<span class="line"></span>
<span class="line">btnOk := myGui.Add(&quot;Button&quot;, &quot;w100&quot;, &quot;确定&quot;)</span>
<span class="line">btnCancel := myGui.Add(&quot;Button&quot;, &quot;w100 ys&quot;, &quot;取消&quot;)    ; ys=与上一控件同行</span>
<span class="line"></span>
<span class="line">; 绑定按钮事件</span>
<span class="line">btnOk.OnEvent(&quot;Click&quot;, OnOk)</span>
<span class="line">btnCancel.OnEvent(&quot;Click&quot;, OnCancel)</span>
<span class="line"></span>
<span class="line">OnOk(*) {</span>
<span class="line">    MsgBox &quot;点击了确定&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">OnCancel(*) {</span>
<span class="line">    MsgBox &quot;点击了取消&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">myGui.Show()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下拉框" tabindex="-1"><a class="header-anchor" href="#下拉框"><span>下拉框</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">myGui.Title := &quot;下拉框&quot;</span>
<span class="line"></span>
<span class="line">ddl := myGui.Add(&quot;DropDownList&quot;, &quot;w200&quot;, [&quot;选项1&quot;, &quot;选项2&quot;, &quot;选项3&quot;])</span>
<span class="line">ddl.Choose(1)    ; 默认选中第1项</span>
<span class="line"></span>
<span class="line">; 绑定选择变化事件</span>
<span class="line">ddl.OnEvent(&quot;Change&quot;, OnSelect)</span>
<span class="line"></span>
<span class="line">OnSelect(ctrl, *) {</span>
<span class="line">    MsgBox &quot;选择了: &quot; ctrl.Text</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">myGui.Show()</span>
<span class="line"></span></code></pre></div><h3 id="列表框" tabindex="-1"><a class="header-anchor" href="#列表框"><span>列表框</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui.Add(&quot;ListBox&quot;, &quot;w200 h150&quot;, [&quot;项目1&quot;, &quot;项目2&quot;, &quot;项目3&quot;, &quot;项目4&quot;])</span>
<span class="line"></span></code></pre></div><h3 id="复选框" tabindex="-1"><a class="header-anchor" href="#复选框"><span>复选框</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">chkAuto := myGui.Add(&quot;CheckBox&quot;,, &quot;自动保存&quot;)</span>
<span class="line">chkVerbose := myGui.Add(&quot;CheckBox&quot;,, &quot;详细模式&quot;)</span>
<span class="line"></span>
<span class="line">; 检查状态</span>
<span class="line">btnCheck := myGui.Add(&quot;Button&quot;,, &quot;检查状态&quot;)</span>
<span class="line">btnCheck.OnEvent(&quot;Click&quot;, CheckState)</span>
<span class="line"></span>
<span class="line">CheckState(*) {</span>
<span class="line">    MsgBox &quot;自动保存: &quot; (chkAuto.Value ? &quot;是&quot; : &quot;否&quot;)</span>
<span class="line">    MsgBox &quot;详细模式: &quot; (chkVerbose.Value ? &quot;是&quot; : &quot;否&quot;)</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">myGui.Show()</span>
<span class="line"></span></code></pre></div><h3 id="radio-按钮" tabindex="-1"><a class="header-anchor" href="#radio-按钮"><span>Radio 按钮</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">myGui.Add(&quot;Radio&quot;, &quot;vOpt1&quot;, &quot;选项A&quot;)</span>
<span class="line">myGui.Add(&quot;Radio&quot;, &quot;vOpt2&quot;, &quot;选项B&quot;)</span>
<span class="line">myGui.Add(&quot;Radio&quot;, &quot;vOpt3&quot;, &quot;选项C&quot;)</span>
<span class="line"></span></code></pre></div><h3 id="进度条" tabindex="-1"><a class="header-anchor" href="#进度条"><span>进度条</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">progress := myGui.Add(&quot;Progress&quot;, &quot;w300 h20&quot;, 50)   ; 50%</span>
<span class="line">myGui.Show()</span>
<span class="line"></span>
<span class="line">; 更新进度</span>
<span class="line">progress.Value := 75   ; 设为75%</span>
<span class="line"></span></code></pre></div><h3 id="slider" tabindex="-1"><a class="header-anchor" href="#slider"><span>Slider</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">slider := myGui.Add(&quot;Slider&quot;, &quot;w300&quot;, 50)             ; 范围默认0-100</span>
<span class="line">slider.OnEvent(&quot;Change&quot;, OnSlider)</span>
<span class="line"></span>
<span class="line">OnSlider(ctrl, *) {</span>
<span class="line">    ToolTip &quot;值: &quot; ctrl.Value</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -1000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">myGui.Show()</span>
<span class="line"></span></code></pre></div><h2 id="事件绑定" tabindex="-1"><a class="header-anchor" href="#事件绑定"><span>事件绑定</span></a></h2><h3 id="gui-事件" tabindex="-1"><a class="header-anchor" href="#gui-事件"><span>Gui 事件</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">myGui.Title := &quot;事件演示&quot;</span>
<span class="line"></span>
<span class="line">; 关闭事件</span>
<span class="line">myGui.OnEvent(&quot;Close&quot;, OnClose)</span>
<span class="line">; 最小化事件</span>
<span class="line">myGui.OnEvent(&quot;Escape&quot;, OnEscape)      ; Esc键按下</span>
<span class="line">; 大小变化事件</span>
<span class="line">myGui.OnEvent(&quot;Size&quot;, OnSize)</span>
<span class="line"></span>
<span class="line">OnClose(*) {</span>
<span class="line">    MsgBox &quot;窗口关闭&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">OnEscape(*) {</span>
<span class="line">    MsgBox &quot;按下Esc&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">OnSize(gui, minMax, width, height) {</span>
<span class="line">    ; minMax: -1=最小化, 0=还原, 1=最大化</span>
<span class="line">    ToolTip &quot;窗口大小: &quot; width &quot;x&quot; height</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -2000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">myGui.Show()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="控件事件" tabindex="-1"><a class="header-anchor" href="#控件事件"><span>控件事件</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Button — OnEvent(&quot;Click&quot;, handler)</span>
<span class="line">btn.OnEvent(&quot;Click&quot;, OnClick)</span>
<span class="line"></span>
<span class="line">; Edit — OnEvent(&quot;Change&quot;, handler)</span>
<span class="line">edt.OnEvent(&quot;Change&quot;, OnChange)</span>
<span class="line"></span>
<span class="line">; DropDownList / ComboBox — OnEvent(&quot;Change&quot;, handler)</span>
<span class="line">ddl.OnEvent(&quot;Change&quot;, OnChange)</span>
<span class="line"></span>
<span class="line">; CheckBox / Radio — OnEvent(&quot;Click&quot;, handler)</span>
<span class="line">chk.OnEvent(&quot;Click&quot;, OnCheck)</span>
<span class="line"></span>
<span class="line">; ListBox — OnEvent(&quot;Change&quot;, handler)</span>
<span class="line">lb.OnEvent(&quot;Change&quot;, OnChange)</span>
<span class="line"></span>
<span class="line">; Slider — OnEvent(&quot;Change&quot;, handler)</span>
<span class="line">slider.OnEvent(&quot;Change&quot;, OnSliderChange)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="读取控件值" tabindex="-1"><a class="header-anchor" href="#读取控件值"><span>读取控件值</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">myGui := Gui()</span>
<span class="line">myGui.Title := &quot;读取控件&quot;</span>
<span class="line"></span>
<span class="line">edtName := myGui.Add(&quot;Edit&quot;, &quot;w200&quot;)</span>
<span class="line">chkAuto := myGui.Add(&quot;CheckBox&quot;,, &quot;自动保存&quot;)</span>
<span class="line">ddlSize := myGui.Add(&quot;DropDownList&quot;, &quot;w200&quot;, [&quot;小&quot;, &quot;中&quot;, &quot;大&quot;])</span>
<span class="line"></span>
<span class="line">btnSubmit := myGui.Add(&quot;Button&quot;, &quot;w200&quot;, &quot;提交&quot;)</span>
<span class="line">btnSubmit.OnEvent(&quot;Click&quot;, Submit)</span>
<span class="line"></span>
<span class="line">Submit(*) {</span>
<span class="line">    MsgBox &quot;姓名: &quot; edtName.Value</span>
<span class="line">    MsgBox &quot;自动保存: &quot; (chkAuto.Value ? &quot;是&quot; : &quot;否&quot;)</span>
<span class="line">    MsgBox &quot;大小: &quot; ddlSize.Text</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">myGui.Show()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="布局选项" tabindex="-1"><a class="header-anchor" href="#布局选项"><span>布局选项</span></a></h2><p>控件 Add 方法的第二个参数是选项字符串：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 尺寸</span>
<span class="line">&quot;w200&quot;           ; 宽度200</span>
<span class="line">&quot;h100&quot;           ; 高度100</span>
<span class="line">&quot;w300 h200&quot;      ; 宽300 高200</span>
<span class="line"></span>
<span class="line">; 位置</span>
<span class="line">&quot;x10 y20&quot;        ; 指定位置</span>
<span class="line">&quot;xp+10 yp+5&quot;    ; 相对上一个控件偏移</span>
<span class="line"></span>
<span class="line">; 对齐</span>
<span class="line">&quot;xs&quot;             ; 与上一个行起始对齐（同行）</span>
<span class="line">&quot;ys&quot;             ; 与上一个控件同行（列对齐）</span>
<span class="line">&quot;x+m&quot;            ; 右边间距</span>
<span class="line">&quot;y+m&quot;            ; 下边间距</span>
<span class="line"></span>
<span class="line">; 样式</span>
<span class="line">&quot;Center&quot;         ; 文字居中</span>
<span class="line">&quot;Bold&quot;           ; 加粗</span>
<span class="line">&quot;Italic&quot;         ; 斜体</span>
<span class="line">&quot;cRed&quot;           ; 红色文字</span>
<span class="line">&quot;BackgroundWhite&quot;; 白色背景</span>
<span class="line"></span>
<span class="line">; 行为</span>
<span class="line">&quot;Number&quot;         ; Edit只接受数字</span>
<span class="line">&quot;Multi&quot;          ; Edit多行</span>
<span class="line">&quot;Password&quot;       ; Edit密码模式</span>
<span class="line">&quot;ReadOnly&quot;       ; Edit只读</span>
<span class="line">&quot;Disabled&quot;       ; 禁用控件</span>
<span class="line">&quot;Hidden&quot;         ; 隐藏控件</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="完整-gui-示例" tabindex="-1"><a class="header-anchor" href="#完整-gui-示例"><span>完整 GUI 示例</span></a></h2><h3 id="登录窗口" tabindex="-1"><a class="header-anchor" href="#登录窗口"><span>登录窗口</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 创建登录 GUI</span>
<span class="line">loginGui := Gui()</span>
<span class="line">loginGui.Title := &quot;登录&quot;</span>
<span class="line">loginGui.SetFont(&quot;s10&quot;, &quot;Segoe UI&quot;)</span>
<span class="line"></span>
<span class="line">loginGui.Add(&quot;Text&quot;, &quot;w200&quot;, &quot;用户名:&quot;)</span>
<span class="line">edtUser := loginGui.Add(&quot;Edit&quot;, &quot;w200&quot;)</span>
<span class="line"></span>
<span class="line">loginGui.Add(&quot;Text&quot;, &quot;w200&quot;, &quot;密码:&quot;)</span>
<span class="line">edtPass := loginGui.Add(&quot;Edit&quot;, &quot;w200 Password&quot;)</span>
<span class="line"></span>
<span class="line">btnLogin := loginGui.Add(&quot;Button&quot;, &quot;w95&quot;, &quot;登录&quot;)</span>
<span class="line">btnCancel := loginGui.Add(&quot;Button&quot;, &quot;w95 ys&quot;, &quot;取消&quot;)</span>
<span class="line"></span>
<span class="line">btnLogin.OnEvent(&quot;Click&quot;, DoLogin)</span>
<span class="line">btnCancel.OnEvent(&quot;Click&quot;, (*) =&gt; loginGui.Hide())</span>
<span class="line">loginGui.OnEvent(&quot;Close&quot;, (*) =&gt; loginGui.Hide())</span>
<span class="line">loginGui.OnEvent(&quot;Escape&quot;, (*) =&gt; loginGui.Hide())</span>
<span class="line"></span>
<span class="line">DoLogin(*) {</span>
<span class="line">    user := edtUser.Value</span>
<span class="line">    pass := edtPass.Value</span>
<span class="line">    if (user = &quot;&quot; || pass = &quot;&quot;) {</span>
<span class="line">        MsgBox &quot;请填写用户名和密码&quot;, &quot;错误&quot;, 48</span>
<span class="line">        return</span>
<span class="line">    }</span>
<span class="line">    MsgBox &quot;登录成功！用户: &quot; user, &quot;成功&quot;, 64</span>
<span class="line">    loginGui.Hide()</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">loginGui.Show()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置窗口" tabindex="-1"><a class="header-anchor" href="#设置窗口"><span>设置窗口</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">settingsGui := Gui()</span>
<span class="line">settingsGui.Title := &quot;设置&quot;</span>
<span class="line">settingsGui.SetFont(&quot;s9&quot;, &quot;Segoe UI&quot;)</span>
<span class="line"></span>
<span class="line">; Tab 控件 — 分页设置</span>
<span class="line">tab := settingsGui.Add(&quot;Tab3&quot;, &quot;w400 h300&quot;, [&quot;通用&quot;, &quot;外观&quot;, &quot;高级&quot;])</span>
<span class="line"></span>
<span class="line">; 通用页</span>
<span class="line">settingsGui.Add(&quot;CheckBox&quot;,, &quot;自动保存&quot;).OnEvent(&quot;Click&quot;, (*) =&gt; MsgBox(&quot;自动保存已切换&quot;))</span>
<span class="line">settingsGui.Add(&quot;CheckBox&quot;,, &quot;显示状态栏&quot;)</span>
<span class="line">settingsGui.Add(&quot;DropDownList&quot;, &quot;w200&quot;, [&quot;5分钟&quot;, &quot;10分钟&quot;, &quot;30分钟&quot;])</span>
<span class="line"></span>
<span class="line">; 外观页（在Tab切换时添加更复杂的控件）</span>
<span class="line">settingsGui.Add(&quot;Text&quot;,, &quot;字体大小:&quot;)</span>
<span class="line">settingsGui.Add(&quot;Slider&quot;, &quot;w200&quot;, 12)</span>
<span class="line"></span>
<span class="line">; 高级页</span>
<span class="line">settingsGui.Add(&quot;CheckBox&quot;,, &quot;调试模式&quot;)</span>
<span class="line">settingsGui.Add(&quot;CheckBox&quot;,, &quot;性能监控&quot;)</span>
<span class="line"></span>
<span class="line">; 底部按钮</span>
<span class="line">settingsGui.Add(&quot;Button&quot;, &quot;w95 y+m&quot;, &quot;保存&quot;)</span>
<span class="line">settingsGui.Add(&quot;Button&quot;, &quot;w95 ys&quot;, &quot;取消&quot;)</span>
<span class="line"></span>
<span class="line">settingsGui.Show()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="提示浮窗" tabindex="-1"><a class="header-anchor" href="#提示浮窗"><span>提示浮窗</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 创建一个小型提示浮窗</span>
<span class="line">tipGui := Gui(&quot;AlwaysOnTop -Caption Border&quot;)</span>
<span class="line">tipGui.BackColor := 0xFFFFFF</span>
<span class="line">tipGui.Add(&quot;Text&quot;, &quot;w200 Center&quot;, &quot;操作完成!&quot;)</span>
<span class="line">tipGui.Show(&quot;NA x100 y100&quot;)</span>
<span class="line"></span>
<span class="line">; 3秒后关闭</span>
<span class="line">SetTimer () =&gt; tipGui.Destroy(), -3000</span>
<span class="line"></span></code></pre></div><hr>`,40),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/20-dll-and-com.html`},{default:r(()=>[...l[0]||=[e(`20-DLL调用与COM`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};