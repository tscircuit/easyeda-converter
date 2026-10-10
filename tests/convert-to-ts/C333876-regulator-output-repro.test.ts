import { expect, it } from "bun:test"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C333876.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("does not infer a rail-named VDD pin as a power input for C333876", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  // Regression guard for C333876: a pin labeled VDD18 on a chip where that
  // label denotes the output of an onboard regulator must not be inferred as a
  // power input. The label alone is ambiguous, so no power attribute is
  // emitted.
  //
  // This previously asserted the opposite (`requiresPower: true`), which
  // documented the bug. It is kept as a repro for the fix, not as a record of
  // the broken behaviour.
  expect(result).toContain('pin13: ["VDD18"]')
  expect(result).not.toContain("pin13: {requiresPower: true}")

  // Every other label in this part is either an NC or a bare data/signal name,
  // so the only attributes inferred anywhere are the no-connects.
  expect(result).toContain("pin12: {doNotConnect: true}")
  expect(result).not.toContain("requiresPower")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const vdd18Port = circuitJson.find(
    (element) =>
      element.type === "source_port" && element.port_hints?.includes("VDD18"),
  )

  expect(vdd18Port).toMatchObject({
    type: "source_port",
    name: "VDD18",
    pin_number: 13,
  })
  // Silence, not a guess in the opposite direction: the label does not say
  // whether the pin sources or sinks the rail.
  expect(vdd18Port).not.toHaveProperty("requires_power")
  expect(vdd18Port).not.toHaveProperty("provides_power")

  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "C333876-regulator-output-repro",
  )
}, 50_000)
