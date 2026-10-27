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
  expect(isInductorComponent(betterEasy)).toBe(true)
  expect(result).toContain(
    'import type { InductorProps } from "@tscircuit/props"',
  )
  expect(result).toContain("<inductor")
  expect(result).not.toContain("<chip")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toEqual([])
  expect(
    circuitJson.filter((element) => element.type === "schematic_component"),
  ).toHaveLength(1)
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

test("converts C1046 L0805 to a native inductor", async () => {
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
        "import type { InductorProps } from "@tscircuit/props"

        export const SDFL2012S100KTF = (props: Omit<InductorProps, "inductance">) => {
          return (
            <inductor
              inductance="10uH"
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
        <courtyardoutline outline={[{"x":-1.782483599999864,"y":0.9385051000000431},{"x":1.7824835999999777,"y":0.9385051000000431},{"x":1.7824835999999777,"y":-0.9385051000000431},{"x":-1.782483599999864,"y":-0.9385051000000431},{"x":-1.782483599999864,"y":0.9385051000000431}]} />
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

test("converts C281113 L0805 to a native inductor", async () => {
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
        "import type { InductorProps } from "@tscircuit/props"

        export const MGFL2012F100MT_LF = (props: Omit<InductorProps, "inductance">) => {
          return (
            <inductor
              inductance="10uH"
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
        <courtyardoutline outline={[{"x":-1.782483599999864,"y":0.9385051000000431},{"x":1.7824835999999777,"y":0.9385051000000431},{"x":1.7824835999999777,"y":-0.9385051000000431},{"x":-1.782483599999864,"y":-0.9385051000000431},{"x":-1.782483599999864,"y":0.9385051000000431}]} />
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
