import { su } from "@tscircuit/circuit-json-util"
import { mmStr } from "@tscircuit/mm"
import type { AnyCircuitElement, LayerRef } from "circuit-json"

interface GenerateFootprintTsxOptions {
  portHintsMap?: Record<string, string[]>
}

const mapPortHints = (
  portHints: string[] | undefined,
  portHintsMap: Record<string, string[]> | undefined,
): string[] | undefined => {
  if (!portHintsMap || !portHints) return portHints

  return [...new Set(portHints.flatMap((hint) => portHintsMap[hint] ?? [hint]))]
}

const getLayerAttr = (layer: LayerRef | undefined) =>
  layer && layer !== "top" ? ` layer="${layer}"` : ""

const getRotationAttr = (rotation: number | undefined) =>
  rotation ? ` pcbRotation="${rotation}deg"` : ""

const getStringAttr = (name: string, value: string | undefined) =>
  value === undefined ? "" : ` ${name}=${JSON.stringify(value)}`

export const generateFootprintTsx = (
  circuitJson: AnyCircuitElement[],
  options: GenerateFootprintTsxOptions = {},
): string => {
  const holes = su(circuitJson).pcb_hole.list()
  const platedHoles = su(circuitJson).pcb_plated_hole.list()
  const smtPads = su(circuitJson).pcb_smtpad.list()
  const vias = su(circuitJson).pcb_via.list()
  const silkscreenPaths = su(circuitJson).pcb_silkscreen_path.list()
  const silkscreenCircles = su(circuitJson).pcb_silkscreen_circle.list()
  const silkscreenRects = su(circuitJson).pcb_silkscreen_rect.list()
  const silkscreenTexts = su(circuitJson).pcb_silkscreen_text.list()
  const fabricationNotePaths = su(circuitJson).pcb_fabrication_note_path.list()
  const fabricationNoteTexts = su(circuitJson).pcb_fabrication_note_text.list()
  const fabricationNoteRects = su(circuitJson).pcb_fabrication_note_rect.list()
  const fabricationNoteDimensions =
    su(circuitJson).pcb_fabrication_note_dimension.list()
  const pcbNoteTexts = su(circuitJson).pcb_note_text.list()
  const pcbNoteRects = su(circuitJson).pcb_note_rect.list()
  const pcbNotePaths = su(circuitJson).pcb_note_path.list()
  const pcbNoteLines = su(circuitJson).pcb_note_line.list()
  const pcbNoteDimensions = su(circuitJson).pcb_note_dimension.list()
  const courtyardOutlines = su(circuitJson).pcb_courtyard_outline.list()

  const elementStrings: string[] = []

  for (const hole of holes) {
    if (hole.hole_shape === "circle") {
      elementStrings.push(
        `<hole pcbX="${mmStr(hole.x)}" pcbY="${mmStr(hole.y)}" diameter="${mmStr(hole.hole_diameter)}" />`,
      )
    } else if (hole.hole_shape === "oval") {
      elementStrings.push(
        `<hole pcbX="${mmStr(hole.x)}" pcbY="${mmStr(hole.y)}" width="${mmStr(hole.hole_width)}" height="${mmStr(hole.hole_height)}" shape="oval" />`,
      )
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
        `<smtpad portHints={${JSON.stringify(mapPortHints(smtPad.port_hints, options.portHintsMap))}} pcbX="${mmStr(smtPad.x)}" pcbY="${mmStr(smtPad.y)}" width="${mmStr(smtPad.width)}" height="${mmStr(smtPad.height)}"${cornerRadiusAttr} shape="rect" />`,
      )
    } else if (smtPad.shape === "pill") {
      elementStrings.push(
        `<smtpad portHints={${JSON.stringify(mapPortHints(smtPad.port_hints, options.portHintsMap))}} pcbX="${mmStr(smtPad.x)}" pcbY="${mmStr(smtPad.y)}" width="${mmStr(smtPad.width)}" height="${mmStr(smtPad.height)}" radius="${mmStr(smtPad.radius)}" shape="pill" />`,
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
      `<silkscreenpath route={${JSON.stringify(silkscreenPath.route)}} strokeWidth="${mmStr(silkscreenPath.stroke_width)}" />`,
    )
  }

  for (const silkscreenCircle of silkscreenCircles) {
    elementStrings.push(
      `<silkscreencircle pcbX="${mmStr(silkscreenCircle.center.x)}" pcbY="${mmStr(silkscreenCircle.center.y)}" radius="${mmStr(silkscreenCircle.radius)}" />`,
    )
  }

  for (const silkscreenRect of silkscreenRects) {
    const rotation = silkscreenRect.ccw_rotation || 0
    const rotationAttr = rotation ? ` pcbRotation="${rotation}deg"` : ""
    const filledAttr = silkscreenRect.is_filled ? " isFilled" : ""
    const strokeAttr =
      silkscreenRect.has_stroke === false ? " hasStroke={false}" : ""

    elementStrings.push(
      `<silkscreenrect pcbX="${mmStr(silkscreenRect.center.x)}" pcbY="${mmStr(silkscreenRect.center.y)}" width="${mmStr(silkscreenRect.width)}" height="${mmStr(silkscreenRect.height)}" strokeWidth="${mmStr(silkscreenRect.stroke_width)}"${filledAttr}${strokeAttr}${rotationAttr} />`,
    )
  }

  for (const silkscreenText of silkscreenTexts) {
    // Preserve the "{NAME}" placeholder so the runtime/editor can resolve it
    const isRefDes = silkscreenText.text === "{NAME}"
    const textValue = isRefDes
      ? JSON.stringify("{NAME}")
      : JSON.stringify(silkscreenText.text)
    const rotation = silkscreenText.ccw_rotation || 0
    const rotationAttr = rotation ? ` pcbRotation="${rotation}deg"` : ""

    elementStrings.push(
      `<silkscreentext text=${textValue} pcbX="${mmStr(silkscreenText.anchor_position.x)}" pcbY="${mmStr(silkscreenText.anchor_position.y)}" anchorAlignment="${silkscreenText.anchor_alignment}"${rotationAttr}${silkscreenText.font_size ? ` fontSize="${mmStr(silkscreenText.font_size)}"` : ""} />`,
    )
  }

  for (const fabricationNotePath of fabricationNotePaths) {
    elementStrings.push(
      `<fabricationnotepath route={${JSON.stringify(fabricationNotePath.route)}} strokeWidth="${mmStr(fabricationNotePath.stroke_width)}"${getStringAttr("color", fabricationNotePath.color)}${getLayerAttr(fabricationNotePath.layer)} />`,
    )
  }

  for (const fabricationNoteText of fabricationNoteTexts) {
    elementStrings.push(
      `<fabricationnotetext text=${JSON.stringify(fabricationNoteText.text)} pcbX="${mmStr(fabricationNoteText.anchor_position.x)}" pcbY="${mmStr(fabricationNoteText.anchor_position.y)}" anchorAlignment="${fabricationNoteText.anchor_alignment}"${getStringAttr("font", fabricationNoteText.font)}${fabricationNoteText.font_size === undefined ? "" : ` fontSize="${mmStr(fabricationNoteText.font_size)}"`}${getStringAttr("color", fabricationNoteText.color)}${getRotationAttr(fabricationNoteText.ccw_rotation)}${getLayerAttr(fabricationNoteText.layer)} />`,
    )
  }

  for (const fabricationNoteRect of fabricationNoteRects) {
    elementStrings.push(
      `<fabricationnoterect pcbX="${mmStr(fabricationNoteRect.center.x)}" pcbY="${mmStr(fabricationNoteRect.center.y)}" width="${mmStr(fabricationNoteRect.width)}" height="${mmStr(fabricationNoteRect.height)}" strokeWidth="${mmStr(fabricationNoteRect.stroke_width)}"${fabricationNoteRect.corner_radius === undefined ? "" : ` cornerRadius="${mmStr(fabricationNoteRect.corner_radius)}"`}${fabricationNoteRect.is_filled === undefined ? "" : ` isFilled={${fabricationNoteRect.is_filled}}`}${fabricationNoteRect.has_stroke === undefined ? "" : ` hasStroke={${fabricationNoteRect.has_stroke}}`}${fabricationNoteRect.is_stroke_dashed === undefined ? "" : ` isStrokeDashed={${fabricationNoteRect.is_stroke_dashed}}`}${getStringAttr("color", fabricationNoteRect.color)}${getLayerAttr(fabricationNoteRect.layer)} />`,
    )
  }

  for (const fabricationNoteDimension of fabricationNoteDimensions) {
    const offset =
      "offset" in fabricationNoteDimension
        ? fabricationNoteDimension.offset
        : fabricationNoteDimension.offset_distance
    elementStrings.push(
      `<fabricationnotedimension from={${JSON.stringify(fabricationNoteDimension.from)}} to={${JSON.stringify(fabricationNoteDimension.to)}}${getStringAttr("text", fabricationNoteDimension.text)}${getStringAttr("font", fabricationNoteDimension.font)}${fabricationNoteDimension.font_size === undefined ? "" : ` fontSize="${mmStr(fabricationNoteDimension.font_size)}"`}${fabricationNoteDimension.arrow_size === undefined ? "" : ` arrowSize="${mmStr(fabricationNoteDimension.arrow_size)}"`}${offset === undefined ? "" : ` offset="${mmStr(offset)}"`}${getStringAttr("color", fabricationNoteDimension.color)}${getLayerAttr(fabricationNoteDimension.layer)} />`,
    )
  }

  for (const pcbNoteText of pcbNoteTexts) {
    elementStrings.push(
      `<pcbnotetext text=${JSON.stringify(pcbNoteText.text ?? "")} pcbX="${mmStr(pcbNoteText.anchor_position.x)}" pcbY="${mmStr(pcbNoteText.anchor_position.y)}" anchorAlignment="${pcbNoteText.anchor_alignment}"${getStringAttr("font", pcbNoteText.font)}${pcbNoteText.font_size === undefined ? "" : ` fontSize="${mmStr(pcbNoteText.font_size)}"`}${getStringAttr("color", pcbNoteText.color)}${getLayerAttr(pcbNoteText.layer)} />`,
    )
  }

  for (const pcbNoteRect of pcbNoteRects) {
    elementStrings.push(
      `<pcbnoterect pcbX="${mmStr(pcbNoteRect.center.x)}" pcbY="${mmStr(pcbNoteRect.center.y)}" width="${mmStr(pcbNoteRect.width)}" height="${mmStr(pcbNoteRect.height)}" strokeWidth="${mmStr(pcbNoteRect.stroke_width)}"${pcbNoteRect.corner_radius === undefined ? "" : ` cornerRadius="${mmStr(pcbNoteRect.corner_radius)}"`}${pcbNoteRect.is_filled === undefined ? "" : ` isFilled={${pcbNoteRect.is_filled}}`}${pcbNoteRect.has_stroke === undefined ? "" : ` hasStroke={${pcbNoteRect.has_stroke}}`}${pcbNoteRect.is_stroke_dashed === undefined ? "" : ` isStrokeDashed={${pcbNoteRect.is_stroke_dashed}}`}${getStringAttr("color", pcbNoteRect.color)}${getLayerAttr(pcbNoteRect.layer)} />`,
    )
  }

  for (const pcbNotePath of pcbNotePaths) {
    elementStrings.push(
      `<pcbnotepath route={${JSON.stringify(pcbNotePath.route)}} strokeWidth="${mmStr(pcbNotePath.stroke_width)}"${getStringAttr("color", pcbNotePath.color)}${getLayerAttr(pcbNotePath.layer)} />`,
    )
  }

  for (const pcbNoteLine of pcbNoteLines) {
    elementStrings.push(
      `<pcbnoteline x1="${mmStr(pcbNoteLine.x1)}" y1="${mmStr(pcbNoteLine.y1)}" x2="${mmStr(pcbNoteLine.x2)}" y2="${mmStr(pcbNoteLine.y2)}" strokeWidth="${mmStr(pcbNoteLine.stroke_width)}"${pcbNoteLine.is_dashed === undefined ? "" : ` isDashed={${pcbNoteLine.is_dashed}}`}${getStringAttr("color", pcbNoteLine.color)}${getLayerAttr(pcbNoteLine.layer)} />`,
    )
  }

  for (const pcbNoteDimension of pcbNoteDimensions) {
    const offset = pcbNoteDimension.offset_distance
    elementStrings.push(
      `<pcbnotedimension from={${JSON.stringify(pcbNoteDimension.from)}} to={${JSON.stringify(pcbNoteDimension.to)}}${getStringAttr("text", pcbNoteDimension.text)}${getStringAttr("font", pcbNoteDimension.font)}${pcbNoteDimension.font_size === undefined ? "" : ` fontSize="${mmStr(pcbNoteDimension.font_size)}"`}${pcbNoteDimension.arrow_size === undefined ? "" : ` arrowSize="${mmStr(pcbNoteDimension.arrow_size)}"`}${offset === undefined ? "" : ` offset="${mmStr(offset)}"`}${getStringAttr("color", pcbNoteDimension.color)}${getLayerAttr(pcbNoteDimension.layer)} />`,
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
