import { it, expect } from "bun:test"
import { logSoup } from "@tscircuit/log-soup"
import a555TimerEasyEdaJson from "../assets/a555-timer-smd.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { su } from "@tscircuit/circuit-json-util"
import type { AnySoupElement } from "circuit-json"

it("should parse easyeda json for a 555 timer (smd) and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(a555TimerEasyEdaJson)
  // console.log(parsedJson.packageDetail.dataStr.shape)
  const soupElements = convertEasyEdaJsonToCircuitJson(parsedJson).concat([
    {
      type: "pcb_board",
      center: { x: 0, y: 0 },
      width: 10,
      height: 10,
      pcb_board_id: "main_board",
      thickness: 1.6,
      num_layers: 2,
      material: "fr4",
    },
  ])

  await logSoup(
    "a555timer smd easyeda to soup",
    soupElements as AnySoupElement[],
  )
})
