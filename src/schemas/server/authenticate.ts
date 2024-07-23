import { Type } from '@sinclair/typebox'
import { ServerAuthenticateRequest } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { serviceUserProfileSchema } from '../service/userProfile'
import { SchemaToMatch } from '../test'

export const authenticateServerRequestSchema = Type.Object({
    type: Type.Literal('authenticateServer'),
    address: Type.String(),
    time: Type.Number(),
    userProfile: serviceUserProfileSchema,
})

type _Tests = Expect<
    [SchemaToMatch<typeof authenticateServerRequestSchema, ServerAuthenticateRequest>]
>
