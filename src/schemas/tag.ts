import { Type } from '@sinclair/typebox'
import { Tag } from '@sonolus/core'
import { Expect } from '../utils/test'
import { SchemaToMatch } from './test'

export const tagSchema = Type.Object({
    title: Type.String(),
    icon: Type.Optional(Type.String()),
})

type _Tests = Expect<[SchemaToMatch<typeof tagSchema, Tag>]>
