# C37616412: explicit USB4215 paste apertures disappear

The captured public EasyEDA footprint for GCT USB4215-03-A contains 16 filled
`SOLIDREGION` records on layer 5, named `TopPasteMaskLayer` in the same input.
Footprint UUID: `3104977db58742e399663286e4a66eac`.
The frozen input was captured on 2026-10-23; its original SHA256 is
`e9542b03e760cfbf3bf74d1ce814ee83b3314d71111d1b1e0674103cdad2cdae`.

```sh
bun test tests/c37616412-paste-loss-repro.test.ts
```

No supplier/model requests or full board builds are needed. The fixture retains
the complete original supplier response. Tested on current main / published
`easyeda@0.0.381`, which already contains the earlier arc sweep fix (#609).

The raw and parsed source both contain 12 contact rectangles and four shell
polygons (128 vertices each). Contact apertures measure approximately
0.30 x 1.20 mm (eight) and 0.60 x 1.20 mm (four); shell regions span approximately
1.00 x 1.80 mm (two) and 1.00 x 2.20 mm (two).

Intermediate Circuit JSON contains zero `pcb_solder_paste` records while keeping
all 12 copper SMT pads and four plated shell slots. The first loss occurs in
`convert-easyeda-json-to-tscircuit-soup-json.ts`: no solid paste-layer handler
exists. `generateFootprintTsx` also has no paste serializer. This is independent
of the earlier NPTH arc issue: the source paste polygons use only M/L commands.

Two explicitly expected-failing tests assert the desired preservation of all 16
apertures and every supplier vertex relative to the A1B12 copper pad. The stacked
fix must turn them into ordinary passing tests. The independent snapshot test
records actual broken intermediate and native output with the repository's
existing `convertCircuitJsonToPcbSvg`, `convertCircuitJsonToSolderPasteMask`, and
`toMatchSvgSnapshot` functions. It stays unchanged in the fix; the four snapshots
must change. Native default pad paste is visible and is not evidence that the
supplier stencil was preserved.

![Intermediate PCB](../__snapshots__/c37616412-intermediate-pcb.snap.svg)
![Intermediate stencil](../__snapshots__/c37616412-intermediate-paste.snap.svg)
![Native PCB](../__snapshots__/c37616412-native-pcb.snap.svg)
![Native stencil](../__snapshots__/c37616412-native-paste.snap.svg)
