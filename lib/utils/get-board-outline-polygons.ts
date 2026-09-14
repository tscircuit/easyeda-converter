import type { PackageTrack } from "./get-silkscreen-arc-path"

type Point = { x: number; y: number }
const same = (a: Point, b: Point) =>
  Math.abs(a.x - b.x) < 0.0001 && Math.abs(a.y - b.y) < 0.0001

/** Join footprint BoardOutline tracks before closing board-edge notch mouths. */
export const getBoardOutlinePolygons = (tracks: PackageTrack[]): Point[][] => {
  const remainingEdges = tracks
    .flatMap((track) =>
      track.points.slice(1).map((point, i) => [track.points[i], point]),
    )
    .filter(([a, b]) => !same(a, b))
  const polygons: Point[][] = []
  while (remainingEdges.length) {
    const edges = [remainingEdges.shift()!]
    // Collect a whole connected component so a branch cannot be mistaken for
    // a valid notch plus an unrelated leftover line.
    let collecting = true
    while (collecting) {
      collecting = false
      for (let i = remainingEdges.length - 1; i >= 0; i--) {
        if (
          remainingEdges[i].some((p) =>
            edges.some((edge) => edge.some((q) => same(p, q))),
          )
        ) {
          edges.push(remainingEdges.splice(i, 1)[0])
          collecting = true
        }
      }
    }
    if (
      edges.some((edge) =>
        edge.some(
          (p) =>
            edges.reduce(
              (degree, other) =>
                degree + other.filter((q) => same(p, q)).length,
              0,
            ) > 2,
        ),
      )
    )
      continue
    const route = edges.shift()!
    let changed = true
    while (changed) {
      changed = false
      for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i]
        if (same(route.at(-1)!, a)) route.push(b)
        else if (same(route.at(-1)!, b)) route.push(a)
        else if (same(route[0], b)) route.unshift(a)
        else if (same(route[0], a)) route.unshift(b)
        else continue
        edges.splice(i, 1)
        changed = true
        break
      }
    }
    // Branches or repeated interior vertices do not define a simple boundary.
    if (same(route[0], route.at(-1)!)) route.pop()
    else {
      // Open footprint notches terminate at a shared horizontal/vertical board
      // edge. Close the mouth there, not each constituent TRACK independently.
      const first = route[0]
      const last = route.at(-1)!
      if (
        Math.abs(first.x - last.x) > 0.0001 &&
        Math.abs(first.y - last.y) > 0.0001
      )
        continue
    }
    if (route.some((p, i) => route.slice(i + 1).some((q) => same(p, q))))
      continue
    // Remove collinear vertices, including outward edge tabs which otherwise
    // double back along the closing edge (as on C2879827).
    let simplified = true
    while (simplified && route.length > 2) {
      simplified = false
      for (let i = 0; i < route.length; i++) {
        const a = route[(i + route.length - 1) % route.length]
        const b = route[i]
        const c = route[(i + 1) % route.length]
        const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x)
        if (Math.abs(cross) < 1e-8) {
          route.splice(i, 1)
          simplified = true
          break
        }
      }
    }
    const area = route.reduce((sum, p, i) => {
      const q = route[(i + 1) % route.length]
      return sum + p.x * q.y - q.x * p.y
    }, 0)
    if (route.length >= 3 && Math.abs(area) > 1e-8) polygons.push(route)
  }
  return polygons
}
