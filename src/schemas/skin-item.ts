import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'
import { databaseTagSchema } from './tag'

export const databaseSkinItemSchema = z.object({
    name: z.string(),
    version: z.literal(4),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    tags: databaseTagSchema.array(),
    description: localizationTextSchema,
    thumbnail: getSRLSchema('SkinThumbnail'),
    data: getSRLSchema('SkinData'),
    texture: getSRLSchema('SkinTexture'),
    meta: z.unknown(),
})
