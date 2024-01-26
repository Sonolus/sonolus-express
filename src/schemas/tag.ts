import { Icon } from 'sonolus-core'
import { z } from 'zod'
import { localizationTextSchema } from './localization-text'

export const databaseTagSchema = z.object({
    title: localizationTextSchema,
    icon: z
        .union([z.never(), z.never(), ...Object.values(Icon).map((icon) => z.literal(icon))])
        .optional(),
})
