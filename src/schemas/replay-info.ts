import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'

export const replayInfoSchema = z.object({
    name: z.string(),
    version: z.literal(1),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    description: localizationTextSchema,
    level: z.string(),
    data: getSRLSchema('ReplayData'),
    configuration: getSRLSchema('ReplayConfiguration'),
    meta: z.unknown(),
})
