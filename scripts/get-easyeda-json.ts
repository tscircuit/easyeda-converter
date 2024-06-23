import { fetchEasyEDAComponent } from "../lib/fetch-easyeda-json"
import * as fs from "node:fs"

// "C46749" // NE555P
const partNumber = "C5125085"

const outputFile = "./test.json"

const easyEdaJson = await fetchEasyEDAComponent(partNumber)

fs.writeFileSync(outputFile, JSON.stringify(easyEdaJson, null, "  "))
