import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'

export const effectInfoSchema = z.object({
    name: z.string(),
    version: z.literal(5),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    description: localizationTextSchema,
    thumbnail: getSRLSchema('EffectThumbnail'),
    data: getSRLSchema('EffectData'),
    audio: getSRLSchema('EffectAudio'),
    meta: z.unknown(),
})
