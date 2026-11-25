import { afterEach, beforeEach, expect, test } from "bun:test"
import { existsSync, mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const cli = resolve(import.meta.dir, "../cli/main.ts")
const input = resolve(import.meta.dir, "assets/C1046.raweasy.json")
let cwd: string

beforeEach(() => {
  cwd = mkdtempSync(join(tmpdir(), "easyeda-cli-"))
})

afterEach(() => {
  rmSync(cwd, { recursive: true, force: true })
})

function convert(...args: string[]) {
  return Bun.spawnSync(
    [process.execPath, cli, "convert", "-i", input, ...args],
    {
      cwd,
    },
  )
}

for (const flag of ["-t", "--output-format"]) {
  test(`convert ${flag} writes the inferred filename`, async () => {
    const result = convert(flag, "raweasy.json")
    expect(result.exitCode).toBe(0)
    const output = Bun.file(join(cwd, "C1046.raweasy.json"))
    expect(await output.json()).toEqual(await Bun.file(input).json())
  })
}

for (const [filename, message] of [
  ["out.xyz", "Unsupported output format"],
  ["out.kicad_mod", "not yet implemented"],
]) {
  test(`convert rejects ${filename} with a failing exit status`, () => {
    const result = convert("-o", filename)
    expect(result.exitCode).not.toBe(0)
    expect(result.stderr.toString()).toContain(message)
    expect(existsSync(join(cwd, filename))).toBe(false)
  })
}
