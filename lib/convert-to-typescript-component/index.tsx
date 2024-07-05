import type { AnySoupElement } from "@tscircuit/soup"
import type { EasyEdaJson } from "lib/schemas/easy-eda-json-schema"
import { su } from "@tscircuit/soup-util"
import { soupTypescriptComponentTemplate } from "./soup-typescript-component-template"

export const convertToTypescriptComponent = ({
  soup,
  easyeda,
}: {
  soup: AnySoupElement[]
  easyeda: EasyEdaJson
}): string => {
  const pn = easyeda.lcsc.number
  const [cad_component] = su(soup).cad_component.list()

  const smtpads = su(soup).pcb_smtpad.list()
  const plated_holes = su(soup).pcb_plated_hole.list()
  const hole = su(soup).pcb_hole.list()

  return soupTypescriptComponentTemplate({
    componentName: pn,
    // TODO derive the pinLabels using the easyeda json
    pinLabels: {
      1: "VCC",
      2: "GND",
      // etc.
    },
    // TODO derive the schPinArrangement from the easyeda json
    schPinArrangement: {
      leftSize: 4,
      rightSize: 4,
    },
    // schPinArrangement: {
    //   leftSide: {
    //     direction: "top-to-bottom",
    //     pins: [1, 2, 3, 4],
    //   },
    //   rightSide: {
    //     direction: "bottom-to-top",
    //     pins: [5, 6, 7, 8],
    //   },
    // },
    objUrl: cad_component.model_obj_url,
  })
}
