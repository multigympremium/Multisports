import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./",
  build: {
    outDir: "dist",
  },
  base: "/",
  publicDir: "public",
  server: {
    historyApiFallback: true,
  },
  // resolve: {
  //   alias: {
  //   "@": path.resolve(__dirname, "./src"),
  // },
// }
});