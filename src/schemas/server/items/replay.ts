import { Type } from '@sinclair/typebox'
import { ReplayItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { SchemaToMatch } from '../../test'
import { tagSchema } from '../tag'
import { levelItemSchema } from './level'

export const replayItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.String()),
    version: Type.Literal(1),
    title: Type.String(),
    subtitle: Type.String(),
    author: Type.String(),
    tags: Type.Array(tagSchema),
    level: levelItemSchema,
    data: srlSchema,
    configuration: srlSchema,
})

type _Tests = Expect<[SchemaToMatch<typeof replayItemSchema, ReplayItem>]>
