import { fetchEasyEDAComponent } from "../lib/fetch-easyeda-json"
import * as fs from "node:fs"

const easyEdaJson = await fetchEasyEDAComponent("C46749") // NE555P

fs.writeFileSync("test.json", JSON.stringify(easyEdaJson, null, "  "))
