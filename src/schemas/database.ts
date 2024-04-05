import { z } from 'zod'
import { databaseBackgroundItemSchema } from './background-item'
import { databaseEffectItemSchema } from './effect-item'
import { databaseEngineItemSchema } from './engine-item'
import { databaseLevelItemSchema } from './level-item'
import { getParser } from './parser'
import { databaseParticleItemSchema } from './particle-item'
import { databasePlaylistItemSchema } from './playlist-item'
import { databasePostItemSchema } from './post-item'
import { databaseReplayItemSchema } from './replay-item'
import { databaseServerInfoSchema } from './server-info'
import { databaseSkinItemSchema } from './skin-item'

const databaseSchema = z.object({
    info: databaseServerInfoSchema,
    posts: z.array(databasePostItemSchema),
    playlists: z.array(databasePlaylistItemSchema),
    levels: z.array(databaseLevelItemSchema),
    skins: z.array(databaseSkinItemSchema),
    backgrounds: z.array(databaseBackgroundItemSchema),
    effects: z.array(databaseEffectItemSchema),
    particles: z.array(databaseParticleItemSchema),
    engines: z.array(databaseEngineItemSchema),
    replays: z.array(databaseReplayItemSchema),
})

export const databaseParser = getParser(databaseSchema)
