# 命令行工具

## 安装全局工具

```powershell
npm i -g @nestjs/cli
# 帮助
 nest generate --help
```

## 一些命令

推荐用`nest g resource [name]`直接创建一个curd类

| Name          | Alias | Description                                                  |
| ------------- | ----- | ------------------------------------------------------------ |
| `app`         |       | Generate a new application within a monorepo (converting to monorepo if it's a standard structure). |
| `library`     | `lib` | Generate a new library within a monorepo (converting to monorepo if it's a standard structure). |
| `class`       | `cl`  | Generate a new class.                                        |
| `controller`  | `co`  | Generate a controller declaration.                           |
| `decorator`   | `d`   | Generate a custom decorator.                                 |
| `filter`      | `f`   | Generate a filter declaration.                               |
| `gateway`     | `ga`  | Generate a gateway declaration.                              |
| `guard`       | `gu`  | Generate a guard declaration.                                |
| `interface`   | `itf` | Generate an interface.                                       |
| `interceptor` | `itc` | Generate an interceptor declaration.                         |
| `middleware`  | `mi`  | Generate a middleware declaration.                           |
| `module`      | `mo`  | Generate a module declaration.                               |
| `pipe`        | `pi`  | Generate a pipe declaration.                                 |
| `provider`    | `pr`  | Generate a provider declaration.                             |
| `resolver`    | `r`   | Generate a resolver declaration.                             |
| `resource`    | `res` | Generate a new CRUD resource. See the [CRUD (resource) generator](https://docs.nestjs.com/recipes/crud-generator) for more details. |
| `service`     | `s`   | Generate a service declaration.                              |

## options

| Option                          | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `--dry-run`                     | Reports changes that would be made, but does not change the filesystem. Alias: `-d` |
| `--project [project]`           | Project that element should be added to. Alias: `-p`         |
| `--flat`                        | Do not generate a folder for the element.                    |
| `--collection [collectionName]` | Specify schematics collection. Use package name of installed npm package containing schematic. Alias: `-c` |
| `--spec`                        | Enforce spec files generation (default)                      |
| `--no-spec`                     | Disable spec files generation                                |
