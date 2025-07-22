import { Type } from '@sinclair/typebox'
import { RoomItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { srlSchema } from '../../srl.js'
import { tagSchema } from '../../tag.js'
import { SchemaToMatch } from '../../test.js'

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
