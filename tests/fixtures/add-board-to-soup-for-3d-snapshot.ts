import type { AnyCircuitElement } from "circuit-json"

export const addBoardToSoupFor3dSnapshot = (
  soup: AnyCircuitElement[],
): AnyCircuitElement[] => {
  if (soup.some((element) => element.type === "pcb_board")) {
    return soup
  }

  return soup.concat([
    {
      type: "pcb_board",
      center: { x: 0, y: 0 },
      width: 15,
      height: 15,
      pcb_board_id: "main_board",
      thickness: 1.6,
      num_layers: 2,
      material: "fr4",
    },
  ] as AnyCircuitElement[])
}
