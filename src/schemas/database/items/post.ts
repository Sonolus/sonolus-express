import { Type } from '@sinclair/typebox'
import { DatabasePostItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { localizationTextSchema } from '../localizationText'
import { databaseTagSchema } from '../tag'
import { DatabaseItemSchemaToMatch } from './test'

export const databasePostItemSchema = Type.Object({
    name: Type.String(),
    version: Type.Literal(1),
    title: localizationTextSchema,
    time: Type.Number(),
    author: localizationTextSchema,
    tags: Type.Array(databaseTagSchema),
    description: Type.Optional(localizationTextSchema),
    thumbnail: Type.Optional(srlSchema),
    meta: Type.Optional(Type.Unknown()),
})

type _Tests = Expect<[DatabaseItemSchemaToMatch<typeof databasePostItemSchema, DatabasePostItem>]>
