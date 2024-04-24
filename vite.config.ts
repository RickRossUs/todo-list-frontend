import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import requireTransform from "vite-plugin-require-transform";
import path from "path";
import tsChecker from "vite-plugin-checker";

export default defineConfig({
  plugins: [react(), requireTransform({}), tsChecker({ typescript: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.gif", "**/*.svg"],
});
