import { it, expect } from "bun:test"
import { logSoup } from "@tscircuit/log-soup"
import c88224RawEasy from "../assets/C88224.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { su } from "@tscircuit/circuit-json-util"
import type { AnySoupElement } from "circuit-json"

it("should parse easyeda json for a c88224 and convert to tscircuit soup", async () => {
  const parsedJson = EasyEdaJsonSchema.parse(c88224RawEasy)
  const soupElements = convertEasyEdaJsonToCircuitJson(parsedJson).concat([
    {
      type: "pcb_board",
      center: { x: 0, y: 0 },
      width: 20,
      height: 20,
      pcb_board_id: "main_board",
      thickness: 1.6,
      num_layers: 2,
      material: "fr4",
    },
  ])

  await logSoup("easyeda c88224 to soup", soupElements as AnySoupElement[])
})
