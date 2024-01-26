import { z } from 'zod'
import { localizationTextSchema } from './localization-text'
import { getSRLSchema } from './srl'
import { databaseTagSchema } from './tag'

export const databasePlaylistItemSchema = z.object({
    name: z.string(),
    version: z.literal(1),
    title: localizationTextSchema,
    subtitle: localizationTextSchema,
    author: localizationTextSchema,
    tags: databaseTagSchema.array(),
    description: localizationTextSchema,
    levels: z.array(z.string()),
    thumbnail: getSRLSchema('PlaylistThumbnail').optional(),
    meta: z.unknown(),
})
