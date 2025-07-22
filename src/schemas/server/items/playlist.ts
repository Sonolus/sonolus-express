import { Type } from '@sinclair/typebox'
import { PlaylistItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { srlSchema } from '../../srl.js'
import { tagSchema } from '../../tag.js'
import { SchemaToMatch } from '../../test.js'
import { levelItemSchema } from './level.js'

export const playlistItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.String()),
    version: Type.Literal(1),
    title: Type.String(),
    subtitle: Type.String(),
    author: Type.String(),
    tags: Type.Array(tagSchema),
    levels: Type.Array(levelItemSchema),
    thumbnail: Type.Optional(srlSchema),
})

type _Tests = Expect<[SchemaToMatch<typeof playlistItemSchema, PlaylistItem>]>
