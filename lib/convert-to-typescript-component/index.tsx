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
    pinLabels: {},
    schPinArrangement: {},
    objUrl: cad_component.model_obj_url,
  })
}
