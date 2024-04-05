import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { srlSchema } from './srl'
import { databaseTagSchema } from './tag'

const databaseUseItemSchema = z.discriminatedUnion('useDefault', [
    z.object({ useDefault: z.literal(true) }),
    z.object({ useDefault: z.literal(false), item: z.string() }),
])

export const databaseLevelItemSchema = z.object({
    name: z.string(),
    version: z.literal(1),
    rating: z.number(),
    title: localizationTextSchema,
    artists: localizationTextSchema,
    author: localizationTextSchema,
    tags: databaseTagSchema.array(),
    description: localizationTextSchema,
    engine: z.string(),
    useSkin: databaseUseItemSchema,
    useBackground: databaseUseItemSchema,
    useEffect: databaseUseItemSchema,
    useParticle: databaseUseItemSchema,
    cover: srlSchema,
    bgm: srlSchema,
    preview: srlSchema.optional(),
    data: srlSchema,
    meta: z.unknown(),
})
