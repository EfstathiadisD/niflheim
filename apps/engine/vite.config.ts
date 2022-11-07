import { defineConfig } from "vitest/config";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  /* @ts-expect-error -- Waiting for upgrade to Vite4 */
  plugins: [
    ...VitePluginNode({ adapter: "fastify", appPath: "./src/index.ts" }),
  ],
  server: {
    hmr: true,
    port: 6095,
  },
});
