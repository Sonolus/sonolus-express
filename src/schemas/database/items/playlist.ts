import { Type } from '@sinclair/typebox'
import { DatabasePlaylistItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { srlSchema } from '../../srl.js'
import { localizationTextSchema } from '../localizationText.js'
import { databaseTagSchema } from '../tag.js'
import { DatabaseItemSchemaToMatch } from './test.js'

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
