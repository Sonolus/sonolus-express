import { z } from 'zod'

export const submitItemCommunityActionRequestSchema = z.object({
    values: z.string(),
})
