import { DatabaseTag } from '@sonolus/core'
import Type from 'typebox'
import { Expect } from '../../utils/test.js'
import { SchemaToMatch } from '../test.js'
import { localizationTextSchema } from './localizationText.js'

export const databaseTagSchema = Type.Object({
    title: Type.Optional(localizationTextSchema),
    icon: Type.Optional(Type.String()),
})

type _Tests = Expect<[SchemaToMatch<typeof databaseTagSchema, DatabaseTag>]>
