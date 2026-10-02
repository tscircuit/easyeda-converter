import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C8545.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"

it("imports C8545 as a native MOSFET with its original footprint", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(`${result}
    export default () => <board><A_2N7002 name="unnamed_chip1" channelType="n" mosfetMode="enhancement" /></board>
  `)
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C8545-oversized-symbol-repro",
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C8545-pcb",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps, MosfetProps } from "@tscircuit/props"

    const pinLabels = {
      "pin3": [
        "pin3",
        "D",
        "drain"
      ],
      "pin1": [
        "pin1",
        "G",
        "gate"
      ],
      "pin2": [
        "pin2",
        "S",
        "source"
      ]
    } as const

    type Props = Omit<MosfetProps, "connections"> & Pick<ChipProps<typeof pinLabels>, "connections">

    export const A_2N7002 = (props: Props) => {
      const { name, channelType, mosfetMode, connections, ...restProps } = props
      if ((channelType !== "n" && channelType !== "p") ||
          (mosfetMode !== "enhancement" && mosfetMode !== "depletion")) {
        throw new Error("MOSFET imports require explicit channelType and mosfetMode")
      }

      return (
        <mosfet
          name={name}
          channelType={channelType}
          mosfetMode={mosfetMode}
          symbol={{
    n: {
    enhancement: (<symbol>
    <schematicpath points={[{"x":-0.42,"y":-0.1},{"x":0.05,"y":-0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.3,"y":0.55},{"x":0.3,"y":0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.31,"y":-0.55},{"x":0.31,"y":-0.01}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.11},{"x":0.31,"y":0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.15},{"x":0.09,"y":0.07}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":-0.1},{"x":0.31,"y":-0.1}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":-0.08},{"x":0.09,"y":-0.15}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.03},{"x":0.09,"y":-0.04}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.27,"y":-0.04},{"x":0.27,"y":0.03},{"x":0.2,"y":0},{"x":0.27,"y":-0.04}]} isFilled={true} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0},{"x":0.31,"y":-0.01}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.05,"y":0.11},{"x":0.05,"y":-0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematiccircle center={{x: 0.16, y: 0}} radius={0.29} isFilled={false} strokeWidth={0.02} />
    <schematictext schX={0} schY={0.36} text={name} fontSize={0.18} anchor="center_right" />
    <schematictext schX={0} schY={-0.42} text="2N7002" fontSize={0.18} anchor="center_right" />
    <port name="pin3" pinNumber={3} aliases={["pin3","D","drain"]} schX={0.3} schY={0.55} direction="up" schStemLength={0} />
    <port name="pin1" pinNumber={1} aliases={["pin1","G","gate"]} schX={-0.42} schY={-0.1} direction="left" schStemLength={0} />
    <port name="pin2" pinNumber={2} aliases={["pin2","S","source"]} schX={0.31} schY={-0.55} direction="down" schStemLength={0} />
    </symbol>),
    depletion: (<symbol>
    <schematicpath points={[{"x":-0.42,"y":-0.1},{"x":0.05,"y":-0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.19},{"x":0.09,"y":-0.18}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.3,"y":0.55},{"x":0.3,"y":0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.31,"y":-0.55},{"x":0.31,"y":-0.01}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.11},{"x":0.31,"y":0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":-0.1},{"x":0.31,"y":-0.1}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.27,"y":-0.04},{"x":0.27,"y":0.03},{"x":0.2,"y":0},{"x":0.27,"y":-0.04}]} isFilled={true} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0},{"x":0.31,"y":-0.01}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.05,"y":0.17},{"x":0.05,"y":-0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematiccircle center={{x: 0.16, y: 0}} radius={0.29} isFilled={false} strokeWidth={0.02} />
    <schematictext schX={0} schY={0.36} text={name} fontSize={0.18} anchor="center_right" />
    <schematictext schX={0} schY={-0.42} text="2N7002" fontSize={0.18} anchor="center_right" />
    <port name="pin3" pinNumber={3} aliases={["pin3","D","drain"]} schX={0.3} schY={0.55} direction="up" schStemLength={0} />
    <port name="pin1" pinNumber={1} aliases={["pin1","G","gate"]} schX={-0.42} schY={-0.1} direction="left" schStemLength={0} />
    <port name="pin2" pinNumber={2} aliases={["pin2","S","source"]} schX={0.31} schY={-0.55} direction="down" schStemLength={0} />
    </symbol>)
    },
    p: {
    enhancement: (<symbol>
    <schematicpath points={[{"x":-0.42,"y":-0.1},{"x":0.05,"y":-0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.3,"y":0.55},{"x":0.3,"y":0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.31,"y":-0.55},{"x":0.31,"y":-0.01}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.11},{"x":0.31,"y":0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.15},{"x":0.09,"y":0.07}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":-0.1},{"x":0.31,"y":-0.1}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":-0.08},{"x":0.09,"y":-0.15}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.03},{"x":0.09,"y":-0.04}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.2,"y":0.03},{"x":0.2,"y":-0.04},{"x":0.27,"y":-0.01},{"x":0.2,"y":0.03}]} isFilled={true} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0},{"x":0.31,"y":-0.01}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.05,"y":0.11},{"x":0.05,"y":-0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematiccircle center={{x: 0.16, y: 0}} radius={0.29} isFilled={false} strokeWidth={0.02} />
    <schematictext schX={0} schY={0.36} text={name} fontSize={0.18} anchor="center_right" />
    <schematictext schX={0} schY={-0.42} text="2N7002" fontSize={0.18} anchor="center_right" />
    <port name="pin3" pinNumber={3} aliases={["pin3","D","drain"]} schX={0.3} schY={0.55} direction="up" schStemLength={0} />
    <port name="pin1" pinNumber={1} aliases={["pin1","G","gate"]} schX={-0.42} schY={-0.1} direction="left" schStemLength={0} />
    <port name="pin2" pinNumber={2} aliases={["pin2","S","source"]} schX={0.31} schY={-0.55} direction="down" schStemLength={0} />
    </symbol>),
    depletion: (<symbol>
    <schematicpath points={[{"x":-0.42,"y":-0.1},{"x":0.05,"y":-0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.19},{"x":0.09,"y":-0.18}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.3,"y":0.55},{"x":0.3,"y":0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.31,"y":-0.55},{"x":0.31,"y":-0.01}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0.11},{"x":0.31,"y":0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":-0.1},{"x":0.31,"y":-0.1}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.2,"y":0.03},{"x":0.2,"y":-0.04},{"x":0.27,"y":-0.01},{"x":0.2,"y":0.03}]} isFilled={true} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.09,"y":0},{"x":0.31,"y":-0.01}]} isFilled={false} strokeWidth={0.02} />
    <schematicpath points={[{"x":0.05,"y":0.17},{"x":0.05,"y":-0.11}]} isFilled={false} strokeWidth={0.02} />
    <schematiccircle center={{x: 0.16, y: 0}} radius={0.29} isFilled={false} strokeWidth={0.02} />
    <schematictext schX={0} schY={0.36} text={name} fontSize={0.18} anchor="center_right" />
    <schematictext schX={0} schY={-0.42} text="2N7002" fontSize={0.18} anchor="center_right" />
    <port name="pin3" pinNumber={3} aliases={["pin3","D","drain"]} schX={0.3} schY={0.55} direction="up" schStemLength={0} />
    <port name="pin1" pinNumber={1} aliases={["pin1","G","gate"]} schX={-0.42} schY={-0.1} direction="left" schStemLength={0} />
    <port name="pin2" pinNumber={2} aliases={["pin2","S","source"]} schX={0.31} schY={-0.55} direction="down" schStemLength={0} />
    </symbol>)
    }
    }[channelType][mosfetMode]}
          supplierPartNumbers={{
      "jlcpcb": [
        "C8545"
      ]
    }}
          manufacturerPartNumber="2N7002"
          footprint={<footprint>
            <smtpad portHints={["pin1","G","gate"]} pcbX="0.999998mm" pcbY="-0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin2","S","source"]} pcbX="0.999998mm" pcbY="0.94996mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <smtpad portHints={["pin3","D","drain"]} pcbX="-0.999998mm" pcbY="0mm" width="0.999998mm" height="0.6500114mm" shape="rect" />
    <silkscreenpath route={[{"x":0.726211400000011,"y":1.5262098000000606},{"x":-0.726211400000011,"y":1.5262098000000606},{"x":-0.726211400000011,"y":0.49458879999997407}]} />
    <silkscreenpath route={[{"x":0.726211400000011,"y":-1.5262097999999469},{"x":-0.726211400000011,"y":-1.5262097999999469},{"x":-0.726211400000011,"y":-0.49458879999997407}]} />
    <silkscreenpath route={[{"x":0.726211400000011,"y":0.45539659999997184},{"x":0.726211400000011,"y":-0.45539659999985815}]} />
    <silkscreentext text="{NAME}" pcbX="0.0254mm" pcbY="2.524mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-1.7499969999998939,"y":1.6999844000000621},{"x":1.7499969999998939,"y":1.6999844000000621},{"x":1.7499969999998939,"y":-1.7000097999999753},{"x":-1.7499969999998939,"y":-1.7000097999999753},{"x":-1.7499969999998939,"y":1.6999844000000621}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C8545.obj?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C8545.step?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
            pcbRotationOffset: 180,
            modelOriginPosition: { x: 0.000012700000070253736, y: -0.000012699999956566899, z: 0.050795 },
          }}
          {...restProps}
        >
          {Object.entries(connections ?? {}).flatMap(([pin, targets]) =>
            (typeof targets === "string" ? [targets] : targets ?? []).map((target, index) => (
              <trace key={\`\${pin}-\${index}\`} from={\`.\${name} > .\${pin}\`} to={target} />
            ))
          )}
        </mosfet>
      )
    }"
  `)
}, 15_000)
