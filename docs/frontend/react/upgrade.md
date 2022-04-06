# react升级

 [react 生命周期 componentWillReceiveProps(nextProps) 的替代方法](https://www.cnblogs.com/crazycode2/p/10340183.html)
例如:

```js
componentWillReceiveProps(nextProps) {
  if (this.props.editInfo.id !== nextProps.editInfo.id) {
    // 请求详情数据
    this.props.getDetail({
      id: nextProps.editInfo.id
    })
  }
}
```

可以写成;

```js
static getDerivedStateFromProps(props, state) {
  if (props.editInfo.id !== state.editInfo.id) {
    return {
      editInfo: props.editInfo
    };
  }
  
  return null;
}



componentDidUpdate(prevProps, prevState) {
  if (this.state.editInfo.id !== prevState.editInfo.id) {
    // 请求详情数据
    this.props.getDetail({
      id: this.state.editInfo.id
    })
  }
}
```
