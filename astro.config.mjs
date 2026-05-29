// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  adapter: node({ mode: "standalone" }),

  experimental: {
    rustCompiler: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Moonhouse",
      cssVariable: "--font-moonhouse",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Moonhouse.ttf"],
            weight: "normal",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Quicksand",
      cssVariable: "--font-quicksand",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Quicksand-Regular.ttf"],
            weight: "normal",
            style: "normal",
          },
        ],
      },
    },
  ],

  integrations: [react()],
});