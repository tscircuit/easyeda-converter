type Point = { x: number; y: number }

export const getAxisAlignedRectangle = (outline: Point[]) => {
  const points = outline.filter((p, i) => {
    const prev = outline[(i + outline.length - 1) % outline.length]!
    return p.x !== prev.x || p.y !== prev.y
  })
  const corners = points.filter((p, i) => {
    const prev = points[(i + points.length - 1) % points.length]!
    const next = points[(i + 1) % points.length]!
    const alongX =
      prev.y === p.y && p.y === next.y && (p.x - prev.x) * (next.x - p.x) > 0
    const alongY =
      prev.x === p.x && p.x === next.x && (p.y - prev.y) * (next.y - p.y) > 0
    return !alongX && !alongY
  })
  if (corners.length !== 4) return
  const [a, b, c, d] = corners
  if (!a || !b || !c || !d || a.x === c.x || a.y === c.y) return
  const horizontalFirst =
    a.y === b.y && b.x === c.x && c.y === d.y && d.x === a.x
  const verticalFirst = a.x === b.x && b.y === c.y && c.x === d.x && d.y === a.y
  if (!horizontalFirst && !verticalFirst) return
  return {
    left: Math.min(a.x, c.x),
    right: Math.max(a.x, c.x),
    top: Math.min(a.y, c.y),
    bottom: Math.max(a.y, c.y),
  }
}
