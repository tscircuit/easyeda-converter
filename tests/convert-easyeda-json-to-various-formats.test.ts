import { expect, test } from "bun:test"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { convertEasyEdaJsonToVariousFormats } from "lib/convert-easyeda-json-to-various-formats"

test("converts a local raweasy.json file to a tsx component file", async () => {
  const inputPath = path.join(import.meta.dir, "assets/C46749.raweasy.json")
  const outputDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "easyeda-cli-test-"),
  )
  const outputPath = path.join(outputDir, "C46749.tsx")

  await convertEasyEdaJsonToVariousFormats({
    jlcpcbPartNumberOrFilepath: inputPath,
    outputFilename: outputPath,
    outputFormat: "tsx",
  })

  const output = await fs.readFile(outputPath, "utf-8")
  expect(output).toContain("<chip")
  expect(output).toContain("C46749")
})
