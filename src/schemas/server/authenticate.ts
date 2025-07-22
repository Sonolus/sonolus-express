import { Type } from '@sinclair/typebox'
import { ServerAuthenticateRequest } from '@sonolus/core'
import { Expect } from '../../utils/test.js'
import { serviceUserProfileSchema } from '../service/userProfile.js'
import { SchemaToMatch } from '../test.js'

export const authenticateServerRequestSchema = Type.Object({
    type: Type.Literal('authenticateServer'),
    address: Type.String(),
    time: Type.Number(),
    userProfile: serviceUserProfileSchema,
})

type _Tests = Expect<
    [SchemaToMatch<typeof authenticateServerRequestSchema, ServerAuthenticateRequest>]
>
