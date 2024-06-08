import { Type } from '@sinclair/typebox'
import { SubmitItemCommunityActionRequest } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'

export const submitItemCommunityActionRequestSchema = Type.Object({
    values: Type.String(),
})

type _Tests = Expect<
    [SchemaToMatch<typeof submitItemCommunityActionRequestSchema, SubmitItemCommunityActionRequest>]
>
