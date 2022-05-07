# go内嵌资源

:::tip
如果出现

```text
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
```

则需要在注册表里面把关联给改掉
`HKEY_CLASSES_ROOT\.js`

![res](./res/jstype.md)
:::