# 常用代码片段

## 1.字符串反转

在此示例中，我们使用展开运算符，Array的`reverse`方法和 String 的`join`方法来反转给定的字符串。

```javascript
const reverseString = string => [...string].reverse().join('')

// 事例
reverseString('Medium') // "muideM"
reverseString('Better Programming') // "gnimmargorP retteB"


```

## 2.计算指定数字的阶乘

```bash
const factorialOfNumber = number => 
  number < 0
    ? (() => {
      throw new TypeError('请输入正整数')
    })()
    : number <= 1
      ? 1
      : number * factorialOfNumber(number - 1)
      
      
// 事例
factorialOfNumber(4) // 24
factorialOfNumber(8) // 40320

```

## 3.将数字转换为数字数组

```javascript
const converToArray = number => [...`${number}`].map(el => parseInt(el))

// 事例
converToArray(5678) // [5, 6, 7, 8]
converToArray(12345678) // [1, 2, 3, 4, 5, 6, 7, 8]

```

## 4.检查数字是否为2的幂

```
const isNumberPowerOfTwo = number => !!number && (number & (number - 1)) == 0

// 事例
isNumberPowerOfTwo(100) // false
isNumberPowerOfTwo(128) // true

```

## 5.从对象创建`键-值`对数组

```
const keyValuePairsToArray = object => Object.keys(object)
  .map(el => [el, object[el]])

// 事例
keyValuePairsToArray({Better: 4, Programming: 2})
// [['Better', 4], ['Programming', 2]]

keyValuePairsToArray({x:1, y:2, z:3})
// [['x', 1], ['y', 2], ['z', 3]]

```

## 6.返回数字数组中的最大值

```javascript
const maxElementsFromArray = (array, number = 1) => [...array].sort((x, y) => y -x).slice(0, number)

// 事例
maxElementsFromArray([1, 2, 3, 4, 5]) // [5]

maxElementsFromArray([7, 8, 9, 10, 10], 2) // [10, 10]

```

## 7. 检查数组中的所有元素是否相等

```javascript
const elementsAreEqual = array => array.every(el => el === array[0])

// 事例
elementsAreEqual([9, 8, 7, 6, 5, 4]) // false
elementsAreEqual([4, 4, 4, 4, 4]) // true

```

## 8. 返回数的平均值

```javascript
const averageOfTwoNumbers = (...numbers) => numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / numbers.length

// 事例
averageOfTwoNumbers(...[6, 7, 8]) // 7
averageOfTwoNumbers(...[6, 7, 8, 9]) // 7.5

```

## 9.返回两个或多个数字的和

```javascript
const sumOfNumbers = (...array) => [...array].reduce((accumulator, currentValue) => accumulator + currentValue, 0)

// 事例
sumOfNumbers(5, 6, 7, 8, 9, 10) // 45
sumOfNumbers(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // 50


```

## 10.返回数字数组的幂集

所谓幂集（Power Set）， 就是原集合中所有的子集（包括全集和空集）构成的集族。可数集是最小的无限集； 它的幂集和实数集一一对应（也称同势），是不可数集。 不是所有不可数集都和实数集等势，集合的势可以无限的大。如实数集的幂集也是不可数集，但它的势比实数集大。 设X是一个有限集，|X| = k，则X的幂集的势为2的k次方。

```javascript
const powersetOfArray = array => array.reduce((accumulator, currentValue) => accumulator.concat(accumulator.map(el => [currentValue].concat(el))), [[]])

// 事例
powersetOfArray([4, 2]) // [[], [4], [2], [2, 4]]
powersetOfArray([1, 2, 3])
// [[], [1], [2], [2,1], [3], [3,1], [3,2], [3,2,1]]

```

---
