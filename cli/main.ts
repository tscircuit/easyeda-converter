#!/usr/bin/env node

import { Command } from "commander"
import { fetchEasyEDAComponent } from "../lib/fetch-easyeda-json"
import { convertEasyEdaJsonToTscircuitSoupJson } from "../lib/convert-easyeda-json-to-tscircuit-soup-json"
import fs from "fs/promises"
import packageJson from "../package.json"

const program = new Command()

program
  .name("easyeda-converter")
  .description("Convert EasyEDA JSON PCB footprints into tscircuit json soup")
  .version(packageJson.version)

program
  .command("convert")
  .description("Convert EasyEDA JSON to various formats")
  .requiredOption("-i, --input <jlcpcbPartNumber>", "JLCPCB part number")
  .requiredOption("-o, --output <filename>", "Output filename")
  .action(async (options) => {
    try {
      const easyEdaJson = await fetchEasyEDAComponent(options.input)
      const tscircuitSoup = convertEasyEdaJsonToTscircuitSoupJson(easyEdaJson)

      if (options.output.endsWith(".ts")) {
        // TODO: Implement conversion to tscircuit component
        console.log("Conversion to tscircuit component not yet implemented")
      } else if (options.output.endsWith(".soup.json")) {
        await fs.writeFile(
          options.output,
          JSON.stringify(tscircuitSoup, null, 2)
        )
        console.log(`Converted to tscircuit soup JSON: ${options.output}`)
      } else if (options.output.endsWith(".kicad_mod")) {
        // TODO: Implement conversion to KiCad footprint
        console.log("Conversion to KiCad footprint not yet implemented")
      } else {
        console.error("Unsupported output format")
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
  })

program
  .command("download")
  .description("Download JSON for footprint")
  .requiredOption("-i, --input <jlcpcbPartNumber>", "JLCPCB part number")
  .requiredOption("-o, --output <filename>", "Output filename")
  .action(async (options) => {
    try {
      const easyEdaJson = await fetchEasyEDAComponent(options.input)
      await fs.writeFile(options.output, JSON.stringify(easyEdaJson, null, 2))
      console.log(`Downloaded JSON footprint: ${options.output}`)
    } catch (error) {
      console.error("Error:", error.message)
    }
  })

program.parse(process.argv)
