import { defineConfig } from "tsup";

export default defineConfig({
  /* ESM Output */
  entry: ["src/index.ts"],
  treeshake: true,
  splitting: true,
  clean: true,
  minify: true,
  format: ["esm"],

  /* Project Externals */
  external: ["rxjs"],

  /* TS Output */
  sourcemap: true,
  target: "ES2022",
  dts: true,
});
