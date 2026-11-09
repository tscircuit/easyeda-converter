import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C490691.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C490691 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )
  const noConnectPort = sourcePorts.find((element) => element.pin_number === 8)

  expect(noConnectPort?.do_not_connect).toBe(true)
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["TXD"],
      pin2: ["N_DTR"],
      pin3: ["N_RTS"],
      pin4: ["VCCIO"],
      pin5: ["RXD"],
      pin6: ["N_RI"],
      pin7: ["GND1"],
      pin8: ["NC1"],
      pin9: ["N_DSR"],
      pin10: ["N_DCD"],
      pin11: ["N_CTS"],
      pin12: ["CBUS4"],
      pin13: ["CBUS2"],
      pin14: ["CBUS3"],
      pin15: ["USBDP"],
      pin16: ["USBDM"],
      pin17: ["3V3OUT"],
      pin18: ["GND3"],
      pin19: ["N_RESET"],
      pin20: ["VCC"],
      pin21: ["GND2"],
      pin22: ["CBUS1"],
      pin23: ["CBUS0"],
      pin24: ["NC2"],
      pin25: ["AGND"],
      pin26: ["TEST"],
      pin27: ["OSCI"],
      pin28: ["OSCO"]
    } as const

    const pinAttributes = {
      pin7: {requiresGround: true},
      pin8: {doNotConnect: true},
      pin18: {requiresGround: true},
      pin20: {requiresPower: true},
      pin21: {requiresGround: true},
      pin24: {doNotConnect: true},
      pin25: {requiresGround: true}
    } as const

    export const FT232RL = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C490691"
      ]
    }}
          manufacturerPartNumber="FT232RL"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-3.455162mm" pcbY="4.225036mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-3.455162mm" pcbY="3.57505mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-3.455162mm" pcbY="2.925064mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-3.455162mm" pcbY="2.275078mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-3.455162mm" pcbY="1.625092mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="-3.455162mm" pcbY="0.975106mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-3.455162mm" pcbY="0.324866mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="-3.455162mm" pcbY="-0.32512mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="-3.455162mm" pcbY="-0.975106mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="-3.455162mm" pcbY="-1.625092mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="-3.455162mm" pcbY="-2.275078mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="-3.455162mm" pcbY="-2.925064mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="-3.455162mm" pcbY="-3.57505mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="-3.455162mm" pcbY="-4.225036mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin28"]} pcbX="3.455162mm" pcbY="4.225036mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin27"]} pcbX="3.455162mm" pcbY="3.57505mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin26"]} pcbX="3.455162mm" pcbY="2.925064mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin25"]} pcbX="3.455162mm" pcbY="2.275078mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="3.455162mm" pcbY="1.625092mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="3.455162mm" pcbY="0.975106mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="3.455162mm" pcbY="0.324866mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="3.455162mm" pcbY="-0.32512mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="3.455162mm" pcbY="-0.975106mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="3.455162mm" pcbY="-1.625092mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="3.455162mm" pcbY="-2.275078mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="3.455162mm" pcbY="-2.925064mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="3.455162mm" pcbY="-3.57505mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="3.455162mm" pcbY="-4.225036mm" width="2.01549mm" height="0.3640074mm" radius="0.1820037mm" shape="pill" />
    <silkscreenpath route={[{"x":2.199869,"y":-5.08},{"x":-2.159,"y":-5.08}]} />
    <silkscreenpath route={[{"x":-0.643992,"y":5.08},{"x":-2.199996,"y":5.08}]} />
    <silkscreenpath route={[{"x":0.635,"y":5.08},{"x":2.199869,"y":5.08}]} />
    <silkscreenpath route={[{"x":2.199869,"y":5.08},{"x":2.199869,"y":-5.08}]} />
    <silkscreenpath route={[{"x":-2.199996,"y":5.08},{"x":-2.199996,"y":-5.08}]} />
    <silkscreenpath route={[{"x":-0.643992,"y":5.08},{"x":-0.595313,"y":4.835276},{"x":-0.456688,"y":4.627808},{"x":-0.24922,"y":4.489183},{"x":-0.004496,"y":4.440504},{"x":0.240229,"y":4.489183},{"x":0.447696,"y":4.627808},{"x":0.586321,"y":4.835276},{"x":0.635,"y":5.08}]} />
    <silkscreentext text="{NAME}" pcbX="5.2926mm" pcbY="0mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":4.712907,"y":5.34999},{"x":4.712907,"y":-5.34999},{"x":-4.712907,"y":-5.34999},{"x":-4.712907,"y":5.34999},{"x":4.712907,"y":5.34999}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C490691.obj?uuid=f6684975c608438e85ae4e120e588908",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C490691.step?uuid=f6684975c608438e85ae4e120e588908",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 0, y: 0, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
