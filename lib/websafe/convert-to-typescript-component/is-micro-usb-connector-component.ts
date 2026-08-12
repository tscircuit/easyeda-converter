import type { BetterEasyEdaJson } from "lib/schemas/easy-eda-json-schema"

export const isMicroUsbConnectorComponent = (
  betterEasy: BetterEasyEdaJson,
): boolean => {
  const componentParameters = betterEasy.dataStr.head.c_para

  return (
    componentParameters.pre === "USB?" &&
    componentParameters.package?.toUpperCase().startsWith("MICRO-USB-") === true
  )
}
