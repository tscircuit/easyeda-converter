import { expect, test } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import crystalRawEasy from "../assets/C70593.raweasy.json"

test("C70593 imports as a native four-pin crystal", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(crystalRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("<crystal")
  expect(result).toContain('frequency="25MHz"')
  expect(result).toContain('pinVariant="four_pin"')
  expect(result).not.toContain("<chip")
  expect(result).not.toContain("symbol={")
  expect(result).toMatchInlineSnapshot(`
    "import type { CrystalProps } from "@tscircuit/props"

    type ImportedCrystalProps = Omit<CrystalProps, "frequency" | "pinVariant">

    export const X322525MRB4SI = (props: ImportedCrystalProps) => {
      const { name = "X1", ...restProps } = props

      return (
        <crystal
          name={name}
          frequency="25MHz"
          pinVariant="four_pin"
          supplierPartNumbers={{
      "jlcpcb": [
        "C70593"
      ]
    }}
          manufacturerPartNumber="X322525MRB4SI"
          footprint={<footprint>
            <smtpad portHints={["pin3"]} pcbX="0.949985mm" pcbY="-1.100074mm" width="1.1999976mm" height="1.3999972mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-0.949985mm" pcbY="1.100074mm" width="1.1999976mm" height="1.3999972mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="0.949985mm" pcbY="1.100074mm" width="1.1999976mm" height="1.3999972mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-0.949985mm" pcbY="-1.100074mm" width="1.1999976mm" height="1.3999972mm" shape="rect" />
    <silkscreenpath route={[{"x":-1.270127,"y":2.539746},{"x":-1.270127,"y":2.539746},{"x":-2.286127,"y":2.539746},{"x":-2.286127,"y":2.539746},{"x":-2.286127,"y":1.523746},{"x":-2.286127,"y":1.523746}]} />
    <silkscreenpath route={[{"x":-1.699895,"y":2.100326},{"x":-1.699895,"y":-2.100834},{"x":1.700149,"y":-2.100834},{"x":1.700149,"y":2.100326},{"x":-1.699895,"y":2.100326}]} />
    <silkscreenpath route={[{"x":-1.778,"y":1.016},{"x":-1.928642,"y":1.164741},{"x":-2.078019,"y":1.01473},{"x":-1.928642,"y":0.864719},{"x":-1.778,"y":1.01346}]} />
    <silkscreentext text="{NAME}" pcbX="2.697101mm" pcbY="0.220726mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":1.799984,"y":2.050073},{"x":1.799984,"y":-2.050073},{"x":-1.799984,"y":-2.050073},{"x":-1.799984,"y":2.050073},{"x":1.799984,"y":2.050073}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C70593.obj?uuid=3d8e5f33629249f9a4089449c02742d4",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C70593.step?uuid=3d8e5f33629249f9a4089449c02742d4",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 0.000013, y: 0, z: -0.01 },
          }}
          {...restProps}
        />
      )
    }"
  `)

  const componentName = result.match(/export const (\w+)/)?.[1]
  expect(componentName).toBeDefined()

  const circuitJson = await runTscircuitCode(`
    ${result}
    export default () => (
      <board>
        <${componentName} name="X1" loadCapacitance="18pF" />
      </board>
    )
  `)

  expect(
    circuitJson.filter((element) => element.type.endsWith("_error")),
  ).toEqual([])
  expect(
    circuitJson.filter((element) => element.type === "schematic_component"),
  ).toHaveLength(1)

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C70593-four-pin-crystal-symbol-repro",
  )
})
