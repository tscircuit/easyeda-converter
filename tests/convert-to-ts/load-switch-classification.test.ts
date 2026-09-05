import { expect, test } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { categoryValueContainsSwitch } from "lib/websafe/convert-to-typescript-component/category-value-contains-switch"
import { isSwitchCategoryComponent } from "lib/websafe/convert-to-typescript-component/is-switch-category-component"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import loadSwitchRawEasy from "../assets/C131941.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

test.each([
  "Power Distribution Switches",
  "Power-Distribution Switch",
  "Load Switches",
  "LOAD-SWITCH",
  "High-Side Switches",
  "Low Side Switches",
])("does not classify %s as a mechanical switch", (category) => {
  expect(categoryValueContainsSwitch(category)).toBe(false)
  expect(categoryValueContainsSwitch([{ name: category }])).toBe(false)
  const betterEasy = EasyEdaJsonSchema.parse(loadSwitchRawEasy)
  betterEasy.tags = []
  betterEasy.dataStr.head.c_para["LCSC Category"] = category
  expect(isSwitchCategoryComponent(betterEasy)).toBe(false)
})

test("records semiconductor and mechanical switch categories", () => {
  const categories = [
    "Power Distribution Switches",
    "Load Switches",
    "High-Side Switches",
    "Low Side Switches",
    "Analog Switches / Multiplexers",
    "Switching Diode",
    "Slide Switches",
    "Toggle Switches",
    "DIP Switches",
    "Push Button Switches",
  ]
  expect(
    categories.map((category) => ({
      category,
      isMechanicalSwitch: categoryValueContainsSwitch(category),
    })),
  ).toMatchSnapshot()
})

test("records TPS22918 classification and preserves its six supplier pins and footprint", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(loadSwitchRawEasy)
  // Omit optional 3D nodes only; all electrical and footprint geometry is retained.
  betterEasy.packageDetail.dataStr.shape =
    betterEasy.packageDetail.dataStr.shape.filter(
      (shape) => shape.type !== "SVGNODE",
    )
  const converted = convertEasyEdaJsonToCircuitJson(betterEasy)
  expect(
    converted
      .filter((element) => element.type === "source_port")
      .sort((a, b) => a.pin_number! - b.pin_number!)
      .map(({ pin_number, port_hints }) => ({ pin_number, port_hints })),
  ).toEqual([
    { pin_number: 1, port_hints: ["VIN"] },
    { pin_number: 2, port_hints: ["GND"] },
    { pin_number: 3, port_hints: ["ON"] },
    { pin_number: 4, port_hints: ["CT"] },
    { pin_number: 5, port_hints: ["QOD"] },
    { pin_number: 6, port_hints: ["VOUT"] },
  ])
  expect(generateFootprintTsx(converted)).toMatchSnapshot(
    "unchanged supplier footprint",
  )
  const tsx = await convertBetterEasyToTsx({ betterEasy })
  expect(tsx).toContain("<chip")
  expect(tsx).toContain("ChipProps")
  expect(tsx).not.toContain("<switch")
  expect(tsx).not.toContain("SwitchProps")
  expect(tsx).not.toContain('name = "SW1"')
  expect(tsx).toMatchSnapshot("generated component")
  const circuitJson = await runTscircuitCode(wrapTsxWithBoardFor3dSnapshot(tsx))
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )
  expect(sourceComponent?.ftype).toBe("simple_chip")
  // Follow the existing chip generator's naming convention (no forced SW1).
  expect(sourceComponent?.name).toBe("unnamed_chip1")
  expect(
    circuitJson.filter(
      (element) => element.type === "source_component_internal_connection",
    ),
  ).toHaveLength(0)
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(6)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C131941-load-switch-schematic",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C131941-load-switch-pcb",
  )
}, 30_000)
