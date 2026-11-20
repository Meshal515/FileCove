import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "~": fileURLToPath(new URL("./app", import.meta.url)) },
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
  ],
});
