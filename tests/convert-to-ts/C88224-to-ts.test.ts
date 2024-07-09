import { it, expect } from "bun:test"
import chipRawEasy from "../assets/C88224.raweasy.json"
import { convertToTypescriptComponent } from "lib/convert-to-typescript-component"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToTscircuitSoupJson } from "lib"

it("should convert c88224 into typescript file", async () => {
  const easyeda = EasyEdaJsonSchema.parse(chipRawEasy)
  const soup = convertEasyEdaJsonToTscircuitSoupJson(easyeda, {
    useModelCdn: true,
  })
  const result = convertToTypescriptComponent({
    easyeda,
    soup,
  })

  console.log(result)

  // This basically means a number wasn't converted properly- EasyEDA uses "mil"
  // or "tenth-mil" for it's internal units, when we first parse them we add
  // the "mil" suffix so that everything has a unit- but for some reason in some
  // places we're not calling the mm(...) function from @tscircuit/mm to properly
  // convert the number to mm OR we're taking the string "XXXmil" and just adding
  // "mm" to it.... In tscircuit putting "XXXmil" OR "XXXmm" is acceptable but
  // you can't do "XXXmilmm".
  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")
})
