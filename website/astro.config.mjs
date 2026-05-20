import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://helgesverre.github.io",
  base: "/gh-packages-zed",
  integrations: [svelte(), sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
  outDir: "../docs",
});
