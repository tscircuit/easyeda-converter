import { expect, test } from "bun:test"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import connectorRawEasy from "../assets/C131337.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

test("repro: JLCPCB connector import loses connector type and insertion direction", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(connectorRawEasy)

  // Use the EasyEDA category rather than a specific package name so this
  // reproduces the general connector-classification path.
  expect(betterEasy.tags.join(" ").toLowerCase()).toContain("connector")

  const result = await convertBetterEasyToTsx({ betterEasy })

  // Current broken behavior: a connector outside the narrow Micro-USB
  // detector is emitted as a generic chip, and its footprint carries no
  // mating/insertion direction for board-edge placement validation.
  expect(result).toContain("<chip")
  expect(result).not.toContain("<connector")
  expect(result).not.toContain("insertionDirection=")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "connector-missing-insertion-direction-repro",
  )
}, 50000)
