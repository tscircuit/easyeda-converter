type Params = {
  easyedaPartNumber: string
  easyedaModelUuid: string
}

export const getModelCdnUrl = ({
  easyedaModelUuid,
  easyedaPartNumber,
}: Params): string => {
  return `https://modelcdn.tscircuit.com/easyeda_models/download?uuid=${easyedaModelUuid}&pn=${easyedaPartNumber}`
}
