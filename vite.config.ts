import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import type { Plugin } from "vite"
import { fetchEasyEDAComponent, convertRawEasyEdaToTs } from "./dist/lib/index"

// Create plugin to handle JLCPCB part number requests
const jlcpcbPlugin = (): Plugin => ({
  name: "jlcpcb-api",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === "/api" && req.method === "POST") {
        try {
          const chunks = []
          for await (const chunk of req) {
            chunks.push(chunk)
          }
          const body = JSON.parse(Buffer.concat(chunks).toString())

          if (!body.jlcpcb_part_number) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: "Missing jlcpcb_part_number" }))
            return
          }

          const rawEasyJson = await fetchEasyEDAComponent(
            body.jlcpcb_part_number,
          )
          const tsxComponent = await convertRawEasyEdaToTs(rawEasyJson)

          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify({ tscircuitCode: tsxComponent }))
        } catch (error: any) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: error.message }))
        }
      } else {
        next()
      }
    })
  },
})

export default defineConfig({
  plugins: [react(), tsconfigPaths(), jlcpcbPlugin()],
  define: {
    global: "globalThis",
  },
})
