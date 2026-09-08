import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C2979182.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"

it("should convert C2979182 / MY-18650-02 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const supplierArcNotes = convertEasyEdaJsonToCircuitJson(betterEasy).filter(
    (element) => element.type === "pcb_fabrication_note_path",
  )
  expect(supplierArcNotes).toHaveLength(2)
  expect(supplierArcNotes.every((note) => note.route.length > 2)).toBe(true)

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
      pin1: ["_POS2","_NEG2"],
      pin2: ["_POS1","_NEG1"]
    } as const

    export const MY_18650_02 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2979182"
      ]
    }}
          manufacturerPartNumber="MY-18650-02"
          footprint={<footprint>
            <smtpad portHints={["pin2"]} pcbX="8.499983mm" pcbY="0mm" width="4.99999mm" height="5.499989mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-8.499983mm" pcbY="0mm" width="4.99999mm" height="3.499993mm" shape="rect" />
    <via pcbX="-8.000111mm" pcbY="0mm" outerDiameter="1.8499836mm" holeDiameter="1.8499836mm" layers={["top","bottom"]} />
    <via pcbX="7.999857mm" pcbY="0mm" outerDiameter="1.8499836mm" holeDiameter="1.8499836mm" layers={["top","bottom"]} />
    <silkscreenpath route={[{"x":-3.429990599999769,"y":5.619978599999968},{"x":-3.429990599999769,"y":-5.782513199999926}]} />
    <silkscreenpath route={[{"x":-3.429990599999769,"y":-5.669991199999913},{"x":6.099987800000235,"y":-5.669991199999913}]} />
    <silkscreenpath route={[{"x":-3.429990599999769,"y":5.619978599999968},{"x":6.099987800000235,"y":5.619978599999968}]} />
    <silkscreenpath route={[{"x":-5.899988199999825,"y":1.9580351999999266},{"x":-5.899988199999825,"y":5.619978599999968},{"x":-3.429990599999769,"y":5.619978599999968},{"x":-3.429990599999769,"y":8.249970800000028},{"x":6.099987800000235,"y":8.249970800000028}]} />
    <silkscreenpath route={[{"x":6.099987800000235,"y":-8.249996200000055},{"x":-3.429990599999769,"y":-8.249996200000055},{"x":-3.429990599999769,"y":-5.669991199999913},{"x":-5.899988199999825,"y":-5.669991199999913},{"x":-5.899988199999825,"y":-1.9580605999999534}]} />
    <silkscreenpath route={[{"x":6.099987800000235,"y":-2.9811217999999826},{"x":6.099987800000235,"y":-8.249996200000055}]} />
    <silkscreenpath route={[{"x":6.099987800000235,"y":8.249970800000028},{"x":6.099987800000235,"y":2.9811217999999826}]} />
    <silkscreentext text="{NAME}" pcbX="0.000889mm" pcbY="9.255mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-4.5001179999999295,"y":5.599988800000119},{"x":-4.833244691598452,"y":4.917096231522237},{"x":-5.122485977812289,"y":4.214490274326295},{"x":-5.366682246211894,"y":3.4949877828520357},{"x":-5.56485447671389,"y":2.7614733523222412},{"x":-5.6710003456382765,"y":2.2661295968180184},{"x":-5.790792868996391,"y":1.5158193915793845},{"x":-5.86286103028749,"y":0.759432035216264},{"x":-5.88691589726136,"y":0},{"x":-5.86286103028749,"y":-0.759432035216264},{"x":-5.790792868996391,"y":-1.5158193915792708},{"x":-5.6710003456382765,"y":-2.266129596817791},{"x":-5.503963726709003,"y":-3.00735454288656},{"x":-5.366682246211894,"y":-3.4949877828520357},{"x":-5.122485977812289,"y":-4.214490274326181},{"x":-4.833244691598452,"y":-4.917096231522123},{"x":-4.5001179999999295,"y":-5.5999888000000055},{"x":-4.5001179999999295,"y":5.599988800000119}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":-4.5001179999999295,"y":-1.5999967999998717},{"x":-4.330778805199202,"y":-1.4294216073913049},{"x":-4.181504864005888,"y":-1.241036497284881},{"x":-4.054156059161073,"y":-1.0371886590971826},{"x":-3.95031909657132,"y":-0.8204179405272498},{"x":-3.871287735703845,"y":-0.593425202254366},{"x":-3.818046669954583,"y":-0.35903866649118754},{"x":-3.7912592578339854,"y":-0.12017867867166387},{"x":-3.7912592578339854,"y":0.12017867867177756},{"x":-3.818046669954583,"y":0.35903866649118754},{"x":-3.871287735703845,"y":0.5934252022544797},{"x":-3.95031909657132,"y":0.8204179405273635},{"x":-4.054156059161073,"y":1.0371886590972963},{"x":-4.181504864005888,"y":1.2410364972849948},{"x":-4.330778805199202,"y":1.4294216073914185},{"x":-4.5001179999999295,"y":1.5999967999999853},{"x":-4.5001179999999295,"y":-1.5999967999998717}]} strokeWidth="0.254mm" />
    <courtyardoutline outline={[{"x":-11.247310999999968,"y":8.504999999999995},{"x":11.24908900000014,"y":8.504999999999995},{"x":11.24908900000014,"y":-8.504999999999882},{"x":-11.247310999999968,"y":-8.504999999999882},{"x":-11.247310999999968,"y":8.504999999999995}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2979182.obj?uuid=17bab5f954174916a1c2399c3b756d35",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2979182.step?uuid=17bab5f954174916a1c2399c3b756d35",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0.00011429999972278893, y: 0, z: -0.35000200000000015 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 10000)
