import { Type } from '@sinclair/typebox'
import { PlaylistItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { tagSchema } from '../../tag'
import { SchemaToMatch } from '../../test'
import { levelItemSchema } from './level'

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
