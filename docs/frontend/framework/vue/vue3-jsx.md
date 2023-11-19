# vue3使用jsx

## 写法

有两种写法
第一种写法

```tsx
import {defineComponent} from 'vue'
 
export default defineComponent({
 
    setup(){
 
        // 这里使用（）不用写return  如果是{}则需要写
        // 内部只能有一个跟标签，你可以使用<></>
        return ()=>(
            <div>hello tsx</div>
        )
    }
 
 
})
```

 第二种使用render(options语法)

 ```tsx
 import {defineComponent} from 'vue'
 
export default defineComponent({
 
    setup(){
        
        // 这里主要书写你的js代码，生命周期，状态等
        // 但是需要将状态方法暴露出去
 
        let a = ref<string>('12')
    
        return {a}    
    },
    render(){
        return (
            <div>{this.a}<div>
        )
    }
 
})
```
