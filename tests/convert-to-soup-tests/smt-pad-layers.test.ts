import { expect, test } from "bun:test"
import { su } from "@tscircuit/circuit-json-util"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import referenceRawEasy from "../assets/C2848306.raweasy.json"

const shapes = ["RECT", "ELLIPSE", "OVAL", "POLYGON"] as const

const makeCircuit = (shape: (typeof shapes)[number]) => {
  const rawEasy = structuredClone(referenceRawEasy)
  rawEasy.dataStr.shape = []
  // EasyEDA's format defines layer 1 as TopLayer and layer 2 as BottomLayer.
  // This is synthetic pad geometry in an existing fixture's metadata envelope.
  // https://docs.easyeda.com/en/DocumentFormat/3-EasyEDA-PCB-File-Format/#layers-config
  rawEasy.packageDetail.dataStr.shape = [1, 2].map((layer) => {
    const x = 400 + layer * 4
    const points = `${x - 1} 299.5 ${x + 1} 299.5 ${x + 1} 300.5 ${x - 1} 300.5`
    return `PAD~${shape}~${x}~300~2~1~${layer}~~${layer}~0~${points}~0~gge${layer}~0~~Y~0~0~0.2~${x},300`
  })
  return convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(rawEasy))
}

for (const shape of shapes) {
  test(`preserves top and bottom copper when importing ${shape} SMT pads`, () => {
    const pads = su(makeCircuit(shape)).pcb_smtpad.list()
    expect(pads).toHaveLength(2)
    expect(pads.map((pad) => pad.layer)).toEqual(["top", "bottom"])
    expect(pads.map((pad) => pad.port_hints)).toEqual([["pin1"], ["pin2"]])
  })

  test(`preserves ${shape} pad layers through generated TSX execution`, async () => {
    const pads = su(makeCircuit(shape)).pcb_smtpad.list()
    // Establish the generator's input independently of the importer so this
    // also catches layer loss in the second conversion stage.
    pads[0].layer = "top"
    pads[1].layer = "bottom"
    const footprint = generateFootprintTsx(pads)
    const result = await runTscircuitCode(`export default () => ${footprint}`)
    expect(
      su(result)
        .pcb_smtpad.list()
        .map((pad) => pad.layer),
    ).toEqual(["top", "bottom"])
  })
}
