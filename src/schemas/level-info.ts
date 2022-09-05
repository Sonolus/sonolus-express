import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'

const useInfoSchema = z.discriminatedUnion('useDefault', [
    z.object({ useDefault: z.literal(true) }),
    z.object({ useDefault: z.literal(false), item: z.string() }),
])

export const levelInfoSchema = z.object({
    name: z.string(),
    version: z.literal(1),
    rating: z.number(),
    title: localizationTextSchema,
    artists: localizationTextSchema,
    author: localizationTextSchema,
    description: localizationTextSchema,
    engine: z.string(),
    useSkin: useInfoSchema,
    useBackground: useInfoSchema,
    useEffect: useInfoSchema,
    useParticle: useInfoSchema,
    cover: getSRLSchema('LevelCover'),
    bgm: getSRLSchema('LevelBgm'),
    preview: getSRLSchema('LevelPreview').optional(),
    data: getSRLSchema('LevelData'),
    meta: z.unknown(),
})
