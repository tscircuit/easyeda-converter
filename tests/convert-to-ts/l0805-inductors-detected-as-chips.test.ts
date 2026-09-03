import { expect, test } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { isInductorComponent } from "lib/websafe/convert-to-typescript-component/is-inductor-component"
import { runTscircuitCode } from "tscircuit"
import c1046RawEasy from "../assets/C1046.raweasy.json"
import c281113RawEasy from "../assets/C281113.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

const runReproCase = async (partNumber: string, rawEasy: unknown) => {
  const betterEasy = EasyEdaJsonSchema.parse(rawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(betterEasy.dataStr.head.c_para).toMatchObject({
    package: "L0805",
    pre: "L?",
    Value: "10uH",
  })
  expect(isInductorComponent(betterEasy)).toBe(false)
  expect(result).toContain('import type { ChipProps } from "@tscircuit/props"')
  expect(result).toContain("<chip")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    `${partNumber.toLowerCase()}-l0805-inductor-as-chip-schematic`,
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    `${partNumber.toLowerCase()}-l0805-inductor-as-chip-pcb`,
  )

  return result
}

test("reproduces C1046 L0805 inductor being generated as a generic chip", async () => {
  expect(c1046RawEasy).toMatchObject({
    owner: { username: "LCSC" },
    title: "SDFL2012S100KTF",
    uuid: "7e7bd4480f50e43c3f271086aa8e152e",
    lcsc: {
      number: "C1046",
      url: "https://lcsc.com/product-detail/Inductors-SMD_10uH-10_C1046.html",
    },
  })
  const result = await runReproCase("C1046", c1046RawEasy)

  expect(result).toMatchInlineSnapshot(`
        "import type { ChipProps } from "@tscircuit/props"

        const pinLabels = {
          pin1: ["pin1"],
          pin2: ["pin2"]
        } as const

        export const SDFL2012S100KTF = (props: ChipProps<typeof pinLabels>) => {
          return (
            <chip
              pinLabels={pinLabels}
              symbol={
                <symbol>
                  <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={0} schStemLength={0.06} />
                  <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={0} schStemLength={0.06} />
                  <schematicpath svgPath="M -0.3376 0.0014 A 0.08 0.078 0 1 0 -0.1784 0.0012" strokeColor="#880000" />
                  <schematicpath svgPath="M -0.168 0.0014 A 0.08 0.078 0 1 0 -0.0088 0.0014" strokeColor="#880000" />
                  <schematicpath svgPath="M 0.0014 0.0014 A 0.08 0.078 0 1 0 0.1606 0.0014" strokeColor="#880000" />
                  <schematicpath svgPath="M 0.174 0.0014 A 0.08 0.078 0 1 0 0.3334 0.0012" strokeColor="#880000" />
                  <schematictext schX={-0.48} schY={0.288} text="{NAME}" fontSize={0.2} anchor="bottom_left" />
                </symbol>
              }
              supplierPartNumbers={{
          "jlcpcb": [
            "C1046"
          ]
        }}
              manufacturerPartNumber="SDFL2012S100KTF"
              footprint={<footprint>
                <smtpad portHints={["pin1"]} pcbX="-0.966216mm" pcbY="0mm" width="1.1325352mm" height="1.3770102mm" shape="rect" />
        <smtpad portHints={["pin2"]} pcbX="0.966216mm" pcbY="0mm" width="1.1325352mm" height="1.3770102mm" shape="rect" />
        <silkscreenpath route={[{"x":-0.4212590000000773,"y":1.015949199999909},{"x":-1.5642590000001064,"y":1.015949199999909},{"x":-1.6912590000000591,"y":1.015949199999909},{"x":-1.9452590000000782,"y":0.76194919999989},{"x":-1.9452590000000782,"y":-0.6350507999999309},{"x":-1.9452590000000782,"y":-0.7620508000001109},{"x":-1.6912590000000591,"y":-1.0160508000000164},{"x":-0.4212590000000773,"y":-1.0160508000000164}]} />
        <silkscreenpath route={[{"x":0.34074099999998,"y":-1.0160508000000164},{"x":1.4837409999998954,"y":-1.0160508000000164},{"x":1.6107409999999618,"y":-1.0160508000000164},{"x":1.8647409999998672,"y":-0.7620508000001109},{"x":1.8647409999998672,"y":0.6349491999999373},{"x":1.8647409999998672,"y":0.76194919999989},{"x":1.6107409999999618,"y":1.015949199999909},{"x":0.34074099999998,"y":1.015949199999909}]} />
        <silkscreentext text="{NAME}" pcbX="-0.04191mm" pcbY="2.019302mm" anchorAlignment="center" fontSize="1mm" />
        <courtyardoutline outline={[{"x":-2.1969100000000026,"y":1.2693020000001525},{"x":2.1130900000000565,"y":1.2693020000001525},{"x":2.1130900000000565,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":1.2693020000001525}]} />
              </footprint>}
              cadModel={{
                objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C1046.obj?uuid=c7acac53bcbc44d68fbab8f60a747688",
                stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C1046.step?uuid=c7acac53bcbc44d68fbab8f60a747688",
                pcbRotationOffset: 0,
                modelOriginPosition: { x: 0, y: -0.000038099999983387534, z: 0 },
              }}
              {...props}
            />
          )
        }"
  `)
}, 50000)

