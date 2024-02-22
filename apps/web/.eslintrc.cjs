/** @type { import("eslint").Linter.Config } */
const config = require("@repo/eslint-config");

module.exports = {
  root: true,
  extends: [...config.extends, "plugin:svelte/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: [...config.plugins],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  rules: {
    ...config.rules,
  },
};
