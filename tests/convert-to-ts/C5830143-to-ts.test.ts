import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C5830143.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

it("should convert C5830143 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C5830143-to-ts-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [20, 20, 10],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
      pin3: ["pin3"]
    } as const

    export const PV36W502C01B00 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          symbol={
            <symbol>
              <port name="pin2" pinNumber={2} direction="up" schX={0} schY={0.22} schStemLength={0.2} />
              <schematiccircle center={{ x: 0.22, y: -0.12 }} radius={0.02} strokeWidth={0.02} color="#A00000" />
              <schematicpath points={[{"x":-0.04,"y":0.02},{"x":0,"y":-0.06},{"x":0.04,"y":0.02},{"x":-0.04,"y":0.02}]} strokeColor="#880000" />
              <port name="pin1" pinNumber={1} direction="right" schX={0.4} schY={-0.18} schStemLength={0.2} />
              <port name="pin3" pinNumber={3} direction="left" schX={-0.4} schY={-0.18} schStemLength={0.2} />
              <schematicpath points={[{"x":0,"y":0.02},{"x":0,"y":-0.06}]} strokeColor="#880000" />
              <schematicpath points={[{"x":0.18,"y":-0.26},{"x":0.2,"y":-0.18}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":0.12,"y":-0.1},{"x":0.18,"y":-0.26}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":0.08,"y":-0.26},{"x":0.12,"y":-0.1}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":0.02,"y":-0.1},{"x":0.08,"y":-0.26}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":-0.02,"y":-0.26},{"x":0.02,"y":-0.1}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":-0.06,"y":-0.1},{"x":-0.02,"y":-0.26}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":-0.12,"y":-0.26},{"x":-0.06,"y":-0.1}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":-0.16,"y":-0.1},{"x":-0.12,"y":-0.26}]} strokeColor="#8D2323" />
              <schematicpath points={[{"x":-0.2,"y":-0.18},{"x":-0.16,"y":-0.1}]} strokeColor="#8D2323" />
            </symbol>
          }
          supplierPartNumbers={{
      "jlcpcb": [
        "C5830143"
      ]
    }}
          manufacturerPartNumber="PV36W502C01B00"
          footprint={<footprint>
            <platedhole  portHints={["pin3"]} pcbX="0mm" pcbY="-2.54mm" outerDiameter="1.524mm" holeDiameter="0.762mm" shape="circle" />
    <platedhole  portHints={["pin1"]} pcbX="0mm" pcbY="2.54mm" outerDiameter="1.524mm" holeDiameter="0.762mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="0mm" outerDiameter="1.524mm" holeDiameter="0.762mm" shape="circle" />
    <silkscreenpath route={[{"x":1.2700000000000955,"y":2.8041600000000244},{"x":1.6510000000000673,"y":2.8041600000000244},{"x":2.032000000000039,"y":2.8041600000000244},{"x":1.6510000000000673,"y":2.8041600000000244}]} />
    <silkscreenpath route={[{"x":2.4500331999998934,"y":4.750130199999944},{"x":2.4500331999998934,"y":-4.749876199999903}]} />
    <silkscreenpath route={[{"x":2.4500331999998934,"y":4.750130199999944},{"x":-2.450033200000007,"y":4.750130199999944},{"x":-2.4999950000000126,"y":4.750130199999944},{"x":-2.4999950000000126,"y":4.255135000000109},{"x":-1.99999600000001,"y":4.255135000000109},{"x":-1.99999600000001,"y":-4.2548810000000685},{"x":-2.4999950000000126,"y":-4.2548810000000685},{"x":-2.4999950000000126,"y":-4.755210199999965},{"x":-2.450033200000007,"y":-4.755210199999965},{"x":2.4500331999998934,"y":-4.755210199999965}]} />
    <silkscreenpath route={[{"x":2.1894799999998895,"y":2.8041600000000244},{"x":2.1342393475166546,"y":3.0367786457468355},{"x":1.9837899300671324,"y":3.2225955901434418},{"x":1.7677545024702113,"y":3.325024385210668},{"x":1.5286693843237344,"y":3.32389730192574},{"x":1.3136092666155719,"y":3.2194362574779234},{"x":1.1649184351937265,"y":3.0322091208578286},{"x":1.1118733878856801,"y":2.7990800000001173},{"x":1.1649184351937265,"y":2.5659508791422923},{"x":1.3136092666155719,"y":2.3787237425220837},{"x":1.5286693843237344,"y":2.2742626980743808},{"x":1.7677545024702113,"y":2.273135614789453},{"x":1.9837899300671324,"y":2.3755644098565654},{"x":2.1342393475166546,"y":2.5613813542531716},{"x":2.1894799999998895,"y":2.7939999999999827}]} />
    <silkscreentext text="{NAME}" pcbX="-0.0127mm" pcbY="5.786122mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":0.9800081999999293,"y":2.7001216000001023},{"x":2.289987799999949,"y":2.7001216000001023},{"x":2.319985200000133,"y":2.7001216000001023},{"x":2.319985200000133,"y":2.9301186000000143},{"x":2.3141303231344637,"y":2.9442535231345346},{"x":2.2999953999999434,"y":2.9501083999999764},{"x":0.9999979999998914,"y":2.9501083999999764},{"x":0.9929215581765902,"y":2.953039558176556},{"x":0.9899903999998969,"y":2.960115999999971},{"x":0.9800081999999293,"y":2.7001216000001023}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":1.7599913999998762,"y":2.4101298000000497},{"x":1.9579880869573572,"y":2.49214271304254},{"x":2.040001000000075,"y":2.690139400000021},{"x":2.2999953999999434,"y":2.690139400000021},{"x":2.240514286653024,"y":2.4832901389642075},{"x":2.111862507792921,"y":2.310740611488427},{"x":1.9305949760869225,"y":2.1946944931333974},{"x":1.7200371999999788,"y":2.150084600000014},{"x":1.530045199999904,"y":2.150084600000014},{"x":1.3233828818424627,"y":2.1911948164574824},{"x":1.1481867480976007,"y":2.308266069822025},{"x":1.0311319757678348,"y":2.4834732155617303},{"x":0.9900411999998369,"y":2.690139400000021},{"x":0.9900412000000642,"y":2.690139400000021},{"x":0.9929633722294966,"y":2.6830719233151967},{"x":1.0000234000000319,"y":2.6801318000000265},{"x":1.2700254000001223,"y":2.6801318000000265},{"x":1.349098174398705,"y":2.4892205345610137},{"x":1.5400020000000723,"y":2.4101298000000497},{"x":1.7599913999998762,"y":2.4101298000000497}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":1.5500096000000667,"y":3.2101281999999856},{"x":1.352012913042472,"y":3.128115286957268},{"x":1.2699999999998681,"y":2.9301186000000143},{"x":1.0100056000001132,"y":2.9301186000000143},{"x":1.0695022437937496,"y":3.1369579318233036},{"x":1.1981635153069874,"y":3.309493832506064},{"x":1.379434088004814,"y":3.42552546304546},{"x":1.5899891999999909,"y":3.4701226000000815},{"x":1.7799812000000657,"y":3.4701226000000815},{"x":1.9866317842108856,"y":3.429017243074213},{"x":2.161821690267743,"y":3.3119590902678055},{"x":2.2788798430742645,"y":3.136769184210948},{"x":2.319985200000133,"y":2.9301186000000143},{"x":2.319985200000133,"y":2.9301186000000143},{"x":2.317054041823326,"y":2.9371950418233155},{"x":2.3099776000000247,"y":2.940126200000009},{"x":2.040001000000075,"y":2.940126200000009},{"x":1.9609192451339368,"y":3.1310464451339612},{"x":1.7699989999999843,"y":3.2101281999999856},{"x":1.5500096000000667,"y":3.2101281999999856}]} strokeWidth="0.254mm" />
    <courtyardoutline outline={[{"x":-2.7391999999999825,"y":5.036121999999978},{"x":2.713799999999992,"y":5.036121999999978},{"x":2.713799999999992,"y":-5.014277999999877},{"x":-2.7391999999999825,"y":-5.014277999999877},{"x":-2.7391999999999825,"y":5.036121999999978}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5830143.obj?uuid=752473762ce6496fb2b01ba2bcf1ecad",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C5830143.step?uuid=752473762ce6496fb2b01ba2bcf1ecad",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.000012699999956566899, y: -0.00013969999997698324, z: -0.000010000000000509601 },
          }}
          {...props}
        />
      )
    }"
  `)
})
