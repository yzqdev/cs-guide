# React 快速开始

## 创建项目

### 使用 Vite（推荐）

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

### 使用 Next.js（全栈框架）

```bash
npx create-next-app@latest my-app
```

## 项目结构

```
my-app/
├── src/
│   ├── components/     # 组件
│   ├── App.tsx         # 根组件
│   └── main.tsx        # 入口文件
├── public/             # 静态资源
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 组件基础

```tsx
// 函数组件
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

// 箭头函数组件
const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}!</h1>;
};

// 使用
<Welcome name="React" />
```

## JSX 语法

```tsx
const element = (
  <div className="container">
    <h1>{title}</h1>
    <p>{user.name}</p>
    {/* 注释 */}
    {condition && <span>Show when true</span>}
    {items.map(item => <li key={item.id}>{item.text}</li>)}
  </div>
);
```

## Props 与 TypeScript

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ children, variant = 'primary', disabled, onClick }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
```

## 条件渲染

```tsx
function Greeting({ isLoggedIn, user }: { isLoggedIn: boolean; user: any }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {user.name}!</h1>
      ) : (
        <button onClick={login}>Login</button>
      )}

      {isLoggedIn && <LogoutButton />}
    </div>
  );
}
```

## 列表渲染

```tsx
function TodoList({ items }: { items: Todo[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          <span>{index + 1}. </span>
          <span className={item.done ? 'done' : ''}>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}
```

## 参考

- [React 官方文档](https://react.dev/)
- [React 中文文档](https://zh-hans.react.dev/)