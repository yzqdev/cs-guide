# wails教程

:::tip

- [官网](https://wails.top/)
- [github](https://github.com/wailsapp/wails)
:::

## 注意事项

:::tip

- 一定要只用hash路由,用history路由会出现问题!!!
- 在index.html中不要使用访问不了的js,不然会加载很慢!,比如`<script src="http://localhost:8098"></script>`,这是vuedevtool监听的地址
:::

## 关于build命令

```powershell
wails build -webview2 download -ldflags "-w -h -H windowsgui" -upx -upxflags -9
```

详细内容见 [官网](https://wails.top/zh-Hans/docs/reference/cli)  
> -webiew2参数(都是小写!)

:::tip
一般情况下不要用embed,虽然不需要用户安装webview2,但是他会很大,而且降低了运行效率
:::

- Download
This option will prompt the user that no suitable runtime has been found and then offer to download and run the official bootstrapper from Microsoft's WebView2 site. If the user proceeds, the official bootstrapper will be downloaded and run.

- Embed
This option embeds the official bootstrapper within the application. If no suitable runtime has been found, the application will offer to run the bootstrapper. This adds ~150k to the binary size.

- Browser
This option will prompt the user that no suitable runtime has been found and then offer to open a browser to the official WebView2 page where the bootstrapper can be downloaded and installed. The application will then exit, leaving the installation up to the user.

- Error
If no suitable runtime is found, an error is given to the user and no further action taken.
