import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C7203002.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C7203002 into typescript file", async () => {
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
      pin1: ["GP0"],
      pin2: ["GP1"],
      pin3: ["GND8"],
      pin4: ["GP2"],
      pin5: ["GP3"],
      pin6: ["GP4"],
      pin7: ["GP5"],
      pin8: ["GND6"],
      pin9: ["GP6"],
      pin10: ["GP7"],
      pin11: ["GP8"],
      pin12: ["GP9"],
      pin13: ["GND4"],
      pin14: ["GP10"],
      pin15: ["GP11"],
      pin16: ["GP12"],
      pin17: ["GP13"],
      pin18: ["GND2"],
      pin19: ["GP14"],
      pin20: ["GP15"],
      pin21: ["GP16"],
      pin22: ["GP17"],
      pin23: ["GND1"],
      pin24: ["GP18"],
      pin25: ["GP19"],
      pin26: ["GP20"],
      pin27: ["GP21"],
      pin28: ["GND3"],
      pin29: ["GP22"],
      pin30: ["RUN"],
      pin31: ["GP26"],
      pin32: ["GP27"],
      pin33: ["GND5"],
      pin34: ["GP28"],
      pin35: ["ADC_VREF"],
      pin36: ["pin36"],
      pin37: ["3V3_EN"],
      pin38: ["GND7"],
      pin39: ["VSYS"],
      pin40: ["VBUS"],
      pin41: ["SWCLK"],
      pin42: ["GND9"],
      pin43: ["SWDIO"],
      pin44: ["TP1"],
      pin45: ["TP2"],
      pin46: ["TP3"],
      pin47: ["TP4"],
      pin48: ["TP5"],
      pin49: ["TP6"]
    } as const

    const pinAttributes = {
      pin3: {requiresGround: true},
      pin8: {requiresGround: true},
      pin13: {requiresGround: true},
      pin18: {requiresGround: true},
      pin23: {requiresGround: true},
      pin28: {requiresGround: true},
      pin33: {requiresGround: true},
      pin38: {requiresGround: true},
      pin42: {requiresGround: true}
    } as const

    export const PICO = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C7203002"
      ]
    }}
          manufacturerPartNumber="PICO"
          footprint={<footprint>
            <smtpad portHints={["pin21"]} pcbX="23.38987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin20"]} pcbX="23.38987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin22"]} pcbX="20.84987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin19"]} pcbX="20.84987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin23"]} pcbX="18.30987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin18"]} pcbX="18.30987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin24"]} pcbX="15.76987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin17"]} pcbX="15.76987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin25"]} pcbX="13.22987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin16"]} pcbX="13.22987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin26"]} pcbX="10.68987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin15"]} pcbX="10.68987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin27"]} pcbX="8.14987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin14"]} pcbX="8.14987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin28"]} pcbX="5.60987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin13"]} pcbX="5.60987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin29"]} pcbX="3.06987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="3.06987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin30"]} pcbX="0.52987575mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="0.52987575mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin31"]} pcbX="-2.01012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-2.01012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin32"]} pcbX="-4.55012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="-4.55012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin33"]} pcbX="-7.09012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="-7.09012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin34"]} pcbX="-9.63012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="-9.63012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin35"]} pcbX="-12.17012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="-12.17012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin36"]} pcbX="-14.71012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="-14.71012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin37"]} pcbX="-17.25012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="-17.25012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin38"]} pcbX="-19.79012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="-19.79012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin39"]} pcbX="-22.33012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-22.33012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin40"]} pcbX="-24.87012425mm" pcbY="10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin1"]} pcbX="-24.87012425mm" pcbY="-10.087356mm" width="1.5999968mm" height="3.1999936mm" shape="rect" />
    <smtpad portHints={["pin41"]} pcbX="24.18997575mm" pcbY="-2.54mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin42"]} pcbX="24.18997575mm" pcbY="0mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin43"]} pcbX="24.18997575mm" pcbY="2.54mm" width="3.1999936mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin44"]} pcbX="-21.73998065mm" pcbY="-0.0000508mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin45"]} pcbX="-25.03997405mm" pcbY="0.999998mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin46"]} pcbX="-25.03997405mm" pcbY="-0.999998mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin47"]} pcbX="-18.23998765mm" pcbY="-2.499995mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin48"]} pcbX="-15.61296725mm" pcbY="-2.499995mm" width="1.499997mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin49"]} pcbX="-13.23999765mm" pcbY="-2.499995mm" width="1.499997mm" height="1.499997mm" shape="rect" />
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
    <silkscreencircle pcbX="-24.88993625mm" pcbY="-12.500102mm" radius="0.249936mm" />
    <silkscreencircle pcbX="22.60984175mm" pcbY="5.499862mm" radius="0.8001mm" />
    <silkscreencircle pcbX="22.60984175mm" pcbY="5.499862mm" radius="1.400048mm" />
    <silkscreencircle pcbX="22.60984175mm" pcbY="-5.500116mm" radius="0.8001mm" />
    <silkscreencircle pcbX="22.60984175mm" pcbY="-5.500116mm" radius="1.400048mm" />
    <silkscreencircle pcbX="-24.09009025mm" pcbY="5.499862mm" radius="1.400048mm" />
    <silkscreencircle pcbX="-24.09009025mm" pcbY="5.499862mm" radius="0.8001mm" />
    <silkscreencircle pcbX="-24.09009025mm" pcbY="-5.500116mm" radius="1.400048mm" />
    <silkscreencircle pcbX="-24.09009025mm" pcbY="-5.500116mm" radius="0.8001mm" />
    <silkscreentext text="{NAME}" pcbX="-0.93773625mm" pcbY="12.687048mm" anchorAlignment="center" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-25.901186449999955,"y":10.372928200000047},{"x":-26.239997049999943,"y":10.372928200000047},{"x":-26.11299704999999,"y":10.4999282},{"x":-26.239997049999943,"y":10.626928200000066},{"x":-25.901186449999955,"y":10.626928200000066},{"x":-26.02818645000002,"y":10.4999282},{"x":-25.901186449999955,"y":10.372928200000047}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":-26.239997049999943,"y":-3.961129999999912},{"x":-26.28017330257751,"y":-3.954603834750401},{"x":-26.316222449999827,"y":-3.935704600000008},{"x":-27.139995249999856,"y":-3.935704600000008},{"x":-27.229797811210574,"y":-3.8985071612106594},{"x":-27.266995249999923,"y":-3.8087046000000555},{"x":-27.229797811210574,"y":-3.718902038789338},{"x":-27.139995249999856,"y":-3.681704599999989},{"x":-26.265371649999906,"y":-3.681704599999989},{"x":-26.21677951467143,"y":-3.6913690250778473},{"x":-26.17558264999991,"y":-3.7188902000000326},{"x":-26.15018264999992,"y":-3.744290200000023},{"x":-26.122644301969558,"y":-3.785496432136597},{"x":-26.11297164999985,"y":-3.8341045999999324},{"x":-26.150174296201953,"y":-3.923927353797808},{"x":-26.239997049999943,"y":-3.9611300000000256},{"x":-26.239997049999943,"y":-3.961129999999912}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":-26.11281925000003,"y":10.499572599999965},{"x":-26.11281925000003,"y":-10.373461600000041},{"x":-25.901034049999907,"y":-10.373461600000041},{"x":-26.028034049999974,"y":-10.500461599999994},{"x":-25.901034049999907,"y":-10.627461599999947},{"x":-26.239819249999982,"y":-10.627461599999947},{"x":-26.3296218112107,"y":-10.590264161210598},{"x":-26.36681925000005,"y":-10.500461599999994},{"x":-26.36681925000005,"y":10.499572599999965},{"x":-26.239819249999982,"y":10.372572599999899},{"x":-26.11281925000003,"y":10.499572599999965}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":-27.139995249999856,"y":3.929735599999958},{"x":-26.239997049999943,"y":3.929735599999958},{"x":-26.36699705000001,"y":3.8027356000000054},{"x":-26.239997049999943,"y":3.675735599999939},{"x":-27.139995249999856,"y":3.675735599999939},{"x":-27.012995249999904,"y":3.8027356000000054},{"x":-27.139995249999856,"y":3.929735599999958}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":-27.41299444999993,"y":3.9999412000000802},{"x":-27.41299444999993,"y":-4.00004279999996},{"x":-27.53999444999988,"y":-3.8730427999998938},{"x":-27.666994449999834,"y":-4.00004279999996},{"x":-27.666994449999834,"y":3.9999412000000802},{"x":-27.53999444999988,"y":3.872941200000014},{"x":-27.41299444999993,"y":3.9999412000000802}]} strokeWidth="0.254mm" />
    <fabricationnotepath route={[{"x":-27.53999444999988,"y":4.126941200000033},{"x":-27.139995249999856,"y":4.126941200000033},{"x":-27.050192688789252,"y":4.089743761210798},{"x":-27.012995249999904,"y":3.9999412000000802},{"x":-27.012995249999904,"y":-4.00004279999996},{"x":-27.050192688789252,"y":-4.089845361210678},{"x":-27.139995249999856,"y":-4.127042799999913},{"x":-27.53999444999988,"y":-4.127042799999913},{"x":-27.41299444999993,"y":-4.00004279999996},{"x":-27.53999444999988,"y":-3.8730427999998938},{"x":-27.266995249999923,"y":-3.8730427999998938},{"x":-27.266995249999923,"y":3.872941200000014},{"x":-27.53999444999988,"y":3.872941200000014},{"x":-27.41299444999993,"y":3.9999412000000802},{"x":-27.53999444999988,"y":4.126941200000033}]} strokeWidth="0.254mm" />
    <courtyardoutline outline={[{"x":-27.92123624999988,"y":11.937048000000118},{"x":26.045763750000106,"y":11.937048000000118},{"x":26.045763750000106,"y":-12.997751999999764},{"x":-27.92123624999988,"y":-12.997751999999764},{"x":-27.92123624999988,"y":11.937048000000118}]} />
          </footprint>}
          
          {...props}
        />
      )
    }"
  `)
}, 10000)
