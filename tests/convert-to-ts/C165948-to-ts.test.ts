import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C165948.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C165948 into typescript file", async () => {
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
      pin1: ["EH2"],
      pin2: ["EH1"],
      pin3: ["EH4"],
      pin4: ["EH3"],
      pin5: ["SBU2","B8"],
      pin6: ["CC1","A5"],
      pin7: ["DN2","B7"],
      pin8: ["DP1","A6"],
      pin9: ["DN1","A7"],
      pin10: ["DP2","B6"],
      pin11: ["SBU1","A8"],
      pin12: ["CC2","B5"],
      pin13: ["GND1","A1B12"],
      pin14: ["GND2","B1A12"],
      pin15: ["VBUS1","B4A9"],
      pin16: ["VBUS2","A4B9"]
    } as const

    export const TYPE_C_31_M_12 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C165948"
      ]
    }}
          manufacturerPartNumber="TYPE-C-31-M-12"
          footprint={<footprint>
            <hole pcbX="-1.20556mm" pcbY="-3.199911mm" diameter="0.7500112mm" />
    <hole pcbX="-1.20556mm" pcbY="2.599925mm" diameter="0.7500112mm" />
    <platedhole  portHints={["pin2"]} pcbX="2.474138mm" pcbY="4.025119mm" holeWidth="0.7999984mm" holeHeight="1.3999972mm" outerWidth="1.1999976mm" outerHeight="1.7999964mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin1"]} pcbX="-1.705686mm" pcbY="4.025119mm" holeWidth="0.7999984mm" holeHeight="1.5999714mm" outerWidth="1.1999976mm" outerHeight="1.999996mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin4"]} pcbX="-1.705686mm" pcbY="-4.625105mm" holeWidth="0.7999984mm" holeHeight="1.6000222mm" outerWidth="1.1999976mm" outerHeight="1.999996mm" pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin3"]} pcbX="2.474138mm" pcbY="-4.625105mm" holeWidth="0.7999984mm" holeHeight="1.3999972mm" outerWidth="1.1999976mm" outerHeight="1.7999964mm" pcbRotation="90deg" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-2.474036mm" pcbY="-2.050053mm" width="1.2999974mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-2.474036mm" pcbY="-1.549927mm" width="1.2999974mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-2.474036mm" pcbY="-1.050055mm" width="1.2999974mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-2.474036mm" pcbY="-0.549929mm" width="1.2999974mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-2.474036mm" pcbY="-0.050057mm" width="1.2999974mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-2.474036mm" pcbY="0.450069mm" width="1.2999974mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="-2.474036mm" pcbY="0.949687mm" width="1.2999974mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-2.474036mm" pcbY="1.450067mm" width="1.2999974mm" height="0.2999994mm" shape="rect" />
    <smtpad portHints={["pin13"]} points={[{x: "-1.824101mm", y: "-3.199962mm"}, {x: "-3.124124mm", y: "-3.199962mm"}, {x: "-3.124124mm", y: "-3.199962mm"}, {x: "-3.124124mm", y: "-3.499961mm"}, {x: "-3.124124mm", y: "-3.499961mm"}, {x: "-3.123971mm", y: "-3.499961mm"}, {x: "-3.123971mm", y: "-3.499961mm"}, {x: "-3.123971mm", y: "-3.799935mm"}, {x: "-3.123971mm", y: "-3.799935mm"}, {x: "-1.823949mm", y: "-3.799935mm"}, {x: "-1.823949mm", y: "-3.799935mm"}, {x: "-1.823949mm", y: "-3.499936mm"}, {x: "-1.823949mm", y: "-3.499936mm"}, {x: "-1.824101mm", y: "-3.499936mm"}, {x: "-1.824101mm", y: "-3.499936mm"}, {x: "-1.824101mm", y: "-3.199962mm"}]} shape="polygon" />
    <smtpad portHints={["pin14"]} points={[{x: "-3.124124mm", y: "2.600001mm"}, {x: "-1.824152mm", y: "2.600001mm"}, {x: "-1.824152mm", y: "2.600001mm"}, {x: "-1.824152mm", y: "2.900001mm"}, {x: "-1.824152mm", y: "2.900001mm"}, {x: "-1.824152mm", y: "2.900026mm"}, {x: "-1.824152mm", y: "2.900026mm"}, {x: "-1.824152mm", y: "3.200025mm"}, {x: "-1.824152mm", y: "3.200025mm"}, {x: "-3.124124mm", y: "3.200025mm"}, {x: "-3.124124mm", y: "3.200025mm"}, {x: "-3.124124mm", y: "2.900026mm"}, {x: "-3.124124mm", y: "2.900026mm"}, {x: "-3.124124mm", y: "2.900001mm"}, {x: "-3.124124mm", y: "2.900001mm"}, {x: "-3.124124mm", y: "2.600001mm"}]} shape="polygon" />
    <smtpad portHints={["pin15"]} points={[{x: "-1.824152mm", y: "2.400179mm"}, {x: "-3.124124mm", y: "2.400179mm"}, {x: "-3.124124mm", y: "2.400179mm"}, {x: "-3.124124mm", y: "2.10018mm"}, {x: "-3.124124mm", y: "2.10018mm"}, {x: "-3.124124mm", y: "2.100155mm"}, {x: "-3.124124mm", y: "2.100155mm"}, {x: "-3.124124mm", y: "1.800155mm"}, {x: "-3.124124mm", y: "1.800155mm"}, {x: "-1.824152mm", y: "1.800155mm"}, {x: "-1.824152mm", y: "1.800155mm"}, {x: "-1.824152mm", y: "2.100155mm"}, {x: "-1.824152mm", y: "2.100155mm"}, {x: "-1.824152mm", y: "2.10018mm"}, {x: "-1.824152mm", y: "2.10018mm"}, {x: "-1.824152mm", y: "2.400179mm"}]} shape="polygon" />
    <smtpad portHints={["pin16"]} points={[{x: "-1.823999mm", y: "-2.399963mm"}, {x: "-3.123971mm", y: "-2.399963mm"}, {x: "-3.123971mm", y: "-2.399963mm"}, {x: "-3.123971mm", y: "-2.699988mm"}, {x: "-3.123971mm", y: "-2.699988mm"}, {x: "-3.123946mm", y: "-2.699988mm"}, {x: "-3.123946mm", y: "-2.699988mm"}, {x: "-3.123946mm", y: "-2.999937mm"}, {x: "-3.123946mm", y: "-2.999937mm"}, {x: "-1.823974mm", y: "-2.999937mm"}, {x: "-1.823974mm", y: "-2.999937mm"}, {x: "-1.823974mm", y: "-2.699912mm"}, {x: "-1.823974mm", y: "-2.699912mm"}, {x: "-1.823999mm", y: "-2.699912mm"}, {x: "-1.823999mm", y: "-2.699912mm"}, {x: "-1.823999mm", y: "-2.399963mm"}]} shape="polygon" />
    <silkscreenpath route={[{"x":1.375766,"y":-4.768971},{"x":-0.487147,"y":-4.768971}]} />
    <silkscreenpath route={[{"x":5.094148,"y":4.171017},{"x":5.094148,"y":-4.768971},{"x":3.612845,"y":-4.768971}]} />
    <silkscreenpath route={[{"x":1.376121,"y":4.171017},{"x":-0.487502,"y":4.171017}]} />
    <silkscreenpath route={[{"x":5.094148,"y":4.171017},{"x":3.61249,"y":4.171017}]} />
    <silkscreentext text="{NAME}" pcbX="-4.128594mm" pcbY="-0.297199mm" anchorAlignment="center" pcbRotation="90deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-3.374124,"y":-5.475104},{"x":-3.374124,"y":4.875118},{"x":5.300028,"y":4.875118},{"x":5.300028,"y":-5.475104},{"x":-3.374124,"y":-5.475104}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C165948.obj?uuid=617b05f9bba7410b96c001093d8189e4",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C165948.step?uuid=617b05f9bba7410b96c001093d8189e4",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 2.450036, y: -0.299993, z: 0.000010999999999872223 },
          }}
          {...props}
        />
      )
    }"
  `)
})
