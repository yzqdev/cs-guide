# conda错误

 CondaHTTPError: HTTP 000 CONNECTION FAILED for url ＜<https://repo.anaconda.com/pkgs/main/win-64/curre>

[https://github.com/conda/conda/issues/9746](https://github.com/conda/conda/issues/9746)

## 安装conda后终端出现的(base)字样去除方法

修改.condarc文件

```bash
ssl_verify: true
channels:
  defaults
changeps1: False #加上这个
```