test("reproduces C281113 L0805 inductor being generated as a generic chip", async () => {
  expect(c281113RawEasy).toMatchObject({
    owner: { username: "LCSC" },
    title: "MGFL2012F100MT-LF",
    uuid: "910aaef3ba604a9a8f17fc3b542dced9",
    lcsc: {
      number: "C281113",
      url: "https://lcsc.com/product-detail/Inductors-SMD_microgate-MGFL2012F100MT-LF_C281113.html",
    },
  })
  const result = await runReproCase("C281113", c281113RawEasy)

  expect(result).toMatchInlineSnapshot(`
        "import type { ChipProps } from "@tscircuit/props"

        const pinLabels = {
          pin1: ["pin1"],
          pin2: ["pin2"]
        } as const

        export const MGFL2012F100MT_LF = (props: ChipProps<typeof pinLabels>) => {
          return (
            <chip
              pinLabels={pinLabels}
              symbol={
                <symbol>
                  <port name="pin2" pinNumber={2} aliases={["2"]} direction="right" schX={0.4} schY={0} schStemLength={0.06} />
                  <port name="pin1" pinNumber={1} aliases={["1"]} direction="left" schX={-0.4} schY={0} schStemLength={0.06} />
                  <schematicpath svgPath="M -0.33766 0.00136 A 0.08 0.078 0 1 0 -0.17836 0.00128" strokeColor="#880000" />
                  <schematicpath svgPath="M -0.168 0.00142 A 0.08 0.078 0 1 0 -0.0087 0.00132" strokeColor="#880000" />
                  <schematicpath svgPath="M 0.00134 0.00142 A 0.08 0.078 0 1 0 0.16064 0.00132" strokeColor="#880000" />
                  <schematicpath svgPath="M 0.174 0.00138 A 0.08 0.078 0 1 0 0.3333 0.00128" strokeColor="#880000" />
                  <schematictext schX={-0.44} schY={0.286} text="{NAME}" fontSize={0.2} anchor="bottom_left" />
                </symbol>
              }
              supplierPartNumbers={{
          "jlcpcb": [
            "C281113"
          ]
        }}
              manufacturerPartNumber="MGFL2012F100MT-LF"
              footprint={<footprint>
                <smtpad portHints={["pin1"]} pcbX="-0.966216mm" pcbY="0mm" width="1.1325352mm" height="1.3770102mm" shape="rect" />
        <smtpad portHints={["pin2"]} pcbX="0.966216mm" pcbY="0mm" width="1.1325352mm" height="1.3770102mm" shape="rect" />
        <silkscreenpath route={[{"x":-0.4212590000000773,"y":1.015949199999909},{"x":-1.5642590000001064,"y":1.015949199999909},{"x":-1.6912590000000591,"y":1.015949199999909},{"x":-1.9452590000000782,"y":0.76194919999989},{"x":-1.9452590000000782,"y":-0.6350507999999309},{"x":-1.9452590000000782,"y":-0.7620508000001109},{"x":-1.6912590000000591,"y":-1.0160508000000164},{"x":-0.4212590000000773,"y":-1.0160508000000164}]} />
        <silkscreenpath route={[{"x":0.34074099999998,"y":-1.0160508000000164},{"x":1.4837409999998954,"y":-1.0160508000000164},{"x":1.6107409999999618,"y":-1.0160508000000164},{"x":1.8647409999998672,"y":-0.7620508000001109},{"x":1.8647409999998672,"y":0.6349491999999373},{"x":1.8647409999998672,"y":0.76194919999989},{"x":1.6107409999999618,"y":1.015949199999909},{"x":0.34074099999998,"y":1.015949199999909}]} />
        <silkscreentext text="{NAME}" pcbX="-0.04191mm" pcbY="2.019302mm" anchorAlignment="center" fontSize="1mm" />
        <courtyardoutline outline={[{"x":-2.1969100000000026,"y":1.2693020000001525},{"x":2.1130900000000565,"y":1.2693020000001525},{"x":2.1130900000000565,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":-1.2626980000000003},{"x":-2.1969100000000026,"y":1.2693020000001525}]} />
              </footprint>}
              cadModel={{
                objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C281113.obj?uuid=c7acac53bcbc44d68fbab8f60a747688",
                stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C281113.step?uuid=c7acac53bcbc44d68fbab8f60a747688",
                pcbRotationOffset: 0,
                modelOriginPosition: { x: 0, y: -0.000038099999983387534, z: 0 },
              }}
              {...props}
            />
          )
        }"
  `)
}, 50000)
