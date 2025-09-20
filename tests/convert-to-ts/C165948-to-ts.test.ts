
import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C165948.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

it("should convert C165948 into typescript file", async () => {
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
      pin1: ["EH2"],
      pin2: ["EH1"],
      pin3: ["EH4"],
      pin4: ["EH3"],
      pin5: ["B8"],
      pin6: ["A5"],
      pin7: ["B7"],
      pin8: ["A6"],
      pin9: ["A7"],
      pin10: ["B6"],
      pin11: ["A8"],
      pin12: ["B5"],
      pin13: ["A1B12"],
      pin14: ["B1A12"],
      pin15: ["B4A9"],
      pin16: ["A4B9"]
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
          manufacturerPartNumber="TYPE_C_31_M_12"
          footprint={<footprint>
            <hole pcbX="-2.8999180000000706mm" pcbY="0.9055671999999504mm" diameter="0.7500111999999999mm" />
    <hole pcbX="2.8999180000000706mm" pcbY="0.9055671999999504mm" diameter="0.7500111999999999mm" />
    <platedhole  portHints={["pin2"]} pcbX="4.32511199999999mm" pcbY="-2.7741307999999663mm" outerHeight="1.7999964mm" outerWidth="1.1999975999999999mm" holeHeight="1.3999972mm" holeWidth="0.7999983999999999mm" shape="pill" />
    <platedhole  portHints={["pin1"]} pcbX="4.32511199999999mm" pcbY="1.4056931999998596mm" outerHeight="1.9999959999999999mm" outerWidth="1.1999975999999999mm" holeHeight="1.5999968mm" holeWidth="0.7999983999999999mm" shape="pill" />
    <platedhole  portHints={["pin4"]} pcbX="-4.32511199999999mm" pcbY="1.4056931999998596mm" outerHeight="1.9999959999999999mm" outerWidth="1.1999975999999999mm" holeHeight="1.5999968mm" holeWidth="0.7999983999999999mm" shape="pill" />
    <platedhole  portHints={["pin3"]} pcbX="-4.32511199999999mm" pcbY="-2.7741307999999663mm" outerHeight="1.7999964mm" outerWidth="1.1999975999999999mm" holeHeight="1.3999972mm" holeWidth="0.7999983999999999mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-1.7500600000000759mm" pcbY="2.1740431999999146mm" width="0.29999939999999997mm" height="1.2999973999999999mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-1.2499339999999393mm" pcbY="2.1740431999999146mm" width="0.29999939999999997mm" height="1.2999973999999999mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-0.7500619999999572mm" pcbY="2.1740431999999146mm" width="0.29999939999999997mm" height="1.2999973999999999mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-0.2499359999999342mm" pcbY="2.1740431999999146mm" width="0.29999939999999997mm" height="1.2999973999999999mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="0.2499359999999342mm" pcbY="2.1740431999999146mm" width="0.29999939999999997mm" height="1.2999973999999999mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="0.7500619999999572mm" pcbY="2.1740431999999146mm" width="0.29999939999999997mm" height="1.2999973999999999mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="1.2496799999998984mm" pcbY="2.1740431999999146mm" width="0.29999939999999997mm" height="1.2999973999999999mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="1.7500600000000759mm" pcbY="2.1740431999999146mm" width="0.29999939999999997mm" height="1.2999973999999999mm" shape="rect" />
    <smtpad portHints={["pin13"]} points={[{x: "-2.8999688000000106mm", y: "1.5241079999999556mm"}, {x: "-2.8999688000000106mm", y: "2.824130799999921mm"}, {x: "-2.8999688000000106mm", y: "2.824130799999921mm"}, {x: "-3.199968199999944mm", y: "2.824130799999921mm"}, {x: "-3.199968199999944mm", y: "2.824130799999921mm"}, {x: "-3.199968199999944mm", y: "2.8239783999999872mm"}, {x: "-3.199968199999944mm", y: "2.8239783999999872mm"}, {x: "-3.499942199999964mm", y: "2.8239783999999872mm"}, {x: "-3.499942199999964mm", y: "2.8239783999999872mm"}, {x: "-3.499942199999964mm", y: "1.523955600000022mm"}, {x: "-3.499942199999964mm", y: "1.523955600000022mm"}, {x: "-3.199942799999917mm", y: "1.523955600000022mm"}, {x: "-3.199942799999917mm", y: "1.523955600000022mm"}, {x: "-3.199942799999917mm", y: "1.5241079999999556mm"}, {x: "-3.199942799999917mm", y: "1.5241079999999556mm"}, {x: "-2.8999688000000106mm", y: "1.5241079999999556mm"}]} shape="polygon" />
    <smtpad portHints={["pin14"]} points={[{x: "2.8999942000000374mm", y: "2.824130799999921mm"}, {x: "2.8999942000000374mm", y: "1.5241587999998956mm"}, {x: "2.8999942000000374mm", y: "1.5241587999998956mm"}, {x: "3.1999935999999707mm", y: "1.5241587999998956mm"}, {x: "3.1999935999999707mm", y: "1.5241587999998956mm"}, {x: "3.2000189999999975mm", y: "1.5241587999998956mm"}, {x: "3.2000189999999975mm", y: "1.5241587999998956mm"}, {x: "3.5000184000000445mm", y: "1.5241587999998956mm"}, {x: "3.5000184000000445mm", y: "1.5241587999998956mm"}, {x: "3.5000184000000445mm", y: "2.824130799999921mm"}, {x: "3.5000184000000445mm", y: "2.824130799999921mm"}, {x: "3.2000189999999975mm", y: "2.824130799999921mm"}, {x: "3.2000189999999975mm", y: "2.824130799999921mm"}, {x: "3.1999935999999707mm", y: "2.824130799999921mm"}, {x: "3.1999935999999707mm", y: "2.824130799999921mm"}, {x: "2.8999942000000374mm", y: "2.824130799999921mm"}]} shape="polygon" />
    <smtpad portHints={["pin15"]} points={[{x: "2.7001723999999285mm", y: "1.5241587999998956mm"}, {x: "2.7001723999999285mm", y: "2.824130799999921mm"}, {x: "2.7001723999999285mm", y: "2.824130799999921mm"}, {x: "2.4001729999999952mm", y: "2.824130799999921mm"}, {x: "2.4001729999999952mm", y: "2.824130799999921mm"}, {x: "2.4001475999999684mm", y: "2.824130799999921mm"}, {x: "2.4001475999999684mm", y: "2.824130799999921mm"}, {x: "2.100148200000035mm", y: "2.824130799999921mm"}, {x: "2.100148200000035mm", y: "2.824130799999921mm"}, {x: "2.100148200000035mm", y: "1.5241587999998956mm"}, {x: "2.100148200000035mm", y: "1.5241587999998956mm"}, {x: "2.4001475999999684mm", y: "1.5241587999998956mm"}, {x: "2.4001475999999684mm", y: "1.5241587999998956mm"}, {x: "2.4001729999999952mm", y: "1.5241587999998956mm"}, {x: "2.4001729999999952mm", y: "1.5241587999998956mm"}, {x: "2.7001723999999285mm", y: "1.5241587999998956mm"}]} shape="polygon" />
    <smtpad portHints={["pin16"]} points={[{x: "-2.099970399999961mm", y: "1.524006399999962mm"}, {x: "-2.099970399999961mm", y: "2.8239783999999872mm"}, {x: "-2.099970399999961mm", y: "2.8239783999999872mm"}, {x: "-2.399995199999921mm", y: "2.8239783999999872mm"}, {x: "-2.399995199999921mm", y: "2.8239783999999872mm"}, {x: "-2.399995199999921mm", y: "2.8239529999998467mm"}, {x: "-2.399995199999921mm", y: "2.8239529999998467mm"}, {x: "-2.6999437999999145mm", y: "2.8239529999998467mm"}, {x: "-2.6999437999999145mm", y: "2.8239529999998467mm"}, {x: "-2.6999437999999145mm", y: "1.5239809999999352mm"}, {x: "-2.6999437999999145mm", y: "1.5239809999999352mm"}, {x: "-2.3999189999999544mm", y: "1.5239809999999352mm"}, {x: "-2.3999189999999544mm", y: "1.5239809999999352mm"}, {x: "-2.3999189999999544mm", y: "1.524006399999962mm"}, {x: "-2.3999189999999544mm", y: "1.524006399999962mm"}, {x: "-2.099970399999961mm", y: "1.524006399999962mm"}]} shape="polygon" />
    <silkscreenpath route={[{"x":-4.4689776000000165,"y":-1.6757585999999947},{"x":-4.4689776000000165,"y":0.18715359999987413}]} />
    <silkscreenpath route={[{"x":4.471009600000116,"y":-5.394140800000059},{"x":-4.4689776000000165,"y":-5.394140800000059},{"x":-4.4689776000000165,"y":-3.91283820000001}]} />
    <silkscreenpath route={[{"x":4.471009600000116,"y":-1.676114200000029},{"x":4.471009600000116,"y":0.18750920000002225}]} />
    <silkscreenpath route={[{"x":4.471009600000116,"y":-5.394140800000059},{"x":4.471009600000116,"y":-3.912482600000203}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=617b05f9bba7410b96c001093d8189e4&pn=C165948",
            rotationOffset: { x: 0, y: 0, z: 180 },
            positionOffset: { x: 0, y: -1.4000416000000087, z: 1.8 },
          }}
          {...props}
        />
      )
    }"
  `)
})
