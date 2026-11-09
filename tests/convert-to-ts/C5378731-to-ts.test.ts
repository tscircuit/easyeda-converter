import { expect, it } from "bun:test"
import type { PcbCutout } from "circuit-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C5378731.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("emits the C5378731 non-plated through-hole slot as a pcb_cutout", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const npthRegions = betterEasy.packageDetail.dataStr.shape.filter(
    (shape) =>
      shape.type === "SOLIDREGION" &&
      shape.fillStyle === "npth" &&
      shape.layermask === 11,
  )
  expect(npthRegions).toHaveLength(1)

  const convertedCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const npthCutouts = convertedCircuitJson.filter(
    (element): element is PcbCutout =>
      element.type === "pcb_cutout" &&
      element.pcb_cutout_id.startsWith("pcb_cutout_npth_"),
  )
  expect(npthCutouts).toHaveLength(1)

  const npthCutout = npthCutouts[0]!
  expect(npthCutout.shape).toBe("polygon")
  if (npthCutout.shape !== "polygon") throw new Error("unreachable")

  // The source path spans x 4036.0634..4050.2365 and y 3017.8274..3030.4278 in
  // 10 mil units, i.e. 3.6mm x 3.2mm once multiplied by 0.254mm per unit.
  const xs = npthCutout.points.map((point) => point.x)
  const ys = npthCutout.points.map((point) => point.y)
  const width = Math.max(...xs) - Math.min(...xs)
  const height = Math.max(...ys) - Math.min(...ys)
  expect(width).toBeCloseTo(3.2005, 3)
  expect(height).toBeCloseTo(3.6, 3)

  // The corner fillets come from A commands the schema does not capture, so the
  // expanded outline must be richer than the 9 M/L points alone.
  expect(npthCutout.points.length).toBeGreaterThan(9)

  // Recentring puts the slot at the footprint origin.
  expect((Math.min(...xs) + Math.max(...xs)) / 2).toBeCloseTo(0, 3)
  expect((Math.min(...ys) + Math.max(...ys)) / 2).toBeCloseTo(0, 3)

  const result = await convertBetterEasyToTsx({ betterEasy })
  expect(result).toContain('<cutout shape="polygon"')
})

it("imports C5378731 supplier fabrication notes into its footprint string", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const supplierDocumentRegions = betterEasy.packageDetail.dataStr.shape.filter(
    (shape) => shape.type === "SOLIDREGION" && shape.layermask === 12,
  )
  expect(supplierDocumentRegions).toHaveLength(1)

  const convertedCircuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  expect(
    convertedCircuitJson.filter(
      (element) => element.type === "pcb_fabrication_note_path",
    ),
  ).toHaveLength(1)

  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
  expect(result).toContain("SK6812MINI_EA")
  expect(result).toContain('pin1: ["VDD"]')
  expect(result).toContain('pin4: ["DIN"]')
  expect(result).toContain("<fabricationnotepath")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(
    convertCircuitJsonToPcbSvg(circuitJson, { showCourtyards: true }),
  ).toMatchSvgSnapshot(import.meta.path)
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["VDD"],
      pin2: ["DOUT"],
      pin3: ["GND"],
      pin4: ["DIN"]
    } as const

    const pinAttributes = {
      pin1: {requiresPower: true},
      pin3: {requiresGround: true}
    } as const

    export const SK6812MINI_EA = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C5378731"
      ]
    }}
          manufacturerPartNumber="SK6812MINI-EA"
          footprint={<footprint>
            <cutout shape="polygon" points={[{"x":1.200353,"y":-1.799946},{"x":1.400345,"y":-1.74636},{"x":1.546754,"y":-1.599961},{"x":1.600352,"y":-1.399972},{"x":1.600149,"y":-1.399972},{"x":1.600149,"y":1.400023},{"x":1.600238,"y":1.403185},{"x":1.600302,"y":1.406347},{"x":1.600302,"y":1.406347},{"x":1.544635,"y":1.603662},{"x":1.398524,"y":1.747481},{"x":1.200353,"y":1.800022},{"x":1.200429,"y":1.800022},{"x":1.200506,"y":1.800022},{"x":1.200074,"y":1.800022},{"x":-1.199972,"y":1.800022},{"x":-1.399961,"y":1.746424},{"x":-1.546361,"y":1.600015},{"x":-1.599946,"y":1.400023},{"x":-1.599946,"y":-1.399972},{"x":-1.600149,"y":-1.399972},{"x":-1.546551,"y":-1.599961},{"x":-1.400142,"y":-1.74636},{"x":-1.20015,"y":-1.799946},{"x":1.200353,"y":-1.799946}]} />
    <smtpad portHints={["pin4"]} pcbX="-0.750062mm" pcbY="-2.500097mm" width="0.8199882mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.750062mm" pcbY="-2.500097mm" width="0.8199882mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.750062mm" pcbY="2.499893mm" width="0.8199882mm" height="1.1999976mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-0.750062mm" pcbY="2.499893mm" width="0.8199882mm" height="1.1999976mm" shape="rect" />
    <silkscreenpath route={[{"x":1.400073,"y":1.600048},{"x":1.400073,"y":-1.599997}]} />
    <silkscreenpath route={[{"x":-1.399896,"y":1.600022},{"x":-1.399896,"y":-1.600022}]} />
    <silkscreencircle pcbX="0.000254mm" pcbY="0.000025mm" radius="0.99187mm" />
    <silkscreentext text="{NAME}" pcbX="3.039112mm" pcbY="0.012725mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <fabricationnotepath route={[{"x":2.032076,"y":-1.015975},{"x":2.032076,"y":-2.031975},{"x":1.397076,"y":-2.031975},{"x":2.032076,"y":-1.015975}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <courtyardoutline outline={[{"x":1.65015,"y":3.349892},{"x":1.65015,"y":-3.350095},{"x":-1.649845,"y":-3.350095},{"x":-1.649845,"y":3.349892},{"x":1.65015,"y":3.349892}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5378731.obj?uuid=24821b1a65784664819cc38487bec84f",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5378731.step?uuid=24821b1a65784664819cc38487bec84f",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 0.000051, y: -0.000102, z: -0.5900006 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 20000)
