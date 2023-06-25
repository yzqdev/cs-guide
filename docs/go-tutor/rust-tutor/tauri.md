# tauri教程

## 安装

<https://tauri.app/>

## 使用nsis

```json
{
  "build": {
    "beforeDevCommand": "yarn dev",
    "beforeBuildCommand": "yarn build",
    "devPath": "http://localhost:1420",
    "distDir": "../dist",
    "withGlobalTauri": false
  },
  "package": {
    "productName": "tauri-nsis",
    "version": "0.0.0"
  },
  "tauri": {
    "allowlist": {
      "all": false,
      "shell": {
        "all": false,
        "open": true
      }
    },
    "bundle": {
      "active": true,
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ],
      "identifier": "ab.yzq.tauri-nsis",
      "targets": ["nsis"],
      "windows": {
        "allowDowngrades": true,
        "certificateThumbprint": null,
        "digestAlgorithm": null,
        "nsis":{
          "languages": ["SimpChinese","English"],
          "displayLanguageSelector": true
        },
        "timestampUrl": null,
        "tsp": false,
        "webviewFixedRuntimePath": null,
        "webviewInstallMode": {
           "type": "skip" 
        },
        "wix": null
      }
    },
    "security": {
      "csp": null
    },
    "updater": {
      "active": false
    },
    "windows": [
      {
        "fullscreen": false,
        "resizable": true,
        "title": "tauri-nsis",
        "width": 800,
        "height": 600 
        
      }
    ]
  }
}

```
