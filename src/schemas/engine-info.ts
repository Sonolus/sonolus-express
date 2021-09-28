import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'

export const engineInfoSchema = z.object({
    name: z.string(),
    version: z.literal(4),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    description: localizationTextSchema,
    skin: z.string(),
    background: z.string(),
    effect: z.string(),
    particle: z.string(),
    thumbnail: getSRLSchema('EngineThumbnail'),
    data: getSRLSchema('EngineData'),
    configuration: getSRLSchema('EngineConfiguration'),
    meta: z.unknown(),
})
