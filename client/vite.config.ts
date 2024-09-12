import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    define: {
      "process.env": env
    },
    plugins: [react(), nodePolyfills()]
  }
})
