import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C7203002.raweasy.json"
import { convertBetterEasyToTsx } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

declare module "bun:test" {
  interface Matchers<T = unknown> {
    toMatchInlineSnapshot(snapshot?: string | null): Promise<MatcherResult>
  }
}

it("should convert C7203002 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  expect(result).toMatchInlineSnapshot(`
"import { createUseComponent } from "@tscircuit/core"
import type { CommonLayoutProps } from "@tscircuit/props"

const pinLabels = {
  "pin1": [
    "pin1",
    "GP0"
  ],
  "pin2": [
    "pin2",
    "GP1"
  ],
  "pin3": [
    "pin3",
    "GND8"
  ],
  "pin4": [
    "pin4",
    "GP2"
  ],
  "pin5": [
    "pin5",
    "GP3"
  ],
  "pin6": [
    "pin6",
    "GP4"
  ],
  "pin7": [
    "pin7",
    "GP5"
  ],
  "pin8": [
    "pin8",
    "GND6"
  ],
  "pin9": [
    "pin9",
    "GP6"
  ],
  "pin10": [
    "pin10",
    "GP7"
  ],
  "pin11": [
    "pin11",
    "GP8"
  ],
  "pin12": [
    "pin12",
    "GP9"
  ],
  "pin13": [
    "pin13",
    "GND4"
  ],
  "pin14": [
    "pin14",
    "GP10"
  ],
  "pin15": [
    "pin15",
    "GP11"
  ],
  "pin16": [
    "pin16",
    "GP12"
  ],
  "pin17": [
    "pin17",
    "GP13"
  ],
  "pin18": [
    "pin18",
    "GND2"
  ],
  "pin19": [
    "pin19",
    "GP14"
  ],
  "pin20": [
    "pin20",
    "GP15"
  ],
  "pin21": [
    "pin21",
    "GP16"
  ],
  "pin22": [
    "pin22",
    "GP17"
  ],
  "pin23": [
    "pin23",
    "GND1"
  ],
  "pin24": [
    "pin24",
    "GP18"
  ],
  "pin25": [
    "pin25",
    "GP19"
  ],
  "pin26": [
    "pin26",
    "GP20"
  ],
  "pin27": [
    "pin27",
    "GP21"
  ],
  "pin28": [
    "pin28",
    "GND3"
  ],
  "pin29": [
    "pin29",
    "GP22"
  ],
  "pin30": [
    "pin30",
    "RUN"
  ],
  "pin31": [
    "pin31",
    "GP26"
  ],
  "pin32": [
    "pin32",
    "GP27"
  ],
  "pin33": [
    "pin33",
    "GND5"
  ],
  "pin34": [
    "pin34",
    "GP28"
  ],
  "pin35": [
    "pin35",
    "ADC_VREF"
  ],
  "pin36": [
    "pin36"
  ],
  "pin37": [
    "pin37",
    "3V3_EN"
  ],
  "pin38": [
    "pin38",
    "GND7"
  ],
  "pin39": [
    "pin39",
    "VSYS"
  ],
  "pin40": [
    "pin40",
    "VBUS"
  ],
  "pin41": [
    "pin41",
    "SWCLK"
  ],
  "pin42": [
    "pin42",
    "GND9"
  ],
  "pin43": [
    "pin43",
    "SWDIO"
  ],
  "pin44": [
    "pin44",
    "TP1"
  ],
  "pin45": [
    "pin45",
    "TP2"
  ],
  "pin46": [
    "pin46",
    "TP3"
  ],
  "pin47": [
    "pin47",
    "TP4"
  ],
  "pin48": [
    "pin48",
    "TP5"
  ],
  "pin49": [
    "pin49",
    "TP6"
  ]
} as const

interface Props extends CommonLayoutProps {
  name: string
}

export const PICO = (props: Props) => {
  return (
    <chip
      {...props}
      
      pinLabels={pinLabels}
      supplierPartNumbers={{
  "jlcpcb": [
    "C7203002"
  ]
}}
      manufacturerPartNumber="PICO"
      footprint={<footprint>
        <smtpad portHints={["pin21"]} pcbX="23.3898757500001mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin20"]} pcbX="23.3898757500001mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin22"]} pcbX="20.849875750000024mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin19"]} pcbX="20.849875750000024mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin23"]} pcbX="18.30987575000006mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin18"]} pcbX="18.30987575000006mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin24"]} pcbX="15.769875750000097mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin17"]} pcbX="15.769875750000097mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin25"]} pcbX="13.22987575000002mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin16"]} pcbX="13.22987575000002mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin26"]} pcbX="10.689875750000056mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin15"]} pcbX="10.689875750000056mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin27"]} pcbX="8.149875750000092mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin14"]} pcbX="8.149875750000092mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin28"]} pcbX="5.609875750000015mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin13"]} pcbX="5.609875750000015mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin29"]} pcbX="3.069875750000051mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin12"]} pcbX="3.069875750000051mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin30"]} pcbX="0.5298757500000875mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin11"]} pcbX="0.5298757500000875mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin31"]} pcbX="-2.01012424999999mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin10"]} pcbX="-2.01012424999999mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin32"]} pcbX="-4.5501242499999535mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin9"]} pcbX="-4.5501242499999535mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin33"]} pcbX="-7.090124249999917mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin8"]} pcbX="-7.090124249999917mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin34"]} pcbX="-9.630124249999994mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin7"]} pcbX="-9.630124249999994mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin35"]} pcbX="-12.170124249999958mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin6"]} pcbX="-12.170124249999958mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin36"]} pcbX="-14.710124249999922mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin5"]} pcbX="-14.710124249999922mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin37"]} pcbX="-17.25012425mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin4"]} pcbX="-17.25012425mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin38"]} pcbX="-19.790124249999963mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin3"]} pcbX="-19.790124249999963mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin39"]} pcbX="-22.330124249999926mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin2"]} pcbX="-22.330124249999926mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin40"]} pcbX="-24.870124250000003mm" pcbY="10.087356mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin1"]} pcbX="-24.870124250000003mm" pcbY="-10.087355999999886mm" width="1.5999967999999998mm" height="3.1999935999999995mm" shape="rect" />
