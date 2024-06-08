import { Type } from '@sinclair/typebox'
import { CreateItemRequest } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'

export const createItemRequestSchema = Type.Object({
    values: Type.String(),
})

type _Tests = Expect<[SchemaToMatch<typeof createItemRequestSchema, CreateItemRequest>]>
