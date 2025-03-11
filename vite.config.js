import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { data } from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.football-data.org/v4",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          "X-Auth-Token": data.API_TOKEN,
        },
      },
    },
  },
});
