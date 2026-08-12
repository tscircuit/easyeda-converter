import { expect, it } from "bun:test"
import {
  convertCircuitJsonToPcbSvg,
  convertCircuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { EasyEdaJsonSchema } from "lib/schemas/easy-eda-json-schema"
import { convertBetterEasyToTsx } from "lib/websafe/convert-to-typescript-component"
import { runTscircuitCode } from "tscircuit"
import chipRawEasy from "../assets/C2943786.raweasy.json"
import { wrapTsxWithBoardFor3dSnapshot } from "../fixtures/wrap-tsx-with-board-for-3d-snapshot"

it("should import C2943786 into a snapshotted typescript component", async () => {
  const betterEasy = EasyEdaJsonSchema.parse(chipRawEasy)
  const result = await convertBetterEasyToTsx({
    betterEasy,
  })

  expect(result).not.toContain("milmm")
  expect(result).not.toContain("NaNmm")

  const circuitJson = await runTscircuitCode(
    wrapTsxWithBoardFor3dSnapshot(result),
  )
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "c2943786-pcb",
  )
  expect(convertCircuitJsonToSchematicSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
    "c2943786-schematic",
  )
  await expect(circuitJson).toMatch3dSnapshot(import.meta.path)

  expect(result).toMatchInlineSnapshot(`
    "import type { ChipProps } from "@tscircuit/props"

    const pinLabels = {
      pin1: ["1A1"],
      pin2: ["1A2"],
      pin3: ["1A3"],
      pin4: ["1A4"],
      pin5: ["1A5"],
      pin6: ["1A6"],
      pin7: ["1A7"],
      pin8: ["1A8"],
      pin9: ["1A9"],
      pin10: ["1A10"],
      pin11: ["1A11"],
      pin12: ["1A13"],
      pin13: ["1A14"],
      pin14: ["1A15"],
      pin15: ["1A16"],
      pin16: ["1A17"],
      pin17: ["1A18"],
      pin18: ["1A19"],
      pin19: ["1A20"],
      pin20: ["1B1"],
      pin21: ["1B3"],
      pin22: ["1B5"],
      pin23: ["1B7"],
      pin24: ["1B8"],
      pin25: ["1B9"],
      pin26: ["1B10"],
      pin27: ["1B11"],
      pin28: ["1B13"],
      pin29: ["1B14"],
      pin30: ["1B15"],
      pin31: ["1B16"],
      pin32: ["1B17"],
      pin33: ["1B18"],
      pin34: ["1B19"],
      pin35: ["1B20"],
      pin36: ["1C1"],
      pin37: ["1C2"],
      pin38: ["1C3"],
      pin39: ["1C4"],
      pin40: ["1C5"],
      pin41: ["1C6"],
      pin42: ["1C7"],
      pin43: ["1C8"],
      pin44: ["1C9"],
      pin45: ["1C10"],
      pin46: ["1C12"],
      pin47: ["1C13"],
      pin48: ["1C14"],
      pin49: ["1C15"],
      pin50: ["1C16"],
      pin51: ["1C17"],
      pin52: ["1C18"],
      pin53: ["1C19"],
      pin54: ["1C20"],
      pin55: ["1D1"],
      pin56: ["1D2"],
      pin57: ["1D3"],
      pin58: ["1D4"],
      pin59: ["1D5"],
      pin60: ["1D6"],
      pin61: ["1D7"],
      pin62: ["1D8"],
      pin63: ["1D11"],
      pin64: ["1D12"],
      pin65: ["1D13"],
      pin66: ["1D14"],
      pin67: ["1D15"],
      pin68: ["1D16"],
      pin69: ["1D17"],
      pin70: ["1D18"],
      pin71: ["1D19"],
      pin72: ["1D20"],
      pin73: ["1E1"],
      pin74: ["1E2"],
      pin75: ["1E3"],
      pin76: ["1E4"],
      pin77: ["1E6"],
      pin78: ["1E7"],
      pin79: ["1E8"],
      pin80: ["1E9"],
      pin81: ["1E12"],
      pin82: ["1E13"],
      pin83: ["1E14"],
      pin84: ["1E15"],
      pin85: ["1E16"],
      pin86: ["1E17"],
      pin87: ["1E18"],
      pin88: ["1E19"],
      pin89: ["1E20"],
      pin90: ["1F2"],
      pin91: ["1F3"],
      pin92: ["1F4"],
      pin93: ["1F5"],
      pin94: ["1F6"],
      pin95: ["1F7"],
      pin96: ["1F8"],
      pin97: ["1F9"],
      pin98: ["1F10"],
      pin99: ["1F11"],
      pin100: ["1F12"],
      pin101: ["1F13"],
      pin102: ["1F14"],
      pin103: ["1F15"],
      pin104: ["1F16"],
      pin105: ["1F17"],
      pin106: ["1F19"],
      pin107: ["1F20"],
      pin108: ["1F18"],
      pin109: ["1B6"],
      pin110: ["1D10"],
      pin111: ["1D9"],
      pin112: ["1E10"],
      pin113: ["1E11"],
      pin114: ["1F1"],
      pin115: ["1L1"],
      pin116: ["1L2"],
      pin117: ["1L3"],
      pin118: ["1L4"],
      pin119: ["1L5"],
      pin120: ["1L6"],
      pin121: ["1L7"],
      pin122: ["1L8"],
      pin123: ["1L9"],
      pin124: ["1L10"],
      pin125: ["1L11"],
      pin126: ["1L12"],
      pin127: ["1L13"],
      pin128: ["1L15"],
      pin129: ["1L19"],
      pin130: ["1L14"],
      pin131: ["1K2"],
      pin132: ["1K3"],
      pin133: ["1K4"],
      pin134: ["1K5"],
      pin135: ["1K6"],
      pin136: ["1K7"],
      pin137: ["1K8"],
      pin138: ["1K9"],
      pin139: ["1K10"],
      pin140: ["1K11"],
      pin141: ["1K12"],
      pin142: ["1K13"],
      pin143: ["1K14"],
      pin144: ["1K15"],
      pin145: ["1K16"],
      pin146: ["1K17"],
      pin147: ["1K18"],
      pin148: ["1K19"],
      pin149: ["1K20"],
      pin150: ["1M3"],
      pin151: ["1M4"],
      pin152: ["1M5"],
      pin153: ["1M6"],
      pin154: ["1M7"],
      pin155: ["1M8"],
      pin156: ["1M9"],
      pin157: ["1M10"],
      pin158: ["1M12"],
      pin159: ["1M13"],
      pin160: ["1M14"],
      pin161: ["1M15"],
      pin162: ["1M16"],
      pin163: ["1M17"],
      pin164: ["1M18"],
      pin165: ["1M19"],
      pin166: ["1M20"],
      pin167: ["1U1"],
      pin168: ["1U2"],
      pin169: ["1U3"],
      pin170: ["1U4"],
      pin171: ["1U5"],
      pin172: ["1U6"],
      pin173: ["1U7"],
      pin174: ["1U8"],
      pin175: ["1U9"],
      pin176: ["1U11"],
      pin177: ["1U12"],
      pin178: ["1U13"],
      pin179: ["1U15"],
      pin180: ["1U16"],
      pin181: ["1U17"],
      pin182: ["1U18"],
      pin183: ["1U19"],
      pin184: ["1U20"],
      pin185: ["1V1"],
      pin186: ["1V2"],
      pin187: ["1V3"],
      pin188: ["1V4"],
      pin189: ["1V5"],
      pin190: ["1V6"],
      pin191: ["1V7"],
      pin192: ["1V8"],
      pin193: ["1V9"],
      pin194: ["1V11"],
      pin195: ["1V12"],
      pin196: ["1V13"],
      pin197: ["1V15"],
      pin198: ["1V16"],
      pin199: ["1V17"],
      pin200: ["1V18"],
      pin201: ["1V19"],
      pin202: ["1V20"],
      pin203: ["1M11"],
      pin204: ["A1"],
      pin205: ["A2"],
      pin206: ["A3"],
      pin207: ["A5"],
      pin208: ["A7"],
      pin209: ["A9"],
      pin210: ["A10"],
      pin211: ["A12"],
      pin212: ["A13"],
      pin213: ["A15"],
      pin214: ["A17"],
      pin215: ["A19"],
      pin216: ["A20"],
      pin217: ["A22"],
      pin218: ["A23"],
      pin219: ["A26"],
      pin220: ["A27"],
      pin221: ["A29"],
      pin222: ["A30"],
      pin223: ["A32"],
      pin224: ["A33"],
      pin225: ["A35"],
      pin226: ["A37"],
      pin227: ["A38"],
      pin228: ["B1"],
      pin229: ["B2"],
      pin230: ["B3"],
      pin231: ["B4"],
      pin232: ["B5"],
      pin233: ["B6"],
      pin234: ["B7"],
      pin235: ["B8"],
      pin236: ["B9"],
      pin237: ["B10"],
      pin238: ["B11"],
      pin239: ["B12"],
      pin240: ["B13"],
      pin241: ["B14"],
      pin242: ["B15"],
      pin243: ["B16"],
      pin244: ["B17"],
      pin245: ["B18"],
      pin246: ["B19"],
      pin247: ["B20"],
      pin248: ["B21"],
      pin249: ["B22"],
      pin250: ["B23"],
      pin251: ["B24"],
      pin252: ["B25"],
      pin253: ["B26"],
      pin254: ["B27"],
      pin255: ["B28"],
      pin256: ["B29"],
      pin257: ["B30"],
      pin258: ["B31"],
      pin259: ["B32"],
      pin260: ["B33"],
      pin261: ["B34"],
      pin262: ["B35"],
      pin263: ["B36"],
      pin264: ["B37"],
      pin265: ["B38"],
      pin266: ["C1"],
      pin267: ["C2"],
      pin268: ["C37"],
      pin269: ["D2"],
      pin270: ["D37"],
      pin271: ["D38"],
      pin272: ["E1"],
      pin273: ["E2"],
      pin274: ["E37"],
      pin275: ["F1"],
      pin276: ["F2"],
      pin277: ["F37"],
      pin278: ["F38"],
      pin279: ["G2"],
      pin280: ["G37"],
      pin281: ["G38"],
      pin282: ["H1"],
      pin283: ["H2"],
      pin284: ["H37"],
      pin285: ["J2"],
      pin286: ["J37"],
      pin287: ["J38"],
      pin288: ["K1"],
      pin289: ["K2"],
      pin290: ["K37"],
      pin291: ["K38"],
      pin292: ["L2"],
      pin293: ["L37"],
      pin294: ["M1"],
      pin295: ["M2"],
      pin296: ["M37"],
      pin297: ["M38"],
      pin298: ["N1"],
      pin299: ["N2"],
      pin300: ["N37"],
      pin301: ["N38"],
      pin302: ["P2"],
      pin303: ["P37"],
      pin304: ["R1"],
      pin305: ["R2"],
      pin306: ["R37"],
      pin307: ["R38"],
      pin308: ["T2"],
      pin309: ["T37"],
      pin310: ["T38"],
      pin311: ["U2"],
      pin312: ["U37"],
      pin313: ["V1"],
      pin314: ["V2"],
      pin315: ["V37"],
      pin316: ["V38"],
      pin317: ["W2"],
      pin318: ["W37"],
      pin319: ["W38"],
      pin320: ["Y1"],
      pin321: ["Y2"],
      pin322: ["Y37"],
      pin323: ["AA2"],
      pin324: ["AA37"],
      pin325: ["AA38"],
      pin326: ["AB1"],
      pin327: ["AB2"],
      pin328: ["AB37"],
      pin329: ["AB38"],
      pin330: ["AC2"],
      pin331: ["AC37"],
      pin332: ["AD1"],
      pin333: ["AD2"],
      pin334: ["AD37"],
      pin335: ["AD38"],
      pin336: ["AE2"],
      pin337: ["AE37"],
      pin338: ["AF1"],
      pin339: ["AF2"],
      pin340: ["AF37"],
      pin341: ["AF38"],
      pin342: ["AG2"],
      pin343: ["AG37"],
      pin344: ["AG38"],
      pin345: ["AH2"],
      pin346: ["AH37"],
      pin347: ["AJ1"],
      pin348: ["AJ2"],
      pin349: ["AJ37"],
      pin350: ["AJ38"],
      pin351: ["AK2"],
      pin352: ["AK37"],
      pin353: ["AK38"],
      pin354: ["AL1"],
      pin355: ["AL2"],
      pin356: ["AL37"],
      pin357: ["AM1"],
      pin358: ["AM2"],
      pin359: ["AM37"],
      pin360: ["AM38"],
      pin361: ["AN2"],
      pin362: ["AN37"],
      pin363: ["AN38"],
      pin364: ["AP1"],
      pin365: ["AP2"],
      pin366: ["AP3"],
      pin367: ["AP4"],
      pin368: ["AP5"],
      pin369: ["AP6"],
      pin370: ["AP7"],
      pin371: ["AP8"],
      pin372: ["AP9"],
      pin373: ["AP10"],
      pin374: ["AP11"],
      pin375: ["AP12"],
      pin376: ["AP13"],
      pin377: ["AP14"],
      pin378: ["AP15"],
      pin379: ["AP16"],
      pin380: ["AP17"],
      pin381: ["AP18"],
      pin382: ["AP19"],
      pin383: ["AP20"],
      pin384: ["AP21"],
      pin385: ["AP22"],
      pin386: ["AP23"],
      pin387: ["AP24"],
      pin388: ["AP25"],
      pin389: ["AP26"],
      pin390: ["AP27"],
      pin391: ["AP28"],
      pin392: ["AP29"],
      pin393: ["AP30"],
      pin394: ["AP31"],
      pin395: ["AP32"],
      pin396: ["AP33"],
      pin397: ["AP34"],
      pin398: ["AP35"],
      pin399: ["AP36"],
      pin400: ["AP37"],
      pin401: ["AR1"],
      pin402: ["AR2"],
      pin403: ["AR4"],
      pin404: ["AR6"],
      pin405: ["AR7"],
      pin406: ["AR9"],
      pin407: ["AR10"],
      pin408: ["AR12"],
      pin409: ["AR14"],
      pin410: ["AR15"],
      pin411: ["AR17"],
      pin412: ["AR18"],
      pin413: ["AR20"],
      pin414: ["AR21"],
      pin415: ["AR23"],
      pin416: ["AR24"],
      pin417: ["AR26"],
      pin418: ["AR27"],
      pin419: ["AR29"],
      pin420: ["AR30"],
      pin421: ["AR32"],
      pin422: ["AR33"],
      pin423: ["AR35"],
      pin424: ["AR36"],
      pin425: ["AR38"],
      pin426: ["1G1"],
      pin427: ["1G2"],
      pin428: ["1G3"],
      pin429: ["1G4"],
      pin430: ["1G5"],
      pin431: ["1G6"],
      pin432: ["1G7"],
      pin433: ["1G8"],
      pin434: ["1G9"],
      pin435: ["1G10"],
      pin436: ["1G11"],
      pin437: ["1G12"],
      pin438: ["1G13"],
      pin439: ["1G14"],
      pin440: ["1G15"],
      pin441: ["1G16"],
      pin442: ["1G17"],
      pin443: ["1G18"],
      pin444: ["1G19"],
      pin445: ["1G20"],
      pin446: ["1H1"],
      pin447: ["1H2"],
      pin448: ["1H3"],
      pin449: ["1H4"],
      pin450: ["1H5"],
      pin451: ["1H6"],
      pin452: ["1H7"],
      pin453: ["1H8"],
      pin454: ["1H9"],
      pin455: ["1H10"],
      pin456: ["1H11"],
      pin457: ["1H13"],
      pin458: ["1H14"],
      pin459: ["1H15"],
      pin460: ["1H16"],
      pin461: ["1H17"],
      pin462: ["1H18"],
      pin463: ["1H19"],
      pin464: ["1H20"],
      pin465: ["1H12"],
      pin466: ["1J1"],
      pin467: ["1J2"],
      pin468: ["1J3"],
      pin469: ["1J4"],
      pin470: ["1J5"],
      pin471: ["1J6"],
      pin472: ["1J7"],
      pin473: ["1J8"],
      pin474: ["1J9"],
      pin475: ["1J10"],
      pin476: ["1J11"],
      pin477: ["1J12"],
      pin478: ["1J13"],
      pin479: ["1J14"],
      pin480: ["1J15"],
      pin481: ["1J16"],
      pin482: ["1J17"],
      pin483: ["1J18"],
      pin484: ["1J19"],
      pin485: ["1J20"],
      pin486: ["1N1"],
      pin487: ["1N2"],
      pin488: ["1N3"],
      pin489: ["1N4"],
      pin490: ["1N5"],
      pin491: ["1N6"],
      pin492: ["1N7"],
      pin493: ["1N8"],
      pin494: ["1N9"],
      pin495: ["1N10"],
      pin496: ["1N11"],
      pin497: ["1N12"],
      pin498: ["1N13"],
      pin499: ["1N14"],
      pin500: ["1N15"],
      pin501: ["1N16"],
      pin502: ["1N17"],
      pin503: ["1N18"],
      pin504: ["1N19"],
      pin505: ["1N20"],
      pin506: ["1P1"],
      pin507: ["1P2"],
      pin508: ["1P3"],
      pin509: ["1P4"],
      pin510: ["1P5"],
      pin511: ["1P6"],
      pin512: ["1P7"],
      pin513: ["1P8"],
      pin514: ["1P9"],
      pin515: ["1P10"],
      pin516: ["1P11"],
      pin517: ["1P12"],
      pin518: ["1P13"],
      pin519: ["1P14"],
      pin520: ["1P15"],
      pin521: ["1P16"],
      pin522: ["1P17"],
      pin523: ["1P18"],
      pin524: ["1P19"],
      pin525: ["1P20"],
      pin526: ["1R1"],
      pin527: ["1R2"],
      pin528: ["1R3"],
      pin529: ["1R4"],
      pin530: ["1R5"],
      pin531: ["1R6"],
      pin532: ["1R7"],
      pin533: ["1R8"],
      pin534: ["1R9"],
      pin535: ["1R10"],
      pin536: ["1R11"],
      pin537: ["1R12"],
      pin538: ["1R13"],
      pin539: ["1R14"],
      pin540: ["1R15"],
      pin541: ["1R16"],
      pin542: ["1R17"],
      pin543: ["1R18"],
      pin544: ["1R19"],
      pin545: ["1R20"],
      pin546: ["1T1"],
      pin547: ["1T2"],
      pin548: ["1T3"],
      pin549: ["1T4"],
      pin550: ["1T5"],
      pin551: ["1T6"],
      pin552: ["1T7"],
      pin553: ["1T8"],
      pin554: ["1T9"],
      pin555: ["1T10"],
      pin556: ["1T11"],
      pin557: ["1T13"],
      pin558: ["1T14"],
      pin559: ["1T15"],
      pin560: ["1T16"],
      pin561: ["1T17"],
      pin562: ["1T18"],
      pin563: ["1T19"],
      pin564: ["1T20"],
      pin565: ["1T12"]
    } as const

    export const RK3566 = (props: ChipProps<typeof pinLabels>) => {
      return (
        <chip
          pinLabels={pinLabels}
          supplierPartNumbers={{
      "jlcpcb": [
        "C2943786"
      ]
    }}
          manufacturerPartNumber="RK3566"
          footprint={<footprint>
            <smtpad portHints={["pin1"]} pcbX="-6.174994mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin2"]} pcbX="-5.525008mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin3"]} pcbX="-4.875022mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin4"]} pcbX="-4.225036mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin5"]} pcbX="-3.57505mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin6"]} pcbX="-2.925064mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin7"]} pcbX="-2.275078mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin8"]} pcbX="-1.625092mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin9"]} pcbX="-0.975106mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin10"]} pcbX="-0.32512mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin11"]} pcbX="0.32512mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin12"]} pcbX="1.625092mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin13"]} pcbX="2.275078mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin14"]} pcbX="2.925064mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin15"]} pcbX="3.57505mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin16"]} pcbX="4.225036mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin17"]} pcbX="4.875022mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin18"]} pcbX="5.525008mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin19"]} pcbX="6.174994mm" pcbY="5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin20"]} pcbX="-6.174994mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin21"]} pcbX="-4.875022mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin22"]} pcbX="-3.57505mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin23"]} pcbX="-2.275078mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin24"]} pcbX="-1.625092mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin25"]} pcbX="-0.975106mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin26"]} pcbX="-0.32512mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin27"]} pcbX="0.32512mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin28"]} pcbX="1.625092mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin29"]} pcbX="2.275078mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin30"]} pcbX="2.925064mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin31"]} pcbX="3.57505mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin32"]} pcbX="4.225036mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin33"]} pcbX="4.875022mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin34"]} pcbX="5.525008mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin35"]} pcbX="6.174994mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin36"]} pcbX="-6.174994mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin37"]} pcbX="-5.525008mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin38"]} pcbX="-4.875022mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin39"]} pcbX="-4.225036mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin40"]} pcbX="-3.57505mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin41"]} pcbX="-2.925064mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin42"]} pcbX="-2.275078mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin43"]} pcbX="-1.625092mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin44"]} pcbX="-0.975106mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin45"]} pcbX="-0.32512mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin46"]} pcbX="0.975106mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin47"]} pcbX="1.625092mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin48"]} pcbX="2.275078mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin49"]} pcbX="2.925064mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin50"]} pcbX="3.57505mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin51"]} pcbX="4.225036mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin52"]} pcbX="4.875022mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin53"]} pcbX="5.525008mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin54"]} pcbX="6.174994mm" pcbY="4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin55"]} pcbX="-6.174994mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin56"]} pcbX="-5.525008mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin57"]} pcbX="-4.875022mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin58"]} pcbX="-4.225036mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin59"]} pcbX="-3.57505mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin60"]} pcbX="-2.925064mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin61"]} pcbX="-2.275078mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin62"]} pcbX="-1.625092mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin63"]} pcbX="0.32512mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin64"]} pcbX="0.975106mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin65"]} pcbX="1.625092mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin66"]} pcbX="2.275078mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin67"]} pcbX="2.925064mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin68"]} pcbX="3.57505mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin69"]} pcbX="4.225036mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin70"]} pcbX="4.875022mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin71"]} pcbX="5.525008mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin72"]} pcbX="6.174994mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin73"]} pcbX="-6.174994mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin74"]} pcbX="-5.525008mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin75"]} pcbX="-4.875022mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin76"]} pcbX="-4.225036mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin77"]} pcbX="-2.925064mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin78"]} pcbX="-2.275078mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin79"]} pcbX="-1.625092mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin80"]} pcbX="-0.975106mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin81"]} pcbX="0.975106mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin82"]} pcbX="1.625092mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin83"]} pcbX="2.275078mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin84"]} pcbX="2.925064mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin85"]} pcbX="3.57505mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin86"]} pcbX="4.225036mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin87"]} pcbX="4.875022mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin88"]} pcbX="5.525008mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin89"]} pcbX="6.174994mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin90"]} pcbX="-5.525008mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin91"]} pcbX="-4.875022mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin92"]} pcbX="-4.225036mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin93"]} pcbX="-3.57505mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin94"]} pcbX="-2.925064mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin95"]} pcbX="-2.275078mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin96"]} pcbX="-1.625092mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin97"]} pcbX="-0.975106mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin98"]} pcbX="-0.32512mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin99"]} pcbX="0.32512mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin100"]} pcbX="0.975106mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin101"]} pcbX="1.625092mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin102"]} pcbX="2.275078mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin103"]} pcbX="2.925064mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin104"]} pcbX="3.57505mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin105"]} pcbX="4.225036mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin106"]} pcbX="5.525008mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin107"]} pcbX="6.174994mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin108"]} pcbX="4.875022mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin109"]} pcbX="-2.925064mm" pcbY="4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin110"]} pcbX="-0.32512mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin111"]} pcbX="-0.975106mm" pcbY="3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin112"]} pcbX="-0.32512mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin113"]} pcbX="0.32512mm" pcbY="2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin114"]} pcbX="-6.174994mm" pcbY="2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin115"]} pcbX="-6.174994mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin116"]} pcbX="-5.525008mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin117"]} pcbX="-4.875022mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin118"]} pcbX="-4.225036mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin119"]} pcbX="-3.57505mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin120"]} pcbX="-2.925064mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin121"]} pcbX="-2.275078mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin122"]} pcbX="-1.625092mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin123"]} pcbX="-0.975106mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin124"]} pcbX="-0.32512mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin125"]} pcbX="0.32512mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin126"]} pcbX="0.975106mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin127"]} pcbX="1.625092mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin128"]} pcbX="2.925064mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin129"]} pcbX="5.525008mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin130"]} pcbX="2.275078mm" pcbY="-0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin131"]} pcbX="-5.525008mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin132"]} pcbX="-4.875022mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin133"]} pcbX="-4.225036mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin134"]} pcbX="-3.57505mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin135"]} pcbX="-2.925064mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin136"]} pcbX="-2.275078mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin137"]} pcbX="-1.625092mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin138"]} pcbX="-0.975106mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin139"]} pcbX="-0.32512mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin140"]} pcbX="0.32512mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin141"]} pcbX="0.975106mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin142"]} pcbX="1.625092mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin143"]} pcbX="2.275078mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin144"]} pcbX="2.925064mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin145"]} pcbX="3.57505mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin146"]} pcbX="4.225036mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin147"]} pcbX="4.875022mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin148"]} pcbX="5.525008mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin149"]} pcbX="6.174994mm" pcbY="-0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin150"]} pcbX="-4.875022mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin151"]} pcbX="-4.225036mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin152"]} pcbX="-3.57505mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin153"]} pcbX="-2.925064mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin154"]} pcbX="-2.275078mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin155"]} pcbX="-1.625092mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin156"]} pcbX="-0.975106mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin157"]} pcbX="-0.32512mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin158"]} pcbX="0.975106mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin159"]} pcbX="1.625092mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin160"]} pcbX="2.275078mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin161"]} pcbX="2.925064mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin162"]} pcbX="3.57505mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin163"]} pcbX="4.225036mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin164"]} pcbX="4.875022mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin165"]} pcbX="5.525008mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin166"]} pcbX="6.174994mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin167"]} pcbX="-6.174994mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin168"]} pcbX="-5.525008mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin169"]} pcbX="-4.875022mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin170"]} pcbX="-4.225036mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin171"]} pcbX="-3.57505mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin172"]} pcbX="-2.925064mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin173"]} pcbX="-2.275078mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin174"]} pcbX="-1.625092mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin175"]} pcbX="-0.975106mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin176"]} pcbX="0.32512mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin177"]} pcbX="0.975106mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin178"]} pcbX="1.625092mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin179"]} pcbX="2.925064mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin180"]} pcbX="3.57505mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin181"]} pcbX="4.225036mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin182"]} pcbX="4.875022mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin183"]} pcbX="5.525008mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin184"]} pcbX="6.174994mm" pcbY="-4.875022mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin185"]} pcbX="-6.174994mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin186"]} pcbX="-5.525008mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin187"]} pcbX="-4.875022mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin188"]} pcbX="-4.225036mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin189"]} pcbX="-3.57505mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin190"]} pcbX="-2.925064mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin191"]} pcbX="-2.275078mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin192"]} pcbX="-1.625092mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin193"]} pcbX="-0.975106mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin194"]} pcbX="0.32512mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin195"]} pcbX="0.975106mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin196"]} pcbX="1.625092mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin197"]} pcbX="2.925064mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin198"]} pcbX="3.57505mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin199"]} pcbX="4.225036mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin200"]} pcbX="4.875022mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin201"]} pcbX="5.525008mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin202"]} pcbX="6.174994mm" pcbY="-5.525008mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin203"]} pcbX="0.32512mm" pcbY="-1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin204"]} pcbX="-7.400036mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin205"]} pcbX="-6.999986mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin206"]} pcbX="-6.599936mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin207"]} pcbX="-5.80009mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin208"]} pcbX="-4.99999mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin209"]} pcbX="-4.19989mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin210"]} pcbX="-3.800094mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin211"]} pcbX="-2.999994mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin212"]} pcbX="-2.599944mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin213"]} pcbX="-1.800098mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin214"]} pcbX="-0.999998mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin215"]} pcbX="-0.199898mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin216"]} pcbX="0.199898mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin217"]} pcbX="0.999998mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin218"]} pcbX="1.400048mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin219"]} pcbX="2.599944mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin220"]} pcbX="2.999994mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin221"]} pcbX="3.800094mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin222"]} pcbX="4.19989mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin223"]} pcbX="4.99999mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin224"]} pcbX="5.40004mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin225"]} pcbX="6.199886mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin226"]} pcbX="6.999986mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin227"]} pcbX="7.400036mm" pcbY="6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin228"]} pcbX="-7.400036mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin229"]} pcbX="-6.999986mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin230"]} pcbX="-6.599936mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin231"]} pcbX="-6.199886mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin232"]} pcbX="-5.80009mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin233"]} pcbX="-5.40004mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin234"]} pcbX="-4.99999mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin235"]} pcbX="-4.59994mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin236"]} pcbX="-4.19989mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin237"]} pcbX="-3.800094mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin238"]} pcbX="-3.400044mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin239"]} pcbX="-2.999994mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin240"]} pcbX="-2.599944mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin241"]} pcbX="-2.199894mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin242"]} pcbX="-1.800098mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin243"]} pcbX="-1.400048mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin244"]} pcbX="-0.999998mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin245"]} pcbX="-0.599948mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin246"]} pcbX="-0.199898mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin247"]} pcbX="0.199898mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin248"]} pcbX="0.599948mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin249"]} pcbX="0.999998mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin250"]} pcbX="1.400048mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin251"]} pcbX="1.800098mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin252"]} pcbX="2.199894mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin253"]} pcbX="2.599944mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin254"]} pcbX="2.999994mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin255"]} pcbX="3.400044mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin256"]} pcbX="3.800094mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin257"]} pcbX="4.19989mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin258"]} pcbX="4.59994mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin259"]} pcbX="4.99999mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin260"]} pcbX="5.40004mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin261"]} pcbX="5.80009mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin262"]} pcbX="6.199886mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin263"]} pcbX="6.599936mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin264"]} pcbX="6.999986mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin265"]} pcbX="7.400036mm" pcbY="6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin266"]} pcbX="-7.400036mm" pcbY="5.999988mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin267"]} pcbX="-6.999986mm" pcbY="5.999988mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin268"]} pcbX="6.999986mm" pcbY="5.999988mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin269"]} pcbX="-6.999986mm" pcbY="5.599938mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin270"]} pcbX="6.999986mm" pcbY="5.599938mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin271"]} pcbX="7.400036mm" pcbY="5.599938mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin272"]} pcbX="-7.400036mm" pcbY="5.199888mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin273"]} pcbX="-6.999986mm" pcbY="5.199888mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin274"]} pcbX="6.999986mm" pcbY="5.199888mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin275"]} pcbX="-7.400036mm" pcbY="4.800092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin276"]} pcbX="-6.999986mm" pcbY="4.800092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin277"]} pcbX="6.999986mm" pcbY="4.800092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin278"]} pcbX="7.400036mm" pcbY="4.800092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin279"]} pcbX="-6.999986mm" pcbY="4.400042mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin280"]} pcbX="6.999986mm" pcbY="4.400042mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin281"]} pcbX="7.400036mm" pcbY="4.400042mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin282"]} pcbX="-7.400036mm" pcbY="3.999992mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin283"]} pcbX="-6.999986mm" pcbY="3.999992mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin284"]} pcbX="6.999986mm" pcbY="3.999992mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin285"]} pcbX="-6.999986mm" pcbY="3.599942mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin286"]} pcbX="6.999986mm" pcbY="3.599942mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin287"]} pcbX="7.400036mm" pcbY="3.599942mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin288"]} pcbX="-7.400036mm" pcbY="3.199892mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin289"]} pcbX="-6.999986mm" pcbY="3.199892mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin290"]} pcbX="6.999986mm" pcbY="3.199892mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin291"]} pcbX="7.400036mm" pcbY="3.199892mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin292"]} pcbX="-6.999986mm" pcbY="2.800096mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin293"]} pcbX="6.999986mm" pcbY="2.800096mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin294"]} pcbX="-7.400036mm" pcbY="2.400046mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin295"]} pcbX="-6.999986mm" pcbY="2.400046mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin296"]} pcbX="6.999986mm" pcbY="2.400046mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin297"]} pcbX="7.400036mm" pcbY="2.400046mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin298"]} pcbX="-7.400036mm" pcbY="1.999996mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin299"]} pcbX="-6.999986mm" pcbY="1.999996mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin300"]} pcbX="6.999986mm" pcbY="1.999996mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin301"]} pcbX="7.400036mm" pcbY="1.999996mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin302"]} pcbX="-6.999986mm" pcbY="1.599946mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin303"]} pcbX="6.999986mm" pcbY="1.599946mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin304"]} pcbX="-7.400036mm" pcbY="1.199896mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin305"]} pcbX="-6.999986mm" pcbY="1.199896mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin306"]} pcbX="6.999986mm" pcbY="1.199896mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin307"]} pcbX="7.400036mm" pcbY="1.199896mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin308"]} pcbX="-6.999986mm" pcbY="0.8001mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin309"]} pcbX="6.999986mm" pcbY="0.8001mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin310"]} pcbX="7.400036mm" pcbY="0.8001mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin311"]} pcbX="-6.999986mm" pcbY="0.40005mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin312"]} pcbX="6.999986mm" pcbY="0.40005mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin313"]} pcbX="-7.400036mm" pcbY="0mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin314"]} pcbX="-6.999986mm" pcbY="0mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin315"]} pcbX="6.999986mm" pcbY="0mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin316"]} pcbX="7.400036mm" pcbY="0mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin317"]} pcbX="-6.999986mm" pcbY="-0.40005mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin318"]} pcbX="6.999986mm" pcbY="-0.40005mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin319"]} pcbX="7.400036mm" pcbY="-0.40005mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin320"]} pcbX="-7.400036mm" pcbY="-0.8001mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin321"]} pcbX="-6.999986mm" pcbY="-0.8001mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin322"]} pcbX="6.999986mm" pcbY="-0.8001mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin323"]} pcbX="-6.999986mm" pcbY="-1.199896mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin324"]} pcbX="6.999986mm" pcbY="-1.199896mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin325"]} pcbX="7.400036mm" pcbY="-1.199896mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin326"]} pcbX="-7.400036mm" pcbY="-1.599946mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin327"]} pcbX="-6.999986mm" pcbY="-1.599946mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin328"]} pcbX="6.999986mm" pcbY="-1.599946mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin329"]} pcbX="7.400036mm" pcbY="-1.599946mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin330"]} pcbX="-6.999986mm" pcbY="-1.999996mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin331"]} pcbX="6.999986mm" pcbY="-1.999996mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin332"]} pcbX="-7.400036mm" pcbY="-2.400046mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin333"]} pcbX="-6.999986mm" pcbY="-2.400046mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin334"]} pcbX="6.999986mm" pcbY="-2.400046mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin335"]} pcbX="7.400036mm" pcbY="-2.400046mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin336"]} pcbX="-6.999986mm" pcbY="-2.800096mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin337"]} pcbX="6.999986mm" pcbY="-2.800096mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin338"]} pcbX="-7.400036mm" pcbY="-3.199892mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin339"]} pcbX="-6.999986mm" pcbY="-3.199892mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin340"]} pcbX="6.999986mm" pcbY="-3.199892mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin341"]} pcbX="7.400036mm" pcbY="-3.199892mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin342"]} pcbX="-6.999986mm" pcbY="-3.599942mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin343"]} pcbX="6.999986mm" pcbY="-3.599942mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin344"]} pcbX="7.400036mm" pcbY="-3.599942mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin345"]} pcbX="-6.999986mm" pcbY="-3.999992mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin346"]} pcbX="6.999986mm" pcbY="-3.999992mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin347"]} pcbX="-7.400036mm" pcbY="-4.400042mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin348"]} pcbX="-6.999986mm" pcbY="-4.400042mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin349"]} pcbX="6.999986mm" pcbY="-4.400042mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin350"]} pcbX="7.400036mm" pcbY="-4.400042mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin351"]} pcbX="-6.999986mm" pcbY="-4.800092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin352"]} pcbX="6.999986mm" pcbY="-4.800092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin353"]} pcbX="7.400036mm" pcbY="-4.800092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin354"]} pcbX="-7.400036mm" pcbY="-5.199888mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin355"]} pcbX="-6.999986mm" pcbY="-5.199888mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin356"]} pcbX="6.999986mm" pcbY="-5.199888mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin357"]} pcbX="-7.400036mm" pcbY="-5.599938mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin358"]} pcbX="-6.999986mm" pcbY="-5.599938mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin359"]} pcbX="6.999986mm" pcbY="-5.599938mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin360"]} pcbX="7.400036mm" pcbY="-5.599938mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin361"]} pcbX="-6.999986mm" pcbY="-5.999988mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin362"]} pcbX="6.999986mm" pcbY="-5.999988mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin363"]} pcbX="7.400036mm" pcbY="-5.999988mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin364"]} pcbX="-7.400036mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin365"]} pcbX="-6.999986mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin366"]} pcbX="-6.599936mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin367"]} pcbX="-6.199886mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin368"]} pcbX="-5.80009mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin369"]} pcbX="-5.40004mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin370"]} pcbX="-4.99999mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin371"]} pcbX="-4.59994mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin372"]} pcbX="-4.19989mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin373"]} pcbX="-3.800094mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin374"]} pcbX="-3.400044mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin375"]} pcbX="-2.999994mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin376"]} pcbX="-2.599944mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin377"]} pcbX="-2.199894mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin378"]} pcbX="-1.800098mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin379"]} pcbX="-1.400048mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin380"]} pcbX="-0.999998mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin381"]} pcbX="-0.599948mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin382"]} pcbX="-0.199898mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin383"]} pcbX="0.199898mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin384"]} pcbX="0.599948mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin385"]} pcbX="0.999998mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin386"]} pcbX="1.400048mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin387"]} pcbX="1.800098mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin388"]} pcbX="2.199894mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin389"]} pcbX="2.599944mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin390"]} pcbX="2.999994mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin391"]} pcbX="3.400044mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin392"]} pcbX="3.800094mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin393"]} pcbX="4.19989mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin394"]} pcbX="4.59994mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin395"]} pcbX="4.99999mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin396"]} pcbX="5.40004mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin397"]} pcbX="5.80009mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin398"]} pcbX="6.199886mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin399"]} pcbX="6.599936mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin400"]} pcbX="6.999986mm" pcbY="-6.400038mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin401"]} pcbX="-7.400036mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin402"]} pcbX="-6.999986mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin403"]} pcbX="-6.199886mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin404"]} pcbX="-5.40004mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin405"]} pcbX="-4.99999mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin406"]} pcbX="-4.19989mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin407"]} pcbX="-3.800094mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin408"]} pcbX="-2.999994mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin409"]} pcbX="-2.199894mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin410"]} pcbX="-1.800098mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin411"]} pcbX="-0.999998mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin412"]} pcbX="-0.599948mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin413"]} pcbX="0.199898mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin414"]} pcbX="0.599948mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin415"]} pcbX="1.400048mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin416"]} pcbX="1.800098mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin417"]} pcbX="2.599944mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin418"]} pcbX="2.999994mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin419"]} pcbX="3.800094mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin420"]} pcbX="4.19989mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin421"]} pcbX="4.99999mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin422"]} pcbX="5.40004mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin423"]} pcbX="6.199886mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin424"]} pcbX="6.599936mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin425"]} pcbX="7.400036mm" pcbY="-6.800088mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin426"]} pcbX="-6.174994mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin427"]} pcbX="-5.525008mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin428"]} pcbX="-4.875022mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin429"]} pcbX="-4.225036mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin430"]} pcbX="-3.57505mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin431"]} pcbX="-2.925064mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin432"]} pcbX="-2.275078mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin433"]} pcbX="-1.625092mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin434"]} pcbX="-0.975106mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin435"]} pcbX="-0.32512mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin436"]} pcbX="0.32512mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin437"]} pcbX="0.975106mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin438"]} pcbX="1.625092mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin439"]} pcbX="2.275078mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin440"]} pcbX="2.925064mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin441"]} pcbX="3.57505mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin442"]} pcbX="4.225036mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin443"]} pcbX="4.875022mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin444"]} pcbX="5.525008mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin445"]} pcbX="6.174994mm" pcbY="1.625092mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin446"]} pcbX="-6.174994mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin447"]} pcbX="-5.525008mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin448"]} pcbX="-4.875022mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin449"]} pcbX="-4.225036mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin450"]} pcbX="-3.57505mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin451"]} pcbX="-2.925064mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin452"]} pcbX="-2.275078mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin453"]} pcbX="-1.625092mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin454"]} pcbX="-0.975106mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin455"]} pcbX="-0.32512mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin456"]} pcbX="0.32512mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin457"]} pcbX="1.625092mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin458"]} pcbX="2.275078mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin459"]} pcbX="2.925064mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin460"]} pcbX="3.57505mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin461"]} pcbX="4.225036mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin462"]} pcbX="4.875022mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin463"]} pcbX="5.525008mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin464"]} pcbX="6.174994mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin465"]} pcbX="0.975106mm" pcbY="0.975106mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin466"]} pcbX="-6.174994mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin467"]} pcbX="-5.525008mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin468"]} pcbX="-4.875022mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin469"]} pcbX="-4.225036mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin470"]} pcbX="-3.57505mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin471"]} pcbX="-2.925064mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin472"]} pcbX="-2.275078mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin473"]} pcbX="-1.625092mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin474"]} pcbX="-0.975106mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin475"]} pcbX="-0.32512mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin476"]} pcbX="0.32512mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin477"]} pcbX="0.975106mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin478"]} pcbX="1.625092mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin479"]} pcbX="2.275078mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin480"]} pcbX="2.925064mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin481"]} pcbX="3.57505mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin482"]} pcbX="4.225036mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin483"]} pcbX="4.875022mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin484"]} pcbX="5.525008mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin485"]} pcbX="6.174994mm" pcbY="0.32512mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin486"]} pcbX="-6.174994mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin487"]} pcbX="-5.525008mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin488"]} pcbX="-4.875022mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin489"]} pcbX="-4.225036mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin490"]} pcbX="-3.57505mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin491"]} pcbX="-2.925064mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin492"]} pcbX="-2.275078mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin493"]} pcbX="-1.625092mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin494"]} pcbX="-0.975106mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin495"]} pcbX="-0.32512mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin496"]} pcbX="0.32512mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin497"]} pcbX="0.975106mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin498"]} pcbX="1.625092mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin499"]} pcbX="2.275078mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin500"]} pcbX="2.925064mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin501"]} pcbX="3.57505mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin502"]} pcbX="4.225036mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin503"]} pcbX="4.875022mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin504"]} pcbX="5.525008mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin505"]} pcbX="6.174994mm" pcbY="-2.275078mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin506"]} pcbX="-6.174994mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin507"]} pcbX="-5.525008mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin508"]} pcbX="-4.875022mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin509"]} pcbX="-4.225036mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin510"]} pcbX="-3.57505mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin511"]} pcbX="-2.925064mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin512"]} pcbX="-2.275078mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin513"]} pcbX="-1.625092mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin514"]} pcbX="-0.975106mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin515"]} pcbX="-0.32512mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin516"]} pcbX="0.32512mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin517"]} pcbX="0.975106mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin518"]} pcbX="1.625092mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin519"]} pcbX="2.275078mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin520"]} pcbX="2.925064mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin521"]} pcbX="3.57505mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin522"]} pcbX="4.225036mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin523"]} pcbX="4.875022mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin524"]} pcbX="5.525008mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin525"]} pcbX="6.174994mm" pcbY="-2.925064mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin526"]} pcbX="-6.174994mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin527"]} pcbX="-5.525008mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin528"]} pcbX="-4.875022mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin529"]} pcbX="-4.225036mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin530"]} pcbX="-3.57505mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin531"]} pcbX="-2.925064mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin532"]} pcbX="-2.275078mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin533"]} pcbX="-1.625092mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin534"]} pcbX="-0.975106mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin535"]} pcbX="-0.32512mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin536"]} pcbX="0.32512mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin537"]} pcbX="0.975106mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin538"]} pcbX="1.625092mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin539"]} pcbX="2.275078mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin540"]} pcbX="2.925064mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin541"]} pcbX="3.57505mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin542"]} pcbX="4.225036mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin543"]} pcbX="4.875022mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin544"]} pcbX="5.525008mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin545"]} pcbX="6.174994mm" pcbY="-3.57505mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin546"]} pcbX="-6.174994mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin547"]} pcbX="-5.525008mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin548"]} pcbX="-4.875022mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin549"]} pcbX="-4.225036mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin550"]} pcbX="-3.57505mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin551"]} pcbX="-2.925064mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin552"]} pcbX="-2.275078mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin553"]} pcbX="-1.625092mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin554"]} pcbX="-0.975106mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin555"]} pcbX="-0.32512mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin556"]} pcbX="0.32512mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin557"]} pcbX="1.625092mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin558"]} pcbX="2.275078mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin559"]} pcbX="2.925064mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin560"]} pcbX="3.57505mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin561"]} pcbX="4.225036mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin562"]} pcbX="4.875022mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin563"]} pcbX="5.525008mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin564"]} pcbX="6.174994mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <smtpad portHints={["pin565"]} pcbX="0.975106mm" pcbY="-4.225036mm" radius="0.1099947mm" shape="circle" />
    <silkscreenpath route={[{"x":-8.130032000000028,"y":6.870191999999861},{"x":-8.13684335917651,"y":6.8184545905220375},{"x":-8.156813253834343,"y":6.770242999999937},{"x":-8.188580768654447,"y":6.728842768654317},{"x":-8.229981000000066,"y":6.697075253834214},{"x":-8.278192590522167,"y":6.67710535917638},{"x":-8.32992999999999,"y":6.670293999999899},{"x":-8.381667409477927,"y":6.67710535917638},{"x":-8.429879000000028,"y":6.697075253834214},{"x":-8.471279231345648,"y":6.728842768654317},{"x":-8.50304674616575,"y":6.770242999999937},{"x":-8.523016640823585,"y":6.8184545905220375},{"x":-8.529828000000066,"y":6.870191999999861},{"x":-8.523016640823585,"y":6.921929409477798},{"x":-8.50304674616575,"y":6.970140999999899},{"x":-8.471279231345648,"y":7.011541231345518},{"x":-8.429879000000028,"y":7.043308746165621},{"x":-8.381667409477927,"y":7.063278640823455},{"x":-8.32992999999999,"y":7.0700899999999365},{"x":-8.278192590522167,"y":7.063278640823455},{"x":-8.229981000000066,"y":7.043308746165621},{"x":-8.188580768654447,"y":7.011541231345518},{"x":-8.156813253834343,"y":6.970140999999899},{"x":-8.13684335917651,"y":6.921929409477798},{"x":-8.130032000000028,"y":6.870191999999861}]} />
    <silkscreentext text="{NAME}" pcbX="-0.384302mm" pcbY="8.232142mm" anchorAlignment="center" fontSize="1mm" />
    <courtyardoutline outline={[{"x":-8.787701999999967,"y":7.48214199999984},{"x":8.019097999999985,"y":7.48214199999984},{"x":8.019097999999985,"y":-7.495858000000112},{"x":-8.787701999999967,"y":-7.495858000000112},{"x":-8.787701999999967,"y":7.48214199999984}]} />
          </footprint>}
          cadModel={{
            objUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2943786.obj?uuid=64b0ecebc40e4578851f9afd7fce5701",
            stepUrl: "https://modelcdn.tscircuit.com/easyeda_models/assets/C2943786.step?uuid=64b0ecebc40e4578851f9afd7fce5701",
            pcbRotationOffset: 0,
            modelOriginPosition: { x: -0.000038099999983387534, y: -0.000025399999913133797, z: -0.305 },
          }}
          {...props}
        />
      )
    }"
  `)
}, 180000)
