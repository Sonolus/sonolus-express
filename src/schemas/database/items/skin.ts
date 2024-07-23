import { Type } from '@sinclair/typebox'
import { DatabaseSkinItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { localizationTextSchema } from '../localizationText'
import { databaseTagSchema } from '../tag'
import { DatabaseItemSchemaToMatch } from './test'

export const databaseSkinItemSchema = Type.Object({
    name: Type.String(),
    version: Type.Literal(4),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    tags: Type.Array(databaseTagSchema),
    description: Type.Optional(localizationTextSchema),
    thumbnail: srlSchema,
    data: srlSchema,
    texture: srlSchema,
    meta: Type.Optional(Type.Unknown()),
})

type _Tests = Expect<[DatabaseItemSchemaToMatch<typeof databaseSkinItemSchema, DatabaseSkinItem>]>
