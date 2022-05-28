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
