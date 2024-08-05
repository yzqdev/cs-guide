import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const o={},r=n(`<h1 id="linux驱动问题" tabindex="-1"><a class="header-anchor" href="#linux驱动问题"><span>linux驱动问题</span></a></h1><p>选择驱动: 一般选择 opensource,除非你是双显卡 ​</p><h2 id="manjaro软件更新失败-无效或已损坏的软件包-pgp签名" tabindex="-1"><a class="header-anchor" href="#manjaro软件更新失败-无效或已损坏的软件包-pgp签名"><span>Manjaro软件更新失败：无效或已损坏的软件包(pgp签名)</span></a></h2><pre><code class="language-java"># 1,移除旧的keys
sudo rm -rf /etc/pacman.d/gnupg
# 2,初始化pacman的keys
sudo pacman-key --init
# 3,加载签名的keys
sudo pacman-key --populate archlinux
# 4,刷新升级已经签名的keys
sudo pacman-key --refresh-keys
# 5,清空并且下载新数据
sudo pacman -Sc
# 6,安装archlinuxcn-keyring
sudo pacman -S archlinuxcn-keyring

</code></pre>`,4),p=[r];function i(c,s){return a(),t("div",null,p)}const d=e(o,[["render",i],["__file","manjaro-errors.html.vue"]]),m=JSON.parse('{"path":"/linux-tutor/linux-tips/manjaro-errors.html","title":"linux驱动问题","lang":"zh-CN","frontmatter":{"description":"linux驱动问题 选择驱动: 一般选择 opensource,除非你是双显卡 ​ Manjaro软件更新失败：无效或已损坏的软件包(pgp签名)","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/manjaro-errors.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"linux驱动问题"}],["meta",{"property":"og:description","content":"linux驱动问题 选择驱动: 一般选择 opensource,除非你是双显卡 ​ Manjaro软件更新失败：无效或已损坏的软件包(pgp签名)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:17:32.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:17:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"linux驱动问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-04-05T15:17:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Manjaro软件更新失败：无效或已损坏的软件包(pgp签名)","slug":"manjaro软件更新失败-无效或已损坏的软件包-pgp签名","link":"#manjaro软件更新失败-无效或已损坏的软件包-pgp签名","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1649171852000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.38,"words":114},"filePathRelative":"linux-tutor/linux-tips/manjaro-errors.md","localizedDate":"2022年3月21日","autoDesc":true}');export{d as comp,m as data};
