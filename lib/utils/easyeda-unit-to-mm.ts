/**
 * EasyEDA takes 10 mil as a basic factor, when a stroke width is 1, we can take it as 1*10mil = 10mil, is 2, we can take it as 2*10mil = 20mil,
 * Ref: https://docs.easyeda.com/en/DocumentFormat/3-EasyEDA-PCB-File-Format/
 * 
 * 1 mil = 0.001 inch
 * 1 inch = 25.4 mm
 * 1 mil = 25.4/1000 = 0.0254 mm
 */
export const easyEdaUnitToMm = (value: number): number => value * 10 * 0.0254;
