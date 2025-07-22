import { Type } from '@sinclair/typebox'
import { Sil } from '@sonolus/core'
import { Expect } from '../utils/test.js'
import { SchemaToMatch } from './test.js'

export const silSchema = Type.Object({
    address: Type.String(),
    name: Type.String(),
})

type _Tests = Expect<[SchemaToMatch<typeof silSchema, Sil>]>
