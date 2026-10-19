import { expect, test } from "bun:test"
import type { AnyCircuitElement } from "circuit-json"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { generateFootprintTsx } from "lib/websafe/generate-footprint-tsx"
import { runTscircuitCode } from "tscircuit"
import locatingHoles from "./assets/npth-locating-holes.circuit.json"

// Synthetic, minimal generator input using the drawing's nominal dimensions.
// This is not a captured EasyEDA export of C5815189.
test("reproduces a pill NPTH disappearing during footprint generation", async () => {
  const holes = locatingHoles as AnyCircuitElement[]
  const board = {
    type: "pcb_board",
    pcb_board_id: "board",
    center: { x: 0, y: 0 },
    width: 12,
    height: 4,
    num_layers: 2,
    thickness: 1.6,
    material: "fr4",
  } as const
  const footprint = generateFootprintTsx(holes)
  const rendered = await runTscircuitCode(`
    export default () => (
      <board width="12mm" height="4mm">
        <chip name="J1" footprint={${footprint}} />
      </board>
    )
  `)

  expect(holes).toHaveLength(2)
  expect(footprint).toMatchInlineSnapshot(`
    "<footprint>
            <hole pcbX="-4mm" pcbY="0mm" diameter="0.71mm" />
          </footprint>"
  `)
  // Characterize the bug on the reproduction branch; the fix must retain both.
  expect(footprint.match(/<hole\b/g)).toHaveLength(1)
  expect(
    rendered.filter((element) => element.type === "pcb_hole"),
  ).toHaveLength(1)
  expect(convertCircuitJsonToPcbSvg([board, ...holes])).toMatchSvgSnapshot(
    import.meta.path,
    "npth-locating-holes-intermediate",
  )
  expect(convertCircuitJsonToPcbSvg(rendered)).toMatchSvgSnapshot(
    import.meta.path,
    "npth-locating-holes-generated",
  )
})
