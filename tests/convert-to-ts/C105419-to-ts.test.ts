import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C105419.raweasy.json"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { runTscircuitCode } from "tscircuit"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should convert C105419 into typescript file", async () => {
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
      pin1: ["DAT2"],
      pin2: ["CD","DAT3"],
      pin3: ["CMD"],
      pin4: ["VDD"],
      pin5: ["CLK"],
      pin6: ["VSS"],
      pin7: ["DAT0"],
      pin8: ["DAT1"],
      pin9: ["pin9"],
      pin10: ["pin10"],
      pin11: ["pin11"],
      pin12: ["pin12"]
    } as const

    const pinAttributes = {
      pin4: {requiresPower: true},
      pin6: {requiresGround: true}
    } as const

    export const TF_02A = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          pinAttributes={pinAttributes}
          supplierPartNumbers={{
      "jlcpcb": [
        "C105419"
      ]
    }}
          manufacturerPartNumber="TF-02A"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-1.550676mm" pcbY="3.175mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin2"]} pcbX="-0.450094mm" pcbY="2.830068mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin3"]} pcbX="0.64998mm" pcbY="3.18008mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin4"]} pcbX="1.750054mm" pcbY="3.430016mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin5"]} pcbX="2.849874mm" pcbY="3.18008mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin6"]} pcbX="3.949948mm" pcbY="3.430016mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin7"]} pcbX="5.050022mm" pcbY="3.18008mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin8"]} pcbX="6.149842mm" pcbY="3.18008mm" width="0.6999986mm" height="1.5999968mm" shape="rect" />
    <smtpad portHints={["pin9"]} pcbX="6.899904mm" pcbY="5.929884mm" width="1.6999966mm" height="2.1999956mm" shape="rect" />
    <smtpad portHints={["pin10"]} pcbX="-6.549904mm" pcbY="6.979971mm" width="1.6999966mm" height="2.1999956mm" shape="rect" />
    <smtpad portHints={["pin11"]} pcbX="5.349996mm" pcbY="-6.979971mm" width="1.999996mm" height="1.499997mm" shape="rect" />
    <smtpad portHints={["pin12"]} pcbX="-0.349993mm" pcbY="-6.979971mm" width="1.999996mm" height="1.499997mm" shape="rect" />
    <silkscreenpath route={[{"x":6.694164,"y":-0.40132},{"x":6.160764,"y":-5.96392},{"x":4.535164,"y":-5.96392},{"x":4.509764,"y":-5.93852},{"x":4.128764,"y":-0.37592},{"x":4.499604,"y":-0.37592},{"x":4.636764,"y":-0.37592},{"x":4.941564,"y":-5.35432},{"x":5.652764,"y":-5.35432},{"x":6.084564,"y":-0.37592},{"x":6.668764,"y":-0.37592},{"x":6.694164,"y":-0.40132}]} />
    <silkscreenpath route={[{"x":1.055364,"y":-0.40132},{"x":0.521964,"y":-5.96392},{"x":-1.103636,"y":-5.96392},{"x":-1.129036,"y":-5.93852},{"x":-1.510036,"y":-0.37592},{"x":-1.139196,"y":-0.37592},{"x":-1.002036,"y":-0.37592},{"x":-0.697236,"y":-5.35432},{"x":0.013964,"y":-5.35432},{"x":0.445764,"y":-0.37592},{"x":1.029964,"y":-0.37592},{"x":1.055364,"y":-0.40132}]} />
    <silkscreenpath route={[{"x":7.405364,"y":-7.43712},{"x":6.581134,"y":-7.43712}]} />
    <silkscreenpath route={[{"x":4.118858,"y":-7.43712},{"x":0.88112,"y":-7.43712}]} />
    <silkscreenpath route={[{"x":-1.581156,"y":-7.41172},{"x":-6.666236,"y":-7.41172}]} />
    <silkscreenpath route={[{"x":7.405364,"y":-7.43712},{"x":7.405364,"y":4.598924}]} />
    <silkscreenpath route={[{"x":-3.338836,"y":7.85368},{"x":-5.46888,"y":7.85368}]} />
    <silkscreenpath route={[{"x":-6.666236,"y":-7.41172},{"x":-6.666236,"y":5.643372}]} />
    <silkscreenpath route={[{"x":6.744964,"y":4.24688},{"x":6.744964,"y":4.101897}]} />
    <silkscreenpath route={[{"x":6.744964,"y":4.24688},{"x":4.580528,"y":4.24688}]} />
    <silkscreenpath route={[{"x":3.319367,"y":4.24688},{"x":2.380634,"y":4.24688}]} />
    <silkscreenpath route={[{"x":1.119473,"y":4.24688},{"x":-2.145036,"y":4.24688}]} />
    <silkscreenpath route={[{"x":4.427823,"y":2.31648},{"x":3.472072,"y":2.31648}]} />
    <silkscreenpath route={[{"x":2.227675,"y":2.31648},{"x":1.272178,"y":2.31648}]} />
    <silkscreenpath route={[{"x":5.932164,"y":6.78688},{"x":5.700605,"y":6.692819},{"x":5.466662,"y":6.604854},{"x":5.230495,"y":6.523048},{"x":4.992266,"y":6.447455},{"x":4.75214,"y":6.378128},{"x":4.51028,"y":6.315114},{"x":4.266852,"y":6.258457},{"x":4.022024,"y":6.208195},{"x":3.775963,"y":6.164363},{"x":3.528839,"y":6.12699},{"x":3.280821,"y":6.096104},{"x":3.032079,"y":6.071724},{"x":2.782783,"y":6.053867},{"x":2.533106,"y":6.042546},{"x":2.283217,"y":6.037769},{"x":2.033289,"y":6.039538},{"x":1.783494,"y":6.047853},{"x":1.534001,"y":6.062708},{"x":1.284984,"y":6.084092},{"x":1.036612,"y":6.111991},{"x":0.789056,"y":6.146387},{"x":0.542485,"y":6.187254},{"x":0.29707,"y":6.234565},{"x":0.052978,"y":6.288289},{"x":-0.189623,"y":6.348387},{"x":-0.430567,"y":6.414819},{"x":-0.669688,"y":6.487539},{"x":-0.906822,"y":6.566496},{"x":-1.141807,"y":6.651638},{"x":-1.374481,"y":6.742906},{"x":-1.604685,"y":6.840236},{"x":-1.832261,"y":6.943563},{"x":-2.057052,"y":7.052815},{"x":-2.278905,"y":7.167917},{"x":-2.497666,"y":7.28879},{"x":-2.713187,"y":7.415352},{"x":-2.925319,"y":7.547515},{"x":-3.133916,"y":7.685189},{"x":-3.338836,"y":7.82828}]} />
    <silkscreentext text="{NAME}" pcbX="8.760964mm" pcbY="0.18288mm" anchorAlignment="center" pcbRotation="270deg" fontSize="1mm" />
    <courtyardoutline outline={[{"x":7.999902,"y":8.329969},{"x":7.999902,"y":-7.979969},{"x":-7.649903,"y":-7.979969},{"x":-7.649903,"y":8.329969},{"x":7.999902,"y":8.329969}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C105419.obj?uuid=761680ba9d244812bfb349e4268ee9de",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C105419.step?uuid=761680ba9d244812bfb349e4268ee9de",
            pcbRotationOffset: 270,
            modelOriginPosition: { x: -0.025, y: 0.245027, z: -0.05 },
          }}
          {...props}
        />
      )
    }"
  `)
})
