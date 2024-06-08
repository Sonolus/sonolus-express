import { Type } from '@sinclair/typebox'
import { JoinRoomRequest } from '@sonolus/core'
import { Expect } from '../../utils/test'
import { SchemaToMatch } from '../test'
import { userProfileSchema } from './userProfile'

export const joinRoomRequestSchema = Type.Object({
    type: Type.Literal('authenticateMultiplayer'),
    address: Type.String(),
    room: Type.String(),
    time: Type.Number(),
    userProfile: userProfileSchema,
})

type _Tests = Expect<[SchemaToMatch<typeof joinRoomRequestSchema, JoinRoomRequest>]>
