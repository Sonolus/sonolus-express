import { Tag } from '@sonolus/core'
import Type from 'typebox'
import { Expect } from '../utils/test.js'
import { SchemaToMatch } from './test.js'

export const tagSchema = Type.Object({
    title: Type.Optional(Type.String()),
    icon: Type.Optional(Type.String()),
})

type _Tests = Expect<[SchemaToMatch<typeof tagSchema, Tag>]>
