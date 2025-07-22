import { Type } from '@sinclair/typebox'
import { ServerCreateItemRequest } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { SchemaToMatch } from '../../test.js'

export const serverCreateItemRequestSchema = Type.Object({
    values: Type.String(),
})

type _Tests = Expect<[SchemaToMatch<typeof serverCreateItemRequestSchema, ServerCreateItemRequest>]>
