#!/usr/bin/env node

import { Command } from "commander"
import { fetchEasyEDAComponent } from "../lib/fetch-easyeda-json"
import { convertEasyEdaJsonToTscircuitSoupJson } from "../lib/convert-easyeda-json-to-tscircuit-soup-json"
import fs from "fs/promises"
import packageJson from "../package.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertRawEasyEdaToTs } from "lib/convert-to-typescript-component"
import * as path from "path"
import { normalizeManufacturerPartNumber } from "lib"
import { convertEasyEdaJsonToVariousFormats } from "lib/convert-easyeda-json-to-various-formats"
import { perfectCli } from "perfect-cli"

const program = new Command()

program
  .name("easyeda")
  .description("Convert EasyEDA JSON PCB footprints into various formats")
  .version(packageJson.version)

program
  .command("convert")
  .description("Convert EasyEDA JSON to various formats")
  .option("-i, --input <jlcpcbPartNumber>", "JLCPCB part number")
  .option("-o, --output <filename>", "Output filename")
  .option(
    "--output-format <format>",
    "Output format (can be inferred from filename)",
  )
  .action(async (options) => {
    await convertEasyEdaJsonToVariousFormats({
      jlcpcbPartNumberOrFilepath: options.input,
      outputFilename: options.output,
      outputFormat: options.outputFormat,
    })
  })

program
  .command("download")
  .description("Download JSON for footprint")
  .requiredOption("-i, --input <jlcpcbPartNumber>", "JLCPCB part number")
  .option("-o, --output <filename>", "Output filename")
  .action(async (options) => {
    if (!options.output) {
      options.output = `${options.input}.raweasy.json`
    }
    try {
      const easyEdaJsonRes = await fetchEasyEDAComponent(options.input)
      await fs.writeFile(
        options.output,
        JSON.stringify(easyEdaJsonRes, null, 2),
      )
      console.log(`Downloaded JSON footprint: ${options.output}`)
    } catch (error: any) {
      console.error("Error:", error.message)
    }
  })

program.parse(process.argv)
// perfectCli(program, process.argv)
