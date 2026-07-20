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
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["TXD"],
      pin2: ["DTR"],
      pin3: ["RTS"],
      pin4: ["VCCIO"],
      pin5: ["RXD"],
      pin6: ["RI"],
      pin7: ["GND1"],
      pin8: ["NC1"],
      pin9: ["DSR"],
      pin10: ["DCD"],
      pin11: ["CTS"],
      pin12: ["CBUS4"],
      pin13: ["CBUS2"],
      pin14: ["CBUS3"],
      pin15: ["USBDP"],
      pin16: ["USBDM"],
      pin17: ["3V3OUT"],
      pin18: ["GND3"],
      pin19: ["RESET"],
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

    export const FT232RL = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C490691"
      ]
    }}
          manufacturerPartNumber="FT232RL"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-4.225036mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin2"]} pcbX="-3.57505mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin3"]} pcbX="-2.925064mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin4"]} pcbX="-2.275078mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin5"]} pcbX="-1.625092mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin6"]} pcbX="-0.975106mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin7"]} pcbX="-0.324866mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin8"]} pcbX="0.32512mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin9"]} pcbX="0.975106mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin10"]} pcbX="1.625092mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin11"]} pcbX="2.275078mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin12"]} pcbX="2.925064mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin13"]} pcbX="3.57505mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin14"]} pcbX="4.225036mm" pcbY="-3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin28"]} pcbX="-4.225036mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin27"]} pcbX="-3.57505mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin26"]} pcbX="-2.925064mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin25"]} pcbX="-2.275078mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin24"]} pcbX="-1.625092mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin23"]} pcbX="-0.975106mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin22"]} pcbX="-0.324866mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin21"]} pcbX="0.32512mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin20"]} pcbX="0.975106mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin19"]} pcbX="1.625092mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin18"]} pcbX="2.275078mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin17"]} pcbX="2.925064mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin16"]} pcbX="3.57505mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <smtpad portHints={["pin15"]} pcbX="4.225036mm" pcbY="3.455162mm" width="0.3640074mm" height="2.01549mm" radius="0.1820037mm" shape="pill" />
    <silkscreenpath route={[{"x":5.079999999999927,"y":2.199868600000059},{"x":5.079999999999927,"y":-2.158999999999878}]} />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":-0.6439915999999357},{"x":-5.080000000000041,"y":-2.1999955999999656}]} />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":0.6349999999999909},{"x":-5.080000000000041,"y":2.199868600000059}]} />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":2.199868600000059},{"x":5.079999999999927,"y":2.199868600000059}]} />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":-2.1999955999999656},{"x":5.079999999999927,"y":-2.1999955999999656}]} />
    <silkscreenpath route={[{"x":-5.080000000000041,"y":-0.6439915999999357},{"x":-5.080000000000041,"y":0.6349999999999909}]} />
    <silkscreentext text="{NAME}" pcbX="0mm" pcbY="5.2926mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-5.355399999999918,"y":4.542600000000107},{"x":5.3554000000000315,"y":4.542600000000107},{"x":5.3554000000000315,"y":-4.669599999999946},{"x":-5.355399999999918,"y":-4.669599999999946},{"x":-5.355399999999918,"y":4.542600000000107}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C490691.obj?uuid=f6684975c608438e85ae4e120e588908",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C490691.step?uuid=f6684975c608438e85ae4e120e588908",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: 0, y: 0, z: 0 },
          }}
          {...props}
        />
      )
    }"
  `)
})
