import { Type } from '@sinclair/typebox'
import { PostItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { srlSchema } from '../../srl.js'
import { tagSchema } from '../../tag.js'
import { SchemaToMatch } from '../../test.js'

export const postItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.String()),
    version: Type.Literal(1),
    title: Type.String(),
    time: Type.Number(),
    author: Type.String(),
    tags: Type.Array(tagSchema),
    thumbnail: Type.Optional(srlSchema),
})

type _Tests = Expect<[SchemaToMatch<typeof postItemSchema, PostItem>]>
