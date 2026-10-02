import { expect, it } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import resistorRawEasy from "../assets/C5127775.raweasy.json"

it("reproduces the missing resistance of a current-sense resistor with a U? prefix", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(resistorRawEasy)
  expect(betterEasy.tags).toContain("Current Sense Resistors/Shunt Resistors")
  expect(betterEasy.dataStr.head.c_para).toMatchObject({
    pre: "U?",
    package: "R1206",
    Value: "180mΩ",
    "Supplier Part": "C5127775",
  })

  const result = await convertBetterEasyToTsx({ betterEasy })
  expect(result).toContain("<chip")
  expect(result).not.toContain("resistance=")
  expect(result).not.toContain("symbol={")
  expect(result).toContain(
    '<smtpad portHints={["pin1"]} pcbX="-1.478788mm" pcbY="0mm" width="1.207516mm" height="1.7010126mm" shape="rect" />',
  )
  expect(result).toContain(
    '<smtpad portHints={["pin2"]} pcbX="1.478788mm" pcbY="0mm" width="1.207516mm" height="1.7010126mm" shape="rect" />',
  )

  const circuitJson = await runTscircuitCode(
    `${result}\nexport default () => <board width="8mm" height="6mm"><HoLRT1206_1W_180mR_1_ name="R1" /></board>`,
  )
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )
  expect(sourceComponent).toMatchObject({
    ftype: "simple_chip",
    supplier_part_numbers: { jlcpcb: ["C5127775"] },
  })
  expect(sourceComponent).not.toHaveProperty("resistance")
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(2)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(2)
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toHaveLength(0)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C5127775-schematic",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C5127775-pcb",
  )
})
