// 导入 globals 模块，用于定义全局变量
import globals from "globals";
// 导入 @eslint/js 插件，用于 JavaScript 代码的检查
import pluginJs from "@eslint/js";
// 导入 typescript-eslint 插件，用于 TypeScript 代码的检查
import tseslint from "typescript-eslint";
// 导入 eslint-plugin-react 插件，用于 React 代码的检查
import pluginReact from "eslint-plugin-react";

/**
 * 导出默认的 ESLint 配置数组。
 * 这个配置适用于 JavaScript 和 TypeScript 文件，包括 React 项目。
 * 
 * @type {Array} 包含多个配置对象的数组。
 */
export default [
  // 匹配所有以 .js, .mjs, .cjs, .ts, .jsx, .tsx 结尾的文件
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  // 设置语言选项，定义浏览器环境的全局变量
  {languageOptions: { globals: globals.browser }},
  // 使用 @eslint/js 插件的推荐配置
  pluginJs.configs.recommended,
  // 使用 typescript-eslint 插件的推荐配置
  ...tseslint.configs.recommended,
  // 使用 eslint-plugin-react 插件的扁平化推荐配置
  pluginReact.configs.flat.recommended,
];