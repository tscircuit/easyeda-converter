import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C9900017879.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
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
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path, {
    camPos: [0, 20, 50],
  })

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["pin1"],
      pin2: ["pin2"],
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

    export const ARDUINO_NANO = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C9900017879"
      ]
    }}
          manufacturerPartNumber="ARDUINO_NANO"
          footprint={<footprint>
            <platedhole  portHints={["pin1"]} pcbX="17.78mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin29"]} pcbX="15.24mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin27"]} pcbX="10.16mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin25"]} pcbX="5.08mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin23"]} pcbX="0mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin21"]} pcbX="-5.08mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin19"]} pcbX="-10.16mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin17"]} pcbX="-15.24mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin15"]} pcbX="-17.78mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin13"]} pcbX="-12.7mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin11"]} pcbX="-7.62mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin9"]} pcbX="-2.54mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin7"]} pcbX="2.54mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin5"]} pcbX="7.62mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin3"]} pcbX="12.7mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin2"]} pcbX="15.24mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin4"]} pcbX="10.16mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin6"]} pcbX="5.08mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin8"]} pcbX="0mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin10"]} pcbX="-5.08mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin12"]} pcbX="-10.16mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin14"]} pcbX="-15.24mm" pcbY="7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin16"]} pcbX="-17.78mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin18"]} pcbX="-12.7mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin20"]} pcbX="-7.62mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin22"]} pcbX="-2.54mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin24"]} pcbX="2.54mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin26"]} pcbX="7.62mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin28"]} pcbX="12.7mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <platedhole  portHints={["pin30"]} pcbX="17.78mm" pcbY="-7.62mm" outerDiameter="1.5999968mm" holeDiameter="0.9000236mm" shape="circle" />
    <silkscreenpath route={[{"x":3.1745936000000086,"y":-8.889390399999982},{"x":3.8095935999999995,"y":-8.254390399999977},{"x":4.444593600000005,"y":-8.889390399999982}]} />
    <silkscreenpath route={[{"x":-18.41525399999999,"y":-6.349517399999996},{"x":-19.05025399999998,"y":-6.984517399999987},{"x":-19.05025399999998,"y":-8.254517399999997},{"x":-18.41525399999999,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":-15.875253999999998,"y":-6.349517399999996},{"x":-16.51025399999999,"y":-6.984517399999987},{"x":-17.145253999999994,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":-13.335253999999992,"y":-6.349517399999996},{"x":-13.970253999999997,"y":-6.984517399999987},{"x":-14.605253999999988,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":-10.7957112,"y":-6.349517399999996},{"x":-11.43048259999999,"y":-6.984517399999987},{"x":-12.065482599999996,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":-8.25576199999999,"y":-6.349517399999996},{"x":-8.890761999999995,"y":-6.984517399999987},{"x":-9.525762,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":-5.715761999999998,"y":-6.349517399999996},{"x":-6.350761999999989,"y":-6.984517399999987},{"x":-6.985762000000008,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":-3.175762000000006,"y":-6.349517399999996},{"x":-3.810761999999997,"y":-6.984517399999987},{"x":-4.445761999999988,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":-0.6357619999999855,"y":-6.349517399999996},{"x":-1.2707620000000048,"y":-6.984517399999987},{"x":-1.9057619999999957,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":1.9042380000000065,"y":-6.349517399999996},{"x":1.2692380000000156,"y":-6.984517399999987},{"x":0.6342379999999963,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":4.444237999999999,"y":-6.349517399999996},{"x":3.8092380000000077,"y":-6.984517399999987},{"x":3.1742380000000026,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":6.984238000000005,"y":-6.349517399999996},{"x":6.349238,"y":-6.984517399999987},{"x":5.714238000000009,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":9.524238000000025,"y":-6.349517399999996},{"x":8.889238000000006,"y":-6.984517399999987},{"x":8.254238,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":12.0645174,"y":-6.349517399999996},{"x":11.429288799999995,"y":-6.984517399999987},{"x":10.794237999999979,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":14.604593599999987,"y":-6.349517399999996},{"x":13.969593599999968,"y":-6.984517399999987},{"x":13.334593599999977,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":17.14459359999998,"y":-6.349517399999996},{"x":16.509593599999988,"y":-6.984517399999987},{"x":15.874593599999969,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":18.41459359999999,"y":-8.889517399999988},{"x":19.04959359999998,"y":-8.254517399999997},{"x":19.04959359999998,"y":-6.984517399999987},{"x":18.41459359999999,"y":-6.349517399999996}]} />
    <silkscreenpath route={[{"x":15.874593599999969,"y":-8.889517399999988},{"x":16.509593599999988,"y":-8.254517399999997},{"x":17.14459359999998,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":13.334593599999977,"y":-8.889517399999988},{"x":13.969593599999968,"y":-8.254517399999997},{"x":14.604593599999987,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":10.794237999999979,"y":-8.889517399999988},{"x":11.429288799999995,"y":-8.254517399999997},{"x":12.0645174,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":-12.065482599999996,"y":-8.889517399999988},{"x":-11.43048259999999,"y":-8.254517399999997},{"x":-10.7957112,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":-17.145253999999994,"y":-8.889517399999988},{"x":-16.51025399999999,"y":-8.254517399999997},{"x":-15.875253999999998,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":-14.605253999999988,"y":-8.889517399999988},{"x":-13.970253999999997,"y":-8.254517399999997},{"x":-13.335253999999992,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":-9.525762,"y":-8.889517399999988},{"x":-8.890761999999995,"y":-8.254517399999997},{"x":-8.25576199999999,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":-6.985762000000008,"y":-8.889517399999988},{"x":-6.350761999999989,"y":-8.254517399999997},{"x":-5.715761999999998,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":-4.445761999999988,"y":-8.889517399999988},{"x":-3.810761999999997,"y":-8.254517399999997},{"x":-3.175762000000006,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":-1.9057619999999957,"y":-8.889517399999988},{"x":-1.2707620000000048,"y":-8.254517399999997},{"x":-0.6357619999999855,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":0.6342379999999963,"y":-8.889517399999988},{"x":1.2692380000000156,"y":-8.254517399999997},{"x":1.9042380000000065,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":5.714238000000009,"y":-8.889517399999988},{"x":6.349238,"y":-8.254517399999997},{"x":6.984238000000005,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":8.254238,"y":-8.889517399999988},{"x":8.889238000000006,"y":-8.254517399999997},{"x":9.524238000000025,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":10.794237999999979,"y":-8.889517399999988},{"x":11.429288799999995,"y":-8.254517399999997},{"x":12.0645174,"y":-8.889517399999988},{"x":13.334593599999977,"y":-8.889517399999988},{"x":13.969593599999968,"y":-8.254517399999997},{"x":14.604593599999987,"y":-8.889517399999988},{"x":15.874593599999969,"y":-8.889517399999988},{"x":16.509593599999988,"y":-8.254517399999997},{"x":17.14459359999998,"y":-8.889517399999988},{"x":18.41459359999999,"y":-8.889517399999988},{"x":19.04959359999998,"y":-8.254517399999997},{"x":19.04959359999998,"y":-6.984517399999987},{"x":18.41459359999999,"y":-6.349517399999996},{"x":17.14459359999998,"y":-6.349517399999996},{"x":16.509593599999988,"y":-6.984517399999987},{"x":15.874593599999969,"y":-6.349517399999996},{"x":14.604593599999987,"y":-6.349517399999996},{"x":13.969593599999968,"y":-6.984517399999987},{"x":13.334593599999977,"y":-6.349517399999996},{"x":12.0645174,"y":-6.349517399999996},{"x":11.429288799999995,"y":-6.984517399999987},{"x":10.794237999999979,"y":-6.349517399999996},{"x":9.524238000000025,"y":-6.349517399999996},{"x":8.889238000000006,"y":-6.984517399999987},{"x":8.254238,"y":-6.349517399999996},{"x":6.984238000000005,"y":-6.349517399999996},{"x":6.349238,"y":-6.984517399999987},{"x":5.714238000000009,"y":-6.349517399999996},{"x":4.444237999999999,"y":-6.349517399999996},{"x":3.8092380000000077,"y":-6.984517399999987},{"x":3.1742380000000026,"y":-6.349517399999996},{"x":1.9042380000000065,"y":-6.349517399999996},{"x":1.2692380000000156,"y":-6.984517399999987},{"x":0.6342379999999963,"y":-6.349517399999996},{"x":-0.6357619999999855,"y":-6.349517399999996},{"x":-1.2707620000000048,"y":-6.984517399999987},{"x":-1.9057619999999957,"y":-6.349517399999996},{"x":-3.175762000000006,"y":-6.349517399999996},{"x":-3.810761999999997,"y":-6.984517399999987},{"x":-4.445761999999988,"y":-6.349517399999996},{"x":-5.715761999999998,"y":-6.349517399999996},{"x":-6.350761999999989,"y":-6.984517399999987},{"x":-6.985762000000008,"y":-6.349517399999996},{"x":-8.25576199999999,"y":-6.349517399999996},{"x":-8.890761999999995,"y":-6.984517399999987},{"x":-9.525762,"y":-6.349517399999996},{"x":-10.7957112,"y":-6.349517399999996},{"x":-11.43048259999999,"y":-6.984517399999987},{"x":-12.065482599999996,"y":-6.349517399999996},{"x":-13.335253999999992,"y":-6.349517399999996},{"x":-13.970253999999997,"y":-6.984517399999987},{"x":-14.605253999999988,"y":-6.349517399999996},{"x":-15.875253999999998,"y":-6.349517399999996},{"x":-16.51025399999999,"y":-6.984517399999987},{"x":-17.145253999999994,"y":-6.349517399999996},{"x":-18.41525399999999,"y":-6.349517399999996},{"x":-19.05025399999998,"y":-6.984517399999987},{"x":-19.05025399999998,"y":-8.254517399999997},{"x":-18.41525399999999,"y":-8.889517399999988}]} />
    <silkscreenpath route={[{"x":-3.174746000000013,"y":8.889568200000014},{"x":-3.809746000000004,"y":8.254568200000023},{"x":-4.444746000000009,"y":8.889568200000014}]} />
    <silkscreenpath route={[{"x":-10.7943396,"y":8.889669800000021},{"x":-11.429365000000004,"y":8.254669800000016},{"x":-12.064618999999993,"y":8.889669800000021},{"x":-13.33474600000001,"y":8.889669800000021},{"x":-13.969746000000015,"y":8.254669800000016},{"x":-14.604746000000006,"y":8.889669800000021},{"x":-15.874746000000016,"y":8.889669800000021},{"x":-16.509746000000007,"y":8.254669800000016},{"x":-17.144745999999998,"y":8.889669800000021},{"x":-18.414746000000008,"y":8.889669800000021},{"x":-19.049746,"y":8.254669800000016},{"x":-19.049746,"y":6.98466980000002},{"x":-18.414746000000008,"y":6.349669800000022},{"x":-17.144745999999998,"y":6.349669800000022},{"x":-16.509746000000007,"y":6.98466980000002},{"x":-15.874746000000016,"y":6.349669800000022},{"x":-14.604746000000006,"y":6.349669800000022},{"x":-13.969746000000015,"y":6.98466980000002},{"x":-13.33474600000001,"y":6.349669800000022},{"x":-12.064618999999993,"y":6.349669800000022},{"x":-11.429365000000004,"y":6.98466980000002},{"x":-10.7943396,"y":6.349669800000022},{"x":-9.524339600000019,"y":6.349669800000022},{"x":-8.8893396,"y":6.98466980000002},{"x":-8.254339600000009,"y":6.349669800000022},{"x":-6.984339599999998,"y":6.349669800000022},{"x":-6.3493396000000075,"y":6.98466980000002},{"x":-5.714339600000017,"y":6.349669800000022},{"x":-4.444339600000006,"y":6.349669800000022},{"x":-3.8093396000000155,"y":6.98466980000002},{"x":-3.1743396000000104,"y":6.349669800000022},{"x":-1.9043396000000143,"y":6.349669800000022},{"x":-1.2693396000000092,"y":6.98466980000002},{"x":-0.6343396000000041,"y":6.349669800000022},{"x":0.6356603999999919,"y":6.349669800000022},{"x":1.270660399999997,"y":6.98466980000002},{"x":1.905660399999988,"y":6.349669800000022},{"x":3.175660399999984,"y":6.349669800000022},{"x":3.810660399999989,"y":6.98466980000002},{"x":4.445660399999994,"y":6.349669800000022},{"x":5.71566039999999,"y":6.349669800000022},{"x":6.350660399999995,"y":6.98466980000002},{"x":6.985660399999986,"y":6.349669800000022},{"x":8.255660399999996,"y":6.349669800000022},{"x":8.890660400000002,"y":6.98466980000002},{"x":9.525660399999992,"y":6.349669800000022},{"x":10.795609600000006,"y":6.349669800000022},{"x":11.430380999999983,"y":6.98466980000002},{"x":12.065381000000002,"y":6.349669800000022},{"x":13.335152399999998,"y":6.349669800000022},{"x":13.97015239999999,"y":6.98466980000002},{"x":14.60515239999998,"y":6.349669800000022},{"x":15.87515239999999,"y":6.349669800000022},{"x":16.51015239999998,"y":6.98466980000002},{"x":17.145152399999972,"y":6.349669800000022},{"x":18.415152399999982,"y":6.349669800000022},{"x":19.050152399999973,"y":6.98466980000002},{"x":19.050152399999973,"y":8.254669800000016},{"x":18.415152399999982,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":12.065381000000002,"y":8.889669800000021},{"x":11.430380999999983,"y":8.254669800000016},{"x":10.795609600000006,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":17.145152399999972,"y":8.889669800000021},{"x":16.51015239999998,"y":8.254669800000016},{"x":15.87515239999999,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":14.60515239999998,"y":8.889669800000021},{"x":13.97015239999999,"y":8.254669800000016},{"x":13.335152399999998,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":9.525660399999992,"y":8.889669800000021},{"x":8.890660400000002,"y":8.254669800000016},{"x":8.255660399999996,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":6.985660399999986,"y":8.889669800000021},{"x":6.350660399999995,"y":8.254669800000016},{"x":5.71566039999999,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":4.445660399999994,"y":8.889669800000021},{"x":3.810660399999989,"y":8.254669800000016},{"x":3.175660399999984,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":1.905660399999988,"y":8.889669800000021},{"x":1.270660399999997,"y":8.254669800000016},{"x":0.6356603999999919,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":-0.6343396000000041,"y":8.889669800000021},{"x":-1.2693396000000092,"y":8.254669800000016},{"x":-1.9043396000000143,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":-5.714339600000017,"y":8.889669800000021},{"x":-6.3493396000000075,"y":8.254669800000016},{"x":-6.984339599999998,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":-8.254339600000009,"y":8.889669800000021},{"x":-8.8893396,"y":8.254669800000016},{"x":-9.524339600000019,"y":8.889669800000021}]} />
    <silkscreenpath route={[{"x":-17.7038,"y":2.794000000000011},{"x":-17.7038,"y":2.540101600000014}]} />
    <silkscreenpath route={[{"x":-21.590000000000003,"y":2.794000000000011},{"x":-23.114000000000004,"y":2.794000000000011},{"x":-23.114000000000004,"y":-2.7939999999999827},{"x":-17.7038,"y":-2.7939999999999827},{"x":-17.7038,"y":-2.584957999999986}]} />
    <silkscreenpath route={[{"x":-21.590000000000003,"y":2.794000000000011},{"x":-17.7038,"y":2.794000000000011}]} />
    <silkscreenpath route={[{"x":-17.7038,"y":2.540101600000014},{"x":-17.7038,"y":-2.539999999999992}]} />
    <silkscreenpath route={[{"x":-21.666200000000003,"y":8.966174600000016},{"x":21.66612380000001,"y":8.966174600000016},{"x":21.66612380000001,"y":-8.966199999999986},{"x":-21.666200000000003,"y":-8.966199999999986},{"x":-21.666200000000003,"y":8.966174600000016}]} />
    <silkscreentext text="D13" pcbX="-17.232122mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="3V3" pcbX="-14.692122mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="REF" pcbX="-12.152122mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="A0" pcbX="-9.612122mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="A1" pcbX="-7.072122mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="A2" pcbX="-4.532122mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="A3" pcbX="-1.992122mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="A4" pcbX="0.547878mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="A5" pcbX="3.087878mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="A6" pcbX="5.627878mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="A7" pcbX="8.167878mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="5V" pcbX="10.707878mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="RST" pcbX="13.247878mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="GND" pcbX="15.787878mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="VIN" pcbX="18.327878mm" pcbY="-5.990082mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D12" pcbX="-17.251934mm" pcbY="3.8989mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D11" pcbX="-14.711934mm" pcbY="4.30784mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D10" pcbX="-12.171934mm" pcbY="3.8989mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D9" pcbX="-9.631934mm" pcbY="4.47294mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D8" pcbX="-7.091934mm" pcbY="4.42722mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D7" pcbX="-4.551934mm" pcbY="4.42722mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D6" pcbX="-2.011934mm" pcbY="4.47294mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D5" pcbX="0.528066mm" pcbY="4.42722mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D4" pcbX="3.068066mm" pcbY="4.3815mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D3" pcbX="5.608066mm" pcbY="4.42722mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="D2" pcbX="8.148066mm" pcbY="4.42722mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="GND" pcbX="10.688066mm" pcbY="3.44424mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="RST" pcbX="13.228066mm" pcbY="3.48996mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="RXD" pcbX="15.768066mm" pcbY="3.48996mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="TXD" pcbX="18.308066mm" pcbY="3.48996mm" anchorAlignment="bottom_left" fontSize="1.500124mm" />
    <silkscreentext text="{NAME}" pcbX="-1.0033mm" pcbY="9.9916mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-23.97359999999999,"y":9.24160000000002},{"x":21.967000000000013,"y":9.24160000000002},{"x":21.967000000000013,"y":-9.266999999999982},{"x":-23.97359999999999,"y":-9.266999999999982},{"x":-23.97359999999999,"y":9.24160000000002}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C9900017879.obj?uuid=4e90b6d8552a4e058d9ebe9d82e11f3a",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C9900017879.step?uuid=4e90b6d8552a4e058d9ebe9d82e11f3a",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: 0, y: 0.00630420000000953, z: -2.5000069999999996 },
          }}
          {...props}
        />
      )
    }"
  `)
})
