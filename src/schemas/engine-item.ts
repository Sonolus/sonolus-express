import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'
import { databaseTagSchema } from './tag'

export const databaseEngineItemSchema = z.object({
    name: z.string(),
    version: z.literal(12),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    tags: databaseTagSchema.array(),
    description: localizationTextSchema,
    skin: z.string(),
    background: z.string(),
    effect: z.string(),
    particle: z.string(),
    thumbnail: getSRLSchema('EngineThumbnail'),
    playData: getSRLSchema('EnginePlayData'),
    watchData: getSRLSchema('EngineWatchData'),
    previewData: getSRLSchema('EnginePreviewData'),
    tutorialData: getSRLSchema('EngineTutorialData'),
    rom: getSRLSchema('EngineRom').optional(),
    configuration: getSRLSchema('EngineConfiguration'),
    meta: z.unknown(),
})
