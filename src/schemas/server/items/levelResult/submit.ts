import { Type } from '@sinclair/typebox'
import { ServerSubmitLevelResultRequest } from '@sonolus/core'
import { Expect } from '../../../../utils/test'
import { SchemaToMatch } from '../../../test'
import { replayItemSchema } from '../replay'

export const serverSubmitLevelResultRequestSchema = Type.Object({
    replay: replayItemSchema,
    values: Type.String(),
})

type _Tests = Expect<
    [SchemaToMatch<typeof serverSubmitLevelResultRequestSchema, ServerSubmitLevelResultRequest>]
>
