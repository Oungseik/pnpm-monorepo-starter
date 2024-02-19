/** @type {import("prettier").Config} */
module.exports = {
  ...require("@repo/prettier-config"),
  plugins: [import("prettier-plugin-tailwindcss")],
};
