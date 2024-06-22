import { z } from "zod"

export const SzlcscSchema = z.object({
  id: z.number(),
  number: z.string(),
  step: z.number(),
  min: z.number(),
  price: z.number(),
  stock: z.number(),
  url: z.string().url(),
  image: z.string().optional(),
})

export const LcscSchema = z.object({
  id: z.number(),
  number: z.string(),
  step: z.number(),
  min: z.number(),
  price: z.number(),
  stock: z.number(),
  url: z.string().url(),
})

export const OwnerSchema = z.object({
  uuid: z.string(),
  username: z.string(),
  nickname: z.string(),
  avatar: z.string(),
})

export const HeadSchema = z.object({
  docType: z.string(),
  editorVersion: z.string(),
  c_para: z.record(z.string(), z.string()),
  x: z.number(),
  y: z.number(),
  puuid: z.string(),
  uuid: z.string(),
  utime: z.number(),
  importFlag: z.number(),
  c_spiceCmd: z.null(),
  hasIdFlag: z.boolean(),
})

export const BBoxSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
})

export const DataStrSchema = z.object({
  head: HeadSchema,
  canvas: z.string(),
  shape: z.array(z.string()),
  BBox: BBoxSchema,
  colors: z.array(z.unknown()),
})

export const PackageDetailSchema = z.object({
  uuid: z.string(),
  title: z.string(),
  docType: z.number(),
  updateTime: z.number(),
  owner: OwnerSchema,
  datastrid: z.string(),
  writable: z.boolean(),
  dataStr: z.object({
    head: HeadSchema,
    canvas: z.string(),
    shape: z.array(z.string()),
    layers: z.array(z.string()),
    objects: z.array(z.string()),
    BBox: BBoxSchema,
    netColors: z.array(z.unknown()),
  }),
})

export const EasyEdaJsonSchema = z.object({
  uuid: z.string(),
  title: z.string(),
  description: z.string(),
  docType: z.number(),
  type: z.number(),
  szlcsc: SzlcscSchema,
  lcsc: LcscSchema,
  owner: OwnerSchema,
  tags: z.array(z.string()),
  updateTime: z.number(),
  updated_at: z.string(),
  dataStr: DataStrSchema,
  verify: z.boolean(),
  SMT: z.boolean(),
  datastrid: z.string(),
  jlcOnSale: z.number(),
  writable: z.boolean(),
  isFavorite: z.boolean(),
  packageDetail: PackageDetailSchema,
})

export type EasyEdaJson = z.infer<typeof EasyEdaJsonSchema>
