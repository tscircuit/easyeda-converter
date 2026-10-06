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
  expect(width).toBeCloseTo(3.6, 3)
  expect(height).toBeCloseTo(3.2005, 3)

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
            <cutout shape="polygon" points={[{"x":1.7998439999998936,"y":1.2002516000000014},{"x":1.7462585022180974,"y":1.4002438679476654},{"x":1.5998590647502624,"y":1.546652602388349},{"x":1.3998701999998957,"y":1.6002507999999125},{"x":1.3998701999998957,"y":1.6000476000001527},{"x":-1.400124200000164,"y":1.6000476000001527},{"x":-1.403286198698197,"y":1.600136304025682},{"x":-1.4064488000001347,"y":1.6002000000000862},{"x":-1.4064488000001347,"y":1.6002000000000862},{"x":-1.6037640535419087,"y":1.54453291216646},{"x":-1.747582733090212,"y":1.3984222645010504},{"x":-1.800123400000075,"y":1.2002516000000014},{"x":-1.8001233927420799,"y":1.2003277999999682},{"x":-1.800123400000075,"y":1.2004040000000487},{"x":-1.800123400000075,"y":1.1999722000000475},{"x":-1.800123400000075,"y":-1.200073800000041},{"x":-1.7465252023885114,"y":-1.4000626647504077},{"x":-1.600116467947828,"y":-1.5464621022180154},{"x":-1.400124200000164,"y":-1.600047600000039},{"x":1.3998701999998957,"y":-1.600047600000039},{"x":1.3998701999998957,"y":-1.6002507999999125},{"x":1.5998590647502624,"y":-1.546652602388349},{"x":1.7462585022180974,"y":-1.4002438679475517},{"x":1.7998439999998936,"y":-1.2002515999998877},{"x":1.7998439999998936,"y":1.2002516000000014}]} />
    <smtpad portHints={["pin4"]} pcbX="2.499995mm" pcbY="-0.7501636mm" width="1.1999976mm" height="0.8199882mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="2.499995mm" pcbY="0.7499604mm" width="1.1999976mm" height="0.8199882mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-2.499995mm" pcbY="0.7499604mm" width="1.1999976mm" height="0.8199882mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-2.499995mm" pcbY="-0.7501636mm" width="1.1999976mm" height="0.8199882mm" shape="rect" />
    <silkscreenpath route={[{"x":-1.6001492000000326,"y":1.3999718000001167},{"x":1.5998951999999917,"y":1.3999718000001167}]} />
    <silkscreenpath route={[{"x":-1.600123799999892,"y":-1.3999972000000298},{"x":1.5999205999999049,"y":-1.3999972000000298}]} />
    <silkscreencircle pcbX="-0.000127mm" pcbY="0.0001524mm" radius="0.99187mm" />
    <silkscreentext text="{NAME}" pcbX="-0.012827mm" pcbY="3.0390104mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":1.0158729999998286,"y":2.0319746000000123},{"x":2.031872999999905,"y":2.0319746000000123},{"x":2.031872999999905,"y":1.3969746000000214},{"x":1.0158729999998286,"y":2.0319746000000123}]} strokeWidth="0.01mm" />
    <courtyardoutline outline={[{"x":-3.3499938000001066,"y":1.6500480000000834},{"x":3.349993799999993,"y":1.6500480000000834},{"x":3.349993799999993,"y":-1.6499463999999762},{"x":-3.3499938000001066,"y":-1.6499463999999762},{"x":-3.3499938000001066,"y":1.6500480000000834}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5378731.obj?uuid=24821b1a65784664819cc38487bec84f",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5378731.step?uuid=24821b1a65784664819cc38487bec84f",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: -0.00005079999993995443, z: -0.5900006 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 20000)
