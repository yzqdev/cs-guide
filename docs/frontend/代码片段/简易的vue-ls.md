# vue-ls实现

```javascript
export default class ls {
  static get(name, def = null) {
    const item = localStorage.getItem(name)

    if (item !== null) {
      try {
        const data = JSON.parse(item)

        if (data.expire === null) {
          return data.value
        }

        if (data.expire >= new Date().getTime()) {
          return data.value
        }

        localStorage.removeItem(name)
      } catch (err) {
        return def
      }
    }

    return def
  }

  static set(name, value, expire = null) {
    const stringifyValue = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null,
    })

    localStorage.setItem(name, stringifyValue)
  }
  static remove(item) {
    localStorage.removeItem(item)
  }
  static clear(){
    localStorage.clear()
  }
}

```

使用:

```javascript
import ls from '@/utils/ls'

ls.get('item'); 
ls.get('item,'default');
ls.set('item','setItem');
ls.set('item','setitem',60*60*1000)//一小时后失效
ls.remove('item');
ls.clear();
```
