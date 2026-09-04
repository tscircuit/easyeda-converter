import { expect, test } from "bun:test"
import { type CadComponent, pcb_board } from "circuit-json"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import usbCRawEasy from "../assets/C165948.raweasy.json"

test("uses C165948 CAD model bounds instead of its PCB footprint size", async () => {
  const easyEdaJson = EasyEdaJsonSchema.parse(usbCRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(easyEdaJson)
  const cadComponent = circuitJson.find(
    (element): element is CadComponent => element.type === "cad_component",
  )

  // Match the OBJ's local bounds so contain_within_bounds does not scale the
  // model to the unrelated PCB footprint dimensions.
  expect(cadComponent?.size).toEqual({
    x: 8.94,
    y: 7.9,
    z: 4.101,
  })

  circuitJson.push(
    pcb_board.parse({
      type: "pcb_board",
      pcb_board_id: "pcb_board_1",
      center: { x: 0, y: -1 },
      width: 14,
      height: 14,
      thickness: 1.6,
      num_layers: 2,
      material: "fr4",
    }),
  )

  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [12, 12, 15],
  })
})
