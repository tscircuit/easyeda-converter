import { expect, test } from "bun:test"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { categoryValueContainsSwitch } from "lib/websafe/convert-to-typescript-component/category-value-contains-switch"
import { isSwitchCategoryComponent } from "lib/websafe/convert-to-typescript-component/is-switch-category-component"
import tps2553RawEasy from "../assets/C55266.raweasy.json"

test.each([
  "Power Distribution Switches",
  "Power-Distribution Switch",
  "PMIC - Power Distribution Switches, Load Drivers",
  "Load Switches",
  "LOAD-SWITCH",
  "Analog Switches / Multiplexers",
  "Analog-Switch",
  "Switching Diodes",
  "Switch ICs",
])("does not treat %s as a mechanical switch", (category) => {
  expect(categoryValueContainsSwitch(category)).toBe(false)
  expect(categoryValueContainsSwitch(["Switches", category])).toBe(false)
  expect(
    categoryValueContainsSwitch({ parent: "Switches", children: [category] }),
  ).toBe(false)
})

test.each([
  "Slide Switches",
  "Toggle Switches",
  "DIP Switches",
  "Key Switches",
  "Micro Switches",
  "Limit Switches",
  "Power Toggle Switches",
])("retains mechanical %s categories", (category) => {
  expect(categoryValueContainsSwitch(category)).toBe(true)
  expect(
    categoryValueContainsSwitch({ parent: "Switches", children: [category] }),
  ).toBe(true)
})

test("ignores absent and non-string categories", () => {
  expect(categoryValueContainsSwitch([null, undefined, 1, false, {}])).toBe(
    false,
  )
})

test("semiconductor tags override a generic switch category", () => {
  const betterEasy = EasyEdaJsonSchema.parse(tps2553RawEasy)
  betterEasy.category = "Switches"
  betterEasy.dataStr.head.c_para.Category = "Switches"
  expect(isSwitchCategoryComponent(betterEasy)).toBe(false)
})

test.each(["category", "Category", "LCSC Category", "JLCPCB Category"])(
  "semiconductor %s metadata overrides generic switch tags",
  (categoryField) => {
    const betterEasy = EasyEdaJsonSchema.parse(tps2553RawEasy)
    betterEasy.tags = ["Switches"]
    betterEasy.dataStr.head.c_para[categoryField] = "Load Switches"
    expect(isSwitchCategoryComponent(betterEasy)).toBe(false)
  },
)

test("a semiconductor top-level category overrides generic switch tags", () => {
  const betterEasy = EasyEdaJsonSchema.parse(tps2553RawEasy)
  betterEasy.tags = ["Switches"]
  betterEasy.category = "Power Distribution Switches"
  expect(isSwitchCategoryComponent(betterEasy)).toBe(false)
})
