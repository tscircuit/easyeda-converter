import { defineConfig } from "tsup"

export default defineConfig([
  // Main library build for Node
  {
    entry: ["lib/index.ts"],
    platform: "node",
    format: ["esm"],
    dts: true,
    sourcemap: true,
  },
  // CLI build
  {
    entry: ["cli/main.ts"],
    platform: "node",
    format: ["cjs"],
    dts: true,
    sourcemap: true,
  },
  // Browser build with bundled dependencies
  {
    entry: ["lib/websafe/index.ts"],
    platform: "browser",
    format: ["esm"],
    dts: true,
    sourcemap: true,
    outDir: "dist/browser",
    // runframe is getting injected this package, so we need to bundle it
    noExternal: ["zod"],
  },
])
