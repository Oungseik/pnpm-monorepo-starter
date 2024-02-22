/** @type {import("prettier").Config} */
module.exports = {
  ...require("@repo/prettier-config"),
  plugins: ["prettier-plugin-svelte"],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
