import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import c23186RawEasy from "../assets/C23186.raweasy.json"

const COMPONENT_NAME = "A_0603WAF5101T5E"
const EXPECTED_COURTYARD_WIDTH_MM = 3.2686
const EXPECTED_COURTYARD_HEIGHT_MM = 1.8208

test("A_0603WAF5101T5E should preserve its generated courtyard through TSX conversion", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(c23186RawEasy)
  const tsxResult = await convertBetterEasyToTsx({ betterEasy })

  expect(tsxResult).toContain(`export const ${COMPONENT_NAME}`)
  expect(tsxResult).toContain(`manufacturerPartNumber="${COMPONENT_NAME}"`)
  expect(tsxResult).toContain('"C23186"')
  expect(tsxResult).toContain("<courtyardoutline outline={")

  const circuitJson = await runTscircuitCode(tsxResult)
  const courtyardOutlines = circuitJson.filter(
    (element) => element.type === "pcb_courtyard_outline",
  )

  expect(courtyardOutlines).toHaveLength(1)

  const [courtyardOutline] = courtyardOutlines
  const courtyardXCoordinates = courtyardOutline.outline.map((point) => point.x)
  const courtyardYCoordinates = courtyardOutline.outline.map((point) => point.y)
  const courtyardWidthMm =
    Math.max(...courtyardXCoordinates) - Math.min(...courtyardXCoordinates)
  const courtyardHeightMm =
    Math.max(...courtyardYCoordinates) - Math.min(...courtyardYCoordinates)

  expect(courtyardWidthMm).toBeCloseTo(EXPECTED_COURTYARD_WIDTH_MM)
  expect(courtyardHeightMm).toBeCloseTo(EXPECTED_COURTYARD_HEIGHT_MM)

  const pcbSvg = convertCircuitJsonToPcbSvg(circuitJson, {
    showCourtyards: true,
  })

  expect(pcbSvg).toContain('data-type="pcb_courtyard_outline"')
  expect(pcbSvg).toMatchSvgSnapshot(import.meta.path)
}, 20000)
