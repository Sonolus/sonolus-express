import { Type } from '@sinclair/typebox'
import { ServerSubmitItemActionRequest } from '@sonolus/core'
import { Expect } from '../../../utils/test.js'
import { SchemaToMatch } from '../../test.js'

export const serverSubmitItemActionRequestSchema = Type.Object({
    values: Type.String(),
})

type _Tests = Expect<
    [SchemaToMatch<typeof serverSubmitItemActionRequestSchema, ServerSubmitItemActionRequest>]
>
