import { expect, it } from "bun:test"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { convertEasyEdaJsonToVariousFormats } from "lib/convert-easyeda-json-to-various-formats"

// https://github.com/tscircuit/easyeda-converter/issues/400
//
// `easyeda convert -i <part> -o <file>.tsx` crashed for every part:
// convertRawEasyToTsx takes `{ rawEasy }` but was called with the raw JSON
// directly, so EasyEdaJsonSchema.parse(undefined) threw. Uses a local
// .raweasy.json asset so no network is needed.
it("converts a local raweasy.json to a tsx component file", async () => {
  const inputPath = path.join(
    import.meta.dir,
    "..",
    "assets",
    "C46749.raweasy.json",
  )
  const outputPath = path.join(
    await fs.mkdtemp(path.join(os.tmpdir(), "easyeda-400-")),
    "C46749.tsx",
  )

  await convertEasyEdaJsonToVariousFormats({
    jlcpcbPartNumberOrFilepath: inputPath,
    outputFilename: outputPath,
    outputFormat: "tsx",
  })

  const tsx = await fs.readFile(outputPath, "utf-8")
  expect(tsx).toContain("const pinLabels")
  expect(tsx).toContain("<chip")
})
