import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C5360621.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C5360621 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["NC12"],
      pin2: ["NC1"],
      pin3: ["NC2"],
      pin4: ["NC3"],
      pin5: ["NC4"],
      pin6: ["NC11"],
      pin7: ["NC13"],
      pin8: ["VDDIO"],
      pin9: ["pin9"],
      pin10: ["NC5"],
      pin11: ["RESV1"],
      pin12: ["pin12"],
      pin13: ["VDD"],
      pin14: ["NC6"],
      pin15: ["NC7"],
      pin16: ["NC8"],
      pin17: ["NC9"],
      pin18: ["GND"],
      pin19: ["pin19"],
      pin20: ["RESV2"],
      pin21: ["NC10"],
      pin22: ["nCS"],
      pin23: ["pin23"],
      pin24: ["pin24"]
    } as const

    export const ICM_40609_D = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C5360621"
      ]
    }}
          manufacturerPartNumber="ICM_40609_D"
          footprint={<footprint>
            <smtpad portHints={["pin2"]} pcbX="-1.42748mm" pcbY="0.599948mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.42748mm" pcbY="0.199898mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-1.42748mm" pcbY="-0.199898mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-1.42748mm" pcbY="-0.599948mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-0.599948mm" pcbY="-1.42748mm" width="0.1999996mm" height="0.5050028mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-0.199898mm" pcbY="-1.42748mm" width="0.1999996mm" height="0.5050028mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="0.199898mm" pcbY="-1.42748mm" width="0.1999996mm" height="0.5050028mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="0.599948mm" pcbY="-1.42748mm" width="0.1999996mm" height="0.5050028mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="1.42748mm" pcbY="-0.599948mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="1.42748mm" pcbY="-0.199898mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="1.42748mm" pcbY="0.199898mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="1.42748mm" pcbY="0.599948mm" width="0.5050028mm" height="0.1999996mm" shape="rect" />
    <smtpad portHints={["pin18"]} points={[{x: "1.1749786mm", y: "0.999998mm"}, {x: "1.2864846mm", y: "1.0999978mm"}, {x: "1.6799814mm", y: "1.0999978mm"}, {x: "1.6799814mm", y: "0.8999982mm"}, {x: "1.1749786mm", y: "0.8999982mm"}]} shape="polygon" />
    <smtpad portHints={["pin20"]} pcbX="0.599948mm" pcbY="1.42748mm" width="0.1999996mm" height="0.5050028mm" shape="rect" />
    <smtpad portHints={["pin21"]} pcbX="0.199898mm" pcbY="1.42748mm" width="0.1999996mm" height="0.5050028mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="-0.199898mm" pcbY="1.42748mm" width="0.1999996mm" height="0.5050028mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="-0.599948mm" pcbY="1.42748mm" width="0.1999996mm" height="0.5050028mm" shape="rect" />
    <smtpad portHints={["pin12"]} points={[{x: "0.999998mm", y: "-1.1749786mm"}, {x: "1.0999978mm", y: "-1.2864846mm"}, {x: "1.0999978mm", y: "-1.6799814mm"}, {x: "0.8999982mm", y: "-1.6799814mm"}, {x: "0.8999982mm", y: "-1.1749786mm"}]} shape="polygon" />
    <smtpad portHints={["pin6"]} points={[{x: "-1.1749786mm", y: "-0.999998mm"}, {x: "-1.2864846mm", y: "-1.0999978mm"}, {x: "-1.6799814mm", y: "-1.0999978mm"}, {x: "-1.6799814mm", y: "-0.8999982mm"}, {x: "-1.1749786mm", y: "-0.8999982mm"}]} shape="polygon" />
    <smtpad portHints={["pin24"]} points={[{x: "-0.999998mm", y: "1.1749786mm"}, {x: "-1.0999978mm", y: "1.2864846mm"}, {x: "-1.0999978mm", y: "1.6799814mm"}, {x: "-0.8999982mm", y: "1.6799814mm"}, {x: "-0.8999982mm", y: "1.1749786mm"}]} shape="polygon" />
    <smtpad portHints={["pin1"]} points={[{x: "-1.1749786mm", y: "0.999998mm"}, {x: "-1.2864846mm", y: "1.0999978mm"}, {x: "-1.6799814mm", y: "1.1119866mm"}, {x: "-1.6799814mm", y: "0.8999982mm"}, {x: "-1.1749786mm", y: "0.8999982mm"}]} shape="polygon" />
    <smtpad portHints={["pin7"]} points={[{x: "-0.999998mm", y: "-1.1749786mm"}, {x: "-1.0999978mm", y: "-1.2864846mm"}, {x: "-1.0999978mm", y: "-1.6799814mm"}, {x: "-0.8999982mm", y: "-1.6799814mm"}, {x: "-0.8999982mm", y: "-1.1749786mm"}]} shape="polygon" />
    <smtpad portHints={["pin13"]} points={[{x: "1.1749786mm", y: "-0.999998mm"}, {x: "1.2864846mm", y: "-1.0999978mm"}, {x: "1.6799814mm", y: "-1.0999978mm"}, {x: "1.6799814mm", y: "-0.8999982mm"}, {x: "1.1749786mm", y: "-0.8999982mm"}]} shape="polygon" />
    <smtpad portHints={["pin19"]} points={[{x: "0.999998mm", y: "1.1749786mm"}, {x: "1.0999978mm", y: "1.2864846mm"}, {x: "1.0999978mm", y: "1.6799814mm"}, {x: "0.8999982mm", y: "1.6799814mm"}, {x: "0.8999982mm", y: "1.1749786mm"}]} shape="polygon" />
    <silkscreenpath route={[{"x":-1.5761969999999934,"y":1.2643865999999804},{"x":-1.5761969999999934,"y":1.5761969999999792},{"x":-1.2643865999999946,"y":1.5761969999999792}]} />
    <silkscreenpath route={[{"x":1.5761969999999792,"y":1.2643865999999804},{"x":1.5761969999999792,"y":1.5761969999999792},{"x":1.2643865999999946,"y":1.5761969999999792}]} />
    <silkscreenpath route={[{"x":1.5761969999999792,"y":-1.2643865999999946},{"x":1.5761969999999792,"y":-1.5761970000000076},{"x":1.2643865999999946,"y":-1.5761970000000076}]} />
    <silkscreenpath route={[{"x":-1.5761969999999934,"y":-1.2643865999999946},{"x":-1.5761969999999934,"y":-1.5761970000000076},{"x":-1.2643865999999946,"y":-1.5761970000000076}]} />
    <silkscreenpath route={[{"x":-1.9319240000000093,"y":1.269999999999996},{"x":-1.9353340070083078,"y":1.2440984252423135},{"x":-1.9453316416908706,"y":1.2199619999999953},{"x":-1.9612355817659761,"y":1.1992355817659757},{"x":-1.9819619999999958,"y":1.1833316416908701},{"x":-2.006098425242314,"y":1.1733340070082932},{"x":-2.0319999999999965,"y":1.1699239999999804},{"x":-2.0579015747576648,"y":1.1733340070082932},{"x":-2.0820380000000114,"y":1.1833316416908701},{"x":-2.102764418234017,"y":1.1992355817659757},{"x":-2.1186683583091366,"y":1.2199619999999953},{"x":-2.1286659929916993,"y":1.2440984252423135},{"x":-2.132075999999998,"y":1.269999999999996},{"x":-2.1286659929916993,"y":1.2959015747576785},{"x":-2.1186683583091366,"y":1.3200379999999967},{"x":-2.102764418234017,"y":1.3407644182340164},{"x":-2.0820380000000114,"y":1.356668358309122},{"x":-2.0579015747576648,"y":1.3666659929916847},{"x":-2.0319999999999965,"y":1.3700759999999974},{"x":-2.006098425242314,"y":1.3666659929916847},{"x":-1.9819619999999958,"y":1.356668358309122},{"x":-1.9612355817659761,"y":1.3407644182340164},{"x":-1.9453316416908706,"y":1.3200379999999967},{"x":-1.9353340070083078,"y":1.2959015747576785},{"x":-1.9319240000000093,"y":1.269999999999996}]} />
    <silkscreentext text="{NAME}" pcbX="-0.2286mm" pcbY="2.6764mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-2.383599999999987,"y":1.926400000000001},{"x":1.9264000000000152,"y":1.926400000000001},{"x":1.9264000000000152,"y":-1.926400000000001},{"x":-2.383599999999987,"y":-1.926400000000001},{"x":-2.383599999999987,"y":1.926400000000001}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5360621.obj?uuid=1ada17ccfc8345ac9195288b2f01547d",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5360621.step?uuid=1ada17ccfc8345ac9195288b2f01547d",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0, z: -0.14 },
          }}
          {...props}
        />
      )
    }"
  `)
})
