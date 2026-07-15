# 存储 API

Chrome 扩展提供了多种存储方式，用于持久化数据、同步设置和缓存。

## 存储方式对比

| 存储方式 | 容量 | 持久化 | 同步 | 适用场景 |
|---|---|---|---|---|
| `storage.local` | 无限制（可设置配额） | 是 | 否 | 大量数据、缓存 |
| `storage.sync` | 每项 8KB，总计 102KB | 是 | 是（登录同一 Chrome 账号） | 用户设置、偏好 |
| `storage.session` | 约 10MB | 否（内存） | 否 | 临时数据、Service Worker 状态 |
| `storage.managed` | 由管理员定义 | 是 | 否 | 企业策略配置 |
| IndexedDB | 很大 | 是 | 否 | 复杂结构化数据 |

## storage.local

数据仅保存在本地，不会同步到其他设备。

```javascript
// 存储数据
chrome.storage.local.set({
  key: 'value',
  user: { name: 'Alice', age: 30 },
  count: 42
}, () => {
  console.log('数据已保存');
});

// 读取数据
chrome.storage.local.get(['key', 'user'], result => {
  console.log('key:', result.key);
  console.log('user:', result.user);
});

// 读取所有数据
chrome.storage.local.get(null, allData => {
  console.log('所有数据:', allData);
});

// 删除数据
chrome.storage.local.remove('key', () => {
  console.log('已删除');
});

// 清空数据
chrome.storage.local.clear(() => {
  console.log('已清空');
});
```

## storage.sync

数据会通过 Chrome 账号同步到同一登录的其他设备。

```javascript
// 存储用户设置
chrome.storage.sync.set({
  theme: 'dark',
  fontSize: 14,
  autoSave: true
}, () => {
  if (chrome.runtime.lastError) {
    console.error('同步存储失败:', chrome.runtime.lastError);
  }
});

// 读取设置（设置默认值）
chrome.storage.sync.get({
  theme: 'light',      // 默认值
  fontSize: 12,
  autoSave: false
}, settings => {
  applyTheme(settings.theme);
  applyFontSize(settings.fontSize);
});
```

**限制**：
- 每项 key 的值大小不超过 8KB
- 总共不超过 102KB
- 每分钟最多 120 次写操作

## storage.session (V3)

临时存储，仅在浏览器会话期间有效，Service Worker 休眠时数据仍然保留。

```javascript
// 存储临时数据
chrome.storage.session.set({
  tabStates: {},
  lastAction: Date.now()
});

// 读取
chrome.storage.session.get('tabStates', result => {
  console.log(result.tabStates);
});

// 获取已用容量
chrome.storage.session.getBytesInUse(bytes => {
  console.log('已用:', bytes, 'bytes');
});
```

适用场景：
- Service Worker 状态恢复
- 选项卡临时状态
- 一次性令牌

## storage.managed

由企业管理员通过策略配置，插件只读。

需要在外部配置 `policy.json` 或通过 Active Directory/GPO 部署。

```javascript
chrome.storage.managed.get(config => {
  if (chrome.runtime.lastError) {
    console.log('没有管理员配置:', chrome.runtime.lastError.message);
    return;
  }
  console.log('企业策略:', config);
});
```

## 变更监听

```javascript
// 监听所有存储变化
chrome.storage.onChanged.addListener((changes, areaName) => {
  for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(`存储区域 ${areaName} 中的 ${key} 已变更`);
    console.log('旧值:', oldValue);
    console.log('新值:', newValue);
  }
});

// 监听指定区域
chrome.storage.local.onChanged.addListener(changes => {
  if (changes.userSettings) {
    console.log('用户设置已更新:', changes.userSettings.newValue);
  }
});
```

## 使用 IndexedDB

对于大量结构化数据，可以使用 IndexedDB（需在 Service Worker 或 Content Script 中使用）。

```javascript
// 打开数据库
const request = indexedDB.open('MyExtensionDB', 1);

request.onupgradeneeded = event => {
  const db = event.target.result;
  const store = db.createObjectStore('items', { keyPath: 'id' });
  store.createIndex('name', 'name', { unique: false });
};

request.onsuccess = event => {
  const db = event.target.result;

  // 写入数据
  const transaction = db.transaction('items', 'readwrite');
  transaction.objectStore('items').add({ id: 1, name: 'Item 1', data: {} });
};

// 注意：Service Worker 中的 IndexedDB 可能会被清理
// 建议配合 chrome.storage.local 作为持久化方案
```

## 存储工具函数

```javascript
// 封装 storage API
const Storage = {
  async getLocal(keys) {
    return new Promise(resolve => {
      chrome.storage.local.get(keys, resolve);
    });
  },

  async setLocal(data) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(data, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  },

  async getSync(keys) {
    return new Promise(resolve => {
      chrome.storage.sync.get(keys, resolve);
    });
  },

  async setSync(data) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(data, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  },

  async getDefaults(defaults) {
    const data = await this.getSync(Object.keys(defaults));
    return { ...defaults, ...data };
  }
};

// 使用
(async () => {
  const config = await Storage.getDefaults({
    theme: 'light',
    lang: 'zh-CN'
  });
  console.log('配置:', config);
})();
```

## 存储迁移

从 V2 迁移到 V3 时的存储兼容：

```javascript
// 尝试从 sync 读取，如果不存在则从 local 读取
async function migrateStorage() {
  const syncData = await chrome.storage.sync.get(null);

  if (Object.keys(syncData).length === 0) {
    const localData = await chrome.storage.local.get(null);

    if (Object.keys(localData).length > 0) {
      await chrome.storage.sync.set(localData);
      console.log('数据已从 local 迁移到 sync');
    }
  }
}
```

## 最佳实践

1. **设置默认值**：始终在 `get` 时提供默认值
2. **检查错误**：写操作后检查 `chrome.runtime.lastError`
3. **批量读写**：减少 API 调用次数
4. **监听变化**：使用 `onChanged` 实现多模块数据同步
5. **选择合适的存储**：用户设置用 `sync`，缓存用 `local`，临时数据用 `session`
