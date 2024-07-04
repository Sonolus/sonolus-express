import { Type } from '@sinclair/typebox'
import { BackgroundItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { tagSchema } from '../../tag'
import { SchemaToMatch } from '../../test'

export const backgroundItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.String()),
    version: Type.Literal(2),
    title: Type.String(),
    subtitle: Type.String(),
    author: Type.String(),
    tags: Type.Array(tagSchema),
    thumbnail: srlSchema,
    data: srlSchema,
    image: srlSchema,
    configuration: srlSchema,
})

type _Tests = Expect<[SchemaToMatch<typeof backgroundItemSchema, BackgroundItem>]>
