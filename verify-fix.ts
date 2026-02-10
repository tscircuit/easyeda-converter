import { convertEasyEdaJsonToCircuitJson } from "./lib/convert-easyeda-json-to-tscircuit-soup-json"
import { EasyEdaJsonSchema } from "./lib/schemas/easy-eda-json-schema"
import chipRawEasy from "./tests/assets/C5248081.raweasy.json"

console.log("=== Verifying Fix for Issue #123 ===\n")

const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
const circuitJson = convertEasyEdaJsonToCircuitJson(betterEasy, {
  useModelCdn: true,
  shouldRecenter: true,
})

const cadComponent = circuitJson.find((item) => item.type === "cad_component")
const pcbComponent = circuitJson.find((item) => item.type === "pcb_component")
const platedHoles = circuitJson.filter((item) => item.type === "pcb_plated_hole")

console.log("Component: C5248081 (OLED display with through-hole pins)\n")

console.log("CAD Model Position:")
console.log(`  X: ${cadComponent?.position.x.toFixed(2)}mm (offset from footprint center)`)
console.log(`  Y: ${cadComponent?.position.y.toFixed(2)}mm`)
console.log(`  Z: ${cadComponent?.position.z.toFixed(2)}mm (height above PCB origin)\n`)

console.log("PCB Thickness: 1.6mm")
console.log("Board Center: Z = 0mm")
console.log("Top Surface: Z = 0.8mm")
console.log("Bottom Surface: Z = -0.8mm\n")

console.log("Analysis:")
const zPos = cadComponent?.position.z ?? 0
if (zPos > 0 && zPos <= 1.6) {
  console.log(`✅ CORRECT: Model is positioned at Z=${zPos.toFixed(2)}mm, which is ON or ABOVE the board surface (0.8mm)`)
  console.log(`   The model will sit properly on the board, not penetrate through it.`)
} else if (zPos < 0) {
  console.log(`❌ INCORRECT: Model is positioned at Z=${zPos.toFixed(2)}mm, BELOW the board center!`)
  console.log(`   The model would penetrate through the board.`)
} else {
  console.log(`⚠️  WARNING: Model is positioned at Z=${zPos.toFixed(2)}mm, which is unusually high.`)
  console.log(`   Please verify this is correct for this component.`)
}

console.log("\nPlated Holes (footprint pins):")
for (const [i, hole] of platedHoles.entries()) {
  console.log(`  Pin ${i + 1}: X=${hole.x.toFixed(2)}mm, Y=${hole.y.toFixed(2)}mm`)
}

console.log("\nFootprint dimensions:")
console.log(`  Width: ${pcbComponent?.width.toFixed(2)}mm`)
console.log(`  Height: ${pcbComponent?.height.toFixed(2)}mm`)
console.log(`  Center: (${pcbComponent?.center.x}, ${pcbComponent?.center.y})`)

console.log("\n" + "=".repeat(60))
console.log("CONCLUSION:")
console.log("=".repeat(60))
if (zPos === 0.8) {
  console.log("✅ The fix is working correctly!")
  console.log("   3D models are now positioned ON the board surface (Z=0.8mm)")
  console.log("   instead of penetrating through it.")
} else {
  console.log("⚠️  Unexpected Z position. Further investigation needed.")
}
