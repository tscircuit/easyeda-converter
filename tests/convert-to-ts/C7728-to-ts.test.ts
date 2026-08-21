import { expect, it } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C7728.raweasy.json"

it("reproduces C7728 thermal vias losing their exposed-pad connection", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const packageShapes = betterEasy.packageDetail.dataStr.shape
  const pads = packageShapes.filter((shape) => shape.type === "PAD")
  const vias = packageShapes.filter((shape) => shape.type === "VIA")

  expect(betterEasy.lcsc.number).toBe("C7728")
  expect(betterEasy.title).toBe("TPS76815QPWPRQ1")
  expect(betterEasy.tags).toEqual(["Linear Voltage Regulators (LDO)"])
  expect(betterEasy.packageDetail.dataStr.head.c_para.package).toBe(
    "TSSOP-20_L6.5-W4.4-P0.65-LS6.4-BL-EP",
  )
  expect(pads).toHaveLength(21)
  expect(vias).toHaveLength(8)
  expect(pads.some((pad) => String(pad.number) === "21")).toBe(true)

  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("<chip")
  expect(result).toContain('manufacturerPartNumber="TPS76815QPWPRQ1"')
  expect(result).toContain('"C7728"')
  expect(result.match(/<smtpad /g)).toHaveLength(21)
  expect(result.match(/<via /g)).toHaveLength(8)
  expect(result).not.toContain("connectsTo=")

  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board width="12mm" height="12mm">
        <TPS76815QPWPRQ1 name="U1" />
      </board>
    )
  `)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(21)
  expect(
    circuitJson.filter((element) => element.type === "pcb_via"),
  ).toHaveLength(8)
  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path, "C7728-thermal-vias-in-exposed-pad")
})
