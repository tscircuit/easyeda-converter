import { fetchEasyEDAComponent } from "../lib/websafe/fetch-easyeda-json"
import * as fs from "node:fs"

// "C46749" // NE555P - DIP8
// const partNumber = "C5125085" - SSOP8
const partNumber = "C95209" // esp32

const outputFile = "./test.json"

const easyEdaJson = await fetchEasyEDAComponent(partNumber)

fs.writeFileSync(outputFile, JSON.stringify(easyEdaJson, null, "  "))
