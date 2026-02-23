import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    alias: {
      app: path.resolve(__dirname, "./app"),
      data: path.resolve(__dirname, "./data"),
      components: path.resolve(__dirname, "./components"),
      utils: path.resolve(__dirname, "./utils"),
      "@/ui": path.resolve(__dirname, "./components/ui"),
      "@/features": path.resolve(__dirname, "./components/features"),
      "@/layout": path.resolve(__dirname, "./components/layout"),
      "@": path.resolve(__dirname, "./"),
    },
  },
});
