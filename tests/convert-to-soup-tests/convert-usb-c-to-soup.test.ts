import { it, expect } from "bun:test"
import usbCEasyEdaJson from "../assets/usb-c.raweasy.json"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertEasyEdaJsonToCircuitJson } from "lib/convert-easyeda-json-to-tscircuit-soup-json"
import { su } from "@tscircuit/circuit-json-util"

it("should convert a usb-c footprint (C2765186) to tscircuit soup json", () => {
  const parsedJson = EasyEdaJsonSchema.parse(usbCEasyEdaJson)
  const soupElements = convertEasyEdaJsonToCircuitJson(parsedJson)
  const soup = su(soupElements)

  const pcbComponent = soup.pcb_component.list()[0]
  expect(pcbComponent).toBeTruthy()

  // 16 pins total: 12 SMT pads + 4 shell mounting holes
  expect(soup.pcb_smtpad.list().length).toBe(12)
  expect(soup.pcb_plated_hole.list().length).toBe(4)

  const cadComponents = soup.cad_component.list()
  expect(cadComponents.length).toBe(1)
  expect(cadComponents[0]?.model_obj_url).toContain(
    "modules.easyeda.com/3dmodel",
  )
})
