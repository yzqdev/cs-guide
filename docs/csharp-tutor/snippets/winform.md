# winform常用代码块

```csharp
// Restart current process Method 1
System.Windows.Forms.Application.Restart();
Application.Current.Shutdown();

// Restart current process Method 2
System.Reflection.Assembly.GetEntryAssembly();
string startpath = System.IO.Directory.GetCurrentDirectory();
System.Diagnostics.Process.Start(startpath + “\\xxx.exe”);
Application.Current.Shutdown();

// Restart current process Method 3
Process p = new Process();
p.StartInfo.FileName = System.AppDomain.CurrentDomain.BaseDirectory + “xxx.exe”;
p.StartInfo.UseShellExecute = false;
p.Start();
Application.Current.Shutdown();
```

获取快捷方式的exe所在位置

```csharp
  private static readonly Guid CLSID_WshShell = new Guid("72C24DD5-D70A-438B-8A42-98424B88AFB8");
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
```

## 输入框focus变色

```csharp

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
        /// <summary>
        /// 遍历指定的控件
        /// </summary>
        /// <param Con="ControlCollection">可视化控件</param>
        /// <param n="int">控件标识</param>
        /// <param m="int">最大标识</param>
        public void Clear_Control(Control.ControlCollection Con, int n, int m)
        {
            int tem_n=0;
            foreach (Control C in Con)
            { //遍历可视化组件中的所有控件
                if (C.GetType().Name == "TextBox")  //判断是否为TextBox控件
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
```

## md5加密

```csharp
  private void textBox2_TextChanged(object sender, EventArgs e)
        {
            textBox3.Text = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(textBox2.Text, "MD5");
        }
```

## 根据cpu获取机器码

```csharp
  private void Form1_Load(object sender, EventArgs e)
        {
            label1.Text = getCpu() + GetDiskVolumeSerialNumber();//获得24位Cpu和硬盘序列号
            string[] strid = new string[24];
            for (int i = 0; i < 24; i++)//把字符赋给数组
            {
                strid[i] = label1.Text.Substring(i, 1);
            }
            label1.Text = "";
            Random rdid = new Random();
            for (int i = 0; i < 24; i++)//从数组随机抽取24个字符组成新的字符生成机器码
            {
                label1.Text += strid[rdid.Next(0, 24)];
            }
        }
        //取得设备硬盘的卷标号
        public string GetDiskVolumeSerialNumber()
        {
            ManagementClass mc = new ManagementClass("Win32_NetworkAdapterConfiguration");
            ManagementObject disk = new ManagementObject("win32_logicaldisk.deviceid=\"d:\"");
            disk.Get();
            return disk.GetPropertyValue("VolumeSerialNumber").ToString();
        }
        //获得CPU的序列号
        public string getCpu()
        {
            string strCpu = null;
            ManagementClass myCpu = new ManagementClass("win32_Processor");
            ManagementObjectCollection myCpuConnection = myCpu.GetInstances();
            foreach (ManagementObject myObject in myCpuConnection)
            {
                strCpu = myObject.Properties["Processorid"].Value.ToString();
                break;
            }
            return strCpu;
        }
```

## 下载文件

```csharp
 string uri = textBox1.Text;
            string LocalFileName = "local.gif";
            System.Net.WebClient client = new System.Net.WebClient();
            client.DownloadFile(uri,LocalFileName);
            this.pictureBox1.Image = Image.FromFile(LocalFileName);
```

## word转为其他文档

```csharp
  Microsoft.Office.Interop.Word.Application wApp = new Microsoft.Office.Interop.Word.Application();
                //指定原文件和目标文件 
                object docPath = WordFilePath;
                string htmlPath = WordFilePath.Substring(0, WordFilePath.Length - 3) + "txt";
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
```

## 保存为pdf文件

```csharp
 //该变量保存PDF的文档名
        public static string filePath = "";

        //创建PDF文档
        private void button1_Click(object sender, EventArgs e)
        {
            //给出文件保存信息，确定保存位置
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "PDF文件（*.PDF）|*.PDF";
            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                filePath = saveFileDialog.FileName;
                //开始创建PDF文档
                Document document = new Document();
                PdfWriter.getInstance(document, new FileStream(filePath, FileMode.Create));
                document.Open();
                BaseFont baseFont = BaseFont.createFont(@"c:\windows\fonts\SIMSUN.TTC,1", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
                iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 20);
                document.Add(new Paragraph(richTextBox1.Text, font));
                document.Close();
                MessageBox.Show("祝贺你，文档创建成功！", "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            this.Close();
        }
```
