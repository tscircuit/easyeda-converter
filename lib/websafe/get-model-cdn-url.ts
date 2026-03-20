type Params = {
  easyedaPartNumber: string
  easyedaModelUuid: string
}

export const getModelObjCdnUrl = ({
  easyedaModelUuid,
  easyedaPartNumber,
}: Params): string => {
  return `https://modelcdn.tscircuit.com/easyeda_models/assets/${easyedaPartNumber}.obj?uuid=${easyedaModelUuid}`
}

export const getModelStepCdnUrl = ({
  easyedaModelUuid,
  easyedaPartNumber,
}: Params): string => {
  return `https://modelcdn.tscircuit.com/easyeda_models/assets/${easyedaPartNumber}.step?uuid=${easyedaModelUuid}`
}

export const getModelCdnUrl = getModelObjCdnUrl
