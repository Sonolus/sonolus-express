import { Type } from '@sinclair/typebox'
import { EffectItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { SchemaToMatch } from '../../test'
import { tagSchema } from '../tag'

export const effectItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.String()),
    version: Type.Literal(5),
    title: Type.String(),
    subtitle: Type.String(),
    author: Type.String(),
    tags: Type.Array(tagSchema),
    thumbnail: srlSchema,
    data: srlSchema,
    audio: srlSchema,
})

type _Tests = Expect<[SchemaToMatch<typeof effectItemSchema, EffectItem>]>
