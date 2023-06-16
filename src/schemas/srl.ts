import { ResourceType } from 'sonolus-core'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getSRLSchema = <T extends ResourceType>(type: T) =>
    z.object({
        type: z.literal(type),
        hash: z.string(),
        url: z.string(),
    })
