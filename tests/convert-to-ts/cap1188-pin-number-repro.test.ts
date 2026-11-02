import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import raw from "../assets/C2652057.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

// Like merged repro #577, keep the supplier input and snapshots offline.
// EasyEDA documents the P header number as the SPICE number, separately from
// the number text section: https://docs.easyeda.com/en/DocumentFormat/2-EasyEDA-Schematic-File-Format/index.html
// Microchip DS00001620C, page 7, identifies CAP1188's bottom pad as GND.
const betterEasy = EasyEdaJsonSchema.parse(raw)
const groundPin = betterEasy.dataStr.shape.find(
  (shape) => shape.type === "PIN" && shape.label === "GND",
)
// Setup failures must not be counted as a successful expected-failure repro.
if (groundPin?.type !== "PIN") throw new Error("Missing supplier GND pin")

test("CAP1188 supplier GND uses SPICE number 23 and physical/display number 25", () => {
  expect(raw.lcsc.number).toBe("C2652057")
  expect(raw.dataStr.head.c_para["Manufacturer Part"]).toBe("CAP1188-1-CP-TR")
  const groundRow = raw.dataStr.shape.find(
    (row) =>
      row.startsWith("P~") && row.split("^^")[3]?.split("~")[4] === "GND",
  )!
  expect(groundRow.split("^^")[0].split("~")[3]).toBe("23")
  expect(groundRow.split("^^")[4].split("~")[4]).toBe("25")
  const pad = betterEasy.packageDetail.dataStr.shape.find(
    (shape) => shape.type === "PAD" && shape.number === 25,
  )
  expect(pad).toBeDefined()
})

test.failing(
  "maps CAP1188 GND to physical pad 25 rather than SPICE pin 23",
  () => {
    expect(groundPin.pinNumber).toBe(25)
  },
)

test("CAP1188 conversion loses GND on pad 25: generated TSX and schematic", async () => {
  const source = await convertBetterEasyToTsx({ betterEasy })
  expect(groundPin.pinNumber).toBe(23)
  expect(source).toContain('pin25: ["pin25"]')
  expect(source).not.toContain("pin25: {requiresGround: true}")
  expect(source.replace(/[\t ]+$/gm, "")).toMatchSnapshot(
    "CAP1188 physical pin 25 missing GND TSX",
  )

  const json = await runTscircuitCode(wrapTsxWithBoardFor3dSnapshot(source))
  const ep = json.find((e) => e.type === "source_port" && e.pin_number === 25)
  expect(ep).toMatchObject({ type: "source_port", pin_number: 25 })
  expect(ep).not.toHaveProperty("requires_ground")
  expect(
    json.find((e) => e.type === "source_port" && e.pin_number === 23),
  ).toMatchObject({ name: "VDD", requires_power: true })
  expect(
    json.find((e) => e.type === "source_no_ground_pin_defined_warning"),
  ).toBeDefined()
  expect(
    convertCircuitJsonToSchematicSvg(json).replace(/[\t ]+$/gm, ""),
  ).toMatchSvgSnapshot(import.meta.path, "cap1188-physical-pin25-missing-gnd")
}, 50_000)
