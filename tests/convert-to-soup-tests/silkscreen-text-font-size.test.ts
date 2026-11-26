import { expect, it } from "bun:test"
import arduinoNanoRaw from "../assets/C9900017879.raweasy.json"
import c75749Raw from "../assets/C75749.raweasy.json"
import c5248081Raw from "../assets/C5248081.raweasy.json"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"

const getFontSizes = (raw: unknown) => [
  ...new Set(
    convertEasyEdaJsonToCircuitJson(EasyEdaJsonSchema.parse(raw))
      .filter((element) => element.type === "pcb_silkscreen_text")
      .map((element) => Number(element.font_size.toFixed(4))),
  ),
]

// EasyEDA PCB TEXT records are
// TEXT~type~x~y~strokeWidth~rotation~mirror~layer~net~fontSize~text~path...
// with strokeWidth and fontSize both in 10 mil units. The glyph outlines in
// these fixtures are ~0.95 x fontSize tall, independent of the stroke width.
it("uses the EasyEDA TEXT font size field, not the stroke width", () => {
  // TEXT~L~402.157~293.583~0.5906~90~0~3~~3.937~D13~... -> 39.37 mil = 1mm
  expect(getFontSizes(arduinoNanoRaw)).toEqual([1])
  // TEXT~L~...~0.5~270~0~3~~3.5~1~... -> 35 mil = 0.889mm
  expect(getFontSizes(c75749Raw)).toEqual([0.889])
  // TEXT~L~4006.532~3027.35~0.8~0~0~3~~8~1~... -> 80 mil = 2.032mm
  expect(getFontSizes(c5248081Raw)).toEqual([2.032])
})
