import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/*"],
  format: ["esm"],
  platform: "node",
  target: "esnext",
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["better-sqlite3", "@repo/orm"],
});
