import { mmStr } from "@tscircuit/mm"
import type { AnyCircuitElement } from "circuit-json"
import { su } from "@tscircuit/circuit-json-util"

export const generateFootprintTsx = (
  circuitJson: AnyCircuitElement[],
): string => {
  const holes = su(circuitJson).pcb_hole.list()
  const platedHoles = su(circuitJson).pcb_plated_hole.list()
  const smtPads = su(circuitJson).pcb_smtpad.list()
  const silkscreenPaths = su(circuitJson).pcb_silkscreen_path.list()
  const silkscreenTexts = su(circuitJson).pcb_silkscreen_text.list()

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
    if (platedHole.shape === "oval" || platedHole.shape === "pill") {
      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(platedHole.port_hints)}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" outerHeight="${mmStr(platedHole.outer_height)}" outerWidth="${mmStr(platedHole.outer_width)}" holeHeight="${mmStr(platedHole.hole_height)}" holeWidth="${mmStr(platedHole.hole_width)}" shape="${platedHole.shape}" />`,
      )
    } else if (platedHole.shape === "circle") {
      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(platedHole.port_hints)}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" outerDiameter="${mmStr(platedHole.outer_diameter)}" holeDiameter="${mmStr(platedHole.hole_diameter)}" shape="circle" />`,
      )
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

  for (const silkscreenPath of silkscreenPaths) {
    elementStrings.push(
      `<silkscreenpath route={${JSON.stringify(silkscreenPath.route)}} />`,
    )
  }

  for (const silkscreenText of silkscreenTexts) {
    elementStrings.push(
      `<silkscreentext text="${silkscreenText.text}" pcbX="${mmStr(silkscreenText.anchor_position.x)}" pcbY="${mmStr(silkscreenText.anchor_position.y)}" anchorAlignment="${silkscreenText.anchor_alignment}" ${silkscreenText.font_size ? `fontSize="${mmStr(silkscreenText.font_size)}"` : ""} />`,
    )
  }

  return `
      <footprint>
        ${elementStrings.join("\n")}
      </footprint>
  `.trim()
}
