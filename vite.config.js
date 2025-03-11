import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.football-data.org/v4",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          "X-Auth-Token": "6a31cc8761ba4eaa84e25bc8c960a181",
        },
      },
    },
  },
});
