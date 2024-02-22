import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src"],
  format: ["esm"],
  target: "esnext",
  platform: "node",
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["better-sqlite3"],
});
