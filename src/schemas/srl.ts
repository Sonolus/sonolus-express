import { Type } from '@sinclair/typebox'
import { Srl } from '@sonolus/core'
import { Expect } from '../utils/test'
import { SchemaToMatch } from './test'

export const srlSchema = Type.Object({
    hash: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    url: Type.Optional(Type.Union([Type.String(), Type.Null()])),
})

type _Tests = Expect<[SchemaToMatch<typeof srlSchema, Srl>]>
