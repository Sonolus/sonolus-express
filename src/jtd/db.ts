import Ajv, { JTDSchemaType } from 'ajv/dist/jtd'
import { BackgroundInfo, backgroundInfoSchema } from './background-info'
import { EffectInfo, effectInfoSchema } from './effect-info'
import { EngineInfo, engineInfoSchema } from './engine-info'
import { LevelInfo, levelInfoSchema } from './level-info'
import { ParticleInfo, particleInfoSchema } from './particle-info'
import { SkinInfo, skinInfoSchema } from './skin-info'

export type DB = {
    levels: LevelInfo[]
    skins: SkinInfo[]
    backgrounds: BackgroundInfo[]
    effects: EffectInfo[]
    particles: ParticleInfo[]
    engines: EngineInfo[]
}

type DBWithMeta = {
    [K in keyof DB]: (DB[K][number] & { meta?: unknown })[]
}

function withMeta<T>(schema: JTDSchemaType<T>) {
    return {
        ...schema,
        optionalProperties: {
            meta: {},
        },
    }
}

export const dbSchema: JTDSchemaType<DBWithMeta> = {
    properties: {
        levels: { elements: withMeta(levelInfoSchema) },
        skins: { elements: withMeta(skinInfoSchema) },
        backgrounds: { elements: withMeta(backgroundInfoSchema) },
        effects: { elements: withMeta(effectInfoSchema) },
        particles: { elements: withMeta(particleInfoSchema) },
        engines: { elements: withMeta(engineInfoSchema) },
    },
}

export const dbParser = new Ajv().compileParser(dbSchema)

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
