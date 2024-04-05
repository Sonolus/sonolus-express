import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { srlSchema } from './srl'
import { databaseTagSchema } from './tag'

export const databaseEffectItemSchema = z.object({
    name: z.string(),
    version: z.literal(5),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    tags: databaseTagSchema.array(),
    description: localizationTextSchema,
    thumbnail: srlSchema,
    data: srlSchema,
    audio: srlSchema,
    meta: z.unknown(),
})
