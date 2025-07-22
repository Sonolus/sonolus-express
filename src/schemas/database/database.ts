import { Type } from '@sinclair/typebox'
import { Database } from '@sonolus/core'
import { Expect } from '../../utils/test.js'
import { SchemaToMatch } from '../test.js'
import { databaseBackgroundItemSchema } from './items/background.js'
import { databaseEffectItemSchema } from './items/effect.js'
import { databaseEngineItemSchema } from './items/engine.js'
import { databaseLevelItemSchema } from './items/level.js'
import { databaseParticleItemSchema } from './items/particle.js'
import { databasePlaylistItemSchema } from './items/playlist.js'
import { databasePostItemSchema } from './items/post.js'
import { databaseReplayItemSchema } from './items/replay.js'
import { databaseSkinItemSchema } from './items/skin.js'
import { databaseServerInfoSchema } from './serverInfo.js'

export const databaseSchema = Type.Object({
    info: databaseServerInfoSchema,
    posts: Type.Array(databasePostItemSchema),
    playlists: Type.Array(databasePlaylistItemSchema),
    levels: Type.Array(databaseLevelItemSchema),
    skins: Type.Array(databaseSkinItemSchema),
    backgrounds: Type.Array(databaseBackgroundItemSchema),
    effects: Type.Array(databaseEffectItemSchema),
    particles: Type.Array(databaseParticleItemSchema),
    engines: Type.Array(databaseEngineItemSchema),
    replays: Type.Array(databaseReplayItemSchema),
})

type _Tests = Expect<[SchemaToMatch<typeof databaseSchema, Database>]>
