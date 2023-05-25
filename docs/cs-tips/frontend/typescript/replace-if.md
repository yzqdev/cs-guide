# 替换if

## 使用 `Array` 的 `includes` 方法

> 场景：多种条件对应相同的处理 修改前：

```js
function region(province) {
 let result = '';
 if (
   province === '广东' ||
   province === '广西' ||
   province === '福建' ||
   province === '浙江' ||
   province === '云南'
 ) {
   result = '南方';
 }
 if (
   province === '河北' ||
   province === '黑龙江' ||
   province === '辽宁' ||
   province === '山东' ||
   province === '吉林'
 ) {
   result = '北方';
 }
}
   
```

在上面的场景中，我们通过在 `if` 语句中使用 `||` 对多种条件进行相同的处理，显而易见，这样的代码很糟糕（尤其是 `province === "广东"|| province === "广西"|| province === "福建" || province === "浙江" || province === "云南`这一大串） 这种场景我们其实可以通过 `Array` 的 `includes` 方法来规避。

修改后：

```js
function region(province) {
 let result = '';
 let northProvinceArr = ['河北', '黑龙江', '辽宁', '山东', '吉林'];
 let southProvinceArr = ['广东', '广西', '福建', '浙江', '云南'];
 if (southProvinceArr.includes(province)) result = '南方';
 if (northProvinceArr.includes(province)) result = '北方';
}
```

通过这样的处理，我们的最终代码变得好看了许多。

## 策略模式

> 场景：并列的多条件判断 修改前：

```js
function permission(role) {
  if (role === 'operations') {
    getOperationPermission();
  } else if (role === 'admin') {
    getAdminPermission();
  } else if (role === 'superAdmin') {
    getSuperAdminPermission();
  } else if (role === 'user') {
    getUserPermission();
  }
}
```

这段代码中我们就是采用 `if-else` 的方式判断多个不同的条件，不过这种多条件的判断你可能会采用 `switch` 语句：

```js
function permission(role) {
  switch (role) {
    case 'operations': {
      getOperationPermission();
      break;
    }
    case 'admin': {
      getAdminPermission();
      break;
    }
    case 'superAdmin': {
      getSuperAdminPermission();
      break;
    }
    case 'user': {
      getUserPermission();
      break;
    }
  }
} 
```

这种写法虽然使代码清晰了许多，但是个人觉得依旧不合格，接下来我们看看采用策略模式后的结果。

修改后：

```js
function permission(role) {
  const actions = {
    operations: getOperationPermission,
    admin: getAdminPermission,
    superAdmin: getSuperAdminPermission,
    user: getUserPermission,
  };
  actions[role].call();
}
 
```

比起前面两种写法，显然采用策略模式要更加优雅。

## 对象数组

> 场景：多条件嵌套多分支判断 当我们遇到需要进行多个条件判断，同时每个条件内又需要判断多个子条件时，代码处理起来是最棘手的。一旦处理不好，代码就会变得无比糟糕。

修改前：

```js
function getAmount(type, quantity, price) {
  let result = 0;
  if (type === 'shoe') {
    if (quantity > 5) {
      result = price * quantity * 0.7;
    } else {
      result = price * quantity * 0.8;
    }
  } else {
    if (quantity > 5) {
      result = price * quantity * 0.9;
    } else {
      result = price * quantity * 0.95;
    }
  }
}

```

再来一个简单的例子

### 使用对象

```js
let type = 'A'

let tactics = {
    'A': 1,
    'B': 1,
    'C': 2,
    'D': 3,
    default: 0
}
console.log(tactics[type]) // 1
```

### 使用map

```ts
// 获取折扣 -- 使用对象配置/策略模式
const getDiscount = (userKey) => {
    // 我们可以根据用户类型来生成我们的折扣对象
    let discounts = new Map([
        ['普通会员', 0.9],
        ['年费会员', 0.85],
        ['超级会员', 0.8],
        ['default', 1]
    ])
    return discounts.get(userKey) || discounts.get('default')
}
console.log(getDiscount('普通会员')) // 0.9
```

当遇到这种情况时，采用对象数组的方式能够得到较好的优化效果。

修改后：

```js
function getAmount(type, quantity, price) {
  let result = 0;
  const isShoe = type === 'shoe';
  const greater = quantity > 5;
  const discountArr = [
    { isShoe: true, greater: true, amount: 0.7 * quantity * price },
    { isShoe: true, greater: false, amount: 0.8 * quantity * price },
    { isShoe: false, greater: true, amount: 0.9 * quantity * price },
    { isShoe: false, greater: false, amount: 0.95 * quantity * price },
  ];
  result = discountArr.filter(
    (item) => item.isShoe === isShoe && item.greater === greater
  )[0].amount;
}
```

## 三元表达式

在这里也顺便提一下三元表达式，在某些情境下，使用三元表达式实现条件判断会是个不错的选择，它可以让代码更加简洁（虽然在我看来，它跟 `if-else` 本质上没太大区别）。

修改前：

```js
    if(a>0){
        a+=1;
    }else{
        a-=1
    }
```

修改后：

```js
  a>0? a+=1 : a-=1;
```

不过，太多复杂的条件判断时，使用三元表达式则会适得其反。
