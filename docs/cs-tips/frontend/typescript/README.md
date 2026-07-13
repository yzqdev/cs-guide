# TypeScript

<Catalog />

## 目录

| 文件 | 内容 |
|------|------|
| [TypeScript 说明](./info.md) | TS 方法、函数声明与表达式、常见问题修复 |
| [替换 if 语句](./replace-if.md) | 使用 Array.includes、策略模式、对象数组优化条件判断 |

## 快速参考

```typescript
// 基础类型
let name: string = 'hello';
let age: number = 25;
let isActive: boolean = true;
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ['hello', 42];

// 接口
interface User {
    id: number;
    name: string;
    email?: string;  // 可选
    readonly createdAt: Date;  // 只读
}

// 联合类型
type Status = 'active' | 'inactive' | 'pending';

// 泛型
function identity<T>(arg: T): T {
    return arg;
}

// 类型守卫
function isString(value: unknown): value is string {
    return typeof value === 'string';
}
```
