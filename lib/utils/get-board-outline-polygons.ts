import { distance, orientation, type Point } from "@tscircuit/math-utils"
import type { PackageTrack } from "./get-silkscreen-arc-path"

const same = (a: Point, b: Point) => distance(a, b) < 0.0001

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
    while (true) {
      const index = remainingEdges.findIndex((edge) =>
        edge.some((p) => edges.flat().some((q) => same(p, q))),
      )
      if (index === -1) break
      edges.push(remainingEdges.splice(index, 1)[0])
    }
    const endpoints = edges.flat()
    if (endpoints.some((p) => endpoints.filter((q) => same(p, q)).length > 2))
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
    while (route.length > 2) {
      const index = route.findIndex(
        (p, i) =>
          orientation(
            route[(i + route.length - 1) % route.length],
            p,
            route[(i + 1) % route.length],
          ) === 0,
      )
      if (index === -1) break
      route.splice(index, 1)
    }
    const area = route.reduce((sum, p, i) => {
      const q = route[(i + 1) % route.length]
      return sum + p.x * q.y - q.x * p.y
    }, 0)
    if (route.length >= 3 && Math.abs(area) > 1e-8) polygons.push(route)
  }
  return polygons
}
