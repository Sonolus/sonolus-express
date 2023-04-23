import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'

export const particleInfoSchema = z.object({
    name: z.string(),
    version: z.literal(2),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    description: localizationTextSchema,
    thumbnail: getSRLSchema('ParticleThumbnail'),
    data: getSRLSchema('ParticleData'),
    texture: getSRLSchema('ParticleTexture'),
    meta: z.unknown(),
})
