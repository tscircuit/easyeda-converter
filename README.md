# easyeda-converter

Convert EasyEDA JSON PCB footprints into [Circuit JSON](https://github.com/tscircuit/circuit-json) or TypeScript React components.

[![npm version](https://img.shields.io/npm/v/easyeda.svg)](https://www.npmjs.com/package/easyeda)


```bash
npm install -g easyeda
```

## Library Usage

### Fetching EasyEDA Component Data

```ts
import { fetchEasyEDAComponent } from "easyeda"

// Get raw EasyEDA JSON for a component
const rawEasyJson = await fetchEasyEDAComponent("C46749")
```

### Converting to Circuit JSON

```ts
import { convertEasyEdaJsonToCircuitJson } from "easyeda"

// Convert to tscircuit soup
const soupJson = convertEasyEdaJsonToCircuitJson(rawEasyJson)
```

### Converting to TypeScript React Component

```ts
import { convertRawEasyEdaToTs } from "easyeda"

// Convert to TypeScript React component
const tsxComponent = await convertRawEasyEdaToTs(rawEasyJson)
```

### Full Example: Fetching and Converting to TSX

```ts
import { fetchEasyEDAComponent, convertRawEasyEdaToTs } from "easyeda"

async function convertPartNumberToTsx(partNumber: string) {
  const rawEasyJson = await fetchEasyEDAComponent(partNumber)
  const tsxComponent = await convertRawEasyEdaToTs(rawEasyJson)
  return tsxComponent
}

// Usage
const ne555TsxComponent = await convertPartNumberToTsx("C46749")
console.log(ne555TsxComponent)
```

## CLI

Install the CLI with `npm install -g easyeda`, you can then call
the cli with either `easyeda` or `easyeda-converter`.

```sh
# Convert a schematic and footprint for JLCPCB part number C46749 (NE555) to tscircuit component
easyeda convert -i C46749 -o C46749.tsx
easyeda convert -i C46749 -t tsx

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

| Format              | Description                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `*.raweasy.json`    | The raw JSON from the EasyEDA API                                                           |
| `*.bettereasy.json` | The raw JSON from the EasyEDA API, but with the footprint and schematic data decoded        |
| `*.circuit.json`    | The tscircuit's easy-to-use JSON format [(docs)](https://github.com/tscircuit/circuit-json) |
| `*.kicad_mod`       | A KiCad footprint file                                                                      |
| `*.tsx`             | A TypeScript React component file                                                           |

## Advanced Usage

### Customizing Conversion Options

When converting EasyEDA JSON to tscircuit soup, you can pass additional options:

```ts
import { convertEasyEdaJsonToCircuitJson } from "easyeda"

const soupJson = convertEasyEdaJsonToCircuitJson(rawEasyJson, {
  useModelCdn: true, // Use CDN for 3D models
  shouldRecenter: false, // Don't recenter the component
})
```

### Working with Generated TypeScript Components

The generated TypeScript React components can be imported and used in your tscircuit projects:

```tsx
import { NE555 } from "./NE555"

const MyCircuit = () => {
  return (
    <circuit>
      <NE555 name="U1" />
      {/* Other components */}
    </circuit>
  )
}
```

These components include proper typing for props and integrate seamlessly with the tscircuit ecosystem.

## Development

### Adding a test for a new part

Just run the following command. Use `git status` to see the files it introduces.

```bash
bun run add-test-for-part C46749
```

You can then run the test with `bun test path/to/file.test.ts` until you can
successfully get the part working!
