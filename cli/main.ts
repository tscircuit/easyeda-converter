#!/usr/bin/env node

import { Command } from "commander"
import { fetchEasyEDAComponent } from "../lib/fetch-easyeda-json"
import { convertEasyEdaJsonToTscircuitSoupJson } from "../lib/convert-easyeda-json-to-tscircuit-soup-json"
import fs from "fs/promises"
import packageJson from "../package.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertRawEasyToTs } from "lib/convert-to-typescript-component"

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
    let easyEdaJson
    if (options.input.includes(".") || options.input.includes("/")) {
      easyEdaJson = JSON.parse(await fs.readFile(options.input, "utf-8"))
    } else {
      easyEdaJson = await fetchEasyEDAComponent(options.input)
    }

    if (options.output.endsWith(".raweasy.json")) {
      await fs.writeFile(options.output, JSON.stringify(easyEdaJson, null, 2))
      console.log(`Saved raw EasyEDA JSON: ${options.output}`)
      return
    }

    try {
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
      } else if (options.output.endsWith(".bettereasy.json")) {
        const betterEasy = EasyEdaJsonSchema.parse(easyEdaJson)
        await fs.writeFile(options.output, JSON.stringify(betterEasy, null, 2))
      } else if (options.output.endsWith(".ts")) {
        const tsComp = convertRawEasyToTs(easyEdaJson)
        await fs.writeFile(options.output, tsComp)
      } else {
        console.error("Unsupported output format")
      }
    } catch (error: any) {
      console.error("Error:", error.message)
    }
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
        JSON.stringify(easyEdaJsonRes, null, 2)
      )
      console.log(`Downloaded JSON footprint: ${options.output}`)
    } catch (error: any) {
      console.error("Error:", error.message)
    }
  })

program.parse(process.argv)
