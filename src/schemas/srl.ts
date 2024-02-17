import { z } from 'zod'

export const srlSchema = z.object({
    hash: z.string(),
    url: z.string(),
})
