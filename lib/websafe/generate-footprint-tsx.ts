import { mmStr } from "@tscircuit/mm"
import type { AnyCircuitElement } from "circuit-json"
import { su } from "@tscircuit/circuit-json-util"

interface GenerateFootprintTsxOptions {
  portHintsMap?: Record<string, string[]>
}

const mapPortHints = (
  portHints: string[] | undefined,
  portHintsMap: Record<string, string[]> | undefined,
): string[] | undefined => {
  if (!portHintsMap || !portHints) return portHints

  return portHints.flatMap((hint) => portHintsMap[hint] ?? [hint])
}

export const generateFootprintTsx = (
  circuitJson: AnyCircuitElement[],
  options: GenerateFootprintTsxOptions = {},
): string => {
  const holes = su(circuitJson).pcb_hole.list()
  const platedHoles = su(circuitJson).pcb_plated_hole.list()
  const smtPads = su(circuitJson).pcb_smtpad.list()
  const vias = su(circuitJson).pcb_via.list()
  const silkscreenPaths = su(circuitJson).pcb_silkscreen_path.list()
  const silkscreenTexts = su(circuitJson).pcb_silkscreen_text.list()
  const courtyardOutlines = su(circuitJson).pcb_courtyard_outline.list()

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
    if (platedHole.shape === "pill" || platedHole.shape === "oval") {
      const cccwRotationDegree = platedHole.ccw_rotation || 0
      const rotation = cccwRotationDegree
        ? ` pcbRotation="${cccwRotationDegree}deg"`
        : ""

      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(mapPortHints(platedHole.port_hints, options.portHintsMap))}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" holeWidth="${mmStr(platedHole.hole_width)}" holeHeight="${mmStr(platedHole.hole_height)}" outerWidth="${mmStr(platedHole.outer_width)}" outerHeight="${mmStr(platedHole.outer_height)}"${rotation} shape="${platedHole.shape}" />`,
      )
    } else if (platedHole.shape === "pill_hole_with_rect_pad") {
      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(mapPortHints(platedHole.port_hints, options.portHintsMap))}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" holeWidth="${mmStr(platedHole.hole_width)}" holeHeight="${mmStr(platedHole.hole_height)}" outerWidth="${mmStr(platedHole.rect_pad_width)}" outerHeight="${mmStr(platedHole.rect_pad_height)}" shape="pill" />`,
      )
    } else if (platedHole.shape === "circle") {
      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(mapPortHints(platedHole.port_hints, options.portHintsMap))}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" outerDiameter="${mmStr(platedHole.outer_diameter)}" holeDiameter="${mmStr(platedHole.hole_diameter)}" shape="circle" />`,
      )
    } else if (platedHole.shape === "rotated_pill_hole_with_rect_pad") {
      const rotation = platedHole.hole_ccw_rotation || 0

      elementStrings.push(
        `<platedhole  portHints={${JSON.stringify(mapPortHints(platedHole.port_hints, options.portHintsMap))}} pcbX="${mmStr(platedHole.x)}" pcbY="${mmStr(platedHole.y)}" holeWidth="${mmStr(platedHole.hole_width)}" holeHeight="${mmStr(platedHole.hole_height)}" outerWidth="${mmStr(platedHole.rect_pad_width)}" outerHeight="${mmStr(platedHole.rect_pad_height)}" rectPad={true} pcbRotation="${rotation}deg" shape="pill" />`,
      )
    }
  }

  for (const smtPad of smtPads) {
    if (smtPad.shape === "circle") {
      elementStrings.push(
        `<smtpad portHints={${JSON.stringify(mapPortHints(smtPad.port_hints, options.portHintsMap))}} pcbX="${mmStr(smtPad.x)}" pcbY="${mmStr(smtPad.y)}" radius="${mmStr(smtPad.radius)}" shape="circle" />`,
      )
    } else if (smtPad.shape === "rect") {
      const cornerRadius =
        smtPad.corner_radius ?? smtPad.rect_border_radius ?? undefined
      const cornerRadiusAttr =
        cornerRadius !== undefined
          ? ` cornerRadius="${mmStr(cornerRadius)}"`
          : ""
      elementStrings.push(
        `<smtpad portHints={${JSON.stringify(smtPad.port_hints)}} pcbX="${mmStr(smtPad.x)}" pcbY="${mmStr(smtPad.y)}" width="${mmStr(smtPad.width)}" height="${mmStr(smtPad.height)}"${cornerRadiusAttr} shape="rect" />`,
      )
    } else if (smtPad.shape === "pill") {
      elementStrings.push(
        `<smtpad portHints={${JSON.stringify(smtPad.port_hints)}} pcbX="${mmStr(smtPad.x)}" pcbY="${mmStr(smtPad.y)}" width="${mmStr(smtPad.width)}" height="${mmStr(smtPad.height)}" radius="${mmStr(smtPad.radius)}" shape="pill" />`,
      )
    } else if (smtPad.shape === "polygon") {
      const pointsStr = smtPad.points
        .map((p) => `{x: "${mmStr(p.x)}", y: "${mmStr(p.y)}"}`)
        .join(", ")
      elementStrings.push(
        `<smtpad portHints={${JSON.stringify(mapPortHints(smtPad.port_hints, options.portHintsMap))}} points={[${pointsStr}]} shape="polygon" />`,
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
    // Preserve the "{NAME}" placeholder so the runtime/editor can resolve it
    const isRefDes = silkscreenText.text === "{NAME}"
    const textValue = isRefDes
      ? JSON.stringify("{NAME}")
      : JSON.stringify(silkscreenText.text)

    elementStrings.push(
      `<silkscreentext text=${textValue} pcbX="${mmStr(silkscreenText.anchor_position.x)}" pcbY="${mmStr(silkscreenText.anchor_position.y)}" anchorAlignment="${silkscreenText.anchor_alignment}" ${silkscreenText.font_size ? `fontSize="${mmStr(silkscreenText.font_size)}"` : ""} />`,
    )
  }

  for (const courtyardOutline of courtyardOutlines) {
    elementStrings.push(
      `<courtyardoutline outline={${JSON.stringify(courtyardOutline.outline)}} />`,
    )
  }

  return `
      <footprint>
        ${elementStrings.join("\n")}
      </footprint>
  `.trim()
}
