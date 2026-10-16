import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C6186.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C6186 into typescript file", async () => {
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
      pin1: ["GND"],
      pin2: ["VOUT1"],
      pin3: ["VIN"],
      pin4: ["VOUT2"]
    } as const

    const pinAttributes = {
      pin1: {requiresGround: true},
      pin3: {requiresPower: true}
    } as const

    export const AMS1117_3_3 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C6186"
      ]
    }}
          manufacturerPartNumber="AMS1117-3.3"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="2.92995985mm" pcbY="-2.29997mm" width="2.499995mm" height="1.0999978mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="2.92995985mm" pcbY="0mm" width="2.499995mm" height="1.0999978mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="2.92995985mm" pcbY="2.29997mm" width="2.499995mm" height="1.0999978mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-3.00995715mm" pcbY="0mm" width="2.3400004mm" height="3.5999928mm" shape="rect" />
    <silkscreenpath route={[{"x":-1.6114077499998984,"y":-3.3262061999998878},{"x":-1.6114077499998984,"y":3.3262062000000014},{"x":1.3313854499999707,"y":3.3262062000000014},{"x":1.3313854499999707,"y":-3.3262061999998878},{"x":-1.6114077499998984,"y":-3.3262061999998878}]} />
    <silkscreentext text="{NAME}" pcbX="0.29178885mm" pcbY="4.3274mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":4.761680850000062,"y":-2.1877019999999447},{"x":4.75687839984289,"y":-2.236462094723379},{"x":4.742655604837751,"y":-2.283348366351561},{"x":4.71955903902051,"y":-2.3265590017599607},{"x":4.688476290462631,"y":-2.3644334404625624},{"x":4.65060185176003,"y":-2.395516189020441},{"x":4.60739121635163,"y":-2.4186127548376817},{"x":4.560504944723448,"y":-2.432835549842821},{"x":4.511744850000014,"y":-2.4376379999999926},{"x":4.46298475527658,"y":-2.432835549842821},{"x":4.416098483648398,"y":-2.4186127548376817},{"x":4.372887848239998,"y":-2.395516189020441},{"x":4.335013409537396,"y":-2.3644334404625624},{"x":4.303930660979518,"y":-2.3265590017599607},{"x":4.280834095162277,"y":-2.283348366351561},{"x":4.2666113001571375,"y":-2.236462094723379},{"x":4.261808849999966,"y":-2.1877019999999447},{"x":4.2666113001571375,"y":-2.1389419052765106},{"x":4.280834095162277,"y":-2.0920556336483287},{"x":4.303930660979518,"y":-2.048844998239929},{"x":4.335013409537396,"y":-2.010970559537327},{"x":4.372887848239998,"y":-1.9798878109794487},{"x":4.416098483648398,"y":-1.9567912451622078},{"x":4.46298475527658,"y":-1.9425684501570686},{"x":4.511744850000014,"y":-1.9377659999998968},{"x":4.560504944723448,"y":-1.9425684501570686},{"x":4.60739121635163,"y":-1.9567912451622078},{"x":4.65060185176003,"y":-1.9798878109794487},{"x":4.688476290462631,"y":-2.010970559537327},{"x":4.71955903902051,"y":-2.048844998239929},{"x":4.742655604837751,"y":-2.0920556336483287},{"x":4.75687839984289,"y":-2.1389419052765106},{"x":4.761680850000062,"y":-2.1877019999999447}]} strokeWidth="0.499999mm" />
    <courtyardoutline outline={[{"x":-4.429957349999995,"y":3.499980800000003},{"x":4.4299573499998814,"y":3.499980800000003},{"x":4.4299573499998814,"y":-3.50000620000003},{"x":-4.429957349999995,"y":-3.50000620000003},{"x":-4.429957349999995,"y":3.499980800000003}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C6186.obj?uuid=e80246a9471445bfb635be848806a22e",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C6186.step?uuid=e80246a9471445bfb635be848806a22e",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: -0.14002385000003414, y: -0.000012700000070253736, z: -0.049394 },
          }}
          {...props}
        />
      )
    }"
  `)
})
