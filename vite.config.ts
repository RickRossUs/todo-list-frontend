import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import requireTransform from "vite-plugin-require-transform";
import path from "path"; // Importa el módulo path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), requireTransform({})],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ahora path está definido
    },
  },
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.gif", "**/*.svg"],
});
