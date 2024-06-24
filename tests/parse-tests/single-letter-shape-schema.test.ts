import { it, expect } from "bun:test"
import { SingleLetterShapeSchema } from "lib/schemas/single-letter-shape-schema"

const examples = [
  "R~365~275~2~2~70~50~#880000~1~0~none~gge1~0~",
  "E~370~280~1.5~1.5~#880000~1~0~#880000~gge2~0",
  "P~show~0~1~355~285~180~gge5~0^^355~285^^M355,285h10~#000000^^1~368.7~289~0~GND~start~~~#000000^^1~364.5~284~0~1~end~~~#000000^^0~362~285^^0~M 365 288 L 368 285 L 365 282",
  "P~show~0~2~355~295~180~gge6~0^^355~295^^M355,295h10~#880000^^1~368.7~299~0~TRIG~start~~~#0000FF^^1~364.5~294~0~2~end~~~#0000FF^^0~362~295^^0~M 365 298 L 368 295 L 365 292",
  "P~show~0~3~355~305~180~gge7~0^^355~305^^M355,305h10~#880000^^1~368.7~309~0~OUT~start~~~#0000FF^^1~364.5~304~0~3~end~~~#0000FF^^0~362~305^^0~M 365 308 L 368 305 L 365 302",
  "P~show~0~4~355~315~180~gge8~0^^355~315^^M355,315h10~#880000^^1~368.7~319~0~RESET~start~~~#0000FF^^1~364.5~314~0~4~end~~~#0000FF^^0~362~315^^0~M 365 318 L 368 315 L 365 312",
  "P~show~0~5~445~315~0~gge9~0^^445~315^^M445,315h-10~#880000^^1~431.3~319~0~CONT~end~~~#0000FF^^1~435.5~314~0~5~start~~~#0000FF^^0~438~315^^0~M 435 312 L 432 315 L 435 318",
  "P~show~0~6~445~305~0~gge10~0^^445~305^^M445,305h-10~#880000^^1~431.3~309~0~THRES~end~~~#0000FF^^1~435.5~304~0~6~start~~~#0000FF^^0~438~305^^0~M 435 302 L 432 305 L 435 308",
  "P~show~0~7~445~295~0~gge11~0^^445~295^^M445,295h-10~#880000^^1~431.3~299~0~DISCH~end~~~#0000FF^^1~435.5~294~0~7~start~~~#0000FF^^0~438~295^^0~M 435 292 L 432 295 L 435 298",
  "P~show~0~8~445~285~0~gge12~0^^445~285^^M445,285h-10~#FF0000^^1~431.3~289~0~VCC~end~~~#FF0000^^1~435.5~284~0~8~start~~~#FF0000^^0~438~285^^0~M 435 282 L 432 285 L 435 288",
]

it("parses examples for single letter shape schema", () => {
  examples.forEach((example) => {
    expect(() => {
      try {
        SingleLetterShapeSchema.parse(example)
      } catch (error: any) {
        console.log(error)
        throw new Error(
          `Failed to parse example: ${example}. Error: ${error.message}`
        )
      }
    }).not.toThrow()
  })
})
