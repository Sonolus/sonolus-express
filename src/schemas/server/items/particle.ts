import { Type } from '@sinclair/typebox'
import { ParticleItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { srlSchema } from '../../srl.js'
import { tagSchema } from '../../tag.js'
import { SchemaToMatch } from '../../test.js'

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
