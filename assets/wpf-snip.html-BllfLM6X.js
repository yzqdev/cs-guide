import{_ as e,c as t,o as n,d as i}from"./app-CbULZrmi.js";const a={},o=i(`<h1 id="wpf代码片段" tabindex="-1"><a class="header-anchor" href="#wpf代码片段"><span>wpf代码片段</span></a></h1><h2 id="打开文件对话框" tabindex="-1"><a class="header-anchor" href="#打开文件对话框"><span>打开文件对话框</span></a></h2><pre><code class="language-csharp"> if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                label1.Text = &quot;图片路径：&quot;+openFileDialog1.FileName;
                imgpath = openFileDialog1.FileName;
            }
</code></pre><h2 id="图片转换" tabindex="-1"><a class="header-anchor" href="#图片转换"><span>图片转换</span></a></h2><pre><code class="language-csharp">//imgpath是输入图片的路径
Bitmap bt = new Bitmap(imgpath);
bt.Save(&quot;c:\\\\1.bmp&quot;, System.Drawing.Imaging.ImageFormat.Bmp);
 MessageBox.Show(&quot;格式转换成功&quot;);
</code></pre><h2 id="获取拖入文件的位置" tabindex="-1"><a class="header-anchor" href="#获取拖入文件的位置"><span>获取拖入文件的位置</span></a></h2><p>要设置<code>allowDrop</code>为true</p><pre><code class="language-csharp">   private void Form1_DragEnter(object sender, DragEventArgs e)
        {
            e.Effect = DragDropEffects.Copy;       //设置拖放操作中目标放置类型为复制
            String[] str_Drop = (String[])e.Data.GetData(DataFormats.FileDrop, true);//检索数据格式相关联的数据
            MessageBox.Show(str_Drop[0]);
        }
</code></pre><h2 id="使用简单的json配置文件" tabindex="-1"><a class="header-anchor" href="#使用简单的json配置文件"><span>使用简单的json配置文件</span></a></h2><pre><code class="language-csharp">using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*
 * 需要添加引用Newtonsoft.Json.dl
 */

namespace KeqingNiuza.RealtimeNotes.Models{
    public class JsonConfigHelper {

        private static Dictionary&lt;string, string&gt; configDic = new Dictionary&lt;string, string&gt;();
        private readonly static string Conf = &quot;NoteConfig.json&quot;;
        /// &lt;summary&gt;
        /// 读取配置信息
        /// &lt;/summary&gt;
        /// &lt;param name=&quot;key&quot;&gt;&lt;/param&gt;
        /// &lt;returns&gt;&lt;/returns&gt;
        public static string ReadConfig(string key) {
            if (File.Exists(Conf) == false)//如果不存在就创建file文件夹
            {
                FileStream f = File.Create(Conf);
                f.Close();
            }
            string s = File.ReadAllText(Conf);
            try {
                configDic = JsonConvert.DeserializeObject&lt;Dictionary&lt;string, string&gt;&gt;(s);
            } catch {
                configDic = new Dictionary&lt;string, string&gt;();
            }

            if (configDic != null &amp;&amp; configDic.ContainsKey(key)) {
                return configDic[key];
            } else {
                return string.Empty;
            }
        }

        /// &lt;summary&gt;
        /// 添加配置信息
        /// &lt;/summary&gt;
        /// &lt;param name=&quot;key&quot;&gt;&lt;/param&gt;
        /// &lt;param name=&quot;value&quot;&gt;&lt;/param&gt;
        public static void WriteConfig(string key, string value) {
            if (configDic == null) {
                configDic = new Dictionary&lt;string, string&gt;();
            }
            configDic[key] = value;
            string s = JsonConvert.SerializeObject(configDic);
            File.WriteAllText(Conf, s);
        }

        /// &lt;summary&gt;
        /// 删除配置信息
        /// &lt;/summary&gt;
        /// &lt;param name=&quot;key&quot;&gt;&lt;/param&gt;
        public static void DeleteConfig(string key) {
            if (configDic != null &amp;&amp; configDic.ContainsKey(key)) {
                configDic.Remove(key);
                string s = JsonConvert.SerializeObject(configDic);
                File.WriteAllText(Conf, s);
            }
        }
    }
}
</code></pre>`,10),r=[o];function s(l,c){return n(),t("div",null,r)}const g=e(a,[["render",s],["__file","wpf-snip.html.vue"]]),m=JSON.parse('{"path":"/csharp-tutor/snippets/wpf-snip.html","title":"wpf代码片段","lang":"zh-CN","frontmatter":{"description":"wpf代码片段 打开文件对话框 图片转换 获取拖入文件的位置 要设置allowDrop为true 使用简单的json配置文件","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/snippets/wpf-snip.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"wpf代码片段"}],["meta",{"property":"og:description","content":"wpf代码片段 打开文件对话框 图片转换 获取拖入文件的位置 要设置allowDrop为true 使用简单的json配置文件"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-01T12:33:24.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-01T12:33:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"wpf代码片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-01T12:33:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"打开文件对话框","slug":"打开文件对话框","link":"#打开文件对话框","children":[]},{"level":2,"title":"图片转换","slug":"图片转换","link":"#图片转换","children":[]},{"level":2,"title":"获取拖入文件的位置","slug":"获取拖入文件的位置","link":"#获取拖入文件的位置","children":[]},{"level":2,"title":"使用简单的json配置文件","slug":"使用简单的json配置文件","link":"#使用简单的json配置文件","children":[]}],"git":{"createdTime":1653752204000,"updatedTime":1654086804000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.1,"words":331},"filePathRelative":"csharp-tutor/snippets/wpf-snip.md","localizedDate":"2022年5月28日","autoDesc":true}');export{g as comp,m as data};
