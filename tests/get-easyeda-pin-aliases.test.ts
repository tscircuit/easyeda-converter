import { expect, test } from "bun:test"
import { getEasyEdaPinAliases } from "lib/utils/get-easyeda-pin-aliases"
import { normalizePinLabels } from "lib/utils/normalize-pin-labels"

test.each([
  ["PA0/RESET#/UPDI", ["PA0", "N_RESET", "UPDI"]],
  ["#RST/NMI/SBWTDIO", ["N_RST", "NMI", "SBWTDIO"]],
  ["PA0/RESET#", ["PA0", "N_RESET"]],
  ["P1.3/TA1.2/A3/C3", ["P1_3", "TA1_2", "A3", "C3"]],
  ["D+/D-", ["D_POS", "D_NEG"]],
  ["3V3(OUT)", ["3V3_OUT"]],
  ["(PA0)", ["PA0"]],
  ["_READY_", ["_READY_"]],
  [" / PA0 / / UPDI / ", ["PA0", "UPDI"]],
  ["", []],
  ["+/-", []],
])("converts external pin name %s to connection aliases", (label, aliases) => {
  expect(getEasyEdaPinAliases(label)).toEqual(aliases)
})

test("deduplicates aliases before distinguishing shared pin functions", () => {
  expect(
    normalizePinLabels([
      ["1", ...getEasyEdaPinAliases("PA0/PA0/RESET#")],
      ["2", ...getEasyEdaPinAliases("PA1/RESET#")],
    ]),
  ).toEqual([
    ["pin1", "PA0", "N_RESET1"],
    ["pin2", "PA1", "N_RESET2"],
  ])
})
