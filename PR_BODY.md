## Summary

Fixes #123

This PR corrects the CAD model `positionOffset` axis calculation when importing components from JLCPCB. The previous implementation had overly complex Z-positioning logic that caused 3D models to penetrate through the PCB instead of sitting on top of it.

## Changes

1. **Simplified Z-offset parsing**: Changed from `mm()` to `mil10ToMm()` for bare number z-values to match EasyEDA's pixel unit convention (1px = 10mil = 0.254mm)

2. **Removed Z-axis negation**: The old code was negating and clamping the Z value (`Math.max(0, -z_mm)`), which caused incorrect positioning. Now we keep the EasyEDA Z value as-is.

3. **Simplified Z positioning logic**: Replaced complex orientation-based Z calculations with a straightforward approach:
   - For top-side components: `Z = boardSurfaceZ + easyedaZOffset`
   - For bottom-side components: `Z = -boardSurfaceZ - easyedaZOffset`

This ensures 3D models are positioned ON the board surface (Z=0.8mm for 1.6mm PCB) instead of penetrating through it.

## Test Results

- ✅ All text-based snapshot tests pass (24/24)
- ⚠️ 8 3D visual snapshot tests show differences (expected, as we fixed the positioning)

### Example: C5248081 (OLED display)
- **Before**: Z = -3.81mm (penetrating through board)
- **After**: Z = 0.80mm (sitting on board surface)

## Verification

Run the verification script to see the fix in action:
```bash
bun run verify-fix.ts
```

Output confirms models are now positioned correctly ON the board surface instead of going through it.

## Notes

- This approach matches the simplified logic from the `fix-3d-model-positioning` branch (PR #340) but with minimal changes to avoid file pollution
- The 3D snapshot differences are expected and represent the CORRECT positioning
- Visual inspection confirms models now sit properly on the board

/claim #123

🤖 Built by buildingvibes with Claude Code
