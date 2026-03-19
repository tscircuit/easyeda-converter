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
  const extension = format === "step" ? ".step" : ""
  return `https://modelcdn.tscircuit.com/easyeda_models/download${extension}?uuid=${easyedaModelUuid}&pn=${easyedaPartNumber}`
}
