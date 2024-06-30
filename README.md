# easyeda-converter

> [!WARNING]
> This library is a work in progress! Not everything works yet!

Convert easyeda JSON PCB footprints into [tscircuit json soup](https://docs.tscircuit.com/api-reference/advanced/soup)

## Library Usage

```ts
import {
  fetchEasyEDAComponent,
  convertEasyEdaJsonToTscircuitSoupJson,
} from "easyeda-converter"

// get raweasy json
const rawEasyJson = await fetchEasyEDAComponent("C46749")

// convert to tscircuit soup
const soupJson = convertEasyEdaJsonToTscircuitSoupJson(rawEasyJson)
```

## CLI

Install the CLI with `npm install -g easyeda`, you can then call
the cli with either `easyeda` or `easyeda-converter`.

```sh
# Convert a schematic and footprint for JLCPCB part number C46749 (NE555) to tscircuit component
easyeda convert -i C46749 -o C46749.ts

# Convert a footprint and schematic for JLCPCB part number C46749 (NE555) to tscircuit soup JSON
# More info: https://docs.tscircuit.com/api-reference/advanced/soup
easyeda convert -i C46749 -o C46749.soup.json

# Convert a footprint for JLCPCB part number C46749 (NE555) to KiCad footprint
easyeda convert -i C46749 -o C46749.kicad_mod

# Download the C46749 footprint and schematic and convert to readable JSON
easyeda convert -i C46749 -o C46749.bettereasy.json

# Can also convert from files!
easyeda convert -i ./C46749.raweasy.json -o C46749.soup.json

# Get exactly what is returned from the JLC API
# The footprint, schematic and some other data is encoded in strings, you
# probably want to convert to *.bettereasy.json
easyeda download -i C46749 -o C46749.raweasy.json
```

## File Formats

| Format              | Description                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| `*.raweasy.json`    | The raw JSON from the EasyEDA API                                                                        |
| `*.bettereasy.json` | The raw JSON from the EasyEDA API, but with the footprint and schematic data decoded                     |
| `*.soup.json`       | The tscircuit's easy-to-use JSON format [(docs)](https://docs.tscircuit.com/api-reference/advanced/soup) |
| `*.kicad_mod`       | A KiCad footprint file                                                                                   |
| `*.ts`              | A tscircuit component file                                                                               |
