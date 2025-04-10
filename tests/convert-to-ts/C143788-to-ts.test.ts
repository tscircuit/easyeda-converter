
import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C143788.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"

it("should convert C143788 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  // Add more specific assertions here based on the component
  
  expect(result).toMatchInlineSnapshot(`
"import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["A"],
  pin2: ["C"],
  pin3: ["B"],
  pin4: ["pin4"],
  pin5: ["pin5"],
  pin7: ["pin7"],
  pin8: ["pin8"]
} as const

export const PEC11R_4020F_S0024 = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C143788"
  ]
}}
      manufacturerPartNumber="PEC11R_4020F_S0024"
      footprint={<footprint>
        <platedhole  portHints={["pin4"]} pcbX="-2.499867999999992mm" pcbY="7.24992199999997mm" outerDiameter="1.7999964mm" holeDiameter="1.1999975999999999mm" shape="circle" />
<platedhole  portHints={["pin5"]} pcbX="2.5001219999999194mm" pcbY="7.24992199999997mm" outerDiameter="1.7999964mm" holeDiameter="1.1999975999999999mm" shape="circle" />
<platedhole  portHints={["pin1"]} pcbX="-2.499867999999992mm" pcbY="-7.24992199999997mm" outerDiameter="1.7999964mm" holeDiameter="1.1999975999999999mm" shape="circle" />
<platedhole  portHints={["pin2"]} pcbX="0mm" pcbY="-7.24992199999997mm" outerDiameter="1.7999964mm" holeDiameter="1.1999975999999999mm" shape="circle" />
<platedhole  portHints={["pin3"]} pcbX="2.5001219999999194mm" pcbY="-7.24992199999997mm" outerDiameter="1.7999964mm" holeDiameter="1.1999975999999999mm" shape="circle" />
<platedhole  portHints={["pin7"]} pcbX="-5.700013999999896mm" pcbY="0.2499360000000479mm" outerHeight="3.7999924mm" outerWidth="2.3999951999999998mm" holeHeight="2.7999944mm" holeWidth="1.3999972mm" shape="pill" />
<platedhole  portHints={["pin8"]} pcbX="5.700013999999896mm" pcbY="0.2499360000000479mm" outerHeight="3.7999924mm" outerWidth="2.3999951999999998mm" holeHeight="2.7999944mm" holeWidth="1.3999972mm" shape="pill" />
<silkscreenpath route={[{"x":1.2699999999998681,"y":-1.0200386000000208},{"x":-1.2699999999999818,"y":-1.0200386000000208}]} />
<silkscreenpath route={[{"x":1.2699999999998681,"y":-1.0200386000000208},{"x":1.4332817052282962,"y":-1.2076764182418174},{"x":1.5690741964359631,"y":-1.4160733122407692},{"x":1.674773080614159,"y":-1.6412323937372548},{"x":1.7483511364296191,"y":-1.8788352889200723},{"x":1.7883971947339887,"y":-2.1243249614341266},{"x":1.7941432036757305,"y":-2.372993112748418},{"x":1.7654789593300393,"y":-2.620070483612153},{"x":1.702954219322578,"y":-2.860818324690399},{"x":1.6077681589119948,"y":-3.090619282043349},{"x":1.4817463717533883,"y":-3.305065954337806},{"x":1.327305856448902,"y":-3.5000454233320397},{"x":1.1474086604195008,"y":-3.6718181364083193},{"x":0.9455050701687924,"y":-3.8170896282459807},{"x":0.725467437505813,"y":-3.9330737060710135},{"x":0.49151591088775604,"y":-4.017545886638686},{"x":0.24813749629663562,"y":-4.068886060069531},{"x":0,"y":-4.086109562281422},{"x":-0.24813749629663562,"y":-4.068886060069531},{"x":-0.4915159108879834,"y":-4.017545886638686},{"x":-0.7254674375060404,"y":-3.9330737060710135},{"x":-0.9455050701690197,"y":-3.8170896282459807},{"x":-1.1474086604195008,"y":-3.6718181364083193},{"x":-1.327305856448902,"y":-3.5000454233320397},{"x":-1.481746371753502,"y":-3.305065954337806},{"x":-1.6077681589122221,"y":-3.090619282043349},{"x":-1.702954219322578,"y":-2.860818324690399},{"x":-1.765478959330153,"y":-2.620070483612153},{"x":-1.794143203675958,"y":-2.372993112748418},{"x":-1.7883971947341024,"y":-2.1243249614341266},{"x":-1.7483511364296191,"y":-1.8788352889200723},{"x":-1.6747730806142727,"y":-1.6412323937372548},{"x":-1.5690741964360768,"y":-1.4160733122407692},{"x":-1.43328170522841,"y":-1.2076764182418174},{"x":-1.2699999999999818,"y":-1.0200386000000208}]} />
      </footprint>}
      cadModel={{
        objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=fbc634f30cce46f0b7c3bdcee1371719&pn=C143788",
        rotationOffset: { x: 0, y: 0, z: 0 },
        positionOffset: { x: 0, y: 0, z: 0 },
      }}
      {...props}
    />
  )
}"
`)
})
it("C143788 should generate Circuit Json without errors", () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy)
  const svgOutput = convertCircuitJsonToPcbSvg(circuitJson)
  expect(svgOutput).toMatchSvgSnapshot(import.meta.path)
})