# ele-h5-vue3

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

安装 vscode 插件 JavaScript and TypeScript Nightly 5.0 以下

npm init vue

## husky、 git hooks、 commitlint

npx husky-init && npm i

commit type
build
chore
ci
docs
feat（新功能）
fix（修复）
pert（性能）
refactor（重构）
revert
style
test

# Install commitlint cli and conventional config

npm install --save-dev @commitlint/{config-conventional,cli}

# For Windows:

npm install --save-dev @commitlint/config-conventional @commitlint/cli
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'

## eslint、prettier

安装 vscode 插件 ESLint

.eslintrc.cjs 文件里新建规则
rules: {
"no-console": "error"
},

新建 prettierrc.js 文件
module.exports = {
printWidth: 100, // 单行字符数最多 100 个
tabWidth: 2, // tab 键为 2 个空格
useTabs: false, // 不使用制表符缩进，使用空格缩进
semi: false, // 不使用分号结尾
singleQuote: true, // 使用单引号
bracketSpacing: true // 对象左右两侧都需要空格
}

## lint-staged

lint-staged 是用来在 commit 代码前来统一运行校验任务的

npm i lint-staged -D
将 .husky/pre commit 文件里的 npm test 改成 npm run pre-commit
修改 package.json。在 scripts 里增加 pre-commit 命令，另外还需要在 scripts 同层增加 lint-staged 的配置。
"scripts": {
"dev": "vite",
"build": "run-p type-check build-only",
"preview": "vite preview --port 4173",
"build-only": "vite build",
"type-check": "vue-tsc --noEmit",
"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
"prepare": "husky install",
// 在这里增加 pre-commit 命令
"pre-commit": "lint-staged"
},
// 在这里增加 lint-staged 配置

## vant-ui

https://vant-ui.github.io/vant/#/zh-CN/home

npm i unplugin-vue-components -D

## 使用 json-server 搭建 Mock Server

https://github.com/typicode/json-server#module

## 使用 post-css 实现移动端适配

https://postcss.org/

npm i postcss autoprefixer postcss-pxtorem -D
