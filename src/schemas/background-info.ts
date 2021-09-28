import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'

export const backgroundInfoSchema = z.object({
    name: z.string(),
    version: z.literal(2),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    description: localizationTextSchema,
    thumbnail: getSRLSchema('BackgroundThumbnail'),
    data: getSRLSchema('BackgroundData'),
    image: getSRLSchema('BackgroundImage'),
    configuration: getSRLSchema('BackgroundConfiguration'),
    meta: z.unknown(),
})
