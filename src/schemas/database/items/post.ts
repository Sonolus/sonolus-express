import { Type } from '@sinclair/typebox'
import { DatabasePostItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { srlSchema } from '../../srl.js'
import { localizationTextSchema } from '../localizationText.js'
import { databaseTagSchema } from '../tag.js'
import { DatabaseItemSchemaToMatch } from './test.js'

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
