import { z } from 'zod'
import { backgroundInfoSchema } from './background-info'
import { effectInfoSchema } from './effect-info'
import { engineInfoSchema } from './engine-info'
import { levelInfoSchema } from './level-info'
import { localizationTextSchema } from './localization-text'
import { getParser } from './parser'
import { particleInfoSchema } from './particle-info'
import { skinInfoSchema } from './skin-info'
import { getSRLSchema } from './srl'

const databaseSchema = z.object({
    info: z.object({
        title: localizationTextSchema,
        banner: getSRLSchema('ServerBanner'),
    }),
    levels: z.array(levelInfoSchema),
    skins: z.array(skinInfoSchema),
    backgrounds: z.array(backgroundInfoSchema),
    effects: z.array(effectInfoSchema),
    particles: z.array(particleInfoSchema),
    engines: z.array(engineInfoSchema),
})

export const databaseParser = getParser(databaseSchema)

export function getByName<T extends { name: string }>(
    infos: T[],
    name: string,
    parent: string
): T {
    const info = infos.find((info) => info.name === name)
    if (!info) {
        throw `${parent}: ${name} not found`
    }
    return info
}
