import { z } from 'zod'
import { userProfileSchema } from './user-profile'

export const authenticateServerRequestSchema = z.object({
    type: z.literal('authenticateServer'),
    address: z.string(),
    time: z.number(),
    userProfile: userProfileSchema,
})
