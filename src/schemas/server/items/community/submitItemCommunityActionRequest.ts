import { Type } from '@sinclair/typebox'
import { ServerSubmitItemCommunityActionRequest } from '@sonolus/core'
import { Expect } from '../../../../utils/test.js'
import { SchemaToMatch } from '../../../test.js'

export const serverSubmitItemCommunityActionRequestSchema = Type.Object({
    values: Type.String(),
})

type _Tests = Expect<
    [
        SchemaToMatch<
            typeof serverSubmitItemCommunityActionRequestSchema,
            ServerSubmitItemCommunityActionRequest
        >,
    ]
>
