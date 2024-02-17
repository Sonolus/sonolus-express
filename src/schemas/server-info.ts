import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { srlSchema } from './srl'

export const databaseServerInfoSchema = z.object({
    title: localizationTextSchema,
    description: localizationTextSchema.optional(),
    banner: srlSchema.optional(),
})
