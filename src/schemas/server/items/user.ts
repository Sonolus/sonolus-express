import { Type } from '@sinclair/typebox'
import { UserItem } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { tagSchema } from '../../tag.js'
import { SchemaToMatch } from '../../test.js'

export const userItemSchema = Type.Object({
    name: Type.String(),
    source: Type.Optional(Type.String()),
    title: Type.String(),
    handle: Type.Optional(Type.String()),
    tags: Type.Array(tagSchema),
})

type _Tests = Expect<[SchemaToMatch<typeof userItemSchema, UserItem>]>
