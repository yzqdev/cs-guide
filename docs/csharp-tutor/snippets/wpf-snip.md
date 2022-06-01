# wpf代码片段

## 打开文件对话框

```csharp
 if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                label1.Text = "图片路径："+openFileDialog1.FileName;
                imgpath = openFileDialog1.FileName;
            }
```

## 图片转换

```csharp
//imgpath是输入图片的路径
Bitmap bt = new Bitmap(imgpath);
bt.Save("c:\\1.bmp", System.Drawing.Imaging.ImageFormat.Bmp);
 MessageBox.Show("格式转换成功");
```

## 获取拖入文件的位置

要设置`allowDrop`为true

```csharp
   private void Form1_DragEnter(object sender, DragEventArgs e)
        {
            e.Effect = DragDropEffects.Copy;       //设置拖放操作中目标放置类型为复制
            String[] str_Drop = (String[])e.Data.GetData(DataFormats.FileDrop, true);//检索数据格式相关联的数据
            MessageBox.Show(str_Drop[0]);
        }
```

## 使用简单的json配置文件

```csharp
using Newtonsoft.Json;
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

        private static Dictionary<string, string> configDic = new Dictionary<string, string>();
        private readonly static string Conf = "NoteConfig.json";
        /// <summary>
        /// 读取配置信息
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public static string ReadConfig(string key) {
            if (File.Exists(Conf) == false)//如果不存在就创建file文件夹
            {
                FileStream f = File.Create(Conf);
                f.Close();
            }
            string s = File.ReadAllText(Conf);
            try {
                configDic = JsonConvert.DeserializeObject<Dictionary<string, string>>(s);
            } catch {
                configDic = new Dictionary<string, string>();
            }

            if (configDic != null && configDic.ContainsKey(key)) {
                return configDic[key];
            } else {
                return string.Empty;
            }
        }

        /// <summary>
        /// 添加配置信息
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public static void WriteConfig(string key, string value) {
            if (configDic == null) {
                configDic = new Dictionary<string, string>();
            }
            configDic[key] = value;
            string s = JsonConvert.SerializeObject(configDic);
            File.WriteAllText(Conf, s);
        }

        /// <summary>
        /// 删除配置信息
        /// </summary>
        /// <param name="key"></param>
        public static void DeleteConfig(string key) {
            if (configDic != null && configDic.ContainsKey(key)) {
                configDic.Remove(key);
                string s = JsonConvert.SerializeObject(configDic);
                File.WriteAllText(Conf, s);
            }
        }
    }
}
```
