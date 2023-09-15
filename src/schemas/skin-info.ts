import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'

export const skinInfoSchema = z.object({
    name: z.string(),
    version: z.literal(4),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    description: localizationTextSchema,
    thumbnail: getSRLSchema('SkinThumbnail'),
    data: getSRLSchema('SkinData'),
    texture: getSRLSchema('SkinTexture'),
    meta: z.unknown(),
})
