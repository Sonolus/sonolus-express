import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'

export const engineInfoSchema = z.object({
    name: z.string(),
    version: z.literal(9),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    description: localizationTextSchema,
    skin: z.string(),
    background: z.string(),
    effect: z.string(),
    particle: z.string(),
    thumbnail: getSRLSchema('EngineThumbnail'),
    playData: getSRLSchema('EnginePlayData'),
    tutorialData: getSRLSchema('EngineTutorialData'),
    rom: getSRLSchema('EngineRom').optional(),
    configuration: getSRLSchema('EngineConfiguration'),
    meta: z.unknown(),
})
