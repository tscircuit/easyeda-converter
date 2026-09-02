# L0805 inductor fixture provenance

The L0805 regression uses complete EasyEDA/LCSC component records already stored in this repository, rather than constructed component data.

| Fixture | Real part | EasyEDA UUID | Source listing | SHA-256 |
| --- | --- | --- | --- | --- |
| `C1046.raweasy.json` | Sunlord SDFL2012S100KTF, 10uH | `7e7bd4480f50e43c3f271086aa8e152e` | `https://lcsc.com/product-detail/Inductors-SMD_10uH-10_C1046.html` | `c561d07440361f6303a8cc878196cffd58b8f5d2b53b7ce6a36225a1e35fa441` |
| `C281113.raweasy.json` | microgate MGFL2012F100MT-LF, 10uH | `910aaef3ba604a9a8f17fc3b542dced9` | `https://lcsc.com/product-detail/Inductors-SMD_microgate-MGFL2012F100MT-LF_C281113.html` | `4905c3f850b4aeb964d5a4ff35ca5b9f69e8c1394c63035d079e6b35753a285d` |

Each JSON record contains the original symbol, package, footprint, supplier fields, and 3D model metadata. The regression executes the generated component and snapshots its complete schematic and PCB output.