<smtpad portHints={["pin41"]} pcbX="24.18997575000003mm" pcbY="-2.5399999999999636mm" width="3.1999935999999995mm" height="1.5999967999999998mm" shape="rect" />
<smtpad portHints={["pin42"]} pcbX="24.18997575000003mm" pcbY="1.1368683772161603e-13mm" width="3.1999935999999995mm" height="1.5999967999999998mm" shape="rect" />
<smtpad portHints={["pin43"]} pcbX="24.18997575000003mm" pcbY="2.5400000000000773mm" width="3.1999935999999995mm" height="1.5999967999999998mm" shape="rect" />
<smtpad portHints={["pin44"]} pcbX="-21.739980649999893mm" pcbY="-0.00005079999993995443mm" width="1.499997mm" height="1.499997mm" shape="rect" />
<smtpad portHints={["pin45"]} pcbX="-25.039974049999955mm" pcbY="0.999998000000005mm" width="1.499997mm" height="1.499997mm" shape="rect" />
<smtpad portHints={["pin46"]} pcbX="-25.039974049999955mm" pcbY="-0.9999979999998914mm" width="1.499997mm" height="1.499997mm" shape="rect" />
<smtpad portHints={["pin47"]} pcbX="-18.239987649999875mm" pcbY="-2.4999950000000126mm" width="1.499997mm" height="1.499997mm" shape="rect" />
<smtpad portHints={["pin48"]} pcbX="-15.612967249999883mm" pcbY="-2.4999950000000126mm" width="1.499997mm" height="1.499997mm" shape="rect" />
<smtpad portHints={["pin49"]} pcbX="-13.239997649999964mm" pcbY="-2.4999950000000126mm" width="1.499997mm" height="1.499997mm" shape="rect" />
<silkscreenpath route={[{"x":24.4210903500001,"y":-10.49997899999994},{"x":24.759926350000114,"y":-10.49997899999994},{"x":24.759926350000114,"y":-3.571163800000022}]} />
<silkscreenpath route={[{"x":24.759926350000114,"y":3.5710368000000017},{"x":24.759926350000114,"y":10.499979000000053},{"x":24.4210903500001,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":24.759926350000114,"y":1.0310368000001517},{"x":24.759926350000114,"y":1.5088362000001325}]} />
<silkscreenpath route={[{"x":24.759926350000114,"y":-1.5089631999999256},{"x":24.759926350000114,"y":-1.0311637999999448}]} />
<silkscreenpath route={[{"x":-25.901059449999934,"y":10.499852000000033},{"x":-26.23981924999987,"y":10.499852000000033}]} />
<silkscreenpath route={[{"x":-26.239997049999943,"y":10.499979000000053},{"x":-26.239997049999943,"y":-10.49997899999994},{"x":-25.901161049999814,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-27.539842049999834,"y":3.999534799999992},{"x":-27.139665049999962,"y":3.999534799999992},{"x":-27.139665049999962,"y":-4.000347599999941},{"x":-27.539842049999834,"y":-4.000347599999941}]} />
<silkscreenpath route={[{"x":-27.139665049999962,"y":-3.8090347999998357},{"x":-26.26529544999994,"y":-3.8090347999998357},{"x":-26.23981924999987,"y":-3.834460199999967}]} />
<silkscreenpath route={[{"x":-27.139665049999962,"y":3.802405399999998},{"x":-26.23981924999987,"y":3.802405399999998}]} />
<silkscreenpath route={[{"x":-27.539842049999834,"y":3.999534799999992},{"x":-27.539842049999834,"y":-4.000347599999941}]} />
<silkscreenpath route={[{"x":-23.361161049999964,"y":10.499979000000053},{"x":-23.838909649999778,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":-20.821161049999887,"y":10.499979000000053},{"x":-21.298909649999928,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":-18.28116104999981,"y":10.499979000000053},{"x":-18.75890964999985,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":-15.74116104999996,"y":10.499979000000053},{"x":-16.218909649999887,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":-13.201161049999882,"y":10.499979000000053},{"x":-13.678909649999923,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":-10.661161049999805,"y":10.499979000000053},{"x":-11.138909649999846,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":-8.121161049999955,"y":10.499979000000053},{"x":-8.598909649999996,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":-5.581161049999878,"y":10.499979000000053},{"x":-6.058909649999919,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":-3.0411610499998005,"y":10.499979000000053},{"x":-3.5189096499998413,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":-0.5011610499999506,"y":10.499979000000053},{"x":-0.9789096499999914,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":2.0388389500001267,"y":10.499979000000053},{"x":1.561090350000086,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":4.578838950000204,"y":10.499979000000053},{"x":4.101090350000163,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":7.118838950000054,"y":10.499979000000053},{"x":6.641090350000013,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":9.658838950000131,"y":10.499979000000053},{"x":9.18109035000009,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":12.198838950000209,"y":10.499979000000053},{"x":11.721090350000168,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":14.738838950000059,"y":10.499979000000053},{"x":14.261090350000018,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":17.278838950000136,"y":10.499979000000053},{"x":16.801090350000095,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":19.818838950000213,"y":10.499979000000053},{"x":19.341090350000172,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":22.358838950000063,"y":10.499979000000053},{"x":21.881090350000022,"y":10.499979000000053}]} />
<silkscreenpath route={[{"x":21.881090350000022,"y":-10.49997899999994},{"x":22.358838950000063,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":19.341090350000172,"y":-10.49997899999994},{"x":19.818838950000213,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":16.801090350000095,"y":-10.49997899999994},{"x":17.278838950000136,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":14.261090350000018,"y":-10.49997899999994},{"x":14.738838950000059,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":11.721090350000168,"y":-10.49997899999994},{"x":12.198838950000209,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":9.18109035000009,"y":-10.49997899999994},{"x":9.658838950000131,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":6.641090350000013,"y":-10.49997899999994},{"x":7.118838950000054,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":4.101090350000163,"y":-10.49997899999994},{"x":4.578838950000204,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":1.561090350000086,"y":-10.49997899999994},{"x":2.0388389500001267,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-0.9789096499999914,"y":-10.49997899999994},{"x":-0.5011610499999506,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-3.5189096499998413,"y":-10.49997899999994},{"x":-3.0411610499998005,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-6.058909649999919,"y":-10.49997899999994},{"x":-5.581161049999878,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-8.598909649999996,"y":-10.49997899999994},{"x":-8.121161049999955,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-11.138909649999846,"y":-10.49997899999994},{"x":-10.661161049999805,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-13.678909649999923,"y":-10.49997899999994},{"x":-13.201161049999882,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-16.218909649999887,"y":-10.49997899999994},{"x":-15.74116104999996,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-18.75890964999985,"y":-10.49997899999994},{"x":-18.28116104999981,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-21.298909649999928,"y":-10.49997899999994},{"x":-20.821161049999887,"y":-10.49997899999994}]} />
<silkscreenpath route={[{"x":-23.838909649999778,"y":-10.49997899999994},{"x":-23.361161049999964,"y":-10.49997899999994}]} />
      </footprint>}
    />
  )
}

export const usePICO = createUseComponent(PICO, pinLabels)"
`)
})
