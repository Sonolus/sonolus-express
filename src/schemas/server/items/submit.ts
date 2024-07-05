import { Type } from '@sinclair/typebox'
import { ServerSubmitItemActionRequest } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { SchemaToMatch } from '../../test'

export const serverSubmitItemActionRequestSchema = Type.Object({
    values: Type.String(),
})

type _Tests = Expect<
    [SchemaToMatch<typeof serverSubmitItemActionRequestSchema, ServerSubmitItemActionRequest>]
>
