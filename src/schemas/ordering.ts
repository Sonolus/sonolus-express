import { z } from 'zod'
import { getParser } from './parser'

const orderingSchema = z
    .object({
        levels: z.array(z.string()),
        skins: z.array(z.string()),
        backgrounds: z.array(z.string()),
        effects: z.array(z.string()),
        particles: z.array(z.string()),
        engines: z.array(z.string()),
    })
    .partial()

export type Ordering = z.infer<typeof orderingSchema>
export const orderingParser = getParser(orderingSchema)
