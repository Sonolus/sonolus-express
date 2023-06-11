import { z } from 'zod'
import { userProfileSchema } from './user-profile'

export const sessionDataSchema = z.object({
    address: z.string(),
    userProfile: userProfileSchema,
})
