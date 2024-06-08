import { Type } from '@sinclair/typebox'
import { Database } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'
import { databaseBackgroundItemSchema } from './items/background'
import { databaseEffectItemSchema } from './items/effect'
import { databaseEngineItemSchema } from './items/engine'
import { databaseLevelItemSchema } from './items/level'
import { databaseParticleItemSchema } from './items/particle'
import { databasePlaylistItemSchema } from './items/playlist'
import { databasePostItemSchema } from './items/post'
import { databaseReplayItemSchema } from './items/replay'
import { databaseSkinItemSchema } from './items/skin'
import { databaseServerInfoSchema } from './serverInfo'

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
