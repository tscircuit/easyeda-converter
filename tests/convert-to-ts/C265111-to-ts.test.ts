import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C265111.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C265111 into typescript file", async () => {
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
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"],
      pin4: ["pin4"],
      pin5: ["pin5"],
      pin6: ["pin6"],
      pin7: ["pin7"],
      pin8: ["pin8"],
      pin9: ["pin9"],
      pin10: ["pin10"]
    } as const

    export const SM08B_GHS_TB_LF__SN_ = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C265111"
      ]
    }}
          manufacturerPartNumber="SM08B_GHS_TB_LF__SN_"
          footprint={<footprint>
            <smtpad portHints={["pin10"]} pcbX="6.225032mm" pcbY="-1.3499465mm" width="1.2100052mm" height="2.6999946mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-6.225032mm" pcbY="-1.3499465mm" width="1.2100052mm" height="2.6999946mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="4.374896mm" pcbY="1.8499455mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="3.124962mm" pcbY="1.8499455mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="1.874774mm" pcbY="1.8499455mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="0.62484mm" pcbY="1.8499455mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-0.625094mm" pcbY="1.8499455mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-1.875028mm" pcbY="1.8499455mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-3.125216mm" pcbY="1.8499455mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-4.37515mm" pcbY="1.8499455mm" width="0.5999988mm" height="1.6999966mm" shape="rect" />
    <silkscreenpath route={[{"x":-5.389016399999946,"y":-2.500058499999909},{"x":5.299862399999938,"y":-2.500058499999909}]} />
    <silkscreenpath route={[{"x":-4.9062893999999915,"y":1.5999333000000888},{"x":-6.65010099999995,"y":1.5999333000000888},{"x":-6.65010099999995,"y":0.23110189999999875}]} />
    <silkscreenpath route={[{"x":-3.6562791999999718,"y":1.5999333000000888},{"x":-3.844010599999933,"y":1.5999333000000888}]} />
    <silkscreenpath route={[{"x":-2.406294399999979,"y":1.5999333000000888},{"x":-2.5940003999999135,"y":1.5999333000000888}]} />
    <silkscreenpath route={[{"x":-1.1562841999999591,"y":1.5999333000000888},{"x":-1.3440156000000343,"y":1.5999333000000888}]} />
    <silkscreenpath route={[{"x":0.09370059999992009,"y":1.5999333000000888},{"x":-0.09400539999990087,"y":1.5999333000000888}]} />
    <silkscreenpath route={[{"x":1.3437108000000535,"y":1.5999333000000888},{"x":1.1559793999999783,"y":1.5999333000000888}]} />
    <silkscreenpath route={[{"x":2.593721000000073,"y":1.5999333000000888},{"x":2.405989599999998,"y":1.5999333000000888}]} />
    <silkscreenpath route={[{"x":3.843705800000066,"y":1.5999333000000888},{"x":3.655999799999904,"y":1.5999333000000888}]} />
    <silkscreenpath route={[{"x":4.905984600000124,"y":1.5999333000000888},{"x":6.59985979999999,"y":1.5999333000000888},{"x":6.59985979999999,"y":0.23110189999999875}]} />
    <silkscreentext text="{NAME}" pcbX="0.014478mm" pcbY="3.6947495mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-7.068122000000017,"y":2.944749500000057},{"x":7.097078000000124,"y":2.944749500000057},{"x":7.097078000000124,"y":-2.9654504999999745},{"x":-7.068122000000017,"y":-2.9654504999999745},{"x":-7.068122000000017,"y":2.944749500000057}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C265111.obj?uuid=e2cbbcb052e1425b939676152927732c",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C265111.step?uuid=e2cbbcb052e1425b939676152927732c",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.00012700000002041634, y: 0.02706369999987146, z: -3.875 },
          }}
          {...props}
        />
      )
    }"
  `)
})
