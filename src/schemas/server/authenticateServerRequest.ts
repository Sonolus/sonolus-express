import { Type } from '@sinclair/typebox'
import { AuthenticateServerRequest } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'
import { userProfileSchema } from './userProfile'

export const authenticateServerRequestSchema = Type.Object({
    type: Type.Literal('authenticateServer'),
    address: Type.String(),
    time: Type.Number(),
    userProfile: userProfileSchema,
})

type _Tests = Expect<
    [SchemaToMatch<typeof authenticateServerRequestSchema, AuthenticateServerRequest>]
>
