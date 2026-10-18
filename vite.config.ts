import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative stier, så bygget fungerer både på GitHub Pages (/vegvett/) og lokalt.
  base: "./",
});
