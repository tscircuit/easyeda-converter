import { expect, test } from "bun:test"
import { parseEasyEdaPathCommands } from "lib/utils/parse-easyeda-path-commands"

test("retains commands after closepath instead of absorbing them into Z", () => {
  expect(parseEasyEdaPathCommands("M 4 1 L 0 1 Z H 100 V 100")).toEqual([
    { command: "M", arguments: [4, 1] },
    { command: "L", arguments: [0, 1] },
    { command: "Z", arguments: [] },
    { command: "H", arguments: [100] },
    { command: "V", arguments: [100] },
  ])
})

test("retains repeated argument groups and signed scientific notation", () => {
  expect(parseEasyEdaPathCommands("M 1e-3 -2E+2 3 4 L.5,+6. Z")).toEqual([
    { command: "M", arguments: [0.001, -200, 3, 4] },
    { command: "L", arguments: [0.5, 6] },
    { command: "Z", arguments: [] },
  ])
})

test("keeps relative command letters distinct for callers", () => {
  expect(parseEasyEdaPathCommands("m 1 2 l 3 4 z")).toEqual([
    { command: "m", arguments: [1, 2] },
    { command: "l", arguments: [3, 4] },
    { command: "z", arguments: [] },
  ])
})

test.each([
  "",
  "L 1 2",
  "M 1 2 L 3",
  "M 1 2 Z 3 4",
  "M 1 2 Z garbage",
  "M 1 2 L 3 4 @",
  "M 1 2 L 3 4e",
  "M 1 2 L 1e999 4",
  "M 1 2 A 1 1 0 0 1 2",
])("rejects incomplete or invalid command streams: %s", (pathData) => {
  expect(parseEasyEdaPathCommands(pathData)).toBeNull()
})
