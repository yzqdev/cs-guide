import{_ as e,c as n,o as t,d as o}from"./app-CbULZrmi.js";const r={},a=o(`<h1 id="winform常用代码块" tabindex="-1"><a class="header-anchor" href="#winform常用代码块"><span>winform常用代码块</span></a></h1><pre><code class="language-csharp">// Restart current process Method 1
System.Windows.Forms.Application.Restart();
Application.Current.Shutdown();

// Restart current process Method 2
System.Reflection.Assembly.GetEntryAssembly();
string startpath = System.IO.Directory.GetCurrentDirectory();
System.Diagnostics.Process.Start(startpath + “\\\\xxx.exe”);
Application.Current.Shutdown();

// Restart current process Method 3
Process p = new Process();
p.StartInfo.FileName = System.AppDomain.CurrentDomain.BaseDirectory + “xxx.exe”;
p.StartInfo.UseShellExecute = false;
p.Start();
Application.Current.Shutdown();
</code></pre><p>获取快捷方式的exe所在位置</p><pre><code class="language-csharp">  private static readonly Guid CLSID_WshShell = new Guid(&quot;72C24DD5-D70A-438B-8A42-98424B88AFB8&quot;);
        private static string GetShortCutTarget(string lnk)
        {
            if (System.IO.File.Exists(lnk))
            {
                dynamic objWshShell = null, objShortcut = null;
                try
                {
                    objWshShell = Activator.CreateInstance(Type.GetTypeFromCLSID(CLSID_WshShell));
                    objShortcut = objWshShell.CreateShortcut(lnk);
                    return objShortcut.TargetPath;
                }
                finally
                {
                    Marshal.ReleaseComObject(objShortcut);
                    Marshal.ReleaseComObject(objWshShell);
                }
            }
            return null;
        }
</code></pre><h2 id="输入框focus变色" tabindex="-1"><a class="header-anchor" href="#输入框focus变色"><span>输入框focus变色</span></a></h2><pre><code class="language-csharp">
        private void textBox1_Enter(object sender, EventArgs e)
        {
            ((TextBox)sender).BackColor = Color.CornflowerBlue;
        }

        private void textBox1_Leave(object sender, EventArgs e)
        {
            ((TextBox)sender).BackColor = Color.White;
        }

        private void textBox1_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyValue == 13)
            {
                int n = Convert.ToInt32(((TextBox)sender).Tag.ToString());
                Clear_Control(this.Controls, n, 6);
            }
        }

        #region  遍历指定的控件
        /// &lt;summary&gt;
        /// 遍历指定的控件
        /// &lt;/summary&gt;
        /// &lt;param Con=&quot;ControlCollection&quot;&gt;可视化控件&lt;/param&gt;
        /// &lt;param n=&quot;int&quot;&gt;控件标识&lt;/param&gt;
        /// &lt;param m=&quot;int&quot;&gt;最大标识&lt;/param&gt;
        public void Clear_Control(Control.ControlCollection Con, int n, int m)
        {
            int tem_n=0;
            foreach (Control C in Con)
            { //遍历可视化组件中的所有控件
                if (C.GetType().Name == &quot;TextBox&quot;)  //判断是否为TextBox控件
                {
                    if (n == m)
                        tem_n = 1;
                    else
                        tem_n = n + 1;
                    if (Convert.ToInt32(((TextBox)C).Tag.ToString())==tem_n)
                        ((TextBox)C).Focus();   //清空当前控件
                }
            }
        }
        #endregion
</code></pre><h2 id="md5加密" tabindex="-1"><a class="header-anchor" href="#md5加密"><span>md5加密</span></a></h2><pre><code class="language-csharp">  private void textBox2_TextChanged(object sender, EventArgs e)
        {
            textBox3.Text = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(textBox2.Text, &quot;MD5&quot;);
        }
</code></pre><h2 id="根据cpu获取机器码" tabindex="-1"><a class="header-anchor" href="#根据cpu获取机器码"><span>根据cpu获取机器码</span></a></h2><pre><code class="language-csharp">  private void Form1_Load(object sender, EventArgs e)
        {
            label1.Text = getCpu() + GetDiskVolumeSerialNumber();//获得24位Cpu和硬盘序列号
            string[] strid = new string[24];
            for (int i = 0; i &lt; 24; i++)//把字符赋给数组
            {
                strid[i] = label1.Text.Substring(i, 1);
            }
            label1.Text = &quot;&quot;;
            Random rdid = new Random();
            for (int i = 0; i &lt; 24; i++)//从数组随机抽取24个字符组成新的字符生成机器码
            {
                label1.Text += strid[rdid.Next(0, 24)];
            }
        }
        //取得设备硬盘的卷标号
        public string GetDiskVolumeSerialNumber()
        {
            ManagementClass mc = new ManagementClass(&quot;Win32_NetworkAdapterConfiguration&quot;);
            ManagementObject disk = new ManagementObject(&quot;win32_logicaldisk.deviceid=\\&quot;d:\\&quot;&quot;);
            disk.Get();
            return disk.GetPropertyValue(&quot;VolumeSerialNumber&quot;).ToString();
        }
        //获得CPU的序列号
        public string getCpu()
        {
            string strCpu = null;
            ManagementClass myCpu = new ManagementClass(&quot;win32_Processor&quot;);
            ManagementObjectCollection myCpuConnection = myCpu.GetInstances();
            foreach (ManagementObject myObject in myCpuConnection)
            {
                strCpu = myObject.Properties[&quot;Processorid&quot;].Value.ToString();
                break;
            }
            return strCpu;
        }
</code></pre><h2 id="下载文件" tabindex="-1"><a class="header-anchor" href="#下载文件"><span>下载文件</span></a></h2><pre><code class="language-csharp"> string uri = textBox1.Text;
            string LocalFileName = &quot;local.gif&quot;;
            System.Net.WebClient client = new System.Net.WebClient();
            client.DownloadFile(uri,LocalFileName);
            this.pictureBox1.Image = Image.FromFile(LocalFileName);
</code></pre><h2 id="word转为其他文档" tabindex="-1"><a class="header-anchor" href="#word转为其他文档"><span>word转为其他文档</span></a></h2><pre><code class="language-csharp">  Microsoft.Office.Interop.Word.Application wApp = new Microsoft.Office.Interop.Word.Application();
                //指定原文件和目标文件 
                object docPath = WordFilePath;
                string htmlPath = WordFilePath.Substring(0, WordFilePath.Length - 3) + &quot;txt&quot;;
                object Target = htmlPath;
                //缺省参数 
                object Unknown = Type.Missing;
                //只读方式打开 
                object readOnly = true;
                //打开doc文件 
                Microsoft.Office.Interop.Word.Document document = wApp.Documents.Open(ref docPath, ref Unknown,
                ref readOnly, ref Unknown, ref Unknown,
                ref Unknown, ref Unknown, ref Unknown,
                ref Unknown, ref Unknown, ref Unknown,
                ref Unknown);
                // 指定格式
                object format = Microsoft.Office.Interop.Word.WdSaveFormat.wdFormatText;
                // 转换格式 
                document.SaveAs(ref Target, ref format,
                ref Unknown, ref Unknown, ref Unknown,
                ref Unknown, ref Unknown, ref Unknown,
                ref Unknown, ref Unknown, ref Unknown);
                // 关闭文档和Word程序 
                document.Close(ref Unknown, ref Unknown, ref Unknown);
                wApp.Quit(ref Unknown, ref Unknown, ref Unknown);
</code></pre><h2 id="保存为pdf文件" tabindex="-1"><a class="header-anchor" href="#保存为pdf文件"><span>保存为pdf文件</span></a></h2><pre><code class="language-csharp"> //该变量保存PDF的文档名
        public static string filePath = &quot;&quot;;

        //创建PDF文档
        private void button1_Click(object sender, EventArgs e)
        {
            //给出文件保存信息，确定保存位置
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = &quot;PDF文件（*.PDF）|*.PDF&quot;;
            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                filePath = saveFileDialog.FileName;
                //开始创建PDF文档
                Document document = new Document();
                PdfWriter.getInstance(document, new FileStream(filePath, FileMode.Create));
                document.Open();
                BaseFont baseFont = BaseFont.createFont(@&quot;c:\\windows\\fonts\\SIMSUN.TTC,1&quot;, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
                iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 20);
                document.Add(new Paragraph(richTextBox1.Text, font));
                document.Close();
                MessageBox.Show(&quot;祝贺你，文档创建成功！&quot;, &quot;提示信息&quot;, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            this.Close();
        }
</code></pre>`,16),i=[a];function s(l,c){return t(),n("div",null,i)}const p=e(r,[["render",s],["__file","winform.html.vue"]]),u=JSON.parse('{"path":"/csharp-tutor/snippets/winform.html","title":"winform常用代码块","lang":"zh-CN","frontmatter":{"description":"winform常用代码块 获取快捷方式的exe所在位置 输入框focus变色 md5加密 根据cpu获取机器码 下载文件 word转为其他文档 保存为pdf文件","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/snippets/winform.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"winform常用代码块"}],["meta",{"property":"og:description","content":"winform常用代码块 获取快捷方式的exe所在位置 输入框focus变色 md5加密 根据cpu获取机器码 下载文件 word转为其他文档 保存为pdf文件"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-29T07:27:35.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-29T07:27:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"winform常用代码块\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-29T07:27:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"输入框focus变色","slug":"输入框focus变色","link":"#输入框focus变色","children":[]},{"level":2,"title":"md5加密","slug":"md5加密","link":"#md5加密","children":[]},{"level":2,"title":"根据cpu获取机器码","slug":"根据cpu获取机器码","link":"#根据cpu获取机器码","children":[]},{"level":2,"title":"下载文件","slug":"下载文件","link":"#下载文件","children":[]},{"level":2,"title":"word转为其他文档","slug":"word转为其他文档","link":"#word转为其他文档","children":[]},{"level":2,"title":"保存为pdf文件","slug":"保存为pdf文件","link":"#保存为pdf文件","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1653809255000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":2.45,"words":735},"filePathRelative":"csharp-tutor/snippets/winform.md","localizedDate":"2022年3月21日","autoDesc":true}');export{p as comp,u as data};
