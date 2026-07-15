# 地理位置 API

Geolocation API 通过 `navigator.geolocation` 获取用户设备的地理位置信息。

:::tip

[MDN Geolocation API 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API)

:::

## 基本用法

```js
navigator.geolocation.getCurrentPosition(success, error, options)
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `success` | 函数 | 定位成功时的回调，接收 `GeolocationPosition` 对象 |
| `error` | 函数（可选） | 定位失败时的回调，接收 `GeolocationPositionError` 对象 |
| `options` | 对象（可选） | 配置项 |

### options 配置

```js
const options = {
  enableHighAccuracy: true,  // 是否启用高精度（如 GPS），默认 false
  timeout: 5000,             // 超时时间（毫秒），默认 Infinity
  maximumAge: 0,             // 缓存有效期（毫秒），0 表示不缓存，默认 0
}
```

## 示例

::: normal-demo

```html
<button onclick="getLocation()">获取位置</button>
<p id="geoResult">等待操作...</p>
```

```js
function getLocation() {
  if (!navigator.geolocation) {
    document.getElementById('geoResult').textContent = '浏览器不支持地理位置 API'
    return
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords
      document.getElementById('geoResult').innerHTML = `
        纬度: ${latitude}<br>
        经度: ${longitude}<br>
        精度: ±${accuracy} 米
      `
    },
    (err) => {
      const messages = {
        1: '位置获取被拒绝',
        2: '位置信息不可用',
        3: '获取位置超时',
      }
      document.getElementById('geoResult').textContent = `错误: ${messages[err.code] || '未知错误'}`
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}
```

:::

## 持续定位 watchPosition

`watchPosition()` 持续跟踪位置变化，返回一个 watch ID 用于取消监听。

```js
// 开始监听
const watchId = navigator.geolocation.watchPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords
    console.log(`位置已更新: ${latitude}, ${longitude}`)
    updateMap(latitude, longitude)
  },
  (err) => console.error(err),
  { enableHighAccuracy: true, maximumAge: 5000 }
)

// 取消监听
function stopWatching() {
  navigator.geolocation.clearWatch(watchId)
}
```

::: normal-demo

```html
<button onclick="startWatch()">开始跟踪</button>
<button onclick="stopWatch()">停止跟踪</button>
<p id="watchResult">等待操作...</p>
```

```js
let watchId = null

function startWatch() {
  if (watchId !== null) return

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords
      const time = new Date(pos.timestamp).toLocaleTimeString()
      document.getElementById('watchResult').innerHTML =
        `[${time}] 纬度: ${latitude}, 经度: ${longitude}, 精度: ±${accuracy}m<br>` +
        document.getElementById('watchResult').innerHTML
    },
    (err) => {
      document.getElementById('watchResult').textContent = `错误: ${err.message}`
    },
    { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
  )
}

function stopWatch() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId)
    watchId = null
    document.getElementById('watchResult').innerHTML =
      '<em>已停止跟踪</em><br>' + document.getElementById('watchResult').innerHTML
  }
}
```

:::

## 错误处理

错误对象 `GeolocationPositionError` 包含以下属性：

| 常量 | 值 | 说明 |
|------|----|------|
| `PERMISSION_DENIED` | 1 | 用户拒绝了位置请求 |
| `POSITION_UNAVAILABLE` | 2 | 无法获取位置信息（如 GPS 信号丢失） |
| `TIMEOUT` | 3 | 获取位置超时 |

## 位置信息对象

成功回调的 `GeolocationPosition` 包含：

| 属性 | 类型 | 说明 |
|------|------|------|
| `coords.latitude` | number | 纬度 |
| `coords.longitude` | number | 经度 |
| `coords.accuracy` | number | 精度（米） |
| `coords.altitude` | number | 海拔高度（米） |
| `coords.altitudeAccuracy` | number | 海拔精度（米） |
| `coords.heading` | number | 行进方向（度，0=正北） |
| `coords.speed` | number | 速度（米/秒） |
| `timestamp` | number | 获取位置时的时间戳 |

## 注意事项

- 需要用户授权才能使用，首次调用时会弹出权限请求
- HTTP 页面可能被浏览器限制，建议使用 HTTPS
- 高精度模式（`enableHighAccuracy: true`）会更快消耗电量
- 移动设备上的精度通常优于桌面设备
