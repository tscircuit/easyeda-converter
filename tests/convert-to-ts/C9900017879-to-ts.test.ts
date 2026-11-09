import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C9900017879.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C9900017879 into typescript file", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C9900017879-to-ts-rotation",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [0, 20, 50],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["D1","TX"],
      pin2: ["D0","RX"],
      pin3: ["RESET1"],
      pin4: ["GND2"],
      pin5: ["D2"],
      pin6: ["D3"],
      pin7: ["D4"],
      pin8: ["D5"],
      pin9: ["D6"],
      pin10: ["D7"],
      pin11: ["D8"],
      pin12: ["D9"],
      pin13: ["D10"],
      pin14: ["D11"],
      pin15: ["D12"],
      pin16: ["D13"],
      pin17: ["3V3"],
      pin18: ["AREF"],
      pin19: ["A0"],
      pin20: ["A1"],
      pin21: ["A2"],
      pin22: ["A3"],
      pin23: ["A4"],
      pin24: ["A5"],
      pin25: ["A6"],
      pin26: ["A7"],
      pin27: ["V5"],
      pin28: ["RESET2"],
      pin29: ["GND1"],
      pin30: ["VIN"]
    } as const

    const pinAttributes = {
      pin4: {requiresGround: true},
      pin29: {requiresGround: true},
      pin30: {requiresPower: true}
    } as const

    export const ARDUINO_NANO = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C9900017879"
      ]
    }}
          manufacturerPartNumber="ARDUINO_NANO"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="-7.62mm" pcbY="17.78mm" holeWidth="0.9000236mm" holeHeight="0.9000236mm" outerWidth="1.5999968mm" outerHeight="1.5999968mm" rectPad={true} pcbRotation="90deg" shape="pill" />
    <platedhole  portHints={["pin29"]} pcbX="7.62mm" pcbY="15.24mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin27"]} pcbX="7.62mm" pcbY="10.16mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin25"]} pcbX="7.62mm" pcbY="5.08mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin23"]} pcbX="7.62mm" pcbY="0mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin21"]} pcbX="7.62mm" pcbY="-5.08mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin19"]} pcbX="7.62mm" pcbY="-10.16mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin17"]} pcbX="7.62mm" pcbY="-15.24mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin15"]} pcbX="-7.62mm" pcbY="-17.78mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin13"]} pcbX="-7.62mm" pcbY="-12.7mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin11"]} pcbX="-7.62mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin9"]} pcbX="-7.62mm" pcbY="-2.54mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="-7.62mm" pcbY="2.54mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="-7.62mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="-7.62mm" pcbY="12.7mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="-7.62mm" pcbY="15.24mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="-7.62mm" pcbY="10.16mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="-7.62mm" pcbY="5.08mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin8"]} pcbX="-7.62mm" pcbY="0mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin10"]} pcbX="-7.62mm" pcbY="-5.08mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin12"]} pcbX="-7.62mm" pcbY="-10.16mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin14"]} pcbX="-7.62mm" pcbY="-15.24mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin16"]} pcbX="7.62mm" pcbY="-17.78mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin18"]} pcbX="7.62mm" pcbY="-12.7mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin20"]} pcbX="7.62mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin22"]} pcbX="7.62mm" pcbY="-2.54mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin24"]} pcbX="7.62mm" pcbY="2.54mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin26"]} pcbX="7.62mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin28"]} pcbX="7.62mm" pcbY="12.7mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin30"]} pcbX="7.62mm" pcbY="17.78mm" holeWidth="0.9000236mm" holeHeight="0.9000236mm" outerWidth="1.5999968mm" outerHeight="1.5999968mm" rectPad={true} pcbRotation="90deg" shape="pill" />
    <silkscreenpath route={[{"x":8.88939,"y":3.174594},{"x":8.25439,"y":3.809594},{"x":8.88939,"y":4.444594}]} />
    <silkscreenpath route={[{"x":6.349517,"y":-18.415254},{"x":6.984517,"y":-19.050254},{"x":8.254517,"y":-19.050254},{"x":8.889517,"y":-18.415254}]} />
    <silkscreenpath route={[{"x":6.349517,"y":-15.875254},{"x":6.984517,"y":-16.510254},{"x":6.349517,"y":-17.145254}]} />
    <silkscreenpath route={[{"x":6.349517,"y":-13.335254},{"x":6.984517,"y":-13.970254},{"x":6.349517,"y":-14.605254}]} />
    <silkscreenpath route={[{"x":6.349517,"y":-10.795711},{"x":6.984517,"y":-11.430483},{"x":6.349517,"y":-12.065483}]} />
    <silkscreenpath route={[{"x":6.349517,"y":-8.255762},{"x":6.984517,"y":-8.890762},{"x":6.349517,"y":-9.525762}]} />
    <silkscreenpath route={[{"x":6.349517,"y":-5.715762},{"x":6.984517,"y":-6.350762},{"x":6.349517,"y":-6.985762}]} />
    <silkscreenpath route={[{"x":6.349517,"y":-3.175762},{"x":6.984517,"y":-3.810762},{"x":6.349517,"y":-4.445762}]} />
    <silkscreenpath route={[{"x":6.349517,"y":-0.635762},{"x":6.984517,"y":-1.270762},{"x":6.349517,"y":-1.905762}]} />
    <silkscreenpath route={[{"x":6.349517,"y":1.904238},{"x":6.984517,"y":1.269238},{"x":6.349517,"y":0.634238}]} />
    <silkscreenpath route={[{"x":6.349517,"y":4.444238},{"x":6.984517,"y":3.809238},{"x":6.349517,"y":3.174238}]} />
    <silkscreenpath route={[{"x":6.349517,"y":6.984238},{"x":6.984517,"y":6.349238},{"x":6.349517,"y":5.714238}]} />
    <silkscreenpath route={[{"x":6.349517,"y":9.524238},{"x":6.984517,"y":8.889238},{"x":6.349517,"y":8.254238}]} />
    <silkscreenpath route={[{"x":6.349517,"y":12.064517},{"x":6.984517,"y":11.429289},{"x":6.349517,"y":10.794238}]} />
    <silkscreenpath route={[{"x":6.349517,"y":14.604594},{"x":6.984517,"y":13.969594},{"x":6.349517,"y":13.334594}]} />
    <silkscreenpath route={[{"x":6.349517,"y":17.144594},{"x":6.984517,"y":16.509594},{"x":6.349517,"y":15.874594}]} />
    <silkscreenpath route={[{"x":8.889517,"y":18.414594},{"x":8.254517,"y":19.049594},{"x":6.984517,"y":19.049594},{"x":6.349517,"y":18.414594}]} />
    <silkscreenpath route={[{"x":8.889517,"y":15.874594},{"x":8.254517,"y":16.509594},{"x":8.889517,"y":17.144594}]} />
    <silkscreenpath route={[{"x":8.889517,"y":13.334594},{"x":8.254517,"y":13.969594},{"x":8.889517,"y":14.604594}]} />
    <silkscreenpath route={[{"x":8.889517,"y":10.794238},{"x":8.254517,"y":11.429289},{"x":8.889517,"y":12.064517}]} />
    <silkscreenpath route={[{"x":8.889517,"y":-12.065483},{"x":8.254517,"y":-11.430483},{"x":8.889517,"y":-10.795711}]} />
    <silkscreenpath route={[{"x":8.889517,"y":-17.145254},{"x":8.254517,"y":-16.510254},{"x":8.889517,"y":-15.875254}]} />
    <silkscreenpath route={[{"x":8.889517,"y":-14.605254},{"x":8.254517,"y":-13.970254},{"x":8.889517,"y":-13.335254}]} />
    <silkscreenpath route={[{"x":8.889517,"y":-9.525762},{"x":8.254517,"y":-8.890762},{"x":8.889517,"y":-8.255762}]} />
    <silkscreenpath route={[{"x":8.889517,"y":-6.985762},{"x":8.254517,"y":-6.350762},{"x":8.889517,"y":-5.715762}]} />
    <silkscreenpath route={[{"x":8.889517,"y":-4.445762},{"x":8.254517,"y":-3.810762},{"x":8.889517,"y":-3.175762}]} />
    <silkscreenpath route={[{"x":8.889517,"y":-1.905762},{"x":8.254517,"y":-1.270762},{"x":8.889517,"y":-0.635762}]} />
    <silkscreenpath route={[{"x":8.889517,"y":0.634238},{"x":8.254517,"y":1.269238},{"x":8.889517,"y":1.904238}]} />
    <silkscreenpath route={[{"x":8.889517,"y":5.714238},{"x":8.254517,"y":6.349238},{"x":8.889517,"y":6.984238}]} />
    <silkscreenpath route={[{"x":8.889517,"y":8.254238},{"x":8.254517,"y":8.889238},{"x":8.889517,"y":9.524238}]} />
    <silkscreenpath route={[{"x":8.889517,"y":10.794238},{"x":8.254517,"y":11.429289},{"x":8.889517,"y":12.064517},{"x":8.889517,"y":13.334594},{"x":8.254517,"y":13.969594},{"x":8.889517,"y":14.604594},{"x":8.889517,"y":15.874594},{"x":8.254517,"y":16.509594},{"x":8.889517,"y":17.144594},{"x":8.889517,"y":18.414594},{"x":8.254517,"y":19.049594},{"x":6.984517,"y":19.049594},{"x":6.349517,"y":18.414594},{"x":6.349517,"y":17.144594},{"x":6.984517,"y":16.509594},{"x":6.349517,"y":15.874594},{"x":6.349517,"y":14.604594},{"x":6.984517,"y":13.969594},{"x":6.349517,"y":13.334594},{"x":6.349517,"y":12.064517},{"x":6.984517,"y":11.429289},{"x":6.349517,"y":10.794238},{"x":6.349517,"y":9.524238},{"x":6.984517,"y":8.889238},{"x":6.349517,"y":8.254238},{"x":6.349517,"y":6.984238},{"x":6.984517,"y":6.349238},{"x":6.349517,"y":5.714238},{"x":6.349517,"y":4.444238},{"x":6.984517,"y":3.809238},{"x":6.349517,"y":3.174238},{"x":6.349517,"y":1.904238},{"x":6.984517,"y":1.269238},{"x":6.349517,"y":0.634238},{"x":6.349517,"y":-0.635762},{"x":6.984517,"y":-1.270762},{"x":6.349517,"y":-1.905762},{"x":6.349517,"y":-3.175762},{"x":6.984517,"y":-3.810762},{"x":6.349517,"y":-4.445762},{"x":6.349517,"y":-5.715762},{"x":6.984517,"y":-6.350762},{"x":6.349517,"y":-6.985762},{"x":6.349517,"y":-8.255762},{"x":6.984517,"y":-8.890762},{"x":6.349517,"y":-9.525762},{"x":6.349517,"y":-10.795711},{"x":6.984517,"y":-11.430483},{"x":6.349517,"y":-12.065483},{"x":6.349517,"y":-13.335254},{"x":6.984517,"y":-13.970254},{"x":6.349517,"y":-14.605254},{"x":6.349517,"y":-15.875254},{"x":6.984517,"y":-16.510254},{"x":6.349517,"y":-17.145254},{"x":6.349517,"y":-18.415254},{"x":6.984517,"y":-19.050254},{"x":8.254517,"y":-19.050254},{"x":8.889517,"y":-18.415254}]} />
    <silkscreenpath route={[{"x":-8.889568,"y":-3.174746},{"x":-8.254568,"y":-3.809746},{"x":-8.889568,"y":-4.444746}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":-10.79434},{"x":-8.25467,"y":-11.429365},{"x":-8.88967,"y":-12.064619},{"x":-8.88967,"y":-13.334746},{"x":-8.25467,"y":-13.969746},{"x":-8.88967,"y":-14.604746},{"x":-8.88967,"y":-15.874746},{"x":-8.25467,"y":-16.509746},{"x":-8.88967,"y":-17.144746},{"x":-8.88967,"y":-18.414746},{"x":-8.25467,"y":-19.049746},{"x":-6.98467,"y":-19.049746},{"x":-6.34967,"y":-18.414746},{"x":-6.34967,"y":-17.144746},{"x":-6.98467,"y":-16.509746},{"x":-6.34967,"y":-15.874746},{"x":-6.34967,"y":-14.604746},{"x":-6.98467,"y":-13.969746},{"x":-6.34967,"y":-13.334746},{"x":-6.34967,"y":-12.064619},{"x":-6.98467,"y":-11.429365},{"x":-6.34967,"y":-10.79434},{"x":-6.34967,"y":-9.52434},{"x":-6.98467,"y":-8.88934},{"x":-6.34967,"y":-8.25434},{"x":-6.34967,"y":-6.98434},{"x":-6.98467,"y":-6.34934},{"x":-6.34967,"y":-5.71434},{"x":-6.34967,"y":-4.44434},{"x":-6.98467,"y":-3.80934},{"x":-6.34967,"y":-3.17434},{"x":-6.34967,"y":-1.90434},{"x":-6.98467,"y":-1.26934},{"x":-6.34967,"y":-0.63434},{"x":-6.34967,"y":0.63566},{"x":-6.98467,"y":1.27066},{"x":-6.34967,"y":1.90566},{"x":-6.34967,"y":3.17566},{"x":-6.98467,"y":3.81066},{"x":-6.34967,"y":4.44566},{"x":-6.34967,"y":5.71566},{"x":-6.98467,"y":6.35066},{"x":-6.34967,"y":6.98566},{"x":-6.34967,"y":8.25566},{"x":-6.98467,"y":8.89066},{"x":-6.34967,"y":9.52566},{"x":-6.34967,"y":10.79561},{"x":-6.98467,"y":11.430381},{"x":-6.34967,"y":12.065381},{"x":-6.34967,"y":13.335152},{"x":-6.98467,"y":13.970152},{"x":-6.34967,"y":14.605152},{"x":-6.34967,"y":15.875152},{"x":-6.98467,"y":16.510152},{"x":-6.34967,"y":17.145152},{"x":-6.34967,"y":18.415152},{"x":-6.98467,"y":19.050152},{"x":-8.25467,"y":19.050152},{"x":-8.88967,"y":18.415152}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":12.065381},{"x":-8.25467,"y":11.430381},{"x":-8.88967,"y":10.79561}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":17.145152},{"x":-8.25467,"y":16.510152},{"x":-8.88967,"y":15.875152}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":14.605152},{"x":-8.25467,"y":13.970152},{"x":-8.88967,"y":13.335152}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":9.52566},{"x":-8.25467,"y":8.89066},{"x":-8.88967,"y":8.25566}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":6.98566},{"x":-8.25467,"y":6.35066},{"x":-8.88967,"y":5.71566}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":4.44566},{"x":-8.25467,"y":3.81066},{"x":-8.88967,"y":3.17566}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":1.90566},{"x":-8.25467,"y":1.27066},{"x":-8.88967,"y":0.63566}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":-0.63434},{"x":-8.25467,"y":-1.26934},{"x":-8.88967,"y":-1.90434}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":-5.71434},{"x":-8.25467,"y":-6.34934},{"x":-8.88967,"y":-6.98434}]} />
    <silkscreenpath route={[{"x":-8.88967,"y":-8.25434},{"x":-8.25467,"y":-8.88934},{"x":-8.88967,"y":-9.52434}]} />
    <silkscreenpath route={[{"x":-2.794,"y":-17.7038},{"x":-2.540102,"y":-17.7038}]} />
    <silkscreenpath route={[{"x":-2.794,"y":-21.59},{"x":-2.794,"y":-23.114},{"x":2.794,"y":-23.114},{"x":2.794,"y":-17.7038},{"x":2.584958,"y":-17.7038}]} />
    <silkscreenpath route={[{"x":-2.794,"y":-21.59},{"x":-2.794,"y":-17.7038}]} />
    <silkscreenpath route={[{"x":-2.540102,"y":-17.7038},{"x":2.54,"y":-17.7038}]} />
    <silkscreenpath route={[{"x":-8.966175,"y":-21.6662},{"x":-8.966175,"y":21.666124},{"x":8.9662,"y":21.666124},{"x":8.9662,"y":-21.6662},{"x":-8.966175,"y":-21.6662}]} />
    <silkscreentext text="D13" pcbX="5.990082mm" pcbY="-17.232122mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="3V3" pcbX="5.990082mm" pcbY="-14.692122mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="REF" pcbX="5.990082mm" pcbY="-12.152122mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="A0" pcbX="5.990082mm" pcbY="-9.612122mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="A1" pcbX="5.990082mm" pcbY="-7.072122mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="A2" pcbX="5.990082mm" pcbY="-4.532122mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="A3" pcbX="5.990082mm" pcbY="-1.992122mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="A4" pcbX="5.990082mm" pcbY="0.547878mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="A5" pcbX="5.990082mm" pcbY="3.087878mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="A6" pcbX="5.990082mm" pcbY="5.627878mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="A7" pcbX="5.990082mm" pcbY="8.167878mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="5V" pcbX="5.990082mm" pcbY="10.707878mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="RST" pcbX="5.990082mm" pcbY="13.247878mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="GND" pcbX="5.990082mm" pcbY="15.787878mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="VIN" pcbX="5.990082mm" pcbY="18.327878mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D12" pcbX="-3.8989mm" pcbY="-17.251934mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D11" pcbX="-4.30784mm" pcbY="-14.711934mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D10" pcbX="-3.8989mm" pcbY="-12.171934mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D9" pcbX="-4.47294mm" pcbY="-9.631934mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D8" pcbX="-4.42722mm" pcbY="-7.091934mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D7" pcbX="-4.42722mm" pcbY="-4.551934mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D6" pcbX="-4.47294mm" pcbY="-2.011934mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D5" pcbX="-4.42722mm" pcbY="0.528066mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D4" pcbX="-4.3815mm" pcbY="3.068066mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D3" pcbX="-4.42722mm" pcbY="5.608066mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="D2" pcbX="-4.42722mm" pcbY="8.148066mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="GND" pcbX="-3.44424mm" pcbY="10.688066mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="RST" pcbX="-3.48996mm" pcbY="13.228066mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="RXD" pcbX="-3.48996mm" pcbY="15.768066mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="TXD" pcbX="-3.48996mm" pcbY="18.308066mm" anchorAlignment="bottom_left" pcbRotation="180deg" fontSize="1.500124mm" />
    <silkscreentext text="{NAME}" pcbX="-9.9916mm" pcbY="-1.0033mm" anchorAlignment="center" pcbRotation="90deg" fontSize="1mm" />
    <fabricationnotepath route={[{"x":-2.850007,"y":-21.649944},{"x":-2.850007,"y":-23.099928},{"x":-2.799994,"y":-23.149941},{"x":2.80002,"y":-23.149941},{"x":2.850007,"y":-23.099954},{"x":2.850007,"y":-17.699965},{"x":2.799994,"y":-17.649952},{"x":-2.799994,"y":-17.649952},{"x":-2.850007,"y":-17.699965},{"x":-2.850007,"y":-21.599957},{"x":-2.749982,"y":-21.599957},{"x":-2.749982,"y":-17.799939},{"x":-2.699995,"y":-17.749952},{"x":2.699995,"y":-17.749952},{"x":2.750007,"y":-17.799964},{"x":2.750007,"y":-23.049941},{"x":-2.699995,"y":-23.049941},{"x":-2.749982,"y":-22.999954},{"x":-2.749982,"y":-21.649944},{"x":-2.749982,"y":-21.649944},{"x":-2.850007,"y":-21.649944}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <fabricationnotepath route={[{"x":8.899982,"y":21.599957},{"x":8.899982,"y":-21.599957},{"x":2.850007,"y":-21.599957},{"x":2.850007,"y":-21.699957},{"x":8.899982,"y":-21.699957},{"x":8.999982,"y":-21.599957},{"x":8.999982,"y":21.649969},{"x":8.949995,"y":21.699957},{"x":-8.949995,"y":21.699957},{"x":-8.999982,"y":21.649969},{"x":-8.999982,"y":-21.649944},{"x":-8.949969,"y":-21.699957},{"x":-2.899994,"y":-21.699957},{"x":-2.899994,"y":-21.599957},{"x":-8.899982,"y":-21.599957},{"x":-8.899982,"y":21.599957},{"x":8.849995,"y":21.599957},{"x":8.899982,"y":21.599957}]} strokeWidth="0mm" isFilled hasStroke={false} />
    <courtyardoutline outline={[{"x":-9.139975,"y":-23.984954},{"x":-9.139975,"y":21.834945},{"x":9.139975,"y":21.834945},{"x":9.139975,"y":-23.984954},{"x":-9.139975,"y":-23.984954}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C9900017879.obj?uuid=4e90b6d8552a4e058d9ebe9d82e11f3a",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C9900017879.step?uuid=4e90b6d8552a4e058d9ebe9d82e11f3a",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.006304, y: 0, z: -2.5000069999999996 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 10000)
