import { z } from 'zod'
import { userProfileSchema } from './user-profile'

export const joinRoomRequestSchema = z.object({
    type: z.literal('authenticateMultiplayer'),
    address: z.string(),
    room: z.string(),
    time: z.number(),
    userProfile: userProfileSchema,
})
