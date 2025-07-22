import { Type } from '@sinclair/typebox'
import { ServerSubmitLevelResultRequest } from '@sonolus/core'
import { Expect } from '../../../../utils/test.js'
import { SchemaToMatch } from '../../../test.js'
import { replayItemSchema } from '../replay.js'

export const serverSubmitLevelResultRequestSchema = Type.Object({
    replay: replayItemSchema,
    values: Type.String(),
})

type _Tests = Expect<
    [SchemaToMatch<typeof serverSubmitLevelResultRequestSchema, ServerSubmitLevelResultRequest>]
>
