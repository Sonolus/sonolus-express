import { Type } from '@sinclair/typebox'
import { SRL } from '@sonolus/core'
import { Expect } from '../utils/test'
import { SchemaToMatch } from './test'

export const srlSchema = Type.Object({
    hash: Type.String(),
    url: Type.String(),
})

type _Tests = Expect<[SchemaToMatch<typeof srlSchema, SRL>]>
