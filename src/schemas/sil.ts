import { Type } from '@sinclair/typebox'
import { Sil } from '@sonolus/core'
import { Expect } from '../utils/test'
import { SchemaToMatch } from './test'

export const silSchema = Type.Object({
    address: Type.String(),
    name: Type.String(),
})

type _Tests = Expect<[SchemaToMatch<typeof silSchema, Sil>]>
