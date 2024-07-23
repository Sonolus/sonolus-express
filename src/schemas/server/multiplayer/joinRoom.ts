import { Type } from '@sinclair/typebox'
import { ServerJoinRoomRequest } from '@sonolus/core'
import { Expect } from '../../../utils/test'
import { serviceUserProfileSchema } from '../../service/userProfile'
import { SchemaToMatch } from '../../test'

export const serverJoinRoomRequestSchema = Type.Object({
    type: Type.Literal('authenticateMultiplayer'),
    address: Type.String(),
    room: Type.String(),
    time: Type.Number(),
    userProfile: serviceUserProfileSchema,
})

type _Tests = Expect<[SchemaToMatch<typeof serverJoinRoomRequestSchema, ServerJoinRoomRequest>]>
