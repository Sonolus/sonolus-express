import { Type } from '@sinclair/typebox'
import { SkinItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { tagSchema } from '../../tag'
import { SchemaToMatch } from '../../test'

export const skinItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.Union([Type.String(), Type.Undefined()])),
    version: Type.Literal(4),
    title: Type.String(),
    subtitle: Type.String(),
    author: Type.String(),
    tags: Type.Array(tagSchema),
    thumbnail: srlSchema,
    data: srlSchema,
    texture: srlSchema,
})

type _Tests = Expect<[SchemaToMatch<typeof skinItemSchema, SkinItem>]>
