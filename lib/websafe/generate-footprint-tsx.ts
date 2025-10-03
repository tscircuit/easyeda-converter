import { mmStr } from "@tscircuit/mm"
import type { AnyCircuitElement } from "circuit-json"
import { su } from "@tscircuit/circuit-json-util"

export const generateFootprintTsx = (
  circuitJson: AnyCircuitElement[],
): string => {
  const holes = su(circuitJson).pcb_hole.list()
  const platedHoles = su(circuitJson).pcb_plated_hole.list()
  const smtPads = su(circuitJson).pcb_smtpad.list()
  const vias = su(circuitJson).pcb_via.list()
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
    } else if (platedHole.shape === "pill_hole_with_rect_pad") {
      // Always use pill shape for OVAL pads to create oval-shaped pads
      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(platedHole.port_hints)}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" holeWidth="${mmStr(platedHole.hole_width)}" holeHeight="${mmStr(platedHole.hole_height)}" outerWidth="${mmStr(platedHole.rect_pad_width)}" outerHeight="${mmStr(platedHole.rect_pad_height)}" rectPad={true} shape="pill" />`,
      )
    } else if (platedHole.shape === "rotated_pill_hole_with_rect_pad") {
      const rotation = platedHole.hole_ccw_rotation || 0

      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(platedHole.port_hints)}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" holeWidth="${mmStr(platedHole.hole_width)}" holeHeight="${mmStr(platedHole.hole_height)}" outerWidth="${mmStr(platedHole.rect_pad_width)}" outerHeight="${mmStr(platedHole.rect_pad_height)}" rectPad={true} pcbRotation="${rotation}deg" shape="pill" />`,
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
    } else if (smtPad.shape === "polygon") {
      const pointsStr = smtPad.points
        .map((p) => `{x: "${mmStr(p.x)}", y: "${mmStr(p.y)}"}`)
        .join(", ")
      elementStrings.push(
        `<smtpad portHints={${JSON.stringify(smtPad.port_hints)}} points={[${pointsStr}]} shape="polygon" />`,
      )
    }
  }

  for (const via of vias) {
    elementStrings.push(
      `<via pcbX="${mmStr(via.x)}" pcbY="${mmStr(via.y)}" outerDiameter="${mmStr(via.outer_diameter)}" holeDiameter="${mmStr(via.hole_diameter)}" layers={${JSON.stringify(via.layers)}} />`,
    )
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
