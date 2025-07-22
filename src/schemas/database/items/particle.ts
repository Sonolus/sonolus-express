import { Type } from '@sinclair/typebox'
import { DatabaseParticleItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { srlSchema } from '../../srl.js'
import { localizationTextSchema } from '../localizationText.js'
import { databaseTagSchema } from '../tag.js'
import { DatabaseItemSchemaToMatch } from './test.js'

export const databaseParticleItemSchema = Type.Object({
    name: Type.String(),
    version: Type.Literal(3),
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

type _Tests = Expect<
    [DatabaseItemSchemaToMatch<typeof databaseParticleItemSchema, DatabaseParticleItem>]
>
