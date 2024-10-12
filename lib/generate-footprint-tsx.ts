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
        `<hole pcbX={${mmStr(hole.x)}} pcbY={${mmStr(hole.y)}} diameter={${mmStr(hole.hole_diameter)}} />`,
      )
    } else if (hole.hole_shape === "oval") {
      console.warn("Unhandled oval hole in conversion (needs implementation)")
    }
  }

  for (const platedHole of platedHoles) {
    if (platedHole.shape === "oval") {
      elementStrings.push(
        `<platedhole pcbX={${mmStr(platedHole.x)}} pcbY={${mmStr(platedHole.y)}} diameter={${mmStr(platedHole.hole_width)}} height={${mmStr(platedHole.hole_height)}} shape="oval" />`,
      )
    } else if (platedHole.shape === "circle") {
      elementStrings.push(
        `<platedhole pcbX={${mmStr(platedHole.x)}} pcbY={${mmStr(platedHole.y)}} diameter={${mmStr(platedHole.hole_diameter)}} shape="circle" />`,
      )
    } else if (platedHole.shape === "pill") {
      console.warn("Unhandled pill hole in conversion (needs implementation)")
    }
  }

  for (const smtPad of smtPads) {
    if (smtPad.shape === "circle") {
      elementStrings.push(
        `<smtpad pcbX={${mmStr(smtPad.x)}} pcbY={${mmStr(smtPad.y)}} radius={${mmStr(smtPad.radius)}} shape="circle" />`,
      )
    } else if (smtPad.shape === "rect") {
      elementStrings.push(
        `<smtpad pcbX={${mmStr(smtPad.x)}} pcbY={${mmStr(smtPad.y)}} width={${mmStr(smtPad.width)}} height={${mmStr(smtPad.height)}} shape="rect" />`,
      )
    }
  }

  // const pads = easyEdaJson.packageDetail.dataStr.shape.filter(
  //   (shape): shape is z.infer<typeof PadSchema> => shape.type === "PAD",
  // )
  // const holes = easyEdaJson.packageDetail.dataStr.shape.filter(
  //   (shape): shape is z.infer<typeof HoleSchema> => shape.type === "HOLE",
  // )
  // const centerOffset = computeCenterOffset(easyEdaJson)
  // const centerX = centerOffset.x
  // const centerY = centerOffset.y
  // const footprintElements = pads.map((pad) => {
  //   const { center, width, height, holeRadius, number } = pad
  //   const isPlatedHole = holeRadius !== undefined && mm(holeRadius) > 0
  //   // Normalize the position by subtracting the center point
  //   const normalizedX = mm(center.x) - centerX
  //   const normalizedY = mm(center.y) - centerY
  //   if (isPlatedHole) {
  //     return `
  //       <platedhole
  //         pcbX="${normalizedX.toFixed(2)}mm"
  //         pcbY="${normalizedY.toFixed(2)}mm"
  //         hole_diameter="${mm(holeRadius) * 2}mm"
  //         outer_diameter="${mm(width)}mm"
  //         portHints={["${number}"]}
  //       />`.replace(/\n/, "")
  //   }
  //   return `
  //       <smtpad
  //         pcbX="${normalizedX.toFixed(2)}mm"
  //         pcbY="${normalizedY.toFixed(2)}mm"
  //         width="${mm(width)}mm"
  //         height="${mm(height)}mm"
  //         shape="rect"
  //         portHints={["${number}"]}
  //       />`.replace(/\n/, "")
  // })
  return `
      <footprint>
        ${elementStrings.join("\n")}
      </footprint>
  `.trim()
}
