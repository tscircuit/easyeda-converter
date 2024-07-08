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
  .option("-i, --input <jlcpcbPartNumber>", "JLCPCB part number")
  .option("-o, --output <filename>", "Output filename")
  .option(
    "-t, --type <type>",
    "Output type: soup.json, kicad_mod, raweasy.json, bettereasy.json, tsx"
  )
  .action(async (options) => {
    let rawEasyEdaJson
    if (options.input.includes(".") || options.input.includes("/")) {
      rawEasyEdaJson = JSON.parse(await fs.readFile(options.input, "utf-8"))
    } else {
      rawEasyEdaJson = await fetchEasyEDAComponent(options.input)
    }

    if (options.type === "ts") options.type = "tsx"

    if (!options.output && options.type) {
      options.output = `${options.input}.${options.type}`
    }

    if (!options.output) {
      console.log("specify --output file (-o) or --type (-t)")
      process.exit(1)
    }

    if (options.output.endsWith(".raweasy.json")) {
      await fs.writeFile(
        options.output,
        JSON.stringify(rawEasyEdaJson, null, 2)
      )
      console.log(`Saved raw EasyEDA JSON: ${options.output}`)
      return
    }

    try {
      const betterEasy = EasyEdaJsonSchema.parse(rawEasyEdaJson)
      const tscircuitSoup = convertEasyEdaJsonToTscircuitSoupJson(betterEasy)

      if (options.output.endsWith(".soup.json")) {
        await fs.writeFile(
          options.output,
          JSON.stringify(tscircuitSoup, null, 2)
        )
        console.log(`Converted to tscircuit soup JSON: ${options.output}`)
      } else if (options.output.endsWith(".kicad_mod")) {
        // TODO: Implement conversion to KiCad footprint
        console.log("Conversion to KiCad footprint not yet implemented")
      } else if (options.output.endsWith(".bettereasy.json")) {
        await fs.writeFile(options.output, JSON.stringify(betterEasy, null, 2))
        console.log(`Saved better EasyEDA JSON: ${options.output}`)
      } else if (
        options.output.endsWith(".tsx") ||
        options.output.endsWith(".ts")
      ) {
        const tsComp = convertRawEasyToTs(rawEasyEdaJson)
        await fs.writeFile(options.output, tsComp)
        console.log(`Saved TypeScript component: ${options.output}`)
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
