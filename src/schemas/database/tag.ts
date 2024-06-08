import { Type } from '@sinclair/typebox'
import { DatabaseTag } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'
import { localizationTextSchema } from './localizationText'

export const databaseTagSchema = Type.Object({
    title: localizationTextSchema,
    icon: Type.Optional(Type.String()),
})

type _Tests = Expect<[SchemaToMatch<typeof databaseTagSchema, DatabaseTag>]>
