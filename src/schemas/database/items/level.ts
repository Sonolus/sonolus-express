import { Type } from '@sinclair/typebox'
import { DatabaseLevelItem, DatabaseUseItem } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { srlSchema } from '../../srl'
import { SchemaToMatch } from '../../test'
import { localizationTextSchema } from '../localizationText'
import { databaseTagSchema } from '../tag'
import { DatabaseItemSchemaToMatch } from './test'

const databaseUseItemSchema = Type.Union([
    Type.Object({ useDefault: Type.Literal(true) }),
    Type.Object({ useDefault: Type.Literal(false), item: Type.String() }),
])

export const databaseLevelItemSchema = Type.Object({
    name: Type.String(),
    version: Type.Literal(1),
    rating: Type.Number(),
    title: localizationTextSchema,
    artists: localizationTextSchema,
    author: localizationTextSchema,
    tags: Type.Array(databaseTagSchema),
    description: Type.Optional(localizationTextSchema),
    engine: Type.String(),
    useSkin: databaseUseItemSchema,
    useBackground: databaseUseItemSchema,
    useEffect: databaseUseItemSchema,
    useParticle: databaseUseItemSchema,
    cover: srlSchema,
    bgm: srlSchema,
    preview: Type.Optional(srlSchema),
    data: srlSchema,
    meta: Type.Optional(Type.Unknown()),
})

type _Tests = Expect<
    [
        SchemaToMatch<typeof databaseUseItemSchema, DatabaseUseItem>,
        DatabaseItemSchemaToMatch<typeof databaseLevelItemSchema, DatabaseLevelItem>,
    ]
>
