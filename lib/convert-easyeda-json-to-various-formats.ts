import { fetchEasyEDAComponent } from "./websafe/fetch-easyeda-json"
import { convertEasyEdaJsonToTscircuitSoupJson } from "../lib/convert-easyeda-json-to-tscircuit-soup-json"
import fs from "fs/promises"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertRawEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import * as path from "path"
import { normalizeManufacturerPartNumber } from "lib"

export const convertEasyEdaJsonToVariousFormats = async ({
  jlcpcbPartNumberOrFilepath,
  outputFilename,
  outputFormat,
}: {
  jlcpcbPartNumberOrFilepath: string
  outputFilename: string
  outputFormat: string
}) => {
  let rawEasyEdaJson
  if (
    jlcpcbPartNumberOrFilepath.includes(".") ||
    jlcpcbPartNumberOrFilepath.includes("/")
  ) {
    rawEasyEdaJson = JSON.parse(
      await fs.readFile(jlcpcbPartNumberOrFilepath, "utf-8"),
    )
  } else {
    rawEasyEdaJson = await fetchEasyEDAComponent(jlcpcbPartNumberOrFilepath)
  }

  const tsxExtension = "tsx"
  if (outputFormat === "ts") outputFormat = tsxExtension

  if (!outputFilename && outputFormat) {
    let filename = path.basename(jlcpcbPartNumberOrFilepath).split(".")[0]

    if (outputFormat === tsxExtension) {
      const {
        dataStr: {
          head: {
            c_para: { "Manufacturer Part": manufacturerPartNumber },
          },
        },
      } = rawEasyEdaJson

      filename = normalizeManufacturerPartNumber(manufacturerPartNumber)
    }

    outputFilename = `${filename}.${outputFormat}`
  }

  if (!outputFilename) {
    console.log("specify --output file (-o) or --output-format")
    process.exit(1)
  }

  if (outputFilename.endsWith(".raweasy.json")) {
    await fs.writeFile(outputFilename, JSON.stringify(rawEasyEdaJson, null, 2))
    console.log(`Saved raw EasyEDA JSON: ${outputFilename}`)
    return
  }

  try {
    const betterEasy = EasyEdaJsonSchema.parse(rawEasyEdaJson)
    const tscircuitSoup = convertEasyEdaJsonToTscircuitSoupJson(betterEasy)

    if (
      outputFilename.endsWith(".soup.json") ||
      outputFilename.endsWith(".circuit.json")
    ) {
      await fs.writeFile(outputFilename, JSON.stringify(tscircuitSoup, null, 2))
      console.log(
        `[${jlcpcbPartNumberOrFilepath}]  Converted to circuit json: ${outputFilename}`,
      )
    } else if (outputFilename.endsWith(".kicad_mod")) {
      // TODO: Implement conversion to KiCad footprint
      console.log("Conversion to KiCad footprint not yet implemented")
    } else if (outputFilename.endsWith(".bettereasy.json")) {
      await fs.writeFile(outputFilename, JSON.stringify(betterEasy, null, 2))
      console.log(
        `[${jlcpcbPartNumberOrFilepath}]  Saved better EasyEDA JSON: ${outputFilename}`,
      )
    } else if (
      outputFilename.endsWith(".tsx") ||
      outputFilename.endsWith(".ts")
    ) {
      const tsComp = await convertRawEasyToTsx(rawEasyEdaJson)
      await fs.writeFile(outputFilename, tsComp)
      console.log(
        `[${jlcpcbPartNumberOrFilepath}] Saved TypeScript component: ${outputFilename}`,
      )
    } else {
      console.error("Unsupported output format")
    }
  } catch (error: any) {
    console.error("Error:", error.message)
    throw error
  }
}
