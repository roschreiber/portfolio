// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  experimental: {
    rustCompiler: true,
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
});
