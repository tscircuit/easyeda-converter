type Params = {
  easyedaPartNumber: string
  easyedaModelUuid: string
  format?: "obj" | "step"
}

export const getModelCdnUrl = ({
  easyedaModelUuid,
  easyedaPartNumber,
  format = "obj",
}: Params): string => {
  const extension = format === "step" ? "step" : "obj"
  return `https://modelcdn.tscircuit.com/easyeda_models/assets/${easyedaPartNumber}.${extension}?uuid=${easyedaModelUuid}`
}
