import { describe, expect, test } from "bun:test"
import { readFile } from "node:fs/promises"

const forbiddenBundlePatterns = [
  { pattern: /_tty:\s*function/, description: "TTY require shim" },
  { pattern: /node_modules\/pretty\/index\.js/, description: "pretty package" },
  { pattern: /graphics-debug/, description: "graphics-debug dependency" },
]

describe("browser bundle websafe guard", () => {
  test("browser build does not include known non-websafe runtime baggage", async () => {
    await Bun.$`bun run build`.quiet()

    const browserBundle = await readFile("dist/browser/index.js", "utf8")

    for (const { pattern, description } of forbiddenBundlePatterns) {
      expect(browserBundle, description).not.toMatch(pattern)
    }
  }, 30_000)
})
