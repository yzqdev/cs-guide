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
