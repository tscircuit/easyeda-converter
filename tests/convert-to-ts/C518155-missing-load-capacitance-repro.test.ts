import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertRawEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import crystalRawEasy from "../assets/C518155.raweasy.json"

test("C518155 disappears when the imported crystal is used without load capacitance", async () => {
  const crystalTsx = await convertRawEasyToTsx({ rawEasy: crystalRawEasy })

  // LCSC specifies 12 pF for C518155: https://www.lcsc.com/product-detail/C518155.html
  const circuitJson = await runTscircuitCode(`
    ${crystalTsx}
    export default () => (
      <board width={24} height={10}>
        <A_3225_8_00_12_10_10_A name="Y1" pcbX={-6} />
        <A_3225_8_00_12_10_10_A name="Y2" pcbX={6} loadCapacitance="12pF" />
        <silkscreentext text="LOAD CAP OMITTED" pcbX={-6} pcbY={-3} fontSize={0.65} />
        <silkscreentext text="12 pF SUPPLIED" pcbX={6} pcbY={-3} fontSize={0.65} />
      </board>
    )
  `)

  const creationErrors = circuitJson.filter(
    (element) => element.type === "source_failed_to_create_component_error",
  )
  expect(creationErrors).toMatchObject([{ component_name: "Y1" }])
  expect(creationErrors[0]?.message).toContain("loadCapacitance")
  expect(
    circuitJson.filter((element) => element.type === "schematic_component"),
  ).toHaveLength(1)

  const pads = circuitJson.filter((element) => element.type === "pcb_smtpad")
  expect(pads).toHaveLength(4)
  expect(pads.every((pad) => pad.shape === "rect" && pad.x > 0)).toBe(true)

  await expect(
    convertCircuitJsonToPcbSvg(circuitJson, {
      matchBoardAspectRatio: true,
      shouldDrawRatsNest: false,
    }),
  ).toMatchSvgSnapshot(import.meta.path)
})
