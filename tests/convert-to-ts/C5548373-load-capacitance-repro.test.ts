import { beforeAll, expect, it } from "bun:test"
import type { AnyCircuitElement } from "circuit-json"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import crystalRawEasy from "../assets/C5548373.raweasy.json"

let generatedTsx: string

beforeAll(async () => {
  const betterEasy = EasyEdaJsonSchema.parse(crystalRawEasy)

  // CAD is unrelated to the required crystal props. Keep the captured pins
  // and pads, but omit the model node so conversion needs no model download.
  betterEasy.packageDetail.dataStr.shape =
    betterEasy.packageDetail.dataStr.shape.filter(
      (shape) => shape.type !== "SVGNODE",
    )

  generatedTsx = await convertBetterEasyToTsx({ betterEasy })
})

const renderImportedCrystal = (instanceProps = "") =>
  runTscircuitCode(`
    ${generatedTsx}

    export default () => (
      <board width={10} height={10} routingDisabled>
        <ABM11W_32_0000MHZ_6_B1U_T3 name="X1" ${instanceProps} />
      </board>
    )
  `)

const getSnapshotSvg = (circuitJson: AnyCircuitElement[]) =>
  convertCircuitJsonToSchematicSvg(
    circuitJson.map((element) =>
      element.type === "source_failed_to_create_component_error"
        ? {
            ...element,
            // Keep the actual error, excluding the verbose serialized React
            // props. Assertions below still use the original Circuit JSON.
            message: element.message.split(" Details:")[0],
          }
        : element,
    ),
    { showErrorsInTextOverlay: true },
  )

it("converts captured C5548373 data to a four-pin 32 MHz crystal", () => {
  expect(generatedTsx).toContain("<crystal")
  expect(generatedTsx).toContain('frequency="32MHz"')
  expect(generatedTsx).toContain('pinVariant="four_pin"')
  expect(generatedTsx).toContain('"C5548373"')
  expect(generatedTsx).toContain(
    'manufacturerPartNumber="ABM11W-32.0000MHZ-6-B1U-T3"',
  )
})

it("renders all four C5548373 pins with the explicit 6 pF workaround", async () => {
  const circuitJson = await renderImportedCrystal('loadCapacitance="6pF"')
  const sourcePorts = circuitJson.filter(
    (element) => element.type === "source_port",
  )

  expect(circuitJson).not.toContainEqual(
    expect.objectContaining({
      type: "source_failed_to_create_component_error",
    }),
  )
  expect(circuitJson).toContainEqual(
    expect.objectContaining({
      type: "source_component",
      name: "X1",
      ftype: "simple_crystal",
      load_capacitance: 6e-12,
    }),
  )
  expect(sourcePorts.map((port) => port.pin_number).sort()).toEqual([
    1, 2, 3, 4,
  ])
  expect(
    circuitJson.filter((element) => element.type === "pcb_port"),
  ).toHaveLength(4)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(4)

  await expect(getSnapshotSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C5548373-explicit-6pf-schematic",
  )
})

// Characterize the current failure and snapshot it. A fix should update these
// assertions and the snapshot to require the component's four pins instead.
it("snapshots C5548373 rejection when loadCapacitance is omitted", async () => {
  const circuitJson = await renderImportedCrystal()
  const creationErrors = circuitJson
    .filter(
      (element) => element.type === "source_failed_to_create_component_error",
    )
    .map((error) => error.message.split(" Details:")[0])

  expect(creationErrors).toEqual([
    'Could not create crystal "X1". Invalid props for crystal "X1": loadCapacitance (Required)',
  ])
  expect(
    circuitJson.filter((element) => element.type === "source_port"),
  ).toHaveLength(0)
  expect(
    circuitJson.filter((element) => element.type === "pcb_port"),
  ).toHaveLength(0)
  expect(
    circuitJson.filter((element) => element.type === "pcb_smtpad"),
  ).toHaveLength(0)

  await expect(getSnapshotSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C5548373-missing-load-capacitance-schematic",
  )
})
