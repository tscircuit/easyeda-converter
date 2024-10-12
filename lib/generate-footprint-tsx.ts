import { z } from "zod"
import type { BetterEasyEdaJson } from "./schemas/easy-eda-json-schema"
import type {
  HoleSchema,
  PadSchema,
} from "./schemas/package-detail-shape-schema"
import { computeCenterOffset } from "./compute-center-offset"
import { mm, mmStr } from "@tscircuit/mm"
import { convertEasyEdaJsonToTscircuitSoupJson } from "./convert-easyeda-json-to-tscircuit-soup-json"
import type { AnyCircuitElement } from "circuit-json"
import { su } from "@tscircuit/soup-util"

export const generateFootprintTsx = (
  circuitJson: AnyCircuitElement[],
): string => {
  const holes = su(circuitJson).pcb_hole.list()
  const platedHoles = su(circuitJson).pcb_plated_hole.list()
  const smtPads = su(circuitJson).pcb_smtpad.list()

  const elementStrings: string[] = []

  for (const hole of holes) {
    if (hole.hole_shape === "circle") {
      elementStrings.push(
        `<hole pcbX="${mmStr(hole.x)}" pcbY="${mmStr(hole.y)}" diameter="${mmStr(hole.hole_diameter)}" />`,
      )
    } else if (hole.hole_shape === "oval") {
      console.warn("Unhandled oval hole in conversion (needs implementation)")
    }
  }

  for (const platedHole of platedHoles) {
    if (platedHole.shape === "oval") {
      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(platedHole.port_hints)}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" diameter="${mmStr(platedHole.hole_width)}" height="${mmStr(platedHole.hole_height)}" shape="oval" />`,
      )
    } else if (platedHole.shape === "circle") {
      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(platedHole.port_hints)}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" diameter="${mmStr(platedHole.hole_diameter)}" shape="circle" />`,
      )
    } else if (platedHole.shape === "pill") {
      console.warn("Unhandled pill hole in conversion (needs implementation)")
    }
  }

  for (const smtPad of smtPads) {
    if (smtPad.shape === "circle") {
      elementStrings.push(
        `<smtpad portHints={${JSON.stringify(smtPad.port_hints)}} pcbX="${mmStr(smtPad.x)}" pcbY="${mmStr(smtPad.y)}" radius="${mmStr(smtPad.radius)}" shape="circle" />`,
      )
    } else if (smtPad.shape === "rect") {
      elementStrings.push(
        `<smtpad portHints={${JSON.stringify(smtPad.port_hints)}} pcbX="${mmStr(smtPad.x)}" pcbY="${mmStr(smtPad.y)}" width="${mmStr(smtPad.width)}" height="${mmStr(smtPad.height)}" shape="rect" />`,
      )
    }
  }

  return `
      <footprint>
        ${elementStrings.join("\n")}
      </footprint>
  `.trim()
}
