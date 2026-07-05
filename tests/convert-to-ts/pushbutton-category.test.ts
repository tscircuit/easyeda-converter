import { expect, it } from "bun:test"
import { runTscircuitCode } from "tscircuit"
import c5184526RawEasy from "../assets/C5184526.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { categoryValueContainsPushbutton } from "lib/websafe/convert-to-typescript-component/category-value-contains-pushbutton"
import { categoryValueContainsSwitch } from "lib/websafe/convert-to-typescript-component/category-value-contains-switch"

it("should identify JLCPCB pushbutton metadata as pushbuttons", () => {
  expect(categoryValueContainsPushbutton("Push Button Switches")).toBe(true)
  expect(categoryValueContainsPushbutton("Tactile Switches")).toBe(true)
  expect(categoryValueContainsPushbutton("Mechanical Keyboard Shaft")).toBe(
    true,
  )
  expect(categoryValueContainsPushbutton("Slide Switches")).toBe(false)
  expect(
    categoryValueContainsPushbutton("Analog Switches / Multiplexers"),
  ).toBe(false)
  expect(categoryValueContainsPushbutton("Switching Diode")).toBe(false)
})

it("should identify JLCPCB switch metadata as switches", () => {
  expect(categoryValueContainsSwitch("Slide Switches")).toBe(true)
  expect(categoryValueContainsSwitch("Toggle Switches")).toBe(true)
  expect(categoryValueContainsSwitch("DIP Switches")).toBe(true)
  expect(categoryValueContainsSwitch("Push Button Switches")).toBe(true)
  expect(categoryValueContainsSwitch("Analog Switches / Multiplexers")).toBe(
    false,
  )
  expect(categoryValueContainsSwitch("Switching Diode")).toBe(false)
})

it("should convert JLCPCB pushbutton metadata to pushbutton elements", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(c5184526RawEasy)
  const result = await convertBetterEasyToTsx({ betterEasy })

  expect(result).toContain("PushButtonProps")
  expect(result).toContain("<pushbutton")
  expect(result).not.toContain("<chip")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  const sourceComponent = circuitJson.find(
    (element) => element.type === "source_component",
  )

  expect(sourceComponent?.ftype).toBe("simple_push_button")
  expect(sourceComponent?.supplier_part_numbers).toEqual({
    jlcpcb: ["C5184526"],
  })
})
