# 控制台显示badge

见简书的控制台

```js
function showBadge(name, version, nameStyle, versionStyle) {
  console.log(
    "%c ".concat(name, " %c ").concat(version, " "),
    "padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat(
      nameStyle,
      ";"
    ),
    "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(
      versionStyle,
      ";"
    )
  );
}



```

然后就可以打印了

```js
 showBadge("Environment", "production", "#606060", "RGB(66,192,46)");
  showBadge("Platform", "shakespeare", "#606060", "RGB(20,117,178)");
  showBadge("Version ", "1.1.0", "#606060", "RGB(20,117,178)");
  showBadge(
    "Build Date",
    "2020-08-26T02:44:50.105Z",
    "#606060",
    "RGB(20,117,178)"
  );
  ```
