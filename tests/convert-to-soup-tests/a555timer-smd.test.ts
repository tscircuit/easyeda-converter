import { it, expect } from "bun:test"
import { logSoup } from "@tscircuit/log-soup"
import a555TimerEasyEdaJson from "../assets/a555-timer-smd.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { su } from "@tscircuit/soup-util"
import type { AnySoupElement } from "@tscircuit/soup"

it("should parse easyeda json for a 555 timer (smd) and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(a555TimerEasyEdaJson)
  // console.log(parsedJson.packageDetail.dataStr.shape)
  const soupElements = convertEasyEdaJsonToTscircuitSoupJson(parsedJson).concat(
    [
      {
        type: "pcb_board",
        center: { x: 0, y: 0 },
        width: 10,
        height: 10,
      },
    ]
  )

  await logSoup(
    "a555timer smd easyeda to soup",
    soupElements as AnySoupElement[]
  )
})
