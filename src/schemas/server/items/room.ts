import { Type } from '@sinclair/typebox'
import { RoomItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { tagSchema } from '../../tag'
import { SchemaToMatch } from '../../test'

export const roomItemSchema = Type.Object({
    name: Type.String(),
    title: Type.String(),
    subtitle: Type.String(),
    master: Type.String(),
    tags: Type.Array(tagSchema),
    cover: Type.Optional(srlSchema),
    bgm: Type.Optional(srlSchema),
    preview: Type.Optional(srlSchema),
})

type _Tests = Expect<[SchemaToMatch<typeof roomItemSchema, RoomItem>]>
