# C37616412 / GCT USB4215-03-A diagonal fabrication region

```sh
bun install
bun test tests/c37616412-fabrication-outline.test.ts
# Regenerate the single PCB snapshot from the current importer:
BUN_UPDATE_SNAPSHOTS=1 bun test tests/c37616412-fabrication-outline.test.ts
```

The test converts the unchanged captured EasyEDA response in
`tests/assets/C37616412.raweasy.json`, generates its footprint TSX, builds a board
with that one connector, and compares the native PCB render with [pcb.svg](pcb.svg).
The reproduction PR records the diagonal; the stacked fix updates this same SVG.
No imported definition or rendered path is manually edited.

The supplier's layer-12 `SOLIDREGION` is a thin filled U marking. Its SVG path uses
repeated L coordinate pairs and A argument groups. `expandEasyEdaPathData` reads
only the first group per command, producing a malformed 12-point fabrication
route with a 9.961452 mm diagonal. The fix consumes every complete group and
preserves the intended 19-point U shape. The PCB renderer faithfully displays
the geometry it receives; the defect belongs in the importer.

Independently reproduced with the latest published CLI on 2026-10-25:
`@tscircuit/cli@0.1.2408`, `tscircuit@0.0.3016`:

```sh
tsci import --jlcpcb C37616412 --download --use-exact-footprint
tsci build index.circuit.tsx --pcb-svgs --pcb-png
```

The CLI circuit was a 14 × 12 mm board containing only
`<USB4215_03_A name="U1" />`. Import and build succeeded; pin-metadata warnings
were retained. The offline test isolates the same footprint conversion.

Compared visually with [GCT's official drawing](https://gct.co/files/drawings/usb4215.pdf),
page 1, revision A, dated 26 April 2024, using the readable PDF archived in the
[reporting repository](https://github.com/AnasSarkiz/rp2040-bldc-servo-controller/blob/main/datasheets/usb4215.pdf).
The drawing shows an axis-aligned 8.94 × 6.50 mm shell and no body-spanning
diagonal. The supplier's approximately 9.054 × 5.154 mm U marking is a separate
representation; the parser fix preserves it rather than inventing new geometry
or certifying mechanical fit.
