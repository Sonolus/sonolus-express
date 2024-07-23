import { Type } from '@sinclair/typebox'
import { DatabaseReplayItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { localizationTextSchema } from '../localizationText'
import { databaseTagSchema } from '../tag'
import { DatabaseItemSchemaToMatch } from './test'

export const databaseReplayItemSchema = Type.Object({
    name: Type.String(),
    version: Type.Literal(1),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    tags: Type.Array(databaseTagSchema),
    description: Type.Optional(localizationTextSchema),
    level: Type.String(),
    data: srlSchema,
    configuration: srlSchema,
    meta: Type.Optional(Type.Unknown()),
})

type _Tests = Expect<
    [DatabaseItemSchemaToMatch<typeof databaseReplayItemSchema, DatabaseReplayItem>]
>
