import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import fs from "fs"
import path from "path"

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost+2-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost+2.pem")),
    },
  },
  build: {
    outDir: "dist"
  },
  // 👇 這段是為了讓前端路由如 /homepage 可以在 Vercel 正常運作
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }
})

