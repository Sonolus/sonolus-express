import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'

export const databaseServerInfoSchema = z.object({
    title: localizationTextSchema,
    description: localizationTextSchema.optional(),
    banner: getSRLSchema('ServerBanner').optional(),
})
