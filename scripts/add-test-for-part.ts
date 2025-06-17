import { fetchEasyEDAComponent } from "../lib/websafe/fetch-easyeda-json"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const addTestForPart = async (jlcpcbPartNumber: string) => {
  try {
    // Fetch the EasyEDA component data
    const rawEasyEdaJson = await fetchEasyEDAComponent(jlcpcbPartNumber)

    // Write the raw JSON to the assets directory
    const assetPath = path.join(
      __dirname,
      "..",
      "tests",
      "assets",
      `${jlcpcbPartNumber}.raweasy.json`,
    )
    await fs.writeFile(assetPath, JSON.stringify(rawEasyEdaJson, null, 2))

    // Create the test file content
    const testContent = `
import { it, expect } from "bun:test"
import chipRawEasy from "../assets/${jlcpcbPartNumber}.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert ${jlcpcbPartNumber} into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Add more specific assertions here based on the component
  
  expect(result).toMatchInlineSnapshot()
})
`

    // Write the test file
    const testPath = path.join(
      __dirname,
      "..",
      "tests",
      "convert-to-ts",
      `${jlcpcbPartNumber}-to-ts.test.ts`,
    )
    await fs.writeFile(testPath, testContent)

    console.log(`Test file created: ${testPath}`)
    console.log(`Asset file created: ${assetPath}`)
  } catch (error) {
    console.error("Error:", error)
  }
}

// Check if a part number was provided as a command-line argument
const partNumber = "C19795120"
if (!partNumber) {
  console.error("Please provide a JLCPCB part number as an argument.")
  process.exit(1)
}

addTestForPart(partNumber)
