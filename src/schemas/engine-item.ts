import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { srlSchema } from './srl'
import { databaseTagSchema } from './tag'

export const databaseEngineItemSchema = z.object({
    name: z.string(),
    version: z.literal(12),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    tags: databaseTagSchema.array(),
    description: localizationTextSchema,
    skin: z.string(),
    background: z.string(),
    effect: z.string(),
    particle: z.string(),
    thumbnail: srlSchema,
    playData: srlSchema,
    watchData: srlSchema,
    previewData: srlSchema,
    tutorialData: srlSchema,
    rom: srlSchema.optional(),
    configuration: srlSchema,
    meta: z.unknown(),
})
