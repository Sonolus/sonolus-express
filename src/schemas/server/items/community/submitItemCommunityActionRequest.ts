import { Type } from '@sinclair/typebox'
import { ServerSubmitItemCommunityActionRequest } from '@sonolus/core'
import { Expect } from '../../../../utils/test'
import { SchemaToMatch } from '../../../test'

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
