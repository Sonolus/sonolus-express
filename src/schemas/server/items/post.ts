import { Type } from '@sinclair/typebox'
import { PostItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { tagSchema } from '../../tag'
import { SchemaToMatch } from '../../test'

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
