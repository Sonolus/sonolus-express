import { Type } from '@sinclair/typebox'
import { DatabaseServerInfo } from '@sonolus/core'
import { Expect } from '../../utils/test.js'
import { srlSchema } from '../srl.js'
import { SchemaToMatch } from '../test.js'
import { localizationTextSchema } from './localizationText.js'

export const databaseServerInfoSchema = Type.Object({
    title: localizationTextSchema,
    description: Type.Optional(localizationTextSchema),
    banner: Type.Optional(srlSchema),
})

type _Tests = Expect<[SchemaToMatch<typeof databaseServerInfoSchema, DatabaseServerInfo>]>
