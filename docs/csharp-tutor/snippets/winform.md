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
