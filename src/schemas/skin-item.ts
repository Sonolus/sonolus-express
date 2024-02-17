import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { srlSchema } from './srl'
import { databaseTagSchema } from './tag'

export const databaseSkinItemSchema = z.object({
    name: z.string(),
    version: z.literal(4),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    tags: databaseTagSchema.array(),
    description: localizationTextSchema,
    thumbnail: srlSchema,
    data: srlSchema,
    texture: srlSchema,
    meta: z.unknown(),
})
