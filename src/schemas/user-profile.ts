import { z } from 'zod'

export const userProfileSchema = z.object({
    id: z.string(),
    handle: z.string(),
    name: z.string(),
    avatarForegroundColor: z.string(),
    avatarBackgroundColor: z.string(),
    aboutMe: z.string(),
    socialLinks: z.array(
        z.object({
            title: z.string(),
            address: z.string(),
        }),
    ),
    favorites: z.array(z.string()),
})
