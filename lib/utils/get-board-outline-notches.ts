import type { PackageTrack } from "./get-silkscreen-arc-path"

type Point = { x: number; y: number }
const near = (a: number, b: number) => Math.abs(a - b) < 0.001
const same = (a: Point, b: Point) => near(a.x, b.x) && near(a.y, b.y)
const axis = (a: Point, b: Point) =>
  near(a.x, b.x) ? "y" : near(a.y, b.y) ? "x" : undefined

/** Join layer-10 segments and recognize rectangular edge notches, optionally
 * with outward board-edge stubs. Do not close arbitrary open board outlines. */
export const getBoardOutlineNotches = (tracks: PackageTrack[]): Point[][] => {
  const vertices: Point[] = []
  const edges: [number, number][] = []
  const vertex = (point: Point) => {
    const index = vertices.findIndex((p) => same(p, point))
    if (index >= 0) return index
    vertices.push(point)
    return vertices.length - 1
  }
  for (const track of tracks.filter((t) => t.layer === 10)) {
    for (let i = 1; i < track.points.length; i++) {
      const a = vertex(track.points[i - 1]!)
      const b = vertex(track.points[i]!)
      if (a !== b) edges.push([a, b])
    }
  }
  const neighbors = vertices.map((_, i) =>
    edges.flatMap(([a, b]) => (a === i ? [b] : b === i ? [a] : [])),
  )
  const visited = new Set<number>()
  const notches: Point[][] = []
  for (let start = 0; start < vertices.length; start++) {
    if (visited.has(start)) continue
    const component: number[] = []
    const pending = [start]
    while (pending.length) {
      const i = pending.pop()!
      if (visited.has(i)) continue
      visited.add(i)
      component.push(i)
      pending.push(...neighbors[i]!)
    }
    const ends = component.filter((i) => neighbors[i]!.length === 1)
    if (ends.length !== 2 || component.some((i) => neighbors[i]!.length > 2))
      continue
    const path: Point[] = []
    let previous = -1
    let current: number | undefined = ends[0]!
    while (current !== undefined) {
      path.push(vertices[current]!)
      const next: number | undefined = neighbors[current]!.find(
        (i) => i !== previous,
      )
      previous = current
      current = next
    }
    // Remove intermediate points on straight runs.
    const corners = path.filter((p, i) => {
      if (i === 0 || i === path.length - 1) return true
      const before = axis(path[i - 1]!, p)
      return !before || before !== axis(p, path[i + 1]!)
    })
    if (corners.length !== 4 && corners.length !== 6) continue
    const notch = corners.length === 6 ? corners.slice(1, -1) : corners
    const [a, b, c, d] = notch as [Point, Point, Point, Point]
    const side = axis(a, b)
    const mouth = axis(a, d)
    if (
      !side ||
      !mouth ||
      side === mouth ||
      axis(b, c) !== mouth ||
      axis(c, d) !== side
    )
      continue
    if (corners.length === 6) {
      const first = corners[0]!
      const last = corners[5]!
      if (axis(first, a) !== mouth || axis(d, last) !== mouth) continue
      // Stubs must extend away from the opening, not back into it.
      if (
        (first[mouth] - a[mouth]) * (d[mouth] - a[mouth]) >= 0 ||
        (last[mouth] - d[mouth]) * (a[mouth] - d[mouth]) >= 0
      )
        continue
    }
    notches.push(notch)
  }
  return notches
}
