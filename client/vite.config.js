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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  preview: {

    fallback: true
  }
})

