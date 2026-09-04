import { expect, test } from "bun:test"
import { type CadComponent, pcb_board } from "circuit-json"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import usbCRawEasy from "../assets/C165948.raweasy.json"

test("reproduces C165948 CAD model scaling smaller than its PCB footprint", async () => {
  const easyEdaJson = EasyEdaJsonSchema.parse(usbCRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(easyEdaJson)
  const cadComponent = circuitJson.find(
    (element): element is CadComponent => element.type === "cad_component",
  )

  // The OBJ metadata reports 8.94 x 7.9 x 4.101 mm, but the direct Circuit
  // JSON conversion constrains it to these PCB-derived bounds. With
  // contain_within_bounds, the 5.648 mm Y target uniformly shrinks the model.
  expect(cadComponent?.size).toEqual({
    x: 8.75022399999989,
    y: 5.648261599999842,
    z: 7.8999842000000005,
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
