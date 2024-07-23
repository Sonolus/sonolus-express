import { Type } from '@sinclair/typebox'
import { DatabasePlaylistItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { localizationTextSchema } from '../localizationText'
import { databaseTagSchema } from '../tag'
import { DatabaseItemSchemaToMatch } from './test'

export const databasePlaylistItemSchema = Type.Object({
    name: Type.String(),
    version: Type.Literal(1),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    tags: Type.Array(databaseTagSchema),
    description: Type.Optional(localizationTextSchema),
    levels: Type.Array(Type.String()),
    thumbnail: Type.Optional(srlSchema),
    meta: Type.Optional(Type.Unknown()),
})

type _Tests = Expect<
    [DatabaseItemSchemaToMatch<typeof databasePlaylistItemSchema, DatabasePlaylistItem>]
>
