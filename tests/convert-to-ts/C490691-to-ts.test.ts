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
          symbol={
            <symbol>
              <schematicrect schX={0} schY={0} width={22.86} height={38.1} strokeWidth={0.254} color="#880000" />
              <schematiccircle center={{ x: -10.16, y: 17.78 }} radius={0.381} strokeWidth={0.254} color="#880000" isFilled fillColor="#880000" />
              <port name="pin1" pinNumber={1} aliases={["TXD"]} direction="left" schX={-13.97} schY={16.51} schStemLength={2.54} />
              <port name="pin3" pinNumber={3} aliases={["RTS"]} direction="left" schX={-13.97} schY={11.43} schStemLength={2.54} />
              <port name="pin5" pinNumber={5} aliases={["RXD"]} direction="left" schX={-13.97} schY={6.35} schStemLength={2.54} />
              <port name="pin2" pinNumber={2} aliases={["DTR"]} direction="left" schX={-13.97} schY={13.97} schStemLength={2.54} />
              <port name="pin4" pinNumber={4} aliases={["VCCIO"]} direction="left" schX={-13.97} schY={8.89} schStemLength={2.54} />
              <port name="pin6" pinNumber={6} aliases={["RI"]} direction="left" schX={-13.97} schY={3.81} schStemLength={2.54} />
              <port name="pin7" pinNumber={7} aliases={["GND1","GND"]} direction="left" schX={-13.97} schY={1.27} schStemLength={2.54} />
              <port name="pin8" pinNumber={8} aliases={["NC1","NC"]} direction="left" schX={-13.97} schY={-1.27} schStemLength={2.54} />
              <port name="pin9" pinNumber={9} aliases={["DSR"]} direction="left" schX={-13.97} schY={-3.81} schStemLength={2.54} />
              <port name="pin10" pinNumber={10} aliases={["DCD"]} direction="left" schX={-13.97} schY={-6.35} schStemLength={2.54} />
              <port name="pin11" pinNumber={11} aliases={["CTS"]} direction="left" schX={-13.97} schY={-8.89} schStemLength={2.54} />
              <port name="pin12" pinNumber={12} aliases={["CBUS4"]} direction="left" schX={-13.97} schY={-11.43} schStemLength={2.54} />
              <port name="pin13" pinNumber={13} aliases={["CBUS2"]} direction="left" schX={-13.97} schY={-13.97} schStemLength={2.54} />
              <port name="pin14" pinNumber={14} aliases={["CBUS3"]} direction="left" schX={-13.97} schY={-16.51} schStemLength={2.54} />
              <port name="pin15" pinNumber={15} aliases={["USBDP"]} direction="right" schX={13.97} schY={-16.51} schStemLength={2.54} />
              <port name="pin16" pinNumber={16} aliases={["USBDM"]} direction="right" schX={13.97} schY={-13.97} schStemLength={2.54} />
              <port name="pin17" pinNumber={17} aliases={["3V3OUT"]} direction="right" schX={13.97} schY={-11.43} schStemLength={2.54} />
              <port name="pin18" pinNumber={18} aliases={["GND3","GND"]} direction="right" schX={13.97} schY={-8.89} schStemLength={2.54} />
              <port name="pin19" pinNumber={19} aliases={["RESET"]} direction="right" schX={13.97} schY={-6.35} schStemLength={2.54} />
              <port name="pin20" pinNumber={20} aliases={["VCC"]} direction="right" schX={13.97} schY={-3.81} schStemLength={2.54} />
              <port name="pin21" pinNumber={21} aliases={["GND2","GND"]} direction="right" schX={13.97} schY={-1.27} schStemLength={2.54} />
              <port name="pin22" pinNumber={22} aliases={["CBUS1"]} direction="right" schX={13.97} schY={1.27} schStemLength={2.54} />
              <port name="pin23" pinNumber={23} aliases={["CBUS0"]} direction="right" schX={13.97} schY={3.81} schStemLength={2.54} />
              <port name="pin24" pinNumber={24} aliases={["NC2","NC"]} direction="right" schX={13.97} schY={6.35} schStemLength={2.54} />
              <port name="pin25" pinNumber={25} aliases={["AGND"]} direction="right" schX={13.97} schY={8.89} schStemLength={2.54} />
              <port name="pin26" pinNumber={26} aliases={["TEST"]} direction="right" schX={13.97} schY={11.43} schStemLength={2.54} />
              <port name="pin27" pinNumber={27} aliases={["OSCI"]} direction="right" schX={13.97} schY={13.97} schStemLength={2.54} />
              <port name="pin28" pinNumber={28} aliases={["OSCO"]} direction="right" schX={13.97} schY={16.51} schStemLength={2.54} />
            </symbol>
          }
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
