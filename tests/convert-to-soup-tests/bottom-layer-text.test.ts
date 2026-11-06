import { expect, test } from "bun:test"
import "bun-match-svg"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { EasyEdaJsonSchema, convertEasyEdaJsonToCircuitJson } from "lib/index"
import rawJson from "tests/assets/C75749.raweasy.json"

test("renders the imported C75749 PCB snapshot", () => {
  const circuitJson = convertEasyEdaJsonToCircuitJson(
    EasyEdaJsonSchema.parse(rawJson),
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
