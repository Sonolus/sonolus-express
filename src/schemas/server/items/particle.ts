import { Type } from '@sinclair/typebox'
import { ParticleItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { tagSchema } from '../../tag'
import { SchemaToMatch } from '../../test'

export const particleItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.String()),
    version: Type.Literal(3),
    title: Type.String(),
    subtitle: Type.String(),
    author: Type.String(),
    tags: Type.Array(tagSchema),
    thumbnail: srlSchema,
    data: srlSchema,
    texture: srlSchema,
})

type _Tests = Expect<[SchemaToMatch<typeof particleItemSchema, ParticleItem>]>
