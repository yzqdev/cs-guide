# 镜像源使用

bootcdn

unpkg

jsdelivr

npmmirror

```bash
# 获取目录信息 /${pkg}/${versionOrTag}/files?meta
https://registry.npmmirror.com/antd/5.5.2/files?meta

# 获取文件内容 /${pkg}/${versionOrTag}/files/${path}
https://registry.npmmirror.com/antd/5.5.0/files/lib/index.js

# 获取文件元信息 /${pkg}/${versionOrTag}/files/${path}?meta
https://registry.npmmirror.com/antd/5.5.0/files/lib/index.js?meta

# 获取入口文件内容 /${pkg}/${versionOrTag}/files
https://registry.npmmirror.com/antd/latest/files

# 支持 Semver Range
https://registry.npmmirror.com/antd/^5/files/lib/index.js
```