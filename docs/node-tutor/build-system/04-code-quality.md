# 代码质量工具

> 在构建流程中集成代码质量工具，确保代码风格统一、无潜在错误、提交规范。

## 工具概览

| 工具 | 用途 | 阶段 |
|------|------|------|
| ESLint | 代码检查（lint） | 开发 / CI |
| Prettier | 代码格式化 | 开发 / 提交前 |
| Husky | Git hooks 管理 | 提交前 |
| lint-staged | 仅检查暂存文件 | 提交前 |
| commitlint | 提交信息规范 | 提交时 |
| Stylelint | CSS/SCSS 检查 | 开发 / CI |

## ESLint

### 安装

```bash
pnpm add -D eslint @eslint/js
```

### 配置 (eslint.config.js - Flat Config)

```js
// eslint.config.js
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error'
    }
  },
  {
    ignores: ['dist/', 'node_modules/', '*.config.js']
  }
]
```

### TypeScript

```bash
pnpm add -D typescript-eslint
```

```js
// eslint.config.js
import tseslint from 'typescript-eslint'

export default [
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  }
]
```

### 常用命令

```bash
# 检查所有文件
npx eslint src/

# 自动修复
npx eslint src/ --fix

# 指定配置文件
npx eslint -c eslint.config.js src/
```

## Prettier

```bash
pnpm add -D prettier
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

```bash
# 检查格式
npx prettier --check src/

# 格式化
npx prettier --write src/
```

### ESLint + Prettier 配合

```bash
pnpm add -D eslint-config-prettier
```

```js
// eslint.config.js
import prettier from 'eslint-config-prettier'

export default [
  ...baseConfig,
  prettier  // 放在最后，覆盖冲突规则
]
```

## Husky

### 安装

```bash
pnpm add -D husky
npx husky init
```

在 `.husky/` 目录下创建 Git hooks：

```bash
# .husky/pre-commit
pnpm lint-staged

# .husky/commit-msg
pnpx --no -- commitlint --edit $1
```

### 跳过 Hooks

```bash
git commit -m "message" --no-verify
```

## lint-staged

> 仅对暂存区文件进行检查，提高速度。

```bash
pnpm add -D lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css,scss}": [
      "prettier --write"
    ]
  }
}
```

## commitlint

> 规范 Git 提交信息。

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

```js
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional']
}
```

### 提交格式

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

| Type | 说明 |
|------|------|
| feat | 新功能 |
| fix | 修复 Bug |
| docs | 文档变更 |
| style | 代码格式（不影响功能） |
| refactor | 重构 |
| perf | 性能优化 |
| test | 测试相关 |
| chore | 构建/工具更新 |
| ci | CI 配置变更 |
| revert | 回退 |

```bash
# ✓ 正确
feat(user): add login API
fix(cart): resolve quantity calculation bug
docs: update API documentation

# ✗ 错误
add something
update code
fix bug
```

## 完整的 package.json

```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "format:check": "prettier --check src/",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,ts,tsx,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css,scss}": ["prettier --write"]
  },
  "devDependencies": {
    "eslint": "^9.0.0",
    "prettier": "^3.2.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.2.0",
    "@commitlint/cli": "^19.0.0",
    "@commitlint/config-conventional": "^19.0.0"
  }
}
```

## 参考

- [ESLint 文档](https://eslint.org/)
- [Prettier 文档](https://prettier.io/)
- [Husky 文档](https://typicode.github.io/husky/)
- [commitlint 文档](https://commitlint.js.org/)
