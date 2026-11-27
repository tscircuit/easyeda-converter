# C5548373 crystal import requires a load-capacitance override

Part: ABRACON ABM11W-32.0000MHZ-6-B1U-T3, JLCPCB/LCSC C5548373.
The raw EasyEDA fixture was captured on 2026-10-26 using
`fetchEasyEDAComponent("C5548373", { includeModelMetadata: false })`.

## Ownership and input

The CLI's `lib/import/import-component-from-jlcpcb.ts` calls
`convertRawEasyToTsx` from `easyeda/browser`. This repository's
`lib/websafe/convert-to-typescript-component/generate-typescript-component.ts`
emits the crystal wrapper. The captured source contains `Value: "32MHz"`
and four physical pads, but has no load-capacitance field.

The generated wrapper sets `frequency="32MHz"` and `pinVariant="four_pin"`.
Its `ImportedCrystalProps` omits only `frequency` and `pinVariant` from
`CrystalProps`, leaving `loadCapacitance` required from the caller.

## Reproduce

```sh
bun install
bun test tests/convert-to-ts/C5548373-load-capacitance-repro.test.ts
```

The test uses the real converter and captured supplier data. It removes only
the parsed CAD model node to avoid a model download; schematic pins and PCB
pads are retained. Rendering is a footprint/port check with PCB routing disabled.

The tests characterize the current incorrect output and commit SVG snapshots
using `convertCircuitJsonToSchematicSvg` and `toMatchSvgSnapshot`. They pass while
the captured behavior remains unchanged. A future fix should update the failure
assertions and snapshot to require the component's four pins.

Without an override, the captured diagnostic is:

```text
Could not create crystal "X1". Invalid props for crystal "X1": loadCapacitance (Required)
```

With `<ABM11W_32_0000MHZ_6_B1U_T3 name="X1" />`, the whole component is
rejected: zero source ports, zero PCB ports and zero pads are created.
With `<ABM11W_32_0000MHZ_6_B1U_T3 name="X1" loadCapacitance="6pF" />`,
all four physical pins and pads render, with a recorded load capacitance of
`6e-12` F. The supplied `6pF` value is a control/workaround, not a default
inferred by the converter.

## Visual snapshots

- [Missing load capacitance: rejected crystal, no pins](../convert-to-ts/__snapshots__/C5548373-missing-load-capacitance-schematic.snap.svg)
- [Explicit 6 pF: four-pin crystal](../convert-to-ts/__snapshots__/C5548373-explicit-6pf-schematic.snap.svg)

The SVGs are native schematic renders of the evaluator's Circuit JSON. The
failure snapshot enables the native error-text overlay and trims only the
serialized React-props suffix from its diagnostic text. Structural assertions
use the unmodified runtime output. No symbol or missing pins are drawn manually.

The no-override case is deliberately evaluated as a TSX string. It is not a
type-correct consumer of the current generated API, which requires this prop.
This reproduction exposes the missing-metadata/default-import usability gap;
the converter's handling of absent load-capacitance data needs a design decision.
No production generator changes or guessed load-capacitance defaults are included.
