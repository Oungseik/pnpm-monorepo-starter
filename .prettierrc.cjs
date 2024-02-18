/** @type {import("prettier").Config} */
module.exports = {
  ...require("@repo/prettier-config"),
  plugins: [import("prettier-plugin-svelte"), import("prettier-plugin-tailwindcss")],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
