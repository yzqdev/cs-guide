# vue用法

## echarts点击legend报错

分析问题：这个问题是在切换series或者resize时报错的，vue3中使用proxy的方式监听响应式，this.chart会被在vue内部转换成响应式对象，从而在resize 的时候获取不到。

    有些值不应该是响应式的，例如复杂的第三方类实例或 Vue 组件对象。
    当渲染具有不可变数据源的大列表时，跳过 proxy 转换可以提高性能。
    所以在实例化echart时，将其指定为非响应式的即可。

解决问题：这里我们可以使用vue3的新API,markRaw，它可以标记一个对象，使其永远不会转换为 proxy，返回对象本身，其实就是将它转换成非响应式数据。现在可以正常点击legend组件也不会报错啦。

    myCharts.value = markRaw(echarts.init(myha.value!));

## 重置reactive

### 定义重置方法

```ts
const resetData = () => {
  const keys = Object.keys(dialogModel)
  let obj: { [name: string]: string } = {}
  keys.forEach((item) => {
    obj[item] = ""
  })
  Object.assign(dialogModel, obj)
};
```

```ts
const initData:AddDeptModel = {
    type: "",
    id: "",
    pid: "",
    parentName: "",
    manager: "",
    deptAddress: "",
    deptPhone: "",
    name: "",
    deptCode: "",
    orderNum: "",
  }
const dialogModel = reactive<{data:AddDeptModel}>({data:{...initData}});

// 初始化方法
const resetDialogModel = () =>{
    dialogModel.data = {...initData}
}
```

或者

```ts
const initialState = {
  name: "",
  lastName: "",
  email: ""
};

const form = reactive({ ...initialState });

function resetForm() {
  Object.assign(form, initialState);
}
```
