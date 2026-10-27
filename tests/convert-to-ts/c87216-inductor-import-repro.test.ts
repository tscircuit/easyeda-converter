import { expect, test } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { isInductorComponent } from "lib/websafe/convert-to-typescript-component/is-inductor-component"
import { runTscircuitCode } from "tscircuit"
import c87216RawEasy from "../assets/C87216.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

test("converts C87216 L0603 to a native inductor", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(c87216RawEasy)

  expect(betterEasy).toMatchObject({
    owner: { username: "LCSC" },
    title: "LBMF1608T100K",
    tags: ["Inductors/Coils/Transformers"],
    lcsc: { number: "C87216" },
    dataStr: {
      head: {
        c_para: {
          package: "L0603",
          pre: "L?",
          Value: "10uH",
        },
      },
    },
  })

  const result = await convertBetterEasyToTsx({ betterEasy })

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
    "c87216-l0603-inductor-as-chip-schematic",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "c87216-l0603-inductor-as-chip-pcb",
  )

  expect(result).toMatchInlineSnapshot(`
    "import type { InductorProps } from "@tscircuit/props"

    export const LBMF1608T100K = (props: Omit<InductorProps, "inductance">) => {
      return (
        <inductor
          inductance="10uH"
          supplierPartNumbers={{
      "jlcpcb": [
        "C87216"
      ]
    }}
          manufacturerPartNumber="LBMF1608T100K"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-0.699897mm" pcbY="0mm" width="0.7999984mm" height="0.8640064mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="0.699897mm" pcbY="0mm" width="0.7999984mm" height="0.8640064mm" shape="rect" />
    <silkscreenpath route={[{"x":-1.2700000000000955,"y":-0.6513575999998693},{"x":-1.4241018000001304,"y":-0.499008399999866},{"x":-1.4241018000001304,"y":0.5174234000000979},{"x":-1.2700000000000955,"y":0.6499860000001263}]} />
    <silkscreenpath route={[{"x":1.2699999999998681,"y":0.6499860000001263},{"x":1.4241525999999567,"y":0.49898300000006657},{"x":1.4241525999999567,"y":-0.5174487999998973},{"x":1.2699999999998681,"y":-0.6500114000000394}]} />
    <silkscreenpath route={[{"x":-1.272006600000168,"y":0.6499860000001263},{"x":-0.5100066000001107,"y":0.6499860000001263}]} />
    <silkscreenpath route={[{"x":1.2720573999999942,"y":-0.6500114000000394},{"x":0.5100573999999369,"y":-0.6500114000000394}]} />
    <silkscreenpath route={[{"x":-1.272006600000168,"y":-0.6500114000000394},{"x":-0.5100066000001107,"y":-0.6500114000000394}]} />
    <silkscreenpath route={[{"x":1.2720573999999942,"y":0.6499860000001263},{"x":0.5100573999999369,"y":0.6499860000001263}]} />
    <silkscreentext text="{NAME}" pcbX="0.009525mm" pcbY="1.63754mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.349896200000103,"y":0.6820032000000538},{"x":1.3498961999999892,"y":0.6820032000000538},{"x":1.3498961999999892,"y":-0.6820032000000538},{"x":-1.349896200000103,"y":-0.6820032000000538},{"x":-1.349896200000103,"y":0.6820032000000538}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C87216.obj?uuid=a7f84688c5004aa68dbcbddc99bd5473",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C87216.step?uuid=a7f84688c5004aa68dbcbddc99bd5473",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: 0.0023875999999063424, y: 0.015976600000044527, z: -0.25 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 50000)
