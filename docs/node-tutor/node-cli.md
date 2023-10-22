# nodejs命令行编写

:::tip
推荐使用commanderjs,方便拓展

:::

## 安装使用

### package.json

```json
{
  "name": "play",
  "version": "1.0.0",
  "main": "index.js",
  "private": true,
  "license": "MIT",
  "scripts": {
    "dev": "esno src/index",
    "dev:nd": "nodemon",
    "build": "tsc"
  },
  "devDependencies": {
    "@faker-js/faker": "^8.2.0",
    "@types/mongoose": "^5.11.97",
    "@types/node": "^18.18.6",
    "esno": "^0.17.0",
    "ts-node": "^10.9.1",
    "typescript": "^5.2.2"
  },
  "dependencies": {
    "@types/express": "^4.17.20",
    "axios": "^1.5.1",
    "commander": "^11.1.0",
    "express": "^4.18.2",
    "got": "^13.0.0" 
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "strict": false,
    "lib": ["esnext"],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    // "verbatimModuleSyntax": true,
    "resolveJsonModule": true
  }
}

```

### index.ts 位置(`src/index.ts`)

```ts
import fs from "node:fs";
import { Command } from "commander";
import { version } from "../package.json";

import { fileCommand } from "./commands/fileCommand";

function bootstrap() {
  const program = new Command();
  program.name("yzq");
  program
    .version(version, "-v, --version", "当前版本.")
    .usage("<command> [options]")
    .helpOption("-h, --help", "如何使用");
  fileCommand(program);

  program.parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}
bootstrap();

```

### fileCommand.ts 位置(`src/commands/fileCommand.ts`)

```ts
import type { Command } from "commander";

export function fileCommand(program: Command) {
  const fileCmd = program.command("file").description("file operations");
  fileCmd
    .command("list")
    .description("list fiels")
    .action(() => {
      console.log("list files");
    });
  fileCmd
    .command("open")
    .argument("<string>", "string to split")
    .option("--first", "display just the first substring")
    .option("-s, --separator <char>", "separator character", ",")
    .action((str, options) => {
      const limit = options.first ? 1 : undefined;
      console.log(str.split(options.separator, limit));
    });
}
```

### 运行

```powershell
yarn dev file list

yarn dev file open hello --first
```
